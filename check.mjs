// Static checks on the built site: internal links, anchors, headings, alt text, duplicate ids.
// Run after building:  node check.mjs
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), "dist");

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const exists = async (p) => stat(p).then(() => true, () => false);
async function targetFile(urlPath) {
  const clean = decodeURIComponent(urlPath).replace(/\/+$/, "") || "/";
  const direct = path.join(dist, clean);
  if (await exists(direct) && !(await stat(direct)).isDirectory()) return direct;
  const idx = path.join(direct, "index.html");
  return (await exists(idx)) ? idx : null;
}

const htmlFiles = (await walk(dist)).filter((f) => f.endsWith(".html"));
const idsByFile = new Map();
const htmlByFile = new Map();
for (const f of htmlFiles) {
  const html = await readFile(f, "utf8");
  htmlByFile.set(f, html);
  idsByFile.set(f, [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
}

const errors = [];
let linkCount = 0;

for (const f of htmlFiles) {
  const rel = path.relative(dist, f);
  const html = htmlByFile.get(f);

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (rel !== "404.html" && h1 !== 1) errors.push(`${rel}: expected 1 <h1>, found ${h1}`);
  if (rel === "404.html" && h1 !== 1) errors.push(`${rel}: expected 1 <h1>, found ${h1}`);

  const ids = idsByFile.get(f);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) errors.push(`${rel}: duplicate ids: ${[...new Set(dup)].join(", ")}`);

  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) errors.push(`${rel}: <img> without alt: ${m[0].slice(0, 80)}`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${rel}: missing <title>`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${rel}: missing meta description`);

  for (const m of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
    const url = m[1];
    if (!url || /^(https?:|mailto:|tel:|data:|javascript:)/.test(url)) continue;
    linkCount++;
    const [beforeHash, hash] = url.split("#");
    const [pathPart] = beforeHash.split("?");
    let file = f;
    if (pathPart) {
      if (!pathPart.startsWith("/")) { errors.push(`${rel}: relative URL not allowed: ${url}`); continue; }
      file = await targetFile(pathPart);
      if (!file) { errors.push(`${rel}: broken link ${url}`); continue; }
    }
    if (hash && file.endsWith(".html")) {
      const tIds = idsByFile.get(file) || [];
      if (!tIds.includes(hash)) errors.push(`${rel}: missing anchor #${hash} in ${path.relative(dist, file)} (from ${url})`);
    }
  }

  // aria-controls / aria-describedby / for must point at real ids
  for (const m of html.matchAll(/\s(?:aria-controls|for)="([^"]+)"/g)) if (!ids.includes(m[1])) errors.push(`${rel}: reference to missing id "${m[1]}"`);
  for (const m of html.matchAll(/\saria-describedby="([^"]+)"/g)) for (const id of m[1].split(/\s+/)) if (!ids.includes(id)) errors.push(`${rel}: aria-describedby missing id "${id}"`);
}

const required = ["/", "/about", "/ventures", "/ventures/shree-matha-enterprises", "/ventures/pixelvows", "/ventures/kannada-business-adda", "/ventures/rj-creativity", "/ventures/insurance-advisory", "/services", "/work", "/contact"];
for (const r of required) if (!(await targetFile(r))) errors.push(`Missing required route ${r}`);

console.log(`Checked ${htmlFiles.length} HTML files and ${linkCount} internal links/assets.`);
if (errors.length) {
  console.error("\nProblems:\n - " + [...new Set(errors)].join("\n - "));
  process.exit(1);
}
console.log("All checks passed.");
