import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  QUICK_REPLY_LABELS,
  messageForChatApi,
  type QuickReplyLabel,
} from "../lib/quickReplyMessages";
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
};

type Message = {
  role: "user" | "assistant";
  text: string;
  logId?: string;
  feedback?: 1 | -1;
};

const QUICK_REPLY_ICONS: Record<QuickReplyLabel, JSX.Element> = {
  "Tasting options": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  ),
  "Hours & directions": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  "Wine club info": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  "Food pairings": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Recipes: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </svg>
  ),
};

type QuickPalette = { border: string; surface: string; text: string; borderHover: string };

function QuickReplyChips({
  palette: p,
  onPick,
  marginTop,
}: {
  palette: QuickPalette;
  onPick: (text: string) => void;
  marginTop: number;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop }}>
      {QUICK_REPLY_LABELS.map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => onPick(q)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "9px 16px",
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
          {QUICK_REPLY_ICONS[q]}
          {q}
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
}: Props) {
  const embeddedChromeMode: "viewport" | "panel" =
    embedded && embeddedChrome === "panel" ? "panel" : "viewport";
  const fixedViewportTopBar = embedded && embeddedChromeMode === "viewport";

  const sessionId = useId().replace(/:/g, "");
  const [open, setOpen] = useState(embedded ? true : false);
  const [input, setInput] = useState("");
  const [showLanding, setShowLanding] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      setShowLanding(false);

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
          body: JSON.stringify({ message: apiMessage, session_id: sessionId, history }),
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
    [apiBase, apiKey, loading, messages, sessionId, wineryLabel]
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
        fontFamily: "'Crimson Pro', Georgia, 'Times New Roman', serif",
        fontSize: 16,
        fontWeight: 500,
        fontStyle: "italic",
        color: headerTone.agent,
        letterSpacing: "0.02em",
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
        gap: 14,
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
              height: 34,
              width: 34,
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              flexWrap: "wrap",
              columnGap: 12,
              rowGap: 2,
              minWidth: 0,
            }}
          >
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
          </div>
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
                    marginBottom: 14,
                    opacity: 0.85,
                  }}
                />
              )}
              <div style={{ color: c.textMuted, fontSize: 13, fontWeight: 500, marginBottom: 16, letterSpacing: "0.03em" }}>
                {wineryLabel} Wine Agent
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
              <QuickReplyChips palette={quickPalette} onPick={sendMessage} marginTop={48} />
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
          {/* Messages / Landing area */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              padding: "24px 20px 12px",
              fontSize: 14,
              lineHeight: 1.6,
              color: c.text,
              display: "flex",
              flexDirection: "column",
              ...(showLanding && !embedded ? { justifyContent: "center", alignItems: "center" } : {}),
            }}
          >
            {/* Landing state (floating widget) */}
            {showLanding && (
              <div style={{ textAlign: "center", maxWidth: "100%" }}>
                <div style={{ color: c.textMuted, fontSize: 13, fontWeight: 500, marginBottom: 16, letterSpacing: "0.03em" }}>
                  {wineryLabel} Wine Agent
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
                maxWidth: "90%",
                padding: "12px 16px",
                borderRadius: 16,
                ...(m.role === "user"
                  ? { borderBottomRightRadius: 4, background: c.userBubble, color: c.text }
                  : { borderBottomLeftRadius: 4, background: c.assistantBubble, color: "#d5d5d5", border: `1px solid ${c.border}` }),
                whiteSpace: m.role === "user" ? "pre-wrap" : "normal",
                wordBreak: "break-word",
              }}
            >
              {m.role === "user" ? (
                m.text
              ) : (
                <AssistantMarkdown
                  text={m.text}
                  accentColor={c.accent}
                  headingColor={c.text}
                  textColor="#d5d5d5"
                />
              )}
            </div>

            {/* CTA buttons + feedback after assistant messages */}
            {m.role === "assistant" && m.logId && (
              <div style={{ marginTop: 6, marginLeft: 2, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
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

                <div style={{ display: "flex", gap: 2, marginLeft: "auto" }}>
                  <button
                    type="button"
                    onClick={() => sendFeedback(m.logId!, 1, i)}
                    title="Helpful"
                    style={{
                      background: m.feedback === 1 ? c.surface : "transparent",
                      border: `1px solid ${m.feedback === 1 ? c.border : "transparent"}`,
                      borderRadius: 6,
                      cursor: "pointer",
                      opacity: m.feedback === 1 ? 1 : 0.35,
                      fontSize: 13,
                      padding: "2px 6px",
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!m.feedback) (e.target as HTMLElement).style.opacity = "0.7";
                    }}
                    onMouseLeave={(e) => {
                      if (!m.feedback) (e.target as HTMLElement).style.opacity = "0.35";
                    }}
                  >
                    {"\u25b2"}
                  </button>
                  <button
                    type="button"
                    onClick={() => sendFeedback(m.logId!, -1, i)}
                    title="Not helpful"
                    style={{
                      background: m.feedback === -1 ? c.surface : "transparent",
                      border: `1px solid ${m.feedback === -1 ? c.border : "transparent"}`,
                      borderRadius: 6,
                      cursor: "pointer",
                      opacity: m.feedback === -1 ? 1 : 0.35,
                      fontSize: 13,
                      padding: "2px 6px",
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!m.feedback) (e.target as HTMLElement).style.opacity = "0.7";
                    }}
                    onMouseLeave={(e) => {
                      if (!m.feedback) (e.target as HTMLElement).style.opacity = "0.35";
                    }}
                  >
                    {"\u25bc"}
                  </button>
                </div>
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

      {/* Input area */}
      <div style={{ padding: "0 16px 16px", flex: "0 0 auto" }}>
        {/* Quick replies: stay visible under the thread after answers */}
        {!showLanding && !loading && (
          <div style={{ marginBottom: 12 }}>
            <QuickReplyChips palette={quickPalette} onPick={sendMessage} marginTop={0} />
          </div>
        )}

        {inputCardEl}

        {/* Quick replies (floating widget landing only — embedded landing uses column above) */}
        {showLanding && !loading && !embedded && (
          <QuickReplyChips palette={quickPalette} onPick={sendMessage} marginTop={14} />
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: c.textDim }}>
          Powered by <span style={{ color: c.textMuted }}>Crushpad.ai</span>
        </div>
      </div>
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
