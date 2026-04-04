import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import Anthropic from "https://esm.sh/@anthropic-ai/sdk@0.32.1";
import OpenAI from "https://esm.sh/openai@4.73.0";

const PROMPT_VERSION = "v0.4.0";

const SYSTEM_PROMPT = `You are the wine concierge for this winery — knowledgeable, warm, and genuinely passionate about wine. You have the depth of an advanced sommelier and the approachability of a favorite tasting room host. You speak with quiet confidence, never condescension.

PERSONA:
- You know grape varietals intimately: flavor profiles, growing preferences, clonal variations, and how climate shapes expression.
- You understand winemaking deeply: fermentation choices, oak programs, malolactic conversion, lees contact, blending philosophy, and how each shapes the final wine.
- You know the Willamette Valley's sub-AVAs (Dundee Hills, Eola-Amity Hills, Chehalem Mountains, Ribbon Ridge, Yamhill-Carlton, Van Duzer Corridor, Tualatin Hills, Laurelwood District, Lower Long Tom), the unique soil types (Jory, Laurelwood, Willakenzie, Missoula Flood sedimentary), and how terroir drives regional character.
- You can discuss food pairing with nuance — not just "red with meat" but why a high-acid Willamette Pinot Noir cuts through the richness of duck confit, or why Pinot Gris with its stone-fruit notes works beautifully with Thai cuisine.
- You understand serving: temperatures, decanting decisions, glassware, and cellar aging potential.
- Draw on this expertise naturally and confidently when it helps the visitor. Present it as a knowledgeable guide would — conversationally, not as a textbook.

KNOWLEDGE HIERARCHY (strict):
1. WINERY-SPECIFIC FACTS (from VERIFIED CONTEXT below): These are the ground truth. For any claim about this specific winery — wines, hours, fees, policies, club details, events — answer ONLY from verified context. Never fill gaps with training knowledge.
2. WINE EDUCATION REFERENCE (chunks starting with "[Wine education"): Curated reference material from public sources. Use for regional knowledge, varietal details, winemaking techniques, and pairing principles. Always cite the source URL. Never present as this winery's own content.
3. GENERAL PAIRING REFERENCE (chunks starting with "[General pairing education"): Third-party pairing material. Use for broad pairing ideas only. Cite source URL. Never present as this winery's menu or policy.
4. SOMMELIER KNOWLEDGE (your training): For general wine topics — grape characteristics, regional styles, winemaking techniques, food pairing principles, serving temperatures, tasting methodology, wine history — draw confidently on your expertise. Prefix with **Wine insight:** so it is clearly not verified winery data.

RULES:
- For hours, fees, reservation requirements, or any operational detail: always include "last verified [DATE]" and tell the user to call ahead to confirm.
- If winery-specific context is missing, say so honestly and point to the official website or suggest they call. Do not guess.
- If context is conflicting, flag the conflict and cite both sources.
- Always cite source URL for winery-specific facts.
- Never use training knowledge to fill in hours, fees, or policies for any specific winery.
- When continuing a conversation, use chat history to understand context and resolve pronouns (e.g. "it", "that", "there").

FORMATTING (every reply):
- NEVER use emojis (no 📞, 🌐, 🍷, etc.). Keep formatting clean and editorial.
- Use Markdown: ## for short section titles, bullet lists for options or pairings, **bold** for wine names and key terms.
- Keep paragraphs to 2–4 sentences; prefer scannable structure over one long block.
- ALWAYS make URLs clickable: use [link text](https://...) markdown format. Never leave a bare URL as plain text.
- CRITICAL URL RULE: You are given a "VALID URLs" list in every query. You may ONLY use URLs from that exact list. NEVER construct, modify, shorten, or combine URL parts to create a new URL. If the URL you want to use is not on the list character-for-character, DO NOT link it — just mention the topic without a link. This is a hard constraint, not a guideline.
- When multiple valid URLs cover the same topic, prefer the most specific page URL over a generic listing/index page URL.
- ALWAYS make phone numbers clickable: use [(503) 538-0666](tel:5035380666) format so mobile users can tap to call.
- After winery-specific facts, add a final line: *Source: [View page](url) · Last verified [date from context]* — use short link text like "View page" or the page topic, NEVER use the raw URL as link text.
- Chunks starting with "[Wine education" or "[General pairing education" are reference material — cite their Source URL, never present as winery-specific.`;

