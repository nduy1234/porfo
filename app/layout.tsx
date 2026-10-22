import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import { profile } from "@/content/projects";
import { siteUrl } from "@/lib/site";
import ThemeToggle from "@/components/theme-toggle";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-serif-display", display: "swap" });

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
    { media: "(prefers-color-scheme: dark)", color: "#12100e" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans text-fg">
        <a
          href="#main"
          className="sr-only rounded bg-accent px-3 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/80 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-5">
            <Link href="/" className="font-serif text-xl tracking-tight" aria-label={`${profile.name}, home`}>
              Day Nguyen
            </Link>
            <nav aria-label="Primary" className="flex items-center text-sm">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-2.5 py-1.5 text-muted transition-colors hover:text-fg ${item.label === "Work" ? "" : "hidden sm:inline-block"}`}
                >
                  {item.label}
                </Link>
              ))}
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer>
          <div className="mx-auto flex max-w-3xl flex-col gap-3 border-t border-border px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {profile.name}
            </p>
            <ul className="flex gap-5">
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
