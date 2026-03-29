import { createRoot } from "react-dom/client";
import { ChatWidget } from "./ChatWidget";

const scripts = document.querySelectorAll<HTMLScriptElement>("script[data-key]");
const el = scripts[scripts.length - 1];
if (!el) {
  console.error("[OregonWine.ai] No widget script tag with data-key found.");
} else {
  const mount = document.createElement("div");
  mount.id = "oregonwine-widget-root";
  el.insertAdjacentElement("afterend", mount);
  const apiBase =
    el.dataset.apiBase?.replace(/\/$/, "") ||
    import.meta.env.VITE_SUPABASE_FUNCTIONS_URL?.replace(/\/$/, "") ||
    "";
  const root = createRoot(mount);
  root.render(
    <ChatWidget
      apiKey={el.dataset.key || ""}
      themeColor={el.dataset.color || "#722F37"}
      apiBase={apiBase.replace(/\/$/, "")}
      wineryLabel={el.dataset.winery || "this winery"}
    />
  );
}
