import { createRoot } from "react-dom/client";
import { ChatWidget } from "./widget/ChatWidget";

const apiBase =
  import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || "http://127.0.0.1:54321/functions/v1";
const apiKey = import.meta.env.VITE_WIDGET_TEST_KEY || "wk_test_rexhill";

const params = new URLSearchParams(window.location.search);
const isRexHillBranded = params.get("partner") === "rex-hill";

if (isRexHillBranded) {
  document.title = "REX HILL — Wine Agent";
}

createRoot(document.getElementById("widget-root")!).render(
  isRexHillBranded ? (
    <ChatWidget
      apiKey={apiKey}
      apiBase={apiBase}
      themeColor="#4a6741"
      wineryLabel="REX HILL"
      embedded
      headerCrestImageUrl="https://rexhill.com/wp-content/uploads/2020/06/cropped-rexhill-192x192.png"
      wineryUrl="https://rexhill.com"
      wineryPhone="(503) 538-0666"
    />
  ) : (
    <ChatWidget
      apiKey={apiKey}
      apiBase={apiBase}
      themeColor="#722f37"
      wineryLabel="Crushpad.ai"
      embedded
      headerLockup="full"
    />
  )
);
