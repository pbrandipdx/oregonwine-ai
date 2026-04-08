import { useCallback, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CH_WINES,
  CH_GRAPE_OPTIONS,
  CH_VINEYARD_OPTIONS,
  CH_VINTAGE_OPTIONS,
  type CHBlindTastingWine,
  type CHGrape,
  type CHVineyard,
  type CHVintage,
} from "../../data/chehalem-blind-tasting";
import "./ChehalemGames.css";
import { SEOHead, winerySubPageSEO } from "../../lib/seo";

const CLUE_LABELS = ["Sensory Snapshot", "Structure", "Terroir", "Vineyard Hint", "Final Tell"];
const BASE_SCORES = [100, 85, 70, 55, 40];

function pickWine(difficulty: number, exclude: string[]): CHBlindTastingWine {
  const pool = CH_WINES.filter((w) => w.difficulty === difficulty && !exclude.includes(w.id));
  if (pool.length === 0) {
    const fallback = CH_WINES.filter((w) => !exclude.includes(w.id));
    return fallback[Math.floor(Math.random() * fallback.length)] ?? CH_WINES[0];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function dailyWine(): CHBlindTastingWine {
  const dateStr = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (const ch of dateStr) hash = ((hash << 5) - hash + ch.charCodeAt(0)) | 0;
  return CH_WINES[Math.abs(hash) % CH_WINES.length];
}

function computeScore(
  wine: CHBlindTastingWine,
  cluesRevealed: number,
  guessGrape: CHGrape | null,
  guessVineyard: CHVineyard | null,
  guessVintage: CHVintage | null
) {
  const base = BASE_SCORES[Math.min(cluesRevealed - 1, 4)];
  const grapeBonus = guessGrape === wine.grape ? 10 : 0;
  const vineyardBonus = guessVineyard === wine.vineyard ? 15 : 0;
  const vintageBonus = guessVintage === wine.vintage ? 10 : 0;
  return { base, grapeBonus, vineyardBonus, vintageBonus, total: Math.max(0, base + grapeBonus + vineyardBonus + vintageBonus) };
}

type Phase = "home" | "playing" | "result";

export function ChehalemBlindTasting() {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get("embed") === "1";

  const [phase, setPhase] = useState<Phase>("home");
  const [mode, setMode] = useState<"free" | "daily">("free");
  const [difficulty, setDifficulty] = useState(2);
  const [wine, setWine] = useState<CHBlindTastingWine | null>(null);
  const [cluesRevealed, setCluesRevealed] = useState(1);
  const [guessGrape, setGuessGrape] = useState<CHGrape | null>(null);
  const [guessVineyard, setGuessVineyard] = useState<CHVineyard | null>(null);
  const [guessVintage, setGuessVintage] = useState<CHVintage | null>(null);
  const [score, setScore] = useState<ReturnType<typeof computeScore> | null>(null);
  const [played, setPlayed] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const startGame = useCallback((m: "free" | "daily") => {
    setMode(m);
    setWine(m === "daily" ? dailyWine() : pickWine(difficulty, played));
    setCluesRevealed(1); setGuessGrape(null); setGuessVineyard(null); setGuessVintage(null);
    setScore(null); setCopied(false); setPhase("playing");
  }, [difficulty, played]);

  const revealClue = useCallback(() => setCluesRevealed((n) => Math.min(n + 1, 5)), []);

  const submitGuess = useCallback(() => {
    if (!wine) return;
    const s = computeScore(wine, cluesRevealed, guessGrape, guessVineyard, guessVintage);
    setScore(s); setPlayed((p) => [...p, wine.id]); setPhase("result");
  }, [wine, cluesRevealed, guessGrape, guessVineyard, guessVintage]);

  const shareScore = useCallback(() => {
    if (!wine || !score) return;
    const clueViz = Array.from({ length: 5 }, (_, i) => (i < cluesRevealed ? "\u{1F7E2}" : "\u26AA")).join("");
    navigator.clipboard.writeText([
      "Chehalem Winery Blind Tasting", `Score: ${score.total}/135`,
      `${clueViz} (${cluesRevealed} clue${cluesRevealed > 1 ? "s" : ""})`,
      `Grape ${guessGrape === wine.grape ? "\u2713" : "\u2717"} | Vineyard ${guessVineyard === wine.vineyard ? "\u2713" : "\u2717"} | Vintage ${guessVintage === wine.vintage ? "\u2713" : "\u2717"}`,
      "crushpad.ai/chehalem/blind-tasting",
    ].join("\n")).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }, [wine, score, cluesRevealed, guessGrape, guessVineyard, guessVintage]);

  const reset = useCallback(() => { setPhase("home"); setWine(null); setScore(null); }, []);
  const maxPossible = useMemo(() => (wine ? BASE_SCORES[Math.min(cluesRevealed - 1, 4)] + 35 : 135), [wine, cluesRevealed]);

  return (
    <div className="ch-bt">
      <SEOHead {...winerySubPageSEO("Chehalem Winery", "chehalem", "blind-tasting")} />
      {phase === "home" && (
        <div className="ch-bt-home">
          <p className="ch-bt-badge">CHEHALEM WINERY &middot; Wine Agent</p>
          <h1 className="ch-bt-title">Blind Tasting</h1>
          <p className="ch-bt-subtitle">Chehalem Edition</p>
          <div className="ch-bt-modes">
            <button className={`ch-bt-mode-btn ${mode === "free" ? "ch-bt-mode-btn--active" : ""}`} onClick={() => setMode("free")}>Free Play</button>
            <button className={`ch-bt-mode-btn ${mode === "daily" ? "ch-bt-mode-btn--active" : ""}`} onClick={() => setMode("daily")}>Daily Challenge</button>
          </div>
          {mode === "free" && (
            <div className="ch-bt-diff-row">
              {([[1, "Easy"], [2, "Medium"], [3, "Hard"], [4, "Expert"]] as [number, string][]).map(([d, label]) => (
                <button key={d} className={`ch-bt-diff-btn ${difficulty === d ? "ch-bt-diff-btn--active" : ""}`} onClick={() => setDifficulty(d)}>{label}</button>
              ))}
            </div>
          )}
          <button className="ch-bt-start-btn" onClick={() => startGame(mode)}>Start Tasting</button>
          <div className="ch-bt-howto">
            <p><strong>How it works:</strong> You'll get a mystery Chehalem wine with up to 5 progressive clues. Guess the grape, vineyard, and vintage &mdash; the fewer clues you need, the higher your score.</p>
            <p><strong>Scoring:</strong> 100 pts with 1 clue, down to 40 pts with all 5. Bonus points for correct grape (+10), vineyard (+15), and vintage (+10). Max score: 135.</p>
          </div>
        </div>
      )}

      {phase === "playing" && wine && (
        <div className="ch-bt-board">
          <div className="ch-bt-header">
            <span className="ch-bt-round-label">{mode === "daily" ? "Daily Challenge" : `Clue ${cluesRevealed} of 5`}</span>
            <div className="ch-bt-score-display"><span className="ch-bt-score-num">{BASE_SCORES[Math.min(cluesRevealed - 1, 4)]}</span><span>+ 35 max bonus</span></div>
          </div>
          <div className="ch-bt-progress">{[0,1,2,3,4].map((i) => <div key={i} className={`ch-bt-dot ${i < cluesRevealed ? "ch-bt-dot--filled" : ""} ${i === cluesRevealed - 1 ? "ch-bt-dot--current" : ""}`} />)}</div>
          <div className="ch-bt-clues">{wine.clues.slice(0, cluesRevealed).map((clue, i) => <div key={i} className="ch-bt-clue"><div className="ch-bt-clue-label">{CLUE_LABELS[i]}</div><p className="ch-bt-clue-text">{clue}</p></div>)}</div>
          <div className="ch-bt-guess-panel">
            <div className="ch-bt-guess-section"><div className="ch-bt-guess-label">Grape</div><div className="ch-bt-chips">{CH_GRAPE_OPTIONS.map((g) => <button key={g} className={`ch-bt-chip ${guessGrape === g ? "ch-bt-chip--selected" : ""}`} onClick={() => setGuessGrape(g)}>{g}</button>)}</div></div>
            <div className="ch-bt-guess-section"><div className="ch-bt-guess-label">Vineyard</div><div className="ch-bt-chips">{CH_VINEYARD_OPTIONS.map((v) => <button key={v} className={`ch-bt-chip ${guessVineyard === v ? "ch-bt-chip--selected" : ""}`} onClick={() => setGuessVineyard(v)}>{v}</button>)}</div></div>
            <div className="ch-bt-guess-section"><div className="ch-bt-guess-label">Vintage</div><div className="ch-bt-chips">{CH_VINTAGE_OPTIONS.map((v) => <button key={v} className={`ch-bt-chip ${guessVintage === v ? "ch-bt-chip--selected" : ""}`} onClick={() => setGuessVintage(v)}>{v}</button>)}</div></div>
            <div className="ch-bt-actions">
              <button className="ch-bt-reveal-btn" onClick={revealClue} disabled={cluesRevealed >= 5}>{cluesRevealed >= 5 ? "All clues revealed" : `Reveal clue ${cluesRevealed + 1}`}</button>
              <button className="ch-bt-submit-btn" onClick={submitGuess} disabled={!guessGrape || !guessVineyard || !guessVintage}>Submit Guess</button>
            </div>
          </div>
        </div>
      )}

      {phase === "result" && wine && score && (
        <div className="ch-bt-result">
          <div className="ch-bt-result-card">
            <p className="ch-bt-round-label" style={{ marginBottom: 16 }}>The answer</p>
            <h2 className="ch-bt-result-answer">{wine.name}</h2>
            <p className="ch-bt-result-sub">{wine.grape} &middot; {wine.vineyard} &middot; {wine.vintage}</p>
            <div className="ch-bt-result-score">{score.total}</div>
            <p className="ch-bt-result-max">out of {maxPossible} possible</p>
            <div className="ch-bt-result-breakdown">
              <span className={`ch-bt-bonus ${guessGrape === wine.grape ? "ch-bt-bonus--correct" : "ch-bt-bonus--wrong"}`}>Grape {guessGrape === wine.grape ? "\u2713 +10" : "\u2717"}</span>
              <span className={`ch-bt-bonus ${guessVineyard === wine.vineyard ? "ch-bt-bonus--correct" : "ch-bt-bonus--wrong"}`}>Vineyard {guessVineyard === wine.vineyard ? "\u2713 +15" : "\u2717"}</span>
              <span className={`ch-bt-bonus ${guessVintage === wine.vintage ? "ch-bt-bonus--correct" : "ch-bt-bonus--wrong"}`}>Vintage {guessVintage === wine.vintage ? "\u2713 +10" : "\u2717"}</span>
            </div>
          </div>
          <div className="ch-bt-result-explain"><h3>About this wine</h3><p>{wine.explanation}</p></div>
          <div className="ch-bt-result-actions">
            <button className="ch-bt-share-btn" onClick={shareScore}>{copied ? "Copied!" : "Share Score"}</button>
            <button className="ch-bt-play-again-btn" onClick={reset}>Play Again</button>
          </div>
        </div>
      )}

      {!isEmbed && <footer className="ch-bt-footer"><Link to="/chehalem/demo" style={{ color: "inherit", textDecoration: "none" }}>&larr; Back to Chehalem</Link></footer>}
    </div>
  );
}
