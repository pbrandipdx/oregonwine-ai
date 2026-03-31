import { Link } from "react-router-dom";

/* ── static research data ─────────────────────────────────────────────── */

const STACK_ROWS: { layer: string; tool: string; detail: string; verified: string }[] = [
  {
    layer: "CMS",
    tool: "WordPress + Roots (Sage / Bedrock)",
    detail: "Modern WP dev workflow: Composer dependency management, Blade templating, Webpack asset pipeline.",
    verified: "Source HTML, theme asset paths",
  },
  {
    layer: "Hosting",
    tool: "WP Engine",
    detail: "A records 141.193.213.10/11 resolve to WP Engine's Austin, TX infrastructure under ASN 209242.",
    verified: "DNS A record lookup",
  },
  {
    layer: "CDN / WAF",
    tool: "Cloudflare",
    detail: "Proxies traffic for SSL, caching, and DDoS protection. Challenge-platform scripts in page source.",
    verified: "Source HTML (/cdn-cgi/), HTTP headers",
  },
  {
    layer: "DNS Registrar",
    tool: "GoDaddy",
    detail: "Nameservers ns51/ns52.domaincontrol.com — GoDaddy's default NS infrastructure.",
    verified: "NS record lookup",
  },
  {
    layer: "E-commerce (frontend)",
    tool: "Commerce7 (C7WP plugin)",
    detail: "Vue.js-powered product, cart, club, and checkout routes injected into WordPress via the C7WP integration plugin.",
    verified: "Source HTML, C7WP config object",
  },
  {
    layer: "E-commerce (backend)",
    tool: "Vin65 / WineDirect",
    detail: "shop.rexhill.com CNAME → lb9.uswest.vin65.com. Commerce7 acquired WineDirect SaaS in Jan 2025; migration is in progress through 2026.",
    verified: "CNAME + A record for shop.rexhill.com",
  },
  {
    layer: "Reservations",
    tool: "Tock (exploretock.com)",
    detail: "Loaded via exploretock.com/tock.js, initialized with tock('init', 'rexhill'). Tock serves 1,000+ wineries globally.",
    verified: "Source HTML, script init call",
  },
  {
    layer: "Analytics",
    tool: "Google Tag Manager → GA4",
    detail: "Container GTM-5TZZXTT. All analytics tags (GA4, conversion pixels) fire through GTM.",
    verified: "Source HTML, GTM container ID",
  },
  {
    layer: "Email Marketing",
    tool: "Campaign Monitor + Klaviyo",
    detail: "Campaign Monitor forms in footer (forms-for-campaign-monitor plugin + reCAPTCHA). Klaviyo site verification in DNS TXT records — possibly migrating or running both.",
    verified: "Source HTML, SPF + TXT DNS records",
  },
  {
    layer: "Forms",
    tool: "Contact Form 7",
    detail: "WP REST API endpoint at /wp-json/contact-form-7/v1.",
    verified: "Source HTML, REST route",
  },
  {
    layer: "Accessibility",
    tool: "AccessiBe",
    detail: "Overlay widget (acsb-trigger). Note: overlay widgets are controversial in the a11y community.",
    verified: "Source HTML, CSS class names",
  },
  {
    layer: "Age Gate",
    tool: "WordPress plugin",
    detail: "Alcohol age verification (21+) — required for all US winery sites.",
    verified: "Source HTML",
  },
  {
    layer: "Fonts",
    tool: "Google Fonts",
    detail: "Crimson Pro + Work Sans from fonts.googleapis.com.",
    verified: "Source HTML, link tags",
  },
  {
    layer: "Corporate Email",
    tool: "Microsoft 365",
    detail: "MX → rexhill-com.mail.protection.outlook.com. Multiple MS= verification TXT records.",
    verified: "MX + TXT DNS records",
  },
  {
    layer: "Security Training",
    tool: "KnowBe4",
    detail: "knowbe4-site-verification in DNS TXT. Phishing awareness / security training — likely managed at the SMWE corporate level.",
    verified: "TXT DNS record",
  },
  {
    layer: "Identity / SSO",
    tool: "Cisco (Duo / Umbrella)",
    detail: "cisco-ci-domain-verification in DNS TXT. Enterprise identity or DNS security product.",
    verified: "TXT DNS record",
  },
];

