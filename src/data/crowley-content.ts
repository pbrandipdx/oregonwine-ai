/* ── Crowley Wines winery content for standalone info pages ── */

import type {
  TastingOption,
  HoursDirections,
  ClubInfo,
  PairingInfo,
  Recipe,
} from "./rex-hill-content";

export interface CrowleyContent {
  tastings: TastingOption[];
  hours: HoursDirections;
  club: ClubInfo;
  pairings: PairingInfo;
  recipes: Recipe[];
}

export const CROWLEY_CONTENT: CrowleyContent = {
  tastings: [
    {
      name: "Barrel Room Wine Tasting",
      price: "By reservation",
      description:
        "Tour the winery and barrel program with barrel samples and 3-4 current release wines. An intimate look at how Crowley's minimal-intervention wines come to life.",
      details: [
        "Tour of winery and barrel program",
        "Barrel sample tastings",
        "3-4 current release wines",
        "Allow 60 minutes",
        "Maximum 6 guests",
      ],
      highlight: true,
    },
  ],

  hours: {
    address: "14000 NE Quarry Road, Newberg, OR 97132",
    phone: "(503) 272-1369",
    hours: "By reservation only",
    website: "https://crowleywines.com",
    ava: "Willamette Valley (vineyards in McMinnville, Dundee Hills, Eola-Amity Hills)",
    directionsFromPortland: [
      "Take OR-99W southwest through Tigard and Sherwood to Newberg. The winery is at August Cellars Cooperative on Quarry Road. Approximately 35 minutes.",
      "From I-5 South, exit at Wilsonville and follow Wilsonville Road west to Newberg-Dundee Bypass, then north into Newberg.",
    ],
    note: "Crowley is a small winery working out of a cooperative. Visits are by reservation only. Contact info@crowleywines.com or call ahead.",
  },

  club: {
    tiers: [
      {
        name: "12-Bottle Club",
        bottles: "12 bottles",
        frequency: "2 shipments per year (Spring & Fall)",
        discount: "$332-$714 per shipment",
        perks: [
          "15% discount on all purchases",
          "Free ground shipping on shipments and 6+ bottle orders",
          "4 complimentary tastings annually",
          "Member + 2 guests at winery events",
          "Highest priority for limited and library wines",
          "Customizable shipments via member portal",
        ],
        highlight: true,
      },
      {
        name: "6-Bottle Club",
        bottles: "6 bottles",
        frequency: "2 shipments per year (Spring & Fall)",
        discount: "$332-$357 per shipment + shipping",
        perks: [
          "15% discount on all purchases",
          "2 complimentary tastings annually",
          "Member admission to winery events",
          "Priority access to limited offerings",
          "Customizable shipments via member portal",
        ],
      },
    ],
    sharedBenefits: [
      "15% discount on all purchases",
      "Complimentary tastings",
      "Priority access to limited offerings",
      "Winery event access",
      "Customizable shipments via member portal",
    ],
  },

  pairings: {
    pairings: [
      {
        wine: "Pinot Noir",
        varietal: "pinot-noir",
        foods: [
          "Wild salmon",
          "Roasted duck",
          "Chanterelle mushrooms",
          "Herb-roasted chicken",
          "Aged Comte",
          "Charcuterie",
        ],
        note: "Crowley Pinot Noir's lower alcohol, earthy complexity, and bright acidity make it a natural companion to Pacific Northwest cuisine.",
      },
      {
        wine: "Chardonnay",
        varietal: "chardonnay",
        foods: [
          "Oysters on the half shell",
          "Dungeness crab",
          "Roasted halibut",
          "Goat cheese",
          "Roasted chicken",
          "Risotto",
        ],
        note: "The Chablis-like minerality and lean structure of Crowley Chardonnay pairs beautifully with shellfish and lighter preparations.",
      },
    ],
    philosophy:
      "At Crowley, we believe in purity of expression over stylized wines. Our minimal-intervention approach produces wines with natural freshness, lower alcohols, and bright acidity -- qualities that make them inherently food-friendly. The best pairings let the terroir speak.",
  },

  recipes: [],
};
