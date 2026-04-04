/**
 * notify-demo — sends an email to the founder whenever a demo request is submitted.
 *
 * Expects JSON body:
 *   { full_name, email, winery_or_org, phone?, role_title?, message?, source_path? }
 *
 * Requires secret:  RESEND_API_KEY  (set via `supabase secrets set RESEND_API_KEY=re_...`)
 */

const NOTIFY_TO = "patrickbrandimore@gmail.com";
const FROM_ADDRESS = "Crushpad.ai <notifications@crushpad.ai>";

function corsHeaders(origin: string | null): HeadersInit {
  const h: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, content-type",
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

  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey) {
    console.error("RESEND_API_KEY not set");
    return new Response(JSON.stringify({ error: "Email service not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...Object.fromEntries(Object.entries(corsHeaders(origin))) },
    });
  }

  let body: {
    full_name: string;
    email: string;
    winery_or_org: string;
    phone?: string;
    role_title?: string;
    message?: string;
    source_path?: string;
  };

  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400, headers: corsHeaders(origin) });
  }

  const { full_name, email, winery_or_org, phone, role_title, message, source_path } = body;

  if (!full_name || !email || !winery_or_org) {
    return new Response("Missing required fields", { status: 400, headers: corsHeaders(origin) });
  }

  const subject = `New demo request — ${winery_or_org} (${full_name})`;

  const htmlBody = `
<div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #333;">
  <h2 style="color: #c47a84; margin-bottom: 4px;">New Demo Request</h2>
  <p style="color: #888; margin-top: 0; font-size: 13px;">crushpad.ai/book-demo</p>
  <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
    <tr><td style="padding: 8px 0; color: #888; width: 110px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${esc(full_name)}</td></tr>
    <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${esc(email)}" style="color: #c47a84;">${esc(email)}</a></td></tr>
    <tr><td style="padding: 8px 0; color: #888;">Winery / Org</td><td style="padding: 8px 0; font-weight: 600;">${esc(winery_or_org)}</td></tr>
    ${phone ? `<tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0;"><a href="tel:${esc(phone)}" style="color: #c47a84;">${esc(phone)}</a></td></tr>` : ""}
    ${role_title ? `<tr><td style="padding: 8px 0; color: #888;">Role</td><td style="padding: 8px 0;">${esc(role_title)}</td></tr>` : ""}
  </table>
  ${message ? `<div style="margin-top: 16px; padding: 12px 16px; background: #f8f6f5; border-radius: 8px; font-size: 14px; line-height: 1.5;">${esc(message)}</div>` : ""}
  ${source_path ? `<p style="margin-top: 20px; font-size: 12px; color: #aaa;">Source: ${esc(source_path)}</p>` : ""}
</div>`.trim();

  const textBody = [
    `New demo request from ${full_name}`,
    `Email: ${email}`,
    `Winery / Org: ${winery_or_org}`,
    phone ? `Phone: ${phone}` : null,
    role_title ? `Role: ${role_title}` : null,
    message ? `\nMessage:\n${message}` : null,
    source_path ? `\nSource: ${source_path}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  // Send via Resend
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [NOTIFY_TO],
      reply_to: email,
      subject,
      html: htmlBody,
      text: textBody,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Resend error:", res.status, errText);
    return new Response(JSON.stringify({ error: "Email send failed" }), {
      status: 502,
      headers: { "Content-Type": "application/json", ...Object.fromEntries(Object.entries(corsHeaders(origin))) },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json", ...Object.fromEntries(Object.entries(corsHeaders(origin))) },
  });
});

/** Escape HTML entities */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
