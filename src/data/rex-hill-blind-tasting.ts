/**
 * Rex Hill Blind Tasting wine pool.
 * 16 Rex Hill wines with 5 progressive clue layers each.
 *
 * Clue layers:
 *   1. Sensory Snapshot  - color, aromas, first impression
 *   2. Structure          - body, acidity, tannin, texture
 *   3. Terroir            - soil, elevation, climate cues
 *   4. Vineyard Hint      - clue about which vineyard
 *   5. Final Tell         - the giveaway detail
 */

export type RHGrape = "Pinot Noir" | "Chardonnay" | "Ros\u00e9" | "Muscat";

export type RHVineyard =
  | "Jacob-Hart Estate"
  | "REX HILL Estate"
  | "Seven Soils"
  | "La Colina"
  | "Sims"
  | "Hyland"
  | "Marsh"
  | "Willamette Valley";

export type RHVintage =
  | "2018"
  | "2019"
  | "2020"
  | "2021"
  | "2022"
  | "2023";

export interface RHBlindTastingWine {
  id: string;
  name: string;
  grape: RHGrape;
  vineyard: RHVineyard;
  vintage: RHVintage;
  difficulty: 1 | 2 | 3 | 4;
  clues: [string, string, string, string, string];
  explanation: string;
}

export const RH_GRAPE_OPTIONS: RHGrape[] = [
  "Pinot Noir",
  "Chardonnay",
  "Ros\u00e9",
  "Muscat",
];

export const RH_VINEYARD_OPTIONS: RHVineyard[] = [
  "Jacob-Hart Estate",
  "REX HILL Estate",
  "Seven Soils",
  "La Colina",
  "Sims",
  "Hyland",
  "Marsh",
  "Willamette Valley",
];

export const RH_VINTAGE_OPTIONS: RHVintage[] = [
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
];

