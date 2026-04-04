import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
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
import { BlindTastingPage } from "./pages/blind-tasting";
import { MatchMePage } from "./pages/match-me";
import {
  CRUSHPAD_DEMO_SLUG,
  inferWinerySlugFromPath,
  navConfigForSlug,
} from "./lib/wineries";
import { WineryDirectoryProvider, useWineryBySlug } from "./contexts/WineryDirectoryContext";

const base = import.meta.env.BASE_URL;

/** Redirect helper: redirects /:slug param to a new path */
function RedirectToSlugSub({ sub }: { sub: string }) {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/${slug}/${sub}`} replace />;
}

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

  const onHowItWorks = location.pathname === "/how-it-works";
  const onChatDemo = location.pathname === "/chatbot-demo";
  const onAgentDemo = location.pathname === "/agent-demo";

  return (
    <nav className="nav">
      <div className="nav-start">
        <Link className="brand" to="/">
          Crushpad.ai
        </Link>
      </div>
      <div className="nav-end">
        {winery && winery.slug === CRUSHPAD_DEMO_SLUG && (
          <div className="nav-winery-pages" aria-label="Crushpad.ai demo pages">
            <Link to="/chatbot-demo/admin">Admin</Link>
            <Link to="/chatbot-demo">Chat</Link>
            <Link to="/chatbot-demo/analytics">Analytics</Link>
          </div>
        )}
        {winery && winery.slug !== CRUSHPAD_DEMO_SLUG && (
          <div className="nav-winery-pages" aria-label={`${winery.label} pages`}>
            <Link to={`/${winery.slug}/admin`}>Admin</Link>
            <Link to={winery.partnerPath}>Partner</Link>
            <Link to={winery.demoPath}>Chat</Link>
            {winery.researchPath && <Link to={winery.researchPath}>Research</Link>}
            <Link to={winery.analyticsPath}>Analytics</Link>
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
          {onChatDemo ? (
            <span className="nav-link-here">Chatbot demo</span>
          ) : (
            <Link to="/chatbot-demo">Chatbot demo</Link>
          )}
          {onAgentDemo ? (
            <span className="nav-link-here">Agent demo</span>
          ) : (
            <Link to="/agent-demo">Agent demo</Link>
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
  const isGamePage =
    location.pathname === "/blind-tasting" ||
    location.pathname === "/match-me";
  const isDemoShell =
    location.pathname === "/chatbot-demo" ||
    location.pathname.endsWith("/demo") ||
    location.pathname === "/agent-demo";
  return (
    <div className="app">
      <AppNav />
      <main
        className={
          isGamePage
            ? "main main--landing"
            : isHomeLanding || isHowItWorksLanding || isBookDemo
            ? "main main--landing"
            : isDemoShell
              ? "main main--widget-demo"
              : "main"
        }
      >
        <Routes>
          {/* ── Public pages ─────────────────────────────────── */}
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/book-demo" element={<BookDemoPage />} />
          <Route path="/chatbot-demo" element={<WidgetDemoPage />} />
          <Route path="/chatbot-demo/analytics" element={<AnalyticsPage />} />
          <Route path="/chatbot-demo/admin" element={<AdminPage />} />
          <Route path="/agent-demo" element={<AgentDemoPage />} />
          <Route path="/blind-tasting" element={<BlindTastingPage />} />
          <Route path="/match-me" element={<MatchMePage />} />
          {/* /admin without slug still works but won't show winery nav */}
          <Route path="/admin" element={<AdminPage />} />

          {/* ── Winery pages: /{slug}, /{slug}/demo, /{slug}/research, /{slug}/analytics ── */}
          <Route path="/rex-hill" element={<RexHillPartnerPage />} />
          <Route path="/rex-hill/demo" element={<WidgetDemoRexHillPage />} />
          <Route path="/rex-hill/research" element={<RexHillResearchPage />} />
          <Route path="/rex-hill/analytics" element={<AnalyticsPage />} />
          <Route path="/rex-hill/admin" element={<AdminPage />} />

          <Route path="/chehalem" element={<ChehalemPartnerPage />} />
          <Route path="/chehalem/research" element={<ChehalemResearchPage />} />
          <Route path="/chehalem/analytics" element={<AnalyticsPage />} />
          <Route path="/chehalem/admin" element={<AdminPage />} />

          <Route path="/soter" element={<SoterPartnerPage />} />
          <Route path="/soter/research" element={<SoterResearchPage />} />
          <Route path="/soter/analytics" element={<AnalyticsPage />} />
          <Route path="/soter/admin" element={<AdminPage />} />

          {/* Dynamic fallback for new wineries */}
          <Route path="/w/:slug" element={<WineryPage />} />

          {/* ── Legacy redirects (old URLs → new canonical) ── */}
          <Route path="/widget-demo" element={<Navigate to="/chatbot-demo" replace />} />
          <Route path="/chat-demo" element={<Navigate to="/chatbot-demo" replace />} />
          <Route path="/widget-demo-rexhill" element={<Navigate to="/rex-hill/demo" replace />} />
          <Route path="/analytics/:slug" element={<RedirectToSlugSub sub="analytics" />} />
          <Route path="/research/:slug" element={<RedirectToSlugSub sub="research" />} />
          <Route path="/partners" element={<Navigate to="/" replace />} />
          <Route path="/directory" element={<Navigate to="/" replace />} />
          <Route path="/analytics" element={<Navigate to="/" replace />} />

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
