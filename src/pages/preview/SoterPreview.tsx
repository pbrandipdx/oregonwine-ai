import { useEffect, useState } from "react";
import { ChatWidget } from "../../widget/ChatWidget";
import { SEOHead } from "../../lib/seo";
import { PREVIEW_API_BASE, PREVIEW_CHAT_CONFIGS } from "./previewChatConfigs";

/**
 * Soter Vineyards preview — mirrors sotervineyards.com:
 *   • Narrow top utility bar with the Winter 2026 release announcement
 *     on the left and LOG IN / cart icons on the right.
 *   • Centered serif wordmark "SOTER Vineyards" with a thin separator
 *     underneath holding the horizontal nav.
 *   • Full-bleed aerial vineyard hero, centered serif headline
 *     ("Welcome to MSR.") + subhead and outlined "VISIT MSR" CTA.
 *
 * The Crushpad Wine Agent trigger is injected into the top utility bar
 * next to the cart so it lives inside the real-looking chrome, and the
 * chat popover anchors top-right like on the existing Rex Hill mock.
 */
export function SoterPreview() {
  const chat = PREVIEW_CHAT_CONFIGS.soter;
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
    <div className="svp">
      <SEOHead
        title="Soter Vineyards — Crushpad.ai Concierge Preview"
        description="Live preview of the Crushpad.ai Wine Agent embedded inside the Soter Vineyards homepage."
        path="/soter/preview"
        noindex
      />

      {/* Top utility bar with announcement + account icons */}
      <div className="svp-top">
        <div className="svp-top-inner">
          <div className="svp-top-announce">
            Our Winter 2026 Release is here, and we're glad to finally share
            it. Case purchases include ground shipping.{" "}
            <a href="#shop">SHOP NOW</a>
          </div>
          <div className="svp-top-actions">
            <a href="#login" className="svp-top-link">
              LOG IN
            </a>
            <a href="#cart" className="svp-top-cart" aria-label="Cart">
              <CartIcon />
              <span className="svp-cart-count">0</span>
            </a>
            <button
              type="button"
              className={`svp-agent-trigger ${pulseDone ? "is-rest" : "is-pulsing"} ${chatOpen ? "is-open" : ""}`}
              onClick={() => setChatOpen((v) => !v)}
              aria-expanded={chatOpen}
              aria-label={chatOpen ? "Close Wine Agent" : "Open Wine Agent"}
            >
              <span className="svp-agent-icon">
                {chatOpen ? <CloseIcon /> : <SparkleIcon />}
              </span>
              <span className="svp-agent-label">Wine Agent</span>
            </button>
          </div>
        </div>
      </div>

      {/* Wordmark */}
      <header className="svp-brand">
        <a href="#" className="svp-brand-link" aria-label="Soter Vineyards">
          <span className="svp-brand-word">SOTER</span>
          <span className="svp-brand-sub">Vineyards</span>
        </a>
      </header>

      {/* Centered nav */}
      <nav className="svp-nav">
        <div className="svp-nav-inner">
          {["VISIT", "SHOP", "MEMBERSHIP", "COMMUNITY", "WINEMAKING"].map(
            (item) => (
              <a key={item} href="#">
                {item}
              </a>
            ),
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="svp-hero">
        <div className="svp-hero-overlay" />
        <div className="svp-hero-inner">
          <h1>Welcome to MSR.</h1>
          <p className="svp-hero-sub">
            Where Regenerative Farming Meets Unforgettable Experiences.
          </p>
          <a href="#visit" className="svp-hero-cta">
            VISIT MSR
          </a>
        </div>
      </section>

      <footer className="svp-footer">
        Mockup of <a href={chat.wineryUrl}>sotervineyards.com</a> with the
        Crushpad.ai Wine Agent embedded. Not a real Soter Vineyards property —
        content shown for demonstration only.
      </footer>

      {chatOpen && (
        <div className="svp-scrim" onClick={() => setChatOpen(false)} />
      )}
      <div
        className={`svp-popover ${chatOpen ? "is-open" : ""}`}
        aria-hidden={!chatOpen}
      >
        <div className="svp-popover-inner">
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
        .svp {
          --svp-ink: #2b2b24;
          --svp-muted: #7b7568;
          --svp-line: #e6e2d8;
          --svp-cream: #fbfaf6;
          --svp-green: #4d5c3a;
          --svp-serif: "Cormorant Garamond", "Playfair Display", Georgia, serif;
          --svp-sans: "Inter", system-ui, -apple-system, sans-serif;
          background: #fff;
          color: var(--svp-ink);
          font-family: var(--svp-sans);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* ── Top utility bar ── */
        .svp-top {
          background: #fff;
          border-bottom: 1px solid var(--svp-line);
          position: sticky;
          top: 0;
          z-index: 1100;
        }
        .svp-top-inner {
          max-width: 1380px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 0.85rem 2rem;
          font-size: 0.78rem;
          letter-spacing: 0.03em;
        }
        .svp-top-announce {
          flex: 1;
          text-align: center;
          color: var(--svp-ink);
        }
        .svp-top-announce a {
          color: var(--svp-ink);
          text-decoration: underline;
          font-weight: 600;
          margin-left: 0.25rem;
        }
        .svp-top-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .svp-top-link {
          color: var(--svp-ink);
          text-decoration: none;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
        }
        .svp-top-cart {
          position: relative;
          color: var(--svp-ink);
        }
        .svp-cart-count {
          position: absolute;
          top: -4px;
          right: -8px;
          background: var(--svp-ink);
          color: #fff;
          font-size: 0.6rem;
          font-weight: 700;
          border-radius: 999px;
          padding: 0.1rem 0.38rem;
          min-width: 1rem;
          text-align: center;
        }

        /* ── Wine Agent trigger ── */
        .svp-agent-trigger {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--svp-green);
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 0.5rem 0.9rem 0.5rem 0.75rem;
          font-family: var(--svp-sans);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(77, 92, 58, 0.25);
          opacity: 0;
          transform: scale(0.6);
          animation: svp-agent-in 0.7s cubic-bezier(0.22, 1.2, 0.36, 1) 0.4s forwards;
          transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
        }
        .svp-agent-trigger:hover {
          background: #3d4b2d;
          transform: translateY(-1px);
        }
        .svp-agent-trigger.is-pulsing::before {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 999px;
          border: 2px solid var(--svp-green);
          opacity: 0;
          animation: svp-agent-pulse 1.8s ease-out 1.1s 3;
          pointer-events: none;
        }
        .svp-agent-icon {
          display: inline-flex;
          width: 0.95rem;
          height: 0.95rem;
        }
        @keyframes svp-agent-in {
          0% { opacity: 0; transform: scale(0.6) translateY(-4px); }
          60% { opacity: 1; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes svp-agent-pulse {
          0% { opacity: 0.7; transform: scale(0.95); }
          100% { opacity: 0; transform: scale(1.55); }
        }

        /* ── Wordmark ── */
        .svp-brand {
          display: flex;
          justify-content: center;
          padding: 1.25rem 2rem 1rem;
          background: #fff;
        }
        .svp-brand-link {
          text-decoration: none;
          color: var(--svp-ink);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1rem;
        }
        .svp-brand-word {
          font-family: var(--svp-serif);
          font-size: 2.4rem;
          letter-spacing: 0.42em;
          padding-left: 0.42em;
          font-weight: 500;
          line-height: 1;
        }
        .svp-brand-sub {
          font-family: var(--svp-serif);
          font-size: 0.78rem;
          letter-spacing: 0.36em;
          padding-left: 0.36em;
          color: var(--svp-muted);
          font-style: italic;
          font-weight: 400;
        }

        /* ── Nav ── */
        .svp-nav {
          background: #eeeae0;
          border-top: 1px solid var(--svp-line);
          border-bottom: 1px solid var(--svp-line);
        }
        .svp-nav-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0.95rem 2rem;
          display: flex;
          justify-content: center;
          gap: 3.2rem;
        }
        .svp-nav-inner a {
          color: var(--svp-ink);
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          transition: color 0.2s;
        }
        .svp-nav-inner a:hover {
          color: var(--svp-green);
        }

        /* ── Hero ── */
        .svp-hero {
          position: relative;
          height: clamp(540px, 72vh, 760px);
          background-image: url("https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?auto=format&fit=crop&w=2200&q=80");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          color: #fff;
          text-align: center;
        }
        .svp-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.38) 75%, rgba(0,0,0,0.55) 100%);
        }
        .svp-hero-inner {
          position: relative;
          z-index: 1;
          padding: 0 1.5rem 6rem;
          max-width: 54rem;
        }
        .svp-hero h1 {
          font-family: var(--svp-serif);
          font-size: clamp(2.4rem, 6vw, 4.4rem);
          font-weight: 500;
          line-height: 1.05;
          margin: 0 0 1.1rem;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 24px rgba(0, 0, 0, 0.55);
        }
        .svp-hero-sub {
          font-family: var(--svp-serif);
          font-size: clamp(1.05rem, 1.6vw, 1.45rem);
          font-style: italic;
          font-weight: 400;
          margin: 0 0 2rem;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.55);
        }
        .svp-hero-cta {
          display: inline-block;
          border: 1px solid #fff;
          color: #fff;
          text-decoration: none;
          padding: 1rem 2.4rem;
          font-size: 0.78rem;
          letter-spacing: 0.22em;
          font-weight: 500;
          transition: background 0.25s, color 0.25s;
        }
        .svp-hero-cta:hover {
          background: #fff;
          color: var(--svp-ink);
        }

        /* ── Footer ── */
        .svp-footer {
          text-align: center;
          padding: 2rem 1.5rem;
          color: var(--svp-muted);
          font-size: 0.75rem;
          background: var(--svp-cream);
          border-top: 1px solid var(--svp-line);
        }
        .svp-footer a {
          color: var(--svp-green);
        }

        /* ── Chat popover ── */
        .svp-scrim {
          position: fixed;
          inset: 0;
          background: rgba(20, 18, 12, 0.35);
          backdrop-filter: blur(2px);
          z-index: 999;
        }
        .svp-popover {
          position: fixed;
          top: 4.5rem;
          right: 1.5rem;
          width: min(420px, calc(100vw - 3rem));
          height: min(640px, calc(100vh - 6rem));
          z-index: 1000;
          pointer-events: none;
          opacity: 0;
          transform: translateY(-12px) scale(0.92);
          transform-origin: top right;
          transition: opacity 0.32s ease, transform 0.32s cubic-bezier(0.22, 1.2, 0.36, 1);
        }
        .svp-popover.is-open {
          pointer-events: auto;
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .svp-popover-inner {
          width: 100%;
          height: 100%;
          background: #0a0a0a;
          border: 1px solid rgba(77, 92, 58, 0.45);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(77, 92, 58, 0.35);
          display: flex;
          flex-direction: column;
        }
        .svp-popover-inner > * {
          flex: 1;
          min-height: 0;
        }

        @media (max-width: 900px) {
          .svp-top-inner { flex-direction: column; gap: 0.6rem; padding: 0.65rem 1rem; }
          .svp-top-announce { font-size: 0.7rem; }
          .svp-nav-inner { gap: 1.5rem; padding: 0.8rem 1rem; overflow-x: auto; }
          .svp-brand-word { font-size: 1.9rem; }
        }
        @media (max-width: 600px) {
          .svp-agent-label { display: none; }
          .svp-popover {
            top: auto;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 82vh;
            border-radius: 16px 16px 0 0;
          }
          .svp-popover-inner { border-radius: 16px 16px 0 0; }
        }
      `}</style>
    </div>
  );
}

/* ───── icons ───── */
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
