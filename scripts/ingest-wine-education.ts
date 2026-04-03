/**
 * Ingest wine education sources into winery_chunks under the synthetic
 * winery slug `pairing-reference`. Extends the pairing-only ingest script
 * to cover regions, varietals, winemaking, tasting, service, and viticulture.
 *
 * All chunks are automatically included in retrieval for every winery via
 * the match_chunks / search_chunks_keyword RPCs.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run ingest:education
 *   npm run ingest:education -- --replace    # replace existing education chunks
 *   npm run ingest:education -- --domain regions   # only ingest one domain
 *   npm run embed                            # generate embeddings after ingest
 */

import { createClient } from "@supabase/supabase-js";
import { parse } from "node-html-parser";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const CONFIG_PATH = path.join(ROOT, "data", "wine-education-sources.json");

const UA =
  "CrushpadAI-EducationIngest/0.1 (+https://crushpad.ai; wine education reference ingest)";

// ---------- Types ----------

type WikiSource = {
  kind: "wikipedia";
  title: string;
  publisher: string;
  licenseNote: string;
};

type HtmlSource = {
  kind: "html";
  url: string;
  publisher: string;
  licenseNote: string;
};

type DomainConfig = {
  chunkType: string;
  confidence: number;
  prefix: string;
  sources: (WikiSource | HtmlSource)[];
};

type ConfigFile = {
  allowedHosts: string[];
  domains: Record<string, DomainConfig>;
};

// ---------- Helpers ----------

function loadConfig(): ConfigFile {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`Missing ${CONFIG_PATH}`);
    console.error("Expected data/wine-education-sources.json");
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8")) as ConfigFile;
}

function hostAllowed(urlStr: string, allowed: string[]): boolean {
  let host: string;
  try {
    host = new URL(urlStr).hostname.toLowerCase();
  } catch {
    return false;
  }
  return allowed.some(
    (h) => host === h.toLowerCase() || host.endsWith("." + h.toLowerCase())
  );
}

