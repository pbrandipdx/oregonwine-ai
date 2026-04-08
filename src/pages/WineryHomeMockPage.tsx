import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ChatWidget } from "../widget/ChatWidget";
import { SEOHead } from "../lib/seo";
import { WINERY_MOCK_CONFIGS } from "./wineryMockConfigs";
import {
  PREVIEW_API_BASE as apiBase,
  PREVIEW_CHAT_CONFIGS as CHAT_CONFIGS,
} from "./preview/previewChatConfigs";
import "./WineryHomeMockPage.css";

type Props = {
  /** Winery slug — overrides the :slug route param when provided. */
  slug?: string;
};

/**
 * High-fidelity mock of a partner winery homepage with the Crushpad.ai
 * concierge mounted as a "Wine Agent" trigger button to the right of the
 * cart icon. Works for any winery in WINERY_MOCK_CONFIGS.
 */
export function WineryHomeMockPage({ slug: slugProp }: Props) {
  const { slug: slugParam } = useParams<{ slug: string }>();
  const slug = slugProp ?? slugParam ?? "";
  const config = WINERY_MOCK_CONFIGS[slug];
  const chat = CHAT_CONFIGS[slug];

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

  if (!config || !chat) {
    return <Navigate to="/winery" replace />;
  }

  const cssVars: React.CSSProperties = {
    ["--rh-cream" as string]: config.brand.cream,
    ["--rh-ink" as string]: config.brand.ink,
    ["--rh-burgundy" as string]: config.brand.burgundy,
    ["--rh-burgundy-deep" as string]: config.brand.burgundyDeep,
    ["--rh-gold" as string]: config.brand.gold,
  };

  return (
    <div className="rh-mock" style={cssVars}>
      <SEOHead
        title={`${config.navLabel} — Crushpad.ai Concierge Preview`}
        description={`Live preview of the Crushpad.ai Wine Agent embedded inside the ${config.navLabel} homepage.`}
        path={`/${slug}/preview`}
        noindex
      />

      {/* Top announcement bar */}
      <div className="rh-announce">
        <strong>{config.announce.bold}</strong>
        <span>{config.announce.body}</span>
        <a href="#reserve">{config.announce.cta}</a>
      </div>

      {/* Main nav */}
      <header className="rh-nav">
        <a href="#" className="rh-logo" aria-label={config.navLabel}>
          <span className="rh-logo-crest">{config.crest}</span>
          <span className="rh-logo-word">{config.navLabel}</span>
        </a>

        <nav className="rh-nav-links">
          {config.menu.map((item) => (
            <a key={item} href="#">
              {item}
            </a>
          ))}
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
      <section
        className="rh-hero"
        style={{ backgroundImage: `url("${config.hero.image}")` }}
      >
        <div className="rh-hero-overlay" />
        <div className="rh-hero-inner">
          <h1>{config.hero.headline}</h1>
          <a href="#book" className="rh-hero-cta">
            {config.hero.cta}
          </a>
        </div>
      </section>

      {/* Below-fold cards */}
      <section className="rh-cards">
        {config.cards.map((card, i) => (
          <a
            key={card.label}
            href={i === 0 ? "#shop" : "#events"}
            className="rh-card"
            style={{
              backgroundColor: card.tint,
              backgroundImage: card.image ? `url("${card.image}")` : undefined,
            }}
          >
            <div className="rh-card-label">{card.label}</div>
          </a>
        ))}
      </section>

      <footer className="rh-mock-footer">
        Mockup of <a href={chat.wineryUrl}>{chat.wineryUrl.replace(/^https?:\/\//, "")}</a> with the Crushpad.ai Wine
        Agent embedded. Not a real {config.navLabel} property — content shown for demonstration only.
      </footer>

      {/* Scrim */}
      {chatOpen && <div className="rh-chat-scrim" onClick={() => setChatOpen(false)} />}

      {/* Chat panel */}
      <div className={`rh-chat-popover ${chatOpen ? "is-open" : ""}`} aria-hidden={!chatOpen}>
        <div className="rh-chat-popover-inner">
          <ChatWidget
            apiKey={chat.apiKey}
            apiBase={apiBase}
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
    </div>
  );
}

/* ───────── Icons ───────── */

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
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"
        strokeLinecap="round"
      />
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
