import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { HomePage } from "./pages/HomePage";
import { WineryPage } from "./pages/WineryPage";
import { AdminPage } from "./pages/AdminPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { RexHillResearchPage } from "./pages/RexHillResearchPage";
import { LoginPage } from "./pages/LoginPage";
import { AuthCallbackPage } from "./pages/AuthCallbackPage";

const base = import.meta.env.BASE_URL;

function AppNav() {
  const { session, loading, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <Link className="brand" to="/">
        OregonWine.ai
      </Link>
      <div className="nav-links">
        <Link to="/admin">Admin</Link>
        <Link to="/analytics" title="Partner dashboard (sign-in required)">
          Analytics
        </Link>
        <a href={`${base}widget-test.html`} target="_blank" rel="noreferrer">
          Widget demo
        </a>
        {!loading &&
          (session ? (
            <button
              type="button"
              className="nav-link-btn"
              onClick={() => {
                void signOut().then(() => navigate("/login"));
              }}
            >
              Sign out
            </button>
          ) : (
            <Link to="/login">Partner login</Link>
          ))}
      </div>
    </nav>
  );
}

function AppRoutes() {
  return (
    <div className="app">
      <AppNav />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/directory" element={<Navigate to="/" replace />} />
          <Route path="/research/rex-hill" element={<RexHillResearchPage />} />
          <Route path="/w/:slug" element={<WineryPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics/:slug"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={base}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
