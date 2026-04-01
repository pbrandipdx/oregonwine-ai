/**
 * Ingest allowlisted pairing-education sources into winery_chunks under the
 * synthetic winery slug `pairing-reference`. Those chunks are merged at retrieval
 * time with the widget winery (see migration pairings_reference_retrieval).
 *
 * LEGAL: Only add hosts/URLs you may use. Wikipedia is fetched via the official
 * API (respect CC BY-SA attribution in chunk prefix). For commercial "world class"
 * sites, obtain permission or use licensed feeds — do not bypass paywalls.
 *
 * Setup:
 *   cp data/pairing-allowlist.example.json data/pairing-allowlist.json
 *   # edit pairing-allowlist.json — keep allowedHosts in sync with sources
 *
 * Run:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run ingest:pairing
 *   npm run embed
 */

import { createClient } from "@supabase/supabase-js";
import { parse } from "node-html-parser";
import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "..");
const CONFIG_PATH = path.join(ROOT, "data", "pairing-allowlist.json");

const UA =
  "CrushpadAI-PairingIngest/0.1 (+https://crushpad.ai; internal research ingest)";

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

type AllowlistFile = {
  allowedHosts: string[];
  sources: (WikiSource | HtmlSource)[];
};

function loadConfig(): AllowlistFile {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`Missing ${CONFIG_PATH}`);
    console.error("Copy data/pairing-allowlist.example.json → data/pairing-allowlist.json");
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8")) as AllowlistFile;
}

function hostAllowed(urlStr: string, allowed: string[]): boolean {
  let host: string;
  try {
    host = new URL(urlStr).hostname.toLowerCase();
  } catch {
    return false;
  }
  return allowed.some((h) => host === h.toLowerCase() || host.endsWith("." + h.toLowerCase()));
}

async function fetchWikipediaExtract(title: string): Promise<{ text: string; url: string }> {
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
    query?: { pages?: Record<string, { extract?: string; missing?: boolean }> };
  };
  const pages = j.query?.pages;
  const page = pages && Object.values(pages)[0];
  if (!page?.extract || page.missing) throw new Error(`No extract for title=${title}`);
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
  main.querySelectorAll("script, style, nav, footer, aside").forEach((el) => el.remove());
  return main.text.replace(/\s+/g, " ").trim();
}

function chunkText(body: string, maxLen: number): string[] {
  const paras = body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
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
    for (let i = 0; i < p.length; i += maxLen) {
      out.push(p.slice(i, i + maxLen));
    }
    cur = "";
  }
  if (cur) out.push(cur);
  return out.filter(Boolean);
}

function prefixChunk(
  body: string,
  publisher: string,
  sourceUrl: string,
  licenseNote: string
): string {
  const header = `[General pairing education | ${publisher} | Source: ${sourceUrl} | ${licenseNote} | Not specific to any one winery — cite this as reference material, not as that winery's policy.]`;
  return `${header}\n\n${body}`;
}

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Need SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const cfg = loadConfig();
  if (!cfg.allowedHosts?.length || !cfg.sources?.length) {
    console.error("pairing-allowlist.json needs allowedHosts and sources");
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
      "Winery slug pairing-reference not found. Apply migration 20260331200000_pairing_reference_retrieval.sql (supabase db push)."
    );
    process.exit(1);
  }

  const replace = process.argv.includes("--replace");
  const maxChunk = parseInt(process.env.PAIRING_CHUNK_CHARS ?? "900", 10);

  let total = 0;

  for (const src of cfg.sources) {
    let plain: string;
    let sourceUrl: string;
    let publisher: string;
    let licenseNote: string;

    if (src.kind === "wikipedia") {
      sourceUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(src.title.replace(/ /g, "_"))}`;
      if (!hostAllowed(sourceUrl, cfg.allowedHosts)) {
        console.error(`Skip Wikipedia title (host not allowlisted): ${src.title}`);
        continue;
      }
      console.log(`→ Wikipedia: ${src.title}`);
      const got = await fetchWikipediaExtract(src.title);
      plain = got.text;
      sourceUrl = got.url;
      publisher = src.publisher;
      licenseNote = src.licenseNote;
    } else if (src.kind === "html") {
      sourceUrl = src.url;
      if (!hostAllowed(sourceUrl, cfg.allowedHosts)) {
        console.error(`Skip URL (host not in allowedHosts): ${sourceUrl}`);
        continue;
      }
      console.log(`→ HTML: ${sourceUrl}`);
      plain = await fetchHtmlMainText(sourceUrl);
      publisher = src.publisher;
      licenseNote = src.licenseNote;
    } else {
      console.error("Unknown source kind", src);
      continue;
    }

    if (replace) {
      const { error: delErr } = await supabase
        .from("winery_chunks")
        .delete()
        .eq("winery_id", winery.id)
        .eq("source_url", sourceUrl);
      if (delErr) console.warn("Delete existing chunks:", delErr.message);
    }

    const pieces = chunkText(plain, maxChunk);
    const rows = pieces.map((body) => ({
      winery_id: winery.id,
      chunk_text: prefixChunk(body, publisher, sourceUrl, licenseNote),
      chunk_type: "general_pairing_ref",
      source_url: sourceUrl,
      confidence: 0.72,
      fetched_at: new Date().toISOString(),
    }));

    const { error: insErr } = await supabase.from("winery_chunks").insert(rows);
    if (insErr) {
      console.error("Insert error:", insErr.message);
      process.exit(1);
    }
    total += rows.length;
    console.log(`   Inserted ${rows.length} chunks`);

    await new Promise((r) => setTimeout(r, 1200));
  }

  console.log(`\n✅ Done. ${total} chunks inserted for pairing-reference.`);
  console.log("   Run: npm run embed");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
