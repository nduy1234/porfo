import Link from "next/link";
import type { Project } from "@/content/projects";

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
      {items.map((t) => (
        <li key={t} className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Links({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      <Link
        href={`/work/${p.slug}`}
        className="group/l inline-flex items-center gap-1 font-medium text-accent"
        aria-label={`${p.title} case study`}
      >
        Case study
        <span aria-hidden="true" className="transition-transform group-hover/l:translate-x-0.5">
          →
        </span>
      </Link>
      {p.demo && (
        <a href={p.demo.href} className="text-muted underline-offset-4 hover:text-fg hover:underline" aria-label={`${p.title}: ${p.demo.label}`}>
          {p.demo.label}
        </a>
      )}
      <a href={p.code} className="text-muted underline-offset-4 hover:text-fg hover:underline" aria-label={`${p.title} source code on GitHub`}>
        Code
      </a>
    </div>
  );
}

function Meta({ p }: { p: Project }) {
  const [kind, when] = p.context.split(" · ");
  return (
    <p className="flex items-baseline justify-between gap-4 font-mono text-xs text-faint">
      <span>{kind}</span>
      {when && <span className="shrink-0">{when}</span>}
    </p>
  );
}

export default function ProjectCard({ p, index }: { p: Project; index?: number }) {
  if (p.featured) {
    return (
      <article className="group relative rounded-2xl border border-border bg-card/70 p-6 transition-colors hover:border-accent/50 sm:p-7">
        <Meta p={p} />
        <h3 className="mt-4 flex items-baseline gap-3 font-serif text-3xl tracking-tight sm:text-[2.1rem]">
          {index !== undefined && <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>}
          <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {p.title}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{p.problem}</p>
        {p.highlights && (
          <ul className="mt-5 space-y-2 text-[15px]">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden="true" className="mt-[9px] h-1 w-3 shrink-0 rounded-full bg-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="relative z-10 mt-6 space-y-4">
          <Tags items={p.stack} />
          <Links p={p} />
        </div>
      </article>
    );
  }
  return (
    <article className="group relative flex flex-col rounded-2xl border border-border bg-card/50 p-5 transition-colors hover:border-accent/50">
      <Meta p={p} />
      <h3 className="mt-3 font-serif text-2xl tracking-tight">
        <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {p.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{p.problem}</p>
      <div className="relative z-10 mt-auto pt-5">
        <Links p={p} />
      </div>
    </article>
  );
}
