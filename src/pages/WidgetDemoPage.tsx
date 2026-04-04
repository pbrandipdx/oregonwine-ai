import { useEffect } from "react";
import { WidgetDemoEmbed } from "../widget/WidgetDemoEmbed";

/** Generic Crushpad.ai demo — general wine knowledge, no winery-specific data. */
export function WidgetDemoPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Crushpad.ai — Chatbot Demo";
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="widget-demo-page" data-demo-variant="chatbot">
      <div className="widget-demo-frame">
        <WidgetDemoEmbed />
      </div>
    </div>
  );
}
