import { Link, useLocation } from "react-router-dom";

export function MarketingNav() {
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/demo", label: "Live Demo" },
    { to: "/pricing", label: "Pricing" },
  ];

  return (
    <header className="mn">
      <div className="mn-inner">
        <Link to="/" className="mn-brand">
          Crushpad<span className="mn-brand-dot">.ai</span>
        </Link>

        <nav className="mn-links">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`mn-link${pathname === l.to ? " mn-link--active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mn-actions">
          <Link to="/book-demo" className="mn-btn mn-btn--ghost">
            Book a Demo
          </Link>
          <a
            href="https://app.crushpad.ai"
            className="mn-btn mn-btn--primary"
            rel="noopener"
          >
            Log In
          </a>
        </div>

        {/* Mobile hamburger */}
        <MobileMenu links={links} />
      </div>
    </header>
  );
}

function MobileMenu({ links }: { links: { to: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close on navigate
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <button
        className="mn-hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div className="mn-mobile-overlay" onClick={() => setOpen(false)}>
          <nav className="mn-mobile-menu" onClick={(e) => e.stopPropagation()}>
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`mn-mobile-link${pathname === l.to ? " mn-mobile-link--active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <hr className="mn-mobile-divider" />
            <Link to="/book-demo" className="mn-mobile-link" onClick={() => setOpen(false)}>
              Book a Demo
            </Link>
            <a href="https://app.crushpad.ai" className="mn-mobile-link" rel="noopener">
              Log In
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

import { useState, useEffect } from "react";
