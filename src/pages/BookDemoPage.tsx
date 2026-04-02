import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./HowItWorksPage.css";
import "./BookDemoPage.css";

const MAILTO_DEMO =
  "mailto:patrickbrandimore@gmail.com?subject=" +
  encodeURIComponent("Crushpad.ai — Book a demo") +
  "&body=" +
  encodeURIComponent("Please include your winery name and best email/phone.\n");

export function BookDemoPage() {
  const location = useLocation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [wineryOrOrg, setWineryOrOrg] = useState("");
  const [phone, setPhone] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const prev = document.title;
    document.title = "Crushpad.ai — Book a demo";
    return () => {
      document.title = prev;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (honeypot.trim()) {
      setDone(true);
      return;
    }

    const name = fullName.trim();
    const em = email.trim();
    const org = wineryOrOrg.trim();
    if (name.length < 2 || em.length < 5 || org.length < 2) {
      setError("Please fill in your name, email, and winery or organization.");
      return;
    }

    if (!supabase) {
      const subject = encodeURIComponent("Crushpad.ai — Book a demo");
      const body = encodeURIComponent(
        [
          `Name: ${name}`,
          `Email: ${em}`,
          `Winery / org: ${org}`,
          `Phone: ${phone.trim() || "—"}`,
          `Role: ${roleTitle.trim() || "—"}`,
          "",
          message.trim() || "—",
        ].join("\n")
      );
      window.location.href = `mailto:patrickbrandimore@gmail.com?subject=${subject}&body=${body}`;
      setDone(true);
      return;
    }

    setSubmitting(true);
    const { error: insErr } = await supabase.from("demo_requests").insert({
      full_name: name,
      email: em,
      winery_or_org: org,
      phone: phone.trim() || null,
      role_title: roleTitle.trim() || null,
      message: message.trim() || null,
      source_path: `${location.pathname}${location.search || ""}` || null,
    });

    setSubmitting(false);

    if (insErr) {
      setError(insErr.message || "Could not send your request. Try email or try again.");
      return;
    }

    setDone(true);
    setFullName("");
    setEmail("");
    setWineryOrOrg("");
    setPhone("");
    setRoleTitle("");
    setMessage("");
  };

  return (
    <div className="hiw bdemo-page">
      <section className="bdemo-hero" aria-labelledby="bdemo-heading">
        <div className="bdemo-hero-inner">
          <h1 id="bdemo-heading">Book a demo</h1>
          <p>Tell us who you are and we&apos;ll follow up with a short call or walkthrough.</p>
        </div>
      </section>

      <div className="bdemo-main">
        <div className="bdemo-card">
          {done ? (
            <p className="bdemo-msg bdemo-msg--ok" role="status">
              {supabase
                ? "Thanks — your request is in. We\u2019ll reach out at the email you provided."
                : "Thanks — if your email app opened, send the message and we\u2019ll follow up there."}
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="bdemo-honeypot" aria-hidden="true">
                <label htmlFor="bdemo-company">Company</label>
                <input
                  id="bdemo-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="bdemo-field">
                <label htmlFor="bdemo-name">Full name</label>
                <input
                  id="bdemo-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="bdemo-field">
                <label htmlFor="bdemo-email">Work email</label>
                <input
                  id="bdemo-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="bdemo-field">
                <label htmlFor="bdemo-org">Winery or organization</label>
                <input
                  id="bdemo-org"
                  name="organization"
                  type="text"
                  autoComplete="organization"
                  required
                  value={wineryOrOrg}
                  onChange={(e) => setWineryOrOrg(e.target.value)}
                />
              </div>

              <div className="bdemo-field">
                <label htmlFor="bdemo-phone">
                  Phone <span className="bdemo-optional">(optional)</span>
                </label>
                <input
                  id="bdemo-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="bdemo-field">
                <label htmlFor="bdemo-role">
                  Role / title <span className="bdemo-optional">(optional)</span>
                </label>
                <input
                  id="bdemo-role"
                  name="role"
                  type="text"
                  autoComplete="organization-title"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                />
              </div>

              <div className="bdemo-field">
                <label htmlFor="bdemo-message">
                  What should we know? <span className="bdemo-optional">(optional)</span>
                </label>
                <textarea
                  id="bdemo-message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. tasting room size, timeline, current website…"
                />
              </div>

              {!supabase && (
                <p className="bdemo-msg bdemo-msg--warn" role="note">
                  Supabase isn&apos;t configured here, so submit opens your email app with the details filled in.
                </p>
              )}

              {error && (
                <p className="bdemo-msg bdemo-msg--err" role="alert">
                  {error}
                </p>
              )}

              <div className="bdemo-actions">
                <button type="submit" className="bdemo-submit" disabled={submitting}>
                  {submitting ? "Sending…" : supabase ? "Submit request" : "Send via email"}
                </button>
                <Link to="/" className="bdemo-back">
                  ← Back to overview
                </Link>
              </div>

              <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--dim)" }}>
                Prefer to write directly?{" "}
                <a href={MAILTO_DEMO} style={{ color: "var(--accent)" }}>
                  patrickbrandimore@gmail.com
                </a>
              </p>
            </form>
          )}

          {done && (
            <div className="bdemo-actions" style={{ marginTop: "1.25rem" }}>
              <Link to="/" className="bdemo-submit" style={{ textAlign: "center", textDecoration: "none" }}>
                Back to overview
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
