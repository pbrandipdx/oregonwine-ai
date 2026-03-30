-- OregonWine.ai — core + analytics + seed (Phase 0)
create extension if not exists vector;

-- --- wineries
create table public.wineries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  website text,
  address text,
  city text,
  state text default 'OR',
  lat double precision,
  lng double precision,
  ava text,
  phone text,
  email text,
  reservation_required boolean,
  dogs_allowed boolean,
  tasting_fee_min integer,
  tasting_fee_max integer,
  hours_json jsonb,
  established_year integer,
  description text,
  status text default 'active',
  last_crawled_at timestamptz,
  created_at timestamptz default now()
);

-- --- pages
create table public.winery_pages (
  id uuid primary key default gen_random_uuid(),
  winery_id uuid references public.wineries on delete cascade,
  url text not null,
  raw_html text,
  content_hash text,
  fetched_at timestamptz,
  http_status integer,
  robots_allowed boolean,
  page_type text
);

-- --- chunks (RAG)
create table public.winery_chunks (
  id uuid primary key default gen_random_uuid(),
  winery_id uuid references public.wineries on delete cascade,
  page_id uuid references public.winery_pages on delete set null,
  chunk_text text not null,
  chunk_type text,
  embedding vector(1536),
  embedding_model text default 'text-embedding-3-small',
  source_url text,
  fetched_at timestamptz,
  confidence float default 1.0,
  token_count integer,
  fts tsvector generated always as (to_tsvector('english', coalesce(chunk_text, ''))) stored
);

create index winery_chunks_winery_id_idx on public.winery_chunks (winery_id);
create index winery_chunks_fts_idx on public.winery_chunks using gin (fts);

-- --- facts
create table public.winery_facts (
  id uuid primary key default gen_random_uuid(),
  winery_id uuid references public.wineries on delete cascade,
  fact_type text,
  fact_value jsonb,
  source_url text,
  fetched_at timestamptz,
  confidence float default 1.0,
  in_quarantine boolean default false
);

-- --- widget SaaS
create table public.widget_accounts (
  id uuid primary key default gen_random_uuid(),
  winery_id uuid references public.wineries on delete cascade,
  api_key text unique not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text default 'partner',
  active boolean default true,
  domain_allowlist text[],
  theme_color text default '#722F37',
  logo_url text,
  monthly_query_limit integer default 1000,
  report_frequency text default 'monthly',
  report_email text,
  created_at timestamptz default now()
);

-- --- chat logs
create table public.chat_logs (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  widget_account_id uuid references public.widget_accounts on delete set null,
  winery_id uuid references public.wineries on delete set null,
  user_message text,
  assistant_response text,
  retrieved_chunk_ids uuid[],
  retrieval_scores float[],
  was_deflected boolean default false,
  prompt_version text,
  latency_ms integer,
  created_at timestamptz default now()
);

create index chat_logs_account_created_idx on public.chat_logs (widget_account_id, created_at desc);
create index chat_logs_winery_created_idx on public.chat_logs (winery_id, created_at desc);

-- --- crawl queue
create table public.crawl_queue (
  id uuid primary key default gen_random_uuid(),
  winery_id uuid references public.wineries on delete cascade,
  url text,
  priority integer default 5,
  status text default 'pending',
  error_message text,
  scheduled_at timestamptz default now(),
  completed_at timestamptz
);

create index crawl_queue_status_idx on public.crawl_queue (status, priority, scheduled_at);

-- --- analytics: sessions
create table public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  widget_account_id uuid references public.widget_accounts on delete set null,
  winery_id uuid references public.wineries on delete set null,
  session_id text unique,
  started_at timestamptz,
  ended_at timestamptz,
  message_count integer default 0,
  device_type text,
  referrer_domain text,
  referrer_path text,
  was_deflected boolean default false,
  had_voice_input boolean default false,
  prompt_version text
);

create index chat_sessions_winery_started_idx on public.chat_sessions (winery_id, started_at desc);

-- --- keywords (async extraction)
create table public.message_keywords (
  id uuid primary key default gen_random_uuid(),
  chat_log_id uuid references public.chat_logs on delete cascade,
  winery_id uuid references public.wineries on delete cascade,
  keyword text,
  category text,
  confidence float,
  extracted_at timestamptz default now()
);

create index message_keywords_winery_cat_idx on public.message_keywords (winery_id, category);

