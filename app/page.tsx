import Link from "next/link";
import ProjectCard from "@/components/project-card";
import { approach, education, experience, profile, projects } from "@/content/projects";

const btn = "inline-flex h-11 items-center rounded-lg px-4 text-sm font-medium";

function SectionHead({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      {/* Hero */}
      <section aria-labelledby="hero-title" className="py-16 sm:py-24">
        <h1 id="hero-title" className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{profile.positioning}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/#work" className={`${btn} bg-accent text-accent-fg hover:opacity-90`}>
            View work
          </Link>
          <a href={profile.github} className={`${btn} border border-border hover:bg-subtle`}>
            GitHub
          </a>
          <a href={profile.linkedin} className={`${btn} border border-border hover:bg-subtle`}>
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className={`${btn} border border-border hover:bg-subtle`}>
            Email
          </a>
        </div>
        <ul className="mt-10 grid gap-3 text-sm sm:grid-cols-3">
          {profile.proof.map((p) => (
            <li key={p} className="rounded-lg border border-border p-4 text-muted">
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* What I do */}
      <section aria-labelledby="approach" className="border-t border-border py-16">
        <SectionHead id="approach" eyebrow="What I do" title="From customer problem to production" />
        <ol className="grid gap-4 md:grid-cols-3">
          {approach.map((a, i) => (
            <li key={a.step} className="relative rounded-xl border border-border bg-card p-6">
              <p className="font-mono text-sm text-accent">{a.step}</p>
              <h3 className="mt-2 text-lg font-semibold">
                {a.title}
                {i < approach.length - 1 && (
                  <span aria-hidden="true" className="ml-2 text-muted">
                    →
                  </span>
                )}
              </h3>
              <p className="mt-2 text-sm">{a.body}</p>
              <p className="mt-3 text-sm text-muted">{a.example}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Work */}
      <section aria-labelledby="work" className="border-t border-border py-16">
        <SectionHead id="work" eyebrow="Featured work" title="Shipped AI products, with the code to prove it" />
        <div className="grid gap-4 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
        <h3 className="mb-4 mt-12 text-sm font-medium text-muted">More projects</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {more.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      {/* About */}
      <section aria-labelledby="about" className="border-t border-border py-16">
        <SectionHead id="about" eyebrow="About" title="Founder instincts, engineer's rigor" />
        <div className="grid gap-12 md:grid-cols-5">
          <div className="space-y-4 leading-relaxed md:col-span-2">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="md:col-span-3">
            <h3 className="sr-only">Experience</h3>
            <ol className="space-y-8 border-l border-border pl-6">
              {experience.map((e) => (
                <li key={e.org} className="relative">
                  <span aria-hidden="true" className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent" />
                  <p className="font-mono text-xs text-muted">{e.period}</p>
                  <p className="mt-1 font-semibold">
                    {e.title} ·{" "}
                    {e.href ? (
                      <a href={e.href} className="text-accent underline underline-offset-4">
                        {e.org}
                      </a>
                    ) : (
                      e.org
                    )}
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted">
                    {e.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="relative">
                <span aria-hidden="true" className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-muted" />
                <p className="font-mono text-xs text-muted">Education</p>
                <ul className="mt-2 space-y-2 text-sm">
                  {education.map((ed) => (
                    <li key={ed.school}>
                      <span className="font-semibold">{ed.school}</span>, {ed.degree}
                      {ed.detail && <span className="block text-muted">{ed.detail}</span>}
                    </li>
                  ))}
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact" className="border-t border-border py-16">
        <SectionHead id="contact" eyebrow="Contact" title="Have a customer problem that needs an agent?" />
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className={`${btn} bg-accent text-accent-fg hover:opacity-90`}>
            {profile.email}
          </a>
          <a href={profile.linkedin} className={`${btn} border border-border hover:bg-subtle`}>
            LinkedIn
          </a>
          <a href={profile.github} className={`${btn} border border-border hover:bg-subtle`}>
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
