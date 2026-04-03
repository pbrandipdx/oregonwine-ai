/**
 * Crushpad.ai Self-Learning Pipeline
 *
 * Runs nightly (or on-demand) to improve the knowledge base from chat interactions.
 * No admin intervention required.
 *
 * What it does:
 *   1. FEEDBACK LOOP — Adjusts chunk confidence based on thumbs up/down ratings
 *   2. DEFLECTION MINING — Identifies knowledge gaps from deflected responses
 *   3. QUESTION CLUSTERING — Groups frequent questions to surface content priorities
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run learn
 *   npm run learn -- --since 48h          # look back 48 hours instead of 24
 *   npm run learn -- --winery rex-hill    # only process one winery
 *   npm run learn -- --dry-run            # preview changes without writing
 *
 * Scheduling (n8n or cron):
 *   0 3 * * * cd /path/to/crushpad-ai && npm run learn 2>&1 >> logs/learn.log
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ---------- Config ----------

const LOOKBACK_DEFAULT = "24h";
const MIN_DEFLECTIONS_FOR_GAP = 2; // Need at least 2 deflections on similar topic
const SIMILARITY_THRESHOLD = 0.6; // Jaccard similarity for question grouping
const MAX_SAMPLE_QUESTIONS = 5; // Keep top N examples per gap/cluster

// ---------- Types ----------

type Winery = { id: string; slug: string; name: string };

type DeflectedQuestion = {
  user_message: string;
  retrieved_chunk_ids: string[];
  retrieval_scores: number[];
  created_at: string;
};

type ChatLogWithFeedback = {
  feedback_rating: number;
  retrieved_chunk_ids: string[];
};

type QuestionStat = {
  user_message: string;
  retrieval_scores: number[];
  feedback_rating: number | null;
  created_at: string;
};

// ---------- Helpers ----------

function parseLookback(raw: string): Date {
  const match = raw.match(/^(\d+)(h|d|w)$/);
  if (!match) {
    console.error(`Invalid lookback: ${raw}. Use e.g. 24h, 7d, 2w`);
    process.exit(1);
  }
  const n = parseInt(match[1]);
  const unit = match[2];
  const ms =
    unit === "h" ? n * 3600000 : unit === "d" ? n * 86400000 : n * 604800000;
  return new Date(Date.now() - ms);
}

/** Simple word-overlap similarity for grouping questions. */
function questionSimilarity(a: string, b: string): number {
  const wordsA = new Set(
    a
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2)
  );
  const wordsB = new Set(
    b
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2)
  );
  if (wordsA.size === 0 || wordsB.size === 0) return 0;
  let intersection = 0;
  for (const w of wordsA) if (wordsB.has(w)) intersection++;
  const union = new Set([...wordsA, ...wordsB]).size;
  return intersection / union;
}

/** Group similar strings into clusters using single-linkage. */
function clusterQuestions(
  questions: string[],
  threshold: number
): string[][] {
  const clusters: string[][] = [];
  const assigned = new Set<number>();

  for (let i = 0; i < questions.length; i++) {
    if (assigned.has(i)) continue;
    const cluster = [questions[i]];
    assigned.add(i);

    for (let j = i + 1; j < questions.length; j++) {
      if (assigned.has(j)) continue;
      // Check against any member of the cluster
      const similar = cluster.some(
        (q) => questionSimilarity(q, questions[j]) >= threshold
      );
      if (similar) {
        cluster.push(questions[j]);
        assigned.add(j);
      }
    }
    clusters.push(cluster);
  }

  return clusters.sort((a, b) => b.length - a.length);
}

/** Generate a short label for a cluster of similar questions. */
function clusterLabel(questions: string[]): string {
  // Use the shortest question as the label (usually most direct)
  const sorted = [...questions].sort((a, b) => a.length - b.length);
  const label = sorted[0];
  // Capitalize first letter and ensure it ends cleanly
  return label.charAt(0).toUpperCase() + label.slice(1).replace(/[?.!]*$/, "");
}

