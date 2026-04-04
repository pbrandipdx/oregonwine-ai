/* ── Ponzi Vineyards winery content for standalone info pages ── */

import type {
  TastingOption,
  HoursDirections,
  ClubInfo,
  PairingInfo,
  Recipe,
} from "./rex-hill-content";

export interface PonziContent {
  tastings: TastingOption[];
  hours: HoursDirections;
  club: ClubInfo;
  pairings: PairingInfo;
  recipes: Recipe[];
}

export const PONZI_CONTENT: PonziContent = {
  tastings: [
    {
      name: "Signature Tasting",
      price: "$50",
      description:
        "A flight of Ponzi's award-winning Pinot Noir and Chardonnay with warm hospitality and curated culinary offerings.",
      details: [
        "Curated flight of flagship wines",
        "Seasonal culinary pairings",
        "90-minute seated experience",
        "Tasting fee refunded with 3-bottle purchase",
        "Walk-ins welcome, reservations recommended",
      ],
      highlight: true,
    },
    {
      name: "Collector's Flight",
      price: "$75",
      description:
        "For connoisseurs seeking rare wines only found at the winery. Features limited-production single-vineyard wines, finishing with a special splash of a club-exclusive or library selection.",
      details: [
        "Rare single-vineyard wines",
        "Club-exclusive and library selections",
        "90-minute guided experience",
        "Fee waived with 3-bottle purchase",
        "Complimentary for Basalt members",
      ],
    },
    {
      name: "Bollinger Group Tasting",
      price: "$75",
      description:
        "Explore wines from the Bollinger Group portfolio — Ponzi Vineyards alongside Champagne Ayala and Domaine Chanson — comparing French and Oregon terroir side by side.",
      details: [
        "Ponzi + Champagne Ayala + Domaine Chanson",
        "French vs Oregon terroir comparison",
        "90-minute guided experience",
        "$25 for Laurelwood Society members",
        "Complimentary for Basalt members",
      ],
    },
  ],

  hours: {
    address: "19500 SW Mountain Home Road, Sherwood, OR 97140",
    phone: "(503) 628-1227",
    hours: "Open daily, 10:00 AM – 5:00 PM (last seating 3:30 PM)",
    website: "https://www.ponzivineyards.com",
    ava: "Laurelwood District AVA (Chehalem Mountains, Willamette Valley)",
    directionsFromPortland: [
      "Take I-5 South to Exit 294 (Tualatin/Sherwood), follow OR-99W south, then turn onto SW Mountain Home Road. Approximately 30-45 minutes.",
      "Alternative: Take OR-210 (Beaverton-Hillsdale Highway) west through Beaverton to Scholls, then south on SW Mountain Home Road.",
    ],
    note: "Reservations strongly recommended. Walk-ins welcome as space allows. Book via Tock at exploretock.com/ponzivineyards. Bocce courts available.",
  },

  club: {
    tiers: [
      {
        name: "Loess",
        bottles: "6 bottles",
        frequency: "Seasonal shipments (Spring & Fall)",
        discount: "$450-$600 per shipment",
        perks: [
          "Reduced tasting fees ($75 for Private Tasting)",
          "Early access to limited-production releases",
          "Customizable shipments",
          "Behind-the-scenes experiences",
          "Tasting room perks and priority reservations",
        ],
        highlight: false,
      },
      {
        name: "Basalt",
        bottles: "12 bottles",
        frequency: "Seasonal shipments (Spring & Fall)",
        discount: "$850-$1,000 per shipment",
        perks: [
          "Complimentary Private Tasting Flight ($125 value)",
          "Complimentary Bollinger Group Tasting ($75 value)",
          "Broadest customization opportunities",
          "Priority access to single-vineyard and library wines",
          "All Loess-tier benefits plus exclusive allocations",
        ],
        highlight: true,
      },
    ],
    sharedBenefits: [
      "15% off wine shop orders",
      "First access to new releases",
      "Member-only events",
      "Annual tasting passes",
      "Complimentary bocce court reservations",
    ],
  },

  pairings: {
    pairings: [
      {
        wine: "Pinot Noir",
        varietal: "pinot-noir",
        foods: [
          "Roasted duck breast",
          "Wild mushroom risotto",
          "Herb-crusted rack of lamb",
          "Grilled salmon with beet puree",
          "Rogue Creamery cheeses",
          "Charcuterie",
        ],
        note: "Ponzi's Laurelwood District Pinot Noirs bring bright acidity, earthy complexity, and silky tannins — ideal companions for Pacific Northwest cuisine from farm to table.",
      },
      {
        wine: "Chardonnay",
        varietal: "chardonnay",
        foods: [
          "Pan-seared halibut",
          "Roasted chicken with tarragon",
          "Lobster risotto",
          "Grilled prawns with citrus",
          "Seasonal vegetable tarts",
        ],
        note: "From the lean, mineral-driven Laurelwood District Chardonnay to the rich, barrel-fermented Avellana, Ponzi's whites pair beautifully across the culinary spectrum.",
      },
    ],
    philosophy:
      "Since 1970, the Ponzi family has believed that great wine begins in the vineyard. Our LIVE Certified Sustainable estate vineyards on Laurelwood soil — ancient loess over basalt bedrock — produce wines of distinctive terroir expression. From approachable Tavola to rare single-vineyard designates, every bottle reflects over five decades of Willamette Valley stewardship.",
  },

  recipes: [
    {
      title: "Oregon Mushroom Risotto",
      winePairing: "Laurelwood District Pinot Noir",
      wineNote: "The earthy complexity and bright acidity of Ponzi Pinot Noir mirrors the wild mushroom flavors beautifully.",
      description:
        "Wild chanterelle and porcini risotto finished with Parmigiano-Reggiano and fresh thyme. A celebration of Pacific Northwest foraging.",
      serves: "4 servings",
      time: "45 min",
      keyIngredients: ["Chanterelle mushrooms", "Porcini mushrooms", "Arborio rice", "Parmigiano-Reggiano", "Fresh thyme", "Shallots"],
    },
    {
      title: "Pan-Seared Duck Breast with Cherry-Pinot Reduction",
      winePairing: "Reserve Pinot Noir",
      wineNote: "The concentrated red fruit and spice of Ponzi Reserve Pinot complement the richness of duck and tart cherry.",
      description:
        "Pan-seared duck breast with a Bing cherry and Pinot Noir reduction, served over creamy polenta.",
      serves: "4 servings",
      time: "50 min",
      keyIngredients: ["Duck breast", "Bing cherries", "Pinot Noir", "Polenta", "Shallots", "Fresh rosemary"],
    },
    {
      title: "Hazelnut-Crusted Halibut with Citrus Beurre Blanc",
      winePairing: "Avellana Chardonnay",
      wineNote: "A nod to Avellana vineyard, named for the original hazelnut orchard. The wine's stone fruit and citrus echo the dish.",
      description:
        "Pacific halibut crusted with Oregon hazelnuts, served with a Meyer lemon beurre blanc and seasonal greens.",
      serves: "4 servings",
      time: "35 min",
      keyIngredients: ["Pacific halibut", "Oregon hazelnuts", "Meyer lemon", "Butter", "Seasonal greens", "Shallots"],
    },
    {
      title: "Herb-Roasted Chicken with Willamette Valley Vegetables",
      winePairing: "Laurelwood District Chardonnay",
      wineNote: "The balanced oak and citrus notes of Ponzi Chardonnay complement the herbs and roasted root vegetables.",
      description:
        "Whole roasted chicken with tarragon, thyme, and seasonal root vegetables from the Willamette Valley.",
      serves: "4-6 servings",
      time: "90 min",
      keyIngredients: ["Whole chicken", "Fresh tarragon", "Fresh thyme", "Root vegetables", "Garlic", "Olive oil"],
    },
  ],
};
