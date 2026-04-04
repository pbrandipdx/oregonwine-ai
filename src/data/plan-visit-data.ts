/**
 * Plan My Visit — trip planner data.
 * Wineries tagged with season, group size, experience level, and strength attributes.
 */

/* ── Types ── */

export type Season = "spring" | "summer" | "harvest" | "winter";
export type GroupSize = "couple" | "small" | "large";
export type ExperienceLevel = "beginner" | "intermediate" | "expert";
export type Priority = "views" | "winemakers" | "food" | "best-wines";

export interface PlanVisitQuestion {
  id: string;
  question: string;
  options: PlanVisitOption[];
}

export interface PlanVisitOption {
  label: string;
  value: string;
}

export interface Winery {
  id: string;
  name: string;
  ava: string;
  region: "north" | "central" | "south";
  focus: "red" | "white" | "both";
  seasons: Season[];
  groupSizes: GroupSize[];
  experienceLevels: ExperienceLevel[];
  strengths: Priority[];
  description: string;
  seasonTip: Partial<Record<Season, string>>;
  practicalTip: string;
}

export interface LunchSpot {
  name: string;
  region: "north" | "central" | "south";
  description: string;
  tip: string;
}

/* ── Questions ── */

export const QUESTIONS: PlanVisitQuestion[] = [
  {
    id: "season",
    question: "When are you visiting?",
    options: [
      { label: "Spring (April\u2013May)", value: "spring" },
      { label: "Summer (June\u2013August)", value: "summer" },
      { label: "Harvest season (Sept\u2013Oct)", value: "harvest" },
      { label: "Winter (Nov\u2013March)", value: "winter" },
    ],
  },
  {
    id: "group",
    question: "How many people?",
    options: [
      { label: "Just two of us", value: "couple" },
      { label: "Small group (3\u20136)", value: "small" },
      { label: "Larger group (7+)", value: "large" },
    ],
  },
  {
    id: "experience",
    question: "Wine experience level?",
    options: [
      { label: "New to wine \u2014 keep it approachable", value: "beginner" },
      { label: "We know what we like \u2014 show us the good stuff", value: "intermediate" },
      { label: "Wine nerds \u2014 go deep", value: "expert" },
    ],
  },
  {
    id: "priority",
    question: "What matters most?",
    options: [
      { label: "Beautiful views and scenery", value: "views" },
      { label: "Meeting winemakers and hearing stories", value: "winemakers" },
      { label: "Great food pairings with wine", value: "food" },
      { label: "Tasting the absolute best wines", value: "best-wines" },
    ],
  },
];

/* ── Wineries ── */

