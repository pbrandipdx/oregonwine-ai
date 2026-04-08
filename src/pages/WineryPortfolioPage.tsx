import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WINERY_CARD_OVERRIDES } from "../lib/wineries";
import { SEOHead, PAGE_SEO } from "../lib/seo";

/* ── Per-winery feature flags (what's actually built) ── */

type WineryEntry = {
  slug: string;
  name: string;
  region: string;
  blurb: string;
  established?: number;
  features: {
    preview: boolean;
    partner: boolean;
    chat: boolean;
    research: boolean;
    blindTasting: boolean;
    matchMe: boolean;
    compare: boolean;
    wineryInfo: boolean;
    analytics: boolean;
    admin: boolean;
  };
};

const WINERIES: WineryEntry[] = [
  {
    slug: "rex-hill",
    name: WINERY_CARD_OVERRIDES["rex-hill"]?.cardTitle ?? "REX HILL",
    region: WINERY_CARD_OVERRIDES["rex-hill"]?.region ?? "",
    blurb: WINERY_CARD_OVERRIDES["rex-hill"]?.blurb ?? "",
    established: 1982,
    features: {
      preview: true,
      partner: true,
      chat: true,
      research: true,
      blindTasting: true,
      matchMe: true,
      compare: true,
      wineryInfo: true,
      analytics: true,
      admin: true,
    },
  },
  {
    slug: "crowley",
    name: WINERY_CARD_OVERRIDES.crowley?.cardTitle ?? "Crowley Wines",
    region: WINERY_CARD_OVERRIDES.crowley?.region ?? "",
    blurb: WINERY_CARD_OVERRIDES.crowley?.blurb ?? "",
    established: 2005,
    features: {
      preview: true,
      partner: true,
      chat: true,
      research: true,
      blindTasting: true,
      matchMe: true,
      compare: true,
      wineryInfo: true,
      analytics: true,
      admin: true,
    },
  },
  {
    slug: "ponzi",
    name: WINERY_CARD_OVERRIDES.ponzi?.cardTitle ?? "Ponzi Vineyards",
    region: WINERY_CARD_OVERRIDES.ponzi?.region ?? "",
    blurb: WINERY_CARD_OVERRIDES.ponzi?.blurb ?? "",
    established: 1970,
    features: {
      preview: true,
      partner: true,
      chat: true,
      research: true,
      blindTasting: true,
      matchMe: true,
      compare: true,
      wineryInfo: true,
      analytics: true,
      admin: true,
    },
  },
  {
    slug: "chehalem",
    name: WINERY_CARD_OVERRIDES.chehalem?.cardTitle ?? "Chehalem Winery",
    region: WINERY_CARD_OVERRIDES.chehalem?.region ?? "",
    blurb: WINERY_CARD_OVERRIDES.chehalem?.blurb ?? "",
    established: 1990,
    features: {
      preview: true,
      partner: true,
      chat: true,
      research: true,
      blindTasting: true,
      matchMe: true,
      compare: true,
      wineryInfo: true,
      analytics: true,
      admin: true,
    },
  },
  {
    slug: "soter",
    name: WINERY_CARD_OVERRIDES.soter?.cardTitle ?? "Soter Vineyards",
    region: WINERY_CARD_OVERRIDES.soter?.region ?? "",
    blurb: WINERY_CARD_OVERRIDES.soter?.blurb ?? "",
    established: 1997,
    features: {
      preview: true,
      partner: true,
      chat: true,
      research: true,
      blindTasting: true,
      matchMe: true,
      compare: true,
      wineryInfo: true,
      analytics: true,
      admin: true,
    },
  },
];

