-- =============================================================================
-- Run in Supabase Dashboard → SQL Editor (production project).
-- Idempotent — safe to run more than once.
-- Fixes: widget key + allowlist for GitHub Pages, pairing RAG chunk.
-- =============================================================================

do $$
begin
  if not exists (select 1 from public.wineries where slug = 'rex-hill') then
    raise exception 'Missing winery slug rex-hill. Apply base migrations / seed first (supabase db reset or migration history).';
  end if;
end $$;

-- 1) Demo widget key active + domains (localhost + GitHub Pages)
insert into public.widget_accounts (winery_id, api_key, active, domain_allowlist, plan, monthly_query_limit)
select w.id,
  'wk_test_rexhill',
  true,
  array['localhost', '127.0.0.1', 'pbrandipdx.github.io']::text[],
  'partner',
  1000
from public.wineries w
where w.slug = 'rex-hill'
on conflict (api_key) do update set
  active = true,
  domain_allowlist = excluded.domain_allowlist;

-- 2) Pairing chunk for hybrid search (skip if already present)
insert into public.winery_chunks (winery_id, chunk_text, chunk_type, source_url, fetched_at, confidence)
select w.id,
  'Food and pairings: REX HILL pours estate Pinot Noir, Chardonnay, and sparkling wines. Pinot Noir often pairs well with salmon, duck, mushrooms, and local cheeses; Chardonnay with roast chicken or richer seafood. Ask your host during a tasting about seasonal small bites or pairing flights—offerings can change. Call (503) 538-0666 to confirm what is available on the day of your visit.',
  'pairing',
  'https://rexhill.com/experiences/',
  now(),
  0.85
from public.wineries w
where w.slug = 'rex-hill'
  and not exists (
    select 1
    from public.winery_chunks wc
    where wc.winery_id = w.id
      and wc.chunk_type = 'pairing'
  );

-- 3) Sanity check (inspect result in SQL Editor)
select api_key, active, domain_allowlist
from public.widget_accounts
where api_key = 'wk_test_rexhill';
