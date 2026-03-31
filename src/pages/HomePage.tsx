import { Link } from "react-router-dom";
import { useWineryDirectory } from "../contexts/WineryDirectoryContext";
import { partnerPathForSlug, WINERY_CARD_OVERRIDES } from "../lib/wineries";
function regionLine(w: {
  slug: string;
  ava: string | null;
  city: string | null;
  state: string | null;
}): string {
  const ov = WINERY_CARD_OVERRIDES[w.slug]?.region;
  if (ov) return ov;
  const parts = [w.ava, [w.city, w.state].filter(Boolean).join(", ")].filter(Boolean);
  return parts.length > 0 ? parts.join(" · ") : "Willamette Valley, Oregon";
}

function blurbFor(w: { slug: string; name: string; description: string | null }): string {
  const ov = WINERY_CARD_OVERRIDES[w.slug]?.blurb;
  if (ov) return ov;
  const d = w.description?.trim();
  if (d) return d.length > 280 ? `${d.slice(0, 277)}…` : d;
  return `Tasting room and visit details for ${w.name}—powered by OregonWine.ai crawl and RAG.`;
}

function titleFor(w: { slug: string; name: string }): string {
  return WINERY_CARD_OVERRIDES[w.slug]?.cardTitle ?? w.name;
}

export function HomePage() {
  const { wineries, loading, error } = useWineryDirectory();

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Willamette Valley</p>
        <h1>OregonWine.ai</h1>
        <p className="lede">
          Embeddable RAG chat for Oregon wineries. Below are <strong>active partners in your database</strong>
          — add more rows in Supabase or run your crawl scripts to grow this list. Open a card for the full
          profile; use the <strong>top right nav</strong> for Partner, Research (when available), and Analytics.
        </p>
        <div className="hero-actions">
          <a
            className="btn btn-ghost"
            href={`${import.meta.env.BASE_URL}widget-test.html`}
            target="_blank"
            rel="noreferrer"
          >
            Widget demo
          </a>
        </div>
      </section>

      <section className="home-partners" aria-labelledby="partners-heading">
        <h2 id="partners-heading" className="home-partners-title">
          Wineries
        </h2>
        <p className="muted small home-partners-hint">
          Data comes from the <code>wineries</code> table (<code>status = active</code>). This is not an
          internet-wide scrape—ingest responsibly via your own pipeline.
        </p>

        {loading && <p className="muted">Loading wineries…</p>}
        {error && (
          <div className="panel panel-warn">
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        {!loading && !error && wineries.length === 0 && (
          <p className="muted">No active wineries in the database yet.</p>
        )}

        {!loading && wineries.length > 0 && (
          <ul className="card-grid home-partner-grid">
            {wineries.map((w) => (
              <li key={w.id}>
                <Link className="card" to={partnerPathForSlug(w.slug)}>
                  <h2>{titleFor(w)}</h2>
                  <p className="card-region">{regionLine(w)}</p>
                  <p className="card-desc">{blurbFor(w)}</p>
                  <span className="card-cta">View winery hub →</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
