/**
 * Chehalem Winery "Match Me" quiz data.
 * Chehalem has multiple tasting experiences,
 * so this quiz matches users to an EXPERIENCE.
 * 8 questions, randomly pick 4 per session.
 */

export interface CHExperience {
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

export interface CHQuizOption {
  text: string;
  scores: Record<string, number>;
}

export interface CHQuizQuestion {
  id: string;
  question: string;
  options: CHQuizOption[];
}

export const CH_EXPERIENCES: CHExperience[] = [
  {
    id: "estate",
    name: "Estate Tasting",
    price: "$50",
    tagline: "Three AVAs in one glass",
    description:
      "A guided five-wine tasting of current releases spanning four estate vineyards across Ribbon Ridge, Chehalem Mountains, and Dundee Hills. The flight changes monthly, with indoor and outdoor seating in the new Bell Road tasting room with Mt Hood views. Walk-ins welcome.",
    whyMatch:
      "You want the full picture. You're curious about how terroir shapes wine and want to taste the difference between three AVAs without leaving your seat. You're social, open-minded, and here to explore.",
    personality: "The Explorer",
    traits: ["curious", "social", "open-minded", "values variety", "terroir-interested"],
    wineHighlight: "Monthly rotating flight from Ridgecrest, Corral Creek, Stoller, and Chehalem Estate vineyards",
  },
  {
    id: "library",
    name: "Library Loft",
    price: "$50",
    tagline: "Aged wines in an intimate setting",
    description:
      "A seated experience with aged and library wines in the intimate Library Loft above the tasting room. Add an optional seasonal food pairing from Chef Brent for $30/person. These are wines you won't find on the shelf — aged selections that reveal how Chehalem's terroir evolves over time.",
    whyMatch:
      "You're patient and contemplative. You appreciate how wine changes with age and want to taste the story that only time can tell. An intimate setting matters more to you than a big room.",
    personality: "The Connoisseur",
    traits: ["patient", "contemplative", "detail-oriented", "values intimacy", "age-worthy appreciation"],
    wineHighlight: "Library selections including aged single-vineyard Pinot Noir with optional Chef Brent food pairing",
  },
  {
    id: "private",
    name: "Private Tasting & Tour",
    price: "$50",
    tagline: "Behind the scenes with cheese and charcuterie",
    description:
      "Tour the Chehalem winery and Corral Creek Vineyards, then settle in for a seated tasting of 7-8 current releases paired with cheese and charcuterie. Includes single-vineyard and reserve wines you won't taste in the standard flight.",
    whyMatch:
      "You want the full experience — vineyard, winery, and glass. You're the kind of person who reads the back label, asks the winemaker questions, and wants to understand how the wine got from vine to bottle.",
    personality: "The Deep Diver",
    traits: ["thorough", "hands-on", "intellectually curious", "values experience", "behind-the-scenes"],
    wineHighlight: "7-8 wines including Ridgecrest Reserve and single-vineyard selections with artisan cheese and charcuterie",
  },
  {
    id: "custom",
    name: "Custom Tasting & Tour",
    price: "By request",
    tagline: "Your vision, our vineyard",
    description:
      "A fully customized experience tailored to your group's interests, from harvest-season vineyard walks to blending sessions to multi-course wine dinners. Contact the hospitality team to design something uniquely yours.",
    whyMatch:
      "You don't do off-the-shelf. Whether it's a corporate retreat, a birthday celebration, or a deep-dive education session, you want an experience designed around your group. You're a planner and a host.",
    personality: "The Curator",
    traits: ["creative", "discerning", "host mentality", "values exclusivity", "event-minded"],
    wineHighlight: "Fully customized wine selection tailored to your group's preferences and occasion",
  },
];

const ALL_QUESTIONS: CHQuizQuestion[] = [
  {
    id: "wine-style",
    question: "What are you looking for today?",
    options: [
      { text: "A broad tasting across different vineyards and styles", scores: { estate: 3, private: 1 } },
      { text: "Aged wines that tell a story of time and terroir", scores: { library: 3, private: 1 } },
      { text: "The full tour — vineyard, winery, and a deep tasting", scores: { private: 3, custom: 1 } },
      { text: "Something completely tailored to my group", scores: { custom: 3 } },
    ],
  },
  {
    id: "occasion",
    question: "What's the occasion?",
    options: [
      { text: "A casual afternoon exploring great wine", scores: { estate: 3, library: 1 } },
      { text: "A contemplative tasting — I want to slow down and savor", scores: { library: 3 } },
      { text: "A wine education experience with friends", scores: { private: 3, estate: 1 } },
      { text: "A special event or celebration", scores: { custom: 3, private: 1 } },
    ],
  },
  {
    id: "terroir-interest",
    question: "Someone says 'three AVAs' — your reaction?",
    options: [
      { text: "I want to taste the difference between all three", scores: { estate: 3, private: 1 } },
      { text: "I'd rather go deep on one vineyard's aged wines", scores: { library: 3 } },
      { text: "Show me the vineyards — I want to see where it grows", scores: { private: 3 } },
      { text: "Build me a tasting around the best of each", scores: { custom: 3, estate: 1 } },
    ],
  },
  {
    id: "food-pairing",
    question: "What role does food play?",
    options: [
      { text: "Wine first — food can wait", scores: { estate: 3 } },
      { text: "I'd love an optional food pairing if it's seasonal and local", scores: { library: 3, custom: 1 } },
      { text: "Cheese and charcuterie make everything better", scores: { private: 3 } },
      { text: "I want a full culinary experience designed around the wines", scores: { custom: 3 } },
    ],
  },
  {
    id: "group-size",
    question: "Who's coming with you?",
    options: [
      { text: "Just me or a partner — keep it simple", scores: { estate: 2, library: 2 } },
      { text: "A small group of wine-curious friends", scores: { estate: 3, private: 1 } },
      { text: "A few serious wine lovers who want depth", scores: { private: 3, library: 1 } },
      { text: "A larger group with specific needs", scores: { custom: 3 } },
    ],
  },
  {
    id: "setting",
    question: "What's your ideal tasting room vibe?",
    options: [
      { text: "The new tasting room with those Mt Hood views", scores: { estate: 3 } },
      { text: "An intimate loft with a small, focused group", scores: { library: 3 } },
      { text: "Walking the actual vineyards before we taste", scores: { private: 3 } },
      { text: "A private space designed just for us", scores: { custom: 3, library: 1 } },
    ],
  },
  {
    id: "wine-knowledge",
    question: "How deep is your wine knowledge?",
    options: [
      { text: "I know what I like — show me what's good", scores: { estate: 3 } },
      { text: "I appreciate aged wines and want to learn more", scores: { library: 3, private: 1 } },
      { text: "I want the full education — soil, clones, the works", scores: { private: 3 } },
      { text: "I know enough to design my own experience", scores: { custom: 3, library: 1 } },
    ],
  },
  {
    id: "sustainability",
    question: "Chehalem is B Corp certified. Does that matter to you?",
    options: [
      { text: "I appreciate it — now pour the wine", scores: { estate: 3 } },
      { text: "I want to taste how sustainable farming shows in aged wines", scores: { library: 3 } },
      { text: "Show me the vineyards and the eco-zones", scores: { private: 3, custom: 1 } },
      { text: "I'd love a sustainability-focused experience", scores: { custom: 3 } },
    ],
  },
];

/** Return `count` randomly selected questions (Fisher-Yates shuffle). */
export function getCHRandomQuestions(count: number): CHQuizQuestion[] {
  const pool = [...ALL_QUESTIONS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}
