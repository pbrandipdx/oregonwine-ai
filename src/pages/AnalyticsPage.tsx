import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { supabase, supabaseEnvHint } from "../lib/supabase";
import { inferWinerySlugFromPath } from "../lib/wineries";

type WineryMeta = { id: string; name: string; slug: string };

type ChatLogRow = {
  created_at: string;
  was_deflected: boolean | null;
  latency_ms: number | null;
  user_message: string | null;
  session_id: string | null;
  assistant_response: string | null;
  prompt_version: string | null;
  feedback_rating: number | null;
};

type DayStat = {
  day: string;
  total_messages: number;
  deflected: number;
  thumbs_up: number;
  thumbs_down: number;
  avg_latency_ms: number;
};

type TopQuestion = {
  user_message: string;
  cnt: number;
};

const LOOKBACK_DAYS = 365;
const MAX_ROWS = 8000;

function aggregateByDay(rows: ChatLogRow[]): DayStat[] {
  const map = new Map<
    string,
    {
      total: number;
      deflected: number;
      up: number;
      down: number;
      latSum: number;
      latN: number;
    }
  >();

  for (const r of rows) {
    if (!r.created_at) continue;
    const day = r.created_at.slice(0, 10);
    let b = map.get(day);
    if (!b) {
      b = { total: 0, deflected: 0, up: 0, down: 0, latSum: 0, latN: 0 };
      map.set(day, b);
    }
    b.total += 1;
    if (r.was_deflected) b.deflected += 1;
    if (r.feedback_rating === 1) b.up += 1;
    if (r.feedback_rating === -1) b.down += 1;
    if (r.latency_ms != null && r.latency_ms > 0) {
      b.latSum += r.latency_ms;
      b.latN += 1;
    }
  }

  return Array.from(map.entries())
    .map(([day, b]) => ({
      day,
      total_messages: b.total,
      deflected: b.deflected,
      thumbs_up: b.up,
      thumbs_down: b.down,
      avg_latency_ms: b.latN > 0 ? Math.round(b.latSum / b.latN) : 0,
    }))
    .sort((a, b) => (a.day < b.day ? 1 : -1));
}

