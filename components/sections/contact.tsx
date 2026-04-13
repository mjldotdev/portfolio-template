"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import Magnetic from "@/components/magnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SOCIALS = [
  { label: "GitHub", href: "https://github.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
] as const;

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* ── Large display lines ── */
      gsap.from(".cta-line", {
        yPercent: 110,
        opacity: 0,
        duration: 1.15,
        stagger: 0.11,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".cta-block",
          start: "top 72%",
        },
      });

      /* ── Sub elements ── */
      gsap.from(".cta-sub", {
        y: 22,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-bottom",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      className="border-[var(--border)] border-t px-6 py-24 md:px-10 md:py-36"
      id="contact"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Label */}
        <span className="cta-sub section-label mb-12 block md:mb-16">
          03 — Contact
        </span>

        {/* ── Big CTA type ── */}
        <div className="cta-block mb-20 space-y-[-0.05em] md:mb-28">
          {[
            { text: "Let's Build", italic: false, muted: false },
            { text: "Something", italic: true, muted: false },
            { text: "Remarkable.", italic: false, muted: true },
          ].map(({ text, italic, muted }) => (
            <div className="overflow-hidden" key={text}>
              <h2
                className={[
                  "cta-line font-display font-medium leading-[0.93] will-change-transform",
                  italic ? "text-[var(--accent)] italic" : "",
                  muted
                    ? "text-[var(--text-muted)]"
                    : italic
                      ? ""
                      : "text-[var(--text)]",
                ].join(" ")}
                style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
              >
                {text}
              </h2>
            </div>
          ))}
        </div>

        {/* ── Bottom grid ── */}
        <div className="cta-bottom grid items-end gap-12 md:grid-cols-2 md:gap-24">
          {/* Email */}
          <div className="cta-sub">
            <span className="section-label mb-3 block">Say hello</span>
            <Magnetic strength={0.12}>
              <a
                className="link-fx font-display font-medium text-[var(--text)] transition-colors duration-300 hover:text-[var(--accent)]"
                href="mailto:hello@portfolio.dev"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)" }}
              >
                hello@portfolio.dev
              </a>
            </Magnetic>
          </div>

          {/* Socials */}
          <div className="cta-sub flex flex-wrap gap-3 md:justify-end">
            {SOCIALS.map(({ label, href }) => (
              <a
                className="section-label hover:!text-[var(--accent)] flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent-dim)]"
                href={href}
                key={label}
                rel="noopener noreferrer"
                target="_blank"
              >
                {label}
                <svg
                  className="h-2.5 w-2.5 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" x2="21" y1="14" y2="3" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
