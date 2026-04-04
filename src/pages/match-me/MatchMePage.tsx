import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WINERIES, getRandomQuestions, type WineryMatch, type QuizQuestion } from "../../data/match-me-wineries";
import "./MatchMePage.css";

type Phase = "home" | "quiz" | "result";

export function MatchMePage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Match Me — Crushpad.ai";
    return () => { document.title = prev; };
  }, []);

  const [phase, setPhase] = useState<Phase>("home");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<WineryMatch | null>(null);
  const [copied, setCopied] = useState(false);

  const start = useCallback(() => {
    setQuestions(getRandomQuestions(4));
    setPhase("quiz");
    setQuestionIdx(0);
    setScores({});
    setResult(null);
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
        // Find winner
        let best: WineryMatch = WINERIES[0];
        let bestScore = -1;
        for (const w of WINERIES) {
          const s = next[w.id] ?? 0;
          if (s > bestScore) {
            bestScore = s;
            best = w;
          }
        }
        setResult(best);
        setPhase("result");
      }
    },
    [scores, questionIdx, questions]
  );

  const share = useCallback(() => {
    if (!result) return;
    const text = [
      `I'm a ${result.name} person!`,
      `"${result.tagline}"`,
      "",
      `Find your Willamette Valley match:`,
      "crushpad.ai/match-me",
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result]);

  const question = questions[questionIdx];

  return (
    <div className="mm">
      {/* ── Home ── */}
      {phase === "home" && (
        <div className="mm-home">
          <p className="mm-badge">Crushpad.ai &middot; Wine Agent</p>
          <h1 className="mm-title">Match Me</h1>
          <p className="mm-subtitle">
            4 questions. Your perfect Willamette Valley winery.
          </p>
          <button className="mm-start-btn" onClick={start}>
            Find My Match
          </button>
          <p className="mm-home-hint">
            No wrong answers. Go with your gut.
          </p>
        </div>
      )}

      {/* ── Quiz ── */}
      {phase === "quiz" && question && (
        <div className="mm-question" key={question.id}>
          <div className="mm-progress">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`mm-pip ${i < questionIdx ? "mm-pip--filled" : ""} ${i === questionIdx ? "mm-pip--current" : ""}`}
              />
            ))}
          </div>
          <p className="mm-q-count">Question {questionIdx + 1} of {questions.length}</p>
          <h2 className="mm-q-text">{question.question}</h2>
          <div className="mm-options">
            {question.options.map((opt, i) => (
              <button
                key={i}
                className="mm-option"
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
        <div className="mm-result">
          <div className="mm-result-card">
            <p className="mm-result-badge">Your match</p>
            <h2 className="mm-result-name">{result.name}</h2>
            <p className="mm-result-ava">{result.ava}</p>
            <p className="mm-result-tagline">"{result.tagline}"</p>
            <div className="mm-result-personality">{result.personality}</div>
            <p className="mm-result-desc">{result.description}</p>
          </div>

          <div className="mm-wine-rec">
            <p className="mm-wine-rec-label">Your wine</p>
            <p className="mm-wine-rec-name">{result.wineRec}</p>
            <p className="mm-wine-rec-style">{result.wineStyle}</p>
          </div>

          <div className="mm-traits">
            {result.traits.map((t) => (
              <span key={t} className="mm-trait">{t}</span>
            ))}
          </div>

          <div className="mm-result-actions">
            <button className="mm-share-btn" onClick={share}>
              {copied ? "Copied!" : "Share Result"}
            </button>
            <button className="mm-retake-btn" onClick={start}>
              Retake Quiz
            </button>
          </div>
        </div>
      )}

      <footer className="mm-footer">
        <Link to="/chatbot-demo" style={{ color: "inherit", textDecoration: "none" }}>
          &larr; Back to Crushpad.ai
        </Link>
      </footer>
    </div>
  );
}
