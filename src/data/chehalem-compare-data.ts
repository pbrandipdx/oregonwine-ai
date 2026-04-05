/* ── Chehalem Winery Compare Data ── */
/* Compare within Chehalem only — vineyards, wines, and experiences. */

import type { CompareCategory, CategoryOption, Comparison } from "./compare-data";

export type CHCompareCategory = "vineyards" | "wines" | "experiences";

export const CH_CATEGORIES: CategoryOption[] = [
  { id: "vineyards" as CompareCategory, title: "Two Vineyards", description: "Three AVAs, four vineyards — how terroir shapes the glass" },
  { id: "wines" as CompareCategory, title: "Two Wines", description: "Side by side from Chehalem's cellar" },
  { id: "experiences" as CompareCategory, title: "Two Experiences", description: "Which tasting is right for you?" },
];

export const CH_COMPARISONS: Comparison[] = [
  // ── Vineyards ──
  {
    id: "ridgecrest-vs-stoller",
    category: "vineyards" as CompareCategory,
    subtitle: "Ribbon Ridge finesse vs Dundee Hills power",
    sideA: {
      name: "Ridgecrest Vineyard",
      tagline: "The first vineyard in Ribbon Ridge — 1982",
      attributes: [
        { label: "AVA", value: "Ribbon Ridge — planted 1982, the first vineyard in the appellation. 22 acres at 683 feet elevation." },
        { label: "Soil", value: "Wellsdale loam — a transition soil with characteristics of both volcanic and sedimentary origins." },
        { label: "Character", value: "Finesse, complexity, old-vine depth. Cooler microclimate, about a week later from bud break to harvest." },
        { label: "Wines", value: "Single-vineyard Pinot Noir, Reserve Pinot Noir, old-vine Pinot Gris (planted 1986), Gamay Noir, Gruner Veltliner." },
      ],
    },
    sideB: {
      name: "Stoller Vineyard",
      tagline: "The largest contiguous vineyard in Dundee Hills — 225 acres",
      attributes: [
        { label: "AVA", value: "Dundee Hills — planted 1995. 225 acres at 210-650 feet elevation." },
        { label: "Soil", value: "Jory — red volcanic clay. The warmest of Chehalem's estate sites." },
        { label: "Character", value: "Bold, rich, dark-fruited. Consistent ripening from the surrounding mountain ranges." },
        { label: "Wines", value: "Single-vineyard Pinot Noir (93 pts WE), Estate Reserve Chardonnay. 70% Pinot Noir, 25% Chardonnay." },
      ],
    },
    verdict: "Ridgecrest is where Chehalem's story began — 22 acres of Wellsdale loam planted in 1982, producing wines of ethereal finesse and old-vine complexity. Stoller is where scale meets quality — 225 acres of Jory volcanic clay delivering the boldest, most concentrated wines in the portfolio. Ridgecrest whispers; Stoller declares. The Ridgecrest Pinot is for candlelight and contemplation. The Stoller Pinot is for the dinner party centerpiece. Together, they prove that one winery can master two completely different expressions of Oregon Pinot Noir.",
  },
  {
    id: "ridgecrest-vs-corral-creek",
    category: "vineyards" as CompareCategory,
    subtitle: "Ribbon Ridge pioneer vs Chehalem Mountains heritage",
    sideA: {
      name: "Ridgecrest Vineyard",
      tagline: "Wellsdale loam at 683 feet — Ribbon Ridge's founding vineyard",
      attributes: [
        { label: "Founded", value: "Planted 1982 by Harry Peterson-Nedry. Own-rooted Pommard and Wadenswil with 7 Pinot Noir clones." },
        { label: "Soil", value: "Wellsdale loam — transition soil. Cooler microclimate, later ripening." },
        { label: "Character", value: "Elegant, layered, complex. Dried herbs, old-vine depth, lifting acidity." },
        { label: "Standout", value: "The Reserve Pinot Noir from Ridgecrest's oldest blocks is Chehalem's most profound wine." },
      ],
    },
    sideB: {
      name: "Corral Creek Vineyard",
      tagline: "Formerly 'Veritas' — Laurelwood soil from 200 to 450 feet",
      attributes: [
        { label: "Founded", value: "Planted 1983 by the Howieson family. Purchased by Chehalem in 1995." },
        { label: "Soil", value: "Laurelwood — brown silty clay loam. Lower elevations deeper/wetter; upper elevations shallow/water-stressed." },
        { label: "Character", value: "Strawberry to cherry fruits, moderate to high tannins. Terroir-driven structure." },
        { label: "Standout", value: "92 pts Wine Spectator, 91 pts Vinous. Also produces Chehalem's benchmark Riesling." },
      ],
    },
    verdict: "Ridgecrest is the founder's vineyard — planted two years before the Ribbon Ridge AVA even existed, on transition soil that produces wines of unmatched finesse. Corral Creek is the acquired gem — purchased from the Howieson family in 1995, its Laurelwood soil at varying elevations produces structured, terroir-expressive wines. Ridgecrest is the quiet sage. Corral Creek is the reliable workhorse. Both are 40+ year old sites, but they speak different dialects of Willamette Valley Pinot Noir.",
  },
  {
    id: "corral-creek-vs-chehalem-estate",
    category: "vineyards" as CompareCategory,
    subtitle: "The heritage site vs the ambitious newcomer",
    sideA: {
      name: "Corral Creek Vineyard",
      tagline: "Chehalem Mountains heritage since 1983",
      attributes: [
        { label: "Age", value: "Planted 1983 — over 40 years of vine age. The only estate vineyard Chehalem didn't plant themselves." },
        { label: "Size", value: "Compact site at 200-450 feet. Intimate scale, proven terroir." },
        { label: "Character", value: "Pinot Noir, Riesling. Structured wines with 40+ years of root depth and terroir expression." },
        { label: "Legacy", value: "Formerly 'Veritas.' Continuous production since before Chehalem was founded." },
      ],
    },
    sideB: {
      name: "Chehalem Estate Vineyard",
      tagline: "The future — 210 acres, 17 Pinot Noir clones, and a new tasting room",
      attributes: [
        { label: "Age", value: "First planted 2007, goal to be fully planted by 2024 and fully producing by 2027." },
        { label: "Size", value: "210 acres total, 120+ acres planted. By far the largest Chehalem property." },
        { label: "Character", value: "17 Pinot Noir clones, 4 Chardonnay clones, 4 Pinot Gris clones, 2 Pinot Blanc clones, plus Gruner Veltliner." },
        { label: "Legacy", value: "Home of the new Bell Road tasting room (opened March 2025). The future of Chehalem." },
      ],
    },
    verdict: "Corral Creek is where Chehalem's terroir knowledge was earned — 40+ years of vine age on Laurelwood soil, producing wines of proven character and depth. Chehalem Estate is where that knowledge is being applied — 210 acres planted with 17 Pinot Noir clones, designed from the ground up as a viticultural showpiece. Corral Creek proves what this soil can do. Chehalem Estate will prove how much more it can do. By 2027, when Chehalem Estate is fully producing, the winery will have its most complete expression yet of Laurelwood terroir.",
  },

  // ── Wines ──
  {
    id: "three-vineyard-vs-stoller",
    category: "wines" as CompareCategory,
    subtitle: "The blend vs the single vineyard",
    sideA: {
      name: "Three Vineyard Pinot Noir",
      tagline: "Three AVAs, one approachable glass",
      attributes: [
        { label: "Approach", value: "Blend from Ridgecrest (Ribbon Ridge), Corral Creek (Chehalem Mtns), and Stoller (Dundee Hills). 10 months in oak." },
        { label: "Profile", value: "Bright red cherry, cranberry, baking spice. Medium-bodied with soft tannins." },
        { label: "Price", value: "~$30 — Chehalem's most accessible Pinot Noir." },
        { label: "Best For", value: "Weeknight dinner, introducing friends to Oregon Pinot, or anyone curious about three-AVA blending." },
      ],
    },
    sideB: {
      name: "Stoller Vineyard Pinot Noir",
      tagline: "Dundee Hills power from Jory volcanic soil",
      attributes: [
        { label: "Approach", value: "100% Stoller Vineyard, Dundee Hills AVA. Jory red volcanic clay at 210-650 feet." },
        { label: "Profile", value: "Bold dark fruits, black cherry, plum, cocoa. Full-bodied with ripe tannins." },
        { label: "Price", value: "~$42 — 93 pts Wine Enthusiast Editors' Choice, 92 pts Wine Spectator." },
        { label: "Best For", value: "Grilled lamb, a hearty winter dinner, or anyone who wants to understand Dundee Hills terroir." },
      ],
    },
    verdict: "The Three Vineyard Pinot is Chehalem's thesis — proof that blending three AVAs creates something greater than its parts. The Stoller Vineyard Pinot is the exclamation point — pure Dundee Hills power from the largest contiguous vineyard in the appellation. Buy the Three Vineyard by the case for the table. Buy the Stoller for the nights that call for something bold. At $12 more, the Stoller delivers a specific terroir conversation. The Three Vineyard delivers a broader one. Both are essential.",
  },
  {
    id: "inox-vs-reserve-chard",
    category: "wines" as CompareCategory,
    subtitle: "Zero oak vs full barrel — the same grape, two philosophies",
    sideA: {
      name: "INOX Unoaked Chardonnay",
      tagline: "Stainless steel purity — Wine Spectator Top 100",
      attributes: [
        { label: "Method", value: "'Inoxydable' = French for stainless steel. Zero oak, zero malolactic. Pure fruit expression." },
        { label: "Profile", value: "Green apple, citrus zest, flinty minerality. Lean, racy, electric acidity." },
        { label: "Recognition", value: "No. 58 on Wine Spectator Top 100 (2020). 91 pts WE Editors' Choice. ~$22." },
        { label: "Best For", value: "Oysters, ceviche, sushi, goat cheese — any dish where oak would overwhelm." },
      ],
    },
    sideB: {
      name: "Estate Reserve Chardonnay",
      tagline: "Barrel-fermented Dundee Hills richness",
      attributes: [
        { label: "Method", value: "Barrel-fermented in French oak. Full malolactic. Dundee Hills Stoller Vineyard fruit." },
        { label: "Profile", value: "Golden pear, brioche, toasted hazelnut. Full-bodied, Burgundian in ambition." },
        { label: "Recognition", value: "~$45. The serious Chardonnay for collectors and dinner parties." },
        { label: "Best For", value: "Roasted chicken, lobster, creamy pastas — dishes that match the wine's richness." },
      ],
    },
    verdict: "INOX and the Estate Reserve are the same grape speaking two different languages. INOX is truth serum — nothing between you and the fruit, the acidity, the terroir. The Reserve is translation — French oak and Dundee Hills fruit reinterpreted through Burgundian technique. At $22, INOX is one of the greatest values in American Chardonnay. At $45, the Reserve is a serious wine for serious occasions. The genius of Chehalem is making both — and making both brilliantly. Start with INOX to understand the fruit. Move to the Reserve to understand the craft.",
  },
  {
    id: "pinot-noir-vs-gamay",
    category: "wines" as CompareCategory,
    subtitle: "Oregon's classic vs Beaujolais energy",
    sideA: {
      name: "Chehalem Pinot Noir",
      tagline: "Four vineyards, three AVAs, one Oregon icon",
      attributes: [
        { label: "Range", value: "From Three Vineyard (~$30) through single-vineyard designates to Ridgecrest Reserve (~$63)." },
        { label: "Character", value: "Red to dark fruits, earthy complexity, silky tannins. Oregon's signature grape." },
        { label: "Vineyards", value: "Ridgecrest (Ribbon Ridge), Corral Creek (Chehalem Mtns), Stoller (Dundee Hills), Chehalem Estate." },
        { label: "Legacy", value: "The grape Chehalem was founded to grow. 35+ years of Pinot Noir experience." },
      ],
    },
    sideB: {
      name: "Ridgecrest Gamay Noir",
      tagline: "Beaujolais spirit from Ribbon Ridge soil",
      attributes: [
        { label: "Range", value: "Single wine — Ridgecrest Vineyard, Ribbon Ridge AVA." },
        { label: "Character", value: "Juicy red berries, violet, peppery lift. Light-bodied, bright acidity, barely-there tannins." },
        { label: "Vineyards", value: "Ridgecrest only — grown alongside Pinot Noir on Wellsdale loam." },
        { label: "Legacy", value: "One of very few Oregon Gamay producers. A nod to Beaujolais from a Pinot Noir house." },
      ],
    },
    verdict: "Pinot Noir is why Chehalem exists — four vineyards across three AVAs, from $30 entry to $63 reserve. Gamay Noir is why Chehalem surprises — a vibrant, Beaujolais-inspired wine from the same Ridgecrest Vineyard that produces their most elegant Pinot. Pinot is the main course. Gamay is the aperitif. Pinot demands attention. Gamay demands a second glass. If you think you know Chehalem from their Pinot, taste the Gamay. It reveals a playful side of a winery known for serious terroir expression.",
  },

  // ── Experiences ──
  {
    id: "estate-vs-library",
    category: "experiences" as CompareCategory,
    subtitle: "Breadth vs depth — current releases vs aged wines",
    sideA: {
      name: "Estate Tasting",
      tagline: "Five current-release wines from four vineyards",
      attributes: [
        { label: "Price", value: "$50 per person ($25 for club members)." },
        { label: "What You Get", value: "Guided five-wine flight from across the estate. Monthly rotating selection." },
        { label: "Setting", value: "New Bell Road tasting room — indoor and outdoor with Mt Hood views." },
        { label: "Best For", value: "First-time visitors, walk-ins, and anyone who wants the three-AVA overview." },
      ],
    },
    sideB: {
      name: "Library Loft",
      tagline: "Aged wines in the intimate loft",
      attributes: [
        { label: "Price", value: "$50 per person ($25 for club members). Optional food pairing +$30." },
        { label: "What You Get", value: "Aged and library wine selections. Optional seasonal food pairing from Chef Brent." },
        { label: "Setting", value: "Library Loft above the tasting room — intimate, quiet, focused." },
        { label: "Best For", value: "Return visitors, contemplative tasters, and anyone who appreciates aged wine." },
      ],
    },
    verdict: "The Estate Tasting is the panoramic view — five current-release wines from four vineyards spanning three AVAs. It's the best introduction to what Chehalem does and how terroir shapes the glass. The Library Loft is the close-up — aged wines in an intimate setting that reveal how time transforms Oregon Pinot Noir. Same price, completely different experiences. First visit? Estate Tasting. Second visit? Library Loft with the food pairing. The $30 Chef Brent add-on makes the Loft one of the best values in the valley.",
  },
  {
    id: "estate-vs-private",
    category: "experiences" as CompareCategory,
    subtitle: "Tasting room experience vs full vineyard tour",
    sideA: {
      name: "Estate Tasting",
      tagline: "Walk-in friendly, Mt Hood views, five wines",
      attributes: [
        { label: "Format", value: "Guided tasting of 5 current releases. Walk-ins welcome. 60-90 minutes." },
        { label: "Wines", value: "Rotating monthly flight — estate wines from all four vineyards." },
        { label: "Food", value: "Wine only (no food pairing included)." },
        { label: "Access", value: "Walk-ins welcome. Indoor and outdoor seating. Reservations available." },
      ],
    },
    sideB: {
      name: "Private Tasting & Tour",
      tagline: "Vineyard tour + 7-8 wines + cheese and charcuterie",
      attributes: [
        { label: "Format", value: "Winery tour + Corral Creek Vineyard visit + seated tasting. 2+ hours." },
        { label: "Wines", value: "7-8 wines including single-vineyard and reserve selections." },
        { label: "Food", value: "Cheese and charcuterie pairing included." },
        { label: "Access", value: "Reservations required. Small-group format." },
      ],
    },
    verdict: "The Estate Tasting is the front door — a polished, comfortable experience in a beautiful tasting room with five well-chosen wines. The Private Tour is the back door — walking the actual vineyard, touring the winery, and tasting 7-8 wines (including reserves) with cheese and charcuterie. Both are $50. The Private Tour gives you 50% more wines, food, and a vineyard experience for the same price. The tradeoff is commitment: you need a reservation and 2+ hours. If you have the time, the Private Tour is the best value at Chehalem.",
  },
  {
    id: "library-vs-private",
    category: "experiences" as CompareCategory,
    subtitle: "Contemplative aged wines vs hands-on vineyard tour",
    sideA: {
      name: "Library Loft",
      tagline: "Quiet depth — aged wines and optional food pairing",
      attributes: [
        { label: "Focus", value: "Aged and library wines. The evolution of terroir over time." },
        { label: "Setting", value: "Intimate Library Loft above the tasting room." },
        { label: "Food", value: "Optional seasonal pairing from Chef Brent (+$30/person)." },
        { label: "Vibe", value: "Contemplative, intimate, focused. For the thinker." },
      ],
    },
    sideB: {
      name: "Private Tasting & Tour",
      tagline: "Active exploration — vineyards, winery, and a full tasting",
      attributes: [
        { label: "Focus", value: "7-8 current wines including single-vineyard and reserve. Plus a vineyard and winery tour." },
        { label: "Setting", value: "Corral Creek Vineyard + winery + seated tasting room." },
        { label: "Food", value: "Cheese and charcuterie pairing included." },
        { label: "Vibe", value: "Active, educational, immersive. For the explorer." },
      ],
    },
    verdict: "The Library Loft is meditation — sit, sip, and let aged wines reveal their secrets in a quiet setting. The Private Tour is adventure — walk the vineyard, see the winery, and taste everything from entry-level to reserve with charcuterie. The Loft is for the person who wants to understand time. The Tour is for the person who wants to understand place. Both cost $50, but they feed completely different appetites. If you're choosing between them, ask yourself: do I want to think or do I want to move? Either way, you'll leave knowing Chehalem better.",
  },
];