const INTEGRATION_STAGES: {
  stage: string;
  timeline: string;
  description: string;
  theirStack: string;
  ourIntegration: string;
}[] = [
  {
    stage: "Stage 1 — Chatbot",
    timeline: "Now",
    description:
      "RAG-powered chat widget answers visitor questions 24/7 using content scraped from rexhill.com. Embedded via a single script tag — no changes to WordPress, WP Engine, or any existing infrastructure.",
    theirStack: "WordPress + WP Engine + Cloudflare",
    ourIntegration:
      "Zero-touch. Widget loads from our CDN. A <script> tag in their theme header or via a WP plugin is the only change. Cloudflare passes it through. No server-side modifications.",
  },
  {
    stage: "Stage 2 — Contextual Assistant",
    timeline: "3–6 months",
    description:
      "Session memory, personalization, and smart reservation intent detection. When visitors ask about tastings, the agent surfaces Tock booking links instead of just answering the question.",
    theirStack: "Tock reservation system",
    ourIntegration:
      "The agent detects booking intent and deep-links to exploretock.com/rexhill with the right experience pre-selected. No API integration needed yet — just intelligent linking using their existing Tock embed.",
  },
  {
    stage: "Stage 3 — Action-Taking Agent",
    timeline: "6–12 months",
    description:
      "The agent books tastings, walks visitors through wine club signups, and captures email leads — all inside the chat conversation.",
    theirStack: "Tock API + Commerce7 API + Campaign Monitor / Klaviyo",
    ourIntegration:
      "Tock has a formal Commerce7 integration that syncs customer data, club membership, and purchase history. Our agent uses Claude tool-calling to create Tock reservations via their API, push email captures to Campaign Monitor or Klaviyo, and surface Commerce7 club/product data. The Vin65→Commerce7 migration should be complete by this stage.",
  },
  {
    stage: "Stage 4 — Full Platform",
    timeline: "12–24 months",
    description:
      "Proactive outreach, cross-session memory, multi-channel (site + Instagram DMs + SMS), and analytics agent that surfaces insights from chat data.",
    theirStack: "GA4 / GTM + Microsoft 365 + Social channels",
    ourIntegration:
      "Chat analytics complement GA4 with intent-level visitor data GTM can't capture. Proactive outreach flows through their existing email marketing stack (Campaign Monitor or Klaviyo, whichever they settle on). The agent becomes a revenue attribution layer — one extra club signup per month pays for the entire service.",
  },
];

/* ── component ────────────────────────────────────────────────────────── */

