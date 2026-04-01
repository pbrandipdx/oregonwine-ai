import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { HomePage } from "./pages/HomePage";
import { WineryPage } from "./pages/WineryPage";
import { AdminPage } from "./pages/AdminPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { RexHillPartnerPage, RexHillResearchPage } from "./pages/rex-hill";
import { ChehalemPartnerPage, ChehalemResearchPage } from "./pages/chehalem";
import { SoterPartnerPage, SoterResearchPage } from "./pages/soter";
import {
  inferWinerySlugFromPath,
  navConfigForSlug,
} from "./lib/wineries";
import {
  WineryDirectoryProvider,
  useWineryBySlug,
  useWineryDirectory,
} from "./contexts/WineryDirectoryContext";

const base = import.meta.env.BASE_URL;

function AppNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSlug = useMemo(
    () => inferWinerySlugFromPath(location.pathname),
    [location.pathname]
  );
  const meta = useWineryBySlug(activeSlug);
  const winery = useMemo(() => {
    if (!activeSlug) return undefined;
    const label = meta?.name ?? activeSlug.replace(/-/g, " ");
    return navConfigForSlug(activeSlug, label);
  }, [activeSlug, meta]);

  return (
    <nav className="nav">
      <div className="nav-start">
        <Link className="brand" to="/">
          Crushpad.ai
        </Link>
        <NavWinerySelect />
      </div>
      <div className="nav-end">
        {winery && (
          <div className="nav-winery-pages" aria-label={`${winery.label} pages`}>
            <Link to={winery.partnerPath}>Partner</Link>
            {winery.researchPath && <Link to={winery.researchPath}>Research</Link>}
            <Link to={`/analytics/${winery.slug}`}>Analytics</Link>
          </div>
        )}
        <div className="nav-links">
          <Link to="/admin">Admin</Link>
          <a
            href={`${base}widget-test.html${activeSlug === "rex-hill" ? "?partner=rex-hill" : ""}`}
            target="_blank"
            rel="noreferrer"
          >
            Widget demo
          </a>
        </div>
      </div>
    </nav>
  );
}

function NavWinerySelect() {
  const location = useLocation();
  const navigate = useNavigate();
  const { wineries, loading } = useWineryDirectory();
  const activeSlug = useMemo(
    () => inferWinerySlugFromPath(location.pathname),
    [location.pathname]
  );

  return (
    <label className="nav-winery-label">
      <span className="nav-winery-cue">Winery</span>
      <select
        className="nav-winery-select"
        aria-label="Choose winery"
        disabled={loading || wineries.length === 0}
        value={activeSlug ?? ""}
        onChange={(e) => {
          const slug = e.target.value;
          if (!slug) return;
          const row = wineries.find((w) => w.slug === slug);
          navigate(navConfigForSlug(slug, row?.name ?? slug).partnerPath);
        }}
      >
        <option value="">{loading ? "Loading…" : "Choose…"}</option>
        {wineries.map((w) => (
          <option key={w.id} value={w.slug}>
            {w.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function AppRoutesInner() {
  return (
    <div className="app">
      <AppNav />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/directory" element={<Navigate to="/" replace />} />
          <Route path="/rex-hill" element={<RexHillPartnerPage />} />
          <Route path="/rex-hill/research" element={<RexHillResearchPage />} />
          <Route path="/chehalem" element={<ChehalemPartnerPage />} />
          <Route path="/chehalem/research" element={<ChehalemResearchPage />} />
          <Route path="/soter" element={<SoterPartnerPage />} />
          <Route path="/soter/research" element={<SoterResearchPage />} />
          <Route path="/research/rex-hill" element={<RexHillResearchPage />} />
          <Route path="/research/chehalem" element={<ChehalemResearchPage />} />
          <Route path="/research/soter" element={<SoterResearchPage />} />
          <Route path="/w/:slug" element={<WineryPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/analytics/:slug" element={<AnalyticsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function AppRoutes() {
  return (
    <WineryDirectoryProvider>
      <AppRoutesInner />
    </WineryDirectoryProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={base}>
      <AppRoutes />
    </BrowserRouter>
  );
}
