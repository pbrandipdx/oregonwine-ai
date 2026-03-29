import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/widget/widget-main.tsx"),
      name: "OregonWineWidget",
      formats: ["iife"],
      fileName: () => "widget.js",
    },
    outDir: "dist-widget",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
