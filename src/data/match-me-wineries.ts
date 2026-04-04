/**
 * Match Me quiz data — winery archetypes and questions.
 *
 * 18 winery archetypes, 8 questions (quiz randomly picks 4).
 */

export interface WineryMatch {
  id: string;
  name: string;
  tagline: string;
  ava: string;
  personality: string;
  description: string;
  wineRec: string;
  wineStyle: string;
  traits: string[];
  url?: string;
}

export const WINERIES: WineryMatch[] = [
  // ── Original 6 ────────────────────────────────────────────────────────
  {
    id: "cristom",
    name: "Cristom Vineyards",
    tagline: "Where volcanic soil meets Van Duzer wind",
    ava: "Eola-Amity Hills",
    personality: "The Romantic Purist",
    description:
      "You're drawn to depth over flash. You'd rather have one extraordinary glass than three good ones. You notice details others miss — the way light hits a hillside, the smell of rain on warm soil. Cristom's biodynamic, whole-cluster, native-yeast approach is winemaking for people who believe the best things can't be rushed.",
    wineRec: "Cristom Jessie Vineyard Pinot Noir",
    wineStyle: "Structured, spicy, volcanic — red fruit with whole-cluster lift and electric acidity",
    traits: ["thoughtful", "detail-oriented", "romantic but grounded", "classic with a twist", "depth over flash"],
  },
  {
    id: "elk-cove",
    name: "Elk Cove Vineyards",
    tagline: "Five decades of cool-climate craft",
    ava: "Yamhill-Carlton",
    personality: "The Generous Explorer",
    description:
      "You're the one who finds the hidden trail, the off-menu dish, the song nobody else knows yet — and then you share it with everyone. Elk Cove's five decades of estate-grown, approachable-but-serious winemaking matches your energy: adventurous, warm, and effortlessly good.",
    wineRec: "Elk Cove Pinot Noir, Willamette Valley",
    wineStyle: "Fresh, bright, vibrant — clean fruit with lifted acidity and food-friendly balance",
    traits: ["social but not loud", "adventurous", "outdoorsy", "warm and generous", "easy to like"],
  },
  {
    id: "stoller",
    name: "Stoller Family Estate",
    tagline: "Modern craft in the Dundee Hills",
    ava: "Dundee Hills",
    personality: "The Polished Host",
    description:
      "You're the one who plans the dinner, picks the playlist, and somehow makes it all look effortless. Style matters to you — not in a showy way, but in a 'life is better when things are done well' way. Stoller's sustainable, design-forward, crowd-pleasing estate is your spiritual home.",
    wineRec: "Stoller Family Estate Reserve Pinot Noir",
    wineStyle: "Balanced, polished, modern — Dundee Hills fruit with finesse and broad appeal",
    traits: ["trend-aware", "design-conscious", "polished", "reliable in groups", "the planner"],
  },
  {
    id: "eyrie",
    name: "The Eyrie Vineyards",
    tagline: "Where Oregon Pinot Noir began",
    ava: "Dundee Hills",
    personality: "The Original",
    description:
      "You don't follow trends — you started them three years ago and moved on. You care about provenance, authenticity, and doing things your own way. The Eyrie Vineyards is where David Lett proved the world wrong by planting Pinot Noir in Oregon in 1965. Pioneer recognizes pioneer.",
    wineRec: "The Eyrie Vineyards Original Vines Pinot Noir",
    wineStyle: "Ethereal, delicate, old-vine — translucent fruit with haunting complexity",
    traits: ["independent", "authentic", "intellectual", "ahead of the curve", "values provenance"],
  },
  {
    id: "domaine-drouhin",
    name: "Domaine Drouhin Oregon",
    tagline: "French soul, Oregon soil",
    ava: "Dundee Hills",
    personality: "The Connoisseur",
    description:
      "You appreciate craftsmanship that spans generations. You've been to the places, read the books, and tasted the wines — and you know that the best things in life come from the intersection of tradition and terroir. Domaine Drouhin brought Burgundy's soul to Oregon's volcanic hills, and the result is a wine that speaks both languages.",
    wineRec: "Domaine Drouhin Oregon Pinot Noir, Dundee Hills",
    wineStyle: "Polished, structured, Burgundian — dark cherry, silky tannins, mineral finish",
    traits: ["cultured", "worldly", "appreciates tradition", "quality-driven", "elegant taste"],
  },
  {
    id: "brooks",
    name: "Brooks Wine",
    tagline: "Joyful wines, serious purpose",
    ava: "Eola-Amity Hills",
    personality: "The Joyful Rebel",
    description:
      "You believe great things should be accessible, not exclusive. You care about community, sustainability, and making the world a little better — but you also know how to throw a party. Brooks was founded on joy and carried forward by a community. Their biodynamic, inclusive approach to winemaking is wine for people who care.",
    wineRec: "Brooks Janus Pinot Noir",
    wineStyle: "Bright, aromatic, biodynamic — lifted fruit with energy and soul",
    traits: ["community-minded", "joyful", "inclusive", "sustainable values", "the connector"],
  },

  // ── New 12 ────────────────────────────────────────────────────────────
  {
    id: "sokol-blosser",
    name: "Sokol Blosser Winery",
    tagline: "Sustainability before it was a buzzword",
    ava: "Dundee Hills",
    personality: "The Sustainable Pioneer",
    description:
      "You were composting before it was cool and bringing your own bags before anyone asked. For you, doing the right thing isn't a sacrifice — it's just how you live. Sokol Blosser built the first LEED-certified winery in the country, proving that eco-consciousness and world-class wine aren't a tradeoff. They're the same thing.",
    wineRec: "Sokol Blosser Estate Pinot Noir",
    wineStyle: "Earthy, layered, organic — red and dark fruit with savory herbs and fine-grained tannins",
    traits: ["eco-conscious", "progressive", "community-driven", "walks the talk", "forward-thinking"],
  },
  {
    id: "adelsheim",
    name: "Adelsheim Vineyard",
    tagline: "Quiet excellence, decades deep",
    ava: "Chehalem Mountains",
    personality: "The Quiet Authority",
    description:
      "You don't need to be the loudest voice in the room — people listen when you speak because you've earned it. David Adelsheim helped define Oregon wine through four decades of patient, meticulous work. His vineyard is for people who value substance over spectacle, knowledge over opinion, and doing things right over doing them fast.",
    wineRec: "Adelsheim Breaking Ground Pinot Noir",
    wineStyle: "Precise, mineral-driven, poised — dark fruit with stony complexity and seamless structure",
    traits: ["understated", "intellectual", "patient", "earned respect", "substance over spectacle"],
  },
  {
    id: "ponzi",
    name: "Ponzi Vineyards",
    tagline: "Three generations, one vision",
    ava: "Chehalem Mountains",
    personality: "The Family Legacy",
    description:
      "You believe in showing up — for Sunday dinner, for the long haul, for the people who matter. You know that the best things in life are built across generations, not overnight. Ponzi Vineyards has been a family affair since 1970, with Italian heritage woven into Oregon terroir. Three generations of craft, and every bottle tells the whole story.",
    wineRec: "Ponzi Tavola Pinot Noir",
    wineStyle: "Generous, warm, layered — ripe cherry and spice with Italian soul and Oregon freshness",
    traits: ["loyal", "family-first", "tradition-keeper", "generous spirit", "long-game thinker"],
  },
  {
    id: "beaux-freres",
    name: "Beaux Freres",
    tagline: "Power meets pedigree",
    ava: "Ribbon Ridge",
    personality: "The Collector's Dream",
    description:
      "You don't settle. Whether it's the watch, the first edition, or the corner table, you know what the best looks like and you go after it. Beaux Freres was founded by Robert Parker's brother-in-law on a former pig farm in Ribbon Ridge, and it became one of Oregon's most sought-after labels. Concentrated, powerful, and unapologetically ambitious.",
    wineRec: "Beaux Freres The Beaux Freres Vineyard Pinot Noir",
    wineStyle: "Concentrated, powerful, prestigious — dark fruit, spice, and velvety depth with Ribbon Ridge minerality",
    traits: ["ambitious", "discerning", "confident", "collector mentality", "appreciates the rare"],
  },
  {
    id: "ken-wright",
    name: "Ken Wright Cellars",
    tagline: "Every vineyard has a voice",
    ava: "Yamhill-Carlton",
    personality: "The Single-Vineyard Evangelist",
    description:
      "You believe context is everything — where something comes from matters as much as what it is. You can taste the difference between neighborhoods, and you want to. Ken Wright bottles each vineyard separately because he believes the land has something to say. Every vintage, a dozen different voices from a dozen different hillsides.",
    wineRec: "Ken Wright Savoya Vineyard Pinot Noir",
    wineStyle: "Site-specific, transparent, terroir-driven — each vineyard distinct, all unmistakably Willamette",
    traits: ["terroir-obsessed", "curious", "detail-oriented", "place matters", "the purist"],
  },
  {
    id: "lingua-franca",
    name: "Lingua Franca",
    tagline: "Where Burgundy logic meets Oregon fruit",
    ava: "Eola-Amity Hills",
    personality: "The Wine World Insider",
    description:
      "You speak more than one language — literally or figuratively. You move between worlds, picking up the best from each. Lingua Franca was founded by Master Sommelier Larry Stone with legendary Burgundy consultant Dominique Lafon. The result is wine with intellectual tension, precision, and the kind of layered complexity that rewards attention.",
    wineRec: "Lingua Franca AVNI Pinot Noir",
    wineStyle: "Taut, precise, intellectual — bright acidity, fine tannins, and a long mineral finish",
    traits: ["cosmopolitan", "multilingual mind", "precision-loving", "insider knowledge", "tension and balance"],
  },
  {
    id: "bethel-heights",
    name: "Bethel Heights Vineyard",
    tagline: "Honest wine from an honest place",
    ava: "Eola-Amity Hills",
    personality: "The Eola-Amity Stalwart",
    description:
      "You're not trying to impress anyone. You show up, do the work, and let the results speak. No marketing spin, no tasting room theatrics — just honest wine from people who've been farming the same hillside since 1977. Bethel Heights is the kind of winery you discover through a friend who really knows wine, and then you never stop going back.",
    wineRec: "Bethel Heights Estate Pinot Noir",
    wineStyle: "Earthy, honest, structured — red fruit with savory depth and Eola-Amity wind-driven acidity",
    traits: ["no-nonsense", "reliable", "earthy", "word-of-mouth discovery", "the real deal"],
  },
  {
    id: "argyle",
    name: "Argyle Winery",
    tagline: "Oregon's sparkling revelation",
    ava: "Dundee Hills",
    personality: "The Sparkling Specialist",
    description:
      "You're the one who turns an ordinary Tuesday into a celebration. You believe bubbles aren't just for milestones — they're for right now. Argyle pioneered world-class sparkling wine in Oregon, proving that the Willamette Valley's cool climate was born for it. Festive, surprising, and always a little more serious than people expect.",
    wineRec: "Argyle Brut, Willamette Valley",
    wineStyle: "Crisp, celebratory, complex — fine bubbles with apple, brioche, and toasted hazelnut",
    traits: ["celebratory", "festive", "life of the party", "surprisingly deep", "the optimist"],
  },
  {
    id: "domaine-serene",
    name: "Domaine Serene",
    tagline: "Grand ambition, grand cru results",
    ava: "Dundee Hills",
    personality: "The Luxury Estate",
    description:
      "You want the best — not to show off, but because you've learned that life is too short for anything less. You appreciate scale, vision, and the confidence to go big. Domaine Serene built a grand estate with world-class ambition and backed it up with wines that beat Burgundy in blind tastings. No apologies, no compromises.",
    wineRec: "Domaine Serene Evenstad Reserve Pinot Noir",
    wineStyle: "Rich, luxurious, commanding — dark fruit, baking spice, and velvety concentration",
    traits: ["ambitious", "luxury-minded", "confident", "world-class standards", "go big or go home"],
  },
  {
    id: "penner-ash",
    name: "Penner-Ash Wine Cellars",
    tagline: "A winemaker's personal statement",
    ava: "Yamhill-Carlton",
    personality: "The Winemaker's Winery",
    description:
      "You're drawn to people who've mastered their craft and then made it personal. You can tell when something was made by someone who cares — there's an energy to it. Lynn Penner-Ash spent decades at top Oregon wineries before creating her own label, and every bottle carries her signature: bold, expressive, and unapologetically herself.",
    wineRec: "Penner-Ash Willamette Valley Pinot Noir",
    wineStyle: "Bold, expressive, confident — ripe fruit with spice, texture, and winemaker's intention",
    traits: ["craft-obsessed", "expressive", "bold", "respects mastery", "the artist"],
  },
  {
    id: "wvv",
    name: "Willamette Valley Vineyards",
    tagline: "Wine for everyone, seriously",
    ava: "Willamette Valley",
    personality: "The People's Winery",
    description:
      "You believe the best things in life should be shared, not gatekept. You're the one who makes sure everyone's glass is full and everyone feels welcome. Willamette Valley Vineyards was literally crowd-funded — built by people who believed Oregon wine should belong to everyone. Welcoming, inclusive, and proof that populist and excellent aren't opposites.",
    wineRec: "Willamette Valley Vineyards Whole Cluster Pinot Noir",
    wineStyle: "Approachable, friendly, honest — bright fruit with soft tannins and easy-drinking charm",
    traits: ["inclusive", "welcoming", "populist", "generous host", "wine for the people"],
  },
  {
    id: "anne-amie",
    name: "Anne Amie Vineyards",
    tagline: "Art, wine, and unexpected varieties",
    ava: "Yamhill-Carlton",
    personality: "The Creative Spirit",
    description:
      "You color outside the lines — and the picture is better for it. You're drawn to the unexpected: the grape nobody else is growing, the pairing nobody else would try, the gallery show in the barn. Anne Amie blends art and wine with an eclectic portfolio that includes everything from Pinot Noir to Muller-Thurgau. Creative, curious, and never boring.",
    wineRec: "Anne Amie Pinot Blanc",
    wineStyle: "Eclectic, aromatic, unexpected — bright citrus and stone fruit with floral lift and crisp minerality",
    traits: ["creative", "eclectic", "art-lover", "tries the unusual", "the free spirit"],
  },
];

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  text: string;
  /** Points added to each winery's score when this option is picked. */
  scores: Record<string, number>;
}

