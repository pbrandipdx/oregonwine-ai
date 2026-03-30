import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import Anthropic from "https://esm.sh/@anthropic-ai/sdk@0.32.1";
import OpenAI from "https://esm.sh/openai@4.73.0";

const PROMPT_VERSION = "v0.3.1";

const SYSTEM_PROMPT = `You are an expert guide to Oregon wine and the Willamette Valley wine region.
You have access to verified information about specific wineries.

RULES:
- For any winery-specific claim: answer ONLY from the provided context. Never use training knowledge to fill in details about specific wineries.
- For hours, fees, reservation requirements, or any operational detail: always include "last verified [DATE]" and tell the user to call ahead to confirm.
- If context is missing, say so clearly and point to the official website or suggest they call.
- If context is conflicting, flag the conflict and cite both sources.
- Always cite source URL for winery-specific facts.
- For general Oregon wine knowledge (climate, AVAs, varietals, winemaking styles): you may draw on training knowledge but label it as general knowledge, not verified winery data.
- Never use training knowledge to fill in hours, fees, or policies for any specific winery.
- When continuing a conversation, use the chat history to understand context and resolve pronouns (e.g. "it", "that", "there").

FORMATTING (every reply):
- Use Markdown: ## for short section titles, bullet lists for options or pairings, **bold** for wine names and key terms.
- Keep paragraphs to 2–4 sentences; prefer scannable structure over one long block.
- After winery-specific facts, add a final line: *Source: [url from context] · Last verified [date from context]* when the context includes a URL and date.
- If you add a helpful general Oregon-wine idea not in the context, prefix it with **General wine tip:** on its own line so it is clearly not verified winery data.
- Chunks whose text begins with "[General pairing education" are third-party reference material: use them for broad pairing ideas only; never present them as that winery's menu, policy, or hours. Still cite their Source URL when you use them.`;

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

  let body: { message?: string; session_id?: string; history?: { role: string; text: string }[] };
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

  const { count: usedThisMonth } = await supabase
    .from("chat_logs")
    .select("id", { count: "exact", head: true })
    .eq("widget_account_id", account.id)
    .gte("created_at", startOfMonth.toISOString());

  const limit = account.monthly_query_limit ?? 1000;
  if (limit > 0 && (usedThisMonth ?? 0) >= limit) {
    return new Response("Monthly query limit reached", {
      status: 429,
      headers: corsHeaders(origin, true),
    });
  }

  const maxChunks = parseInt(Deno.env.get("MAX_CHUNKS_PER_QUERY") ?? "5", 10);
  const maxOut = parseInt(Deno.env.get("MAX_OUTPUT_TOKENS") ?? "600", 10);
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

  const { data: k } = await supabase.rpc("search_chunks_keyword", {
    winery_id_filter: account.winery_id,
    search_query: message,
    match_limit: 5,
  });

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

  const { data: winery } = await supabase
    .from("wineries")
    .select("name, address, phone, hours_json, website")
    .eq("id", account.winery_id)
    .single();

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

  const userPrompt = `Winery: ${winery?.name ?? "Unknown"}
Address: ${winery?.address ?? ""} | Phone: ${winery?.phone ?? ""} | Website: ${winery?.website ?? ""}

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
    stream = await anthropic.messages.stream({
      model: chatModel,
      max_tokens: maxOut,
      system: SYSTEM_PROMPT,
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

      const lower = fullResponse.toLowerCase();
      const deflected = [
        "don't have",
        "do not have",
        "not sure",
        "can't find",
        "cannot find",
        "recommend calling",
        "check their website",
        "visit the website",
      ].some((p) => lower.includes(p));

      const latency = Date.now() - startTime;
      const { data: logRow } = await supabase.from("chat_logs").insert({
        session_id: sessionId,
        widget_account_id: account.id,
        winery_id: account.winery_id,
        user_message: message,
        assistant_response: fullResponse,
        retrieved_chunk_ids: chunks.map((c) => c.id),
        retrieval_scores: scores,
        was_deflected: deflected,
        prompt_version: PROMPT_VERSION,
        latency_ms: latency,
      }).select("id").single();

      logId = logRow?.id ?? "";

      const refHost = parseHostname(origin);
      await supabase.rpc("touch_chat_session", {
        p_session_id: sessionId,
        p_widget_account_id: account.id,
        p_winery_id: account.winery_id,
        p_referrer_domain: refHost ?? "",
        p_prompt_version: PROMPT_VERSION,
      });

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
