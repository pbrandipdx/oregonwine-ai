import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, supabaseEnvHint } from "../lib/supabase";

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setError(supabaseEnvHint());
      return;
    }

    let cancelled = false;

    (async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        const { error: exErr } = await supabase.auth.exchangeCodeForSession(code);
        if (exErr) {
          if (!cancelled) setError(exErr.message);
          return;
        }
      }

      const { data: { session }, error: sessErr } = await supabase.auth.getSession();
      if (cancelled) return;

      if (sessErr) {
        setError(sessErr.message);
        return;
      }

      if (!session) {
        setError("No session. Request a new sign-in link from the login page.");
        return;
      }

      const next = sessionStorage.getItem("auth_next") || "/analytics";
      sessionStorage.removeItem("auth_next");
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate(next, { replace: true });
    })();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (error) {
    return (
      <div className="panel panel-warn" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h1 style={{ marginTop: 0 }}>Sign-in</h1>
        <p style={{ color: "#b00020" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="panel" style={{ maxWidth: 520, margin: "0 auto" }}>
      <p className="muted">Completing sign-in…</p>
    </div>
  );
}
