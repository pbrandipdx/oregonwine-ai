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
  'Food and pairings at REX HILL center on Willamette Pinot Noir, Chardonnay, and méthode traditionnelle sparkling. Pinot Noir: bright acid and earthy red fruit often complement salmon, roast duck, wild mushrooms, charcuterie, and Oregon cheeses—either echo the wine''s earthiness or contrast with a richer dish. Chardonnay (especially with partial oak): roast chicken, Dungeness crab, scallops, and cream-based sauces. Sparkling: strong aperitif; classic pairings include fried appetizers, oysters, triple-cream cheese, and salty nuts. During your visit, ask the host about seasonal small bites, cheese boards, or curated pairing flights—offerings rotate; online menus may be out of date. Call (503) 538-0666 before you visit to confirm what food service is available that day.',
  'pairing',
  'https://rexhill.com/experiences/',
  now(),
  0.88
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
