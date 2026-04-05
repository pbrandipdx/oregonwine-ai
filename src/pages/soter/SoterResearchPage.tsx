import { Link } from "react-router-dom";
import { SEOHead, winerySubPageSEO } from "../../lib/seo";

/**
 * Draft technical brief — expand with verified stack / DNS research (Rex Hill pattern).
 */
export function SoterResearchPage() {
  return (
    <article className="research-page">
      <SEOHead {...winerySubPageSEO("Soter Vineyards", "soter", "research")} />
      <Link className="back" to="/">
        ← Home
      </Link>

      <header className="page-head" style={{ marginBottom: "0.5rem" }}>
        <p className="eyebrow">Technical Research Brief</p>
        <h1>Soter Vineyards — Site &amp; Integration (draft)</h1>
        <p className="muted" style={{ maxWidth: "42rem", marginTop: "0.5rem" }}>
          Mineral Springs Ranch (Yamhill-Carlton). This page is a placeholder for a full verified
          infrastructure analysis before sales and integration planning.
        </p>
      </header>

      <section className="panel">
        <h2>Context</h2>
        <ul className="facts" style={{ margin: 0 }}>
          <li>
            <strong>Site:</strong>{" "}
            <a href="https://www.sotervineyards.com" target="_blank" rel="noreferrer">
              sotervineyards.com
            </a>
          </li>
          <li>
            <strong>Ranch:</strong> Mineral Springs Ranch — biodynamic estate, Yamhill-Carlton AVA,
            Willamette Valley
          </li>
          <li>
            <strong>Visit:</strong> By appointment; confirm hours and experiences on their site or by phone
            before listing them in the agent.
          </li>
        </ul>
      </section>

      <section className="panel">
        <h2>Next steps</h2>
        <p style={{ margin: 0 }}>
          Crawl sotervineyards.com, map reservations / Commerce / email / analytics stack from primary
          sources, then add a Rex Hill–style roadmap and ROI section once verified.
        </p>
      </section>

      <section className="panel" style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn btn-ghost" to="/soter">
            Soter partner page
          </Link>
          <Link className="btn btn-ghost" to="/rex-hill/research">
            Rex Hill research (template)
          </Link>
        </div>
      </section>
    </article>
  );
}
