import { SEOHead, PAGE_SEO } from "../../lib/seo";
import { WineryPage } from "../WineryPage";

export function RexHillPartnerPage() {
  return <>
    <SEOHead {...PAGE_SEO.rexHill} />
    <WineryPage slug="rex-hill" />
  </>;
}
