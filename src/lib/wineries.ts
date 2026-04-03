export type WineryNavConfig = {
  slug: string;
  label: string;
  partnerPath: string;
  demoPath: string;
  researchPath: string | null;
  analyticsPath: string;
};

/** Optional curated copy keyed by slug (merged with DB rows on home). */
export type WineryCardOverride = {
  cardTitle?: string;
  region?: string;
  blurb?: string;
};

/** Slugs with a built-in research page. */
const SLUGS_WITH_RESEARCH = new Set(["rex-hill", "chehalem", "soter"]);

export const WINERY_CARD_OVERRIDES: Record<string, WineryCardOverride> = {
  "rex-hill": {
    cardTitle: "REX HILL Winery & Vineyards",
    region: "Laurelwood District · Willamette Valley",
    blurb:
      "Proof-of-concept partner—verified crawl, live widget, and technical research brief. Pinot Noir, Chardonnay, and méthode traditionnelle sparkling.",
  },
  chehalem: {
    cardTitle: "Chehalem Winery",
    region: "Chehalem Mountains AVA · Willamette Valley",
    blurb:
      "Second partner track (Stoller Wine Group). Partner page and research brief grow as crawl and onboarding progress.",
  },
  soter: {
    cardTitle: "Soter Vineyards",
    region: "Mineral Springs Ranch · Yamhill-Carlton AVA",
    blurb:
      "Biodynamic estate Pinot Noir, Chardonnay, sparkling, and more—visit by appointment. Crushpad.ai hub for crawl, widget, and research.",
  },
};

export function navConfigForSlug(slug: string, displayName: string): WineryNavConfig {
  return {
    slug,
    label: displayName,
    partnerPath: `/${slug}`,
    demoPath: `/${slug}/demo`,
    researchPath: SLUGS_WITH_RESEARCH.has(slug) ? `/${slug}/research` : null,
    analyticsPath: `/${slug}/analytics`,
  };
}

export function getWineryNavConfig(
  slug: string,
  displayName: string
): WineryNavConfig {
  return navConfigForSlug(slug, displayName);
}

/**
 * Infer winery slug from the URL without requiring a preloaded winery list.
 * Matches: /{slug}, /{slug}/demo, /{slug}/research, /{slug}/analytics
 * Also matches legacy paths for backwards compat detection.
 */
export function inferWinerySlugFromPath(pathname: string): string | null {
  const p = pathname.replace(/\/$/, "") || "/";

  // New canonical: /{slug}/demo, /{slug}/research, /{slug}/analytics
  let m = /^\/([^/]+)\/(demo|research|analytics)$/.exec(p);
  if (m) return m[1];

  // /{slug} — partner page (but skip known non-winery routes)
  const SKIP = new Set([
    "", "how-it-works", "book-demo", "widget-demo", "agent-demo",
    "admin", "analytics", "partners", "directory", "w", "research",
  ]);
  m = /^\/([^/]+)$/.exec(p);
  if (m && !SKIP.has(m[1])) return m[1];

  // Legacy: /w/{slug}
  m = /^\/w\/([^/]+)$/.exec(p);
  if (m) return m[1];

  // Legacy: /analytics/{slug}
  m = /^\/analytics\/([^/]+)$/.exec(p);
  if (m) return m[1];

  // Legacy: /research/{slug}
  m = /^\/research\/([^/]+)$/.exec(p);
  if (m) return m[1];

  // Legacy: /widget-demo-rexhill → rex-hill
  m = /^\/widget-demo-([^/]+)$/.exec(p);
  if (m) return m[1].replace(/^rexhill$/, "rex-hill");

  return null;
}
