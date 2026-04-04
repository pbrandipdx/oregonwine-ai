/* ── Ponzi Vineyards Compare Data ── */
/* Compare within Ponzi only — vineyards, wines, and experiences. */

import type { CompareCategory, CategoryOption, Comparison } from "./compare-data";

export type PZCompareCategory = "vineyards" | "wines" | "experiences";

export const PZ_CATEGORIES: CategoryOption[] = [
  { id: "vineyards" as CompareCategory, title: "Two Vineyards", description: "How terroir shapes the glass — same winery, different sites" },
  { id: "wines" as CompareCategory, title: "Two Wines", description: "Side by side from Ponzi's cellar" },
  { id: "experiences" as CompareCategory, title: "Two Experiences", description: "Which tasting is right for you?" },
];

export const PZ_COMPARISONS: Comparison[] = [
  // ── Vineyards ──
  {
    id: "abetina-vs-aurora",
    category: "vineyards" as CompareCategory,
    subtitle: "The oldest 2 acres vs the largest 80 acres",
    sideA: {
      name: "Abetina Vineyard",
      tagline: "Ponzi's most hallowed ground — 2 acres of history",
      attributes: [
        { label: "Planted", value: "1975 — Ponzi's oldest vineyard and part of the original Oregon Clonal Test." },
        { label: "Size", value: "Just 2 acres, own-rooted, with 22 Pinot Noir clones. Approximately 150 cases produced." },
        { label: "Character", value: "Intense, elegant, profound. Red rose petals, potpourri, salty soils, red raspberry compote." },
        { label: "In the Glass", value: "Ethereal tannins, lifting acidity, and a perfumed complexity that only own-rooted old vines can deliver." },
      ],
    },
    sideB: {
      name: "Aurora Vineyard",
      tagline: "Ponzi's living laboratory — 80 acres of experimentation",
      attributes: [
        { label: "Planted", value: "1991 — with extensive clonal and rootstock trials across the 80-acre site." },
        { label: "Size", value: "80 acres — the largest and most experimental of Ponzi's estate vineyards." },
        { label: "Character", value: "Complex, layered, exotic. Orange peel, forest floor, exotic spices, black plum." },
        { label: "In the Glass", value: "Broad and textured with savory depth. The clonal diversity creates a wine of remarkable complexity." },
      ],
    },
    verdict: "Abetina is the soul — 2 acres of own-rooted 1975 vines producing just 150 cases of the most profound wine in Ponzi's cellar. Aurora is the mind — 80 acres of clonal experiments that push the boundaries of what Laurelwood soil can express. Abetina whispers with perfume and nuance. Aurora speaks with complexity and breadth. Together, they span nearly the entire history of Ponzi Vineyards, from the pioneering spirit of the 1970s to the scientific ambition of the 1990s. If you can only taste one, choose Abetina for the experience. If you can taste both, start with Aurora to appreciate the contrast.",
  },
  {
    id: "avellana-vs-madrona",
    category: "vineyards" as CompareCategory,
    subtitle: "Former hazelnut orchard vs native Madrone trees",
    sideA: {
      name: "Avellana Vineyard",
      tagline: "Where hazelnuts gave way to world-class wine",
      attributes: [
        { label: "Planted", value: "2006 — Ponzi's newest estate vineyard, on the site of a former hazelnut orchard." },
        { label: "Size", value: "24 acres on a panoramic hillside with Laurelwood soil." },
        { label: "Character", value: "Mineral intensity, blood orange zest, tobacco leaf. The hillside exposure and younger vines bring vibrancy." },
        { label: "In the Glass", value: "Structured with remarkable depth. Both the Pinot Noir (95 pts) and Chardonnay (94 pts) are acclaimed." },
      ],
    },
    sideB: {
      name: "Madrona Vineyard",
      tagline: "Heritage vines among the native red-barked trees",
      attributes: [
        { label: "Planted", value: "1985 — one of Ponzi's oldest vineyard sites, with over 40 years of vine age." },
        { label: "Size", value: "10 acres on a hillside named for the native Madrone trees that share the site." },
        { label: "Character", value: "Bright red fruits, kumquat rind, salty soil nuances. Focused, precise, and lifted." },
        { label: "In the Glass", value: "Taut and linear with lifting acidity. The old vines produce a wine of remarkable precision and energy." },
      ],
    },
    verdict: "Avellana is the newcomer with the panoramic view — planted in 2006 on a former hazelnut orchard, it has quickly become one of Ponzi's most acclaimed sites for both Pinot Noir and Chardonnay. Madrona is the quiet elder — planted in 1985 among native Madrone trees, it produces a focused, precise Pinot Noir with the energy that only mature vines can muster. Avellana impresses with power and depth. Madrona captivates with precision and lift. The 21-year age difference in plantings is audible in every glass: Avellana pushes forward, Madrona pulls you in.",
  },
  {
    id: "avellana-vs-aurora",
    category: "vineyards" as CompareCategory,
    subtitle: "Hillside panoramas vs experimental terroir",
    sideA: {
      name: "Avellana Vineyard",
      tagline: "Panoramic hillside intensity",
      attributes: [
        { label: "Planted", value: "2006 — 24 acres on the site of a former hazelnut orchard." },
        { label: "Approach", value: "Uses the 'clonal-massale' technique pioneered by Luisa Ponzi for genetic diversity." },
        { label: "Character", value: "Mineral-driven with blood orange zest and tobacco leaf. The hillside exposure creates concentration." },
        { label: "Standout", value: "Produces both Ponzi's top Pinot Noir (95 pts) and top Chardonnay (94 pts Bargreen)." },
      ],
    },
    sideB: {
      name: "Aurora Vineyard",
      tagline: "Ponzi's 80-acre living laboratory",
      attributes: [
        { label: "Planted", value: "1991 — 80 acres with the most extensive clonal and rootstock trials in the estate." },
        { label: "Approach", value: "Multiple clonal trials and rootstock experiments make this a viticultural research site." },
        { label: "Character", value: "Exotic spices, forest floor, orange peel, black plum. The clonal diversity creates layered complexity." },
        { label: "Standout", value: "The spice and exotic character sets it apart from the more mineral-driven single-vineyard bottlings." },
      ],
    },
    verdict: "Avellana is concentration — a 24-acre hillside that channels all its energy into wines of mineral intensity and depth. Aurora is diversity — an 80-acre canvas where dozens of clonal and rootstock combinations create a wine of exotic, layered complexity. Avellana is the focused athlete. Aurora is the renaissance scholar. Avellana's Pinot Noir hits you with minerals and structure. Aurora's Pinot Noir surrounds you with spice and intrigue. Both are 95-point wines, but they arrive at excellence by completely different paths.",
  },

  // ── Wines ──
  {
    id: "tavola-vs-reserve",
    category: "wines" as CompareCategory,
    subtitle: "The everyday vs the cellar treasure",
    sideA: {
      name: "Tavola Pinot Noir",
      tagline: "The table wine — approachable, honest, delightful",
      attributes: [
        { label: "Approach", value: "Multi-vineyard Willamette Valley blend. Ponzi's most approachable and widely available Pinot Noir." },
        { label: "Profile", value: "Forward red fruits, salty soil, red licorice. Gentle tannins and a fruit-forward finish." },
        { label: "Price Point", value: "~$30 — 'Tavola' means table in Italian. Designed for everyday enjoyment." },
        { label: "Best For", value: "Weeknight dinner, a gathering with friends, or introducing someone to Oregon Pinot Noir." },
      ],
    },
    sideB: {
      name: "Reserve Pinot Noir",
      tagline: "The best barrels from four premier vineyards",
      attributes: [
        { label: "Approach", value: "Barrel selection from Aurora, Abetina, Madrona, and Avellana. Complex and age-worthy." },
        { label: "Profile", value: "Dense red fruits, Mandarin orange zest, salty soil. Beautiful texture with layers of complexity." },
        { label: "Price Point", value: "~$72 — Ponzi's benchmark Pinot Noir for the Laurelwood District." },
        { label: "Best For", value: "A special dinner, contemplative drinking, or cellaring for 5-10 years." },
      ],
    },
    verdict: "Tavola is Ponzi's handshake — warm, generous, and the best $30 you'll spend on Oregon Pinot Noir. The Reserve is Ponzi's signature — a barrel selection from four premier vineyards that represents the pinnacle of what Laurelwood soil can achieve. Buy Tavola by the case for the table. Buy the Reserve for the cellar and the occasions that matter. At more than double the price, the Reserve delivers more than double the complexity — but Tavola punches so far above its weight that it never feels like a compromise.",
  },
  {
    id: "laurelwood-ch-vs-avellana-ch",
    category: "wines" as CompareCategory,
    subtitle: "The blend vs the single vineyard",
    sideA: {
      name: "Laurelwood District Chardonnay",
      tagline: "Three vineyards, one harmonious blend",
      attributes: [
        { label: "Approach", value: "A blend of Avellana, Aurora, and Paloma vineyards. Barrel-fermented in Ponzi's signature steam-bent oak." },
        { label: "Profile", value: "Melon, orange rind, starfruit, brioche. Smooth and balanced — between California richness and Burgundy restraint." },
        { label: "Recognition", value: "92 points Bargreen. A versatile, food-friendly Chardonnay." },
        { label: "Best For", value: "A dinner party white, pairing with roasted chicken or grilled prawns, or anyone exploring Oregon Chardonnay." },
      ],
    },
    sideB: {
      name: "Avellana Chardonnay",
      tagline: "Single vineyard, maximum expression",
      attributes: [
        { label: "Approach", value: "100% Avellana vineyard — 24 acres planted 2006 on the site of a former hazelnut orchard." },
        { label: "Profile", value: "Dense honeydew melon, poached pear, roasted pineapple, Key lime. Rich, layered, and concentrated." },
        { label: "Recognition", value: "94 points Bargreen. Ponzi's most acclaimed white wine." },
        { label: "Best For", value: "Hazelnut-crusted halibut, lobster risotto, or savoring on its own as a contemplative glass." },
      ],
    },
    verdict: "The Laurelwood District Chardonnay is the diplomat — blending three vineyards into a wine that balances richness and restraint beautifully. The Avellana Chardonnay is the artist — a single-vineyard expression of concentrated intensity that earned 94 points. The blend is more versatile at the table. The single vineyard is more rewarding in the glass. Both are fermented in Ponzi's signature steam-bent oak, but Avellana's hillside fruit takes that framework and fills it with more color, more depth, and more personality. Start with the Laurelwood District. Graduate to Avellana.",
  },
  {
    id: "pinot-noir-vs-chardonnay",
    category: "wines" as CompareCategory,
    subtitle: "The flagship vs the rising star",
    sideA: {
      name: "Ponzi Pinot Noir",
      tagline: "Over fifty years of Oregon pioneering",
      attributes: [
        { label: "Grape", value: "Pinot Noir — Ponzi's primary focus since 1974, sourced from four estate vineyards." },
        { label: "Range", value: "From Tavola (~$30) through Laurelwood District and Reserve to four single-vineyard designates." },
        { label: "Food Pairing", value: "Roasted duck, wild mushroom risotto, herb-crusted lamb, grilled salmon, charcuterie." },
        { label: "Legacy", value: "The Ponzi family helped establish Oregon as a world-class Pinot Noir region. Four vineyards, five decades." },
      ],
    },
    sideB: {
      name: "Ponzi Chardonnay",
      tagline: "The increasingly acclaimed white program",
      attributes: [
        { label: "Grape", value: "Chardonnay — an increasingly important part of Ponzi's portfolio, with the Avellana earning 94 points." },
        { label: "Range", value: "From Laurelwood District (92 pts) to single-vineyard Avellana (94 pts), both in steam-bent oak." },
        { label: "Food Pairing", value: "Pan-seared halibut, roasted chicken with tarragon, lobster risotto, seasonal vegetable tarts." },
        { label: "Legacy", value: "Ponzi's steam-bent oak technique and Laurelwood soil are producing some of Oregon's finest Chardonnay." },
      ],
    },
    verdict: "Pinot Noir is why Ponzi exists — the family planted their first vines in 1970 and has spent over five decades proving that Oregon belongs in the conversation with Burgundy. But the Chardonnay program is where the excitement is building. The Avellana Chardonnay's 94 points signal that Ponzi's Laurelwood soil and steam-bent oak technique are creating world-class whites alongside the reds. If you visit Ponzi for the Pinot Noir (as you should), don't leave without tasting the Chardonnay. It may be the rising star, but it's already shining bright.",
  },

  // ── Experiences ──
  {
    id: "signature-vs-collectors",
    category: "experiences" as CompareCategory,
    subtitle: "$50 introduction vs $75 deep dive",
    sideA: {
      name: "Signature Tasting",
      tagline: "The perfect first visit — flagship wines with culinary pairings",
      attributes: [
        { label: "Price", value: "$50 per person, refundable with a 3-bottle purchase." },
        { label: "What You Get", value: "Curated flight of flagship wines with seasonal culinary pairings. 90-minute seated experience." },
        { label: "Best For", value: "First-time visitors, groups, and anyone who loves wine paired with food." },
        { label: "Access", value: "Walk-ins welcome (reservations recommended). Features Ponzi's flagship lineup." },
      ],
    },
    sideB: {
      name: "Collector's Flight",
      tagline: "Rare single-vineyard wines you can't find anywhere else",
      attributes: [
        { label: "Price", value: "$75 per person, waived with a 3-bottle purchase. Complimentary for Basalt members." },
        { label: "What You Get", value: "Limited-production single-vineyard wines plus a splash of club-exclusive or library wine. 90-minute guided experience." },
        { label: "Best For", value: "Serious collectors, return visitors, and terroir-focused wine lovers." },
        { label: "Access", value: "Reservation recommended. Features Abetina, Aurora, Avellana, and Madrona designates." },
      ],
    },
    verdict: "The Signature Tasting is the welcome mat — a beautifully curated introduction to Ponzi with food pairings that make the wines sing. The Collector's Flight is the backstage pass — rare single-vineyard wines that reveal the depth and diversity of Ponzi's estate. First visit? Start with Signature. Already a fan? Graduate to the Collector's Flight. The $25 price difference buys you access to some of the most limited wines in the Willamette Valley, including the legendary 150-case Abetina.",
  },
  {
    id: "signature-vs-bollinger",
    category: "experiences" as CompareCategory,
    subtitle: "Oregon focus vs global perspective",
    sideA: {
      name: "Signature Tasting",
      tagline: "Pure Ponzi — Oregon through and through",
      attributes: [
        { label: "Focus", value: "100% Ponzi Vineyards wines. A deep look at what Laurelwood District terroir can do." },
        { label: "Style", value: "Flagship wines with seasonal culinary pairings in a 90-minute seated experience." },
        { label: "What You Learn", value: "Ponzi's house style, the Laurelwood soil story, and how Oregon Pinot Noir and Chardonnay express this unique terroir." },
        { label: "Price", value: "$50 per person, refundable with 3-bottle purchase." },
      ],
    },
    sideB: {
      name: "Bollinger Group Tasting",
      tagline: "Oregon meets Burgundy meets Champagne",
      attributes: [
        { label: "Focus", value: "Ponzi + Champagne Ayala + Domaine Chanson. Three producers, two countries, one portfolio." },
        { label: "Style", value: "A comparative tasting exploring French vs Oregon terroir side by side. 90-minute guided experience." },
        { label: "What You Learn", value: "How Champagne, Burgundy, and the Willamette Valley each express Pinot Noir and Chardonnay differently." },
        { label: "Price", value: "$75 per person. $25 for Laurelwood Society members. Complimentary for Basalt members." },
      ],
    },
    verdict: "The Signature Tasting is pure Oregon — an immersive look at Ponzi's Laurelwood District wines with food pairings that ground the experience in Pacific Northwest hospitality. The Bollinger Group Tasting is a passport — a chance to compare Oregon, Burgundy, and Champagne in a single flight, understanding how one grape family expresses itself across three of the world's great wine regions. Choose Signature if you want to know Ponzi deeply. Choose Bollinger if you want to see Ponzi in a global context. Either way, you'll leave with a deeper understanding of terroir.",
  },
  {
    id: "collectors-vs-private",
    category: "experiences" as CompareCategory,
    subtitle: "$75 rare wines vs $125 exclusive experience",
    sideA: {
      name: "Collector's Flight",
      tagline: "The rarest wines at the most accessible price",
      attributes: [
        { label: "Price", value: "$75 per person. Waived with 3-bottle purchase. Complimentary for Basalt members." },
        { label: "What You Get", value: "Single-vineyard wines (Abetina, Aurora, Avellana, Madrona) plus a splash of something club-exclusive." },
        { label: "Setting", value: "Guided tasting in the main tasting room. Available to all visitors with a reservation." },
        { label: "Best For", value: "Collectors who want rare wines without the premium of a private setting." },
      ],
    },
    sideB: {
      name: "Private Tasting Flight",
      tagline: "The ultimate Ponzi experience — exclusive and elevated",
      attributes: [
        { label: "Price", value: "$125 per person. Reduced to $75 for Loess members. Complimentary for Basalt members." },
        { label: "What You Get", value: "Ponzi's most limited wines — library vintages, allocated selections — in a private, intimate setting." },
        { label: "Setting", value: "Private room with dedicated wine educator. An exclusive, unhurried experience." },
        { label: "Best For", value: "Discerning guests who value exclusivity, intimacy, and access to wines unavailable elsewhere." },
      ],
    },
    verdict: "The Collector's Flight gives you access to Ponzi's rarest wines at the best value — single-vineyard designates that most visitors never see. The Private Tasting Flight elevates the experience itself — not just rare wines, but library vintages and allocated selections in a private setting with a dedicated guide. The Collector's Flight is about what's in the glass. The Private Tasting is about what's in the glass AND the room. If the wine is the point, choose Collector's. If the experience is the point, choose Private. Basalt members get both complimentary — one of Oregon's best wine club perks.",
  },
];
