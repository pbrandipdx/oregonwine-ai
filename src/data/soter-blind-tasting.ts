/**
 * Soter Vineyards Blind Tasting wine pool.
 * 10 Soter wines with 5 progressive clue layers each.
 *
 * Clue layers:
 *   1. Sensory Snapshot  - color, aromas, first impression
 *   2. Structure          - body, acidity, tannin, texture
 *   3. Terroir            - soil, elevation, climate cues
 *   4. Vineyard Hint      - clue about which vineyard
 *   5. Final Tell         - the giveaway detail
 */

export type STGrape = "Pinot Noir" | "Chardonnay" | "Brut Rosé";

export type STVineyard =
  | "Mineral Springs Ranch"
  | "North Valley"
  | "Planet Oregon"
  | "Soter Estate";

export type STVintage = "2020" | "2021" | "2022" | "2023";

export interface STBlindTastingWine {
  id: string;
  name: string;
  grape: STGrape;
  vineyard: STVineyard;
  vintage: STVintage;
  difficulty: 1 | 2 | 3 | 4;
  clues: [string, string, string, string, string];
  explanation: string;
}

export const ST_GRAPE_OPTIONS: STGrape[] = ["Pinot Noir", "Chardonnay", "Brut Rosé"];

export const ST_VINEYARD_OPTIONS: STVineyard[] = [
  "Mineral Springs Ranch",
  "North Valley",
  "Planet Oregon",
  "Soter Estate",
];

export const ST_VINTAGE_OPTIONS: STVintage[] = ["2020", "2021", "2022", "2023"];