export const RH_WINES: RHBlindTastingWine[] = [
  /* ── Pinot Noir ───────────────────────────────────── */
  {
    id: "rh-wv-pn-2021",
    name: "Rex Hill Willamette Valley Pinot Noir 2021",
    grape: "Pinot Noir",
    vineyard: "Willamette Valley",
    vintage: "2021",
    difficulty: 1,
    clues: [
      "Translucent ruby with a violet rim. Fresh red cherry and crushed raspberry fill the glass, backed by a whisper of dried rose petal.",
      "Medium-bodied with bright acidity and silky, fine-grained tannins. A gentle spice note lingers on the finish.",
      "A blend of fruit from across the valley's diverse AVAs, bringing together volcanic, sedimentary, and marine soils into one harmonious whole.",
      "This wine is designed to be the entry point to the Rex Hill portfolio \u2014 a multi-vineyard blend from across the broader appellation.",
      "The label reads simply 'Willamette Valley' with no single-vineyard designation. It's the winery's flagship red."
    ],
    explanation: "The Willamette Valley Pinot Noir is Rex Hill's gateway bottling, blending fruit from multiple vineyards to express the breadth of the region. It's approachable, food-friendly, and a perennial favorite."
  },
  {
    id: "rh-jh-pn-2021",
    name: "Rex Hill Jacob-Hart Estate Pinot Noir 2021",
    grape: "Pinot Noir",
    vineyard: "Jacob-Hart Estate",
    vintage: "2021",
    difficulty: 2,
    clues: [
      "Deep garnet center fading to ruby. Dark cherry, blackberry compote, and hints of iron and wet stone on the nose.",
      "Full-bodied for Pinot Noir with structured, grippy tannins and vibrant acidity. Layers of baking spice and dark chocolate unfold on the mid-palate.",
      "Thirteen distinct soil types in a single vineyard \u2014 volcanic basalt layered with ancient marine sediment. Southeast-facing slopes on the Chehalem Ridge above 500 feet elevation.",
      "Acquired in 1987, this estate vineyard sits on a ridge with some of the most geologically complex terrain in the valley.",
      "Named after the winery's co-founders \u2014 Jan Jacobsen and Paul Hart \u2014 this vineyard is a mosaic of soil diversity."
    ],
    explanation: "The Jacob-Hart Estate Pinot Noir showcases one of Oregon's most geologically diverse vineyards. With 13+ soil types on southeast-facing slopes of the Chehalem Ridge, it produces wines of uncommon depth and mineral complexity."
  },
  {
    id: "rh-estate-pn-2021",
    name: "Rex Hill Estate Pinot Noir 2021",
    grape: "Pinot Noir",
    vineyard: "REX HILL Estate",
    vintage: "2021",
    difficulty: 2,
    clues: [
      "Medium ruby with garnet highlights. Lifted aromas of Bing cherry, pomegranate, and a distinctive floral perfume \u2014 violets and lavender.",
      "Medium-to-full body with polished tannins and a long, mineral-driven finish. Acidity is bright and juicy, carrying the fruit beautifully.",
      "Planted in 1982 on Laurelwood loess over basalt, at the base of the Chehalem Mountains. Certified organic and biodynamic farming.",
      "This 38-acre vineyard was the winery's first planting, home to both Pinot Noir and a small block of Muscat.",
      "The original vineyard \u2014 planted the year the winery was founded. Its name matches the winery itself."
    ],
    explanation: "The REX HILL Estate vineyard was planted in 1982, the year the winery was founded. Its 38 acres of organic/biodynamic vines on Laurelwood loess produce Pinot Noir of elegance and site-specific character."
  },
  {
    id: "rh-seven-soils-pn-2020",
    name: "Rex Hill Seven Soils Pinot Noir 2020",
    grape: "Pinot Noir",
    vineyard: "Seven Soils",
    vintage: "2020",
    difficulty: 3,
    clues: [
      "Deep, saturated ruby-purple. Exotic spice, black plum, dried herbs, and a savory earthiness swirl in the glass.",
      "Full-bodied and layered with firm but integrated tannins. The wine shows remarkable complexity, shifting from dark fruit to mineral to spice across the palate.",
      "A blend sourced to represent seven distinct soil types from across the Chehalem Mountains and surrounding areas, each contributing a different dimension.",
      "The name itself is the clue \u2014 this wine is a concept bottling that celebrates geological diversity rather than a single site.",
      "A premium multi-soil cuvee \u2014 count the soil types in the name and you have your answer."
    ],
    explanation: "Seven Soils is Rex Hill's flagship concept wine, blending fruit from parcels representing seven distinct soil types. It embodies the winery's philosophy that soil diversity creates complexity in the glass."
  },
  {
    id: "rh-la-colina-pn-2019",
    name: "Rex Hill La Colina Vineyard Pinot Noir 2019",
    grape: "Pinot Noir",
    vineyard: "La Colina",
    vintage: "2019",
    difficulty: 3,
    clues: [
      "Medium ruby with a brick-tinged rim from bottle age. Red currant, dried cranberry, and a distinctive savory note of forest floor and dried mushroom.",
      "Medium-bodied with silky tannins and racy acidity. Elegant and translucent in style, with a long, perfumed finish.",
      "Volcanic soils at moderate elevation in the Chehalem Mountains. The site's cooler microclimate preserves acidity and produces wines of finesse rather than power.",
      "The vineyard name translates from Spanish, hinting at the hillside terrain where these vines grow.",
      "'La Colina' means 'The Hill' in Spanish. This single-vineyard Pinot Noir is pure Chehalem Mountains elegance."
    ],
    explanation: "La Colina Vineyard produces some of Rex Hill's most elegant, terroir-transparent Pinot Noir. The Chehalem Mountains site and volcanic soils yield a wine of finesse, perfume, and age-worthy structure."
  },
  {
    id: "rh-sims-pn-2020",
    name: "Rex Hill Sims Vineyard Pinot Noir 2020",
    grape: "Pinot Noir",
    vineyard: "Sims",
    vintage: "2020",
    difficulty: 3,
    clues: [
      "Bright, medium ruby. Intense red fruit \u2014 fresh strawberry, ripe raspberry \u2014 with notes of cardamom and white pepper.",
      "Medium-bodied with fine, chalky tannins and electric acidity. The palate is linear and focused, with a saline mineral finish.",
      "Marine sedimentary soils on a sloping site. The ancient ocean-floor geology imparts a distinctive salinity and tension.",
      "This vineyard sits in the western part of the valley where old marine sediments dominate. The fruit has a bright, high-toned character.",
      "Named after the family who farms it, this vineyard is a Rex Hill favorite for its pure, red-fruited expression of sedimentary terroir."
    ],
    explanation: "Sims Vineyard delivers a benchmark expression of marine sedimentary terroir. Its old ocean-floor soils produce Pinot Noir with bright red fruit, chalky tannins, and a distinctive saline minerality."
  },
  {
    id: "rh-hyland-pn-2019",
    name: "Rex Hill Hyland Vineyard Pinot Noir 2019",
    grape: "Pinot Noir",
    vineyard: "Hyland",
    vintage: "2019",
    difficulty: 3,
    clues: [
      "Medium-deep garnet. Brooding dark fruit \u2014 black cherry, boysenberry \u2014 with earthy undertones of turned soil and dried sage.",
      "Full-bodied with robust, chewy tannins and a long, savory finish. The wine has real power and density, but stays balanced.",
      "Ancient volcanic Jory soils at high elevation in the McMinnville AVA. Some of the oldest own-rooted vines in Oregon, planted in the 1970s.",
      "This storied vineyard in the Coast Range foothills is one of Oregon's most historic sites, shared among several top producers.",
      "One of the oldest vineyards in Oregon, planted in the McMinnville AVA in the early 1970s. The name evokes a highland meadow."
    ],
    explanation: "Hyland Vineyard is one of Oregon's legendary sites, with own-rooted vines planted in the early 1970s on volcanic Jory soils. Rex Hill's bottling captures the vineyard's trademark power, density, and old-vine complexity."
  },
  {
    id: "rh-marsh-pn-2020",
    name: "Rex Hill Marsh Vineyard Pinot Noir 2020",
    grape: "Pinot Noir",
    vineyard: "Marsh",
    vintage: "2020",
    difficulty: 4,
    clues: [
      "Pale to medium ruby with unusual transparency. Wild strawberry, pink peppercorn, and a haunting floral lift of dried rose and chamomile.",
      "Light-to-medium body with ethereal tannins and piercing acidity. The wine is delicate but persistent, with a finish that goes on and on.",
      "Shallow, well-drained soils in a cool, exposed site. The vines struggle, producing tiny berries of extraordinary concentration despite the wine's pale color.",
      "This vineyard's name suggests a wetland, though the site itself is anything but \u2014 the thin soils keep yields naturally low.",
      "Don't let the name fool you \u2014 this is one of Rex Hill's most esoteric single-vineyard bottlings, named for the family who owns the land."
    ],
    explanation: "Marsh Vineyard is one of Rex Hill's more limited and esoteric offerings. The site's challenging conditions produce tiny yields of ethereal, hauntingly perfumed Pinot Noir unlike anything else in the portfolio."
  },
  {
    id: "rh-jh-pn-2019",
    name: "Rex Hill Jacob-Hart Estate Pinot Noir 2019",
    grape: "Pinot Noir",
    vineyard: "Jacob-Hart Estate",
    vintage: "2019",
    difficulty: 2,
    clues: [
      "Medium-deep garnet with ruby at the rim. Ripe black plum, dried fig, and a thread of cocoa and toasted oak on the nose.",
      "Full-bodied and generous with velvety tannins. The warm vintage shows in the wine's richness, while the site's natural acidity provides lift.",
      "The 2019 growing season was warm and generous across Oregon, and this site's southeast-facing slopes soaked up the sunshine on the Chehalem Ridge.",
      "This estate vineyard is named for two people \u2014 the pair who founded Rex Hill back in 1982.",
      "The warm 2019 vintage gave this wine extra ripeness. The vineyard name is a portmanteau of the founders' surnames."
    ],
    explanation: "The 2019 vintage of Jacob-Hart Estate Pinot Noir shows the warmer side of this complex vineyard. The generous fruit and supple tannins reflect the year's warmth while the 13+ soil types maintain depth and intrigue."
  },
  {
    id: "rh-estate-pn-2020",
    name: "Rex Hill Estate Pinot Noir 2020",
    grape: "Pinot Noir",
    vineyard: "REX HILL Estate",
    vintage: "2020",
    difficulty: 2,
    clues: [
      "Bright ruby-crimson with violet flashes. Red cherry, fresh plum, and an enticing note of wild herbs and crushed stone.",
      "Medium body with supple tannins and vibrant acidity. A core of mineral intensity runs through the palate like a seam of rock.",
      "Laurelwood loess \u2014 windblown silt over ancient basalt \u2014 on gentle slopes at the base of the Chehalem Mountains. Farmed biodynamically.",
      "This vineyard shares its name with the winery and was planted in 1982, the year everything started.",
      "The 2020 vintage of the winery's namesake vineyard. If you know the winery's name, you know the vineyard."
    ],
    explanation: "The 2020 Estate Pinot Noir expresses the purity of Laurelwood loess soils on the original 38-acre planting. Biodynamic farming and old vines contribute depth, while the cool 2020 vintage preserved freshness and floral lift."
  },

  /* ── Chardonnay ───────────────────────────────────── */
  {
    id: "rh-wv-chard-2022",
    name: "Rex Hill Willamette Valley Chardonnay 2022",
    grape: "Chardonnay",
    vineyard: "Willamette Valley",
    vintage: "2022",
    difficulty: 1,
    clues: [
      "Pale straw-gold with green glints. Bright aromas of green apple, lemon zest, and a hint of wet chalk.",
      "Medium-bodied with crisp, mouthwatering acidity and minimal oak influence. Clean and linear, with a flinty mineral finish.",
      "A valley-wide blend sourcing fruit from cooler sites to preserve the variety's natural brightness in Oregon's climate.",
      "This is the winery's entry-level white \u2014 a broad appellation blend without a specific vineyard designation.",
      "The most accessible white wine in the Rex Hill lineup, simply labeled 'Willamette Valley.'"
    ],
    explanation: "The Willamette Valley Chardonnay is Rex Hill's gateway white wine. Sourced from across the valley and vinified with restraint, it showcases Oregon Chardonnay's hallmark freshness and mineral purity."
  },
  {
    id: "rh-seven-soils-chard-2021",
    name: "Rex Hill Seven Soils Chardonnay 2021",
    grape: "Chardonnay",
    vineyard: "Seven Soils",
    vintage: "2021",
    difficulty: 3,
    clues: [
      "Medium gold with a luminous sheen. Rich aromas of ripe pear, baked apple, toasted hazelnut, and a thread of vanilla.",
      "Full-bodied and textured with creamy lees character and well-integrated oak. The acidity is bright enough to keep the richness in check.",
      "Like its red counterpart, this wine draws from parcels representing seven distinct geological profiles, adding layers of complexity.",
      "This is Rex Hill's premium Chardonnay concept wine, built around the same geological philosophy as the red version.",
      "A multi-soil Chardonnay cuvee whose name tells you exactly how many soil types it celebrates."
    ],
    explanation: "The Seven Soils Chardonnay mirrors the concept of its Pinot Noir sibling, blending fruit from seven distinct soil types. The result is a richly textured, complex white with layers that unfold across the palate."
  },
  {
    id: "rh-jh-chard-2022",
    name: "Rex Hill Jacob-Hart Estate Chardonnay 2022",
    grape: "Chardonnay",
    vineyard: "Jacob-Hart Estate",
    vintage: "2022",
    difficulty: 4,
    clues: [
      "Pale gold with a silvery rim. Citrus blossom, white peach, and a striking mineral aroma \u2014 almost like struck flint.",
      "Medium-bodied with razor-sharp acidity and subtle oak framing. The texture is taut and precise, with a long, stony finish.",
      "The same 13 soil types that make this vineyard famous for Pinot Noir also produce an extraordinary, terroir-driven Chardonnay.",
      "This estate site on the Chehalem Ridge is better known for its red wine, but its white bottling is equally compelling.",
      "Estate Chardonnay from the vineyard named after Rex Hill's two founders. A rare white from a predominantly red wine site."
    ],
    explanation: "The Jacob-Hart Estate Chardonnay is one of Rex Hill's most limited bottlings. The vineyard's extraordinary soil complexity \u2014 13+ types on the Chehalem Ridge \u2014 produces a Chardonnay of minerality, precision, and depth."
  },

  /* ── Ros\u00e9 ─────────────────────────────────────────── */
  {
    id: "rh-rose-2023",
    name: "Rex Hill Estate Ros\u00e9 of Pinot Noir 2023",
    grape: "Ros\u00e9",
    vineyard: "REX HILL Estate",
    vintage: "2023",
    difficulty: 1,
    clues: [
      "Delicate salmon-pink with copper highlights. Fresh watermelon, white peach, and a burst of citrus zest on the nose.",
      "Light-bodied and bone-dry with snappy acidity. Clean and refreshing, with a hint of saline minerality on the finish.",
      "Made from estate-grown Pinot Noir on Laurelwood loess, picked early in the morning to preserve freshness and delicacy.",
      "This ros\u00e9 is sourced from the winery's original 38-acre planting at the base of the Chehalem Mountains.",
      "Rex Hill's only ros\u00e9 \u2014 an estate bottling from the vineyard planted in 1982. It's Pinot Noir in a pink glass."
    ],
    explanation: "The Estate Ros\u00e9 of Pinot Noir is Rex Hill's warm-weather essential. Made from estate fruit on Laurelwood loess, it delivers the freshness and minerality of the site in a light, dry, refreshing style."
  },

  /* ── Muscat ───────────────────────────────────────── */
  {
    id: "rh-muscat-2022",
    name: "Rex Hill Estate Muscat 2022",
    grape: "Muscat",
    vineyard: "REX HILL Estate",
    vintage: "2022",
    difficulty: 4,
    clues: [
      "Pale straw with golden glimmers. An explosive bouquet of orange blossom, honeysuckle, lychee, and candied ginger.",
      "Off-dry with low-to-moderate acidity and a silky, almost oily texture. Exotic tropical fruit and floral notes persist through a perfumed finish.",
      "A small block of this aromatic variety was planted alongside Pinot Noir on the estate vineyard back in 1982.",
      "This is the only wine in the Rex Hill portfolio that isn't Pinot Noir, Chardonnay, or Ros\u00e9. A true rarity.",
      "An aromatic white grape better known in Alsace and Italy, this tiny-production wine comes from the original 38-acre estate planting."
    ],
    explanation: "Rex Hill's Estate Muscat is a rare gem. A small block planted in 1982 alongside the original Pinot Noir vines produces this exotic, aromatic wine \u2014 one of the most unusual bottlings in the Chehalem Mountains."
  },
  {
    id: "rh-wv-pn-2022",
    name: "Rex Hill Willamette Valley Pinot Noir 2022",
    grape: "Pinot Noir",
    vineyard: "Willamette Valley",
    vintage: "2022",
    difficulty: 1,
    clues: [
      "Bright ruby with a magenta edge. Fresh raspberry, tart cherry, and a touch of cinnamon bark on the nose.",
      "Medium-bodied with juicy acidity and soft, approachable tannins. A crowd-pleaser built for immediate enjoyment.",
      "Multi-vineyard blend across the valley. The warm 2022 vintage brought generous fruit and early-drinking accessibility.",
      "No single vineyard, no single AVA \u2014 this is the broadest, most approachable bottling in Rex Hill's red lineup.",
      "The 2022 edition of Rex Hill's valley-wide Pinot Noir blend. The winery's most widely available red."
    ],
    explanation: "The 2022 Willamette Valley Pinot Noir captures the warmth and generosity of the vintage. As Rex Hill's most accessible bottling, it brings together fruit from across the valley into a bright, welcoming glass."
  },
];
