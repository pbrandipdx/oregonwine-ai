import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase, supabaseEnvHint } from "../lib/supabase";
import { fetchMemberWineries } from "../lib/membership";

type Winery = { id: string; name: string; slug: string };
type Fact = {
  id: string;
  fact_text: string;
  category: string;
  active: boolean;
  synced_to_chunks: boolean;
  created_at: string;
};
type Gap = {
  id: string;
  user_message: string;
  was_deflected: boolean;
  feedback_rating: number | null;
  created_at: string;
};

const CATEGORIES = [
  "general",
  "hours",
  "experience",
  "wine",
  "club",
  "policies",
  "event",
  "vineyard",
  "winemaking",
  "sustainability",
];

export function AdminPage() {
  const { session } = useAuth();
  const [wineries, setWineries] = useState<Winery[]>([]);
  const [selectedWinery, setSelectedWinery] = useState<string>("");
  const [facts, setFacts] = useState<Fact[]>([]);
  const [gaps, setGaps] = useState<Gap[]>([]);
  const [newFact, setNewFact] = useState("");
  const [newCategory, setNewCategory] = useState("general");
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState("");
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    if (!supabase || !session) {
      setLoadingMembers(false);
      return;
    }
    let cancelled = false;
    setLoadingMembers(true);
    fetchMemberWineries(supabase, session.user.id)
      .then((rows) => {
        if (cancelled) return;
        const mapped: Winery[] = rows.map((r) => ({
          id: r.winery_id,
          name: r.name,
          slug: r.slug,
        }));
        mapped.sort((a, b) => a.name.localeCompare(b.name));
        setWineries(mapped);
        setSelectedWinery((prev) =>
          mapped.some((w) => w.id === prev) ? prev : mapped[0]?.id ?? ""
        );
      })
      .catch(() => {
        if (!cancelled) setWineries([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingMembers(false);
      });
    return () => {
      cancelled = true;
    };
  }, [session]);

  const loadFacts = useCallback(async () => {
    if (!selectedWinery) return;
    const { data } = await supabase
      .from("winery_facts")
      .select("*")
      .eq("winery_id", selectedWinery)
      .order("created_at", { ascending: false });
    setFacts(data ?? []);
  }, [selectedWinery]);

  const loadGaps = useCallback(async () => {
    if (!selectedWinery) return;
    const { data } = await supabase
      .from("chat_gaps")
      .select("*")
      .eq("winery_id", selectedWinery)
      .limit(20);
    setGaps((data as Gap[]) ?? []);
  }, [selectedWinery]);

  useEffect(() => {
    loadFacts();
    loadGaps();
  }, [loadFacts, loadGaps]);

  const addFact = async () => {
    if (!newFact.trim() || !selectedWinery) return;
    setSaving(true);
    setMessage("");
    const { error } = await supabase.from("winery_facts").insert({
      winery_id: selectedWinery,
      fact_text: newFact.trim(),
      category: newCategory,
      added_by: "admin",
    });
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Fact added!");
      setNewFact("");
      loadFacts();
    }
    setSaving(false);
  };

  const syncFacts = async () => {
    if (!selectedWinery) return;
    setSyncing(true);
    setMessage("");
    const { data, error } = await supabase.rpc("sync_facts_to_chunks", {
      p_winery_id: selectedWinery,
    });
    if (error) {
      setMessage("Sync error: " + error.message);
    } else {
      setMessage(`Synced ${data} fact(s) to knowledge base.`);
      loadFacts();
    }
    setSyncing(false);
  };

  const toggleFact = async (factId: string, active: boolean) => {
    if (!supabase) return;
    await supabase.from("winery_facts").update({ active }).eq("id", factId);
    loadFacts();
  };

  if (!supabase) {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
        <h1>Winery Admin</h1>
        <p style={{ color: "#b00020" }}>{supabaseEnvHint()}</p>
      </div>
    );
  }

  if (loadingMembers) {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
        <h1>Winery Admin</h1>
        <p style={{ color: "#666" }}>Loading…</p>
      </div>
    );
  }

  if (wineries.length === 0) {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
        <h1>Winery Admin</h1>
        <p style={{ color: "#444", lineHeight: 1.6 }}>
          You don’t have access to any wineries yet. Ask OregonWine.ai to add your account to{" "}
          <code>winery_members</code>, then refresh.
        </p>
        <p>
          <Link to="/analytics">Analytics</Link> · <Link to="/">Home</Link>
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>Winery Admin</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Add facts to teach the chatbot, review unanswered questions, and sync to
        the knowledge base.
      </p>

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

      {/* Add Fact Section */}
      <section style={{ marginTop: 32 }}>
        <h2>Add a Fact</h2>
        <p style={{ color: "#666", fontSize: 14 }}>
          Add info the chatbot should know — events, policy changes, new wines,
          seasonal hours, etc.
        </p>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc" }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <textarea
          value={newFact}
          onChange={(e) => setNewFact(e.target.value)}
          placeholder="e.g. Rex Hill is hosting a harvest dinner on October 15, 2026. Tickets are $150/person and include a 5-course meal paired with library wines."
          rows={3}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 14,
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
        <div style={{ display: "flex", gap: 12, marginTop: 8, alignItems: "center" }}>
          <button
            onClick={addFact}
            disabled={saving || !newFact.trim()}
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              border: "none",
              background: "#722F37",
              color: "#fff",
              cursor: saving ? "wait" : "pointer",
              fontWeight: 600,
            }}
          >
            {saving ? "Saving..." : "Add Fact"}
          </button>
          <button
            onClick={syncFacts}
            disabled={syncing}
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              border: "1px solid #722F37",
              background: "#fff",
              color: "#722F37",
              cursor: syncing ? "wait" : "pointer",
              fontWeight: 600,
            }}
          >
            {syncing ? "Syncing..." : "Sync to Chatbot"}
          </button>
          {message && (
            <span style={{ color: message.startsWith("Error") ? "#b00020" : "#2e7d32", fontSize: 14 }}>
              {message}
            </span>
          )}
        </div>
      </section>

      {/* Existing Facts */}
      <section style={{ marginTop: 32 }}>
        <h2>Current Facts ({facts.length})</h2>
        {facts.length === 0 && <p style={{ color: "#999" }}>No facts added yet.</p>}
        {facts.map((f) => (
          <div
            key={f.id}
            style={{
              padding: 12,
              marginBottom: 8,
              borderRadius: 8,
              border: "1px solid #e0e0e0",
              background: f.active ? "#fff" : "#f5f5f5",
              opacity: f.active ? 1 : 0.6,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 8px",
                    borderRadius: 4,
                    background: "#f0e4ef",
                    fontSize: 11,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  {f.category}
                </span>
                {f.synced_to_chunks && (
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: "#e8f5e9",
                      fontSize: 11,
                      fontWeight: 600,
                      marginLeft: 6,
                    }}
                  >
                    synced
                  </span>
                )}
                <p style={{ margin: "4px 0 0", fontSize: 14 }}>{f.fact_text}</p>
              </div>
              <button
                onClick={() => toggleFact(f.id, !f.active)}
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: 12,
                  marginLeft: 12,
                }}
              >
                {f.active ? "Disable" : "Enable"}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Gap Analysis: Unanswered Questions */}
      <section style={{ marginTop: 32 }}>
        <h2>Unanswered Questions</h2>
        <p style={{ color: "#666", fontSize: 14 }}>
          Questions the chatbot couldn't answer or that got a thumbs-down. Use
          these to add missing facts above.
        </p>
        {gaps.length === 0 && <p style={{ color: "#999" }}>No gaps found yet — great!</p>}
        {gaps.map((g) => (
          <div
            key={g.id}
            style={{
              padding: 10,
              marginBottom: 6,
              borderRadius: 6,
              border: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span style={{ fontSize: 14 }}>{g.user_message}</span>
              <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>
                {new Date(g.created_at).toLocaleDateString()}{" "}
                {g.was_deflected && <span style={{ color: "#e65100" }}>deflected</span>}
                {g.feedback_rating === -1 && <span style={{ color: "#b00020" }}> thumbs down</span>}
              </div>
            </div>
            <button
              onClick={() => {
                setNewFact(`[Answering: "${g.user_message}"] `);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                padding: "4px 10px",
                borderRadius: 6,
                border: "1px solid #722F37",
                background: "#fff",
                color: "#722F37",
                cursor: "pointer",
                fontSize: 12,
                whiteSpace: "nowrap",
              }}
            >
              Add fact
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
