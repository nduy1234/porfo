// All site content lives here (plus the case-study MDX files in content/work/).
// Edit text, links, and order here; components read from these exports.

export const profile = {
  name: "Day Nguyen",
  role: "Forward Deployed & Product Engineer",
  positioning:
    "AI engineer who ships customer-facing agents: voice AI, fraud detection, and workflow automation. I go from customer problem to working product in days.",
  email: "nduy1234@gmail.com",
  github: "https://github.com/nduy1234",
  linkedin: "https://www.linkedin.com/in/daynguyen",
  // Short proof points, taken from the resume.
  proof: [
    "AI Engineer at Handshake, evaluating frontier LLM output for AI labs",
    "Former founder of Advan, an AI customer-support platform taken through design-partner rollout",
    "25+ full-stack products shipped across 10+ client engagements (2017–2025)",
  ],
  about: [
    "I'm a full-stack product engineer and former founder. I build AI agents and customer-facing products end to end, and I work directly with users to make them hold up in the real world.",
    "My background spans product management, AI, digital media design (Harvard), and educational leadership (Cal State LA). That mix is why I start with the person on the other end of the call, not the model, and why I care about evaluation: knowing what \"correct\" looks like before shipping.",
  ],
};

export const approach = [
  {
    step: "01",
    title: "Customer discovery",
    body: "Sit with the operator, map the workflow, and find where money or trust leaks.",
    example: "Aida started from one question: how does a busy broker tell a real carrier from someone quoting their MC number?",
  },
  {
    step: "02",
    title: "Prototype",
    body: "A working agent against real APIs in days, not a deck. Demo mode so it survives the venue Wi-Fi.",
    example: "AdAI places parallel quote calls through ElevenLabs and Twilio, with a demo fallback for every integration.",
  },
  {
    step: "03",
    title: "Ship to production",
    body: "Deterministic guardrails around the model, tests on the risky paths, and humans in the loop where it matters.",
    example: "Aida's booking gate re-runs the risk engine server-side and is covered by 36 pytest cases.",
  },
];

export type Experience = {
  org: string;
  title: string;
  period: string;
  href?: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    org: "Handshake",
    title: "AI Engineer",
    period: "2025 – Present",
    points: [
      "Evaluate frontier LLM outputs across reasoning, coding, and reliability for AI labs, producing structured feedback on failure modes.",
      "Define what “correct” looks like, build test cases around edge cases, and separate demo-quality from production-quality behavior.",
    ],
  },
  {
    org: "Advan",
    title: "Founder",
    period: "2025 – 2026",
    href: "https://advanai.net",
    points: [
      "Built and deployed an AI-native customer-support platform (“the trust layer for AI customer support”): React front end, Python/Node services, relational data, and LLM integrations, through design-partner rollout.",
      "Designed a verification-first agent architecture: per-response confidence scoring, source-cited answers, human-in-the-loop escalation, and an auditable decision trail.",
      "Ran discovery and live demos with Heads of CX and VPs of Customer Success across seven verticals, and turned feedback into shipped changes.",
    ],
  },
  {
    org: "Multiple clients",
    title: "Product Engineer",
    period: "2017 – 2025",
    points: [
      "Shipped 25+ full-stack products across 10+ engagements, each from ambiguous requirements to production rollout.",
      "Embedded with client stakeholders to scope problems, integrate third-party APIs, and debug production issues.",
      "Built data pipelines, analytics instrumentation, and referral systems; ran 25+ experiments with up to 70% lift on onboarding and conversion flows.",
    ],
  },
];

export const education = [
  { school: "Harvard University", degree: "ALM, Digital Media Design", detail: "Graduate certificates in Design & Technology and Web Development" },
  { school: "California State University, Los Angeles", degree: "EdD, Educational Leadership", detail: "" },
  { school: "University of Vermont", degree: "MEd, Education", detail: "Also BA, Business Administration" },
];

export type Project = {
  slug: string;
  title: string;
  /** One-line customer problem shown on cards. */
  problem: string;
  /** One-paragraph summary for the case-study header and meta description. */
  summary: string;
  context: string;
  stack: string[];
  featured: boolean;
  /** Short bullets shown on the large featured cards. */
  highlights?: string[];
  code: string;
  demo?: { href: string; label: string };
};

