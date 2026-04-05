import { SEOHead, PAGE_SEO } from "../../lib/seo";
import { WineryPage } from "../WineryPage";

export function SoterPartnerPage() {
  return <>
    <SEOHead {...PAGE_SEO.soter} />
    <WineryPage slug="soter" />
  </>;
}
