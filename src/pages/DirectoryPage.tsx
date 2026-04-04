import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, supabaseEnvHint } from "../lib/supabase";
import { formatCents } from "../lib/format";

type WineryRow = {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  ava: string | null;
  description: string | null;
  tasting_fee_min: number | null;
  tasting_fee_max: number | null;
};

export function DirectoryPage() {
  const [rows, setRows] = useState<WineryRow[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setErr(supabaseEnvHint());
      return;
    }
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("wineries")
        .select(
          "id, name, slug, city, ava, description, tasting_fee_min, tasting_fee_max"
        )
        .eq("status", "active")
        .order("name");
      if (cancelled) return;
      if (error) setErr(error.message);
      else setRows(data ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (err) {
    return (
      <div className="panel panel-warn">
        <h1>Directory</h1>
        <p>{err}</p>
      </div>
    );
  }

  if (!rows) {
    return (
      <div className="panel">
        <p>Loading wineries…</p>
      </div>
    );
  }

  return (
    <div>
      <header className="page-head">
        <h1>Winery directory</h1>
        <p className="muted">Public listings (RLS read). Partner widgets use their own API keys.</p>
      </header>
      <ul className="card-grid">
        {rows.map((w) => (
          <li key={w.id}>
            <Link className="card" to={`/w/${w.slug}`}>
              <h2>{w.name}</h2>
              <p className="muted">
                {[w.city, w.ava].filter(Boolean).join(" · ") || "Willamette Valley"}
              </p>
              {w.description && <p className="card-desc">{w.description}</p>}
              {(w.tasting_fee_min != null || w.tasting_fee_max != null) && (
                <p className="fee">
                  Tasting from{" "}
                  {formatCents(w.tasting_fee_min ?? w.tasting_fee_max) ?? "—"}
                  {w.tasting_fee_max != null &&
                    w.tasting_fee_min != null &&
                    w.tasting_fee_max !== w.tasting_fee_min &&
                    ` – ${formatCents(w.tasting_fee_max)}`}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
      {rows.length === 0 && <p className="muted">No active wineries yet.</p>}
    </div>
  );
}
