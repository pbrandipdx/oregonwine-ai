/**
 * Wine pool for the Blind Tasting game.
 * 20 archetype wines from the Willamette Valley with 5 progressive clue layers each.
 */

export type Grape = "Pinot Noir" | "Chardonnay" | "Pinot Gris" | "Gamay" | "Sparkling" | "Rosé" | "Syrah" | "Cabernet Franc";
export type AVA = "Willamette Valley" | "Dundee Hills" | "Eola-Amity Hills" | "Ribbon Ridge" | "Yamhill-Carlton" | "McMinnville" | "Chehalem Mountains";
export type Style = "Elegant Red" | "Structured Red" | "Aromatic White" | "Rich White" | "Rosé" | "Sparkling" | "Light Red" | "Bold Red";

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

export const GRAPE_OPTIONS: Grape[] = ["Pinot Noir", "Chardonnay", "Pinot Gris", "Gamay", "Sparkling", "Rosé", "Syrah", "Cabernet Franc"];
export const AVA_OPTIONS: AVA[] = ["Willamette Valley", "Dundee Hills", "Eola-Amity Hills", "Ribbon Ridge", "Yamhill-Carlton", "McMinnville", "Chehalem Mountains"];
export const STYLE_OPTIONS: Style[] = ["Elegant Red", "Structured Red", "Aromatic White", "Rich White", "Rosé", "Sparkling", "Light Red", "Bold Red"];

