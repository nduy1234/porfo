import Link from "next/link";
import ProjectCard from "@/components/project-card";
import { approach, education, experience, profile, projects } from "@/content/projects";

function SectionHead({ id, n, title, children }: { id: string; n: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-xs text-faint">
        <span className="text-accent">{n}</span> / {id}
      </p>
      <h2 id={id} className="mt-2 font-serif text-4xl tracking-tight sm:text-[2.75rem]">
        {title}
      </h2>
      {children && <p className="mt-3 max-w-xl text-muted">{children}</p>}
    </div>
  );
}

function Icon({ d, label }: { d: string; label: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <title>{label}</title>
      <path d={d} />
    </svg>
  );
}

const icons = {
  github:
    "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z",
  linkedin:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  mail: "M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.3-.5 7.7 6.16L19.7 5H4.3ZM20 6.8l-7.38 5.9a1 1 0 0 1-1.24 0L4 6.8v11.7c0 .28.22.5.5.5h15a.5.5 0 0 0 .5-.5V6.8Z",
};

const iconLink = "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/60 hover:text-fg";

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <div className="mx-auto max-w-3xl px-5">
      {/* Hero */}
      <section aria-labelledby="hero-title" className="rise pb-14 pt-16 sm:pt-24">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover ring-1 ring-border ring-offset-4 ring-offset-bg"
          />
          <p className="font-mono text-xs leading-relaxed text-faint">
            AI Engineer · Forward Deployed
            <br />
            Product Engineer
          </p>
        </div>
        <h1 id="hero-title" className="mt-8 font-serif text-6xl leading-[0.95] tracking-tight sm:text-8xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          I ship <span className="text-fg">customer-facing AI agents</span>: voice AI, fraud detection, and workflow automation. I go from{" "}
          <span className="text-fg">customer problem to working product in days</span>.
        </p>

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Credentials">
          {profile.credentials.map((c) => (
            <li key={c.org} className="flex items-center gap-2.5 rounded-xl border border-border bg-card/70 py-1.5 pl-1.5 pr-3.5">
              <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-lg bg-subtle font-serif text-sm text-accent">
                {c.mark}
              </span>
              <span className="text-sm leading-tight">
                <span className="block font-medium">{c.title}</span>
                <span className="block font-mono text-[11px] text-faint">{c.org}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/#work"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            View work <span aria-hidden="true">↓</span>
          </Link>
          <a href={`mailto:${profile.email}`} className="inline-flex h-11 items-center rounded-full border border-border px-5 text-sm font-medium transition-colors hover:border-accent/60">
            Get in touch
          </a>
          <span className="mx-1 hidden h-6 w-px bg-border sm:block" aria-hidden="true" />
          <div className="flex gap-2">
            <a href={profile.github} className={iconLink} aria-label="GitHub">
              <Icon d={icons.github} label="GitHub" />
            </a>
            <a href={profile.linkedin} className={iconLink} aria-label="LinkedIn">
              <Icon d={icons.linkedin} label="LinkedIn" />
            </a>
            <a href={`mailto:${profile.email}`} className={iconLink} aria-label="Email">
              <Icon d={icons.mail} label="Email" />
            </a>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section aria-label="Track record" className="rise border-y border-border py-8 [animation-delay:120ms]">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
          {profile.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-serif text-5xl tracking-tight">{s.value}</span>
                <span className="mt-1 block text-sm leading-snug text-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Work */}
      <section aria-labelledby="work" className="pt-20">
        <SectionHead id="work" n="01" title="Selected work">
          Agents and ML systems built against real APIs and real data. Each case study covers the customer, the architecture, and the tradeoffs.
        </SectionHead>
        <div className="space-y-4">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} />
          ))}
        </div>
        <h3 className="mb-4 mt-12 font-mono text-xs text-faint">More builds</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {more.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach" className="pt-24">
        <SectionHead id="approach" n="02" title="How I work" />
        <ol className="divide-y divide-border border-y border-border">
          {approach.map((a) => (
            <li key={a.step} className="grid gap-2 py-6 sm:grid-cols-[3rem_1fr]">
              <span className="font-mono text-sm text-accent">{a.step}</span>
              <div>
                <h3 className="font-serif text-2xl">{a.title}</h3>
                <p className="mt-1.5">{a.body}</p>
                <p className="mt-2 text-sm text-muted">{a.example}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience" className="pt-24">
        <SectionHead id="experience" n="03" title="Experience" />
        <div className="mb-10 space-y-4 text-lg leading-relaxed text-muted">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <ol className="space-y-3">
          {experience.map((e) => (
            <li key={e.org} className="rounded-2xl border border-border bg-card/50 p-5">
              <div className="flex items-start gap-4">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-subtle font-serif text-lg text-accent">
                  {e.org[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-medium">{e.title}</h3>
                    <p className="font-mono text-xs text-faint">{e.period}</p>
                  </div>
                  <p className="font-mono text-xs text-muted">
                    {e.href ? (
                      <a href={e.href} className="text-accent underline underline-offset-4">
                        {e.org}
                      </a>
                    ) : (
                      e.org
                    )}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted">
                    {e.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <h3 className="mb-4 mt-12 font-mono text-xs text-faint">Education</h3>
        <ul className="divide-y divide-border border-y border-border">
          {education.map((ed) => (
            <li key={ed.school} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
              <span className="font-medium">{ed.school}</span>
              <span className="text-sm text-muted">
                {ed.degree}
                {ed.detail && <span className="text-faint"> · {ed.detail}</span>}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact" className="py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 px-6 py-12 sm:px-12 sm:py-16">
          <p className="font-mono text-xs text-faint">
            <span className="text-accent">04</span> / contact
          </p>
          <h2 id="contact" className="mt-3 max-w-xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-6xl">
            Have a customer problem that needs an agent?
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-12 items-center rounded-full bg-accent px-6 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              {profile.email}
            </a>
            <a href={profile.linkedin} className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium transition-colors hover:border-accent/60">
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
