import { readFile } from "node:fs/promises";
import path from "node:path";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import { isValidElement, type ReactNode } from "react";
import Mermaid from "@/components/mermaid";
import YouTube from "@/components/youtube";

function slugify(children: ReactNode): string {
  const text = Array.isArray(children) ? children.join("") : String(children ?? "");
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ```mermaid fences become rendered diagrams. The first "%% alt: ..." line is the accessible description.
function Pre(props: { children?: ReactNode }) {
  const child = props.children;
  if (isValidElement<{ className?: string; children?: string }>(child) && child.props.className === "language-mermaid") {
    const src = String(child.props.children ?? "").trim();
    const alt = src.match(/^%%\s*alt:\s*(.+)$/m)?.[1] ?? "Architecture diagram";
    return <Mermaid chart={src} alt={alt} />;
  }
  return <pre {...props} />;
}

function Shot({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={width} height={height} loading="lazy" className="h-auto w-full rounded-2xl border border-border" />
      <figcaption className="mt-2 text-sm text-muted">{alt}</figcaption>
    </figure>
  );
}

function Video({ src, title }: { src: string; title: string }) {
  return (
    <figure className="my-8">
      <video controls preload="metadata" className="aspect-video w-full rounded-2xl border border-border bg-black" aria-label={title}>
        <source src={src} type="video/mp4" />
      </video>
      <figcaption className="mt-2 text-sm text-muted">{title}</figcaption>
    </figure>
  );
}

function Demo({ src, title }: { src: string; title: string }) {
  return (
    <figure className="not-prose my-8">
      <iframe src={src} title={title} loading="lazy" className="h-[640px] w-full rounded-2xl border border-border bg-black" />
      <figcaption className="mt-2 text-sm text-muted">
        {title} · <a href={src} className="text-accent underline underline-offset-4">Open full screen</a>
      </figcaption>
    </figure>
  );
}

const components = {
  h2: ({ children }: { children?: ReactNode }) => <h2 id={slugify(children)}>{children}</h2>,
  pre: Pre,
  Shot,
  Video,
  YouTube,
  Demo,
};

export async function renderCaseStudy(slug: string) {
  const source = await readFile(path.join(process.cwd(), "content/work", `${slug}.mdx`), "utf8");
  const { default: Content } = await evaluate(source, { ...runtime, remarkPlugins: [remarkGfm] });
  const headings = [...source.matchAll(/^## (.+)$/gm)].map((m) => ({ text: m[1], id: slugify(m[1]) }));
  return { content: <Content components={components} />, headings };
}
