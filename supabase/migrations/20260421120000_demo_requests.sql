-- Public demo request form submissions (insert-only for anon via RLS)

create table public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  winery_or_org text not null,
  phone text,
  role_title text,
  message text,
  source_path text,
  constraint demo_requests_full_name_len check (char_length(trim(full_name)) >= 2),
  constraint demo_requests_email_len check (char_length(trim(email)) >= 5),
  constraint demo_requests_winery_len check (char_length(trim(winery_or_org)) >= 2)
);

create index demo_requests_created_at_idx on public.demo_requests (created_at desc);

alter table public.demo_requests enable row level security;

-- Site visitors (anon key) may only create rows; no public reads.
create policy demo_requests_insert_anon
  on public.demo_requests
  for insert
  to anon
  with check (true);

create policy demo_requests_insert_authenticated
  on public.demo_requests
  for insert
  to authenticated
  with check (true);

grant insert on table public.demo_requests to anon, authenticated;
