/**
 * Chehalem Winery Blind Tasting wine pool.
 * 10 Chehalem wines with 5 progressive clue layers each.
 *
 * Clue layers:
 *   1. Sensory Snapshot  - color, aromas, first impression
 *   2. Structure          - body, acidity, tannin, texture
 *   3. Terroir            - soil, elevation, climate cues
 *   4. Vineyard Hint      - clue about which vineyard
 *   5. Final Tell         - the giveaway detail
 */

export type CHGrape = "Pinot Noir" | "Chardonnay" | "Pinot Gris" | "Riesling" | "Gamay Noir" | "Gruner Veltliner";

export type CHVineyard =
  | "Ridgecrest"
  | "Corral Creek"
  | "Stoller"
  | "Chehalem Estate"
  | "Three Vineyard";

export type CHVintage = "2022" | "2023";

export interface CHBlindTastingWine {
  id: string;
  name: string;
  grape: CHGrape;
  vineyard: CHVineyard;
  vintage: CHVintage;
  difficulty: 1 | 2 | 3 | 4;
  clues: [string, string, string, string, string];
  explanation: string;
}

export const CH_GRAPE_OPTIONS: CHGrape[] = ["Pinot Noir", "Chardonnay", "Pinot Gris", "Riesling", "Gamay Noir", "Gruner Veltliner"];

export const CH_VINEYARD_OPTIONS: CHVineyard[] = [
  "Ridgecrest",
  "Corral Creek",
  "Stoller",
  "Chehalem Estate",
  "Three Vineyard",
];

export const CH_VINTAGE_OPTIONS: CHVintage[] = ["2022", "2023"];