// ---------- Step 1: Feedback Summary (read-only) ----------
// NOTE: Chunk confidence adjustment (feedback_boost) happens in REAL-TIME
// via the feedback edge function (supabase/functions/feedback/index.ts).
// This step only reports on recent feedback activity — it does NOT write
// to feedback_boost, avoiding double-counting.

async function summarizeFeedback(
  supabase: SupabaseClient,
  wineryId: string,
  wineryName: string,
  since: Date
): Promise<{ thumbsUp: number; thumbsDown: number }> {
  const { data: logs, error } = await supabase
    .from("chat_logs")
    .select("feedback_rating, retrieved_chunk_ids")
    .eq("winery_id", wineryId)
    .gte("created_at", since.toISOString())
    .not("feedback_rating", "is", null);

  if (error) {
    console.error(`  ✗ Feedback query error: ${error.message}`);
    return { thumbsUp: 0, thumbsDown: 0 };
  }

  if (!logs?.length) {
    console.log(`  No new feedback for ${wineryName}`);
    return { thumbsUp: 0, thumbsDown: 0 };
  }

  let thumbsUp = 0;
  let thumbsDown = 0;
  for (const log of logs as ChatLogWithFeedback[]) {
    if (log.feedback_rating === 1) thumbsUp++;
    else if (log.feedback_rating === -1) thumbsDown++;
  }

  return { thumbsUp, thumbsDown };
}

// ---------- Step 2: Deflection Mining ----------

async function mineDeflections(
  supabase: SupabaseClient,
  wineryId: string,
  wineryName: string,
  since: Date,
  dryRun: boolean
): Promise<number> {
  const { data: deflections, error } = await supabase.rpc(
    "get_deflected_questions",
    {
      p_winery_id: wineryId,
      p_since: since.toISOString(),
    }
  );

  if (error) {
    console.error(`  ✗ Deflection query error: ${error.message}`);
    return 0;
  }

  const questions = (deflections as DeflectedQuestion[])?.map(
    (d) => d.user_message
  );
  if (!questions?.length) {
    console.log(`  No deflections for ${wineryName}`);
    return 0;
  }

  console.log(`  Found ${questions.length} deflected questions`);

  // Cluster similar deflected questions
  const clusters = clusterQuestions(questions, SIMILARITY_THRESHOLD);
  const significantGaps = clusters.filter(
    (c) => c.length >= MIN_DEFLECTIONS_FOR_GAP
  );

  if (significantGaps.length === 0) {
    console.log(`  No repeated deflection patterns (min ${MIN_DEFLECTIONS_FOR_GAP} required)`);
    return 0;
  }

  let gapsCreated = 0;

  for (const cluster of significantGaps) {
    const label = clusterLabel(cluster);
    const samples = cluster.slice(0, MAX_SAMPLE_QUESTIONS);

    // Check if a similar open gap already exists
    // Escape LIKE wildcards to prevent user input from broadening the match
    const escapedLabel = label
      .slice(0, 30)
      .replace(/%/g, "\\%")
      .replace(/_/g, "\\_");
    const { data: existing } = await supabase
      .from("content_gaps")
      .select("id, frequency, sample_questions")
      .eq("winery_id", wineryId)
      .eq("status", "open")
      .ilike("gap_summary", `%${escapedLabel}%`)
      .limit(1);

    if (existing?.length) {
      // Update frequency on existing gap
      const gap = existing[0];
      if (!dryRun) {
        await supabase
          .from("content_gaps")
          .update({
            frequency: gap.frequency + cluster.length,
            sample_questions: [
              ...new Set([
                ...(gap.sample_questions || []),
                ...samples,
              ]),
            ].slice(0, MAX_SAMPLE_QUESTIONS),
            updated_at: new Date().toISOString(),
          })
          .eq("id", gap.id);
      }
      console.log(
        `    ↑ Updated gap: "${label}" (+${cluster.length} occurrences)`
      );
    } else {
      // Create new gap
      if (dryRun) {
        console.log(
          `    [DRY RUN] Would create gap: "${label}" (${cluster.length} questions)`
        );
      } else {
        const { error: insErr } = await supabase
          .from("content_gaps")
          .insert({
            winery_id: wineryId,
            gap_summary: label,
            sample_questions: samples,
            frequency: cluster.length,
            status: "open",
          });
        if (insErr) {
          console.error(`    ✗ Insert gap error: ${insErr.message}`);
          continue;
        }
      }
      console.log(
        `    + New gap: "${label}" (${cluster.length} questions)`
      );
      gapsCreated++;
    }
  }

  return gapsCreated;
}

