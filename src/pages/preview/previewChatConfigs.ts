/**
 * Per-winery chat widget config used by every /{slug}/preview mock.
 * Extracted from WineryHomeMockPage.tsx so per-winery preview
 * components can import the same config without duplication.
 */
export type PreviewChatConfig = {
  apiKey: string;
  wineryLabel: string;
  crestImage?: string;
  wineryUrl: string;
  phone: string;
  bookingPath: string;
  clubPath: string;
  themeColor: string;
  quickReplyRoutes: Record<string, string>;
};

export const PREVIEW_CHAT_CONFIGS: Record<string, PreviewChatConfig> = {
  "rex-hill": {
    apiKey: import.meta.env.VITE_WIDGET_TEST_KEY || "wk_test_rexhill",
    wineryLabel: "REX HILL",
    crestImage:
      "https://rexhill.com/wp-content/uploads/2020/06/cropped-rexhill-192x192.png",
    wineryUrl: "https://rexhill.com",
    phone: "(503) 538-0666",
    bookingPath: "/experiences/",
    clubPath: "/clubs/",
    themeColor: "#7a1f2b",
    quickReplyRoutes: {
      "Blind Tasting": "/rex-hill/blind-tasting?embed=1",
      "Match Me": "/rex-hill/match-me?embed=1",
      Compare: "/compare?winery=rex-hill&embed=1",
      "Tasting options": "/winery-info?topic=tastings&winery=rex-hill&embed=1",
      "Hours & directions": "/winery-info?topic=hours&winery=rex-hill&embed=1",
      "Wine club info": "/winery-info?topic=club&winery=rex-hill&embed=1",
      "Food pairings": "/winery-info?topic=pairings&winery=rex-hill&embed=1",
      Recipes: "/winery-info?topic=recipes&winery=rex-hill&embed=1",
    },
  },
  crowley: {
    apiKey: import.meta.env.VITE_WIDGET_CROWLEY_KEY || "wk_test_crowley",
    wineryLabel: "CROWLEY WINES",
    wineryUrl: "https://crowleywines.com",
    phone: "(503) 272-1369",
    bookingPath: "/visit/",
    clubPath: "/wine-clubs/",
    themeColor: "#8b1e3f",
    quickReplyRoutes: {
      "Blind Tasting": "/crowley/blind-tasting?embed=1",
      "Match Me": "/crowley/match-me?embed=1",
      Compare: "/compare?winery=crowley&embed=1",
      "Tasting options": "/winery-info?topic=tastings&winery=crowley&embed=1",
      "Hours & directions": "/winery-info?topic=hours&winery=crowley&embed=1",
      "Wine club info": "/winery-info?topic=club&winery=crowley&embed=1",
      "Food pairings": "/winery-info?topic=pairings&winery=crowley&embed=1",
    },
  },
  ponzi: {
    apiKey: import.meta.env.VITE_WIDGET_PONZI_KEY || "wk_test_ponzi",
    wineryLabel: "PONZI VINEYARDS",
    wineryUrl: "https://www.ponzivineyards.com",
    phone: "(503) 628-1227",
    bookingPath: "/visit-us/",
    clubPath: "/membership/",
    themeColor: "#234d3b",
    quickReplyRoutes: {
      "Blind Tasting": "/ponzi/blind-tasting?embed=1",
      "Match Me": "/ponzi/match-me?embed=1",
      Compare: "/compare?winery=ponzi&embed=1",
      "Tasting options": "/winery-info?topic=tastings&winery=ponzi&embed=1",
      "Hours & directions": "/winery-info?topic=hours&winery=ponzi&embed=1",
      "Wine club info": "/winery-info?topic=club&winery=ponzi&embed=1",
      "Food pairings": "/winery-info?topic=pairings&winery=ponzi&embed=1",
      Recipes: "/winery-info?topic=recipes&winery=ponzi&embed=1",
    },
  },
  chehalem: {
    apiKey: import.meta.env.VITE_WIDGET_CHEHALEM_KEY || "wk_beta_chehalem_001",
    wineryLabel: "CHEHALEM WINERY",
    wineryUrl: "https://chehalemwines.com",
    phone: "(503) 864-3404",
    bookingPath: "/visit/",
    clubPath: "/wine-club/",
    themeColor: "#233a5c",
    quickReplyRoutes: {
      "Blind Tasting": "/chehalem/blind-tasting?embed=1",
      "Match Me": "/chehalem/match-me?embed=1",
      Compare: "/compare?winery=chehalem&embed=1",
      "Tasting options": "/winery-info?topic=tastings&winery=chehalem&embed=1",
      "Hours & directions":
        "/winery-info?topic=hours&winery=chehalem&embed=1",
      "Wine club info": "/winery-info?topic=club&winery=chehalem&embed=1",
      "Food pairings": "/winery-info?topic=pairings&winery=chehalem&embed=1",
      Recipes: "/winery-info?topic=recipes&winery=chehalem&embed=1",
    },
  },
  soter: {
    apiKey: import.meta.env.VITE_WIDGET_SOTER_KEY || "wk_test_soter",
    wineryLabel: "SOTER VINEYARDS",
    wineryUrl: "https://sotervineyards.com",
    phone: "(503) 662-5600",
    bookingPath: "/visit-soter-vineyards/",
    clubPath: "/wine-club/",
    themeColor: "#3a5a2a",
    quickReplyRoutes: {
      "Blind Tasting": "/soter/blind-tasting?embed=1",
      "Match Me": "/soter/match-me?embed=1",
      Compare: "/compare?winery=soter&embed=1",
      "Tasting options": "/winery-info?topic=tastings&winery=soter&embed=1",
      "Hours & directions": "/winery-info?topic=hours&winery=soter&embed=1",
      "Wine club info": "/winery-info?topic=club&winery=soter&embed=1",
      "Food pairings": "/winery-info?topic=pairings&winery=soter&embed=1",
      Recipes: "/winery-info?topic=recipes&winery=soter&embed=1",
    },
  },
};

export const PREVIEW_API_BASE =
  import.meta.env.VITE_SUPABASE_FUNCTIONS_URL ||
  "https://sdobipmpvcuxnjqwpggp.supabase.co/functions/v1";
