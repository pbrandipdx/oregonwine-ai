import { useCallback, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  RH_WINES,
  RH_GRAPE_OPTIONS,
  RH_VINEYARD_OPTIONS,
  RH_VINTAGE_OPTIONS,
  type RHBlindTastingWine,
  type RHGrape,
  type RHVineyard,
  type RHVintage,
} from "../../data/rex-hill-blind-tasting";
import "./RexHillGames.css";
import { SEOHead, winerySubPageSEO } from "../../lib/seo";

/* ── Helpers ── */

const CLUE_LABELS = ["Sensory Snapshot", "Structure", "Terroir", "Vineyard Hint", "Final Tell"];
const BASE_SCORES = [100, 85, 70, 55, 40];

function pickWine(difficulty: number, exclude: string[]): RHBlindTastingWine {
  const pool = RH_WINES.filter((w) => w.difficulty === difficulty && !exclude.includes(w.id));
  if (pool.length === 0) {
    const fallback = RH_WINES.filter((w) => !exclude.includes(w.id));
    return fallback[Math.floor(Math.random() * fallback.length)] ?? RH_WINES[0];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function dailyWine(): RHBlindTastingWine {
  const dateStr = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (const ch of dateStr) hash = ((hash << 5) - hash + ch.charCodeAt(0)) | 0;
  return RH_WINES[Math.abs(hash) % RH_WINES.length];
}

function computeScore(
  wine: RHBlindTastingWine,
  cluesRevealed: number,
  guessGrape: RHGrape | null,
  guessVineyard: RHVineyard | null,
  guessVintage: RHVintage | null
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

export function RexHillBlindTasting() {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get("embed") === "1";

  const [phase, setPhase] = useState<Phase>("home");
  const [mode, setMode] = useState<"free" | "daily">("free");
  const [difficulty, setDifficulty] = useState(2);
  const [wine, setWine] = useState<RHBlindTastingWine | null>(null);
  const [cluesRevealed, setCluesRevealed] = useState(1);
  const [guessGrape, setGuessGrape] = useState<RHGrape | null>(null);
  const [guessVineyard, setGuessVineyard] = useState<RHVineyard | null>(null);
  const [guessVintage, setGuessVintage] = useState<RHVintage | null>(null);
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
      "Rex Hill Blind Tasting",
      `Score: ${score.total}/135`,
      `${clueViz} (${cluesRevealed} clue${cluesRevealed > 1 ? "s" : ""})`,
      `Grape ${guessGrape === wine.grape ? "\u2713" : "\u2717"} | Vineyard ${guessVineyard === wine.vineyard ? "\u2713" : "\u2717"} | Vintage ${guessVintage === wine.vintage ? "\u2713" : "\u2717"}`,
      "crushpad.ai/rex-hill/blind-tasting",
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
    <div className="rh-bt">
      <SEOHead {...winerySubPageSEO("REX HILL", "rex-hill", "blind-tasting")} />
      {/* ── Home ── */}
      {phase === "home" && (
        <div className="rh-bt-home">
          <p className="rh-bt-badge">REX HILL &middot; Wine Agent</p>
          <h1 className="rh-bt-title">Blind Tasting</h1>
          <p className="rh-bt-subtitle">Rex Hill Edition</p>

          <div className="rh-bt-modes">
            <button
              className={`rh-bt-mode-btn ${mode === "free" ? "rh-bt-mode-btn--active" : ""}`}
              onClick={() => setMode("free")}
            >
              Free Play
            </button>
            <button
              className={`rh-bt-mode-btn ${mode === "daily" ? "rh-bt-mode-btn--active" : ""}`}
              onClick={() => setMode("daily")}
            >
              Daily Challenge
            </button>
          </div>

          {mode === "free" && (
            <div className="rh-bt-diff-row">
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
                  className={`rh-bt-diff-btn ${difficulty === d ? "rh-bt-diff-btn--active" : ""}`}
                  onClick={() => setDifficulty(d)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          <button className="rh-bt-start-btn" onClick={() => startGame(mode)}>
            Start Tasting
          </button>

          <div className="rh-bt-howto">
            <p>
              <strong>How it works:</strong> You'll get a mystery Rex Hill wine with up to 5 progressive clues.
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
        <div className="rh-bt-board">
          <div className="rh-bt-header">
            <span className="rh-bt-round-label">
              {mode === "daily" ? "Daily Challenge" : `Clue ${cluesRevealed} of 5`}
            </span>
            <div className="rh-bt-score-display">
              <span className="rh-bt-score-num">{BASE_SCORES[Math.min(cluesRevealed - 1, 4)]}</span>
              <span>+ {35} max bonus</span>
            </div>
          </div>

          <div className="rh-bt-progress">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`rh-bt-dot ${i < cluesRevealed ? "rh-bt-dot--filled" : ""} ${i === cluesRevealed - 1 ? "rh-bt-dot--current" : ""}`}
              />
            ))}
          </div>

          <div className="rh-bt-clues">
            {wine.clues.slice(0, cluesRevealed).map((clue, i) => (
              <div key={i} className="rh-bt-clue">
                <div className="rh-bt-clue-label">{CLUE_LABELS[i]}</div>
                <p className="rh-bt-clue-text">{clue}</p>
              </div>
            ))}
          </div>

          <div className="rh-bt-guess-panel">
            <div className="rh-bt-guess-section">
              <div className="rh-bt-guess-label">Grape</div>
              <div className="rh-bt-chips">
                {RH_GRAPE_OPTIONS.map((g) => (
                  <button
                    key={g}
                    className={`rh-bt-chip ${guessGrape === g ? "rh-bt-chip--selected" : ""}`}
                    onClick={() => setGuessGrape(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="rh-bt-guess-section">
              <div className="rh-bt-guess-label">Vineyard</div>
              <div className="rh-bt-chips">
                {RH_VINEYARD_OPTIONS.map((v) => (
                  <button
                    key={v}
                    className={`rh-bt-chip ${guessVineyard === v ? "rh-bt-chip--selected" : ""}`}
                    onClick={() => setGuessVineyard(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="rh-bt-guess-section">
              <div className="rh-bt-guess-label">Vintage</div>
              <div className="rh-bt-chips">
                {RH_VINTAGE_OPTIONS.map((v) => (
                  <button
                    key={v}
                    className={`rh-bt-chip ${guessVintage === v ? "rh-bt-chip--selected" : ""}`}
                    onClick={() => setGuessVintage(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="rh-bt-actions">
              <button
                className="rh-bt-reveal-btn"
                onClick={revealClue}
                disabled={cluesRevealed >= 5}
              >
                {cluesRevealed >= 5 ? "All clues revealed" : `Reveal clue ${cluesRevealed + 1}`}
              </button>
              <button
                className="rh-bt-submit-btn"
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
        <div className="rh-bt-result">
          <div className="rh-bt-result-card">
            <p className="rh-bt-round-label" style={{ marginBottom: 16 }}>The answer</p>
            <h2 className="rh-bt-result-answer">{wine.name}</h2>
            <p className="rh-bt-result-sub">{wine.grape} &middot; {wine.vineyard} &middot; {wine.vintage}</p>

            <div className="rh-bt-result-score">{score.total}</div>
            <p className="rh-bt-result-max">out of {maxPossible} possible</p>

            <div className="rh-bt-result-breakdown">
              <span className={`rh-bt-bonus ${guessGrape === wine.grape ? "rh-bt-bonus--correct" : "rh-bt-bonus--wrong"}`}>
                Grape {guessGrape === wine.grape ? "\u2713" : "\u2717"} {guessGrape === wine.grape ? "+10" : ""}
              </span>
              <span className={`rh-bt-bonus ${guessVineyard === wine.vineyard ? "rh-bt-bonus--correct" : "rh-bt-bonus--wrong"}`}>
                Vineyard {guessVineyard === wine.vineyard ? "\u2713" : "\u2717"} {guessVineyard === wine.vineyard ? "+15" : ""}
              </span>
              <span className={`rh-bt-bonus ${guessVintage === wine.vintage ? "rh-bt-bonus--correct" : "rh-bt-bonus--wrong"}`}>
                Vintage {guessVintage === wine.vintage ? "\u2713" : "\u2717"} {guessVintage === wine.vintage ? "+10" : ""}
              </span>
            </div>
          </div>

          <div className="rh-bt-result-explain">
            <h3>About this wine</h3>
            <p>{wine.explanation}</p>
          </div>

          <div className="rh-bt-result-actions">
            <button className="rh-bt-share-btn" onClick={shareScore}>
              {copied ? "Copied!" : "Share Score"}
            </button>
            <button className="rh-bt-play-again-btn" onClick={reset}>
              Play Again
            </button>
          </div>
        </div>
      )}

      {!isEmbed && (
        <footer className="rh-bt-footer">
          <Link to="/rex-hill/demo" style={{ color: "inherit", textDecoration: "none" }}>
            &larr; Back to Rex Hill
          </Link>
        </footer>
      )}
    </div>
  );
}
