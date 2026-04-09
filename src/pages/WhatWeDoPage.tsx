import { Link } from "react-router-dom";
import { SEOHead, PAGE_SEO } from "../lib/seo";
import "./HowItWorksPage.css";

export function WhatWeDoPage() {
  return (
    <div className="hiw">
      <SEOHead {...PAGE_SEO.whatWeDo} />

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-badge">AI Concierge for Wineries</p>
          <h1>The tasting room never closes.</h1>
          <p>
            Crushpad.ai is an AI concierge that lives on your winery&apos;s website — answering visitor questions,
            recommending wines, and booking tastings around the clock, in <em>your</em> voice.
          </p>
          <div className="hero-actions">
            <Link to="/chatbot-demo" className="hero-cta">Try It Now</Link>
            <Link to="/book-demo" className="hero-cta ghost">Book a Demo</Link>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="section">
          <h2>Every question, answered instantly.</h2>
          <p className="subtitle">
            Your visitors have questions long before they arrive — and long after the tasting room closes. Crushpad.ai
            is there for every one of them.
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">01</div>
              <h3>Knows Your Wines</h3>
              <p>
                Trained on your tech sheets, vintage notes, and tasting profiles. It speaks about your bottles the way
                your sommelier would.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">02</div>
              <h3>Knows Your Story</h3>
              <p>
                From your estate history to your winemaker&apos;s philosophy, Crushpad.ai carries your brand voice into
                every conversation.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">03</div>
              <h3>Drives Real Bookings</h3>
              <p>
                Recommends experiences, answers logistics, and guides guests toward reservations and club sign-ups —
                24/7.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <figure className="pull-quote">
            <blockquote>
              &ldquo;It&apos;s like cloning your best tasting room associate and putting them on every page of your
              website.&rdquo;
            </blockquote>
            <figcaption>— Willamette Valley Wine Maker</figcaption>
          </figure>
        </div>

        <div className="section">
          <h2>Built for Wineries, Not Chatbots.</h2>
          <p className="subtitle">
            Generic chatbots miss the nuance that matters in wine. Crushpad.ai is purpose-built for the tasting room
            experience.
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">01</div>
              <h3>Varietal-Aware</h3>
              <p>
                Understands the difference between a Dundee Hills Pinot and a Chehalem Mountains Pinot — and so will
                your visitors.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">02</div>
              <h3>Club-Smart</h3>
              <p>
                Gently surfaces wine club benefits and upcoming releases when the conversation calls for it. Never
                pushy.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">03</div>
              <h3>Always Learning</h3>
              <p>
                You see every question visitors ask — so you learn what guests actually want, not just what you thought
                they did.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Already Pouring.</h2>
          <p className="subtitle">Crushpad.ai is live with leading Willamette Valley wineries.</p>
          <div className="stats-banner">
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Always On</div>
              <div className="stat-source">Never sleeps</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">&lt;2s</div>
              <div className="stat-label">Average Response</div>
              <div className="stat-source">Instant answers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">0</div>
              <div className="stat-label">Staff Hours Added</div>
              <div className="stat-source">Zero overhead</div>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Common questions.</h2>
          <p className="subtitle">If yours isn&apos;t here, just ask.</p>
          <ul className="admin-list">
            <li>
              <h4>Will it actually sound like my winery?</h4>
              <p>
                Yes. We tune the voice, tone, and word choices to match your existing marketing — and you approve every
                part of it before launch.
              </p>
            </li>
            <li>
              <h4>What happens when it doesn&apos;t know something?</h4>
              <p>
                It says so, honestly — and offers to connect the guest with your team. No hallucinations, no making up
                vintages that don&apos;t exist.
              </p>
            </li>
            <li>
              <h4>How long does setup take?</h4>
              <p>
                Typically 5–7 days from kickoff to live. Most of that is us building and you reviewing.
              </p>
            </li>
          </ul>
        </div>

        <div className="cta-section">
          <h2>Ready to pour a glass?</h2>
          <p>
            See Crushpad.ai in action on your own wines. Free 30-day pilot for qualifying wineries.
          </p>
          <div className="hero-actions">
            <Link to="/book-demo" className="hero-cta">Book a Demo</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
