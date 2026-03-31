-- Link promoted admin facts to winery_chunks and RPC to copy text into RAG.
alter table public.winery_facts
  add column if not exists promoted_chunk_id uuid references public.winery_chunks (id) on delete set null;

create index if not exists winery_facts_promoted_chunk_id_idx
  on public.winery_facts (promoted_chunk_id)
  where promoted_chunk_id is not null;

comment on column public.winery_facts.promoted_chunk_id is
  'When set, this fact has been copied into winery_chunks for retrieval; cleared if chunk is deleted.';

-- Promote facts that carry human-readable text (admin UI uses fact_value.text + source admin_ui).
create or replace function public.sync_facts_to_chunks (p_winery_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted int := 0;
  r record;
  new_chunk_id uuid;
  body text;
begin
  if p_winery_id is null then
    raise exception 'winery_id required';
  end if;

  for r in
    select f.id, f.fact_value, f.source_url, f.fetched_at, f.confidence
    from public.winery_facts f
    where f.winery_id = p_winery_id
      and coalesce(f.in_quarantine, false) = false
      and f.promoted_chunk_id is null
      and f.fact_value is not null
      and nullif(trim(f.fact_value->>'text'), '') is not null
  loop
    body := trim(r.fact_value->>'text');
    insert into public.winery_chunks (
      winery_id,
      chunk_text,
      chunk_type,
      source_url,
      fetched_at,
      confidence
    )
    values (
      p_winery_id,
      body,
      'admin_fact',
      coalesce(nullif(trim(r.source_url), ''), 'https://admin.oregonwine.ai/fact/' || r.id::text),
      coalesce(r.fetched_at, now()),
      coalesce(r.confidence, 1.0)
    )
    returning id into new_chunk_id;

    update public.winery_facts
    set promoted_chunk_id = new_chunk_id
    where id = r.id;

    inserted := inserted + 1;
  end loop;

  return inserted;
end;
$$;

grant execute on function public.sync_facts_to_chunks (uuid) to anon, authenticated, service_role;
