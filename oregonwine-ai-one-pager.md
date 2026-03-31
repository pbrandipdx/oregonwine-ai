# OregonWine.ai — One Pager

## What We're Building

An AI concierge that lives directly on a winery's website and answers every visitor question — instantly, accurately, and in the winery's own voice. Built for Oregon's Willamette Valley wineries, starting with Rex Hill as the live proof-of-concept.

The agent knows their wines, tasting experiences, club pricing, hours, and events. It works 24/7, handles the repetitive questions so staff can focus on guests in the room, and converts curious browsers into booked visitors.

---

## The Problem

Winery websites are static brochures. Visitors land with specific questions — "Can I walk in Saturday?" "What's the difference between your Pinot clubs?" "Do you have outdoor seating for kids?" — and bounce when they can't find answers fast. Staff spend hours fielding the same calls and emails. Generic chatbots (Intercom, Drift, Tidio) require heavy DIY setup, charge per conversation, have zero wine knowledge, and cost 3–5x more.

---

## How It Works

A lightweight chat widget is embedded on the winery's site via a single script tag. When a visitor asks a question, the agent retrieves relevant content from the winery's own knowledge base (scraped and curated from their website) using hybrid keyword + vector search, then streams a branded, conversational response powered by Claude.

Each winery gets its own knowledge base, system prompt, branding, and widget key — fully isolated, fully multi-tenant.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Frontend | React + TypeScript (Vite), embeddable widget via script tag |
| Chat API | Supabase Edge Functions (Deno), streaming hybrid RAG |
| Database | Supabase (Postgres + pgvector) — chunks, embeddings, chat logs, widget keys |
| LLM | Anthropic Claude Sonnet 4.6 |
| Embeddings | OpenAI text-embedding-3-small |
| Hosting | GitHub Pages (prod), Vercel (staging) |
| DNS | Cloudflare |
| Auth | Clerk |
| Payments | Stripe |
| Automation | n8n (scrape/refresh workflows) |
| Email | Resend |

---

## Business Model

**Stage 1 — Agency (Now):** $750 setup + $299/month per winery. You do the onboarding (~4 hours): scrape the site, build the knowledge base, configure the widget, hand them an embed code. Target: 3–5 wineries.

**Stage 2 — Assisted SaaS (6–12 months):** Automated scrape-to-embed pipeline via n8n. Admin dashboard. Onboarding drops to 30 minutes. Target: 10–20 wineries.

**Stage 3 — Self-Serve SaaS (12–24 months):** Wineries sign up, enter their URL, the platform does the rest. Stripe billing, self-service dashboard, usage analytics. Target: 50+ wineries.

**Unit economics:** Claude API costs ~$6.75/winery/month at 500 conversations. At 5 wineries, total platform cost is ~$42/month against ~$1,495/month in revenue. Margins stay above 95% at scale.

---

## Roadmap

**Now — Chatbot**
Rex Hill live as proof-of-concept. Onboard Chehalem as winery #2. Draft sales one-pager and begin warm outreach to Willamette Valley wineries.

**3–6 Months — Contextual Assistant**
Session memory, reservation intent detection, personalization ("You mentioned you like Pinot Gris..."), smart escalation to tasting room staff.

**6–12 Months — Action-Taking Agent**
Real bookings via Tock/Commerce7, wine club signup flows, email capture, live event awareness. Claude tool use turns the chatbot into an agent that drives revenue.

**12–24 Months — Full Agent Platform**
Proactive outreach (texts/emails about events), cross-session memory for returning visitors, analytics agent, multi-channel (website, Instagram DMs, SMS), autonomous content refresh.

---

## The Moat

Technology commoditizes. What doesn't: winery relationships (high switching costs once embedded), industry-specific knowledge, years of chat log data that train better agents, and the operational ability to keep 50+ knowledge bases accurate and current.

---

**Live demo:** [Rex Hill Agent](https://pbrandipdx.github.io/oregonwine-ai/)
**Repo:** [github.com/pbrandipdx/oregonwine-ai](https://github.com/pbrandipdx/oregonwine-ai)
