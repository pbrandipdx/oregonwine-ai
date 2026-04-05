import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "./ErrorBoundary";
import "./index.css";

/* Hide the crawlable fallback content once React hydrates */
const fallback = document.getElementById("seo-fallback");
if (fallback) fallback.style.display = "none";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error('Missing #root — check index.html');
}

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
