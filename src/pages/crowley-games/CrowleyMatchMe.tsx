import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CW_EXPERIENCES,
  getCWRandomQuestions,
  type CWExperience,
  type CWQuizQuestion,
} from "../../data/crowley-match-me";
import "./CrowleyGames.css";

type Phase = "home" | "quiz" | "result";

export function CrowleyMatchMe() {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get("embed") === "1";

  useEffect(() => {
    const prev = document.title;
    document.title = "Match Me \u2014 Crowley Wines";
    return () => { document.title = prev; };
  }, []);

  const [phase, setPhase] = useState<Phase>("home");
  const [questions, setQuestions] = useState<CWQuizQuestion[]>([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<CWExperience | null>(null);
  const [runnerUp, setRunnerUp] = useState<CWExperience | null>(null);
  const [copied, setCopied] = useState(false);

  const start = useCallback(() => {
    setQuestions(getCWRandomQuestions(4));
    setPhase("quiz");
    setQuestionIdx(0);
    setScores({});
    setResult(null);
    setRunnerUp(null);
    setCopied(false);
  }, []);

  const pick = useCallback(
    (optionScores: Record<string, number>) => {
      const next = { ...scores };
      for (const [id, pts] of Object.entries(optionScores)) {
        next[id] = (next[id] ?? 0) + pts;
      }
      setScores(next);

      if (questionIdx < questions.length - 1) {
        setQuestionIdx((i) => i + 1);
      } else {
        // Find top two
        const sorted = [...CW_EXPERIENCES].sort(
          (a, b) => (next[b.id] ?? 0) - (next[a.id] ?? 0)
        );
        setResult(sorted[0]);
        setRunnerUp(sorted[1] ?? null);
        setPhase("result");
      }
    },
    [scores, questionIdx, questions]
  );

  const share = useCallback(() => {
    if (!result) return;
    const text = [
      `My Crowley wine match: ${result.name} (${result.price})`,
      `"${result.tagline}"`,
      "",
      "Find your perfect Crowley wine:",
      "crushpad.ai/crowley/match-me",
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result]);

  const question = questions[questionIdx];

  return (
    <div className="cw-mm">
      {/* ── Home ── */}
      {phase === "home" && (
        <div className="cw-mm-home">
          <p className="cw-mm-badge">CROWLEY WINES &middot; Wine Agent</p>
          <h1 className="cw-mm-title">Match Me</h1>
          <p className="cw-mm-subtitle">
            Find Your Perfect Crowley Wine
          </p>
          <button className="cw-mm-start-btn" onClick={start}>
            Find My Match
          </button>
          <p className="cw-mm-home-hint">
            4 quick questions. No wrong answers. Go with your gut.
          </p>
        </div>
      )}

      {/* ── Quiz ── */}
      {phase === "quiz" && question && (
        <div className="cw-mm-question" key={question.id}>
          <div className="cw-mm-progress">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`cw-mm-pip ${i < questionIdx ? "cw-mm-pip--filled" : ""} ${i === questionIdx ? "cw-mm-pip--current" : ""}`}
              />
            ))}
          </div>
          <p className="cw-mm-q-count">Question {questionIdx + 1} of {questions.length}</p>
          <h2 className="cw-mm-q-text">{question.question}</h2>
          <div className="cw-mm-options">
            {question.options.map((opt, i) => (
              <button
                key={i}
                className="cw-mm-option"
                onClick={() => pick(opt.scores)}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Result ── */}
      {phase === "result" && result && (
        <div className="cw-mm-result">
          <div className="cw-mm-result-card">
            <p className="cw-mm-result-badge">Your Wine Match</p>
            <h2 className="cw-mm-result-name">{result.name}</h2>
            <p className="cw-mm-result-price">{result.price}</p>
            <p className="cw-mm-result-tagline">"{result.tagline}"</p>
            <div className="cw-mm-result-personality">{result.personality}</div>
            <p className="cw-mm-result-desc">{result.description}</p>
          </div>

          <div className="cw-mm-why-match">
            <p className="cw-mm-why-match-label">Why this matches you</p>
            <p className="cw-mm-why-match-text">{result.whyMatch}</p>
          </div>

          <div className="cw-mm-wine-rec">
            <p className="cw-mm-wine-rec-label">Wine highlight</p>
            <p className="cw-mm-wine-rec-name">{result.wineHighlight}</p>
          </div>

          <div className="cw-mm-traits">
            {result.traits.map((t) => (
              <span key={t} className="cw-mm-trait">{t}</span>
            ))}
          </div>

          {runnerUp && (
            <div className="cw-mm-why-match" style={{ opacity: 0.85 }}>
              <p className="cw-mm-why-match-label">Also consider</p>
              <p className="cw-mm-why-match-text">
                <strong>{runnerUp.name}</strong> ({runnerUp.price}) &mdash; {runnerUp.tagline}
              </p>
            </div>
          )}

          <div className="cw-mm-result-actions">
            <button className="cw-mm-share-btn" onClick={share}>
              {copied ? "Copied!" : "Share Result"}
            </button>
            <button className="cw-mm-retake-btn" onClick={start}>
              Retake Quiz
            </button>
          </div>
        </div>
      )}

      {!isEmbed && (
        <footer className="cw-mm-footer">
          <Link to="/crowley/demo" style={{ color: "inherit", textDecoration: "none" }}>
            &larr; Back to Crowley
          </Link>
        </footer>
      )}
    </div>
  );
}
