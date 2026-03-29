import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="hero">
      <p className="eyebrow">Willamette Valley</p>
      <h1>OregonWine.ai</h1>
      <p className="lede">
        Embeddable RAG chat for Oregon wineries, plus a public directory backed by verified crawl
        chunks and analytics-ready logging.
      </p>
      <div className="hero-actions">
        <Link className="btn" to="/directory">
          Browse wineries
        </Link>
        <a className="btn btn-ghost" href="/widget-test.html" target="_blank" rel="noreferrer">
          Widget test page
        </a>
      </div>
    </section>
  );
}