// ---------- Step 3: Question Clustering ----------

async function clusterMonthlyQuestions(
  supabase: SupabaseClient,
  wineryId: string,
  wineryName: string,
  since: Date,
  until: Date,
  dryRun: boolean
): Promise<number> {
  const { data: stats, error } = await supabase.rpc("get_question_stats", {
    p_winery_id: wineryId,
    p_since: since.toISOString(),
    p_until: until.toISOString(),
  });

  if (error) {
    console.error(`  ✗ Question stats error: ${error.message}`);
    return 0;
  }

  const questions = stats as QuestionStat[];
  if (!questions?.length) {
    console.log(`  No questions to cluster for ${wineryName}`);
    return 0;
  }

  console.log(`  Clustering ${questions.length} questions`);

  const messages = questions.map((q) => q.user_message);
  const clusters = clusterQuestions(messages, SIMILARITY_THRESHOLD);

  // Only keep clusters with 2+ questions
  const significant = clusters.filter((c) => c.length >= 2);

  if (significant.length === 0) {
    console.log(`  No question clusters found (all unique)`);
    return 0;
  }

  // Build cluster records with aggregated stats
  const periodStart = since.toISOString().split("T")[0];
  const periodEnd = until.toISOString().split("T")[0];

  // Delete existing clusters for this period
  if (!dryRun) {
    await supabase
      .from("question_clusters")
      .delete()
      .eq("winery_id", wineryId)
      .eq("period_start", periodStart)
      .eq("period_end", periodEnd);
  }

  let clustersCreated = 0;

  for (const cluster of significant.slice(0, 20)) {
    // Top 20 clusters
    const label = clusterLabel(cluster);
    const samples = cluster.slice(0, MAX_SAMPLE_QUESTIONS);

    // Calculate avg retrieval score and avg feedback for questions in this cluster
    const matchingStats = questions.filter((q) =>
      cluster.includes(q.user_message)
    );
    const allScores = matchingStats.flatMap((q) => q.retrieval_scores ?? []);
    const avgScore =
      allScores.length > 0
        ? allScores.reduce((a, b) => a + b, 0) / allScores.length
        : null;
    const feedbackRatings = matchingStats
      .map((q) => q.feedback_rating)
      .filter((r): r is number => r !== null);
    const avgFeedback =
      feedbackRatings.length > 0
        ? feedbackRatings.reduce((a, b) => a + b, 0) / feedbackRatings.length
        : null;

    if (dryRun) {
      console.log(
        `    [DRY RUN] Cluster: "${label}" (${cluster.length}x, avg score: ${avgScore?.toFixed(2) ?? "n/a"}, avg feedback: ${avgFeedback?.toFixed(2) ?? "n/a"})`
      );
    } else {
      const { error: insErr } = await supabase
        .from("question_clusters")
        .insert({
          winery_id: wineryId,
          cluster_label: label,
          sample_questions: samples,
          question_count: cluster.length,
          avg_retrieval_score: avgScore,
          avg_feedback: avgFeedback,
          period_start: periodStart,
          period_end: periodEnd,
        });
      if (insErr) {
        console.error(`    ✗ Insert cluster error: ${insErr.message}`);
        continue;
      }
    }
    clustersCreated++;
  }

  // Log the top 5 with weak retrieval (these are content priorities)
  const weakRetrieval = significant
    .map((cluster) => {
      const matchingStats = questions.filter((q) =>
        cluster.includes(q.user_message)
      );
      const allScores = matchingStats.flatMap((q) => q.retrieval_scores ?? []);
      const avgScore =
        allScores.length > 0
          ? allScores.reduce((a, b) => a + b, 0) / allScores.length
          : 0;
      return { label: clusterLabel(cluster), count: cluster.length, avgScore };
    })
    .filter((c) => c.avgScore < 0.6)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  if (weakRetrieval.length > 0) {
    console.log(`\n  ⚠ Content priorities (frequent + weak retrieval):`);
    for (const w of weakRetrieval) {
      console.log(
        `    • "${w.label}" — ${w.count} questions, avg score ${w.avgScore.toFixed(2)}`
      );
    }
  }

  return clustersCreated;
}

