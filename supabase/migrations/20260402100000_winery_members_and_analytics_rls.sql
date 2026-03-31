-- Partner dashboards: link auth users to wineries and restrict analytics to members.
-- After deploy: enable Email login in Supabase → Authentication → Providers.
-- Invite flow: user signs in once, then run:
--   insert into public.winery_members (user_id, winery_id)
--   select '<auth-user-uuid>', id from public.wineries where slug = 'their-slug';

create table if not exists public.winery_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  winery_id uuid not null references public.wineries (id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_id, winery_id)
);

create index if not exists winery_members_user_id_idx on public.winery_members (user_id);
create index if not exists winery_members_winery_id_idx on public.winery_members (winery_id);

comment on table public.winery_members is 'Maps auth users to wineries. Inserts/deletes via service role or SQL; members may read their own rows.';

alter table public.winery_members enable row level security;

revoke all on public.winery_members from anon;
grant select on public.winery_members to authenticated;

drop policy if exists winery_members_select_own on public.winery_members;
create policy winery_members_select_own
on public.winery_members
for select
to authenticated
using (user_id = (select auth.uid()));

-- ---- Analytics tables: readable only by winery members (service role still bypasses RLS)
alter table public.chat_logs enable row level security;

drop policy if exists chat_logs_select_for_winery_members on public.chat_logs;
create policy chat_logs_select_for_winery_members
on public.chat_logs
for select
to authenticated
using (
  winery_id is not null
  and exists (
    select 1 from public.winery_members wm
    where wm.user_id = (select auth.uid())
      and wm.winery_id = chat_logs.winery_id
  )
);

alter table public.chat_sessions enable row level security;

drop policy if exists chat_sessions_select_for_winery_members on public.chat_sessions;
create policy chat_sessions_select_for_winery_members
on public.chat_sessions
for select
to authenticated
using (
  winery_id is not null
  and exists (
    select 1 from public.winery_members wm
    where wm.user_id = (select auth.uid())
      and wm.winery_id = chat_sessions.winery_id
  )
);

alter table public.message_keywords enable row level security;

drop policy if exists message_keywords_select_for_winery_members on public.message_keywords;
create policy message_keywords_select_for_winery_members
on public.message_keywords
for select
to authenticated
using (
  exists (
    select 1 from public.winery_members wm
    where wm.user_id = (select auth.uid())
      and wm.winery_id = message_keywords.winery_id
  )
);

alter table public.analytics_snapshots enable row level security;

drop policy if exists analytics_snapshots_select_for_winery_members on public.analytics_snapshots;
create policy analytics_snapshots_select_for_winery_members
on public.analytics_snapshots
for select
to authenticated
using (
  exists (
    select 1 from public.winery_members wm
    join public.widget_accounts wa on wa.winery_id = wm.winery_id
    where wm.user_id = (select auth.uid())
      and wa.id = analytics_snapshots.widget_account_id
  )
);

-- ---- Partner-entered facts: keep public read for directory/RAG; writes for members only
drop policy if exists winery_facts_insert_member on public.winery_facts;
create policy winery_facts_insert_member
on public.winery_facts
for insert
to authenticated
with check (
  exists (
    select 1 from public.winery_members wm
    where wm.user_id = (select auth.uid())
      and wm.winery_id = winery_facts.winery_id
  )
);

drop policy if exists winery_facts_update_member on public.winery_facts;
create policy winery_facts_update_member
on public.winery_facts
for update
to authenticated
using (
  exists (
    select 1 from public.winery_members wm
    where wm.user_id = (select auth.uid())
      and wm.winery_id = winery_facts.winery_id
  )
)
with check (
  exists (
    select 1 from public.winery_members wm
    where wm.user_id = (select auth.uid())
      and wm.winery_id = winery_facts.winery_id
  )
);
