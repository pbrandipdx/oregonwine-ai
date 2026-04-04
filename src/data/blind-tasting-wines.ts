/**
 * Wine pool for the Blind Tasting game.
 * 55 archetype wines from the Willamette Valley with 5 progressive clue layers each.
 *
 * Clue layers:
 *   1. Sensory Snapshot  - color, aromas, first impression
 *   2. Structure          - body, acidity, tannin, oak, texture
 *   3. Terroir            - climate, soil, viticulture cues
 *   4. AVA Hint           - geographic / appellation clue
 *   5. Final Tell         - the giveaway detail
 */

export type Grape =
  | "Pinot Noir"
  | "Chardonnay"
  | "Pinot Gris"
  | "Gamay"
  | "Sparkling"
  | "Ros\u00e9"
  | "Syrah"
  | "Cabernet Franc"
  | "Riesling"
  | "Pinot Blanc"
  | "M\u00fcller-Thurgau"
  | "Tempranillo"
  | "Gr\u00fcner Veltliner"
  | "Melon de Bourgogne"
  | "Trousseau"
  | "Trousseau Gris"
  | "White Pinot Noir"
  | "Dessert Wine";

export type AVA =
  | "Willamette Valley"
  | "Dundee Hills"
  | "Eola-Amity Hills"
  | "Ribbon Ridge"
  | "Yamhill-Carlton"
  | "McMinnville"
  | "Chehalem Mountains"
  | "Van Duzer Corridor"
  | "Tualatin Hills"
  | "Lower Long Tom"
  | "Laurelwood District";

export type Style =
  | "Elegant Red"
  | "Structured Red"
  | "Aromatic White"
  | "Rich White"
  | "Ros\u00e9"
  | "Sparkling"
  | "Light Red"
  | "Bold Red"
  | "Crisp White"
  | "Skin-Contact White"
  | "P\u00e9tillant Naturel"
  | "Dessert"
  | "Natural Wine";

export interface BlindTastingWine {
  id: string;
  grape: Grape;
  region: "Willamette Valley";
  ava: AVA;
  style: Style;
  body: "light" | "medium" | "full";
  acidity: "low" | "moderate" | "bright" | "high";
  tannin: "none" | "soft" | "silky" | "fine" | "firm";
  oak: "none" | "light" | "moderate" | "heavy";
  aromas: string[];
  clues: [string, string, string, string, string];
  explanation: string;
  difficulty: 1 | 2 | 3 | 4;
}

export const GRAPE_OPTIONS: Grape[] = [
  "Pinot Noir", "Chardonnay", "Pinot Gris", "Gamay", "Sparkling", "Ros\u00e9",
  "Syrah", "Cabernet Franc", "Riesling", "Pinot Blanc", "M\u00fcller-Thurgau",
  "Tempranillo", "Gr\u00fcner Veltliner", "Melon de Bourgogne", "Trousseau",
  "Trousseau Gris", "White Pinot Noir", "Dessert Wine",
];

export const AVA_OPTIONS: AVA[] = [
  "Willamette Valley", "Dundee Hills", "Eola-Amity Hills", "Ribbon Ridge",
  "Yamhill-Carlton", "McMinnville", "Chehalem Mountains", "Van Duzer Corridor",
  "Tualatin Hills", "Lower Long Tom", "Laurelwood District",
];

export const STYLE_OPTIONS: Style[] = [
  "Elegant Red", "Structured Red", "Aromatic White", "Rich White", "Ros\u00e9",
  "Sparkling", "Light Red", "Bold Red", "Crisp White", "Skin-Contact White",
  "P\u00e9tillant Naturel", "Dessert", "Natural Wine",
];

