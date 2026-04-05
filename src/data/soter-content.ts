/* ── Soter Vineyards winery content for standalone info pages ── */

import type {
  TastingOption,
  HoursDirections,
  ClubInfo,
  PairingInfo,
  Recipe,
} from "./rex-hill-content";

export interface SoterContent {
  tastings: TastingOption[];
  hours: HoursDirections;
  club: ClubInfo;
  pairings: PairingInfo;
  recipes: Recipe[];
}

export const SOTER_CONTENT: SoterContent = {
  tastings: [
    {
      name: "Estate Tasting",
      price: "$50",
      description:
        "A seated tasting of current release wines at Mineral Springs Ranch, Soter's estate vineyard in the Yamhill-Carlton AVA. Experience the biodynamic estate in person.",
      details: [
        "5 wines including estate Pinot Noir and sparkling",
        "Seated indoor or patio service",
        "Overview of biodynamic farming practices",
        "Allow 60–75 minutes",
        "Reservations required",
      ],
      highlight: true,
      url: "https://sotervineyards.com/visit/",
    },
    {
      name: "Library Tasting",
      price: "$75",
      description:
        "Explore Soter's cellar depth with a selection of library vintages alongside current releases. A rare opportunity to taste how Soter wines evolve.",
      details: [
        "6 wines including library and current releases",
        "Seated experience with vineyard views",
        "Discussion of vintage variation and aging",
        "Allow 75–90 minutes",
        "Limited availability — reserve early",
      ],
      url: "https://sotervineyards.com/visit/",
    },
    {
      name: "Private Estate Experience",
      price: "$125",
      description:
        "An intimate, guided tour of Mineral Springs Ranch followed by an extended tasting with the winemaking team. Explore the biodynamic vineyard, caves, and cellar.",
      details: [
        "Vineyard walk and cellar tour",
        "7+ wines including barrel samples",
        "Small bites paired to the wines",
        "Allow 2 hours",
        "Maximum 6 guests — by appointment",
      ],
      url: "https://sotervineyards.com/visit/",
    },
  ],

  hours: {
    address: "10880 NE Mineral Springs Road, Carlton, OR 97111",
    phone: "(503) 662-5600",
    hours: "Daily 11:00 AM – 4:00 PM (by reservation)",
    website: "https://sotervineyards.com",
    ava: "Yamhill-Carlton AVA (Mineral Springs Ranch estate)",
    directionsFromPortland: [
      "Take US-26 West to OR-6 West toward Tillamook, then south on OR-47 to Carlton. Turn east on Mineral Springs Road. Approximately 55 minutes.",
      "Alternatively, take OR-99W southwest through Newberg and Dundee to Carlton, then north on Mineral Springs Road. Approximately 65 minutes but passes through Willamette Valley wine country.",
    ],
    note: "Soter operates by reservation only. The estate is a working biodynamic farm — please stay on designated paths. Well-behaved dogs are welcome in outdoor areas.",
  },

  club: {
    tiers: [
      {
        name: "Cellar Club",
        bottles: "6 bottles",
        frequency: "2 shipments per year (Spring & Fall)",
        discount: "15% discount on all purchases",
        perks: [
          "15% discount on all wine purchases",
          "Complimentary tastings for member + 3 guests",
          "First access to new releases and limited wines",
          "Invitations to member-only events at the estate",
          "Access to library wines",
          "Complimentary shipping on orders of 6+ bottles",
        ],
        highlight: true,
      },
      {
        name: "Founders Club",
        bottles: "12 bottles",
        frequency: "2 shipments per year (Spring & Fall)",
        discount: "20% discount on all purchases",
        perks: [
          "20% discount on all wine purchases",
          "Complimentary tastings for member + 5 guests",
          "Priority allocation of all limited and library wines",
          "Private tastings and vineyard experiences",
          "Invitations to exclusive harvest and barrel events",
          "Complimentary ground shipping on all orders",
          "Annual Founders dinner at Mineral Springs Ranch",
        ],
      },
    ],
    sharedBenefits: [
      "Discount on all wine purchases",
      "Complimentary tastings",
      "Access to limited wines",
      "Member-only events at the estate",
      "Library wine access",
    ],
  },

  pairings: {
    pairings: [
      {
        wine: "Mineral Springs Pinot Noir",
        varietal: "pinot-noir",
        foods: [
          "Roasted duck breast",
          "Wild mushroom risotto",
          "Herb-crusted lamb",
          "Gruyère and aged Comté",
          "Seared salmon",
          "Truffle dishes",
        ],
        note: "The estate Pinot Noir's earthy complexity, fine tannins, and bright acidity make it a versatile companion for both rich meats and umami-driven dishes.",
      },
      {
        wine: "Brut Rosé Sparkling",
        varietal: "sparkling",
        foods: [
          "Oysters on the half shell",
          "Smoked salmon",
          "Soft-ripened cheese",
          "Charcuterie",
          "Sushi and sashimi",
          "Strawberry desserts",
        ],
        note: "Soter's Brut Rosé offers a beautiful balance of bright acidity and delicate red fruit that elevates everything from raw shellfish to celebration cakes.",
      },
      {
        wine: "North Valley Pinot Noir",
        varietal: "pinot-noir",
        foods: [
          "Roasted chicken",
          "Pork tenderloin",
          "Grilled vegetables",
          "Pizza and flatbreads",
          "Aged cheddar",
          "Pasta with red sauce",
        ],
        note: "North Valley is Soter's most approachable Pinot Noir — a crowd-pleasing red that pairs as well with weeknight pasta as it does with Sunday roast.",
      },
    ],
    philosophy:
      "At Soter, biodynamic farming is not just a viticultural practice — it informs how we think about food and wine together. Our wines are grown in harmony with the land, and they come alive at the table with ingredients treated the same way. We favor local, seasonal, and sustainably sourced ingredients that honor the same principles we bring to the vineyard.",
  },

  recipes: [
    {
      title: "Wild Mushroom Risotto with Truffle Oil",
      winePairing: "Mineral Springs Pinot Noir",
      wineNote: "The earthy, forest-floor character of the estate Pinot Noir mirrors the truffle and mushroom flavors perfectly.",
      description:
        "Creamy arborio risotto with a medley of wild mushrooms — chanterelles, porcini, and oyster mushrooms — finished with truffle oil and Parmigiano-Reggiano.",
      serves: "4 servings",
      time: "45 min",
      keyIngredients: ["Arborio rice", "Wild mushrooms", "Truffle oil", "Parmigiano-Reggiano", "Shallots", "White wine"],
    },
    {
      title: "Herb-Crusted Rack of Lamb",
      winePairing: "Mineral Springs Pinot Noir",
      wineNote: "The structured tannins and herbal notes of the estate Pinot Noir stand up beautifully to lamb's richness.",
      description:
        "Frenched rack of lamb coated in a Dijon mustard crust of fresh herbs, breadcrumbs, and garlic, roasted to pink perfection.",
      serves: "4 servings",
      time: "50 min",
      keyIngredients: ["Rack of lamb", "Dijon mustard", "Fresh rosemary", "Fresh thyme", "Garlic", "Panko breadcrumbs"],
    },
    {
      title: "Smoked Salmon Blini with Crème Fraîche",
      winePairing: "Brut Rosé",
      wineNote: "The bright acidity and delicate fruit of the Brut Rosé cuts through the richness of smoked salmon perfectly.",
      description:
        "Buckwheat blini topped with house-cured smoked salmon, crème fraîche, capers, and fresh dill. An elegant appetizer for sparkling wine.",
      serves: "6 servings",
      time: "30 min",
      keyIngredients: ["Smoked salmon", "Buckwheat flour", "Crème fraîche", "Capers", "Fresh dill", "Lemon"],
    },
    {
      title: "Roasted Beet & Chèvre Salad",
      winePairing: "North Valley Pinot Noir",
      wineNote: "The earthy sweetness of roasted beets and bright fruit of North Valley Pinot are natural partners.",
      description:
        "Roasted golden and red beets with creamy chèvre, toasted hazelnuts, arugula, and a sherry vinaigrette.",
      serves: "4 servings",
      time: "60 min",
      keyIngredients: ["Red and golden beets", "Chèvre", "Hazelnuts", "Arugula", "Sherry vinegar", "Olive oil"],
    },
  ],
};