export const WINES: BlindTastingWine[] = [
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
      "This AVA is the spiritual heart of Willamette Valley Pinot Noir — the first to gain recognition.",
      "Deep red Jory soil. If you've ever seen that iron-rich clay stick to your boots, you know this place."
    ],
    explanation: "Dundee Hills is the birthplace of world-class Willamette Valley Pinot Noir. The volcanic Jory soils — deep, red, iron-rich — give wines their signature purity of fruit, bright acidity, and silky texture. This is where David Lett planted the first Pinot Noir vines in 1965.",
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
      "Medium body but firm, polished tannins. The acidity is electric — almost crackling. Built for aging.",
      "Afternoon marine winds funnel through a gap in the Coast Range, dropping temperatures by 30+ degrees.",
      "The AVA sits at the southern end of the valley where volcanic and sedimentary soils collide.",
      "The Van Duzer Corridor. Wines from here have a wind-driven tension and savory structure unlike anything else in the valley."
    ],
    explanation: "Eola-Amity Hills wines are shaped by the Van Duzer Corridor — a gap in the Coast Range that funnels cool marine air into the vineyards every afternoon. The result is wines with electric acidity, firm tannins, and a savory, structured profile that ages beautifully.",
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
      "Medium body with fine-grained tannins and good acidity. Dense but not heavy — compact and site-driven.",
      "Marine sedimentary soils on a small, protected ridge. The vines are sheltered from the worst weather.",
      "This is one of the smallest AVAs in the Willamette Valley — a nested sub-region with only a handful of producers.",
      "Willakenzie soil on a compact ridge that was once the floor of an ancient ocean. Only 3.5 miles long."
    ],
    explanation: "Ribbon Ridge is one of the Willamette Valley's smallest and most distinctive AVAs. The marine sedimentary Willakenzie soils and protected microclimate produce Pinot Noirs that are compact, dense, and finely textured — wines that reward patience.",
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
      "Ancient ocean-floor soils — marine sedimentary, not volcanic. The vines root into sandy, silty loam.",
      "This AVA wraps around two small towns north of McMinnville, known for both Pinot and some of the valley's best restaurants.",
      "Willakenzie and Peavine soils. The wines are darker-fruited and earthier than their volcanic neighbors to the east."
    ],
    explanation: "Yamhill-Carlton sits on ancient marine sedimentary soils that give its Pinot Noirs a distinctly broader, darker-fruited character. The wines tend to be generous and earthy — cola, spice, and loam alongside dark berry fruit.",
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
      "This AVA is less celebrated than its neighbors but produces some of the valley's most age-worthy wines.",
      "Shallow basalt and marine sedimentary soils on the western edge of the valley. The newest AVA in Willamette."
    ],
    explanation: "McMinnville AVA sits on the western foothills of the Coast Range. Its shallow basalt and marine sedimentary soils, combined with strong ocean influence, produce firm, savory Pinot Noirs with excellent aging potential — the valley's best-kept secret.",
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
      "Three different soil types converge here — volcanic, marine sedimentary, and wind-blown loess. Each vineyard is different.",
      "This AVA is the closest to Portland, stretching across a mountain range with diverse exposures.",
      "Laurelwood loess — wind-blown silt deposited over basalt during the Ice Age. A soil found nowhere else in the valley."
    ],
    explanation: "The Chehalem Mountains are unique in having three distinct soil types — volcanic basalt, marine sedimentary, and Laurelwood loess — sometimes in the same vineyard. This diversity produces Pinot Noirs that range from powerful to delicate, depending on exactly where the vines are planted.",
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
      "This is the broadest appellation in the region — a blend of vineyard sites rather than a single sub-AVA.",
      "A valley-wide cuvée showing the region's signature: bright fruit, fresh acidity, and earthy undertones."
    ],
    explanation: "A Willamette Valley appellation Pinot Noir is typically a blend of fruit from multiple vineyard sites and sub-AVAs. These wines showcase the region's signature cool-climate character: bright red fruit, fresh acidity, and a gentle earthy complexity.",
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
      "The same corridor of wind that cools these vines also stress them — small berries, thick skins, intense extraction.",
      "A single-vineyard bottling from the heart of the Van Duzer zone. These wines need a decade in the cellar."
    ],
    explanation: "The most intense expressions of Eola-Amity Hills come from old vines on steep volcanic slopes in the Van Duzer Corridor. Whole-cluster fermentation and tiny yields produce wines of extraordinary concentration — dark, savory, tannic, and built for decades of aging.",
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
      "This grape has been Oregon's quiet revolution — plantings have tripled in the last decade.",
      "Dijon clones on volcanic soil. The Willamette Valley is proving it can rival the Côte de Beaune for this variety."
    ],
    explanation: "Willamette Valley Chardonnay is one of Oregon's most exciting developments. Cool-climate conditions and Dijon clones produce wines with the tension and mineral drive of white Burgundy — bright acidity, citrus and stone fruit, with restrained oak influence.",
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
      "This AVA produces the most Burgundian whites in the valley — sommeliers are starting to take notice.",
      "Van Duzer Corridor Chardonnay. The constant wind stress produces wines of extraordinary tension and focus."
    ],
    explanation: "Eola-Amity Hills is emerging as one of the great American Chardonnay sites. The Van Duzer Corridor's cooling influence and shallow volcanic soils produce whites of exceptional mineral tension — chalky, saline, and electric with acidity.",
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
    explanation: "Dundee Hills is primarily known for Pinot Noir, but its Jory-soil Chardonnays are gaining cult status. The volcanic soils impart a golden richness and mineral depth, while the site's natural warmth produces rounder, more generous whites than the wind-cooled Eola-Amity Hills.",
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
      "Medium body with moderate acidity and a soft, round texture. Unoaked — all fruit and flower.",
      "This grape is Oregon's second most planted variety. The cool climate preserves its delicate aromatics.",
      "The Alsatian connection: David Lett planted this variety alongside Pinot Noir in the 1960s.",
      "Oregon-style Pinot Gris — drier and crisper than its Italian cousin, more aromatic than most Alsatian versions."
    ],
    explanation: "Oregon Pinot Gris has carved its own identity — drier and more structured than Italian Pinot Grigio, with more aromatic lift than Alsatian versions. It's the state's second most planted grape and the quintessential patio wine of the Willamette Valley.",
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
      "Laurelwood soil — Ice Age loess that creates wines with a distinctive stony, mineral spine."
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
      "The same grape as the crisp, stainless-steel version — but treated more like Chardonnay in the cellar.",
      "Reserve-style Pinot Gris with lees aging and French oak. Some Oregon producers are pushing this variety into new territory."
    ],
    explanation: "Some Willamette Valley producers are making reserve-style Pinot Gris with skin contact, barrel fermentation, and lees aging. The result is a rich, textured white that challenges assumptions about this grape — more Alsatian Grand Cru than patio sipper.",
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
      "Light body with high acidity and creamy mousse. Méthode traditionnelle — the same process used in Champagne.",
      "Cool-climate fruit with natural high acidity is ideal for sparkling wine production.",
      "Oregon's sparkling wine scene has exploded in the last decade. Major Champagne houses have invested here.",
      "Willamette Valley sparkling — made from Pinot Noir and Chardonnay, the same grapes used in Champagne."
    ],
    explanation: "The Willamette Valley's cool climate and natural high-acid fruit make it ideal for méthode traditionnelle sparkling wine. Major Champagne houses like Louis Roederer have invested in the region, and Oregon sparkling is now competing on the world stage.",
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
      "Medium body with fine bubbles and a rich, creamy texture. Extended aging on the lees — 4+ years.",
      "Vintage-dated sparkling wine from a single exceptional harvest. Not a multi-year blend.",
      "The same volcanic soil that produces world-class Pinot Noir adds mineral depth to this wine's base.",
      "Dundee Hills vintage brut — a single-vineyard sparkling wine with Jory soil character and years of lees aging."
    ],
    explanation: "Vintage-dated sparkling wine from Dundee Hills represents the pinnacle of Oregon's sparkling ambition. Extended lees aging (4+ years) builds complexity — toasty, nutty, honeyed — while the volcanic Jory soils add a mineral depth that sets it apart from Champagne.",
    difficulty: 3,
  },

  // ── ROSÉ: Willamette Valley (Easy) ──
  {
    id: "wv-rose-001",
    grape: "Rosé",
    region: "Willamette Valley",
    ava: "Willamette Valley",
    style: "Rosé",
    body: "light",
    acidity: "bright",
    tannin: "none",
    oak: "none",
    aromas: ["watermelon", "strawberry", "pink grapefruit", "white pepper", "herbs"],
    clues: [
      "Pale salmon-pink. Watermelon, wild strawberry, pink grapefruit, and a dusting of white pepper.",
      "Light body with bright acidity and a crisp, dry finish. Refreshing and savory, not sweet.",
      "Made from the same grape that dominates the valley's red wine production — just pressed off the skins early.",
      "Cool-climate rosé with more acidity and less fruit sweetness than warm-region versions.",
      "Pinot Noir rosé — the same variety, picked early and pressed quickly for a delicate pink wine."
    ],
    explanation: "Willamette Valley rosé is almost always made from Pinot Noir. The cool climate produces rosés with bright acidity, delicate fruit, and a dry, savory character — more Provençal in spirit than many American rosés.",
    difficulty: 1,
  },

  // ── ROSÉ: Deeper style (Medium) ──
  {
    id: "wv-rose-002",
    grape: "Rosé",
    region: "Willamette Valley",
    ava: "Eola-Amity Hills",
    style: "Rosé",
    body: "medium",
    acidity: "high",
    tannin: "soft",
    oak: "none",
    aromas: ["blood orange", "raspberry", "dried herbs", "saline", "crushed stone"],
    clues: [
      "Deep salmon, almost copper. Blood orange, raspberry, dried herbs, and a saline minerality.",
      "Medium body with high acidity and a hint of tannic grip. This rosé has structure — almost like a light red.",
      "Saignée method — bled off from a red wine fermentation, not direct-pressed. More color, more body.",
      "The same wind corridor that structures this region's reds also gives the rosé unusual intensity.",
      "Eola-Amity Hills saignée rosé — wind-cooled, mineral-driven, with more backbone than any pink wine has a right to."
    ],
    explanation: "Saignée rosé from the Eola-Amity Hills is a different animal from typical direct-press rosé. Bled from Pinot Noir fermentations, it carries more color, body, and tannic structure — amplified by the Van Duzer Corridor's cooling influence.",
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
      "This is NOT Pinot Noir — the color is too vibrant, the tannins too low, the fruit too juicy.",
      "Beaujolais' signature grape has found a second home in the Willamette Valley's cool climate.",
      "Oregon Gamay Noir — often made with carbonic maceration for that vibrant, crunchy, Beaujolais-like character."
    ],
    explanation: "Gamay Noir is Beaujolais' signature grape, and it thrives in the Willamette Valley's cool climate. Oregon producers often use carbonic maceration — the same technique used in Beaujolais — to create wines with vibrant fruit, crunchy acidity, and barely any tannin.",
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
      "This is a Bordeaux variety that few associate with the Willamette Valley — but a handful of producers grow it.",
      "The same cool climate that makes great Pinot also produces unusually elegant, Loire-like versions of this grape.",
      "Oregon Cabernet Franc — grown in tiny quantities, showing more Chinon than Napa in character."
    ],
    explanation: "Cabernet Franc is a rare find in the Willamette Valley, but a few adventurous producers grow it. The cool climate produces wines that taste more like Loire Valley Chinon than Napa — herbal, peppery, medium-bodied, and elegant.",
    difficulty: 4,
  },
];
