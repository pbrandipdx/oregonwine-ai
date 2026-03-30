/**
 * Smoke-test /chat for each quick-reply prompt (same payloads as the widget).
 *
 * Usage:
 *   export CHAT_URL="https://<project>.supabase.co/functions/v1/chat"
 *   export WIDGET_API_KEY="wk_..."
 *   export WIDGET_ORIGIN="https://pbrandipdx.github.io"  # must be on domain_allowlist
 *   npm run smoke:chat
 */
import { QUICK_REPLY_LABELS, messageForChatApi } from "../src/lib/quickReplyMessages";

const CHAT_URL =
  process.env.CHAT_URL?.replace(/\/$/, "") ||
  "https://sdobipmpvcuxnjqwpggp.supabase.co/functions/v1/chat";
const WIDGET_API_KEY = process.env.WIDGET_API_KEY || "wk_test_rexhill";
const WIDGET_ORIGIN = process.env.WIDGET_ORIGIN || "https://pbrandipdx.github.io";
const WINERY_LABEL = process.env.WINERY_LABEL || "REX HILL";

async function main() {
  const url = CHAT_URL.endsWith("/chat") ? CHAT_URL : `${CHAT_URL}/chat`;

  for (const label of QUICK_REPLY_LABELS) {
    const m = messageForChatApi(label, WINERY_LABEL);
    if (m.trim().length < 16) {
      throw new Error(`messageForChatApi("${label}") too short: ${m}`);
    }
  }

  const pre = await fetch(url, {
    method: "OPTIONS",
    headers: { Origin: WIDGET_ORIGIN },
  });
  if (pre.status !== 204) {
    console.error("OPTIONS preflight expected 204, got", pre.status);
    process.exit(1);
  }

  let failed = 0;
  for (const label of QUICK_REPLY_LABELS) {
    const message = messageForChatApi(label, WINERY_LABEL);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": WIDGET_API_KEY,
        Origin: WIDGET_ORIGIN,
      },
      body: JSON.stringify({
        message,
        session_id: "smoke-chat-buttons",
        history: [],
      }),
    });
    const text = await res.text();
    const ok = res.ok && text.length > 20;
    console.log(ok ? "✓" : "✗", label, "→", res.status, ok ? `(${text.slice(0, 60)}…)` : text.slice(0, 120));
    if (!ok) failed++;
  }

  if (failed) {
    console.error(
      `\n${failed} failed. Check WIDGET_API_KEY, domain_allowlist (include ${new URL(WIDGET_ORIGIN).hostname}), and Edge Function deploy.`
    );
    process.exit(1);
  }
  console.log("\nAll quick-reply paths returned streamed text.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
