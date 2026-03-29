import { useCallback, useId, useRef, useState } from "react";

type Props = {
  apiKey: string;
  themeColor: string;
  apiBase: string;
  wineryLabel: string;
};

export function ChatWidget({ apiKey, themeColor, apiBase, wineryLabel }: Props) {
  const sessionId = useId().replace(/:/g, "");
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>(
    () => [
      {
        role: "assistant",
        text: `Hi! Ask me anything about ${wineryLabel} or Oregon wine.`,
      },
    ]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (!apiBase) {
      setError("Missing data-api-base or VITE_SUPABASE_FUNCTIONS_URL.");
      return;
    }
    setInput("");
    setError(null);
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ message: text, session_id: sessionId }),
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
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", text: full };
          return copy;
        });
      }
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }, [apiBase, apiKey, input, loading, sessionId]);

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
          boxShadow: "0 8px 24px rgba(45,31,46,0.25)",
          zIndex: 99998,
        }}
      >
        {open ? "×" : "💬"}
      </button>
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 96,
            right: 24,
            width: "min(400px, calc(100vw - 48px))",
            height: 480,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 16px 48px rgba(45,31,46,0.18)",
            display: "flex",
            flexDirection: "column",
            zIndex: 99999,
            border: "1px solid rgba(114,47,55,0.12)",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              background: themeColor,
              color: "#fff",
              borderRadius: "16px 16px 0 0",
              fontWeight: 600,
            }}
          >
            OregonWine.ai
          </div>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 12,
              fontSize: 14,
              lineHeight: 1.45,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 10,
                  textAlign: m.role === "user" ? "right" : "left",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    maxWidth: "90%",
                    padding: "8px 12px",
                    borderRadius: 12,
                    background: m.role === "user" ? "#f0e4ef" : "#f5f0eb",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.text}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          {error && (
            <div style={{ padding: "0 12px", color: "#b00020", fontSize: 12 }}>{error}</div>
          )}
          <div style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid #eee" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask a question…"
              disabled={loading}
              style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd" }}
            />
            <button
              type="button"
              onClick={send}
              disabled={loading}
              style={{
                padding: "10px 16px",
                borderRadius: 10,
                border: "none",
                background: themeColor,
                color: "#fff",
                cursor: loading ? "wait" : "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
