#!/usr/bin/env bash
# Deploy migrations + chat Edge Function to linked Supabase project, then smoke-test quick replies.
#
# Prerequisites:
#   npx supabase login
#   export SUPABASE_DB_PASSWORD='your-database-password'   # Project Settings → Database
#
# Optional:
#   export SUPABASE_PROJECT_REF=sdobipmpvcuxnjqwpggp        # default matches CI / .github workflow URL
#   source .env && export WIDGET_API_KEY WIDGET_ORIGIN CHAT_URL   # for smoke (or use defaults)

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PROJECT_REF="${SUPABASE_PROJECT_REF:-sdobipmpvcuxnjqwpggp}"

if ! npx supabase projects list >/dev/null 2>&1; then
  echo "Not logged in. Run:  npx supabase login"
  echo "Then set database password:  export SUPABASE_DB_PASSWORD='...'"
  exit 1
fi

if [[ -z "${SUPABASE_DB_PASSWORD:-}" ]]; then
  echo "Set SUPABASE_DB_PASSWORD (Database password from Supabase → Project Settings → Database)."
  exit 1
fi

echo "→ Linking project $PROJECT_REF …"
npx supabase link --project-ref "$PROJECT_REF" --password "$SUPABASE_DB_PASSWORD" --yes

echo "→ Pushing migrations …"
npx supabase db push

echo "→ Deploying chat function …"
npx supabase functions deploy chat --no-verify-jwt

echo "→ Deploying notify-demo function …"
npx supabase functions deploy notify-demo --no-verify-jwt

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

export CHAT_URL="${CHAT_URL:-https://${PROJECT_REF}.supabase.co/functions/v1/chat}"
export WIDGET_API_KEY="${WIDGET_API_KEY:-wk_test_rexhill}"
export WIDGET_ORIGIN="${WIDGET_ORIGIN:-https://pbrandipdx.github.io}"

echo "→ Smoke test ($CHAT_URL) …"
npm run smoke:chat

echo "Done."
