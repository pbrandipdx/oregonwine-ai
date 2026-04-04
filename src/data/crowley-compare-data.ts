/* ── Crowley Wines Compare Data ── */
/* Compare within Crowley only — vineyards, wines, and winemaking styles. */

import type { CompareCategory, CategoryOption, Comparison } from "./compare-data";

export type CWCompareCategory = "vineyards" | "wines" | "experiences";

export const CW_CATEGORIES: CategoryOption[] = [
  { id: "vineyards" as CompareCategory, title: "Two Vineyards", description: "How terroir shapes the glass — same winery, different sites" },
  { id: "wines" as CompareCategory, title: "Two Wines", description: "Side by side from Crowley's cellar" },
  { id: "experiences" as CompareCategory, title: "Winemaking Styles", description: "The choices that define Crowley's voice" },
];

export const CW_COMPARISONS: Comparison[] = [
  // ── Vineyards ──
  {
    id: "four-winds-vs-la-colina",
    category: "vineyards" as CompareCategory,
    subtitle: "McMinnville volcanic vs Dundee Hills Jory",
    sideA: {
      name: "Four Winds Vineyard",
      tagline: "High-elevation volcanic power in the McMinnville foothills",
      attributes: [
        { label: "Location", value: "McMinnville AVA, 800+ feet elevation on the eastern slopes of the Coast Range." },
        { label: "Soil", value: "Volcanic basalt and clay. Thin, rocky soils that stress the vines and concentrate flavor." },
        { label: "Character", value: "Structured, savory, herbal. The high elevation and coastal influence bring both power and freshness." },
        { label: "In the Glass", value: "Bordeaux cherry, blood orange, anise, rosemary, morel mushroom. Firm tannins with a savory, mineral finish." },
      ],
    },
    sideB: {
      name: "La Colina Vineyard",
      tagline: "Generous warmth from the Dundee Hills",
      attributes: [
        { label: "Location", value: "Dundee Hills AVA, 600 feet elevation. Planted in 1999 on south-facing slopes." },
        { label: "Soil", value: "Jory volcanic clay — deep, iron-rich, red, and well-drained. The signature soil of the Dundee Hills." },
        { label: "Character", value: "Generous, round, fruit-forward. The deeper Jory soils and warmer site produce rounder, more approachable wines." },
        { label: "In the Glass", value: "Maple candy, raspberry, currant, dried hibiscus, graphite. Polished tannins with a warm, enveloping finish." },
      ],
    },
    verdict: "Four Winds is the mountain — angular, savory, built for contemplation. La Colina is the valley — generous, warm, built for pleasure. Both are volcanic, but they could not be more different. Four Winds demands your attention with structure and herbs. La Colina wins your heart with fruit and generosity. Crowley's genius is farming both and letting them speak for themselves.",
  },
  {
    id: "la-colina-vs-sojeau",
    category: "vineyards" as CompareCategory,
    subtitle: "Dundee Hills warmth vs Eola-Amity wind",
    sideA: {
      name: "La Colina Vineyard",
      tagline: "Fruit-forward elegance from the Dundee Hills",
      attributes: [
        { label: "Location", value: "Dundee Hills AVA, 600 feet elevation on deep Jory volcanic clay." },
        { label: "Soil", value: "Jory — the iron-rich, red volcanic soil that makes the Dundee Hills famous." },
        { label: "Character", value: "Generous and round. The warmer Dundee Hills site and deep soils create a riper, more approachable style." },
        { label: "In the Glass", value: "Raspberry, currant, maple candy, dried hibiscus. Soft, polished, inviting." },
      ],
    },
    sideB: {
      name: "Sojeau Vineyard",
      tagline: "Wind-sculpted intensity from the Eola-Amity Hills",
      attributes: [
        { label: "Location", value: "Eola-Amity Hills AVA, directly in the path of the Van Duzer Corridor." },
        { label: "Soil", value: "Rocky Nekia volcanic soil — shallower and rockier than Jory, with excellent drainage." },
        { label: "Character", value: "Angular, taut, dramatic. The relentless Van Duzer winds thicken skins and concentrate flavors." },
        { label: "In the Glass", value: "Black cherry, sarsaparilla, pink peppercorn, sage, pine needle. Electric acidity with a saline finish." },
      ],
    },
    verdict: "La Colina is the warm embrace — soft fruit, round tannins, and the easy generosity of the Dundee Hills. Sojeau is the cold wind — angular, spicy, and shaped by the Van Duzer Corridor into something wild and electric. Taste them side by side and you understand why AVA matters more than variety. Same grape, same winemaker, completely different wines. Sojeau is the more exciting of the two, but La Colina is the one you'll finish first.",
  },
  {
    id: "four-winds-vs-tukwilla",
    category: "vineyards" as CompareCategory,
    subtitle: "McMinnville mountain vs Dundee Hills heritage",
    sideA: {
      name: "Four Winds Vineyard",
      tagline: "Crowley's home base at 800+ feet",
      attributes: [
        { label: "Location", value: "McMinnville AVA, 800+ feet elevation. Coast Range influence keeps things cool." },
        { label: "Soil", value: "Volcanic basalt and clay at high elevation. Rocky, thin, well-drained." },
        { label: "Character", value: "Bold, structured, herbal. These are wines with real backbone and savory complexity." },
        { label: "In the Glass", value: "Dark cherry, blood orange, anise, blueberry, morel mushroom. Structured and age-worthy." },
      ],
    },
    sideB: {
      name: "Tukwilla Vineyard",
      tagline: "Ethereal old vines below Eyrie",
      attributes: [
        { label: "Location", value: "Dundee Hills AVA. Nestled directly below the legendary Eyrie Vineyards." },
        { label: "Soil", value: "Volcanic Dundee Hills soils. Organic and dry-farmed since planting in 1994." },
        { label: "Character", value: "Elegant, transparent, light-bodied. Old-vine finesse with a gossamer texture." },
        { label: "In the Glass", value: "Wild strawberry, rose petal, tea leaf, dried herbs. Ethereal tannins, lifting acidity." },
      ],
    },
    verdict: "This is Crowley's most dramatic internal contrast. Four Winds is the mountain athlete — muscular, herbal, built for the long haul. Tukwilla is the ballet dancer — light, graceful, and gone before you realize how extraordinary it was. Four Winds shows what volcanic soils do at extreme elevation. Tukwilla shows what 30-year-old organic vines do in the Dundee Hills. Both are brilliant. Tukwilla is the one that haunts you.",
  },

  // ── Wines ──
  {
    id: "wv-pinot-vs-entre-nous",
    category: "wines" as CompareCategory,
    subtitle: "The blend vs the barrel selection",
    sideA: {
      name: "Willamette Valley Pinot Noir",
      tagline: "Four vineyards, one joyful glass",
      attributes: [
        { label: "Approach", value: "Multi-vineyard blend from La Colina, Tukwilla, Four Winds, and Sojeau. The full Crowley palette." },
        { label: "Profile", value: "Red berries, strawberry, sweet basil, pomegranate. Smooth, silky, approachable." },
        { label: "Price Point", value: "$28 — Crowley's most accessible entry point." },
        { label: "Best For", value: "Weeknight dinner, a party, or introducing someone to Crowley's pure, low-intervention style." },
      ],
    },
    sideB: {
      name: "Entre Nous Pinot Noir",
      tagline: "Between us — the best barrels, unfiltered",
      attributes: [
        { label: "Approach", value: "Barrel selection from Four Winds. 50% new oak. Bottled unfined and unfiltered." },
        { label: "Profile", value: "Resinous flint, cacao powder, strawberry, mandarin orange, maple candy. Dense and layered." },
        { label: "Price Point", value: "$50 — Crowley's most concentrated Pinot Noir." },
        { label: "Best For", value: "A special dinner, contemplative drinking, or showing someone what small-production Oregon can do." },
      ],
    },
    verdict: "The Willamette Valley blend is Crowley's smile — bright, generous, and impossible not to like. Entre Nous is Crowley's whisper — intimate, concentrated, and meant for those who lean in close. At $28, the WV Pinot is one of Oregon's best values. At $50, Entre Nous is one of Oregon's best secrets. Buy the blend by the case and the Entre Nous for the nights that matter.",
  },
  {
    id: "phoebe-vs-helen",
    category: "wines" as CompareCategory,
    subtitle: "Two grandmothers, two clones, two philosophies",
    sideA: {
      name: "Phoebe Chardonnay",
      tagline: "Sunshine, richness, and warmth",
      attributes: [
        { label: "Clone", value: "Wente — a heritage California clone known for opulence and aromatic intensity." },
        { label: "Oak", value: "40% new oak, 18 months on lees. The most generously oaked wine Crowley makes." },
        { label: "Profile", value: "Lemon custard, vanilla seed, dried apricot, honeycomb, gingersnap. Golden and rich." },
        { label: "Recognition", value: "97 points from Decanter — Crowley's highest-scoring wine." },
      ],
    },
    sideB: {
      name: "Helen Chardonnay",
      tagline: "Precision, restraint, and mineral clarity",
      attributes: [
        { label: "Clone", value: "Draper — a leaner, more austere clone prized for mineral expression." },
        { label: "Oak", value: "Picked early and pressed green. Less new oak, more tension." },
        { label: "Profile", value: "Green pear, salty grapefruit, lime zest, sea shell, camomile tea. Pale and taut." },
        { label: "Recognition", value: "96 points from Decanter — one point behind Phoebe, but a completely different wine." },
      ],
    },
    verdict: "Phoebe and Helen are the most fascinating comparison in Crowley's cellar. Same vineyard, same vintage, same winemaker — but different clones and different philosophies create wines that stand on opposite sides of the Chardonnay spectrum. Phoebe is the grandmother who baked cookies. Helen is the grandmother who took you on long walks. Both named for Tyson Crowley's actual grandmothers, these wines are deeply personal. Phoebe will wow you. Helen will change how you think about Chardonnay.",
  },
  {
    id: "pinot-noir-vs-chardonnay",
    category: "wines" as CompareCategory,
    subtitle: "Red and white from the same terroir",
    sideA: {
      name: "Crowley Pinot Noir",
      tagline: "The heart of the winery",
      attributes: [
        { label: "Grape", value: "Pinot Noir — Crowley's primary focus, sourced from four vineyards across three AVAs." },
        { label: "Profile", value: "Red fruit, earth, herbs, lower alcohol. Pure, transparent, minimal-intervention." },
        { label: "Food Pairing", value: "Wild salmon, roasted duck, chanterelle mushrooms, herb-roasted chicken." },
        { label: "Best For", value: "Anyone who believes great Pinot Noir should taste like a place, not a winemaking technique." },
      ],
    },
    sideB: {
      name: "Crowley Chardonnay",
      tagline: "The hidden gem",
      attributes: [
        { label: "Grape", value: "Chardonnay — all from Four Winds Vineyard, spanning zero-oak to 40% new oak." },
        { label: "Profile", value: "Mineral, citrus, stone fruit. Chablis-like at the entry level, richer in Phoebe and Helen." },
        { label: "Food Pairing", value: "Oysters, Dungeness crab, roasted halibut, goat cheese." },
        { label: "Best For", value: "The wine drinker who thinks they don't like Chardonnay — because they haven't tried Crowley's." },
      ],
    },
    verdict: "Crowley is known as a Pinot Noir house, and fairly so — the single-vineyard designates are extraordinary. But the Chardonnay program is where Tyson Crowley is quietly doing some of Oregon's most exciting work. The Pinot Noir shows you the Willamette Valley's range. The Chardonnay shows you what Oregon can do when it stops trying to be California. If you leave Crowley without trying the Chardonnay, you've missed half the story.",
  },

  // ── Winemaking Styles ──
  {
    id: "native-yeast-vs-commercial",
    category: "experiences" as CompareCategory,
    subtitle: "Wild fermentation vs controlled precision",
    sideA: {
      name: "Native Yeast Fermentation",
      tagline: "Let the vineyard do the talking",
      attributes: [
        { label: "What It Is", value: "Fermentation using only the wild yeasts present on the grape skins and in the winery. No commercial yeast inoculation." },
        { label: "Crowley's Approach", value: "100% native yeast across all wines. Crowley believes commercial yeast masks terroir and imposes a uniform character." },
        { label: "In the Glass", value: "More complex aromas, longer fermentations, greater vintage variation. Each wine reflects its site and year." },
        { label: "The Risk", value: "Slower, less predictable fermentations. Requires healthy fruit and meticulous cellar work." },
      ],
    },
    sideB: {
      name: "Commercial Yeast",
      tagline: "Reliable results, every time",
      attributes: [
        { label: "What It Is", value: "Inoculating the must with selected yeast strains bred for specific flavor profiles and fermentation reliability." },
        { label: "Common Use", value: "The industry standard for most wineries worldwide. Offers control, speed, and consistency." },
        { label: "In the Glass", value: "Cleaner, more predictable aromatics. Less vintage variation. Specific flavor profiles can be dialed in." },
        { label: "The Trade-off", value: "Some argue commercial yeast can create a sameness across wines, masking the unique voice of the vineyard." },
      ],
    },
    verdict: "Crowley doesn't just prefer native yeast — they insist on it. Every wine in the cellar ferments with wild yeasts only, a commitment that requires pristine fruit and a willingness to let nature lead. The result is wines that taste like themselves rather than a yeast packet. Commercial yeast makes great wine — nobody is arguing otherwise. But native yeast makes wine that could only come from one place, one year, one set of hands. That's the Crowley thesis, and every bottle proves it.",
  },
  {
    id: "new-oak-vs-neutral",
    category: "experiences" as CompareCategory,
    subtitle: "Seasoning vs transparency",
    sideA: {
      name: "New Oak Aging",
      tagline: "Structure, spice, and vanilla",
      attributes: [
        { label: "What It Is", value: "Aging wine in newly coopered French oak barrels that impart vanilla, toast, spice, and tannin structure." },
        { label: "Crowley's Range", value: "From 0% new oak (WV Chardonnay) to 40% (Phoebe) to 50% (Entre Nous) and up to 66% on select lots." },
        { label: "In the Glass", value: "Vanilla, baking spice, toast, added richness and body. More textural complexity and tannin structure." },
        { label: "Best Expressed In", value: "Phoebe Chardonnay (40% new, 18 months on lees) and Entre Nous Pinot Noir (50% new, unfined/unfiltered)." },
      ],
    },
    sideB: {
      name: "Neutral Oak Aging",
      tagline: "The barrel as vessel, not ingredient",
      attributes: [
        { label: "What It Is", value: "Aging wine in older barrels (3+ years) that no longer impart oak flavor, allowing pure fruit and terroir expression." },
        { label: "Crowley's Use", value: "Most single-vineyard Pinot Noirs and the entry-level Chardonnay see little to no new oak." },
        { label: "In the Glass", value: "Purer fruit, more transparent terroir, leaner texture. The wine tastes like the grape and the place." },
        { label: "Best Expressed In", value: "WV Chardonnay (zero new oak, 12.5% alcohol) and Helen Chardonnay (picked early, pressed green)." },
      ],
    },
    verdict: "Crowley's oak philosophy is a spectrum, not a dogma. The WV Chardonnay sees zero new oak and tastes like Chablis. Phoebe Chardonnay sees 40% new oak and tastes like liquid sunshine. Both are great. The difference is intention: new oak adds richness and structure where the winemaker wants it; neutral oak stays out of the way and lets the vineyard talk. Crowley's range from 0% to 66% shows that oak is a tool, not an ideology. The smartest thing they do is match the oak to the wine, not the other way around.",
  },
  {
    id: "unfined-unfiltered-vs-fined-filtered",
    category: "experiences" as CompareCategory,
    subtitle: "Raw truth vs polished clarity",
    sideA: {
      name: "Unfined & Unfiltered",
      tagline: "Nothing added, nothing removed",
      attributes: [
        { label: "What It Is", value: "Bottling wine without fining agents (egg whites, bentonite) or filtration. The wine goes from barrel to bottle as-is." },
        { label: "Crowley's Approach", value: "Entre Nous is always bottled unfined and unfiltered. Select lots of single-vineyard wines follow the same path." },
        { label: "In the Glass", value: "Greater texture, more aromatic complexity, sometimes a slight haze. The full, unedited expression of the wine." },
        { label: "The Trade-off", value: "Possible sediment in the bottle. Requires careful cellar work and healthy, clean fruit." },
      ],
    },
    sideB: {
      name: "Fined & Filtered",
      tagline: "Polished, bright, and stable",
      attributes: [
        { label: "What It Is", value: "Using fining agents and/or filtration to clarify, stabilize, and polish the wine before bottling." },
        { label: "Common Use", value: "Standard practice for most wines worldwide. Ensures clarity, stability, and shelf consistency." },
        { label: "In the Glass", value: "Bright, clear appearance. Clean aromatics. More predictable and stable over time." },
        { label: "The Trade-off", value: "Some argue fining and filtering can strip texture, aromatics, and mid-palate weight from wine." },
      ],
    },
    verdict: "Unfined and unfiltered is the winemaking equivalent of a live recording — raw, textured, and full of life. Fined and filtered is the studio album — polished, clear, and built to last. Crowley's Entre Nous is the purest expression of the unfined/unfiltered philosophy: a barrel selection bottled with nothing added and nothing taken away. The result is a wine with extraordinary textural depth and aromatic complexity. Not every wine needs this treatment, and Crowley knows it. But when the barrels are exceptional, the best thing a winemaker can do is get out of the way.",
  },
];
