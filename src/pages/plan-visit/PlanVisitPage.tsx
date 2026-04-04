import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  QUESTIONS,
  WINERIES,
  LUNCH_SPOTS,
  DAY_TIPS,
  type Season,
  type GroupSize,
  type ExperienceLevel,
  type Priority,
  type Winery,
  type LunchSpot,
} from "../../data/plan-visit-data";
import "./PlanVisitPage.css";

type Phase = "home" | "quiz" | "result";

interface Answers {
  season?: Season;
  group?: GroupSize;
  experience?: ExperienceLevel;
  priority?: Priority;
}

interface ItineraryStop {
  time: string;
  winery: Winery;
  whyItFits: string;
}

interface Itinerary {
  stops: ItineraryStop[];
  lunch: LunchSpot;
}

const STOP_TIMES = ["10:30 AM", "12:00 PM", "2:30 PM", "4:00 PM"];

/* ── Scoring & matching ── */

function scoreWinery(w: Winery, answers: Required<Answers>): number {
  let score = 0;

  // Season compatibility (hard filter handled separately, but boost matches)
  if (w.seasons.includes(answers.season)) score += 2;

  // Group size compatibility
  if (w.groupSizes.includes(answers.group)) score += 3;

  // Experience level (weighted heavily)
  if (w.experienceLevels.includes(answers.experience)) score += 5;

  // Priority / strength (highest weight)
  if (w.strengths.includes(answers.priority)) score += 7;

  // Secondary strength bonus
  const otherStrengths = w.strengths.filter((s) => s !== answers.priority);
  score += otherStrengths.length * 1;

  return score;
}

function buildWhyItFits(w: Winery, answers: Required<Answers>): string {
  const reasons: string[] = [];

  if (w.strengths.includes(answers.priority)) {
    const priorityLabels: Record<Priority, string> = {
      views: "stunning scenery that will take your breath away",
      winemakers: "passionate winemakers who love sharing their craft",
      food: "exceptional food-and-wine pairings",
      "best-wines": "wines that consistently rank among Oregon's finest",
    };
    reasons.push(`Known for ${priorityLabels[answers.priority]}.`);
  } else {
    reasons.push(w.description.split(". ")[0] + ".");
  }

  const tip = w.seasonTip[answers.season];
  if (tip) {
    reasons.push(tip);
  } else {
    reasons.push(w.description.split(". ").slice(1).join(". ").split(".")[0] + ".");
  }

  return reasons.join(" ");
}

