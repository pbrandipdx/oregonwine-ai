import { Link } from "react-router-dom";

/* ── static research data ─────────────────────────────────────────────── */

const STACK_ROWS: { layer: string; tool: string; detail: string; verified: string }[] = [
  {
    layer: "CMS / Site Builder",
    tool: "Squarespace 7.1",
    detail: "Full-stack hosted platform. HTML source contains Squarespace static-context JSON, SQUARESPACE_CONTEXT global, and .sqs-block class structure throughout.",
    verified: "Source HTML, inline JSON config",
  },
  {
    layer: "Hosting",
    tool: "Squarespace (built-in)",
    detail: "A records resolve to Squarespace's infrastructure (198.185.159.x / 198.49.23.x). No separate hosting provider — Squarespace handles CDN, SSL, and origin.",
    verified: "DNS A record lookup",
  },
  {
    layer: "DNS / Domain",
    tool: "Squarespace Domains",
    detail: "Nameservers are ns1-ns4.squarespace.com. Domain registered and managed entirely within Squarespace.",
    verified: "NS record lookup",
  },
  {
    layer: "E-commerce",
    tool: "Commerce7",
    detail: "Wine shop, cart, checkout, and club signup powered by Commerce7 widgets embedded into Squarespace pages. C7 JavaScript SDK loaded on shop pages.",
    verified: "Source HTML, Commerce7 script tags",
  },
  {
    layer: "Reservations",
    tool: "Tock (exploretock.com)",
    detail: "Barrel Room Tasting reservations handled via Tock embed. Tock widget loaded on the visit page.",
    verified: "Source HTML, Tock script init",
  },
  {
    layer: "Analytics",
    tool: "Google Analytics (GA4)",
    detail: "GA4 measurement ID present in page source. Loaded directly (no GTM container layer).",
    verified: "Source HTML, gtag.js calls",
  },
  {
    layer: "Email Marketing",
    tool: "Mailchimp",
    detail: "Newsletter signup forms post to Mailchimp endpoints. Squarespace's built-in Mailchimp integration handles subscriber sync.",
    verified: "Source HTML, form action URLs",
  },
  {
    layer: "Age Gate",
    tool: "Squarespace plugin / custom code",
    detail: "21+ alcohol age verification gate on site entry — required for all US winery direct-to-consumer sites.",
    verified: "Source HTML",
  },
  {
    layer: "Fonts",
    tool: "Squarespace built-in type kit",
    detail: "System and Squarespace-hosted web fonts. Clean sans-serif heading + body type pairing consistent with Squarespace 7.1 templates.",
    verified: "Source CSS, font-face declarations",
  },
  {
    layer: "Corporate Email",
    tool: "Google Workspace",
    detail: "MX records point to Google (aspmx.l.google.com + alt MX servers). SPF includes _spf.google.com.",
    verified: "MX + TXT DNS records",
  },
  {
    layer: "SSL / TLS",
    tool: "Let's Encrypt (via Squarespace)",
    detail: "Squarespace auto-provisions and renews SSL certificates for custom domains using Let's Encrypt.",
    verified: "Certificate inspection",
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
    timeline: "Live",
    description:
      "RAG-powered chat widget answers visitor questions 24/7 using content crawled from crowleywines.com. Covers tasting options, hours, wine club details, food pairings, and winemaking philosophy. Embedded via a single script tag — no changes to Squarespace templates or hosting.",
    theirStack: "Squarespace 7.1",
    ourIntegration:
      "Zero-touch. Widget loads from our CDN. A code injection block in Squarespace's Settings → Advanced → Code Injection is the only change. No server-side modifications needed. Already proven with live demo at crushpad.ai/crowley/demo.",
  },
  {
    stage: "Stage 2 — Contextual Assistant",
    timeline: "3–6 months",
    description:
      "Session memory, personalization, and smart reservation intent detection. When visitors ask about visiting, the agent surfaces Tock booking links for the Barrel Room Tasting instead of just describing it.",
    theirStack: "Tock reservation system",
    ourIntegration:
      "The agent detects booking intent and deep-links to the Tock reservation page with the Barrel Room experience pre-selected. No API integration needed yet — just intelligent linking using their existing Tock embed.",
  },
  {
    stage: "Stage 3 — Action-Taking Agent",
    timeline: "6–12 months",
    description:
      "The agent books tastings, walks visitors through wine club signups, and captures email leads — all inside the chat conversation.",
    theirStack: "Tock API + Commerce7 API + Mailchimp",
    ourIntegration:
      "Tock's Commerce7 integration syncs customer data and purchase history. Our agent uses Claude tool-calling to create Tock reservations via their API, push email captures to Mailchimp, and surface Commerce7 club/product data. Squarespace's Mailchimp integration means subscriber lists stay in sync automatically.",
  },
  {
    stage: "Stage 4 — Full Platform",
    timeline: "12–24 months",
    description:
      "Proactive outreach, cross-session memory, multi-channel (site + email + SMS), and analytics agent that surfaces insights from chat data.",
    theirStack: "GA4 + Google Workspace + Social channels",
    ourIntegration:
      "Chat analytics complement GA4 with intent-level visitor data standard analytics can't capture. Proactive outreach flows through Mailchimp. Crowley's small production and intimate tasting model mean even one additional club signup per month from the agent pays for the entire service.",
  },
];

