/**
 * Per-winery config for the homepage-mock sales prototype at /{slug}/preview.
 *
 * Each entry recreates the winery's own homepage chrome (announcement bar,
 * nav, hero, two-card row) so a prospect can see the Crushpad.ai Wine Agent
 * embedded inside their actual brand.
 *
 * The chat widget itself is wired separately via the existing
 * WidgetDemoEmbed.tsx config; this file only drives the host-page chrome.
 */
export type WineryMockConfig = {
  /** Winery slug (used for routing + chat key lookup). */
  slug: string;
  /** Human-readable label shown in the nav (uppercase styling is CSS). */
  navLabel: string;
  /** Short crest glyph rendered before the wordmark. */
  crest: string;
  /** Menu item labels for the main nav. */
  menu: string[];
  /** Announcement bar contents. */
  announce: { bold: string; body: string; cta: string };
  /** Hero content. */
  hero: { headline: string; cta: string; image: string };
  /** Two below-fold cards. */
  cards: { label: string; image: string; tint: string }[];
  /** Brand palette. */
  brand: {
    cream: string;
    ink: string;
    burgundy: string;
    burgundyDeep: string;
    gold: string;
  };
};

export const WINERY_MOCK_CONFIGS: Record<string, WineryMockConfig> = {
  "rex-hill": {
    slug: "rex-hill",
    navLabel: "REX HILL",
    crest: "❦",
    menu: ["OUR WINES", "VISIT US", "ABOUT REX HILL", "EXPLORE"],
    announce: {
      bold: "Experience Somm's Table:",
      body: " A hosted, intimate, food & wine tasting option featuring limited-production wines. ",
      cta: "Reserve Now.",
    },
    hero: {
      headline: "Sustainable Luxury From Oregon's Willamette Valley",
      cta: "BOOK A TASTING EXPERIENCE",
      image:
        "https://rexhill.com/wp-content/uploads/2024/04/REX-HILL-Outdoor-Patio-Sunset-scaled.jpg",
    },
    cards: [
      {
        label: "SHOP REX HILL WINES",
        image: "https://rexhill.com/wp-content/uploads/2024/04/Rex-Hill-Wine-Box.jpg",
        tint: "#1c2735",
      },
      {
        label: "WINERY EVENTS",
        image: "https://rexhill.com/wp-content/uploads/2024/04/Winery-Events.jpg",
        tint: "#6c3a31",
      },
    ],
    brand: {
      cream: "#f7f1e8",
      ink: "#1f1410",
      burgundy: "#6e1f2b",
      burgundyDeep: "#4a141d",
      gold: "#b88a3c",
    },
  },

  crowley: {
    slug: "crowley",
    navLabel: "CROWLEY",
    crest: "※",
    menu: ["HOME", "SHOP", "CLUB", "ABOUT", "CONNECT", "TRADE"],
    announce: {
      bold: "Premier Wines From Oregon's Willamette Valley:",
      body: " Minimal-intervention Pinot Noir and Chardonnay from Dundee Hills, Eola-Amity, and beyond. ",
      cta: "Shop Now.",
    },
    hero: {
      headline: "Transparent, Terroir-Driven Winemaking",
      cta: "SHOP NOW",
      image: "https://crowleywines.com/wp-content/uploads/2023/03/crowley-vineyard-hero.jpg",
    },
    cards: [
      { label: "THE VINEYARDS", image: "", tint: "#3b2d24" },
      { label: "VISIT THE TASTING ROOM", image: "", tint: "#5c4533" },
    ],
    brand: {
      cream: "#f2ecde",
      ink: "#1e1812",
      burgundy: "#8b1e3f",
      burgundyDeep: "#5e1328",
      gold: "#c89b52",
    },
  },

  ponzi: {
    slug: "ponzi",
    navLabel: "PONZI VINEYARDS",
    crest: "◈",
    menu: [
      "OUR STORY",
      "OUR TERROIR",
      "OUR WINES",
      "VISIT",
      "EVENTS",
      "MEMBERSHIP",
      "BLOG",
    ],
    announce: {
      bold: "Open Daily 10am–5pm",
      body: " · 19500 SW Mountain Home Rd, Sherwood OR 97140 ",
      cta: "Directions.",
    },
    hero: {
      headline: "The Artistry of the Elements",
      cta: "PLAN YOUR VISIT",
      image: "https://www.ponzivineyards.com/wp-content/uploads/2023/01/ponzi-estate-hero.jpg",
    },
    cards: [
      { label: "SHOP WINES", image: "", tint: "#2b1f1a" },
      { label: "JOIN THE CLUB", image: "", tint: "#6a3a2a" },
    ],
    brand: {
      cream: "#f5efe5",
      ink: "#1a1310",
      burgundy: "#5a1a24",
      burgundyDeep: "#3a0f17",
      gold: "#c49a4c",
    },
  },

  chehalem: {
    slug: "chehalem",
    navLabel: "CHEHALEM",
    crest: "◆",
    menu: [
      "SHOP WINES",
      "VISIT",
      "STAY",
      "ABOUT",
      "CLUB",
      "LEARN",
      "TRADE & MEDIA",
    ],
    announce: {
      bold: "Valley of Flowers · Est. 1990:",
      body: " Open daily 10:30 am – 5:30 pm at the Chehalem Estate Tasting Room. ",
      cta: "Book Your Experience.",
    },
    hero: {
      headline: "Welcome to the Chehalem Estate Tasting Room",
      cta: "BOOK YOUR EXPERIENCE",
      image: "https://chehalemwines.com/wp-content/uploads/2023/06/chehalem-vineyard.jpg",
    },
    cards: [
      { label: "SHOP OUR WINES", image: "", tint: "#1f2a3b" },
      { label: "VISIT THE TASTING ROOM", image: "", tint: "#3a4f68" },
    ],
    brand: {
      cream: "#f4eee1",
      ink: "#15181e",
      burgundy: "#233a5c",
      burgundyDeep: "#15243a",
      gold: "#c49a4c",
    },
  },

  soter: {
    slug: "soter",
    navLabel: "SOTER VINEYARDS",
    crest: "☙",
    menu: ["VISIT", "SHOP", "MEMBERSHIP", "COMMUNITY", "WINEMAKING"],
    announce: {
      bold: "Our Winter 2026 Release is here,",
      body: " and we're glad to finally share it. Case purchases include ground shipping. ",
      cta: "SHOP NOW.",
    },
    hero: {
      headline: "Welcome to MSR.",
      cta: "VISIT MSR",
      image: "https://sotervineyards.com/wp-content/uploads/2023/04/soter-ranch-hero.jpg",
    },
    cards: [
      { label: "SHOP WINTER 2026 RELEASE", image: "", tint: "#2a3a25" },
      { label: "JOIN THE CLUB", image: "", tint: "#4d5c3a" },
    ],
    brand: {
      cream: "#f4efe1",
      ink: "#1b1e14",
      burgundy: "#3a5a2a",
      burgundyDeep: "#243a1a",
      gold: "#c4a04c",
    },
  },
};
