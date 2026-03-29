import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const base = process.env.VITE_BASE_PATH || "/";

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        widgetTest: path.resolve(__dirname, "widget-test.html"),
      },
    },
  },
});
