import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase, supabaseEnvHint } from "../lib/supabase";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (!supabase) {
    return (
      <div className="panel panel-warn" style={{ maxWidth: 640, margin: "0 auto" }}>
        <p>{supabaseEnvHint()}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="panel" style={{ maxWidth: 640, margin: "0 auto" }}>
        <p className="muted">Checking session…</p>
      </div>
    );
  }

  if (!session) {
    const path = `${location.pathname}${location.search ?? ""}`;
    const safe = path.startsWith("/") && !path.startsWith("//") ? path : "/analytics";
    return <Navigate to={`/login?next=${encodeURIComponent(safe)}`} replace />;
  }

  return <>{children}</>;
}
