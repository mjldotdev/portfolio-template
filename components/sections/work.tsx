"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    slug: "luminary",
    id: "01",
    title: "Luminary",
    category: "Design System",
    year: "2024",
    description:
      "Enterprise-grade design system built for scale. 200+ components, deep Figma integration, and an interactive docs site.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80",
    tags: ["React", "TypeScript", "Storybook"],
    featured: true,
  },
  {
    slug: "velour-studio",
    id: "02",
    title: "Velour Studio",
    category: "Brand & Web",
    year: "2024",
    description:
      "Editorial brand identity and CMS-driven site for a luxury fashion house in Paris.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    tags: ["Next.js", "Sanity", "GSAP"],
    featured: false,
  },
  {
    slug: "orbis-finance",
    id: "03",
    title: "Orbis Finance",
    category: "SaaS Platform",
    year: "2023",
    description:
      "Real-time analytics dashboard for institutional traders. Sub-50ms data refresh via WebSockets.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    tags: ["React", "D3.js", "WebSockets"],
    featured: false,
  },
  {
    slug: "aura-ai",
    id: "04",
    title: "Aura AI",
    category: "AI Product",
    year: "2023",
    description:
      "Conversational AI interface with voice synthesis and an adaptive UI that learns from user behaviour.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80",
    tags: ["Next.js", "OpenAI", "Prisma"],
    featured: false,
  },
] as const;

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* Header */
      gsap.from(".work-header", {
        y: 36,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      /* Cards */
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.from(card, {
          y: 55,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      className="px-6 py-24 md:px-10 md:py-36"
      id="work"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-[1600px]">
        {/* ── Header ── */}
        <div className="work-header mb-14 flex items-end justify-between md:mb-20">
          <div>
            <span className="section-label mb-3 block">01 — Selected Work</span>
            <h2
              className="font-display font-medium text-[var(--text)] leading-[1.04]"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            >
              Projects that
              <br />
              <em className="text-[var(--accent)]">define the craft.</em>
            </h2>
          </div>

          <Link
            className="section-label hover:!text-[var(--accent)] group hidden items-center gap-2.5 transition-colors duration-300 md:flex"
            href="/work"
          >
            All Projects
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="m5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 gap-px bg-[var(--border)] md:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Project Card ─── */
type Project = (typeof PROJECTS)[number];

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      const image = imageRef.current;
      const title = titleRef.current;
      if (!(card && image && title)) {
        return;
      }

      const enter = () => {
        gsap.to(image, {
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
        });
        gsap.to(title, { x: 8, duration: 0.35, ease: "power2.out" });
      };
      const leave = () => {
        gsap.to(image, {
          opacity: 0,
          scale: 0.97,
          duration: 0.4,
          ease: "power2.in",
        });
        gsap.to(title, { x: 0, duration: 0.4, ease: "power2.out" });
      };

      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      return () => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      };
    },
    { scope: cardRef }
  );

  return (
    <Link
      className="project-card group relative block cursor-none overflow-hidden bg-[var(--bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      data-cursor
      href={`/work/${project.slug}`}
    >
      <div
        className="project-card group relative cursor-none overflow-hidden bg-[var(--bg)] p-9 md:p-14"
        data-cursor
        ref={cardRef}
      >
        {/* Hover background image */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 scale-[0.97] opacity-0"
          ref={imageRef}
        >
          <Image
            alt={project.title}
            className="object-cover"
            fill
            src={project.image}
          />
          <div className="absolute inset-0 bg-[var(--bg)]/88 dark:bg-[var(--bg)]/92" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full min-h-[320px] flex-col">
          {/* Top row */}
          <div className="mb-10 flex items-start justify-between md:mb-14">
            <span
              className="select-none font-display font-light text-[var(--border)] leading-none transition-colors duration-500 group-hover:text-[var(--accent)]"
              style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)" }}
            >
              {project.id}
            </span>
            <div className="flex flex-col items-end gap-1">
              <span className="section-label">{project.category}</span>
              <span className="section-label">{project.year}</span>
            </div>
          </div>

          {/* Title */}
          <h3
            className="mb-4 font-display font-medium text-[var(--text)] leading-[1.02] will-change-transform"
            ref={titleRef}
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-8 max-w-[300px] flex-1 font-light text-[var(--text-muted)] text-sm leading-[1.8]">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                className="section-label rounded-full border border-[var(--border)] px-2.5 py-1"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA — visible on hover */}
          <div className="flex translate-y-2 items-center gap-2 text-[var(--accent)] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="section-label !text-[var(--accent)]">
              View Project
            </span>
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="m5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
