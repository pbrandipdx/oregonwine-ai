import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  QUICK_REPLY_LABELS,
  messageForChatApi,
} from "../lib/quickReplyMessages";
import {
  ENGAGEMENT_LABELS,
  ENGAGEMENT_MODES,
  engagementMessage,
  type EngagementLabel,
} from "../lib/engagementBubbles";
import { AssistantMarkdown } from "./AssistantMarkdown";

type Props = {
  apiKey: string;
  themeColor: string;
  apiBase: string;
  wineryLabel: string;
  /** When true, renders as a centered inline chat instead of a floating bubble */
  embedded?: boolean;
  /**
   * When `embedded` is true: `viewport` uses a fixed top bar (full-page embeds).
   * `panel` relies on the host page chrome — no duplicate Crushpad / Wine Agent strip.
   */
  embeddedChrome?: "viewport" | "panel";
  /** Full wordmark image (crest + type). Ignored when `headerCrestImageUrl` is set. */
  headerLogoUrl?: string;
  /**
   * Crest / emblem only — triggers the three-part bar: crest · dark serif winery · gold italic “Wine Agent”
   * (matches the approved mockup).
   */
  headerCrestImageUrl?: string;
  /**
   * When `headerCrestImageUrl` is unset and `headerLogoUrl` is set:
   * `logo-and-agent`: graphic + “Wine Agent” only.
   * `full`: graphic + winery + “Wine Agent”.
   */
  headerLockup?: "full" | "logo-and-agent";
  /** Winery website for booking/info links */
  wineryUrl?: string;
  /** Path for tasting/booking page (default: /experiences/) */
  bookingPath?: string;
  /** Path for wine club page (default: /clubs/) */
  clubPath?: string;
  /** Winery phone number for escalation */
  wineryPhone?: string;
  /** When true, show engagement experience bubbles instead of winery quick-reply chips */
  useEngagementBubbles?: boolean;
  /** Maps quick-reply chip labels to page routes for inline loading (like game pages) */
  quickReplyRoutes?: Record<string, string>;
};

type Message = {
  role: "user" | "assistant";
  text: string;
  logId?: string;
  feedback?: 1 | -1;
};

type QuickPalette = { border: string; surface: string; text: string; borderHover: string };

const QUICK_REPLY_ICONS: Record<string, JSX.Element> = {
  "Blind Tasting": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
    </svg>
  ),
  "Match Me": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  Compare: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  "Tasting options": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22h8" /><path d="M12 11v11" /><path d="M20 3H4l4 8h8l4-8z" />
    </svg>
  ),
  "Hours & directions": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  "Wine club info": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  "Food pairings": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  Recipes: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  ),
};

