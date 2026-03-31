import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase, supabaseEnvHint } from "../lib/supabase";
import { fetchMemberWineries, type MemberWinery } from "../lib/membership";

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
  const { session } = useAuth();
  const navigate = useNavigate();
  const { slug: slugParam } = useParams<{ slug?: string }>();
  const slug = slugParam?.trim() || undefined;
  const [wineryMeta, setWineryMeta] = useState<WineryMeta | null>(null);
  const [wineryErr, setWineryErr] = useState<string | null>(null);
  const [wineryLoading, setWineryLoading] = useState(false);
  const [accessAllowed, setAccessAllowed] = useState<boolean | null>(null);
  const [memberWineries, setMemberWineries] = useState<MemberWinery[] | null>(null);
  const [hubErr, setHubErr] = useState<string | null>(null);
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
    if (!supabase || !session || slug) return;
    let cancelled = false;
    setHubErr(null);
    setMemberWineries(null);
    fetchMemberWineries(supabase, session.user.id)
      .then((rows) => {
        if (cancelled) return;
        setMemberWineries(rows);
        if (rows.length === 1) {
          navigate(`/analytics/${rows[0].slug}`, { replace: true });
        }
      })
      .catch((e) => {
        if (!cancelled) setHubErr(e instanceof Error ? e.message : "Could not load your account.");
      });
    return () => {
      cancelled = true;
    };
  }, [supabase, session, slug, navigate]);

  useEffect(() => {
    if (!supabase || !session || !slug || !wineryMeta) {
      setAccessAllowed(null);
      return;
    }
    let cancelled = false;
    setAccessAllowed(null);
    fetchMemberWineries(supabase, session.user.id)
      .then((rows) => {
        if (cancelled) return;
        setAccessAllowed(rows.some((r) => r.winery_id === wineryMeta.id));
      })
      .catch(() => {
        if (!cancelled) setAccessAllowed(false);
      });
    return () => {
      cancelled = true;
    };
  }, [supabase, session, slug, wineryMeta]);

  useEffect(() => {
    if (!supabase || !selectedWinery || accessAllowed !== true) return;

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
  }, [selectedWinery, sinceIso, accessAllowed]);

  if (!supabase) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
        <h1>Chat Analytics</h1>
        <p style={{ color: "#b00020" }}>{supabaseEnvHint()}</p>
      </div>
    );
  }

  if (!slug) {
    if (hubErr) {
      return (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: 24 }}>
          <h1>Chat Analytics</h1>
          <p style={{ color: "#b00020" }}>{hubErr}</p>
          <Link to="/">← Home</Link>
        </div>
      );
    }
    if (memberWineries === null) {
      return (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: 24 }}>
          <h1>Chat Analytics</h1>
          <p style={{ color: "#666" }}>Loading your wineries…</p>
        </div>
      );
    }
    if (memberWineries.length === 0) {
      return (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: 24 }}>
          <h1>Chat Analytics</h1>
          <p style={{ color: "#444", lineHeight: 1.6 }}>
            Your account is signed in, but it isn’t linked to a winery yet. After OregonWine.ai adds your
            email in Supabase (<code>winery_members</code>), refresh this page.
          </p>
          <p>
            <Link to="/">← Home</Link>
          </p>
        </div>
      );
    }
    if (memberWineries.length === 1) {
      return (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: 24 }}>
          <h1>Chat Analytics</h1>
          <p style={{ color: "#666" }}>Opening your dashboard…</p>
        </div>
      );
    }
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: 24 }}>
        <h1>Chat Analytics</h1>
        <p className="muted" style={{ marginBottom: 16 }}>
          Choose a winery to view widget metrics.
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {memberWineries.map((w) => (
            <li key={w.winery_id} style={{ marginBottom: 12 }}>
              <Link
                to={`/analytics/${w.slug}`}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: "1px solid rgba(114, 47, 55, 0.2)",
                  textDecoration: "none",
                  color: "#2d1f2e",
                  background: "#fff",
                }}
              >
                <strong>{w.name}</strong>
                <span style={{ color: "#666", marginLeft: 8 }}>({w.slug})</span>
              </Link>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 24 }}>
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

  if (accessAllowed === null) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
        <h1>Chat Analytics</h1>
        <p style={{ color: "#666" }}>Checking access…</p>
      </div>
    );
  }

  if (accessAllowed === false) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
        <h1>Chat Analytics</h1>
        <p style={{ color: "#b00020" }}>
          Your account doesn’t have access to <strong>{wineryMeta.name}</strong>. Open a dashboard for a winery
          you’re assigned to, or ask OregonWine.ai to update <code>winery_members</code>.
        </p>
        <p>
          <Link to="/analytics">Your wineries</Link> · <Link to="/">Home</Link>
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
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 20 }}>
      <h1>Chat Analytics</h1>
      <p style={{ marginBottom: 8 }}>
        <strong>{wineryMeta.name}</strong>{" "}
        <span style={{ color: "#666" }}>({wineryMeta.slug})</span>
      </p>
      <p style={{ color: "#666", fontSize: 14, marginBottom: 16 }}>
        Data from <code>chat_logs</code> for this winery only (last {LOOKBACK_DAYS} days, up to{" "}
        {MAX_ROWS.toLocaleString()} messages). Sessions also checks <code>chat_sessions</code> when populated.
      </p>

      {loadError && (
        <div
          style={{
            padding: 12,
            marginBottom: 16,
            background: "#ffebee",
            borderRadius: 8,
            color: "#b00020",
          }}
        >
          {loadError}
        </div>
      )}
      {loading && <p style={{ color: "#666" }}>Loading…</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 16,
          marginTop: 24,
        }}
      >
        {[
          { label: "Total Messages", value: totals.messages, color: "#1565c0" },
          {
            label: "Sessions (max of table / logs)",
            value: sessionDisplay,
            color: "#6a1b9a",
          },
          {
            label: "Deflection Rate",
            value: `${deflectionRate}%`,
            color: deflectionRate > 20 ? "#e65100" : "#2e7d32",
          },
          {
            label: "Satisfaction",
            value: satisfactionRate !== null ? `${satisfactionRate}%` : "N/A",
            color: "#2e7d32",
          },
          { label: "Thumbs Up", value: totals.thumbsUp, color: "#2e7d32" },
          { label: "Thumbs Down", value: totals.thumbsDown, color: "#b00020" },
          {
            label: "Avg Latency",
            value: `${totals.avgLatency}ms`,
            color: totals.avgLatency > 5000 ? "#e65100" : "#1565c0",
          },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              padding: 16,
              borderRadius: 12,
              background: "#fff",
              border: "1px solid #e0e0e0",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700, color: card.color }}>{card.value}</div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{card.label}</div>
          </div>
        ))}
      </div>

      <section style={{ marginTop: 32 }}>
        <h2>Daily breakdown</h2>
        <p style={{ color: "#666", fontSize: 14 }}>
          Aggregated from message timestamps (UTC date). Empty days are omitted.
        </p>
        {stats.length === 0 && !loading && <p style={{ color: "#999" }}>No chat logs for this winery in range.</p>}
        {stats.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 520 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #ddd" }}>
                  <th style={{ textAlign: "left", padding: 8 }}>Date (UTC)</th>
                  <th style={{ textAlign: "right", padding: 8 }}>Messages</th>
                  <th style={{ textAlign: "right", padding: 8 }}>Deflected</th>
                  <th style={{ textAlign: "right", padding: 8 }}>+1</th>
                  <th style={{ textAlign: "right", padding: 8 }}>-1</th>
                  <th style={{ textAlign: "right", padding: 8 }}>Avg ms</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((s) => (
                  <tr key={s.day} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: 8 }}>{s.day}</td>
                    <td style={{ textAlign: "right", padding: 8 }}>{s.total_messages}</td>
                    <td style={{ textAlign: "right", padding: 8, color: s.deflected > 0 ? "#e65100" : "inherit" }}>
                      {s.deflected}
                    </td>
                    <td style={{ textAlign: "right", padding: 8, color: "#2e7d32" }}>{s.thumbs_up}</td>
                    <td style={{ textAlign: "right", padding: 8, color: s.thumbs_down > 0 ? "#b00020" : "inherit" }}>
                      {s.thumbs_down}
                    </td>
                    <td style={{ textAlign: "right", padding: 8 }}>{s.avg_latency_ms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Most asked prompts</h2>
        <p style={{ color: "#666", fontSize: 14 }}>
          Normalized by exact message text (after trim / lowercasing). Expanded prompts count separately from
          chip labels.
        </p>
        {topQuestions.length === 0 && !loading && <p style={{ color: "#999" }}>No prompts in range.</p>}
        {topQuestions.map((q, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              padding: "8px 0",
              borderBottom: "1px solid #eee",
              fontSize: 14,
            }}
          >
            <span style={{ wordBreak: "break-word" }}>{q.user_message || "—"}</span>
            <span
              style={{
                background: "#f0e4ef",
                borderRadius: 10,
                padding: "2px 10px",
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {q.cnt}×
            </span>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Recent messages</h2>
        <p style={{ color: "#666", fontSize: 14 }}>Latest 100 turns (prompt version & feedback when present).</p>
        {recentLogs.length === 0 && !loading && <p style={{ color: "#999" }}>No rows.</p>}
        {recentLogs.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #ddd" }}>
                  <th style={{ textAlign: "left", padding: 8 }}>When (UTC)</th>
                  <th style={{ textAlign: "left", padding: 8 }}>User</th>
                  <th style={{ textAlign: "center", padding: 8 }}>Defl.</th>
                  <th style={{ textAlign: "right", padding: 8 }}>ms</th>
                  <th style={{ textAlign: "center", padding: 8 }}>±</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Prompt ver.</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((r, i) => (
                  <tr key={`${r.created_at}-${i}`} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: 8, whiteSpace: "nowrap" }}>
                      {r.created_at ? new Date(r.created_at).toISOString().replace("T", " ").slice(0, 19) : "—"}
                    </td>
                    <td style={{ padding: 8, maxWidth: 320, wordBreak: "break-word" }}>
                      {(r.user_message ?? "").slice(0, 200)}
                      {(r.user_message?.length ?? 0) > 200 ? "…" : ""}
                    </td>
                    <td style={{ textAlign: "center", padding: 8 }}>{r.was_deflected ? "Yes" : ""}</td>
                    <td style={{ textAlign: "right", padding: 8 }}>{r.latency_ms ?? "—"}</td>
                    <td style={{ textAlign: "center", padding: 8 }}>
                      {r.feedback_rating === 1 ? "+1" : r.feedback_rating === -1 ? "−1" : ""}
                    </td>
                    <td style={{ padding: 8 }}>{r.prompt_version ?? "—"}</td>
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