/* ── component ────────────────────────────────────────────────────────── */

export function CrowleyResearchPage() {
  return (
    <article className="research-page">
      <Link className="back" to="/crowley">
        ← Crowley Wines
      </Link>

      {/* Header */}
      <header className="page-head" style={{ marginBottom: "0.5rem" }}>
        <p className="eyebrow">Technical Research Brief</p>
        <h1>Crowley Wines — Site Infrastructure Analysis</h1>
        <p className="muted" style={{ maxWidth: "42rem", marginTop: "0.5rem" }}>
          A verified breakdown of how crowleywines.com is built, hosted, and connected — and how
          Crushpad.ai integrates at every stage without disrupting their existing infrastructure.
        </p>
      </header>

      {/* Ownership context */}
      <section className="panel" style={{ marginTop: "1.5rem" }}>
        <h2>Ownership &amp; Winery Context</h2>
        <p style={{ margin: 0 }}>
          Crowley Wines is an independent, family-owned winery founded by{" "}
          <strong>Tyson Crowley</strong> in the Willamette Valley. Crowley operates out of the{" "}
          <strong>August Cellars Cooperative</strong> in Newberg, focusing on minimal-intervention
          winemaking with grapes sourced from vineyards across McMinnville, Dundee Hills, and
          Eola-Amity Hills AVAs. With small production and a single tasting experience (the Barrel
          Room Tasting), Crowley exemplifies the artisan winery segment — exactly where an AI
          assistant adds the most value by extending their limited staff capacity.
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
            <h3>Squarespace simplifies deployment</h3>
            <p>
              Unlike WordPress sites that require theme file edits or plugin installation, Squarespace
              has a built-in Code Injection feature (Settings → Advanced → Code Injection) that accepts
              a script tag in the header or footer. This is the easiest possible deployment path for
              our widget — no FTP, no plugin approval process, no theme compatibility concerns.
            </p>
          </div>
          <div className="finding-card">
            <h3>Commerce7 powers the shop</h3>
            <p>
              Crowley uses Commerce7 for their wine shop, cart, and club signup — the same platform Rex
              Hill uses on their frontend. Commerce7's API is well-documented and includes endpoints
              for products, customers, clubs, and orders. This gives us a consistent integration
              surface across partner wineries.
            </p>
          </div>
          <div className="finding-card">
            <h3>Small-production model amplifies ROI</h3>
            <p>
              Crowley produces limited quantities across a focused portfolio. Every visitor interaction
              matters more. An AI assistant that converts even one additional tasting visit or club
              signup per month represents significant incremental revenue relative to their scale.
            </p>
          </div>
          <div className="finding-card">
            <h3>Reservation-only model needs 24/7 support</h3>
            <p>
              Since Crowley is by-reservation-only, potential visitors who land on the site outside
              business hours have no way to get questions answered or feel encouraged to book. The
              chatbot fills this gap — answering questions about the Barrel Room experience, wine
              availability, and directions at any hour.
            </p>
          </div>
        </div>
      </section>

      {/* Integration roadmap */}
      <section className="panel">
        <h2>Integration Roadmap</h2>
        <p className="muted small" style={{ marginBottom: "1rem" }}>
          How the Crushpad.ai agent connects to Crowley's existing infrastructure at each stage —
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
            <div className="roi-value">1–2h</div>
            <div className="roi-label">Setup to live on their site</div>
          </div>
          <div className="roi-card">
            <div className="roi-value">~$7</div>
            <div className="roi-label">Our API cost per winery/month</div>
          </div>
          <div className="roi-card">
            <div className="roi-value">1</div>
            <div className="roi-label">Extra club signup/month to break even</div>
          </div>
          <div className="roi-card">
            <div className="roi-value">$0</div>
            <div className="roi-label">Changes to their Squarespace site</div>
          </div>
        </div>
      </section>

      <p className="muted small" style={{ textAlign: "center", marginTop: "1rem" }}>
        Research conducted March–April 2026. DNS records, source HTML, and infrastructure lookups
        verified directly — not sourced from third-party profiler databases.
      </p>
    </article>
  );
}
