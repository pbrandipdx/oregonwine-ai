import { useEffect, useState } from "react";
import { ChatWidget } from "../../widget/ChatWidget";
import { SEOHead } from "../../lib/seo";
import { PREVIEW_API_BASE, PREVIEW_CHAT_CONFIGS } from "./previewChatConfigs";

/**
 * Ponzi preview — mirrors ponzivineyards.com:
 *   • Dark forest-green top info bar with the hours + address line.
 *   • Circular "Oregon Since 1970" P logo badge on the left.
 *   • Top-center horizontal nav: OUR STORY / OUR TERROIR / OUR WINES /
 *     VISIT / EVENTS / MEMBERSHIP / BLOG.
 *   • Full-bleed paint-swatch hero with large scripted "Ponzi VINEYARDS
 *     EST. 1970 · OREGON" wordmark and "The Artistry of the Elements"
 *     sub-headline + chevron.
 */
export function PonziPreview() {
  const chat = PREVIEW_CHAT_CONFIGS.ponzi;
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
    <div className="pnz">
      <SEOHead
        title="Ponzi Vineyards — Crushpad.ai Concierge Preview"
        description="Live preview of the Crushpad.ai Wine Agent embedded inside the Ponzi Vineyards homepage."
        path="/ponzi/preview"
        noindex
      />

      <div className="pnz-top">
        Open Daily from 10am to 5pm <span className="pnz-top-sep">|</span>{" "}
        19500 SW Mountain Home Rd, Sherwood OR 97140
      </div>

      <header className="pnz-nav">
        <a href="#" className="pnz-badge" aria-label="Ponzi Vineyards">
          <svg viewBox="0 0 80 80" width="64" height="64">
            <circle
              cx="40"
              cy="40"
              r="38"
              fill="#fff"
              stroke="#12321f"
              strokeWidth="1.4"
            />
            <text
              x="40"
              y="16"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, serif"
              fontSize="6"
              letterSpacing="1.2"
              fill="#12321f"
            >
              OREGON
            </text>
            <text
              x="40"
              y="70"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, serif"
              fontSize="6"
              letterSpacing="1.6"
              fill="#12321f"
            >
              SINCE 1970
            </text>
            <text
              x="40"
              y="52"
              textAnchor="middle"
              fontFamily="'Dancing Script', 'Cormorant Garamond', cursive"
              fontSize="38"
              fontWeight="600"
              fill="#12321f"
            >
              P
            </text>
          </svg>
        </a>

        <nav className="pnz-nav-links">
          {[
            ["OUR STORY", true],
            ["OUR TERROIR", true],
            ["OUR WINES", true],
            ["VISIT", true],
            ["EVENTS", true],
            ["MEMBERSHIP", true],
            ["BLOG", false],
          ].map(([item, hasCaret]) => (
            <a key={item as string} href="#">
              {item}
              {hasCaret ? <span className="pnz-caret">▾</span> : null}
            </a>
          ))}
        </nav>

        <div className="pnz-nav-actions">
          <a href="#login" className="pnz-top-link">
            LOG IN
          </a>
          <a href="#cart" className="pnz-top-cart" aria-label="Cart">
            <CartIcon />
            <span className="pnz-cart-count">0</span>
          </a>
          <button
            type="button"
            className={`pnz-agent-trigger ${pulseDone ? "is-rest" : "is-pulsing"} ${chatOpen ? "is-open" : ""}`}
            onClick={() => setChatOpen((v) => !v)}
            aria-expanded={chatOpen}
            aria-label={chatOpen ? "Close Wine Agent" : "Open Wine Agent"}
          >
            <span className="pnz-agent-icon">
              {chatOpen ? <CloseIcon /> : <SparkleIcon />}
            </span>
            <span className="pnz-agent-label">Wine Agent</span>
          </button>
        </div>
      </header>

      <section className="pnz-hero">
        <div className="pnz-hero-overlay" />
        <div className="pnz-hero-inner">
          {/* Paint swatches — decorative */}
          <div className="pnz-swatches" aria-hidden="true">
            <span className="pnz-swatch pnz-swatch--1" />
            <span className="pnz-swatch pnz-swatch--2" />
            <span className="pnz-swatch pnz-swatch--3" />
            <span className="pnz-swatch pnz-swatch--4" />
          </div>
          <div className="pnz-wordmark">
            <span className="pnz-script">Ponzi</span>
            <span className="pnz-line">VINEYARDS</span>
            <span className="pnz-small">EST.1970 · OREGON</span>
          </div>
          <p className="pnz-tagline">The Artistry of the Elements</p>
          <div className="pnz-chevron" aria-hidden="true">
            ⌄
          </div>
        </div>
      </section>

      <section className="pnz-welcome">
        <p>
          <strong>Welcome to Ponzi Vineyards,</strong> a pioneering Oregon
          winery established in 1970. Located in the heart of the Laurelwood
          District AVA, we craft wines that reflect the spirit of the
          Willamette Valley and the legacy of one of the valley's founding
          wineries.
        </p>
      </section>

      <footer className="pnz-footer">
        Mockup of <a href={chat.wineryUrl}>ponzivineyards.com</a> with the
        Crushpad.ai Wine Agent embedded. Not a real Ponzi Vineyards property —
        content shown for demonstration only.
      </footer>

      {chatOpen && (
        <div className="pnz-scrim" onClick={() => setChatOpen(false)} />
      )}
      <div
        className={`pnz-popover ${chatOpen ? "is-open" : ""}`}
        aria-hidden={!chatOpen}
      >
        <div className="pnz-popover-inner">
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
        .pnz {
          --pnz-green: #12321f;
          --pnz-green-deep: #0a1f13;
          --pnz-cream: #ece6d6;
          --pnz-ink: #1a1a16;
          --pnz-muted: #6b6b63;
          --pnz-line: #dcd8cc;
          --pnz-serif: "Cormorant Garamond", "Playfair Display", Georgia, serif;
          --pnz-script: "Dancing Script", "Great Vibes", "Cormorant Garamond", cursive;
          --pnz-sans: "Inter", system-ui, -apple-system, sans-serif;
          background: var(--pnz-cream);
          color: var(--pnz-ink);
          font-family: var(--pnz-sans);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* ── Top info bar ── */
        .pnz-top {
          background: var(--pnz-green);
          color: #eee5d1;
          text-align: center;
          padding: 0.6rem 1rem;
          font-size: 0.78rem;
          letter-spacing: 0.02em;
        }
        .pnz-top-sep {
          opacity: 0.6;
          margin: 0 0.35rem;
        }

        /* ── Main nav ── */
        .pnz-nav {
          background: var(--pnz-green);
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 1.5rem;
          padding: 0.4rem 1.75rem;
          position: sticky;
          top: 0;
          z-index: 1100;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .pnz-badge {
          display: inline-flex;
          text-decoration: none;
        }
        .pnz-nav-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }
        .pnz-nav-links a {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          color: #eee5d1;
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.14em;
        }
        .pnz-nav-links a:hover { color: #fff; }
        .pnz-caret { font-size: 0.6rem; opacity: 0.7; }
        .pnz-nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .pnz-top-link {
          color: #eee5d1;
          text-decoration: none;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
        }
        .pnz-top-cart {
          position: relative;
          color: #eee5d1;
        }
        .pnz-cart-count {
          position: absolute;
          top: -4px;
          right: -8px;
          background: #eee5d1;
          color: var(--pnz-green);
          font-size: 0.6rem;
          font-weight: 700;
          border-radius: 999px;
          padding: 0.1rem 0.38rem;
          min-width: 1rem;
          text-align: center;
        }

        /* ── Wine Agent trigger ── */
        .pnz-agent-trigger {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #c89b52;
          color: var(--pnz-green-deep);
          border: none;
          border-radius: 999px;
          padding: 0.55rem 1rem 0.55rem 0.8rem;
          font-family: var(--pnz-sans);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
          opacity: 0;
          transform: scale(0.6);
          animation: pnz-agent-in 0.7s cubic-bezier(0.22, 1.2, 0.36, 1) 0.4s forwards;
          transition: transform 0.18s, background 0.18s;
        }
        .pnz-agent-trigger:hover { background: #d4a960; }
        .pnz-agent-trigger.is-pulsing::before {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 999px;
          border: 2px solid #c89b52;
          opacity: 0;
          animation: pnz-agent-pulse 1.8s ease-out 1.1s 3;
        }
        .pnz-agent-icon { display: inline-flex; width: 0.95rem; height: 0.95rem; }
        @keyframes pnz-agent-in {
          0% { opacity: 0; transform: scale(0.6) translateY(-4px); }
          60% { opacity: 1; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pnz-agent-pulse {
          0% { opacity: 0.7; transform: scale(0.95); }
          100% { opacity: 0; transform: scale(1.55); }
        }

        /* ── Hero ── */
        .pnz-hero {
          position: relative;
          height: clamp(560px, 78vh, 820px);
          background: linear-gradient(135deg, #d4c7aa 0%, #c9b89a 40%, #b8a890 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
          overflow: hidden;
        }
        .pnz-hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.35) 100%);
        }
        .pnz-hero-inner {
          position: relative;
          z-index: 1;
          padding: 0 1.5rem;
          max-width: 56rem;
          width: 100%;
        }

        /* Decorative paint swatches behind the wordmark */
        .pnz-swatches {
          position: absolute;
          top: -4rem;
          left: 50%;
          transform: translateX(-48%);
          display: flex;
          gap: 0.4rem;
          opacity: 0.85;
        }
        .pnz-swatch {
          display: block;
          width: 52px;
          height: 72px;
          border-radius: 8px;
          filter: blur(1px);
        }
        .pnz-swatch--1 { background: #295b97; transform: rotate(-3deg); }
        .pnz-swatch--2 { background: #3e7a69; transform: rotate(2deg); margin-top: 8px; }
        .pnz-swatch--3 { background: #e8d8c5; transform: rotate(-1deg); margin-top: 4px; }
        .pnz-swatch--4 { background: #c8542a; transform: rotate(3deg); margin-top: 10px; }

        .pnz-wordmark {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1rem;
          position: relative;
          z-index: 2;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }
        .pnz-script {
          font-family: var(--pnz-script);
          font-size: clamp(4rem, 11vw, 8rem);
          font-weight: 600;
          line-height: 0.95;
          color: #fff;
        }
        .pnz-line {
          font-family: var(--pnz-sans);
          font-size: clamp(0.85rem, 1.5vw, 1.15rem);
          letter-spacing: 0.5em;
          padding-left: 0.5em;
          color: #fff;
          font-weight: 400;
        }
        .pnz-small {
          font-family: var(--pnz-sans);
          font-size: 0.72rem;
          letter-spacing: 0.3em;
          padding-left: 0.3em;
          color: #fff;
          font-weight: 400;
          margin-top: 0.35rem;
        }
        .pnz-tagline {
          font-family: var(--pnz-serif);
          font-size: clamp(1.3rem, 2.2vw, 1.9rem);
          font-style: italic;
          font-weight: 500;
          margin: 2rem 0 0;
          color: #fff;
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45);
        }
        .pnz-chevron {
          font-size: 2rem;
          color: #fff;
          opacity: 0.85;
          margin-top: 1.5rem;
        }

        /* ── Welcome strip ── */
        .pnz-welcome {
          background: var(--pnz-cream);
          padding: 3.5rem 1.5rem 4rem;
          text-align: center;
        }
        .pnz-welcome p {
          max-width: 38rem;
          margin: 0 auto;
          font-size: 1rem;
          line-height: 1.75;
          color: var(--pnz-ink);
        }

        /* ── Footer ── */
        .pnz-footer {
          text-align: center;
          padding: 2rem 1.5rem;
          color: var(--pnz-muted);
          font-size: 0.75rem;
          background: #e1dac7;
          border-top: 1px solid var(--pnz-line);
        }
        .pnz-footer a { color: var(--pnz-green); }

        /* ── Chat popover ── */
        .pnz-scrim {
          position: fixed;
          inset: 0;
          background: rgba(10, 18, 10, 0.4);
          backdrop-filter: blur(2px);
          z-index: 999;
        }
        .pnz-popover {
          position: fixed;
          top: 6.5rem;
          right: 1.5rem;
          width: min(420px, calc(100vw - 3rem));
          height: min(640px, calc(100vh - 8rem));
          z-index: 1000;
          pointer-events: none;
          opacity: 0;
          transform: translateY(-12px) scale(0.92);
          transform-origin: top right;
          transition: opacity 0.32s ease, transform 0.32s cubic-bezier(0.22, 1.2, 0.36, 1);
        }
        .pnz-popover.is-open {
          pointer-events: auto;
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .pnz-popover-inner {
          width: 100%;
          height: 100%;
          background: #0a0a0a;
          border: 1px solid rgba(200, 155, 82, 0.45);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(18, 50, 31, 0.5);
          display: flex;
          flex-direction: column;
        }
        .pnz-popover-inner > * {
          flex: 1;
          min-height: 0;
        }

        @media (max-width: 1100px) {
          .pnz-nav-links { display: none; }
          .pnz-nav { grid-template-columns: auto 1fr auto; }
        }
        @media (max-width: 600px) {
          .pnz-top { font-size: 0.68rem; padding: 0.5rem 0.75rem; }
          .pnz-agent-label { display: none; }
          .pnz-swatches { display: none; }
          .pnz-popover {
            top: auto;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 82vh;
            border-radius: 16px 16px 0 0;
          }
          .pnz-popover-inner { border-radius: 16px 16px 0 0; }
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
