import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CW_WINES,
  CW_GRAPE_OPTIONS,
  CW_VINEYARD_OPTIONS,
  CW_VINTAGE_OPTIONS,
  type CWBlindTastingWine,
  type CWGrape,
  type CWVineyard,
  type CWVintage,
} from "../../data/crowley-blind-tasting";
import "./CrowleyGames.css";
import { SEOHead, winerySubPageSEO } from "../../lib/seo";

/* ── Helpers ── */

const CLUE_LABELS = ["Sensory Snapshot", "Structure", "Terroir", "Vineyard Hint", "Final Tell"];
const BASE_SCORES = [100, 85, 70, 55, 40];

function pickWine(difficulty: number, exclude: string[]): CWBlindTastingWine {
  const pool = CW_WINES.filter((w) => w.difficulty === difficulty && !exclude.includes(w.id));
  if (pool.length === 0) {
    const fallback = CW_WINES.filter((w) => !exclude.includes(w.id));
    return fallback[Math.floor(Math.random() * fallback.length)] ?? CW_WINES[0];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function dailyWine(): CWBlindTastingWine {
  const dateStr = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (const ch of dateStr) hash = ((hash << 5) - hash + ch.charCodeAt(0)) | 0;
  return CW_WINES[Math.abs(hash) % CW_WINES.length];
}

function computeScore(
  wine: CWBlindTastingWine,
  cluesRevealed: number,
  guessGrape: CWGrape | null,
  guessVineyard: CWVineyard | null,
  guessVintage: CWVintage | null
) {
  const base = BASE_SCORES[Math.min(cluesRevealed - 1, 4)];
  const grapeBonus = guessGrape === wine.grape ? 10 : 0;
  const vineyardBonus = guessVineyard === wine.vineyard ? 15 : 0;
  const vintageBonus = guessVintage === wine.vintage ? 10 : 0;
  const total = Math.max(0, base + grapeBonus + vineyardBonus + vintageBonus);
  return { base, grapeBonus, vineyardBonus, vintageBonus, total };
}

type Phase = "home" | "playing" | "result";

/* ── Page Component ── */

export function CrowleyBlindTasting() {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get("embed") === "1";

  useEffect(() => {
    const prev = document.title;
    document.title = "Blind Tasting \u2014 Crowley Wines";
    return () => { document.title = prev; };
  }, []);

  const [phase, setPhase] = useState<Phase>("home");
  const [mode, setMode] = useState<"free" | "daily">("free");
  const [difficulty, setDifficulty] = useState(2);
  const [wine, setWine] = useState<CWBlindTastingWine | null>(null);
  const [cluesRevealed, setCluesRevealed] = useState(1);
  const [guessGrape, setGuessGrape] = useState<CWGrape | null>(null);
  const [guessVineyard, setGuessVineyard] = useState<CWVineyard | null>(null);
  const [guessVintage, setGuessVintage] = useState<CWVintage | null>(null);
  const [score, setScore] = useState<ReturnType<typeof computeScore> | null>(null);
  const [played, setPlayed] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const startGame = useCallback(
    (m: "free" | "daily") => {
      setMode(m);
      const w = m === "daily" ? dailyWine() : pickWine(difficulty, played);
      setWine(w);
      setCluesRevealed(1);
      setGuessGrape(null);
      setGuessVineyard(null);
      setGuessVintage(null);
      setScore(null);
      setCopied(false);
      setPhase("playing");
    },
    [difficulty, played]
  );

  const revealClue = useCallback(() => {
    setCluesRevealed((n) => Math.min(n + 1, 5));
  }, []);

  const submitGuess = useCallback(() => {
    if (!wine) return;
    const s = computeScore(wine, cluesRevealed, guessGrape, guessVineyard, guessVintage);
    setScore(s);
    setPlayed((p) => [...p, wine.id]);
    setPhase("result");
  }, [wine, cluesRevealed, guessGrape, guessVineyard, guessVintage]);

  const shareScore = useCallback(() => {
    if (!wine || !score) return;
    const clueViz = Array.from({ length: 5 }, (_, i) => (i < cluesRevealed ? "\u{1F7E2}" : "\u26AA")).join("");
    const text = [
      "Crowley Wines Blind Tasting",
      `Score: ${score.total}/135`,
      `${clueViz} (${cluesRevealed} clue${cluesRevealed > 1 ? "s" : ""})`,
      `Grape ${guessGrape === wine.grape ? "\u2713" : "\u2717"} | Vineyard ${guessVineyard === wine.vineyard ? "\u2713" : "\u2717"} | Vintage ${guessVintage === wine.vintage ? "\u2713" : "\u2717"}`,
      "crushpad.ai/crowley/blind-tasting",
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [wine, score, cluesRevealed, guessGrape, guessVineyard, guessVintage]);

  const reset = useCallback(() => {
    setPhase("home");
    setWine(null);
    setScore(null);
  }, []);

  const maxPossible = useMemo(() => (wine ? BASE_SCORES[Math.min(cluesRevealed - 1, 4)] + 35 : 135), [wine, cluesRevealed]);

  return (
    <div className="cw-bt">
      <SEOHead {...winerySubPageSEO("Crowley Wines", "crowley", "blind-tasting")} />
      {/* ── Home ── */}
      {phase === "home" && (
        <div className="cw-bt-home">
          <p className="cw-bt-badge">CROWLEY WINES &middot; Wine Agent</p>
          <h1 className="cw-bt-title">Blind Tasting</h1>
          <p className="cw-bt-subtitle">Crowley Edition</p>

          <div className="cw-bt-modes">
            <button
              className={`cw-bt-mode-btn ${mode === "free" ? "cw-bt-mode-btn--active" : ""}`}
              onClick={() => setMode("free")}
            >
              Free Play
            </button>
            <button
              className={`cw-bt-mode-btn ${mode === "daily" ? "cw-bt-mode-btn--active" : ""}`}
              onClick={() => setMode("daily")}
            >
              Daily Challenge
            </button>
          </div>

          {mode === "free" && (
            <div className="cw-bt-diff-row">
              {(
                [
                  [1, "Easy"],
                  [2, "Medium"],
                  [3, "Hard"],
                  [4, "Expert"],
                ] as [number, string][]
              ).map(([d, label]) => (
                <button
                  key={d}
                  className={`cw-bt-diff-btn ${difficulty === d ? "cw-bt-diff-btn--active" : ""}`}
                  onClick={() => setDifficulty(d)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          <button className="cw-bt-start-btn" onClick={() => startGame(mode)}>
            Start Tasting
          </button>

          <div className="cw-bt-howto">
            <p>
              <strong>How it works:</strong> You'll get a mystery Crowley wine with up to 5 progressive clues.
              Guess the grape, vineyard, and vintage at any time — the fewer clues you need, the higher your score.
            </p>
            <p>
              <strong>Scoring:</strong> 100 pts with 1 clue, down to 40 pts with all 5.
              Bonus points for correct grape (+10), vineyard (+15), and vintage (+10). Max score: 135.
            </p>
          </div>
        </div>
      )}

      {/* ── Game Board ── */}
      {phase === "playing" && wine && (
        <div className="cw-bt-board">
          <div className="cw-bt-header">
            <span className="cw-bt-round-label">
              {mode === "daily" ? "Daily Challenge" : `Clue ${cluesRevealed} of 5`}
            </span>
            <div className="cw-bt-score-display">
              <span className="cw-bt-score-num">{BASE_SCORES[Math.min(cluesRevealed - 1, 4)]}</span>
              <span>+ {35} max bonus</span>
            </div>
          </div>

          <div className="cw-bt-progress">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`cw-bt-dot ${i < cluesRevealed ? "cw-bt-dot--filled" : ""} ${i === cluesRevealed - 1 ? "cw-bt-dot--current" : ""}`}
              />
            ))}
          </div>

          <div className="cw-bt-clues">
            {wine.clues.slice(0, cluesRevealed).map((clue, i) => (
              <div key={i} className="cw-bt-clue">
                <div className="cw-bt-clue-label">{CLUE_LABELS[i]}</div>
                <p className="cw-bt-clue-text">{clue}</p>
              </div>
            ))}
          </div>

          <div className="cw-bt-guess-panel">
            <div className="cw-bt-guess-section">
              <div className="cw-bt-guess-label">Grape</div>
              <div className="cw-bt-chips">
                {CW_GRAPE_OPTIONS.map((g) => (
                  <button
                    key={g}
                    className={`cw-bt-chip ${guessGrape === g ? "cw-bt-chip--selected" : ""}`}
                    onClick={() => setGuessGrape(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="cw-bt-guess-section">
              <div className="cw-bt-guess-label">Vineyard</div>
              <div className="cw-bt-chips">
                {CW_VINEYARD_OPTIONS.map((v) => (
                  <button
                    key={v}
                    className={`cw-bt-chip ${guessVineyard === v ? "cw-bt-chip--selected" : ""}`}
                    onClick={() => setGuessVineyard(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="cw-bt-guess-section">
              <div className="cw-bt-guess-label">Vintage</div>
              <div className="cw-bt-chips">
                {CW_VINTAGE_OPTIONS.map((v) => (
                  <button
                    key={v}
                    className={`cw-bt-chip ${guessVintage === v ? "cw-bt-chip--selected" : ""}`}
                    onClick={() => setGuessVintage(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="cw-bt-actions">
              <button
                className="cw-bt-reveal-btn"
                onClick={revealClue}
                disabled={cluesRevealed >= 5}
              >
                {cluesRevealed >= 5 ? "All clues revealed" : `Reveal clue ${cluesRevealed + 1}`}
              </button>
              <button
                className="cw-bt-submit-btn"
                onClick={submitGuess}
                disabled={!guessGrape || !guessVineyard || !guessVintage}
              >
                Submit Guess
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Result ── */}
      {phase === "result" && wine && score && (
        <div className="cw-bt-result">
          <div className="cw-bt-result-card">
            <p className="cw-bt-round-label" style={{ marginBottom: 16 }}>The answer</p>
            <h2 className="cw-bt-result-answer">{wine.name}</h2>
            <p className="cw-bt-result-sub">{wine.grape} &middot; {wine.vineyard} &middot; {wine.vintage}</p>

            <div className="cw-bt-result-score">{score.total}</div>
            <p className="cw-bt-result-max">out of {maxPossible} possible</p>

            <div className="cw-bt-result-breakdown">
              <span className={`cw-bt-bonus ${guessGrape === wine.grape ? "cw-bt-bonus--correct" : "cw-bt-bonus--wrong"}`}>
                Grape {guessGrape === wine.grape ? "\u2713" : "\u2717"} {guessGrape === wine.grape ? "+10" : ""}
              </span>
              <span className={`cw-bt-bonus ${guessVineyard === wine.vineyard ? "cw-bt-bonus--correct" : "cw-bt-bonus--wrong"}`}>
                Vineyard {guessVineyard === wine.vineyard ? "\u2713" : "\u2717"} {guessVineyard === wine.vineyard ? "+15" : ""}
              </span>
              <span className={`cw-bt-bonus ${guessVintage === wine.vintage ? "cw-bt-bonus--correct" : "cw-bt-bonus--wrong"}`}>
                Vintage {guessVintage === wine.vintage ? "\u2713" : "\u2717"} {guessVintage === wine.vintage ? "+10" : ""}
              </span>
            </div>
          </div>

          <div className="cw-bt-result-explain">
            <h3>About this wine</h3>
            <p>{wine.explanation}</p>
          </div>

          <div className="cw-bt-result-actions">
            <button className="cw-bt-share-btn" onClick={shareScore}>
              {copied ? "Copied!" : "Share Score"}
            </button>
            <button className="cw-bt-play-again-btn" onClick={reset}>
              Play Again
            </button>
          </div>
        </div>
      )}

      {!isEmbed && (
        <footer className="cw-bt-footer">
          <Link to="/crowley/demo" style={{ color: "inherit", textDecoration: "none" }}>
            &larr; Back to Crowley
          </Link>
        </footer>
      )}
    </div>
  );
}
