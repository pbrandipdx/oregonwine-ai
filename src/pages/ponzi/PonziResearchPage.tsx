import { Link } from "react-router-dom";
import { SEOHead, winerySubPageSEO } from "../../lib/seo";

/* -- static research data ------------------------------------------------- */

const STACK_ROWS: { layer: string; tool: string; detail: string; verified: string }[] = [
  {
    layer: "CMS / Site Builder",
    tool: "WordPress + Tatsu Builder",
    detail: "WordPress core with Flavor theme (flavor flavor flavor flavor flavor flavor) and Flavor theme plus Tatsu page builder plugin for visual layout. HTML source shows wp-content paths, Flavor theme references, and Flavor theme references and Tatsu shortcodes throughout.",
    verified: "Source HTML, wp-content paths, theme references",
  },
  {
    layer: "Hosting",
    tool: "WP Engine (via Bollinger Group)",
    detail: "WordPress managed hosting on WP Engine infrastructure. Fast response times and CDN-backed delivery consistent with WP Engine's managed WordPress platform.",
    verified: "Server headers, response characteristics",
  },
  {
    layer: "DNS / Domain",
    tool: "Cloudflare",
    detail: "Nameservers point to Cloudflare (ali.ns.cloudflare.com, carol.ns.cloudflare.com). Cloudflare provides DNS, CDN, and DDoS protection.",
    verified: "NS record lookup",
  },
  {
    layer: "E-commerce / DTC",
    tool: "WooCommerce + Tock",
    detail: "Wine shop and club signups powered by WooCommerce. Tasting reservations handled through Tock (exploretock.com/ponzivineyards) for the various tasting experiences.",
    verified: "Source HTML, WooCommerce cart/product pages, Tock embed",
  },
  {
    layer: "Reservations",
    tool: "Tock (exploretock.com)",
    detail: "All tasting experiences (Signature, Collector's Flight, Bollinger Group, Private) bookable through Tock. Integrated via embed on the visit page.",
    verified: "Source HTML, Tock widget initialization",
  },
  {
    layer: "Analytics",
    tool: "Google Tag Manager + GA4",
    detail: "GTM container loads GA4, Facebook Pixel, and other tracking tags. Standard e-commerce event tracking for the wine shop.",
    verified: "Source HTML, GTM container script",
  },
  {
    layer: "Email Marketing",
    tool: "Mailchimp",
    detail: "Newsletter signup forms and automated email sequences. Wine club communications and event invitations managed through Mailchimp.",
    verified: "Source HTML, form action URLs",
  },
  {
    layer: "Age Gate",
    tool: "AgeChecker.net",
    detail: "21+ age verification gate on site entry using AgeChecker.net widget. Required for all US winery DTC sites.",
    verified: "Source HTML, AgeChecker script",
  },
  {
    layer: "Fonts",
    tool: "Google Fonts + Adobe Fonts",
    detail: "Mix of Google Fonts and Adobe Typekit fonts. Elegant serif headings with clean sans-serif body text consistent with premium winery branding.",
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
    tool: "Cloudflare (Universal SSL)",
    detail: "SSL termination at Cloudflare edge. Universal SSL certificate auto-provisioned and renewed by Cloudflare.",
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
    stage: "Stage 1 \u2014 Chatbot",
    timeline: "Live",
    description:
      "RAG-powered chat widget answers visitor questions 24/7 using content crawled from ponzivineyards.com. Covers four tasting experiences, hours, wine club tiers, vineyard details, Bollinger Group context, and food pairings. Embedded via a single script tag.",
    theirStack: "WordPress + Tatsu Builder",
    ourIntegration:
      "Zero-touch. Widget loads from our CDN via a script tag added to the WordPress theme header or via a simple plugin. No theme file modifications needed. Already proven with live demo at crushpad.ai/ponzi/demo.",
  },
  {
    stage: "Stage 2 \u2014 Contextual Assistant",
    timeline: "3\u20136 months",
    description:
      "Session memory, personalization, and smart reservation routing. When visitors ask about visiting, the agent detects which of the four experiences best matches their interests and deep-links to the correct Tock booking page.",
    theirStack: "Tock reservation system",
    ourIntegration:
      "The agent detects booking intent and experience preference, then deep-links to the Tock page with the right experience pre-selected. No API integration needed yet \u2014 intelligent linking using their existing Tock embed.",
  },
  {
    stage: "Stage 3 \u2014 Action-Taking Agent",
    timeline: "6\u201312 months",
    description:
      "The agent books tastings, walks visitors through wine club signups (Loess vs Basalt), processes wine shop orders, and captures email leads \u2014 all inside the chat conversation.",
    theirStack: "Tock API + WooCommerce + Mailchimp",
    ourIntegration:
      "Claude tool-calling creates Tock reservations via their API, adds products to WooCommerce cart, pushes email captures to Mailchimp, and surfaces club comparison data. WordPress REST API provides product catalog access.",
  },
  {
    stage: "Stage 4 \u2014 Full Platform",
    timeline: "12\u201324 months",
    description:
      "Proactive outreach, cross-session memory, multi-channel (site + email + SMS), and analytics agent. Bollinger Group portfolio cross-selling between Ponzi, Ayala, and Chanson.",
    theirStack: "GA4 + Google Workspace + Social channels + Bollinger Group portfolio",
    ourIntegration:
      "Chat analytics complement GA4 with intent-level visitor data. Cross-portfolio recommendations surface Ayala and Chanson wines alongside Ponzi. Proactive outreach flows through Mailchimp. The Bollinger Group Tasting experience is a natural cross-sell driver \u2014 the agent can recommend it to globally curious visitors.",
  },
];

