import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase, supabaseEnvHint } from "../lib/supabase";
import { formatCents } from "../lib/format";

type Winery = {
  id: string;
  name: string;
  slug: string;
  website: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  phone: string | null;
  email: string | null;
  ava: string | null;
  description: string | null;
  reservation_required: boolean | null;
  dogs_allowed: boolean | null;
  tasting_fee_min: number | null;
  tasting_fee_max: number | null;
  established_year: number | null;
};

type Fact = {
  id: string;
  fact_type: string | null;
  fact_value: unknown;
  source_url: string | null;
};

export type WineryPageProps = { slug?: string };

export function WineryPage({ slug: slugProp }: WineryPageProps = {}) {
  const { slug: slugParam } = useParams<{ slug: string }>();
  const slug = (slugProp ?? slugParam)?.trim();
  const [winery, setWinery] = useState<Winery | null>(null);
  const [facts, setFacts] = useState<Fact[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setErr(supabaseEnvHint());
      setLoading(false);
      return;
    }
    if (!slug) {
      setErr("Invalid URL.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setErr(null);
    let cancelled = false;
    (async () => {
      const { data: w, error: wErr } = await supabase
        .from("wineries")
        .select(
          "id, name, slug, website, address, city, state, phone, email, ava, description, reservation_required, dogs_allowed, tasting_fee_min, tasting_fee_max, established_year"
        )
        .eq("slug", slug)
        .eq("status", "active")
        .maybeSingle();
      if (cancelled) return;
      if (wErr) {
        setErr(wErr.message);
        setLoading(false);
        return;
      }
      if (!w) {
        setErr("Winery not found.");
        setLoading(false);
        return;
      }
      setWinery(w);
      const { data: f, error: fErr } = await supabase
        .from("winery_facts")
        .select("id, fact_type, fact_value, source_url")
        .eq("winery_id", w.id)
        .eq("in_quarantine", false);
      if (cancelled) return;
      if (fErr) {
        console.error(fErr);
        setFacts([]);
      } else setFacts(f ?? []);
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="panel">
        <p>Loading winery…</p>
      </div>
    );
  }

  if (err || !winery) {
    return (
      <div className="panel panel-warn">
        <p>{err ?? "Something went wrong."}</p>
        <Link className="btn btn-ghost" to="/">
          ← Home
        </Link>
      </div>
    );
  }

  const location = [winery.address, winery.city, winery.state].filter(Boolean).join(", ");
  const feeMin = formatCents(winery.tasting_fee_min);
  const feeMax = formatCents(winery.tasting_fee_max);

  return (
    <article className="winery-detail">
      <Link className="back" to="/">
        ← Home
      </Link>
      <header className="page-head">
        <h1>{winery.name}</h1>
        {winery.ava && <p className="muted">{winery.ava}</p>}
      </header>

      <div className="detail-grid">
        <section className="panel">
          <h2>Visit</h2>
          {location && <p>{location}</p>}
          {winery.phone && (
            <p>
              <a href={`tel:${winery.phone.replace(/\s/g, "")}`}>{winery.phone}</a>
            </p>
          )}
          {winery.email && (
            <p>
              <a href={`mailto:${winery.email}`}>{winery.email}</a>
            </p>
          )}
          {winery.website && (
            <p>
              <a href={winery.website} target="_blank" rel="noreferrer">
                Official website
              </a>
            </p>
          )}
          {winery.established_year && <p className="muted">Est. {winery.established_year}</p>}
        </section>

        <section className="panel">
          <h2>Tasting</h2>
          <ul className="facts">
            <li>
              Reservations:{" "}
              {winery.reservation_required === true
                ? "Recommended or required — confirm with the winery."
                : winery.reservation_required === false
                  ? "Not strictly required (confirm before you go)."
                  : "Unknown"}
            </li>
            <li>
              Dogs:{" "}
              {winery.dogs_allowed === true
                ? "Allowed in some areas (verify on site)."
                : winery.dogs_allowed === false
                  ? "Policy unclear or restricted — call ahead."
                  : "Unknown"}
            </li>
            {(feeMin || feeMax) && (
              <li>
                Fees:{" "}
                {feeMin && feeMax && feeMin !== feeMax ? `${feeMin} – ${feeMax}` : feeMin ?? feeMax}
              </li>
            )}
          </ul>
        </section>
      </div>

      {winery.description && (
        <section className="panel">
          <h2>About</h2>
          <p>{winery.description}</p>
        </section>
      )}

      {facts.length > 0 && (
        <section className="panel">
          <h2>Structured facts</h2>
          <ul className="facts">
            {facts.map((f) => (
              <li key={f.id}>
                <strong>{f.fact_type ?? "fact"}:</strong>{" "}
                <code className="fact-json">{JSON.stringify(f.fact_value)}</code>
                {f.source_url && (
                  <>
                    {" "}
                    <a href={f.source_url} target="_blank" rel="noreferrer">
                      source
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="muted small">
        Hours and fees change often. Use the partner chat widget on the winery site for
        retrieval-grounded answers with &quot;last verified&quot; dates when available.
      </p>
    </article>
  );
}
