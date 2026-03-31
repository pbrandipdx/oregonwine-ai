import type { SupabaseClient } from "@supabase/supabase-js";

export type MemberWinery = { winery_id: string; slug: string; name: string };

/**
 * Wineries the signed-in user may access (dashboard / admin).
 */
export async function fetchMemberWineries(
  client: SupabaseClient,
  userId: string
): Promise<MemberWinery[]> {
  const { data: links, error: linkErr } = await client
    .from("winery_members")
    .select("winery_id")
    .eq("user_id", userId);

  if (linkErr) throw linkErr;
  const ids = [...new Set((links ?? []).map((r: { winery_id: string }) => r.winery_id))];
  if (ids.length === 0) return [];

  const { data: wineries, error: wErr } = await client
    .from("wineries")
    .select("id, slug, name")
    .in("id", ids)
    .eq("status", "active");

  if (wErr) throw wErr;

  return (wineries ?? []).map((w: { id: string; slug: string; name: string }) => ({
    winery_id: w.id,
    slug: w.slug,
    name: w.name,
  }));
}
