// Static site generator. Run:  node build.mjs   (or: npm run build)
// Output goes to ./dist and can be deployed to any static host.

import { mkdir, rm, cp, writeFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { renderPage, domain } from "./src/lib/layout.mjs";
import { ventures } from "./src/data/ventures.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, "dist");

const modules = [
  "./src/pages/home.mjs",
  "./src/pages/about.mjs",
  "./src/pages/ventures.mjs",
  "./src/pages/ventures/shree-matha-enterprises.mjs",
  "./src/pages/ventures/pixelvows.mjs",
  "./src/pages/ventures/kannada-business-adda.mjs",
  "./src/pages/ventures/rj-creativity.mjs",
  "./src/pages/ventures/insurance-advisory.mjs",
  "./src/pages/services.mjs",
  "./src/pages/work.mjs",
  "./src/pages/contact.mjs",
  "./src/pages/notfound.mjs",
];

const pages = [];
for (const m of modules) pages.push((await import(m)).page);

// ---- sanity checks ------------------------------------------------------
const problems = [];
const seenPaths = new Set();
const seenTitles = new Set();
const seenDesc = new Set();
for (const p of pages) {
  if (seenPaths.has(p.path)) problems.push(`Duplicate route: ${p.path}`);
  seenPaths.add(p.path);
  if (seenTitles.has(p.title)) problems.push(`Duplicate title: ${p.title}`);
  seenTitles.add(p.title);
  if (seenDesc.has(p.description)) problems.push(`Duplicate description on ${p.path}`);
  seenDesc.add(p.description);
  if (p.description.length > 200) problems.push(`Description long (${p.description.length}) on ${p.path}`);
}
for (const v of ventures) if (!seenPaths.has(v.path)) problems.push(`Venture page missing for ${v.path}`);
if (problems.length) {
  console.error("Build problems:\n - " + problems.join("\n - "));
  process.exit(1);
}

// ---- output -------------------------------------------------------------
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(path.join(root, "src/assets"), path.join(dist, "assets"), { recursive: true });
if (existsSync(path.join(root, "public"))) {
  for (const f of await readdir(path.join(root, "public"))) {
    await cp(path.join(root, "public", f), path.join(dist, f), { recursive: true });
  }
}

for (const p of pages) {
  const html = renderPage(p);
  const out = p.file ? path.join(dist, p.file) : p.path === "/" ? path.join(dist, "index.html") : path.join(dist, p.path, "index.html");
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
}

// robots.txt and sitemap.xml (sitemap needs a real domain, so it is skipped until one is configured)
const indexable = pages.filter((p) => !p.noindex);
const robots = ["User-agent: *", "Allow: /", ...(domain ? [`Sitemap: ${domain}/sitemap.xml`] : [])].join("\n") + "\n";
await writeFile(path.join(dist, "robots.txt"), robots);

if (domain) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = indexable
    .map((p) => `  <url><loc>${domain}${p.path === "/" ? "/" : p.path}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n");
  await writeFile(
    path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
}

console.log(`Built ${pages.length} pages to ./dist`);
for (const p of pages) console.log(`  ${p.path}`);
if (!domain) {
  console.warn(
    "\nNote: no domain configured, so canonical URLs, Open Graph URLs/images and sitemap.xml were skipped.\n" +
      "Set `domain` in src/site.config.mjs (or SITE_DOMAIN=https://yourdomain.in) and rebuild before launch."
  );
}