export const projects: Project[] = [
  {
    slug: "aida",
    title: "Aida",
    problem: "Scammers quote a real carrier's MC number, so every lookup passes. Brokers need to verify the caller, not just the number.",
    summary:
      "A voice agent that answers a freight broker's carrier line, verifies the caller against FMCSA records with an out-of-band SMS code, books loads for verified carriers, and holds suspected impersonators for a human.",
    context: "Live-call voice agent · October 2026",
    stack: ["Python", "FastAPI", "ElevenLabs Agents", "Twilio", "FMCSA API", "Next.js", "SQLite"],
    featured: true,
    highlights: [
      "7 webhook tools; the LLM never sees risk reasons or registered contact details",
      "Deterministic risk engine decides; booking is gated server-side",
      "Live SSE dashboard with transcript, tool timeline, and risk meter",
    ],
    code: "https://github.com/nduy1234/Aida",
    demo: { href: "https://youtu.be/8E9mFA73ysE", label: "Watch demo" },
  },
  {
    slug: "lanewatch",
    title: "Lanewatch",
    problem: "Static fraud rule lists don't learn. A caught scammer calls the next broker with a new MC number and the same phone.",
    summary:
      "A freight-fraud checker that scores a carrier call on 8 signals with an explainable logistic model, then updates its weights and a shared blocklist every time a broker confirms the outcome.",
    context: "Fraud scoring with online learning · October 2026",
    stack: ["JavaScript", "Logistic regression", "Online SGD", "HTML/CSS", "localStorage"],
    featured: true,
    highlights: [
      "8 call signals, each with a visible weight, so every verdict comes with reasons",
      "One SGD step per confirmed outcome; weights visibly shift after each confirmation",
      "Zero-dependency single file: no backend, no keys, no build step",
    ],
    code: "https://github.com/nduy1234/Lanewatch",
    demo: { href: "/work/lanewatch#what-i-built", label: "Watch demo" },
  },
  {
    slug: "rf-sentinel",
    title: "RF-Sentinel",
    problem: "Cheap SDRs can jam or spoof Sub-GHz IoT, SCADA, and drone links, and SOC tools are blind to the physical layer.",
    summary:
      "An RF anomaly-detection pipeline: raw IQ captures become labeled feature tables streamed to Palantir Foundry, alongside a live SDR track with statistical and VAE detectors and an agent layer that triages anomalies.",
    context: "National Security Hackathon · 2026",
    stack: ["Python", "Palantir Foundry", "PyTorch", "FastAPI", "Redis", "NumPy/SciPy", "SDR"],
    featured: true,
    highlights: [
      "12 per-window spectral features plus rolling z-scores and drift (29 total)",
      "Z-score + CUSUM + VAE composite detector with a baseline that learns only from normal frames",
      "Batched, failure-tolerant replay into the Foundry Streams API",
    ],
    code: "https://github.com/nduy1234/rf-sentinel",
  },
  {
    slug: "adai",
    title: "AdAI",
    problem: "Getting quotes for a service job means calling vendor after vendor and comparing numbers that aren't itemized the same way.",
    summary:
      "A voice procurement agent: it turns a job spec (form or uploaded document) into vendor calls placed in parallel, captures itemized quotes from post-call webhooks, negotiates with the best real competing quote, and ranks the results.",
    context: "Voice procurement agent · July 2026",
    stack: ["Next.js", "TypeScript", "ElevenLabs", "Twilio", "Google Places", "OpenAI", "Supabase"],
    featured: false,
    code: "https://github.com/nduy1234/AdAI",
    demo: { href: "https://ad-ai-three.vercel.app", label: "Live app" },
  },
  {
    slug: "raise",
    title: "Raise",
    problem: "Pre-seed founders burn hours building investor lists, and AI research tools happily invent investors.",
    summary:
      "An iMessage fundraising associate for founding teams. It researches investors with a source URL required for every record, drafts intros for human approval, and enforces who can approve inside a shared multiplayer thread.",
    context: "OpenClaw 2.0 hackathon · September 2026",
    stack: ["Python", "OpenClaw / Plow Hermes", "iMessage", "Docker"],
    featured: false,
    code: "https://github.com/nduy1234/Raise",
    demo: { href: "https://youtu.be/iiCXKVhJFuA", label: "Watch demo" },
  },
  {
    slug: "gaia-green-agent",
    title: "GAIA Green Agent",
    problem: "Agent benchmarks are hard to trust when you can't see or reproduce how an answer was reached.",
    summary:
      "A deterministic agent for the AgentX–AgentBeats competition that solves GAIA-style arithmetic problems with separate plan, act, and verify phases, exact Decimal math, and a JSON trace for every phase.",
    context: "AgentX–AgentBeats competition · 2026",
    stack: ["Python", "Decimal", "Docker", "GitHub Actions", "A2A over HTTP"],
    featured: false,
    code: "https://github.com/nduy1234/gaia-green-agent",
  },
  {
    slug: "connectapp",
    title: "Connect",
    problem: "Early founders lack one place to find other startups, share resources, and reach out.",
    summary:
      "A mobile-first startup-networking app: email and Google OAuth sign-in, founder profiles, a startup directory, shared resources, and realtime notifications on Supabase, wrapped for iOS and Android with Capacitor.",
    context: "Mobile app · late 2025",
    stack: ["React", "TypeScript", "Supabase", "Capacitor", "Google OAuth", "Tailwind"],
    featured: false,
    code: "https://github.com/nduy1234/connectapp",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