export const WINERIES: Winery[] = [
  {
    id: "domaine-drouhin",
    name: "Domaine Drouhin Oregon",
    ava: "Dundee Hills",
    region: "central",
    focus: "red",
    seasons: ["spring", "summer", "harvest", "winter"],
    groupSizes: ["couple", "small"],
    experienceLevels: ["intermediate", "expert"],
    strengths: ["best-wines", "views"],
    description:
      "Burgundy pedigree meets Oregon terroir. The gravity-flow winery carved into the hillside is an engineering marvel, and the Pinot Noir is world-class.",
    seasonTip: {
      spring: "Wildflowers blanket the hillside vineyards in April.",
      harvest: "Book ahead \u2014 harvest tours fill fast and are unforgettable.",
    },
    practicalTip: "Reservations required. Allow 60\u201375 minutes for the estate tasting.",
  },
  {
    id: "stoller",
    name: "Stoller Family Estate",
    ava: "Dundee Hills",
    region: "central",
    focus: "both",
    seasons: ["spring", "summer", "harvest", "winter"],
    groupSizes: ["couple", "small", "large"],
    experienceLevels: ["beginner", "intermediate"],
    strengths: ["views", "food"],
    description:
      "Stunning LEED-certified tasting room with panoramic vineyard views. The wine-and-food pairings here are some of the best in the valley.",
    seasonTip: {
      summer: "Grab a table on the patio \u2014 sunset views are spectacular.",
      winter: "Cozy fireside tastings with seasonal food pairings.",
    },
    practicalTip: "Great for groups. The food pairing experience is worth the upgrade.",
  },
  {
    id: "elk-cove",
    name: "Elk Cove Vineyards",
    ava: "Yamhill-Carlton",
    region: "north",
    focus: "both",
    seasons: ["spring", "summer", "harvest", "winter"],
    groupSizes: ["couple", "small", "large"],
    experienceLevels: ["beginner", "intermediate"],
    strengths: ["views", "winemakers"],
    description:
      "Five decades of family winemaking with some of the prettiest vineyard views in the valley. Known for accessible, delicious Pinot Noir and standout Pinot Gris.",
    seasonTip: {
      spring: "The estate is lush and green \u2014 perfect for a walk through the vines.",
      summer: "Outdoor seating overlooks rolling hills. Bring sunglasses.",
    },
    practicalTip: "Walk-ins welcome for small groups. Larger groups should reserve ahead.",
  },
  {
    id: "cristom",
    name: "Cristom Vineyards",
    ava: "Eola-Amity Hills",
    region: "south",
    focus: "red",
    seasons: ["spring", "summer", "harvest", "winter"],
    groupSizes: ["couple", "small"],
    experienceLevels: ["intermediate", "expert"],
    strengths: ["winemakers", "best-wines"],
    description:
      "Biodynamic, whole-cluster, native-yeast Pinot Noir from volcanic soils. The single-vineyard wines here are among Oregon\u2019s finest, and the team loves to go deep.",
    seasonTip: {
      harvest: "If you can visit during crush, the energy is electric.",
      winter: "Quiet cellar tastings with serious attention from the team.",
    },
    practicalTip: "Appointment only. Come with questions \u2014 the staff are passionate educators.",
  },
  {
    id: "brooks",
    name: "Brooks Wine",
    ava: "Eola-Amity Hills",
    region: "south",
    focus: "both",
    seasons: ["spring", "summer", "harvest"],
    groupSizes: ["couple", "small", "large"],
    experienceLevels: ["beginner", "intermediate"],
    strengths: ["views", "food", "winemakers"],
    description:
      "Joyful, biodynamic wines in a stunning hilltop setting. The restaurant serves seasonal dishes designed around the wines, and the Riesling is a revelation.",
    seasonTip: {
      summer: "The outdoor terrace is one of the best lunch spots in wine country.",
      spring: "Ask about the biodynamic vineyard walk \u2014 it\u2019s eye-opening.",
    },
    practicalTip: "The restaurant is fantastic \u2014 reserve a table if you want the food pairing.",
  },
  {
    id: "eyrie",
    name: "The Eyrie Vineyards",
    ava: "Dundee Hills",
    region: "central",
    focus: "both",
    seasons: ["spring", "summer", "harvest", "winter"],
    groupSizes: ["couple", "small"],
    experienceLevels: ["expert"],
    strengths: ["winemakers", "best-wines"],
    description:
      "Where Oregon Pinot Noir began in 1965. David Lett\u2019s legacy lives on in ethereal, translucent wines of haunting complexity. A pilgrimage for serious wine lovers.",
    seasonTip: {
      winter: "Intimate winter tastings with Jason Lett are unforgettable.",
      harvest: "Old-vine fruit coming in \u2014 a rare glimpse of history in action.",
    },
    practicalTip: "Tasting room in McMinnville. Appointment recommended for library wines.",
  },
  {
    id: "penner-ash",
    name: "Penner-Ash Wine Cellars",
    ava: "Yamhill-Carlton",
    region: "north",
    focus: "red",
    seasons: ["spring", "summer", "harvest", "winter"],
    groupSizes: ["couple", "small"],
    experienceLevels: ["intermediate", "expert"],
    strengths: ["views", "best-wines"],
    description:
      "Lynn Penner-Ash crafts bold, structured Pinot Noir from top vineyard sites. The modern tasting room perches on a hillside with sweeping views of the Coast Range.",
    seasonTip: {
      summer: "The terrace views at golden hour are worth planning your day around.",
      harvest: "Ask about single-vineyard releases \u2014 they go fast.",
    },
    practicalTip: "Reservations recommended. The estate flight is the way to go.",
  },
  {
    id: "adelsheim",
    name: "Adelsheim Vineyard",
    ava: "Chehalem Mountains",
    region: "north",
    focus: "both",
    seasons: ["spring", "summer", "harvest", "winter"],
    groupSizes: ["couple", "small", "large"],
    experienceLevels: ["beginner", "intermediate", "expert"],
    strengths: ["winemakers", "views"],
    description:
      "One of Oregon\u2019s founding wineries, Adelsheim combines four decades of experience with a warm, welcoming tasting room. Excellent Pinot Noir, Chardonnay, and Pinot Gris across all price points.",
    seasonTip: {
      spring: "The Chehalem Mountain wildflower bloom is gorgeous from the tasting room deck.",
      winter: "Cozy winter tastings with deep-library pours.",
    },
    practicalTip: "Walk-ins welcome. One of the best tasting experiences for mixed groups.",
  },
  {
    id: "sokol-blosser",
    name: "Sokol Blosser Winery",
    ava: "Dundee Hills",
    region: "central",
    focus: "both",
    seasons: ["spring", "summer", "harvest", "winter"],
    groupSizes: ["couple", "small", "large"],
    experienceLevels: ["beginner", "intermediate"],
    strengths: ["views", "food"],
    description:
      "Pioneering organic and sustainable winery with a gorgeous hilltop tasting room. Known for approachable Pinot Noir and the iconic Evolution series.",
    seasonTip: {
      summer: "Grab a flight and sit on the deck \u2014 the valley views stretch for miles.",
      harvest: "The vineyard hike during harvest is a must-do.",
    },
    practicalTip: "Great first stop. The outdoor space is excellent for groups.",
  },
  {
    id: "roco",
    name: "ROCO Winery",
    ava: "Chehalem Mountains",
    region: "north",
    focus: "both",
    seasons: ["spring", "summer", "harvest", "winter"],
    groupSizes: ["couple", "small"],
    experienceLevels: ["intermediate", "expert"],
    strengths: ["best-wines", "winemakers"],
    description:
      "Rollin Soles brings decades of sparkling and still wine expertise. The Chehalem Mountain Chardonnay and sparkling wines are exceptional \u2014 true hidden gems.",
    seasonTip: {
      spring: "Sparkling wine season \u2014 the brut ros\u00e9 paired with spring weather is perfection.",
      winter: "Intimate barrel tastings with Rollin himself.",
    },
    practicalTip: "Appointment only. Ask about the sparkling wine program \u2014 it\u2019s world-class.",
  },
  {
    id: "bergstrom",
    name: "Bergstr\u00f6m Wines",
    ava: "Dundee Hills",
    region: "central",
    focus: "red",
    seasons: ["spring", "summer", "harvest", "winter"],
    groupSizes: ["couple", "small"],
    experienceLevels: ["expert"],
    strengths: ["best-wines", "winemakers"],
    description:
      "Biodynamic farming and meticulous winemaking produce some of Oregon\u2019s most sought-after single-vineyard Pinot Noirs. Deep, complex, and profoundly terroir-driven.",
    seasonTip: {
      harvest: "Harvest is electric here \u2014 small lots, hand-sorted, no shortcuts.",
      spring: "The biodynamic vineyards come alive with cover crops and wildflowers.",
    },
    practicalTip: "Appointment required. Allow 90 minutes for the full experience.",
  },
  {
    id: "anne-amie",
    name: "Anne Amie Vineyards",
    ava: "Yamhill-Carlton",
    region: "north",
    focus: "both",
    seasons: ["spring", "summer", "harvest"],
    groupSizes: ["couple", "small", "large"],
    experienceLevels: ["beginner", "intermediate"],
    strengths: ["views", "food"],
    description:
      "A beautiful estate with jaw-dropping views and a diverse wine lineup. Known for excellent Pinot Blanc and M\u00fcller-Thurgau alongside Pinot Noir. The terrace is perfect for long afternoons.",
    seasonTip: {
      summer: "The sunset terrace experience is one of the valley\u2019s best-kept secrets.",
      spring: "Wildflower season makes the hillside vineyards pop with color.",
    },
    practicalTip: "Great for groups and celebrations. Reserve the terrace if visiting in summer.",
  },
  {
    id: "lingua-franca",
    name: "Lingua Franca",
    ava: "Eola-Amity Hills",
    region: "south",
    focus: "both",
    seasons: ["spring", "summer", "harvest", "winter"],
    groupSizes: ["couple", "small"],
    experienceLevels: ["expert"],
    strengths: ["best-wines", "winemakers"],
    description:
      "Master Sommelier Larry Stone\u2019s passion project with winemaker Thomas Savre. Burgundy-inspired Chardonnay and Pinot Noir of extraordinary precision. For those who want to taste the future of Oregon wine.",
    seasonTip: {
      harvest: "The team is hands-on during harvest \u2014 you might meet Thomas in the cellar.",
      winter: "Quiet, focused tastings with deep dives into terroir.",
    },
    practicalTip: "Appointment required. The Chardonnay here rivals top white Burgundy.",
  },
  {
    id: "willamette-valley-vineyards",
    name: "Willamette Valley Vineyards",
    ava: "Salem Hills",
    region: "south",
    focus: "both",
    seasons: ["spring", "summer", "harvest", "winter"],
    groupSizes: ["couple", "small", "large"],
    experienceLevels: ["beginner", "intermediate"],
    strengths: ["views", "food"],
    description:
      "One of the valley\u2019s most welcoming wineries with expansive views, a full restaurant, and approachable wines at every price point. A crowd-pleaser in the best sense.",
    seasonTip: {
      summer: "The outdoor dining area with valley views is hard to beat.",
      winter: "Fireside tastings and hearty food pairings make winter visits special.",
    },
    practicalTip: "No reservation needed for tastings. The restaurant is great for lunch.",
  },
  {
    id: "evening-land",
    name: "Evening Land Vineyards",
    ava: "Eola-Amity Hills",
    region: "south",
    focus: "both",
    seasons: ["spring", "summer", "harvest", "winter"],
    groupSizes: ["couple", "small"],
    experienceLevels: ["intermediate", "expert"],
    strengths: ["best-wines", "winemakers"],
    description:
      "Seven Springs Vineyard produces hauntingly beautiful Pinot Noir and Chardonnay. Rajat Parr\u2019s minimalist winemaking lets the ancient volcanic soils speak clearly.",
    seasonTip: {
      spring: "The Van Duzer winds start up \u2014 feel the terroir on your skin.",
      harvest: "Seven Springs during crush is one of Oregon\u2019s great wine experiences.",
    },
    practicalTip: "By appointment. The Seven Springs single-vineyard wines are the priority.",
  },
];

