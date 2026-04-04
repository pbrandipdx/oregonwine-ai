/**
 * Rex Hill "Match Me" quiz data.
 * Matches users to one of 6 Rex Hill tasting experiences.
 * 8 questions, randomly pick 4 per session.
 */

export interface RHExperience {
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

export interface RHQuizOption {
  text: string;
  scores: Record<string, number>;
}

export interface RHQuizQuestion {
  id: string;
  question: string;
  options: RHQuizOption[];
}

export const RH_EXPERIENCES: RHExperience[] = [
  {
    id: "classic",
    name: "Classic Flight",
    price: "$45",
    tagline: "The perfect introduction to Rex Hill",
    description:
      "A curated tasting of Rex Hill's current releases in the tasting room. Sample the breadth of the portfolio from Willamette Valley blends to estate bottlings, guided by knowledgeable staff.",
    whyMatch: "You like to ease into things. You're curious but not pretentious, and you want a relaxed first impression without the pressure of a deep dive.",
    personality: "The Easygoing Explorer",
    traits: ["relaxed", "curious", "no-pressure", "value-minded", "social"],
    wineHighlight: "Rex Hill Willamette Valley Pinot Noir",
  },
  {
    id: "library",
    name: "Library Flight",
    price: "$70",
    tagline: "A window into Rex Hill's cellar history",
    description:
      "Rare, aged wines pulled from the Rex Hill library. Taste how the winery's single-vineyard Pinot Noirs and Chardonnays evolve with time, guided by stories of the vintages that shaped them.",
    whyMatch: "You're the person who orders the off-menu special. You want something nobody else gets to try, and you appreciate how time transforms wine.",
    personality: "The Collector",
    traits: ["patient", "detail-oriented", "appreciates rarity", "history-lover", "connoisseur"],
    wineHighlight: "Rex Hill Jacob-Hart Estate Pinot Noir (library vintage)",
  },
  {
    id: "somms-table",
    name: "Somm's Table",
    price: "$125",
    tagline: "Five courses, five wines, one unforgettable meal",
    description:
      "An intimate five-course food and wine pairing experience at Rex Hill. Each course is designed to showcase how the estate's wines interact with seasonal, locally sourced ingredients.",
    whyMatch: "You believe wine is best understood alongside food. You're the one who plans dinner reservations a month out and cares about every detail of the experience.",
    personality: "The Epicurean",
    traits: ["food-obsessed", "detail-driven", "experience-seeker", "generous host", "refined taste"],
    wineHighlight: "Rex Hill Seven Soils Pinot Noir paired with seasonal courses",
  },
  {
    id: "legacy-tour",
    name: "Legacy Tour",
    price: "$90",
    tagline: "Walk the land where it all began",
    description:
      "A behind-the-scenes journey through Rex Hill's estate vineyard, winemaking facility, and barrel cellar. Hear the story of Jan Jacobsen and Paul Hart, see the 13 soil types of Jacob-Hart, and taste wines among the vines.",
    whyMatch: "You want the full story. You're not satisfied with just tasting \u2014 you need to walk the rows, smell the cellar, and understand why this place matters.",
    personality: "The Storyteller",
    traits: ["hands-on", "curious about origins", "outdoorsy", "narrative-driven", "asks great questions"],
    wineHighlight: "Rex Hill Estate Pinot Noir tasted among the vines",
  },
  {
    id: "sensory",
    name: "Sensory Experience",
    price: "$80",
    tagline: "Train your palate, trust your senses",
    description:
      "An interactive, hands-on workshop that teaches you to identify aromas, flavors, and textures in wine. Use aroma kits, blind tasting exercises, and guided comparisons to sharpen your sensory skills.",
    whyMatch: "You learn by doing. You don't just want to be told a wine has notes of cherry \u2014 you want to smell the cherry extract side by side and prove it to yourself.",
    personality: "The Student",
    traits: ["analytical", "hands-on learner", "loves a challenge", "self-improver", "intellectually curious"],
    wineHighlight: "Side-by-side comparison of Rex Hill single-vineyard Pinot Noirs",
  },
  {
    id: "bottles-boards",
    name: "Bottles & Boards",
    price: "$80",
    tagline: "Wine, charcuterie, and good company",
    description:
      "A social tasting experience designed for groups. Share a bottle (or two) of Rex Hill wine alongside a curated charcuterie and cheese board on the patio or in the tasting room.",
    whyMatch: "For you, wine is about the people around the table. You'd rather share a great bottle with friends than sip something rare alone.",
    personality: "The Host",
    traits: ["social", "group-oriented", "relaxed luxury", "food-lover", "the one who organizes"],
    wineHighlight: "Rex Hill Estate Ros\u00e9 of Pinot Noir with artisan cheese",
  },
];

const ALL_QUESTIONS: RHQuizQuestion[] = [
  {
    id: "knowledge",
    question: "How would you describe your wine knowledge?",
    options: [
      { text: "I know what I like, and that's enough for me", scores: { classic: 3, "bottles-boards": 2 } },
      { text: "I've been learning and want to go deeper", scores: { sensory: 3, "legacy-tour": 2 } },
      { text: "I can talk tannins and terroir with the best of them", scores: { library: 3, "somms-table": 2 } },
      { text: "I want to understand the 'why' behind every sip", scores: { sensory: 3, "legacy-tour": 2, library: 1 } },
    ],
  },
  {
    id: "group-size",
    question: "Who are you bringing to the tasting room?",
    options: [
      { text: "Just me \u2014 solo adventures are my thing", scores: { classic: 2, sensory: 2, library: 2 } },
      { text: "My partner \u2014 we need a date day", scores: { "somms-table": 3, "legacy-tour": 2 } },
      { text: "A small group of friends who love wine", scores: { "bottles-boards": 3, classic: 2 } },
      { text: "A bigger crew \u2014 the more, the merrier", scores: { "bottles-boards": 3, classic: 2 } },
    ],
  },
  {
    id: "excites",
    question: "What excites you most about visiting a winery?",
    options: [
      { text: "Tasting wines I can't get anywhere else", scores: { library: 3, "somms-table": 1 } },
      { text: "Learning something new about how wine is made", scores: { "legacy-tour": 3, sensory: 2 } },
      { text: "The whole vibe \u2014 beautiful setting, great people, good wine", scores: { "bottles-boards": 3, classic: 2 } },
      { text: "Finding the perfect bottle to bring home", scores: { classic: 3, library: 1 } },
    ],
  },
  {
    id: "afternoon",
    question: "Your ideal afternoon in Willamette Valley looks like...",
    options: [
      { text: "Walking through vineyards and hearing the winemaker's story", scores: { "legacy-tour": 3, sensory: 1 } },
      { text: "A long, leisurely lunch with wine pairings", scores: { "somms-table": 3, "bottles-boards": 1 } },
      { text: "A relaxed tasting on a sunny patio with friends", scores: { "bottles-boards": 3, classic: 2 } },
      { text: "A deep-dive tasting that challenges my palate", scores: { sensory: 3, library: 2 } },
    ],
  },
  {
    id: "food-relationship",
    question: "How important is food in your wine experience?",
    options: [
      { text: "Essential \u2014 wine without food is only half the story", scores: { "somms-table": 3, "bottles-boards": 2 } },
      { text: "Nice to have, but the wine should stand on its own", scores: { library: 2, classic: 2, sensory: 1 } },
      { text: "I love a good cheese board with my glass", scores: { "bottles-boards": 3, classic: 1 } },
      { text: "I'm more interested in the wine itself", scores: { sensory: 2, library: 2, "legacy-tour": 1 } },
    ],
  },
  {
    id: "budget",
    question: "When it comes to experiences, your philosophy is...",
    options: [
      { text: "Keep it simple and well-priced", scores: { classic: 3 } },
      { text: "I'll pay more for something truly special", scores: { "somms-table": 2, library: 2, "legacy-tour": 1 } },
      { text: "Split the cost with friends and make it a party", scores: { "bottles-boards": 3 } },
      { text: "If it teaches me something, it's worth the investment", scores: { sensory: 3, "legacy-tour": 2 } },
    ],
  },
  {
    id: "learning-style",
    question: "How do you prefer to learn about wine?",
    options: [
      { text: "Just pour me a glass and let me figure it out", scores: { classic: 3, "bottles-boards": 1 } },
      { text: "Tell me the story behind it \u2014 the people, the place", scores: { "legacy-tour": 3, library: 1 } },
      { text: "Show me side by side and let me taste the difference", scores: { sensory: 3, library: 1 } },
      { text: "Pair it with food and show me why they work together", scores: { "somms-table": 3 } },
    ],
  },
  {
    id: "social-intimate",
    question: "Which sounds more like your speed?",
    options: [
      { text: "A lively, social atmosphere where I can meet people", scores: { "bottles-boards": 3, classic: 2 } },
      { text: "An intimate, focused experience with personal attention", scores: { "somms-table": 3, library: 2 } },
      { text: "Something hands-on and interactive", scores: { sensory: 3, "legacy-tour": 2 } },
      { text: "A quiet moment to slow down and really taste", scores: { library: 3, classic: 1 } },
    ],
  },
];

/** Return `count` randomly selected questions (Fisher-Yates shuffle). */
export function getRHRandomQuestions(count: number): RHQuizQuestion[] {
  const pool = [...ALL_QUESTIONS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}
