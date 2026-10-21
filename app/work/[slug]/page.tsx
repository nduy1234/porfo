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
  const linkCls = "font-medium text-accent underline underline-offset-4";

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/#work" className="text-sm text-muted hover:text-fg">
        ← All work
      </Link>
      <header className="mt-6 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">{p.context}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{p.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{p.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
          {p.stack.map((t) => (
            <li key={t} className="rounded border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <a href={p.code} className={linkCls}>
            Code on GitHub
          </a>
          {p.demo && (
            <a href={p.demo.href} className={linkCls}>
              {p.demo.label}
            </a>
          )}
        </div>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_200px]">
        <div className="prose min-w-0 max-w-3xl">
          {content}
          <h2 id="links">Links</h2>
          <ul>
            <li>
              Repository: <a href={p.code}>{p.code.replace("https://", "")}</a>
            </li>
            <li>
              Demo:{" "}
              {p.demo ? (
                <a href={p.demo.href}>{p.demo.label}</a>
              ) : (
                <span className="todo">TODO: no public demo yet. Add a video or deployed URL in content/projects.ts</span>
              )}
            </li>
          </ul>
        </div>
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-20 text-sm">
            <p className="font-medium">On this page</p>
            <ul className="mt-3 space-y-2 border-l border-border pl-3 text-muted">
              {[...headings, { id: "links", text: "Links" }].map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="hover:text-fg">
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <footer className="mt-16 border-t border-border pt-8">
        <Link href={`/work/${next.slug}`} className="group block">
          <span className="text-sm text-muted">Next case study</span>
          <span className="mt-1 block text-xl font-semibold group-hover:text-accent">{next.title} →</span>
        </Link>
      </footer>
    </article>
  );
}
