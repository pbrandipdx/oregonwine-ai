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
      title: "Wine-Braised Short Ribs",
      description:
        "Slow-braised beef short ribs in a rich Pinot Noir reduction with root vegetables and fresh herbs.",
      serves: "4",
      time: "3.5 hours",
      keyIngredients: [
        "Bone-in short ribs",
        "Rex Hill Pinot Noir",
        "Carrots and parsnips",
        "Fresh thyme and bay leaf",
        "Beef stock",
      ],
      winePairing: "Rex Hill Willamette Valley Pinot Noir",
      wineNote:
        "The wine's acidity cuts through the richness of the braised beef while its earthy notes complement the root vegetables.",
    },
    {
      title: "Pan-Seared Salmon",
      description:
        "Wild-caught salmon with a crispy skin, served over lentils with a beurre blanc sauce.",
      serves: "2",
      time: "35 minutes",
      keyIngredients: [
        "Wild salmon fillets",
        "French green lentils",
        "Shallots and butter",
        "Rex Hill Chardonnay",
        "Fresh dill",
      ],
      winePairing: "Rex Hill Willamette Valley Chardonnay",
      wineNote:
        "The Chardonnay's citrus and mineral notes mirror the beurre blanc while complementing the richness of the salmon.",
    },
    {
      title: "Wild Mushroom Risotto",
      description:
        "Creamy Arborio rice with a medley of foraged mushrooms, finished with Parmigiano-Reggiano.",
      serves: "4",
      time: "45 minutes",
      keyIngredients: [
        "Arborio rice",
        "Mixed wild mushrooms",
        "Parmigiano-Reggiano",
        "White wine",
        "Vegetable stock",
      ],
      winePairing: "Rex Hill Jacob-Hart Vineyard Pinot Noir",
      wineNote:
        "The vineyard-designate Pinot's forest-floor character and silky texture are a natural match for earthy mushrooms.",
    },
    {
      title: "Artisan Charcuterie Board",
      description:
        "A curated spread of cured meats, aged cheeses, seasonal fruit, honeycomb, and crusty bread.",
      serves: "6-8",
      time: "20 minutes",
      keyIngredients: [
        "Prosciutto and sopressata",
        "Aged Gouda and Manchego",
        "Seasonal fruit",
        "Honeycomb",
        "Marcona almonds",
      ],
      winePairing: "Rex Hill Rose of Pinot Noir",
      wineNote:
        "The Rose's crisp acidity and red-fruit character bridge the gap between rich meats and tangy cheeses.",
    },
  ],
};
