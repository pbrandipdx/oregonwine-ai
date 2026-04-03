import { createRoot } from "react-dom/client";
import { WidgetDemoEmbed, WidgetDemoRexHillEmbed } from "./widget/WidgetDemoEmbed";

const params = new URLSearchParams(window.location.search);
const isRexHill = params.get("partner") === "rex-hill";

if (isRexHill) {
  document.title = "REX HILL — Wine Agent";
}

createRoot(document.getElementById("widget-root")!).render(
  isRexHill ? <WidgetDemoRexHillEmbed /> : <WidgetDemoEmbed />
);
