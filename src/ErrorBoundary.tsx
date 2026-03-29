import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            padding: "2rem",
            fontFamily: "system-ui, sans-serif",
            maxWidth: 560,
            margin: "2rem auto",
          }}
        >
          <h1 style={{ color: "#b00020" }}>Something broke</h1>
          <p style={{ color: "#333" }}>{this.state.error.message}</p>
          <p style={{ color: "#666", fontSize: 14 }}>
            Open the browser developer console (⌥⌘J / F12) for the full stack trace. If you opened an{" "}
            <code>.html</code> file directly from disk, use{" "}
            <code>
              npm run dev
            </code>{" "}
            and visit <code>http://localhost:5173</code> instead.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
