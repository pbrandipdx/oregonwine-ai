import { createRoot } from "react-dom/client";
import { WidgetDemoEmbed } from "./widget/WidgetDemoEmbed";

const params = new URLSearchParams(window.location.search);
const isRexHillBranded = params.get("partner") === "rex-hill";

if (isRexHillBranded) {
  document.title = "REX HILL — Wine Agent";
}

createRoot(document.getElementById("widget-root")!).render(
  <WidgetDemoEmbed rexHillBranded={isRexHillBranded} />
);
