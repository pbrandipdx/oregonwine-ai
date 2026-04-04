/* ── Rex Hill winery content for standalone info pages ── */

export interface TastingOption {
  name: string;
  price: string;
  description: string;
  details: string[];
  highlight?: boolean;
}

export interface HoursDirections {
  address: string;
  phone: string;
  hours: string;
  website: string;
  ava: string;
  directionsFromPortland: string[];
  note: string;
}

export interface ClubTier {
  name: string;
  bottles: string;
  frequency: string;
  discount: string;
  perks: string[];
  highlight?: boolean;
}

export interface ClubInfo {
  tiers: ClubTier[];
  sharedBenefits: string[];
}

export interface WinePairing {
  wine: string;
  varietal: string;
  foods: string[];
  note: string;
}

export interface PairingInfo {
  pairings: WinePairing[];
  philosophy: string;
}

export interface Recipe {
  title: string;
  description: string;
  serves: string;
  time: string;
  keyIngredients: string[];
  winePairing: string;
  wineNote: string;
  url?: string;
}

export interface RexHillContent {
  tastings: TastingOption[];
  hours: HoursDirections;
  club: ClubInfo;
  pairings: PairingInfo;
  recipes: Recipe[];
}

export const REX_HILL_CONTENT: RexHillContent = {
  tastings: [
    {
      name: "Classic Flight",
      price: "$45",
      description:
        "A guided journey through five current-release wines showcasing the diversity of the Willamette Valley.",
      details: [
        "5 current-release wines",
        "90-minute seated experience",
        "Indoor or outdoor seating",
        "Complimentary for club members",
      ],
    },
    {
      name: "Library Flight",
      price: "$70",
      description:
        "Explore rare and aged wines drawn from the Rex Hill cellar, revealing how Oregon Pinot Noir evolves over time.",
      details: [
        "Rare and aged library selections",
        "Guided by a wine educator",
        "Limited availability",
      ],
    },
    {
      name: "Sensory Experience",
      price: "$80",
      description:
        "An interactive, educational exploration of aroma, flavor, and terroir designed to sharpen your palate.",
      details: [
        "Hands-on sensory exercises",
        "Educational deep-dive",
        "Ideal for curious wine lovers",
      ],
      highlight: true,
    },
    {
      name: "Bottles & Boards",
      price: "$80",
      description:
        "Wine and artisan charcuterie paired together for a convivial group tasting experience.",
      details: [
        "Wine + charcuterie pairing",
        "Groups of 7 or more",
        "Perfect for celebrations",
      ],
    },
    {
      name: "Cellar Tour & Tasting",
      price: "$100",
      description:
        "Go behind the scenes with a guided tour of the winery and cellar, followed by a reserve wine tasting.",
      details: [
        "Behind-the-scenes winery tour",
        "Reserve wine tasting",
        "Small-group format",
      ],
      highlight: true,
    },
  ],

  hours: {
    address: "30835 N Hwy 99W, Newberg, OR 97132",
    phone: "(503) 538-0666",
    hours: "Daily 10am - 5pm (hours may vary seasonally)",
    website: "https://rexhill.com",
    ava: "Chehalem Mountains AVA",
    directionsFromPortland: [
      "Via I-5 South: Take I-5 S to exit 294, then OR-99W through Dundee to Newberg. Approximately 45 minutes.",
      "Scenic Route: Take Hwy 219 through wine country for a more leisurely drive past rolling vineyards.",
    ],
    note: "All tastings are seated. Advance reservations are required.",
  },

  club: {
    tiers: [
      {
        name: "Cellar Club",
        bottles: "6 bottles",
        frequency: "2 allocations per year",
        discount: "$216 - $408 per fulfillment",
        perks: [
          "20% savings on wines",
          "Complimentary tastings",
          "First access to new releases",
          "Exclusive member events",
          "Carbon-neutral shipping options",
        ],
      },
      {
        name: "Crown Club",
        bottles: "12 bottles",
        frequency: "2 allocations per year",
        discount: "$432 - $900 per fulfillment",
        perks: [
          "20% savings on wines",
          "Customizable selections",
          "Focus on Willamette Valley Pinot Noirs",
          "Complimentary tastings for member + guests",
          "Exclusive events and first access",
        ],
        highlight: true,
      },
      {
        name: "Collector's Club",
        bottles: "12 bottles",
        frequency: "5 allocations per year",
        discount: "$432 - $900 per fulfillment",
        perks: [
          "Priority access to limited-production wines",
          "Exclusive library selections",
          "Large format bottles",
          "All Crown Club benefits",
          "Dedicated concierge",
          "Private tasting experiences",
        ],
      },
    ],
    sharedBenefits: [
      "20% savings on wines",
      "Complimentary tastings",
      "First access to new releases",
      "Exclusive member events",
      "Carbon-neutral shipping",
    ],
  },

  pairings: {
    pairings: [
      {
        wine: "Pinot Noir",
        varietal: "pinot-noir",
        foods: [
          "Duck breast",
          "Wild salmon",
          "Mushroom risotto",
          "Grilled lamb",
          "Aged Gruyere",
          "Roasted beets",
        ],
        note: "Oregon Pinot Noir's bright acidity and earthy undertones make it exceptionally versatile at the table.",
      },
      {
        wine: "Chardonnay",
        varietal: "chardonnay",
        foods: [
          "Lobster",
          "Roast chicken",
          "Creamy pasta",
          "Brie",
          "Halibut",
          "Corn chowder",
        ],
        note: "The Willamette Valley Chardonnay balances richness and minerality, pairing beautifully with buttery and creamy dishes.",
      },
      {
        wine: "Rose",
        varietal: "rose",
        foods: [
          "Charcuterie",
          "Goat cheese salad",
          "Thai cuisine",
          "Grilled shrimp",
          "Summer vegetables",
          "Strawberry desserts",
        ],
        note: "Dry and refreshing, Rex Hill Rose is a natural match for light, bright, and aromatic fare.",
      },
    ],
    philosophy:
      "At Rex Hill, food and wine pairing is guided by a simple principle: great wine elevates a meal, and great food reveals new dimensions in wine. We favor pairings that honor the terroir-driven character of Willamette Valley wines -- bright acidity, earthy complexity, and elegant structure.",
  },

  recipes: [
    {
      title: "Cedar Plank Salmon",
      url: "https://rexhill.com/recipes/cedar-plank-salmon/",
      description:
        "Salmon on cedar with summer vegetables, finished with Saba for a sweet, deep brightness that bridges beautifully with Pinot Noir.",
      serves: "4",
      time: "30 minutes",
      keyIngredients: [
        "Skin-on salmon fillets",
        "Untreated cedar plank",
        "Fresh corn and white beans",
        "Cherry tomatoes",
        "Saba (reduced grape must)",
      ],
      winePairing: "Rex Hill Sims Vineyard Pinot Noir",
      wineNote:
        "The Sims Vineyard Pinot's bright acidity and earthy undertones complement the cedar-kissed salmon and summer vegetables.",
    },
    {
      title: "Beef & Barley Stew with Mushrooms",
      url: "https://rexhill.com/recipes/beef-barley-stew-with-mushrooms/",
      description:
        "A crowd-pleaser that looks much more complicated and impressive than it actually is to prepare. Gochugaru adds a warm, subtle heat.",
      serves: "6",
      time: "2 hours",
      keyIngredients: [
        "Beef brisket",
        "Barley and mushrooms",
        "Fennel and carrots",
        "Gochugaru (Korean red chili)",
        "Rex Hill Pinot Noir",
      ],
      winePairing: "Rex Hill Willamette Valley Pinot Noir",
      wineNote:
        "The Pinot's earthy complexity and soft tannins mirror the stew's depth while the wine's acidity cuts through the richness.",
    },
    {
      title: "Seared Rack of Lamb",
      url: "https://rexhill.com/recipes/seared-rack-of-lamb/",
      description:
        "Provence-inspired pastured lamb with a layered summer vegetable tian and an olive relish that brings bright, briny contrast.",
      serves: "4",
      time: "45 minutes",
      keyIngredients: [
        "Rack of lamb",
        "Eggplant, zucchini, and tomatoes",
        "Green and black olives",
        "Fresh thyme and rosemary",
        "Basil",
      ],
      winePairing: "Rex Hill Shea Vineyard Pinot Noir",
      wineNote:
        "The Shea Vineyard Pinot's structure and dark fruit intensity stand up beautifully to the richness of the lamb.",
    },
    {
      title: "Kale & Taleggio Risotto",
      url: "https://rexhill.com/recipes/kale_risotto/",
      description:
        "Rich, unctuous risotto with melted Taleggio and hearty kale -- an unbeatable side dish with grilled steak.",
      serves: "4",
      time: "40 minutes",
      keyIngredients: [
        "Arborio rice",
        "Taleggio cheese",
        "Kale",
        "Dry white wine",
        "Butter and garlic",
      ],
      winePairing: "Rex Hill Willamette Valley Pinot Noir",
      wineNote:
        "The Pinot's bright acidity and earthy notes cut through the richness of the Taleggio while complementing the kale.",
    },
  ],
};