export const CH_WINES: CHBlindTastingWine[] = [
  /* ── Pinot Noir ───────────────────────────────────── */
  {
    id: "ch-three-vineyard-pn-2023",
    name: "Chehalem Three Vineyard Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "Three Vineyard",
    vintage: "2023",
    difficulty: 1,
    clues: [
      "Bright red cherry, cranberry, and a whisper of baking spice fill the glass with easy charm.",
      "Medium-bodied with soft tannins and balanced acidity. Approachable and fruit-forward with a clean finish.",
      "A blend from three estate vineyards spanning Ribbon Ridge, Chehalem Mountains, and Dundee Hills AVAs.",
      "This is the entry-level Pinot from a B Corp certified winery founded in 1990 — one of Oregon's sustainability leaders.",
      "Chehalem Three Vineyard Pinot Noir — three AVAs, one glass. ~$30, 10 months in oak.",
    ],
    explanation:
      "The Three Vineyard Pinot Noir is Chehalem's entry point — a blend from Ridgecrest, Corral Creek, and Stoller vineyards that captures the breadth of their three-AVA estate.",
  },
  {
    id: "ch-chehalem-mtns-pn-2022",
    name: "Chehalem Mountains Pinot Noir 2022",
    grape: "Pinot Noir",
    vineyard: "Chehalem Estate",
    vintage: "2022",
    difficulty: 1,
    clues: [
      "Red fruits with hints of violet, dark earth, and a subtle spice note on the nose.",
      "Medium-bodied with good structure and moderate tannins. Earthy and terroir-driven.",
      "Grown on Laurelwood soil — ancient windblown loess over volcanic basalt in the Chehalem Mountains.",
      "An estate blend from Chehalem's newest vineyard, 120+ acres planted starting in 2007.",
      "Chehalem Mountains Pinot Noir — estate blend, Laurelwood soil. 91 points Wine Enthusiast.",
    ],
    explanation:
      "The Chehalem Mountains Pinot Noir is an estate blend from the new Chehalem Estate Vineyard on Bell Road — 120+ acres of Laurelwood soil planted with 17 Pinot Noir clones.",
  },
  {
    id: "ch-corral-creek-pn-2023",
    name: "Chehalem Corral Creek Vineyard Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "Corral Creek",
    vintage: "2023",
    difficulty: 2,
    clues: [
      "Strawberry to cherry aromatics with moderate depth and an inviting warmth.",
      "Moderate to high tannins with good acidity. The structure suggests Laurelwood soil influence.",
      "Purchased in 1995 from the Howieson family, this vineyard was formerly known as 'Veritas.'",
      "The vineyard sits at 200-450 feet elevation in the Chehalem Mountains AVA — lower elevations deeper and wetter, upper elevations shallow and water-stressed.",
      "Chehalem Corral Creek Vineyard Pinot Noir — Chehalem Mountains AVA. 92 pts Wine Spectator, 91 pts Vinous.",
    ],
    explanation:
      "Corral Creek was purchased in 1995 from the Howieson family (formerly 'Veritas'). The Laurelwood soil at 200-450 feet elevation produces a structured, terroir-expressive Pinot Noir.",
  },
  {
    id: "ch-stoller-pn-2023",
    name: "Chehalem Stoller Vineyard Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "Stoller",
    vintage: "2023",
    difficulty: 2,
    clues: [
      "Bold dark fruits — black cherry, plum — with a rich, concentrated nose and hints of cocoa.",
      "Full-bodied for Oregon Pinot with ripe tannins and a lush, generous palate. Warmer-site character.",
      "Grown on Jory red volcanic clay soil in the Dundee Hills, the warmest of this winery's sites.",
      "At 225 planted acres, this is the largest contiguous vineyard in the Dundee Hills AVA.",
      "Chehalem Stoller Vineyard Pinot Noir — Dundee Hills, Jory soil. 93 pts Wine Enthusiast Editors' Choice, 92 pts Wine Spectator.",
    ],
    explanation:
      "Stoller Vineyard is the largest contiguous vineyard in the Dundee Hills at 225 planted acres. The Jory volcanic soil and warm microclimate produce Chehalem's boldest, most concentrated Pinot Noir.",
  },
  {
    id: "ch-ridgecrest-pn-2023",
    name: "Chehalem Ridgecrest Vineyards Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "Ridgecrest",
    vintage: "2023",
    difficulty: 3,
    clues: [
      "Elegant red fruits, dried herbs, and a complex, layered bouquet with old-vine depth.",
      "Finesse over power — silky tannins, lifting acidity, and a long, nuanced finish. Cool-climate expression.",
      "Wellsdale loam — a transition soil with characteristics of both volcanic and sedimentary origins.",
      "This vineyard was the first planted in what would become the Ribbon Ridge AVA, dating to 1982.",
      "Chehalem Ridgecrest Vineyards Pinot Noir — Ribbon Ridge AVA, planted 1982. 22 acres, 7 Pinot Noir clones.",
    ],
    explanation:
      "Ridgecrest was the first vineyard planted in what became the Ribbon Ridge AVA, established in 1982 by Harry Peterson-Nedry. The 22 acres of Wellsdale loam at 683 feet produce Chehalem's most elegant Pinot Noir.",
  },
  {
    id: "ch-ridgecrest-reserve-pn-2022",
    name: "Chehalem Ridgecrest Vineyards Reserve Pinot Noir 2022",
    grape: "Pinot Noir",
    vineyard: "Ridgecrest",
    vintage: "2022",
    difficulty: 4,
    clues: [
      "Deeply perfumed — rose petal, exotic spice, dried cherry, and a profound earthy complexity.",
      "Exceptional structure with gossamer tannins and remarkable length. Age-worthy and contemplative.",
      "The best barrels from vines that are now 40+ years old on Wellsdale loam.",
      "A reserve selection from the vineyard that launched the Ribbon Ridge AVA. Cooler microclimate, about a week later from bud break through harvest.",
      "Chehalem Ridgecrest Reserve Pinot Noir — reserve barrels from 1982 plantings, own-rooted Pommard and Wadenswil. ~$63.",
    ],
    explanation:
      "The Ridgecrest Reserve represents the finest barrels from Chehalem's oldest vines — own-rooted Pommard and Wadenswil planted in 1982 on Wellsdale loam. The cooler Ribbon Ridge microclimate and 40+ years of vine age create profound complexity.",
  },

  /* ── Chardonnay ───────────────────────────────────── */
  {
    id: "ch-inox-chard-2023",
    name: "Chehalem INOX Unoaked Chardonnay 2023",
    grape: "Chardonnay",
    vineyard: "Three Vineyard",
    vintage: "2023",
    difficulty: 2,
    clues: [
      "Bright green apple, citrus zest, and flinty minerality — pure and crisp with zero oak influence.",
      "Lean and racy with electric acidity. Stainless steel purity — no malolactic, no barrel contact.",
      "'Inoxydable' is French for stainless steel — the entire production method in the name.",
      "This wine made Wine Spectator's Top 100 list — a $22 Chardonnay next to Grand Cru Burgundy.",
      "Chehalem INOX Unoaked Chardonnay — 100% stainless. ~$22. No. 58 Wine Spectator Top 100 (2020). 91 pts WE Editors' Choice.",
    ],
    explanation:
      "INOX is Chehalem's signature Chardonnay — fermented and aged entirely in stainless steel ('inoxydable' in French). The 2020 vintage made Wine Spectator's Top 100 at just $22, proving great Chardonnay doesn't need oak.",
  },
  {
    id: "ch-reserve-chard-2022",
    name: "Chehalem Estate Reserve Chardonnay 2022",
    grape: "Chardonnay",
    vineyard: "Stoller",
    vintage: "2022",
    difficulty: 3,
    clues: [
      "Golden pear, brioche, toasted hazelnut, and a rich, layered complexity on the nose.",
      "Full-bodied with barrel-fermented richness balanced by bright acidity. Burgundian in style.",
      "Dundee Hills fruit from Jory volcanic soil — the warmth gives concentration, the elevation gives freshness.",
      "The polar opposite of this winery's famous unoaked Chardonnay — full barrel treatment.",
      "Chehalem Estate Reserve Chardonnay — barrel-fermented Dundee Hills Chardonnay. ~$45.",
    ],
    explanation:
      "The Estate Reserve Chardonnay is the other end of Chehalem's Chardonnay spectrum — barrel-fermented Dundee Hills fruit from Stoller Vineyard, offering the richness and complexity that INOX intentionally avoids.",
  },

  /* ── Other varietals ──────────────────────────────── */
  {
    id: "ch-gamay-noir-2023",
    name: "Chehalem Ridgecrest Gamay Noir 2023",
    grape: "Gamay Noir",
    vineyard: "Ridgecrest",
    vintage: "2023",
    difficulty: 3,
    clues: [
      "Juicy, vibrant — bursting with fresh red berries, violet, and a peppery lift.",
      "Light-bodied with bright, crunchy acidity and barely-there tannins. Beaujolais energy in Oregon.",
      "Grown on Wellsdale loam in the Ribbon Ridge AVA — the same vineyard that launched the appellation.",
      "An unusual variety for Oregon — this grape is far more associated with Beaujolais in France.",
      "Chehalem Ridgecrest Gamay Noir — Ribbon Ridge AVA. One of very few Oregon Gamay producers.",
    ],
    explanation:
      "Chehalem is one of the rare Oregon producers of Gamay Noir, growing it alongside Pinot Noir at Ridgecrest Vineyard in the Ribbon Ridge AVA. The Wellsdale loam and cool microclimate produce a vibrant, Beaujolais-inspired wine.",
  },
  {
    id: "ch-riesling-2023",
    name: "Chehalem Corral Creek Riesling 2023",
    grape: "Riesling",
    vineyard: "Corral Creek",
    vintage: "2023",
    difficulty: 3,
    clues: [
      "Bright lime, white peach, and petrol hints with a floral, aromatic nose.",
      "Off-dry to dry with racy acidity and mineral tension. A taut, linear style.",
      "Grown on Laurelwood soil in the Chehalem Mountains AVA at 200-450 feet elevation.",
      "This grape thrives in cooler vineyard sites — and the lower elevations of this vineyard provide the perfect conditions.",
      "Chehalem Corral Creek Riesling — Chehalem Mountains AVA. One of Oregon's benchmark dry Rieslings.",
    ],
    explanation:
      "Corral Creek Vineyard in the Chehalem Mountains AVA provides the cool-climate conditions that Riesling demands. The Laurelwood soil contributes mineral tension to what is one of Oregon's finest dry Rieslings.",
  },
];
