import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  PZ_WINES,
  PZ_GRAPE_OPTIONS,
  PZ_VINEYARD_OPTIONS,
  PZ_VINTAGE_OPTIONS,
  type PZBlindTastingWine,
  type PZGrape,
  type PZVineyard,
  type PZVintage,
} from "../../data/ponzi-blind-tasting";
import "./PonziGames.css";
import { SEOHead, winerySubPageSEO } from "../../lib/seo";

/* -- Helpers -- */

const CLUE_LABELS = ["Sensory Snapshot", "Structure", "Terroir", "Vineyard Hint", "Final Tell"];
const BASE_SCORES = [100, 85, 70, 55, 40];

function pickWine(difficulty: number, exclude: string[]): PZBlindTastingWine {
  const pool = PZ_WINES.filter((w) => w.difficulty === difficulty && !exclude.includes(w.id));
  if (pool.length === 0) {
    const fallback = PZ_WINES.filter((w) => !exclude.includes(w.id));
    return fallback[Math.floor(Math.random() * fallback.length)] ?? PZ_WINES[0];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function dailyWine(): PZBlindTastingWine {
  const dateStr = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (const ch of dateStr) hash = ((hash << 5) - hash + ch.charCodeAt(0)) | 0;
  return PZ_WINES[Math.abs(hash) % PZ_WINES.length];
}

function computeScore(
  wine: PZBlindTastingWine,
  cluesRevealed: number,
  guessGrape: PZGrape | null,
  guessVineyard: PZVineyard | null,
  guessVintage: PZVintage | null
) {
  const base = BASE_SCORES[Math.min(cluesRevealed - 1, 4)];
  const grapeBonus = guessGrape === wine.grape ? 10 : 0;
  const vineyardBonus = guessVineyard === wine.vineyard ? 15 : 0;
  const vintageBonus = guessVintage === wine.vintage ? 10 : 0;
  const total = Math.max(0, base + grapeBonus + vineyardBonus + vintageBonus);
  return { base, grapeBonus, vineyardBonus, vintageBonus, total };
}

type Phase = "home" | "playing" | "result";

/* -- Page Component -- */

export function PonziBlindTasting() {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get("embed") === "1";

  useEffect(() => {
    const prev = document.title;
    document.title = "Blind Tasting \u2014 Ponzi Vineyards";
    return () => { document.title = prev; };
  }, []);

  const [phase, setPhase] = useState<Phase>("home");
  const [mode, setMode] = useState<"free" | "daily">("free");
  const [difficulty, setDifficulty] = useState(2);
  const [wine, setWine] = useState<PZBlindTastingWine | null>(null);
  const [cluesRevealed, setCluesRevealed] = useState(1);
  const [guessGrape, setGuessGrape] = useState<PZGrape | null>(null);
  const [guessVineyard, setGuessVineyard] = useState<PZVineyard | null>(null);
  const [guessVintage, setGuessVintage] = useState<PZVintage | null>(null);
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
      "Ponzi Vineyards Blind Tasting",
      `Score: ${score.total}/135`,
      `${clueViz} (${cluesRevealed} clue${cluesRevealed > 1 ? "s" : ""})`,
      `Grape ${guessGrape === wine.grape ? "\u2713" : "\u2717"} | Vineyard ${guessVineyard === wine.vineyard ? "\u2713" : "\u2717"} | Vintage ${guessVintage === wine.vintage ? "\u2713" : "\u2717"}`,
      "crushpad.ai/ponzi/blind-tasting",
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
    <div className="pz-bt">
      <SEOHead {...winerySubPageSEO("Ponzi Vineyards", "ponzi", "blind-tasting")} />
      {/* -- Home -- */}
      {phase === "home" && (
        <div className="pz-bt-home">
          <p className="pz-bt-badge">PONZI VINEYARDS &middot; Wine Agent</p>
          <h1 className="pz-bt-title">Blind Tasting</h1>
          <p className="pz-bt-subtitle">Ponzi Edition</p>

          <div className="pz-bt-modes">
            <button
              className={`pz-bt-mode-btn ${mode === "free" ? "pz-bt-mode-btn--active" : ""}`}
              onClick={() => setMode("free")}
            >
              Free Play
            </button>
            <button
              className={`pz-bt-mode-btn ${mode === "daily" ? "pz-bt-mode-btn--active" : ""}`}
              onClick={() => setMode("daily")}
            >
              Daily Challenge
            </button>
          </div>

          {mode === "free" && (
            <div className="pz-bt-diff-row">
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
                  className={`pz-bt-diff-btn ${difficulty === d ? "pz-bt-diff-btn--active" : ""}`}
                  onClick={() => setDifficulty(d)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          <button className="pz-bt-start-btn" onClick={() => startGame(mode)}>
            Start Tasting
          </button>

          <div className="pz-bt-howto">
            <p>
              <strong>How it works:</strong> You'll get a mystery Ponzi wine with up to 5 progressive clues.
              Guess the grape, vineyard, and vintage at any time &mdash; the fewer clues you need, the higher your score.
            </p>
            <p>
              <strong>Scoring:</strong> 100 pts with 1 clue, down to 40 pts with all 5.
              Bonus points for correct grape (+10), vineyard (+15), and vintage (+10). Max score: 135.
            </p>
          </div>
        </div>
      )}

      {/* -- Game Board -- */}
      {phase === "playing" && wine && (
        <div className="pz-bt-board">
          <div className="pz-bt-header">
            <span className="pz-bt-round-label">
              {mode === "daily" ? "Daily Challenge" : `Clue ${cluesRevealed} of 5`}
            </span>
            <div className="pz-bt-score-display">
              <span className="pz-bt-score-num">{BASE_SCORES[Math.min(cluesRevealed - 1, 4)]}</span>
              <span>+ {35} max bonus</span>
            </div>
          </div>

          <div className="pz-bt-progress">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`pz-bt-dot ${i < cluesRevealed ? "pz-bt-dot--filled" : ""} ${i === cluesRevealed - 1 ? "pz-bt-dot--current" : ""}`}
              />
            ))}
          </div>

          <div className="pz-bt-clues">
            {wine.clues.slice(0, cluesRevealed).map((clue, i) => (
              <div key={i} className="pz-bt-clue">
                <div className="pz-bt-clue-label">{CLUE_LABELS[i]}</div>
                <p className="pz-bt-clue-text">{clue}</p>
              </div>
            ))}
          </div>

          <div className="pz-bt-guess-panel">
            <div className="pz-bt-guess-section">
              <div className="pz-bt-guess-label">Grape</div>
              <div className="pz-bt-chips">
                {PZ_GRAPE_OPTIONS.map((g) => (
                  <button
                    key={g}
                    className={`pz-bt-chip ${guessGrape === g ? "pz-bt-chip--selected" : ""}`}
                    onClick={() => setGuessGrape(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="pz-bt-guess-section">
              <div className="pz-bt-guess-label">Vineyard</div>
              <div className="pz-bt-chips">
                {PZ_VINEYARD_OPTIONS.map((v) => (
                  <button
                    key={v}
                    className={`pz-bt-chip ${guessVineyard === v ? "pz-bt-chip--selected" : ""}`}
                    onClick={() => setGuessVineyard(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="pz-bt-guess-section">
              <div className="pz-bt-guess-label">Vintage</div>
              <div className="pz-bt-chips">
                {PZ_VINTAGE_OPTIONS.map((v) => (
                  <button
                    key={v}
                    className={`pz-bt-chip ${guessVintage === v ? "pz-bt-chip--selected" : ""}`}
                    onClick={() => setGuessVintage(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="pz-bt-actions">
              <button
                className="pz-bt-reveal-btn"
                onClick={revealClue}
                disabled={cluesRevealed >= 5}
              >
                {cluesRevealed >= 5 ? "All clues revealed" : `Reveal clue ${cluesRevealed + 1}`}
              </button>
              <button
                className="pz-bt-submit-btn"
                onClick={submitGuess}
                disabled={!guessGrape || !guessVineyard || !guessVintage}
              >
                Submit Guess
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -- Result -- */}
      {phase === "result" && wine && score && (
        <div className="pz-bt-result">
          <div className="pz-bt-result-card">
            <p className="pz-bt-round-label" style={{ marginBottom: 16 }}>The answer</p>
            <h2 className="pz-bt-result-answer">{wine.name}</h2>
            <p className="pz-bt-result-sub">{wine.grape} &middot; {wine.vineyard} &middot; {wine.vintage}</p>

            <div className="pz-bt-result-score">{score.total}</div>
            <p className="pz-bt-result-max">out of {maxPossible} possible</p>

            <div className="pz-bt-result-breakdown">
              <span className={`pz-bt-bonus ${guessGrape === wine.grape ? "pz-bt-bonus--correct" : "pz-bt-bonus--wrong"}`}>
                Grape {guessGrape === wine.grape ? "\u2713" : "\u2717"} {guessGrape === wine.grape ? "+10" : ""}
              </span>
              <span className={`pz-bt-bonus ${guessVineyard === wine.vineyard ? "pz-bt-bonus--correct" : "pz-bt-bonus--wrong"}`}>
                Vineyard {guessVineyard === wine.vineyard ? "\u2713" : "\u2717"} {guessVineyard === wine.vineyard ? "+15" : ""}
              </span>
              <span className={`pz-bt-bonus ${guessVintage === wine.vintage ? "pz-bt-bonus--correct" : "pz-bt-bonus--wrong"}`}>
                Vintage {guessVintage === wine.vintage ? "\u2713" : "\u2717"} {guessVintage === wine.vintage ? "+10" : ""}
              </span>
            </div>
          </div>

          <div className="pz-bt-result-explain">
            <h3>About this wine</h3>
            <p>{wine.explanation}</p>
          </div>

          <div className="pz-bt-result-actions">
            <button className="pz-bt-share-btn" onClick={shareScore}>
              {copied ? "Copied!" : "Share Score"}
            </button>
            <button className="pz-bt-play-again-btn" onClick={reset}>
              Play Again
            </button>
          </div>
        </div>
      )}

      {!isEmbed && (
        <footer className="pz-bt-footer">
          <Link to="/ponzi/demo" style={{ color: "inherit", textDecoration: "none" }}>
            &larr; Back to Ponzi
          </Link>
        </footer>
      )}
    </div>
  );
}