function QuickReplyChips({
  palette: p,
  onPick,
  marginTop,
}: {
  palette: QuickPalette;
  onPick: (text: string) => void;
  marginTop: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [chipWidth, setChipWidth] = useState<number | null>(null);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  const measureChips = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const trackW = el.clientWidth;
    // On narrow screens, force 2 chips: each chip = (trackWidth - gap) / 2
    if (trackW < 500) {
      setChipWidth(Math.floor((trackW - 8) / 2));
    } else {
      setChipWidth(null); // natural sizing on desktop
    }
  }, []);

  useEffect(() => {
    checkScroll();
    measureChips();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    const onResize = () => { checkScroll(); measureChips(); };
    window.addEventListener("resize", onResize);
    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [checkScroll, measureChips]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    // On mobile, scroll by exactly 2 chips worth
    const amount = chipWidth ? (chipWidth * 2 + 8) : 160;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const arrowBtn = (dir: "left" | "right", enabled: boolean): React.CSSProperties => ({
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: enabled ? "rgba(17,17,17,0.9)" : "transparent",
    border: `1px solid ${enabled ? "rgba(196,122,132,0.35)" : "rgba(255,255,255,0.06)"}`,
    color: enabled ? "#c47a84" : "rgba(255,255,255,0.08)",
    cursor: enabled ? "pointer" : "default",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    fontWeight: 700,
    fontFamily: "'Space Mono', monospace",
    padding: 0,
    transition: "all 0.2s",
    flexShrink: 0,
  });

  return (
    <div style={{ marginTop, maxWidth: 720, marginLeft: "auto", marginRight: "auto", display: "flex", alignItems: "center", gap: 6 }}>
      {/* Hide scrollbar */}
      <style>{`.qr-scroll-track::-webkit-scrollbar { display: none; }`}</style>

      {/* Left arrow */}
      <button
        type="button"
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
        style={arrowBtn("left", canScrollLeft)}
      >&lsaquo;</button>

      {/* Scrollable chip track */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          gap: 8,
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingTop: 2,
          paddingBottom: 2,
          WebkitOverflowScrolling: "touch",
          ...(chipWidth ? { scrollSnapType: "x mandatory" } : {}),
        }}
        className="qr-scroll-track"
      >
        {QUICK_REPLY_LABELS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => onPick(q)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: chipWidth ? "center" : undefined,
              gap: 7,
              padding: "9px 14px",
              borderRadius: 12,
              border: `1px solid ${p.border}`,
              background: p.surface,
              color: "#a09496",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 0.15s, border-color 0.15s, color 0.15s",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flexShrink: 0,
              flexGrow: 0,
              flexBasis: chipWidth ? chipWidth : undefined,
              width: chipWidth ? chipWidth : undefined,
              minWidth: chipWidth ? chipWidth : undefined,
              maxWidth: chipWidth ? chipWidth : undefined,
              scrollSnapAlign: chipWidth ? "start" : undefined,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = p.border;
              el.style.borderColor = p.borderHover;
              el.style.color = p.text;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = p.surface;
              el.style.borderColor = p.border;
              el.style.color = "#a09496";
            }}
          >
            {QUICK_REPLY_ICONS[q]}
            {q}
          </button>
        ))}
      </div>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        aria-label="Scroll right"
        style={arrowBtn("right", canScrollRight)}
      >&rsaquo;</button>
    </div>
  );
}

const ENGAGEMENT_ICONS: Record<EngagementLabel, JSX.Element> = {
  "Blind Tasting": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  "Featured Winery": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  "Match Me": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  "Plan My Visit": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Compare: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
};

function EngagementBubbles({
  palette: p,
  onPick,
  marginTop,
}: {
  palette: QuickPalette;
  onPick: (label: EngagementLabel) => void;
  marginTop: number;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "nowrap", justifyContent: "center", gap: 8, marginTop, maxWidth: 720, marginLeft: "auto", marginRight: "auto", overflowX: "auto" }}>
      {ENGAGEMENT_LABELS.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => onPick(label)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "9px 14px",
            borderRadius: 12,
            border: `1px solid ${p.border}`,
            background: p.surface,
            color: "#a09496",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "background 0.15s, border-color 0.15s, color 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = p.border;
            el.style.borderColor = p.borderHover;
            el.style.color = p.text;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = p.surface;
            el.style.borderColor = p.border;
            el.style.color = "#a09496";
          }}
        >
          {ENGAGEMENT_ICONS[label]}
          {label}
        </button>
      ))}
    </div>
  );
}

/** Remove trailing log id comment streamed from /chat before display. */
function stripTrailingLogMeta(raw: string): string {
  return raw.replace(/\n<!-- log_id:[a-f0-9-]+ -->$/i, "").trimEnd();
}

