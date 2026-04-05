/**
 * Soter Vineyards "Match Me" quiz data.
 * Matches users to a Soter wine/experience.
 * 8 questions, randomly pick 4 per session.
 */

export interface STExperience {
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

export interface STQuizOption {
  text: string;
  scores: Record<string, number>;
}

export interface STQuizQuestion {
  id: string;
  question: string;
  options: STQuizOption[];
}

export const ST_EXPERIENCES: STExperience[] = [
  {
    id: "planet-oregon",
    name: "Planet Oregon Pinot Noir",
    price: "$20",
    tagline: "Everyday organic, planetary thinking",
    description:
      "Soter's most accessible wine — a certified organic Pinot Noir sourced from sustainably farmed vineyards across Oregon. Bright, juicy, and built for the dinner table.",
    whyMatch:
      "You believe great wine doesn't need a fancy label. You care about sustainability but you also care about value. You want something delicious, organic, and easy to open on a Tuesday.",
    personality: "The Conscious Consumer",
    traits: ["value-minded", "sustainability-focused", "easygoing", "practical", "community-minded"],
    wineHighlight: "Planet Oregon Pinot Noir — certified organic, widely available, under $20",
  },
  {
    id: "north-valley",
    name: "North Valley Pinot Noir",
    price: "$30",
    tagline: "The best of the northern Willamette",
    description:
      "A multi-vineyard blend from the northern Willamette Valley that captures the region's cool-climate elegance. Silky, aromatic, and beautifully balanced.",
    whyMatch:
      "You appreciate quality but don't need the most exclusive bottle on the shelf. You want a wine that's reliably excellent, food-friendly, and shows what Oregon does best.",
    personality: "The Enthusiast",
    traits: ["quality-conscious", "social", "food-lover", "curious", "reliable taste"],
    wineHighlight: "North Valley Pinot Noir — Soter's popular Willamette Valley blend",
  },
  {
    id: "mineral-springs",
    name: "Mineral Springs Ranch Pinot Noir",
    price: "$55",
    tagline: "Biodynamic estate, mineral soul",
    description:
      "The flagship Pinot Noir from Soter's biodynamic estate in the Yamhill-Carlton AVA. Marine sedimentary soils and meticulous farming produce a wine of depth, structure, and distinctive minerality.",
    whyMatch:
      "You want to taste the land. You're drawn to wines that reflect a specific place and philosophy. You appreciate the patience and care that biodynamic farming requires, and you can taste the difference.",
    personality: "The Terroir Seeker",
    traits: ["terroir-obsessed", "patient", "detail-oriented", "philosophical", "quality over quantity"],
    wineHighlight: "Mineral Springs Ranch Pinot Noir — biodynamic estate, Yamhill-Carlton AVA",
  },
  {
    id: "brut-rose",
    name: "Brut Rosé Sparkling",
    price: "$45",
    tagline: "Celebration in every bubble",
    description:
      "Traditional method sparkling wine from estate Pinot Noir at Mineral Springs Ranch. Extended lees aging creates a rosé of remarkable depth, with fine mousse, bright acidity, and delicate red fruit.",
    whyMatch:
      "You believe sparkling wine isn't just for celebrations — it's for right now. You love the elegance of rosé and the precision of traditional method. You're the person who orders bubbles with dinner, not just dessert.",
    personality: "The Celebrator",
    traits: ["joyful", "elegant", "spontaneous", "sophisticated", "life-of-the-party"],
    wineHighlight: "Soter Brut Rosé — traditional method sparkling from biodynamic estate Pinot Noir",
  },
];

const ALL_QUESTIONS: STQuizQuestion[] = [
  {
    id: "wine-style",
    question: "What are you reaching for tonight?",
    options: [
      { text: "Something easy, organic, and crowd-pleasing", scores: { "planet-oregon": 3, "north-valley": 1 } },
      { text: "A silky, aromatic Pinot Noir that shows the region", scores: { "north-valley": 3, "mineral-springs": 1 } },
      { text: "An estate wine with real depth and mineral character", scores: { "mineral-springs": 3, "brut-rose": 1 } },
      { text: "Bubbles. Always bubbles.", scores: { "brut-rose": 3 } },
    ],
  },
  {
    id: "occasion",
    question: "What's the occasion?",
    options: [
      { text: "Weeknight dinner — nothing fancy, just good", scores: { "planet-oregon": 3, "north-valley": 2 } },
      { text: "Dinner party with friends who appreciate wine", scores: { "north-valley": 2, "mineral-springs": 3 } },
      { text: "A quiet evening where I want to really focus on one glass", scores: { "mineral-springs": 3 } },
      { text: "We're celebrating — or we should be", scores: { "brut-rose": 3 } },
    ],
  },
  {
    id: "sustainability",
    question: "How important is sustainability in your wine choices?",
    options: [
      { text: "It's everything — I actively seek out organic and biodynamic wines", scores: { "planet-oregon": 2, "mineral-springs": 3 } },
      { text: "I care about it but taste comes first", scores: { "north-valley": 3, "brut-rose": 1 } },
      { text: "I want the full story — farming, philosophy, everything", scores: { "mineral-springs": 3, "planet-oregon": 1 } },
      { text: "I appreciate it but I mostly care about the experience", scores: { "brut-rose": 3, "north-valley": 1 } },
    ],
  },
  {
    id: "terroir-interest",
    question: "Someone says 'biodynamic farming' — your reaction?",
    options: [
      { text: "I love that it's better for the planet", scores: { "planet-oregon": 3, "mineral-springs": 1 } },
      { text: "Fascinating — I want to understand the whole philosophy", scores: { "mineral-springs": 3 } },
      { text: "Does it make the wine taste different? That's what I care about", scores: { "north-valley": 3, "mineral-springs": 1 } },
      { text: "I think wine should be about joy, not ideology", scores: { "brut-rose": 3, "planet-oregon": 1 } },
    ],
  },
  {
    id: "food-pairing",
    question: "What's on the table tonight?",
    options: [
      { text: "Pizza, pasta, or a big salad — casual and delicious", scores: { "planet-oregon": 3, "north-valley": 1 } },
      { text: "Roasted chicken or salmon with seasonal vegetables", scores: { "north-valley": 3, "mineral-springs": 1 } },
      { text: "Wild mushroom risotto or herb-crusted lamb", scores: { "mineral-springs": 3 } },
      { text: "Oysters, smoked salmon, or a cheese board", scores: { "brut-rose": 3, "north-valley": 1 } },
    ],
  },
  {
    id: "price-comfort",
    question: "What's your comfort zone for a bottle of wine?",
    options: [
      { text: "Under $25 — great wine at a fair price", scores: { "planet-oregon": 3 } },
      { text: "$25-$40 — I'll invest a bit for quality", scores: { "north-valley": 3, "brut-rose": 2 } },
      { text: "$40-$60 — I want something exceptional", scores: { "mineral-springs": 3, "brut-rose": 2 } },
      { text: "If it's the right wine, the price doesn't matter", scores: { "mineral-springs": 2, "brut-rose": 2 } },
    ],
  },
  {
    id: "red-vs-sparkling",
    question: "Red wine or sparkling?",
    options: [
      { text: "Red, always — give me Pinot Noir", scores: { "north-valley": 2, "mineral-springs": 2, "planet-oregon": 2 } },
      { text: "Sparkling — the more bubbles the better", scores: { "brut-rose": 3 } },
      { text: "Depends on the season and the mood", scores: { "north-valley": 2, "brut-rose": 2 } },
      { text: "Whichever one was farmed with more intention", scores: { "mineral-springs": 3, "planet-oregon": 1 } },
    ],
  },
  {
    id: "winery-visit",
    question: "You're visiting a winery. What draws you in?",
    options: [
      { text: "A beautiful tasting room with friendly staff", scores: { "north-valley": 3, "planet-oregon": 1 } },
      { text: "The chance to walk through the vineyard and taste the terroir", scores: { "mineral-springs": 3 } },
      { text: "An organic, working farm where you can see the philosophy in action", scores: { "planet-oregon": 2, "mineral-springs": 2 } },
      { text: "A glass of sparkling on the patio with a view", scores: { "brut-rose": 3 } },
    ],
  },
];

/** Return `count` randomly selected questions (Fisher-Yates shuffle). */
export function getSTRandomQuestions(count: number): STQuizQuestion[] {
  const pool = [...ALL_QUESTIONS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}
