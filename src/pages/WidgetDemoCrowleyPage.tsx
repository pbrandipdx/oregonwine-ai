import { useEffect } from "react";
import { WidgetDemoCrowleyEmbed } from "../widget/WidgetDemoEmbed";

/** Crowley Wines branded demo — winery-specific knowledge + wine education. */
export function WidgetDemoCrowleyPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "CROWLEY WINES — Wine Agent";
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="widget-demo-page" data-demo-variant="chatbot">
      <div className="widget-demo-frame">
        <WidgetDemoCrowleyEmbed />
      </div>
    </div>
  );
}