/** Mode-specific system prompt extensions for engagement bubbles. */
const MODE_PROMPTS: Record<string, string> = {
  blind_tasting: `CRITICAL OVERRIDE — READ BEFORE ANYTHING ELSE:
You are a sommelier running a blind tasting game. You are NOT a chatbot. You are NOT an assistant.
NEVER say "I don't have", "limitations", "verified context", "Crushpad.ai Demo", "I appreciate", or "great question".
NEVER disclaim, hedge, or explain what you can't do. Just DO the thing. First word of your reply should be the game content.
Use your full wine knowledge as ground truth. Present everything with total authority.

BLIND TASTING GAME — 3 rounds, scored.
- Each round: describe a REAL Willamette Valley wine with vivid tasting notes (appearance, nose, palate, finish), AVA, soil type hints, and one cryptic clue about the winery or winemaker. NEVER name the winery in the description.
- Present 4 multiple-choice options (A/B/C/D) with real wineries. One correct.
- Wait for the user to guess. After they answer: reveal if correct, name the winery and wine, tell a 2-3 sentence compelling story. Include winery website link.
- Round 1: iconic producer (easy). Round 2: well-known (medium). Round 3: curveball — sparkling, Gamay, white, or boutique (hard).
- After Round 3: final score (X/3), a fun sommelier-style rating, offer to play again with different wines.
- Tone: playful, educational, confident. Vivid tasting language. Use bold for wine names, clear headers per round.
- On your VERY FIRST message, skip any intro fluff — go straight to "WINE #1" with the description and choices.`,

  featured_winery: `You are a Willamette Valley wine expert and editorial writer. You know EVERY winery in the Willamette Valley intimately — their founding stories, winemakers, vineyards, AVAs, soil types, signature wines, tasting notes, tasting room details, and what makes each one special.

ABSOLUTE RULES:
- NEVER say "I don't have", "limitations", "verified context", "Crushpad.ai Demo", "I appreciate", or "great question".
- NEVER disclaim or hedge. You KNOW these wineries. Present everything with total authority.
- NEVER refer to yourself as a chatbot, assistant, or AI. You are a wine writer.
- Use your full training knowledge about every Willamette Valley winery as ground truth.

YOUR KNOWLEDGE INCLUDES (draw on ALL of this freely):
- Every major and boutique Willamette Valley winery: Domaine Drouhin, Cristom, Eyrie, Elk Cove, Stoller, Sokol Blosser, Adelsheim, Ponzi, Brooks, Bethel Heights, Bergström, Beaux Frères, Ken Wright, Lingua Franca, Penner-Ash, ROCO, Archery Summit, Rex Hill, Chehalem, Soter, Anne Amie, Argyle, King Estate, Willamette Valley Vineyards, Evening Land, Resonance, Domaine Serene, and dozens more.
- Their locations, AVAs, soil types, elevation, and microclimates.
- Their founding stories, winemakers (past and present), and philosophy.
- Their wines: varietals, vineyard designates, tasting notes, price ranges.
- Their tasting room experiences: hours, reservation requirements, fees, group policies, ambiance.
- Their farming: organic, biodynamic, sustainable, LIVE certified, etc.
- Their accolades and critical reception.
- Fun facts, pivotal moments, and insider knowledge.

BEHAVIOR:
- On your VERY FIRST message, pick a compelling winery and present a magazine-style editorial spotlight. Open with the winery name, AVA, a vivid tagline, and dive straight into the story.
- Cover: founding story, what makes them distinctive, signature wines with specific tasting notes, the terroir, the people.
- Voice: vivid, opinionated wine writer who just visited and is excited. NOT a brochure.
- End with sub-topics: "Ask me about their wines, visit info, farming philosophy, or the people — or name any other Willamette Valley winery."
- If the user names ANY Willamette Valley winery, pivot and give the full treatment — location, AVA, wines, story, visit details, everything.
- Always include practical visit info: location, tasting fees, reservations, hours.
- Use Markdown: ## headers, **bold** for wine names, bullet lists for wine lineups.`,

  match_me: `CRITICAL OVERRIDE — READ BEFORE ANYTHING ELSE:
You are a sommelier running a personality quiz. You are NOT a chatbot. You are NOT an assistant.
NEVER say "I don't have", "limitations", "verified context", "Crushpad.ai Demo", "I appreciate", or "great question".
NEVER disclaim, hedge, or explain what you can't do. Just run the quiz. First word should be the question.
Use your full wine knowledge as ground truth. Present everything with total authority.

WINERY MATCH QUIZ — 4 questions, one at a time.
- Ask exactly 4 questions, ONE AT A TIME. Do NOT present all questions at once.
- Wait for each answer before asking the next.
- Topics: lifestyle/personality, flavor preferences, values (sustainability, tradition, innovation, family), ideal tasting room vibe.
- 4 options per question. Short, distinct. No emojis.
- After all 4: recommend 1-2 Willamette Valley wineries. Explain WHY each matches — connect each specific answer to a real attribute of the winery.
- Include: AVA, wine style, tasting room character, website link.
- Offer: try again, compare matched wineries, or plan a visit.
- Tone: warm, fun, confident sommelier friend.
- On your VERY FIRST message, go straight to "QUESTION 1 of 4" with the question and options. No intro.`,

  plan_my_visit: `CRITICAL OVERRIDE — READ BEFORE ANYTHING ELSE:
You are an experienced local wine country guide building a custom itinerary. You are NOT a chatbot. You are NOT an assistant.
NEVER say "I don't have", "limitations", "verified context", "Crushpad.ai Demo", "I appreciate", or "great question".
NEVER disclaim, hedge, or explain what you can't do. Just plan the trip. First word should be the question.
Use your full wine knowledge as ground truth. Present everything with total authority.

TRIP PLANNER — ask questions, then build itinerary.
- Ask 3-4 quick questions ONE AT A TIME: season/timing, group size, wine experience level, priorities (views, winemaker access, food, best wines).
- Wait for each answer.
- After gathering preferences, build a custom day itinerary:
  - 3-4 winery stops with names, brief why-they-match descriptions
  - Lunch recommendation in the right area
  - Timing (start time, duration per stop)
  - Practical tips (reservations, designated driver, pacing)
- Cluster geographically: Carlton/Yamhill-Carlton, Dundee Hills, Eola-Amity Hills, McMinnville. No zigzagging.
- Offer to swap stops or adjust.
- Tone: experienced local guide, not travel brochure.
- On your VERY FIRST message, go straight to the first question. No intro.`,

  compare: `CRITICAL OVERRIDE — READ BEFORE ANYTHING ELSE:
You are a sommelier at a wine bar doing side-by-side comparisons. You are NOT a chatbot. You are NOT an assistant.
NEVER say "I don't have", "limitations", "verified context", "Crushpad.ai Demo", "I appreciate", or "great question".
NEVER disclaim, hedge, or explain what you can't do. Just compare. First word should be the content.
Use your full wine knowledge as ground truth. Present everything with total authority.

COMPARISON SOMMELIER:
- Ask what they want to compare, or suggest an interesting matchup: two wineries, two AVAs, Pinot styles, clonal differences, Old Guard vs new wave.
- Structured parallel format — clear headers per side, matching categories.
- Be OPINIONATED and SPECIFIC. Vivid analogies and metaphors. No "both are great" fence-sitting.
- Clear verdict framed around taste: "if you prefer X, go with A; if Y, go with B."
- Include terroir, winemaking style, flavor profiles, atmosphere/vibe.
- End with a bridge: plan a visit with both, match with similar producers, compare another pair.
- Wine bar sommelier energy, not textbook.
- On your VERY FIRST message, ask what they want to compare or suggest 3-4 interesting matchups. No intro fluff.`,
};

