"use client";

import { useEffect, useId, useRef, useState } from "react";

// Mermaid is loaded from a CDN only when a diagram scrolls into view,
// so it never lands in the site's JS bundle.
const MERMAID_URL = "https://cdn.jsdelivr.net/npm/mermaid@11.12.0/dist/mermaid.esm.min.mjs";
const load = new Function("u", "return import(u)") as (u: string) => Promise<{ default: MermaidApi }>;

type MermaidApi = {
  initialize: (c: Record<string, unknown>) => void;
  render: (id: string, text: string) => Promise<{ svg: string }>;
};

export default function Mermaid({ chart, alt }: { chart: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = "m" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let api: MermaidApi | null = null;

    async function draw() {
      api ??= (await load(MERMAID_URL)).default;
      const dark = document.documentElement.dataset.theme === "dark";
      api.initialize({ startOnLoad: false, theme: dark ? "dark" : "neutral", securityLevel: "strict", fontFamily: "inherit" });
      const out = await api.render(`${id}-${dark ? "d" : "l"}-${Date.now()}`, chart);
      if (!cancelled) setSvg(out.svg);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          draw().catch(() => {});
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);

    const mo = new MutationObserver(() => {
      if (api) draw().catch(() => {});
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelled = true;
      io.disconnect();
      mo.disconnect();
    };
  }, [chart, id]);

  return (
    <figure className="not-prose my-8 rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div ref={ref} role="img" aria-label={alt} className="mermaid-box min-h-40">
        {svg ? (
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <pre className="overflow-x-auto text-xs text-muted">{chart}</pre>
        )}
      </div>
      <figcaption className="mt-3 text-sm text-muted">{alt}</figcaption>
    </figure>
  );
}
