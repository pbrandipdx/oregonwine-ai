import { createRoot } from "react-dom/client";
import { ChatWidget } from "./ChatWidget";

const scripts = document.querySelectorAll<HTMLScriptElement>("script[data-crushpad-key]");
const el = scripts[scripts.length - 1];
if (!el) {
  console.error("[Crushpad.ai] No widget script tag with data-crushpad-key found.");
} else {
  const mount = document.createElement("div");
  mount.id = "crushpad-widget-root";
  el.insertAdjacentElement("afterend", mount);

  const apiBase =
    el.dataset.crushpadApi?.replace(/\/$/, "") ||
    "https://sdobipmpvcuxnjqwpggp.supabase.co/functions/v1";

  const root = createRoot(mount);
  root.render(
    <ChatWidget
      apiKey={el.dataset.crushpadKey || ""}
      apiBase={apiBase}
      themeColor={el.dataset.crushpadColor || "#c47a84"}
      wineryLabel={el.dataset.crushpadWinery || ""}
      wineryUrl={el.dataset.crushpadUrl || undefined}
      wineryPhone={el.dataset.crushpadPhone || undefined}
      headerCrestImageUrl={el.dataset.crushpadCrest || undefined}
      bookingPath={el.dataset.crushpadBookingPath || "/experiences/"}
      clubPath={el.dataset.crushpadClubPath || "/clubs/"}
    />
  );
}
