import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IMPACT_STATS } from "../impactStats";
import { QUICK_REPLY_LABELS, type QuickReplyLabel } from "../lib/quickReplyMessages";
import "./AgentDemoPage.css";

type Intent = "tasting" | "party" | "shop" | "ask";

const TASTING_SLOTS = ["10:30 AM", "12:00 PM", "2:00 PM", "4:00 PM"] as const;

const MOCK_WINES = [
  { id: "pn", name: "Estate Pinot Noir", vintage: "2021", price: 48, note: "Laurelwood District" },
  { id: "ch", name: "Reserve Chardonnay", vintage: "2020", price: 42, note: "Barrel-fermented" },
  { id: "sp", name: "Brut Rosé Sparkling", vintage: "NV", price: 56, note: "Méthode traditionnelle" },
] as const;

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function AgentDemoPage() {
  const [searchParams] = useSearchParams();
  const rexHill = searchParams.get("partner") === "rex-hill";
  const brand = rexHill ? "REX HILL" : "Crushpad";
  const estateShort = rexHill ? "Rex Hill" : "the estate";

  const [intent, setIntent] = useState<Intent>("tasting");

  useEffect(() => {
    const prev = document.title;
    document.title = rexHill ? "REX HILL — Concierge agent (demo)" : "Crushpad.ai — Concierge agent (demo)";
    return () => {
      document.title = prev;
    };
  }, [rexHill]);

  return (
    <div className="adp">
      <div className="adp-inner">
        <header className="adp-hero">
          <div className="adp-hero-meta">
            <span className="adp-hero-beta">Beta</span>
            <p className="adp-hero-badge">Interactive prototype · not live reservations or checkout</p>
          </div>
          <h1>
            An agent that books, plans, and sells—<em>without</em> losing the conversation.
          </h1>
          <p className="adp-hero-dek">
            Switch intents to see how a single concierge thread could handle tasting reservations, private
            gatherings, and DTC checkout. Structured flows sketch where API hooks (Tock, Commerce7, WineDirect,
            etc.) plug in next.
          </p>
        </header>

        <div className="adp-intents" role="tablist" aria-label="Agent intent">
          {(
            [
              ["tasting", "Book tasting"],
              ["party", "Private event"],
              ["shop", "Shop wine"],
              ["ask", "Ask anything"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={intent === id}
              className="adp-intent"
              onClick={() => setIntent(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="adp-workspace">
          <div className="adp-flow-col">
            {intent === "tasting" && <TastingFlow brand={brand} estateShort={estateShort} />}
            {intent === "party" && <PartyFlow estateShort={estateShort} />}
            {intent === "shop" && <ShopFlow brand={brand} />}
            {intent === "ask" && <AskIntentPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepPills({
  labels,
  current,
}: {
  labels: readonly string[];
  current: number;
}) {
  return (
    <div className="adp-steps" aria-hidden>
      {labels.map((label, i) => (
        <span
          key={label}
          className={
            "adp-step-pill" +
            (i < current ? " adp-step-pill--done" : "") +
            (i === current ? " adp-step-pill--current" : "")
          }
        >
          {i + 1}. {label}
        </span>
      ))}
    </div>
  );
}

function TastingFlow({ brand, estateShort }: { brand: string; estateShort: string }) {
  const labels = ["Guests", "Date", "Time", "Notes", "Confirm"] as const;
  const [step, setStep] = useState(0);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const next = () => setStep((s) => Math.min(s + 1, labels.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const canNext = useMemo(() => {
    if (step === 0) return guests >= 1 && guests <= 12;
    if (step === 1) return Boolean(date);
    if (step === 2) return slot != null;
    return true;
  }, [step, guests, date, slot]);

  const reset = () => {
    setStep(0);
    setGuests(2);
    setDate("");
    setSlot(null);
    setNotes("");
    setDone(false);
    setConfirmation(null);
  };

  return (
    <div className="adp-card">
      <h2>Book a tasting at {estateShort}</h2>
      <p className="adp-card-lede">
        {brand}-style flow: collect party size → date → slot → optional dietary note → confirmation. Wire to
        your reservation provider when ready.
      </p>
      <StepPills labels={labels} current={step} />

      {!done && step === 0 && (
        <div className="adp-field">
          <label htmlFor="adp-guests">Party size</label>
          <input
            id="adp-guests"
            type="number"
            min={1}
            max={12}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value) || 1)}
          />
        </div>
      )}

      {!done && step === 1 && (
        <div className="adp-field">
          <label htmlFor="adp-date">Preferred date</label>
          <input id="adp-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      )}

      {!done && step === 2 && (
        <div className="adp-field">
          <span id="adp-slot-label" style={{ display: "block", marginBottom: "0.35rem" }}>
            Available slots
          </span>
          <div className="adp-slot-grid" role="group" aria-labelledby="adp-slot-label">
            {TASTING_SLOTS.map((t) => (
              <button
                key={t}
                type="button"
                className="adp-slot"
                aria-pressed={slot === t}
                onClick={() => setSlot(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {!done && step === 3 && (
        <div className="adp-field">
          <label htmlFor="adp-notes">Allergies or occasion (optional)</label>
          <input
            id="adp-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Anniversary · vegetarian pairing"
          />
        </div>
      )}

      {!done && step === 4 && (
        <dl className="adp-summary">
          <dt>Guests</dt>
          <dd>{guests}</dd>
          <dt>Date</dt>
          <dd>{date || "—"}</dd>
          <dt>Time</dt>
          <dd>{slot ?? "—"}</dd>
          {notes ? (
            <>
              <dt>Notes</dt>
              <dd>{notes}</dd>
            </>
          ) : null}
        </dl>
      )}

      {done && confirmation && (
        <div className="adp-success" role="status">
          <strong>Hold confirmed (demo).</strong> Reference <code>{confirmation}</code>. In production this
          step POSTs to your booking API and emails the guest a calendar invite.
        </div>
      )}

      {!done ? (
        <div className="adp-btn-row">
          <button type="button" className="adp-btn adp-btn--ghost" disabled={step === 0} onClick={back}>
            Back
          </button>
          {step < 4 ? (
            <button type="button" className="adp-btn adp-btn--primary" disabled={!canNext} onClick={next}>
              Continue
            </button>
          ) : (
            <button
              type="button"
              className="adp-btn adp-btn--primary"
              onClick={() => {
                setConfirmation(`CRSH-${Math.floor(10000 + Math.random() * 89999)}`);
                setDone(true);
              }}
            >
              Confirm hold
            </button>
          )}
        </div>
      ) : (
        <div className="adp-btn-row">
          <button type="button" className="adp-btn adp-btn--ghost" onClick={reset}>
            Start over
          </button>
        </div>
      )}
    </div>
  );
}

function PartyFlow({ estateShort }: { estateShort: string }) {
  const labels = ["Group", "Dates", "Contact", "Next steps"] as const;
  const [step, setStep] = useState(0);
  const [guests, setGuests] = useState(12);
  const [occasion, setOccasion] = useState("corporate");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
   
  const runSubmit = () => {
    setSubmitted(true);
    setStep(3);
  };

  const canNext = useMemo(() => {
    if (step === 0) return guests >= 8;
    if (step === 1) return Boolean(start && end);
    if (step === 2) return /^\S+@\S+\.\S+$/.test(email);
    return true;
  }, [step, guests, start, end, email]);

  return (
    <div className="adp-card">
      <h2>Private event &amp; parties</h2>
      <p className="adp-card-lede">
        Large parties often need a human to confirm capacity, catering, and deposits. The agent gathers facts,
        then opens a structured handoff instead of over-promising automation.
      </p>
      <StepPills labels={labels} current={step} />

      {step === 0 && (
        <>
          <div className="adp-field">
            <label htmlFor="adp-party-n">Estimated guests (8–150)</label>
            <input
              id="adp-party-n"
              type="number"
              min={8}
              max={150}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value) || 8)}
            />
          </div>
          <div className="adp-field">
            <label htmlFor="adp-occ">Occasion</label>
            <select id="adp-occ" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
              <option value="corporate">Corporate retreat</option>
              <option value="wedding">Wedding / rehearsal</option>
              <option value="birthday">Milestone birthday</option>
              <option value="other">Something else</option>
            </select>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <div className="adp-field">
            <label htmlFor="adp-start">Preferred start</label>
            <input id="adp-start" type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div className="adp-field">
            <label htmlFor="adp-end">Preferred end</label>
            <input id="adp-end" type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
        </>
      )}

      {step === 2 && (
        <div className="adp-field">
          <label htmlFor="adp-email">Planner email</label>
          <input
            id="adp-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </div>
      )}

      {step === 3 && submitted && (
        <div className="adp-handoff" role="status">
          <strong>{estateShort} events team</strong> would receive this brief with availability checks. Next
          step: deposit invoice + contract (demo—no email sent).
        </div>
      )}

      {step < 3 && (
        <div className="adp-btn-row">
          <button
            type="button"
            className="adp-btn adp-btn--ghost"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </button>
          {step < 2 ? (
            <button
              type="button"
              className="adp-btn adp-btn--primary"
              disabled={!canNext}
              onClick={() => setStep((s) => s + 1)}
            >
              Continue
            </button>
          ) : (
            <button type="button" className="adp-btn adp-btn--primary" disabled={!canNext} onClick={runSubmit}>
              Send to events team
            </button>
          )}
        </div>
      )}

      {step === 3 && submitted && (
        <div className="adp-btn-row">
          <button
            type="button"
            className="adp-btn adp-btn--ghost"
            onClick={() => {
              setStep(0);
              setSubmitted(false);
              setStart("");
              setEnd("");
              setEmail("");
              setGuests(12);
            }}
          >
            New inquiry
          </button>
        </div>
      )}
    </div>
  );
}

function ShopFlow({ brand }: { brand: string }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [phase, setPhase] = useState<"browse" | "checkout" | "done">("browse");
  const [shipZip, setShipZip] = useState("");

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));

  const subtotal = MOCK_WINES.reduce((sum, w) => sum + (cart[w.id] ?? 0) * w.price, 0);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  const reset = () => {
    setCart({});
    setPhase("browse");
    setShipZip("");
  };

  return (
    <div className="adp-card">
      <h2>Shop wine online</h2>
      <p className="adp-card-lede">
        Browse SKUs with inventory-aware cards, build a cart, validate ship-to ZIP, then place order—typical
        DTC path layered on your commerce API.
      </p>

      {phase === "browse" && (
        <>
          <div className="adp-wine-grid">
            {MOCK_WINES.map((w) => (
              <article key={w.id} className="adp-wine">
                <h3>
                  {w.name} · {w.vintage}
                </h3>
                <span className="adp-wine-meta">{w.note}</span>
                <span className="adp-wine-price">{formatMoney(w.price)}</span>
                <button type="button" className="adp-btn adp-btn--primary" style={{ marginTop: "auto" }} onClick={() => add(w.id)}>
                  Add to cart
                </button>
              </article>
            ))}
          </div>
          <div className="adp-cart">
            <strong>
              Cart · {count} bottle{count === 1 ? "" : "s"} · {formatMoney(subtotal)}
            </strong>
            {count === 0 ? (
              <p style={{ color: "var(--adp-muted)", margin: "0.5rem 0 0" }}>Add wines to continue.</p>
            ) : (
              <div className="adp-btn-row" style={{ marginTop: "0.75rem" }}>
                <button type="button" className="adp-btn adp-btn--primary" onClick={() => setPhase("checkout")}>
                  Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {phase === "checkout" && (
        <>
          <div className="adp-summary">
            {MOCK_WINES.filter((w) => (cart[w.id] ?? 0) > 0).map((w) => (
              <div key={w.id} style={{ marginBottom: "0.5rem" }}>
                {cart[w.id]}× {w.name} — {formatMoney((cart[w.id] ?? 0) * w.price)}
              </div>
            ))}
            <strong>Subtotal {formatMoney(subtotal)}</strong>
          </div>
          <div className="adp-field">
            <label htmlFor="adp-zip">Ship-to ZIP (demo compliance gate)</label>
            <input
              id="adp-zip"
              value={shipZip}
              onChange={(e) => setShipZip(e.target.value.replace(/[^\d]/g, "").slice(0, 5))}
              placeholder="97205"
              inputMode="numeric"
            />
          </div>
          <div className="adp-btn-row">
            <button type="button" className="adp-btn adp-btn--ghost" onClick={() => setPhase("browse")}>
              Back to cart
            </button>
            <button
              type="button"
              className="adp-btn adp-btn--primary"
              disabled={shipZip.length !== 5}
              onClick={() => setPhase("done")}
            >
              Place order (demo)
            </button>
          </div>
        </>
      )}

      {phase === "done" && (
        <div className="adp-success" role="status">
          <strong>Order queued (demo).</strong> {brand} would hand off to your storefront for payment + carrier
          labels. Reference ORD-
          {Date.now().toString().slice(-6)}.
        </div>
      )}

      {phase === "done" && (
        <div className="adp-btn-row">
          <button type="button" className="adp-btn adp-btn--ghost" onClick={reset}>
            Shop again
          </button>
        </div>
      )}
    </div>
  );
}

const ADP_ASK_CHIP_ICONS: Record<QuickReplyLabel, JSX.Element> = {
  "Blind Tasting": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8h.01" />
    </svg>
  ),
  "Match Me": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  "Tasting options": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
      />
    </svg>
  ),
  "Hours & directions": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Wine club info": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"
      />
    </svg>
  ),
  "Food pairings": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <polygon points="12 2 2 7 12 12 22 7 12 2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="2 17 12 22 22 17" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="2 12 12 17 22 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Recipes: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 11h8M8 15h5" />
    </svg>
  ),
};

function AskIntentPanel() {
  const [query, setQuery] = useState("");

  return (
    <div className="adp-ask-page-col">
      <div className="adp-ask-module">
        <div className="adp-card adp-ask-discover">
          <h2 className="adp-ask-discover-title">What can I help you discover today?</h2>
          <form
            className="adp-ask-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!query.trim()) return;
              setQuery("");
            }}
          >
            <div className="adp-ask-input-wrap">
              <label htmlFor="adp-ask-input" className="visually-hidden">
                Ask the concierge
              </label>
              <input
                id="adp-ask-input"
                className="adp-ask-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about wines, tastings, hours..."
                autoComplete="off"
              />
              <button type="submit" className="adp-ask-submit" disabled={!query.trim()} aria-label="Send message">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
            </div>
          </form>
          <div className="adp-ask-chip-grid" role="group" aria-label="Suggested questions">
            {QUICK_REPLY_LABELS.map((label) => (
              <button key={label} type="button" className="adp-ask-chip" onClick={() => setQuery(label)}>
                <span className="adp-ask-chip-icon">{ADP_ASK_CHIP_ICONS[label]}</span>
                {label}
              </button>
            ))}
          </div>
          <p className="adp-ask-powered">
            Powered by <strong>Crushpad.ai</strong>
          </p>
        </div>
      </div>

      <div className="adp-stats-banner" role="list" aria-label="Why a concierge matters">
        {IMPACT_STATS.map((s) => (
          <div key={s.label} className="adp-stat-card" role="listitem">
            <div className="adp-stat-value">{s.value}</div>
            <div className="adp-stat-label">{s.label}</div>
            <p className="adp-stat-hint">{s.hint}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
