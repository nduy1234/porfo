# Day Nguyen: portfolio

Personal portfolio for Forward Deployed Engineer and Product Engineer roles.
Next.js 16 (App Router) + TypeScript + Tailwind v4 + MDX, statically exported.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static site in out/
npm start            # serve out/ locally
npm run check-links  # after build: checks every internal link/anchor and external URL
```

## Edit content (no component changes needed)

- `content/projects.ts`: profile, hero proof points, "What I do" cards, experience, education, and every project card (title, problem, stack, links, featured flag).
- `content/work/<slug>.mdx`: one case study per project. Available in MDX:
  - ` ```mermaid ` fences render as diagrams; the first `%% alt: ...` line is the accessible description.
  - `<YouTube id="..." title="..." />`, `<Video src="..." title="..." />`, `<Shot src alt width height />`, `<Todo>...</Todo>`.

## Deploy (Vercel)

Import the repo in Vercel; the defaults work (`npm run build`, output `out/`). Set `NEXT_PUBLIC_SITE_URL` to your custom domain so canonical URLs, the sitemap, and Open Graph images use it.

## Notes

- Mermaid loads from jsDelivr only when a diagram scrolls into view, so it is not in the JS bundle.
- YouTube embeds are click-to-load (no third-party scripts until clicked).
- `scripts/flatten-rsc.mjs` runs after build to work around a Next 16 static-export naming mismatch for prefetch files.

## TODO (content the repos didn't provide)

- [ ] Custom domain: set `NEXT_PUBLIC_SITE_URL`.
- [ ] RF-Sentinel: screenshot of the Foundry/operator dashboard and trained-model metrics (model card metrics are TBD); a demo link.
- [ ] AdAI: screenshot of the ranked-quote report and a video of a real outbound call. Confirm `https://ad-ai-three.vercel.app` is the demo you want linked. Resume calls it "The Negotiator" (ElevenLabs × Hack-Nation); the repo doesn't, so the site uses "AdAI".
- [ ] Raise: hackathon name/date/team/result and a screenshot of a real thread.
- [ ] GAIA Green Agent: real run results, AgentBeats submission link; the repo is missing its loader, config, sample data, and `requirements.txt`, and contains unrelated ProductReel/Advan files.
- [ ] Connect: app screenshots, your role vs. Lovable scaffolding, and whether it shipped to testers/stores.
- [ ] Aida, Lanewatch: event names, dates, team, and any results (the repos state none). Optional dashboard screenshots for Aida.
- [ ] Lanewatch ↔ LoadGuard (Berkeley × Google DeepMind) link from the resume isn't in the repo; add it to the case study if you want it credited.
