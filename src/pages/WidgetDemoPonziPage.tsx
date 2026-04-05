import { WidgetDemoPonziEmbed } from "../widget/WidgetDemoEmbed";
import { SEOHead, winerySubPageSEO } from "../lib/seo";

/** Ponzi Vineyards branded demo — winery-specific knowledge + wine education. */
export function WidgetDemoPonziPage() {
  return (
    <div className="widget-demo-page" data-demo-variant="chatbot">
      <SEOHead {...winerySubPageSEO("Ponzi Vineyards", "ponzi", "demo")} />
      <div className="widget-demo-frame">
        <WidgetDemoPonziEmbed />
      </div>
    </div>
  );
}
