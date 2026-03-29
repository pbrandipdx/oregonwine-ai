import { useCallback, useEffect, useId, useRef, useState } from "react";

type Props = {
  apiKey: string;
  themeColor: string;
  apiBase: string;
  wineryLabel: string;
  /** When true, renders as a centered inline chat instead of a floating bubble */
  embedded?: boolean;
  /** Winery website for booking/info links */
  wineryUrl?: string;
  /** Winery phone number for escalation */
  wineryPhone?: string;
};

type Message = {
  role: "user" | "assistant";
  text: string;
  logId?: string;
  feedback?: 1 | -1;
};

const QUICK_REPLY_ICONS: Record<string, JSX.Element> = {
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
};

const QUICK_REPLIES = [
  "Tasting options",
  "Hours & directions",
  "Wine club info",
  "Food pairings",
];

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
      {QUICK_REPLIES.map((q) => (
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

/** Strip markdown-style formatting so responses read as clean prose */
function cleanMarkdown(raw: string): string {
  let s = raw;
  s = s.replace(/^#{1,4}\s+/gm, "");
  s = s.replace(/\*\*(.+?)\*\*/g, "$1");
  s = s.replace(/__(.+?)__/g, "$1");
  s = s.replace(/(?<!\w)\*([^*]+?)\*(?!\w)/g, "$1");
  s = s.replace(/(?<!\w)_([^_]+?)_(?!\w)/g, "$1");
  s = s.replace(/^[\s]*[-*]\s+/gm, "");
  s = s.replace(/^[\s]*\d+\.\s+/gm, "");
  s = s.replace(/`([^`]+?)`/g, "$1");
  s = s.replace(/\[([^\]]+?)\]\(([^)]+?)\)/g, "$1 ($2)");
  s = s.replace(/^---+$/gm, "");
  s = s.replace(/\n{3,}/g, "\n\n");
  return s.trim();
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

export function ChatWidget({
  apiKey,
  themeColor: _themeColor,
  apiBase,
  wineryLabel,
  embedded,
  wineryUrl = "https://rexhill.com",
  wineryPhone = "(503) 538-0666",
}: Props) {
  const sessionId = useId().replace(/:/g, "");
  const [open, setOpen] = useState(embedded ? true : false);
  const [input, setInput] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
        await fetch(`${apiBase}/feedback`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": apiKey },
          body: JSON.stringify({ log_id: logId, rating }),
        });
      } catch {
        // silent
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
      setShowQuickReplies(false);
      setShowLanding(false);

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      setMessages((m) => [...m, { role: "user", text: trimmed }]);
      setLoading(true);

      const history = messages.map((m) => ({ role: m.role, text: m.text }));

      try {
        const res = await fetch(`${apiBase}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": apiKey },
          body: JSON.stringify({ message: trimmed, session_id: sessionId, history }),
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
          const display = cleanMarkdown(full.replace(/\n<!-- log_id:[a-f0-9-]+ -->$/, ""));
          setMessages((m) => {
            const copy = [...m];
            copy[copy.length - 1] = { role: "assistant", text: display };
            return copy;
          });
        }
        const logMatch = full.match(/<!-- log_id:([a-f0-9-]+) -->/);
        const logId = logMatch?.[1];
        const finalText = cleanMarkdown(full.replace(/\n<!-- log_id:[a-f0-9-]+ -->$/, ""));
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
    [apiBase, apiKey, loading, messages, sessionId]
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
        ...(embedded ? {} : { position: "fixed" as const, bottom: 96, right: 24, zIndex: 99999 }),
      }}
    >
      {/* Messages / Landing area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 20px 12px",
          fontSize: 14,
          lineHeight: 1.6,
          color: c.text,
          display: "flex",
          flexDirection: "column",
          ...(showLanding ? { justifyContent: "center", alignItems: "center" } : {}),
        }}
      >
        {/* Landing state */}
        {showLanding && (
          <div style={{ textAlign: "center", maxWidth: "100%" }}>
            <div style={{ color: c.textMuted, fontSize: 13, fontWeight: 500, marginBottom: 16, letterSpacing: "0.03em" }}>
              {wineryLabel} Wine Concierge
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
            {embedded && showQuickReplies && !loading && (
              <QuickReplyChips
                palette={{ border: c.border, surface: c.surface, text: c.text, borderHover: c.borderHover }}
                onPick={sendMessage}
                marginTop={20}
              />
            )}
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
                maxWidth: "85%",
                padding: "12px 16px",
                borderRadius: 16,
                ...(m.role === "user"
                  ? { borderBottomRightRadius: 4, background: c.userBubble, color: c.text }
                  : { borderBottomLeftRadius: 4, background: c.assistantBubble, color: "#d5d5d5", border: `1px solid ${c.border}` }),
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {m.text}
            </div>

            {/* CTA buttons + feedback after assistant messages */}
            {m.role === "assistant" && m.logId && (
              <div style={{ marginTop: 6, marginLeft: 2, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                {/tasting|experience|reserv|book/i.test(m.text) && (
                  <a
                    href={`${wineryUrl}/experiences/`}
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
                    Book a tasting \u2192
                  </a>
                )}
                {/club|member|join|shipment/i.test(m.text) && (
                  <a
                    href={`${wineryUrl}/clubs/`}
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
                    Explore wine clubs \u2192
                  </a>
                )}

                {isDeflected(m.text) && (
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
                    Talk to the team \u2192
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
      <div style={{ padding: "0 16px 16px" }}>
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
          <div style={{ display: "flex", alignItems: "flex-end" }}>
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
                minHeight: 24,
                maxHeight: 120,
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
                marginLeft: 8,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick replies (floating widget only; embedded page renders them with the landing hero) */}
        {showQuickReplies && showLanding && !loading && !embedded && (
          <QuickReplyChips
            palette={{ border: c.border, surface: c.surface, text: c.text, borderHover: c.borderHover }}
            onPick={sendMessage}
            marginTop={14}
          />
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: c.textDim }}>
          Powered by <span style={{ color: c.textMuted }}>OregonWine.ai</span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ padding: "0 20px 12px", color: c.error, fontSize: 12 }}>{error}</div>
      )}
    </div>
  );

  if (embedded) return chatPanel;

  return (
    <>
      <button
        type="button"
        aria-label="Open chat"
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
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
