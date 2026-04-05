import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase, supabaseEnvHint } from "../lib/supabase";
import { SEOHead, winerySubPageSEO } from "../lib/seo";

type Winery = { id: string; name: string; slug: string };

/** Row shape for public.winery_facts (see supabase/migrations/20260328210000_initial.sql). */
type WineryFactRow = {
  id: string;
  fact_type: string | null;
  fact_value: unknown;
  source_url: string | null;
  fetched_at: string | null;
  confidence: number | null;
  in_quarantine: boolean | null;
  promoted_chunk_id: string | null;
};

type Fact = {
  id: string;
  fact_text: string;
  category: string;
  active: boolean;
  synced_to_chunks: boolean;
};

function factValueToDisplayText(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object" && v !== null && "text" in v) {
    const t = (v as { text: unknown }).text;
    if (typeof t === "string") return t;
  }
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return String(v);
  }
}

function rowToFact(row: WineryFactRow): Fact {
  return {
    id: row.id,
    fact_text: factValueToDisplayText(row.fact_value),
    category: row.fact_type ?? "general",
    active: !(row.in_quarantine ?? false),
    synced_to_chunks: row.promoted_chunk_id != null && row.promoted_chunk_id !== "",
  };
}
type Gap = {
  id: string;
  winery_id: string;
  user_message: string;
  was_deflected: boolean;
  feedback_rating: number | null;
  created_at: string;
};

function normSlug(slug: string): string {
  return String(slug).trim().toLowerCase();
}

/** Slug-only hint (e.g. gap rows before winery list loads). */
function isChehalemSlug(slug: string): boolean {
  const s = normSlug(slug);
  return s === "chehalem" || s.startsWith("chehalem-") || s.startsWith("chehalem_");
}

/** Row-aware: DB slug may not be exactly `chehalem` (legacy rows, typos). */
function isChehalemWinery(w: Pick<Winery, "slug" | "name">): boolean {
  if (isChehalemSlug(w.slug)) return true;
  return /^chehalem/i.test(String(w.name).trim());
}

function isSoterSlug(slug: string): boolean {
  return normSlug(slug) === "soter";
}

