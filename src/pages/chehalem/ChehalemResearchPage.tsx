import { Link } from "react-router-dom";
import { SEOHead, winerySubPageSEO } from "../../lib/seo";

/**
 * Placeholder technical brief for winery #2 — expand with verified DNS/HTML research like Rex Hill.
 */
export function ChehalemResearchPage() {
  return (
    <article className="research-page">
      <SEOHead {...winerySubPageSEO("Chehalem Winery", "chehalem", "research")} />
      <Link className="back" to="/">
        ← Home
      </Link>

      <header className="page-head" style={{ marginBottom: "0.5rem" }}>
        <p className="eyebrow">Technical Research Brief</p>
        <h1>Chehalem — Site &amp; Integration (draft)</h1>
        <p className="muted" style={{ maxWidth: "42rem", marginTop: "0.5rem" }}>
          Chehalem Winery (Stoller Wine Group) is the second partner track. This page will hold the same
          verified stack analysis as Rex Hill once crawl and DNS review are complete.
        </p>
      </header>

      <section className="panel">
        <h2>Context</h2>
        <ul className="facts" style={{ margin: 0 }}>
          <li>
            <strong>Site:</strong>{" "}
            <a href="https://chehalemwines.com" target="_blank" rel="noreferrer">
              chehalemwines.com
            </a>
          </li>
          <li>
            <strong>Region:</strong> Chehalem Mountains AVA, Willamette Valley — Newberg / Sherwood area
          </li>
          <li>
            <strong>Corporate:</strong> Stoller Wine Group portfolio
          </li>
        </ul>
      </section>

      <section className="panel">
        <h2>Next steps</h2>
        <p style={{ margin: 0 }}>
          Run the crawl pipeline against chehalemwines.com, document CMS/hosting/reservations/email stack from
          primary sources, then mirror the Rex Hill integration roadmap for Chehalem-specific tools (Tock,
          Commerce7, etc. as discovered).
        </p>
      </section>

      <section className="panel" style={{ textAlign: "center", padding: "2rem" }}>
        <p style={{ maxWidth: "28rem", margin: "0 auto 1.25rem" }}>
          Public partner page and widget will use the slug <code>chehalem</code> once the winery row and
          widget key exist in Supabase.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn btn-ghost" to="/chehalem">
            Chehalem partner page
          </Link>
          <Link className="btn btn-ghost" to="/rex-hill/research">
            Rex Hill research (template)
          </Link>
        </div>
      </section>
    </article>
  );
}
