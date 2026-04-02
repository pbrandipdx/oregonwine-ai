import { ChatWidget } from "./ChatWidget";

const apiBase =
  import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || "http://127.0.0.1:54321/functions/v1";
const apiKey = import.meta.env.VITE_WIDGET_TEST_KEY || "wk_test_rexhill";

type Props = { rexHillBranded: boolean };

export function WidgetDemoEmbed({ rexHillBranded }: Props) {
  return rexHillBranded ? (
    <ChatWidget
      apiKey={apiKey}
      apiBase={apiBase}
      themeColor="#c47a84"
      wineryLabel="REX HILL"
      embedded
      embeddedChrome="panel"
      headerCrestImageUrl="https://rexhill.com/wp-content/uploads/2020/06/cropped-rexhill-192x192.png"
      wineryUrl="https://rexhill.com"
      wineryPhone="(503) 538-0666"
    />
  ) : (
    <ChatWidget
      apiKey={apiKey}
      apiBase={apiBase}
      themeColor="#c47a84"
      wineryLabel="Crushpad.ai"
      embedded
      embeddedChrome="panel"
      headerLockup="full"
    />
  );
}
