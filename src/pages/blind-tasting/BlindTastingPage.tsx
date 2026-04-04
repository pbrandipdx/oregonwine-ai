import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  WINES,
  GRAPE_OPTIONS,
  AVA_OPTIONS,
  STYLE_OPTIONS,
  type BlindTastingWine,
  type Grape,
  type AVA,
  type Style,
} from "../../data/blind-tasting-wines";
import "./BlindTastingPage.css";

/* ── Helpers ── */

const CLUE_LABELS = ["Sensory Snapshot", "Structure", "Terroir", "AVA Hint", "Final Tell"];
const BASE_SCORES = [100, 85, 70, 55, 40];

function pickWine(difficulty: number, exclude: string[]): BlindTastingWine {
  const pool = WINES.filter((w) => w.difficulty === difficulty && !exclude.includes(w.id));
  if (pool.length === 0) {
    const fallback = WINES.filter((w) => !exclude.includes(w.id));
    return fallback[Math.floor(Math.random() * fallback.length)] ?? WINES[0];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function dailyWine(): BlindTastingWine {
  const dateStr = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (const ch of dateStr) hash = ((hash << 5) - hash + ch.charCodeAt(0)) | 0;
  return WINES[Math.abs(hash) % WINES.length];
}

function computeScore(
  wine: BlindTastingWine,
  cluesRevealed: number,
  guessGrape: Grape | null,
  guessAva: AVA | null,
  guessStyle: Style | null
) {
  const base = BASE_SCORES[Math.min(cluesRevealed - 1, 4)];
  const grapeBonus = guessGrape === wine.grape ? 10 : 0;
  const avaBonus = guessAva === wine.ava ? 15 : 0;
  const styleBonus = guessStyle === wine.style ? 10 : 0;
  const total = Math.max(0, base + grapeBonus + avaBonus + styleBonus);
  return { base, grapeBonus, avaBonus, styleBonus, total };
}

type Phase = "home" | "playing" | "result";

/* ── Page Component ── */

export function BlindTastingPage() {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get("embed") === "1";

  useEffect(() => {
    const prev = document.title;
    document.title = "Blind Tasting — Crushpad.ai";
    return () => { document.title = prev; };
  }, []);

  const [phase, setPhase] = useState<Phase>("home");
  const [mode, setMode] = useState<"free" | "daily">("free");
  const [difficulty, setDifficulty] = useState(2);
  const [wine, setWine] = useState<BlindTastingWine | null>(null);
  const [cluesRevealed, setCluesRevealed] = useState(1);
  const [guessGrape, setGuessGrape] = useState<Grape | null>(null);
  const [guessAva, setGuessAva] = useState<AVA | null>(null);
  const [guessStyle, setGuessStyle] = useState<Style | null>(null);
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
      setGuessAva(null);
      setGuessStyle(null);
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
    const s = computeScore(wine, cluesRevealed, guessGrape, guessAva, guessStyle);
    setScore(s);
    setPlayed((p) => [...p, wine.id]);
    setPhase("result");
  }, [wine, cluesRevealed, guessGrape, guessAva, guessStyle]);

  const shareScore = useCallback(() => {
    if (!wine || !score) return;
    const clueViz = Array.from({ length: 5 }, (_, i) => (i < cluesRevealed ? "\u{1F7E2}" : "\u26AA")).join("");
    const text = [
      "Crushpad Blind Tasting",
      `Score: ${score.total}/135`,
      `${clueViz} (${cluesRevealed} clue${cluesRevealed > 1 ? "s" : ""})`,
      `Grape ${guessGrape === wine.grape ? "\u2713" : "\u2717"} | AVA ${guessAva === wine.ava ? "\u2713" : "\u2717"} | Style ${guessStyle === wine.style ? "\u2713" : "\u2717"}`,
      "crushpad.ai/blind-tasting",
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [wine, score, cluesRevealed, guessGrape, guessAva, guessStyle]);

  const reset = useCallback(() => {
    setPhase("home");
    setWine(null);
    setScore(null);
  }, []);

  const maxPossible = useMemo(() => (wine ? BASE_SCORES[Math.min(cluesRevealed - 1, 4)] + 35 : 135), [wine, cluesRevealed]);

  return (
    <div className="bt">
      {/* ── Home ── */}
      {phase === "home" && (
        <div className="bt-home">
          <p className="bt-badge">Crushpad.ai &middot; Wine Agent</p>
          <h1 className="bt-title">Blind Tasting</h1>
          <p className="bt-subtitle">Willamette Valley Edition</p>

          <div className="bt-modes">
            <button
              className={`bt-mode-btn ${mode === "free" ? "bt-mode-btn--active" : ""}`}
              onClick={() => setMode("free")}
            >
              Free Play
            </button>
            <button
              className={`bt-mode-btn ${mode === "daily" ? "bt-mode-btn--active" : ""}`}
              onClick={() => setMode("daily")}
            >
              Daily Challenge
            </button>
          </div>

          {mode === "free" && (
            <div className="bt-diff-row">
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
                  className={`bt-diff-btn ${difficulty === d ? "bt-diff-btn--active" : ""}`}
                  onClick={() => setDifficulty(d)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          <button className="bt-start-btn" onClick={() => startGame(mode)}>
            Start Tasting
          </button>

          <div className="bt-howto">
            <p>
              <strong>How it works:</strong> You'll get a mystery wine with up to 5 progressive clues.
              Guess the grape, AVA, and style at any time — the fewer clues you need, the higher your score.
            </p>
            <p>
              <strong>Scoring:</strong> 100 pts with 1 clue, down to 40 pts with all 5.
              Bonus points for correct grape (+10), AVA (+15), and style (+10). Max score: 135.
            </p>
          </div>
        </div>
      )}

      {/* ── Game Board ── */}
      {phase === "playing" && wine && (
        <div className="bt-board">
          <div className="bt-header">
            <span className="bt-round-label">
              {mode === "daily" ? "Daily Challenge" : `Clue ${cluesRevealed} of 5`}
            </span>
            <div className="bt-score-display">
              <span className="bt-score-num">{BASE_SCORES[Math.min(cluesRevealed - 1, 4)]}</span>
              <span>+ {35} max bonus</span>
            </div>
          </div>

          <div className="bt-progress">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`bt-dot ${i < cluesRevealed ? "bt-dot--filled" : ""} ${i === cluesRevealed - 1 ? "bt-dot--current" : ""}`}
              />
            ))}
          </div>

          <div className="bt-clues">
            {wine.clues.slice(0, cluesRevealed).map((clue, i) => (
              <div key={i} className="bt-clue">
                <div className="bt-clue-label">{CLUE_LABELS[i]}</div>
                <p className="bt-clue-text">{clue}</p>
              </div>
            ))}
          </div>

          <div className="bt-guess-panel">
            <div className="bt-guess-section">
              <div className="bt-guess-label">Grape</div>
              <div className="bt-chips">
                {GRAPE_OPTIONS.map((g) => (
                  <button
                    key={g}
                    className={`bt-chip ${guessGrape === g ? "bt-chip--selected" : ""}`}
                    onClick={() => setGuessGrape(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="bt-guess-section">
              <div className="bt-guess-label">AVA</div>
              <div className="bt-chips">
                {AVA_OPTIONS.map((a) => (
                  <button
                    key={a}
                    className={`bt-chip ${guessAva === a ? "bt-chip--selected" : ""}`}
                    onClick={() => setGuessAva(a)}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="bt-guess-section">
              <div className="bt-guess-label">Style</div>
              <div className="bt-chips">
                {STYLE_OPTIONS.map((s) => (
                  <button
                    key={s}
                    className={`bt-chip ${guessStyle === s ? "bt-chip--selected" : ""}`}
                    onClick={() => setGuessStyle(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="bt-actions">
              <button
                className="bt-reveal-btn"
                onClick={revealClue}
                disabled={cluesRevealed >= 5}
              >
                {cluesRevealed >= 5 ? "All clues revealed" : `Reveal clue ${cluesRevealed + 1}`}
              </button>
              <button
                className="bt-submit-btn"
                onClick={submitGuess}
                disabled={!guessGrape || !guessAva || !guessStyle}
              >
                Submit Guess
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Result ── */}
      {phase === "result" && wine && score && (
        <div className="bt-result">
          <div className="bt-result-card">
            <p className="bt-round-label" style={{ marginBottom: 16 }}>The answer</p>
            <h2 className="bt-result-answer">{wine.ava} {wine.grape}</h2>
            <p className="bt-result-sub">{wine.aromas.join(" \u00B7 ")}</p>

            <div className="bt-result-score">{score.total}</div>
            <p className="bt-result-max">out of {maxPossible} possible</p>

            <div className="bt-result-breakdown">
              <span className={`bt-bonus ${guessGrape === wine.grape ? "bt-bonus--correct" : "bt-bonus--wrong"}`}>
                Grape {guessGrape === wine.grape ? "\u2713" : "\u2717"} {guessGrape === wine.grape ? "+10" : ""}
              </span>
              <span className={`bt-bonus ${guessAva === wine.ava ? "bt-bonus--correct" : "bt-bonus--wrong"}`}>
                AVA {guessAva === wine.ava ? "\u2713" : "\u2717"} {guessAva === wine.ava ? "+15" : ""}
              </span>
              <span className={`bt-bonus ${guessStyle === wine.style ? "bt-bonus--correct" : "bt-bonus--wrong"}`}>
                Style {guessStyle === wine.style ? "\u2713" : "\u2717"} {guessStyle === wine.style ? "+10" : ""}
              </span>
            </div>
          </div>

          <div className="bt-result-explain">
            <h3>Why this wine?</h3>
            <p>{wine.explanation}</p>
          </div>

          <div className="bt-result-actions">
            <button className="bt-share-btn" onClick={shareScore}>
              {copied ? "Copied!" : "Share Score"}
            </button>
            <button className="bt-play-again-btn" onClick={reset}>
              Play Again
            </button>
          </div>
        </div>
      )}

      {!isEmbed && (
        <footer className="bt-footer">
          <Link to="/chatbot-demo" style={{ color: "inherit", textDecoration: "none" }}>
            &larr; Back to Crushpad.ai
          </Link>
        </footer>
      )}
    </div>
  );
}
