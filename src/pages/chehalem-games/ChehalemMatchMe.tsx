import { useCallback, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CH_EXPERIENCES,
  getCHRandomQuestions,
  type CHExperience,
  type CHQuizQuestion,
} from "../../data/chehalem-match-me";
import "./ChehalemGames.css";
import { SEOHead, winerySubPageSEO } from "../../lib/seo";

type Phase = "home" | "quiz" | "result";

export function ChehalemMatchMe() {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get("embed") === "1";

  const [phase, setPhase] = useState<Phase>("home");
  const [questions, setQuestions] = useState<CHQuizQuestion[]>([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<CHExperience | null>(null);
  const [runnerUp, setRunnerUp] = useState<CHExperience | null>(null);
  const [copied, setCopied] = useState(false);

  const start = useCallback(() => {
    setQuestions(getCHRandomQuestions(4));
    setPhase("quiz"); setQuestionIdx(0); setScores({}); setResult(null); setRunnerUp(null); setCopied(false);
  }, []);

  const pick = useCallback((optionScores: Record<string, number>) => {
    const next = { ...scores };
    for (const [id, pts] of Object.entries(optionScores)) next[id] = (next[id] ?? 0) + pts;
    setScores(next);
    if (questionIdx < questions.length - 1) { setQuestionIdx((i) => i + 1); }
    else {
      const sorted = [...CH_EXPERIENCES].sort((a, b) => (next[b.id] ?? 0) - (next[a.id] ?? 0));
      setResult(sorted[0]); setRunnerUp(sorted[1] ?? null); setPhase("result");
    }
  }, [scores, questionIdx, questions]);

  const share = useCallback(() => {
    if (!result) return;
    navigator.clipboard.writeText([
      `My Chehalem match: ${result.name} (${result.price})`,
      `"${result.tagline}"`, "", "Find your perfect Chehalem experience:", "crushpad.ai/chehalem/match-me",
    ].join("\n")).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }, [result]);

  const question = questions[questionIdx];

  return (
    <div className="ch-mm">
      <SEOHead {...winerySubPageSEO("Chehalem Winery", "chehalem", "match-me")} />
      {phase === "home" && (
        <div className="ch-mm-home">
          <p className="ch-mm-badge">CHEHALEM WINERY &middot; Wine Agent</p>
          <h1 className="ch-mm-title">Match Me</h1>
          <p className="ch-mm-subtitle">Find Your Perfect Chehalem Experience</p>
          <button className="ch-mm-start-btn" onClick={start}>Find My Match</button>
          <p className="ch-mm-home-hint">4 quick questions. No wrong answers. Go with your gut.</p>
        </div>
      )}

      {phase === "quiz" && question && (
        <div className="ch-mm-question" key={question.id}>
          <div className="ch-mm-progress">{questions.map((_, i) => <div key={i} className={`ch-mm-pip ${i < questionIdx ? "ch-mm-pip--filled" : ""} ${i === questionIdx ? "ch-mm-pip--current" : ""}`} />)}</div>
          <p className="ch-mm-q-count">Question {questionIdx + 1} of {questions.length}</p>
          <h2 className="ch-mm-q-text">{question.question}</h2>
          <div className="ch-mm-options">{question.options.map((opt, i) => <button key={i} className="ch-mm-option" onClick={() => pick(opt.scores)}>{opt.text}</button>)}</div>
        </div>
      )}

      {phase === "result" && result && (
        <div className="ch-mm-result">
          <div className="ch-mm-result-card">
            <p className="ch-mm-result-badge">Your Experience Match</p>
            <h2 className="ch-mm-result-name">{result.name}</h2>
            <p className="ch-mm-result-price">{result.price}</p>
            <p className="ch-mm-result-tagline">"{result.tagline}"</p>
            <div className="ch-mm-result-personality">{result.personality}</div>
            <p className="ch-mm-result-desc">{result.description}</p>
          </div>
          <div className="ch-mm-why-match"><p className="ch-mm-why-match-label">Why this matches you</p><p className="ch-mm-why-match-text">{result.whyMatch}</p></div>
          <div className="ch-mm-wine-rec"><p className="ch-mm-wine-rec-label">Wine highlight</p><p className="ch-mm-wine-rec-name">{result.wineHighlight}</p></div>
          <div className="ch-mm-traits">{result.traits.map((t) => <span key={t} className="ch-mm-trait">{t}</span>)}</div>
          {runnerUp && <div className="ch-mm-why-match" style={{ opacity: 0.85 }}><p className="ch-mm-why-match-label">Also consider</p><p className="ch-mm-why-match-text"><strong>{runnerUp.name}</strong> ({runnerUp.price}) &mdash; {runnerUp.tagline}</p></div>}
          <div className="ch-mm-result-actions">
            <button className="ch-mm-share-btn" onClick={share}>{copied ? "Copied!" : "Share Result"}</button>
            <button className="ch-mm-retake-btn" onClick={start}>Retake Quiz</button>
          </div>
        </div>
      )}

      {!isEmbed && <footer className="ch-mm-footer"><Link to="/chehalem/demo" style={{ color: "inherit", textDecoration: "none" }}>&larr; Back to Chehalem</Link></footer>}
    </div>
  );
}
