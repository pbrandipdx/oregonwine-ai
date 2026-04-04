/**
 * Crowley Wines "Match Me" quiz data.
 * Since Crowley has only one tasting experience (Barrel Room),
 * this quiz matches users to a Crowley WINE instead.
 * 8 questions, randomly pick 4 per session.
 */

export interface CWExperience {
  id: string;
  name: string;
  price: string;
  tagline: string;
  description: string;
  whyMatch: string;
  personality: string;
  traits: string[];
  wineHighlight: string;
}

export interface CWQuizOption {
  text: string;
  scores: Record<string, number>;
}

export interface CWQuizQuestion {
  id: string;
  question: string;
  options: CWQuizOption[];
}

export const CW_EXPERIENCES: CWExperience[] = [
  {
    id: "wv-pinot",
    name: "Willamette Valley Pinot Noir",
    price: "$28",
    tagline: "Pure joy in the glass",
    description:
      "Crowley's multi-vineyard blend draws from La Colina, Tukwilla, Four Winds, and Sojeau to create an approachable, fruit-forward Pinot Noir that captures the breadth of the Willamette Valley in a single glass.",
    whyMatch:
      "You're easygoing and open-minded. You don't need the fanciest bottle on the shelf — you want something honest, delicious, and easy to share with friends on a Tuesday night.",
    personality: "The Explorer",
    traits: ["easygoing", "social", "value-minded", "approachable", "open to anything"],
    wineHighlight: "Crowley Willamette Valley Pinot Noir — a four-vineyard blend at $28",
  },
  {
    id: "entre-nous",
    name: "Entre Nous Pinot Noir",
    price: "$50",
    tagline: "Between us, this is special",
    description:
      "A barrel selection of the finest Pinot Noir lots, bottled unfined and unfiltered with 50% new oak. Entre Nous is made only when the vintage merits it — a wine of uncommon depth and concentration from Crowley's cellar.",
    whyMatch:
      "You appreciate craft and care. You want to know how the wine was made, why it was selected, and what makes this barrel different from the rest. You don't follow trends — you follow quality.",
    personality: "The Connoisseur",
    traits: ["detail-oriented", "quality-driven", "patient", "appreciates craft", "independent thinker"],
    wineHighlight: "Crowley Entre Nous Pinot Noir — unfined, unfiltered barrel selection",
  },
  {
    id: "vineyard-pinot",
    name: "Single Vineyard Pinot Noir",
    price: "$55",
    tagline: "One place, one story",
    description:
      "Crowley's single-vineyard designates — La Colina, Sojeau, Four Winds, and Tukwilla — each tell the story of a specific site. From the wind-swept Eola-Amity Hills to the volcanic heights of McMinnville, these wines are pure terroir made transparent.",
    whyMatch:
      "You're endlessly curious about place. You want to taste the difference between Dundee Hills Jory and Eola-Amity Nekia. You'd rather drink one wine slowly than three wines quickly.",
    personality: "The Purist",
    traits: ["terroir-obsessed", "contemplative", "curious", "patient", "detail-driven"],
    wineHighlight: "Crowley La Colina, Sojeau, Four Winds, or Tukwilla single-vineyard Pinot Noir",
  },
  {
    id: "chardonnay",
    name: "Crowley Chardonnay",
    price: "$34",
    tagline: "Chablis-like clarity from Oregon",
    description:
      "Crowley's Chardonnay program spans from a steely, no-new-oak Willamette Valley bottling to the rich Phoebe (Wente clone) and taut Helen (Draper clone) — each named for one of winemaker Tyson Crowley's grandmothers.",
    whyMatch:
      "You prefer white wine, and you're tired of the same oaky, buttery Chardonnay everyone else pours. You want something with mineral clarity, lower alcohol, and a sense of place.",
    personality: "The Iconoclast",
    traits: ["independent", "contrarian", "mineral-lover", "precision-seeker", "refreshing taste"],
    wineHighlight: "Crowley Chardonnay — from zero-oak WV to 97-point Phoebe and 96-point Helen",
  },
];

