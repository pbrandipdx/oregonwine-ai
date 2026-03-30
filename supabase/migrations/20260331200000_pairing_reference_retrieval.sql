-- Synthetic winery profile for third-party / generic pairing education chunks.
-- Retrieval merges these with the widget's winery so /chat can cite both.
insert into public.wineries (name, slug, website, description, status, state)
values (
  'Global pairing reference',
  'pairing-reference',
  'https://oregonwine.ai',
  'Educational pairing text from allowlisted sources (not a tasting room). Chunks are labeled in text; verify licenses before production.',
  'active',
  'OR'
)
on conflict (slug) do nothing;

-- Include pairing-reference chunks alongside the active widget winery.
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
  with ref as (
    select id from public.wineries where slug = 'pairing-reference' limit 1
  )
  select
    wc.id,
    wc.chunk_text,
    wc.chunk_type,
    wc.source_url,
    wc.fetched_at,
    (1 - (wc.embedding <=> query_embedding))::float as similarity
  from public.winery_chunks wc, ref
  where wc.confidence >= 0.7
    and wc.embedding is not null
    and (wc.winery_id = winery_id_filter or wc.winery_id = ref.id)
  order by wc.embedding <=> query_embedding
  limit greatest(1, least(match_count, 20));
$$;

create or replace function public.search_chunks_keyword(
  winery_id_filter uuid,
  search_query text,
  match_limit int default 5
)
returns table (
  id uuid,
  chunk_text text,
  chunk_type text,
  source_url text,
  fetched_at timestamptz
)
language sql
stable
as $$
  with ref as (
    select id from public.wineries where slug = 'pairing-reference' limit 1
  )
  select wc.id, wc.chunk_text, wc.chunk_type, wc.source_url, wc.fetched_at
  from public.winery_chunks wc, ref
  where nullif(trim(coalesce(search_query, '')), '') is not null
    and (wc.winery_id = winery_id_filter or wc.winery_id = ref.id)
    and wc.fts @@ websearch_to_tsquery('english', trim(search_query))
  order by ts_rank_cd(wc.fts, websearch_to_tsquery('english', trim(search_query))) desc
  limit greatest(1, least(match_limit, 10));
$$;