function buildItinerary(answers: Required<Answers>): Itinerary {
  // 1. Filter by season
  let candidates = WINERIES.filter((w) => w.seasons.includes(answers.season));

  // 2. Score remaining
  const scored = candidates.map((w) => ({
    winery: w,
    score: scoreWinery(w, answers),
  }));

  // 3. Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // 4. Pick stops with geographic clustering and red/white mix
  const stops: Winery[] = [];
  const usedRegions = new Set<string>();
  let hasRed = false;
  let hasWhite = false;

  // First pass: pick top scorers, prefer geographic clustering
  // Determine the dominant region from top candidates
  const regionCounts: Record<string, number> = {};
  for (const { winery } of scored.slice(0, 8)) {
    regionCounts[winery.region] = (regionCounts[winery.region] ?? 0) + 1;
  }
  const dominantRegion = Object.entries(regionCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const adjacentRegions = dominantRegion === "central" ? ["central", "north", "south"] :
    dominantRegion === "north" ? ["north", "central"] : ["south", "central"];

  // Pick from preferred regions first
  for (const { winery } of scored) {
    if (stops.length >= 4) break;
    if (stops.some((s) => s.id === winery.id)) continue;

    // Prefer adjacent regions to avoid zigzagging
    if (!adjacentRegions.includes(winery.region) && stops.length < 3) continue;

    // Ensure mix of red/white focus
    if (stops.length >= 3) {
      if (!hasWhite && winery.focus === "red") continue;
      if (!hasRed && winery.focus === "white") continue;
    }

    stops.push(winery);
    usedRegions.add(winery.region);
    if (winery.focus === "red" || winery.focus === "both") hasRed = true;
    if (winery.focus === "white" || winery.focus === "both") hasWhite = true;
  }

  // Backfill if we don't have enough
  for (const { winery } of scored) {
    if (stops.length >= 4) break;
    if (stops.some((s) => s.id === winery.id)) continue;
    stops.push(winery);
  }

  // Trim to 4 max, 3 min
  const finalStops = stops.slice(0, 4);

  // Build itinerary stops with times
  const itineraryStops: ItineraryStop[] = finalStops.map((w, i) => ({
    time: STOP_TIMES[i],
    winery: w,
    whyItFits: buildWhyItFits(w, answers),
  }));

  // Pick lunch spot from the dominant region
  const regionLunches = LUNCH_SPOTS.filter((l) =>
    adjacentRegions.includes(l.region)
  );
  const lunch = regionLunches.length > 0
    ? regionLunches[Math.floor(Math.random() * regionLunches.length)]
    : LUNCH_SPOTS[0];

  return { stops: itineraryStops, lunch };
}

/* ── Component ── */

export function PlanVisitPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Plan My Visit \u2014 Crushpad.ai";
    return () => { document.title = prev; };
  }, []);

  const [phase, setPhase] = useState<Phase>("home");
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [copied, setCopied] = useState(false);

  const start = useCallback(() => {
    setPhase("quiz");
    setQuestionIdx(0);
    setAnswers({});
    setCopied(false);
  }, []);

  const pick = useCallback(
    (value: string) => {
      const question = QUESTIONS[questionIdx];
      const nextAnswers = { ...answers, [question.id]: value };
      setAnswers(nextAnswers);

      if (questionIdx < QUESTIONS.length - 1) {
        setQuestionIdx((i) => i + 1);
      } else {
        setPhase("result");
      }
    },
    [answers, questionIdx]
  );

  const itinerary = useMemo(() => {
    if (phase !== "result") return null;
    return buildItinerary(answers as Required<Answers>);
  }, [phase, answers]);

  const share = useCallback(() => {
    if (!itinerary) return;
    const a = answers as Required<Answers>;
    const lines = [
      "My Willamette Valley Wine Day \u2014 via Crushpad.ai",
      "",
      ...itinerary.stops.map((s) =>
        `${s.time} \u2014 ${s.winery.name} (${s.winery.ava})`
      ),
      "",
      `Lunch: ${itinerary.lunch.name}`,
      "",
      `Season: ${a.season} | Group: ${a.group} | Level: ${a.experience}`,
      "",
      "Plan yours: crushpad.ai/plan-visit",
    ];
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [itinerary, answers]);

  const question = QUESTIONS[questionIdx];
  const a = answers as Required<Answers>;

  return (
    <div className="pv">
      {/* ── Home ── */}
      {phase === "home" && (
        <div className="pv-home">
          <p className="pv-badge">Crushpad.ai &middot; Wine Agent</p>
          <h1 className="pv-title">Plan My Visit</h1>
          <p className="pv-subtitle">
            4 quick questions. A custom day in Willamette Valley wine country.
          </p>
          <button className="pv-start-btn" onClick={start}>
            Start Planning
          </button>
          <p className="pv-home-hint">
            We'll build a curated itinerary based on your style.
          </p>
        </div>
      )}

      {/* ── Quiz ── */}
      {phase === "quiz" && question && (
        <div className="pv-question" key={question.id}>
          <div className="pv-progress">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`pv-pip ${i < questionIdx ? "pv-pip--filled" : ""} ${i === questionIdx ? "pv-pip--current" : ""}`}
              />
            ))}
          </div>
          <p className="pv-q-count">
            Question {questionIdx + 1} of {QUESTIONS.length}
          </p>
          <h2 className="pv-q-text">{question.question}</h2>
          <div className="pv-options">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                className="pv-option"
                onClick={() => pick(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Result ── */}
      {phase === "result" && itinerary && (
        <div className="pv-result">
          <div className="pv-result-header">
            <p className="pv-result-badge">Your itinerary</p>
            <h2 className="pv-result-title">Your Willamette Valley Day</h2>
            <p className="pv-result-subtitle">
              A curated route through Oregon wine country, tailored to your style.
            </p>
          </div>

          {/* Timeline */}
          <div className="pv-timeline">
            {itinerary.stops.map((stop, i) => (
              <div key={stop.winery.id}>
                <div className="pv-stop">
                  <div className="pv-stop-time-col">
                    <span className="pv-stop-time">{stop.time}</span>
                    <div className="pv-stop-dot" />
                    {(i < itinerary.stops.length - 1 || i === 1) && (
                      <div className="pv-stop-line" />
                    )}
                  </div>
                  <div className="pv-stop-content">
                    <h3 className="pv-stop-name">{stop.winery.name}</h3>
                    <p className="pv-stop-ava">{stop.winery.ava}</p>
                    <p className="pv-stop-why">{stop.whyItFits}</p>
                    <p className="pv-stop-tip">
                      <span className="pv-tip-label">Tip:</span> {stop.winery.practicalTip}
                    </p>
                  </div>
                </div>

                {/* Lunch insertion after stop 2 */}
                {i === 1 && (
                  <div className="pv-lunch">
                    <div className="pv-stop-time-col">
                      <span className="pv-stop-time pv-lunch-time">Lunch</span>
                      <div className="pv-stop-dot pv-lunch-dot" />
                      <div className="pv-stop-line" />
                    </div>
                    <div className="pv-lunch-content">
                      <h3 className="pv-lunch-name">{itinerary.lunch.name}</h3>
                      <p className="pv-lunch-desc">{itinerary.lunch.description}</p>
                      <p className="pv-stop-tip">
                        <span className="pv-tip-label">Tip:</span> {itinerary.lunch.tip}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Day tips */}
          <div className="pv-day-tips">
            <h3 className="pv-day-tips-title">Tips for your day</h3>
            <ul className="pv-day-tips-list">
              <li>{DAY_TIPS.seasonal[a.season]}</li>
              <li>{DAY_TIPS.pacing}</li>
              <li>{DAY_TIPS.booking}</li>
              <li>{DAY_TIPS.driving}</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="pv-result-actions">
            <button className="pv-share-btn" onClick={share}>
              {copied ? "Copied!" : "Share Itinerary"}
            </button>
            <button className="pv-retake-btn" onClick={start}>
              Start Over
            </button>
          </div>
        </div>
      )}

      <footer className="pv-footer">
        <Link to="/chatbot-demo" style={{ color: "inherit", textDecoration: "none" }}>
          &larr; Back to Crushpad.ai
        </Link>
      </footer>
    </div>
  );
}
