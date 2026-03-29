import { createClient } from "@supabase/supabase-js";

const url = (import.meta.env.VITE_SUPABASE_URL ?? "").trim();
const anon = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim();

export const supabase =
  url && anon
    ? createClient(url, anon)
    : null;

/** Shown when the directory / winery pages cannot create a client */
export function supabaseEnvHint(): string {
  const missing: string[] = [];
  if (!url) missing.push("VITE_SUPABASE_URL");
  if (!anon) missing.push("VITE_SUPABASE_ANON_KEY");
  return (
    `${missing.join(" and ")} ${missing.length === 1 ? "is" : "are"} missing or empty in .env. ` +
    "Use the file at the project root (same folder as package.json). Copy the **anon public** key from " +
    "Supabase → Project Settings → API. Put it on one line: VITE_SUPABASE_ANON_KEY=eyJ... (no quotes). " +
    "Save the file, then stop and restart `npm run dev`."
  );
}

export function requireSupabase() {
  if (!supabase) {
    throw new Error(supabaseEnvHint());
  }
  return supabase;
}
