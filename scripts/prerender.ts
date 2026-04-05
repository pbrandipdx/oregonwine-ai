/**
 * Prerender Script for SEO
 *
 * Generates static HTML snapshots for key SEO pages.
 * Run AFTER `npm run build` to create crawlable HTML for each route.
 *
 * Usage:
 *   npm run build
 *   npx tsx scripts/prerender.ts
 *
 * Prerequisites:
 *   npm install --save-dev puppeteer
 *
 * This script:
 * 1. Starts a local server serving the built dist/ folder
 * 2. Uses Puppeteer to render each route
 * 3. Saves the rendered HTML as static files in dist/
 * 4. Google can then crawl the static HTML without needing JS
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

// Routes to prerender (public-facing pages with SEO value)
const ROUTES = [
  "/",
  "/how-it-works",
  "/book-demo",
  "/chatbot-demo",
  "/agent-demo",
  "/winery",
  "/blind-tasting",
  "/match-me",
  "/plan-visit",
  "/compare",
  "/featured-winery",
  "/winery-info",
  "/rex-hill",
  "/rex-hill/demo",
  "/rex-hill/research",
  "/rex-hill/blind-tasting",
  "/rex-hill/match-me",
  "/ponzi",
  "/ponzi/demo",
  "/ponzi/research",
  "/ponzi/blind-tasting",
  "/ponzi/match-me",
  "/crowley",
  "/crowley/demo",
  "/crowley/research",
  "/crowley/blind-tasting",
  "/crowley/match-me",
  "/chehalem",
  "/chehalem/research",
  "/soter",
  "/soter/research",
];

async function prerender() {
  const distDir = path.resolve(process.cwd(), "dist");

  if (!existsSync(distDir)) {
    console.error("dist/ not found. Run `npm run build` first.");
    process.exit(1);
  }

  let puppeteer: typeof import("puppeteer");
  try {
    puppeteer = await import("puppeteer");
  } catch {
    console.error("Puppeteer not installed. Run: npm install --save-dev puppeteer");
    console.log("\nFalling back to static HTML injection...\n");
    // Fallback: copy index.html to each route directory
    // This ensures each route has an index.html that Google can find
    const indexHtml = readFileSync(path.join(distDir, "index.html"), "utf-8");
    for (const route of ROUTES) {
      if (route === "/") continue;
      const dir = path.join(distDir, route);
      mkdirSync(dir, { recursive: true });
      const outPath = path.join(dir, "index.html");
      if (!existsSync(outPath)) {
        writeFileSync(outPath, indexHtml);
        console.log(`  Created ${route}/index.html (fallback copy)`);
      }
    }
    console.log("\nDone! Each route now has an index.html with crawlable fallback content.");
    return;
  }

  // Full Puppeteer prerendering
  console.log("Starting prerender with Puppeteer...\n");

  // Start a local server
  const { createServer } = await import("node:http");
  const { readFile } = await import("node:fs/promises");

  const server = createServer(async (req, res) => {
    const url = req.url || "/";
    let filePath = path.join(distDir, url === "/" ? "index.html" : url);

    if (!existsSync(filePath) || !filePath.includes(".")) {
      filePath = path.join(distDir, "index.html");
    }

    try {
      const content = await readFile(filePath);
      const ext = path.extname(filePath);
      const mimeTypes: Record<string, string> = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".svg": "image/svg+xml",
      };
      res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  await new Promise<void>((resolve) => server.listen(4173, resolve));
  console.log("Server running on http://localhost:4173\n");

  const browser = await puppeteer.launch({ headless: true });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.goto(`http://localhost:4173${route}`, { waitUntil: "networkidle0", timeout: 15000 });

    // Remove the SEO fallback div (React will have replaced it)
    await page.evaluate(() => {
      const fallback = document.getElementById("seo-fallback");
      if (fallback) fallback.remove();
    });

    const html = await page.content();

    const dir = route === "/" ? distDir : path.join(distDir, route);
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, "index.html"), html);
    console.log(`  Prerendered: ${route}`);

    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\nDone! Prerendered ${ROUTES.length} pages.`);
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
