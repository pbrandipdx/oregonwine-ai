import { Link } from "react-router-dom";
import { SEOHead } from "../lib/seo";

export function PricingPage() {
  return (
    <div className="mktg-home">
      <SEOHead
        title="Pricing — Crushpad.ai"
        description="Simple, transparent pricing for AI wine concierge. $299/month with full setup included."
        path="/pricing"
      />

      <section className="mktg-section" style={{ paddingTop: "8rem" }}>
        <div className="mktg-container" style={{ textAlign: "center" }}>
          <h1 className="mktg-section-title">Simple pricing.<br />No surprises.</h1>
          <p className="mktg-section-sub">
            One plan. Everything included. Pays for itself with a single extra club signup.
          </p>
        </div>
      </section>

      <section className="mktg-section" style={{ paddingTop: 0 }}>
        <div className="mktg-container">
          <div className="pricing-grid">
            {/* Setup */}
            <div className="pricing-card">
              <div className="pricing-tag">One-time</div>
              <div className="pricing-amount">$750</div>
              <div className="pricing-label">Setup</div>
              <ul className="pricing-features">
                <li>Full website scrape &amp; knowledge base</li>
                <li>Custom system prompt &amp; brand voice</li>
                <li>Widget design &amp; color matching</li>
                <li>30-day tuning period</li>
                <li>Embed code &amp; deployment</li>
              </ul>
            </div>

            {/* Monthly */}
            <div className="pricing-card pricing-card--featured">
              <div className="pricing-tag">Monthly</div>
              <div className="pricing-amount">$299<span className="pricing-period">/mo</span></div>
              <div className="pricing-label">Everything you need</div>
              <ul className="pricing-features">
                <li>24/7 AI concierge on your site</li>
                <li>Unlimited conversations</li>
                <li>Knowledge base hosting &amp; refresh</li>
                <li>Chat log review &amp; insights</li>
                <li>Admin dashboard access</li>
                <li>Priority support</li>
              </ul>
              <Link to="/book-demo" className="mktg-cta" style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}>
                Get Started
              </Link>
            </div>

            {/* Add-ons */}
            <div className="pricing-card">
              <div className="pricing-tag">Add-ons</div>
              <div className="pricing-amount">From $75<span className="pricing-period">/mo</span></div>
              <div className="pricing-label">Customize your plan</div>
              <ul className="pricing-features">
                <li>Monthly content refresh — $75/mo</li>
                <li>Analytics dashboard — $75/mo</li>
                <li>Custom branded widget — $250 one-time</li>
                <li>Staff Q&amp;A training — $150 one-time</li>
                <li>Additional location — $200/mo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROI section */}
      <section className="mktg-section mktg-section--alt">
        <div className="mktg-container" style={{ textAlign: "center" }}>
          <h2 className="mktg-section-title">The math is simple.</h2>
          <p className="mktg-section-sub" style={{ maxWidth: "600px", margin: "0 auto" }}>
            One extra tasting reservation per week is $50–200 in revenue.
            One extra club signup per month is $500–2,000+ in annual value.
            At $299/month, the concierge pays for itself with a single
            club signup every six weeks.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mktg-section">
        <div className="mktg-container">
          <h2 className="mktg-section-title" style={{ textAlign: "center" }}>Common questions</h2>
          <div className="pricing-faq">
            <div className="pricing-faq-item">
              <h4>Will it actually sound like my winery?</h4>
              <p>
                Yes. We tune the voice, tone, and word choices to match your
                existing marketing — and you approve before launch.
              </p>
            </div>
            <div className="pricing-faq-item">
              <h4>What happens when it doesn&apos;t know something?</h4>
              <p>
                It says so honestly and offers to connect the guest with your
                team. No hallucinations, no making up vintages.
              </p>
            </div>
            <div className="pricing-faq-item">
              <h4>How long does setup take?</h4>
              <p>
                Typically 5–7 days from kickoff to live. Most of that is
                us building and you reviewing.
              </p>
            </div>
            <div className="pricing-faq-item">
              <h4>Can I cancel anytime?</h4>
              <p>
                Yes. No long-term contracts. Cancel anytime with 30 days notice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
