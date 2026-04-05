import { Link } from "react-router-dom";
import { IMPACT_STATS } from "../impactStats";
import { SEOHead, PAGE_SEO } from "../lib/seo";
import "./HowItWorksPage.css";

export function HowItWorksPage() {
  return (
    <div className="hiw">
      <SEOHead {...PAGE_SEO.howItWorks} />

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-badge">Built for wineries &amp; tasting rooms</p>
          <h1>Your 24/7 wine concierge that drives visits &amp; revenue</h1>
          <p>
            Crushpad.ai gives every winery an AI-powered chatbot trained on <em>your</em> wines, hours, and
            experiences — so visitors get instant answers and you get more bookings.
          </p>
        </div>
      </section>

      {/* Stats banner */}
      <div className="stats-banner" role="list" aria-label="Key outcomes">
        {IMPACT_STATS.map((s) => (
          <div key={s.label} className="stat-card" role="listitem">
            <div className="stat-number">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-source">{s.hint}</div>
          </div>
        ))}
      </div>

      <div className="container">
        <div className="section">
          <h2>The Problem Every Winery Knows</h2>
          <p className="subtitle">Visitors have questions. Your team can&apos;t answer them all, all the time.</p>
          <p>
            Your website gets traffic from people planning their Willamette Valley trip. They want to know tasting
            fees, whether they need a reservation, if they can bring their dog, and what wine clubs you offer. But
            most winery websites bury this information, or worse — don&apos;t have it at all.
          </p>
          <p>
            The result? Visitors leave. They pick the winery down the road that answered faster. Industry data from
            wine chatbot deployments shows that{" "}
            <strong>52% of chatbot interactions are pairing or visit-planning questions</strong> — the exact
            questions that convert browsers into visitors. And peak activity hits at <strong>9 PM</strong>, well after
            your tasting room closes.
          </p>
          <div className="highlight">
            <h3>What happens without a concierge?</h3>
            <ul>
              <li>Visitors can&apos;t find hours, fees, or reservation info quickly</li>
              <li>Your staff fields the same 10 questions by phone and email every day</li>
              <li>Trip planners pick the competitor who answered instantly at 9 PM</li>
              <li>You miss bookings from mobile visitors who won&apos;t dig through your site</li>
            </ul>
          </div>
        </div>

        <div className="section">
          <h2>Crushpad.ai: Your Always-On Expert</h2>
          <p className="subtitle">An AI concierge trained specifically on your winery&apos;s information.</p>
          <p>
            Crushpad.ai isn&apos;t a generic chatbot. It&apos;s a custom-trained AI wine concierge that knows{" "}
            <em>your</em> tasting menu, <em>your</em> hours, <em>your</em> wines, and <em>your</em> story. It answers
            visitor questions instantly, drives tasting room bookings, and frees your staff from repetitive inquiries.
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">01</div>
              <h3>Winery-Specific Knowledge</h3>
              <p>
                Trained on your wines, tasting experiences, hours, pricing, club benefits, and policies. No
                hallucinated answers — only verified information from your sources.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">02</div>
              <h3>Drives Bookings &amp; Visits</h3>
              <p>
                Smart CTAs guide visitors to book tastings, explore wine clubs, or call your team. Turns
                conversations into conversions.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">03</div>
              <h3>Seamless Human Handoff</h3>
              <p>
                When questions need a personal touch, the concierge connects visitors to your staff via phone or email.
                No dead ends.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">04</div>
              <h3>Analytics Dashboard</h3>
              <p>
                See what visitors ask most, satisfaction scores, response times, and unanswered questions — so you
                know what content to update.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">05</div>
              <h3>Learns &amp; Improves</h3>
              <p>
                Gap analysis shows what the bot couldn&apos;t answer. Add new facts through the admin panel and your
                concierge gets smarter over time.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">06</div>
              <h3>Embed Anywhere</h3>
              <p>
                Drop a single script tag on your website. Works with any platform — Squarespace, WordPress, Wix,
                custom sites. Live in 24–48 hours.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>The Data: Why Wine Chatbots Work</h2>
          <p className="subtitle">Industry results from real wine chatbot deployments prove the ROI.</p>
          <p>
            Wine-specific AI chatbots are already transforming how retailers and wineries engage customers. Data from
            across the industry paints a clear picture:
          </p>
          <div className="highlight">
            <h3>Key Findings from Wine Chatbot Deployments</h3>
            <ul>
              <li>
                <strong>27% revenue increase</strong> per customer when AI recommendations are available
              </li>
              <li>
                <strong>28% click-through rate</strong> on chatbot suggestions (vs. 2–5% for traditional web CTAs)
              </li>
              <li>
                <strong>64% of sessions show high purchase intent</strong> — visitors are ready to buy or book
              </li>
              <li>
                <strong>52% of questions are pairing and visit-planning queries</strong> — exactly the questions that
                convert
              </li>
              <li>
                <strong>Peak activity at 9 PM</strong> — when your tasting room is closed but visitors are planning
                tomorrow&apos;s trip
              </li>
              <li>
                <strong>Average engagement score of 60%</strong> — indicating high-quality, meaningful interactions
              </li>
            </ul>
          </div>
          <p>
            Generic chatbots fail because they can&apos;t answer specific questions about <em>your</em> wines and{" "}
            <em>your</em> experiences. Crushpad.ai is different — it&apos;s built on verified, winery-specific data
            using a hybrid retrieval system (keyword + vector search) that finds the right answer every time.
          </p>
        </div>

        <div className="section">
          <h2>Built for How Wineries Actually Work</h2>
          <p className="subtitle">Every winery has different needs. Here&apos;s how Crushpad.ai fits yours.</p>
          <div className="use-cases">
            <div className="use-case">
              <h4>Tasting Rooms</h4>
              <p>
                Answer visit-planning questions 24/7: hours, reservations, fees, accessibility, pet policies, and group
                sizes.
              </p>
            </div>
            <div className="use-case">
              <h4>Wine Clubs</h4>
              <p>
                Explain membership tiers, benefits, pricing, and shipping details. Guide visitors to sign up or call
                for more info.
              </p>
            </div>
            <div className="use-case">
              <h4>Events &amp; Weddings</h4>
              <p>
                Field inquiries about private events, venue details, catering, and availability — then hand off to
                your events team.
              </p>
            </div>
            <div className="use-case">
              <h4>DTC &amp; E-Commerce</h4>
              <p>
                Help online shoppers find the right bottle with food pairing guidance, tasting notes, and gift
                suggestions from your catalog.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Crushpad.ai vs. Generic Chatbots</h2>
          <p className="subtitle">Purpose-built for wineries, not adapted from a retail template.</p>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Capability</th>
                <th>Crushpad.ai</th>
                <th>Generic Chatbot</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Trained on your winery&apos;s real data</td>
                <td className="check">✓ Verified sources</td>
                <td className="cross">✗ Generic responses</td>
              </tr>
              <tr>
                <td>Revenue impact</td>
                <td className="check">✓ 27% lift documented</td>
                <td className="cross">✗ No data</td>
              </tr>
              <tr>
                <td>Wine region &amp; AVA expertise</td>
                <td className="check">✓ Built-in</td>
                <td className="cross">✗ None</td>
              </tr>
              <tr>
                <td>Booking &amp; visit CTAs</td>
                <td className="check">✓ Contextual smart links</td>
                <td className="warn">⚠ Basic links only</td>
              </tr>
              <tr>
                <td>Human handoff</td>
                <td className="check">✓ Phone + email escalation</td>
                <td className="cross">✗ Dead ends</td>
              </tr>
              <tr>
                <td>Click-through rate</td>
                <td className="check">✓ ~28%</td>
                <td className="cross">✗ 2–5%</td>
              </tr>
              <tr>
                <td>Setup time</td>
                <td className="check">✓ 24–48 hours</td>
                <td className="cross">✗ Weeks</td>
              </tr>
              <tr>
                <td>Analytics &amp; gap analysis</td>
                <td className="check">✓ Full dashboard</td>
                <td className="warn">⚠ Extra cost</td>
              </tr>
              <tr>
                <td>Admin panel for staff</td>
                <td className="check">✓ Add facts, review gaps</td>
                <td className="cross">✗ Developer required</td>
              </tr>
              <tr>
                <td>Multi-turn conversation</td>
                <td className="check">✓ Remembers context</td>
                <td className="warn">⚠ Single Q&amp;A</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="section">
          <h2>How It Works</h2>
          <p className="subtitle">From sign-up to live on your site in three simple steps.</p>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">1</div>
              <h3>We Crawl Your Content</h3>
              <p>
                We pull verified information from your website, menus, and any materials you provide. Everything is
                organized by category — wines, experiences, hours, policies, and more.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">2</div>
              <h3>Train Your Concierge</h3>
              <p>
                Your data is embedded into a hybrid search engine (keyword + AI vectors) so the concierge always finds
                the right answer. You review and approve everything via the admin panel.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">3</div>
              <h3>Embed &amp; Go Live</h3>
              <p>
                Add one script tag to your website. Your concierge appears as a chat widget matching your brand colors.
                Analytics start flowing immediately.
              </p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Give Your Visitors the Experience They Expect</h2>
          <p>
            Your wines deserve a concierge that knows them as well as your team does — and is available when your
            team isn&apos;t.
          </p>
          <div className="cta-badges">
            <span>✓ Free setup</span>
            <span>✓ No contract</span>
            <span>✓ 30-day guarantee</span>
            <span>✓ Live in 48 hours</span>
          </div>
        </div>
      </div>

      <footer className="page-footer">
        © 2026 <a href="https://crushpad.ai">Crushpad.ai</a> — AI-powered wine concierge for
        wineries
      </footer>
    </div>
  );
}
