import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { WINERY_CARD_OVERRIDES } from "../lib/wineries";
import { supabase } from "../lib/supabase";

export type WineryListRow = {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  ava: string | null;
  description: string | null;
  state: string | null;
};

type WineryDirectoryState = {
  wineries: WineryListRow[];
  loading: boolean;
  error: string | null;
  /** False when Vite Supabase env vars are missing — directory shows built-in demo partners */
  supabaseConfigured: boolean;
  refresh: () => void;
};

function offlineWineryRows(): WineryListRow[] {
  return Object.keys(WINERY_CARD_OVERRIDES).map((slug) => {
    const ov = WINERY_CARD_OVERRIDES[slug];
    const region = ov.region ?? null;
    const ava =
      region && region.includes("·") ? region.split("·")[0].trim() : region;
    return {
      id: `offline-${slug}`,
      name: ov.cardTitle ?? slug.replace(/-/g, " "),
      slug,
      city: null,
      ava,
      description: ov.blurb ?? null,
      state: "OR",
    };
  });
}

const WineryDirectoryContext = createContext<WineryDirectoryState | null>(null);

export function WineryDirectoryProvider({ children }: { children: ReactNode }) {
  const [wineries, setWineries] = useState<WineryListRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!supabase) {
      setWineries(offlineWineryRows());
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    supabase
      .from("wineries")
      .select("id, name, slug, city, ava, description, state")
      .eq("status", "active")
      .order("name")
      .then(({ data, error: qErr }) => {
        if (qErr) {
          setError(qErr.message);
          setWineries([]);
        } else {
          setWineries((data as WineryListRow[]) ?? []);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const supabaseConfigured = Boolean(supabase);

  const value = useMemo(
    () => ({
      wineries,
      loading,
      error,
      supabaseConfigured,
      refresh: load,
    }),
    [wineries, loading, error, supabaseConfigured, load]
  );

  return (
    <WineryDirectoryContext.Provider value={value}>{children}</WineryDirectoryContext.Provider>
  );
}

export function useWineryDirectory(): WineryDirectoryState {
  const ctx = useContext(WineryDirectoryContext);
  if (!ctx) {
    throw new Error("useWineryDirectory must be used within WineryDirectoryProvider");
  }
  return ctx;
}

export function useWineryBySlug(slug: string | null): WineryListRow | undefined {
  const { wineries } = useWineryDirectory();
  return useMemo(
    () => (slug ? wineries.find((w) => w.slug === slug) : undefined),
    [wineries, slug]
  );
}
