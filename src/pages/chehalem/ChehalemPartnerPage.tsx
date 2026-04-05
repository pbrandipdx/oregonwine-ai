import { SEOHead, PAGE_SEO } from "../../lib/seo";
import { WineryPage } from "../WineryPage";

export function ChehalemPartnerPage() {
  return <>
    <SEOHead {...PAGE_SEO.chehalem} />
    <WineryPage slug="chehalem" />
  </>;
}
