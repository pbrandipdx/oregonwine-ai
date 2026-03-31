import { FormEvent, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase, supabaseEnvHint } from "../lib/supabase";

function sanitizeNext(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/analytics";
  return raw;
}

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const next = useMemo(() => sanitizeNext(searchParams.get("next")), [searchParams]);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  if (!supabase) {
    return (
      <div className="panel panel-warn" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h1 style={{ marginTop: 0 }}>Partner login</h1>
        <p>{supabaseEnvHint()}</p>
        <Link className="btn btn-ghost" to="/">
          Home
        </Link>
      </div>
    );
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("sending");
    setMessage(null);

    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const redirect = `${window.location.origin}${base}/auth/callback`;

    try {
      sessionStorage.setItem("auth_next", next);
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: { emailRedirectTo: redirect },
      });
      if (error) {
        setStatus("error");
        setMessage(error.message);
        return;
      }
      setStatus("sent");
      setMessage("Check your email for the sign-in link. You can close this tab.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="panel" style={{ maxWidth: 480, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0, color: "#722f37" }}>Partner login</h1>
      <p className="muted" style={{ marginBottom: "1.25rem" }}>
        We’ll email you a one-time link. Your account must be linked to a winery before analytics or
        admin tools work—ask OregonWine.ai to add your login after you sign up once.
      </p>

      <form onSubmit={submit}>
        <label htmlFor="login-email" className="small" style={{ display: "block", fontWeight: 600 }}>
          Work email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@winery.com"
          required
          disabled={status === "sending" || status === "sent"}
          style={{
            width: "100%",
            marginTop: 8,
            marginBottom: 16,
            padding: "0.65rem 0.85rem",
            borderRadius: 10,
            border: "1px solid rgba(114, 47, 55, 0.25)",
            fontSize: "1rem",
          }}
        />
        <button type="submit" className="btn" disabled={status === "sending" || status === "sent"}>
          {status === "sending" ? "Sending…" : "Email sign-in link"}
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "1.25rem",
            color: status === "error" ? "#b00020" : "#4a3d4c",
            fontSize: "0.95rem",
          }}
        >
          {message}
        </p>
      )}

      <p style={{ marginTop: "1.5rem" }}>
        <Link to="/" className="muted small" style={{ color: "#722f37" }}>
          ← Home
        </Link>
      </p>
    </div>
  );
}
