import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";

const pill = "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-all";

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
      {items.map((t) => (
        <li key={t} className="rounded-full border border-border bg-bg/60 px-2 py-0.5 font-mono text-[11px] text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Links({ p }: { p: Project }) {
  const isVideo = p.demo?.label.toLowerCase().includes("watch");
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Link
        href={`/work/${p.slug}`}
        className={`${pill} group/l bg-fg text-bg hover:opacity-85`}
        aria-label={`${p.title} case study`}
      >
        Case study
        <span aria-hidden="true" className="transition-transform group-hover/l:translate-x-0.5">
          →
        </span>
      </Link>
      {p.demo && (
        <a
          href={p.demo.href}
          className={`${pill} border border-fg/20 bg-bg/70 text-fg hover:border-fg/50`}
          aria-label={`${p.title}: ${p.demo.label}`}
        >
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            {isVideo ? <path d="M8 5v14l11-7z" /> : <path d="M4 4h16v12H4zM8 20h8v-2H8z" />}
          </svg>
          {p.demo.label}
        </a>
      )}
      <a
        href={p.code}
        className={`${pill} border border-fg/20 bg-bg/70 text-fg hover:border-fg/50`}
        aria-label={`${p.title} source code on GitHub`}
      >
        <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
        </svg>
        Code
      </a>
    </div>
  );
}

export default function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [kind, when] = p.context.split(" · ");
  return (
    <article
      id={p.slug}
      style={{ "--tint": p.tint } as CSSProperties}
      className="navy group relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--tint)_35%,var(--border))] p-6 shadow-[0_10px_30px_-18px_rgba(15,27,51,0.6)] transition-all hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--tint)_70%,var(--border))] hover:shadow-[0_16px_44px_-16px_color-mix(in_srgb,var(--tint)_50%,transparent)] sm:p-8"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[var(--tint)] opacity-80" />
      <p className="flex items-baseline justify-between gap-4 font-mono text-xs text-faint">
        <span>{kind}</span>
        {when && <span className="shrink-0">{when}</span>}
      </p>
      <h3 className="mt-4 flex items-baseline gap-3 font-serif text-3xl tracking-tight sm:text-[2.25rem]">
        <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
        <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {p.title}
        </Link>
      </h3>
      <p className="mt-3 leading-relaxed text-muted">{p.problem}</p>
      {p.highlights && (
        <ul className="mt-5 space-y-2 text-[15px]">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span aria-hidden="true" className="mt-[9px] h-1 w-3 shrink-0 rounded-full bg-[var(--tint)]" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="relative z-10 mt-6 space-y-5">
        <Tags items={p.stack} />
        <Links p={p} />
      </div>
    </article>
  );
}
