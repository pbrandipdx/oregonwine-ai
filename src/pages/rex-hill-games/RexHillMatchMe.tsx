import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  RH_EXPERIENCES,
  getRHRandomQuestions,
  type RHExperience,
  type RHQuizQuestion,
} from "../../data/rex-hill-match-me";
import "./RexHillGames.css";
import { SEOHead, winerySubPageSEO } from "../../lib/seo";

type Phase = "home" | "quiz" | "result";

export function RexHillMatchMe() {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get("embed") === "1";

  useEffect(() => {
    const prev = document.title;
    document.title = "Match Me \u2014 Rex Hill";
    return () => { document.title = prev; };
  }, []);

  const [phase, setPhase] = useState<Phase>("home");
  const [questions, setQuestions] = useState<RHQuizQuestion[]>([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<RHExperience | null>(null);
  const [runnerUp, setRunnerUp] = useState<RHExperience | null>(null);
  const [copied, setCopied] = useState(false);

  const start = useCallback(() => {
    setQuestions(getRHRandomQuestions(4));
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
        const sorted = [...RH_EXPERIENCES].sort(
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
      `My Rex Hill match: ${result.name} (${result.price})`,
      `"${result.tagline}"`,
      "",
      "Find your perfect Rex Hill experience:",
      "crushpad.ai/rex-hill/match-me",
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result]);

  const question = questions[questionIdx];

  return (
    <div className="rh-mm">
      <SEOHead {...winerySubPageSEO("REX HILL", "rex-hill", "match-me")} />
      {/* ── Home ── */}
      {phase === "home" && (
        <div className="rh-mm-home">
          <p className="rh-mm-badge">REX HILL &middot; Wine Agent</p>
          <h1 className="rh-mm-title">Match Me</h1>
          <p className="rh-mm-subtitle">
            Find Your Perfect Rex Hill Experience
          </p>
          <button className="rh-mm-start-btn" onClick={start}>
            Find My Match
          </button>
          <p className="rh-mm-home-hint">
            4 quick questions. No wrong answers. Go with your gut.
          </p>
        </div>
      )}

      {/* ── Quiz ── */}
      {phase === "quiz" && question && (
        <div className="rh-mm-question" key={question.id}>
          <div className="rh-mm-progress">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`rh-mm-pip ${i < questionIdx ? "rh-mm-pip--filled" : ""} ${i === questionIdx ? "rh-mm-pip--current" : ""}`}
              />
            ))}
          </div>
          <p className="rh-mm-q-count">Question {questionIdx + 1} of {questions.length}</p>
          <h2 className="rh-mm-q-text">{question.question}</h2>
          <div className="rh-mm-options">
            {question.options.map((opt, i) => (
              <button
                key={i}
                className="rh-mm-option"
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
        <div className="rh-mm-result">
          <div className="rh-mm-result-card">
            <p className="rh-mm-result-badge">Your match</p>
            <h2 className="rh-mm-result-name">{result.name}</h2>
            <p className="rh-mm-result-price">{result.price}</p>
            <p className="rh-mm-result-tagline">"{result.tagline}"</p>
            <div className="rh-mm-result-personality">{result.personality}</div>
            <p className="rh-mm-result-desc">{result.description}</p>
          </div>

          <div className="rh-mm-why-match">
            <p className="rh-mm-why-match-label">Why this matches you</p>
            <p className="rh-mm-why-match-text">{result.whyMatch}</p>
          </div>

          <div className="rh-mm-wine-rec">
            <p className="rh-mm-wine-rec-label">Wine highlight</p>
            <p className="rh-mm-wine-rec-name">{result.wineHighlight}</p>
          </div>

          <div className="rh-mm-traits">
            {result.traits.map((t) => (
              <span key={t} className="rh-mm-trait">{t}</span>
            ))}
          </div>

          {runnerUp && (
            <div className="rh-mm-why-match" style={{ opacity: 0.85 }}>
              <p className="rh-mm-why-match-label">Also consider</p>
              <p className="rh-mm-why-match-text">
                <strong>{runnerUp.name}</strong> ({runnerUp.price}) &mdash; {runnerUp.tagline}
              </p>
            </div>
          )}

          <div className="rh-mm-result-actions">
            <button className="rh-mm-share-btn" onClick={share}>
              {copied ? "Copied!" : "Share Result"}
            </button>
            <button className="rh-mm-retake-btn" onClick={start}>
              Retake Quiz
            </button>
          </div>
        </div>
      )}

      {!isEmbed && (
        <footer className="rh-mm-footer">
          <Link to="/rex-hill/demo" style={{ color: "inherit", textDecoration: "none" }}>
            &larr; Back to Rex Hill
          </Link>
        </footer>
      )}
    </div>
  );
}
