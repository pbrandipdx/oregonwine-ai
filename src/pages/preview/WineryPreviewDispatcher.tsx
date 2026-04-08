import { Navigate, useParams } from "react-router-dom";
import { WineryHomeMockPage } from "../WineryHomeMockPage";
import { SoterPreview } from "./SoterPreview";
import { ChehalemPreview } from "./ChehalemPreview";
import { PonziPreview } from "./PonziPreview";
import { CrowleyPreview } from "./CrowleyPreview";

/**
 * /{slug}/preview router — picks the per-winery preview component whose
 * layout matches that winery's real homepage. Rex Hill still uses the
 * original shared mock (WineryHomeMockPage) since it already matches.
 */
export function WineryPreviewDispatcher() {
  const { slug } = useParams<{ slug: string }>();

  switch (slug) {
    case "soter":
      return <SoterPreview />;
    case "chehalem":
      return <ChehalemPreview />;
    case "ponzi":
      return <PonziPreview />;
    case "crowley":
      return <CrowleyPreview />;
    case "rex-hill":
      return <WineryHomeMockPage slug="rex-hill" />;
    default:
      return <Navigate to="/winery" replace />;
  }
}
