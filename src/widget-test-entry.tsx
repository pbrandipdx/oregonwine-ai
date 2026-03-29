import { createRoot } from "react-dom/client";
import { ChatWidget } from "./widget/ChatWidget";

const apiBase =
  import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || "http://127.0.0.1:54321/functions/v1";
const apiKey = import.meta.env.VITE_WIDGET_TEST_KEY || "wk_test_rexhill";

createRoot(document.getElementById("widget-root")!).render(
  <ChatWidget
    apiKey={apiKey}
    apiBase={apiBase}
    themeColor="#4a6741"
    wineryLabel="REX HILL"
    embedded
  />
);
