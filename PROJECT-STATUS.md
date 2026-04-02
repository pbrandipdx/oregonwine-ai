# crushpad.ai — Master Project Status

**Last updated:** March 29, 2026

---

## What It Is

An AI chat agent that lives on a winery's website and answers every visitor question — instantly, accurately, and in their voice. Built for Oregon's Willamette Valley wineries, starting with Rex Hill as the proof-of-concept.

**One-liner:** "An AI concierge that knows your wines, your tasting experiences, your club pricing — and works 24/7."

---

## Current Stack

| Layer | Tool | Notes |
|-------|------|-------|
| Frontend | React + TypeScript (Vite) | Dark-mode ChatWidget, embeddable via script tag |
| Chat API | Supabase Edge Functions (Deno) | Streaming responses, hybrid RAG (keyword + vector) |
| Database | Supabase (Postgres + pgvector) | Winery chunks, embeddings, chat logs, widget keys |
| LLM | Anthropic Claude (Sonnet 4.6) | Chat/streaming via API |
| Embeddings | OpenAI (text-embedding-3-small) | Knowledge base indexing |
| Hosting | GitHub Pages (prod), Vercel (staging TBD) | Vite build + GitHub Actions CI/CD |
| DNS | Cloudflare | MCP connector connected |
| Auth | Clerk | MCP connector connected |
| Email | Resend | No MCP — will use npm package directly |
| Automation | n8n | Connected, ready for scrape/refresh workflows |
| Payments | Stripe | Connected, ready for billing |
| Repo | github.com/pbrandipdx/crushpad-ai | |

---

## Multi-Tenancy — Already Built

The repo is already scaffolded for multiple wineries:

| Component | Status |
|-----------|--------|
| Widget keys (`wk_...`) per winery with domain allowlisting | Built |
| Supabase schema (`winery_chunks`) isolated per winery | Built |
| Embeddable widget configured via `data-key`, `data-winery`, `data-color` | Built |
| Hybrid RAG scoped to winery by key | Built |
| Chat logs per session | Built |
| Rex Hill seed data (`wk_test_rexhill`) | Built |

**Bottom line:** The multi-tenant foundation is solid. The gaps are in onboarding automation, content ingestion pipeline, and admin tooling — not the core chat infrastructure.

---

## What's Built — Technical Details