export function AnalyticsPage() {
  const { slug: slugParam } = useParams<{ slug?: string }>();
  const location = useLocation();
  // Support both /analytics/:slug (legacy) and /:slug/analytics (canonical)
  const slug = slugParam?.trim() || inferWinerySlugFromPath(location.pathname) || undefined;
  const [wineryMeta, setWineryMeta] = useState<WineryMeta | null>(null);
  const [wineryErr, setWineryErr] = useState<string | null>(null);
  const [wineryLoading, setWineryLoading] = useState(false);
  const [selectedWinery, setSelectedWinery] = useState("");
  const [stats, setStats] = useState<DayStat[]>([]);
  const [topQuestions, setTopQuestions] = useState<TopQuestion[]>([]);
  const [recentLogs, setRecentLogs] = useState<ChatLogRow[]>([]);
  const [totals, setTotals] = useState({
    messages: 0,
    sessions: 0,
    distinctSessionsFromLogs: 0,
    deflected: 0,
    thumbsUp: 0,
    thumbsDown: 0,
    avgLatency: 0,
  });
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sinceIso = useMemo(() => {
    const t = new Date();
    t.setUTCDate(t.getUTCDate() - LOOKBACK_DAYS);
    return t.toISOString();
  }, []);

  useEffect(() => {
    if (!supabase || !slug) {
      setWineryMeta(null);
      setWineryErr(null);
      setSelectedWinery("");
      setWineryLoading(false);
      return;
    }
    setWineryLoading(true);
    setWineryErr(null);
    setWineryMeta(null);
    setSelectedWinery("");
    let cancelled = false;
    supabase
      .from("wineries")
      .select("id, name, slug")
      .eq("slug", slug)
      .eq("status", "active")
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        setWineryLoading(false);
        if (error) {
          setWineryErr(error.message);
          return;
        }
        if (!data) {
          setWineryErr(`No active winery found for slug “${slug}”.`);
          return;
        }
        setWineryMeta(data);
        setSelectedWinery(data.id);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!supabase || !selectedWinery) return;

    let cancelled = false;
    setLoading(true);
    setLoadError(null);

    const run = async () => {
      const { data: rows, error: logErr } = await supabase
        .from("chat_logs")
        .select(
          "created_at, was_deflected, latency_ms, user_message, session_id, assistant_response, prompt_version, feedback_rating"
        )
        .eq("winery_id", selectedWinery)
        .gte("created_at", sinceIso)
        .order("created_at", { ascending: false })
        .limit(MAX_ROWS);

      if (cancelled) return;

      if (logErr) {
        const { data: fallback, error: fbErr } = await supabase
          .from("chat_logs")
          .select(
            "created_at, was_deflected, latency_ms, user_message, session_id, assistant_response, prompt_version"
          )
          .eq("winery_id", selectedWinery)
          .gte("created_at", sinceIso)
          .order("created_at", { ascending: false })
          .limit(MAX_ROWS);

        if (cancelled) return;
        if (fbErr) {
          setLoadError(fbErr.message);
          setLoading(false);
          return;
        }
        const normalized: ChatLogRow[] = (fallback ?? []).map((r) => ({
          ...r,
          feedback_rating: null,
        }));
        applyRows(normalized);
        setLoading(false);
        return;
      }

      applyRows((rows ?? []) as ChatLogRow[]);
      setLoading(false);

      function applyRows(all: ChatLogRow[]) {
        setRecentLogs(all.slice(0, 100));
        setStats(aggregateByDay(all));

        let deflected = 0;
        let thumbsUp = 0;
        let thumbsDown = 0;
        let latSum = 0;
        let latN = 0;
        const sessions = new Set<string>();
        for (const r of all) {
          if (r.was_deflected) deflected += 1;
          if (r.feedback_rating === 1) thumbsUp += 1;
          if (r.feedback_rating === -1) thumbsDown += 1;
          if (r.latency_ms != null && r.latency_ms > 0) {
            latSum += r.latency_ms;
            latN += 1;
          }
          if (r.session_id) sessions.add(r.session_id);
        }

        const counts = new Map<string, number>();
        for (const r of all) {
          const q = (r.user_message ?? "").toLowerCase().trim();
          if (!q) continue;
          counts.set(q, (counts.get(q) ?? 0) + 1);
        }
        const topQs = Array.from(counts.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 25)
          .map(([user_message, cnt]) => ({ user_message, cnt }));
        setTopQuestions(topQs);

        setTotals((t) => ({
          ...t,
          messages: all.length,
          distinctSessionsFromLogs: sessions.size,
          deflected,
          thumbsUp,
          thumbsDown,
          avgLatency: latN > 0 ? Math.round(latSum / latN) : 0,
        }));
      }
    };

    void run();

    supabase
      .from("chat_sessions")
      .select("id", { count: "exact", head: true })
      .eq("winery_id", selectedWinery)
      .gte("started_at", sinceIso)
      .then(({ count, error }) => {
        if (cancelled || error) return;
        setTotals((t) => ({ ...t, sessions: count ?? 0 }));
      });

    return () => {
      cancelled = true;
    };
  }, [selectedWinery, sinceIso]);

  if (!supabase) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
        <h1>Chat Analytics</h1>
        <p style={{ color: "#b00020" }}>{supabaseEnvHint()}</p>
      </div>
    );
  }

  if (!slug) {
    const base = import.meta.env.BASE_URL || "/";
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: 24 }}>
        <h1>Partner analytics</h1>
        <p style={{ color: "#444", lineHeight: 1.6 }}>
          Metrics are scoped to <strong>one winery at a time</strong> so partners don’t see each other in a
          shared directory or picker. Use the link you were given, with your slug:
        </p>
        <p style={{ fontSize: 15 }}>
          <code style={{ background: "#f5f5f5", padding: "6px 10px", borderRadius: 6 }}>
            {typeof window !== "undefined" ? window.location.origin : ""}
            {base}
            analytics/<strong>your-slug</strong>
          </code>
        </p>
        <p style={{ color: "#666", fontSize: 14 }}>
          Example (public demo): <Link to="/analytics/rex-hill">/analytics/rex-hill</Link>
        </p>
        <p>
          <Link to="/">← Home</Link>
        </p>
      </div>
    );
  }

  if (wineryLoading) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
        <h1>Chat Analytics</h1>
        <p style={{ color: "#666" }}>Loading winery…</p>
      </div>
    );
  }

  if (wineryErr || !wineryMeta) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
        <h1>Chat Analytics</h1>
        <p style={{ color: "#b00020" }}>{wineryErr ?? "Winery not found."}</p>
        <p>
          <Link to="/">← Home</Link>
        </p>
      </div>
    );
  }

  const satisfactionRate =
    totals.thumbsUp + totals.thumbsDown > 0
      ? Math.round((totals.thumbsUp / (totals.thumbsUp + totals.thumbsDown)) * 100)
      : null;

  const deflectionRate =
    totals.messages > 0 ? Math.round((totals.deflected / totals.messages) * 100) : 0;

  const sessionDisplay = Math.max(totals.sessions, totals.distinctSessionsFromLogs);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px", color: "#eceae8" }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.2rem", fontWeight: 700, marginBottom: 8 }}>Chat Analytics</h1>
      <p style={{ marginBottom: 8, fontSize: 16 }}>
        <strong>{wineryMeta.name}</strong>{" "}
        <span style={{ color: "#a8a39e" }}>({wineryMeta.slug})</span>
      </p>
      <p style={{ color: "#a8a39e", fontSize: 15, marginBottom: 16 }}>
        Data from <code style={{ background: "#1a1a1a", padding: "2px 6px", borderRadius: 3, fontSize: 14 }}>chat_logs</code> for this winery only (last {LOOKBACK_DAYS} days, up to{" "}
        {MAX_ROWS.toLocaleString()} messages). Sessions also checks <code style={{ background: "#1a1a1a", padding: "2px 6px", borderRadius: 3, fontSize: 14 }}>chat_sessions</code> when populated.
      </p>

      {loadError && (
        <div
          style={{
            padding: 14,
            marginBottom: 16,
            background: "rgba(224, 85, 85, 0.15)",
            borderRadius: 6,
            border: "1px solid rgba(224, 85, 85, 0.3)",
            color: "#f08080",
            fontSize: 15,
          }}
        >
          {loadError}
        </div>
      )}
      {loading && <p style={{ color: "#a8a39e", fontSize: 16 }}>Loading…</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 16,
          marginTop: 24,
        }}
      >
        {[
          { label: "Total Messages", value: totals.messages, color: "#6db3f2" },
          {
            label: "Sessions",
            value: sessionDisplay,
            color: "#c47a84",
          },
          {
            label: "Deflection Rate",
            value: `${deflectionRate}%`,
            color: deflectionRate > 20 ? "#f0a050" : "#7dcda0",
          },
          {
            label: "Satisfaction",
            value: satisfactionRate !== null ? `${satisfactionRate}%` : "N/A",
            color: "#7dcda0",
          },
          { label: "Thumbs Up", value: totals.thumbsUp, color: "#7dcda0" },
          { label: "Thumbs Down", value: totals.thumbsDown, color: "#e05555" },
          {
            label: "Avg Latency",
            value: `${totals.avgLatency}ms`,
            color: totals.avgLatency > 5000 ? "#f0a050" : "#6db3f2",
          },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              padding: 18,
              borderRadius: 6,
              background: "#141414",
              border: "1px solid #2a2a2a",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 700, color: card.color, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{card.value}</div>
            <div style={{ fontSize: 13, color: "#a8a39e", marginTop: 6, fontFamily: "'Space Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>{card.label}</div>
          </div>
        ))}
      </div>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.6rem", fontWeight: 700 }}>Daily breakdown</h2>
        <p style={{ color: "#a8a39e", fontSize: 15 }}>
          Aggregated from message timestamps (UTC date). Empty days are omitted.
        </p>
        {stats.length === 0 && !loading && <p style={{ color: "#6b6560", fontSize: 15 }}>No chat logs for this winery in range.</p>}
        {stats.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, minWidth: 520 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #3a3a3a" }}>
                  <th style={{ textAlign: "left", padding: 10, color: "#eceae8", fontFamily: "'Space Mono', monospace", fontSize: 12, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Date (UTC)</th>
                  <th style={{ textAlign: "right", padding: 10, color: "#eceae8", fontFamily: "'Space Mono', monospace", fontSize: 12, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Messages</th>
                  <th style={{ textAlign: "right", padding: 10, color: "#eceae8", fontFamily: "'Space Mono', monospace", fontSize: 12, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Deflected</th>
                  <th style={{ textAlign: "right", padding: 10, color: "#eceae8", fontFamily: "'Space Mono', monospace", fontSize: 12, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>+1</th>
                  <th style={{ textAlign: "right", padding: 10, color: "#eceae8", fontFamily: "'Space Mono', monospace", fontSize: 12, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>-1</th>
                  <th style={{ textAlign: "right", padding: 10, color: "#eceae8", fontFamily: "'Space Mono', monospace", fontSize: 12, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Avg ms</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((s) => (
                  <tr key={s.day} style={{ borderBottom: "1px solid #2a2a2a" }}>
                    <td style={{ padding: 10, color: "#eceae8" }}>{s.day}</td>
                    <td style={{ textAlign: "right", padding: 10, color: "#eceae8" }}>{s.total_messages}</td>
                    <td style={{ textAlign: "right", padding: 10, color: s.deflected > 0 ? "#f0a050" : "#a8a39e" }}>
                      {s.deflected}
                    </td>
                    <td style={{ textAlign: "right", padding: 10, color: "#7dcda0" }}>{s.thumbs_up}</td>
                    <td style={{ textAlign: "right", padding: 10, color: s.thumbs_down > 0 ? "#e05555" : "#a8a39e" }}>
                      {s.thumbs_down}
                    </td>
                    <td style={{ textAlign: "right", padding: 10, color: "#a8a39e" }}>{s.avg_latency_ms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.6rem", fontWeight: 700 }}>Most asked prompts</h2>
        <p style={{ color: "#a8a39e", fontSize: 15 }}>
          Normalized by exact message text (after trim / lowercasing). Expanded prompts count separately from
          chip labels.
        </p>
        {topQuestions.length === 0 && !loading && <p style={{ color: "#6b6560", fontSize: 15 }}>No prompts in range.</p>}
        {topQuestions.map((q, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 16,
              padding: "12px 0",
              borderBottom: "1px solid #2a2a2a",
              fontSize: 15,
            }}
          >
            <span style={{ wordBreak: "break-word", color: "#eceae8" }}>{q.user_message || "—"}</span>
            <span
              style={{
                background: "rgba(196, 122, 132, 0.2)",
                color: "#c47a84",
                borderRadius: 10,
                padding: "4px 12px",
                fontSize: 14,
                fontWeight: 700,
                whiteSpace: "nowrap",
                flexShrink: 0,
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {q.cnt}×
            </span>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.6rem", fontWeight: 700 }}>Recent messages</h2>
        <p style={{ color: "#a8a39e", fontSize: 15 }}>Latest 100 turns (prompt version & feedback when present).</p>
        {recentLogs.length === 0 && !loading && <p style={{ color: "#6b6560", fontSize: 15 }}>No rows.</p>}
        {recentLogs.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #3a3a3a" }}>
                  <th style={{ textAlign: "left", padding: 10, color: "#eceae8", fontFamily: "'Space Mono', monospace", fontSize: 12, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>When (UTC)</th>
                  <th style={{ textAlign: "left", padding: 10, color: "#eceae8", fontFamily: "'Space Mono', monospace", fontSize: 12, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>User</th>
                  <th style={{ textAlign: "center", padding: 10, color: "#eceae8", fontFamily: "'Space Mono', monospace", fontSize: 12, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Defl.</th>
                  <th style={{ textAlign: "right", padding: 10, color: "#eceae8", fontFamily: "'Space Mono', monospace", fontSize: 12, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>ms</th>
                  <th style={{ textAlign: "center", padding: 10, color: "#eceae8", fontFamily: "'Space Mono', monospace", fontSize: 12, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>±</th>
                  <th style={{ textAlign: "left", padding: 10, color: "#eceae8", fontFamily: "'Space Mono', monospace", fontSize: 12, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Prompt ver.</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((r, i) => (
                  <tr key={`${r.created_at}-${i}`} style={{ borderBottom: "1px solid #2a2a2a" }}>
                    <td style={{ padding: 10, whiteSpace: "nowrap", color: "#a8a39e" }}>
                      {r.created_at ? new Date(r.created_at).toISOString().replace("T", " ").slice(0, 19) : "—"}
                    </td>
                    <td style={{ padding: 10, maxWidth: 320, wordBreak: "break-word", color: "#eceae8" }}>
                      {(r.user_message ?? "").slice(0, 200)}
                      {(r.user_message?.length ?? 0) > 200 ? "…" : ""}
                    </td>
                    <td style={{ textAlign: "center", padding: 10, color: "#a8a39e" }}>{r.was_deflected ? "Yes" : ""}</td>
                    <td style={{ textAlign: "right", padding: 10, color: "#a8a39e" }}>{r.latency_ms ?? "—"}</td>
                    <td style={{ textAlign: "center", padding: 10, color: r.feedback_rating === 1 ? "#7dcda0" : r.feedback_rating === -1 ? "#e05555" : "#a8a39e" }}>
                      {r.feedback_rating === 1 ? "+1" : r.feedback_rating === -1 ? "−1" : ""}
                    </td>
                    <td style={{ padding: 10, color: "#6b6560" }}>{r.prompt_version ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
