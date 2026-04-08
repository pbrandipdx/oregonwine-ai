import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { BookDemoPage } from "./pages/BookDemoPage";
import { HomePage } from "./pages/HomePage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { WhatWeDoPage } from "./pages/WhatWeDoPage";
import { WidgetDemoPage } from "./pages/WidgetDemoPage";
import { WidgetDemoRexHillPage } from "./pages/WidgetDemoRexHillPage";
import { WidgetDemoCrowleyPage } from "./pages/WidgetDemoCrowleyPage";
import { AgentDemoPage } from "./pages/AgentDemoPage";
import { WineryPage } from "./pages/WineryPage";
import { AdminPage } from "./pages/AdminPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { RexHillPartnerPage, RexHillResearchPage } from "./pages/rex-hill";
import { WineryHomeMockPage } from "./pages/WineryHomeMockPage";
import { ChehalemPartnerPage, ChehalemResearchPage } from "./pages/chehalem";
import { WidgetDemoChehalemPage } from "./pages/WidgetDemoChehalemPage";
import { ChehalemBlindTasting, ChehalemMatchMe } from "./pages/chehalem-games";
import { SoterPartnerPage, SoterResearchPage } from "./pages/soter";
import { WidgetDemoSoterPage } from "./pages/WidgetDemoSoterPage";
import { SoterBlindTasting, SoterMatchMe } from "./pages/soter-games";
import { CrowleyPartnerPage, CrowleyResearchPage } from "./pages/crowley";
import { PonziPartnerPage, PonziResearchPage } from "./pages/ponzi";
import { WidgetDemoPonziPage } from "./pages/WidgetDemoPonziPage";
import { PonziBlindTasting, PonziMatchMe } from "./pages/ponzi-games";
import { WineryPortfolioPage } from "./pages/WineryPortfolioPage";
import { BlindTastingPage } from "./pages/blind-tasting";
import { MatchMePage } from "./pages/match-me";
import { RexHillBlindTasting, RexHillMatchMe } from "./pages/rex-hill-games";
import { CrowleyBlindTasting, CrowleyMatchMe } from "./pages/crowley-games";
import { PlanVisitPage } from "./pages/plan-visit";
import { ComparePage } from "./pages/compare";
import { FeaturedWineryPage } from "./pages/featured-winery";
import { WineryInfoPage } from "./pages/winery-info";
import { Sidebar } from "./components/Sidebar";
import "./components/Sidebar.css";
import { WineryDirectoryProvider } from "./contexts/WineryDirectoryContext";

const base = import.meta.env.BASE_URL;

