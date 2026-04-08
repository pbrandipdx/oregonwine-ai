import { useEffect, useState } from "react";
import { ChatWidget } from "../../widget/ChatWidget";
import { SEOHead } from "../../lib/seo";
import { PREVIEW_API_BASE, PREVIEW_CHAT_CONFIGS } from "./previewChatConfigs";

/**
 * Chehalem preview — mirrors chehalemwines.com:
 *   • Left-aligned "CHEHALEM" wordmark with a small floral badge glyph.
 *   • Right-aligned top nav: SHOP WINES / VISIT / STAY / ABOUT / CLUB /
 *     LEARN / TRADE & MEDIA plus social icons, LOG IN, and cart.
 *   • Full-bleed interior tasting room hero with a 2-line serif headline
 *     "Welcome to the Chehalem Estate Tasting Room" and a solid cream
 *     "BOOK YOUR EXPERIENCE" CTA pill.
 *   • Below-hero: circular "Valley of Flowers" badge and opening hours.
 */
export function ChehalemPreview() {
  const chat = PREVIEW_CHAT_CONFIGS.chehalem;
  const [chatOpen, setChatOpen] = useState(false);
  const [pulseDone, setPulseDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setPulseDone(true), 6500);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!chatOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setChatOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chatOpen]);

  const navItems = [
    "SHOP WINES",
    "VISIT",
    "STAY",
    "ABOUT",
    "CLUB",
    "LEARN",
    "TRADE & MEDIA",
  ];

  return (
    <div className="chp">
      <SEOHead
        title="Chehalem — Crushpad.ai Concierge Preview"
        description="Live preview of the Crushpad.ai Wine Agent embedded inside the Chehalem homepage."
        path="/chehalem/preview"
        noindex
      />

      <header className="chp-nav">
        <a href="#" className="chp-brand" aria-label="Chehalem">
          <span className="chp-brand-badge">❀</span>
          <span className="chp-brand-word">CHEHALEM</span>
        </a>

        <nav className="chp-nav-links">
          {navItems.map((item) => (
            <a key={item} href="#">
              {item}
            </a>
          ))}
        </nav>

        <div className="chp-nav-actions">
          <div className="chp-socials">
            <a href="#" aria-label="Facebook">
              f
            </a>
            <a href="#" aria-label="Twitter">
              t
            </a>
            <a href="#" aria-label="Instagram">
              IG
            </a>
            <a href="#" aria-label="YouTube">
              ▶
            </a>
          </div>
          <a href="#login" className="chp-top-link">
            LOG IN
          </a>
          <a href="#cart" className="chp-top-cart" aria-label="Cart">
            <CartIcon />
            <span className="chp-cart-count">0</span>
          </a>
          <button
            type="button"
            className={`chp-agent-trigger ${pulseDone ? "is-rest" : "is-pulsing"} ${chatOpen ? "is-open" : ""}`}
            onClick={() => setChatOpen((v) => !v)}
            aria-expanded={chatOpen}
            aria-label={chatOpen ? "Close Wine Agent" : "Open Wine Agent"}
          >
            <span className="chp-agent-icon">
              {chatOpen ? <CloseIcon /> : <SparkleIcon />}
            </span>
            <span className="chp-agent-label">Wine Agent</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="chp-hero">
        <div className="chp-hero-overlay" />
        <div className="chp-hero-inner">
          <h1>
            Welcome to the
            <br />
            Chehalem Estate Tasting Room
          </h1>
          <a href="#book" className="chp-hero-cta">
            BOOK YOUR EXPERIENCE
          </a>
        </div>
      </section>

      {/* Below-hero: badge + hours */}
      <section className="chp-hours">
        <div className="chp-seal" aria-hidden="true">
          <svg viewBox="0 0 140 140" width="130" height="130">
            <circle
              cx="70"
              cy="70"
              r="65"
              fill="none"
              stroke="#1c1c1c"
              strokeWidth="1.5"
            />
            <circle
              cx="70"
              cy="70"
              r="58"
              fill="none"
              stroke="#1c1c1c"
              strokeWidth="0.8"
            />
            <text
              x="70"
              y="22"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, serif"
              fontSize="9"
              letterSpacing="2"
              fill="#1c1c1c"
            >
              VALLEY OF FLOWERS
            </text>
            <text
              x="70"
              y="128"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, serif"
              fontSize="9"
              letterSpacing="3"
              fill="#1c1c1c"
            >
              CHEHALEM
            </text>
            <text
              x="22"
              y="82"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, serif"
              fontSize="7"
              fill="#1c1c1c"
            >
              ESTD
            </text>
            <text
              x="118"
              y="82"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, serif"
              fontSize="7"
              fill="#1c1c1c"
            >
              1990
            </text>
            <text
              x="70"
              y="78"
              textAnchor="middle"
              fontSize="24"
              fill="#1c1c1c"
            >
              ❀
            </text>
          </svg>
        </div>

        <h2 className="chp-hours-title">Hours At Chehalem Estate Tasting Room</h2>
        <p className="chp-hours-main">
          <strong>Open daily from 10:30 am to 5:30 pm</strong>
        </p>
        <div className="chp-hours-special">
          <p>Upcoming Special Hours:</p>
          <p>April 3: Closing at 4:30 pm, last reservation at 2:15 pm</p>
          <p>May 14: Closing at 3 pm, last reservation at 12:45 pm</p>
          <p>May 21: Closing at 3:30 pm, last reservation at 2 pm</p>
        </div>
      </section>

      <footer className="chp-footer">
        Mockup of <a href={chat.wineryUrl}>chehalemwines.com</a> with the
        Crushpad.ai Wine Agent embedded. Not a real Chehalem property —
        content shown for demonstration only.
      </footer>

      {chatOpen && (
        <div className="chp-scrim" onClick={() => setChatOpen(false)} />
      )}
      <div
        className={`chp-popover ${chatOpen ? "is-open" : ""}`}
        aria-hidden={!chatOpen}
      >
        <div className="chp-popover-inner">
          <ChatWidget
            apiKey={chat.apiKey}
            apiBase={PREVIEW_API_BASE}
            themeColor={chat.themeColor}
            wineryLabel={chat.wineryLabel}
            embedded
            embeddedChrome="panel"
            headerLockup="full"
            headerCrestImageUrl={chat.crestImage}
            wineryUrl={chat.wineryUrl}
            bookingPath={chat.bookingPath}
            clubPath={chat.clubPath}
            wineryPhone={chat.phone}
            quickReplyRoutes={chat.quickReplyRoutes}
          />
        </div>
      </div>

      <style>{`
        .chp {
          --chp-ink: #1c1c1c;
          --chp-muted: #6b6b68;
          --chp-line: #e6e4de;
          --chp-cream: #f4eee1;
          --chp-blue: #233a5c;
          --chp-beige: #d4c9b0;
          --chp-serif: "Cormorant Garamond", "Playfair Display", Georgia, serif;
          --chp-sans: "Inter", system-ui, -apple-system, sans-serif;
          background: #fff;
          color: var(--chp-ink);
          font-family: var(--chp-sans);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* ── Nav ── */
        .chp-nav {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 2rem;
          padding: 1rem 2rem;
          background: #fff;
          border-bottom: 1px solid var(--chp-line);
          position: sticky;
          top: 0;
          z-index: 1100;
        }
        .chp-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: var(--chp-ink);
        }
        .chp-brand-badge {
          font-size: 1.6rem;
          color: var(--chp-beige);
        }
        .chp-brand-word {
          font-family: var(--chp-serif);
          font-size: 1.35rem;
          font-weight: 600;
          letter-spacing: 0.3em;
        }
        .chp-nav-links {
          display: flex;
          gap: 1.8rem;
          justify-self: end;
          padding-right: 1rem;
        }
        .chp-nav-links a {
          color: var(--chp-ink);
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          white-space: nowrap;
          transition: color 0.2s;
        }
        .chp-nav-links a:hover {
          color: var(--chp-blue);
        }
        .chp-nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .chp-socials {
          display: flex;
          gap: 0.5rem;
        }
        .chp-socials a {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: var(--chp-ink);
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          text-decoration: none;
          font-family: var(--chp-serif);
        }
        .chp-top-link {
          color: var(--chp-ink);
          text-decoration: none;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
        }
        .chp-top-cart {
          position: relative;
          color: var(--chp-ink);
        }
        .chp-cart-count {
          position: absolute;
          top: -4px;
          right: -8px;
          background: var(--chp-beige);
          color: var(--chp-ink);
          font-size: 0.6rem;
          font-weight: 700;
          border-radius: 999px;
          padding: 0.1rem 0.38rem;
          min-width: 1rem;
          text-align: center;
        }

        /* ── Wine Agent trigger ── */
        .chp-agent-trigger {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--chp-blue);
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 0.55rem 1rem 0.55rem 0.8rem;
          font-family: var(--chp-sans);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(35, 58, 92, 0.3);
          opacity: 0;
          transform: scale(0.6);
          animation: chp-agent-in 0.7s cubic-bezier(0.22, 1.2, 0.36, 1) 0.4s forwards;
          transition: transform 0.18s, background 0.18s;
        }
        .chp-agent-trigger:hover { background: #152442; }
        .chp-agent-trigger.is-pulsing::before {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 999px;
          border: 2px solid var(--chp-blue);
          opacity: 0;
          animation: chp-agent-pulse 1.8s ease-out 1.1s 3;
        }
        .chp-agent-icon { display: inline-flex; width: 0.95rem; height: 0.95rem; }
        @keyframes chp-agent-in {
          0% { opacity: 0; transform: scale(0.6) translateY(-4px); }
          60% { opacity: 1; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes chp-agent-pulse {
          0% { opacity: 0.7; transform: scale(0.95); }
          100% { opacity: 0; transform: scale(1.55); }
        }

        /* ── Hero ── */
        .chp-hero {
          position: relative;
          height: clamp(460px, 60vh, 640px);
          background-image: url("https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2200&q=80");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }
        .chp-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%);
        }
        .chp-hero-inner {
          position: relative;
          z-index: 1;
          padding: 0 1.5rem;
          max-width: 60rem;
        }
        .chp-hero h1 {
          font-family: var(--chp-serif);
          font-size: clamp(2rem, 4.6vw, 3.2rem);
          font-weight: 500;
          line-height: 1.2;
          margin: 0 0 2.2rem;
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.55);
        }
        .chp-hero-cta {
          display: inline-block;
          background: var(--chp-beige);
          color: var(--chp-ink);
          text-decoration: none;
          padding: 0.95rem 2rem;
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          font-weight: 600;
          border: 1px solid var(--chp-beige);
          transition: background 0.25s, color 0.25s;
        }
        .chp-hero-cta:hover {
          background: transparent;
          color: #fff;
        }

        /* ── Hours section ── */
        .chp-hours {
          text-align: center;
          padding: 4rem 1.5rem 5rem;
          background: #fff;
        }
        .chp-seal {
          display: flex;
          justify-content: center;
          margin-bottom: 1.75rem;
        }
        .chp-hours-title {
          font-family: var(--chp-serif);
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0 0 1.2rem;
        }
        .chp-hours-main {
          font-size: 0.95rem;
          margin: 0 0 2rem;
          color: var(--chp-ink);
        }
        .chp-hours-special {
          font-size: 0.85rem;
          color: var(--chp-ink);
          line-height: 1.65;
        }
        .chp-hours-special p {
          margin: 0;
        }
        .chp-hours-special p:first-child {
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        /* ── Footer ── */
        .chp-footer {
          text-align: center;
          padding: 2rem 1.5rem;
          color: var(--chp-muted);
          font-size: 0.75rem;
          background: var(--chp-cream);
          border-top: 1px solid var(--chp-line);
        }
        .chp-footer a { color: var(--chp-blue); }

        /* ── Chat popover ── */
        .chp-scrim {
          position: fixed;
          inset: 0;
          background: rgba(20, 20, 20, 0.38);
          backdrop-filter: blur(2px);
          z-index: 999;
        }
        .chp-popover {
          position: fixed;
          top: 5.5rem;
          right: 1.5rem;
          width: min(420px, calc(100vw - 3rem));
          height: min(640px, calc(100vh - 7rem));
          z-index: 1000;
          pointer-events: none;
          opacity: 0;
          transform: translateY(-12px) scale(0.92);
          transform-origin: top right;
          transition: opacity 0.32s ease, transform 0.32s cubic-bezier(0.22, 1.2, 0.36, 1);
        }
        .chp-popover.is-open {
          pointer-events: auto;
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .chp-popover-inner {
          width: 100%;
          height: 100%;
          background: #0a0a0a;
          border: 1px solid rgba(35, 58, 92, 0.45);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(35, 58, 92, 0.35);
          display: flex;
          flex-direction: column;
        }
        .chp-popover-inner > * {
          flex: 1;
          min-height: 0;
        }

        @media (max-width: 1100px) {
          .chp-nav-links { display: none; }
          .chp-nav { grid-template-columns: 1fr auto; padding: 0.85rem 1.25rem; gap: 0.75rem; }
        }
        @media (max-width: 700px) {
          .chp-socials { display: none; }
          .chp-top-link { display: none; }
          .chp-brand-word { font-size: 1.15rem; letter-spacing: 0.24em; }
          .chp-brand-badge { font-size: 1.3rem; }
          .chp-agent-label { display: none; }
          .chp-agent-trigger { padding: 0.55rem 0.65rem; }
          .chp-hero { height: clamp(420px, 58vh, 520px); }
          .chp-hero h1 { font-size: clamp(1.6rem, 6.5vw, 2.4rem); margin-bottom: 1.5rem; }
          .chp-hero-cta { padding: 0.85rem 1.5rem; font-size: 0.72rem; letter-spacing: 0.16em; }
          .chp-hours { padding: 3rem 1.25rem 3.5rem; }
          .chp-hours-title { font-size: 1.15rem; }
          .chp-popover {
            top: auto;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 82vh;
            border-radius: 16px 16px 0 0;
          }
          .chp-popover-inner { border-radius: 16px 16px 0 0; }
        }
      `}</style>
    </div>
  );
}

function CartIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path
        d="M5 7h14l-1.5 9a2 2 0 0 1-2 1.7H8.5a2 2 0 0 1-2-1.7L5 7z"
        strokeLinejoin="round"
      />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
