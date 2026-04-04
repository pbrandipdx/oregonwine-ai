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
  {
    id: "ponzi-vs-adelsheim",
    category: "wineries",
    subtitle: "Two founding families, two paths",
    sideA: {
      name: "Ponzi Vineyards",
      tagline: "Oregon wine royalty since 1970",
      attributes: [
        { label: "Terroir", value: "Laurelwood District, Chehalem Mountains. Wind-deposited loess over ancient basalt." },
        { label: "Style", value: "Polished, structured, Burgundian in ambition. Wines built for the cellar." },
        { label: "Flavor Profile", value: "Black cherry, truffle, graphite, dried lavender. Tightly wound, age-demanding." },
        { label: "Vibe", value: "A Tuscan villa transplanted to the Willamette Valley. Elegant and serious." },
        { label: "Legacy", value: "Dick and Nancy Ponzi were among the first three families. Now second-generation led." },
      ],
    },
    sideB: {
      name: "Adelsheim",
      tagline: "The scientist-farmer who never stopped questioning",
      attributes: [
        { label: "Terroir", value: "Chehalem Mountains, multiple soil types. David Adelsheim mapped Oregon's AVA future." },
        { label: "Style", value: "Intellectual, terroir-transparent, obsessively site-specific. The thinking person's Pinot." },
        { label: "Flavor Profile", value: "Red currant, wet limestone, white pepper, cranberry. Bright-boned and precise." },
        { label: "Vibe", value: "A geology seminar with a wine pairing. The professor is brilliant and generous." },
        { label: "Legacy", value: "Adelsheim literally drew the map -- he led Oregon's AVA petition process." },
      ],
    },
    verdict: "Ponzi built a dynasty; Adelsheim built an institution. Ponzi wines seduce you with their dark, brooding intensity -- they're the cashmere coat you save up for. Adelsheim wines illuminate you, each sip a lesson in what soil can say when you shut up and listen. If you want drama in your glass, open Ponzi. If you want a conversation, open Adelsheim.",
  },
  {
    id: "domaine-serene-vs-beaux-freres",
    category: "wineries",
    subtitle: "Oregon luxury, two philosophies",
    sideA: {
      name: "Domaine Serene",
      tagline: "Oregon's answer to grand cru Burgundy",
      attributes: [
        { label: "Terroir", value: "Dundee Hills. 1,000+ acres across premier vineyard sites. Gravity-flow, state-of-the-art." },
        { label: "Style", value: "Opulent, concentrated, uncompromising. Wines that announce themselves." },
        { label: "Flavor Profile", value: "Black cherry, espresso, dark chocolate, plush velvet tannins." },
        { label: "Vibe", value: "First class on a transatlantic flight. Leather seats, heavy crystal, no expense spared." },
        { label: "Price Point", value: "Premium tier. Evenstad Reserve regularly trades punches with DRC." },
      ],
    },
    sideB: {
      name: "Beaux Freres",
      tagline: "Robert Parker's brother-in-law, but earning it on merit",
      attributes: [
        { label: "Terroir", value: "Ribbon Ridge. 88 acres of organic, dry-farmed vines on ancient marine sediment." },
        { label: "Style", value: "Concentrated but transparent, biodynamic, whole-cluster influenced. Power with soul." },
        { label: "Flavor Profile", value: "Blackberry, dried violet, iron, crushed rock. Dense yet strangely weightless." },
        { label: "Vibe", value: "A jazz club at midnight. Dark, complex, and utterly magnetic." },
        { label: "Price Point", value: "Premium tier. Cult following among collectors who value substance over flash." },
      ],
    },
    verdict: "This is Oregon's luxury cage match. Domaine Serene builds monuments -- enormous, polished, gleaming. Beaux Freres carves sculptures from a single block of Ribbon Ridge sediment. Serene will impress everyone at the table. Beaux Freres will haunt the person who actually pays attention. If you want spectacle, pour Serene. If you want soul, pour Beaux Freres.",
  },
  {
    id: "ken-wright-vs-bergstrom",
    category: "wineries",
    subtitle: "Single-vineyard obsessives",
    sideA: {
      name: "Ken Wright Cellars",
      tagline: "Every vineyard has a story -- Ken tells all of them",
      attributes: [
        { label: "Terroir", value: "Sources from 8+ distinct vineyard sites across the valley. Each bottled separately." },
        { label: "Style", value: "Site-expressive, minimal oak, transparent winemaking. The vineyard is the star." },
        { label: "Flavor Profile", value: "Varies by site: from bright cherry and mineral to dark plum and spice." },
        { label: "Vibe", value: "A guided tour of the Willamette Valley in a single tasting flight." },
        { label: "Philosophy", value: "Winemaking should be invisible. The site should speak for itself." },
      ],
    },
    sideB: {
      name: "Bergstrom",
      tagline: "Burgundian soul, Oregon bones",
      attributes: [
        { label: "Terroir", value: "Five estate vineyards across Dundee Hills, Chehalem Mountains, and Ribbon Ridge." },
        { label: "Style", value: "Biodynamic, whole-cluster, Burgundy-obsessed. Wines of haunting transparency." },
        { label: "Flavor Profile", value: "Rose petal, blood orange, forest floor, exotic spice, fine-grained tannins." },
        { label: "Vibe", value: "Dinner at a winemaker's home in Beaune, except the view is of Dundee Hills." },
        { label: "Philosophy", value: "Farming is winemaking. The cellar is just the final edit." },
      ],
    },
    verdict: "Both producers worship at the altar of place, but they pray in different languages. Ken Wright is the cartographer, meticulously mapping every ridge and hollow of the valley through single-vineyard bottlings. Bergstrom is the pilgrim who walked to Burgundy and came back with a revelation. If you want to understand Oregon's geography, drink Ken Wright. If you want to understand its spiritual ambitions, drink Bergstrom.",
  },
  {
    id: "lingua-franca-vs-drouhin",
    category: "wineries",
    subtitle: "Burgundy connections, Oregon expressions",
    sideA: {
      name: "Lingua Franca",
      tagline: "Master Sommelier meets Burgundy royalty in the Eola-Amity Hills",
      attributes: [
        { label: "Terroir", value: "Estate vineyard in Eola-Amity Hills. Volcanic basalt soils, Van Duzer winds." },
        { label: "Style", value: "Burgundian rigor applied to Oregon terroir. Dominique Lafon consults. Need we say more?" },
        { label: "Flavor Profile", value: "White peach, flint, salted lemon, chalky minerality. Chardonnay that cuts like a razor." },
        { label: "Vibe", value: "A sommelier's secret stash. The bottle they open after the restaurant closes." },
        { label: "Standout", value: "Their Chardonnays rival anything in the New World. The Pinots aren't far behind." },
      ],
    },
    sideB: {
      name: "Domaine Drouhin",
      tagline: "The Drouhin family's four-century bet on Oregon",
      attributes: [
        { label: "Terroir", value: "Dundee Hills. Jory volcanic soil. Véronique Drouhin-Boss brings literal Burgundy DNA." },
        { label: "Style", value: "Classical, patient, generational. These wines measure time in decades, not vintages." },
        { label: "Flavor Profile", value: "Red cherry, dried rose, turned earth, iron. Restrained power." },
        { label: "Vibe", value: "Christmas dinner at the Drouhin estate in Beaune -- except you're in Oregon." },
        { label: "Standout", value: "Laurène Pinot Noir: Oregon's most consistently Burgundian wine, year after year." },
      ],
    },
    verdict: "Two wineries with Burgundy running through their veins, but different bloodlines. Drouhin is hereditary -- the family has been making wine since the 1880s, and Oregon is simply the next chapter. Lingua Franca is the chosen path -- Larry Stone left the sommelier world to make wine, then recruited Burgundy's Dominique Lafon to help him do it. If you want tradition incarnate, Drouhin. If you want ambition incarnate, Lingua Franca.",
  },
  {
    id: "bethel-heights-vs-cristom",
    category: "wineries",
    subtitle: "Eola-Amity neighbors, different souls",
    sideA: {
      name: "Bethel Heights",
      tagline: "The quiet pioneer of the Eola-Amity Hills",
      attributes: [
        { label: "Terroir", value: "Estate vines planted 1977 on volcanic soils. One of Eola-Amity's first wineries." },
        { label: "Style", value: "Gentle, transparent, site-faithful. Wines that don't shout but linger for days." },
        { label: "Flavor Profile", value: "Tart cherry, dried thyme, iron filings, citrus peel. Savory and vertical." },
        { label: "Vibe", value: "Sunday morning on the farm. Coffee, birdsong, no agenda." },
        { label: "Value", value: "Consistently among Oregon's best QPR. Underpriced for the quality." },
      ],
    },
    sideB: {
      name: "Cristom",
      tagline: "Eola-Amity's most magnetic personality",
      attributes: [
        { label: "Terroir", value: "Four estate vineyards named for women. Volcanic and sedimentary soils, all biodynamic." },
        { label: "Style", value: "Dramatic, textured, whole-cluster-driven. Steve Doerner's 30-year vision." },
        { label: "Flavor Profile", value: "Black raspberry, crushed rock, smoked herbs, baking spice. Complex and kinetic." },
        { label: "Vibe", value: "A thunderstorm over the Coast Range. Beautiful, slightly dangerous, unforgettable." },
        { label: "Value", value: "Premium-priced but justified. Single-vineyard bottlings are collector territory." },
      ],
    },
    verdict: "These two wineries share a zip code and a volcanic ridgeline, but they couldn't be more different. Bethel Heights is the neighbor who waves quietly from the garden -- modest, steady, and making some of the most transparent Pinot in Oregon at prices that should embarrass fancier labels. Cristom is the neighbor who throws the dinner party you talk about for years. If you want honesty, drink Bethel Heights. If you want electricity, drink Cristom.",
  },
  {
    id: "argyle-vs-soter",
    category: "wineries",
    subtitle: "Oregon bubbles masters",
    sideA: {
      name: "Argyle",
      tagline: "Oregon's sparkling wine standard-bearer",
      attributes: [
        { label: "Terroir", value: "Dundee Hills. Rollin Soles built the sparkling program from Aussie know-how and Oregon cool climate." },
        { label: "Style", value: "Traditional method, extended tirage, Champagne-serious. Oregon's most proven bubbles." },
        { label: "Flavor Profile", value: "Green apple, brioche, lemon curd, toasted hazelnut. Persistent, fine mousse." },
        { label: "Vibe", value: "New Year's Eve done right. Celebration with substance, not just spectacle." },
        { label: "Range", value: "Brut, Rosé, Blanc de Blancs, and vintage-dated prestige cuvées." },
      ],
    },
    sideB: {
      name: "Soter Vineyards",
      tagline: "Biodynamic elegance in still and sparkling",
      attributes: [
        { label: "Terroir", value: "Mineral Springs Ranch, Yamhill-Carlton. Biodynamic farming on marine sedimentary soils." },
        { label: "Style", value: "Precise, mineral-driven, biodynamic. Sparkling wines with a sense of place." },
        { label: "Flavor Profile", value: "White peach, crushed seashell, citrus blossom, saline finish. Ethereal mousse." },
        { label: "Vibe", value: "A garden party at a biodynamic estate. Every detail intentional, nothing forced." },
        { label: "Range", value: "Brut Rosé is the star, but still Pinot and Chardonnay are equally compelling." },
      ],
    },
    verdict: "Argyle proved Oregon could make world-class sparkling wine. Soter proved it could make sparkling wine with a soul. Argyle's bubbles are generous and crowd-pleasing -- the bottle that makes everyone at the table smile. Soter's Brut Rosé is the bottle that makes the sommelier at the next table lean over and ask what you're drinking. If you want the sure thing, Argyle. If you want the revelation, Soter.",
  },
  {
    id: "penner-ash-vs-roco",
    category: "wineries",
    subtitle: "Bold winemaker visions",
    sideA: {
      name: "Penner-Ash",
      tagline: "Lynn Penner-Ash: pioneer, rebel, force of nature",
      attributes: [
        { label: "Terroir", value: "Yamhill-Carlton estate. Gravity-flow winery on a dramatic hilltop site." },
        { label: "Style", value: "Bold, expressive, unapologetically Oregon. Wines with backbone and warmth." },
        { label: "Flavor Profile", value: "Dark cherry, black tea, smoked earth, firm but ripe tannins." },
        { label: "Vibe", value: "A bonfire under a clear November sky. Warm, grounded, a little wild." },
        { label: "Legacy", value: "First woman to head a major Oregon winery (Rex Hill). Then built her own." },
      ],
    },
    sideB: {
      name: "ROCO Winery",
      tagline: "Rollin Soles reinvented, again",
      attributes: [
        { label: "Terroir", value: "Chehalem Mountains estate. Wits' End Vineyard -- volcanic Jory soils at elevation." },
        { label: "Style", value: "Precision-crafted, small-lot, meticulous. The engineer's approach to winemaking." },
        { label: "Flavor Profile", value: "Red cherry, pomegranate, white pepper, fine graphite tannins." },
        { label: "Vibe", value: "A Swiss watch. Beautiful, precise, and quietly astonishing when you look closely." },
        { label: "Legacy", value: "After building Argyle, Rollin Soles started ROCO to make his personal statement." },
      ],
    },
    verdict: "Two winemakers who earned their fame at major labels, then went rogue to chase their own visions. Penner-Ash makes wines like she lives -- bold, generous, and unapologetic. ROCO makes wines like a watchmaker assembles a movement -- every component perfect, the whole greater than the parts. If you want passion in your glass, Penner-Ash. If you want precision, ROCO.",
  },
  {
    id: "wvv-vs-king-estate",
    category: "wineries",
    subtitle: "Oregon's largest, different ambitions",
    sideA: {
      name: "Willamette Valley Vineyards",
      tagline: "The people's winery -- literally crowd-funded before it was cool",
      attributes: [
        { label: "Terroir", value: "Estate vineyards in multiple AVAs. Turner, Dundee Hills, Eola-Amity, Tualatin Hills." },
        { label: "Style", value: "Accessible, democratic, range from everyday to estate-level. Oregon's gateway wine." },
        { label: "Flavor Profile", value: "Cherry, raspberry, soft earth, approachable tannins at entry; complex at the top." },
        { label: "Vibe", value: "A community barn-raising. Everyone's invited, everyone contributes, everyone benefits." },
        { label: "Scale", value: "Publicly traded, 1,000+ shareholders. Jim Bernau's original vision made real." },
      ],
    },
    sideB: {
      name: "King Estate",
      tagline: "Oregon's Pinot Gris empire, and so much more",
      attributes: [
        { label: "Terroir", value: "1,033-acre estate near Eugene. Oregon's largest contiguous organic vineyard." },
        { label: "Style", value: "Polished, organic, large-scale quality. Proving size and excellence can coexist." },
        { label: "Flavor Profile", value: "Pear, citrus, white flower (Pinot Gris); bright cherry and spice (Pinot Noir)." },
        { label: "Vibe", value: "A grand resort with a working farm. Beautiful, impressive, and surprisingly genuine." },
        { label: "Scale", value: "Restaurant, events, organic gardens. A destination, not just a winery." },
      ],
    },
    verdict: "These two prove that Oregon wine isn't just a boutique game. WVV democratized Oregon Pinot -- Jim Bernau sold shares to everyday wine lovers and built a publicly traded winery on idealism. King Estate went the other direction, building a Southern Oregon empire on scale, organics, and Pinot Gris before anyone took it seriously. If you believe wine should be for everyone, WVV is your team. If you believe bigger can be better, King Estate makes the case.",
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
  {
    id: "eola-amity-vs-mcminnville",
    category: "avas",
    subtitle: "Two western-edge expressions",
    sideA: {
      name: "Eola-Amity Hills",
      tagline: "The wind tunnel with a vineyard problem",
      attributes: [
        { label: "Soil", value: "Volcanic basalt dominant, with pockets of marine sediment. Ancient and mineral-rich." },
        { label: "Climate", value: "Van Duzer Corridor funnels cold Pacific air directly through the vineyards. Brutal, brilliant." },
        { label: "Signature", value: "High-acid, age-worthy Pinot with savory complexity and floral lift." },
        { label: "Character", value: "The avant-garde gallery. Challenging, rewarding, never boring." },
      ],
    },
    sideB: {
      name: "McMinnville",
      tagline: "The Coast Range's rugged shoulder",
      attributes: [
        { label: "Soil", value: "Uplifted marine sedimentary, shallow and rocky. Vines have to fight for every nutrient." },
        { label: "Climate", value: "Marine fog influence, but less wind-battered than Eola. A different kind of cool." },
        { label: "Signature", value: "Dark-fruited, structured Pinot with herbal undertones and firm grip." },
        { label: "Character", value: "The blacksmith. Strong, deliberate, makes things that last." },
      ],
    },
    verdict: "Both AVAs sit on the western edge of the Willamette Valley, catching the Pacific's breath before anyone else. But they catch it differently. Eola-Amity gets a wind cannon that creates laser-like acidity and ethereal aromatics. McMinnville gets fog and rocky marine soils that produce darker, more muscular wines. If you want a wine that floats, try Eola-Amity. If you want one that anchors, try McMinnville.",
  },
  {
    id: "chehalem-vs-dundee",
    category: "avas",
    subtitle: "Portland's backyard vs the spiritual heart",
    sideA: {
      name: "Chehalem Mountains",
      tagline: "Three soils and a skyline view of Portland",
      attributes: [
        { label: "Soil", value: "Volcanic Jory, marine sedimentary, and windblown Laurelwood loess. All three, one AVA." },
        { label: "Climate", value: "Highest elevations in the north Willamette. Cool nights, long hang time." },
        { label: "Signature", value: "Depends entirely on which soil you're standing on. That's the magic and the madness." },
        { label: "Character", value: "The polyglot. Speaks volcanic, marine, and loess fluently." },
        { label: "Key Producers", value: "Ponzi, Adelsheim, ROCO, Trisaetum. Each exploring a different soil dialect." },
      ],
    },
    sideB: {
      name: "Dundee Hills",
      tagline: "Where Oregon Pinot became Oregon Pinot",
      attributes: [
        { label: "Soil", value: "Jory volcanic clay, essentially one soil type. Consistent, iron-rich, iconic." },
        { label: "Climate", value: "Protected bowl, warm for the valley. Reliable ripening without excessive heat." },
        { label: "Signature", value: "Dark cherry, cola, earth, velvet. The archetype of Oregon Pinot Noir." },
        { label: "Character", value: "The hometown hero. Everyone knows the name, and the reputation is earned." },
        { label: "Key Producers", value: "Drouhin, Eyrie, Sokol Blosser, Domaine Serene. The founding generation." },
      ],
    },
    verdict: "Chehalem Mountains is the wine geek's playground -- three soil types means three completely different wines from vineyards you could walk between in twenty minutes. Dundee Hills is the soul of Oregon Pinot -- one volcanic soil, one unmistakable voice, the taste that launched a thousand wineries. If you want to explore, roam the Chehalem Mountains. If you want to understand, plant yourself in Dundee.",
  },
  {
    id: "ribbon-ridge-vs-laurelwood",
    category: "avas",
    subtitle: "Two micro-AVAs, two soil stories",
    sideA: {
      name: "Ribbon Ridge",
      tagline: "3,350 acres of marine sediment perfection",
      attributes: [
        { label: "Soil", value: "Willakenzie marine sedimentary. Ancient ocean floor, remarkably uniform across the AVA." },
        { label: "Climate", value: "Sheltered within Yamhill-Carlton. A microclimate within a microclimate." },
        { label: "Signature", value: "Structured, mineral-driven Pinot with extraordinary focus and tension." },
        { label: "Character", value: "The jewel cutter. Small, precise, every facet intentional." },
        { label: "Size", value: "Oregon's smallest AVA. Only ~30 vineyards. Exclusivity isn't the goal; it's the geology." },
      ],
    },
    sideB: {
      name: "Laurelwood District",
      tagline: "Wind-deposited loess meets ancient basalt",
      attributes: [
        { label: "Soil", value: "Laurelwood loess: wind-blown silt from Ice Age floods, draped over volcanic basalt." },
        { label: "Climate", value: "Within Chehalem Mountains. Moderate elevation, good air drainage." },
        { label: "Signature", value: "Floral, spice-inflected Pinot with silky texture and aromatic complexity." },
        { label: "Character", value: "The newcomer with old bones. Youngest AVA, ancient soils." },
        { label: "Size", value: "Approved 2020. Oregon's newest AVA, defined by a single soil type." },
      ],
    },
    verdict: "Two micro-AVAs defined by dirt, not marketing. Ribbon Ridge draws a circle around ancient ocean floor and says 'this is different' -- and it is, producing Pinot of almost painful purity. Laurelwood District draws its circle around Ice Age loess, the fine silt blown from catastrophic Missoula Floods, producing wines of silky, perfumed elegance. Ribbon Ridge is the scalpel; Laurelwood is the silk ribbon. Both prove that in Oregon, the soil is the argument.",
  },
  {
    id: "tualatin-hills-vs-chehalem",
    category: "avas",
    subtitle: "The newest AVA vs its neighbor",
    sideA: {
      name: "Tualatin Hills",
      tagline: "Portland's closest wine country, finally recognized",
      attributes: [
        { label: "Soil", value: "Laurelwood loess and volcanic basalt. Similar to Chehalem but at lower elevations." },
        { label: "Climate", value: "Urban heat island influence from Portland proximity. Slightly warmer, earlier ripening." },
        { label: "Signature", value: "Approachable, fruit-forward Pinot with aromatic generosity and soft structure." },
        { label: "Character", value: "The newcomer who's been here all along. Vines planted since the 1970s, AVA since 2020." },
        { label: "Access", value: "20 minutes from downtown Portland. Oregon wine without the highway drive." },
      ],
    },
    sideB: {
      name: "Chehalem Mountains",
      tagline: "The established neighbor with three soil types",
      attributes: [
        { label: "Soil", value: "Volcanic, marine, and loess -- all three Oregon soil types in one AVA." },
        { label: "Climate", value: "Higher elevation than Tualatin Hills. Cooler nights, more pronounced temperature swings." },
        { label: "Signature", value: "Complex, site-specific wines that change character from vineyard to vineyard." },
        { label: "Character", value: "The geologist's dream. Three soils, endless permutations." },
        { label: "Access", value: "30-40 minutes from Portland. The journey is part of the experience." },
      ],
    },
    verdict: "Tualatin Hills and Chehalem Mountains were once a single undifferentiated mass of 'not quite Dundee.' Now they're distinct -- and the distinction matters. Tualatin Hills sits lower and warmer, producing earlier-drinking, more generous wines. Chehalem sits higher and cooler, with more complexity and cellar potential. Tualatin Hills is the weeknight bottle. Chehalem Mountains is the one you decant on a Saturday and think about on Sunday.",
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
  {
    id: "whole-cluster-vs-destemmed",
    category: "styles",
    subtitle: "Two schools of Oregon winemaking",
    sideA: {
      name: "Whole Cluster Pinot",
      tagline: "Stems and all -- the Burgundian dare",
      attributes: [
        { label: "Method", value: "Fermented with grape stems intact. Adds tannin, spice, and structural complexity." },
        { label: "Character", value: "Lifted aromatics, herbal spice, crunchy tannins. A savory, energetic wine." },
        { label: "Flavor Profile", value: "Cherry stem, green tea, clove, black pepper, dried herbs. Spice-driven and electric." },
        { label: "Champions", value: "Cristom, Bergstrom, Kelley Fox, Lingua Franca. The textural maximalists." },
        { label: "Risk/Reward", value: "Higher risk -- green stems can taste vegetal. Higher reward -- adds a savory dimension nothing else can." },
      ],
    },
    sideB: {
      name: "Destemmed Pinot",
      tagline: "Pure fruit, zero compromise",
      attributes: [
        { label: "Method", value: "Grapes removed from stems before fermentation. Fruit purity is the goal." },
        { label: "Character", value: "Clean, fruit-forward, polished. A direct line from grape to glass." },
        { label: "Flavor Profile", value: "Red cherry, raspberry, vanilla, soft earth. Round, plush, immediately appealing." },
        { label: "Champions", value: "Domaine Serene, Stoller, Elk Cove. The clarity seekers." },
        { label: "Risk/Reward", value: "Lower risk -- more predictable results. Can lack the complexity of whole-cluster wines." },
      ],
    },
    verdict: "This is the debate that splits every Oregon winemaker dinner. Whole cluster is the jazz improvisation -- when it works, the wine has a spicy, kinetic energy that destemmed wines simply cannot achieve. Destemmed is the studio recording -- clean, precise, nothing between you and the fruit. If you like your Pinot with an edge and a peppery handshake, go whole cluster. If you want pure, singing fruit with no distractions, go destemmed.",
  },
  {
    id: "oregon-chard-vs-white-burgundy",
    category: "styles",
    subtitle: "The new challenger",
    sideA: {
      name: "Oregon Chardonnay",
      tagline: "The wine that sommeliers are quietly stockpiling",
      attributes: [
        { label: "Terroir", value: "Volcanic and marine soils, cool climate. Dijon clones planted in the 1990s now hitting maturity." },
        { label: "Style", value: "Bright, mineral-driven, restrained oak. More Chablis than Meursault." },
        { label: "Flavor Profile", value: "Green apple, lemon curd, wet stone, hazelnut, flinty minerality." },
        { label: "Price Point", value: "$25-60 for wines that compete with $80-200 Burgundy. Absurd value." },
        { label: "Key Producers", value: "Lingua Franca, Roserock, Domaine Drouhin, Gran Moraine." },
      ],
    },
    sideB: {
      name: "White Burgundy",
      tagline: "The gold standard, with a gold-standard price",
      attributes: [
        { label: "Terroir", value: "Ancient Kimmeridgian limestone. Centuries of site selection and classification." },
        { label: "Style", value: "Mineral-obsessed, oak-integrated, age-worthy. The original and still the benchmark." },
        { label: "Flavor Profile", value: "Citrus, white flower, crushed chalk, butter, honey, hazelnut with age." },
        { label: "Price Point", value: "$40 for basic Bourgogne Blanc, $200+ for premier cru, $500+ for grand cru." },
        { label: "Key Producers", value: "Coche-Dury, Roulot, Leflaive, Comtes Lafon. Waiting lists and allocation." },
      ],
    },
    verdict: "Oregon Chardonnay is doing to white Burgundy what Oregon Pinot did to red Burgundy in the 1980s -- showing up uninvited and outperforming wines three times the price. The best Oregon Chardonnays have the mineral tension of Chablis, the texture of Meursault, and a price tag that doesn't require a second mortgage. If you want the pedigree, drink Burgundy. If you want the value play of the decade, drink Oregon.",
  },
  {
    id: "pinot-gris-vs-pinot-blanc",
    category: "styles",
    subtitle: "Oregon's other Pinots",
    sideA: {
      name: "Oregon Pinot Gris",
      tagline: "Oregon's most popular white wine, and it's not even close",
      attributes: [
        { label: "Character", value: "Crisp, refreshing, food-friendly. The patio wine that overdelivers." },
        { label: "Flavor World", value: "Pear, white peach, citrus blossom, melon. Clean and bright." },
        { label: "Style Range", value: "From lean and mineral (Alsatian style) to round and fruity (Italian Grigio style)." },
        { label: "Food Partner", value: "Thai food, sushi, salads, goat cheese. The go-to 'what pairs with everything' answer." },
        { label: "Market Position", value: "Oregon's #1 white by volume. The wine that pays the bills at most wineries." },
      ],
    },
    sideB: {
      name: "Oregon Pinot Blanc",
      tagline: "The overlooked sibling with the better personality",
      attributes: [
        { label: "Character", value: "Rounder, creamier, more textured than Gris. A white wine with weight and soul." },
        { label: "Flavor World", value: "Apple, almond, honeysuckle, brioche. Richer, more complex, more contemplative." },
        { label: "Style Range", value: "Often lightly oaked, giving it body and complexity. Can age surprisingly well." },
        { label: "Food Partner", value: "Roast chicken, crab, risotto, pork chops. The dinner wine Gris wishes it could be." },
        { label: "Market Position", value: "Cult following among wine insiders. Tiny production, outsized quality." },
      ],
    },
    verdict: "Pinot Gris is the popular kid -- everyone knows it, everyone likes it, it's the safe choice at any restaurant. Pinot Blanc is the interesting kid who reads philosophy and cooks dinner for friends. Gris refreshes; Blanc satisfies. If you're ordering appetizers on a warm day, pour the Gris. If you're sitting down to a real meal, the Blanc will reward you in ways Gris never could.",
  },
  {
    id: "old-vine-vs-young-vine",
    category: "styles",
    subtitle: "Age and expression",
    sideA: {
      name: "Old Vine Pinot Noir",
      tagline: "Forty years of roots have something to say",
      attributes: [
        { label: "Definition", value: "Vines 30+ years old. Own-rooted Pommard and Wadenswil clones from the 1970s-80s." },
        { label: "Character", value: "Concentrated, complex, low-yielding. Deep roots pulling minerals from ancient rock." },
        { label: "Flavor Profile", value: "Dried cherry, iron, mushroom, leather, tea leaf. Savory, cerebral, hauntingly persistent." },
        { label: "Texture", value: "Silky, fine-grained tannins. A velvet density that young vines can't fake." },
        { label: "Key Examples", value: "Eyrie Original Vines, Bethel Heights Estate, Ponzi Reserve." },
      ],
    },
    sideB: {
      name: "Young Vine Pinot Noir",
      tagline: "New Dijon clones, new energy",
      attributes: [
        { label: "Definition", value: "Vines under 15 years. Mostly Dijon clones (667, 777, 115) on modern rootstock." },
        { label: "Character", value: "Vibrant, fruit-forward, exuberant. Youthful energy and generous aromatics." },
        { label: "Flavor Profile", value: "Bright cherry, raspberry, violet, baking spice. Fresh, juicy, immediate." },
        { label: "Texture", value: "Plush, round, instantly gratifying. Crowd-pleasing from the first sip." },
        { label: "Key Examples", value: "Most entry-level and AVA-designated bottlings from major producers." },
      ],
    },
    verdict: "Old vine Pinot is a conversation with someone who's lived a full life -- every word carries weight, every pause is deliberate. Young vine Pinot is the friend who just got back from a trip and can't stop talking, and you don't want them to stop because the stories are so good. Old vines give you depth, mystery, and a savory complexity that makes sommeliers weep. Young vines give you energy, fruit, and the sheer joy of being alive. Both are Oregon. Both are real.",
  },
  {
    id: "oregon-gamay-vs-beaujolais",
    category: "styles",
    subtitle: "Same grape, different terroir",
    sideA: {
      name: "Oregon Gamay Noir",
      tagline: "The crunchy red Oregon didn't know it needed",
      attributes: [
        { label: "Terroir", value: "Volcanic and marine soils, cool Willamette Valley climate. Tiny plantings, passionate growers." },
        { label: "Style", value: "Bright, crunchy, carbonic-influenced. Served slightly chilled, it's Oregon's summer red." },
        { label: "Flavor Profile", value: "Sour cherry, crushed raspberry, wet granite, white pepper. Electric acidity." },
        { label: "Scene", value: "Natural wine bars, farm-to-table restaurants, winemaker house parties." },
        { label: "Key Producers", value: "Bow & Arrow, Division, Johan, Eyrie. The alt-Oregon crowd." },
      ],
    },
    sideB: {
      name: "Beaujolais Cru",
      tagline: "The original, the benchmark, the reason Gamay exists",
      attributes: [
        { label: "Terroir", value: "Granite and schist soils in the northern crus. Centuries of Gamay specialization." },
        { label: "Style", value: "Ranges from fruity (Brouilly) to serious and age-worthy (Morgon, Moulin-a-Vent)." },
        { label: "Flavor Profile", value: "Red cherry, peony, crushed stone, iron, earthy spice. Deceptively complex." },
        { label: "Scene", value: "Bistros, natural wine caves, Michelin-starred restaurants in Lyon." },
        { label: "Key Producers", value: "Marcel Lapierre, Jean Foillard, Yvon Metras, Julien Sunier." },
      ],
    },
    verdict: "Oregon Gamay is still a toddler learning to walk, but it's walking in very interesting directions. Beaujolais has been refining Gamay for centuries on granite soils that give the wines their stony, mineral backbone. Oregon brings volcanic power and New World brightness. Beaujolais Gamay whispers of ancient stone. Oregon Gamay shouts of cherry orchards and volcanic rock. If you want the textbook, drink Beaujolais. If you want the rough draft of something potentially brilliant, drink Oregon.",
  },
  {
    id: "jory-soil-vs-willakenzie-soil",
    category: "styles",
    subtitle: "Volcanic vs marine",
    sideA: {
      name: "Jory Soil Pinot Noir",
      tagline: "Born from fire, stained with iron",
      attributes: [
        { label: "Geology", value: "Volcanic basalt, 15+ million years old. Deep red clay, iron-rich, well-drained." },
        { label: "Where", value: "Dundee Hills, parts of Eola-Amity and Chehalem Mountains." },
        { label: "Flavor Signature", value: "Dark cherry, cola, dried earth, iron, plush tannins. Rich and generous." },
        { label: "Texture", value: "Round, voluptuous, mouth-filling. Wines of weight and warmth." },
        { label: "Analogy", value: "A mezzo-soprano. Rich, warm, full-bodied, commanding the room." },
      ],
    },
    sideB: {
      name: "Willakenzie Soil Pinot Noir",
      tagline: "Born from the sea, salted with fossils",
      attributes: [
        { label: "Geology", value: "Marine sedimentary, ancient ocean floor. Sandstone, siltstone, clay. Nutrient-poor and demanding." },
        { label: "Where", value: "Yamhill-Carlton, Ribbon Ridge, McMinnville, parts of Eola-Amity." },
        { label: "Flavor Signature", value: "Red fruit, exotic spice, wet gravel, saline finish. Lifted and electric." },
        { label: "Texture", value: "Taut, linear, high-tension. Wines of energy and precision." },
        { label: "Analogy", value: "A coloratura soprano. High, bright, nimble, hitting notes you didn't know existed." },
      ],
    },
    verdict: "This is the foundational argument of Oregon terroir, and it's written in the dirt. Jory volcanic soil gives Pinot Noir its power -- dark fruit, iron-tinged earth, a warm generosity that fills the glass. Willakenzie marine soil gives Pinot its precision -- bright fruit, saline minerality, a taut energy that pulls you forward sip after sip. If you want to feel embraced by your wine, drink volcanic. If you want to be challenged by it, drink marine.",
  },
  {
    id: "estate-vs-negociant",
    category: "styles",
    subtitle: "Two business models, two philosophies",
    sideA: {
      name: "Estate Grown",
      tagline: "Our dirt, our vines, our wine",
      attributes: [
        { label: "Definition", value: "Winery owns the vineyard and controls every step from planting to bottle." },
        { label: "Philosophy", value: "Total control. One site, one vision, one unbroken chain of custody." },
        { label: "Advantage", value: "Consistency, site-specificity, and long-term vineyard investment." },
        { label: "Flavor Impact", value: "Wines tend to be more site-expressive, reflecting a single terroir with clarity." },
        { label: "Trade-off", value: "Limited by what one vineyard can produce. Weather risk concentrated, not diversified." },
      ],
    },
    sideB: {
      name: "Negociant / Multi-Source",
      tagline: "The curator's approach to winemaking",
      attributes: [
        { label: "Definition", value: "Winery sources grapes from multiple vineyards, sometimes across several AVAs." },
        { label: "Philosophy", value: "Blending is an art. Select the best fruit from the best sites, compose a symphony." },
        { label: "Advantage", value: "Diversity, flexibility, and the ability to blend for complexity and consistency." },
        { label: "Flavor Impact", value: "Wines tend to be more complex blends, showing a winemaker's vision over raw terroir." },
        { label: "Trade-off", value: "Less site-specific. The winemaker's hand is more visible than the vineyard's voice." },
      ],
    },
    verdict: "Estate-grown is the solo artist, raw and exposed, with nowhere to hide and everything to prove. Negociant is the producer, selecting the best tracks from different studios and mixing them into something cohesive. Oregon leans heavily toward estate in its self-image, but some of the valley's greatest wines -- Ken Wright's single-vineyard bottlings, for instance -- are technically sourced fruit. If you want purity of place, drink estate. If you want breadth of vision, drink a great blend.",
  },
];