/* ── Lunch spots ── */

export const LUNCH_SPOTS: LunchSpot[] = [
  {
    name: "The Joel Palmer House",
    region: "central",
    description: "Wild mushroom-focused fine dining in a historic Dayton house. Legendary truffle dishes paired perfectly with Pinot Noir.",
    tip: "Reservations essential, especially weekends. The mushroom bisque is a must.",
  },
  {
    name: "Red Hills Market",
    region: "central",
    description: "Casual, delicious deli and pizzeria in the heart of Dundee. Great sandwiches, wood-fired pizza, and local wines by the glass.",
    tip: "Perfect for a quick, relaxed lunch between tastings. Outdoor seating available.",
  },
  {
    name: "Recipe (A Gathering Place)",
    region: "central",
    description: "Farm-to-table comfort food in downtown Newberg. Seasonal menus that highlight Willamette Valley ingredients.",
    tip: "Walk-in friendly at lunch. The seasonal salads are outstanding.",
  },
  {
    name: "Jory at The Allison Inn",
    region: "central",
    description: "Elegant farm-to-table dining at the valley\u2019s finest resort. Impeccable wine list and stunning grounds.",
    tip: "Splurge-worthy for special occasions. Reserve well in advance.",
  },
  {
    name: "Community Plate",
    region: "north",
    description: "Bright, seasonal brunch and lunch spot in McMinnville\u2019s charming downtown. Locally sourced everything.",
    tip: "Popular on weekends \u2014 arrive early or expect a short wait.",
  },
  {
    name: "Nick\u2019s Italian Caf\u00e9",
    region: "north",
    description: "A McMinnville institution since 1977. Handmade pasta and a wine list that reads like a love letter to Oregon.",
    tip: "Dinner is the main event, but lunch is more relaxed and just as good.",
  },
  {
    name: "Thistle",
    region: "north",
    description: "Intimate farm-to-table restaurant in McMinnville with a daily-changing menu. Thoughtful, creative cooking.",
    tip: "Small space, big flavors. Check their hours \u2014 they keep a limited schedule.",
  },
  {
    name: "Barberry Restaurant",
    region: "south",
    description: "Modern Pacific Northwest cuisine in a warm Salem-area setting. Great local wine selection and seasonal plates.",
    tip: "Good midday stop if you\u2019re touring the Eola-Amity Hills.",
  },
];

/* ── Day tips by answer combination ── */

export interface DayTips {
  driving: string;
  pacing: string;
  booking: string;
  seasonal: Record<Season, string>;
}

export const DAY_TIPS: DayTips = {
  driving: "Designate a driver or book a wine tour service. The valley roads are beautiful but winding.",
  pacing: "Three to four wineries is the sweet spot. Sip, don\u2019t chug \u2014 use the dump buckets without guilt.",
  booking: "Most wineries prefer reservations, especially on weekends. Book at least a week ahead in summer and harvest.",
  seasonal: {
    spring: "Bring layers \u2014 mornings are cool and misty, afternoons can warm up fast. Roads may be muddy near vineyard access points.",
    summer: "Start early to beat the heat. Bring sunscreen, sunglasses, and water. Many tasting rooms have AC, but patios get warm by 2 PM.",
    harvest: "This is the busiest and most exciting time. Book everything in advance. You\u2019ll see crush activity and smell fermenting grapes in the air.",
    winter: "Tasting rooms are quieter and more intimate. Some have reduced hours \u2014 call ahead. Rain gear is essential, but the wines taste better by the fire.",
  },
};
