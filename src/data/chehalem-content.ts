/* ── Chehalem Winery content for standalone info pages ── */

import type {
  TastingOption,
  HoursDirections,
  ClubInfo,
  PairingInfo,
  Recipe,
} from "./rex-hill-content";

export interface ChehalemContent {
  tastings: TastingOption[];
  hours: HoursDirections;
  club: ClubInfo;
  pairings: PairingInfo;
  recipes: Recipe[];
}

export const CHEHALEM_CONTENT: ChehalemContent = {
  tastings: [
    {
      name: "Estate Tasting",
      price: "$50",
      description:
        "A guided five-wine tasting of current releases across four estate vineyards and three AVAs. The flight changes monthly to showcase the breadth of Chehalem's portfolio.",
      details: [
        "5 current-release wines",
        "Four estate vineyards, three AVAs",
        "Indoor and outdoor seating",
        "$25 for club members",
        "Walk-ins welcome, reservations available",
      ],
      highlight: true,
      url: "https://www.exploretock.com/chehalem-estate",
    },
    {
      name: "Library Loft",
      price: "$50",
      description:
        "A seated experience with aged wines in the intimate Library Loft above the tasting room. Optional seasonal food pairing add-on ($30/person) from Chef Brent.",
      details: [
        "Aged and library selections",
        "Intimate loft setting",
        "Optional seasonal food pairing (+$30)",
        "$25 for club members",
        "Reservations recommended",
      ],
      url: "https://www.exploretock.com/chehalem-estate",
    },
    {
      name: "Private Tasting & Tour",
      price: "$50",
      description:
        "Tour of the Chehalem winery and Corral Creek Vineyards followed by a seated tasting of 7-8 current releases paired with cheese and charcuterie. Includes single-vineyard and reserve wines.",
      details: [
        "Winery and vineyard tour",
        "7-8 wines with cheese & charcuterie",
        "Single-vineyard and reserve wines",
        "Small-group format",
        "Reservations required",
      ],
      url: "https://www.exploretock.com/chehalem-estate",
    },
  ],

  hours: {
    address: "31500 NE Bell Rd, Sherwood, OR 97140",
    phone: "(503) 864-3404",
    hours: "Open daily, 10:30 AM – 5:30 PM",
    website: "https://chehalemwines.com",
    ava: "Chehalem Mountains AVA, Willamette Valley (vineyards across Ribbon Ridge, Chehalem Mountains, and Dundee Hills)",
    directionsFromPortland: [
      "Take I-5 South to Exit 294 (Tualatin/Sherwood), follow OR-99W south, then turn onto NE Bell Road. Approximately 30-45 minutes.",
      "Alternative: Take OR-210 (Beaverton-Hillsdale Highway) west through Beaverton to Scholls, then south to Bell Road.",
    ],
    note: "New estate tasting room opened March 2025 on the Chehalem Estate Vineyard. Indoor and outdoor seating with sweeping views of Mt Hood and Parrett Mountain. Walk-ins welcome; reservations via Tock recommended.",
  },

  club: {
    tiers: [
      {
        name: "Estate Club",
        bottles: "Seasonal selection",
        frequency: "2 shipments per year (Spring & Fall)",
        discount: "20% off all Chehalem and Stoller Wine Group wines",
        perks: [
          "1 complimentary tasting for 4 per year",
          "20% off all wines (Chehalem + Stoller Wine Group)",
          "Customize club selection prior to release",
          "Invitations to exclusive seasonal pick-up parties",
          "10% savings on all merchandise",
          "Dedicated concierge service",
        ],
      },
      {
        name: "Reserve Club",
        bottles: "Seasonal selection",
        frequency: "2 shipments per year (Spring & Fall)",
        discount: "20% off all Chehalem and Stoller Wine Group wines",
        perks: [
          "1 complimentary tasting + pairing for 4 per year",
          "Access to exclusive Reserve-only wines",
          "20% off all wines (Chehalem + Stoller Wine Group)",
          "Priority access to single-vineyard and library wines",
          "All Estate Club benefits plus exclusive allocations",
          "Access to Bell Road Farmhouse",
        ],
        highlight: true,
      },
    ],
    sharedBenefits: [
      "20% off all Chehalem and Stoller Wine Group wines",
      "Complimentary tastings at Chehalem Estate for up to 4 guests",
      "Up to 4 complimentary tastings at sister locations each month",
      "Earn loyalty points on all purchases",
      "First access and last call on all Chehalem wines",
      "Referral rewards (5,000 loyalty points)",
      "No membership fees",
    ],
  },

  pairings: {
    pairings: [
      {
        wine: "Pinot Noir",
        varietal: "pinot-noir",
        foods: [
          "Wild salmon",
          "Roasted duck breast",
          "Wild mushroom risotto",
          "Herb-crusted lamb",
          "Aged cheeses",
          "Charcuterie",
        ],
        note: "Chehalem's Pinot Noirs span three AVAs — from the finesse of Ridgecrest (Ribbon Ridge) to the power of Stoller (Dundee Hills) — making them versatile partners for everything from delicate fish to hearty red meats.",
      },
      {
        wine: "INOX Chardonnay",
        varietal: "chardonnay",
        foods: [
          "Oysters on the half shell",
          "Ceviche",
          "Grilled shrimp",
          "Goat cheese salad",
          "Light pasta",
          "Sushi",
        ],
        note: "INOX ('inoxydable' — French for stainless steel) sees zero oak, delivering pure fruit and bright acidity. Wine Spectator Top 100. Perfect with lighter fare where oak would overwhelm.",
      },
      {
        wine: "Pinot Gris",
        varietal: "pinot-gris",
        foods: [
          "Thai green curry",
          "Sushi and sashimi",
          "Grilled prawns",
          "Summer vegetable tarts",
          "Light pasta with pesto",
        ],
        note: "The Three Vineyard Pinot Gris blends fruit from across the estate, delivering aromatic complexity and food-friendly acidity. 92 points Decanter.",
      },
    ],
    philosophy:
      "Since 1990, Chehalem has farmed four estate vineyards across three distinct AVAs — Ribbon Ridge, Chehalem Mountains, and Dundee Hills. As a B Corp certified winery with LIVE and Salmon Safe certifications, sustainability isn't a marketing initiative — it's how we farm. Winemaker Katie Santora crafts wines that express the unique terroir of each vineyard, from the signature INOX unoaked Chardonnay to single-vineyard Pinot Noirs.",
  },

  recipes: [
    {
      title: "Wild Mushroom & Gruyere Tart",
      winePairing: "Ridgecrest Vineyards Pinot Noir",
      wineNote: "The old-vine complexity and earthy character of Ridgecrest Pinot mirrors the wild mushroom flavors from Ribbon Ridge terroir.",
      description:
        "Savory tart with chanterelle and cremini mushrooms, Gruyere, and fresh thyme in a buttery pastry shell.",
      serves: "6 servings",
      time: "50 min",
      keyIngredients: ["Chanterelle mushrooms", "Cremini mushrooms", "Gruyere cheese", "Fresh thyme", "Puff pastry", "Shallots"],
    },
    {
      title: "Pan-Seared Salmon with Beet Puree",
      winePairing: "Stoller Vineyard Pinot Noir",
      wineNote: "The bold, dark-fruited character of Stoller Vineyard Pinot from Jory volcanic soil stands up to the richness of salmon and earthy beet.",
      description:
        "Wild Chinook salmon pan-seared with a golden crust, served over roasted beet puree with microgreens and horseradish cream.",
      serves: "4 servings",
      time: "40 min",
      keyIngredients: ["Wild Chinook salmon", "Red beets", "Horseradish", "Creme fraiche", "Microgreens", "Olive oil"],
    },
    {
      title: "Oysters with Mignonette & INOX",
      winePairing: "INOX Unoaked Chardonnay",
      wineNote: "INOX's pure fruit and bright acidity pair naturally with briny oysters — no oak to compete with the sea.",
      description:
        "Fresh Pacific oysters on the half shell with a classic champagne mignonette and a squeeze of lemon.",
      serves: "4 servings",
      time: "15 min",
      keyIngredients: ["Pacific oysters", "Champagne vinegar", "Shallots", "Lemon", "Black pepper", "Crushed ice"],
    },
    {
      title: "Thai Green Curry with Prawns",
      winePairing: "Three Vineyard Pinot Gris",
      wineNote: "The aromatic complexity and bright acidity of the Pinot Gris cuts through the coconut richness and complements the lemongrass and lime.",
      description:
        "Fragrant green curry with Pacific prawns, Thai basil, and seasonal vegetables over jasmine rice.",
      serves: "4 servings",
      time: "35 min",
      keyIngredients: ["Pacific prawns", "Green curry paste", "Coconut milk", "Thai basil", "Jasmine rice", "Lime"],
    },
  ],
};