/** Redirect helper: redirects /:slug param to a new path */
function RedirectToSlugSub({ sub }: { sub: string }) {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/${slug}/${sub}`} replace />;
}

function AppRoutesInner() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get("embed") === "1";
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const p = location.pathname;
  const isHomeLanding = p === "/" || p === "";
  const isDemoShell =
    p === "/chatbot-demo" ||
    p.endsWith("/demo") ||
    p === "/agent-demo";
  const isGameOrLanding =
    p === "/blind-tasting" ||
    p === "/match-me" ||
    p === "/plan-visit" ||
    p === "/compare" ||
    p === "/featured-winery" ||
    p === "/winery-info" ||
    p === "/how-it-works" ||
    p === "/book-demo" ||
    p.endsWith("/blind-tasting") ||
    p.endsWith("/match-me");

  /* Detect winery sub-pages (e.g. /rex-hill/demo, /crowley/analytics) */
  const WINERY_NAV: Record<string, string> = {
    "rex-hill": "REX HILL",
    crowley: "Crowley Wines",
    chehalem: "Chehalem Winery",
    ponzi: "Ponzi Vineyards",
    soter: "Soter Vineyards",
  };
  const WINERY_SLUGS = Object.keys(WINERY_NAV);
  const winerySlugMatch = WINERY_SLUGS.find((s) => p.startsWith(`/${s}`));
  const isWinerySubPage = !!winerySlugMatch && p !== `/${winerySlugMatch}`;
  const isWineryRootPage = !!winerySlugMatch && p === `/${winerySlugMatch}`;
  const wineryName = winerySlugMatch ? WINERY_NAV[winerySlugMatch] : "";
  const winerySection = winerySlugMatch ? p.replace(`/${winerySlugMatch}`, "").replace("/", "") : "";

  const WINERY_SECTIONS = [
    { key: "", label: "Partner" },
    { key: "demo", label: "Chat" },
    { key: "research", label: "Research" },
    { key: "blind-tasting", label: "Blind Tasting" },
    { key: "match-me", label: "Match Me" },
    { key: "analytics", label: "Analytics" },
    { key: "admin", label: "Admin" },
  ];

  // Full-bleed sales mock pages — render as if they were the customer's own site,
  // with no Crushpad sidebar / winery nav chrome around them. Matches /{slug}/preview
  // for any winery in WINERY_MOCK_CONFIGS.
  const isFullBleedMock = /^\/[^/]+\/preview$/.test(p);
  if (isFullBleedMock) {
    return (
      <div className="app" style={{ minHeight: "100vh" }}>
        <main className="main main--landing" style={{ padding: 0 }}>
          <Routes>
            <Route path="/:slug/preview" element={<WineryHomeMockPage />} />
          </Routes>
        </main>
      </div>
    );
  }

  // When embedded in an iframe (?embed=1), hide sidebar and remove padding
  if (isEmbed) {
    return (
      <div className="app" style={{ minHeight: "100vh" }}>
        <main className="main main--landing" style={{ paddingTop: 0 }}>
          <Routes>
            <Route path="/blind-tasting" element={<BlindTastingPage />} />
            <Route path="/match-me" element={<MatchMePage />} />
            <Route path="/rex-hill/blind-tasting" element={<RexHillBlindTasting />} />
            <Route path="/rex-hill/match-me" element={<RexHillMatchMe />} />
            <Route path="/crowley/blind-tasting" element={<CrowleyBlindTasting />} />
            <Route path="/crowley/match-me" element={<CrowleyMatchMe />} />
            <Route path="/ponzi/blind-tasting" element={<PonziBlindTasting />} />
            <Route path="/ponzi/match-me" element={<PonziMatchMe />} />
            <Route path="/chehalem/blind-tasting" element={<ChehalemBlindTasting />} />
            <Route path="/chehalem/match-me" element={<ChehalemMatchMe />} />
            <Route path="/soter/blind-tasting" element={<SoterBlindTasting />} />
            <Route path="/soter/match-me" element={<SoterMatchMe />} />
            <Route path="/plan-visit" element={<PlanVisitPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/featured-winery" element={<FeaturedWineryPage />} />
            <Route path="/winery-info" element={<WineryInfoPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div className="app app--sidebar">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
      />
      <div className={`app-content${sidebarCollapsed ? " app-content--collapsed" : ""}`}>
        {/* Winery navigation bar */}
        {(isWinerySubPage || isWineryRootPage) && winerySlugMatch && (
          <div className="winery-nav-bar">
            <div className="winery-nav-top">
              <Link to="/winery" className="winery-nav-back">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
                </svg>
                All Wineries
              </Link>
              <span className="winery-nav-name">{wineryName}</span>
            </div>
            <div className="winery-nav-tabs">
              {WINERY_SECTIONS.map((s) => {
                const to = s.key ? `/${winerySlugMatch}/${s.key}` : `/${winerySlugMatch}`;
                const active = winerySection === s.key;
                return (
                  <Link
                    key={s.key}
                    to={to}
                    className={`winery-nav-tab${active ? " winery-nav-tab--active" : ""}`}
                  >
                    {s.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        <main
          className={
            isHomeLanding || isDemoShell
              ? "main main--chat-home"
              : isGameOrLanding
                ? "main main--landing"
                : "main main--sidebar-page"
          }
        >
          <Routes>
            {/* ── Home: chat widget fills the page ────────────── */}
            <Route path="/" element={<WidgetDemoPage />} />

            {/* ── Public pages ─────────────────────────────────── */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/what-we-do" element={<WhatWeDoPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/book-demo" element={<BookDemoPage />} />
            <Route path="/chatbot-demo" element={<WidgetDemoPage />} />
            <Route path="/chatbot-demo/analytics" element={<AnalyticsPage />} />
            <Route path="/chatbot-demo/admin" element={<AdminPage />} />
            <Route path="/agent-demo" element={<AgentDemoPage />} />
            <Route path="/winery" element={<WineryPortfolioPage />} />
            <Route path="/wineries" element={<WineryPortfolioPage />} />
            <Route path="/blind-tasting" element={<BlindTastingPage />} />
            <Route path="/match-me" element={<MatchMePage />} />
            <Route path="/plan-visit" element={<PlanVisitPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/featured-winery" element={<FeaturedWineryPage />} />
            <Route path="/winery-info" element={<WineryInfoPage />} />
            <Route path="/admin" element={<AdminPage />} />

            {/* ── Rex Hill ─────────────────────────────────────── */}
            <Route path="/rex-hill" element={<RexHillPartnerPage />} />
            <Route path="/rex-hill/demo" element={<WidgetDemoRexHillPage />} />
            <Route path="/rex-hill/research" element={<RexHillResearchPage />} />
            <Route path="/rex-hill/blind-tasting" element={<RexHillBlindTasting />} />
            <Route path="/rex-hill/match-me" element={<RexHillMatchMe />} />
            <Route path="/rex-hill/analytics" element={<AnalyticsPage />} />
            <Route path="/rex-hill/admin" element={<AdminPage />} />

            {/* ── Crowley ──────────────────────────────────────── */}
            <Route path="/crowley" element={<CrowleyPartnerPage />} />
            <Route path="/crowley/demo" element={<WidgetDemoCrowleyPage />} />
            <Route path="/crowley/research" element={<CrowleyResearchPage />} />
            <Route path="/crowley/blind-tasting" element={<CrowleyBlindTasting />} />
            <Route path="/crowley/match-me" element={<CrowleyMatchMe />} />
            <Route path="/crowley/analytics" element={<AnalyticsPage />} />
            <Route path="/crowley/admin" element={<AdminPage />} />

            {/* ── Chehalem ─────────────────────────────────────── */}
            <Route path="/chehalem" element={<ChehalemPartnerPage />} />
            <Route path="/chehalem/demo" element={<WidgetDemoChehalemPage />} />
            <Route path="/chehalem/research" element={<ChehalemResearchPage />} />
            <Route path="/chehalem/blind-tasting" element={<ChehalemBlindTasting />} />
            <Route path="/chehalem/match-me" element={<ChehalemMatchMe />} />
            <Route path="/chehalem/analytics" element={<AnalyticsPage />} />
            <Route path="/chehalem/admin" element={<AdminPage />} />

            {/* ── Ponzi ────────────────────────────────────────── */}
            <Route path="/ponzi" element={<PonziPartnerPage />} />
            <Route path="/ponzi/demo" element={<WidgetDemoPonziPage />} />
            <Route path="/ponzi/research" element={<PonziResearchPage />} />
            <Route path="/ponzi/blind-tasting" element={<PonziBlindTasting />} />
            <Route path="/ponzi/match-me" element={<PonziMatchMe />} />
            <Route path="/ponzi/analytics" element={<AnalyticsPage />} />
            <Route path="/ponzi/admin" element={<AdminPage />} />

            {/* ── Soter ────────────────────────────────────────── */}
            <Route path="/soter" element={<SoterPartnerPage />} />
            <Route path="/soter/demo" element={<WidgetDemoSoterPage />} />
            <Route path="/soter/research" element={<SoterResearchPage />} />
            <Route path="/soter/blind-tasting" element={<SoterBlindTasting />} />
            <Route path="/soter/match-me" element={<SoterMatchMe />} />
            <Route path="/soter/analytics" element={<AnalyticsPage />} />
            <Route path="/soter/admin" element={<AdminPage />} />

            {/* Dynamic fallback for new wineries */}
            <Route path="/w/:slug" element={<WineryPage />} />

            {/* ── Legacy redirects ─────────────────────────────── */}
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