/** Not listed in the winery dropdown unless opened via an unanswered question (Soter only). */
function isHiddenFromAdminWinerySelect(w: Winery): boolean {
  return isChehalemWinery(w) || isSoterSlug(w.slug);
}

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
  const [allWineries, setAllWineries] = useState<Winery[]>([]);
  const [selectedWinery, setSelectedWinery] = useState<string>("");
  const [facts, setFacts] = useState<Fact[]>([]);
  const [gaps, setGaps] = useState<Gap[]>([]);
  const [newFact, setNewFact] = useState("");
  const [newCategory, setNewCategory] = useState("general");
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("wineries")
      .select("id, name, slug")
      .order("name")
      .then(({ data }) => {
        if (!data) return;
        setAllWineries(data);
        const visible = data.filter((w) => !isHiddenFromAdminWinerySelect(w));
        setSelectedWinery((prev) => {
          const m = data.find((w) => w.id === prev);
          if (m && isChehalemWinery(m)) return visible[0]?.id ?? "";
          if (prev && m && visible.some((w) => w.id === prev)) return prev;
          if (prev && m && isSoterSlug(m.slug)) return prev;
          return visible[0]?.id ?? "";
        });
      });
  }, []);

  useEffect(() => {
    const m = allWineries.find((w) => w.id === selectedWinery);
    if (!m || !isChehalemWinery(m)) return;
    const visible = allWineries.filter((w) => !isHiddenFromAdminWinerySelect(w));
    setSelectedWinery(visible[0]?.id ?? "");
  }, [allWineries, selectedWinery]);

  const wineryNameById = useMemo(
    () => Object.fromEntries(allWineries.map((w) => [w.id, w.name] as const)),
    [allWineries]
  );

  const winerySlugById = useMemo(
    () => Object.fromEntries(allWineries.map((w) => [w.id, w.slug] as const)),
    [allWineries]
  );

  const visibleGaps = useMemo(
    () =>
      gaps.filter((g) => {
        const w = allWineries.find((x) => x.id === g.winery_id);
        if (w) return !isChehalemWinery(w);
        const slug = winerySlugById[g.winery_id];
        return slug != null && !isChehalemSlug(slug);
      }),
    [gaps, winerySlugById, allWineries]
  );

  const winerySelectOptions = useMemo(() => {
    const visible = allWineries.filter((w) => !isHiddenFromAdminWinerySelect(w));
    const selected = allWineries.find((w) => w.id === selectedWinery);
    if (
      selected &&
      isSoterSlug(selected.slug) &&
      !visible.some((w) => w.id === selected.id)
    ) {
      return [...visible, selected];
    }
    return visible;
  }, [allWineries, selectedWinery]);

  const loadFacts = useCallback(async () => {
    if (!supabase || !selectedWinery) return;
    const { data, error } = await supabase
      .from("winery_facts")
      .select(
        "id, fact_type, fact_value, source_url, fetched_at, confidence, in_quarantine, promoted_chunk_id"
      )
      .eq("winery_id", selectedWinery)
      .order("fetched_at", { ascending: false, nullsFirst: false }); // nulls last so seeded rows without fetched_at sit below newer facts
    if (error) {
      setMessage("Error loading facts: " + error.message);
      setFacts([]);
      return;
    }
    const rows = (data ?? []) as WineryFactRow[];
    setFacts(rows.map(rowToFact));
  }, [selectedWinery]);

  const loadGaps = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("chat_gaps")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(75);
    if (error) {
      setGaps([]);
      return;
    }
    setGaps((data as Gap[]) ?? []);
  }, []);

  useEffect(() => {
    loadFacts();
  }, [loadFacts]);

  useEffect(() => {
    loadGaps();
  }, [loadGaps]);

  const addFact = async () => {
    if (!supabase || !newFact.trim() || !selectedWinery) return;
    setSaving(true);
    setMessage("");
    const { error } = await supabase.from("winery_facts").insert({
      winery_id: selectedWinery,
      fact_type: newCategory,
      fact_value: { text: newFact.trim(), source: "admin_ui" },
      source_url: null,
      fetched_at: new Date().toISOString(),
      confidence: 1.0,
      in_quarantine: false,
    });
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Fact added!");
      setNewFact("");
      loadFacts();
      loadGaps();
    }
    setSaving(false);
  };

  const syncFacts = async () => {
    if (!supabase || !selectedWinery) return;
    setSyncing(true);
    setMessage("");
    const { data, error } = await supabase.rpc("sync_facts_to_chunks", {
      p_winery_id: selectedWinery,
    });
    if (error) {
      setMessage("Sync error: " + error.message);
    } else {
      const n = typeof data === "number" ? data : Number(data);
      setMessage(`Synced ${Number.isFinite(n) ? n : 0} fact(s) to knowledge base.`);
      loadFacts();
    }
    setSyncing(false);
  };

  const toggleFact = async (factId: string, active: boolean) => {
    if (!supabase) return;
    await supabase.from("winery_facts").update({ in_quarantine: !active }).eq("id", factId);
    loadFacts();
  };

  if (!supabase) {
    return (
      <div className="admin-page">
        <h1>Winery Admin</h1>
        <p className="admin-message admin-message--err">{supabaseEnvHint()}</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <SEOHead {...winerySubPageSEO("Admin", "admin", "admin")} />
      <h1>Winery Admin</h1>
      <p className="admin-intro">
        Add facts to teach the chatbot, review unanswered questions, and sync to
        the knowledge base.
      </p>

      <label className="admin-field-label">
        Winery:{" "}
        <select
          className="admin-select"
          value={selectedWinery}
          onChange={(e) => setSelectedWinery(e.target.value)}
          style={{ padding: "6px 12px", borderRadius: 6, marginLeft: 8 }}
        >
          {winerySelectOptions.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
              {isSoterSlug(w.slug) ? " (partner)" : ""}
            </option>
          ))}
        </select>
      </label>

      {/* Add Fact Section */}
      <section style={{ marginTop: 32 }}>
        <h2>Add a Fact</h2>
        <p className="admin-section-hint">
          Add info the chatbot should know — events, policy changes, new wines,
          seasonal hours, etc.
        </p>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <select
            className="admin-select"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 8 }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <textarea
          className="admin-textarea"
          value={newFact}
          onChange={(e) => setNewFact(e.target.value)}
          placeholder="e.g. Rex Hill is hosting a harvest dinner on October 15, 2026. Tickets are $150/person and include a 5-course meal paired with library wines."
          rows={3}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            fontSize: 14,
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
        <div style={{ display: "flex", gap: 12, marginTop: 8, alignItems: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            className="admin-btn-wine"
            onClick={addFact}
            disabled={saving || !newFact.trim()}
          >
            {saving ? "Saving..." : "Add Fact"}
          </button>
          <button
            type="button"
            className="admin-btn-wine-outline"
            onClick={syncFacts}
            disabled={syncing}
          >
            {syncing ? "Syncing..." : "Sync to Chatbot"}
          </button>
          {message && (
            <span
              className={`admin-message ${/error/i.test(message) ? "admin-message--err" : "admin-message--ok"}`}
            >
              {message}
            </span>
          )}
        </div>
      </section>

      {/* Existing Facts */}
      <section style={{ marginTop: 32 }}>
        <h2>Current Facts ({facts.length})</h2>
        {facts.length === 0 && <p className="admin-empty">No facts added yet.</p>}
        {facts.map((f) => (
          <div
            key={f.id}
            className={`admin-card${f.active ? "" : " admin-card--inactive"}`}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div style={{ flex: 1 }}>
                <span className="admin-chip">{f.category}</span>
                {f.synced_to_chunks && (
                  <span className="admin-chip admin-chip--synced">synced</span>
                )}
                <p className="admin-card-text">{f.fact_text}</p>
              </div>
              <button
                type="button"
                className="admin-btn-outline"
                onClick={() => toggleFact(f.id, !f.active)}
                style={{ marginLeft: 12, flexShrink: 0 }}
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
        <p className="admin-section-hint">
          Recent questions from partners <strong>managed in this admin</strong> that
          the chatbot couldn’t answer or that got a thumbs-down. Choosing &ldquo;Add
          fact&rdquo; selects that winery (including Soter if it isn’t in the default
          list).
        </p>
        {visibleGaps.length === 0 && <p className="admin-empty">No gaps found yet — great!</p>}
        {visibleGaps.map((g) => (
          <div key={g.id} className="admin-gap-row">
            <div>
              <span className="admin-chip" style={{ marginRight: 6 }}>
                {wineryNameById[g.winery_id] ?? "Unknown winery"}
              </span>
              <span className="admin-gap-msg">{g.user_message}</span>
              <div className="admin-gap-meta">
                {new Date(g.created_at).toLocaleDateString()}{" "}
                {g.was_deflected && <span style={{ color: "#e65100" }}>deflected</span>}
                {g.feedback_rating === -1 && <span style={{ color: "#b00020" }}> thumbs down</span>}
              </div>
            </div>
            <button
              type="button"
              className="admin-btn-wine-outline"
              onClick={() => {
                setSelectedWinery(g.winery_id);
                setNewFact(`[Answering: "${g.user_message}"] `);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{ fontSize: 12, padding: "4px 10px", whiteSpace: "nowrap" }}
            >
              Add fact
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
