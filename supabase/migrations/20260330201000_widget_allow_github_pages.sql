-- GitHub Pages demo: browser sends Origin https://pbrandipdx.github.io — must be allowlisted
-- or /chat returns 403 without Access-Control-Allow-Origin and fetch() shows "Failed to fetch".
update public.widget_accounts
set domain_allowlist =
  case
    when coalesce(domain_allowlist, '{}'::text[]) @> array['pbrandipdx.github.io']::text[]
    then domain_allowlist
    else coalesce(domain_allowlist, array[]::text[]) || array['pbrandipdx.github.io']::text[]
  end
where api_key = 'wk_test_rexhill';
