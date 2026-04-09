import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase, supabaseEnvHint } from "../lib/supabase";

type WineryData = {
  id: string;
  name: string;
  slug: string;
  status: string;
};

type WidgetAccountData = {
  id: string;
  winery_id: string;
  plan: string;
  active: boolean;
};

type ChatLogRow = {
  id: string;
  created_at: string;
  winery_id: string | null;
  user_message: string | null;
  was_deflected: boolean | null;
  latency_ms: number | null;
  feedback_rating: number | null;
};

type ChatSessionRow = {
  id: string;
  started_at: string;
  winery_id: string | null;
};

type WineryChunkRow = {
  id: string;
  winery_id: string | null;
  chunk_type: string | null;
};

type DayMetric = {
  day: string;
  count: number;
};

type PerWineryStats = {
  winery_id: string;
  winery_name: string;
  winery_slug: string;
  plan: string;
  messages: number;
  sessions: number;
  deflected: number;
  thumbs_up: number;
  thumbs_down: number;
  avg_latency: number;
  chunks: number;
};

type TopQuestion = {
  question: string;
  count: number;
};

type ContentGapRow = {
  id: string;
  winery_id: string;
  gap_summary: string;
  frequency: number;
  status: string;
};

export function DashboardPage() {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("dash_unlocked") === "1");
  const [pw, setPw] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (pw.trim().toLowerCase() === "jory") {
      setUnlocked(true);
      sessionStorage.setItem("dash_unlocked", "1");
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [pw]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Summary cards
  const [totalWineries, setTotalWineries] = useState(0);
  const [activeAccounts, setActiveAccounts] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [deflectionRate, setDeflectionRate] = useState(0);
  const [satisfactionRate, setSatisfactionRate] = useState<number | null>(null);
  const [avgLatency, setAvgLatency] = useState(0);

  // Sections
  const [perWineryStats, setPerWineryStats] = useState<PerWineryStats[]>([]);
  const [messagesOverTime, setMessagesOverTime] = useState<DayMetric[]>([]);
  const [topQuestions, setTopQuestions] = useState<TopQuestion[]>([]);
  const [recentActivity, setRecentActivity] = useState<(ChatLogRow & { winery_name: string })[]>([]);
  const [contentGaps, setContentGaps] = useState<ContentGapRow[]>([]);
  const [chunksPerWinery, setChunksPerWinery] = useState<{ label: string; count: number }[]>([]);
  const [chunkTypeDistribution, setChunkTypeDistribution] = useState<{ type: string; count: number }[]>([]);

  useEffect(() => {
    if (!supabase) {
      setLoadError(supabaseEnvHint());
      setLoading(false);
      return;
    }
    const sb = supabase;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setLoadError(null);

        // 1. Get all active wineries
        const { data: wineries, error: wineriesErr } = await sb
          .from("wineries")
          .select("id, name, slug, status")
          .eq("status", "active");
        if (wineriesErr) { console.error("wineries query failed:", wineriesErr); throw new Error(`wineries: ${wineriesErr.message}`); }
        const wineryList = (wineries as WineryData[]) || [];
        setTotalWineries(wineryList.length);

        // 2. Get widget accounts
        const { data: accounts, error: accountsErr } = await sb
          .from("widget_accounts")
          .select("id, winery_id, plan, active");
        if (accountsErr) { console.error("widget_accounts query failed:", accountsErr); throw new Error(`widget_accounts: ${accountsErr.message}`); }
        const accountsList = (accounts as WidgetAccountData[]) || [];
        const activeAccts = accountsList.filter((a) => a.active).length;
        setActiveAccounts(activeAccts);

        // 3. Get all chat logs
        const { data: chatLogs, error: logsErr } = await sb
          .from("chat_logs")
          .select(
            "id, created_at, winery_id, user_message, was_deflected, latency_ms, feedback_rating"
          )
          .order("created_at", { ascending: false })
          .limit(5000);
        if (logsErr) { console.error("chat_logs query failed:", logsErr); throw new Error(`chat_logs: ${logsErr.message}`); }
        const logsList = (chatLogs as ChatLogRow[]) || [];
        setTotalMessages(logsList.length);

        // 4. Get all chat sessions
        const { data: sessions, error: sessionsErr } = await sb
          .from("chat_sessions")
          .select("id, started_at, winery_id");
        if (sessionsErr) { console.error("chat_sessions query failed:", sessionsErr); throw new Error(`chat_sessions: ${sessionsErr.message}`); }
        const sessionsList = (sessions as ChatSessionRow[]) || [];
        setTotalSessions(sessionsList.length);

        // 5. Get all chunks
        const { data: chunks, error: chunksErr } = await sb
          .from("winery_chunks")
          .select("id, winery_id, chunk_type");
        if (chunksErr) { console.error("winery_chunks query failed:", chunksErr); throw new Error(`winery_chunks: ${chunksErr.message}`); }
        const chunksList = (chunks as WineryChunkRow[]) || [];
        setTotalChunks(chunksList.length);

        // 6. Get content gaps
        const { data: gaps, error: gapsErr } = await sb
          .from("content_gaps")
          .select("id, winery_id, gap_summary, frequency, status");
        if (gapsErr) { console.error("content_gaps query failed:", gapsErr); throw new Error(`content_gaps: ${gapsErr.message}`); }
        const gapsList = (gaps as ContentGapRow[]) || [];
        setContentGaps(gapsList);

        // Calculate aggregates from logs
        let deflected = 0;
        let thumbsUp = 0;
        let thumbsDown = 0;
        let latSum = 0;
        let latCount = 0;
        const questionMap = new Map<string, number>();

        for (const log of logsList) {
          if (log.was_deflected) deflected += 1;
          if (log.feedback_rating === 1) thumbsUp += 1;
          if (log.feedback_rating === -1) thumbsDown += 1;
          if (log.latency_ms != null && log.latency_ms > 0) {
            latSum += log.latency_ms;
            latCount += 1;
          }
          if (log.user_message) {
            const q = log.user_message.toLowerCase().trim();
            if (q) {
              questionMap.set(q, (questionMap.get(q) ?? 0) + 1);
            }
          }
        }

        const deflRate =
          logsList.length > 0 ? Math.round((deflected / logsList.length) * 100) : 0;
        setDeflectionRate(deflRate);

        const satRate =
          thumbsUp + thumbsDown > 0
            ? Math.round((thumbsUp / (thumbsUp + thumbsDown)) * 100)
            : null;
        setSatisfactionRate(satRate);

        const avgLat = latCount > 0 ? Math.round(latSum / latCount) : 0;
        setAvgLatency(avgLat);

        // Top questions
        const topQs = Array.from(questionMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 20)
          .map(([question, count]) => ({ question, count }));
        setTopQuestions(topQs);

        // Messages over time (last 30 days, CSS bar chart)
        const dayMap = new Map<string, number>();
        const now = new Date();
        for (let i = 0; i < 30; i++) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          const day = d.toISOString().slice(0, 10);
          dayMap.set(day, 0);
        }
        for (const log of logsList) {
          if (log.created_at) {
            const day = log.created_at.slice(0, 10);
            if (dayMap.has(day)) {
              dayMap.set(day, (dayMap.get(day) ?? 0) + 1);
            }
          }
        }
        const sorted = Array.from(dayMap.entries())
          .sort((a, b) => (a[0] < b[0] ? 1 : -1))
          .map(([day, count]) => ({ day, count }));
        setMessagesOverTime(sorted);

        // Recent activity (last 50)
        const recent = logsList.slice(0, 50).map((log) => {
          const winery = wineryList.find((w) => w.id === log.winery_id);
          return {
            ...log,
            winery_name: winery?.name ?? "Unknown",
          };
        });
        setRecentActivity(recent);

        // Per-winery breakdown
        const statsMap = new Map<string, PerWineryStats>();
        for (const winery of wineryList) {
          const account = accountsList.find((a) => a.winery_id === winery.id);
          statsMap.set(winery.id, {
            winery_id: winery.id,
            winery_name: winery.name,
            winery_slug: winery.slug,
            plan: account?.plan ?? "N/A",
            messages: 0,
            sessions: 0,
            deflected: 0,
            thumbs_up: 0,
            thumbs_down: 0,
            avg_latency: 0,
            chunks: 0,
          });
        }

        for (const log of logsList) {
          if (log.winery_id && statsMap.has(log.winery_id)) {
            const s = statsMap.get(log.winery_id)!;
            s.messages += 1;
            if (log.was_deflected) s.deflected += 1;
            if (log.feedback_rating === 1) s.thumbs_up += 1;
            if (log.feedback_rating === -1) s.thumbs_down += 1;
            if (log.latency_ms != null && log.latency_ms > 0) {
              s.avg_latency += log.latency_ms;
            }
          }
        }

        for (const session of sessionsList) {
          if (session.winery_id && statsMap.has(session.winery_id)) {
            statsMap.get(session.winery_id)!.sessions += 1;
          }
        }

        for (const chunk of chunksList) {
          if (chunk.winery_id && statsMap.has(chunk.winery_id)) {
            statsMap.get(chunk.winery_id)!.chunks += 1;
          }
        }

        // Normalize averages and sort
        const sortedStats = Array.from(statsMap.values())
          .map((s) => ({
            ...s,
            avg_latency: s.messages > 0 ? Math.round(s.avg_latency / s.messages) : 0,
          }))
          .sort((a, b) => (a.winery_name < b.winery_name ? -1 : 1));
        setPerWineryStats(sortedStats);

        // Knowledge base: chunks per winery
        const chunksByWinery = new Map<string, number>();
        let sharedChunks = 0;
        for (const chunk of chunksList) {
          if (chunk.winery_id) {
            chunksByWinery.set(chunk.winery_id, (chunksByWinery.get(chunk.winery_id) ?? 0) + 1);
          } else {
            sharedChunks += 1;
          }
        }
        const chunksPerWineryList: { label: string; count: number }[] = [];
        for (const winery of wineryList) {
          const count = chunksByWinery.get(winery.id) ?? 0;
          if (count > 0) {
            chunksPerWineryList.push({ label: winery.name, count });
          }
        }
        if (sharedChunks > 0) {
          chunksPerWineryList.push({ label: "Regional / Shared", count: sharedChunks });
        }
        chunksPerWineryList.sort((a, b) => b.count - a.count);
        setChunksPerWinery(chunksPerWineryList);

        // Chunk type distribution
        const typeMap = new Map<string, number>();
        for (const chunk of chunksList) {
          const t = chunk.chunk_type ?? "unknown";
          typeMap.set(t, (typeMap.get(t) ?? 0) + 1);
        }
        const typeList = Array.from(typeMap.entries())
          .map(([type, count]) => ({ type, count }))
          .sort((a, b) => b.count - a.count);
        setChunkTypeDistribution(typeList);

        setLoading(false);
      } catch (err: any) {
        console.error("Dashboard load error:", err);
        const msg =
          err?.message ?? err?.details ?? err?.hint ?? JSON.stringify(err) ?? "Unknown error";
        setLoadError(msg);
        setLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  if (!supabase) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: 24, color: "#eceae8" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.2rem" }}>
          Internal Dashboard
        </h1>
        <p style={{ color: "#b00020" }}>{supabaseEnvHint()}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24, color: "#eceae8" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.2rem" }}>
          Internal Dashboard
        </h1>
        <p style={{ color: "#a8a39e" }}>Loading…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: 24, color: "#eceae8" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.2rem" }}>
          Internal Dashboard
        </h1>
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
      </div>
    );
  }

  const maxMessagesPerDay = Math.max(...messagesOverTime.map((m) => m.count), 1);
  const maxChunkCount = Math.max(...chunksPerWinery.map((c) => c.count), 1);

  return (
    <>
      {/* ── Password gate ─────────────────────────────────── */}
      {!unlocked && (
        <div className="dash-gate">
          <div className="dash-gate-box-wrapper">
            <div className={`dash-gate-box${shake ? " dash-gate-shake" : ""}`}>
              <h2 className="dash-gate-title">Internal Dashboard</h2>
              <p className="dash-gate-desc">Enter the password to view analytics.</p>
              <form onSubmit={handleSubmit} className="dash-gate-form">
                <input
                  type="password"
                  className="dash-gate-input"
                  placeholder="Password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="dash-gate-btn">Unlock</button>
              </form>
              <button
                type="button"
                className="dash-gate-back"
                onClick={() => navigate(-1)}
              >
                &larr; Go Back
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .dash-gate {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(18px);
          background: rgba(8, 8, 8, 0.75);
        }
        .dash-gate-box-wrapper {
          width: 100%;
          max-width: 400px;
          padding: 0 24px;
        }
        .dash-gate-box {
          background: #111;
          border: 1px solid #2a2a2a;
          border-radius: 16px;
          padding: 40px 32px;
          text-align: center;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        }
        .dash-gate-title {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 1.6rem;
          font-weight: 600;
          margin: 0 0 8px;
          color: #eceae8;
        }
        .dash-gate-desc {
          font-size: 0.9rem;
          color: #a8a39e;
          margin: 0 0 24px;
        }
        .dash-gate-form {
          display: flex;
          gap: 8px;
        }
        .dash-gate-input {
          flex: 1;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid #2a2a2a;
          background: #0a0a0a;
          color: #eceae8;
          font-family: "Space Mono", monospace;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.15s;
        }
        .dash-gate-input:focus {
          border-color: #c47a84;
        }
        .dash-gate-btn {
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          background: #c47a84;
          color: #080808;
          font-family: "Space Mono", monospace;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.15s;
        }
        .dash-gate-btn:hover {
          background: #d48a94;
        }
        .dash-gate-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 20px;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid #2a2a2a;
          background: transparent;
          color: #a8a39e;
          font-family: "Space Mono", monospace;
          font-size: 0.75rem;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .dash-gate-back:hover {
          color: #eceae8;
          border-color: #444;
          background: rgba(255,255,255,0.05);
        }
        .dash-gate-shake {
          animation: dash-shake 0.4s ease;
        }
        @keyframes dash-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-12px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(6px); }
        }
      `}</style>

      {unlocked && (
    <div
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "24px 20px",
        color: "#eceae8",
        background: "#0e0e0e",
      }}
    >
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "2.2rem",
          fontWeight: 700,
          marginBottom: 8,
        }}
      >
        Internal Analytics Dashboard
      </h1>
      <p style={{ color: "#a8a39e", fontSize: 15, marginBottom: 24 }}>
        Aggregated data across all wineries and accounts
      </p>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          marginBottom: 40,
        }}
      >
        {[
          { label: "Active Wineries", value: totalWineries, color: "#6db3f2" },
          { label: "Active Accounts", value: activeAccounts, color: "#c47a84" },
          { label: "Total Messages", value: totalMessages, color: "#6db3f2" },
          { label: "Total Sessions", value: totalSessions, color: "#c47a84" },
          {
            label: "Deflection Rate",
            value: `${deflectionRate}%`,
            color: deflectionRate > 20 ? "#f0a050" : "#7dcda0",
          },
          {
            label: "Satisfaction Rate",
            value: satisfactionRate !== null ? `${satisfactionRate}%` : "N/A",
            color: "#7dcda0",
          },
          { label: "Avg Latency", value: `${avgLatency}ms`, color: "#6db3f2" },
          { label: "Knowledge Chunks", value: totalChunks, color: "#7dcda0" },
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
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: card.color,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {card.value}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#a8a39e",
                marginTop: 8,
                fontFamily: "'Space Mono', monospace",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* Per-Winery Breakdown */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Per-Winery Breakdown
        </h2>
        {perWineryStats.length === 0 ? (
          <p style={{ color: "#6b6560", fontSize: 15 }}>No winery data.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, minWidth: 800 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #3a3a3a" }}>
                  {["Winery", "Plan", "Messages", "Sessions", "Deflection %", "Satisfaction %", "Avg Latency", "Chunks"].map((col) => (
                    <th
                      key={col}
                      style={{
                        textAlign: "left",
                        padding: 10,
                        color: "#eceae8",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        fontWeight: 600,
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {perWineryStats.map((stat) => {
                  const deflRate = stat.messages > 0 ? Math.round((stat.deflected / stat.messages) * 100) : 0;
                  const satRate = stat.thumbs_up + stat.thumbs_down > 0 ? Math.round((stat.thumbs_up / (stat.thumbs_up + stat.thumbs_down)) * 100) : 0;
                  return (
                    <tr key={stat.winery_id} style={{ borderBottom: "1px solid #2a2a2a" }}>
                      <td style={{ padding: 10, color: "#eceae8" }}>
                        <Link
                          to={`/${stat.winery_slug}/analytics`}
                          style={{
                            color: "#6db3f2",
                            textDecoration: "none",
                            borderBottom: "1px solid transparent",
                            transition: "border-color 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.borderBottomColor = "#6db3f2";
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.borderBottomColor = "transparent";
                          }}
                        >
                          {stat.winery_name}
                        </Link>
                      </td>
                      <td style={{ padding: 10, color: "#a8a39e", fontSize: 14 }}>{stat.plan}</td>
                      <td style={{ padding: 10, color: "#eceae8" }}>{stat.messages}</td>
                      <td style={{ padding: 10, color: "#eceae8" }}>{stat.sessions}</td>
                      <td
                        style={{
                          padding: 10,
                          color: deflRate > 20 ? "#f0a050" : "#7dcda0",
                        }}
                      >
                        {deflRate}%
                      </td>
                      <td style={{ padding: 10, color: "#7dcda0" }}>{satRate}%</td>
                      <td style={{ padding: 10, color: "#a8a39e" }}>{stat.avg_latency}ms</td>
                      <td style={{ padding: 10, color: "#eceae8" }}>{stat.chunks}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Messages Over Time */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Messages Over Time (Last 30 Days)
        </h2>
        {messagesOverTime.length === 0 ? (
          <p style={{ color: "#6b6560", fontSize: 15 }}>No message data.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <div style={{ display: "flex", gap: 2, alignItems: "flex-end", minHeight: 200, padding: "20px 0" }}>
              {messagesOverTime.map((m) => {
                const height = Math.max((m.count / maxMessagesPerDay) * 180, 4);
                return (
                  <div
                    key={m.day}
                    style={{
                      flex: 1,
                      minWidth: 20,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: `${height}px`,
                        background: "#6db3f2",
                        borderRadius: "3px 3px 0 0",
                        transition: "background 0.2s",
                        cursor: "pointer",
                      }}
                      title={`${m.day}: ${m.count} messages`}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.background = "#7dcda0";
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.background = "#6db3f2";
                      }}
                    />
                    <div
                      style={{
                        fontSize: 10,
                        color: "#6b6560",
                        transform: "rotate(-45deg)",
                        transformOrigin: "center",
                        whiteSpace: "nowrap",
                        width: 40,
                      }}
                    >
                      {m.day.slice(5)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Top Questions */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Top Questions (All Wineries)
        </h2>
        {topQuestions.length === 0 ? (
          <p style={{ color: "#6b6560", fontSize: 15 }}>No questions.</p>
        ) : (
          <div>
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
                <span style={{ wordBreak: "break-word", color: "#eceae8", flex: 1 }}>
                  {q.question || "—"}
                </span>
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
                  {q.count}×
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Content Gaps */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Content Gaps
        </h2>
        {contentGaps.length === 0 ? (
          <p style={{ color: "#6b6560", fontSize: 15 }}>No content gaps.</p>
        ) : (
          <div>
            {contentGaps.map((gap) => (
              <div
                key={gap.id}
                style={{
                  padding: 12,
                  marginBottom: 12,
                  background: "rgba(240, 160, 80, 0.1)",
                  border: "1px solid rgba(240, 160, 80, 0.2)",
                  borderRadius: 6,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12 }}>
                  <div>
                    <p style={{ color: "#eceae8", margin: 0, marginBottom: 4, fontSize: 15 }}>
                      {gap.gap_summary}
                    </p>
                    <p style={{ color: "#a8a39e", margin: 0, fontSize: 13 }}>
                      Status: <span style={{ color: "#c47a84", fontWeight: 600 }}>{gap.status}</span> | Frequency:{" "}
                      <span style={{ color: "#f0a050", fontWeight: 600 }}>{gap.frequency}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recent Activity Feed */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Recent Activity (Last 50 Messages)
        </h2>
        {recentActivity.length === 0 ? (
          <p style={{ color: "#6b6560", fontSize: 15 }}>No activity.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 1000 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #3a3a3a" }}>
                  {["Timestamp", "Winery", "User Message", "Deflected", "Feedback"].map((col) => (
                    <th
                      key={col}
                      style={{
                        textAlign: "left",
                        padding: 10,
                        color: "#eceae8",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        fontWeight: 600,
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((log, i) => (
                  <tr key={`${log.created_at}-${i}`} style={{ borderBottom: "1px solid #2a2a2a" }}>
                    <td style={{ padding: 10, whiteSpace: "nowrap", color: "#a8a39e", fontSize: 12 }}>
                      {log.created_at
                        ? new Date(log.created_at).toISOString().replace("T", " ").slice(0, 19)
                        : "—"}
                    </td>
                    <td style={{ padding: 10, color: "#c47a84", fontWeight: 600, fontSize: 13 }}>
                      {log.winery_name}
                    </td>
                    <td style={{ padding: 10, maxWidth: 400, wordBreak: "break-word", color: "#eceae8" }}>
                      {(log.user_message ?? "").slice(0, 150)}
                      {(log.user_message?.length ?? 0) > 150 ? "…" : ""}
                    </td>
                    <td style={{ padding: 10, color: log.was_deflected ? "#f0a050" : "#a8a39e" }}>
                      {log.was_deflected ? "Yes" : "No"}
                    </td>
                    <td
                      style={{
                        padding: 10,
                        color:
                          log.feedback_rating === 1
                            ? "#7dcda0"
                            : log.feedback_rating === -1
                              ? "#e05555"
                              : "#a8a39e",
                      }}
                    >
                      {log.feedback_rating === 1 ? "👍" : log.feedback_rating === -1 ? "👎" : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Knowledge Base Health */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Knowledge Base Health
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Chunks per Winery */}
          <div>
            <h3 style={{ fontSize: 14, color: "#eceae8", marginBottom: 12, fontFamily: "'Space Mono', monospace", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Chunks per Winery
            </h3>
            {chunksPerWinery.length === 0 ? (
              <p style={{ color: "#6b6560", fontSize: 15 }}>No chunks.</p>
            ) : (
              <div>
                {chunksPerWinery.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      padding: "8px 0",
                      borderBottom: "1px solid #2a2a2a",
                    }}
                  >
                    <span style={{ color: "#eceae8", fontSize: 14 }}>{item.label}</span>
                    <div
                      style={{
                        flex: 1,
                        height: 8,
                        background: "#2a2a2a",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${(item.count / maxChunkCount) * 100}%`,
                          background: "#7dcda0",
                          transition: "width 0.2s",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        color: "#a8a39e",
                        fontSize: 13,
                        fontFamily: "'Space Mono', monospace",
                        minWidth: 40,
                        textAlign: "right",
                      }}
                    >
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Chunk Type Distribution */}
          <div>
            <h3 style={{ fontSize: 14, color: "#eceae8", marginBottom: 12, fontFamily: "'Space Mono', monospace", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Chunk Type Distribution
            </h3>
            {chunkTypeDistribution.length === 0 ? (
              <p style={{ color: "#6b6560", fontSize: 15 }}>No chunk types.</p>
            ) : (
              <div>
                {chunkTypeDistribution.map((item) => (
                  <div
                    key={item.type}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      padding: "8px 0",
                      borderBottom: "1px solid #2a2a2a",
                    }}
                  >
                    <span style={{ color: "#eceae8", fontSize: 14 }}>
                      {item.type || "—"}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: 8,
                        background: "#2a2a2a",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${(item.count / Math.max(...chunkTypeDistribution.map((c) => c.count), 1)) * 100}%`,
                          background: "#c47a84",
                          transition: "width 0.2s",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        color: "#a8a39e",
                        fontSize: 13,
                        fontFamily: "'Space Mono', monospace",
                        minWidth: 40,
                        textAlign: "right",
                      }}
                    >
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
      )}
    </>
  );
}
