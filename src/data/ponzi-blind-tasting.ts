/**
 * Ponzi Vineyards Blind Tasting wine pool.
 * 10 Ponzi wines with 5 progressive clue layers each.
 *
 * Clue layers:
 *   1. Sensory Snapshot  - color, aromas, first impression
 *   2. Structure          - body, acidity, tannin, texture
 *   3. Terroir            - soil, elevation, climate cues
 *   4. Vineyard Hint      - clue about which vineyard
 *   5. Final Tell         - the giveaway detail
 */

export type PZGrape = "Pinot Noir" | "Chardonnay" | "Pinot Gris";

export type PZVineyard =
  | "Aurora"
  | "Avellana"
  | "Abetina"
  | "Madrona"
  | "Laurelwood District"
  | "Willamette Valley";

export type PZVintage = "2022" | "2023";

export interface PZBlindTastingWine {
  id: string;
  name: string;
  grape: PZGrape;
  vineyard: PZVineyard;
  vintage: PZVintage;
  difficulty: 1 | 2 | 3 | 4;
  clues: [string, string, string, string, string];
  explanation: string;
}

export const PZ_GRAPE_OPTIONS: PZGrape[] = ["Pinot Noir", "Chardonnay", "Pinot Gris"];

export const PZ_VINEYARD_OPTIONS: PZVineyard[] = [
  "Aurora",
  "Avellana",
  "Abetina",
  "Madrona",
  "Laurelwood District",
  "Willamette Valley",
];

export const PZ_VINTAGE_OPTIONS: PZVintage[] = ["2022", "2023"];