export const WINES: BlindTastingWine[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // ORIGINAL 20 WINES (unchanged)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── PINOT NOIR: Dundee Hills (Easy) ──
  {
    id: "dundee-pinot-001",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "Dundee Hills",
    style: "Elegant Red",
    body: "medium",
    acidity: "bright",
    tannin: "silky",
    oak: "light",
    aromas: ["red cherry", "raspberry", "rose petal", "forest floor", "cinnamon"],
    clues: [
      "A translucent ruby wine. Red cherry, cranberry, dried rose, and a whisper of cinnamon on the nose.",
      "Light to medium body with bright acidity and silky tannins. The texture is polished, almost satiny.",
      "Cool-climate fruit from volcanic red soil. The vines sit on ancient basalt flows above 500 feet.",
      "This AVA is the spiritual heart of Willamette Valley Pinot Noir \u2014 the first to gain recognition.",
      "Deep red Jory soil. If you\u2019ve ever seen that iron-rich clay stick to your boots, you know this place."
    ],
    explanation: "Dundee Hills is the birthplace of world-class Willamette Valley Pinot Noir. The volcanic Jory soils \u2014 deep, red, iron-rich \u2014 give wines their signature purity of fruit, bright acidity, and silky texture. This is where David Lett planted the first Pinot Noir vines in 1965.",
    difficulty: 1,
  },

  // ── PINOT NOIR: Eola-Amity Hills (Medium) ──
  {
    id: "eola-pinot-001",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "Eola-Amity Hills",
    style: "Structured Red",
    body: "medium",
    acidity: "high",
    tannin: "firm",
    oak: "moderate",
    aromas: ["black cherry", "blackberry", "fresh herbs", "earth", "black pepper"],
    clues: [
      "Dark ruby. Black cherry, blackberry, and a savory thread of fresh herbs and cracked pepper.",
      "Medium body but firm, polished tannins. The acidity is electric \u2014 almost crackling. Built for aging.",
      "Afternoon marine winds funnel through a gap in the Coast Range, dropping temperatures by 30+ degrees.",
      "The AVA sits at the southern end of the valley where volcanic and sedimentary soils collide.",
      "The Van Duzer Corridor. Wines from here have a wind-driven tension and savory structure unlike anything else in the valley."
    ],
    explanation: "Eola-Amity Hills wines are shaped by the Van Duzer Corridor \u2014 a gap in the Coast Range that funnels cool marine air into the vineyards every afternoon. The result is wines with electric acidity, firm tannins, and a savory, structured profile that ages beautifully.",
    difficulty: 2,
  },

  // ── PINOT NOIR: Ribbon Ridge (Medium) ──
  {
    id: "ribbon-pinot-001",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "Ribbon Ridge",
    style: "Structured Red",
    body: "medium",
    acidity: "bright",
    tannin: "fine",
    oak: "moderate",
    aromas: ["dark cherry", "blackberry", "baking spice", "dried herbs", "wet clay"],
    clues: [
      "Medium ruby with a dark core. Dark cherry, blackberry, baking spice, and a dusty, mineral edge.",
      "Medium body with fine-grained tannins and good acidity. Dense but not heavy \u2014 compact and site-driven.",
      "Marine sedimentary soils on a small, protected ridge. The vines are sheltered from the worst weather.",
      "This is one of the smallest AVAs in the Willamette Valley \u2014 a nested sub-region with only a handful of producers.",
      "Willakenzie soil on a compact ridge that was once the floor of an ancient ocean. Only 3.5 miles long."
    ],
    explanation: "Ribbon Ridge is one of the Willamette Valley\u2019s smallest and most distinctive AVAs. The marine sedimentary Willakenzie soils and protected microclimate produce Pinot Noirs that are compact, dense, and finely textured \u2014 wines that reward patience.",
    difficulty: 2,
  },

  // ── PINOT NOIR: Yamhill-Carlton (Medium) ──
  {
    id: "yamhill-pinot-001",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "Yamhill-Carlton",
    style: "Elegant Red",
    body: "medium",
    acidity: "bright",
    tannin: "silky",
    oak: "moderate",
    aromas: ["dark berry", "cola", "baking spice", "violet", "loam"],
    clues: [
      "Medium ruby. Dark berries, cola, warm spice, and a floral lift of violet. The nose is generous.",
      "Medium body with supple tannins. The texture is broader and rounder than many Willamette Pinots.",
      "Ancient ocean-floor soils \u2014 marine sedimentary, not volcanic. The vines root into sandy, silty loam.",
      "This AVA wraps around two small towns north of McMinnville, known for both Pinot and some of the valley\u2019s best restaurants.",
      "Willakenzie and Peavine soils. The wines are darker-fruited and earthier than their volcanic neighbors to the east."
    ],
    explanation: "Yamhill-Carlton sits on ancient marine sedimentary soils that give its Pinot Noirs a distinctly broader, darker-fruited character. The wines tend to be generous and earthy \u2014 cola, spice, and loam alongside dark berry fruit.",
    difficulty: 2,
  },

  // ── PINOT NOIR: McMinnville (Hard) ──
  {
    id: "mcminnville-pinot-001",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "McMinnville",
    style: "Structured Red",
    body: "medium",
    acidity: "bright",
    tannin: "firm",
    oak: "light",
    aromas: ["plum", "dried cherry", "sage", "graphite", "smoked earth"],
    clues: [
      "Deep garnet. Plum, dried cherry, sage, and an unusual mineral note like pencil lead.",
      "Medium body with firm tannins and a long, savory finish. This wine has backbone.",
      "The vineyards face south and east on the foothills of the Coast Range. Ocean influence is strong.",
      "This AVA is less celebrated than its neighbors but produces some of the valley\u2019s most age-worthy wines.",
      "Shallow basalt and marine sedimentary soils on the western edge of the valley. The newest AVA in Willamette."
    ],
    explanation: "McMinnville AVA sits on the western foothills of the Coast Range. Its shallow basalt and marine sedimentary soils, combined with strong ocean influence, produce firm, savory Pinot Noirs with excellent aging potential \u2014 the valley\u2019s best-kept secret.",
    difficulty: 3,
  },

  // ── PINOT NOIR: Chehalem Mountains (Hard) ──
  {
    id: "chehalem-pinot-001",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "Chehalem Mountains",
    style: "Elegant Red",
    body: "medium",
    acidity: "bright",
    tannin: "fine",
    oak: "moderate",
    aromas: ["cherry", "strawberry", "orange peel", "nutmeg", "iron"],
    clues: [
      "Bright ruby. Cherry, ripe strawberry, citrus peel, and a warm note of nutmeg. Aromatic and lifted.",
      "Medium body with fine tannins and vibrant acidity. Elegant but with surprising concentration.",
      "Three different soil types converge here \u2014 volcanic, marine sedimentary, and wind-blown loess. Each vineyard is different.",
      "This AVA is the closest to Portland, stretching across a mountain range with diverse exposures.",
      "Laurelwood loess \u2014 wind-blown silt deposited over basalt during the Ice Age. A soil found nowhere else in the valley."
    ],
    explanation: "The Chehalem Mountains are unique in having three distinct soil types \u2014 volcanic basalt, marine sedimentary, and Laurelwood loess \u2014 sometimes in the same vineyard. This diversity produces Pinot Noirs that range from powerful to delicate, depending on exactly where the vines are planted.",
    difficulty: 3,
  },

  // ── PINOT NOIR: Willamette Valley (Easy) ──
  {
    id: "wv-pinot-001",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Elegant Red",
    body: "medium",
    acidity: "bright",
    tannin: "soft",
    oak: "light",
    aromas: ["red cherry", "cranberry", "tea leaf", "subtle spice", "mushroom"],
    clues: [
      "Translucent ruby. Red cherry, cranberry, tea leaf, and a touch of earthy spice. Classic cool-climate red.",
      "Light to medium body with fresh acidity and soft, integrated tannins. Approachable and food-friendly.",
      "Cool, wet winters and warm, dry summers. Diurnal temperature swings preserve acidity while building flavor.",
      "This is the broadest appellation in the region \u2014 a blend of vineyard sites rather than a single sub-AVA.",
      "A valley-wide cuv\u00e9e showing the region\u2019s signature: bright fruit, fresh acidity, and earthy undertones."
    ],
    explanation: "A Willamette Valley appellation Pinot Noir is typically a blend of fruit from multiple vineyard sites and sub-AVAs. These wines showcase the region\u2019s signature cool-climate character: bright red fruit, fresh acidity, and a gentle earthy complexity.",
    difficulty: 1,
  },

  // ── PINOT NOIR: Expert-level Eola-Amity ──
  {
    id: "eola-pinot-002",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "Eola-Amity Hills",
    style: "Bold Red",
    body: "full",
    acidity: "high",
    tannin: "firm",
    oak: "moderate",
    aromas: ["cassis", "dark plum", "smoked meat", "iron", "wild thyme"],
    clues: [
      "Opaque garnet. Cassis, dark plum, smoked meat, and a ferrous minerality. This is not a delicate wine.",
      "Full body with gripping tannins and searing acidity. Whole-cluster fermentation adds a savory, stemmy spine.",
      "Volcanic basalt soils on steep, wind-battered hillsides. Yields are tiny. Concentration is extreme.",
      "The same corridor of wind that cools these vines also stress them \u2014 small berries, thick skins, intense extraction.",
      "A single-vineyard bottling from the heart of the Van Duzer zone. These wines need a decade in the cellar."
    ],
    explanation: "The most intense expressions of Eola-Amity Hills come from old vines on steep volcanic slopes in the Van Duzer Corridor. Whole-cluster fermentation and tiny yields produce wines of extraordinary concentration \u2014 dark, savory, tannic, and built for decades of aging.",
    difficulty: 4,
  },

  // ── CHARDONNAY: Willamette Valley (Easy) ──
  {
    id: "wv-chard-001",
    grape: "Chardonnay",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Rich White",
    body: "medium",
    acidity: "bright",
    tannin: "none",
    oak: "moderate",
    aromas: ["lemon", "green apple", "pear", "brioche", "wet stone"],
    clues: [
      "Pale gold with green reflections. Lemon, green apple, pear, and a faint toasty note. Bright and precise.",
      "Medium body with firm acidity and a creamy mid-palate. Subtle oak adds texture without masking the fruit.",
      "Cool-climate Chardonnay with more Burgundy than California DNA. Bright, mineral, tensioned.",
      "This grape has been Oregon\u2019s quiet revolution \u2014 plantings have tripled in the last decade.",
      "Dijon clones on volcanic soil. The Willamette Valley is proving it can rival the C\u00f4te de Beaune for this variety."
    ],
    explanation: "Willamette Valley Chardonnay is one of Oregon\u2019s most exciting developments. Cool-climate conditions and Dijon clones produce wines with the tension and mineral drive of white Burgundy \u2014 bright acidity, citrus and stone fruit, with restrained oak influence.",
    difficulty: 1,
  },

  // ── CHARDONNAY: Eola-Amity Hills (Medium) ──
  {
    id: "eola-chard-001",
    grape: "Chardonnay",
    region: "Willamette Valley",
    ava: "Eola-Amity Hills",
    style: "Rich White",
    body: "medium",
    acidity: "high",
    tannin: "none",
    oak: "light",
    aromas: ["citrus zest", "chalk", "white flowers", "saline", "crushed rock"],
    clues: [
      "Bright straw. Citrus zest, white flowers, and a chalky minerality that coats the palate. Taut and electric.",
      "Medium body with piercing acidity and almost no perceptible oak. The finish is long, saline, and mineral.",
      "Cool marine winds keep this fruit restrained and nervy. The soil is shallow volcanic over ancient basalt.",
      "This AVA produces the most Burgundian whites in the valley \u2014 sommeliers are starting to take notice.",
      "Van Duzer Corridor Chardonnay. The constant wind stress produces wines of extraordinary tension and focus."
    ],
    explanation: "Eola-Amity Hills is emerging as one of the great American Chardonnay sites. The Van Duzer Corridor\u2019s cooling influence and shallow volcanic soils produce whites of exceptional mineral tension \u2014 chalky, saline, and electric with acidity.",
    difficulty: 2,
  },

  // ── CHARDONNAY: Dundee Hills (Hard) ──
  {
    id: "dundee-chard-001",
    grape: "Chardonnay",
    region: "Willamette Valley",
    ava: "Dundee Hills",
    style: "Rich White",
    body: "medium",
    acidity: "bright",
    tannin: "none",
    oak: "moderate",
    aromas: ["golden apple", "hazelnut", "honey", "lemon curd", "volcanic mineral"],
    clues: [
      "Rich gold. Golden apple, hazelnut, a drizzle of honey, and lemon curd. Generous but focused.",
      "Medium-full body with bright acidity and integrated oak. Barrel fermentation adds richness without weight.",
      "The same volcanic red soil that makes this area famous for Pinot also grows exceptional Chardonnay.",
      "This AVA is best known for its reds, but its whites are gaining cult status among collectors.",
      "Jory soil Chardonnay. The iron-rich volcanic clay gives the wine a golden richness and mineral depth."
    ],
    explanation: "Dundee Hills is primarily known for Pinot Noir, but its Jory-soil Chardonnays are gaining cult status. The volcanic soils impart a golden richness and mineral depth, while the site\u2019s natural warmth produces rounder, more generous whites than the wind-cooled Eola-Amity Hills.",
    difficulty: 3,
  },

  // ── PINOT GRIS: Willamette Valley (Easy) ──
  {
    id: "wv-gris-001",
    grape: "Pinot Gris",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Aromatic White",
    body: "medium",
    acidity: "moderate",
    tannin: "none",
    oak: "none",
    aromas: ["pear", "white peach", "apple", "honeysuckle", "citrus"],
    clues: [
      "Pale straw. Pear, white peach, apple blossom, and honeysuckle. Fragrant and inviting.",
      "Medium body with moderate acidity and a soft, round texture. Unoaked \u2014 all fruit and flower.",
      "This grape is Oregon\u2019s second most planted variety. The cool climate preserves its delicate aromatics.",
      "The Alsatian connection: David Lett planted this variety alongside Pinot Noir in the 1960s.",
      "Oregon-style Pinot Gris \u2014 drier and crisper than its Italian cousin, more aromatic than most Alsatian versions."
    ],
    explanation: "Oregon Pinot Gris has carved its own identity \u2014 drier and more structured than Italian Pinot Grigio, with more aromatic lift than Alsatian versions. It\u2019s the state\u2019s second most planted grape and the quintessential patio wine of the Willamette Valley.",
    difficulty: 1,
  },

  // ── PINOT GRIS: Chehalem Mountains (Medium) ──
  {
    id: "chehalem-gris-001",
    grape: "Pinot Gris",
    region: "Willamette Valley",
    ava: "Chehalem Mountains",
    style: "Aromatic White",
    body: "medium",
    acidity: "bright",
    tannin: "none",
    oak: "none",
    aromas: ["nectarine", "lime zest", "jasmine", "wet slate", "ginger"],
    clues: [
      "Light gold. Nectarine, lime zest, jasmine, and a hint of ginger spice. More intensity than expected.",
      "Medium body with bright acidity and a stony, mineral finish. Textured and almost saline.",
      "Wind-blown loess soils over volcanic basalt give this wine unexpected depth and minerality.",
      "The AVA closest to Portland. Higher elevation sites produce whites with real structure.",
      "Laurelwood soil \u2014 Ice Age loess that creates wines with a distinctive stony, mineral spine."
    ],
    explanation: "Chehalem Mountains Pinot Gris from Laurelwood loess soils shows more depth and mineral complexity than typical valley-floor versions. The wind-blown silt over volcanic basalt gives these wines a stony tension that is distinctive and site-driven.",
    difficulty: 2,
  },

  // ── PINOT GRIS: Rich style (Hard) ──
  {
    id: "wv-gris-002",
    grape: "Pinot Gris",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Rich White",
    body: "full",
    acidity: "moderate",
    tannin: "none",
    oak: "moderate",
    aromas: ["baked pear", "quince", "almond", "beeswax", "vanilla"],
    clues: [
      "Deep gold, almost amber at the rim. Baked pear, quince, almond, and a waxy, honeyed richness.",
      "Full body with moderate acidity and creamy oak texture. This is not your typical crisp white.",
      "An Alsatian-inspired approach: extended skin contact and barrel aging give this variety unexpected depth.",
      "The same grape as the crisp, stainless-steel version \u2014 but treated more like Chardonnay in the cellar.",
      "Reserve-style Pinot Gris with lees aging and French oak. Some Oregon producers are pushing this variety into new territory."
    ],
    explanation: "Some Willamette Valley producers are making reserve-style Pinot Gris with skin contact, barrel fermentation, and lees aging. The result is a rich, textured white that challenges assumptions about this grape \u2014 more Alsatian Grand Cru than patio sipper.",
    difficulty: 3,
  },

  // ── SPARKLING: Willamette Valley (Medium) ──
  {
    id: "wv-sparkle-001",
    grape: "Sparkling",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Sparkling",
    body: "light",
    acidity: "high",
    tannin: "none",
    oak: "none",
    aromas: ["green apple", "brioche", "lemon", "fresh cream", "almond"],
    clues: [
      "Pale gold with fine, persistent bubbles. Green apple, brioche, lemon curd, and a whisper of toasted almond.",
      "Light body with high acidity and creamy mousse. M\u00e9thode traditionnelle \u2014 the same process used in Champagne.",
      "Cool-climate fruit with natural high acidity is ideal for sparkling wine production.",
      "Oregon\u2019s sparkling wine scene has exploded in the last decade. Major Champagne houses have invested here.",
      "Willamette Valley sparkling \u2014 made from Pinot Noir and Chardonnay, the same grapes used in Champagne."
    ],
    explanation: "The Willamette Valley\u2019s cool climate and natural high-acid fruit make it ideal for m\u00e9thode traditionnelle sparkling wine. Major Champagne houses like Louis Roederer have invested in the region, and Oregon sparkling is now competing on the world stage.",
    difficulty: 2,
  },

  // ── SPARKLING: Vintage (Hard) ──
  {
    id: "wv-sparkle-002",
    grape: "Sparkling",
    region: "Willamette Valley",
    ava: "Dundee Hills",
    style: "Sparkling",
    body: "medium",
    acidity: "high",
    tannin: "none",
    oak: "none",
    aromas: ["toasted brioche", "dried apricot", "hazelnut", "honey", "chalk"],
    clues: [
      "Deep gold. Toasted brioche, dried apricot, hazelnut, and honey. Complex and layered.",
      "Medium body with fine bubbles and a rich, creamy texture. Extended aging on the lees \u2014 4+ years.",
      "Vintage-dated sparkling wine from a single exceptional harvest. Not a multi-year blend.",
      "The same volcanic soil that produces world-class Pinot Noir adds mineral depth to this wine\u2019s base.",
      "Dundee Hills vintage brut \u2014 a single-vineyard sparkling wine with Jory soil character and years of lees aging."
    ],
    explanation: "Vintage-dated sparkling wine from Dundee Hills represents the pinnacle of Oregon\u2019s sparkling ambition. Extended lees aging (4+ years) builds complexity \u2014 toasty, nutty, honeyed \u2014 while the volcanic Jory soils add a mineral depth that sets it apart from Champagne.",
    difficulty: 3,
  },

  // ── ROS\u00c9: Willamette Valley (Easy) ──
  {
    id: "wv-rose-001",
    grape: "Ros\u00e9",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Ros\u00e9",
    body: "light",
    acidity: "bright",
    tannin: "none",
    oak: "none",
    aromas: ["watermelon", "strawberry", "pink grapefruit", "white pepper", "herbs"],
    clues: [
      "Pale salmon-pink. Watermelon, wild strawberry, pink grapefruit, and a dusting of white pepper.",
      "Light body with bright acidity and a crisp, dry finish. Refreshing and savory, not sweet.",
      "Made from the same grape that dominates the valley\u2019s red wine production \u2014 just pressed off the skins early.",
      "Cool-climate ros\u00e9 with more acidity and less fruit sweetness than warm-region versions.",
      "Pinot Noir ros\u00e9 \u2014 the same variety, picked early and pressed quickly for a delicate pink wine."
    ],
    explanation: "Willamette Valley ros\u00e9 is almost always made from Pinot Noir. The cool climate produces ros\u00e9s with bright acidity, delicate fruit, and a dry, savory character \u2014 more Proven\u00e7al in spirit than many American ros\u00e9s.",
    difficulty: 1,
  },

  // ── ROS\u00c9: Deeper style (Medium) ──
  {
    id: "wv-rose-002",
    grape: "Ros\u00e9",
    region: "Willamette Valley",
    ava: "Eola-Amity Hills",
    style: "Ros\u00e9",
    body: "medium",
    acidity: "high",
    tannin: "soft",
    oak: "none",
    aromas: ["blood orange", "raspberry", "dried herbs", "saline", "crushed stone"],
    clues: [
      "Deep salmon, almost copper. Blood orange, raspberry, dried herbs, and a saline minerality.",
      "Medium body with high acidity and a hint of tannic grip. This ros\u00e9 has structure \u2014 almost like a light red.",
      "Saign\u00e9e method \u2014 bled off from a red wine fermentation, not direct-pressed. More color, more body.",
      "The same wind corridor that structures this region\u2019s reds also gives the ros\u00e9 unusual intensity.",
      "Eola-Amity Hills saign\u00e9e ros\u00e9 \u2014 wind-cooled, mineral-driven, with more backbone than any pink wine has a right to."
    ],
    explanation: "Saign\u00e9e ros\u00e9 from the Eola-Amity Hills is a different animal from typical direct-press ros\u00e9. Bled from Pinot Noir fermentations, it carries more color, body, and tannic structure \u2014 amplified by the Van Duzer Corridor\u2019s cooling influence.",
    difficulty: 2,
  },

  // ── GAMAY: Willamette Valley (Hard) ──
  {
    id: "wv-gamay-001",
    grape: "Gamay",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Light Red",
    body: "light",
    acidity: "high",
    tannin: "soft",
    oak: "none",
    aromas: ["sour cherry", "violet", "granite", "banana", "fresh pepper"],
    clues: [
      "Bright purple-ruby. Sour cherry, violet, fresh-cracked pepper, and an unexpected note of banana peel.",
      "Light body with juicy, high acidity and barely-there tannins. Vibrant, crunchy, electric.",
      "This is NOT Pinot Noir \u2014 the color is too vibrant, the tannins too low, the fruit too juicy.",
      "Beaujolais\u2019 signature grape has found a second home in the Willamette Valley\u2019s cool climate.",
      "Oregon Gamay Noir \u2014 often made with carbonic maceration for that vibrant, crunchy, Beaujolais-like character."
    ],
    explanation: "Gamay Noir is Beaujolais\u2019 signature grape, and it thrives in the Willamette Valley\u2019s cool climate. Oregon producers often use carbonic maceration \u2014 the same technique used in Beaujolais \u2014 to create wines with vibrant fruit, crunchy acidity, and barely any tannin.",
    difficulty: 3,
  },

  // ── CABERNET FRANC: Expert Decoy ──
  {
    id: "wv-cabfranc-001",
    grape: "Cabernet Franc",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Structured Red",
    body: "medium",
    acidity: "bright",
    tannin: "fine",
    oak: "moderate",
    aromas: ["red bell pepper", "raspberry", "graphite", "tobacco", "fresh sage"],
    clues: [
      "Medium ruby with a violet rim. Red bell pepper, raspberry, graphite, and a distinctive herbal note of sage.",
      "Medium body with fine tannins and bright acidity. The herbal, peppery character is prominent.",
      "This is a Bordeaux variety that few associate with the Willamette Valley \u2014 but a handful of producers grow it.",
      "The same cool climate that makes great Pinot also produces unusually elegant, Loire-like versions of this grape.",
      "Oregon Cabernet Franc \u2014 grown in tiny quantities, showing more Chinon than Napa in character."
    ],
    explanation: "Cabernet Franc is a rare find in the Willamette Valley, but a few adventurous producers grow it. The cool climate produces wines that taste more like Loire Valley Chinon than Napa \u2014 herbal, peppery, medium-bodied, and elegant.",
    difficulty: 4,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // NEW WINES (21\u201355)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 21. PINOT NOIR: Van Duzer Corridor ──
  {
    id: "vanduzer-pinot-001",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "Van Duzer Corridor",
    style: "Structured Red",
    body: "medium",
    acidity: "high",
    tannin: "firm",
    oak: "light",
    aromas: ["cranberry", "blood orange", "dried sage", "wet gravel", "smoked salt"],
    clues: [
      "Medium ruby with garnet edge. Cranberry, blood orange, dried sage, and a mineral note of wet gravel.",
      "Medium body with nervy, almost searing acidity and chalky tannins. Austere and wind-swept in character.",
      "This is the windiest grape-growing corridor in the Willamette Valley \u2014 sustained afternoon gusts can exceed 25 mph.",
      "Oregon\u2019s newest AVA (approved 2019) lies entirely within the wind gap between the Coast Range and the valley floor.",
      "Van Duzer Corridor \u2014 the AVA defined not by soil type but by wind. Grapes here ripen slowly under constant maritime influence."
    ],
    explanation: "The Van Duzer Corridor AVA, approved in 2019, is defined by its wind pattern rather than geology. Cool Pacific air funnels through a low point in the Coast Range every afternoon, stressing the vines and producing Pinot Noirs with unusually high acidity, savory aromatics, and chalky tannins.",
    difficulty: 3,
  },

  // ── 22. PINOT NOIR: Tualatin Hills ──
  {
    id: "tualatin-pinot-001",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "Tualatin Hills",
    style: "Elegant Red",
    body: "medium",
    acidity: "bright",
    tannin: "silky",
    oak: "light",
    aromas: ["wild strawberry", "dried lavender", "pomegranate", "clay", "white pepper"],
    clues: [
      "Bright, transparent ruby. Wild strawberry, pomegranate, dried lavender, and a dusting of white pepper.",
      "Medium body with silky tannins and lively acidity. Perfumed and delicate, with an almost Burgundian restraint.",
      "Loess and volcanic soils at the northern end of the Willamette Valley, sheltered by the Tualatin Mountains.",
      "One of the valley\u2019s newest sub-AVAs, established in 2020 \u2014 yet home to some of Oregon\u2019s oldest vineyards, planted in the 1970s.",
      "Tualatin Hills \u2014 the Willamette\u2019s northernmost sub-AVA, just 20 minutes from downtown Portland."
    ],
    explanation: "Tualatin Hills gained AVA status in 2020, but its vineyards date to the 1970s. Located in the northernmost reaches of the Willamette Valley just outside Portland, the area\u2019s loess soils and protected microclimate produce perfumed, delicate Pinot Noirs with a distinctly Burgundian sensibility.",
    difficulty: 3,
  },

  // ── 23. PINOT NOIR: Lower Long Tom ──
  {
    id: "longtom-pinot-001",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "Lower Long Tom",
    style: "Elegant Red",
    body: "medium",
    acidity: "bright",
    tannin: "soft",
    oak: "light",
    aromas: ["Bing cherry", "rhubarb", "clove", "damp earth", "dried fern"],
    clues: [
      "Medium ruby. Bing cherry, rhubarb, clove, and an earthy note of damp forest floor and fern.",
      "Medium body with soft tannins and a juicy, vibrant acidity. Approachable but with good depth.",
      "The southernmost sub-AVA in the Willamette Valley, near the college town of Eugene. Warmer days, cool nights.",
      "Ancient marine sedimentary soils in a wide, gently sloping basin at the valley\u2019s southern reach.",
      "Lower Long Tom \u2014 named for the creek that runs through it. Approved in 2021, it\u2019s the newest AVA in the Willamette."
    ],
    explanation: "Lower Long Tom, approved in 2021, is the Willamette Valley\u2019s southernmost and newest sub-AVA. Located near Eugene, its slightly warmer daytime temperatures and marine sedimentary soils produce Pinot Noirs with ripe cherry fruit, gentle tannins, and an approachable earthiness.",
    difficulty: 3,
  },

  // ── 24. PINOT NOIR: Laurelwood District ──
  {
    id: "laurelwood-pinot-001",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "Laurelwood District",
    style: "Elegant Red",
    body: "medium",
    acidity: "bright",
    tannin: "fine",
    oak: "moderate",
    aromas: ["red plum", "rose hip", "cocoa nib", "iron filings", "dried thyme"],
    clues: [
      "Luminous ruby. Red plum, rose hip, cocoa nib, and a ferrous mineral edge like iron filings.",
      "Medium body with fine-grained tannins and bright acidity. Polished texture with a persistent mineral finish.",
      "Wind-blown loess (Laurelwood series) deposited during Missoula Floods, sitting atop Columbia River basalt.",
      "A proposed AVA that would be nested within the Chehalem Mountains, defined entirely by its unique soil type.",
      "Laurelwood District \u2014 the loess soil is so distinctive it may earn its own appellation. Iron-rich silt over basalt."
    ],
    explanation: "The Laurelwood District is a proposed sub-AVA within the Chehalem Mountains, defined by its eponymous Laurelwood soil \u2014 wind-blown loess deposited during the Missoula Floods atop ancient basalt. This unique two-layer soil profile produces Pinot Noirs with fine tannins, iron-tinged minerality, and exceptional aromatic complexity.",
    difficulty: 4,
  },

  // ── 25. PINOT NOIR: Dundee Hills aged expression ──
  {
    id: "dundee-pinot-002",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "Dundee Hills",
    style: "Elegant Red",
    body: "medium",
    acidity: "moderate",
    tannin: "silky",
    oak: "moderate",
    aromas: ["dried cherry", "truffle", "leather", "forest floor", "dried rose"],
    clues: [
      "Garnet trending to brick at the rim. Dried cherry, truffle, soft leather, and faded roses. This wine has age.",
      "Medium body with resolved, silky tannins and softened acidity. The texture is velvety, almost weightless.",
      "With 8\u201310 years of age, Willamette Pinot Noir undergoes a transformation from fruit to earth and umami.",
      "Only the best vineyard sites in the valley\u2019s most famous AVA produce wines that evolve this gracefully.",
      "Aged Dundee Hills Pinot \u2014 the Jory soil signature persists, but the fruit has given way to truffle, earth, and mushroom."
    ],
    explanation: "Mature Dundee Hills Pinot Noir is a revelation. After a decade, the youthful cherry and raspberry give way to truffle, dried flowers, leather, and forest floor \u2014 tertiary complexity that rivals aged red Burgundy. The silky texture becomes almost ethereal.",
    difficulty: 3,
  },

  // ── 26. PINOT NOIR: Yamhill-Carlton single-vineyard ──
  {
    id: "yamhill-pinot-002",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "Yamhill-Carlton",
    style: "Structured Red",
    body: "full",
    acidity: "bright",
    tannin: "firm",
    oak: "moderate",
    aromas: ["boysenberry", "espresso", "dried oregano", "iron", "black tea"],
    clues: [
      "Deep ruby, nearly opaque. Boysenberry, espresso, dried oregano, and a dense, iron-edged minerality.",
      "Full body with firm, chewy tannins and driving acidity. This is Yamhill-Carlton at its most muscular.",
      "Old-vine P\u00e9avine soils \u2014 iron-rich marine sedimentary clay that produces concentrated, tannic Pinot Noir.",
      "The AVA\u2019s warmer sites and older plantings can produce wines with more extraction and power than expected.",
      "Single-vineyard Yamhill-Carlton from a hillside block. The Peavine clay here is iron-red and stains everything."
    ],
    explanation: "The best single-vineyard bottlings from Yamhill-Carlton\u2019s hillside Peavine soils produce surprisingly powerful Pinot Noir. The iron-rich marine sedimentary clay contributes tannic grip, dark fruit concentration, and a brooding mineral character that rewards cellaring.",
    difficulty: 3,
  },

  // ── 27. CHARDONNAY: Stainless steel Willamette Valley ──
  {
    id: "wv-chard-002",
    grape: "Chardonnay",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Crisp White",
    body: "light",
    acidity: "high",
    tannin: "none",
    oak: "none",
    aromas: ["Granny Smith apple", "lemon", "wet stone", "chalky mineral", "white flowers"],
    clues: [
      "Very pale straw, almost water-white. Granny Smith apple, fresh lemon, wet stone, and white flowers.",
      "Light body with searingly high acidity and zero oak influence. Lean, taut, and linear.",
      "Stainless-steel fermented Chardonnay \u2014 no malolactic, no barrel. The grape laid bare.",
      "This style is the opposite of buttery California Chardonnay \u2014 think Chablis rather than Meursault.",
      "Unoaked Willamette Valley Chardonnay. The cool climate\u2019s natural acidity shines without any winemaker intervention."
    ],
    explanation: "Unoaked Willamette Valley Chardonnay represents the purest expression of the grape in a cool climate. Without barrel fermentation or malolactic conversion, the wine is razor-sharp \u2014 all citrus, green apple, and mineral. Think Chablis on the 45th parallel.",
    difficulty: 2,
  },

  // ── 28. CHARDONNAY: Yamhill-Carlton barrel-fermented ──
  {
    id: "yamhill-chard-001",
    grape: "Chardonnay",
    region: "Willamette Valley",
    ava: "Yamhill-Carlton",
    style: "Rich White",
    body: "full",
    acidity: "bright",
    tannin: "none",
    oak: "heavy",
    aromas: ["yellow peach", "toasted hazelnut", "butter", "vanilla bean", "flint"],
    clues: [
      "Deep gold. Yellow peach, toasted hazelnut, butter, and vanilla bean, with a flinty mineral undertow.",
      "Full body with rich, creamy texture and bright underlying acidity. New French oak is prominent but not cloying.",
      "Barrel-fermented with full malolactic conversion and extended lees stirring \u2014 a Meursault-inspired approach.",
      "This AVA\u2019s marine sedimentary soils produce Chardonnay with a broader, richer profile than volcanic sites.",
      "Yamhill-Carlton Chardonnay with heavy oak treatment. The marine soils give width; the oak gives decadence."
    ],
    explanation: "Yamhill-Carlton\u2019s marine sedimentary soils produce naturally broader, richer Chardonnay. When given the full Burgundian treatment \u2014 barrel fermentation, full malo, lees stirring \u2014 the result is a decadent, golden wine reminiscent of Meursault, anchored by the valley\u2019s signature acidity.",
    difficulty: 3,
  },

  // ── 29. PINOT GRIS: Italian-style crisp ──
  {
    id: "wv-gris-003",
    grape: "Pinot Gris",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Crisp White",
    body: "light",
    acidity: "high",
    tannin: "none",
    oak: "none",
    aromas: ["green pear", "lime", "almond skin", "mineral", "fresh herbs"],
    clues: [
      "Pale straw with silver highlights. Green pear, lime, almond skin, and a clean mineral note.",
      "Light body with crisp, high acidity and a bone-dry finish. Lean and refreshing, almost austere.",
      "Picked earlier for higher acidity, fermented cold in stainless steel \u2014 an Italian Grigio-inspired approach.",
      "The same grape as the richer Alsatian-style version, but vinified for maximum freshness and drinkability.",
      "Oregon Pinot Grigio \u2014 yes, some producers intentionally make a lighter, crisper, Italian-inflected style."
    ],
    explanation: "A handful of Willamette Valley producers pick their Pinot Gris early and ferment it cold in stainless steel, creating a lighter, crisper wine inspired by northern Italian Pinot Grigio. It\u2019s leaner and more austere than the classic Oregon style \u2014 a lunchtime wine, not an evening sipper.",
    difficulty: 2,
  },

  // ── 30. PINOT GRIS: Skin-contact / orange wine ──
  {
    id: "wv-gris-004",
    grape: "Pinot Gris",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Skin-Contact White",
    body: "medium",
    acidity: "moderate",
    tannin: "soft",
    oak: "none",
    aromas: ["dried apricot", "tangerine peel", "chamomile", "beeswax", "hazelnut skin"],
    clues: [
      "Deep amber-gold, almost copper. Dried apricot, tangerine peel, chamomile tea, and beeswax. This is no ordinary white.",
      "Medium body with a noticeable tannic grip \u2014 unusual for a white wine. The texture is waxy and chewy.",
      "Extended skin contact gives this white wine tannin, color, and a completely different aromatic profile.",
      "Pinot Gris literally means \u2018gray Pinot\u2019 \u2014 the grape has pinkish-gray skins that can contribute real color and texture.",
      "Oregon skin-contact Pinot Gris \u2014 an orange wine made by leaving the juice on skins for days or weeks. The natural wine movement meets Oregon tradition."
    ],
    explanation: "Skin-contact Pinot Gris takes advantage of the grape\u2019s naturally pinkish-gray skins. Extended maceration extracts tannin, color (that distinctive amber-copper hue), and a complex array of dried fruit and tea-like aromatics. Oregon\u2019s natural wine movement has embraced this style enthusiastically.",
    difficulty: 3,
  },

  // ── 31. SPARKLING: Blanc de Blancs ──
  {
    id: "wv-sparkle-003",
    grape: "Sparkling",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Sparkling",
    body: "light",
    acidity: "high",
    tannin: "none",
    oak: "none",
    aromas: ["Meyer lemon", "green apple", "white chalk", "sea spray", "fresh bread"],
    clues: [
      "Pale straw with a fine, persistent mousse. Meyer lemon, green apple, white chalk, and a whisper of fresh bread.",
      "Light body with rapier-like acidity and a mineral, almost salty finish. Precision and purity define this wine.",
      "Made entirely from white grapes \u2014 no Pinot Noir in the blend. The French term means \u2018white from whites.\u2019",
      "Oregon\u2019s high-acid Chardonnay is ideal for this austere, mineral style of sparkling wine.",
      "Blanc de Blancs \u2014 100% Chardonnay sparkling from the Willamette Valley. The leanest, most mineral expression of Oregon bubbles."
    ],
    explanation: "Blanc de Blancs sparkling wine, made exclusively from Chardonnay, is the most austere and mineral expression of Willamette Valley bubbly. Without Pinot Noir\u2019s body and red-fruit richness, the wine is all about precision: citrus, chalk, and a laser-beam of acidity.",
    difficulty: 2,
  },

  // ── 32. SPARKLING: Blanc de Noirs ──
  {
    id: "wv-sparkle-004",
    grape: "Sparkling",
    region: "Willamette Valley",
    ava: "Dundee Hills",
    style: "Sparkling",
    body: "medium",
    acidity: "high",
    tannin: "none",
    oak: "none",
    aromas: ["red apple", "strawberry cream", "biscuit", "pink grapefruit", "hazelnut"],
    clues: [
      "Very pale salmon-gold with energetic bubbles. Red apple, strawberry cream, biscuit, and pink grapefruit.",
      "Medium body with creamy mousse and bright acidity. More weight and richness than a blanc de blancs.",
      "Made entirely from red-skinned grapes, carefully pressed to yield a white or very pale pink wine.",
      "The French term means \u2018white from blacks\u2019 \u2014 white sparkling wine made from dark-skinned Pinot Noir.",
      "Blanc de Noirs from Dundee Hills \u2014 100% Pinot Noir sparkling. The volcanic Jory soil adds a subtle richness."
    ],
    explanation: "Blanc de Noirs sparkling is made entirely from Pinot Noir, pressed quickly to keep the juice nearly white. The result is a richer, more vinous sparkling wine than blanc de blancs, with red-apple notes and a fuller mousse. Dundee Hills\u2019 Jory soils add a volcanic mineral dimension.",
    difficulty: 3,
  },

  // ── 33. SPARKLING: Ros\u00e9 Sparkling ──
  {
    id: "wv-sparkle-005",
    grape: "Sparkling",
    region: "Willamette Valley",
    ava: "Eola-Amity Hills",
    style: "Sparkling",
    body: "light",
    acidity: "high",
    tannin: "none",
    oak: "none",
    aromas: ["wild strawberry", "white cherry", "rose water", "lime zest", "minerite"],
    clues: [
      "Delicate salmon-pink with fine, persistent bubbles. Wild strawberry, white cherry, rose water, and lime zest.",
      "Light body with electric acidity and a dry, mineral finish. The color comes from brief skin contact with Pinot Noir.",
      "Sparkling ros\u00e9 is the fastest-growing category in Oregon wine \u2014 demand far outpaces supply.",
      "The wind-cooled fruit from this AVA gives the ros\u00e9 sparkler its nervy acidity and mineral backbone.",
      "Eola-Amity Hills sparkling ros\u00e9 \u2014 m\u00e9thode traditionnelle with Pinot Noir skin contact for that pale pink hue."
    ],
    explanation: "Sparkling ros\u00e9 from the Eola-Amity Hills combines the region\u2019s signature nervy acidity with delicate Pinot Noir color and aromatics. Brief skin contact gives the wine its pale salmon hue and red-fruit character, while the Van Duzer Corridor\u2019s influence ensures electric freshness.",
    difficulty: 2,
  },

  // ── 34. SPARKLING: P\u00e9t-Nat ──
  {
    id: "wv-petnat-001",
    grape: "Sparkling",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "P\u00e9tillant Naturel",
    body: "light",
    acidity: "bright",
    tannin: "none",
    oak: "none",
    aromas: ["green apple", "lemon drop", "yeast", "pear cider", "wildflower"],
    clues: [
      "Hazy, cloudy pale gold with large, frothy bubbles. Green apple, lemon drop, yeast, and pear cider.",
      "Light body with frothy, uneven carbonation and bright acidity. Rustic and energetic, not refined.",
      "M\u00e9thode ancestrale \u2014 bottled mid-fermentation so the wine finishes fermenting in bottle. No dosage, no disgorgement.",
      "This ancient sparkling technique predates Champagne by centuries. It\u2019s the natural wine world\u2019s favorite fizz.",
      "P\u00e9tillant naturel (p\u00e9t-nat) \u2014 Oregon\u2019s natural wine producers have embraced this funky, cloudy, alive style of bubbly."
    ],
    explanation: "P\u00e9tillant naturel is made by bottling wine before primary fermentation finishes, trapping CO2 naturally. There\u2019s no added sugar, no disgorgement, and the result is cloudy, yeasty, and alive. Oregon\u2019s thriving natural wine scene has made p\u00e9t-nat one of its signature categories.",
    difficulty: 2,
  },

  // ── 35. ROS\u00c9: Direct press Dundee Hills ──
  {
    id: "dundee-rose-001",
    grape: "Ros\u00e9",
    region: "Willamette Valley",
    ava: "Dundee Hills",
    style: "Ros\u00e9",
    body: "light",
    acidity: "bright",
    tannin: "none",
    oak: "none",
    aromas: ["white peach", "wild strawberry", "rose petal", "citrus blossom", "mineral"],
    clues: [
      "Barely-there pale pink, almost a vin gris. White peach, wild strawberry, rose petal, and citrus blossom.",
      "Light body with delicate, bright acidity and a whisper of minerality. Gossamer-light and ethereal.",
      "Direct-press method \u2014 whole-cluster pressed immediately, with minimal skin contact. Maximum delicacy.",
      "The volcanic red soil of this AVA imparts a subtle mineral quality even to its lightest wines.",
      "Dundee Hills direct-press ros\u00e9 \u2014 Jory soil Pinot Noir, barely blushing, Proven\u00e7al in its restraint."
    ],
    explanation: "Direct-press ros\u00e9 from Dundee Hills is the most ethereal style of Willamette pink wine. Whole clusters go straight to the press with almost no skin contact, yielding a barely-there blush with extraordinary delicacy. The Jory soil\u2019s mineral backbone keeps it from being insubstantial.",
    difficulty: 2,
  },

  // ── 36. ROS\u00c9: Yamhill-Carlton ──
  {
    id: "yamhill-rose-001",
    grape: "Ros\u00e9",
    region: "Willamette Valley",
    ava: "Yamhill-Carlton",
    style: "Ros\u00e9",
    body: "medium",
    acidity: "bright",
    tannin: "none",
    oak: "none",
    aromas: ["red currant", "cantaloupe", "fresh thyme", "pink peppercorn", "wet stone"],
    clues: [
      "Medium salmon. Red currant, cantaloupe, fresh thyme, and pink peppercorn. Savory and aromatic.",
      "Medium body with bright acidity and a dry, herbal finish. More weight and complexity than a simple pink wine.",
      "Made from Pinot Noir grown on marine sedimentary soils, which give the ros\u00e9 an earthier, more savory profile.",
      "This AVA\u2019s naturally darker-fruited Pinot Noir translates into a ros\u00e9 with deeper color and more body.",
      "Yamhill-Carlton ros\u00e9 \u2014 the marine soils impart an earthy, herbal character that distinguishes it from volcanic-site pinks."
    ],
    explanation: "Ros\u00e9 from Yamhill-Carlton reflects the AVA\u2019s marine sedimentary terroir: darker-fruited, more savory, and earthier than ros\u00e9s from volcanic sites like Dundee Hills. The wines carry more body and herbal complexity, making them excellent food partners.",
    difficulty: 2,
  },

  // ── 37. GAMAY: Traditional vinification ──
  {
    id: "wv-gamay-002",
    grape: "Gamay",
    region: "Willamette Valley",
    ava: "Eola-Amity Hills",
    style: "Light Red",
    body: "medium",
    acidity: "bright",
    tannin: "fine",
    oak: "light",
    aromas: ["dark cherry", "black pepper", "wild herbs", "iron", "dried violet"],
    clues: [
      "Medium ruby, less vibrant than carbonic Gamay. Dark cherry, black pepper, wild herbs, and dried violet.",
      "Medium body with fine tannins and bright acidity. More structured and serious than typical Gamay.",
      "Traditional vinification \u2014 destemmed and fermented like Pinot Noir, not made with carbonic maceration.",
      "The same grape as Beaujolais, but vinified for structure rather than crunch. Think Morgon cru, not Nouveau.",
      "Oregon Gamay Noir from Eola-Amity \u2014 traditionally vinified and wind-cooled, showing the grape\u2019s serious side."
    ],
    explanation: "Not all Oregon Gamay is made in the crunchy, carbonic Beaujolais Nouveau style. Traditionally vinified Gamay from Eola-Amity Hills \u2014 destemmed, fermented like Pinot, and given light oak \u2014 produces a more structured wine reminiscent of Beaujolais cru bottlings like Morgon or Moulin-\u00e0-Vent.",
    difficulty: 3,
  },

  // ── 38. RIESLING: Dry Willamette Valley ──
  {
    id: "wv-riesling-001",
    grape: "Riesling",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Aromatic White",
    body: "light",
    acidity: "high",
    tannin: "none",
    oak: "none",
    aromas: ["lime", "white peach", "petrol", "jasmine", "wet slate"],
    clues: [
      "Brilliant pale straw. Lime, white peach, jasmine, and a faint whiff of petrol. Intensely aromatic.",
      "Light body with searing, electric acidity and bone-dry finish. No residual sugar \u2014 this is trocken territory.",
      "One of the most aromatic grapes in the world, this variety\u2019s signature is its combination of floral perfume and racy acidity.",
      "Oregon was one of the first American regions to prove this German grape could be made dry and serious.",
      "Dry Oregon Riesling \u2014 more Alsace than Mosel in philosophy. The cool Willamette climate preserves the grape\u2019s hallmark acidity."
    ],
    explanation: "Oregon Riesling is a hidden gem. The Willamette Valley\u2019s cool climate preserves the grape\u2019s naturally high acidity, and most Oregon producers make it bone-dry. The result recalls dry Alsatian Riesling \u2014 searingly acidic, intensely aromatic, and built to pair with Pacific Northwest seafood.",
    difficulty: 2,
  },

  // ── 39. RIESLING: Eola-Amity Hills ──
  {
    id: "eola-riesling-001",
    grape: "Riesling",
    region: "Willamette Valley",
    ava: "Eola-Amity Hills",
    style: "Crisp White",
    body: "light",
    acidity: "high",
    tannin: "none",
    oak: "none",
    aromas: ["key lime", "green apple", "crushed rock", "ginger blossom", "saline"],
    clues: [
      "Water-white with green tints. Key lime, green apple, crushed rock, and ginger blossom. The nose is penetrating.",
      "Light body with knife-edge acidity and a long, saline, mineral finish. Almost painfully crisp.",
      "Wind-cooled vineyards produce Riesling of extreme tension \u2014 the same afternoon gusts that sharpen the Pinot Noir.",
      "This AVA\u2019s volcanic soils and marine breezes create Rieslings that taste like liquid mineral.",
      "Eola-Amity Hills Riesling \u2014 the Van Duzer Corridor gives this variety a cutting mineral edge found nowhere else in Oregon."
    ],
    explanation: "Riesling from the Eola-Amity Hills benefits from the Van Duzer Corridor\u2019s cooling winds, which produce wines of extreme tension and mineral purity. The volcanic soils add a saline, rocky character that makes these wines thrilling with oysters or fresh Dungeness crab.",
    difficulty: 3,
  },

  // ── 40. PINOT BLANC ──
  {
    id: "wv-pinotblanc-001",
    grape: "Pinot Blanc",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Crisp White",
    body: "medium",
    acidity: "bright",
    tannin: "none",
    oak: "none",
    aromas: ["white apple", "pear", "lemon zest", "almond", "fresh cream"],
    clues: [
      "Pale straw. White apple, pear, lemon zest, and almond. Clean, precise, and understated.",
      "Medium body with bright acidity and a smooth, rounded texture. Neither as aromatic as Pinot Gris nor as steely as Chardonnay.",
      "A mutation of Pinot Noir that produces white wine \u2014 genetically almost identical to Pinot Gris.",
      "Popular in Alsace as Pinot Blanc, and in northern Italy as Pinot Bianco. Rare but beautiful in Oregon.",
      "Oregon Pinot Blanc \u2014 the \u2018other\u2019 white Pinot. Subtle, food-friendly, and criminally underappreciated."
    ],
    explanation: "Pinot Blanc is a genetic mutation of Pinot Noir, closely related to Pinot Gris. In Oregon, it produces medium-bodied, subtly aromatic whites with clean fruit and gentle texture. It\u2019s neither as overtly aromatic as Pinot Gris nor as structured as Chardonnay \u2014 a quiet wine that shines at the dinner table.",
    difficulty: 2,
  },

  // ── 41. M\u00dcLLER-THURGAU ──
  {
    id: "wv-muller-001",
    grape: "M\u00fcller-Thurgau",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Aromatic White",
    body: "light",
    acidity: "moderate",
    tannin: "none",
    oak: "none",
    aromas: ["Muscat grape", "elderflower", "lime leaf", "green melon", "fresh hay"],
    clues: [
      "Pale straw. Muscat grape, elderflower, lime leaf, and green melon. Delicately floral and grapey.",
      "Light body with moderate acidity and a soft, off-dry finish. Gentle, floral, and easy-drinking.",
      "A Riesling cross created in 1882 by Dr. Hermann M\u00fcller from Thurgau, Switzerland. Rare outside of Germany and Oregon.",
      "The Willamette Valley is one of the few places outside Germany and Austria that still grows this variety.",
      "M\u00fcller-Thurgau \u2014 a quirky German grape that found an unlikely home in the Willamette Valley. Floral, grapey, and delightful."
    ],
    explanation: "M\u00fcller-Thurgau is a Riesling cross created in 1882 that\u2019s rare outside of Germany and Austria \u2014 but a handful of Willamette Valley producers have kept it alive. The wines are delicately floral and grapey, with a soft, approachable character. It\u2019s one of Oregon\u2019s most charming curiosities.",
    difficulty: 3,
  },

  // ── 42. TEMPRANILLO ──
  {
    id: "wv-tempranillo-001",
    grape: "Tempranillo",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Structured Red",
    body: "medium",
    acidity: "bright",
    tannin: "firm",
    oak: "moderate",
    aromas: ["sour cherry", "leather", "dried fig", "tobacco leaf", "dusty earth"],
    clues: [
      "Deep ruby with garnet rim. Sour cherry, leather, dried fig, and tobacco leaf. Savory and Old World in feel.",
      "Medium body with firm, dusty tannins and bright acidity. The oak is present but integrated \u2014 not American, but French.",
      "Spain\u2019s most noble red grape, most famous in Rioja and Ribera del Duero. But what is it doing in Oregon?",
      "A few pioneering Willamette Valley producers in the southern reaches have planted this warm-climate variety.",
      "Oregon Tempranillo \u2014 grown in the warmer southern Willamette, making a cooler-climate, higher-acid expression of Spain\u2019s great grape."
    ],
    explanation: "Tempranillo in the Willamette Valley is a rarity, grown by a few adventurous producers in the warmer southern reaches near Eugene. The cool climate produces a lighter, higher-acid, more elegant interpretation than Rioja \u2014 with bright cherry fruit and fine, dusty tannins that recall the grape\u2019s Spanish roots.",
    difficulty: 4,
  },

  // ── 43. GR\u00dcNER VELTLINER ──
  {
    id: "wv-gruner-001",
    grape: "Gr\u00fcner Veltliner",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Crisp White",
    body: "light",
    acidity: "high",
    tannin: "none",
    oak: "none",
    aromas: ["white pepper", "snap pea", "green apple", "lentil", "lemon"],
    clues: [
      "Pale straw with green flecks. White pepper, snap pea, green apple, and an unusual savory, vegetal note.",
      "Light body with crisp, high acidity and a peppery, savory finish. The white pepper character is unmistakable.",
      "Austria\u2019s signature white grape \u2014 the white pepper and snap pea aromatics are its calling card.",
      "A tiny number of Oregon producers grow this Austrian variety, drawn by climate similarities between the Danube and the Willamette.",
      "Oregon Gr\u00fcner Veltliner \u2014 the same peppery, savory character as Wachau or Kremstal, grown in the Willamette Valley."
    ],
    explanation: "Gr\u00fcner Veltliner is Austria\u2019s most important white grape, and a few Oregon producers have planted it in the Willamette Valley. The cool climate produces wines with the variety\u2019s hallmark white pepper and snap pea character, plus the bright acidity that makes Austrian Gr\u00fcVe so food-friendly.",
    difficulty: 4,
  },

  // ── 44. MELON DE BOURGOGNE ──
  {
    id: "wv-melon-001",
    grape: "Melon de Bourgogne",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Crisp White",
    body: "light",
    acidity: "bright",
    tannin: "none",
    oak: "none",
    aromas: ["lemon", "green apple", "sea salt", "oyster shell", "fresh dough"],
    clues: [
      "Very pale straw. Lemon, green apple, sea salt, and a briny, almost oyster-shell minerality.",
      "Light body with bright, cleansing acidity and a short, saline finish. Neutral but not boring \u2014 the texture carries it.",
      "This grape is best known as the sole variety in Muscadet, the seafood wine of France\u2019s Loire Valley.",
      "A few Oregon producers have planted this coastal French grape, betting that the Pacific Northwest\u2019s maritime climate is a natural fit.",
      "Oregon Melon de Bourgogne \u2014 Muscadet\u2019s grape, grown in the Willamette Valley. Briny, lean, and destined for oysters."
    ],
    explanation: "Melon de Bourgogne is the grape behind Muscadet, the bone-dry, saline white from France\u2019s Atlantic coast. A few Willamette Valley producers have planted it, recognizing the climate parallels between the Loire and the Pacific Northwest. The result is a lean, briny wine tailor-made for Oregon oysters.",
    difficulty: 4,
  },

  // ── 45. TROUSSEAU ──
  {
    id: "wv-trousseau-001",
    grape: "Trousseau",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Light Red",
    body: "light",
    acidity: "high",
    tannin: "soft",
    oak: "none",
    aromas: ["sour cherry", "dried cranberry", "pink peppercorn", "rose hip", "earth"],
    clues: [
      "Pale, translucent ruby \u2014 lighter than most Pinot Noir. Sour cherry, dried cranberry, pink peppercorn, and rose hip.",
      "Light body with very high acidity and barely perceptible tannins. Delicate, electric, and almost transparent.",
      "A rare Jura grape with thin skins that produce exceptionally light-colored, high-acid reds.",
      "Oregon\u2019s natural wine producers have championed this obscure French variety as an alternative to Pinot Noir.",
      "Oregon Trousseau \u2014 the Jura\u2019s flagship red grape, making haunting, translucent wines in the Willamette Valley."
    ],
    explanation: "Trousseau is the signature red grape of France\u2019s Jura region, known for producing extraordinarily pale, high-acid, delicate reds. A small group of Oregon\u2019s natural wine producers have planted it in the Willamette Valley, creating wines that are translucent, electric, and hauntingly perfumed.",
    difficulty: 4,
  },

  // ── 46. TROUSSEAU GRIS ──
  {
    id: "wv-trousseaugris-001",
    grape: "Trousseau Gris",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Aromatic White",
    body: "medium",
    acidity: "bright",
    tannin: "none",
    oak: "none",
    aromas: ["white peach", "Meyer lemon", "lychee", "rose water", "ginger"],
    clues: [
      "Pale gold with a faint coppery tint. White peach, Meyer lemon, lychee, rose water, and a hint of ginger.",
      "Medium body with bright acidity and an unusually perfumed, exotic aromatic profile for a dry white.",
      "A gray-skinned mutation of Trousseau (also known as Bastardo in Portugal). Extremely rare worldwide.",
      "Sometimes confused with Pinot Gris, but the lychee and rose water aromatics are a giveaway \u2014 more like Gew\u00fcrztraminer.",
      "Oregon Trousseau Gris \u2014 one of the world\u2019s rarest grapes, grown by a handful of Willamette Valley producers. Exotic and unforgettable."
    ],
    explanation: "Trousseau Gris is the gray-skinned mutation of Trousseau, an impossibly rare grape that a few Oregon producers have championed. Its exotic, almost Gew\u00fcrztraminer-like aromatics \u2014 lychee, rose water, ginger \u2014 make it one of the most distinctive whites in the Willamette Valley.",
    difficulty: 4,
  },

  // ── 47. WHITE PINOT NOIR ──
  {
    id: "wv-whitepn-001",
    grape: "White Pinot Noir",
    region: "Willamette Valley",
    ava: "Dundee Hills",
    style: "Crisp White",
    body: "medium",
    acidity: "bright",
    tannin: "none",
    oak: "light",
    aromas: ["white cherry", "pear", "brioche", "mineral", "chamomile"],
    clues: [
      "Very pale straw with the faintest blush. White cherry, pear, brioche, and a subtle mineral note.",
      "Medium body with bright acidity and a textured, almost waxy mid-palate. More weight than a typical white.",
      "A still white wine made from a red grape \u2014 pressed immediately to prevent any color extraction from the skins.",
      "Not sparkling (that would be Blanc de Noirs), but a still wine. Think of it as Pinot Noir with its red suit removed.",
      "White Pinot Noir \u2014 a still white wine from Pinot Noir grapes. The Dundee Hills Jory soil gives it surprising body."
    ],
    explanation: "White Pinot Noir (Blanc de Pinot Noir as a still wine) is made by pressing Pinot Noir grapes immediately, with zero skin contact. The result is a pale, textured white with the weight and richness of Pinot Noir\u2019s fruit but none of its color. It\u2019s a fascinating demonstration of how much of a wine\u2019s character comes from winemaking decisions.",
    difficulty: 3,
  },

  // ── 48. DESSERT: Late Harvest Riesling ──
  {
    id: "wv-lateharvest-001",
    grape: "Dessert Wine",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Dessert",
    body: "full",
    acidity: "high",
    tannin: "none",
    oak: "none",
    aromas: ["apricot jam", "honey", "candied ginger", "orange marmalade", "beeswax"],
    clues: [
      "Deep gold, viscous in the glass. Apricot jam, honey, candied ginger, and orange marmalade. Intensely sweet but not cloying.",
      "Full body with luscious sweetness balanced by piercing, high acidity. The acidity keeps it lifted and fresh.",
      "Late-harvest grapes left on the vine into November, concentrating sugars while the cool climate preserves acidity.",
      "The Willamette Valley\u2019s long, cool autumns are ideal for late-harvest wines \u2014 slow ripening builds complexity.",
      "Late-harvest Oregon Riesling \u2014 a dessert wine with the balance and tension of German Auslese or Beerenauslese."
    ],
    explanation: "Late-harvest Riesling from the Willamette Valley benefits from Oregon\u2019s long, cool autumn season. Grapes left on the vine into November develop concentrated sugars while maintaining the variety\u2019s naturally high acidity. The result is a dessert wine of remarkable balance \u2014 intensely sweet but never heavy.",
    difficulty: 3,
  },

  // ── 49. DESSERT: Botrytized Pinot Gris ──
  {
    id: "wv-botrytis-001",
    grape: "Dessert Wine",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Dessert",
    body: "full",
    acidity: "bright",
    tannin: "none",
    oak: "none",
    aromas: ["dried mango", "saffron", "honeycomb", "marmalade", "dried chamomile"],
    clues: [
      "Deep amber-gold. Dried mango, saffron, honeycomb, and bitter orange marmalade. Exotic and intensely concentrated.",
      "Full body with viscous, syrupy texture but surprisingly bright acidity. A half-glass is a full experience.",
      "Botrytis cinerea \u2014 the \u2018noble rot\u2019 \u2014 shrivels the grapes, concentrating sugars, acids, and flavors dramatically.",
      "Oregon\u2019s damp autumns occasionally create perfect conditions for noble rot, particularly on thin-skinned grapes.",
      "Botrytized Pinot Gris \u2014 a rare Oregon dessert wine. The noble rot transforms the humble grape into liquid gold."
    ],
    explanation: "In certain damp, foggy Willamette Valley autumns, Botrytis cinerea (noble rot) colonizes thin-skinned Pinot Gris grapes, shriveling them and concentrating their sugars and flavors. The resulting dessert wine is extraordinarily complex \u2014 amber, unctuous, and haunting, like an Oregon Sauternes.",
    difficulty: 4,
  },

  // ── 50. PINOT NOIR: Ribbon Ridge old-vine ──
  {
    id: "ribbon-pinot-002",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "Ribbon Ridge",
    style: "Elegant Red",
    body: "medium",
    acidity: "moderate",
    tannin: "fine",
    oak: "moderate",
    aromas: ["black plum", "dried lavender", "cedar", "wet clay", "salted caramel"],
    clues: [
      "Medium garnet. Black plum, dried lavender, cedar, and a savory note of wet clay. Layered and complex.",
      "Medium body with fine, powdery tannins and moderate acidity. The texture is dense and layered \u2014 coiled energy.",
      "Old vines (25+ years) with deep roots in marine sedimentary soil produce wines of uncommon density.",
      "This tiny AVA\u2019s protected, ridge-top microclimate allows grapes to ripen fully without losing their cool-climate tension.",
      "Old-vine Ribbon Ridge \u2014 Willakenzie soil, planted in the 1990s, now producing the concentrated, complex wines the site always promised."
    ],
    explanation: "Old-vine Ribbon Ridge Pinot Noir represents the payoff of patient viticulture. Vines planted in the 1990s now have root systems deep into the Willakenzie marine sedimentary soil, producing wines of uncommon density and complexity. The tiny, protected AVA allows full ripeness while maintaining cool-climate elegance.",
    difficulty: 3,
  },

  // ── 51. CHARDONNAY: Chehalem Mountains ──
  {
    id: "chehalem-chard-001",
    grape: "Chardonnay",
    region: "Willamette Valley",
    ava: "Chehalem Mountains",
    style: "Rich White",
    body: "medium",
    acidity: "bright",
    tannin: "none",
    oak: "light",
    aromas: ["Asian pear", "lemon oil", "crushed flint", "toasted almond", "sea salt"],
    clues: [
      "Pale gold. Asian pear, lemon oil, crushed flint, and toasted almond. Focused and mineral-driven.",
      "Medium body with bright acidity and a textured, saline finish. Light oak adds subtle richness.",
      "Laurelwood loess soils impart a distinctive flinty, mineral character to white wines as well as reds.",
      "The AVA\u2019s three soil types create dramatically different Chardonnay expressions \u2014 loess sites are the most mineral.",
      "Chehalem Mountains Chardonnay from Laurelwood soil \u2014 the loess gives a flinty, saline signature."
    ],
    explanation: "Chehalem Mountains Chardonnay from Laurelwood loess sites shows a distinctive flinty, saline minerality. The wind-blown silt over basalt creates a soil profile that produces lean, mineral whites with excellent aging potential \u2014 more Puligny-Montrachet than Meursault in character.",
    difficulty: 3,
  },

  // ── 52. PINOT NOIR: McMinnville old-vine whole-cluster ──
  {
    id: "mcminnville-pinot-002",
    grape: "Pinot Noir",
    region: "Willamette Valley",
    ava: "McMinnville",
    style: "Bold Red",
    body: "full",
    acidity: "bright",
    tannin: "firm",
    oak: "moderate",
    aromas: ["black cherry", "star anise", "green stem", "dried sage", "basalt"],
    clues: [
      "Deep garnet. Black cherry, star anise, green stem, and dried sage. The whole-cluster influence is unmistakable.",
      "Full body with gripping tannins and a persistent, savory finish. The stemmy, spicy character adds complexity.",
      "100% whole-cluster fermentation \u2014 stems included \u2014 adds tannin, spice, and a green, herbal backbone to the wine.",
      "This under-the-radar AVA\u2019s shallow basalt soils produce wines with a graphite-like mineral signature.",
      "McMinnville whole-cluster Pinot \u2014 bold, savory, and built for the cellar. The Coast Range foothills\u2019 best-kept secret."
    ],
    explanation: "Whole-cluster fermentation in McMinnville produces some of the Willamette Valley\u2019s most savory, structured Pinot Noirs. The stems contribute tannin, spice, and an herbaceous character that complements the AVA\u2019s naturally firm, mineral wines from shallow basalt soils.",
    difficulty: 4,
  },

  // ── 53. PINOT GRIS: Tualatin Hills ──
  {
    id: "tualatin-gris-001",
    grape: "Pinot Gris",
    region: "Willamette Valley",
    ava: "Tualatin Hills",
    style: "Aromatic White",
    body: "medium",
    acidity: "bright",
    tannin: "none",
    oak: "none",
    aromas: ["yellow plum", "orange blossom", "wet river stone", "white tea", "honeydew"],
    clues: [
      "Light gold. Yellow plum, orange blossom, wet river stone, and white tea. Elegant and perfumed.",
      "Medium body with bright acidity and a long, textured finish. More aromatic intensity than most Oregon Pinot Gris.",
      "Sheltered hillside vineyards at the northern extreme of the Willamette Valley produce concentrated, site-specific whites.",
      "This AVA\u2019s proximity to Portland belies the rural, mountainous character of its vineyard sites.",
      "Tualatin Hills Pinot Gris \u2014 from the valley\u2019s northernmost sub-AVA, showing unexpected depth and perfume."
    ],
    explanation: "Pinot Gris from the Tualatin Hills benefits from the sub-AVA\u2019s sheltered hillside sites and loess-over-basalt soils. The wines show more aromatic intensity and mineral complexity than typical valley-floor Pinot Gris, with a perfumed elegance that reflects the area\u2019s unique microclimate.",
    difficulty: 3,
  },

  // ── 54. GAMAY: Carbonic Dundee Hills ──
  {
    id: "dundee-gamay-001",
    grape: "Gamay",
    region: "Willamette Valley",
    ava: "Dundee Hills",
    style: "Light Red",
    body: "light",
    acidity: "high",
    tannin: "soft",
    oak: "none",
    aromas: ["fresh raspberry", "bubblegum", "violet", "crushed granite", "banana"],
    clues: [
      "Electric magenta-purple. Fresh raspberry, bubblegum, violet, and an almost candied character. Youthful and loud.",
      "Light body with juicy, racy acidity and almost no tannin. Drink it slightly chilled for maximum enjoyment.",
      "Semi-carbonic maceration \u2014 whole berries ferment inside their skins before being pressed, creating the candy-like aromatics.",
      "The volcanic Jory soil gives even this lightest of reds a subtle mineral undertow beneath the exuberant fruit.",
      "Carbonic Gamay from Dundee Hills \u2014 Beaujolais Nouveau energy from Oregon\u2019s most famous volcanic terroir."
    ],
    explanation: "Carbonic Gamay from Dundee Hills is pure hedonistic joy. Semi-carbonic maceration creates the signature bubblegum and banana notes (the same intracellular fermentation chemistry as Beaujolais Nouveau), while the Jory volcanic soil adds an unexpected mineral depth beneath the candy-shop exuberance.",
    difficulty: 2,
  },

  // ── 55. SPARKLING: Eola-Amity P\u00e9t-Nat Ros\u00e9 ──
  {
    id: "eola-petnat-001",
    grape: "Sparkling",
    region: "Willamette Valley",
    ava: "Eola-Amity Hills",
    style: "P\u00e9tillant Naturel",
    body: "light",
    acidity: "high",
    tannin: "soft",
    oak: "none",
    aromas: ["crushed raspberry", "sourdough", "pink grapefruit", "wild yeast", "fresh herbs"],
    clues: [
      "Hazy, cloudy pink with playful, uneven bubbles. Crushed raspberry, sourdough, pink grapefruit, and wild herbs.",
      "Light body with high acidity, rustic carbonation, and a hint of tannic grip from the skins. Funky and alive.",
      "M\u00e9thode ancestrale with Pinot Noir \u2014 bottled during primary fermentation, unfiltered, undisgorged. This wine is still alive.",
      "The natural wine movement\u2019s favorite format meets the Willamette Valley\u2019s best grape.",
      "Eola-Amity p\u00e9t-nat ros\u00e9 \u2014 Pinot Noir bottled mid-ferment, cloudy, funky, and electric with Van Duzer acidity."
    ],
    explanation: "P\u00e9tillant naturel ros\u00e9 from Eola-Amity Hills is where Oregon\u2019s natural wine movement meets its most iconic terroir. Pinot Noir juice is bottled during primary fermentation, trapping CO2 naturally. The result is a hazy, funky, vibrantly alive pink wine with the Van Duzer Corridor\u2019s trademark electric acidity.",
    difficulty: 3,
  },
];
