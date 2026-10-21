import { profile } from "@/content/projects";
import { ogImage, ogSize } from "@/lib/og";

export const dynamic = "force-static";
export const alt = `${profile.name}, ${profile.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage(profile.name, profile.positioning, "Portfolio");
}
