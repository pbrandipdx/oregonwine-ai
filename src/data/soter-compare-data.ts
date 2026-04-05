/* ── Soter Vineyards Compare Data ── */
/* Compare within Soter only — vineyards, wines, and winemaking philosophy. */

import type { CompareCategory, CategoryOption, Comparison } from "./compare-data";

export type STCompareCategory = "vineyards" | "wines" | "experiences";

export const ST_CATEGORIES: CategoryOption[] = [
  { id: "vineyards" as CompareCategory, title: "Two Vineyards", description: "How terroir shapes the glass — same winery, different sources" },
  { id: "wines" as CompareCategory, title: "Two Wines", description: "Side by side from Soter's cellar" },
  { id: "experiences" as CompareCategory, title: "Farming & Winemaking", description: "The philosophy behind Soter's voice" },
];

export const ST_COMPARISONS: Comparison[] = [
  // ── Vineyards ──
  {
    id: "mineral-springs-vs-north-valley",
    category: "vineyards" as CompareCategory,
    subtitle: "Estate biodynamic vs regional blend",
    sideA: {
      name: "Mineral Springs Ranch",
      tagline: "Biodynamic estate on ancient seabed soils",
      attributes: [
        { label: "Location", value: "Yamhill-Carlton AVA, Carlton. Marine sedimentary soils on mineral-rich hillsides with natural springs." },
        { label: "Farming", value: "Certified biodynamic. Cover crops, compost preparations, and a closed-loop ecosystem." },
        { label: "Character", value: "Structured, mineral-driven, earthy. The marine soils contribute a distinctive chalky, stony backbone." },
        { label: "In the Glass", value: "Dark cherry, dried herbs, forest floor, iron minerality. Fine-grained tannins with a persistent, savory finish." },
      ],
    },
    sideB: {
      name: "North Valley Blend",
      tagline: "The breadth of the northern Willamette Valley",
      attributes: [
        { label: "Location", value: "Multi-vineyard sourcing from across the northern Willamette Valley — Yamhill-Carlton and surrounding AVAs." },
        { label: "Farming", value: "Partner vineyards farmed to Soter's standards. Sustainable and organic practices throughout." },
        { label: "Character", value: "Bright, aromatic, approachable. The blend captures regional character rather than single-site intensity." },
        { label: "In the Glass", value: "Cherry, raspberry, violet, baking spice. Silky tannins with vibrant acidity and an easygoing finish." },
      ],
    },
    verdict: "Mineral Springs Ranch is the thesis — one place, farmed biodynamically, expressing a unique marine terroir that no other vineyard in the Willamette Valley shares. North Valley is the anthology — gathering the best of the northern Willamette into a single, harmonious blend. The estate wine demands attention and rewards patience. North Valley rewards immediately and generously. Both are Soter, but they speak with very different voices. Start with North Valley to understand the style. Graduate to Mineral Springs to understand the place.",
  },
  {
    id: "mineral-springs-vs-planet-oregon",
    category: "vineyards" as CompareCategory,
    subtitle: "Estate single vineyard vs statewide organic",
    sideA: {
      name: "Mineral Springs Ranch",
      tagline: "Soter's biodynamic home",
      attributes: [
        { label: "Location", value: "Yamhill-Carlton AVA. A single estate on marine sedimentary soils with natural mineral springs." },
        { label: "Scale", value: "Small production from estate blocks. Each vintage is a snapshot of one place in one year." },
        { label: "Philosophy", value: "Biodynamic — the most intensive form of sustainable farming. Preparations, lunar cycles, closed-loop ecosystem." },
        { label: "Price", value: "$55 — flagship estate wine for collectors and enthusiasts." },
      ],
    },
    sideB: {
      name: "Planet Oregon",
      tagline: "Organic wine for the whole planet",
      attributes: [
        { label: "Location", value: "Statewide sourcing from certified organic vineyards across Oregon." },
        { label: "Scale", value: "Larger production designed for wide distribution and everyday enjoyment." },
        { label: "Philosophy", value: "Organic certification with a mission to make sustainable wine accessible, not exclusive." },
        { label: "Price", value: "$20 — great wine at an honest price, designed for the dinner table." },
      ],
    },
    verdict: "This is the most fascinating comparison in Soter's portfolio because it asks a fundamental question: can sustainable farming be democratic? Mineral Springs Ranch says terroir is irreplaceable — one place, meticulously farmed, producing wines of uncommon specificity. Planet Oregon says sustainability should be for everyone — organic wine at $20 that proves you don't need a cult allocation to drink responsibly. Tony Soter built both, and both are true to his vision. Mineral Springs is the dream. Planet Oregon is the mission.",
  },
  {
    id: "yamhill-carlton-vs-willamette",
    category: "vineyards" as CompareCategory,
    subtitle: "Appellation character: marine sedimentary vs volcanic",
    sideA: {
      name: "Yamhill-Carlton AVA",
      tagline: "Ancient seabed, mineral depth",
      attributes: [
        { label: "Soil", value: "Marine sedimentary — ancient seabed deposits rich in sandstone, siltstone, and fossilized shells." },
        { label: "Character", value: "Wines from marine sedimentary soils tend toward earthy, mineral, and savory profiles with fine-grained tannins." },
        { label: "Soter's Expression", value: "Mineral Springs Ranch is pure Yamhill-Carlton — chalky minerality, iron, and forest floor." },
        { label: "Key AVAs", value: "Yamhill-Carlton is one of the cooler, drier AVAs — protected by the Coast Range from direct ocean influence." },
      ],
    },
    sideB: {
      name: "Broader Willamette Valley",
      tagline: "Volcanic diversity across the valley",
      attributes: [
        { label: "Soil", value: "Primarily volcanic (Jory, Nekia) in the Dundee Hills and Eola-Amity Hills, with alluvial valley floor soils." },
        { label: "Character", value: "Volcanic soils often produce fruit-forward, round, and generously textured Pinot Noir with darker fruit profiles." },
        { label: "North Valley Blend", value: "Draws from multiple AVAs, blending marine and volcanic sites into a harmonious regional expression." },
        { label: "Key AVAs", value: "Dundee Hills (Jory volcanic), Eola-Amity Hills (Nekia volcanic, Van Duzer winds), Ribbon Ridge, Chehalem Mountains." },
      ],
    },
    verdict: "The difference between marine sedimentary and volcanic soils is one of the great stories in Oregon wine. Yamhill-Carlton's ancient seabed gives wines a chalky, mineral character — think oyster shell and wet stone. The volcanic AVAs produce rounder, riper wines with darker fruit and plusher tannins. Soter's Mineral Springs Ranch is a pure expression of marine terroir; the North Valley blend weaves in volcanic sites for a rounder, more approachable style. Side by side, they teach you more about Oregon soil than any textbook.",
  },

  // ── Wines ──
  {
    id: "mineral-springs-pn-vs-brut-rose",
    category: "wines" as CompareCategory,
    subtitle: "Still vs sparkling from the same estate",
    sideA: {
      name: "Mineral Springs Pinot Noir",
      tagline: "The soul of the estate in a still glass",
      attributes: [
        { label: "Style", value: "Still red wine — structured, earthy, and mineral-driven Pinot Noir." },
        { label: "Aging", value: "French oak barrels for 10-14 months. The oak adds structure without masking the terroir." },
        { label: "Profile", value: "Dark cherry, dried herbs, forest floor, iron minerality. Medium-to-full body." },
        { label: "Best For", value: "Dinner with rich, savory dishes — lamb, mushroom risotto, truffle pasta." },
      ],
    },
    sideB: {
      name: "Brut Rosé",
      tagline: "The estate in bubbles",
      attributes: [
        { label: "Style", value: "Traditional method sparkling rosé from estate Pinot Noir. Extended lees aging." },
        { label: "Aging", value: "En tirage (on the lees in bottle) for 2+ years. The time builds complexity and fine mousse." },
        { label: "Profile", value: "Wild strawberry, white peach, brioche, pink grapefruit. Dry, crisp, and elegant." },
        { label: "Best For", value: "Oysters, smoked salmon, celebration, or just because it's Thursday." },
      ],
    },
    verdict: "Same estate. Same biodynamic Pinot Noir. Completely different wines. The Mineral Springs Pinot Noir is contemplative — structured, earthy, and built for the dinner table. The Brut Rosé is joyful — bright, elegant, and built for the moment. What makes Soter's sparkling program special is that the Pinot Noir base wine is already exceptional. Most sparkling houses start with lighter, less concentrated fruit. Soter starts with their best. The Brut Rosé doesn't ask you to choose between serious wine and sparkling fun — it delivers both.",
  },
  {
    id: "north-valley-vs-planet-oregon",
    category: "wines" as CompareCategory,
    subtitle: "Regional blend vs statewide organic",
    sideA: {
      name: "North Valley Pinot Noir",
      tagline: "The best of the northern Willamette",
      attributes: [
        { label: "Source", value: "Multi-vineyard blend from the northern Willamette Valley. Curated for balance and regional typicity." },
        { label: "Profile", value: "Cherry, raspberry, violet, baking spice. Silky, aromatic, and beautifully balanced." },
        { label: "Price", value: "$30 — Soter's mid-range offering with real depth and character." },
        { label: "Certification", value: "Sustainably farmed partner vineyards meeting Soter's quality standards." },
      ],
    },
    sideB: {
      name: "Planet Oregon Pinot Noir",
      tagline: "Organic wine for everyday",
      attributes: [
        { label: "Source", value: "Certified organic vineyards from across the state of Oregon. Broader sourcing for volume." },
        { label: "Profile", value: "Red fruit, cranberry, spice. Light-to-medium body, bright acidity, immediately drinkable." },
        { label: "Price", value: "$20 — Soter's most accessible wine, designed for the dinner table." },
        { label: "Certification", value: "Certified organic — USDA Organic seal on every bottle." },
      ],
    },
    verdict: "At $10 apart, this comparison asks: what does that extra investment buy you? North Valley brings concentration, complexity, and a sense of place — you can taste the northern Willamette Valley's cool-climate elegance. Planet Oregon brings certified organic purity and everyday drinkability — it's the wine you keep a case of for weeknight dinners. North Valley is the one you bring to impress. Planet Oregon is the one you open without thinking twice. Both are excellent values. Planet Oregon might be the best $20 Pinot Noir in Oregon.",
  },
  {
    id: "mineral-springs-pn-vs-chard",
    category: "wines" as CompareCategory,
    subtitle: "Red and white from the same biodynamic estate",
    sideA: {
      name: "Mineral Springs Pinot Noir",
      tagline: "The flagship red",
      attributes: [
        { label: "Grape", value: "Pinot Noir — the heart of Soter's production and Oregon's signature variety." },
        { label: "Profile", value: "Dark cherry, dried herbs, forest floor, iron minerality. Structured and age-worthy." },
        { label: "Food Pairing", value: "Roasted duck, wild mushroom risotto, herb-crusted lamb, truffle dishes." },
        { label: "Production", value: "The core of Soter's estate program — the wine that defines the property." },
      ],
    },
    sideB: {
      name: "Mineral Springs Chardonnay",
      tagline: "The estate's hidden treasure",
      attributes: [
        { label: "Grape", value: "Chardonnay — Soter's only white wine, grown on the same biodynamic marine soils." },
        { label: "Profile", value: "Meyer lemon, white nectarine, wet stone, toasted hazelnut. Mineral and restrained." },
        { label: "Food Pairing", value: "Roasted halibut, crab, goat cheese, roasted chicken, risotto." },
        { label: "Production", value: "Small production — a footnote in the portfolio that deserves its own chapter." },
      ],
    },
    verdict: "Most people know Soter for Pinot Noir, and they should — it's extraordinary. But the Mineral Springs Chardonnay is where the estate's marine terroir really shines. That chalky, stony minerality that adds depth to the Pinot Noir becomes the defining feature of the Chardonnay. Same soil, same biodynamic farming, completely different expression. The Pinot Noir is the reason you visit Soter. The Chardonnay is the surprise that makes you join the wine club.",
  },

  // ── Farming & Winemaking ──
  {
    id: "biodynamic-vs-organic",
    category: "experiences" as CompareCategory,
    subtitle: "Two levels of sustainable farming",
    sideA: {
      name: "Biodynamic Farming",
      tagline: "The vineyard as a living organism",
      attributes: [
        { label: "What It Is", value: "A holistic farming approach that treats the vineyard as a self-sustaining ecosystem. Includes compost preparations, lunar planting calendars, and integration of animals." },
        { label: "Soter's Approach", value: "Mineral Springs Ranch is certified Demeter biodynamic. Cover crops, compost teas, and a closed-loop ecosystem." },
        { label: "In the Glass", value: "Advocates claim greater vitality, mineral expression, and a sense of place. Skeptics call it philosophy, not science." },
        { label: "The Commitment", value: "Labor-intensive, expensive, and requires total dedication. Fewer than 1% of the world's vineyards are biodynamic." },
      ],
    },
    sideB: {
      name: "Organic Farming",
      tagline: "Clean farming at scale",
      attributes: [
        { label: "What It Is", value: "Farming without synthetic pesticides, herbicides, or fertilizers. USDA certification requires annual inspection." },
        { label: "Soter's Approach", value: "Planet Oregon uses only certified organic grapes. Organic is the foundation; biodynamic goes further." },
        { label: "In the Glass", value: "Healthier fruit, fewer residues, and the satisfaction of supporting sustainable agriculture." },
        { label: "The Commitment", value: "More accessible than biodynamic but still demanding. Soter proves it can work at every price point." },
      ],
    },
    verdict: "Biodynamic farming includes everything organic does — and then keeps going. Where organic says 'no synthetic chemicals,' biodynamic says 'treat the vineyard as a living organism.' Soter is one of the few wineries that practices both: biodynamic at the estate (Mineral Springs Ranch) and organic at scale (Planet Oregon). The estate wines have a mineral depth and vitality that biodynamic advocates will attribute to the farming. The Planet Oregon wines prove that organic quality doesn't require cult pricing. Together, they represent the full spectrum of sustainable winegrowing.",
  },
  {
    id: "still-vs-sparkling",
    category: "experiences" as CompareCategory,
    subtitle: "Two winemaking traditions from one estate",
    sideA: {
      name: "Still Winemaking",
      tagline: "Barrel-aged, terroir-driven",
      attributes: [
        { label: "Process", value: "Whole-cluster and destemmed Pinot Noir, native yeast fermentation, French oak aging for 10-14 months." },
        { label: "Philosophy", value: "Minimal intervention. Let the biodynamic fruit and marine terroir speak for themselves." },
        { label: "Timeline", value: "Harvest to release: approximately 18-24 months. Patience is the primary ingredient." },
        { label: "Result", value: "Wines of structure, depth, and mineral complexity that evolve beautifully over 5-15 years." },
      ],
    },
    sideB: {
      name: "Traditional Method Sparkling",
      tagline: "Second fermentation in the bottle",
      attributes: [
        { label: "Process", value: "Base wine made from estate Pinot Noir, then bottled with yeast for a second fermentation. Extended aging on the lees." },
        { label: "Philosophy", value: "The same commitment to terroir expression, but through bubbles. The goal is sparkling wine with the depth of still wine." },
        { label: "Timeline", value: "Harvest to release: 3-4+ years including 2+ years en tirage. Even more patience required." },
        { label: "Result", value: "Brut Rosé with fine mousse, bright acidity, and a complexity that rivals top Champagne producers." },
      ],
    },
    verdict: "Tony Soter didn't start making sparkling wine because it was trendy — he started because he believed Oregon's Pinot Noir, grown on the right soils, could produce world-class bubbles. The still wines from Mineral Springs Ranch are already remarkable. The Brut Rosé takes that same fruit and transforms it through the most labor-intensive winemaking method in the world. Still wine is about expressing a place. Sparkling wine is about expressing a place through time — the years on the lees add a dimension that still wine cannot achieve. Both are true to Soter's philosophy of farming and patience.",
  },
  {
    id: "estate-vs-negociant",
    category: "experiences" as CompareCategory,
    subtitle: "Growing your own vs sourcing the best",
    sideA: {
      name: "Estate Program",
      tagline: "100% control from soil to bottle",
      attributes: [
        { label: "What It Is", value: "Growing grapes on your own land, with complete control over farming, picking, and winemaking decisions." },
        { label: "Soter's Estate", value: "Mineral Springs Ranch — 32 acres of biodynamic Pinot Noir and Chardonnay in the Yamhill-Carlton AVA." },
        { label: "Advantage", value: "Total control over quality. Every decision from planting to picking to pressing is the winemaker's call." },
        { label: "Wines", value: "Mineral Springs Ranch Pinot Noir, Chardonnay, and Brut Rosé. The flagship tier." },
      ],
    },
    sideB: {
      name: "Sourced Program",
      tagline: "Curating quality from trusted partners",
      attributes: [
        { label: "What It Is", value: "Purchasing grapes or juice from partner vineyards, selected for quality and alignment with the winery's style." },
        { label: "Soter's Sourced Wines", value: "North Valley (northern Willamette partners) and Planet Oregon (statewide organic growers)." },
        { label: "Advantage", value: "Access to diverse terroirs, larger production, and broader distribution without owning every acre." },
        { label: "Wines", value: "North Valley Pinot Noir ($30) and Planet Oregon Pinot Noir ($20). The accessible tier." },
      ],
    },
    verdict: "Soter's portfolio is a masterclass in how estate and sourced programs can coexist without compromising either. The Mineral Springs Ranch wines are irreplaceable — you can't replicate biodynamic marine sedimentary terroir with purchased grapes. But the North Valley and Planet Oregon wines extend Soter's philosophy to people who can't get the allocation or afford the estate price. The estate wines fund the dream. The sourced wines spread the philosophy. It's a model more wineries should follow.",
  },
];
