import Link from "next/link";
import type { Project } from "@/content/projects";

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
      {items.map((t) => (
        <li key={t} className="rounded border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Links({ p }: { p: Project }) {
  const cls = "font-medium text-accent underline-offset-4 hover:underline";
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
      <Link href={`/work/${p.slug}`} className={cls} aria-label={`${p.title} case study`}>
        Case study →
      </Link>
      {p.demo && (
        <a href={p.demo.href} className={cls} aria-label={`${p.title}: ${p.demo.label}`}>
          {p.demo.label}
        </a>
      )}
      <a href={p.code} className={cls} aria-label={`${p.title} source code on GitHub`}>
        Code
      </a>
    </div>
  );
}

export default function ProjectCard({ p }: { p: Project }) {
  if (p.featured) {
    return (
      <article className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">{p.context}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">
            <Link href={`/work/${p.slug}`} className="hover:text-accent">
              {p.title}
            </Link>
          </h3>
          <p className="mt-2 text-muted">{p.problem}</p>
        </div>
        {p.highlights && (
          <ul className="space-y-1.5 text-sm">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto space-y-4">
          <Tags items={p.stack} />
          <Links p={p} />
        </div>
      </article>
    );
  }
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border p-5">
      <p className="font-mono text-xs uppercase tracking-wider text-muted">{p.context}</p>
      <h3 className="text-lg font-semibold tracking-tight">
        <Link href={`/work/${p.slug}`} className="hover:text-accent">
          {p.title}
        </Link>
      </h3>
      <p className="text-sm text-muted">{p.problem}</p>
      <div className="mt-auto space-y-3 pt-1">
        <Tags items={p.stack} />
        <Links p={p} />
      </div>
    </article>
  );
}
