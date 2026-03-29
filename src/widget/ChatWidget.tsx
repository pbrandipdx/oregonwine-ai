import { useCallback, useId, useRef, useState } from "react";

type Props = {
  apiKey: string;
  themeColor: string;
  apiBase: string;
  wineryLabel: string;
  /** When true, renders as a centered inline chat instead of a floating bubble */
  embedded?: boolean;
};

type Message = {
  role: "user" | "assistant";
  text: string;
  logId?: string;
  feedback?: 1 | -1;
};

/** Strip markdown-style formatting characters so responses read as clean prose */
function cleanMarkdown(raw: string): string {
  let s = raw;
  // Remove headers: ## Heading → Heading
  s = s.replace(/^#{1,4}\s+/gm, "");
  // Remove bold: **text** or __text__
  s = s.replace(/\*\*(.+?)\*\*/g, "$1");
  s = s.replace(/__(.+?)__/g, "$1");
  // Remove italic: *text* or _text_ (but not inside words)
  s = s.replace(/(?<!\w)\*([^*]+?)\*(?!\w)/g, "$1");
  s = s.replace(/(?<!\w)_([^_]+?)_(?!\w)/g, "$1");
  // Remove bullet markers: - item or * item → item
  s = s.replace(/^[\s]*[-*]\s+/gm, "");
  // Remove numbered list markers: 1. item → item
  s = s.replace(/^[\s]*\d+\.\s+/gm, "");
  // Remove inline code backticks
  s = s.replace(/`([^`]+?)`/g, "$1");
  // Remove link markdown: [text](url) → text (url)
  s = s.replace(/\[([^\]]+?)\]\(([^)]+?)\)/g, "$1 ($2)");
  // Remove horizontal rules
  s = s.replace(/^---+$/gm, "");
  // Collapse triple+ newlines to double
  s = s.replace(/\n{3,}/g, "\n\n");
  return s.trim();
}

export function ChatWidget({ apiKey, themeColor, apiBase, wineryLabel, embedded }: Props) {
  const sessionId = useId().replace(/:/g, "");
  const [open, setOpen] = useState(embedded ? true : false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      role: "assistant",
      text: `Welcome to ${wineryLabel}. Ask me anything about our wines, tastings, or the winery.`,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify({ log_id: logId, rating }),
        });
      } catch {
        // silent fail
      }
    },
    [apiBase, apiKey]
  );

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (!apiBase) {
      setError("Missing API configuration.");
      return;
    }
    setInput("");
    setError(null);
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);

    const history = messages
      .slice(1)
      .map((m) => ({ role: m.role, text: m.text }));

    try {
      const res = await fetch(`${apiBase}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          message: text,
          session_id: sessionId,
          history,
        }),
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
        const display = cleanMarkdown(
          full.replace(/\n<!-- log_id:[a-f0-9-]+ -->$/, "")
        );
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", text: display };
          return copy;
        });
      }
      const logMatch = full.match(/<!-- log_id:([a-f0-9-]+) -->/);
      const logId = logMatch?.[1];
      const finalText = cleanMarkdown(
        full.replace(/\n<!-- log_id:[a-f0-9-]+ -->$/, "")
      );
      if (logId) {
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { ...copy[copy.length - 1], logId, text: finalText };
          return copy;
        });
      }
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }, [apiBase, apiKey, input, loading, messages, sessionId]);

  // --- Color palette ---
  const colors = {
    primary: themeColor,
    primaryLight: "#e8ede6",
    userBubble: "#eae4d9",
    assistantBubble: "#f2f0ec",
    bg: "#ffffff",
    border: "#ddd8cf",
    textDark: "#3b3228",
    textMuted: "#7a6e5d",
    error: "#9e4a3a",
  };

  const chatPanel = (
    <div
      style={{
        width: embedded ? "100%" : "min(420px, calc(100vw - 48px))",
        height: embedded ? 520 : 500,
        background: colors.bg,
        borderRadius: 16,
        boxShadow: embedded
          ? "0 2px 20px rgba(59,50,40,0.08)"
          : "0 16px 48px rgba(59,50,40,0.14)",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${colors.border}`,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        overflow: "hidden",
        ...(embedded
          ? {}
          : { position: "fixed" as const, bottom: 96, right: 24, zIndex: 99999 }),
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 20px",
          background: colors.primary,
          color: "#fff",
          borderRadius: "16px 16px 0 0",
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: "0.01em",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 18, lineHeight: 1 }}>{"\ud83c\udf3f"}</span>
        {wineryLabel}
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          fontSize: 14,
          lineHeight: 1.55,
          color: colors.textDark,
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
            {m.role === "assistant" && i > 0 && (
              <span
                style={{
                  fontSize: 11,
                  color: colors.textMuted,
                  marginBottom: 3,
                  marginLeft: 2,
                  fontWeight: 500,
                }}
              >
                {wineryLabel}
              </span>
            )}
            <div
              style={{
                maxWidth: "85%",
                padding: "10px 14px",
                borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: m.role === "user" ? colors.userBubble : colors.assistantBubble,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {m.text}
            </div>
            {/* Feedback */}
            {m.role === "assistant" && m.logId && (
              <div style={{ marginTop: 4, marginLeft: 2, display: "flex", gap: 2 }}>
                <button
                  type="button"
                  onClick={() => sendFeedback(m.logId!, 1, i)}
                  title="Helpful"
                  style={{
                    background: m.feedback === 1 ? colors.primaryLight : "transparent",
                    border: "1px solid transparent",
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
                  {"\ud83d\udc4e"}
                </button>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 12 }}>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "14px 14px 14px 4px",
                background: colors.assistantBubble,
                color: colors.textMuted,
                fontSize: 13,
              }}
            >
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Error */}
      {error && (
        <div style={{ padding: "0 16px 4px", color: colors.error, fontSize: 12 }}>{error}</div>
      )}

      {/* Input */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "12px 16px",
          borderTop: `1px solid ${colors.border}`,
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
            border: `1px solid ${colors.border}`,
            background: "#fff",
            fontSize: 14,
            fontFamily: "inherit",
            color: colors.textDark,
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
            background: loading ? colors.textMuted : colors.primary,
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

  // Embedded mode: render inline, no floating bubble
  if (embedded) {
    return chatPanel;
  }

  // Floating mode: bubble + panel
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
