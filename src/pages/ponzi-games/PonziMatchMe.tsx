import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  PZ_EXPERIENCES,
  getPZRandomQuestions,
  type PZExperience,
  type PZQuizQuestion,
} from "../../data/ponzi-match-me";
import "./PonziGames.css";

type Phase = "home" | "quiz" | "result";

export function PonziMatchMe() {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get("embed") === "1";

  useEffect(() => {
    const prev = document.title;
    document.title = "Match Me \u2014 Ponzi Vineyards";
    return () => { document.title = prev; };
  }, []);

  const [phase, setPhase] = useState<Phase>("home");
  const [questions, setQuestions] = useState<PZQuizQuestion[]>([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<PZExperience | null>(null);
  const [runnerUp, setRunnerUp] = useState<PZExperience | null>(null);
  const [copied, setCopied] = useState(false);

  const start = useCallback(() => {
    setQuestions(getPZRandomQuestions(4));
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
        const sorted = [...PZ_EXPERIENCES].sort(
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
      `My Ponzi match: ${result.name} (${result.price})`,
      `"${result.tagline}"`,
      "",
      "Find your perfect Ponzi experience:",
      "crushpad.ai/ponzi/match-me",
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result]);

  const question = questions[questionIdx];

  return (
    <div className="pz-mm">
      {/* -- Home -- */}
      {phase === "home" && (
        <div className="pz-mm-home">
          <p className="pz-mm-badge">PONZI VINEYARDS &middot; Wine Agent</p>
          <h1 className="pz-mm-title">Match Me</h1>
          <p className="pz-mm-subtitle">
            Find Your Perfect Ponzi Experience
          </p>
          <button className="pz-mm-start-btn" onClick={start}>
            Find My Match
          </button>
          <p className="pz-mm-home-hint">
            4 quick questions. No wrong answers. Go with your gut.
          </p>
        </div>
      )}

      {/* -- Quiz -- */}
      {phase === "quiz" && question && (
        <div className="pz-mm-question" key={question.id}>
          <div className="pz-mm-progress">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`pz-mm-pip ${i < questionIdx ? "pz-mm-pip--filled" : ""} ${i === questionIdx ? "pz-mm-pip--current" : ""}`}
              />
            ))}
          </div>
          <p className="pz-mm-q-count">Question {questionIdx + 1} of {questions.length}</p>
          <h2 className="pz-mm-q-text">{question.question}</h2>
          <div className="pz-mm-options">
            {question.options.map((opt, i) => (
              <button
                key={i}
                className="pz-mm-option"
                onClick={() => pick(opt.scores)}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* -- Result -- */}
      {phase === "result" && result && (
        <div className="pz-mm-result">
          <div className="pz-mm-result-card">
            <p className="pz-mm-result-badge">Your Experience Match</p>
            <h2 className="pz-mm-result-name">{result.name}</h2>
            <p className="pz-mm-result-price">{result.price}</p>
            <p className="pz-mm-result-tagline">"{result.tagline}"</p>
            <div className="pz-mm-result-personality">{result.personality}</div>
            <p className="pz-mm-result-desc">{result.description}</p>
          </div>

          <div className="pz-mm-why-match">
            <p className="pz-mm-why-match-label">Why this matches you</p>
            <p className="pz-mm-why-match-text">{result.whyMatch}</p>
          </div>

          <div className="pz-mm-wine-rec">
            <p className="pz-mm-wine-rec-label">Wine highlight</p>
            <p className="pz-mm-wine-rec-name">{result.wineHighlight}</p>
          </div>

          <div className="pz-mm-traits">
            {result.traits.map((t) => (
              <span key={t} className="pz-mm-trait">{t}</span>
            ))}
          </div>

          {runnerUp && (
            <div className="pz-mm-why-match" style={{ opacity: 0.85 }}>
              <p className="pz-mm-why-match-label">Also consider</p>
              <p className="pz-mm-why-match-text">
                <strong>{runnerUp.name}</strong> ({runnerUp.price}) &mdash; {runnerUp.tagline}
              </p>
            </div>
          )}

          <div className="pz-mm-result-actions">
            <button className="pz-mm-share-btn" onClick={share}>
              {copied ? "Copied!" : "Share Result"}
            </button>
            <button className="pz-mm-retake-btn" onClick={start}>
              Retake Quiz
            </button>
          </div>
        </div>
      )}

      {!isEmbed && (
        <footer className="pz-mm-footer">
          <Link to="/ponzi/demo" style={{ color: "inherit", textDecoration: "none" }}>
            &larr; Back to Ponzi
          </Link>
        </footer>
      )}
    </div>
  );
}
