import { WidgetDemoChehalemEmbed } from "../widget/WidgetDemoEmbed";
import { SEOHead, winerySubPageSEO } from "../lib/seo";

/** Chehalem Winery branded demo — winery-specific knowledge + wine education. */
export function WidgetDemoChehalemPage() {
  return (
    <div className="widget-demo-page" data-demo-variant="chatbot">
      <SEOHead {...winerySubPageSEO("Chehalem Winery", "chehalem", "demo")} />
      <div className="widget-demo-frame">
        <WidgetDemoChehalemEmbed />
      </div>
    </div>
  );
}
