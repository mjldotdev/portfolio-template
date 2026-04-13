"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import ScrollProgress from "@/components/scroll-progress";
import { PROJECTS, type Project } from "@/lib/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Derive unique categories for filter chips */
const ALL = "All";
const CATEGORIES = [
  ALL,
  ...Array.from(new Set(PROJECTS.map((p) => p.category))),
];

export default function WorkIndex() {
  const pageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(ALL);

  const filtered =
    active === ALL ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  /* ── Page entrance ── */
  useGSAP(
    () => {
      gsap
        .timeline()
        .from(".wi-header-line", {
          yPercent: 110,
          opacity: 0,
          duration: 1.05,
          stagger: 0.08,
          ease: "expo.out",
        })
        .from(
          ".wi-meta",
          {
            y: 16,
            opacity: 0,
            duration: 0.7,
            stagger: 0.07,
            ease: "power3.out",
          },
          "-=0.45"
        );
    },
    { scope: pageRef }
  );

  /* Re-animate rows whenever filter changes */
  useGSAP(
    () => {
      gsap.from(".project-row", {
        y: 28,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "power3.out",
      });
    },
    { scope: listRef, dependencies: [active] }
  );

  return (
    <>
      <ScrollProgress />
      <Nav />

      <div className="min-h-screen px-6 pt-32 pb-0 md:px-10" ref={pageRef}>
        <div className="mx-auto max-w-[1600px]">
          {/* ════════════════════════════════
              HEADER
          ════════════════════════════════ */}
          <div className="mb-16 md:mb-24">
            {/* Back link */}
            <Link
              className="wi-meta section-label hover:!text-[var(--accent)] mb-8 inline-flex items-center gap-3 transition-colors duration-300"
              href="/"
            >
              <svg
                className="h-3.5 w-3.5 rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="m5 12h14M12 5l7 7-7 7" />
              </svg>
              Home
            </Link>

            {/* Title */}
            <div className="mb-2 overflow-hidden">
              <h1
                className="wi-header-line font-display font-medium text-[var(--text)] leading-[0.92]"
                style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
              >
                All Work
              </h1>
            </div>
            <div className="mb-10 overflow-hidden md:mb-14">
              <p
                className="wi-header-line font-display text-[var(--text-muted)] italic leading-[0.95]"
                style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)" }}
              >
                {PROJECTS.length} selected projects.
              </p>
            </div>

            {/* Filter chips + count */}
            <div className="wi-meta flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  className={[
                    "section-label rounded-full border px-4 py-2 transition-all duration-300",
                    active === cat
                      ? "!text-[var(--accent)] border-[var(--accent)] bg-[var(--accent-dim)]"
                      : "hover:!text-[var(--accent)] border-[var(--border)] hover:border-[var(--accent)]",
                  ].join(" ")}
                  key={cat}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </button>
              ))}

              <span className="section-label ml-auto text-[var(--text-muted)]">
                {filtered.length} project{filtered.length === 1 ? "" : "s"}
              </span>
            </div>
          </div>

          {/* ════════════════════════════════
              PROJECT LIST
          ════════════════════════════════ */}
          <div ref={listRef}>
            {/* Column headers — desktop */}
            <div className="mb-2 hidden grid-cols-[3rem_1fr_auto] gap-8 border-[var(--border)] border-b pb-4 md:grid">
              <span className="section-label">#</span>
              <span className="section-label">Project</span>
              <span className="section-label">Year</span>
            </div>

            {/* Rows */}
            <div>
              {filtered.map((project, i) => (
                <ProjectRow index={i} key={project.slug} project={project} />
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="py-24 text-center">
                <p className="font-display text-2xl text-[var(--text-muted)] italic">
                  No projects found.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* ─────────────────────────────────────────────
   PROJECT ROW — horizontal list item with
   fullscreen image preview on hover (desktop)
───────────────────────────────────────────── */
function ProjectRow({ project, index }: { project: Project; index: number }) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const isLast = index === PROJECTS.length - 1;

  useGSAP(
    () => {
      const row = rowRef.current;
      const preview = previewRef.current;
      if (!(row && preview)) {
        return;
      }

      /* Preview follows the cursor */
      const onMove = (e: MouseEvent) => {
        const rect = row.getBoundingClientRect();
        gsap.to(preview, {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top - preview.offsetHeight / 2,
          duration: 0.55,
          ease: "power3.out",
        });
      };

      const onEnter = () => {
        gsap.to(preview, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(".row-title-" + project.slug, {
          x: 12,
          duration: 0.35,
          ease: "power2.out",
        });
      };

      const onLeave = () => {
        gsap.to(preview, {
          opacity: 0,
          scale: 0.94,
          duration: 0.35,
          ease: "power2.in",
        });
        gsap.to(".row-title-" + project.slug, {
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);
      row.addEventListener("mousemove", onMove);
      return () => {
        row.removeEventListener("mouseenter", onEnter);
        row.removeEventListener("mouseleave", onLeave);
        row.removeEventListener("mousemove", onMove);
      };
    },
    { scope: rowRef }
  );

  return (
    <Link
      className={[
        "project-row group relative flex items-center gap-6 md:gap-8",
        "border-[var(--border)] border-b py-7 md:py-9",
        "cursor-none overflow-hidden",
        isLast ? "" : "",
      ].join(" ")}
      data-cursor
      href={`/work/${project.slug}`}
      ref={rowRef}
    >
      {/* ── Floating image preview (desktop only, cursor-tracked) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-20 hidden aspect-[4/3] w-[280px] scale-[0.94] overflow-hidden rounded-sm opacity-0 will-change-transform md:block"
        ref={previewRef}
      >
        <Image
          alt={project.title}
          className="object-cover"
          fill
          src={project.coverImage}
        />
        {/* Subtle tint so image doesn't overpower */}
        <div className="absolute inset-0 bg-[var(--bg)]/20" />
      </div>

      {/* ── Index number ── */}
      <span
        aria-hidden
        className="hidden w-12 shrink-0 select-none font-display font-light text-[var(--border)] leading-none transition-colors duration-500 group-hover:text-[var(--accent)] md:block"
        style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
      >
        {project.id}
      </span>

      {/* ── Main content ── */}
      <div className="min-w-0 flex-1">
        {/* Mobile: show id inline */}
        <span className="section-label mb-1 block text-[var(--text-muted)] md:hidden">
          {project.id} — {project.category}
        </span>

        <h2
          className={`row-title-${project.slug} truncate font-display font-medium text-[var(--text)] leading-[1.05] will-change-transform`}
          style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
        >
          {project.title}
        </h2>

        <p className="mt-1.5 line-clamp-1 max-w-lg font-light text-[var(--text-muted)] text-sm">
          {project.tagline}
        </p>
      </div>

      {/* ── Right metadata ── */}
      <div className="flex shrink-0 flex-col items-end gap-2">
        {/* Category pill */}
        <span className="section-label group-hover:!text-[var(--accent)] hidden rounded-full border border-[var(--border)] px-3 py-1 transition-all duration-300 group-hover:border-[var(--accent)] sm:block">
          {project.category}
        </span>
        <span className="section-label text-[var(--text-muted)]">
          {project.year}
        </span>
      </div>

      {/* ── Arrow (appears on hover) ── */}
      <svg
        className="h-5 w-5 shrink-0 -translate-x-2 text-[var(--accent)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="m5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
