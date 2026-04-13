"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Magnetic from "@/components/magnetic";
import ScrollProgress from "@/components/scroll-progress";
import type { Project } from "@/lib/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  next: Project | undefined;
  project: Project;
}

export default function ProjectContent({ project, next }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    /* ── Hero entrance ── */
    gsap
      .timeline()
      .from(".proj-back", {
        y: -12,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
      .from(
        ".proj-title-line",
        {
          yPercent: 105,
          opacity: 0,
          duration: 1.05,
          stagger: 0.09,
          ease: "expo.out",
        },
        "-=0.2"
      )
      .from(
        ".proj-meta-item",
        {
          y: 14,
          opacity: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.4"
      );

    /* ── Hero image parallax ── */
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    /* ── Section reveals ── */
    gsap.utils.toArray<HTMLElement>(".cs-section").forEach((el) => {
      gsap.from(el, {
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    });

    /* ── Gallery images ── */
    gsap.utils.toArray<HTMLElement>(".gallery-img").forEach((el, i) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%" },
      });
    });
  }, []);

  return (
    <>
      <ScrollProgress />

      {/* ──────────── HERO ──────────── */}
      <section
        className="relative flex min-h-[90vh] flex-col justify-end overflow-hidden"
        ref={heroRef}
      >
        {/* Parallax image */}
        <div
          aria-hidden
          className="absolute inset-[-15%] will-change-transform"
          ref={imageRef}
        >
          <Image
            alt={project.title}
            className="object-cover"
            fill
            priority
            src={project.coverImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/70 to-[var(--bg)]/20" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pt-36 pb-16 md:px-10 md:pb-24">
          {/* Back link */}
          <Magnetic strength={0.25}>
            <Link
              className="proj-back section-label hover:!text-[var(--accent)] mb-12 inline-flex items-center gap-3 transition-colors duration-300"
              href="/#work"
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
              All Projects
            </Link>
          </Magnetic>

          {/* Title */}
          <div className="mb-10">
            <div className="overflow-hidden">
              <span className="proj-title-line section-label mb-2 block text-[var(--accent)]">
                {project.category} — {project.year}
              </span>
            </div>
            <div className="overflow-hidden">
              <h1
                className="proj-title-line font-display font-medium text-[var(--text)] leading-[0.93]"
                style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
              >
                {project.title}
              </h1>
            </div>
            <div className="overflow-hidden">
              <p
                className="proj-title-line font-display text-[var(--text-muted)] italic leading-[0.95]"
                style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
              >
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Meta strip */}
          <div className="flex flex-wrap gap-6 border-[var(--border)] border-t pt-6">
            {[
              { label: "Role", value: project.role },
              { label: "Client", value: project.client },
              { label: "Year", value: project.year },
              { label: "Stack", value: project.tags.join(", ") },
            ].map(({ label, value }) => (
              <div className="proj-meta-item flex flex-col gap-1" key={label}>
                <span className="section-label">{label}</span>
                <span className="font-light text-[var(--text)] text-sm">
                  {value}
                </span>
              </div>
            ))}

            {project.url && (
              <div className="proj-meta-item ml-auto flex flex-col gap-1">
                <span className="section-label">Live</span>
                <a
                  className="link-fx text-[var(--accent)] text-sm"
                  href={project.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Visit Site ↗
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ──────────── CASE STUDY ──────────── */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* Overview */}
        <div className="cs-section border-[var(--border)] border-t py-16 md:py-24">
          <p
            className="max-w-3xl font-display font-light text-[var(--text)] leading-[1.4]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)" }}
          >
            {project.description}
          </p>
        </div>

        {/* Sections — Problem / Approach / Outcome */}
        <div className="grid gap-px border-[var(--border)] border-t bg-[var(--border)] md:grid-cols-3">
          {project.sections.map(({ title, body }) => (
            <div
              className="cs-section bg-[var(--bg)] py-12 pr-0 md:py-16 md:pr-10"
              key={title}
            >
              <span className="section-label mb-5 block">{title}</span>
              <p className="font-light text-[0.9375rem] text-[var(--text-muted)] leading-[1.85]">
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Gallery */}
        {project.images.length > 0 && (
          <div className="border-[var(--border)] border-t py-16 md:py-24">
            <span className="cs-section section-label mb-10 block">
              Gallery
            </span>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {project.images.map((src, i) => (
                <div
                  className="gallery-img relative aspect-[4/3] overflow-hidden rounded-sm"
                  key={i}
                >
                  <Image
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    fill
                    src={src}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ──────────── NEXT PROJECT ──────────── */}
      {next && (
        <div className="border-[var(--border)] border-t">
          <Link
            className="group mx-auto block max-w-[1600px] px-6 py-16 md:px-10 md:py-24"
            href={`/work/${next.slug}`}
          >
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="section-label mb-4 block">Next Project</span>
                <h2
                  className="font-display font-medium text-[var(--text)] leading-[0.93] transition-colors duration-500 group-hover:text-[var(--accent)]"
                  style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
                >
                  {next.title}
                </h2>
                <p
                  className="font-display text-[var(--text-muted)] italic"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)" }}
                >
                  {next.tagline}
                </p>
              </div>
              <div className="flex items-center gap-3 text-[var(--accent)] transition-all duration-300 group-hover:gap-5">
                <span className="section-label !text-[var(--accent)]">
                  View
                </span>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="m5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