async function fetchWikipediaExtract(
  title: string
): Promise<{ text: string; url: string }> {
  const api = new URL("https://en.wikipedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("format", "json");
  api.searchParams.set("prop", "extracts");
  api.searchParams.set("explaintext", "1");
  api.searchParams.set("exsectionformat", "plain");
  api.searchParams.set("titles", title);

  const r = await fetch(api.toString(), { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`Wikipedia API ${r.status}`);
  const j = (await r.json()) as {
    query?: {
      pages?: Record<string, { extract?: string; missing?: boolean }>;
    };
  };
  const pages = j.query?.pages;
  const page = pages && Object.values(pages)[0];
  if (!page?.extract || page.missing)
    throw new Error(`No extract for title=${title}`);
  const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;
  return { text: page.extract.trim(), url };
}

async function fetchHtmlMainText(url: string): Promise<string> {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`GET ${url} → ${r.status}`);
  const html = await r.text();
  const root = parse(html);
  const main =
    root.querySelector("article") ||
    root.querySelector("main") ||
    root.querySelector('[role="main"]') ||
    root.querySelector(".content") ||
    root;
  main
    .querySelectorAll("script, style, nav, footer, aside")
    .forEach((el) => el.remove());
  return main.text.replace(/\s+/g, " ").trim();
}

function chunkText(body: string, maxLen: number): string[] {
  const paras = body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const out: string[] = [];
  let cur = "";
  for (const p of paras) {
    const next = cur ? `${cur}\n\n${p}` : p;
    if (next.length <= maxLen) {
      cur = next;
      continue;
    }
    if (cur) out.push(cur);
    if (p.length <= maxLen) {
      cur = p;
      continue;
    }
    // Split long paragraphs by sentence
    const sentences = p.match(/[^.!?]+[.!?]+/g) || [p];
    let sentBuf = "";
    for (const s of sentences) {
      const next2 = sentBuf ? `${sentBuf} ${s.trim()}` : s.trim();
      if (next2.length <= maxLen) {
        sentBuf = next2;
      } else {
        if (sentBuf) out.push(sentBuf);
        sentBuf = s.trim();
      }
    }
    if (sentBuf) out.push(sentBuf);
    cur = "";
  }
  if (cur) out.push(cur);
  return out.filter((c) => c.length >= 80); // Drop tiny fragments
}

function prefixChunk(
  body: string,
  domainPrefix: string,
  publisher: string,
  sourceUrl: string,
  licenseNote: string
): string {
  const header = `[${domainPrefix} | ${publisher} | Source: ${sourceUrl} | ${licenseNote} | Not specific to any one winery — cite this as reference material, not as that winery's policy.]`;
  return `${header}\n\n${body}`;
}

// ---------- Main ----------

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Need SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const cfg = loadConfig();
  if (!cfg.allowedHosts?.length || !cfg.domains) {
    console.error("wine-education-sources.json needs allowedHosts and domains");
    process.exit(1);
  }

  const supabase = createClient(url, key);
  const { data: winery, error: wErr } = await supabase
    .from("wineries")
    .select("id")
    .eq("slug", "pairing-reference")
    .maybeSingle();

  if (wErr || !winery?.id) {
    console.error(
      "Winery slug pairing-reference not found. Apply migration 20260331200000."
    );
    process.exit(1);
  }

  const replace = process.argv.includes("--replace");
  const domainFilter = process.argv.find((a) => a.startsWith("--domain="))?.split("=")[1]
    || (process.argv.includes("--domain") ? process.argv[process.argv.indexOf("--domain") + 1] : null);
  const maxChunk = parseInt(process.env.EDUCATION_CHUNK_CHARS ?? "900", 10);

  const domainKeys = domainFilter
    ? [domainFilter].filter((d) => d in cfg.domains)
    : Object.keys(cfg.domains);

  if (domainFilter && domainKeys.length === 0) {
    console.error(`Domain "${domainFilter}" not found. Available: ${Object.keys(cfg.domains).join(", ")}`);
    process.exit(1);
  }

  let grandTotal = 0;

  for (const domainKey of domainKeys) {
    const domain = cfg.domains[domainKey];
    console.log(`\n=== ${domain.prefix} (${domain.sources.length} sources) ===`);
    let domainTotal = 0;

    for (const src of domain.sources) {
      let plain: string;
      let sourceUrl: string;

      if (src.kind === "wikipedia") {
        sourceUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(src.title.replace(/ /g, "_"))}`;
        if (!hostAllowed(sourceUrl, cfg.allowedHosts)) {
          console.error(`  Skip (host not allowlisted): ${src.title}`);
          continue;
        }
        console.log(`  → Wikipedia: ${src.title}`);
        try {
          const got = await fetchWikipediaExtract(src.title);
          plain = got.text;
          sourceUrl = got.url;
        } catch (e) {
          console.error(`  ✗ Failed: ${e instanceof Error ? e.message : e}`);
          continue;
        }
      } else if (src.kind === "html") {
        sourceUrl = src.url;
        if (!hostAllowed(sourceUrl, cfg.allowedHosts)) {
          console.error(`  Skip (host not in allowedHosts): ${sourceUrl}`);
          continue;
        }
        console.log(`  → HTML: ${sourceUrl}`);
        try {
          plain = await fetchHtmlMainText(sourceUrl);
        } catch (e) {
          console.error(`  ✗ Failed: ${e instanceof Error ? e.message : e}`);
          continue;
        }
      } else {
        console.error("  Unknown source kind", src);
        continue;
      }

      // Delete existing chunks for this source if --replace
      if (replace) {
        const { error: delErr } = await supabase
          .from("winery_chunks")
          .delete()
          .eq("winery_id", winery.id)
          .eq("source_url", sourceUrl)
          .eq("chunk_type", domain.chunkType);
        if (delErr) console.warn("  Delete existing:", delErr.message);
      }

      const pieces = chunkText(plain, maxChunk);
      const rows = pieces.map((body) => ({
        winery_id: winery.id,
        chunk_text: prefixChunk(
          body,
          domain.prefix,
          src.publisher,
          sourceUrl,
          src.licenseNote
        ),
        chunk_type: domain.chunkType,
        source_url: sourceUrl,
        confidence: domain.confidence,
        fetched_at: new Date().toISOString(),
      }));

      if (rows.length === 0) {
        console.log(`    (no usable chunks — content too short)`);
        continue;
      }

      const { error: insErr } = await supabase
        .from("winery_chunks")
        .insert(rows);
      if (insErr) {
        console.error(`  ✗ Insert error: ${insErr.message}`);
        continue;
      }
      domainTotal += rows.length;
      console.log(`    Inserted ${rows.length} chunks`);

      // Rate-limit Wikipedia API calls (skip delay for HTML sources)
      if (src.kind === "wikipedia") {
        await new Promise((r) => setTimeout(r, 1200));
      }
    }

    console.log(`  Subtotal: ${domainTotal} chunks for ${domainKey}`);
    grandTotal += domainTotal;
  }

  console.log(`\n✅ Done. ${grandTotal} total education chunks inserted.`);
  console.log("   Run: npm run embed");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
