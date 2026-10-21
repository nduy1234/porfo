// Link checker for the static export. Run after `npm run build`.
// Checks every internal href/src (file + #anchor exists) and every external URL (HTTP status).
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("out");
const files = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (p.endsWith(".html")) files.push(p);
  }
}
await walk(OUT);

const pages = new Map();
for (const f of files) {
  const html = await readFile(f, "utf8");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  pages.set(f, { html, ids });
}

function resolveInternal(url) {
  const clean = decodeURIComponent(url.split(/[?#]/)[0]);
  const base = path.join(OUT, clean);
  return [base, base + ".html", path.join(base, "index.html")];
}
async function exists(p) {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
}

const errors = [];
const external = new Map();
for (const [file, { html }] of pages) {
  const page = "/" + path.relative(OUT, file).replace(/\\/g, "/");
  for (const [, url] of html.matchAll(/(?:href|src|data)="([^"]+)"/g)) {
    if (url.startsWith("mailto:") || url.startsWith("data:")) continue;
    if (/^https?:\/\//.test(url)) {
      if (!url.includes("localhost")) external.set(url, page);
      continue;
    }
    const [p, hash] = url.split("#");
    let target = file;
    if (p) {
      const candidates = resolveInternal(p.startsWith("/") ? p : "/" + p);
      target = null;
      for (const c of candidates) if (await exists(c)) { target = c; break; }
      if (!target) { errors.push(`${page}: missing ${url}`); continue; }
    }
    if (hash && pages.has(target) && !pages.get(target).ids.has(hash)) errors.push(`${page}: missing anchor ${url}`);
  }
}

const skip = [/fonts\.(googleapis|gstatic)/, /_next/];
await Promise.all(
  [...external].filter(([u]) => !skip.some((r) => r.test(u))).map(async ([url, page]) => {
    try {
      let res = await fetch(url, { method: "HEAD", redirect: "follow" });
      if (res.status >= 400) res = await fetch(url, { redirect: "follow" });
      // LinkedIn answers bots with 999; treat as reachable.
      if (res.status >= 400 && res.status !== 999) errors.push(`${page}: ${res.status} ${url}`);
    } catch (e) {
      errors.push(`${page}: ${e.message} ${url}`);
    }
  }),
);

console.log(`Checked ${pages.size} pages, ${external.size} external URLs.`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("No broken links.");