export const PZ_WINES: PZBlindTastingWine[] = [
  /* ── Pinot Noir ───────────────────────────────────── */
  {
    id: "pz-tavola-pn-2023",
    name: "Ponzi Tavola Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "Willamette Valley",
    vintage: "2023",
    difficulty: 1,
    clues: [
      "Forward medium-bodied red fruits, salty soil, and red licorice fill the glass with approachable charm.",
      "Approachable with gentle tannins and a fruit-forward finish. Easy-drinking but not simple.",
      "A multi-vineyard Willamette Valley blend from across the Laurelwood District estate vineyards.",
      "This is the entry-level wine from a historic winery founded in 1970 — one of Oregon's original pioneers.",
      "'Tavola' means table in Italian — Ponzi's most approachable wine at ~$30, designed for everyday enjoyment.",
    ],
    explanation:
      "Tavola is Ponzi's entry point — an approachable multi-vineyard blend that captures the breadth of their Laurelwood District estate.",
  },
  {
    id: "pz-laurelwood-pn-2023",
    name: "Ponzi Laurelwood District Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "Laurelwood District",
    vintage: "2023",
    difficulty: 2,
    clues: [
      "Cran-pomegranate, Bing cherry, and salted orange zest create an inviting, layered nose.",
      "Elegant and terroir-driven with mid-weight body. Silky tannins and bright acidity frame the fruit.",
      "Grown on Laurelwood soil — ancient loess deposited over basalt bedrock in the Chehalem Mountains.",
      "This is the flagship estate blend, drawing from multiple vineyards within the Laurelwood District AVA.",
      "Ponzi Laurelwood District Pinot Noir — the estate flagship. 92 points Bargreen.",
    ],
    explanation:
      "The Laurelwood District Pinot Noir is Ponzi's flagship estate expression — a blend of their finest vineyards on the distinctive Laurelwood soil.",
  },
  {
    id: "pz-reserve-pn-2022",
    name: "Ponzi Reserve Pinot Noir 2022",
    grape: "Pinot Noir",
    vineyard: "Laurelwood District",
    vintage: "2022",
    difficulty: 3,
    clues: [
      "Dense red fruits, Mandarin orange zest, and salty soil aromatics with impressive concentration.",
      "Beautiful texture with complex layers. Age-worthy structure with fine-grained tannins and a long finish.",
      "The best barrels selected from Aurora, Abetina, Madrona, and Avellana vineyards.",
      "This winery was acquired by Champagne Bollinger in 2021, joining a family of iconic French houses.",
      "Ponzi Reserve Pinot Noir — best barrels from four premier vineyards. 93 points Bargreen.",
    ],
    explanation:
      "The Reserve represents the best barrels from Ponzi's four premier vineyards — complex, age-worthy, and a benchmark for the Laurelwood District.",
  },
  {
    id: "pz-avellana-pn-2023",
    name: "Ponzi Avellana Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "Avellana",
    vintage: "2023",
    difficulty: 3,
    clues: [
      "Copious minerals, blood orange zest, tobacco leaf, and cranberry rise from the glass with intensity.",
      "Structured with remarkable depth. Fine tannins and persistent length suggest serious aging potential.",
      "A hillside vineyard with panoramic views, planted on Laurelwood soil in the Chehalem Mountains.",
      "This vineyard uses the 'clonal-massale' technique pioneered by Luisa Ponzi.",
      "Ponzi Avellana Pinot Noir — named for the hazelnut orchard that once stood here. 95 points Bargreen.",
    ],
    explanation:
      "The Avellana Pinot Noir showcases the vineyard's hillside exposure and Laurelwood soil with mineral intensity and aromatic complexity.",
  },
  {
    id: "pz-aurora-pn-2023",
    name: "Ponzi Aurora Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "Aurora",
    vintage: "2023",
    difficulty: 3,
    clues: [
      "Orange peel, forest floor, exotic spices, and black plum create a complex, layered bouquet.",
      "Complex with layered aromatics and a broad, textured palate. Savory and spice-driven.",
      "An 80-acre vineyard planted in 1991 with multiple clonal and rootstock trials on Laurelwood soil.",
      "The largest and most experimental of this estate's vineyards — a living laboratory of viticulture.",
      "Ponzi Aurora Pinot Noir — 80 acres of clonal trials planted 1991. 95 points Bargreen.",
    ],
    explanation:
      "Aurora is Ponzi's largest vineyard at 80 acres, planted in 1991 with extensive clonal and rootstock trials that make it a living laboratory of Willamette Valley viticulture.",
  },
  {
    id: "pz-abetina-pn-2023",
    name: "Ponzi Abetina Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "Abetina",
    vintage: "2023",
    difficulty: 4,
    clues: [
      "Red rose petals, potpourri, salty soils, and red raspberry compote — intensely perfumed and layered.",
      "Intense yet elegant with profound nuance. Gossamer tannins and lifting acidity create an ethereal texture.",
      "A 2-acre vineyard planted in 1975, own-rooted, with 22 Pinot Noir clones on Laurelwood soil.",
      "Part of the original Oregon Clonal Test — the oldest vineyard in this estate. Approximately 150 cases produced.",
      "Ponzi Abetina Pinot Noir — 2 acres, own-rooted, 22 clones from 1975. 95 points Bargreen, ~150 cases.",
    ],
    explanation:
      "Abetina is Ponzi's most hallowed ground — just 2 acres of own-rooted vines planted in 1975 with 22 Pinot Noir clones from the original Oregon Clonal Test. Approximately 150 cases produced.",
  },
  {
    id: "pz-madrona-pn-2023",
    name: "Ponzi Madrona Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "Madrona",
    vintage: "2023",
    difficulty: 4,
    clues: [
      "Bright red fruits, kumquat rind, and salty soil nuances create a vibrant, lifted aromatic profile.",
      "Focused and precise with lifting acidity. The palate is taut and linear with a long, mineral finish.",
      "A 10-acre vineyard planted in 1985 on Laurelwood soil in the Chehalem Mountains.",
      "Named for the red-barked Madrone trees native to this hillside — one of the estate's oldest sites.",
      "Ponzi Madrona Pinot Noir — 10 acres of heritage vines from 1985. 95 points Bargreen.",
    ],
    explanation:
      "Madrona takes its name from the native red-barked Madrone trees on this 10-acre hillside. Planted in 1985, it's one of Ponzi's oldest and most expressive vineyard sites.",
  },

  /* ── Chardonnay ───────────────────────────────────── */
  {
    id: "pz-laurelwood-ch-2023",
    name: "Ponzi Laurelwood District Chardonnay 2023",
    grape: "Chardonnay",
    vineyard: "Laurelwood District",
    vintage: "2023",
    difficulty: 2,
    clues: [
      "Melon, orange rind, starfruit, and brioche on the nose — generous yet restrained.",
      "Smooth and barrel-fermented in steam-bent oak. A seamless texture between California richness and Burgundy restraint.",
      "A blend of Avellana, Aurora, and Paloma vineyards on Laurelwood soil.",
      "This winery pioneered steam-bent oak fermentation for their white wines — a signature technique.",
      "Ponzi Laurelwood District Chardonnay — three-vineyard blend in steam-bent oak. 92 points Bargreen.",
    ],
    explanation:
      "A blend of three estate vineyards fermented in Ponzi's signature steam-bent oak, this Chardonnay bridges old-world restraint with new-world generosity.",
  },
  {
    id: "pz-avellana-ch-2023",
    name: "Ponzi Avellana Chardonnay 2023",
    grape: "Chardonnay",
    vineyard: "Avellana",
    vintage: "2023",
    difficulty: 3,
    clues: [
      "Dense honeydew melon, poached pear, roasted pineapple, and Key lime — rich and layered.",
      "Rich and layered with focused acidity that keeps the palate fresh despite the concentration.",
      "A 24-acre vineyard planted in 2006 on Laurelwood soil in the Chehalem Mountains.",
      "Named for the hazelnut orchard that once stood here — 'Avellana' is Italian for hazelnut.",
      "Ponzi Avellana Chardonnay — 24 acres planted 2006, former hazelnut orchard. 94 points Bargreen.",
    ],
    explanation:
      "Avellana (Italian for hazelnut) was planted in 2006 on the site of a former hazelnut orchard. The 24-acre vineyard produces Ponzi's most acclaimed Chardonnay.",
  },

  /* ── Pinot Gris ───────────────────────────────────── */
  {
    id: "pz-pinot-gris-2023",
    name: "Ponzi Willamette Valley Pinot Gris 2023",
    grape: "Pinot Gris",
    vineyard: "Willamette Valley",
    vintage: "2023",
    difficulty: 1,
    clues: [
      "Pear, star jasmine, and stony minerals on the nose — aromatic and inviting.",
      "Crisp with serious tension. Bright acidity and a mineral-driven finish that lingers.",
      "Estate fruit from one of Oregon's Pinot Gris pioneers, first planted in 1978.",
      "This winery helped establish Pinot Gris as Oregon's premier white variety alongside Pinot Noir.",
      "Ponzi Willamette Valley Pinot Gris — pioneered in Oregon since 1978. 91 points Bargreen.",
    ],
    explanation:
      "Ponzi helped pioneer Pinot Gris in Oregon, first planting it in 1978. This estate wine shows why the variety thrives in the Willamette Valley.",
  },
];