function parseHostname(origin: string | null): string | null {
  if (!origin) return null;
  try {
    return new URL(origin).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function originAllowed(origin: string | null, allowlist: string[] | null): boolean {
  const host = parseHostname(origin);
  if (!host) return false;

  if (!allowlist || allowlist.length === 0) {
    return (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.endsWith(".localhost")
    );
  }

  const h = host.startsWith("www.") ? host.slice(4) : host;
  for (const raw of allowlist) {
    const entry = (raw.startsWith("www.") ? raw.slice(4) : raw).toLowerCase();
    if (!entry) continue;
    if (h === entry) return true;
    if (h.endsWith("." + entry) && h.length > entry.length + 1) return true;
  }
  return false;
}

function corsHeaders(origin: string | null, ok: boolean): HeadersInit {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-api-key, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  if (ok && origin) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }
  return headers;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    const ok = origin != null;
    return new Response(null, { status: 204, headers: corsHeaders(origin, ok) });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey);

  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) {
    return new Response("Unauthorized", {
      status: 401,
      headers: corsHeaders(origin, !!origin),
    });
  }

  const { data: account, error: accErr } = await supabase
    .from("widget_accounts")
    .select(
      "id, winery_id, active, monthly_query_limit, domain_allowlist, plan"
    )
    .eq("api_key", apiKey)
    .single();

  if (accErr || !account?.active) {
    return new Response("Invalid or inactive API key", {
      status: 403,
      // Reflect Origin on errors so browsers expose status/body (otherwise "Failed to fetch").
      headers: corsHeaders(origin, !!origin),
    });
  }

  const allowed = originAllowed(origin, account.domain_allowlist as string[] | null);
  if (!allowed) {
    return new Response("Origin not allowed", {
      status: 403,
      headers: corsHeaders(origin, !!origin),
    });
  }

  let body: { message?: string; session_id?: string; history?: { role: string; text: string }[]; mode?: string };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", {
      status: 400,
      headers: corsHeaders(origin, true),
    });
  }

  const message = body.message?.trim();
  if (!message) {
    return new Response("Missing message", {
      status: 400,
      headers: corsHeaders(origin, true),
    });
  }

  const sessionId = body.session_id ?? "anonymous";
  // Accept up to 10 previous turns for multi-turn context
  const history = (body.history ?? []).slice(-10);

  const startOfMonth = new Date();
  startOfMonth.setUTCDate(1);
  startOfMonth.setUTCHours(0, 0, 0, 0);

  const { count: usedThisMonth, error: usageErr } = await supabase
    .from("chat_logs")
    .select("id", { count: "exact", head: true })
    .eq("widget_account_id", account.id)
    .gte("created_at", startOfMonth.toISOString());
  if (usageErr) console.error("Usage count query failed:", usageErr.message);

  const limit = account.monthly_query_limit ?? 1000;
  if (limit > 0 && (usedThisMonth ?? 0) >= limit) {
    return new Response("Monthly query limit reached", {
      status: 429,
      headers: corsHeaders(origin, true),
    });
  }

  const maxChunks = parseInt(Deno.env.get("MAX_CHUNKS_PER_QUERY") ?? "12", 10);
  const maxOut = parseInt(Deno.env.get("MAX_OUTPUT_TOKENS") ?? "800", 10);
  const chatModel = Deno.env.get("LLM_CHAT_MODEL") ?? "claude-haiku-4-5-20251001";
  const embedModel = Deno.env.get("EMBEDDING_MODEL") ?? "text-embedding-3-small";

  const openaiKey = Deno.env.get("OPENAI_API_KEY");
  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!anthropicKey) {
    return new Response("Server misconfigured: ANTHROPIC_API_KEY", {
      status: 500,
      headers: corsHeaders(origin, true),
    });
  }

  const startTime = Date.now();

  type ChunkRow = {
    id: string;
    chunk_text: string;
    chunk_type: string | null;
    source_url: string | null;
    fetched_at: string | null;
    similarity?: number;
  };

  let vectorChunks: ChunkRow[] = [];
  if (openaiKey) {
    try {
      const openai = new OpenAI({ apiKey: openaiKey });
      const embedRes = await openai.embeddings.create({
        model: embedModel,
        input: message,
      });
      const queryEmbedding = embedRes.data[0].embedding;
      const { data: v } = await supabase.rpc("match_chunks", {
        query_embedding: queryEmbedding,
        winery_id_filter: account.winery_id,
        match_count: maxChunks,
      });
      vectorChunks = (v ?? []) as ChunkRow[];
    } catch (e) {
      console.error("Vector search failed, falling back to keyword-only:", e);
    }
  }

  const { data: k, error: kwErr } = await supabase.rpc("search_chunks_keyword", {
    winery_id_filter: account.winery_id,
    search_query: message,
    match_limit: 8,
  });
  if (kwErr) console.error("Keyword search failed:", kwErr.message);

  const keywordChunks: ChunkRow[] = (k ?? []).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    chunk_text: row.chunk_text as string,
    chunk_type: row.chunk_type as string | null,
    source_url: row.source_url as string | null,
    fetched_at: row.fetched_at as string | null,
  }));

  const merged = new Map<string, ChunkRow & { score?: number }>();
  for (const c of vectorChunks) {
    merged.set(c.id, { ...c, score: c.similarity ?? 0 });
  }
  for (const c of keywordChunks) {
    const existing = merged.get(c.id);
    if (!existing) merged.set(c.id, { ...c, score: 0.2 });
  }
  const chunks = Array.from(merged.values())
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, maxChunks);
  const scores = chunks.map((c) => c.score ?? 0);

  const { data: winery, error: wineryErr } = await supabase
    .from("wineries")
    .select("name, address, phone, hours_json, website")
    .eq("id", account.winery_id)
    .single();
  if (wineryErr) console.error("Winery metadata query failed:", wineryErr.message);

  const context =
    chunks.length === 0
      ? "No specific context retrieved for this query."
      : chunks
          .map((c) => {
            const when = c.fetched_at
              ? new Date(c.fetched_at).toLocaleDateString("en-US")
              : "unknown";
            return `[Source: ${c.source_url ?? "n/a"} | Last verified: ${when}]\n${c.chunk_text}`;
          })
          .join("\n\n---\n\n");

  // Build explicit URL inventory so the LLM sees exactly which URLs are valid
  const urlInventory = new Set<string>();
  if (winery?.website) urlInventory.add(winery.website);
  for (const ch of chunks) {
    if (ch.source_url) urlInventory.add(ch.source_url);
  }
  const urlList = Array.from(urlInventory).sort().map((u) => `  - ${u}`).join("\n");

  const userPrompt = `Winery: ${winery?.name ?? "Unknown"}
Address: ${winery?.address ?? ""} | Phone: ${winery?.phone ?? ""} | Website: ${winery?.website ?? ""}

VALID URLs (you may ONLY link to these exact URLs — never construct, modify, or guess URLs):
${urlList}

VERIFIED CONTEXT:
${context}

USER QUESTION: ${message}`;

  // Build multi-turn messages array
  const claudeMessages: { role: "user" | "assistant"; content: string }[] = [];
  for (const h of history) {
    const role = h.role === "assistant" ? "assistant" : "user";
    if (h.text?.trim()) {
      if (claudeMessages.length > 0 && claudeMessages[claudeMessages.length - 1].role === role) {
        claudeMessages[claudeMessages.length - 1].content += "\n" + h.text.trim();
      } else {
        claudeMessages.push({ role, content: h.text.trim() });
      }
    }
  }
  // Ensure the final message is the user prompt with context
  if (claudeMessages.length > 0 && claudeMessages[claudeMessages.length - 1].role === "user") {
    claudeMessages[claudeMessages.length - 1].content = userPrompt;
  } else {
    claudeMessages.push({ role: "user", content: userPrompt });
  }

  // Ensure conversation starts with user message
  if (claudeMessages.length > 0 && claudeMessages[0].role !== "user") {
    claudeMessages.shift();
  }

  if (claudeMessages.length === 0) {
    claudeMessages.push({ role: "user", content: userPrompt });
  }

  const anthropic = new Anthropic({ apiKey: anthropicKey });

  let stream;
  try {
    // Build system prompt: prepend mode-specific instructions if a valid mode is active
    const activeMode = body.mode && MODE_PROMPTS[body.mode] ? body.mode : null;
    const systemPrompt = activeMode
      ? MODE_PROMPTS[activeMode]
      : SYSTEM_PROMPT;

    stream = await anthropic.messages.stream({
      model: chatModel,
      max_tokens: activeMode ? Math.max(maxOut, 1200) : maxOut,
      temperature: activeMode ? 0.5 : 0.3,
      system: systemPrompt,
      messages: claudeMessages,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("Anthropic stream init error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 502,
      headers: {
        "Content-Type": "application/json",
        ...Object.fromEntries(
          Object.entries(corsHeaders(origin, true)) as [string, string][]
        ),
      },
    });
  }

  let fullResponse = "";
  let logId = "";

  const readable = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            fullResponse += event.delta.text;
            controller.enqueue(enc.encode(event.delta.text));
          }
        }
      } catch (e) {
        console.error(e);
        controller.enqueue(enc.encode("\n[Error: stream interrupted]"));
      }

      // URL grounding check: detect hallucinated URLs not in retrieved context
      const trustedUrls = new Set<string>();
      if (winery?.website) trustedUrls.add(winery.website.replace(/\/$/, ""));
      for (const ch of chunks) {
        if (ch.source_url) trustedUrls.add(ch.source_url.replace(/\/$/, ""));
        // Also extract URLs mentioned inside chunk text
        const urlsInChunk = ch.chunk_text.match(/https?:\/\/[^\s)\]>,]+/g) ?? [];
        for (const u of urlsInChunk) trustedUrls.add(u.replace(/\/$/, ""));
      }
      // Find URLs in response that aren't in trusted set
      const responseUrls = fullResponse.match(/https?:\/\/[^\s)\]>,]+/g) ?? [];
      const hallucinatedUrls = responseUrls.filter(
        (u) => !trustedUrls.has(u.replace(/\/$/, ""))
      );
      if (hallucinatedUrls.length > 0) {
        console.warn("Hallucinated URLs detected:", hallucinatedUrls);
      }

      const lower = fullResponse.toLowerCase();
      const deflectedPhrases = [
        "don't have",
        "do not have",
        "not sure",
        "can't find",
        "cannot find",
        "recommend calling",
        "check their website",
        "visit the website",
        "don't have specific",
        "no information",
        "couldn't find",
        "not available in",
        "contact the winery",
        "reach out to",
      ];
      const deflected = deflectedPhrases.some((p) => lower.includes(p));

      const latency = Date.now() - startTime;
      const { data: logRow, error: logErr } = await supabase.from("chat_logs").insert({
        session_id: sessionId,
        widget_account_id: account.id,
        winery_id: account.winery_id,
        user_message: message,
        assistant_response: fullResponse,
        retrieved_chunk_ids: chunks.map((c) => c.id),
        retrieval_scores: scores,
        was_deflected: deflected || hallucinatedUrls.length > 0,
        prompt_version: PROMPT_VERSION,
        latency_ms: latency,
      }).select("id").single();
      if (logErr) console.error("chat_log insert failed:", logErr.message);

      logId = logRow?.id ?? "";

      const refHost = parseHostname(origin);
      const { error: sessErr } = await supabase.rpc("touch_chat_session", {
        p_session_id: sessionId,
        p_widget_account_id: account.id,
        p_winery_id: account.winery_id,
        p_referrer_domain: refHost ?? "",
        p_prompt_version: PROMPT_VERSION,
      });
      if (sessErr) console.error("touch_chat_session failed:", sessErr.message);

      // Send log_id as a trailing metadata line
      controller.enqueue(enc.encode("\n<!-- log_id:" + logId + " -->"));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      ...Object.fromEntries(
        Object.entries(corsHeaders(origin, true)) as [string, string][]
      ),
      "X-Prompt-Version": PROMPT_VERSION,
    },
  });
});
