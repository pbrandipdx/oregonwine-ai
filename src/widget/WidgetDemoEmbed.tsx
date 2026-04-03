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
    />
  );
}
