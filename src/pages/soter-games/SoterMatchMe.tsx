import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ST_EXPERIENCES,
  getSTRandomQuestions,
  type STExperience,
  type STQuizQuestion,
} from "../../data/soter-match-me";
import "./SoterGames.css";

type Phase = "home" | "quiz" | "result";

export function SoterMatchMe() {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get("embed") === "1";

  useEffect(() => {
    const prev = document.title;
    document.title = "Match Me \u2014 Soter Vineyards";
    return () => { document.title = prev; };
  }, []);

  const [phase, setPhase] = useState<Phase>("home");
  const [questions, setQuestions] = useState<STQuizQuestion[]>([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<STExperience | null>(null);
  const [runnerUp, setRunnerUp] = useState<STExperience | null>(null);
  const [copied, setCopied] = useState(false);

  const start = useCallback(() => {
    setQuestions(getSTRandomQuestions(4));
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
        const sorted = [...ST_EXPERIENCES].sort(
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
      `My Soter wine match: ${result.name} (${result.price})`,
      `"${result.tagline}"`,
      "",
      "Find your perfect Soter wine:",
      "crushpad.ai/soter/match-me",
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result]);

  const question = questions[questionIdx];

  return (
    <div className="st-mm">
      {/* ── Home ── */}
      {phase === "home" && (
        <div className="st-mm-home">
          <p className="st-mm-badge">SOTER VINEYARDS &middot; Wine Agent</p>
          <h1 className="st-mm-title">Match Me</h1>
          <p className="st-mm-subtitle">Find Your Perfect Soter Wine</p>
          <button className="st-mm-start-btn" onClick={start}>Find My Match</button>
          <p className="st-mm-home-hint">4 quick questions. No wrong answers. Go with your gut.</p>
        </div>
      )}

      {/* ── Quiz ── */}
      {phase === "quiz" && question && (
        <div className="st-mm-question" key={question.id}>
          <div className="st-mm-progress">
            {questions.map((_, i) => (
              <div key={i} className={`st-mm-pip ${i < questionIdx ? "st-mm-pip--filled" : ""} ${i === questionIdx ? "st-mm-pip--current" : ""}`} />
            ))}
          </div>
          <p className="st-mm-q-count">Question {questionIdx + 1} of {questions.length}</p>
          <h2 className="st-mm-q-text">{question.question}</h2>
          <div className="st-mm-options">
            {question.options.map((opt, i) => (
              <button key={i} className="st-mm-option" onClick={() => pick(opt.scores)}>{opt.text}</button>
            ))}
          </div>
        </div>
      )}

      {/* ── Result ── */}
      {phase === "result" && result && (
        <div className="st-mm-result">
          <div className="st-mm-result-card">
            <p className="st-mm-result-badge">Your Wine Match</p>
            <h2 className="st-mm-result-name">{result.name}</h2>
            <p className="st-mm-result-price">{result.price}</p>
            <p className="st-mm-result-tagline">"{result.tagline}"</p>
            <div className="st-mm-result-personality">{result.personality}</div>
            <p className="st-mm-result-desc">{result.description}</p>
          </div>

          <div className="st-mm-why-match">
            <p className="st-mm-why-match-label">Why this matches you</p>
            <p className="st-mm-why-match-text">{result.whyMatch}</p>
          </div>

          <div className="st-mm-wine-rec">
            <p className="st-mm-wine-rec-label">Wine highlight</p>
            <p className="st-mm-wine-rec-name">{result.wineHighlight}</p>
          </div>

          <div className="st-mm-traits">
            {result.traits.map((t) => (
              <span key={t} className="st-mm-trait">{t}</span>
            ))}
          </div>

          {runnerUp && (
            <div className="st-mm-why-match" style={{ opacity: 0.85 }}>
              <p className="st-mm-why-match-label">Also consider</p>
              <p className="st-mm-why-match-text">
                <strong>{runnerUp.name}</strong> ({runnerUp.price}) &mdash; {runnerUp.tagline}
              </p>
            </div>
          )}

          <div className="st-mm-result-actions">
            <button className="st-mm-share-btn" onClick={share}>{copied ? "Copied!" : "Share Result"}</button>
            <button className="st-mm-retake-btn" onClick={start}>Retake Quiz</button>
          </div>
        </div>
      )}

      {!isEmbed && (
        <footer className="st-mm-footer">
          <Link to="/soter/demo" style={{ color: "inherit", textDecoration: "none" }}>&larr; Back to Soter</Link>
        </footer>
      )}
    </div>
  );
}
