import { Link } from "react-router-dom";
import { SEOHead, PAGE_SEO } from "../lib/seo";

export function MarketingHomePage() {
  return (
    <div className="mktg-home">
      <SEOHead {...PAGE_SEO.home} />

      {/* ── Hero ── */}
      <section className="mktg-hero">
        <div className="mktg-hero-inner">
          <div className="mktg-hero-badge">AI Concierge for Wineries</div>
          <h1 className="mktg-hero-title">
            Your tasting room,<br />
            <span className="mktg-hero-accent">always open.</span>
          </h1>
          <p className="mktg-hero-sub">
            An AI concierge that lives on your website — answering questions,
            recommending wines, and booking tastings. Trained on your wines,
            in your voice, 24/7.
          </p>
          <div className="mktg-hero-actions">
            <Link to="/demo" className="mktg-cta">
              See It Live
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/book-demo" className="mktg-cta mktg-cta--ghost">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Social proof ── */}
      <section className="mktg-proof">
        <p className="mktg-proof-label">Trusted by Willamette Valley wineries</p>
        <div className="mktg-proof-logos">
          {["REX HILL", "Chehalem", "Crowley", "Ponzi", "Soter"].map((name) => (
            <span key={name} className="mktg-proof-logo">{name}</span>
          ))}
        </div>
      </section>

      {/* ── Value props ── */}
      <section className="mktg-section">
        <div className="mktg-container">
          <h2 className="mktg-section-title">
            Not another chatbot.
          </h2>
          <p className="mktg-section-sub">
            Crushpad.ai is purpose-built for wineries. It knows your wines,
            your story, and your tasting room — because we train it on everything
            that makes you, you.
          </p>

          <div className="mktg-value-grid">
            <div className="mktg-value-card">
              <div className="mktg-value-num">01</div>
              <h3>Knows your wines</h3>
              <p>
                Trained on your tech sheets, vintage notes, and tasting profiles.
                It speaks about your bottles the way your sommelier would.
              </p>
            </div>
            <div className="mktg-value-card">
              <div className="mktg-value-num">02</div>
              <h3>Drives real bookings</h3>
              <p>
                Recommends experiences, answers logistics, and guides guests
                toward reservations and club sign-ups — around the clock.
              </p>
            </div>
            <div className="mktg-value-card">
              <div className="mktg-value-num">03</div>
              <h3>Sounds like you</h3>
              <p>
                Your brand voice, your personality. Not generic AI. We tune
                every response to match how your team actually talks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works (brief) ── */}
      <section className="mktg-section mktg-section--alt">
        <div className="mktg-container">
          <h2 className="mktg-section-title">Live in days, not months.</h2>
          <p className="mktg-section-sub">
            We handle everything. You review and approve.
          </p>

          <div className="mktg-steps">
            <div className="mktg-step">
              <div className="mktg-step-num">1</div>
              <h3>We learn your winery</h3>
              <p>We scrape your site, ingest your content, and build your knowledge base.</p>
            </div>
            <div className="mktg-step-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </div>
            <div className="mktg-step">
              <div className="mktg-step-num">2</div>
              <h3>You review the voice</h3>
              <p>We dial in the tone, personality, and responses. You approve before launch.</p>
            </div>
            <div className="mktg-step-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </div>
            <div className="mktg-step">
              <div className="mktg-step-num">3</div>
              <h3>One line of code</h3>
              <p>Paste the embed snippet. Your AI concierge is live on your site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="mktg-section">
        <div className="mktg-container">
          <div className="mktg-stats">
            <div className="mktg-stat">
              <div className="mktg-stat-num">24/7</div>
              <div className="mktg-stat-label">Always on</div>
            </div>
            <div className="mktg-stat">
              <div className="mktg-stat-num">&lt;2s</div>
              <div className="mktg-stat-label">Response time</div>
            </div>
            <div className="mktg-stat">
              <div className="mktg-stat-num">$299</div>
              <div className="mktg-stat-label">Per month</div>
            </div>
            <div className="mktg-stat">
              <div className="mktg-stat-num">0</div>
              <div className="mktg-stat-label">Staff hours added</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="mktg-section mktg-section--alt">
        <div className="mktg-container">
          <figure className="mktg-quote">
            <blockquote>
              &ldquo;It&apos;s like cloning your best tasting room associate
              and putting them on every page of your website.&rdquo;
            </blockquote>
            <figcaption>Willamette Valley Winemaker</figcaption>
          </figure>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mktg-section mktg-cta-section">
        <div className="mktg-container" style={{ textAlign: "center" }}>
          <h2 className="mktg-section-title">Ready to pour?</h2>
          <p className="mktg-section-sub">
            Free 30-day pilot for qualifying Willamette Valley wineries.
          </p>
          <div className="mktg-hero-actions" style={{ justifyContent: "center", marginTop: "2rem" }}>
            <Link to="/book-demo" className="mktg-cta">
              Book a Demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mktg-footer">
        <div className="mktg-container mktg-footer-inner">
          <div className="mktg-footer-brand">
            Crushpad<span className="mn-brand-dot">.ai</span>
          </div>
          <div className="mktg-footer-links">
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/demo">Live Demo</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/book-demo">Contact</Link>
          </div>
          <p className="mktg-footer-copy">&copy; 2026 Crushpad.ai — AI concierge for wineries</p>
        </div>
      </footer>
    </div>
  );
}
