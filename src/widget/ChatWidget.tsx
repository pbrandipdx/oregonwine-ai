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

const QUICK_REPLIES = [
  "Tasting options & prices",
  "Hours & directions",
  "Wine club info",
  "Can I bring my dog?",
];

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
function TypingDots({ color }: { color: string }) {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "10px 14px" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: color,
            opacity: 0.5,
            animation: `owDotPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes owDotPulse {
          0%, 60%, 100% { opacity: 0.25; transform: scale(0.85); }
          30% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

export function ChatWidget({
  apiKey,
  themeColor,
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
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      role: "assistant",
      text: `Welcome to ${wineryLabel}! I can help with tastings, wines, hours, visiting info, and more. What would you like to know?`,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
      setMessages((m) => [...m, { role: "user", text: trimmed }]);
      setLoading(true);

      const history = messages.slice(1).map((m) => ({ role: m.role, text: m.text }));

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

  // --- Colors ---
  const c = {
    primary: themeColor,
    primaryLight: "#e8ede6",
    userBubble: "#eae4d9",
    assistantBubble: "#f2f0ec",
    bg: "#ffffff",
    border: "#ddd8cf",
    textDark: "#3b3228",
    textMuted: "#7a6e5d",
    error: "#9e4a3a",
    quickReply: "#f5f2ed",
    quickReplyHover: "#ebe7e0",
    escalation: "#e8ede6",
  };

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
        width: embedded ? "100%" : "min(420px, calc(100vw - 48px))",
        height: embedded ? 560 : 520,
        background: c.bg,
        borderRadius: 16,
        boxShadow: embedded
          ? "0 2px 20px rgba(59,50,40,0.08)"
          : "0 16px 48px rgba(59,50,40,0.14)",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${c.border}`,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        overflow: "hidden",
        ...(embedded ? {} : { position: "fixed" as const, bottom: 96, right: 24, zIndex: 99999 }),
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 20px",
          background: c.primary,
          color: "#fff",
          borderRadius: "16px 16px 0 0",
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: "0.01em",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>{"\ud83c\udf3f"}</span>
          {wineryLabel}
        </div>
        <a
          href={`tel:${wineryPhone.replace(/[^+\d]/g, "")}`}
          title={`Call ${wineryLabel}`}
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: 12,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {"\ud83d\udcde"} Call us
        </a>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          fontSize: 14,
          lineHeight: 1.55,
          color: c.textDark,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: m.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "85%",
                padding: "10px 14px",
                borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: m.role === "user" ? c.userBubble : c.assistantBubble,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {m.text}
            </div>

            {/* CTA buttons after assistant messages that mention booking or club */}
            {m.role === "assistant" && m.logId && (
              <div style={{ marginTop: 6, marginLeft: 2, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {/* Contextual action links */}
                {/tasting|experience|reserv|book/i.test(m.text) && (
                  <a
                    href={`${wineryUrl}/experiences/`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "5px 12px",
                      borderRadius: 8,
                      background: c.primaryLight,
                      color: c.primary,
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: "none",
                      border: `1px solid ${c.primary}22`,
                    }}
                  >
                    Book a tasting
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
                      background: c.primaryLight,
                      color: c.primary,
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: "none",
                      border: `1px solid ${c.primary}22`,
                    }}
                  >
                    Explore wine clubs
                  </a>
                )}

                {/* Escalation button on deflected responses */}
                {isDeflected(m.text) && (
                  <a
                    href={`tel:${wineryPhone.replace(/[^+\d]/g, "")}`}
                    style={{
                      display: "inline-block",
                      padding: "5px 12px",
                      borderRadius: 8,
                      background: "#faf5f0",
                      color: c.textDark,
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: "none",
                      border: `1px solid ${c.border}`,
                    }}
                  >
                    {"\ud83d\udcde"} Talk to the team
                  </a>
                )}

                {/* Feedback */}
                <div style={{ display: "flex", gap: 2, marginLeft: "auto" }}>
                  <button
                    type="button"
                    onClick={() => sendFeedback(m.logId!, 1, i)}
                    title="Helpful"
                    style={{
                      background: m.feedback === 1 ? c.primaryLight : "transparent",
                      border: "1px solid transparent",
                      borderRadius: 6,
                      cursor: "pointer",
                      opacity: m.feedback === 1 ? 1 : 0.3,
                      fontSize: 13,
                      padding: "2px 6px",
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!m.feedback) (e.target as HTMLElement).style.opacity = "0.7";
                    }}
                    onMouseLeave={(e) => {
                      if (!m.feedback) (e.target as HTMLElement).style.opacity = "0.3";
                    }}
                  >
                    {"\ud83d\udc4d"}
                  </button>
                  <button
                    type="button"
                    onClick={() => sendFeedback(m.logId!, -1, i)}
                    title="Not helpful"
                    style={{
                      background: m.feedback === -1 ? "#f3e8e6" : "transparent",
                      border: "1px solid transparent",
                      borderRadius: 6,
                      cursor: "pointer",
                      opacity: m.feedback === -1 ? 1 : 0.3,
                      fontSize: 13,
                      padding: "2px 6px",
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!m.feedback) (e.target as HTMLElement).style.opacity = "0.7";
                    }}
                    onMouseLeave={(e) => {
                      if (!m.feedback) (e.target as HTMLElement).style.opacity = "0.3";
                    }}
                  >
                    {"\ud83d\udc4e"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Quick reply suggestions — shown after the initial greeting */}
        {showQuickReplies && messages.length === 1 && !loading && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => sendMessage(q)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 20,
                  border: `1px solid ${c.border}`,
                  background: c.quickReply,
                  color: c.textDark,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.12s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = c.quickReplyHover;
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = c.quickReply;
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Animated typing indicator */}
        {loading && (
          <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 12 }}>
            <div
              style={{
                borderRadius: "14px 14px 14px 4px",
                background: c.assistantBubble,
              }}
            >
              <TypingDots color={c.textMuted} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Error */}
      {error && (
        <div style={{ padding: "0 16px 4px", color: c.error, fontSize: 12 }}>{error}</div>
      )}

      {/* Input */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "12px 16px",
          borderTop: `1px solid ${c.border}`,
          background: "#faf9f7",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask a question..."
          disabled={loading}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 10,
            border: `1px solid ${c.border}`,
            background: "#fff",
            fontSize: 14,
            fontFamily: "inherit",
            color: c.textDark,
            outline: "none",
          }}
        />
        <button
          type="button"
          onClick={send}
          disabled={loading}
          style={{
            padding: "10px 18px",
            borderRadius: 10,
            border: "none",
            background: loading ? c.textMuted : c.primary,
            color: "#fff",
            cursor: loading ? "default" : "pointer",
            fontFamily: "inherit",
            fontWeight: 500,
            fontSize: 14,
            transition: "background 0.15s",
          }}
        >
          Send
        </button>
      </div>
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
          background: themeColor,
          color: "#fff",
          fontSize: 22,
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(59,50,40,0.2)",
          zIndex: 99998,
          fontFamily: "inherit",
          transition: "transform 0.15s",
        }}
      >
        {open ? "\u00d7" : "\ud83c\udf3f"}
      </button>
      {open && chatPanel}
    </>
  );
}
