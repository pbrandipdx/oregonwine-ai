import { WidgetDemoRexHillEmbed } from "../widget/WidgetDemoEmbed";
import { SEOHead, winerySubPageSEO } from "../lib/seo";

/** Rex Hill branded demo — winery-specific knowledge + wine education. */
export function WidgetDemoRexHillPage() {
  return (
    <div className="widget-demo-page" data-demo-variant="chatbot">
      <SEOHead {...winerySubPageSEO("REX HILL", "rex-hill", "demo")} />
      <div className="widget-demo-frame">
        <WidgetDemoRexHillEmbed />
      </div>
    </div>
  );
}
