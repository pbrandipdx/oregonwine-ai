-- Fix: keyword search now respects feedback_boost confidence gating.
-- Previously only match_chunks (vector) filtered by effective confidence;
-- search_chunks_keyword returned downvoted chunks regardless.

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
    select w.id from public.wineries w where w.slug = 'pairing-reference' limit 1
  )
  select wc.id, wc.chunk_text, wc.chunk_type, wc.source_url, wc.fetched_at
  from public.winery_chunks wc, ref
  where nullif(trim(coalesce(search_query, '')), '') is not null
    and (wc.winery_id = winery_id_filter or wc.winery_id = ref.id)
    and wc.fts @@ websearch_to_tsquery('english', trim(search_query))
    and least(1.0, greatest(0.5, wc.confidence + wc.feedback_boost * 0.02)) >= 0.7
  order by ts_rank_cd(wc.fts, websearch_to_tsquery('english', trim(search_query))) desc
  limit greatest(1, least(match_limit, 10));
$$;
