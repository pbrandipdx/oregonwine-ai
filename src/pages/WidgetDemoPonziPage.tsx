import { useEffect } from "react";
import { WidgetDemoPonziEmbed } from "../widget/WidgetDemoEmbed";

/** Ponzi Vineyards branded demo — winery-specific knowledge + wine education. */
export function WidgetDemoPonziPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "PONZI VINEYARDS — Wine Agent";
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="widget-demo-page" data-demo-variant="chatbot">
      <div className="widget-demo-frame">
        <WidgetDemoPonziEmbed />
      </div>
    </div>
  );
}
