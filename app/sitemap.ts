import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, priority: 1 },
    ...projects.map((p) => ({ url: `${siteUrl}/work/${p.slug}`, priority: p.featured ? 0.9 : 0.7 })),
  ];
}