### Dark-Mode Chat Widget (`src/widget/ChatWidget.tsx`)
- Dark color palette: bg #0d0d0d, surface #1a1a1a, border #2e2e2e, user bubble #2a1520
- Landing state: centered "What can I help you discover today?" (Playfair Display, 2.6rem)
- SVG outline icons on quick-reply buttons (chat bubble, clock, heart, layers)
- Quick replies persist after conversation starts
- Textarea with auto-resize, pill-shaped container
- Streaming responses with typing indicator animation
- Feedback system (triangle icons, not emoji)
- Escalation: "Talk to the team" button
- CTA links: "Book a tasting", "Explore wine clubs" (wine accent #c47a84)
- Fixed top bar header for embedded mode with optional logo

### Chat Edge Function (`supabase/functions/chat/index.ts`) — v0.3.1
- Hybrid RAG retrieval (keyword + vector search)
- Multi-turn conversation history
- Markdown formatting in system prompt: section headings, bullet lists, bold wine names, source citations, general wine tip prefixes
- CORS headers properly reflecting Origin

### CI/CD (`.github/workflows/ci.yml`)
- Vite build, copies index.html to 404.html for SPA routing
- Deploys dist/ to GitHub Pages

---

## Business Model — Three Stages

### Stage 1: Agency (Now)
You do the work. Scrape the site, configure the widget, hand them an embed code.

- **Setup fee:** $750 one-time (scrape, knowledge base, system prompt, widget config, 30-day tuning)
- **Monthly retainer:** $299/month (hosting, knowledge base refresh, chat log review, support)
- **Time per winery:** ~4 hours total onboarding
- **Target:** 3-5 Willamette Valley wineries
- **Why first:** Zero additional dev required, cash flow from day one, learn what wineries actually need

### Stage 2: Assisted SaaS (6-12 months)
Automation does the heavy lifting. Onboarding drops from 3 hours to 30 minutes.

- Build scrape-to-embed pipeline (n8n)
- Lightweight admin dashboard for winery management
- Per-winery system prompt templates
- **Target:** 10-20 wineries

### Stage 3: Self-Serve SaaS (12-24 months)
Wineries sign up, enter their URL, platform does the rest.

- Signup + billing (Stripe)
- Automated scrape + embed on signup
- Winery self-service dashboard
- Usage analytics and chat log views
- **Target:** 50+ wineries

### Optional Add-Ons
| Add-On | Price |
|--------|-------|
| Monthly content refresh | +$75/mo |
| Custom branded chat window | +$250 one-time |
| Analytics dashboard access | +$75/mo |
| Staff Q&A training session | +$150 one-time |
| Additional winery location | +$200/mo |

---

## Cost Structure & Unit Economics

### Per-Winery Costs (Sonnet 4.6)
- ~500 conversations/month = ~1M input + 250K output tokens
- Claude API: **~$6.75/winery/month**
- OpenAI embeddings: **<$0.01/winery** (one-time per scrape)

### Total Platform Costs by Stage

| Stage | Wineries | Claude | Supabase | Hosting | Total Cost | Revenue | Margin |
|-------|----------|--------|----------|---------|------------|---------|--------|
| 1 | 5 | ~$17 | $25 | $0 | ~$42/mo | $1,495/mo | ~97% |
| 2 | 15 | ~$67 | $35-50 | $0-19 | ~$100-136/mo | $4,485/mo | ~97% |
| 3 | 50 | ~$335 | $75-150 | $19 | ~$430-505/mo | $14,950/mo | ~97% |

### Cost Optimization Roadmap
- **Now:** Enable prompt caching for system prompts (~60-70% savings on input tokens)
- **Stage 2:** Route simple questions to Haiku, complex to Sonnet (~40-50% LLM savings)
- **Stage 3:** Negotiate Anthropic volume pricing

---

## From Chatbot to Agent — Evolution Roadmap

### Stage 1: Chatbot (Now)
Answers questions from scraped website content via RAG. Value: 24/7 FAQ coverage, frees up staff.

### Stage 2: Contextual Assistant (3-6 months)
- Session memory (knows what was said earlier)
- Reservation intent detection (surfaces booking links)
- Personalization ("You mentioned you're a club member...")
- Smart handoff logic (escalate to tasting room team when needed)
- Tech: Session memory in Supabase, intent classification in Edge Function

### Stage 3: Action-Taking Agent (6-12 months)
- Real bookings via Tock, Commerce7, or winery reservation system
- Wine club signup walkthroughs
- Email capture with consent
- Live event awareness (not just static scraped content)
- Tech: Claude tool use / function calling, webhooks to reservation and CRM systems, n8n workflows

### Stage 4: Full Agent Platform (12-24 months)
- Proactive outreach (texts/emails about upcoming events)
- Cross-session memory (knows returning visitors, preferences, past purchases)
- Analytics agent ("visitors ask about the Library Loft 3x more than anything else")
- Multi-channel: website, Instagram DMs, SMS
- Autonomous content refresh (monitors winery site for changes)

### Pricing Implication
- Chatbot (Stage 1) = $299/mo nice-to-have
- Agent that books tastings (Stage 3) = $499/mo revenue driver
- Full platform (Stage 4) = premium tier

---

## Gaps to Close for Multi-Winery Scale

| Gap | Description | Priority |
|-----|-------------|----------|
| Winery onboarding flow | Currently manual DB inserts. Need admin-triggered or scripted flow | High |
| Content ingestion pipeline | Automated scraper that chunks into `winery_chunks` + triggers embed | High |
| Widget key provisioning | Generate `wk_...` keys with domain allowlist per winery | High |
| Admin dashboard | Add wineries, view keys, customize branding, monitor chat logs | Medium |
| Per-winery system prompts | Store and inject custom persona per winery at query time | Medium |

---

## Winery #2: Chehalem

### Profile
- **Website:** chehalemwines.com
- **Locations:** Downtown Newberg (106 S Center St) + New Estate (31500 NE Bell Rd, Sherwood, opened March 2025)
- **Hours:** Daily 10:30am-5:30pm (Estate), 11am-5pm (Newberg)
- **AVA:** Chehalem Mountains, Willamette Valley
- **Parent:** Stoller Wine Group

### Brand Voice
Knowledgeable, land-connected, approachable. "Pioneers. Innovators. Rebels." Deep reverence for sustainable, vineyard-first winemaking. Should feel like talking to a passionate winemaker.

### Widget Config
```
data-key="wk_chehalem_prod"
data-winery="Chehalem Winery"
data-color="#2C4A1E"
```

### What Reuses from Rex Hill
Everything. The Edge Function, widget component, RAG pipeline, embed script, hosting, and schema all reuse 100%. New work is only: scrape content, insert winery row + key, write system prompt, configure branding.

### Chehalem Next Steps
- [ ] Confirm brand color (pull from website or ask winery)
- [ ] Run website scrape and review chunk quality
- [ ] Generate embeddings for Chehalem chunks
- [ ] Test widget locally with `wk_chehalem_prod` key
- [ ] Deploy and generate embed snippet
- [ ] Determine: paid engagement or pilot demo?
- [ ] Identify contact at Chehalem / Stoller Wine Group

---

## Target Winery Hit List

| Winery | Location | Notes |
|--------|----------|-------|
| **Rex Hill** | Newberg | Live proof-of-concept |
| **Chehalem Winery** | Newberg / Sherwood | Winery #2, Stoller Group |
| Adelsheim Vineyard | Newberg | Pioneer winery, strong club |
| Domaine Drouhin | Dundee Hills | High-end, French heritage |
| Ponzi Vineyards | Beaverton/Sherwood | Legacy family winery |
| Sokol Blosser | Dundee | Certified B Corp, sustainability angle |
| A to Z Wineworks | McMinnville | High volume, broad reach |
| Willamette Valley Vineyards | Turner | Publicly traded, scale opportunity |

---

## Sales Approach

### Key Messages
- **Tasting room managers:** "It handles the repetitive questions so your staff can focus on the guests in front of them."
- **Marketing directors:** "It's your website working harder — converting curious browsers into booked visitors."
- **Owners:** "It pays for itself with one extra club signup a month."

### vs. ChatGPT
ChatGPT doesn't know their Library Loft costs $50 or that walk-ins are welcome. The crushpad.ai agent does. It's grounded in their actual content, sounds like their brand, and is embedded directly on their site.

### vs. Generic Chatbots (Intercom, Drift, Tidio)
Those require significant DIY setup, charge per conversation, have zero wine industry knowledge, and cost 3-5x more for comparable functionality.

### ROI Story
- One extra tasting reservation/week = ~$50-200 in revenue
- One extra club signup/month = $500-2,000+ in annual value
- At $299/month, the agent pays for itself with a single club signup every 6 weeks

### Sales Process
1. Warm outreach: lead with value, not technology
2. Demo: show the Rex Hill agent live, let them ask real questions
3. One-page proposal: problem, solution, pricing, next steps
4. Onboarding: scrape site (1-2hr), configure widget (30min), tune system prompt (1hr), hand them embed code

---

## The Long-Term Moat

Technology will commoditize. What won't:

| Asset | Why It's Durable |
|-------|-----------------|
| Winery relationships | High switching costs once embedded on their site |
| Industry-specific knowledge | You know what a tasting room manager actually cares about |
| Chat log data | Years of real visitor questions that train better agents |
| Content operations | Ability to keep 20+ winery knowledge bases accurate and current |

---

## Planning for Industry Changes

- **Model abstraction:** Claude via API means you can swap models without touching frontend
- **Retrieval improvements:** Watch for re-ranking models and multi-hop retrieval (drop-in upgrades to existing RAG)
- **Tool use is the Stage 3 unlock:** Claude's function calling separates chatbot from agent
- **Content freshness:** Build n8n workflow to re-scrape monthly and flag changes
- **Own the data:** Chat logs are the long-term asset — build a monthly review habit from day one

---

## Recent Uncommitted Changes (Cursor)

1. `widget-test.html` — `100dvh` units, optical center padding via `clamp()`
2. `src/widget-test-entry.tsx` — API key changed to `wk_test_rexhill`
3. `supabase/functions/chat/index.ts` — v0.3.1 with detailed FORMATTING section in system prompt
4. `data/rex-hill.json`, `package.json`, `scripts/crawl.ts` — minor updates
5. New files: `data/rex-hill-fetch.json`, `scripts/crawl-fetch.ts`

---

## Immediate Next Steps

### Technical
- [ ] Commit and push all Cursor changes
- [ ] Create `staging` branch in GitHub
- [ ] Set up Vercel project and link repo for preview deployments
- [ ] Enable prompt caching in Edge Function

### Rex Hill (Winery #1)
- [ ] Get Rex Hill live with a public URL — this is the demo that closes deals
- [ ] Collect first testimonial after 30 days live

### Chehalem (Winery #2)
- [ ] Scrape chehalemwines.com and review chunk quality
- [ ] Insert winery row + widget key in Supabase
- [ ] Write Chehalem system prompt
- [ ] Test and deploy widget

### Sales
- [ ] Draft one-page leave-behind / PDF proposal
- [ ] Set up booking flow (Calendly link)
- [ ] Identify first contact at Chehalem / Stoller Wine Group

---

## Connected Tools
- Cloudflare MCP (DNS, domain hosting)
- Vercel MCP (hosting, deployments)
- Clerk MCP (authentication)
- Supabase MCP (database, edge functions)
- Stripe MCP (payments, billing)
- n8n (automation workflows)
- Resend — npm package (no MCP available)

---

## Live URLs
- GitHub Pages: https://pbrandipdx.github.io/crushpad-ai/
- How it works (detail page): https://pbrandipdx.github.io/crushpad-ai/overview.html — `sales-pitch.html` redirects here
- Widget mockup: https://pbrandipdx.github.io/crushpad-ai/widget-mockup-v2.html
- Repo: https://github.com/pbrandipdx/crushpad-ai
