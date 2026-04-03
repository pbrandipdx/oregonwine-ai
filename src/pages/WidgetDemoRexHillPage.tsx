import { useEffect } from "react";
import { WidgetDemoRexHillEmbed } from "../widget/WidgetDemoEmbed";

/** Rex Hill branded demo — winery-specific knowledge + wine education. */
export function WidgetDemoRexHillPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "REX HILL — Wine Agent";
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="widget-demo-page" data-demo-variant="chatbot">
      <div className="widget-demo-frame">
        <WidgetDemoRexHillEmbed />
      </div>
    </div>
  );
}
