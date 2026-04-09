import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

/* ── SVG icons ────────────────────────────────────────────── */
const IconSidebar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
  </svg>
);

const IconWine = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2h8l-1 9a5 5 0 0 1-3 4.5 5 5 0 0 1-3-4.5L8 2z" />
    <path d="M12 15.5V22" /><path d="M8 22h8" />
  </svg>
);

const IconChat = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconGamepad = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 12h4" /><path d="M8 10v4" />
    <circle cx="15" cy="11" r="1" /><circle cx="18" cy="13" r="1" />
  </svg>
);

const IconInfo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
  </svg>
);

const IconGrid = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

const IconBook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

/* ── Sidebar ──────────────────────────────────────────────── */

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const location = useLocation();
  const path = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [path]);

  const isActive = (to: string) => path === to;
  const linkClass = (to: string) =>
    `sb-link${isActive(to) ? " sb-link--active" : ""}`;

  const handleToggle = () => {
    if (window.innerWidth <= 768) {
      setMobileOpen((o) => !o);
    } else {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile hamburger — visible only on small screens */}
      {!mobileOpen && (
        <button
          className="sb-mobile-hamburger"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      )}

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="sb-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`sb${collapsed ? " sb--collapsed" : ""}${mobileOpen ? " sb--mobile-open" : ""}`}>
        {/* Top: brand + toggle on the right */}
        <div className="sb-top">
          <Link to="/" className="sb-brand">
            {collapsed ? "C" : "Crushpad.ai"}
          </Link>
          <button
            className="sb-toggle"
            onClick={handleToggle}
            aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
            title={collapsed ? "Open sidebar" : "Close sidebar"}
          >
            <IconSidebar />
          </button>
        </div>

        {/* Scrollable nav */}
        <nav className="sb-nav">
          {/* Info */}
          <div className="sb-section">
            {!collapsed && <p className="sb-section-label">Info</p>}
            <Link className={linkClass("/what-we-do")} to="/what-we-do" title="What We Do">
              <IconBook />
              {!collapsed && <span className="sb-link-text">What We Do</span>}
            </Link>
            <Link className={linkClass("/how-it-works")} to="/how-it-works" title="How It Works">
              <IconBook />
              {!collapsed && <span className="sb-link-text">How It Works</span>}
            </Link>
            <Link className={linkClass("/winery")} to="/winery" title="Wineries">
              <IconWine />
              {!collapsed && <span className="sb-link-text">Wineries</span>}
            </Link>
            <Link className={linkClass("/agent-demo")} to="/agent-demo" title="Agent Demo">
              <IconChat />
              {!collapsed && <span className="sb-link-text">Agent Demo</span>}
            </Link>
            <Link className={linkClass("/book-demo")} to="/book-demo" title="Book a Demo">
              <IconCalendar />
              {!collapsed && <span className="sb-link-text">Book a Demo</span>}
            </Link>
            <Link className={linkClass("/dashboard")} to="/dashboard" title="Dashboard">
              <IconGrid />
              {!collapsed && <span className="sb-link-text">Dashboard</span>}
            </Link>
          </div>

          {/* Tools */}
          <div className="sb-section">
            {!collapsed && <p className="sb-section-label">Tools</p>}
            <Link className={linkClass("/blind-tasting")} to="/blind-tasting" title="Blind Tasting">
              <IconGamepad />
              {!collapsed && <span className="sb-link-text">Blind Tasting</span>}
            </Link>
            <Link className={linkClass("/match-me")} to="/match-me" title="Match Me">
              <IconGamepad />
              {!collapsed && <span className="sb-link-text">Match Me</span>}
            </Link>
            <Link className={linkClass("/compare")} to="/compare" title="Compare">
              <IconGrid />
              {!collapsed && <span className="sb-link-text">Compare</span>}
            </Link>
            <Link className={linkClass("/plan-visit")} to="/plan-visit" title="Plan Visit">
              <IconInfo />
              {!collapsed && <span className="sb-link-text">Plan Visit</span>}
            </Link>
          </div>
        </nav>

        {/* Bottom */}
        {!collapsed && (
          <div className="sb-bottom">
            <p className="sb-copyright">&copy; 2026 Crushpad.ai</p>
          </div>
        )}
      </aside>
    </>
  );
}