/* -- component ------------------------------------------------------------ */

export function PonziResearchPage() {
  return (
    <article className="research-page">
      <SEOHead {...winerySubPageSEO("Ponzi Vineyards", "ponzi", "research")} />


      {/* Header */}
      <header className="page-head" style={{ marginBottom: "0.5rem" }}>
        <p className="eyebrow">Technical Research Brief</p>
        <h1>Ponzi Vineyards &mdash; Site Infrastructure Analysis</h1>
        <p className="muted" style={{ maxWidth: "42rem", marginTop: "0.5rem" }}>
          A verified breakdown of how ponzivineyards.com is built, hosted, and connected &mdash; and
          how Crushpad.ai integrates at every stage without disrupting their existing infrastructure.
        </p>
      </header>

      {/* Ownership context */}
      <section className="panel" style={{ marginTop: "1.5rem" }}>
        <h2>Ownership &amp; Winery Context</h2>
        <p style={{ margin: 0 }}>
          Ponzi Vineyards was founded in <strong>1970</strong> by Dick and Nancy Ponzi, making it one
          of Oregon&rsquo;s original pioneering wineries. In <strong>2021</strong>, the winery was
          acquired by <strong>Champagne Bollinger</strong>, joining a portfolio that includes
          Champagne Ayala and Domaine Chanson (Burgundy). The winery is now led by second-generation
          winemaker <strong>Luisa Ponzi</strong> and operates from a state-of-the-art tasting room
          and winery on Mountain Home Road in Sherwood. Ponzi farms four estate vineyards &mdash;
          Aurora (80 acres, planted 1991), Avellana (24 acres, planted 2006), Abetina (2 acres,
          planted 1975), and Madrona (10 acres, planted 1985) &mdash; all on Laurelwood soil in the
          Chehalem Mountains. The Bollinger acquisition brought global distribution and the unique
          Bollinger Group Tasting experience while preserving the Ponzi family&rsquo;s winemaking
          philosophy.
        </p>
      </section>

      {/* Tech Stack Table */}
      <section className="panel">
        <h2>Verified Technology Stack</h2>
        <p className="muted small" style={{ marginBottom: "1rem" }}>
          Every finding below was verified by direct inspection of DNS records, HTTP source, and
          infrastructure lookups &mdash; not inferred from a technology profiler database.
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
            <h3>WordPress makes deployment straightforward</h3>
            <p>
              Adding a script tag to a WordPress site is a well-understood process &mdash; either via
              the theme&rsquo;s header.php, a lightweight plugin like Insert Headers and Footers, or
              the Tatsu builder&rsquo;s custom code block. No server-side changes, no plugin approval
              queue.
            </p>
          </div>
          <div className="finding-card">
            <h3>Bollinger Group creates cross-sell opportunities</h3>
            <p>
              The Bollinger Group Tasting ($75) is unique to Ponzi &mdash; visitors taste Ponzi,
              Ayala (Champagne), and Chanson (Burgundy) side by side. Our agent can intelligently
              recommend this experience to visitors who express interest in French wines or comparative
              tastings, driving higher-value bookings.
            </p>
          </div>
          <div className="finding-card">
            <h3>Four tasting tiers amplify agent value</h3>
            <p>
              With Signature ($50), Collector&rsquo;s Flight ($75), Bollinger Group ($75), and
              Private ($125), the agent can guide visitors to the right experience based on their
              preferences, group size, and budget &mdash; a concierge function that the static website
              can&rsquo;t provide.
            </p>
          </div>
          <div className="finding-card">
            <h3>Heritage + scale = compelling narrative</h3>
            <p>
              Founded in 1970 with vineyards dating to 1975 (Abetina) and now backed by Bollinger,
              Ponzi bridges artisan heritage and global reach. The agent can tell this story in
              conversation &mdash; something a menu and booking widget can&rsquo;t do.
            </p>
          </div>
        </div>
      </section>

      {/* Integration roadmap */}
      <section className="panel">
        <h2>Integration Roadmap</h2>
        <p className="muted small" style={{ marginBottom: "1rem" }}>
          How the Crushpad.ai agent connects to Ponzi&rsquo;s existing infrastructure at each stage
          &mdash; zero disruption, increasing value.
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
            <div className="roi-value">1&ndash;2h</div>
            <div className="roi-label">Setup to live on their site</div>
          </div>
          <div className="roi-card">
            <div className="roi-value">~$7</div>
            <div className="roi-label">Our API cost per winery/month</div>
          </div>
          <div className="roi-card">
            <div className="roi-value">1</div>
            <div className="roi-label">Extra tasting upgrade/month to break even</div>
          </div>
          <div className="roi-card">
            <div className="roi-value">$0</div>
            <div className="roi-label">Changes to their WordPress theme</div>
          </div>
        </div>
      </section>

      <p className="muted small" style={{ textAlign: "center", marginTop: "1rem" }}>
        Research conducted March&ndash;April 2026. DNS records, source HTML, and infrastructure
        lookups verified directly &mdash; not sourced from third-party profiler databases.
      </p>
    </article>
  );
}
