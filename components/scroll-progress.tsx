"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
        },
      }
    );
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 left-0 z-[1000] h-[1px]"
    >
      <div
        className="h-full w-full origin-left bg-[var(--accent)] will-change-transform"
        ref={barRef}
        style={{ scaleX: 0 }}
      />
    </div>
  );
}