-- --- snapshots
create table public.analytics_snapshots (
  id uuid primary key default gen_random_uuid(),
  widget_account_id uuid references public.widget_accounts on delete cascade,
  period_type text,
  period_start timestamptz,
  period_end timestamptz,
  total_sessions integer default 0,
  total_messages integer default 0,
  unique_visitors integer default 0,
  avg_messages_per_session float,
  deflection_count integer default 0,
  deflection_rate float,
  top_keywords jsonb,
  top_questions jsonb,
  content_gaps jsonb,
  peak_hour integer,
  peak_day text,
  mobile_pct float,
  created_at timestamptz default now(),
  unique (widget_account_id, period_type, period_start)
);

-- --- vector match RPC
create or replace function public.match_chunks(
  query_embedding vector(1536),
  winery_id_filter uuid,
  match_count int default 5
)
returns table (
  id uuid,
  chunk_text text,
  chunk_type text,
  source_url text,
  fetched_at timestamptz,
  similarity float
)
language sql
stable
as $$
  select
    wc.id,
    wc.chunk_text,
    wc.chunk_type,
    wc.source_url,
    wc.fetched_at,
    (1 - (wc.embedding <=> query_embedding))::float as similarity
  from public.winery_chunks wc
  where wc.winery_id = winery_id_filter
    and wc.confidence >= 0.7
    and wc.embedding is not null
  order by wc.embedding <=> query_embedding
  limit greatest(1, least(match_count, 20));
$$;

-- --- RLS: public read for directory (adjust later)
alter table public.wineries enable row level security;
create policy wineries_select_public on public.wineries for select using (true);

alter table public.winery_chunks enable row level security;
create policy winery_chunks_select_public on public.winery_chunks for select using (true);

alter table public.winery_facts enable row level security;
create policy winery_facts_select_public on public.winery_facts for select using (true);

-- Service role bypasses RLS; anon can read directory tables only.

-- ========== SEED: Rex Hill + widget key ==========
insert into public.wineries (
  name, slug, website, address, city, state, lat, lng, ava, phone, email,
  reservation_required, dogs_allowed, tasting_fee_min, tasting_fee_max,
  hours_json, established_year, description, status
) values (
  'REX HILL Winery & Vineyards',
  'rex-hill',
  'https://rexhill.com',
  '30835 N Hwy 99W',
  'Newberg', 'OR', 45.2940, -122.9621,
  'Laurelwood District',
  '(503) 538-0666',
  'info@rexhill.com',
  false,
  true,
  2500,
  4500,
  '{"mon":{"open":"10:00","close":"17:00","closed":false},"tue":{"open":"10:00","close":"17:00","closed":false},"wed":{"open":"10:00","close":"17:00","closed":false},"thu":{"open":"10:00","close":"17:00","closed":false},"fri":{"open":"10:00","close":"17:00","closed":false},"sat":{"open":"10:00","close":"17:00","closed":false},"sun":{"open":"10:00","close":"17:00","closed":false}}'::jsonb,
  1982,
  'REX HILL is a Willamette Valley winery in Newberg, Oregon, known for Pinot Noir, Chardonnay, and sparkling wines.',
  'active'
);

insert into public.winery_facts (winery_id, fact_type, fact_value, source_url, confidence)
select id, 'varietal', '{"varieties":["Pinot Noir","Chardonnay","Sparkling"]}'::jsonb, 'https://rexhill.com', 0.95
from public.wineries where slug = 'rex-hill';

insert into public.winery_chunks (winery_id, chunk_text, chunk_type, source_url, fetched_at, confidence)
select id,
  'REX HILL is open Monday through Sunday, 10:00am to 5:00pm. Reservations are recommended; walk-ins welcome when space allows. Book via Tock or call (503) 538-0666.',
  'hours',
  'https://rexhill.com/experiences/',
  now(),
  0.95
from public.wineries where slug = 'rex-hill';

insert into public.winery_chunks (winery_id, chunk_text, chunk_type, source_url, fetched_at, confidence)
select id,
  'Tasting: a flight of five wines is $25. A $45 table fee may apply toward your tasting; waived for Wine Club members. Book through Tock.',
  'faq',
  'https://www.exploretock.com/rexhill/',
  now(),
  0.9
from public.wineries where slug = 'rex-hill';

insert into public.winery_chunks (winery_id, chunk_text, chunk_type, source_url, fetched_at, confidence)
select id,
  'Dogs are welcome on the patio and garden; only certified service animals inside the tasting room.',
  'faq',
  'https://rexhill.com/experiences/',
  now(),
  0.9
from public.wineries where slug = 'rex-hill';

insert into public.widget_accounts (
  winery_id, api_key, active, domain_allowlist, plan, monthly_query_limit
)
select id, 'wk_test_rexhill', true, array['localhost', '127.0.0.1', 'pbrandipdx.github.io']::text[], 'partner', 1000
from public.wineries where slug = 'rex-hill';
