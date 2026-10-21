import { getProject, projects } from "@/content/projects";
import { ogImage, ogSize } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Case study preview";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug)!;
  return ogImage(p.title, p.problem, `Case study · ${p.context}`);
}