// ---------- Main ----------

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Need SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const dryRun = process.argv.includes("--dry-run");
  const lookbackRaw =
    process.argv.find((a) => a.startsWith("--since="))?.split("=")[1] ||
    (process.argv.includes("--since")
      ? process.argv[process.argv.indexOf("--since") + 1]
      : null) ||
    LOOKBACK_DEFAULT;
  const wineryFilter =
    process.argv.find((a) => a.startsWith("--winery="))?.split("=")[1] ||
    (process.argv.includes("--winery")
      ? process.argv[process.argv.indexOf("--winery") + 1]
      : null);

  const since = parseLookback(lookbackRaw);
  const now = new Date();

  if (dryRun) console.log("🔍 DRY RUN — no changes will be written\n");
  console.log(`Looking back to: ${since.toISOString()}`);
  console.log(`Winery filter: ${wineryFilter ?? "all"}\n`);

  const supabase = createClient(url, key);

  // Get active wineries (exclude pairing-reference synthetic winery)
  let query = supabase
    .from("wineries")
    .select("id, slug, name")
    .eq("status", "active")
    .neq("slug", "pairing-reference");

  if (wineryFilter) {
    query = query.eq("slug", wineryFilter);
  }

  const { data: wineries, error: wErr } = await query;
  if (wErr) {
    console.error(`Failed to fetch wineries: ${wErr.message}`);
    process.exit(1);
  }

  if (!wineries?.length) {
    console.log("No active wineries found.");
    return;
  }

  console.log(`Processing ${wineries.length} winery(ies)…\n`);

  let totalBoosted = 0;
  let totalPenalized = 0;
  let totalGaps = 0;
  let totalClusters = 0;

  for (const winery of wineries as Winery[]) {
    console.log(`━━━ ${winery.name} (${winery.slug}) ━━━`);

    // Step 1: Feedback summary (read-only — real-time adjustments happen in feedback endpoint)
    console.log("\n  📊 Step 1: Feedback summary (applied in real-time)");
    const { thumbsUp, thumbsDown } = await summarizeFeedback(
      supabase,
      winery.id,
      winery.name,
      since
    );
    totalBoosted += thumbsUp;
    totalPenalized += thumbsDown;
    if (thumbsUp || thumbsDown) {
      console.log(`    👍 ${thumbsUp} thumbs up, 👎 ${thumbsDown} thumbs down (already applied in real-time)`);
    }

    // Step 2: Deflection mining
    console.log("\n  🔍 Step 2: Deflection mining → content gaps");
    const gaps = await mineDeflections(
      supabase,
      winery.id,
      winery.name,
      since,
      dryRun
    );
    totalGaps += gaps;

    // Step 3: Question clustering
    console.log("\n  📈 Step 3: Question clustering");
    const clusters = await clusterMonthlyQuestions(
      supabase,
      winery.id,
      winery.name,
      since,
      now,
      dryRun
    );
    totalClusters += clusters;

    console.log("");
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Summary:");
  console.log(`  Thumbs up:           ${totalBoosted} (applied in real-time)`);
  console.log(`  Thumbs down:         ${totalPenalized} (applied in real-time)`);
  console.log(`  Content gaps found:  ${totalGaps}`);
  console.log(`  Question clusters:   ${totalClusters}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  if (dryRun) {
    console.log("\n🔍 This was a dry run. Re-run without --dry-run to apply changes.");
  } else {
    console.log("\n✅ Learning pipeline complete.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
