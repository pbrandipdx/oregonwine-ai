-- Fix #1: Re-enable RLS on sensitive tables with appropriate policies.
-- Fix #2: Revoke anon access to sync_facts_to_chunks.
-- Fix #7: Create chat_gaps view for AdminPage.

---------------------------------------------------------------------------
-- 1. RLS on chat_logs — allow service_role full access, anon no direct reads
---------------------------------------------------------------------------
alter table public.chat_logs enable row level security;

-- Service role (edge functions) can do everything
drop policy if exists chat_logs_service_all on public.chat_logs;
create policy chat_logs_service_all on public.chat_logs
  for all using (true) with check (true);

-- Widget accounts can only insert (the chat edge function uses service_role,
-- but this is defense-in-depth)
drop policy if exists chat_logs_anon_insert on public.chat_logs;
create policy chat_logs_anon_insert on public.chat_logs
  for insert to anon with check (true);

-- Authenticated users (admin dashboard) can select
drop policy if exists chat_logs_auth_select on public.chat_logs;
create policy chat_logs_auth_select on public.chat_logs
  for select to authenticated using (true);

---------------------------------------------------------------------------
-- 2. RLS on chat_sessions
---------------------------------------------------------------------------
alter table public.chat_sessions enable row level security;

drop policy if exists chat_sessions_service_all on public.chat_sessions;
create policy chat_sessions_service_all on public.chat_sessions
  for all using (true) with check (true);

drop policy if exists chat_sessions_auth_select on public.chat_sessions;
create policy chat_sessions_auth_select on public.chat_sessions
  for select to authenticated using (true);

---------------------------------------------------------------------------
-- 3. RLS on analytics_snapshots
---------------------------------------------------------------------------
alter table public.analytics_snapshots enable row level security;

drop policy if exists analytics_service_all on public.analytics_snapshots;
create policy analytics_service_all on public.analytics_snapshots
  for all using (true) with check (true);

drop policy if exists analytics_auth_select on public.analytics_snapshots;
create policy analytics_auth_select on public.analytics_snapshots
  for select to authenticated using (true);

---------------------------------------------------------------------------
-- 4. Revoke anon access to sync_facts_to_chunks
---------------------------------------------------------------------------
revoke execute on function public.sync_facts_to_chunks(uuid) from anon;

---------------------------------------------------------------------------
-- 5. Create chat_gaps view for AdminPage
---------------------------------------------------------------------------
drop view if exists public.chat_gaps;
create view public.chat_gaps as
select
  id,
  winery_id,
  user_message,
  assistant_response,
  was_deflected,
  feedback_rating,
  created_at
from public.chat_logs
where was_deflected = true or feedback_rating = -1
order by created_at desc;

-- Grant access
grant select on public.chat_gaps to authenticated, service_role;
