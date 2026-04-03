import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const base = process.env.VITE_BASE_PATH || "/";

const isWidgetBuild = process.env.BUILD_TARGET === "widget";

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    port: 5173,
    open: true,
  },
  build: isWidgetBuild
    ? {
        lib: {
          entry: path.resolve(__dirname, "src/widget/widget-main.tsx"),
          name: "CrushpadWidget",
          fileName: () => "crushpad-widget.js",
          formats: ["iife"],
        },
        outDir: "dist-widget",
        rollupOptions: {
          output: {
            inlineDynamicImports: true,
          },
        },
      }
    : {
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, "index.html"),
            widgetTest: path.resolve(__dirname, "widget-test.html"),
          },
        },
      },
});
