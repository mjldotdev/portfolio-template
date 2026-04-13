"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Abort on touch devices
    if (typeof window === "undefined") {
      return;
    }
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!(dot && ring)) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        setVisible(true);
      }

      // Dot follows instantly
      gsap.set(dot, { x: e.clientX, y: e.clientY });

      // Ring follows with elastic lag
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.55,
        ease: "power3.out",
      });
    };

    const onHoverIn = () => {
      gsap.to(ring, {
        scale: 2.8,
        borderColor: "var(--accent)",
        opacity: 0.35,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 0.4,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const onHoverOut = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "var(--accent)",
        opacity: 0.55,
        duration: 0.4,
        ease: "elastic.out(1, 0.6)",
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Attach hover effects to interactive elements
    const attachHover = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
        el.addEventListener("mouseenter", onHoverIn);
        el.addEventListener("mouseleave", onHoverOut);
      });
    };

    attachHover();

    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      observer.disconnect();
    };
  }, [visible]);

  return (
    <>
      {/* Centre dot */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-opacity duration-300"
        ref={dotRef}
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div className="h-[5px] w-[5px] rounded-full bg-white" />
      </div>

      {/* Trailing ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9997] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        ref={ringRef}
        style={{ opacity: visible ? 0.55 : 0 }}
      >
        <div className="h-9 w-9 rounded-full border border-[var(--accent)]" />
      </div>
    </>
  );
}
