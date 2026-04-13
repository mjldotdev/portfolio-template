"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    num: "01",
    title: "Discover",
    description:
      "Deep research into your goals, users, and constraints. I map out the problem space before writing a single line of code.",
    tags: ["Strategy", "Research", "Architecture"],
  },
  {
    num: "02",
    title: "Design",
    description:
      "Wireframes to high-fidelity in Figma. Every layout decision is intentional — typography, spacing, and motion all planned upfront.",
    tags: ["Figma", "Motion", "Systems"],
  },
  {
    num: "03",
    title: "Build",
    description:
      "Clean, typed, performant code. Accessibility is standard, not optional. Every animation is crafted — not generated.",
    tags: ["Next.js", "TypeScript", "GSAP"],
  },
  {
    num: "04",
    title: "Launch",
    description:
      "CI/CD pipelines, automated testing, and continuous monitoring. Shipped isn't done — I iterate based on real usage data.",
    tags: ["Vercel", "Testing", "Analytics"],
  },
] as const;

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* ── Header ── */
      gsap.from(".process-header", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 76%",
        },
      });

      /* ── Connecting line draw ── */
      gsap.from(".process-connector", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 70%",
        },
      });

      /* ── Step cards ── */
      gsap.from(".process-step", {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 74%",
        },
      });

      /* ── Number counter effect on scroll ── */
      gsap.utils.toArray<HTMLElement>(".process-num").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      className="border-[var(--border)] border-t px-6 py-24 md:px-10 md:py-36"
      id="process"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-[1600px]">
        {/* ── Header ── */}
        <div className="process-header mb-16 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
          <div>
            <span className="section-label mb-3 block">How I Work</span>
            <h2
              className="font-display font-medium text-[var(--text)] leading-[1.04]"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            >
              Process as
              <br />
              <em className="text-[var(--accent)]">deliberate craft.</em>
            </h2>
          </div>
          <p className="max-w-xs font-light text-[var(--text-muted)] text-sm leading-[1.8] md:text-right">
            Every project follows a repeatable framework —{" "}
            <br className="hidden md:block" />
            flexible enough to adapt, rigorous enough to deliver.
          </p>
        </div>

        {/* ── Steps ── */}
        <div className="relative">
          {/* Horizontal connector — desktop only */}
          <div className="process-connector absolute top-[2.15rem] right-[2.5rem] left-[2.5rem] hidden h-px bg-[var(--border)] md:block" />

          <div className="process-grid grid grid-cols-1 gap-px bg-[var(--border)] md:grid-cols-4 md:gap-8 md:bg-transparent">
            {STEPS.map(({ num, title, description, tags }) => (
              <div
                className="process-step group relative bg-[var(--bg)] p-8 md:bg-transparent md:p-0"
                key={num}
              >
                {/* Number — sits on the connector line on desktop */}
                <div className="relative mb-8 md:mb-10">
                  <span className="process-num relative z-10 inline-flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] font-mono text-[var(--text-muted)] text-xs transition-all duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                    {num}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="mb-3 font-display font-medium text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--accent)]"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                >
                  {title}
                </h3>

                {/* Description */}
                <p className="mb-6 font-light text-[var(--text-muted)] text-sm leading-[1.8]">
                  {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      className="section-label rounded-full border border-[var(--border)] px-2 py-1"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
