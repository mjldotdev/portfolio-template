"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type ReactNode, useRef } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  /** 0–1 pull strength. Default 0.4 */
  strength?: number;
}

export default function Magnetic({
  children,
  className = "",
  strength = 0.4,
  disabled = false,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (disabled) {
        return;
      }
      const el = ref.current;
      if (!el) {
        return;
      }

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        gsap.to(el, {
          x: (e.clientX - cx) * strength,
          y: (e.clientY - cy) * strength,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.45)",
        });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { dependencies: [strength, disabled] }
  );

  return (
    <div
      className={`inline-block will-change-transform ${className}`}
      ref={ref}
    >
      {children}
    </div>
  );
}