export function RexHillResearchPage() {
  return (
    <article className="research-page">
      <Link className="back" to="/">
        ← Home
      </Link>

      {/* Header */}
      <header className="page-head" style={{ marginBottom: "0.5rem" }}>
        <p className="eyebrow">Technical Research Brief</p>
        <h1>Rex Hill — Site Infrastructure Analysis</h1>
        <p className="muted" style={{ maxWidth: "42rem", marginTop: "0.5rem" }}>
          A verified breakdown of how rexhill.com is built, hosted, and connected — and how
          OregonWine.ai integrates at every stage without disrupting their existing infrastructure.
        </p>
      </header>

      {/* Ownership context */}
      <section className="panel" style={{ marginTop: "1.5rem" }}>
        <h2>Ownership &amp; Corporate Context</h2>
        <p style={{ margin: 0 }}>
          Rex Hill is owned by <strong>Ste. Michelle Wine Estates (SMWE)</strong>, acquired in 2022
          along with A to Z Wineworks. The site references <em>smwe.com</em> for trade portal access
          and CCPA data requests. Schema markup lists "Johnathan Vineyards" as the organization — this
          appears to be a placeholder or parent-brand reference in their structured data, not the
          actual corporate entity. IT governance (KnowBe4, Cisco identity) is managed at the SMWE
          corporate level.
        </p>
      </section>

      {/* Tech Stack Table */}
      <section className="panel">
        <h2>Verified Technology Stack</h2>
        <p className="muted small" style={{ marginBottom: "1rem" }}>
          Every finding below was verified by direct inspection of DNS records, HTTP source, and
          infrastructure lookups — not inferred from a technology profiler database.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table className="research-table">
            <thead>
              <tr>
                <th>Layer</th>
                <th>Technology</th>
                <th>Details</th>
                <th>How Verified</th>
              </tr>
            </thead>
            <tbody>
              {STACK_ROWS.map((r) => (
                <tr key={r.layer}>
                  <td>
                    <strong>{r.layer}</strong>
                  </td>
                  <td>{r.tool}</td>
                  <td>{r.detail}</td>
                  <td className="muted small">{r.verified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key findings */}
      <section className="panel">
        <h2>Key Findings</h2>
        <div className="finding-grid">
          <div className="finding-card">
            <h3>Shop backend is still Vin65</h3>
            <p>
              shop.rexhill.com points to <code>lb9.uswest.vin65.com</code>, not Commerce7 directly.
              Commerce7 acquired WineDirect's SaaS division in January 2025, and winery migrations are
              running through 2026. The main site already uses Commerce7's frontend plugin (C7WP), so
              Rex Hill is mid-transition. Any e-commerce API integration should target Commerce7's
              endpoints, which will be the canonical platform once migration completes.
            </p>
          </div>
          <div className="finding-card">
            <h3>Tock is the reservation system</h3>
            <p>
              Tock processes reservations for 1,000+ wineries and has a formal Commerce7 integration
              that syncs customer info, club membership, and purchase history. This is the API surface
              our agent will use for booking tastings in Stage 3 — no custom reservation system to
              reverse-engineer.
            </p>
          </div>
          <div className="finding-card">
            <h3>Email marketing stack is in flux</h3>
            <p>
              Campaign Monitor handles current signup forms (visible in footer + SPF records), but
              Klaviyo site verification is also in DNS. They may be evaluating a switch or running both
              in parallel. Our email capture feature should support either platform.
            </p>
          </div>
          <div className="finding-card">
            <h3>DMARC is not enforced</h3>
            <p>
              <code>p=none</code> means email authentication is monitor-only. SPF includes four
              different sending domains. Not a risk for our integration, but worth noting as context
              about their IT maturity on the email side.
            </p>
          </div>
        </div>
      </section>

      {/* Integration roadmap */}
      <section className="panel">
        <h2>Integration Roadmap</h2>
        <p className="muted small" style={{ marginBottom: "1rem" }}>
          How the OregonWine.ai agent connects to Rex Hill's existing infrastructure at each stage —
          zero disruption, increasing value.
        </p>
        {INTEGRATION_STAGES.map((s) => (
          <div key={s.stage} className="stage-card">
            <div className="stage-header">
              <h3>{s.stage}</h3>
              <span className="stage-timeline">{s.timeline}</span>
            </div>
            <p className="stage-desc">{s.description}</p>
            <div className="stage-detail-grid">
              <div>
                <span className="stage-label">Their stack involved</span>
                <p>{s.theirStack}</p>
              </div>
              <div>
                <span className="stage-label">Our integration approach</span>
                <p>{s.ourIntegration}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ROI */}
      <section className="panel">
        <h2>ROI at a Glance</h2>
        <div className="roi-grid">
          <div className="roi-card">
            <div className="roi-value">$299</div>
            <div className="roi-label">Monthly cost</div>
          </div>
          <div className="roi-card">
            <div className="roi-value">~$6.75</div>
            <div className="roi-label">Our API cost per winery/month</div>
          </div>
          <div className="roi-card">
            <div className="roi-value">1</div>
            <div className="roi-label">Club signup every 6 weeks to break even</div>
          </div>
          <div className="roi-card">
            <div className="roi-value">$0</div>
            <div className="roi-label">Changes to their WordPress or hosting</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="panel" style={{ textAlign: "center", padding: "2rem" }}>
        <h2 style={{ marginBottom: "0.75rem" }}>See it in action</h2>
        <p style={{ maxWidth: "32rem", margin: "0 auto 1.25rem" }}>
          The Rex Hill agent is live. Ask it anything a visitor would ask — hours, tasting
          experiences, wine clubs, directions — and see how it responds in their voice.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            className="btn"
            href={`${import.meta.env.BASE_URL}widget-test.html`}
            target="_blank"
            rel="noreferrer"
          >
            Try the live demo
          </a>
          <Link className="btn btn-ghost" to="/rex-hill">
            Rex Hill partner page
          </Link>
        </div>
      </section>

      <p className="muted small" style={{ textAlign: "center", marginTop: "1rem" }}>
        Research conducted March 2026. DNS records, source HTML, and infrastructure lookups verified
        directly — not sourced from third-party profiler databases.
      </p>
    </article>
  );
}
