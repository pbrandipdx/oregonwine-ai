/**
 * Ponzi Vineyards "Match Me" quiz data.
 * Ponzi has multiple tasting experiences,
 * so this quiz matches users to an EXPERIENCE.
 * 8 questions, randomly pick 4 per session.
 */

export interface PZExperience {
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

export interface PZQuizOption {
  text: string;
  scores: Record<string, number>;
}

export interface PZQuizQuestion {
  id: string;
  question: string;
  options: PZQuizOption[];
}

export const PZ_EXPERIENCES: PZExperience[] = [
  {
    id: "signature",
    name: "Signature Tasting",
    price: "$50",
    tagline: "The perfect introduction to Ponzi",
    description:
      "Ponzi's flagship tasting experience pairs a curated flight of award-winning Pinot Noir and Chardonnay with seasonal culinary offerings. Ninety minutes of warm hospitality in one of Oregon's most beautiful tasting rooms, with the option to refund your tasting fee with a 3-bottle purchase.",
    whyMatch:
      "You're social, relaxed, and want the full Ponzi experience. You enjoy great wine alongside great food, and you'd rather soak in the atmosphere than dissect every sip.",
    personality: "The Social Sipper",
    traits: ["social", "relaxed", "values atmosphere", "enjoys food pairings", "approachable"],
    wineHighlight: "Ponzi Laurelwood District Pinot Noir + Chardonnay with seasonal bites",
  },
  {
    id: "collectors",
    name: "Collector's Flight",
    price: "$75",
    tagline: "Only the rarest will do",
    description:
      "A deep dive into Ponzi's most limited-production single-vineyard wines — Abetina, Aurora, Avellana, and Madrona — finishing with a special splash of a club-exclusive or library selection. These are wines you won't find anywhere else.",
    whyMatch:
      "You're detail-oriented and terroir-focused. You want depth over breadth, and you'd rather taste four extraordinary wines than eight good ones. You're building a cellar, not just having a glass.",
    personality: "The Purist",
    traits: ["detail-oriented", "terroir-focused", "patient", "values craftsmanship", "cellar-builder"],
    wineHighlight: "Ponzi Abetina, Aurora, Avellana, and Madrona single-vineyard Pinot Noir",
  },
  {
    id: "bollinger",
    name: "Bollinger Group Tasting",
    price: "$75",
    tagline: "Oregon meets France",
    description:
      "A unique tasting that brings together wines from the Bollinger Group portfolio — Ponzi Vineyards alongside Champagne Ayala and Domaine Chanson — comparing French and Oregon terroir side by side. Where else can you taste Burgundy, Champagne, and the Willamette Valley in one flight?",
    whyMatch:
      "You're adventurous and intellectually curious. You love comparing terroir across regions and countries. A wine tasting is a learning experience, and you want to leave knowing something new.",
    personality: "The Explorer",
    traits: ["adventurous", "intellectual", "globally curious", "comparative thinker", "open to new experiences"],
    wineHighlight: "Ponzi Vineyards + Champagne Ayala + Domaine Chanson — three countries, one glass",
  },
  {
    id: "private",
    name: "Private Tasting Flight",
    price: "$125",
    tagline: "An elevated, exclusive experience",
    description:
      "The ultimate Ponzi experience — a private, guided tasting of the winery's most limited wines in an exclusive setting. Library vintages, allocated selections, and the undivided attention of a wine educator. This is how Ponzi rewards its most discerning guests.",
    whyMatch:
      "You're discerning and value exclusivity. Wine is an investment in relationships and experiences, and you want the best of the best. You'd rather pay more for something truly memorable than save money on something ordinary.",
    personality: "The Collector",
    traits: ["discerning", "exclusive", "committed", "investment-minded", "relationship-builder"],
    wineHighlight: "Ponzi's most limited wines in a private setting — library vintages and allocated selections",
  },
];

const ALL_QUESTIONS: PZQuizQuestion[] = [
  {
    id: "wine-style",
    question: "What are you reaching for tonight?",
    options: [
      { text: "Something approachable with a great food pairing", scores: { signature: 3, bollinger: 1 } },
      { text: "Rare, single-vineyard wines I can't find elsewhere", scores: { collectors: 3, private: 2 } },
      { text: "A global comparison — Oregon vs France, side by side", scores: { bollinger: 3, collectors: 1 } },
      { text: "The most exclusive wines in a private setting", scores: { private: 3, collectors: 1 } },
    ],
  },
  {
    id: "occasion",
    question: "What's the occasion?",
    options: [
      { text: "A fun afternoon out — wine, food, good vibes", scores: { signature: 3, bollinger: 1 } },
      { text: "A serious wine tasting with fellow enthusiasts", scores: { collectors: 3, private: 1 } },
      { text: "An educational experience I'll remember", scores: { bollinger: 3, collectors: 1 } },
      { text: "A special celebration or milestone", scores: { private: 3, signature: 1 } },
    ],
  },
  {
    id: "terroir-interest",
    question: "Someone says 'terroir' — your reaction?",
    options: [
      { text: "I smile and nod. Just pour the wine.", scores: { signature: 3 } },
      { text: "I want to taste every vineyard separately", scores: { collectors: 3, private: 1 } },
      { text: "I want to compare Oregon terroir to French terroir", scores: { bollinger: 3 } },
      { text: "I want the deepest possible dive with a guide", scores: { private: 3, collectors: 1 } },
    ],
  },
  {
    id: "food-pairing",
    question: "What role does food play in your wine experience?",
    options: [
      { text: "Essential — wine and food together is the whole point", scores: { signature: 3, bollinger: 1 } },
      { text: "I prefer to focus on the wine itself", scores: { collectors: 3, private: 2 } },
      { text: "I enjoy comparing wines across different styles", scores: { bollinger: 3 } },
      { text: "I want a curated, elevated pairing experience", scores: { private: 3, signature: 1 } },
    ],
  },
  {
    id: "price-comfort",
    question: "What's your comfort zone for a tasting experience?",
    options: [
      { text: "$50 — especially if it includes food pairings", scores: { signature: 3 } },
      { text: "$75 — I'll pay more for rare or unique wines", scores: { collectors: 2, bollinger: 2 } },
      { text: "$75 — if it includes wines from three countries", scores: { bollinger: 3 } },
      { text: "$125+ — for the right experience, price is secondary", scores: { private: 3 } },
    ],
  },
  {
    id: "group-size",
    question: "Who are you tasting with?",
    options: [
      { text: "Friends or family — we want a fun group experience", scores: { signature: 3, bollinger: 1 } },
      { text: "A small group of serious wine lovers", scores: { collectors: 3, bollinger: 1 } },
      { text: "My partner or a close friend — something intimate", scores: { private: 3, collectors: 1 } },
      { text: "I'm open to meeting other wine enthusiasts", scores: { bollinger: 3, signature: 1 } },
    ],
  },
  {
    id: "travel-style",
    question: "How do you approach wine country visits?",
    options: [
      { text: "I want the classic tasting room experience", scores: { signature: 3 } },
      { text: "I seek out the most limited wines at each stop", scores: { collectors: 3, private: 1 } },
      { text: "I love learning about the history and connections", scores: { bollinger: 3, collectors: 1 } },
      { text: "I prefer private, VIP-level experiences", scores: { private: 3 } },
    ],
  },
  {
    id: "red-vs-white",
    question: "Red or white?",
    options: [
      { text: "Red — Pinot Noir is why I'm here", scores: { collectors: 2, signature: 2 } },
      { text: "Both — I love the full range", scores: { signature: 3, bollinger: 1 } },
      { text: "I want to compare across grapes and regions", scores: { bollinger: 3 } },
      { text: "Whatever's rarest — I want what I can't get elsewhere", scores: { private: 3, collectors: 2 } },
    ],
  },
];

/** Return `count` randomly selected questions (Fisher-Yates shuffle). */
export function getPZRandomQuestions(count: number): PZQuizQuestion[] {
  const pool = [...ALL_QUESTIONS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}