const FEATURE_LABELS: { key: keyof WineryEntry["features"]; label: string; path: (slug: string) => string }[] = [
  { key: "preview", label: "Preview", path: (s) => `/${s}/preview` },
  { key: "partner", label: "Partner", path: (s) => `/${s}` },
  { key: "chat", label: "Chat", path: (s) => `/${s}/demo` },
  { key: "research", label: "Research", path: (s) => `/${s}/research` },
  { key: "blindTasting", label: "Blind Tasting", path: (s) => `/${s}/blind-tasting` },
  { key: "matchMe", label: "Match Me", path: (s) => `/${s}/match-me` },
  { key: "compare", label: "Compare", path: (s) => `/compare?winery=${s}` },
  { key: "wineryInfo", label: "Winery Info", path: (s) => `/winery-info?winery=${s}` },
  { key: "analytics", label: "Analytics", path: (s) => `/${s}/analytics` },
  { key: "admin", label: "Admin", path: (s) => `/${s}/admin` },
];

export function WineryPortfolioPage() {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("wp_unlocked") === "1");
  const [pw, setPw] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (pw.trim().toLowerCase() === "jory") {
      setUnlocked(true);
      sessionStorage.setItem("wp_unlocked", "1");
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [pw]);

  const fullCount = WINERIES.filter(
    (w) => w.features.chat && w.features.blindTasting && w.features.compare
  ).length;

  return (
    <article className="winery-portfolio">
      <SEOHead {...PAGE_SEO.wineryPortfolio} />

      {/* ── Password gate ─────────────────────────────────── */}
      {!unlocked && (
        <div className="wp-gate">
          <div className="wp-gate-box-wrapper">
            <div className={`wp-gate-box${shake ? " wp-gate-shake" : ""}`}>
              <h2 className="wp-gate-title">Partner Access</h2>
              <p className="wp-gate-desc">Enter the password to view the winery portfolio.</p>
              <form onSubmit={handleSubmit} className="wp-gate-form">
                <input
                  type="password"
                  className="wp-gate-input"
                  placeholder="Password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="wp-gate-btn">Unlock</button>
              </form>
              <button
                type="button"
                className="wp-gate-back"
                onClick={() => navigate(-1)}
              >
                &larr; Go Back
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .wp-gate {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(18px);
          background: rgba(8, 8, 8, 0.75);
        }
        .wp-gate-box-wrapper {
          width: 100%;
          max-width: 400px;
          padding: 0 24px;
        }
        .wp-gate-box {
          background: #111;
          border: 1px solid #2a2a2a;
          border-radius: 16px;
          padding: 40px 32px;
          text-align: center;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        }
        .wp-gate-title {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 1.6rem;
          font-weight: 600;
          margin: 0 0 8px;
          color: #eceae8;
        }
        .wp-gate-desc {
          font-size: 0.9rem;
          color: #a8a39e;
          margin: 0 0 24px;
        }
        .wp-gate-form {
          display: flex;
          gap: 8px;
        }
        .wp-gate-input {
          flex: 1;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid #2a2a2a;
          background: #0a0a0a;
          color: #eceae8;
          font-family: "Space Mono", monospace;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.15s;
        }
        .wp-gate-input:focus {
          border-color: #c47a84;
        }
        .wp-gate-btn {
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          background: #c47a84;
          color: #080808;
          font-family: "Space Mono", monospace;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.15s;
        }
        .wp-gate-btn:hover {
          background: #d48a94;
        }
        .wp-gate-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 20px;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid #2a2a2a;
          background: transparent;
          color: #a8a39e;
          font-family: "Space Mono", monospace;
          font-size: 0.75rem;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .wp-gate-back:hover {
          color: #eceae8;
          border-color: #444;
          background: rgba(255,255,255,0.05);
        }
        .wp-gate-shake {
          animation: wp-shake 0.4s ease;
        }
        @keyframes wp-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-12px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(6px); }
        }
        .winery-portfolio {
          max-width: 960px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }
        .wp-head { margin-bottom: 40px; }
        .wp-head h1 {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 600;
          margin: 0 0 8px;
        }
        .wp-head p {
          color: var(--text-muted, #a8a39e);
          font-size: 1rem;
          margin: 0;
          max-width: 540px;
        }
        .wp-stats {
          display: flex;
          gap: 32px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .wp-stat {
          text-align: center;
        }
        .wp-stat-num {
          font-family: "Space Mono", monospace;
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent, #c47a84);
          display: block;
        }
        .wp-stat-label {
          font-family: "Space Mono", monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-dim, #666);
        }
        .wp-card {
          background: var(--surface, #111);
          border: 1px solid var(--border, #222);
          border-radius: 14px;
          padding: 32px;
          margin-bottom: 24px;
          transition: border-color 0.2s;
        }
        .wp-card:hover {
          border-color: var(--accent, #c47a84);
        }
        .wp-card-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 4px;
        }
        .wp-card-name {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }
        .wp-card-name a {
          color: inherit;
          text-decoration: none;
        }
        .wp-card-name a:hover {
          color: var(--accent, #c47a84);
        }
        .wp-card-est {
          font-family: "Space Mono", monospace;
          font-size: 12px;
          color: var(--text-dim, #666);
        }
        .wp-card-region {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 1rem;
          font-style: italic;
          color: var(--text-muted, #a8a39e);
          margin: 0 0 12px;
        }
        .wp-card-blurb {
          font-size: 0.9rem;
          color: var(--text-muted, #a8a39e);
          line-height: 1.6;
          margin: 0 0 20px;
        }
        .wp-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .wp-feat {
          font-family: "Space Mono", monospace;
          font-size: 11px;
          padding: 5px 12px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.15s;
        }
        .wp-feat--on {
          border: 1px solid var(--accent, #c47a84);
          background: rgba(196, 122, 132, 0.1);
          color: var(--accent, #c47a84);
        }
        .wp-feat--on:hover {
          background: rgba(196, 122, 132, 0.25);
        }
        .wp-feat--off {
          border: 1px solid var(--border, #222);
          color: var(--text-dim, #666);
          cursor: default;
          opacity: 0.4;
        }
        @media (max-width: 640px) {
          .wp-card { padding: 24px 20px; }
          .wp-stats { gap: 24px; }
        }
      `}</style>

      <header className="wp-head">
        <h1>Winery Portfolio</h1>
        <p>
          Every winery Crushpad.ai has built out. Partner pages, chat agents, games, research briefs, and more.
        </p>
      </header>

      <div className="wp-stats">
        <div className="wp-stat">
          <span className="wp-stat-num">{WINERIES.length}</span>
          <span className="wp-stat-label">Wineries</span>
        </div>
        <div className="wp-stat">
          <span className="wp-stat-num">{fullCount}</span>
          <span className="wp-stat-label">Full builds</span>
        </div>
        <div className="wp-stat">
          <span className="wp-stat-num">{WINERIES.length - fullCount}</span>
          <span className="wp-stat-label">In progress</span>
        </div>
      </div>

      {WINERIES.map((w) => (
        <div key={w.slug} className="wp-card">
          <div className="wp-card-head">
            <h2 className="wp-card-name">
              <Link to={`/${w.slug}`}>{w.name}</Link>
            </h2>
            {w.established && <span className="wp-card-est">Est. {w.established}</span>}
          </div>
          {w.region && <p className="wp-card-region">{w.region}</p>}
          {w.blurb && <p className="wp-card-blurb">{w.blurb}</p>}
          <div className="wp-features">
            {FEATURE_LABELS.map((f) =>
              w.features[f.key] ? (
                <Link
                  key={f.key}
                  className="wp-feat wp-feat--on"
                  to={f.path(w.slug)}
                >
                  {f.label}
                </Link>
              ) : (
                <span key={f.key} className="wp-feat wp-feat--off">
                  {f.label}
                </span>
              )
            )}
          </div>
        </div>
      ))}
    </article>
  );
}
