/**
 * Fetch public HTML pages, strip boilerplate, split into embeddable chunks, upsert to Supabase.
 * Uses chunk_type "web_fetch" and replaces all prior web_fetch rows for this winery on each run
 * (hand-curated chunks from data/<slug>.json stay untouched).
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/crawl-fetch.ts rex-hill
 *
 * Then: npm run embed
 */
import { createClient } from "@supabase/supabase-js";
import { parse } from "node-html-parser";
import * as fs from "fs";
import * as path from "path";

const FETCH_CHUNK_TYPE = "web_fetch";
const MAX_CHUNK_CHARS = 1100;
const MIN_CHUNK_CHARS = 120;
const FETCH_TIMEOUT_MS = 25_000;
const USER_AGENT =
  "OregonWine.ai/1.0 (+https://github.com/pbrandipdx/oregonwine-ai; winery content fetch)";

interface FetchPage {
  url: string;
}

interface FetchConfig {
  slug: string;
  winery_id: string;
  name: string;
  pages: FetchPage[];
}

interface ChunkDef {
  chunk_text: string;
  source_url: string;
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Need SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function htmlToPlainText(html: string): string {
  const root = parse(html);
  root.querySelectorAll("script, style, noscript, iframe, svg").forEach((n) => n.remove());
  let text = root.text;
  text = text
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
  return text;
}

function splitIntoChunks(text: string, maxLen: number): string[] {
  const paras = text
    .split(/\n\s*\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const chunks: string[] = [];
  let buf = "";

  const pushBuf = () => {
    const t = buf.trim();
    if (!t) {
      buf = "";
      return;
    }
    if (t.length < MIN_CHUNK_CHARS && chunks.length > 0) {
      chunks[chunks.length - 1] += "\n\n" + t;
    } else {
      chunks.push(t);
    }
    buf = "";
  };

  for (const p of paras) {
    if (p.length > maxLen) {
      pushBuf();
      for (let i = 0; i < p.length; i += maxLen) {
        const slice = p.slice(i, i + maxLen).trim();
        if (slice) chunks.push(slice);
      }
      continue;
    }
    const candidate = buf ? `${buf}\n\n${p}` : p;
    if (candidate.length <= maxLen) buf = candidate;
    else {
      pushBuf();
      buf = p;
    }
  }
  pushBuf();

  return chunks.filter((c) => c.trim().length >= 40);
}

async function fetchPage(url: string): Promise<string | null> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: ac.signal,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    if (!res.ok) {
      console.error(`   ✗ ${url} → HTTP ${res.status}`);
      return null;
    }
    const html = await res.text();
    return html;
  } catch (e) {
    console.error(`   ✗ ${url} →`, e instanceof Error ? e.message : e);
    return null;
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: npx tsx scripts/crawl-fetch.ts <slug>");
    console.error("  Config: data/<slug>-fetch.json");
    process.exit(1);
  }

  const configPath = path.resolve(__dirname, "..", "data", `${slug}-fetch.json`);
  if (!fs.existsSync(configPath)) {
    console.error(`Config not found: ${configPath}`);
    process.exit(1);
  }

  const config: FetchConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  console.log(`\n🌐 Fetch crawl: ${config.name} (${config.slug})`);
  console.log(`   Pages: ${config.pages.length}\n`);

  const allChunks: ChunkDef[] = [];
  for (const { url } of config.pages) {
    const html = await fetchPage(url);
    if (!html) continue;
    const plain = htmlToPlainText(html);
    if (plain.length < 80) {
      console.error(`   ✗ ${url} → extracted text too short (${plain.length} chars), skip`);
      continue;
    }
    const prefix = `Page: ${url}\n\n`;
    const parts = splitIntoChunks(plain, MAX_CHUNK_CHARS - prefix.length);
    for (const part of parts) {
      allChunks.push({ source_url: url, chunk_text: prefix + part });
    }
    console.log(`   ✓ ${url} → ${parts.length} chunk(s)`);
  }

  if (allChunks.length === 0) {
    console.log("\nNo chunks produced. Exiting.");
    return;
  }

  console.log(`\n   Replacing ${FETCH_CHUNK_TYPE} rows for winery…`);
  const { error: delErr } = await supabase
    .from("winery_chunks")
    .delete()
    .eq("winery_id", config.winery_id)
    .eq("chunk_type", FETCH_CHUNK_TYPE);

  if (delErr) {
    console.error("   Delete error:", delErr.message);
    process.exit(1);
  }

  const now = new Date().toISOString();
  const batchSize = 20;
  let inserted = 0;
  for (let i = 0; i < allChunks.length; i += batchSize) {
    const batch = allChunks.slice(i, i + batchSize).map((c) => ({
      winery_id: config.winery_id,
      chunk_text: c.chunk_text,
      chunk_type: FETCH_CHUNK_TYPE,
      source_url: c.source_url,
      confidence: 0.85,
      fetched_at: now,
    }));

    const { error } = await supabase.from("winery_chunks").insert(batch);
    if (error) {
      console.error(`   Insert batch error:`, error.message);
      process.exit(1);
    }
    inserted += batch.length;
    console.log(`   ✓ Inserted ${inserted}/${allChunks.length}`);
  }

  console.log(`\n✅ Done: ${inserted} ${FETCH_CHUNK_TYPE} chunk(s). Run: npm run embed`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
