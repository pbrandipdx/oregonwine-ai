import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { MarketingNav } from "./components/MarketingNav";
import { MarketingHomePage } from "./pages/MarketingHomePage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { BookDemoPage } from "./pages/BookDemoPage";
import { PricingPage } from "./pages/PricingPage";
import { AgentDemoPage } from "./pages/AgentDemoPage";
import { WidgetDemoRexHillPage } from "./pages/WidgetDemoRexHillPage";
import { WidgetDemoCrowleyPage } from "./pages/WidgetDemoCrowleyPage";
import { WidgetDemoChehalemPage } from "./pages/WidgetDemoChehalemPage";
import { WidgetDemoPonziPage } from "./pages/WidgetDemoPonziPage";
import { WidgetDemoSoterPage } from "./pages/WidgetDemoSoterPage";
import { WineryPreviewDispatcher } from "./pages/preview/WineryPreviewDispatcher";
import "./components/MarketingNav.css";
import "./marketing.css";

const base = import.meta.env.BASE_URL;

/*
 * ── Restructured crushpad.ai ──
 *
 * This is the MARKETING site only.
 * - Clean top nav, no sidebar
 * - 5 core pages: Home, How It Works, Live Demo, Pricing, Book a Demo
 * - Winery demos remain for sales presentations
 * - Admin/Dashboard/Analytics are on app.crushpad.ai (separate deploy)
 *
 * Login button in nav links to app.crushpad.ai
 */

function MarketingRoutes() {
  const location = useLocation();

  // Full-bleed preview pages (no nav)
  const isPreview = /^\/[^/]+\/preview$/.test(location.pathname);
  if (isPreview) {
    return (
      <Routes>
        <Route path="/:slug/preview" element={<WineryPreviewDispatcher />} />
      </Routes>
    );
  }

  return (
    <>
      <MarketingNav />
      <div className="mktg-app">
        <div key={location.pathname} className="route-view-transition">
          <Routes>
            {/* ── Core marketing pages ── */}
            <Route path="/" element={<MarketingHomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/book-demo" element={<BookDemoPage />} />

            {/* ── Live demo ── */}
            <Route path="/demo" element={<AgentDemoPage />} />

            {/* ── Winery-specific demos (for sales pitches) ── */}
            <Route path="/demo/rex-hill" element={<WidgetDemoRexHillPage />} />
            <Route path="/demo/crowley" element={<WidgetDemoCrowleyPage />} />
            <Route path="/demo/chehalem" element={<WidgetDemoChehalemPage />} />
            <Route path="/demo/ponzi" element={<WidgetDemoPonziPage />} />
            <Route path="/demo/soter" element={<WidgetDemoSoterPage />} />

            {/* ── Legacy chat demo route ── */}
            <Route path="/chatbot-demo" element={<Navigate to="/demo" replace />} />

            {/* ── Legacy redirects ── */}
            <Route path="/what-we-do" element={<Navigate to="/" replace />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/widget-demo" element={<Navigate to="/demo" replace />} />
            <Route path="/agent-demo" element={<Navigate to="/demo" replace />} />
            <Route path="/winery" element={<Navigate to="/" replace />} />
            <Route path="/wineries" element={<Navigate to="/" replace />} />
            <Route path="/partners" element={<Navigate to="/" replace />} />
            <Route path="/directory" element={<Navigate to="/" replace />} />

            {/* Admin/Dashboard/Analytics → app subdomain */}
            <Route path="/admin" element={<RedirectToApp path="/admin" />} />
            <Route path="/dashboard" element={<RedirectToApp path="/dashboard" />} />
            <Route path="/analytics" element={<RedirectToApp path="/analytics" />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

/** Redirects admin routes to app.crushpad.ai */
function RedirectToApp({ path }: { path: string }) {
  if (typeof window !== "undefined") {
    window.location.href = `https://app.crushpad.ai${path}`;
  }
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "60vh", color: "rgba(255,255,255,0.5)", fontSize: "0.95rem"
    }}>
      Redirecting to app.crushpad.ai{path}...
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={base}>
      <MarketingRoutes />
    </BrowserRouter>
  );
}
