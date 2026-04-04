/* ── Featured Wineries Data ── */

export interface SignatureWine {
  name: string;
  type: string;
  description: string;
}

export interface VisitInfo {
  tastingFee: string;
  reservations: string;
  hours: string;
  address: string;
  website: string;
  phone: string;
}

export interface FeaturedWinery {
  id: string;
  name: string;
  tagline: string;
  ava: string;
  location: string;
  foundedYear: number;
  founders: string;
  winemaker: string;
  story: string;
  signatureWines: SignatureWine[];
  visitInfo: VisitInfo;
  soilTypes: string[];
  farmingPractice: string;
  whyVisit: string;
  heroImageAlt: string;
}

export const FEATURED_WINERIES: FeaturedWinery[] = [
  {
    id: "eyrie-vineyards",
    name: "The Eyrie Vineyards",
    tagline: "Where Oregon wine began",
    ava: "Dundee Hills",
    location: "Dundee, Oregon",
    foundedYear: 1966,
    founders: "David and Diana Lett",
    winemaker: "Jason Lett",
    story: `In 1966, a 24-year-old philosophy major with 3,000 grape cuttings and an unshakable conviction drove north from California into country nobody believed could grow fine wine. David Lett planted the first Pinot Noir and the first Pinot Gris in the Willamette Valley, and named the vineyard after a pair of red-tailed hawks nesting in the fir trees above.

Thirteen years later, his 1975 Reserve Pinot Noir stunned the wine world at the 1979 Gault-Millau Wine Olympiad in Paris, finishing just two-tenths of a point behind Drouhin's 1959 Chambolle-Musigny. Robert Drouhin organized a rematch in Beaune the following year. Lett finished second again. The message was unmistakable: Oregon had arrived.

Today Jason Lett, David and Diana's son, continues to farm the oldest vines in the valley with a philosophy of restraint that borders on stubbornness. These are wines that whisper rather than shout, that reward patience over instant gratification. If you want to taste the soul of Oregon, start here.`,
    signatureWines: [
      { name: "Original Vines Reserve Pinot Noir", type: "Pinot Noir", description: "From vines planted in 1966, this is Oregon distilled into a glass: translucent cherry, dried herbs, mushroom, and an acidity that carries the wine for decades." },
      { name: "Pinot Gris", type: "Pinot Gris", description: "The first commercial Pinot Gris planted in North America. Rounder than Italian Pinot Grigio, with stone fruit, pear, and a honeyed texture that nods toward Alsace." },
      { name: "Chardonnay", type: "Chardonnay", description: "Mineral-driven and unflinching. Lemon zest, wet stone, and green apple with no oak veneer to hide behind." },
      { name: "Pinot Meunier", type: "Pinot Meunier", description: "A rarity in still-wine form. Bright raspberry, white pepper, and a juicy immediacy that makes it irresistible young." },
    ],
    visitInfo: {
      tastingFee: "$20/person",
      reservations: "Recommended",
      hours: "Wed-Sun 11am-5pm",
      address: "935 NE 10th Ave, McMinnville, OR 97128",
      website: "https://eyrievineyards.com",
      phone: "(503) 472-6315",
    },
    soilTypes: ["Jory (volcanic basalt)", "Nekia"],
    farmingPractice: "Sustainable / LIVE Certified",
    whyVisit: "Stand where Oregon wine history was made and taste wines from the oldest Pinot Noir vines in the valley.",
    heroImageAlt: "Misty morning over the original Eyrie Vineyards estate in the Dundee Hills, rows of old-vine Pinot Noir climbing toward fir-covered ridgelines",
  },
  {
    id: "domaine-drouhin",
    name: "Domaine Drouhin Oregon",
    tagline: "French soul, Oregon soil",
    ava: "Dundee Hills",
    location: "Dayton, Oregon",
    foundedYear: 1987,
    founders: "Robert Drouhin (Maison Joseph Drouhin)",
    winemaker: "Veronique Boss-Drouhin",
    story: `When Robert Drouhin tasted David Lett's Pinot Noir and watched it nearly best his own Burgundy, he did something remarkable: instead of dismissing Oregon, he bought land there. In 1987, after attending the inaugural International Pinot Noir Celebration, he purchased 100 acres in the Dundee Hills and sent his daughter Veronique to make the wine.

She has now made over thirty vintages on two continents, shuttling between the family's cellars in Beaune and the gravity-flow winery her father built into the red Jory hillside. The result is a house style that feels neither purely Burgundian nor purely Oregonian but something rarer: a true conversation between two great terroirs.

Domaine Drouhin's existence changed everything. When one of Burgundy's most revered families stakes its reputation on a young wine region, investors and wine lovers pay attention. Every Burgundian house that followed owes a debt to the Drouhins for proving Oregon was worth the gamble.`,
    signatureWines: [
      { name: "Dundee Hills Pinot Noir", type: "Pinot Noir", description: "Red cherry, dried rose, earth, and a whisper of iron. Restrained and elegant, with the kind of structure that unfolds over hours in the glass." },
      { name: "Laurene Pinot Noir", type: "Pinot Noir", description: "The flagship. Named for Veronique's daughter, this is power wrapped in silk: concentrated dark fruit, baking spice, and a velvety persistence." },
      { name: "Arthur Chardonnay", type: "Chardonnay", description: "Named for Veronique's son. Burgundian to its bones: citrus, white flowers, hazelnut, and a chalky minerality that lingers." },
      { name: "Edition Limitee Pinot Noir", type: "Pinot Noir", description: "A selection of the finest barrels in exceptional vintages. Rare, age-worthy, and profoundly layered." },
    ],
    visitInfo: {
      tastingFee: "$40/person",
      reservations: "Required",
      hours: "Daily 11am-4pm",
      address: "6750 NE Breyman Orchards Rd, Dayton, OR 97114",
      website: "https://domainedrouhin.com",
      phone: "(503) 864-2700",
    },
    soilTypes: ["Jory (volcanic basalt)"],
    farmingPractice: "Sustainable / LIVE Certified",
    whyVisit: "Experience the gravity-flow winery built into the hillside and taste the wines that proved Oregon could stand alongside Burgundy.",
    heroImageAlt: "The Domaine Drouhin Oregon winery nestled into the red volcanic hillside of the Dundee Hills, surrounded by rows of Pinot Noir vines",
  },
  {
    id: "cristom",
    name: "Cristom Vineyards",
    tagline: "Oregon's wildflower in an Eola-Amity gale",
    ava: "Eola-Amity Hills",
    location: "Salem, Oregon",
    foundedYear: 1992,
    founders: "Paul and Eileen Gerrie",
    winemaker: "Daniel Estrin",
    story: `Cristom sits on a 240-acre farm in the Eola-Amity Hills where the Van Duzer Corridor winds sweep through a gap in the Coast Range, dropping afternoon temperatures by thirty-five degrees and scouring the vine canopies clean. It is not a gentle place to grow grapes. It is, however, a magnificent one.

The estate's nine vineyard blocks spread across elevations from 200 to 800 feet, planted on a patchwork of volcanic soils that give each block a distinct voice. The farming is organic and biodynamic in spirit, with nearly half a decade of zero synthetic inputs. In the cellar, the approach is traditional: whole-cluster fermentation, native yeast, no filtration.

The result is a portfolio of wines that feel genuinely alive. Where other producers aim for polish, Cristom chases texture and complexity. Their single-vineyard Pinot Noirs are layered with dark berry, savory herbs, wet stone, and exotic spice -- wines that grab you by the collar and make you feel something. This is Oregon at its most untamed and thrilling.`,
    signatureWines: [
      { name: "Eileen Vineyard Pinot Noir", type: "Pinot Noir", description: "Named for the founder's wife. Dark cherry, exotic spice, savory herbs, and a mineral depth that echoes the volcanic soils. Structured and age-worthy." },
      { name: "Jessie Vineyard Pinot Noir", type: "Pinot Noir", description: "From the estate's highest elevation block. Bright red fruit, floral lift, and a wind-driven energy that sets it apart from the darker Eileen." },
      { name: "Mt. Jefferson Cuvee Pinot Noir", type: "Pinot Noir", description: "The introductory blend. Approachable but serious, with all the hallmarks of the estate style at a gentler price." },
      { name: "Eola-Amity Hills Chardonnay", type: "Chardonnay", description: "Taut and mineral, with lemon curd, white flowers, and a saline finish shaped by the volcanic soils and constant wind." },
      { name: "Viognier", type: "Viognier", description: "A rare Oregon expression of the Rhone grape. Apricot, honeysuckle, and orange blossom with surprising freshness." },
    ],
    visitInfo: {
      tastingFee: "$40/person",
      reservations: "Required",
      hours: "Wed-Sun 11am-4pm",
      address: "6905 Spring Valley Rd NW, Salem, OR 97304",
      website: "https://cristomvineyards.com",
      phone: "(503) 375-3068",
    },
    soilTypes: ["Volcanic basalt", "Nekia"],
    farmingPractice: "Organic / Biodynamic principles",
    whyVisit: "Feel the Van Duzer winds on your face while tasting single-vineyard Pinot Noirs that vibrate with volcanic energy.",
    heroImageAlt: "Wind-swept vineyard rows at Cristom in the Eola-Amity Hills, with the Coast Range visible through afternoon haze",
  },
  {
    id: "sokol-blosser",
    name: "Sokol Blosser Winery",
    tagline: "Pioneers of Oregon sustainability",
    ava: "Dundee Hills",
    location: "Dayton, Oregon",
    foundedYear: 1971,
    founders: "Bill and Susan Sokol Blosser",
    winemaker: "Alex Sokol Blosser",
    story: `Bill and Susan Sokol Blosser planted their first five acres of vines in the Dundee Hills in 1971, when Oregon wine was still a punchline. Half a century later, their estate sprawls across 128 certified-organic acres, and their family has become synonymous with proving that world-class wine and environmental leadership are not mutually exclusive.

The firsts are staggering: first winery certified Salmon-Safe in the United States, first winery building to earn LEED certification (an underground barrel cellar that keeps temperatures naturally stable), USDA organic certification for the estate vineyard, and B Corp status since 2015. Second-generation siblings Alex and Alison Sokol Blosser now run the operation with the same stubborn idealism their parents brought to an empty hillside.

Beyond the sustainability credentials, these are simply beautiful wines. The estate Pinot Noir from Jory volcanic soil is dark-fruited and structured, the Pinot Gris is bright and textured, and the Evolution series offers some of the most crowd-pleasing, value-driven bottles in the valley. This is a winery that walks its talk.`,
    signatureWines: [
      { name: "Dundee Hills Estate Pinot Noir", type: "Pinot Noir", description: "Dark cherry, plum, and baking spice from old-vine Jory soil plantings. Concentrated and age-worthy with a distinctive volcanic mineral finish." },
      { name: "Orchard Block Pinot Noir", type: "Pinot Noir", description: "Single-block selection from the original 1971 plantings area. Layered, complex, and deeply site-specific." },
      { name: "Estate Rose of Pinot Noir", type: "Rose", description: "Pale salmon, wild strawberry, and melon. Dry, crisp, and built for summer afternoons on the tasting room terrace." },
      { name: "Evolution Big Time Red", type: "Red Blend", description: "A playful multi-variety blend that showcases the winery's experimental side. Juicy, approachable, and endlessly fun." },
    ],
    visitInfo: {
      tastingFee: "$30/person",
      reservations: "Recommended",
      hours: "Daily 10am-4pm",
      address: "5000 NE Sokol Blosser Ln, Dayton, OR 97114",
      website: "https://sokolblosser.com",
      phone: "(503) 864-2282",
    },
    soilTypes: ["Jory (volcanic basalt)"],
    farmingPractice: "Certified Organic / B Corp",
    whyVisit: "Sit on the terrace overlooking 128 organic acres and taste what happens when sustainability meets ambition.",
    heroImageAlt: "The Sokol Blosser tasting room terrace overlooking rolling organic vineyard rows in the Dundee Hills, late afternoon golden light",
  },
  {
    id: "ponzi",
    name: "Ponzi Vineyards",
    tagline: "From pioneer homestead to Champagne royalty",
    ava: "Laurelwood District",
    location: "Sherwood, Oregon",
    foundedYear: 1970,
    founders: "Dick and Nancy Ponzi",
    winemaker: "Luisa Ponzi",
    story: `Dick and Nancy Ponzi planted their first vines in 1968 and produced their first four barrels of wine in 1974. Like all the pioneer families, they were told they were crazy. Like all the pioneer families, they were right. What distinguishes Ponzi is the soil -- or rather, the family's obsessive devotion to understanding it.

Luisa Ponzi, their daughter, spent years studying the windblown loess over ancient basalt that defines the property's terroir. She was instrumental in petitioning for and creating the Laurelwood District AVA in 2020, carving out a distinct appellation defined not by political boundaries but by a single, remarkable soil type. The Laurelwood soils produce Pinot Noir of uncommon elegance: fine-grained tannins, aromatic complexity, and a floral lift that sets them apart.

In 2021, Groupe Bollinger -- the Champagne house behind one of the world's most iconic sparkling wines -- acquired Ponzi Vineyards. It was Bollinger's first property outside France, a stunning vote of confidence in both the estate and the region. The gravity-flow winery built in 2008 remains the production heart, and the wines continue to reflect five decades of patient, soil-obsessed winemaking.`,
    signatureWines: [
      { name: "Avellana Pinot Noir", type: "Pinot Noir", description: "The estate flagship. Named for the hazelnut trees that once covered these hills. Elegant, floral, with fine-grained tannins and a persistent mineral finish." },
      { name: "Reserve Pinot Noir", type: "Pinot Noir", description: "Barrel selection from the finest lots. Concentrated dark fruit, baking spice, and the silky texture that defines Laurelwood terroir." },
      { name: "Pinot Gris", type: "Pinot Gris", description: "One of Oregon's benchmark Pinot Gris bottlings. Stone fruit, pear, and a round, textured mouthfeel with bright acidity." },
      { name: "Chardonnay", type: "Chardonnay", description: "Burgundian in ambition, with citrus, wet stone, and subtle oak integration. A rising star in the portfolio." },
    ],
    visitInfo: {
      tastingFee: "$35/person",
      reservations: "Required",
      hours: "Daily 10am-5pm",
      address: "19500 SW Mountain Home Rd, Sherwood, OR 97140",
      website: "https://ponzivineyards.com",
      phone: "(503) 628-1227",
    },
    soilTypes: ["Laurelwood (loess over basalt)"],
    farmingPractice: "Sustainable / LIVE Certified",
    whyVisit: "Taste the wines that convinced a Champagne dynasty to make its first investment outside of France.",
    heroImageAlt: "The modern gravity-flow Ponzi Vineyards winery surrounded by Laurelwood District vineyards, Chehalem Mountains in the distance",
  },
  {
    id: "adelsheim",
    name: "Adelsheim Vineyard",
    tagline: "The architect of Oregon wine's future",
    ava: "Chehalem Mountains",
    location: "Newberg, Oregon",
    foundedYear: 1978,
    founders: "David and Ginny Adelsheim",
    winemaker: "Gina Hennen",
    story: `David Adelsheim did not just make wine in Oregon -- he built the infrastructure for an entire industry. He purchased his first 19 acres in 1971, established the vineyard in 1978, and then spent decades working behind the scenes to shape the regulatory and cultural framework that allows Oregon wineries to thrive. He petitioned for and helped create both the Willamette Valley AVA in 1983 and the Chehalem Mountains AVA in 2006.

The estate today encompasses eleven vineyards and over 200 acres spanning volcanic, loess, and sedimentary soils -- a miniature encyclopedia of Willamette Valley terroir on a single property. This diversity is the winemaker's playground, and current winemaker Gina Hennen uses it masterfully, crafting single-vineyard bottlings that reveal how dramatically a Pinot Noir's character changes with a shift in soil type or elevation.

Adelsheim was the first winery in the Chehalem Mountains, and in many ways it remains the most articulate voice for the region's potential. The wines are terroir-focused, elegant, and refined -- the kind of bottles that make a compelling case for why place matters more than technique.`,
    signatureWines: [
      { name: "Breaking Ground Pinot Noir", type: "Pinot Noir", description: "The entry point. Bright cherry, subtle earth, and a clean line of acidity. Approachable and honest." },
      { name: "Ribbon Springs Vineyard Pinot Noir", type: "Pinot Noir", description: "From sedimentary soils on Ribbon Ridge. Silky tannins, dark plum, and floral perfume. One of the most expressive single-vineyard bottlings in the portfolio." },
      { name: "Elizabeth's Reserve Pinot Noir", type: "Pinot Noir", description: "The flagship. A barrel selection from the finest lots across the estate, representing the best of each vintage." },
      { name: "Chardonnay", type: "Chardonnay", description: "Crisp, mineral-driven, with citrus and white flowers. Burgundian restraint without pretension." },
    ],
    visitInfo: {
      tastingFee: "$30/person",
      reservations: "Recommended",
      hours: "Daily 11am-4pm",
      address: "16800 NE Calkins Ln, Newberg, OR 97132",
      website: "https://adelsheim.com",
      phone: "(503) 538-3652",
    },
    soilTypes: ["Jory (volcanic)", "Loess (windblown)", "Willakenzie (marine sedimentary)"],
    farmingPractice: "Sustainable / LIVE Certified",
    whyVisit: "Taste across three soil types on a single estate and discover why David Adelsheim spent decades fighting for terroir-based appellations.",
    heroImageAlt: "Rolling vineyard blocks at Adelsheim estate in the Chehalem Mountains, with distinct soil zones visible across the hillside",
  },
  {
    id: "ken-wright",
    name: "Ken Wright Cellars",
    tagline: "Thirteen vineyards, thirteen truths",
    ava: "Yamhill-Carlton",
    location: "Carlton, Oregon",
    foundedYear: 1994,
    founders: "Ken Wright",
    winemaker: "Ken Wright",
    story: `Ken Wright is the Willamette Valley's most passionate advocate for single-vineyard expression. He authored the Yamhill-Carlton AVA petition himself, and his life's work has been proving that in Oregon, as in Burgundy, the vineyard is the artist and the winemaker is merely the translator.

His portfolio spans thirteen vineyard sites across five sub-appellations -- Yamhill-Carlton, Eola-Amity Hills, Dundee Hills, Chehalem Mountains, and Ribbon Ridge. Each wine is made identically in the cellar to eliminate winemaking variables, so what you taste in the glass is pure terroir. The Abbott Claim bottling from Yamhill-Carlton marine sedimentary soils tastes nothing like the Savoya from across the same AVA, which tastes nothing like the volcanic-soil Dundee Hills selections. The exercise is revelatory.

Wright's tasting room in the historic Carlton grain elevator is itself a destination -- a beautiful space where you can taste your way across the valley without leaving town. His wines are a masterclass in how different vineyard sites, even within the same appellation, produce dramatically different expressions of Pinot Noir.`,
    signatureWines: [
      { name: "Abbott Claim Vineyard Pinot Noir", type: "Pinot Noir", description: "Yamhill-Carlton marine sedimentary soil. Plummy black cherry, earthy minerality, broad silky tannins, and a savory depth." },
      { name: "Savoya Vineyard Pinot Noir", type: "Pinot Noir", description: "Also Yamhill-Carlton, but a different expression entirely. More structured, with dark fruit and a firm tannic spine." },
      { name: "Shea Vineyard Pinot Noir", type: "Pinot Noir", description: "One of Oregon's most famous vineyard sites. Rich, opulent, with layers of dark berry, cola, and baking spice." },
      { name: "Freedom Hill Vineyard Pinot Noir", type: "Pinot Noir", description: "From the coast-influenced western edge of the valley. Bright, lifted, with red fruit and herbal complexity." },
    ],
    visitInfo: {
      tastingFee: "$25/person",
      reservations: "Recommended",
      hours: "Fri-Sun 11am-5pm",
      address: "120 N Pine St, Carlton, OR 97111",
      website: "https://kenwrightcellars.com",
      phone: "(503) 852-7070",
    },
    soilTypes: ["Willakenzie (marine sedimentary)", "Jory (volcanic)", "Mixed"],
    farmingPractice: "Sustainable",
    whyVisit: "Taste thirteen single-vineyard Pinot Noirs side by side and understand why Oregon is the most terroir-obsessed wine region in America.",
    heroImageAlt: "The Ken Wright Cellars tasting room inside the restored Carlton grain elevator, warm wood and high ceilings",
  },
  {
    id: "lingua-franca",
    name: "Lingua Franca",
    tagline: "A Master Sommelier's Burgundian dream",
    ava: "Eola-Amity Hills",
    location: "Salem, Oregon",
    foundedYear: 2012,
    founders: "Larry Stone and David Honig",
    winemaker: "Thomas Savre",
    story: `Larry Stone was the second American to earn the Master Sommelier title. He spent decades at the pinnacle of the restaurant world, pouring the greatest wines on earth, before doing something improbable: he moved to Oregon to make his own. With co-founder David Honig, he launched Lingua Franca in 2012 with a vision borrowed from Burgundy's grand cru culture -- wines of place, made with meticulous attention and minimal intervention.

The winemaker, Thomas Savre, trained in Burgundy, and consulting winemaker Dominique Lafon is one of the most respected figures in Meursault. The farming follows organic and biodynamic principles guided by Bethel Heights' Mimi Casteel, a leader in regenerative viticulture. Every decision is made in service of transparency: these wines are meant to taste like the ground they came from, not the hands that made them.

The result is a portfolio of single-vineyard Pinot Noir and Chardonnay that ranks among the most nuanced wines being made in Oregon. They are quiet, cerebral, and deeply site-specific -- the kind of wines that reward the drinker who already knows what they love and is looking for something that challenges them further.`,
    signatureWines: [
      { name: "Avni Pinot Noir", type: "Pinot Noir", description: "The estate introduction. Bright red fruit, floral notes, and a pure, transparent expression of Eola-Amity Hills volcanic terroir." },
      { name: "The Plow Chardonnay", type: "Chardonnay", description: "Named for the importance of soil work. Citrus, wet stone, and a chalky mineral spine. Burgundian in the best possible sense." },
      { name: "Mimi's Mind Pinot Noir", type: "Pinot Noir", description: "Named for farming mentor Mimi Casteel. Complex, layered, with dark fruit and a savory, earthy core." },
      { name: "Sisters Chardonnay", type: "Chardonnay", description: "Single-vineyard. Hazelnut, brioche, lemon curd, and a persistent finish that builds and builds." },
    ],
    visitInfo: {
      tastingFee: "$50/person",
      reservations: "Required",
      hours: "Fri-Sun 11am-4pm",
      address: "8075 Worden Hill Rd, Salem, OR 97304",
      website: "https://linguafranca.wine",
      phone: "(503) 586-2811",
    },
    soilTypes: ["Volcanic basalt", "Nekia"],
    farmingPractice: "Organic / Biodynamic principles",
    whyVisit: "Taste what happens when a Master Sommelier, a Burgundian winemaker, and volcanic Eola-Amity soils come together.",
    heroImageAlt: "Lingua Franca vineyard rows on volcanic hillside in the Eola-Amity Hills, fog lifting in morning light",
  },
  {
    id: "beaux-freres",
    name: "Beaux Freres",
    tagline: "Ribbon Ridge's most coveted address",
    ava: "Ribbon Ridge",
    location: "Newberg, Oregon",
    foundedYear: 1991,
    founders: "Michael Etzel and Robert Parker Jr.",
    winemaker: "Michael Etzel Jr.",
    story: `The name means "brothers-in-law" in French, and the founding partnership between winemaker Michael Etzel and wine critic Robert Parker (who married Michael's sister) gave Beaux Freres an outsized profile from the start. But the wines have always justified the attention, and then some. This is one of Oregon's most consistently brilliant producers.

The 88-acre farm sits atop Ribbon Ridge, one of the Willamette Valley's smallest and most distinctive AVAs. The sedimentary Willakenzie soils here produce Pinot Noir of unusual elegance: silky tannins, beautiful red fruit, and a floral perfume that sets Ribbon Ridge apart from its volcanic neighbors. The farming follows holistic, sustainable principles, and the winemaking favors whole-cluster fermentation and native yeasts.

Michael Etzel Jr. has now taken the winemaking reins from his father, and the wines have only gained in precision and transparency. The Beaux Freres Vineyard bottling remains one of the most sought-after Pinot Noirs in Oregon -- a wine that manages to be simultaneously powerful and graceful, with the kind of concentrated purity that rewards years of cellaring.`,
    signatureWines: [
      { name: "Beaux Freres Vineyard Pinot Noir", type: "Pinot Noir", description: "The flagship. Concentrated red and dark fruit, floral perfume, silky tannins, and a persistent mineral finish from the estate's sedimentary soils." },
      { name: "Upper Terrace Pinot Noir", type: "Pinot Noir", description: "From the highest block on the estate. More structured and age-worthy, with dark fruit and a firm backbone." },
      { name: "Willamette Valley Pinot Noir", type: "Pinot Noir", description: "The introductory cuvee. Elegant and approachable, with bright cherry and fine-grained tannins." },
      { name: "Chardonnay", type: "Chardonnay", description: "A newer addition to the portfolio. Crisp, mineral, and precise." },
    ],
    visitInfo: {
      tastingFee: "$65/person (waived with purchase of 2+ bottles)",
      reservations: "Required",
      hours: "By appointment",
      address: "15155 NE North Valley Rd, Newberg, OR 97132",
      website: "https://beauxfreres.com",
      phone: "(503) 537-1137",
    },
    soilTypes: ["Willakenzie (marine sedimentary)"],
    farmingPractice: "Sustainable / Holistic",
    whyVisit: "Taste one of Oregon's most sought-after Pinot Noirs on the tiny, distinctive Ribbon Ridge AVA.",
    heroImageAlt: "The Beaux Freres estate perched on Ribbon Ridge, vine rows descending into the valley, late autumn color in the leaves",
  },
  {
    id: "bergstrom",
    name: "Bergstrom Wines",
    tagline: "Burgundy's methods, Oregon's voice",
    ava: "Chehalem Mountains",
    location: "Newberg, Oregon",
    foundedYear: 1999,
    founders: "John and Karen Bergstrom",
    winemaker: "Josh Bergstrom",
    story: `Josh Bergstrom grew up in his parents' vineyard, then left for Burgundy to learn winemaking at the source. He returned to Oregon with a conviction that the Chehalem Mountains could produce wines of Burgundian depth and complexity, and he has spent two decades proving it. The estate farms five vineyards across multiple soil types, and the wines reflect a winemaker who has internalized Burgundy's lessons without losing his Oregon accent.

The approach is exacting. Fermentations use native yeasts. The Pinot Noirs see whole-cluster inclusion when the vintage allows. The Chardonnays are barrel-fermented with minimal intervention. Everything is designed to let the vineyard speak. And when the vineyard in question is planted on ancient volcanic and loess soils at elevation in the Chehalem Mountains, it has a great deal to say.

Bergstrom's private Ekollon tasting experience has become one of the most coveted appointments in the valley -- an intimate, detailed exploration of how soil type shapes wine in ways that are immediately, viscerally obvious. If you care about terroir as more than a marketing term, this is where to spend an afternoon.`,
    signatureWines: [
      { name: "Cumberland Reserve Pinot Noir", type: "Pinot Noir", description: "The estate blend. Dark cherry, dried herbs, and iron minerality from volcanic Chehalem Mountains soils." },
      { name: "Bergstrom Vineyard Pinot Noir", type: "Pinot Noir", description: "Single-vineyard estate. Complex and layered, with black fruit, smoke, and a long, savory finish." },
      { name: "Sigrid Chardonnay", type: "Chardonnay", description: "Named for Josh's mother. Lemon curd, hazelnut, and wet stone with Burgundian precision and Oregon brightness." },
      { name: "Gregory Ranch Pinot Noir", type: "Pinot Noir", description: "From Yamhill-Carlton sedimentary soils. Earthy, structured, and dark-fruited, a compelling contrast to the volcanic estate wines." },
    ],
    visitInfo: {
      tastingFee: "$50/person",
      reservations: "Required",
      hours: "Daily by appointment",
      address: "18215 NE Calkins Ln, Newberg, OR 97132",
      website: "https://bergstromwines.com",
      phone: "(503) 554-0468",
    },
    soilTypes: ["Jory (volcanic)", "Loess (windblown)", "Willakenzie (marine sedimentary)"],
    farmingPractice: "Biodynamic / Organic",
    whyVisit: "Book the Ekollon experience to taste how volcanic, loess, and marine sedimentary soils create three completely different wines from the same grape.",
    heroImageAlt: "Bergstrom estate vineyard at dawn in the Chehalem Mountains, morning fog clinging to vine rows with the Cascade foothills beyond",
  },
  {
    id: "argyle",
    name: "Argyle Winery",
    tagline: "Oregon's sparkling wine pioneer",
    ava: "Dundee Hills",
    location: "Dundee, Oregon",
    foundedYear: 1987,
    founders: "Brian Croser and Cal Knudsen",
    winemaker: "Nate Klostermann",
    story: `In 1987, while the rest of Oregon was fixated on Pinot Noir, Australian winemaker Brian Croser and Cal Knudsen looked at the Willamette Valley's high acidity, cool climate, and chalky soils and saw something else entirely: a world-class sparkling wine region. They were decades ahead of the curve.

Argyle was the first Willamette Valley winery to establish a dedicated methode traditionnelle sparkling program with every stage produced in-house -- from base wine fermentation through tirage, riddling, and disgorgement. No shortcuts, no contract production. The result is a range of sparkling wines that rival producers charging two and three times the price, with the kind of yeasty complexity and persistent mousse that only comes from extended lees aging.

Today the sparkling program shares a portfolio with excellent still Pinot Noir, Chardonnay, and Riesling, but the bubbles remain the soul of Argyle. As more producers enter Oregon's rapidly growing sparkling wine scene, Argyle's three-decade head start is an advantage that cannot be manufactured. These are the wines that proved Oregon could make serious bubbles.`,
    signatureWines: [
      { name: "Brut", type: "Sparkling", description: "The workhorse. Green apple, brioche, and citrus with a persistent, fine mousse. Extended lees aging gives it a toasty depth." },
      { name: "Blanc de Blancs", type: "Sparkling", description: "100% Chardonnay. Lean, mineral, and precise, with notes of lemon zest and fresh cream." },
      { name: "Rose Brut", type: "Sparkling Rose", description: "Salmon-pink, with wild strawberry, cream, and a crisp, dry finish. The most festive bottle in the lineup." },
      { name: "Nuthouse Pinot Noir", type: "Pinot Noir", description: "Named for the old Knudsen walnut drying house. Rich, dark-fruited, and structured from Dundee Hills volcanic soil." },
    ],
    visitInfo: {
      tastingFee: "$25/person",
      reservations: "Recommended",
      hours: "Daily 11am-5pm",
      address: "691 Hwy 99W, Dundee, OR 97115",
      website: "https://argylewinery.com",
      phone: "(503) 538-8520",
    },
    soilTypes: ["Jory (volcanic basalt)"],
    farmingPractice: "Sustainable",
    whyVisit: "Taste the sparkling wines that proved Oregon's cool climate was made for bubbles, from the region's original methode traditionnelle producer.",
    heroImageAlt: "Argyle Winery tasting room on Highway 99W in Dundee, golden afternoon light catching rows of sparkling wine bottles",
  },
  {
    id: "penner-ash",
    name: "Penner-Ash Wine Cellars",
    tagline: "Bold, generous, unapologetic",
    ava: "Yamhill-Carlton",
    location: "Newberg, Oregon",
    foundedYear: 1998,
    founders: "Lynn and Ron Penner-Ash",
    winemaker: "Kate Papadopoulos",
    story: `Lynn Penner-Ash made her name as winemaker at Rex Hill before striking out on her own in 1998, and her wines have always been distinctly her: generous, texturally rich, and unafraid of concentration. In a region that sometimes fetishizes delicacy, Penner-Ash offers a compelling counterpoint -- wines that are powerful without being heavy, bold without being blunt.

The Dussin Vineyard estate in Yamhill-Carlton sits on ancient marine sedimentary soils that produce wines with dark fruit, earthy depth, and broad, silky tannins. But Penner-Ash also sources from some of the valley's most celebrated vineyard sites across multiple AVAs, and her Syrah from Rogue Valley has developed a cult following among lovers of cool-climate Rhone varieties.

The gravity-flow winery, perched on a hilltop with sweeping views of the Willamette Valley, is one of the most architecturally striking in the region. Kate Papadopoulos now leads the winemaking, and the house style remains faithful to the founder's vision: wines that are generous, textured, and built to reward both immediate enjoyment and patient aging.`,
    signatureWines: [
      { name: "Willamette Valley Pinot Noir", type: "Pinot Noir", description: "The flagship blend. Generous dark cherry, baking spice, and round tannins with a plush, approachable texture." },
      { name: "Dussin Vineyard Pinot Noir", type: "Pinot Noir", description: "Estate single-vineyard. Darker and more structured, with black fruit, earth, and a savory, long finish from marine sedimentary soils." },
      { name: "Syrah", type: "Syrah", description: "From southern Oregon. Blackberry, smoked meat, cracked pepper, and violet. A cult favorite." },
      { name: "Chardonnay", type: "Chardonnay", description: "Rich and textured, with ripe stone fruit, toasted hazlenut, and a creamy mid-palate balanced by bright acidity." },
    ],
    visitInfo: {
      tastingFee: "$35/person",
      reservations: "Recommended",
      hours: "Daily 10am-5pm",
      address: "15771 NE Ribbon Ridge Rd, Newberg, OR 97132",
      website: "https://pennerash.com",
      phone: "(503) 554-5545",
    },
    soilTypes: ["Willakenzie (marine sedimentary)"],
    farmingPractice: "Sustainable / LIVE Certified",
    whyVisit: "Taste bold, generous Pinot Noir from one of the valley's most architecturally stunning hilltop wineries.",
    heroImageAlt: "The Penner-Ash hilltop winery with panoramic views of the Willamette Valley, modern architecture framed by vineyard rows",
  },
  {
    id: "bethel-heights",
    name: "Bethel Heights Vineyard",
    tagline: "Where biodynamic meets volcanic fire",
    ava: "Eola-Amity Hills",
    location: "Salem, Oregon",
    foundedYear: 1977,
    founders: "Ted Casteel and Pat Dudley families",
    winemaker: "Ben Casteel",
    story: `Bethel Heights was one of the earliest pioneers of the Eola-Amity Hills, planted in 1977 when the sub-appellation was barely a concept. The twin families -- the Casteels and the Dudleys -- saw potential in the wind-battered volcanic hillside and committed to farming it with an intensity that has only deepened over five decades.

Mimi Casteel, the second-generation farmer, became one of Oregon's most influential voices in regenerative and biodynamic viticulture. Her work at Bethel Heights influenced an entire generation of Oregon growers, including the team at Lingua Franca, who brought her on as farming consultant. The vineyard is not just farmed organically; it is treated as a living ecosystem, with cover crops, biodiversity corridors, and a holistic approach to soil health that goes far beyond certification checkboxes.

The wines are thrilling. The Van Duzer Corridor winds deliver bracing acidity, the volcanic soils provide mineral depth, and the old vines contribute a concentration that younger plantings cannot match. Bethel Heights Pinot Noir is energetic, precise, and transparently site-specific -- a wine that tastes like the wind-scoured ridge it comes from.`,
    signatureWines: [
      { name: "Estate Pinot Noir", type: "Pinot Noir", description: "Bright red cherry, cranberry, and a distinctive mineral lift from volcanic soils. Energetic and precise, with the bracing acidity of the Eola-Amity Hills." },
      { name: "Flat Block Pinot Noir", type: "Pinot Noir", description: "From the estate's most distinctive block. Deeper and more structured, with dark fruit, earth, and a long, savory finish." },
      { name: "Chardonnay", type: "Chardonnay", description: "Taut and mineral, with green apple, lemon, and a chalky texture shaped by wind and volcanic soil." },
      { name: "Pinot Blanc", type: "Pinot Blanc", description: "Bright, refreshing, and textured. A perfect introduction to the estate's style." },
    ],
    visitInfo: {
      tastingFee: "$25/person",
      reservations: "Recommended",
      hours: "Tue-Sun 11am-5pm",
      address: "6060 Bethel Heights Rd NW, Salem, OR 97304",
      website: "https://bethelheights.com",
      phone: "(503) 581-2262",
    },
    soilTypes: ["Volcanic basalt", "Nekia"],
    farmingPractice: "Biodynamic / Regenerative",
    whyVisit: "Experience pioneering biodynamic farming on one of the Eola-Amity Hills' oldest vineyard sites.",
    heroImageAlt: "Bethel Heights vineyard on the volcanic slopes of the Eola-Amity Hills, cover crops blooming between vine rows",
  },
  {
    id: "patricia-green",
    name: "Patricia Green Cellars",
    tagline: "Ribbon Ridge's singular voice",
    ava: "Ribbon Ridge",
    location: "Newberg, Oregon",
    foundedYear: 2000,
    founders: "Patricia Green and Jim Anderson",
    winemaker: "Jim Anderson",
    story: `Patricia Green was one of Oregon's most admired winemakers when she passed away in 2017, and the winery she built with partner Jim Anderson continues to honor her vision: single-vineyard Pinot Noir that speaks clearly and specifically of where it was grown. The estate sits on Ribbon Ridge, one of the valley's smallest and most distinctive AVAs, and the wines from this sedimentary terroir have a signature elegance -- silky tannins, floral perfume, and red fruit of uncommon purity.

Jim Anderson has continued making wine in Patricia's spirit, with a relentless focus on vineyard expression and a deep bench of single-vineyard bottlings. The range is remarkably wide -- sometimes more than a dozen individual vineyard designates in a single vintage -- and comparing them side by side is one of the great educational experiences in Oregon wine. You can taste the difference between blocks planted just yards apart.

The tasting room is modest by design. This is a winery that puts every ounce of energy into what is in the bottle, and the wines repay that focus. Patricia Green Cellars is essential drinking for anyone who wants to understand what makes Ribbon Ridge special.`,
    signatureWines: [
      { name: "Notorious Pinot Noir", type: "Pinot Noir", description: "The gateway wine. Bright cherry, subtle spice, and fine-grained tannins. Generous and immediately appealing." },
      { name: "Estate Vineyard Pinot Noir", type: "Pinot Noir", description: "Pure Ribbon Ridge expression. Red fruit, floral lift, silky texture, and a transparent mineral finish from sedimentary soils." },
      { name: "Freedom Hill Vineyard Pinot Noir", type: "Pinot Noir", description: "From a legendary site west of Salem. Darker and more brooding, with black cherry, earth, and spice." },
      { name: "Balcombe Vineyard Pinot Noir", type: "Pinot Noir", description: "Ribbon Ridge single-vineyard. Delicate, perfumed, with the elegant tannin structure that defines the AVA." },
    ],
    visitInfo: {
      tastingFee: "$20/person",
      reservations: "Recommended",
      hours: "Fri-Sun 11am-4pm",
      address: "15225 NE North Valley Rd, Newberg, OR 97132",
      website: "https://patriciagreencellars.com",
      phone: "(503) 554-0821",
    },
    soilTypes: ["Willakenzie (marine sedimentary)"],
    farmingPractice: "Sustainable",
    whyVisit: "Taste a dozen single-vineyard Pinot Noirs and discover why tiny Ribbon Ridge produces some of Oregon's most elegant wines.",
    heroImageAlt: "Patricia Green Cellars on Ribbon Ridge, modest winery building surrounded by meticulously tended vineyard rows",
  },
  {
    id: "brooks",
    name: "Brooks Winery",
    tagline: "Riesling's Oregon champion",
    ava: "Eola-Amity Hills",
    location: "Amity, Oregon",
    foundedYear: 1998,
    founders: "Jimi Brooks",
    winemaker: "Chris Williams",
    story: `Jimi Brooks was a biodynamic evangelist who believed that Oregon's volcanic Eola-Amity soils could produce Riesling to rival the great German and Alsatian estates. When he died suddenly in 2004 at age 38, the Oregon wine community rallied around his young son Pascal, and a collective of winemakers volunteered their time to keep the winery alive until Pascal could take the helm himself.

That story of community is woven into every bottle Brooks produces. Chris Williams now leads the winemaking with the same biodynamic commitment Jimi championed, and the Riesling program has grown into one of the most diverse and acclaimed in North America. Dry, off-dry, sweet, sparkling -- Brooks makes Riesling in every style, and all of them vibrate with the mineral energy of volcanic soil and the bright acidity that the Van Duzer winds guarantee.

The Pinot Noir deserves attention too. Grown biodynamically on the same volcanic soils, it is bright, energetic, and transparently site-specific. But Riesling remains the soul of Brooks, and if you have never tasted a great Oregon Riesling, this is where to start.`,
    signatureWines: [
      { name: "Ara Riesling", type: "Riesling", description: "Dry and mineral, with lime zest, white peach, and a piercing acidity that lingers. The benchmark Oregon Riesling." },
      { name: "Sweet P Riesling", type: "Riesling", description: "Off-dry, with tropical fruit, jasmine, and honeycomb. The sweetness is perfectly balanced by electric acidity." },
      { name: "Janus Pinot Noir", type: "Pinot Noir", description: "Biodynamic estate Pinot. Bright cherry, cranberry, and earth, with the energetic acidity of the Eola-Amity Hills." },
      { name: "Amycas White Blend", type: "White Blend", description: "A proprietary blend that changes with each vintage. Always aromatic, always interesting." },
    ],
    visitInfo: {
      tastingFee: "$25/person",
      reservations: "Recommended",
      hours: "Daily 11am-5pm",
      address: "21101 SE Cherry Blossom Ln, Amity, OR 97101",
      website: "https://brookswine.com",
      phone: "(503) 435-1278",
    },
    soilTypes: ["Volcanic basalt", "Nekia"],
    farmingPractice: "Biodynamic / Demeter Certified",
    whyVisit: "Discover why Riesling lovers are making pilgrimages to this biodynamic estate in the Eola-Amity Hills.",
    heroImageAlt: "Brooks Winery perched above the Eola-Amity Hills, biodynamic cover crops in full bloom between vine rows",
  },
  {
    id: "soter",
    name: "Soter Vineyards",
    tagline: "Biodynamic bubbles and beyond",
    ava: "Yamhill-Carlton",
    location: "Carlton, Oregon",
    foundedYear: 1997,
    founders: "Tony Soter",
    winemaker: "James Cahill",
    story: `Tony Soter earned his reputation in Napa Valley, where he was one of the most sought-after winemaking consultants of the 1990s. Then he left. He moved to Oregon's Yamhill-Carlton AVA, planted a biodynamic vineyard on ancient marine sedimentary soils, and began making wines that could not be more different from the powerhouse Cabernets that had made his name.

Mineral Hill, the estate vineyard, is farmed biodynamically in every sense -- not as a marketing story but as a deeply held philosophy. The soils are alive with microbial activity, the biodiversity is managed holistically, and the wines reflect the health of the ecosystem. Soter was an early and serious believer in Oregon sparkling wine, and the methode traditionnelle Brut Rose has become one of the most celebrated sparkling wines produced in the state.

The still wines are equally compelling. The Pinot Noir from Mineral Hill is dark-fruited and structured, shaped by the marine sedimentary soils and the protected, low-rainfall microclimate of Yamhill-Carlton. This is a producer who brings Napa-level precision to Oregon's more restrained idiom, and the results are extraordinary.`,
    signatureWines: [
      { name: "Mineral Springs Brut Rose", type: "Sparkling Rose", description: "Methode traditionnelle. Salmon-pink, with wild strawberry, brioche, and citrus. One of Oregon's finest sparkling wines." },
      { name: "Mineral Springs White", type: "Sparkling", description: "Crisp, elegant, with green apple and toasted almond. Extended lees aging adds depth and complexity." },
      { name: "Planet Oregon Pinot Noir", type: "Pinot Noir", description: "The accessible entry. Bright, clean, with red cherry and a smooth, food-friendly finish." },
      { name: "Mineral Springs Ranch Pinot Noir", type: "Pinot Noir", description: "Estate single-vineyard. Dark fruit, earthy minerality, and firm structure from marine sedimentary soils." },
    ],
    visitInfo: {
      tastingFee: "$40/person",
      reservations: "Required",
      hours: "Thu-Mon 11am-4pm",
      address: "10880 NE Mineral Springs Rd, Carlton, OR 97111",
      website: "https://sotervineyards.com",
      phone: "(503) 662-5600",
    },
    soilTypes: ["Willakenzie (marine sedimentary)"],
    farmingPractice: "Biodynamic / Demeter Certified",
    whyVisit: "Taste biodynamic sparkling wine and estate Pinot Noir from a former Napa legend who chose Oregon.",
    heroImageAlt: "Soter Vineyards Mineral Hill estate with biodynamic cover crops and wildflowers, Coast Range in the background",
  },
  {
    id: "brick-house",
    name: "Brick House Vineyards",
    tagline: "Organic pioneer on Ribbon Ridge",
    ava: "Ribbon Ridge",
    location: "Newberg, Oregon",
    foundedYear: 1990,
    founders: "Doug Tunnell",
    winemaker: "Doug Tunnell",
    story: `Doug Tunnell was a CBS News foreign correspondent before he traded the newsroom for a vineyard on Ribbon Ridge. It was not a midlife crisis; it was a conviction. He believed that the sedimentary soils on this small ridge could produce wines of genuine distinction, and that farming them organically was not optional -- it was essential to letting the site express itself.

Brick House was one of the first certified organic vineyards in Oregon, and Tunnell's commitment has only deepened over three decades. The estate is also certified biodynamic, and the farming is rigorous and hands-on. Cover crops, composting, herbal preparations, and a holistic view of the farm as a self-sustaining organism define the approach. The wines taste like the result of that care: alive, textured, and deeply connected to their site.

The Pinot Noirs are classic Ribbon Ridge -- elegant, perfumed, with silky tannins and red fruit of uncommon clarity. The Chardonnay and Gamay Noir round out a focused portfolio that never chases trends. Brick House is a quiet winery that lets the farming and the terroir do the talking, and if you are drawn to wines of integrity and transparency, these belong on your list.`,
    signatureWines: [
      { name: "Les Dijonnais Pinot Noir", type: "Pinot Noir", description: "From Dijon clones. Bright red cherry, violets, and fine-grained tannins. Elegant and pure, the essence of Ribbon Ridge." },
      { name: "Evelyn's Pinot Noir", type: "Pinot Noir", description: "From heritage Pommard clone. Darker, earthier, more structured. A wine that rewards cellaring." },
      { name: "Chardonnay", type: "Chardonnay", description: "Lean and mineral, with green apple, citrus, and a flinty edge. No malolactic, no butter -- just pure site expression." },
      { name: "Gamay Noir", type: "Gamay Noir", description: "Light, juicy, and vibrant. Raspberry, wild cherry, and a peppery lift. One of Oregon's best Gamays." },
    ],
    visitInfo: {
      tastingFee: "$25/person",
      reservations: "Required",
      hours: "By appointment",
      address: "18200 Lewis Rogers Ln, Newberg, OR 97132",
      website: "https://brickhousevineyards.com",
      phone: "(503) 538-5136",
    },
    soilTypes: ["Willakenzie (marine sedimentary)"],
    farmingPractice: "Certified Organic / Biodynamic",
    whyVisit: "Visit one of Oregon's first organic vineyards and taste Pinot Noir, Chardonnay, and Gamay from a journalist-turned-farmer who does everything by hand.",
    heroImageAlt: "Brick House Vineyards on Ribbon Ridge, the historic brick farmhouse visible among organic vine rows and cover crops",
  },
  {
    id: "domaine-serene",
    name: "Domaine Serene",
    tagline: "Uncompromising luxury in the Dundee Hills",
    ava: "Dundee Hills",
    location: "Dayton, Oregon",
    foundedYear: 1989,
    founders: "Ken and Grace Evenstad",
    winemaker: "Erik Kramer",
    story: `Ken and Grace Evenstad brought a perfectionist's eye and an investor's ambition to the Dundee Hills in 1989, and the result is one of Oregon's most prestigious -- and most polarizing -- estates. Where many Oregon producers emphasize restraint and transparency, Domaine Serene reaches for concentration, richness, and cellar-worthiness. Their top wines are unabashedly big and built to last.

The estate vineyards span over 900 planted acres across multiple sites in the Dundee Hills, making Domaine Serene one of the largest estate operations in the valley. The farming and winemaking are precision-driven, with sorting, small-lot fermentation, and extensive French oak aging. The Evenstad Reserve Pinot Noir, their flagship, has earned scores that place it alongside the finest wines in the New World.

Whether Domaine Serene's bold style is your preference or not, the quality of execution is beyond dispute. The tasting experience matches the ambition of the wines -- a luxury estate with immaculate grounds and a hospitality program that leaves no detail unattended. If you appreciate power and polish in your Pinot Noir, Domaine Serene delivers at the highest level.`,
    signatureWines: [
      { name: "Evenstad Reserve Pinot Noir", type: "Pinot Noir", description: "The flagship. Concentrated black cherry, dark plum, baking spice, and a lush, velvety texture with new French oak integration." },
      { name: "Grace Vineyard Pinot Noir", type: "Pinot Noir", description: "Named for co-founder Grace Evenstad. More structured and age-worthy, with dark fruit and firm tannins." },
      { name: "Evenstad Reserve Chardonnay", type: "Chardonnay", description: "Rich and golden, with ripe pear, toast, and butterscotch. A New World Chardonnay of rare concentration." },
      { name: "Coeur Blanc", type: "White Blend", description: "A proprietary white blend that showcases the estate's range beyond Pinot Noir and Chardonnay." },
    ],
    visitInfo: {
      tastingFee: "$45/person",
      reservations: "Required",
      hours: "Daily 11am-4pm",
      address: "6555 NE Hilltop Ln, Dayton, OR 97114",
      website: "https://domaineserene.com",
      phone: "(503) 864-4600",
    },
    soilTypes: ["Jory (volcanic basalt)"],
    farmingPractice: "Sustainable / LIVE Certified",
    whyVisit: "Experience Oregon Pinot Noir at its most concentrated and luxurious on a stunning Dundee Hills estate.",
    heroImageAlt: "Domaine Serene's grand estate and tasting room in the Dundee Hills, manicured grounds with vineyard views stretching to the horizon",
  },
  {
    id: "stoller",
    name: "Stoller Family Estate",
    tagline: "Sustainable ambition on a grand scale",
    ava: "Dundee Hills",
    location: "Dayton, Oregon",
    foundedYear: 2001,
    founders: "Bill Stoller",
    winemaker: "Melissa Burr",
    story: `Stoller Family Estate sits on 230 contiguous acres in the Dundee Hills -- the largest contiguous vineyard in the AVA -- and manages to be both grand in scale and meticulous in execution. Bill Stoller grew up on this land, which was a turkey farm before it was a vineyard, and his investment in both the estate and its environmental footprint has been enormous.

The winery is LEED Gold certified, powered by solar energy, and operates with a sustainability commitment that extends from the vineyard floor to the roof. Winemaker Melissa Burr works with a remarkable palette: 230 acres of Jory volcanic soil divided into dozens of distinct blocks, each with its own elevation, aspect, and clonal mix. The range she draws from allows for both accessible everyday wines and concentrated, site-specific reserve bottlings.

Stoller is the kind of winery that converts skeptics. If you arrive expecting a large operation to produce generic wine, the single-block bottlings will change your mind. If you think sustainability certifications are greenwashing, the solar-powered LEED Gold facility will set you straight. This is modern winemaking at its most polished and principled.`,
    signatureWines: [
      { name: "Dundee Hills Pinot Noir", type: "Pinot Noir", description: "Ripe cherry, baking spice, vanilla, and round tannins. Polished, approachable, and consistently excellent." },
      { name: "Reserve Pinot Noir", type: "Pinot Noir", description: "Barrel selection from the finest estate blocks. More concentrated and structured, with dark fruit and a longer finish." },
      { name: "Chardonnay", type: "Chardonnay", description: "Bright citrus, pear, and subtle oak. Clean and balanced with a food-friendly profile." },
      { name: "Pinot Noir Rose", type: "Rose", description: "Pale copper, with watermelon and citrus. Dry, crisp, and made for the tasting room terrace." },
    ],
    visitInfo: {
      tastingFee: "$40/person",
      reservations: "Recommended",
      hours: "Daily 10am-5pm",
      address: "16161 NE McDougall Rd, Dayton, OR 97114",
      website: "https://stollerfamilyestate.com",
      phone: "(503) 864-3404",
    },
    soilTypes: ["Jory (volcanic basalt)"],
    farmingPractice: "Sustainable / LEED Gold / Solar-Powered",
    whyVisit: "Walk the largest contiguous vineyard in the Dundee Hills and taste wines from a LEED Gold, solar-powered winery.",
    heroImageAlt: "Stoller Family Estate's modern LEED Gold winery overlooking 230 acres of Dundee Hills vineyards, solar panels visible on the roof",
  },
];
