/**
 * Crawl & ingest winery content into Supabase winery_chunks.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/crawl.ts <slug>
 *
 * The script reads data/<slug>.json with hand-written chunk text per source URL, then
 * inserts rows into winery_chunks. For live HTML split into many chunks, use
 * `npm run crawl:fetch -- <slug>` (see data/<slug>-fetch.json).
 *
 * After running this script, run `npm run embed` to generate embeddings
 * for any new chunks.
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Config types
// ---------------------------------------------------------------------------

interface ChunkDef {
  chunk_text: string;
  chunk_type: string;
  source_url: string;
  confidence: number;
}

interface CrawlSource {
  url: string;
  chunk_type: string;
  confidence?: number;
  chunks: string[]; // pre-written chunk texts
}

interface WineryCrawlConfig {
  slug: string;
  winery_id: string;
  name: string;
  sources: CrawlSource[];
}

// ---------------------------------------------------------------------------
// Env & clients
// ---------------------------------------------------------------------------

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Need SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: npx tsx scripts/crawl.ts <winery-slug>");
    console.error("  e.g. npx tsx scripts/crawl.ts rex-hill");
    process.exit(1);
  }

  const configPath = path.resolve(__dirname, "..", "data", `${slug}.json`);
  if (!fs.existsSync(configPath)) {
    console.error(`Config not found: ${configPath}`);
    console.error(`Create data/${slug}.json with the crawl config first.`);
    process.exit(1);
  }

  const config: WineryCrawlConfig = JSON.parse(
    fs.readFileSync(configPath, "utf-8")
  );

  console.log(`\n🍷 Crawling: ${config.name} (${config.slug})`);
  console.log(`   Winery ID: ${config.winery_id}`);
  console.log(`   Sources: ${config.sources.length}\n`);

  // Build chunk list
  const chunks: ChunkDef[] = [];
  for (const source of config.sources) {
    for (const text of source.chunks) {
      chunks.push({
        chunk_text: text,
        chunk_type: source.chunk_type,
        source_url: source.url,
        confidence: source.confidence ?? 0.90,
      });
    }
  }

  console.log(`   Total chunks to upsert: ${chunks.length}\n`);

  if (chunks.length === 0) {
    console.log("Nothing to do.");
    return;
  }

  // Option: --replace flag deletes existing chunks first
  const replace = process.argv.includes("--replace");
  if (replace) {
    console.log("   --replace flag: deleting existing chunks…");
    const { error: delErr } = await supabase
      .from("winery_chunks")
      .delete()
      .eq("winery_id", config.winery_id);
    if (delErr) {
      console.error("   Delete error:", delErr.message);
      console.error("   Aborting to prevent duplicates.");
      process.exit(1);
    } else {
      console.log("   Existing chunks deleted.\n");
    }
  }

  // Insert chunks in batches of 20
  let inserted = 0;
  let errors = 0;
  const batchSize = 20;

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize).map((c) => ({
      winery_id: config.winery_id,
      chunk_text: c.chunk_text,
      chunk_type: c.chunk_type,
      source_url: c.source_url,
      confidence: c.confidence,
      fetched_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("winery_chunks").insert(batch);

    if (error) {
      console.error(`   Batch ${i}-${i + batch.length} error:`, error.message);
      errors += batch.length;
    } else {
      inserted += batch.length;
      console.log(
        `   ✓ Inserted ${Math.min(i + batchSize, chunks.length)}/${chunks.length}`
      );
    }
  }

  console.log(`\n✅ Done: ${inserted} inserted, ${errors} errors.`);
  console.log(`\nNext step: run 'npm run embed' to generate embeddings.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
