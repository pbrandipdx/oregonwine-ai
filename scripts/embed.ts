/**
 * Batch-embed winery_chunks where embedding is null.
 * Usage: OPENAI_API_KEY=... SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run embed
 */
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const openaiKey = process.env.OPENAI_API_KEY;
const model = process.env.EMBEDDING_MODEL ?? "text-embedding-3-small";
const batchSize = Math.min(100, Math.max(1, parseInt(process.env.EMBED_BATCH_SIZE ?? "20", 10)));

if (!url || !key || !openaiKey) {
  console.error("Need SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);
const openai = new OpenAI({ apiKey: openaiKey });

async function main() {
  const { data: rows, error } = await supabase
    .from("winery_chunks")
    .select("id, chunk_text")
    .is("embedding", null)
    .limit(500);

  if (error) {
    console.error(error);
    process.exit(1);
  }
  if (!rows?.length) {
    console.log("No chunks need embeddings.");
    return;
  }

  console.log(`Embedding ${rows.length} chunk(s)…`);

  for (let i = 0; i < rows.length; i += batchSize) {
    const slice = rows.slice(i, i + batchSize);
    const inputs = slice.map((r) => r.chunk_text);
    const res = await openai.embeddings.create({ model, input: inputs });
    for (let j = 0; j < slice.length; j++) {
      const emb = res.data[j]?.embedding;
      if (!emb) continue;
      const { error: upErr } = await supabase
        .from("winery_chunks")
        .update({ embedding: emb, embedding_model: model })
        .eq("id", slice[j].id);
      if (upErr) console.error("update", slice[j].id, upErr.message);
    }
    console.log(`  …${Math.min(i + batchSize, rows.length)}/${rows.length}`);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
