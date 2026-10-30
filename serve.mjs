// Tiny static file server for previewing ./dist locally. Run: node serve.mjs  (PORT=4173 by default)
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "dist");
const port = Number(process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};

async function resolveFile(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const full = path.join(root, clean);
  if (!full.startsWith(root)) return null;
  try {
    const s = await stat(full);
    if (s.isDirectory()) {
      const idx = path.join(full, "index.html");
      await stat(idx);
      return idx;
    }
    return full;
  } catch {
    return null;
  }
}

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    const file = await resolveFile(url.pathname);
    if (file) {
      const body = await readFile(file);
      res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
      return res.end(body);
    }
    const nf = await readFile(path.join(root, "404.html")).catch(() => Buffer.from("Not found"));
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(nf);
  })
  .listen(port, () => console.log(`Serving ./dist at http://localhost:${port}`));
