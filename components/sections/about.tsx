"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 40, suffix: "+", label: "Projects Shipped" },
  { value: 12, suffix: "k", label: "GitHub Stars" },
] as const;

const SKILLS = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "GSAP",
  "Framer Motion",
  "Tailwind CSS",
  "Figma",
  "PostgreSQL",
  "Prisma",
  "tRPC",
  "Vercel",
  "Docker",
  "GraphQL",
  "Turborepo",
] as const;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* ── Text blocks ── */
      gsap.from(".about-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 74%",
        },
      });

      /* ── Stat count-up ── */
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.target ?? 0);
        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: "top 82%",
          once: true,
          onEnter() {
            gsap.to(obj, {
              val: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate() {
                el.textContent = Math.round(obj.val).toString();
              },
            });
          },
        });
      });

      /* ── Skill tags ── */
      gsap.from(".skill-chip", {
        y: 18,
        opacity: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 82%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      className="border-[var(--border)] border-t px-6 py-24 md:px-10 md:py-36"
      id="about"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Label */}
        <span className="about-reveal section-label mb-12 block md:mb-18">
          02 — About
        </span>

        <div className="grid items-start gap-14 md:grid-cols-[1fr_1fr] md:gap-28">
          {/* ── Left ── */}
          <div>
            <blockquote
              className="about-reveal mb-8 font-display font-light text-[var(--text)] leading-[1.28]"
              style={{ fontSize: "clamp(1.65rem, 3vw, 2.5rem)" }}
            >
              "I believe great software is{" "}
              <em className="font-medium text-[var(--accent)] not-italic">
                felt before it's understood
              </em>
              — crafted at the intersection of design and engineering."
            </blockquote>

            <div className="about-reveal max-w-[400px] space-y-4 font-light text-[0.9375rem] text-[var(--text-muted)] leading-[1.8]">
              <p>
                Full-stack developer with a designer's eye, building products
                that prioritise craft, performance, and user delight. I've
                shipped work for startups and agencies across Southeast Asia and
                Europe.
              </p>
              <p>
                When not writing code I'm exploring experimental typography,
                building creative tools, or contributing to open-source.
              </p>
            </div>

            <div className="about-reveal mt-10 flex items-center gap-5">
              <a
                className="section-label link-fx hover:!text-[var(--accent)] transition-colors duration-300"
                href="/resume.pdf"
              >
                Download CV
              </a>
              <span className="text-[var(--border)]">—</span>
              <a
                className="section-label link-fx hover:!text-[var(--accent)] transition-colors duration-300"
                href="https://github.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              <a
                className="section-label link-fx hover:!text-[var(--accent)] transition-colors duration-300"
                href="https://linkedin.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* ── Right ── */}
          <div className="space-y-14">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {STATS.map(({ value, suffix, label }) => (
                <div className="about-reveal" key={label}>
                  <div className="flex items-baseline gap-0.5">
                    <span
                      className="stat-num font-display font-light text-[var(--text)]"
                      data-target={value}
                      style={{ fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)" }}
                    >
                      {value}
                    </span>
                    <span
                      className="font-display font-light text-[var(--accent)]"
                      style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                    >
                      {suffix}
                    </span>
                  </div>
                  <span className="section-label mt-1 block">{label}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--border)]" />

            {/* Skills */}
            <div>
              <span className="section-label mb-4 block">Stack / Tools</span>
              <div className="skills-grid flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span
                    className="skill-chip section-label hover:!text-[var(--accent)] cursor-default rounded-full border border-[var(--border)] px-3 py-1.5 transition-all duration-300 hover:border-[var(--accent)]"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
