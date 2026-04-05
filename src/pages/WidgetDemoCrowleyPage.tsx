import { WidgetDemoCrowleyEmbed } from "../widget/WidgetDemoEmbed";
import { SEOHead, winerySubPageSEO } from "../lib/seo";

/** Crowley Wines branded demo — winery-specific knowledge + wine education. */
export function WidgetDemoCrowleyPage() {
  return (
    <div className="widget-demo-page" data-demo-variant="chatbot">
      <SEOHead {...winerySubPageSEO("Crowley Wines", "crowley", "demo")} />
      <div className="widget-demo-frame">
        <WidgetDemoCrowleyEmbed />
      </div>
    </div>
  );
}
