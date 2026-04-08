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
    navLabel: "CROWLEY WINES",
    crest: "※",
    menu: ["WINES", "VISIT", "ABOUT", "CLUB"],
    announce: {
      bold: "Spring Release Party:",
      body: " Saturday, April 20 at the McMinnville tasting room — pours, snacks, and new releases. ",
      cta: "RSVP.",
    },
    hero: {
      headline: "Minimal-intervention Pinot Noir & Chardonnay",
      cta: "BOOK A TASTING",
      image: "https://crowleywines.com/wp-content/uploads/2023/03/crowley-vineyard-hero.jpg",
    },
    cards: [
      { label: "SHOP THE RELEASE", image: "", tint: "#3b2d24" },
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
    menu: ["WINES", "VISIT US", "OUR STORY", "MEMBERSHIP"],
    announce: {
      bold: "New Release:",
      body: " 2022 Laurelwood District Pinot Noir — now available in the tasting room and online. ",
      cta: "Shop Now.",
    },
    hero: {
      headline: "Oregon Pinot Noir Since 1970.",
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
    menu: ["WINES", "VISIT", "ABOUT", "CLUB"],
    announce: {
      bold: "Library Tasting:",
      body: " Experience back-vintage Pinot Noir from our estate cellar. Limited seating. ",
      cta: "Reserve.",
    },
    hero: {
      headline: "Chehalem Mountains AVA — Estate Pinot & Chardonnay",
      cta: "BOOK A TASTING",
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
    menu: ["WINES", "VISIT", "OUR STORY", "CLUB"],
    announce: {
      bold: "Mineral Springs Ranch:",
      body: " Experience our biodynamic estate by appointment — tours, tastings, and seasonal menus. ",
      cta: "Book a Visit.",
    },
    hero: {
      headline: "Biodynamic From the Yamhill-Carlton AVA.",
      cta: "BOOK YOUR VISIT",
      image: "https://sotervineyards.com/wp-content/uploads/2023/04/soter-ranch-hero.jpg",
    },
    cards: [
      { label: "SHOP OUR RELEASES", image: "", tint: "#2a3a25" },
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
