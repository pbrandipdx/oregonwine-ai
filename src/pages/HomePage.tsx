import { Link } from "react-router-dom";
import { IMPACT_STATS } from "../impactStats";
import "./HowItWorksPage.css";

export function HomePage() {
  return (
    <div className="hiw">
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-badge">Built for Oregon wineries &amp; tasting rooms</p>
          <h1>Your 24/7 wine concierge that drives visits &amp; revenue</h1>
          <p>
            Crushpad.ai gives every winery an AI-powered chatbot trained on <em>your</em> wines, hours, and
            experiences — so visitors get instant answers and you get more bookings.
          </p>
          <div className="hero-actions">
            <Link className="hero-cta" to="/book-demo">
              Book a demo
            </Link>
            <Link className="hero-cta ghost" to="/chatbot-demo">
              Try it live
            </Link>
          </div>
        </div>
      </section>

      <div className="stats-banner" role="list" aria-label="Key outcomes">
        {IMPACT_STATS.map((s) => (
          <div key={s.label} className="stat-card" role="listitem">
            <div className="stat-number">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-source">{s.hint}</div>
          </div>
        ))}
      </div>

      <footer className="page-footer">
        © 2026 <a href="https://crushpad.ai">Crushpad.ai</a> — AI-powered wine concierge for
        Oregon wineries
      </footer>
    </div>
  );
}
