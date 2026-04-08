import { useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────
export interface SEOProps {
  title: string;
  description: string;
  path: string;
  /** Override the OG image (defaults to /og-image.jpg) */
  ogImage?: string;
  /** Additional schema.org JSON-LD (will be injected as a script tag) */
  schema?: Record<string, unknown>;
  /** Set to true for pages that shouldn't be indexed (admin, analytics) */
  noindex?: boolean;
  /** If true, `title` is used as the full document/OG title (no automatic "| Crushpad.ai" suffix). */
  absoluteTitle?: boolean;
}

const SITE_NAME = "Crushpad.ai";
const SITE_URL = "https://crushpad.ai";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// ─── Component ────────────────────────────────────────────────
/**
 * Lightweight <head> manager — no extra dependencies.
 * Sets document.title, meta description, OG/Twitter tags, canonical, and schema.
 * Cleans up injected tags on unmount.
 */
export function SEOHead({ title, description, path, ogImage, schema, noindex, absoluteTitle }: SEOProps) {
  useEffect(() => {
    const fullTitle =
      absoluteTitle || path === "/" ? title : `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${path}`;
    const image = ogImage || DEFAULT_OG_IMAGE;

    // Title
    document.title = fullTitle;

    // Helper: set or create a meta tag
    const metas: HTMLMetaElement[] = [];
    function setMeta(attr: "name" | "property", key: string, content: string) {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
        metas.push(el);
      }
      el.setAttribute("content", content);
    }

    // SEO meta
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large");

    // Canonical
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE_NAME);

    // Twitter Card
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:url", url);
    setMeta("name", "twitter:image", image);
    setMeta("name", "twitter:card", "summary_large_image");

    // Schema.org JSON-LD
    let schemaEl: HTMLScriptElement | null = null;
    if (schema) {
      schemaEl = document.createElement("script");
      schemaEl.setAttribute("type", "application/ld+json");
      schemaEl.setAttribute("data-seo", "page");
      schemaEl.textContent = JSON.stringify(schema);
      document.head.appendChild(schemaEl);
    }

    // Cleanup dynamically created elements on unmount
    return () => {
      metas.forEach((el) => el.remove());
      schemaEl?.remove();
    };
  }, [title, description, path, ogImage, schema, noindex, absoluteTitle]);

  return null;
}

// ─── Per-Page SEO Configs ─────────────────────────────────────

