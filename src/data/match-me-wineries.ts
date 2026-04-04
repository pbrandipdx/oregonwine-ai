/**
 * Match Me quiz data — winery archetypes and questions.
 */

export interface WineryMatch {
  id: string;
  name: string;
  tagline: string;
  ava: string;
  personality: string;
  description: string;
  wineRec: string;
  wineStyle: string;
  traits: string[];
  url?: string;
}

export const WINERIES: WineryMatch[] = [
  {
    id: "cristom",
    name: "Cristom Vineyards",
    tagline: "Where volcanic soil meets Van Duzer wind",
    ava: "Eola-Amity Hills",
    personality: "The Romantic Purist",
    description:
      "You're drawn to depth over flash. You'd rather have one extraordinary glass than three good ones. You notice details others miss — the way light hits a hillside, the smell of rain on warm soil. Cristom's biodynamic, whole-cluster, native-yeast approach is winemaking for people who believe the best things can't be rushed.",
    wineRec: "Cristom Jessie Vineyard Pinot Noir",
    wineStyle: "Structured, spicy, volcanic — red fruit with whole-cluster lift and electric acidity",
    traits: ["thoughtful", "detail-oriented", "romantic but grounded", "classic with a twist", "depth over flash"],
  },
  {
    id: "elk-cove",
    name: "Elk Cove Vineyards",
    tagline: "Five decades of cool-climate craft",
    ava: "Yamhill-Carlton",
    personality: "The Generous Explorer",
    description:
      "You're the one who finds the hidden trail, the off-menu dish, the song nobody else knows yet — and then you share it with everyone. Elk Cove's five decades of estate-grown, approachable-but-serious winemaking matches your energy: adventurous, warm, and effortlessly good.",
    wineRec: "Elk Cove Pinot Noir, Willamette Valley",
    wineStyle: "Fresh, bright, vibrant — clean fruit with lifted acidity and food-friendly balance",
    traits: ["social but not loud", "adventurous", "outdoorsy", "warm and generous", "easy to like"],
  },
  {
    id: "stoller",
    name: "Stoller Family Estate",
    tagline: "Modern craft in the Dundee Hills",
    ava: "Dundee Hills",
    personality: "The Polished Host",
    description:
      "You're the one who plans the dinner, picks the playlist, and somehow makes it all look effortless. Style matters to you — not in a showy way, but in a 'life is better when things are done well' way. Stoller's sustainable, design-forward, crowd-pleasing estate is your spiritual home.",
    wineRec: "Stoller Family Estate Reserve Pinot Noir",
    wineStyle: "Balanced, polished, modern — Dundee Hills fruit with finesse and broad appeal",
    traits: ["trend-aware", "design-conscious", "polished", "reliable in groups", "the planner"],
  },
  {
    id: "eyrie",
    name: "The Eyrie Vineyards",
    tagline: "Where Oregon Pinot Noir began",
    ava: "Dundee Hills",
    personality: "The Original",
    description:
      "You don't follow trends — you started them three years ago and moved on. You care about provenance, authenticity, and doing things your own way. The Eyrie Vineyards is where David Lett proved the world wrong by planting Pinot Noir in Oregon in 1965. Pioneer recognizes pioneer.",
    wineRec: "The Eyrie Vineyards Original Vines Pinot Noir",
    wineStyle: "Ethereal, delicate, old-vine — translucent fruit with haunting complexity",
    traits: ["independent", "authentic", "intellectual", "ahead of the curve", "values provenance"],
  },
  {
    id: "domaine-drouhin",
    name: "Domaine Drouhin Oregon",
    tagline: "French soul, Oregon soil",
    ava: "Dundee Hills",
    personality: "The Connoisseur",
    description:
      "You appreciate craftsmanship that spans generations. You've been to the places, read the books, and tasted the wines — and you know that the best things in life come from the intersection of tradition and terroir. Domaine Drouhin brought Burgundy's soul to Oregon's volcanic hills, and the result is a wine that speaks both languages.",
    wineRec: "Domaine Drouhin Oregon Pinot Noir, Dundee Hills",
    wineStyle: "Polished, structured, Burgundian — dark cherry, silky tannins, mineral finish",
    traits: ["cultured", "worldly", "appreciates tradition", "quality-driven", "elegant taste"],
  },
  {
    id: "brooks",
    name: "Brooks Wine",
    tagline: "Joyful wines, serious purpose",
    ava: "Eola-Amity Hills",
    personality: "The Joyful Rebel",
    description:
      "You believe great things should be accessible, not exclusive. You care about community, sustainability, and making the world a little better — but you also know how to throw a party. Brooks was founded on joy and carried forward by a community. Their biodynamic, inclusive approach to winemaking is wine for people who care.",
    wineRec: "Brooks Janus Pinot Noir",
    wineStyle: "Bright, aromatic, biodynamic — lifted fruit with energy and soul",
    traits: ["community-minded", "joyful", "inclusive", "sustainable values", "the connector"],
  },
];

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  text: string;
  /** Points added to each winery's score when this option is picked. */
  scores: Record<string, number>;
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "q1-weekend",
    question: "It's Saturday afternoon. You'd rather be...",
    options: [
      {
        text: "On a long walk with no destination",
        scores: { cristom: 3, eyrie: 2, "elk-cove": 1, brooks: 1, stoller: 0, "domaine-drouhin": 1 },
      },
      {
        text: "Hosting brunch for eight friends",
        scores: { stoller: 3, brooks: 2, "elk-cove": 2, cristom: 0, eyrie: 0, "domaine-drouhin": 1 },
      },
      {
        text: "At a farmers market with a great coffee",
        scores: { "elk-cove": 3, brooks: 2, stoller: 1, cristom: 1, eyrie: 1, "domaine-drouhin": 0 },
      },
      {
        text: "In a bookstore you've never been to",
        scores: { eyrie: 3, cristom: 2, "domaine-drouhin": 2, brooks: 0, stoller: 0, "elk-cove": 1 },
      },
    ],
  },
  {
    id: "q2-flavor",
    question: "Pick the flavor that speaks to you.",
    options: [
      {
        text: "Dark cherry and chocolate",
        scores: { "domaine-drouhin": 3, stoller: 2, cristom: 1, "elk-cove": 0, eyrie: 0, brooks: 1 },
      },
      {
        text: "Strawberry and rose petal",
        scores: { eyrie: 3, cristom: 2, "elk-cove": 1, brooks: 1, stoller: 0, "domaine-drouhin": 0 },
      },
      {
        text: "Lemon zest and fresh herbs",
        scores: { "elk-cove": 3, brooks: 2, stoller: 1, eyrie: 1, cristom: 0, "domaine-drouhin": 0 },
      },
      {
        text: "Mushroom and forest floor",
        scores: { cristom: 3, eyrie: 2, "domaine-drouhin": 1, brooks: 0, stoller: 0, "elk-cove": 1 },
      },
    ],
  },
  {
    id: "q3-values",
    question: "When it comes to how things are made, you care most about...",
    options: [
      {
        text: "Sustainability and the planet",
        scores: { brooks: 3, cristom: 2, "elk-cove": 1, stoller: 1, eyrie: 1, "domaine-drouhin": 0 },
      },
      {
        text: "Family legacy and real people",
        scores: { "elk-cove": 3, eyrie: 2, stoller: 1, brooks: 1, cristom: 0, "domaine-drouhin": 1 },
      },
      {
        text: "Heritage and tradition",
        scores: { "domaine-drouhin": 3, eyrie: 2, cristom: 1, stoller: 0, "elk-cove": 0, brooks: 0 },
      },
      {
        text: "Innovation and doing it differently",
        scores: { stoller: 3, brooks: 2, cristom: 1, "elk-cove": 1, eyrie: 0, "domaine-drouhin": 0 },
      },
    ],
  },
  {
    id: "q4-vibe",
    question: "Your ideal tasting room vibe.",
    options: [
      {
        text: "Intimate and quiet — just the wine and the story",
        scores: { cristom: 3, eyrie: 3, "domaine-drouhin": 2, brooks: 0, stoller: 0, "elk-cove": 0 },
      },
      {
        text: "Social and welcoming — I want to meet people",
        scores: { brooks: 3, "elk-cove": 2, stoller: 2, cristom: 0, eyrie: 0, "domaine-drouhin": 0 },
      },
      {
        text: "Polished and beautiful — the whole experience matters",
        scores: { stoller: 3, "domaine-drouhin": 2, "elk-cove": 1, cristom: 1, eyrie: 0, brooks: 0 },
      },
      {
        text: "Outdoors with a view — nature is the point",
        scores: { "elk-cove": 3, stoller: 2, brooks: 1, cristom: 1, eyrie: 0, "domaine-drouhin": 0 },
      },
    ],
  },
];
