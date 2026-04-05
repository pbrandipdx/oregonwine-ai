import { useEffect } from "react";
import { WidgetDemoSoterEmbed } from "../widget/WidgetDemoEmbed";

/** Soter Vineyards branded demo — winery-specific knowledge + wine education. */
export function WidgetDemoSoterPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "SOTER VINEYARDS — Wine Agent";
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="widget-demo-page" data-demo-variant="chatbot">
      <div className="widget-demo-frame">
        <WidgetDemoSoterEmbed />
      </div>
    </div>
  );
}
