"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import MobileNav from "@/components/layout/mobile-nav";
import Magnetic from "@/components/magnetic";
import ScrollProgress from "@/components/scroll-progress";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -24,
      opacity: 0,
      duration: 1.1,
      delay: 0.6,
      ease: "power3.out",
      clearProps: "opacity,transform",
    });
  }, []);

  return (
    <>
      <ScrollProgress />

      <header
        className={[
          "fixed top-0 right-0 left-0 z-[999] px-6 transition-all duration-500 md:px-10",
          scrolled
            ? "border-[var(--border)] border-b bg-[var(--bg)]/80 py-4 backdrop-blur-xl"
            : "py-7",
        ].join(" ")}
        ref={navRef}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between">
          {/* Logo */}
          <Magnetic strength={0.3}>
            <a
              className="font-display font-medium text-[1.35rem] text-[var(--text)] tracking-tight transition-colors duration-300 hover:text-[var(--accent)]"
              href="/"
            >
              <em>M.</em>
              <span className="text-[var(--accent)] not-italic">dev</span>
            </a>
          </Magnetic>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  className="section-label link-fx hover:!text-[var(--text)] transition-colors duration-300"
                  href={href}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Availability pill */}
            <div className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="section-label !text-emerald-600 dark:!text-emerald-400">
                Available
              </span>
            </div>

            {/* Theme toggle - desktop only */}
            {mounted && (
              <Magnetic strength={0.5}>
                <button
                  aria-label="Toggle theme"
                  className="hidden h-8 w-8 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] md:grid"
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                >
                  {resolvedTheme === "dark" ? (
                    <svg
                      fill="none"
                      height="13"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="13"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" x2="12" y1="1" y2="3" />
                      <line x1="12" x2="12" y1="21" y2="23" />
                      <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
                      <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
                      <line x1="1" x2="3" y1="12" y2="12" />
                      <line x1="21" x2="23" y1="12" y2="12" />
                      <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
                      <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
                    </svg>
                  ) : (
                    <svg
                      fill="none"
                      height="13"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="13"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </button>
              </Magnetic>
            )}

            {/* Mobile hamburger (owns its own overlay) */}
            <MobileNav />
          </div>
        </nav>
      </header>
    </>
  );
}
