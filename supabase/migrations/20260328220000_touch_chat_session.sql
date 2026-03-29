-- Increment or create chat_sessions row (called from Edge Function after each message)
create or replace function public.touch_chat_session(
  p_session_id text,
  p_widget_account_id uuid,
  p_winery_id uuid,
  p_referrer_domain text,
  p_prompt_version text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_session_id is null or length(trim(p_session_id)) = 0 then
    return;
  end if;

  insert into public.chat_sessions (
    session_id,
    widget_account_id,
    winery_id,
    started_at,
    ended_at,
    message_count,
    referrer_domain,
    prompt_version
  )
  values (
    p_session_id,
    p_widget_account_id,
    p_winery_id,
    now(),
    now(),
    1,
    nullif(trim(p_referrer_domain), ''),
    nullif(trim(p_prompt_version), '')
  )
  on conflict (session_id) do update set
    ended_at = now(),
    message_count = public.chat_sessions.message_count + 1,
    referrer_domain = coalesce(
      excluded.referrer_domain,
      public.chat_sessions.referrer_domain
    ),
    prompt_version = coalesce(
      excluded.prompt_version,
      public.chat_sessions.prompt_version
    );
end;
$$;

revoke all on function public.touch_chat_session(text, uuid, uuid, text, text) from public;
grant execute on function public.touch_chat_session(text, uuid, uuid, text, text) to service_role;
