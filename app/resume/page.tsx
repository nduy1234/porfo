import type { Metadata } from "next";
import { profile } from "@/content/projects";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name}: AI engineer, former founder, and product engineer. View or download the PDF.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Resume</h1>
          <p className="mt-2 text-muted">{profile.role}</p>
        </div>
        <a
          href={profile.resume}
          download="Day_Nguyen_Resume.pdf"
          className="inline-flex h-11 items-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-fg hover:opacity-90"
        >
          Download PDF
        </a>
      </div>
      <object
        data={profile.resume}
        type="application/pdf"
        aria-label={`${profile.name} resume (PDF)`}
        className="mt-8 h-[80vh] min-h-[600px] w-full rounded-xl border border-border"
      >
        <p className="p-6">
          Your browser can&apos;t display PDFs inline.{" "}
          <a href={profile.resume} className="text-accent underline">
            Open the resume PDF
          </a>
          .
        </p>
      </object>
    </div>
  );
}
