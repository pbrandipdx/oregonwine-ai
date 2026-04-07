import { useEffect, useState } from "react";
import { ChatWidget } from "../widget/ChatWidget";
import { SEOHead } from "../lib/seo";
import "./RexHillHomeMockPage.css";

const apiBase =
  import.meta.env.VITE_SUPABASE_FUNCTIONS_URL ||
  "https://sdobipmpvcuxnjqwpggp.supabase.co/functions/v1";

const REX_HILL_KEY = import.meta.env.VITE_WIDGET_TEST_KEY || "wk_test_rexhill";

/**
 * High-fidelity mock of the Rex Hill homepage with the Crushpad.ai concierge
 * mounted as a "Wine Agent" trigger button to the right of the cart icon.
 *
 * Used as a sales prototype: a winery owner can see exactly how the widget
 * would feel inside their existing site chrome before signing up.
 */
export function RexHillHomeMockPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [pulseDone, setPulseDone] = useState(false);

  // Stop the entrance pulse animation after a few seconds so it doesn't
  // distract on long page sessions.
  useEffect(() => {
    const t = window.setTimeout(() => setPulseDone(true), 6500);
    return () => window.clearTimeout(t);
  }, []);

  // Close the panel on Escape.
  useEffect(() => {
    if (!chatOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setChatOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chatOpen]);

  return (
    <div className="rh-mock">
      <SEOHead
        title="Rex Hill — Crushpad.ai Concierge Preview"
        description="Live preview of the Crushpad.ai Wine Agent embedded inside the Rex Hill homepage."
        path="/rex-hill/preview"
        noindex
      />

      {/* Top announcement bar */}
      <div className="rh-announce">
        <strong>Experience Somm&rsquo;s Table:</strong>
        <span> A hosted, intimate, food &amp; wine tasting option featuring limited-production wines. </span>
        <a href="#reserve">Reserve Now.</a>
      </div>

      {/* Main nav */}
      <header className="rh-nav">
        <a href="#" className="rh-logo" aria-label="Rex Hill">
          <span className="rh-logo-crest">❦</span>
          <span className="rh-logo-word">REX HILL</span>
        </a>

        <nav className="rh-nav-links">
          <a href="#wines">OUR WINES</a>
          <a href="#visit">VISIT US</a>
          <a href="#about">ABOUT REX HILL</a>
          <a href="#explore">EXPLORE</a>
        </nav>

        <div className="rh-nav-actions">
          <a href="#login" className="rh-icon-btn" aria-label="Log in">
            <span className="rh-icon-label">LOG IN</span>
            <UserIcon />
          </a>
          <a href="#cart" className="rh-icon-btn rh-cart" aria-label="Cart">
            <CartIcon />
            <span className="rh-cart-count">0</span>
          </a>

          {/* Wine Agent trigger — entrance animation, then steady-state */}
          <button
            type="button"
            className={`rh-agent-trigger ${pulseDone ? "is-rest" : "is-pulsing"} ${
              chatOpen ? "is-open" : ""
            }`}
            aria-label={chatOpen ? "Close Wine Agent" : "Open Wine Agent"}
            aria-expanded={chatOpen}
            onClick={() => setChatOpen((v) => !v)}
          >
            <span className="rh-agent-trigger-icon">
              {chatOpen ? <CloseIcon /> : <SparkleIcon />}
            </span>
            <span className="rh-agent-trigger-label">Wine Agent</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="rh-hero">
        <div className="rh-hero-overlay" />
        <div className="rh-hero-inner">
          <h1>Sustainable Luxury From Oregon&rsquo;s Willamette Valley</h1>
          <a href="#book" className="rh-hero-cta">
            BOOK A TASTING EXPERIENCE
          </a>
        </div>
      </section>

      {/* Below-fold cards */}
      <section className="rh-cards">
        <a href="#shop" className="rh-card rh-card--shop">
          <div className="rh-card-label">SHOP REX HILL WINES</div>
        </a>
        <a href="#events" className="rh-card rh-card--events">
          <div className="rh-card-label">WINERY EVENTS</div>
        </a>
      </section>

      <footer className="rh-mock-footer">
        Mockup of <a href="https://rexhill.com">rexhill.com</a> with the Crushpad.ai Wine Agent embedded. Not a real
        Rex Hill property — content shown for demonstration only.
      </footer>

      {/* Scrim under the chat panel — click to close */}
      {chatOpen && <div className="rh-chat-scrim" onClick={() => setChatOpen(false)} />}

      {/* Chat panel — animates out from the trigger button */}
      <div className={`rh-chat-popover ${chatOpen ? "is-open" : ""}`} aria-hidden={!chatOpen}>
        <div className="rh-chat-popover-inner">
          <ChatWidget
            apiKey={REX_HILL_KEY}
            apiBase={apiBase}
            themeColor="#7a1f2b"
            wineryLabel="REX HILL"
            embedded
            embeddedChrome="panel"
            headerLockup="full"
            headerCrestImageUrl="https://rexhill.com/wp-content/uploads/2020/06/cropped-rexhill-192x192.png"
            wineryUrl="https://rexhill.com"
            bookingPath="/experiences/"
            clubPath="/clubs/"
            wineryPhone="(503) 538-0666"
            quickReplyRoutes={{
              "Blind Tasting": "/rex-hill/blind-tasting?embed=1",
              "Match Me": "/rex-hill/match-me?embed=1",
              Compare: "/compare?winery=rex-hill&embed=1",
              "Tasting options": "/winery-info?topic=tastings&winery=rex-hill&embed=1",
              "Hours & directions": "/winery-info?topic=hours&winery=rex-hill&embed=1",
              "Wine club info": "/winery-info?topic=club&winery=rex-hill&embed=1",
              "Food pairings": "/winery-info?topic=pairings&winery=rex-hill&embed=1",
              "Recipes": "/winery-info?topic=recipes&winery=rex-hill&embed=1",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ───────── Icons (inline SVG to avoid extra deps) ───────── */

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 7h14l-1.5 9a2 2 0 0 1-2 1.7H8.5a2 2 0 0 1-2-1.7L5 7z" strokeLinejoin="round" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
