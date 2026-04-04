/* ── Compare Page Data ── */

export type CompareCategory = "wineries" | "avas" | "styles";

export interface CompareSide {
  name: string;
  tagline: string;
  attributes: { label: string; value: string }[];
}

export interface Comparison {
  id: string;
  category: CompareCategory;
  subtitle: string;
  sideA: CompareSide;
  sideB: CompareSide;
  verdict: string;
}

export interface CategoryOption {
  id: CompareCategory;
  title: string;
  description: string;
}

export const CATEGORIES: CategoryOption[] = [
  { id: "wineries", title: "Two Wineries", description: "Head-to-head: philosophy, style, and soul" },
  { id: "avas", title: "Two AVAs", description: "Terroir showdown across the Willamette Valley" },
  { id: "styles", title: "Wine Styles", description: "Same grapes, different worlds" },
];

export const COMPARISONS: Comparison[] = [
  // ── Wineries ──
  {
    id: "drouhin-vs-cristom",
    category: "wineries",
    subtitle: "Burgundian precision vs Oregon wild spirit",
    sideA: {
      name: "Domaine Drouhin",
      tagline: "Burgundy's emissary in the Dundee Hills",
      attributes: [
        { label: "Terroir", value: "Volcanic Jory soil, Dundee Hills. Gravity-flow winery built into the hillside." },
        { label: "Style", value: "Restrained, elegant, Old World-leaning. Patience in every bottle." },
        { label: "Flavor Profile", value: "Red cherry, dried rose, earth, and a whisper of iron." },
        { label: "Vibe", value: "A candlelit dinner in a centuries-old chateau. Hushed reverence." },
      ],
    },
    sideB: {
      name: "Cristom",
      tagline: "Oregon's wildflower in an Eola-Amity gale",
      attributes: [
        { label: "Terroir", value: "Volcanic and sedimentary soils, Eola-Amity Hills. Wind-blasted, high-elevation vineyards." },
        { label: "Style", value: "Layered, textured, biodynamic. Wines that feel alive and slightly untamed." },
        { label: "Flavor Profile", value: "Dark berry, savory herbs, wet stone, exotic spice." },
        { label: "Vibe", value: "Hiking a ridgeline at sunset. The wind is in your hair and you don't care." },
      ],
    },
    verdict: "Drouhin is the scholar; Cristom is the poet. Both make transcendent Pinot, but Drouhin whispers where Cristom sings. If you love structure and subtlety, reach for Drouhin. If you want a wine that grabs you by the collar and makes you feel something, Cristom is your winery.",
  },
  {
    id: "eyrie-vs-stoller",
    category: "wineries",
    subtitle: "The pioneer vs the modernist",
    sideA: {
      name: "Eyrie Vineyards",
      tagline: "The winery that started it all",
      attributes: [
        { label: "Terroir", value: "Some of Oregon's oldest vines, planted 1965. Dundee Hills limestone and volcanic mix." },
        { label: "Style", value: "Minimal intervention, age-worthy, delicate. Wines that prove less is more." },
        { label: "Flavor Profile", value: "Translucent cherry, dried herbs, mushroom, incredible acidity." },
        { label: "Vibe", value: "A dusty library with first editions. Intellectual, quiet, profound." },
      ],
    },
    sideB: {
      name: "Stoller",
      tagline: "Sustainable ambition on a grand scale",
      attributes: [
        { label: "Terroir", value: "230 contiguous acres in Dundee Hills. LEED Gold certified, solar-powered." },
        { label: "Style", value: "Polished, approachable, consistently excellent. Modern winemaking at its best." },
        { label: "Flavor Profile", value: "Ripe cherry, baking spice, vanilla, round tannins." },
        { label: "Vibe", value: "A sleek tasting room with panoramic views. Generous, welcoming, Instagram-ready." },
      ],
    },
    verdict: "Eyrie is the reason Oregon Pinot exists. Stoller is the reason it thrives commercially. David Lett planted the flag; Stoller built the cathedral. If you want to taste history, open an Eyrie. If you want to bring a crowd-pleasing bottle to dinner, Stoller never disappoints.",
  },
  {
    id: "elk-cove-vs-brooks",
    category: "wineries",
    subtitle: "Polished craft vs joyful rebellion",
    sideA: {
      name: "Elk Cove",
      tagline: "Five decades of quiet excellence",
      attributes: [
        { label: "Terroir", value: "Estate vineyards across multiple AVAs. Yamhill-Carlton, Dundee Hills, Chehalem Mountains." },
        { label: "Style", value: "Precise, vineyard-driven, impeccably balanced. The gold standard of consistency." },
        { label: "Flavor Profile", value: "Bright red fruit, mineral spine, clean lines, lingering finish." },
        { label: "Vibe", value: "A perfectly tailored suit. You look effortlessly put-together." },
      ],
    },
    sideB: {
      name: "Brooks",
      tagline: "Wine is a daily beverage of pleasure",
      attributes: [
        { label: "Terroir", value: "Eola-Amity Hills. Biodynamic farming, volcanic soils, fierce winds." },
        { label: "Style", value: "Joyful, unconventional, inclusive. Riesling champions in Pinot country." },
        { label: "Flavor Profile", value: "Citrus, stone fruit, petrol, electric acidity. Wild and alive." },
        { label: "Vibe", value: "A potluck dinner with mismatched chairs and incredible food. Everyone belongs." },
      ],
    },
    verdict: "Elk Cove is the varsity athlete who also gets straight A's. Brooks is the kid who starts a band in the garage and accidentally changes music. Elk Cove will never let you down. Brooks will occasionally blow your mind. One is reliability; the other is revelation.",
  },
  {
    id: "sokol-blosser-vs-adelsheim",
    category: "wineries",
    subtitle: "Two founding families, two philosophies",
    sideA: {
      name: "Sokol Blosser",
      tagline: "Sustainability as a way of life",
      attributes: [
        { label: "Terroir", value: "Dundee Hills estate since 1971. Certified organic, B Corp winery." },
        { label: "Style", value: "Earth-forward, organic, mission-driven. Wines with conscience and character." },
        { label: "Flavor Profile", value: "Dark cherry, cola, turned earth, dried herbs." },
        { label: "Vibe", value: "A farmer's market on a Saturday morning. Principled, grounded, real." },
      ],
    },
    sideB: {
      name: "Adelsheim",
      tagline: "Curiosity bottled since 1971",
      attributes: [
        { label: "Terroir", value: "Chehalem Mountains. Marine sedimentary, loess, and volcanic soils side by side." },
        { label: "Style", value: "Cerebral, exploratory, terroir-obsessed. Always asking what the soil has to say." },
        { label: "Flavor Profile", value: "Red fruit, wet gravel, white pepper, bright acidity." },
        { label: "Vibe", value: "A university lecture that's actually fascinating. You leave smarter and thirsty." },
      ],
    },
    verdict: "Both families helped build Oregon wine from nothing. Sokol Blosser leads with heart and ethics; Adelsheim leads with curiosity and intellect. Sokol Blosser asks 'how should we grow?' Adelsheim asks 'what can the land teach us?' You can't go wrong, and you should drink both.",
  },

  // ── AVAs ──
  {
    id: "dundee-vs-eola",
    category: "avas",
    subtitle: "Volcanic power vs wind-cooled tension",
    sideA: {
      name: "Dundee Hills",
      tagline: "The red-soiled heartland",
      attributes: [
        { label: "Soil", value: "Iron-rich Jory volcanic clay. Deep red, well-drained, mineral-packed." },
        { label: "Climate", value: "Protected from marine winds. Warm days, gentle cooling at night." },
        { label: "Signature", value: "Rich, round Pinot Noir with dark fruit and earthy depth." },
        { label: "Character", value: "The grand cru of Oregon. Generous, powerful, confident." },
      ],
    },
    sideB: {
      name: "Eola-Amity Hills",
      tagline: "Where the Van Duzer Corridor roars",
      attributes: [
        { label: "Soil", value: "Mix of volcanic basalt and marine sedimentary. Complex, varied, fascinating." },
        { label: "Climate", value: "Fierce afternoon winds through the Van Duzer Corridor. Cool, relentless." },
        { label: "Signature", value: "High-acid, savory Pinot with incredible aging potential." },
        { label: "Character", value: "The tensile wire of Oregon wine. Taut, electric, bracing." },
      ],
    },
    verdict: "Dundee Hills is the warm embrace; Eola-Amity is the sharp intake of breath. Dundee gives you lush, generous fruit from day one. Eola makes you wait, then rewards your patience with wines of crystalline precision. The Valley's yin and yang.",
  },
  {
    id: "yamhill-vs-ribbon",
    category: "avas",
    subtitle: "Ocean floor vs sheltered ridge",
    sideA: {
      name: "Yamhill-Carlton",
      tagline: "Ancient seabed, modern elegance",
      attributes: [
        { label: "Soil", value: "Marine sedimentary. Sandstone, siltstone, and ancient ocean fossils." },
        { label: "Climate", value: "Warm, sheltered by the Coast Range. Among the driest AVAs in the valley." },
        { label: "Signature", value: "Supple, spice-driven Pinot with a savory backbone." },
        { label: "Character", value: "The silk glove. Smooth, sophisticated, deceptively complex." },
      ],
    },
    sideB: {
      name: "Ribbon Ridge",
      tagline: "Oregon's tiniest, mightiest AVA",
      attributes: [
        { label: "Soil", value: "Marine sedimentary, uniquely uniform. A single ridgeline of ancient ocean floor." },
        { label: "Climate", value: "Protected microclimate within Yamhill-Carlton. Remarkably consistent conditions." },
        { label: "Signature", value: "Focused, structured Pinot Noir with incredible purity of fruit." },
        { label: "Character", value: "The jewel box. Small, precise, and disproportionately excellent." },
      ],
    },
    verdict: "Yamhill-Carlton is the whole library; Ribbon Ridge is the single, perfect book you can't put down. Same ancient marine soils, but Ribbon Ridge distills them into something almost unnervingly pure. Yamhill offers breadth; Ribbon Ridge offers depth. Both are made from a sea that vanished 15 million years ago.",
  },
  {
    id: "chehalem-vs-mcminnville",
    category: "avas",
    subtitle: "Three soils vs the western frontier",
    sideA: {
      name: "Chehalem Mountains",
      tagline: "The AVA of contradictions",
      attributes: [
        { label: "Soil", value: "All three of Oregon's soil types: volcanic basalt, marine sedimentary, and windblown loess." },
        { label: "Climate", value: "Higher elevation, cooler nights. Pronounced diurnal shift." },
        { label: "Signature", value: "Varied and site-specific. Each vineyard tells a different story." },
        { label: "Character", value: "The mad scientist. Three soils, infinite experiments, always surprising." },
      ],
    },
    sideB: {
      name: "McMinnville",
      tagline: "The rugged western edge",
      attributes: [
        { label: "Soil", value: "Uplifted marine sedimentary on the western slopes. Shallow, rocky, demanding." },
        { label: "Climate", value: "Strong marine influence from the Coast Range gap. Cool, foggy mornings." },
        { label: "Signature", value: "Muscular, savory Pinot with dark fruit and firm structure." },
        { label: "Character", value: "The rancher. Tough, honest, no pretense, all substance." },
      ],
    },
    verdict: "Chehalem Mountains is the professor who teaches three subjects; McMinnville is the rancher who knows one thing deeply and does it better than anyone. Chehalem offers geological diversity unmatched anywhere in Oregon. McMinnville offers the kind of directness that makes you sit up and pay attention.",
  },
  {
    id: "dundee-vs-yamhill",
    category: "avas",
    subtitle: "Red volcanic vs ancient marine",
    sideA: {
      name: "Dundee Hills",
      tagline: "Oregon's most famous red dirt",
      attributes: [
        { label: "Soil", value: "Volcanic Jory clay, iron-rich, deep red. Born from ancient lava flows." },
        { label: "Climate", value: "Gentle, warm, protected. Reliable ripening season after season." },
        { label: "Signature", value: "Rich, dark-fruited Pinot with cola, earth, and velvet texture." },
        { label: "Character", value: "The headliner. Confident, beloved, always delivers." },
      ],
    },
    sideB: {
      name: "Yamhill-Carlton",
      tagline: "Where the ocean left its bones",
      attributes: [
        { label: "Soil", value: "Marine sedimentary. Sandstone, siltstone, and ancient sea creatures." },
        { label: "Climate", value: "Warm and dry for Oregon. Sheltered, sun-drenched hillsides." },
        { label: "Signature", value: "Spice-forward, silky Pinot with exotic aromatics and fine tannins." },
        { label: "Character", value: "The sophisticate. Understated, complex, rewards close attention." },
      ],
    },
    verdict: "This is Oregon's great geological debate: fire vs water. Dundee's volcanic soils produce power and generosity. Yamhill-Carlton's marine sediments yield finesse and spice. Dundee is the orchestra at full crescendo; Yamhill-Carlton is the solo violin that makes you lean in.",
  },

  // ── Styles ──
  {
    id: "pinot-noir-vs-chardonnay",
    category: "styles",
    subtitle: "Oregon's signature red vs its rising white star",
    sideA: {
      name: "Pinot Noir",
      tagline: "The grape that put Oregon on the map",
      attributes: [
        { label: "Character", value: "Transparent, expressive, site-specific. The grape that hides nothing." },
        { label: "Flavor World", value: "Cherry, raspberry, earth, mushroom, spice. Endlessly variable." },
        { label: "Food Partner", value: "Salmon, duck, mushroom dishes, charcuterie. The ultimate food wine." },
        { label: "Best For", value: "When you want to taste where the wine comes from." },
      ],
    },
    sideB: {
      name: "Chardonnay",
      tagline: "Oregon's best-kept secret (not for long)",
      attributes: [
        { label: "Character", value: "Bright, mineral-driven, unoaked to lightly oaked. Not your mother's Chardonnay." },
        { label: "Flavor World", value: "Green apple, lemon, wet stone, hazelnut. Crisp, focused, electric." },
        { label: "Food Partner", value: "Oysters, halibut, roast chicken, creamy pasta. Versatile and generous." },
        { label: "Best For", value: "When you want to be surprised by how good Oregon white wine can be." },
      ],
    },
    verdict: "Pinot Noir is the reason you came to Oregon. Chardonnay is the reason you'll come back. Oregon Pinot is a global benchmark; Oregon Chardonnay is the insider's pick that sommeliers are hoarding. The red is the headliner, but the white is writing the next chapter.",
  },
  {
    id: "oregon-pinot-vs-burgundy-pinot",
    category: "styles",
    subtitle: "New World soul, Old World roots",
    sideA: {
      name: "Oregon Pinot Noir",
      tagline: "The New World's most Old World wine",
      attributes: [
        { label: "Terroir", value: "Young volcanic and marine soils. Cool climate, long growing season." },
        { label: "Style", value: "Fruit-forward but balanced. Generous without being heavy." },
        { label: "Flavor Profile", value: "Red and dark cherry, baking spice, forest floor, bright acidity." },
        { label: "Philosophy", value: "Reverence for Burgundy, but with its own confident identity." },
      ],
    },
    sideB: {
      name: "Burgundy Pinot Noir",
      tagline: "The 2,000-year-old original",
      attributes: [
        { label: "Terroir", value: "Ancient limestone and clay. Centuries of vineyard classification." },
        { label: "Style", value: "Austere, intellectual, terroir-obsessed. Patience required." },
        { label: "Flavor Profile", value: "Red fruit, turned earth, iron, smoke, extraordinary complexity." },
        { label: "Philosophy", value: "The vineyard is everything. The winemaker is merely a steward." },
      ],
    },
    verdict: "Oregon learned from Burgundy and then wrote its own story. Burgundy is the cathedral with 800 years of prayers in the stone. Oregon is the open-air chapel where the sermon is happening right now. Burgundy demands study; Oregon invites you in with open arms. Both will change how you think about wine.",
  },
  {
    id: "still-vs-sparkling",
    category: "styles",
    subtitle: "Same grapes, completely different magic",
    sideA: {
      name: "Still Pinot Noir",
      tagline: "The quiet conversation",
      attributes: [
        { label: "Method", value: "Traditional vinification. Gentle extraction, careful aging." },
        { label: "Experience", value: "Contemplative. A wine you sit with and think about." },
        { label: "Flavor Profile", value: "Cherry, earth, spice, silk. Depth over effervescence." },
        { label: "Occasion", value: "Dinner parties, quiet evenings, moments of reflection." },
      ],
    },
    sideB: {
      name: "Sparkling Wine",
      tagline: "The exclamation point",
      attributes: [
        { label: "Method", value: "Traditional method (methode champenoise). Second fermentation in bottle." },
        { label: "Experience", value: "Celebratory. A wine that lifts the room the moment the cork pops." },
        { label: "Flavor Profile", value: "Green apple, brioche, citrus zest, persistent mousse." },
        { label: "Occasion", value: "Celebrations, brunch, or a Tuesday when you decide life is good." },
      ],
    },
    verdict: "Oregon's cool climate and high acidity make it secretly one of the best sparkling wine regions in America. Still Pinot is the love letter; sparkling is the surprise party. The same grapes that make Oregon's greatest reds are now making bubbles that rival Champagne. Why choose? Drink both.",
  },
];
