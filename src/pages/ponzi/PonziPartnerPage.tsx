import { SEOHead, PAGE_SEO } from "../../lib/seo";
import { WineryPage } from "../WineryPage";

export function PonziPartnerPage() {
  return <>
    <SEOHead {...PAGE_SEO.ponzi} />
    <WineryPage slug="ponzi" />
  </>;
}
