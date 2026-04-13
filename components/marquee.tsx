"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MarqueeProps {
  className?: string;
  items: readonly string[];
  reverse?: boolean;
  separator?: string;
  speed?: number; // seconds for one full pass, default 28
}

export default function Marquee({
  items,
  speed = 28,
  reverse = false,
  className = "",
  separator = "◆",
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  /* Pause on scroll-into-view, resume as user leaves — optional GSAP enhancement */
  useGSAP(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    ScrollTrigger.create({
      trigger: track,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => (track.style.animationPlayState = "running"),
      onLeave: () => (track.style.animationPlayState = "paused"),
      onEnterBack: () => (track.style.animationPlayState = "running"),
      onLeaveBack: () => (track.style.animationPlayState = "paused"),
    });
  }, []);

  /* Duplicate for seamless loop */
  const doubled = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden border-[var(--border)] border-y py-4 ${className}`}
    >
      <div
        className="flex w-max whitespace-nowrap will-change-transform"
        ref={trackRef}
        style={{
          animation: `marquee-scroll ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
          animationPlayState: "running",
        }}
      >
        {doubled.map((item, i) => (
          <span className="flex items-center" key={i}>
            <span className="section-label hover:!text-[var(--accent)] cursor-default px-4 transition-colors duration-200">
              {item}
            </span>
            <span className="section-label text-[var(--accent)] opacity-60">
              {separator}
            </span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0) }
          to   { transform: translateX(-50%) }
        }
      `}</style>
    </div>
  );
}
