import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="hero">
      <p className="eyebrow">Willamette Valley</p>
      <h1>OregonWine.ai</h1>
      <p className="lede">
        Embeddable RAG chat for Oregon wineries—verified crawl chunks, widget analytics, and a{" "}
        <strong>dedicated page per partner</strong> (<code>/w/your-slug</code>) so listings are not
        surfaced next to competitors on this site.
      </p>
      <div className="hero-actions">
        <Link className="btn" to="/rex-hill">
          Example partner page
        </Link>
        <a className="btn btn-ghost" href={`${import.meta.env.BASE_URL}widget-test.html`} target="_blank" rel="noreferrer">
          Widget demo
        </a>
      </div>
      <p className="muted" style={{ marginTop: "1.5rem", maxWidth: "36rem" }}>
        Each winery receives its own shareable URL. Chat analytics use the same slug:{" "}
        <code>/analytics/rex-hill</code> — only that winery’s data is loaded (no directory).
      </p>
    </section>
  );
}
