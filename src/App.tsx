import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { WineryPage } from "./pages/WineryPage";
import { AdminPage } from "./pages/AdminPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { RexHillPartnerPage, RexHillResearchPage } from "./pages/rex-hill";
import { ChehalemPartnerPage, ChehalemResearchPage } from "./pages/chehalem";

const base = import.meta.env.BASE_URL;

export default function App() {
  return (
    <BrowserRouter basename={base}>
      <div className="app">
        <nav className="nav">
          <Link className="brand" to="/">
            OregonWine.ai
          </Link>
          <div className="nav-links">
            <Link to="/admin">Admin</Link>
            <Link to="/analytics" title="Use your partner link for your winery only">
              Analytics
            </Link>
            <a href={`${base}widget-test.html`} target="_blank" rel="noreferrer">
              Widget demo
            </a>
          </div>
        </nav>
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/directory" element={<Navigate to="/" replace />} />
            <Route path="/rex-hill" element={<RexHillPartnerPage />} />
            <Route path="/rex-hill/research" element={<RexHillResearchPage />} />
            <Route path="/chehalem" element={<ChehalemPartnerPage />} />
            <Route path="/chehalem/research" element={<ChehalemResearchPage />} />
            <Route path="/research/rex-hill" element={<RexHillResearchPage />} />
            <Route path="/research/chehalem" element={<ChehalemResearchPage />} />
            <Route path="/w/:slug" element={<WineryPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/analytics/:slug" element={<AnalyticsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
