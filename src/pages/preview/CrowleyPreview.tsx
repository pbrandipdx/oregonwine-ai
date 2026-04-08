import { useEffect, useState } from "react";
import { ChatWidget } from "../../widget/ChatWidget";
import { SEOHead } from "../../lib/seo";
import { PREVIEW_API_BASE, PREVIEW_CHAT_CONFIGS } from "./previewChatConfigs";

/**
 * Crowley preview — mirrors crowleywines.com:
 *   • Thin espresso-brown utility bar with Log in + cart on the right.
 *   • Sage-green nav band below it: serif "CROWLEY" wordmark on the
 *     left, HOME / SHOP / CLUB / ABOUT / CONNECT / TRADE nav items
 *     centered, and a small CW monogram on the right.
 *   • Full-bleed vineyard-row hero with eyebrow text, serif headline,
 *     and a solid sage SHOP NOW CTA pill.
 *   • Below: "DISCOVER · The Vineyards" paragraph + burgundy button.
 */
export function CrowleyPreview() {
  const chat = PREVIEW_CHAT_CONFIGS.crowley;
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

  return (
    <div className="crw">
      <SEOHead
        title="Crowley Wines — Crushpad.ai Concierge Preview"
        description="Live preview of the Crushpad.ai Wine Agent embedded inside the Crowley Wines homepage."
        path="/crowley/preview"
        noindex
      />

      {/* Top utility strip */}
      <div className="crw-top">
        <div className="crw-top-inner">
          <a href="#cart" className="crw-top-cart" aria-label="Cart">
            <span className="crw-top-cart-icon">
              <CartIcon />
              <span className="crw-top-cart-count">0</span>
            </span>
            <span className="crw-top-cart-label">Log in</span>
          </a>
        </div>
      </div>

      {/* Sage nav band */}
      <header className="crw-nav">
        <a href="#" className="crw-brand" aria-label="Crowley">
          <span className="crw-brand-word">CROWLEY</span>
        </a>

        <nav className="crw-nav-links">
          {["HOME", "SHOP", "CLUB", "ABOUT", "CONNECT", "TRADE"].map((item) => (
            <a key={item} href="#" className={item === "HOME" ? "is-active" : ""}>
              {item}
            </a>
          ))}
        </nav>

        <div className="crw-nav-actions">
          <span className="crw-monogram" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="30" height="30">
              <text
                x="16"
                y="22"
                textAnchor="middle"
                fontFamily="Cormorant Garamond, serif"
                fontSize="22"
                fontStyle="italic"
                fill="#c89b52"
              >
                C
              </text>
              <text
                x="22"
                y="26"
                textAnchor="middle"
                fontFamily="Cormorant Garamond, serif"
                fontSize="11"
                fill="#c89b52"
              >
                w
              </text>
            </svg>
          </span>
          <button
            type="button"
            className={`crw-agent-trigger ${pulseDone ? "is-rest" : "is-pulsing"} ${chatOpen ? "is-open" : ""}`}
            onClick={() => setChatOpen((v) => !v)}
            aria-expanded={chatOpen}
            aria-label={chatOpen ? "Close Wine Agent" : "Open Wine Agent"}
          >
            <span className="crw-agent-icon">
              {chatOpen ? <CloseIcon /> : <SparkleIcon />}
            </span>
            <span className="crw-agent-label">Wine Agent</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="crw-hero">
        <div className="crw-hero-overlay" />
        <div className="crw-hero-inner">
          <p className="crw-hero-eyebrow">
            PREMIER WINES FROM OREGON'S WILLAMETTE VALLEY
          </p>
          <h1>Transparent, Terroir-Driven Winemaking</h1>
          <a href="#shop" className="crw-hero-cta">
            SHOP NOW
          </a>
        </div>
      </section>

      {/* Discover the Vineyards */}
      <section className="crw-discover">
        <div className="crw-discover-img" aria-hidden="true" />
        <div className="crw-discover-copy">
          <p className="crw-discover-eyebrow">DISCOVER</p>
          <h2>The Vineyards</h2>
          <p className="crw-discover-body">
            The vineyards are in essence the wines…the voices of place in the
            glass. Our choices of vineyards have always been careful and our
            commitment time-tested.
          </p>
          <a href="#vineyards" className="crw-discover-cta">
            ABOUT THE VINEYARDS
          </a>
        </div>
      </section>

      <footer className="crw-footer">
        Mockup of <a href={chat.wineryUrl}>crowleywines.com</a> with the
        Crushpad.ai Wine Agent embedded. Not a real Crowley Wines property —
        content shown for demonstration only.
      </footer>

      {chatOpen && (
        <div className="crw-scrim" onClick={() => setChatOpen(false)} />
      )}
      <div
        className={`crw-popover ${chatOpen ? "is-open" : ""}`}
        aria-hidden={!chatOpen}
      >
        <div className="crw-popover-inner">
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
        .crw {
          --crw-espresso: #433328;
          --crw-sage: #b1bca1;
          --crw-sage-dark: #8c9a7e;
          --crw-ink: #3d2e24;
          --crw-muted: #7d6f64;
          --crw-line: #dcd4c6;
          --crw-cream: #f4eddd;
          --crw-burgundy: #a54148;
          --crw-gold: #c89b52;
          --crw-serif: "Cormorant Garamond", "Playfair Display", Georgia, serif;
          --crw-sans: "Inter", system-ui, -apple-system, sans-serif;
          background: #fff;
          color: var(--crw-ink);
          font-family: var(--crw-sans);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* ── Top utility strip ── */
        .crw-top {
          background: var(--crw-espresso);
          color: #e8dcc8;
        }
        .crw-top-inner {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 0.45rem 2rem;
        }
        .crw-top-cart {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #e8dcc8;
          text-decoration: none;
          font-size: 0.8rem;
          letter-spacing: 0.02em;
        }
        .crw-top-cart-icon {
          position: relative;
          display: inline-flex;
          background: var(--crw-sage);
          width: 28px;
          height: 28px;
          border-radius: 999px;
          align-items: center;
          justify-content: center;
          color: var(--crw-espresso);
        }
        .crw-top-cart-count {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--crw-sage-dark);
          color: #fff;
          font-size: 0.55rem;
          font-weight: 700;
          border-radius: 999px;
          padding: 0.08rem 0.35rem;
          min-width: 0.9rem;
          text-align: center;
        }

        /* ── Sage nav band ── */
        .crw-nav {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 1.5rem;
          padding: 1.3rem 2rem;
          background: var(--crw-sage);
          position: sticky;
          top: 0;
          z-index: 1100;
        }
        .crw-brand {
          justify-self: start;
          text-decoration: none;
          color: var(--crw-ink);
        }
        .crw-brand-word {
          font-family: var(--crw-serif);
          font-size: 1.9rem;
          letter-spacing: 0.24em;
          padding-left: 0.24em;
          font-weight: 500;
        }
        .crw-nav-links {
          display: flex;
          gap: 2.2rem;
          justify-self: center;
        }
        .crw-nav-links a {
          color: var(--crw-ink);
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          transition: color 0.2s;
          position: relative;
          padding-bottom: 0.2rem;
        }
        .crw-nav-links a:hover { color: #fff; }
        .crw-nav-links a.is-active {
          color: #fff;
        }
        .crw-nav-links a.is-active::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 1px;
          background: #fff;
        }
        .crw-nav-actions {
          justify-self: end;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .crw-monogram { display: inline-flex; }

        /* ── Wine Agent trigger ── */
        .crw-agent-trigger {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--crw-burgundy);
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 0.55rem 1rem 0.55rem 0.8rem;
          font-family: var(--crw-sans);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(165, 65, 72, 0.35);
          opacity: 0;
          transform: scale(0.6);
          animation: crw-agent-in 0.7s cubic-bezier(0.22, 1.2, 0.36, 1) 0.4s forwards;
          transition: transform 0.18s, background 0.18s;
        }
        .crw-agent-trigger:hover { background: #8c3339; }
        .crw-agent-trigger.is-pulsing::before {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 999px;
          border: 2px solid var(--crw-burgundy);
          opacity: 0;
          animation: crw-agent-pulse 1.8s ease-out 1.1s 3;
        }
        .crw-agent-icon { display: inline-flex; width: 0.95rem; height: 0.95rem; }
        @keyframes crw-agent-in {
          0% { opacity: 0; transform: scale(0.6) translateY(-4px); }
          60% { opacity: 1; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes crw-agent-pulse {
          0% { opacity: 0.7; transform: scale(0.95); }
          100% { opacity: 0; transform: scale(1.55); }
        }

        /* ── Hero ── */
        .crw-hero {
          position: relative;
          height: clamp(460px, 60vh, 640px);
          background-image: url("https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=2200&q=80");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .crw-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.0) 55%, rgba(0,0,0,0.18) 100%);
        }
        .crw-hero-inner {
          position: relative;
          z-index: 1;
          padding: 0 1.5rem;
          max-width: 60rem;
          color: var(--crw-ink);
          text-shadow: 0 2px 14px rgba(255, 255, 255, 0.35);
        }
        .crw-hero-eyebrow {
          font-family: var(--crw-serif);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.28em;
          margin: 0 0 1rem;
          color: var(--crw-ink);
        }
        .crw-hero h1 {
          font-family: var(--crw-serif);
          font-size: clamp(2rem, 5vw, 3.4rem);
          font-weight: 500;
          line-height: 1.15;
          margin: 0 0 2rem;
          color: var(--crw-ink);
        }
        .crw-hero-cta {
          display: inline-block;
          background: var(--crw-sage);
          color: var(--crw-ink);
          text-decoration: none;
          padding: 1rem 2.5rem;
          font-size: 0.84rem;
          letter-spacing: 0.18em;
          font-weight: 500;
          border-radius: 2px;
          border: 1px solid rgba(140, 154, 126, 0.7);
          font-family: var(--crw-serif);
          transition: background 0.25s;
        }
        .crw-hero-cta:hover { background: var(--crw-sage-dark); }

        /* ── Discover The Vineyards ── */
        .crw-discover {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 420px;
        }
        .crw-discover-img {
          background-image: url("https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?auto=format&fit=crop&w=1600&q=80");
          background-size: cover;
          background-position: center;
        }
        .crw-discover-copy {
          background: #fff;
          padding: 4rem 4rem 4rem 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 560px;
        }
        .crw-discover-eyebrow {
          font-family: var(--crw-serif);
          font-size: 0.78rem;
          letter-spacing: 0.28em;
          color: var(--crw-muted);
          margin: 0 0 0.75rem;
          font-weight: 600;
        }
        .crw-discover h2 {
          font-family: var(--crw-serif);
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 600;
          margin: 0 0 1.25rem;
        }
        .crw-discover-body {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--crw-ink);
          margin: 0 0 2rem;
        }
        .crw-discover-cta {
          display: inline-block;
          background: var(--crw-burgundy);
          color: #fff;
          text-decoration: none;
          padding: 0.95rem 1.8rem;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          font-weight: 600;
          align-self: flex-start;
          transition: background 0.25s;
        }
        .crw-discover-cta:hover { background: #8c3339; }

        /* ── Footer ── */
        .crw-footer {
          text-align: center;
          padding: 2rem 1.5rem;
          color: var(--crw-muted);
          font-size: 0.75rem;
          background: var(--crw-cream);
          border-top: 1px solid var(--crw-line);
        }
        .crw-footer a { color: var(--crw-burgundy); }

        /* ── Chat popover ── */
        .crw-scrim {
          position: fixed;
          inset: 0;
          background: rgba(40, 30, 25, 0.4);
          backdrop-filter: blur(2px);
          z-index: 999;
        }
        .crw-popover {
          position: fixed;
          top: 6rem;
          right: 1.5rem;
          width: min(420px, calc(100vw - 3rem));
          height: min(640px, calc(100vh - 7.5rem));
          z-index: 1000;
          pointer-events: none;
          opacity: 0;
          transform: translateY(-12px) scale(0.92);
          transform-origin: top right;
          transition: opacity 0.32s ease, transform 0.32s cubic-bezier(0.22, 1.2, 0.36, 1);
        }
        .crw-popover.is-open {
          pointer-events: auto;
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .crw-popover-inner {
          width: 100%;
          height: 100%;
          background: #0a0a0a;
          border: 1px solid rgba(165, 65, 72, 0.4);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(165, 65, 72, 0.4);
          display: flex;
          flex-direction: column;
        }
        .crw-popover-inner > * {
          flex: 1;
          min-height: 0;
        }

        @media (max-width: 900px) {
          .crw-nav-links { display: none; }
          .crw-nav { grid-template-columns: 1fr auto; }
          .crw-discover { grid-template-columns: 1fr; }
          .crw-discover-img { min-height: 260px; }
          .crw-discover-copy { padding: 2.5rem 1.5rem; }
        }
        @media (max-width: 600px) {
          .crw-agent-label { display: none; }
          .crw-popover {
            top: auto;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 82vh;
            border-radius: 16px 16px 0 0;
          }
          .crw-popover-inner { border-radius: 16px 16px 0 0; }
        }
      `}</style>
    </div>
  );
}

function CartIcon() {
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
