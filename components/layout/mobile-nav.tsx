"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

const SOCIALS = [
  { label: "GitHub", href: "https://github.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
] as const;

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Prevents hydration mismatch
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Safely mark as mounted so we can use createPortal exclusively on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Fix 1: Properly lock both body and html scroll */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  /* Build GSAP timeline once portal mounts */
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) {
        return;
      }

      tlRef.current = gsap
        .timeline({ paused: true })
        .set(overlay, { display: "flex" })
        .fromTo(
          overlay,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.65, ease: "expo.inOut" }
        )
        .from(
          ".mnav-link",
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: "expo.out",
          },
          "-=0.25"
        )
        .from(
          ".mnav-footer > *",
          {
            y: 16,
            opacity: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.3"
        );
    },
    // Pass dependencies and scope so GSAP attaches strictly to this overlay component's children
    { scope: overlayRef, dependencies: [mounted] }
  );

  const openMenu = () => {
    setOpen(true);
    tlRef.current?.play();
  };

  const closeMenu = () => {
    tlRef.current?.reverse().then(() => {
      setOpen(false);
    });
  };

  const handleLink = (href: string) => {
    closeMenu();
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  // Extracting overlay into a constant to wrap it cleanly in a portal
  const overlayContent = (
    <div
      aria-hidden={!open}
      aria-modal={open}
      // Fix 2: Explicitly sizing to 100dvh avoids bottom bar issues on mobile browsers
      className="fixed top-0 left-0 z-[150] hidden h-[100dvh] w-full flex-col bg-[var(--bg)] px-6 pt-28 pb-12"
      ref={overlayRef}
      role="dialog"
    >
      {/* Links */}
      <nav className="flex flex-1 flex-col justify-center gap-2">
        {NAV_LINKS.map(({ label, href }) => (
          <div className="overflow-hidden py-1" key={href}>
            <button
              className="mnav-link block text-left font-display font-medium text-[var(--text)] leading-none transition-colors duration-300 will-change-transform hover:text-[var(--accent)]"
              onClick={() => handleLink(href)}
              style={{ fontSize: "clamp(3rem, 12vw, 6rem)" }}
            >
              {label}
            </button>
          </div>
        ))}
      </nav>

      {/* Footer strip */}
      <div className="mnav-footer flex flex-col gap-6 border-[var(--border)] border-t pt-8">
        <div className="flex flex-wrap gap-4">
          {SOCIALS.map(({ label, href }) => (
            <a
              className="section-label hover:!text-[var(--accent)] transition-colors duration-300"
              href={href}
              key={label}
              onClick={closeMenu}
              rel="noopener noreferrer"
              target="_blank"
            >
              {label}
            </a>
          ))}
        </div>
        <span className="section-label">hello@portfolio.dev</span>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Hamburger trigger — shown only on mobile ── */}
      <button
        aria-label={open ? "Close navigation" : "Open navigation"}
        className="relative z-[200] flex h-8 w-8 flex-col items-center justify-center gap-[5px] p-1 md:hidden"
        onClick={open ? closeMenu : openMenu}
      >
        <span
          className="block h-px w-5 origin-center bg-[var(--text)] transition-all duration-300"
          style={open ? { transform: "translateY(6px) rotate(45deg)" } : {}}
        />
        <span
          className="block h-px w-5 bg-[var(--text)] transition-all duration-300"
          style={open ? { opacity: 0, transform: "scaleX(0)" } : {}}
        />
        <span
          className="block h-px w-5 origin-center bg-[var(--text)] transition-all duration-300"
          style={open ? { transform: "translateY(-6px) rotate(-45deg)" } : {}}
        />
      </button>

      {/* ── Fullscreen overlay (Safely Portaled out of transform traps) ── */}
      {mounted ? createPortal(overlayContent, document.body) : null}
    </>
  );
}
