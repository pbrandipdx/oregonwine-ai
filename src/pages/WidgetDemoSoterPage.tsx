import { WidgetDemoSoterEmbed } from "../widget/WidgetDemoEmbed";
import { SEOHead, winerySubPageSEO } from "../lib/seo";

/** Soter Vineyards branded demo — winery-specific knowledge + wine education. */
export function WidgetDemoSoterPage() {
  return (
    <div className="widget-demo-page" data-demo-variant="chatbot">
      <SEOHead
        {...winerySubPageSEO("SOTER VINEYARDS", "soter", "demo")}
        title="SOTER VINEYARDS — Wine Agent"
        absoluteTitle
      />
      <div className="widget-demo-frame">
        <WidgetDemoSoterEmbed />
      </div>
    </div>
  );
}
