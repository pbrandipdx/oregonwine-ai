-- Remove partner-auth gates: open analytics + facts writes for anon API again (pre-auth behavior).
-- Apply after 20260402100000_winery_members_and_analytics_rls.sql if that migration was deployed.

drop policy if exists chat_logs_select_for_winery_members on public.chat_logs;
alter table public.chat_logs disable row level security;

drop policy if exists chat_sessions_select_for_winery_members on public.chat_sessions;
alter table public.chat_sessions disable row level security;

drop policy if exists message_keywords_select_for_winery_members on public.message_keywords;
alter table public.message_keywords disable row level security;

drop policy if exists analytics_snapshots_select_for_winery_members on public.analytics_snapshots;
alter table public.analytics_snapshots disable row level security;

drop policy if exists winery_facts_insert_member on public.winery_facts;
drop policy if exists winery_facts_update_member on public.winery_facts;
alter table public.winery_facts disable row level security;
drop policy if exists winery_facts_select_public on public.winery_facts;

drop table if exists public.winery_members;
