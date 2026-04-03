import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { BookDemoPage } from "./pages/BookDemoPage";
import { HomePage } from "./pages/HomePage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { WidgetDemoPage } from "./pages/WidgetDemoPage";
import { WidgetDemoRexHillPage } from "./pages/WidgetDemoRexHillPage";
import { AgentDemoPage } from "./pages/AgentDemoPage";
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
import { WineryDirectoryProvider, useWineryBySlug } from "./contexts/WineryDirectoryContext";

const base = import.meta.env.BASE_URL;

function AppNav() {
  const location = useLocation();
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

  const onHome = location.pathname === "/" || location.pathname === "";
  const onHowItWorks = location.pathname === "/how-it-works";
  const onWidgetDemo = location.pathname === "/widget-demo";
  const onAgentDemo = location.pathname === "/agent-demo";
  const demoPartnerQuery = activeSlug === "rex-hill" ? "?partner=rex-hill" : "";

  return (
    <nav className="nav">
      <div className="nav-start">
        <Link className="brand" to="/">
          Crushpad.ai
        </Link>
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
          {onHowItWorks ? (
            <span className="nav-link-here">How it works</span>
          ) : (
            <Link to="/how-it-works">
              How it works
            </Link>
          )}
          <Link to="/admin">Admin</Link>
          {onWidgetDemo ? (
            <span className="nav-link-here">Chatbot demo</span>
          ) : (
            <Link to={`/widget-demo${demoPartnerQuery}`}>Chatbot demo</Link>
          )}
          {onAgentDemo ? (
            <span className="nav-link-here">Agent demo</span>
          ) : (
            <Link to={`/agent-demo${demoPartnerQuery}`}>Agent demo</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function AppRoutesInner() {
  const location = useLocation();
  const isHomeLanding = location.pathname === "/" || location.pathname === "";
  const isHowItWorksLanding = location.pathname === "/how-it-works";
  const isBookDemo = location.pathname === "/book-demo";
  const isDemoShell =
    location.pathname === "/widget-demo" ||
    location.pathname.startsWith("/widget-demo-") ||
    location.pathname === "/agent-demo";
  return (
    <div className="app">
      <AppNav />
      <main
        className={
          isHomeLanding || isHowItWorksLanding || isBookDemo
            ? "main main--landing"
            : isDemoShell
              ? "main main--widget-demo"
              : "main"
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/book-demo" element={<BookDemoPage />} />
          <Route path="/widget-demo" element={<WidgetDemoPage />} />
          <Route path="/widget-demo-rexhill" element={<WidgetDemoRexHillPage />} />
          <Route path="/agent-demo" element={<AgentDemoPage />} />
          <Route path="/partners" element={<Navigate to="/" replace />} />
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
