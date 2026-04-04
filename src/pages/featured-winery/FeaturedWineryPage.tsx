import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FEATURED_WINERIES, type FeaturedWinery } from "../../data/featured-wineries";
import "./FeaturedWineryPage.css";

function pickRandom(exclude?: string): FeaturedWinery {
  const pool = exclude
    ? FEATURED_WINERIES.filter((w) => w.id !== exclude)
    : FEATURED_WINERIES;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function FeaturedWineryPage() {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get("embed") === "1";

  const [winery, setWinery] = useState<FeaturedWinery>(() => pickRandom());

  useEffect(() => {
    const prev = document.title;
    document.title = `${winery.name} — Crushpad.ai`;
    return () => { document.title = prev; };
  }, [winery.name]);

  const showAnother = useCallback(() => {
    setWinery(pickRandom(winery.id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [winery.id]);

  const storyParagraphs = winery.story.split("\n\n").filter(Boolean);

  return (
    <div className="fw">
      {/* ── Hero ── */}
      <div className="fw-hero" key={winery.id}>
        <p className="fw-badge">Crushpad.ai &middot; Featured Winery</p>
        <h1 className="fw-name">{winery.name}</h1>
        <p className="fw-tagline">{winery.tagline}</p>
        <p className="fw-meta">
          {winery.ava}
          <span className="fw-meta-sep">|</span>
          Est. {winery.foundedYear}
          <span className="fw-meta-sep">|</span>
          {winery.location}
        </p>
        <div className="fw-hero-image-alt">{winery.heroImageAlt}</div>
      </div>

      {/* ── Detail Row ── */}
      <div className="fw-detail-row" key={`detail-${winery.id}`}>
        <div className="fw-detail-item">
          <span className="fw-detail-label">Founded</span>
          <span className="fw-detail-value">{winery.foundedYear}</span>
        </div>
        <div className="fw-detail-item">
          <span className="fw-detail-label">Founders</span>
          <span className="fw-detail-value">{winery.founders}</span>
        </div>
        <div className="fw-detail-item">
          <span className="fw-detail-label">Winemaker</span>
          <span className="fw-detail-value">{winery.winemaker}</span>
        </div>
      </div>

      {/* ── Story ── */}
      <div className="fw-story" key={`story-${winery.id}`}>
        <p className="fw-story-label">The Story</p>
        {storyParagraphs.map((p, i) => (
          <p key={i} className="fw-story-text">{p}</p>
        ))}
      </div>

      {/* ── Why Visit ── */}
      <div className="fw-why-visit" key={`why-${winery.id}`}>
        <div className="fw-why-visit-box">
          <p className="fw-why-visit-label">Why Visit</p>
          <p className="fw-why-visit-text">{winery.whyVisit}</p>
        </div>
      </div>

      {/* ── Badges ── */}
      <div className="fw-badges" key={`badges-${winery.id}`}>
        <span className="fw-badge-pill fw-badge-pill--accent">{winery.farmingPractice}</span>
        {winery.soilTypes.map((soil) => (
          <span key={soil} className="fw-badge-pill">{soil}</span>
        ))}
      </div>

      {/* ── Signature Wines ── */}
      <div className="fw-wines" key={`wines-${winery.id}`}>
        <p className="fw-wines-label">Signature Wines</p>
        <div className="fw-wines-grid">
          {winery.signatureWines.map((wine) => (
            <div key={wine.name} className="fw-wine-card">
              <p className="fw-wine-name">{wine.name}</p>
              <p className="fw-wine-type">{wine.type}</p>
              <p className="fw-wine-desc">{wine.description}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="fw-divider" />

      {/* ── Visit Info ── */}
      <div className="fw-visit" key={`visit-${winery.id}`}>
        <p className="fw-visit-label">Plan Your Visit</p>
        <div className="fw-visit-card">
          <div className="fw-visit-grid">
            <div className="fw-visit-item">
              <span className="fw-visit-item-label">Tasting Fee</span>
              <span className="fw-visit-item-value">{winery.visitInfo.tastingFee}</span>
            </div>
            <div className="fw-visit-item">
              <span className="fw-visit-item-label">Reservations</span>
              <span className="fw-visit-item-value">{winery.visitInfo.reservations}</span>
            </div>
            <div className="fw-visit-item">
              <span className="fw-visit-item-label">Hours</span>
              <span className="fw-visit-item-value">{winery.visitInfo.hours}</span>
            </div>
            <div className="fw-visit-item">
              <span className="fw-visit-item-label">Phone</span>
              <span className="fw-visit-item-value">
                <a href={`tel:${winery.visitInfo.phone}`}>{winery.visitInfo.phone}</a>
              </span>
            </div>
            <div className="fw-visit-item fw-visit-item--full">
              <span className="fw-visit-item-label">Address</span>
              <span className="fw-visit-item-value">{winery.visitInfo.address}</span>
            </div>
            <div className="fw-visit-item fw-visit-item--full">
              <span className="fw-visit-item-label">Website</span>
              <span className="fw-visit-item-value">
                <a href={winery.visitInfo.website} target="_blank" rel="noopener noreferrer">
                  {winery.visitInfo.website.replace(/^https?:\/\//, "")}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="fw-actions">
        <button className="fw-another-btn" onClick={showAnother}>
          Show Me Another
        </button>
        <a
          className="fw-visit-btn"
          href={winery.visitInfo.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Website
        </a>
      </div>

      {!isEmbed && (
        <footer className="fw-footer">
          <Link to="/chatbot-demo" style={{ color: "inherit", textDecoration: "none" }}>
            &larr; Back to Crushpad.ai
          </Link>
        </footer>
      )}
    </div>
  );
}