export const ST_WINES: STBlindTastingWine[] = [
  /* ── Pinot Noir ───────────────────────────────────── */
  {
    id: "st-nv-pn-2022",
    name: "Soter North Valley Pinot Noir 2022",
    grape: "Pinot Noir",
    vineyard: "North Valley",
    vintage: "2022",
    difficulty: 1,
    clues: [
      "Bright ruby with a luminous edge. Cherry, raspberry, and a whisper of baking spice fill the glass with immediate charm.",
      "Medium-bodied with silky tannins and vibrant acidity. The palate is clean, fruit-forward, and refreshingly approachable.",
      "A multi-vineyard blend from the northern Willamette Valley — Yamhill-Carlton and surrounding AVAs. Cool-climate elegance throughout.",
      "This is the winery's introductory Pinot Noir — a blend designed to showcase the region rather than a single site.",
      "North Valley Pinot Noir — Soter's most widely available red. An accessible gateway to one of Oregon's premier biodynamic estates.",
    ],
    explanation:
      "North Valley is Soter's entry-level Pinot Noir, blending fruit from across the northern Willamette Valley into an approachable, fruit-forward wine that introduces the estate's biodynamic philosophy.",
  },
  {
    id: "st-msr-pn-2021",
    name: "Soter Mineral Springs Ranch Pinot Noir 2021",
    grape: "Pinot Noir",
    vineyard: "Mineral Springs Ranch",
    vintage: "2021",
    difficulty: 2,
    clues: [
      "Medium ruby with garnet tones. Dark cherry, dried herbs, forest floor, and a thread of iron minerality emerge with patience.",
      "Medium-to-full body with structured, fine-grained tannins and a persistent, savory finish. The wine has weight but not heaviness.",
      "Grown on marine sedimentary soils in the Yamhill-Carlton AVA, where ancient seabed deposits contribute a distinctive mineral signature.",
      "This vineyard is a certified biodynamic estate perched on mineral-rich hillsides with natural springs — hence the name.",
      "Mineral Springs Ranch — Soter's flagship estate vineyard in Carlton. Biodynamic since the beginning, named for the springs that feed the property.",
    ],
    explanation:
      "The Mineral Springs Ranch Pinot Noir is the heart of Soter Vineyards. Grown on biodynamic marine sedimentary soils in the Yamhill-Carlton AVA, this estate wine delivers structured, earthy complexity with a mineral depth unique to the property.",
  },
  {
    id: "st-msr-pn-2020",
    name: "Soter Mineral Springs Ranch Pinot Noir 2020",
    grape: "Pinot Noir",
    vineyard: "Mineral Springs Ranch",
    vintage: "2020",
    difficulty: 3,
    clues: [
      "Deep garnet with a brown-tinged rim. Dried cherry, tobacco, leather, and dried violet — a wine that has started its evolution.",
      "Medium-bodied with resolved, velvety tannins and integrated acidity. The finish is long, earthy, and shows tertiary development.",
      "The 2020 vintage in Oregon was marked by unprecedented heat and the September wildfire smoke events. Careful sorting was essential.",
      "This is a library vintage from the biodynamic estate — a wine that shows how well these marine sedimentary soils age.",
      "Mineral Springs Ranch 2020 — a vintage shaped by extreme heat and smoke. The estate's meticulous farming produced wines of surprising elegance despite the challenges.",
    ],
    explanation:
      "The 2020 Mineral Springs Ranch Pinot Noir is a testament to biodynamic farming's resilience. Despite the heat and smoke challenges of the vintage, careful vineyard management and selective harvesting produced a wine of remarkable depth and aging potential.",
  },
  {
    id: "st-planet-pn-2022",
    name: "Soter Planet Oregon Pinot Noir 2022",
    grape: "Pinot Noir",
    vineyard: "Planet Oregon",
    vintage: "2022",
    difficulty: 1,
    clues: [
      "Bright crimson with purple tints. Juicy red fruit, cranberry, and a hint of spice make this immediately appealing.",
      "Light-to-medium body with soft tannins and bright, refreshing acidity. An easy-drinking, food-friendly style.",
      "Sourced from certified organic and biodynamic vineyards across Oregon. The emphasis is on purity and sustainability.",
      "This wine's name reflects a commitment to organic viticulture on a planetary scale — it's the winery's most affordable bottling.",
      "Planet Oregon — Soter's value-driven, sustainably farmed Pinot Noir. Certified organic, widely distributed, and priced for everyday enjoyment.",
    ],
    explanation:
      "Planet Oregon is Soter's most accessible wine — a certified organic Pinot Noir sourced from sustainably farmed vineyards across the state. It brings biodynamic philosophy to a broader audience at an everyday price point.",
  },
  {
    id: "st-estate-pn-2021",
    name: "Soter Estate Pinot Noir 2021",
    grape: "Pinot Noir",
    vineyard: "Soter Estate",
    vintage: "2021",
    difficulty: 3,
    clues: [
      "Deep ruby with a violet rim. Blackberry, plum, star anise, and a distinctive stony minerality with notes of wet earth.",
      "Full-bodied for Pinot Noir, with structured tannins and a deeply concentrated palate. The finish is long and layered.",
      "From select blocks of the biodynamic estate vineyard — the richest, most concentrated lots set aside for the top wine.",
      "This is the winery's reserve-level Pinot Noir, made only from the finest lots of the estate vineyard in exceptional vintages.",
      "Soter Estate Pinot Noir — a barrel selection of the best blocks from Mineral Springs Ranch. The pinnacle of the portfolio.",
    ],
    explanation:
      "The Estate Pinot Noir represents the peak of Soter's Pinot Noir production — a barrel selection from the finest blocks of Mineral Springs Ranch. It showcases the concentration and complexity that biodynamic farming at its best can achieve.",
  },
  {
    id: "st-nv-pn-2023",
    name: "Soter North Valley Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "North Valley",
    vintage: "2023",
    difficulty: 1,
    clues: [
      "Vivid ruby with a youthful shimmer. Strawberry, red plum, and a lively floral lift of violet and sweet herbs.",
      "Light-to-medium body with bright acidity and soft, inviting tannins. Fresh and immediately drinkable.",
      "The 2023 vintage in Oregon brought ideal growing conditions — warm days, cool nights, and a long, gentle harvest.",
      "A multi-vineyard blend from the northern Willamette Valley, this is the winery's introductory Pinot Noir.",
      "The 2023 North Valley — Soter's latest release of their most popular Pinot Noir. A vintage that showcases Oregon at its best.",
    ],
    explanation:
      "The 2023 North Valley Pinot Noir benefits from one of Oregon's finest recent vintages. Ideal growing conditions produced a wine with exceptional freshness, vibrant fruit, and the elegant structure that defines Soter's house style.",
  },

  /* ── Sparkling ───────────────────────────────────── */
  {
    id: "st-brut-rose-2021",
    name: "Soter Brut Rosé 2021",
    grape: "Brut Rosé",
    vineyard: "Mineral Springs Ranch",
    vintage: "2021",
    difficulty: 2,
    clues: [
      "Salmon-copper with a persistent, fine mousse. Wild strawberry, white peach, brioche, and a hint of pink grapefruit.",
      "Dry, crisp, and elegant with razor-sharp acidity and a creamy mid-palate from extended lees aging. Tiny, persistent bubbles.",
      "Made from estate-grown Pinot Noir on biodynamic marine sedimentary soils. Traditional method with extended time on the lees.",
      "This sparkling wine is made at the same estate that produces one of Oregon's most celebrated Pinot Noir programs.",
      "Soter Brut Rosé — traditional method sparkling from Mineral Springs Ranch. Tony Soter's sparkling program has become a cult favorite.",
    ],
    explanation:
      "Soter's Brut Rosé is made from estate Pinot Noir at Mineral Springs Ranch using the traditional method. Extended lees aging creates a sparkling wine of remarkable depth and finesse that has earned a devoted following.",
  },
  {
    id: "st-brut-rose-2020",
    name: "Soter Brut Rosé 2020",
    grape: "Brut Rosé",
    vineyard: "Mineral Springs Ranch",
    vintage: "2020",
    difficulty: 3,
    clues: [
      "Deep salmon with copper glints and a fine, persistent mousse. Dried raspberry, toasted almond, honey, and a chalky minerality.",
      "Full-bodied for sparkling with generous mousse and balanced acidity. The extended lees aging shows in the creamy, biscuity mid-palate.",
      "The 2020 vintage's warmer conditions produced a richer, more full-bodied base wine for this traditional method sparkling.",
      "Made from biodynamic Pinot Noir grown on marine sedimentary soils with natural springs — the estate's signature mineral character comes through even in sparkling form.",
      "Soter Brut Rosé 2020 — a library vintage of the estate sparkling. Riper and richer than typical, shaped by the warm vintage.",
    ],
    explanation:
      "The 2020 Brut Rosé showcases how vintage character translates into sparkling wine. The warmer conditions produced a richer, more opulent base wine, while extended lees aging added complexity and a creamy, biscuity character.",
  },

  /* ── Chardonnay ───────────────────────────────────── */
  {
    id: "st-msr-chard-2022",
    name: "Soter Mineral Springs Ranch Chardonnay 2022",
    grape: "Chardonnay",
    vineyard: "Mineral Springs Ranch",
    vintage: "2022",
    difficulty: 2,
    clues: [
      "Pale gold with green glints. Meyer lemon, white nectarine, wet stone, and a subtle note of toasted hazelnut.",
      "Medium-bodied with bright acidity and a creamy texture from judicious oak and lees stirring. The mineral finish is long and stony.",
      "Estate-grown on biodynamic marine sedimentary soils in the Yamhill-Carlton AVA. The ancient seabed deposits contribute a distinctive chalky minerality.",
      "This Chardonnay comes from the same biodynamic ranch that produces the winery's flagship Pinot Noir.",
      "Mineral Springs Ranch Chardonnay — Soter's only white wine, grown on the biodynamic estate alongside their celebrated Pinot Noir.",
    ],
    explanation:
      "The Mineral Springs Ranch Chardonnay is Soter's sole white wine offering, grown on the same biodynamic marine sedimentary soils as their flagship Pinot Noir. The result is a Chardonnay of remarkable mineral purity and restrained elegance.",
  },
  {
    id: "st-msr-chard-2021",
    name: "Soter Mineral Springs Ranch Chardonnay 2021",
    grape: "Chardonnay",
    vineyard: "Mineral Springs Ranch",
    vintage: "2021",
    difficulty: 3,
    clues: [
      "Medium gold with warm highlights. Ripe pear, lemon curd, honeysuckle, and a pronounced stony minerality with hints of toasted brioche.",
      "Medium-to-full body with balanced acidity and a rich, layered palate. The oak is present but integrated, adding structure rather than flavor.",
      "The 2021 vintage in Oregon was warm and dry, producing Chardonnay with riper fruit and lower acidity than typical — but the estate's marine soils maintain freshness.",
      "Biodynamic estate Chardonnay from the Yamhill-Carlton AVA. The marine sedimentary terroir is the common thread across all wines from this property.",
      "Mineral Springs Ranch Chardonnay 2021 — a riper expression from a warmer vintage, with the estate's signature mineral backbone keeping things in balance.",
    ],
    explanation:
      "The 2021 Mineral Springs Ranch Chardonnay shows the vintage's warmer character — riper fruit, richer body — while the estate's marine sedimentary soils provide the mineral freshness and structure that keeps the wine elegant and balanced.",
  },
];
