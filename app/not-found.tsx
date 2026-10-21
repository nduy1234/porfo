import Link from "next/link";

export const metadata = { title: "Not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-muted">That page doesn&apos;t exist.</p>
      <Link href="/" className="mt-6 inline-block font-medium text-accent underline underline-offset-4">
        Back home
      </Link>
    </div>
  );
}