/** Flatten markdown for keyword checks (CTA chips, deflection). */
function plainForTriggers(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

/** Animated three-dot typing indicator */
function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "12px 16px" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#666",
            opacity: 0.5,
            animation: `owDotPulse 1.2s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes owDotPulse {
          0%, 60%, 100% { opacity: 0.3; transform: scale(0.85); }
          30% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

const EMBEDDED_TOP_BAR_PX = 56;

export function ChatWidget({
  apiKey,
  themeColor: _themeColor,
  apiBase,
  wineryLabel,
  embedded,
  embeddedChrome,
  headerLogoUrl,
  headerCrestImageUrl,
  headerLockup = "logo-and-agent",
  wineryUrl,
  bookingPath = "/experiences/",
  clubPath = "/clubs/",
  wineryPhone,
  useEngagementBubbles,
  quickReplyRoutes,
}: Props) {
  const embeddedChromeMode: "viewport" | "panel" =
    embedded && embeddedChrome === "panel" ? "panel" : "viewport";
  const fixedViewportTopBar = embedded && embeddedChromeMode === "viewport";

  const sessionId = useId().replace(/:/g, "");
  const [open, setOpen] = useState(embedded ? true : false);
  const [input, setInput] = useState("");
  const [showLanding, setShowLanding] = useState(true);
  const [landingExiting, setLandingExiting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [gameView, setGameView] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<Message[]>([]);

  // Keep ref in sync with state for stale-closure-safe access
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Crimson Pro (Rex Hill site / label serif) for embedded header when host page did not load it
  useEffect(() => {
    if (!embedded) return;
    const id = "ow-font-crimson-pro";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,500;0,600;0,700;1,500&display=swap";
    document.head.appendChild(link);
  }, [embedded]);

  // Auto-resize textarea
  const resizeTextarea = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
    }
  };

  // --- Dark color palette ---
  const c = {
    bg: "#0d0d0d",
    surface: "#1a1a1a",
    border: "#2e2e2e",
    borderHover: "#3a3a3a",
    text: "#ececec",
    textMuted: "#888",
    textDim: "#555",
    userBubble: "#2a1520",
    assistantBubble: "#1a1a1a",
    accent: "#c47a84",
    error: "#e05555",
    sendBtn: "#111",
    sendBtnHover: "#222",
  };

  const sendFeedback = useCallback(
    async (logId: string, rating: 1 | -1, msgIndex: number) => {
      setMessages((m) => {
        const copy = [...m];
        copy[msgIndex] = { ...copy[msgIndex], feedback: rating };
        return copy;
      });
      try {
        const res = await fetch(`${apiBase}/feedback`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": apiKey },
          body: JSON.stringify({ log_id: logId, rating }),
        });
        if (!res.ok) throw new Error(`Feedback failed: ${res.status}`);
      } catch (e) {
        console.error("Feedback submission failed:", e);
        // Revert optimistic UI update so user knows vote didn't save
        setMessages((m) => {
          const copy = [...m];
          copy[msgIndex] = { ...copy[msgIndex], feedback: undefined };
          return copy;
        });
      }
    },
    [apiBase, apiKey]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;
      if (!apiBase) {
        setError("Missing API configuration.");
        return;
      }
      setInput("");
      setError(null);
      if (showLanding) {
        setLandingExiting(true);
        setTimeout(() => {
          setShowLanding(false);
          setLandingExiting(false);
        }, 400);
      }

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      const apiMessage = messageForChatApi(trimmed, wineryLabel);

      setMessages((m) => [...m, { role: "user", text: trimmed }]);
      setLoading(true);

      const history = messagesRef.current.map((m) => ({ role: m.role, text: m.text }));

      try {
        const res = await fetch(`${apiBase}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": apiKey },
          body: JSON.stringify({ message: apiMessage, session_id: sessionId, history, ...(activeMode ? { mode: activeMode } : {}) }),
        });
        if (!res.ok) {
          const t = await res.text();
          throw new Error(t || res.statusText);
        }
        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response body");
        const dec = new TextDecoder();
        let full = "";
        setMessages((m) => [...m, { role: "assistant", text: "" }]);
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          full += dec.decode(value, { stream: true });
          const display = stripTrailingLogMeta(full);
          setMessages((m) => {
            const copy = [...m];
            copy[copy.length - 1] = { role: "assistant", text: display };
            return copy;
          });
        }
        const logMatch = full.match(/<!-- log_id:([a-f0-9-]+) -->/);
        const logId = logMatch?.[1];
        const finalText = stripTrailingLogMeta(full);
        if (logId) {
          setMessages((m) => {
            const copy = [...m];
            copy[copy.length - 1] = { ...copy[copy.length - 1], logId, text: finalText };
            return copy;
          });
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Request failed");
      } finally {
        setLoading(false);
      }
    },
    [apiBase, apiKey, loading, messages, sessionId, wineryLabel, activeMode]
  );

  /** Agent demo / host pages can trigger the same send pipeline as the composer (e.g. left-rail discovery card). */
  useEffect(() => {
    const handler = (ev: Event) => {
      const text = (ev as CustomEvent<{ text?: string }>).detail?.text;
      if (typeof text !== "string") return;
      const trimmed = text.trim();
      if (!trimmed) return;
      void sendMessage(trimmed);
    };
    window.addEventListener("crushpad-embed-send-message", handler);
    return () => window.removeEventListener("crushpad-embed-send-message", handler);
  }, [sendMessage]);

  /** Map engagement labels to game page routes for inline loading */
  const GAME_ROUTES: Partial<Record<EngagementLabel, string>> = {
    "Blind Tasting": "/blind-tasting?embed=1",
    "Featured Winery": "/featured-winery?embed=1",
    "Match Me": "/match-me?embed=1",
    "Plan My Visit": "/plan-visit?embed=1",
    Compare: "/compare?embed=1",
  };

  const pickEngagement = useCallback(
    (label: EngagementLabel) => {
      const gameRoute = GAME_ROUTES[label];
      if (gameRoute) {
        // Load the interactive game inline instead of chat
        setGameView(gameRoute);
        if (showLanding) {
          setLandingExiting(true);
          setTimeout(() => {
            setShowLanding(false);
            setLandingExiting(false);
          }, 400);
        }
        return;
      }

      // Fallback: remaining labels use the chat flow
      const mode = ENGAGEMENT_MODES[label];
      setActiveMode(mode);
      setGameView(null);
      const apiMsg = engagementMessage(label);
      if (loading) return;
      setInput("");
      setError(null);
      if (showLanding) {
        setLandingExiting(true);
        setTimeout(() => {
          setShowLanding(false);
          setLandingExiting(false);
        }, 400);
      }
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      setMessages((m) => [...m, { role: "user", text: label }]);
      setLoading(true);
      const history = messagesRef.current.map((m) => ({ role: m.role, text: m.text }));
      (async () => {
        try {
          const res = await fetch(`${apiBase}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-api-key": apiKey },
            body: JSON.stringify({ message: apiMsg, session_id: sessionId, history, mode }),
          });
          if (!res.ok) {
            const t = await res.text();
            throw new Error(t || res.statusText);
          }
          const reader = res.body?.getReader();
          if (!reader) throw new Error("No response body");
          const dec = new TextDecoder();
          let full = "";
          setMessages((m) => [...m, { role: "assistant", text: "" }]);
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            full += dec.decode(value, { stream: true });
            const display = stripTrailingLogMeta(full);
            setMessages((m) => {
              const copy = [...m];
              copy[copy.length - 1] = { role: "assistant", text: display };
              return copy;
            });
          }
          const logMatch = full.match(/<!-- log_id:([a-f0-9-]+) -->/);
          const logId = logMatch?.[1];
          const finalText = stripTrailingLogMeta(full);
          if (logId) {
            setMessages((m) => {
              const copy = [...m];
              copy[copy.length - 1] = { ...copy[copy.length - 1], logId, text: finalText };
              return copy;
            });
          }
        } catch (e) {
          setError(e instanceof Error ? e.message : "Request failed");
        } finally {
          setLoading(false);
        }
      })();
    },
    [apiBase, apiKey, loading, sessionId, showLanding]
  );

  const exitGame = useCallback(() => {
    setGameView(null);
    setShowLanding(true);
  }, []);

  /** Quick-reply handler: loads inline page if quickReplyRoutes has a match, else sends chat */
  const pickQuickReply = useCallback(
    (label: string) => {
      const route = quickReplyRoutes?.[label];
      if (route) {
        setGameView(route);
        if (showLanding) {
          setLandingExiting(true);
          setTimeout(() => {
            setShowLanding(false);
            setLandingExiting(false);
          }, 400);
        }
        return;
      }
      void sendMessage(label);
    },
    [quickReplyRoutes, sendMessage, showLanding],
  );

  const send = useCallback(() => sendMessage(input), [sendMessage, input]);

  /** Detect if the response suggests the bot couldn't answer */
  const isDeflected = (text: string) => {
    const lower = text.toLowerCase();
    return [
      "don't have",
      "do not have",
      "not sure",
      "can't find",
      "cannot find",
      "don't have information",
      "recommend calling",
    ].some((p) => lower.includes(p));
  };

  /** Embedded full-page landing: GPT-style vertical center, composer then prompts with a wide gap. */
  const landingEmbedded = embedded && showLanding;

  const inputCardEl = (
    <div
      style={{
        background: c.surface,
        border: `1px solid ${c.border}`,
        borderRadius: 20,
        padding: "14px 18px",
        transition: "border-color 0.2s",
      }}
      onFocus={() => {}}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            resizeTextarea();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Ask about wines, tastings, hours..."
          disabled={loading}
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            color: c.text,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 15,
            lineHeight: 1.5,
            resize: "none",
            minHeight: 36,
            maxHeight: 120,
            margin: 0,
            padding: "7px 4px 7px 0",
            boxSizing: "border-box",
          }}
        />
        <button
          type="button"
          onClick={send}
          disabled={loading || !input.trim()}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "none",
            background: input.trim() ? c.sendBtn : "transparent",
            color: input.trim() ? "#fff" : c.textDim,
            cursor: loading || !input.trim() ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.15s",
            alignSelf: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>
    </div>
  );

  const quickPalette = { border: c.border, surface: c.surface, text: c.text, borderHover: c.borderHover };

  /** Header lockup: dark wordmark + crest bronze “Wine Agent”. */
  const headerTone = {
    winery: "#9a9088",
    sep: "#4a4543",
    agent: "#b9a068",
    winerySerifMuted: "#4f3e42",
    agentAlt: "#8f7a7c",
  };

  const wineAgentTitle = (
    <span
      style={{
        fontFamily: "'Space Mono', ui-monospace, monospace",
        fontSize: 11,
        fontWeight: 600,
        fontStyle: "normal",
        color: "#c47a84",
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
      }}
    >
      Wine Agent
    </span>
  );

  const embeddedHeaderContent = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        minWidth: 0,
        flexWrap: "nowrap",
      }}
    >
      {headerCrestImageUrl ? (
        <>
          <img
            src={headerCrestImageUrl}
            alt=""
            style={{
              height: 28,
              width: 28,
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'Crimson Pro', Georgia, 'Times New Roman', serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: headerTone.winerySerifMuted,
              textTransform: "uppercase",
            }}
          >
            {wineryLabel}
          </span>
          {wineAgentTitle}
        </>
      ) : (
        <>
          {headerLogoUrl ? (
            <img
              src={headerLogoUrl}
              alt=""
              style={{
                height: 30,
                width: "auto",
                maxWidth: 152,
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          ) : null}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              flexWrap: "wrap",
              columnGap: 8,
              rowGap: 2,
              minWidth: 0,
            }}
          >
            {(headerLockup === "full" || !headerLogoUrl) && (
              <>
                <span
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.11em",
                    color: headerTone.winery,
                    textTransform: "uppercase",
                  }}
                >
                  {wineryLabel}
                </span>
                <span style={{ color: headerTone.sep, fontSize: 10, userSelect: "none" }} aria-hidden>
                  ·
                </span>
              </>
            )}
            {wineAgentTitle}
          </div>
        </>
      )}
    </div>
  );

  const embeddedPageHeader = embedded && fixedViewportTopBar ? (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: EMBEDDED_TOP_BAR_PX,
        display: "flex",
        alignItems: "center",
        padding: "0 clamp(16px, 5vw, 32px)",
        background: c.bg,
        borderBottom: `1px solid ${c.border}`,
        zIndex: 100000,
        boxSizing: "border-box",
      }}
    >
      {embeddedHeaderContent}
    </header>
  ) : null;

  const chatPanel = (
    <div
      style={{
        width: embedded ? "100%" : "min(480px, calc(100vw - 48px))",
        height: embedded ? "100%" : 600,
        background: c.bg,
        borderRadius: embedded ? 20 : 16,
        boxShadow: embedded
          ? "none"
          : "0 16px 48px rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
        border: embedded ? "none" : `1px solid ${c.border}`,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        overflow: "hidden",
        boxSizing: "border-box",
        ...(embedded
          ? fixedViewportTopBar
            ? { paddingTop: EMBEDDED_TOP_BAR_PX }
            : {}
          : { position: "fixed" as const, bottom: 96, left: 24, zIndex: 99999 }),
      }}
    >
      {landingEmbedded ? (
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "clamp(12px, 3vh, 28px) 0 clamp(32px, 9vh, 100px)",
            overflowY: "auto",
            width: "100%",
            transition: "opacity 0.35s ease, transform 0.4s ease",
            opacity: landingExiting ? 0 : 1,
            transform: landingExiting ? "translateY(-30px) scale(0.95)" : "translateY(0) scale(1)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "100%",
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center", padding: "0 24px", width: "100%", boxSizing: "border-box" }}>
              {(headerCrestImageUrl || headerLogoUrl) && (
                <img
                  src={headerCrestImageUrl || headerLogoUrl}
                  alt=""
                  style={{
                    height: headerCrestImageUrl ? 56 : 40,
                    width: "auto",
                    objectFit: "contain",
                    marginBottom: -2,
                    opacity: 0.85,
                  }}
                />
              )}
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 10, marginBottom: 16 }}>
                <span
                  style={{
                    fontFamily: "'Crimson Pro', Georgia, 'Times New Roman', serif",
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: headerTone.winerySerifMuted,
                    textTransform: "uppercase",
                  }}
                >
                  {wineryLabel}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', ui-monospace, monospace",
                    fontSize: 11,
                    fontWeight: 600,
                    fontStyle: "normal",
                    color: "#c47a84",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase" as const,
                  }}
                >
                  Wine Agent
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.75rem, 4.5vw, 2.6rem)",
                  fontWeight: 500,
                  color: c.text,
                  lineHeight: 1.2,
                  margin: 0,
                  whiteSpace: "normal",
                }}
              >
                What can I help you discover today?
              </h2>
            </div>
            <div style={{ width: "100%", padding: "0 16px", marginTop: 22, boxSizing: "border-box" }}>{inputCardEl}</div>
            {!loading && (
              useEngagementBubbles
                ? <EngagementBubbles palette={quickPalette} onPick={pickEngagement} marginTop={48} />
                : <QuickReplyChips palette={quickPalette} onPick={pickQuickReply} marginTop={48} />
            )}
            <div
              style={{
                textAlign: "center",
                marginTop: 14,
                fontSize: 11,
                color: c.textDim,
                padding: "0 16px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              Powered by <span style={{ color: c.textMuted }}>Crushpad.ai</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Sticky logo lockup bar */}
          {!showLanding && (
            <>
            <style>{`
              @keyframes ow-bar-enter {
                from { opacity: 0; transform: translateY(-8px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              padding: "10px 16px",
              borderBottom: `1px solid ${c.border}`,
              flexShrink: 0,
              animation: "ow-bar-enter 0.5s ease both",
            }}>
              {headerCrestImageUrl && (
                <img
                  src={headerCrestImageUrl}
                  alt=""
                  style={{ height: 22, width: 22, objectFit: "contain", opacity: 0.55 }}
                />
              )}
              <span style={{
                fontFamily: "'Crimson Pro', Georgia, 'Times New Roman', serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: headerTone.winerySerifMuted,
                textTransform: "uppercase" as const,
              }}>
                {wineryLabel}
              </span>
              <span style={{
                fontFamily: "'Space Mono', ui-monospace, monospace",
                fontSize: 10,
                fontWeight: 600,
                fontStyle: "normal",
                color: "#c47a84",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
              }}>
                Wine Agent
              </span>
            </div>
            </>
          )}

          {/* Inline game view */}
          {gameView && (
            <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
              <iframe
                src={gameView}
                title="Game"
                style={{
                  flex: 1,
                  height: 0,
                  minHeight: 0,
                  width: "100%",
                  border: "none",
                  background: "#080808",
                }}
              />
              <div style={{
                padding: "10px 16px",
                borderTop: `1px solid ${c.border}`,
                display: "flex",
                alignItems: "center",
              }}>
                <button
                  type="button"
                  onClick={exitGame}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#c47a84",
                    fontFamily: "'Space Mono', ui-monospace, monospace",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase" as const,
                    padding: "6px 14px",
                    borderRadius: 8,
                    cursor: "pointer",
                    transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,122,132,0.15)"; e.currentTarget.style.color = "#eceae8"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c47a84"; }}
                >
                  ← Back
                </button>
              </div>
            </div>
          )}

          {/* Messages / Landing area */}
          {!gameView && (
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              padding: "24px 20px 24px",
              fontSize: 14,
              lineHeight: 1.6,
              color: c.text,
              ...(!showLanding ? { animation: "ow-bar-enter 0.5s ease 0.1s both" } : {}),
              display: "flex",
              flexDirection: "column",
              ...(showLanding && !embedded ? { justifyContent: "center", alignItems: "center" } : {}),
            }}
          >
            {/* Landing state (floating widget) */}
            {showLanding && (
              <div style={{ textAlign: "center", maxWidth: "100%" }}>
                <div style={{ color: c.textMuted, fontSize: 13, fontWeight: 500, marginBottom: 16, letterSpacing: "0.03em" }}>
                  {wineryLabel} <span style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 10, fontWeight: 600, color: "#c47a84", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>Wine Agent</span>
                </div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "2.6rem",
                    fontWeight: 500,
                    color: c.text,
                    lineHeight: 1.15,
                    margin: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  What can I help you discover today?
                </h2>
              </div>
            )}

        {/* Conversation messages */}
        {!showLanding && messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: m.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: m.role === "assistant" ? "95%" : "90%",
                padding: m.role === "assistant" ? "18px 22px" : "12px 16px",
                borderRadius: 16,
                ...(m.role === "user"
                  ? { borderBottomRightRadius: 4, background: c.userBubble, color: c.text }
                  : {
                      borderBottomLeftRadius: 4,
                      background: "linear-gradient(135deg, rgba(20,20,20,0.95), rgba(26,26,26,0.9))",
                      color: "#d5d5d5",
                      border: `1px solid ${c.border}`,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                    }),
                whiteSpace: m.role === "user" ? "pre-wrap" : "normal",
                wordBreak: "break-word",
              }}
            >
              {m.role === "user" ? (
                m.text
              ) : (
                <>
                  <AssistantMarkdown
                    text={m.text}
                    accentColor={c.accent}
                    headingColor={c.text}
                    textColor="#d5d5d5"
                  />
                  {/* Feedback inside bubble, under source line */}
                  {m.logId && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 10,
                        paddingTop: 8,
                        borderTop: `1px solid ${c.border}`,
                      }}
                    >
                      <span style={{
                        fontSize: 11,
                        color: c.textMuted,
                        whiteSpace: "nowrap",
                        fontStyle: "italic",
                        letterSpacing: "0.01em",
                      }}>
                        {m.feedback ? (m.feedback === 1 ? "Thank you" : "Noted") : "Helpful?"}
                      </span>
                      <button
                        type="button"
                        onClick={() => sendFeedback(m.logId!, 1, i)}
                        title="Yes, helpful"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          padding: "2px 4px",
                          transition: "opacity 0.15s",
                          opacity: m.feedback === -1 ? 0.2 : m.feedback === 1 ? 1 : 0.45,
                          lineHeight: 1,
                          color: m.feedback === 1 ? "#7dcda0" : c.textMuted,
                          fontSize: 14,
                        }}
                        onMouseEnter={(e) => {
                          if (!m.feedback) (e.target as HTMLElement).style.opacity = "0.85";
                        }}
                        onMouseLeave={(e) => {
                          if (!m.feedback) (e.target as HTMLElement).style.opacity = "0.45";
                        }}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => sendFeedback(m.logId!, -1, i)}
                        title="Not helpful"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          padding: "2px 4px",
                          transition: "opacity 0.15s",
                          opacity: m.feedback === 1 ? 0.2 : m.feedback === -1 ? 1 : 0.45,
                          lineHeight: 1,
                          color: m.feedback === -1 ? "#e05555" : c.textMuted,
                          fontSize: 14,
                        }}
                        onMouseEnter={(e) => {
                          if (!m.feedback) (e.target as HTMLElement).style.opacity = "0.85";
                        }}
                        onMouseLeave={(e) => {
                          if (!m.feedback) (e.target as HTMLElement).style.opacity = "0.45";
                        }}
                      >
                        ↓
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* CTA buttons after assistant messages */}
            {m.role === "assistant" && m.logId && (
              <div style={{ marginTop: 6, marginLeft: 0, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                {wineryUrl &&
                  /tasting|experience|reserv|book/i.test(plainForTriggers(m.text)) && (
                  <a
                    href={`${wineryUrl.replace(/\/$/, "")}${bookingPath}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "5px 12px",
                      borderRadius: 8,
                      background: c.surface,
                      color: c.accent,
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: "none",
                      border: `1px solid ${c.border}`,
                    }}
                  >
                    Book a tasting
                  </a>
                )}
                {wineryUrl &&
                  /club|member|join|shipment/i.test(plainForTriggers(m.text)) && (
                  <a
                    href={`${wineryUrl.replace(/\/$/, "")}${clubPath}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "5px 12px",
                      borderRadius: 8,
                      background: c.surface,
                      color: c.accent,
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: "none",
                      border: `1px solid ${c.border}`,
                    }}
                  >
                    Explore wine clubs
                  </a>
                )}

                {wineryPhone &&
                  isDeflected(plainForTriggers(m.text)) && (
                  <a
                    href={`tel:${wineryPhone.replace(/[^+\d]/g, "")}`}
                    style={{
                      display: "inline-block",
                      padding: "5px 12px",
                      borderRadius: 8,
                      background: c.surface,
                      color: c.textMuted,
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: "none",
                      border: `1px solid ${c.border}`,
                    }}
                  >
                    Talk to the team
                  </a>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 14 }}>
            <div style={{ borderRadius: 16, borderBottomLeftRadius: 4, background: c.assistantBubble, border: `1px solid ${c.border}` }}>
              <TypingDots />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
          )}

      {/* Input area — hidden when inline game is active */}
      {!gameView && (
      <div style={{ padding: "12px 16px 16px", flex: "0 0 auto", borderTop: `1px solid ${c.border}` }}>
        {/* Quick replies / engagement bubbles: stay visible under the thread after answers */}
        {!showLanding && !loading && (
          useEngagementBubbles
            ? (
              <div style={{ marginBottom: 12 }}>
                <EngagementBubbles palette={quickPalette} onPick={pickEngagement} marginTop={0} />
              </div>
            )
            : (
              <div style={{ marginBottom: 12 }}>
                <QuickReplyChips palette={quickPalette} onPick={pickQuickReply} marginTop={0} />
              </div>
            )
        )}

        {inputCardEl}

        {/* Quick replies / engagement bubbles (floating widget landing only — embedded landing uses column above) */}
        {showLanding && !loading && !embedded && (
          useEngagementBubbles
            ? <EngagementBubbles palette={quickPalette} onPick={pickEngagement} marginTop={14} />
            : <QuickReplyChips palette={quickPalette} onPick={pickQuickReply} marginTop={14} />
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: c.textDim }}>
          Powered by <span style={{ color: c.textMuted }}>Crushpad.ai</span>
        </div>
      </div>
      )}
        </>
      )}

      {error && (
        <div style={{ padding: "0 20px 12px", color: c.error, fontSize: 12, flex: "0 0 auto" }}>{error}</div>
      )}
    </div>
  );

  if (embedded) {
    return (
      <>
        {embeddedPageHeader}
        {chatPanel}
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open chat"
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "none",
          background: "#111",
          color: "#fff",
          fontSize: 22,
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          zIndex: 99998,
          fontFamily: "inherit",
          transition: "transform 0.15s, background 0.15s",
        }}
      >
        {open ? "\u00d7" : "\u2026"}
      </button>
      {open && chatPanel}
    </>
  );
}
