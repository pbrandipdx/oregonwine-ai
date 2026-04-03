export type WineryNavConfig = {
  slug: string;
  label: string;
  partnerPath: string;
  /** Only set when a research route exists in the app */
  researchPath: string | null;
};

/** Optional curated copy keyed by slug (merged with DB rows on home). */
export type WineryCardOverride = {
  cardTitle?: string;
  region?: string;
  blurb?: string;
};

/** Slugs that use /{slug} instead of /w/{slug} for the partner hub. */
const PRETTY_PARTNER_PATH: Record<string, string> = {
  "rex-hill": "/rex-hill",
  chehalem: "/chehalem",
  soter: "/soter",
};

/** Slugs with a built-in research page. */
const RESEARCH_PATH: Record<string, string> = {
  "rex-hill": "/rex-hill/research",
  chehalem: "/chehalem/research",
  soter: "/soter/research",
};

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

export function partnerPathForSlug(slug: string): string {
  return PRETTY_PARTNER_PATH[slug] ?? `/w/${slug}`;
}

export function researchPathForSlug(slug: string): string | null {
  return RESEARCH_PATH[slug] ?? null;
}

export function navConfigForSlug(slug: string, displayName: string): WineryNavConfig {
  return {
    slug,
    label: displayName,
    partnerPath: partnerPathForSlug(slug),
    researchPath: researchPathForSlug(slug),
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
 */
export function inferWinerySlugFromPath(pathname: string): string | null {
  const p = pathname.replace(/\/$/, "") || "/";

  let m = /^\/w\/([^/]+)$/.exec(p);
  if (m) return m[1];

  m = /^\/analytics\/([^/]+)$/.exec(p);
  if (m) return m[1];

  m = /^\/research\/([^/]+)$/.exec(p);
  if (m) return m[1];

  // /widget-demo-rexhill → rex-hill, /widget-demo-soter → soter, etc.
  m = /^\/widget-demo-([^/]+)$/.exec(p);
  if (m) return m[1].replace(/^rexhill$/, "rex-hill");

  for (const [slug, path] of Object.entries(PRETTY_PARTNER_PATH)) {
    if (p === path) return slug;
  }
  for (const [slug, path] of Object.entries(RESEARCH_PATH)) {
    if (p === path) return slug;
  }

  return null;
}
