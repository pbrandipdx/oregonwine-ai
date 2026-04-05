import { WidgetDemoEmbed } from "../widget/WidgetDemoEmbed";
import { SEOHead, PAGE_SEO } from "../lib/seo";

/** Generic Crushpad.ai demo — general wine knowledge, no winery-specific data. */
export function WidgetDemoPage() {
  return (
    <div className="widget-demo-page" data-demo-variant="chatbot">
      <SEOHead {...PAGE_SEO.chatbotDemo} />
      <div className="widget-demo-frame">
        <WidgetDemoEmbed />
      </div>
    </div>
  );
}
