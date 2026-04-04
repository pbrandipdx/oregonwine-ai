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
        Compare: "/compare?embed=1",
        "Tasting options": "/winery-info?topic=tastings&winery=rex-hill&embed=1",
        "Hours & directions": "/winery-info?topic=hours&winery=rex-hill&embed=1",
        "Wine club info": "/winery-info?topic=club&winery=rex-hill&embed=1",
        "Food pairings": "/winery-info?topic=pairings&winery=rex-hill&embed=1",
        "Recipes": "/winery-info?topic=recipes&winery=rex-hill&embed=1",
      }}
    />
  );
}
