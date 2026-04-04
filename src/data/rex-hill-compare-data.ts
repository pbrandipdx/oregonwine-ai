/* ── Rex Hill Compare Data ── */
/* Compare within Rex Hill only — vineyards, wines, and experiences. */

import type { CompareCategory, CategoryOption, Comparison } from "./compare-data";

export type RHCompareCategory = "vineyards" | "wines" | "experiences";

export const RH_CATEGORIES: CategoryOption[] = [
  { id: "vineyards" as CompareCategory, title: "Two Vineyards", description: "How terroir shapes the glass — same winery, different sites" },
  { id: "wines" as CompareCategory, title: "Two Wines", description: "Side by side from Rex Hill's cellar" },
  { id: "experiences" as CompareCategory, title: "Tasting Experiences", description: "Find the visit that fits you best" },
];

export const RH_COMPARISONS: Comparison[] = [
  // ── Vineyards ──
  {
    id: "jacob-hart-vs-sims",
    category: "vineyards" as CompareCategory,
    subtitle: "Volcanic power vs sedimentary finesse",
    sideA: {
      name: "Jacob-Hart Vineyard",
      tagline: "Deep volcanic soul of the Dundee Hills",
      attributes: [
        { label: "Location", value: "Dundee Hills AVA, south-facing slopes at 500–700 ft elevation." },
        { label: "Soil", value: "Jory volcanic clay — iron-rich, red, well-drained. The signature soil of the Dundee Hills." },
        { label: "Character", value: "Bold, dark-fruited, structured. These vines push deep into ancient basalt and emerge with concentration." },
        { label: "In the Glass", value: "Black cherry, iron, dried herbs, cola. Generous mid-palate with firm, age-worthy tannins." },
      ],
    },
    sideB: {
      name: "Sims Vineyard",
      tagline: "Marine sediment elegance on the Chehalem bench",
      attributes: [
        { label: "Location", value: "Chehalem Mountains AVA, gentle slopes with afternoon sun exposure." },
        { label: "Soil", value: "Willakenzie marine sedimentary — sandstone and siltstone. Ancient seabed lifted into the hills." },
        { label: "Character", value: "Bright, precise, mineral-driven. The cooler site brings lifted aromatics and racy acidity." },
        { label: "In the Glass", value: "Red currant, wet stone, white pepper, citrus peel. Lean and electric with a long, savory finish." },
      ],
    },
    verdict: "Jacob-Hart is the power chord; Sims is the violin solo. Both are Rex Hill at their finest, but they speak different languages of place. Jacob-Hart rewards patience with depth and richness. Sims rewards attention with precision and nuance. Drink them side by side and you'll understand why terroir matters.",
  },
  {
    id: "maresh-vs-weber",
    category: "vineyards" as CompareCategory,
    subtitle: "Old-vine heritage vs high-elevation ambition",
    sideA: {
      name: "Maresh Vineyard",
      tagline: "Some of Oregon's oldest Pinot Noir vines",
      attributes: [
        { label: "Location", value: "Dundee Hills AVA. Planted in 1970 — among the earliest Pinot Noir plantings in Oregon." },
        { label: "Soil", value: "Jory volcanic clay over ancient basalt bedrock." },
        { label: "Character", value: "Old-vine concentration with a sense of history in every sip. Low yields, deep roots, profound complexity." },
        { label: "In the Glass", value: "Dried rose, mushroom, dark earth, black tea. Silky texture with haunting persistence." },
      ],
    },
    sideB: {
      name: "Weber Vineyard",
      tagline: "Cool-climate clarity from the Dundee slopes",
      attributes: [
        { label: "Location", value: "Dundee Hills AVA. Higher elevation blocks with excellent air drainage." },
        { label: "Soil", value: "Jory volcanic — similar parent material to Maresh, but thinner soils at higher elevation." },
        { label: "Character", value: "Brighter and more aromatic than the lower sites. The altitude brings freshness and lift." },
        { label: "In the Glass", value: "Bright cherry, violet, crushed rock, baking spice. Vibrant acidity with silky tannins." },
      ],
    },
    verdict: "Maresh is the elder — a wine that speaks with the quiet authority of 50+ year old vines. Weber is the prodigy — bright, energetic, and full of promise. If you want depth and contemplation, reach for Maresh. If you want vibrancy and exuberance, Weber is calling.",
  },
  {
    id: "jacob-hart-vs-croft",
    category: "vineyards" as CompareCategory,
    subtitle: "Dundee Hills depth vs Ribbon Ridge refinement",
    sideA: {
      name: "Jacob-Hart Vineyard",
      tagline: "Volcanic concentration from the Dundee core",
      attributes: [
        { label: "Location", value: "Dundee Hills AVA. Heart of the volcanic terroir." },
        { label: "Soil", value: "Jory volcanic clay — deep, iron-rich, complex." },
        { label: "Character", value: "Dense, layered, powerful. Wines with real stuffing that reward cellaring." },
        { label: "In the Glass", value: "Dark cherry, espresso, dried sage, graphite. Bold but balanced." },
      ],
    },
    sideB: {
      name: "Croft Vineyard",
      tagline: "Cool elegance from Ribbon Ridge",
      attributes: [
        { label: "Location", value: "Ribbon Ridge AVA. One of Oregon's smallest and most distinctive sub-appellations." },
        { label: "Soil", value: "Willakenzie marine sedimentary. Fine-grained, well-drained soils perfect for Pinot." },
        { label: "Character", value: "Ethereal, perfumed, graceful. Wines that float rather than pound the table." },
        { label: "In the Glass", value: "Raspberry, rose petal, tea leaf, fine herbs. Delicate tannins and lovely persistence." },
      ],
    },
    verdict: "This is Rex Hill's internal terroir debate distilled into two glasses. Jacob-Hart makes the case for volcanic power — big, generous, warm. Croft makes the case for sedimentary grace — lithe, aromatic, haunting. Together they show why Rex Hill farms across multiple AVAs: no single site tells the whole story.",
  },

  // ── Wines ──
  {
    id: "pinot-vs-chard",
    category: "wines" as CompareCategory,
    subtitle: "The king and queen of Willamette Valley",
    sideA: {
      name: "Rex Hill Pinot Noir",
      tagline: "The wine that built the reputation",
      attributes: [
        { label: "Grape", value: "Pinot Noir — Rex Hill's flagship. Multi-vineyard blend showcasing the full estate." },
        { label: "Profile", value: "Red and dark cherry, earth, dried herbs, subtle oak. Medium-bodied with elegant structure." },
        { label: "Food Pairing", value: "Roasted duck, mushroom risotto, grilled salmon, aged Gruyere." },
        { label: "Best For", value: "The wine lover who appreciates complexity and terroir expression in every sip." },
      ],
    },
    sideB: {
      name: "Rex Hill Chardonnay",
      tagline: "Oregon Chardonnay at its most refined",
      attributes: [
        { label: "Grape", value: "Chardonnay — Dijon clones suited to the cool Willamette climate." },
        { label: "Profile", value: "Golden apple, pear, lemon curd, subtle hazelnut. Balanced oak, bright acidity, creamy texture." },
        { label: "Food Pairing", value: "Dungeness crab, roasted chicken, halibut, aged Comte." },
        { label: "Best For", value: "Those who want a white wine with substance and Oregon character — not California opulence." },
      ],
    },
    verdict: "Rex Hill's Pinot is the headliner, and deservedly so — it's what the Willamette Valley does best. But their Chardonnay is the hidden gem that makes sommeliers sit up. Pinot rewards with depth and earthiness. Chardonnay surprises with brightness and restraint. The real answer? Buy both.",
  },
  {
    id: "estate-vs-vineyard-designate",
    category: "wines" as CompareCategory,
    subtitle: "The blend vs the single vineyard",
    sideA: {
      name: "Rex Hill Willamette Valley Pinot Noir",
      tagline: "The complete picture of Rex Hill terroir",
      attributes: [
        { label: "Approach", value: "Multi-vineyard blend pulling from across the estate. The winemaker's full palette." },
        { label: "Profile", value: "Harmonious, balanced, approachable. Red fruit, spice, soft earth. A wine that welcomes everyone." },
        { label: "Price Point", value: "Rex Hill's most accessible entry into estate-grown Oregon Pinot." },
        { label: "Best For", value: "Tuesday night dinner, bringing to a party, or introducing someone to Oregon wine." },
      ],
    },
    sideB: {
      name: "Rex Hill Jacob-Hart Vineyard Pinot Noir",
      tagline: "A single site, nothing held back",
      attributes: [
        { label: "Approach", value: "100% from Jacob-Hart vineyard. The purest expression of one place, one vintage." },
        { label: "Profile", value: "Concentrated, structured, complex. Dark cherry, iron, herbs, and a long mineral finish." },
        { label: "Price Point", value: "Rex Hill's top-tier offering for serious collectors and enthusiasts." },
        { label: "Best For", value: "A special occasion, quiet contemplation, or proving that Oregon rivals Burgundy." },
      ],
    },
    verdict: "The Willamette Valley blend is Rex Hill's handshake — warm, generous, and instantly likeable. The Jacob-Hart is Rex Hill's thesis statement — deep, specific, and uncompromising. One is about harmony; the other is about honesty. Both are excellent. The question is what kind of night you're having.",
  },
  {
    id: "rose-vs-gamay",
    category: "wines" as CompareCategory,
    subtitle: "Summer in a glass — two ways",
    sideA: {
      name: "Rex Hill Rosé of Pinot Noir",
      tagline: "Serious rosé from serious grapes",
      attributes: [
        { label: "Grape", value: "Pinot Noir — whole-cluster pressed for delicate color and bright acidity." },
        { label: "Profile", value: "Watermelon, wild strawberry, white peach, citrus zest. Crisp, dry, refreshing." },
        { label: "Food Pairing", value: "Grilled shrimp, summer salads, charcuterie, goat cheese." },
        { label: "Best For", value: "Patio season. The wine that makes every sunset taste better." },
      ],
    },
    sideB: {
      name: "Rex Hill Gamay Noir",
      tagline: "The joyful outsider in Pinot country",
      attributes: [
        { label: "Grape", value: "Gamay Noir — Beaujolais' gift to Oregon, thriving in the Willamette Valley." },
        { label: "Profile", value: "Bright cherry, cranberry, violet, a touch of pepper. Light-bodied, lively, slightly chillable." },
        { label: "Food Pairing", value: "Roast chicken, charcuterie, pizza, Thanksgiving turkey." },
        { label: "Best For", value: "The red wine lover who wants something lighter. The perfect 'drink-it-now' wine." },
      ],
    },
    verdict: "Both are Rex Hill's fun side — the wines you open mid-week without overthinking it. The Rosé is summer in a glass: bright, crisp, effortless. The Gamay is the lightest red you'll love: fruity, peppery, endlessly drinkable. Rosé for the patio. Gamay for the pizza night. You need both in the fridge.",
  },

  // ── Experiences ──
  {
    id: "classic-vs-somms-table",
    category: "experiences" as CompareCategory,
    subtitle: "A taste vs the deep dive",
    sideA: {
      name: "Classic Tasting",
      tagline: "The perfect introduction to Rex Hill",
      attributes: [
        { label: "Price", value: "$45 per person" },
        { label: "Format", value: "Seated tasting of current release wines. Indoor and outdoor options available." },
        { label: "Duration", value: "Approximately 60 minutes with a dedicated host." },
        { label: "Best For", value: "First-time visitors, wine-curious friends, or a relaxed afternoon exploration." },
      ],
    },
    sideB: {
      name: "Somm's Table",
      tagline: "The sommelier experience — Rex Hill's finest",
      attributes: [
        { label: "Price", value: "$125 per person" },
        { label: "Format", value: "Curated tasting with a senior wine educator. Library wines, barrel samples, and vineyard-designate selections." },
        { label: "Duration", value: "Approximately 90 minutes. An immersive, educational experience." },
        { label: "Best For", value: "Serious enthusiasts, collectors, or anyone who wants the full story behind the wines." },
      ],
    },
    verdict: "The Classic Tasting is a wonderful afternoon — beautiful wines, warm hospitality, a great introduction to what Rex Hill does. The Somm's Table is a revelation — the wines go deeper, the stories go further, and you leave understanding Rex Hill in a way that casual tasting can't achieve. Start with the Classic. Come back for the Somm's Table.",
  },
  {
    id: "legacy-tour-vs-sensory",
    category: "experiences" as CompareCategory,
    subtitle: "Behind the scenes vs inside the glass",
    sideA: {
      name: "Legacy Tour",
      tagline: "Walk the vineyards and cellars with an expert",
      attributes: [
        { label: "Price", value: "$90 per person" },
        { label: "Format", value: "Guided tour through the estate vineyards and production facility, followed by a seated tasting." },
        { label: "Duration", value: "Approximately 90 minutes including tour and tasting." },
        { label: "Best For", value: "Those who want to see where the magic happens — the vines, the barrels, the cellar." },
      ],
    },
    sideB: {
      name: "Sensory Experience",
      tagline: "Train your palate like a professional",
      attributes: [
        { label: "Price", value: "$80 per person" },
        { label: "Format", value: "Interactive tasting focused on developing your palate. Aroma kits, blind comparisons, and guided exercises." },
        { label: "Duration", value: "Approximately 75 minutes of hands-on wine education." },
        { label: "Best For", value: "Wine students, aspiring sommeliers, or anyone who wants to level up their tasting skills." },
      ],
    },
    verdict: "The Legacy Tour is about place — you'll walk the same rows the winemaker walks and taste wine next to the barrels it came from. The Sensory Experience is about you — you'll leave with a sharper palate and a new vocabulary for what you taste. Tour for the storyteller. Sensory for the student. Both are unforgettable.",
  },
  {
    id: "library-vs-bottles-boards",
    category: "experiences" as CompareCategory,
    subtitle: "Deep cellar vs social gathering",
    sideA: {
      name: "Library Tasting",
      tagline: "Taste Rex Hill's history bottle by bottle",
      attributes: [
        { label: "Price", value: "$70 per person" },
        { label: "Format", value: "Aged library wines not available anywhere else. A rare chance to taste how Rex Hill evolves over time." },
        { label: "Duration", value: "Approximately 75 minutes with an experienced host." },
        { label: "Best For", value: "Collectors, wine geeks, and anyone fascinated by how wines develop with age." },
      ],
    },
    sideB: {
      name: "Bottles & Boards",
      tagline: "Wine meets local artisan food",
      attributes: [
        { label: "Price", value: "$80 per person" },
        { label: "Format", value: "Rex Hill wines paired with a curated board of local cheeses, charcuterie, and seasonal accompaniments." },
        { label: "Duration", value: "Approximately 90 minutes. A leisurely, social experience." },
        { label: "Best For", value: "Groups, date nights, or anyone who believes wine is best enjoyed with great food." },
      ],
    },
    verdict: "The Library Tasting is for the mind — you'll taste time itself in those bottles, watching how flavors shift and deepen across vintages. Bottles & Boards is for the soul — great wine, great food, great company. One is contemplative; the other is celebratory. We'd suggest the Library first, then finish with a board.",
  },
];
