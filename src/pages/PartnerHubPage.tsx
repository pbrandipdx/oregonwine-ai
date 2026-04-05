import { Link } from "react-router-dom";
import { useWineryDirectory } from "../contexts/WineryDirectoryContext";
import { WINERY_CARD_OVERRIDES } from "../lib/wineries";
import { SEOHead } from "../lib/seo";

function regionLine(w: {
  slug: string;
  ava: string | null;
  city: string | null;
  state: string | null;
}): string {
  const ov = WINERY_CARD_OVERRIDES[w.slug]?.region;
  if (ov) return ov;
  const parts = [w.ava, [w.city, w.state].filter(Boolean).join(", ")].filter(Boolean);
  return parts.length > 0 ? parts.join(" · ") : "Willamette Valley";
}

function blurbFor(w: { slug: string; name: string; description: string | null }): string {
  const ov = WINERY_CARD_OVERRIDES[w.slug]?.blurb;
  if (ov) return ov;
  const d = w.description?.trim();
  if (d) return d.length > 280 ? `${d.slice(0, 277)}…` : d;
  return `Tasting room and visit details for ${w.name}—powered by Crushpad.ai crawl and RAG.`;
}

function titleFor(w: { slug: string; name: string }): string {
  return WINERY_CARD_OVERRIDES[w.slug]?.cardTitle ?? w.name;
}

export function PartnerHubPage() {
  const { wineries, loading, error, supabaseConfigured } = useWineryDirectory();

  return (
    <div className="landing-page">
      <SEOHead
        title="Partner Wineries"
        description="Crushpad.ai partner wineries in the Willamette Valley. AI-powered tasting assistants for Oregon's best Pinot Noir producers."
        path="/partners"
      />
      <section className="landing-hero landing-hero--minimal" aria-labelledby="hub-title">
        <div className="landing-hero-inner">
          <p className="landing-badge landing-badge--minimal">Partner directory</p>
          <h1 id="hub-title">Partner hubs</h1>
          <p className="landing-dek landing-dek--minimal">
            Each card opens a winery workspace: partner overview, research materials when available, and analytics.
            Need the product tour first?{" "}
            <Link to="/" className="partner-hub-inline-link">
              How it works
            </Link>
            .
          </p>
          <div className="landing-hero-actions">
            <Link className="landing-cta landing-cta-primary" to="/">
              How it works
            </Link>
            <Link
              className="landing-cta landing-cta-ghost landing-cta-ghost--minimal"
              to="/chatbot-demo"
            >
              Try it live
            </Link>
          </div>
        </div>
      </section>

      <div className="landing-page-inner">
        <section className="home-partners" aria-labelledby="partners-heading">
          <h2 id="partners-heading" className="home-partners-title visually-hidden">
            All wineries
          </h2>
          <p className="muted small home-partners-hint">
            {supabaseConfigured ? (
              <>
                Active rows from your <code>wineries</code> table (<code>status = active</code>). Open a hub for tools
                and data for that partner.
              </>
            ) : (
              <>
                Offline demo hubs; add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in{" "}
                <code>.env</code>, then restart <code>npm run dev</code> for your live list.
              </>
            )}
          </p>

          {loading && <p className="muted">Loading wineries…</p>}
          {!supabaseConfigured && !loading && !error && (
            <p className="landing-offline-note muted small">
              <strong className="landing-offline-strong">Offline mode.</strong> Configure Supabase env vars to sync
              your directory.
            </p>
          )}
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
                  <Link className="card" to={`/${w.slug}`}>
                    <h2>{titleFor(w)}</h2>
                    <p className="card-region">{regionLine(w)}</p>
                    <p className="card-desc">{blurbFor(w)}</p>
                    <span className="card-cta">Open hub →</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
