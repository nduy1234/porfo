import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { renderCaseStudy } from "@/lib/mdx";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title} case study`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.title} case study`, description: p.summary, url: `/work/${p.slug}`, type: "article" },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const { content, headings } = await renderCaseStudy(slug);
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const [kind, when] = p.context.split(" · ");

  return (
    <article className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link href="/#work" className="font-mono text-xs text-faint transition-colors hover:text-fg">
          ← All work
        </Link>
        <header className="rise mt-8">
          <p className="font-mono text-xs text-faint">
            <span className="text-accent">Case study</span> / {kind}
          </p>
          <h1 className="mt-3 font-serif text-6xl leading-[0.95] tracking-tight sm:text-7xl">{p.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">{p.summary}</p>

          <dl className="mt-10 grid gap-6 border-y border-border py-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-mono text-xs text-faint">When</dt>
              <dd className="mt-1">{when ?? kind}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-faint">Stack</dt>
              <dd className="mt-1 text-muted">{p.stack.join(", ")}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-faint">Links</dt>
              <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                {p.demo && (
                  <a href={p.demo.href} className="font-medium text-accent underline underline-offset-4">
                    {p.demo.label}
                  </a>
                )}
                <a href={p.code} className="font-medium text-accent underline underline-offset-4">
                  Code
                </a>
              </dd>
            </div>
          </dl>
        </header>
      </div>

      <div className="mt-6 grid gap-12 xl:grid-cols-[1fr_minmax(0,48rem)_1fr]">
        <nav aria-label="On this page" className="hidden xl:block">
          <div className="sticky top-24 ml-auto max-w-[12rem] text-sm">
            <p className="font-mono text-xs text-faint">On this page</p>
            <ul className="mt-3 space-y-2 border-l border-border pl-3 text-muted">
              {[...headings, { id: "links", text: "Links" }].map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="transition-colors hover:text-fg">
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="prose mx-auto w-full min-w-0 max-w-3xl">
          {content}
          <h2 id="links">Links</h2>
          <ul>
            <li>
              Repository: <a href={p.code}>{p.code.replace("https://", "")}</a>
            </li>
            {p.demo && (
              <li>
                Demo: <a href={p.demo.href}>{p.demo.label}</a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <footer className="mx-auto mt-20 max-w-3xl">
        <Link href={`/work/${next.slug}`} className="group block rounded-2xl border border-border bg-card/70 p-6 transition-colors hover:border-accent/50 sm:p-8">
          <span className="font-mono text-xs text-faint">Next case study</span>
          <span className="mt-2 flex items-baseline justify-between gap-4">
            <span className="font-serif text-4xl tracking-tight">{next.title}</span>
            <span aria-hidden="true" className="text-2xl text-accent transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
          <span className="mt-2 block text-muted">{next.problem}</span>
        </Link>
      </footer>
    </article>
  );
}
