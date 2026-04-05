import { SEOHead, PAGE_SEO } from "../../lib/seo";
import { WineryPage } from "../WineryPage";

export function CrowleyPartnerPage() {
  return <>
    <SEOHead {...PAGE_SEO.crowley} />
    <WineryPage slug="crowley" />
  </>;
}
