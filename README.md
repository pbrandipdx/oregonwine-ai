# Crushpad.ai

Willamette winery SaaS scaffold: embeddable RAG chat widget, Supabase schema, and a streaming `/chat` Edge Function (hybrid keyword + vector retrieval, Claude replies).

## Prerequisites

- Node 20+
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- OpenAI and Anthropic API keys (for embeddings and chat in the Edge Function)

## Setup

```bash
cd crushpad-ai
npm install
cp .env.example .env
```

Fill `.env` with your Supabase URL, **anon** key (`VITE_SUPABASE_ANON_KEY` — needed for the **directory** in the web app), and (for scripts / local functions) the **service role** key.

Start local Supabase and apply migrations:

```bash
supabase start
supabase db reset
```

Set Edge Function secrets (local: use `supabase secrets set` or the dashboard; for `supabase functions serve`, pass env — see CLI docs):

```bash
supabase secrets set OPENAI_API_KEY=sk-... ANTHROPIC_API_KEY=sk-ant-...
```

Seed data includes **REX HILL** and a test widget key **`wk_test_rexhill`** with domain allowlist `localhost` and `127.0.0.1`.

### Embeddings for vector search

Chunks ship without embeddings. After `db reset`, run:

```bash
export $(grep -v '^#' .env | xargs)   # or set vars manually
npm run embed
```

## Develop

- **Marketing / app:** `npm run dev` → [http://localhost:5173](http://localhost:5173)
- **Widget test page:** [http://localhost:5173/widget-test.html](http://localhost:5173/widget-test.html) (expects Functions at `VITE_SUPABASE_FUNCTIONS_URL` or `http://127.0.0.1:54321/functions/v1`)

Serve functions locally:

```bash
supabase functions serve chat --env-file .env
```

(Use a `.env` that includes `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`.)

## Build

- **Web app:** `npm run build`
- **Embeddable widget (IIFE):** `npm run build:widget` → `dist-widget/widget.js`

Embed pattern (after hosting `widget.js`):

```html
<script
  src="https://your-cdn/widget.js"
  data-key="wk_..."
  data-api-base="https://<project>.supabase.co/functions/v1"
  data-color="#722F37"
  data-winery="Winery Name"
  async
></script>
```

## Layout

| Path | Purpose |
|------|---------|
| `supabase/migrations/` | Schema, `match_chunks`, `search_chunks_keyword`, seed |
| `supabase/functions/chat/` | API key + domain check, hybrid RAG, streaming Claude, `chat_logs` |
| `src/widget/` | React widget + `widget-main.tsx` entry |
| `scripts/embed.ts` | OpenAI batch embeddings for null `winery_chunks.embedding` |

## License

Private / unlicensed unless you add one.
<!-- synced from mac mini -->
