import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { WidgetDemoEmbed } from "../widget/WidgetDemoEmbed";

export function WidgetDemoPage() {
  const [searchParams] = useSearchParams();
  const rexHillBranded = searchParams.get("partner") === "rex-hill";

  useEffect(() => {
    const prev = document.title;
    document.title = rexHillBranded ? "REX HILL — Wine Agent" : "Crushpad.ai — Wine Agent (demo)";
    return () => {
      document.title = prev;
    };
  }, [rexHillBranded]);

  return (
    <div className="widget-demo-page" data-demo-variant="chatbot">
      <div className="widget-demo-frame">
        <WidgetDemoEmbed rexHillBranded={rexHillBranded} />
      </div>
    </div>
  );
}
