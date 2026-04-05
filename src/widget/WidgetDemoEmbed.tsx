import { ChatWidget } from "./ChatWidget";

const apiBase =
  import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || "http://127.0.0.1:54321/functions/v1";

/** Generic Crushpad demo — answers general wine questions (no winery-specific data). */
export function WidgetDemoEmbed() {
  const genericKey = import.meta.env.VITE_WIDGET_DEMO_KEY || "wk_demo_crushpad";
  return (
    <ChatWidget
      apiKey={genericKey}
      apiBase={apiBase}
      themeColor="#c47a84"
      wineryLabel="Crushpad.ai"
      embedded
      embeddedChrome="panel"
      headerLockup="full"
      useEngagementBubbles
    />
  );
}

/** Crowley Wines branded demo — answers Crowley-specific questions. */
export function WidgetDemoCrowleyEmbed() {
  const crowleyKey = import.meta.env.VITE_WIDGET_CROWLEY_KEY || "wk_test_crowley";
  return (
    <ChatWidget
      apiKey={crowleyKey}
      apiBase={apiBase}
      themeColor="#c47a84"
      wineryLabel="CROWLEY WINES"
      embedded
      embeddedChrome="panel"
      headerLockup="full"
      wineryUrl="https://crowleywines.com"
      bookingPath="/visit/"
      clubPath="/wine-clubs/"
      wineryPhone="(503) 272-1369"
      quickReplyRoutes={{
        "Blind Tasting": "/crowley/blind-tasting?embed=1",
        "Match Me": "/crowley/match-me?embed=1",
        Compare: "/compare?winery=crowley&embed=1",
        "Tasting options": "/winery-info?topic=tastings&winery=crowley&embed=1",
        "Hours & directions": "/winery-info?topic=hours&winery=crowley&embed=1",
        "Wine club info": "/winery-info?topic=club&winery=crowley&embed=1",
        "Food pairings": "/winery-info?topic=pairings&winery=crowley&embed=1",
      }}
    />
  );
}

/** Ponzi Vineyards branded demo — answers Ponzi-specific questions. */
export function WidgetDemoPonziEmbed() {
  const ponziKey = import.meta.env.VITE_WIDGET_PONZI_KEY || "wk_test_ponzi";
  return (
    <ChatWidget
      apiKey={ponziKey}
      apiBase={apiBase}
      themeColor="#c47a84"
      wineryLabel="PONZI VINEYARDS"
      embedded
      embeddedChrome="panel"
      headerLockup="full"
      wineryUrl="https://www.ponzivineyards.com"
      bookingPath="/visit-us/"
      clubPath="/membership/"
      wineryPhone="(503) 628-1227"
      quickReplyRoutes={{
        "Blind Tasting": "/ponzi/blind-tasting?embed=1",
        "Match Me": "/ponzi/match-me?embed=1",
        Compare: "/compare?winery=ponzi&embed=1",
        "Tasting options": "/winery-info?topic=tastings&winery=ponzi&embed=1",
        "Hours & directions": "/winery-info?topic=hours&winery=ponzi&embed=1",
        "Wine club info": "/winery-info?topic=club&winery=ponzi&embed=1",
        "Food pairings": "/winery-info?topic=pairings&winery=ponzi&embed=1",
        "Recipes": "/winery-info?topic=recipes&winery=ponzi&embed=1",
      }}
    />
  );
}

/** Chehalem Winery branded demo — answers Chehalem-specific questions. */
export function WidgetDemoChehalemEmbed() {
  const chehalemKey = import.meta.env.VITE_WIDGET_CHEHALEM_KEY || "wk_beta_chehalem_001";
  return (
    <ChatWidget
      apiKey={chehalemKey}
      apiBase={apiBase}
      themeColor="#c47a84"
      wineryLabel="CHEHALEM WINERY"
      embedded
      embeddedChrome="panel"
      headerLockup="full"
      wineryUrl="https://chehalemwines.com"
      bookingPath="/visit/"
      clubPath="/wine-club/"
      wineryPhone="(503) 864-3404"
      quickReplyRoutes={{
        "Blind Tasting": "/chehalem/blind-tasting?embed=1",
        "Match Me": "/chehalem/match-me?embed=1",
        Compare: "/compare?winery=chehalem&embed=1",
        "Tasting options": "/winery-info?topic=tastings&winery=chehalem&embed=1",
        "Hours & directions": "/winery-info?topic=hours&winery=chehalem&embed=1",
        "Wine club info": "/winery-info?topic=club&winery=chehalem&embed=1",
        "Food pairings": "/winery-info?topic=pairings&winery=chehalem&embed=1",
        "Recipes": "/winery-info?topic=recipes&winery=chehalem&embed=1",
      }}
    />
  );
}

/** Soter Vineyards branded demo — answers Soter-specific questions. */
export function WidgetDemoSoterEmbed() {
  const soterKey = import.meta.env.VITE_WIDGET_SOTER_KEY || "wk_test_soter";
  return (
    <ChatWidget
      apiKey={soterKey}
      apiBase={apiBase}
      themeColor="#c47a84"
      wineryLabel="SOTER VINEYARDS"
      embedded
      embeddedChrome="panel"
      headerLockup="full"
      wineryUrl="https://sotervineyards.com"
      bookingPath="/visit-soter-vineyards/"
      clubPath="/wine-club/"
      wineryPhone="(503) 662-5600"
      quickReplyRoutes={{
        "Blind Tasting": "/soter/blind-tasting?embed=1",
        "Match Me": "/soter/match-me?embed=1",
        Compare: "/compare?winery=soter&embed=1",
        "Tasting options": "/winery-info?topic=tastings&winery=soter&embed=1",
        "Hours & directions": "/winery-info?topic=hours&winery=soter&embed=1",
        "Wine club info": "/winery-info?topic=club&winery=soter&embed=1",
        "Food pairings": "/winery-info?topic=pairings&winery=soter&embed=1",
        "Recipes": "/winery-info?topic=recipes&winery=soter&embed=1",
      }}
    />
  );
}

/** Rex Hill branded demo — answers Rex Hill-specific questions. */
export function WidgetDemoRexHillEmbed() {
  const rexHillKey = import.meta.env.VITE_WIDGET_TEST_KEY || "wk_test_rexhill";
  return (
    <ChatWidget
      apiKey={rexHillKey}
      apiBase={apiBase}
      themeColor="#c47a84"
      wineryLabel="REX HILL"
      embedded
      embeddedChrome="panel"
      headerCrestImageUrl="https://rexhill.com/wp-content/uploads/2020/06/cropped-rexhill-192x192.png"
      wineryUrl="https://rexhill.com"
      bookingPath="/experiences/"
      clubPath="/clubs/"
      wineryPhone="(503) 538-0666"
      quickReplyRoutes={{
        "Blind Tasting": "/rex-hill/blind-tasting?embed=1",
        "Match Me": "/rex-hill/match-me?embed=1",
        Compare: "/compare?winery=rex-hill&embed=1",
        "Tasting options": "/winery-info?topic=tastings&winery=rex-hill&embed=1",
        "Hours & directions": "/winery-info?topic=hours&winery=rex-hill&embed=1",
        "Wine club info": "/winery-info?topic=club&winery=rex-hill&embed=1",
        "Food pairings": "/winery-info?topic=pairings&winery=rex-hill&embed=1",
        "Recipes": "/winery-info?topic=recipes&winery=rex-hill&embed=1",
      }}
    />
  );
}