export const PAGE_SEO: Record<string, SEOProps> = {
  home: {
    title: "Crushpad.ai | AI-Powered Wine Concierge for Oregon Wineries",
    description:
      "Crushpad.ai gives every Oregon winery an AI-powered chatbot trained on your wines, hours, and experiences. Visitors get instant answers, you get more bookings.",
    path: "/",
  },
  howItWorks: {
    title: "How It Works — AI Wine Concierge Technology",
    description:
      "See how Crushpad.ai transforms winery websites with AI chatbots. Crawl your site, train on your wines, and deploy a 24/7 concierge that drives visits and revenue.",
    path: "/how-it-works",
  },
  bookDemo: {
    title: "Book a Demo — Crushpad.ai for Your Winery",
    description:
      "Schedule a personalized demo of Crushpad.ai for your Oregon winery. See how an AI wine concierge can increase bookings and engage visitors 24/7.",
    path: "/book-demo",
  },
  chatbotDemo: {
    title: "Live Chatbot Demo — AI Wine Concierge in Action",
    description:
      "Try Crushpad.ai's AI wine concierge live. Ask about wines, tasting notes, food pairings, hours, and more. Experience the future of winery customer engagement.",
    path: "/chatbot-demo",
  },
  agentDemo: {
    title: "AI Agent Demo — Autonomous Wine Discovery",
    description:
      "Experience Crushpad.ai's AI agent that autonomously helps visitors discover wines, plan visits, and learn about Oregon wine regions.",
    path: "/agent-demo",
  },
  blindTasting: {
    title: "Blind Tasting Challenge — Test Your Palate with AI",
    description:
      "Can you identify Oregon wines by their tasting notes alone? Take the Crushpad.ai blind tasting challenge and test your wine knowledge.",
    path: "/blind-tasting",
  },
  matchMe: {
    title: "Wine Match — AI-Powered Wine Recommendations",
    description:
      "Tell us what you like and our AI matches you with the perfect Oregon wine. Personalized recommendations based on your taste preferences.",
    path: "/match-me",
  },
  planVisit: {
    title: "Plan Your Wine Country Visit — AI Trip Planner",
    description:
      "Plan your Oregon wine country visit with AI. Get personalized itineraries, tasting room suggestions, and insider tips for Willamette Valley and beyond.",
    path: "/plan-visit",
  },
  compare: {
    title: "Compare Oregon Wines — Side-by-Side Tasting Notes",
    description:
      "Compare Oregon wines side by side with AI-powered tasting notes, ratings, and food pairings. Find the perfect bottle for any occasion.",
    path: "/compare",
  },
  featuredWinery: {
    title: "Featured Winery — Discover Oregon's Best",
    description:
      "Discover featured Oregon wineries curated by Crushpad.ai. Learn about their wines, visit their tasting rooms, and experience what makes each one special.",
    path: "/featured-winery",
  },
  wineryInfo: {
    title: "Winery Information — Oregon Winery Details",
    description:
      "Detailed information about Oregon wineries including wines, hours, tasting experiences, directions, and contact details.",
    path: "/winery-info",
  },
  wineryPortfolio: {
    title: "Oregon Winery Portfolio — Partner Wineries",
    description:
      "Explore Crushpad.ai partner wineries across Oregon's Willamette Valley. REX HILL, Ponzi, Crowley, Chehalem, Soter, and more.",
    path: "/winery",
  },

  // ── Winery-specific pages ──
  rexHill: {
    title: "REX HILL Winery — AI Wine Concierge",
    description:
      "REX HILL Winery & Vineyards in the Laurelwood District, Willamette Valley. Explore Pinot Noir, Chardonnay, and sparkling wines with Crushpad.ai's AI concierge.",
    path: "/rex-hill",
    schema: {
      "@context": "https://schema.org",
      "@type": ["Winery", "TouristAttraction"],
      name: "REX HILL Winery & Vineyards",
      description: "Willamette Valley winery in the Laurelwood District known for Pinot Noir, Chardonnay, and méthode traditionnelle sparkling wines.",
      url: "https://crushpad.ai/rex-hill",
      address: {
        "@type": "PostalAddress",
        addressRegion: "OR",
        addressCountry: "US",
      },
    },
  },
  ponzi: {
    title: "Ponzi Vineyards — AI Wine Concierge",
    description:
      "Ponzi Vineyards, Oregon wine pioneer since 1970, now part of Champagne Bollinger. Four estate vineyards, world-class Pinot Noir and Chardonnay.",
    path: "/ponzi",
    schema: {
      "@context": "https://schema.org",
      "@type": ["Winery", "TouristAttraction"],
      name: "Ponzi Vineyards",
      description: "Oregon wine pioneer (est. 1970). Four estate vineyards in the Laurelwood District and Chehalem Mountains producing Pinot Noir and Chardonnay.",
      url: "https://crushpad.ai/ponzi",
      address: {
        "@type": "PostalAddress",
        addressRegion: "OR",
        addressCountry: "US",
      },
    },
  },
  crowley: {
    title: "Crowley Wines — AI Wine Concierge",
    description:
      "Crowley Wines: minimal-intervention Pinot Noir and Chardonnay from multiple Willamette Valley AVAs. Explore with Crushpad.ai's AI concierge.",
    path: "/crowley",
    schema: {
      "@context": "https://schema.org",
      "@type": ["Winery", "TouristAttraction"],
      name: "Crowley Wines",
      description: "Minimal-intervention Pinot Noir and Chardonnay from McMinnville, Dundee Hills, and Eola-Amity Hills AVAs in the Willamette Valley.",
      url: "https://crushpad.ai/crowley",
      address: {
        "@type": "PostalAddress",
        addressRegion: "OR",
        addressCountry: "US",
      },
    },
  },
  chehalem: {
    title: "Chehalem Winery — AI Wine Concierge",
    description:
      "Chehalem Winery in the Chehalem Mountains AVA, Willamette Valley. Part of Stoller Wine Group. Explore their wines with Crushpad.ai.",
    path: "/chehalem",
    schema: {
      "@context": "https://schema.org",
      "@type": ["Winery", "TouristAttraction"],
      name: "Chehalem Winery",
      description: "Willamette Valley winery in the Chehalem Mountains AVA, part of Stoller Wine Group.",
      url: "https://crushpad.ai/chehalem",
      address: {
        "@type": "PostalAddress",
        addressRegion: "OR",
        addressCountry: "US",
      },
    },
  },
  soter: {
    title: "Soter Vineyards — AI Wine Concierge",
    description:
      "Soter Vineyards at Mineral Springs Ranch, Yamhill-Carlton AVA. Biodynamic estate Pinot Noir, Chardonnay, and sparkling wines.",
    path: "/soter",
    schema: {
      "@context": "https://schema.org",
      "@type": ["Winery", "TouristAttraction"],
      name: "Soter Vineyards",
      description: "Biodynamic estate at Mineral Springs Ranch in Yamhill-Carlton AVA producing Pinot Noir, Chardonnay, and sparkling wines.",
      url: "https://crushpad.ai/soter",
      address: {
        "@type": "PostalAddress",
        addressRegion: "OR",
        addressCountry: "US",
      },
    },
  },
};

/** Generates SEO props for winery sub-pages (demo, research, etc.) */
export function winerySubPageSEO(
  wineryName: string,
  slug: string,
  subPage: "demo" | "research" | "blind-tasting" | "match-me" | "analytics" | "admin"
): SEOProps {
  const configs: Record<string, Pick<SEOProps, "title" | "description" | "noindex">> = {
    demo: {
      title: `${wineryName} — Live AI Chatbot Demo`,
      description: `Try ${wineryName}'s AI wine concierge. Ask about wines, tasting notes, hours, and visit planning. Powered by Crushpad.ai.`,
    },
    research: {
      title: `${wineryName} — Wine Research & Insights`,
      description: `In-depth research and analysis of ${wineryName}'s wines, vineyard practices, and tasting experiences.`,
    },
    "blind-tasting": {
      title: `${wineryName} — Blind Tasting Challenge`,
      description: `Test your knowledge of ${wineryName}'s wines in this AI-powered blind tasting challenge.`,
    },
    "match-me": {
      title: `${wineryName} — Find Your Perfect Wine Match`,
      description: `Get personalized wine recommendations from ${wineryName} based on your taste preferences. Powered by Crushpad.ai.`,
    },
    analytics: {
      title: `${wineryName} — Analytics Dashboard`,
      description: `Analytics and engagement metrics for ${wineryName}'s AI wine concierge.`,
      noindex: true,
    },
    admin: {
      title: `${wineryName} — Admin Panel`,
      description: `Admin dashboard for ${wineryName}'s Crushpad.ai integration.`,
      noindex: true,
    },
  };

  const config = configs[subPage];
  return {
    ...config,
    path: `/${slug}/${subPage}`,
  };
}
