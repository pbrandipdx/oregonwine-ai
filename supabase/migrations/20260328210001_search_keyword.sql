-- Keyword search over chunk FTS (used by /chat hybrid retrieval)
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
  select wc.id, wc.chunk_text, wc.chunk_type, wc.source_url, wc.fetched_at
  from public.winery_chunks wc
  where wc.winery_id = winery_id_filter
    and nullif(trim(coalesce(search_query, '')), '') is not null
    and wc.fts @@ websearch_to_tsquery('english', trim(search_query))
  order by ts_rank_cd(wc.fts, websearch_to_tsquery('english', trim(search_query))) desc
  limit greatest(1, least(match_limit, 10));
$$;
