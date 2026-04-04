import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CATEGORIES,
  COMPARISONS,
  type CompareCategory,
  type Comparison,
} from "../../data/compare-data";
import "./ComparePage.css";

type Phase = "category" | "matchup" | "result";

export function ComparePage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Compare — Crushpad.ai";
    return () => { document.title = prev; };
  }, []);

  const [phase, setPhase] = useState<Phase>("category");
  const [category, setCategory] = useState<CompareCategory | null>(null);
  const [result, setResult] = useState<Comparison | null>(null);
  const [copied, setCopied] = useState(false);

  const pickCategory = useCallback((cat: CompareCategory) => {
    setCategory(cat);
    setPhase("matchup");
  }, []);

  const pickMatchup = useCallback((comp: Comparison) => {
    setResult(comp);
    setPhase("result");
  }, []);

  const reset = useCallback(() => {
    setPhase("category");
    setCategory(null);
    setResult(null);
    setCopied(false);
  }, []);

  const goBack = useCallback(() => {
    if (phase === "result") {
      setPhase("matchup");
      setResult(null);
    } else if (phase === "matchup") {
      setPhase("category");
      setCategory(null);
    }
  }, [phase]);

  const share = useCallback(() => {
    if (!result) return;
    const text = [
      `${result.sideA.name} vs ${result.sideB.name}`,
      `"${result.subtitle}"`,
      "",
      result.verdict,
      "",
      "Compare more at crushpad.ai/compare",
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result]);

  const matchups = category
    ? COMPARISONS.filter((c) => c.category === category)
    : [];

  return (
    <div className="cmp">
      {/* ── Back button ── */}
      {phase !== "category" && (
        <button className="cmp-back" onClick={goBack}>
          &larr; Back
        </button>
      )}

      {/* ── Step 1: Pick Category ── */}
      {phase === "category" && (
        <div className="cmp-home">
          <p className="cmp-badge">Crushpad.ai &middot; Wine Agent</p>
          <h1 className="cmp-title">Compare</h1>
          <p className="cmp-subtitle">
            Pick a category. We'll handle the argument.
          </p>
          <div className="cmp-cards">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className="cmp-card"
                onClick={() => pickCategory(cat.id)}
              >
                <span className="cmp-card-title">{cat.title}</span>
                <span className="cmp-card-desc">{cat.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 2: Pick Matchup ── */}
      {phase === "matchup" && (
        <div className="cmp-matchups" key={category}>
          <p className="cmp-badge">
            {CATEGORIES.find((c) => c.id === category)?.title}
          </p>
          <h2 className="cmp-matchup-heading">Pick your matchup</h2>
          <div className="cmp-cards">
            {matchups.map((m) => (
              <button
                key={m.id}
                className="cmp-card"
                onClick={() => pickMatchup(m)}
              >
                <span className="cmp-card-title">
                  {m.sideA.name} vs {m.sideB.name}
                </span>
                <span className="cmp-card-desc">{m.subtitle}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 3: Result ── */}
      {phase === "result" && result && (
        <div className="cmp-result">
          <p className="cmp-badge">{result.subtitle}</p>
          <h2 className="cmp-result-title">
            {result.sideA.name}
            <span className="cmp-vs-inline"> vs </span>
            {result.sideB.name}
          </h2>

          {/* Side-by-side comparison */}
          <div className="cmp-sides">
            {/* Side A */}
            <div className="cmp-side">
              <h3 className="cmp-side-name">{result.sideA.name}</h3>
              <p className="cmp-side-tagline">"{result.sideA.tagline}"</p>
              <div className="cmp-attrs">
                {result.sideA.attributes.map((attr) => (
                  <div key={attr.label} className="cmp-attr">
                    <span className="cmp-attr-label">{attr.label}</span>
                    <span className="cmp-attr-value">{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* VS divider */}
            <div className="cmp-vs-divider">
              <span className="cmp-vs-text">vs</span>
            </div>

            {/* Side B */}
            <div className="cmp-side">
              <h3 className="cmp-side-name">{result.sideB.name}</h3>
              <p className="cmp-side-tagline">"{result.sideB.tagline}"</p>
              <div className="cmp-attrs">
                {result.sideB.attributes.map((attr) => (
                  <div key={attr.label} className="cmp-attr">
                    <span className="cmp-attr-label">{attr.label}</span>
                    <span className="cmp-attr-value">{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verdict */}
          <div className="cmp-verdict">
            <p className="cmp-verdict-label">The Verdict</p>
            <p className="cmp-verdict-text">{result.verdict}</p>
          </div>

          {/* Actions */}
          <div className="cmp-actions">
            <button className="cmp-share-btn" onClick={share}>
              {copied ? "Copied!" : "Share"}
            </button>
            <button className="cmp-again-btn" onClick={reset}>
              Compare Another Pair
            </button>
          </div>
        </div>
      )}

      <footer className="cmp-footer">
        <Link to="/chatbot-demo" style={{ color: "inherit", textDecoration: "none" }}>
          &larr; Back to Crushpad.ai
        </Link>
      </footer>
    </div>
  );
}