const ALL_QUESTIONS: CWQuizQuestion[] = [
  {
    id: "wine-style",
    question: "What are you reaching for tonight?",
    options: [
      { text: "Something easy, fruity, and crowd-pleasing", scores: { "wv-pinot": 3, chardonnay: 1 } },
      { text: "A wine with real depth that rewards attention", scores: { "entre-nous": 3, "vineyard-pinot": 2 } },
      { text: "Something that tells me exactly where it's from", scores: { "vineyard-pinot": 3, "entre-nous": 1 } },
      { text: "A crisp white that surprises me", scores: { chardonnay: 3 } },
    ],
  },
  {
    id: "occasion",
    question: "What's the occasion?",
    options: [
      { text: "Weeknight dinner — nothing fancy, just good", scores: { "wv-pinot": 3, chardonnay: 2 } },
      { text: "A special dinner I've been planning", scores: { "entre-nous": 3, "vineyard-pinot": 1 } },
      { text: "Side-by-side tasting with friends who love wine", scores: { "vineyard-pinot": 3 } },
      { text: "Oysters, crab, or seafood night", scores: { chardonnay: 3 } },
    ],
  },
  {
    id: "alcohol-pref",
    question: "How do you feel about wine alcohol levels?",
    options: [
      { text: "I don't really think about it", scores: { "wv-pinot": 2, "entre-nous": 2 } },
      { text: "Lower is better — I want freshness, not heat", scores: { chardonnay: 3, "wv-pinot": 1 } },
      { text: "I like wines with concentration and body", scores: { "entre-nous": 3 } },
      { text: "I want to taste the grape and the place, not the alcohol", scores: { "vineyard-pinot": 3, chardonnay: 1 } },
    ],
  },
  {
    id: "terroir-interest",
    question: "Someone says 'terroir' — your reaction?",
    options: [
      { text: "I smile and nod. Just pour the wine.", scores: { "wv-pinot": 3 } },
      { text: "I'm fascinated — tell me about the soil and the wind", scores: { "vineyard-pinot": 3, "entre-nous": 1 } },
      { text: "I want to taste it, not hear about it", scores: { "entre-nous": 3, "wv-pinot": 1 } },
      { text: "I think minerality in wine is underrated", scores: { chardonnay: 3, "vineyard-pinot": 1 } },
    ],
  },
  {
    id: "food-pairing",
    question: "What's on the table tonight?",
    options: [
      { text: "Roast chicken or pasta — the classics", scores: { "wv-pinot": 3, chardonnay: 1 } },
      { text: "Wild salmon with chanterelles", scores: { "vineyard-pinot": 3, "entre-nous": 1 } },
      { text: "Duck confit or braised short ribs", scores: { "entre-nous": 3, "vineyard-pinot": 1 } },
      { text: "Oysters, ceviche, or a big salad", scores: { chardonnay: 3 } },
    ],
  },
  {
    id: "winemaking",
    question: "Which winemaking detail intrigues you most?",
    options: [
      { text: "I just want the wine to taste good", scores: { "wv-pinot": 3 } },
      { text: "Unfined and unfiltered — I want the real thing", scores: { "entre-nous": 3 } },
      { text: "Native yeast and minimal intervention", scores: { "vineyard-pinot": 3, "entre-nous": 1 } },
      { text: "No new oak — let the fruit speak", scores: { chardonnay: 3, "wv-pinot": 1 } },
    ],
  },
  {
    id: "price-comfort",
    question: "What's your comfort zone for a bottle of wine?",
    options: [
      { text: "Under $30 — great wine doesn't have to be expensive", scores: { "wv-pinot": 3, chardonnay: 2 } },
      { text: "$30-$50 — I'll pay more for something special", scores: { chardonnay: 2, "entre-nous": 2, "vineyard-pinot": 1 } },
      { text: "$50+ — if it's the right wine, price is secondary", scores: { "entre-nous": 3, "vineyard-pinot": 3 } },
      { text: "I'd rather buy one great bottle than three average ones", scores: { "vineyard-pinot": 3, "entre-nous": 2 } },
    ],
  },
  {
    id: "red-vs-white",
    question: "Red or white?",
    options: [
      { text: "Red, always red", scores: { "entre-nous": 2, "vineyard-pinot": 2, "wv-pinot": 2 } },
      { text: "White, especially something lean and mineral", scores: { chardonnay: 3 } },
      { text: "Depends on the season and the food", scores: { "wv-pinot": 2, chardonnay: 2 } },
      { text: "Whichever one has the best story behind it", scores: { "vineyard-pinot": 3, "entre-nous": 1 } },
    ],
  },
];

/** Return `count` randomly selected questions (Fisher-Yates shuffle). */
export function getCWRandomQuestions(count: number): CWQuizQuestion[] {
  const pool = [...ALL_QUESTIONS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}
