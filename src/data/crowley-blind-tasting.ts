/**
 * Crowley Wines Blind Tasting wine pool.
 * 10 Crowley wines with 5 progressive clue layers each.
 *
 * Clue layers:
 *   1. Sensory Snapshot  - color, aromas, first impression
 *   2. Structure          - body, acidity, tannin, texture
 *   3. Terroir            - soil, elevation, climate cues
 *   4. Vineyard Hint      - clue about which vineyard
 *   5. Final Tell         - the giveaway detail
 */

export type CWGrape = "Pinot Noir" | "Chardonnay";

export type CWVineyard =
  | "Four Winds"
  | "La Colina"
  | "Sojeau"
  | "Tukwilla"
  | "Willamette Valley";

export type CWVintage = "2022" | "2023" | "2024";

export interface CWBlindTastingWine {
  id: string;
  name: string;
  grape: CWGrape;
  vineyard: CWVineyard;
  vintage: CWVintage;
  difficulty: 1 | 2 | 3 | 4;
  clues: [string, string, string, string, string];
  explanation: string;
}

export const CW_GRAPE_OPTIONS: CWGrape[] = ["Pinot Noir", "Chardonnay"];

export const CW_VINEYARD_OPTIONS: CWVineyard[] = [
  "Four Winds",
  "La Colina",
  "Sojeau",
  "Tukwilla",
  "Willamette Valley",
];

export const CW_VINTAGE_OPTIONS: CWVintage[] = ["2022", "2023", "2024"];

