import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

function corsHeaders(origin: string | null): HeadersInit {
  const h: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-api-key, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  if (origin) {
    h["Access-Control-Allow-Origin"] = origin;
    h["Vary"] = "Origin";
  }
  return h;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) {
    return new Response("Unauthorized", { status: 401, headers: corsHeaders(origin) });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Verify API key is valid
  const { data: account, error: accErr } = await supabase
    .from("widget_accounts")
    .select("id")
    .eq("api_key", apiKey)
    .single();

  if (accErr || !account) {
    return new Response("Invalid API key", { status: 403, headers: corsHeaders(origin) });
  }

  let body: { log_id?: string; rating?: number; text?: string };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400, headers: corsHeaders(origin) });
  }

  const { log_id, rating, text } = body;
  if (!log_id || (rating !== 1 && rating !== -1)) {
    return new Response("Need log_id and rating (1 or -1)", {
      status: 400,
      headers: corsHeaders(origin),
    });
  }

  // Fetch the existing log to check for prior feedback and get chunk IDs
  const { data: logRow, error: logErr } = await supabase
    .from("chat_logs")
    .select("feedback_rating, retrieved_chunk_ids")
    .eq("id", log_id)
    .eq("widget_account_id", account.id)
    .single();

  if (logErr || !logRow) {
    return new Response(JSON.stringify({ error: "Log not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        ...Object.fromEntries(Object.entries(corsHeaders(origin)) as [string, string][]),
      },
    });
  }

  const previousRating = logRow.feedback_rating;
  const chunkIds = (logRow.retrieved_chunk_ids ?? []) as string[];

  // Update the chat log with the new feedback
  const { error: upErr } = await supabase
    .from("chat_logs")
    .update({
      feedback_rating: rating,
      feedback_text: text ?? null,
    })
    .eq("id", log_id)
    .eq("widget_account_id", account.id);

  if (upErr) {
    return new Response(JSON.stringify({ error: upErr.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...Object.fromEntries(Object.entries(corsHeaders(origin)) as [string, string][]),
      },
    });
  }

  // Real-time chunk confidence adjustment via feedback_boost.
  // If user is changing their vote, reverse the old one first.
  if (chunkIds.length > 0) {
    let delta = rating; // +1 or -1
    if (previousRating) {
      // Changing vote: reverse old rating then apply new one
      delta = rating - previousRating; // e.g., switching from +1 to -1 = -2
    }
    if (delta !== 0) {
      await supabase.rpc("adjust_chunk_feedback", {
        p_chunk_ids: chunkIds,
        p_delta: delta,
      });
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      "Content-Type": "application/json",
      ...Object.fromEntries(Object.entries(corsHeaders(origin)) as [string, string][]),
    },
  });
});
