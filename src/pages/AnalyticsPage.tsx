import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Winery = { id: string; name: string };
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

export function AnalyticsPage() {
  const [wineries, setWineries] = useState<Winery[]>([]);
  const [selectedWinery, setSelectedWinery] = useState("");
  const [stats, setStats] = useState<DayStat[]>([]);
  const [topQuestions, setTopQuestions] = useState<TopQuestion[]>([]);
  const [totals, setTotals] = useState({
    messages: 0,
    sessions: 0,
    deflected: 0,
    thumbsUp: 0,
    thumbsDown: 0,
    avgLatency: 0,
  });

  useEffect(() => {
    supabase
      .from("wineries")
      .select("id, name")
      .order("name")
      .then(({ data }) => {
        if (data) {
          setWineries(data);
          if (data.length > 0) setSelectedWinery(data[0].id);
        }
      });
  }, []);

  useEffect(() => {
    if (!selectedWinery) return;

    // Load daily analytics
    supabase
      .from("chat_analytics")
      .select("*")
      .eq("winery_id", selectedWinery)
      .limit(30)
      .then(({ data }) => {
        const rows = (data ?? []) as DayStat[];
        setStats(rows);

        // Calculate totals
        const messages = rows.reduce((s, r) => s + r.total_messages, 0);
        const deflected = rows.reduce((s, r) => s + r.deflected, 0);
        const thumbsUp = rows.reduce((s, r) => s + r.thumbs_up, 0);
        const thumbsDown = rows.reduce((s, r) => s + r.thumbs_down, 0);
        const avgLatency =
          rows.length > 0
            ? Math.round(rows.reduce((s, r) => s + r.avg_latency_ms, 0) / rows.length)
            : 0;

        setTotals({ messages, sessions: 0, deflected, thumbsUp, thumbsDown, avgLatency });
      });

    // Load top questions
    supabase
      .from("chat_logs")
      .select("user_message")
      .eq("winery_id", selectedWinery)
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => {
        if (!data) return;
        const counts = new Map<string, number>();
        for (const row of data) {
          const q = (row.user_message as string).toLowerCase().trim();
          counts.set(q, (counts.get(q) ?? 0) + 1);
        }
        const sorted = Array.from(counts.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 15)
          .map(([user_message, cnt]) => ({ user_message, cnt }));
        setTopQuestions(sorted);
      });

    // Load session count
    supabase
      .from("chat_sessions")
      .select("id", { count: "exact", head: true })
      .eq("winery_id", selectedWinery)
      .then(({ count }) => {
        setTotals((t) => ({ ...t, sessions: count ?? 0 }));
      });
  }, [selectedWinery]);

  const satisfactionRate =
    totals.thumbsUp + totals.thumbsDown > 0
      ? Math.round((totals.thumbsUp / (totals.thumbsUp + totals.thumbsDown)) * 100)
      : null;

  const deflectionRate =
    totals.messages > 0 ? Math.round((totals.deflected / totals.messages) * 100) : 0;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1>Chat Analytics</h1>

      <label style={{ fontWeight: 600 }}>
        Winery:{" "}
        <select
          value={selectedWinery}
          onChange={(e) => setSelectedWinery(e.target.value)}
          style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #ccc", marginLeft: 8 }}
        >
          {wineries.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
      </label>

      {/* Summary Cards */}
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
          { label: "Unique Sessions", value: totals.sessions, color: "#6a1b9a" },
          { label: "Deflection Rate", value: `${deflectionRate}%`, color: deflectionRate > 20 ? "#e65100" : "#2e7d32" },
          { label: "Satisfaction", value: satisfactionRate !== null ? `${satisfactionRate}%` : "N/A", color: "#2e7d32" },
          { label: "Thumbs Up", value: totals.thumbsUp, color: "#2e7d32" },
          { label: "Thumbs Down", value: totals.thumbsDown, color: "#b00020" },
          { label: "Avg Latency", value: `${totals.avgLatency}ms`, color: totals.avgLatency > 5000 ? "#e65100" : "#1565c0" },
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

      {/* Daily Breakdown */}
      <section style={{ marginTop: 32 }}>
        <h2>Daily Breakdown (Last 30 Days)</h2>
        {stats.length === 0 && <p style={{ color: "#999" }}>No data yet.</p>}
        {stats.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ddd" }}>
                <th style={{ textAlign: "left", padding: 8 }}>Date</th>
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
                  <td style={{ padding: 8 }}>{new Date(s.day).toLocaleDateString()}</td>
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
        )}
      </section>

      {/* Top Questions */}
      <section style={{ marginTop: 32 }}>
        <h2>Most Asked Questions</h2>
        <p style={{ color: "#666", fontSize: 14 }}>
          The most common questions visitors ask. Use this to prioritize what
          content to keep fresh.
        </p>
        {topQuestions.length === 0 && <p style={{ color: "#999" }}>No questions logged yet.</p>}
        {topQuestions.map((q, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
              fontSize: 14,
            }}
          >
            <span>{q.user_message}</span>
            <span
              style={{
                background: "#f0e4ef",
                borderRadius: 10,
                padding: "2px 10px",
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: "nowrap",
                marginLeft: 12,
              }}
            >
              {q.cnt}x
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
