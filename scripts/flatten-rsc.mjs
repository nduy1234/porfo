// Next 16 static export writes segment prefetch files as `__next.a/b.txt`,
// but the client router requests `__next.a.b.txt`. Copy each to the flat name
// so prefetches don't 404 on static hosts.
import { copyFile, readdir } from "node:fs/promises";
import path from "node:path";

let copied = 0;

// base: directory that holds the `__next.*` folder; prefix: flattened name so far.
async function walk(dir, base, prefix) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (prefix) await walk(p, base, `${prefix}.${e.name}`);
      else if (e.name.startsWith("__next.")) await walk(p, dir, e.name);
      else await walk(p, null, null);
    } else if (prefix) {
      await copyFile(p, path.join(base, `${prefix}.${e.name}`));
      copied++;
    }
  }
}

await walk(path.resolve("out"), null, null);
console.log(`flatten-rsc: wrote ${copied} prefetch files`);