/**
 * Full pool of 8 questions. The quiz randomly picks 4.
 *
 * Scoring guide (per option):
 *   3 = strong match, 2 = good match, 1 = partial, 0 = no match
 *
 * Every winery scores 3 on at least 2 options across the full pool so all
 * archetypes are reachable regardless of which 4 questions are drawn.
 */
export const QUESTIONS: QuizQuestion[] = [
  // ── Q1 — Weekend ─────────────────────────────────────────────────────
  {
    id: "q1-weekend",
    question: "It's Saturday afternoon. You'd rather be...",
    options: [
      {
        text: "On a long walk with no destination",
        scores: {
          cristom: 3, eyrie: 2, "ken-wright": 2, "bethel-heights": 2, "lingua-franca": 1,
          "elk-cove": 1, brooks: 1, adelsheim: 1, ponzi: 0, "beaux-freres": 0,
          stoller: 0, "domaine-drouhin": 1, "sokol-blosser": 1, argyle: 0,
          "domaine-serene": 0, "penner-ash": 0, wvv: 0, "anne-amie": 1,
        },
      },
      {
        text: "Hosting brunch for eight friends",
        scores: {
          stoller: 3, brooks: 2, wvv: 2, "elk-cove": 2, ponzi: 2, argyle: 1,
          cristom: 0, eyrie: 0, "domaine-drouhin": 1, "sokol-blosser": 1,
          adelsheim: 0, "beaux-freres": 0, "ken-wright": 0, "lingua-franca": 0,
          "bethel-heights": 0, "domaine-serene": 1, "penner-ash": 0, "anne-amie": 1,
        },
      },
      {
        text: "At a farmers market with a great coffee",
        scores: {
          "elk-cove": 3, "sokol-blosser": 3, brooks: 2, "anne-amie": 2, wvv: 1,
          stoller: 1, cristom: 1, eyrie: 1, "domaine-drouhin": 0, adelsheim: 0,
          ponzi: 1, "beaux-freres": 0, "ken-wright": 1, "lingua-franca": 0,
          "bethel-heights": 1, argyle: 0, "domaine-serene": 0, "penner-ash": 1,
        },
      },
      {
        text: "In a bookstore you've never been to",
        scores: {
          eyrie: 3, adelsheim: 3, "lingua-franca": 2, "domaine-drouhin": 2, cristom: 2,
          "ken-wright": 1, "bethel-heights": 0, "elk-cove": 0, brooks: 0,
          stoller: 0, "sokol-blosser": 0, ponzi: 0, "beaux-freres": 1,
          argyle: 0, "domaine-serene": 0, "penner-ash": 0, wvv: 0, "anne-amie": 1,
        },
      },
    ],
  },

  // ── Q2 — Flavor ──────────────────────────────────────────────────────
  {
    id: "q2-flavor",
    question: "Pick the flavor that speaks to you.",
    options: [
      {
        text: "Dark cherry and chocolate",
        scores: {
          "domaine-drouhin": 3, "domaine-serene": 3, stoller: 2, "beaux-freres": 2,
          "penner-ash": 2, cristom: 1, ponzi: 1, "elk-cove": 0, eyrie: 0,
          brooks: 0, "sokol-blosser": 0, adelsheim: 0, "ken-wright": 0,
          "lingua-franca": 0, "bethel-heights": 0, argyle: 0, wvv: 1, "anne-amie": 0,
        },
      },
      {
        text: "Strawberry and rose petal",
        scores: {
          eyrie: 3, cristom: 2, "anne-amie": 2, "elk-cove": 1, brooks: 1,
          "bethel-heights": 1, "lingua-franca": 1, stoller: 0, "domaine-drouhin": 0,
          "sokol-blosser": 1, adelsheim: 1, ponzi: 0, "beaux-freres": 0,
          "ken-wright": 1, argyle: 0, "domaine-serene": 0, "penner-ash": 0, wvv: 0,
        },
      },
      {
        text: "Lemon zest and fresh herbs",
        scores: {
          "elk-cove": 3, argyle: 3, brooks: 2, "anne-amie": 2, "sokol-blosser": 1,
          stoller: 1, eyrie: 1, wvv: 1, cristom: 0, "domaine-drouhin": 0,
          adelsheim: 0, ponzi: 0, "beaux-freres": 0, "ken-wright": 0,
          "lingua-franca": 0, "bethel-heights": 0, "domaine-serene": 0, "penner-ash": 0,
        },
      },
      {
        text: "Mushroom and forest floor",
        scores: {
          cristom: 3, "bethel-heights": 3, "ken-wright": 3, eyrie: 2,
          "domaine-drouhin": 1, "lingua-franca": 1, "sokol-blosser": 1, adelsheim: 1,
          brooks: 0, stoller: 0, "elk-cove": 0, ponzi: 0, "beaux-freres": 0,
          argyle: 0, "domaine-serene": 0, "penner-ash": 0, wvv: 0, "anne-amie": 0,
        },
      },
    ],
  },

  // ── Q3 — Values ──────────────────────────────────────────────────────
  {
    id: "q3-values",
    question: "When it comes to how things are made, you care most about...",
    options: [
      {
        text: "Sustainability and the planet",
        scores: {
          "sokol-blosser": 3, brooks: 3, cristom: 2, "bethel-heights": 1,
          "elk-cove": 1, stoller: 1, eyrie: 1, wvv: 1, "domaine-drouhin": 0,
          adelsheim: 0, ponzi: 0, "beaux-freres": 0, "ken-wright": 0,
          "lingua-franca": 0, argyle: 0, "domaine-serene": 0, "penner-ash": 0, "anne-amie": 1,
        },
      },
      {
        text: "Family legacy and real people",
        scores: {
          ponzi: 3, "elk-cove": 3, "bethel-heights": 2, eyrie: 2, stoller: 1,
          wvv: 1, brooks: 1, cristom: 0, "domaine-drouhin": 1, "sokol-blosser": 1,
          adelsheim: 0, "beaux-freres": 0, "ken-wright": 0, "lingua-franca": 0,
          argyle: 0, "domaine-serene": 0, "penner-ash": 1, "anne-amie": 0,
        },
      },
      {
        text: "Heritage and tradition",
        scores: {
          "domaine-drouhin": 3, eyrie: 2, adelsheim: 2, ponzi: 2, cristom: 1,
          "beaux-freres": 1, "lingua-franca": 1, "bethel-heights": 1, stoller: 0,
          "elk-cove": 0, brooks: 0, "sokol-blosser": 0, "ken-wright": 0,
          argyle: 0, "domaine-serene": 1, "penner-ash": 0, wvv: 0, "anne-amie": 0,
        },
      },
      {
        text: "Innovation and doing it differently",
        scores: {
          "anne-amie": 3, stoller: 2, brooks: 2, argyle: 2, "sokol-blosser": 1,
          "penner-ash": 1, "elk-cove": 1, wvv: 1, cristom: 1, eyrie: 0,
          "domaine-drouhin": 0, adelsheim: 0, ponzi: 0, "beaux-freres": 0,
          "ken-wright": 0, "lingua-franca": 0, "bethel-heights": 0, "domaine-serene": 0,
        },
      },
    ],
  },

  // ── Q4 — Tasting room vibe ───────────────────────────────────────────
  {
    id: "q4-vibe",
    question: "Your ideal tasting room vibe.",
    options: [
      {
        text: "Intimate and quiet — just the wine and the story",
        scores: {
          cristom: 3, eyrie: 3, "bethel-heights": 2, "lingua-franca": 2,
          "ken-wright": 2, adelsheim: 2, "domaine-drouhin": 2, "beaux-freres": 1,
          brooks: 0, stoller: 0, "elk-cove": 0, "sokol-blosser": 0,
          ponzi: 0, argyle: 0, "domaine-serene": 0, "penner-ash": 0, wvv: 0, "anne-amie": 0,
        },
      },
      {
        text: "Social and welcoming — I want to meet people",
        scores: {
          wvv: 3, brooks: 3, "elk-cove": 2, ponzi: 2, "sokol-blosser": 1,
          stoller: 1, argyle: 1, "anne-amie": 1, cristom: 0, eyrie: 0,
          "domaine-drouhin": 0, adelsheim: 0, "beaux-freres": 0, "ken-wright": 0,
          "lingua-franca": 0, "bethel-heights": 0, "domaine-serene": 0, "penner-ash": 0,
        },
      },
      {
        text: "Polished and beautiful — the whole experience matters",
        scores: {
          "domaine-serene": 3, stoller: 3, "domaine-drouhin": 2, "beaux-freres": 2,
          "penner-ash": 1, argyle: 1, ponzi: 1, adelsheim: 1, cristom: 0,
          eyrie: 0, "elk-cove": 0, brooks: 0, "sokol-blosser": 0,
          "ken-wright": 0, "lingua-franca": 0, "bethel-heights": 0, wvv: 0, "anne-amie": 0,
        },
      },
      {
        text: "Outdoors with a view — nature is the point",
        scores: {
          "elk-cove": 3, "sokol-blosser": 2, stoller: 2, "penner-ash": 2,
          brooks: 1, "anne-amie": 1, wvv: 1, "bethel-heights": 1, cristom: 0,
          eyrie: 0, "domaine-drouhin": 0, adelsheim: 0, ponzi: 0,
          "beaux-freres": 0, "ken-wright": 0, "lingua-franca": 0, argyle: 0, "domaine-serene": 0,
        },
      },
    ],
  },

  // ── Q5 — Travel ──────────────────────────────────────────────────────
  {
    id: "q5-travel",
    question: "You're planning a trip. You'd rather...",
    options: [
      {
        text: "Stay at a luxury resort — I want to be pampered",
        scores: {
          "domaine-serene": 3, "beaux-freres": 3, stoller: 2, "domaine-drouhin": 2,
          "penner-ash": 1, argyle: 1, ponzi: 1, cristom: 0, eyrie: 0,
          "elk-cove": 0, brooks: 0, "sokol-blosser": 0, adelsheim: 0,
          "ken-wright": 0, "lingua-franca": 0, "bethel-heights": 0, wvv: 0, "anne-amie": 0,
        },
      },
      {
        text: "Road trip with no itinerary — see where the day goes",
        scores: {
          "elk-cove": 3, "anne-amie": 2, brooks: 2, "ken-wright": 2, wvv: 1,
          "sokol-blosser": 1, "bethel-heights": 1, cristom: 1, eyrie: 0,
          stoller: 0, "domaine-drouhin": 0, adelsheim: 0, ponzi: 0,
          "beaux-freres": 0, "lingua-franca": 0, argyle: 0, "domaine-serene": 0, "penner-ash": 0,
        },
      },
      {
        text: "A local homestay — I want to live like the people who live there",
        scores: {
          "bethel-heights": 3, ponzi: 3, "sokol-blosser": 2, brooks: 1,
          cristom: 1, wvv: 1, "elk-cove": 1, adelsheim: 1, eyrie: 0,
          stoller: 0, "domaine-drouhin": 0, "beaux-freres": 0, "ken-wright": 0,
          "lingua-franca": 0, argyle: 0, "domaine-serene": 0, "penner-ash": 0, "anne-amie": 1,
        },
      },
      {
        text: "City walkabout — museums, restaurants, hidden bars",
        scores: {
          "lingua-franca": 3, adelsheim: 2, eyrie: 2, "domaine-drouhin": 1,
          "anne-amie": 2, "penner-ash": 1, argyle: 1, cristom: 1, stoller: 0,
          "elk-cove": 0, brooks: 0, "sokol-blosser": 0, ponzi: 0,
          "beaux-freres": 0, "ken-wright": 0, "bethel-heights": 0, "domaine-serene": 0, wvv: 0,
        },
      },
    ],
  },

  // ── Q6 — Dinner party wine ───────────────────────────────────────────
  {
    id: "q6-dinner",
    question: "You're hosting dinner. The wine you pour is...",
    options: [
      {
        text: "Something rare that nobody's tried before",
        scores: {
          "beaux-freres": 3, "lingua-franca": 2, eyrie: 2, "ken-wright": 2,
          "anne-amie": 1, cristom: 1, adelsheim: 1, "penner-ash": 1, stoller: 0,
          "elk-cove": 0, brooks: 0, "sokol-blosser": 0, ponzi: 0,
          "bethel-heights": 0, argyle: 0, "domaine-serene": 1, wvv: 0, "domaine-drouhin": 0,
        },
      },
      {
        text: "The crowd-pleaser everyone loves",
        scores: {
          wvv: 3, stoller: 3, "elk-cove": 2, ponzi: 2, argyle: 1,
          brooks: 1, "sokol-blosser": 1, "anne-amie": 0, cristom: 0, eyrie: 0,
          "domaine-drouhin": 0, adelsheim: 0, "beaux-freres": 0, "ken-wright": 0,
          "lingua-franca": 0, "bethel-heights": 0, "domaine-serene": 0, "penner-ash": 0,
        },
      },
      {
        text: "Whatever I'm most excited about right now",
        scores: {
          "penner-ash": 3, brooks: 2, "anne-amie": 3, "elk-cove": 1, argyle: 2,
          "sokol-blosser": 1, wvv: 1, cristom: 0, eyrie: 0, stoller: 0,
          "domaine-drouhin": 0, adelsheim: 0, ponzi: 0, "beaux-freres": 0,
          "ken-wright": 0, "lingua-franca": 0, "bethel-heights": 0, "domaine-serene": 0,
        },
      },
      {
        text: "Something classic and reliable — you can't go wrong",
        scores: {
          "domaine-drouhin": 3, adelsheim: 3, ponzi: 2, "bethel-heights": 2,
          cristom: 1, eyrie: 1, "domaine-serene": 1, stoller: 0, "elk-cove": 0,
          brooks: 0, "sokol-blosser": 0, "beaux-freres": 0, "ken-wright": 0,
          "lingua-franca": 0, argyle: 0, "penner-ash": 0, wvv: 0, "anne-amie": 0,
        },
      },
    ],
  },

  // ── Q7 — Music ───────────────────────────────────────────────────────
  {
    id: "q7-music",
    question: "Your soundtrack right now...",
    options: [
      {
        text: "Jazz in a dark club",
        scores: {
          "lingua-franca": 3, "beaux-freres": 2, cristom: 2, eyrie: 2,
          adelsheim: 1, "domaine-drouhin": 1, "penner-ash": 1, "bethel-heights": 0,
          "elk-cove": 0, brooks: 0, stoller: 0, "sokol-blosser": 0,
          ponzi: 0, "ken-wright": 0, argyle: 0, "domaine-serene": 1, wvv: 0, "anne-amie": 0,
        },
      },
      {
        text: "Acoustic on a porch",
        scores: {
          "bethel-heights": 3, ponzi: 2, "elk-cove": 2, "ken-wright": 2,
          "sokol-blosser": 2, brooks: 1, cristom: 1, adelsheim: 1, eyrie: 0,
          stoller: 0, "domaine-drouhin": 0, "beaux-freres": 0, "lingua-franca": 0,
          argyle: 0, "domaine-serene": 0, "penner-ash": 0, wvv: 1, "anne-amie": 0,
        },
      },
      {
        text: "Something loud at a festival",
        scores: {
          argyle: 3, brooks: 2, wvv: 2, "anne-amie": 2, "elk-cove": 1,
          "sokol-blosser": 1, stoller: 1, "penner-ash": 1, cristom: 0, eyrie: 0,
          "domaine-drouhin": 0, adelsheim: 0, ponzi: 0, "beaux-freres": 0,
          "ken-wright": 0, "lingua-franca": 0, "bethel-heights": 0, "domaine-serene": 0,
        },
      },
      {
        text: "Classical in a beautiful hall",
        scores: {
          "domaine-drouhin": 3, "domaine-serene": 2, adelsheim: 2, eyrie: 2,
          cristom: 1, "beaux-freres": 1, "lingua-franca": 1, ponzi: 1, stoller: 1,
          "elk-cove": 0, brooks: 0, "sokol-blosser": 0, "ken-wright": 0,
          "bethel-heights": 0, argyle: 0, "penner-ash": 0, wvv: 0, "anne-amie": 0,
        },
      },
    ],
  },

  // ── Q8 — Season ──────────────────────────────────────────────────────
  {
    id: "q8-season",
    question: "Your favorite time of year...",
    options: [
      {
        text: "Spring — everything is new and possible",
        scores: {
          "anne-amie": 3, argyle: 2, brooks: 2, "elk-cove": 2, "sokol-blosser": 1,
          wvv: 1, stoller: 1, "penner-ash": 1, cristom: 0, eyrie: 0,
          "domaine-drouhin": 0, adelsheim: 0, ponzi: 0, "beaux-freres": 0,
          "ken-wright": 0, "lingua-franca": 0, "bethel-heights": 0, "domaine-serene": 0,
        },
      },
      {
        text: "Summer — long, warm, and social",
        scores: {
          wvv: 3, stoller: 2, "elk-cove": 2, ponzi: 2, argyle: 1,
          brooks: 1, "sokol-blosser": 1, "penner-ash": 1, cristom: 0, eyrie: 0,
          "domaine-drouhin": 0, adelsheim: 0, "beaux-freres": 0, "ken-wright": 0,
          "lingua-franca": 0, "bethel-heights": 0, "domaine-serene": 0, "anne-amie": 0,
        },
      },
      {
        text: "Fall — harvest energy and golden light",
        scores: {
          "ken-wright": 3, "penner-ash": 3, cristom: 2, "bethel-heights": 2,
          "beaux-freres": 1, "domaine-serene": 1, ponzi: 1, "sokol-blosser": 1,
          eyrie: 0, stoller: 0, "elk-cove": 0, brooks: 0,
          "domaine-drouhin": 0, adelsheim: 0, "lingua-franca": 0, argyle: 0, wvv: 0, "anne-amie": 0,
        },
      },
      {
        text: "Winter — quiet, reflective, inward",
        scores: {
          eyrie: 3, adelsheim: 2, "lingua-franca": 2, cristom: 2,
          "domaine-drouhin": 2, "bethel-heights": 1, "ken-wright": 1, "beaux-freres": 1,
          stoller: 0, "elk-cove": 0, brooks: 0, "sokol-blosser": 0,
          ponzi: 0, argyle: 0, "domaine-serene": 0, "penner-ash": 0, wvv: 0, "anne-amie": 0,
        },
      },
    ],
  },
];

// ── Quiz randomization helper ──────────────────────────────────────────

/**
 * Fisher-Yates shuffle (returns a new array).
 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Return `count` randomly-selected questions from the full pool.
 * Default count is 4 (the quiz length).
 */
export function getRandomQuestions(count = 4): QuizQuestion[] {
  return shuffle(QUESTIONS).slice(0, Math.min(count, QUESTIONS.length));
}