export const CW_WINES: CWBlindTastingWine[] = [
  /* ── Pinot Noir ───────────────────────────────────── */
  {
    id: "cw-wv-pn-2023",
    name: "Crowley Willamette Valley Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "Willamette Valley",
    vintage: "2023",
    difficulty: 1,
    clues: [
      "Bright ruby with a translucent edge. Red berries, fresh strawberry, and a lift of sweet basil and pomegranate fill the glass.",
      "Medium-bodied with a smooth, silky texture and gentle tannins. The finish is clean and fruit-forward with soft acidity.",
      "A multi-vineyard blend drawing from La Colina, Tukwilla, Four Winds, and Sojeau — spanning three AVAs across the Willamette Valley.",
      "This is the entry point for a tiny ~3,000 case winery that works out of a cooperative in Newberg.",
      "The label reads 'Willamette Valley' with no single-vineyard designation. It's Crowley's most approachable and widely available red.",
    ],
    explanation:
      "The Willamette Valley Pinot Noir is Crowley's gateway bottling, blending fruit from four vineyards across McMinnville, Dundee Hills, and Eola-Amity Hills into a pure, joyful expression of the region.",
  },
  {
    id: "cw-entre-nous-pn-2022",
    name: "Crowley Entre Nous Pinot Noir 2022",
    grape: "Pinot Noir",
    vineyard: "Four Winds",
    vintage: "2022",
    difficulty: 2,
    clues: [
      "Transparent ruby with unusual clarity. Resinous flint, cacao powder, strawberry, and mandarin orange emerge from the glass with a hint of maple candy.",
      "Medium-bodied with fine, resolved tannins and a persistent, layered finish. There is a density here that belies the light color.",
      "Sourced from Four Winds Vineyard in the McMinnville AVA. Volcanic soils at elevation contribute both structure and aromatic lift.",
      "This wine spent time in 50% new oak and was bottled unfined and unfiltered — a barrel selection of the best lots.",
      "'Entre Nous' means 'between us' in French. This is Crowley's special barrel selection, made only in the best vintages.",
    ],
    explanation:
      "Entre Nous is Crowley's barrel-selection Pinot Noir, bottled unfined and unfiltered from the finest lots of Four Winds fruit. The 50% new oak and careful selection produce a wine of uncommon depth and texture.",
  },
  {
    id: "cw-four-winds-pn-2023",
    name: "Crowley Four Winds Vineyard Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "Four Winds",
    vintage: "2023",
    difficulty: 2,
    clues: [
      "Medium ruby with garnet tones. Bordeaux cherry, blood orange, anise seed, and rosemary on the nose, with layers of blueberry and morel mushroom beneath.",
      "Medium-to-full body with structured tannins and bright, driving acidity. The palate has a savory, almost herbal quality.",
      "Grown at 800+ feet elevation on volcanic soils in the McMinnville AVA, where the Coast Range influence keeps nights cool.",
      "This vineyard is where Crowley makes the majority of their wines — both Pinot Noir and Chardonnay — their home base in the hills.",
      "Named for the winds that sweep the McMinnville foothills from four directions. Crowley's anchor vineyard at high elevation.",
    ],
    explanation:
      "Four Winds Vineyard is Crowley's home base in the McMinnville AVA. At 800+ feet elevation on volcanic soils, it produces Pinot Noir with savory depth, herbal complexity, and the structured tannins of mountain fruit.",
  },
  {
    id: "cw-la-colina-pn-2023",
    name: "Crowley La Colina Vineyard Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "La Colina",
    vintage: "2023",
    difficulty: 3,
    clues: [
      "Medium ruby with a warm, inviting hue. Maple candy, ripe raspberry, and currant mingle with dried hibiscus and a thread of graphite.",
      "Medium-bodied with polished tannins and juicy acidity. The wine is generous and round, with a long finish that hints at dark minerals.",
      "Dundee Hills at 600 feet elevation on deep Jory volcanic clay. The iron-rich red soils contribute a distinctive mineral signature.",
      "This vineyard was planted in 1999 and sits in the heart of Oregon's most famous Pinot Noir appellation.",
      "'La Colina' means 'The Hill' in Spanish. A Dundee Hills vineyard on Jory soil — classic Oregon terroir planted at the turn of the millennium.",
    ],
    explanation:
      "La Colina Vineyard in the Dundee Hills produces Crowley's most generous, fruit-forward single-vineyard Pinot Noir. The 1999 plantings on Jory volcanic clay at 600 feet deliver warmth, depth, and a signature graphite minerality.",
  },
  {
    id: "cw-sojeau-pn-2023",
    name: "Crowley Sojeau Vineyard Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "Sojeau",
    vintage: "2023",
    difficulty: 3,
    clues: [
      "Deep ruby with a violet rim. Black cherry, sarsaparilla, and pink peppercorn lead, with sage and pine needle emerging as the wine opens.",
      "Medium-bodied with taut, angular tannins and electric acidity. The palate is linear and wind-swept, with a long, saline finish.",
      "Eola-Amity Hills, where the Van Duzer Corridor funnels cool Pacific air directly into the vineyard each afternoon. Rocky Nekia volcanic soils.",
      "The name of this vineyard is French in origin. It sits in the windiest part of the Willamette Valley.",
      "Sojeau Vineyard in the Eola-Amity Hills — where the Van Duzer winds sculpt the fruit into Crowley's most dramatic, savory Pinot Noir.",
    ],
    explanation:
      "Sojeau Vineyard sits in the Eola-Amity Hills where the Van Duzer Corridor channels cool ocean air. The rocky Nekia volcanic soils and relentless wind produce a Pinot Noir of angular structure, savory depth, and electric acidity.",
  },
  {
    id: "cw-tukwilla-pn-2023",
    name: "Crowley Tukwilla Vineyard Pinot Noir 2023",
    grape: "Pinot Noir",
    vineyard: "Tukwilla",
    vintage: "2023",
    difficulty: 2,
    clues: [
      "Pale to medium ruby with exceptional transparency. Delicate red fruit, wild strawberry, and a subtle floral perfume of dried rose and tea leaf.",
      "Light-to-medium body with ethereal, gossamer tannins and a bright, lifting acidity. Elegance over power.",
      "Dundee Hills on volcanic soils. The vineyard is farmed organically and dry-farmed, with old vines planted in 1994.",
      "This vineyard is nestled directly below one of Oregon's most legendary estates — the first to plant Pinot Noir in the Dundee Hills.",
      "Tukwilla sits just below Eyrie Vineyards in the Dundee Hills. Organic, dry-farmed, planted 1994 — old vines making ethereal wine.",
    ],
    explanation:
      "Tukwilla Vineyard in the Dundee Hills is nestled below the legendary Eyrie Vineyards. Organic, dry-farmed vines planted in 1994 produce an elegant, light-bodied Pinot Noir of remarkable transparency and finesse.",
  },

  /* ── Chardonnay ───────────────────────────────────── */
  {
    id: "cw-wv-chard-2024",
    name: "Crowley Willamette Valley Chardonnay 2024",
    grape: "Chardonnay",
    vineyard: "Four Winds",
    vintage: "2024",
    difficulty: 1,
    clues: [
      "Pale straw with green glints. A Chablis-like buoyancy carries aromas of dusty peach, lavender, and fresh lime.",
      "Light-to-medium body with steely, mineral-driven acidity and zero oak influence. Lean, focused, and refreshing at just 12.5% alcohol.",
      "Sourced from Four Winds Vineyard in the McMinnville AVA at high elevation, where cool nights preserve natural acidity.",
      "No new oak was used in making this wine — the goal is transparency and mineral expression above all.",
      "Crowley's entry-level Chardonnay, fermented with no new oak at just 12.5% alcohol. More Chablis than California.",
    ],
    explanation:
      "The 2024 Willamette Valley Chardonnay is Crowley at their most restrained. No new oak, 12.5% alcohol, and pure mineral expression from Four Winds Vineyard create a Chardonnay closer to Chablis than anything else in Oregon.",
  },
  {
    id: "cw-wv-chard-2023",
    name: "Crowley Willamette Valley Chardonnay 2023",
    grape: "Chardonnay",
    vineyard: "Four Winds",
    vintage: "2023",
    difficulty: 2,
    clues: [
      "Sparkling clarity with a pale gold hue. Morning mist, honeydew melon, and chalky vitamins on the nose, with kiwi and lemon beneath.",
      "Medium-bodied with bright acidity and a subtle creaminess from lees aging. The oak is present but restrained.",
      "Four Winds Vineyard in the McMinnville AVA. The high elevation and volcanic soils contribute a stony, mineral backbone.",
      "This vintage saw 20% new wood — a step up from the zero-oak approach of the entry-level bottling.",
      "Crowley's 2023 Willamette Valley Chardonnay with 20% new oak. The middle ground between austerity and richness.",
    ],
    explanation:
      "The 2023 Willamette Valley Chardonnay bridges Crowley's lean house style with a touch of oak complexity. The 20% new wood adds subtle creaminess while the Four Winds fruit maintains its hallmark mineral clarity.",
  },
  {
    id: "cw-phoebe-chard-2023",
    name: "Crowley Phoebe Chardonnay 2023",
    grape: "Chardonnay",
    vineyard: "Four Winds",
    vintage: "2023",
    difficulty: 4,
    clues: [
      "Sunshine yellow with golden highlights. Lemon custard, vanilla seed, dried apricot, honeycomb, and gingersnap create a rich, layered bouquet.",
      "Full-bodied with creamy texture from 18 months on lees. The oak is more prominent here — generous but integrated. Acidity keeps everything in balance.",
      "Wente clone Chardonnay from Four Winds Vineyard — a heritage clone known for its opulence and aromatic intensity.",
      "Named for one of the winemaker's grandmothers. This is Crowley's most richly styled white, with 40% new oak and 97 points from Decanter.",
      "Phoebe Chardonnay — named for Tyson Crowley's grandmother. Wente clone, 40% new oak, 18 months on lees. 97 points Decanter.",
    ],
    explanation:
      "Phoebe is Crowley's most lavish Chardonnay, named for winemaker Tyson Crowley's grandmother. The Wente clone from Four Winds, aged 18 months on lees in 40% new oak, produces a rich, golden wine that earned 97 points from Decanter.",
  },
  {
    id: "cw-helen-chard-2023",
    name: "Crowley Helen Chardonnay 2023",
    grape: "Chardonnay",
    vineyard: "Four Winds",
    vintage: "2023",
    difficulty: 4,
    clues: [
      "Pale green-gold with silvery edges. Green pear, salty grapefruit, lime zest, sea shell, and camomile tea — precise and mineral-driven.",
      "Medium-bodied with razor-sharp acidity and a taut, linear palate. The wine is picked early and pressed green for maximum freshness and tension.",
      "Draper clone Chardonnay from Four Winds Vineyard — a leaner, more austere clone than its sibling bottling.",
      "Named for the other grandmother. This wine is the polar opposite of its sibling — taut where the other is generous. 96 points Decanter.",
      "Helen Chardonnay — named for Tyson Crowley's other grandmother. Draper clone, picked early and pressed green. 96 points Decanter.",
    ],
    explanation:
      "Helen is the yin to Phoebe's yang — named for Tyson Crowley's other grandmother and made from the leaner Draper clone. Picked early and pressed green, it delivers a taut, mineral Chardonnay of remarkable precision. 96 points from Decanter.",
  },
];
