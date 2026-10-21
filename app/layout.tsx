import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { profile } from "@/content/projects";
import { siteUrl } from "@/lib/site";
import ThemeToggle from "@/components/theme-toggle";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} | ${profile.role}`, template: `%s | ${profile.name}` },
  description: profile.positioning,
  authors: [{ name: profile.name, url: profile.github }],
  openGraph: { type: "website", siteName: profile.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-bg font-sans text-fg">
        <a
          href="#main"
          className="sr-only rounded bg-accent px-3 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
            <Link href="/" className="font-semibold tracking-tight">
              {profile.name}
            </Link>
            <nav aria-label="Primary" className="flex items-center gap-1 text-sm">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hidden rounded-md px-2.5 py-1.5 text-muted hover:bg-subtle hover:text-fg sm:inline-block"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#work"
                className="rounded-md px-2.5 py-1.5 text-muted hover:bg-subtle hover:text-fg sm:hidden"
              >
                Work
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>
              © {new Date().getFullYear()} {profile.name}. Built with Next.js, statically exported.
            </p>
            <ul className="flex gap-4">
              <li>
                <a className="hover:text-fg" href={profile.github}>GitHub</a>
              </li>
              <li>
                <a className="hover:text-fg" href={profile.linkedin}>LinkedIn</a>
              </li>
              <li>
                <a className="hover:text-fg" href={`mailto:${profile.email}`}>Email</a>
              </li>
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}
