-- Crushpad.ai generic chat demo — winery row + widget account.
-- The demo gets all wine education content automatically via the
-- pairing-reference merge in match_chunks / search_chunks_keyword.
-- No winery-specific chunks needed — this showcases general wine knowledge.

-- 1. Create the synthetic winery for the generic demo
insert into public.wineries (
  name,
  slug,
  website,
  description,
  status,
  state
)
select
  'Crushpad.ai Demo',
  'crushpad-demo',
  'https://crushpad.ai',
  'Generic Crushpad.ai chat demo — showcases wine education knowledge (regions, varietals, pairings, winemaking) without being tied to a specific winery.',
  'active',
  'OR'
where not exists (select 1 from public.wineries w where w.slug = 'crushpad-demo');

-- 2. Create widget account with the expected API key
insert into public.widget_accounts (
  winery_id,
  api_key,
  plan,
  active,
  domain_allowlist,
  theme_color,
  monthly_query_limit
)
select
  w.id,
  'wk_demo_crushpad',
  'demo',
  true,
  array['crushpad.ai', 'www.crushpad.ai', 'localhost', '127.0.0.1', 'pbrandipdx.github.io'],
  '#c47a84',
  5000
from public.wineries w
where w.slug = 'crushpad-demo'
  and not exists (
    select 1 from public.widget_accounts wa where wa.api_key = 'wk_demo_crushpad'
  );
