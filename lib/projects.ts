/* ─────────────────────────────────────────────
   lib/projects.ts
   Single source of truth for all project data.
   Used by: /components/sections/work.tsx
            /app/work/[slug]/page.tsx
───────────────────────────────────────────── */

export interface ProjectSection {
  body: string;
  title: string;
}

export interface Project {
  category: string;
  client: string;
  coverImage: string;
  description: string;
  id: string;
  images: readonly string[];
  nextSlug: string;
  role: string;
  sections: readonly ProjectSection[];
  slug: string;
  tagline: string;
  tags: readonly string[];
  title: string;
  url?: string;
  year: string;
}

export const PROJECTS: readonly Project[] = [
  {
    slug: "luminary",
    id: "01",
    title: "Luminary",
    tagline: "A design system built for scale.",
    category: "Design System",
    year: "2024",
    description:
      "Enterprise-grade component library with 200+ primitives, deep Figma integration, and a live interactive docs site.",
    coverImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=900&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80",
    ],
    tags: ["React", "TypeScript", "Storybook", "Figma"],
    role: "Design System Lead",
    client: "Internal / Open Source",
    url: "https://github.com",
    sections: [
      {
        title: "The Problem",
        body: "Inconsistency across five product teams was slowing development and fracturing the user experience. Each team maintained its own component library with overlapping but incompatible implementations, creating an ever-growing debt of divergent UI patterns.",
      },
      {
        title: "The Approach",
        body: "We audited every component across all products, distilled a canonical set of primitives, and rebuilt from the ground up — with accessibility, theming, and documentation as first-class concerns from day one. A token-based design layer in Figma drove the implementation, keeping design and code in perpetual sync.",
      },
      {
        title: "The Outcome",
        body: "A fully documented system of 200+ components published to npm. Adoption across all five teams reduced UI inconsistency by 80% and cut average feature development time by 30%, measured over the first two quarters post-launch.",
      },
    ],
    nextSlug: "velour-studio",
  },
  {
    slug: "velour-studio",
    id: "02",
    title: "Velour Studio",
    tagline: "Editorial brand identity for a luxury fashion house.",
    category: "Brand & Web",
    year: "2024",
    description:
      "Complete brand identity and fully custom CMS-driven website for a Paris-based luxury fashion label.",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1558618047-f4c4c0b24e67?w=900&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    ],
    tags: ["Next.js", "Sanity", "GSAP", "Lenis"],
    role: "Lead Developer & Designer",
    client: "Velour Studio, Paris",
    sections: [
      {
        title: "The Challenge",
        body: "The client needed a website that felt as premium as their garments — where every interaction, every transition, every typographic detail reinforced the brand's position at the top of the market.",
      },
      {
        title: "Approach",
        body: "Working from a detailed art direction brief, we developed a custom Sanity schema that gave full editorial control to the client while preserving design integrity. Every animation was choreographed as a deliberate design choice, not an afterthought.",
      },
      {
        title: "Result",
        body: "A fully custom CMS-powered site with editorial-quality animations, 95+ Lighthouse scores across all metrics, and a content pipeline the team calls the best tool in their workflow.",
      },
    ],
    nextSlug: "orbis-finance",
  },
  {
    slug: "orbis-finance",
    id: "03",
    title: "Orbis Finance",
    tagline: "Real-time analytics for institutional traders.",
    category: "SaaS Platform",
    year: "2023",
    description:
      "High-performance financial analytics dashboard with real-time data visualisation and sub-50ms data refresh via WebSockets.",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=900&q=80",
    ],
    tags: ["React", "D3.js", "WebSockets", "PostgreSQL"],
    role: "Frontend Engineer",
    client: "Orbis Capital",
    sections: [
      {
        title: "The Problem",
        body: "Trading desks needed a unified view of multi-asset portfolios updating in real-time, without the latency and reliability issues plaguing their existing terminals. Every second of delay translated directly to missed opportunity.",
      },
      {
        title: "Approach",
        body: "A WebSocket-first data layer with intelligent delta updates meant the client only ever received changed values. All visualisations are custom D3 charts, optimised with canvas rendering for the highest-frequency streams.",
      },
      {
        title: "Outcome",
        body: "Sub-50ms end-to-end data refresh. Adopted by 12 institutional clients in the first quarter, collectively managing over $2B in portfolio value across the platform.",
      },
    ],
    nextSlug: "aura-ai",
  },
  {
    slug: "aura-ai",
    id: "04",
    title: "Aura AI",
    tagline: "Conversational AI with a UI that learns.",
    category: "AI Product",
    year: "2023",
    description:
      "AI interface with voice synthesis and an adaptive UI that reorganises itself based on detected usage patterns.",
    coverImage:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1677442135968-6db3b0025e95?w=900&q=80",
      "https://images.unsplash.com/photo-1676277791608-ac54525aa94d?w=900&q=80",
    ],
    tags: ["Next.js", "OpenAI", "Prisma", "tRPC"],
    role: "Full-Stack Developer",
    client: "Aura Technologies",
    url: "https://aura.example.com",
    sections: [
      {
        title: "The Vision",
        body: "A conversational AI that felt less like a chatbot and more like a genuinely intelligent assistant — one that understood context, remembered preferences, and communicated in a natural, synthesised voice.",
      },
      {
        title: "Technical Architecture",
        body: "Streaming OpenAI responses via server-sent events kept latency imperceptible. ElevenLabs voice synthesis ran in parallel. An adaptive layout engine tracked interaction heuristics and reorganised the UI to match each user's workflow.",
      },
      {
        title: "Impact",
        body: "4.8★ App Store rating at launch. 50k+ active users in the first month. Product Hunt's #2 product of the week on launch day.",
      },
    ],
    nextSlug: "luminary",
  },
] as const;

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  const current = getProject(slug);
  if (!current) {
    return undefined;
  }
  return getProject(current.nextSlug);
}
