"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/*
 * Drop your video file at /public/video/hero.mp4 (and optionally
 * /public/video/hero.webm for broader codec support).
 *
 * Free cinematic stock footage sources:
 *   • https://www.pexels.com/videos/          (free, high-res)
 *   • https://mixkit.co/free-stock-video/     (free)
 *   • https://www.coverr.co/                  (free)
 *
 * Recommended export settings:
 *   Format : H.264 MP4 (primary) + VP9 WebM (fallback)
 *   Res    : 1920×1080 minimum, 3840×2160 ideal
 *   Bitrate: ~4–8 Mbps for web (use Handbrake / ffmpeg to compress)
 */
const VIDEO_SRC = "/videos/hero-background.mp4";
const VIDEO_WEBM = "/video/hero.webm"; // optional WebM fallback
const VIDEO_POSTER = "/video/hero-poster.jpg"; // first-frame still shown before video loads

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [muted, setMuted] = useState(true);

  /* Fade video in once it has enough data to play smoothly */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const onCanPlay = () => setVideoReady(true);

    // If already ready (cached)
    if (video.readyState >= 3) {
      setVideoReady(true);
    } else {
      video.addEventListener("canplaythrough", onCanPlay);
    }

    return () => video.removeEventListener("canplaythrough", onCanPlay);
  }, []);

  useGSAP(
    () => {
      /* ── Cinematic bars animate open on load ── */
      gsap.fromTo(
        ".hero-bar-top, .hero-bar-bottom",
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 1.6,
          delay: 0.15,
          ease: "expo.inOut",
          stagger: 0,
        }
      );

      /* ── Staggered headline reveal ── */
      gsap
        .timeline({ delay: 0.55 })
        .from(".hero-line", {
          yPercent: 115,
          opacity: 0,
          rotationX: -12,
          duration: 1.15,
          stagger: 0.09,
          ease: "expo.out",
          transformPerspective: 900,
        })
        .from(
          ".hero-divider",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.05,
            ease: "expo.inOut",
          },
          "-=0.55"
        )
        .from(
          ".hero-sub > *",
          {
            y: 18,
            opacity: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .from(
          metaRef.current,
          { opacity: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );

      /* ── Scroll: slow video parallax (slower than text for depth) ── */
      gsap.to(videoWrapRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ── Scroll: text drifts up faster than video ── */
      gsap.to(displayRef.current, {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ── Scroll: overlay opacity increases as user scrolls away ── */
      gsap.to(".hero-video-overlay", {
        opacity: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pt-32 pb-20 md:px-10 md:pb-28"
      id="hero"
      ref={containerRef}
    >
      {/* ══════════════════════════════════════════
          CINEMATIC VIDEO BACKGROUND
      ══════════════════════════════════════════ */}

      {/* Parallax video wrapper — oversized so parallax never shows edges */}
      <div
        aria-hidden="true"
        className="absolute inset-[-12%] will-change-transform"
        ref={videoWrapRef}
      >
        <video
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted
          playsInline
          poster={VIDEO_POSTER}
          preload="auto"
          ref={videoRef}
          style={{
            opacity: videoReady ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        >
          {/* WebM first — better compression, modern browsers */}
          <source src={VIDEO_WEBM} type="video/webm" />
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        {/*
         * Poster image shown instantly before the video stream loads.
         * Prevents a blank flash — critical for perceived performance.
         */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${VIDEO_POSTER})`,
            opacity: videoReady ? 0 : 1,
            transition: "opacity 1.2s ease",
          }}
        />
      </div>

      {/* ── Multi-layer cinematic overlay system ── */}

      {/* 1. Base dark scrim — tones the whole frame */}
      <div
        aria-hidden="true"
        className="hero-video-overlay pointer-events-none absolute inset-0 bg-[var(--bg)]"
        style={{ opacity: 0.52 }}
      />

      {/* 2. Bottom gradient — text legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[75%]"
        style={{
          background:
            "linear-gradient(to top, var(--bg) 0%, var(--bg) 15%, transparent 100%)",
        }}
      />

      {/* 3. Top gradient — nav area */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[30%]"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg) 0%, transparent 100%)",
        }}
      />

      {/* 4. Side vignettes — cinematic framing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* ── Cinematic letterbox bars (animate open on load) ── */}
      <div
        aria-hidden="true"
        className="hero-bar-top pointer-events-none absolute inset-x-0 top-0 z-[2] h-[10vh] origin-top bg-[var(--bg)]"
      />
      <div
        aria-hidden="true"
        className="hero-bar-bottom pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[10vh] origin-bottom bg-[var(--bg)]"
      />

      {/* ══════════════════════════════════════════
          CONTENT LAYER (z-10 and above)
      ══════════════════════════════════════════ */}

      {/* ── Corner metadata ── */}
      <div
        className="pointer-events-none absolute top-[7.5rem] right-6 z-10 flex flex-col items-end gap-1 md:right-10"
        ref={metaRef}
      >
        <span className="section-label text-white/50">Manila, PH</span>
        <span className="section-label text-white/50">
          © {new Date().getFullYear()}
        </span>
      </div>

      {/* ── Mute toggle ── */}
      <button
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="group absolute top-[7.5rem] left-6 z-10 flex items-center gap-2 md:left-10"
        onClick={toggleMute}
      >
        <span className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-white/5 text-white/50 backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
          {muted ? <MuteIcon /> : <UnmuteIcon />}
        </span>
        <span className="section-label text-white/40 transition-colors duration-300 group-hover:text-[var(--accent)]">
          {muted ? "Sound off" : "Sound on"}
        </span>
      </button>

      {/* ── Vertical side label ── */}
      <div className="pointer-events-none absolute bottom-20 left-6 z-10 md:bottom-28 md:left-10">
        <span
          className="section-label hidden text-white/40 xl:block"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Creative Developer
        </span>
      </div>

      {/* ── Display headline ── */}
      <div
        className="relative z-10 mx-auto w-full max-w-[1600px] will-change-transform"
        ref={displayRef}
      >
        {/* Line 1 */}
        <div className="overflow-hidden">
          <h1
            className="hero-line font-display font-medium text-[var(--text)] leading-[0.92]"
            style={{ fontSize: "clamp(3.8rem, 11.5vw, 10rem)" }}
          >
            Crafting Digital
          </h1>
        </div>

        {/* Line 2 */}
        <div className="overflow-hidden">
          <h1
            className="hero-line font-display font-medium text-[var(--accent)] italic leading-[0.92]"
            style={{ fontSize: "clamp(3.8rem, 11.5vw, 10rem)" }}
          >
            Experiences
          </h1>
        </div>

        {/* Line 3 */}
        <div className="overflow-hidden">
          <h1
            className="hero-line font-display font-medium text-[var(--text)]/40 leading-[0.92]"
            style={{ fontSize: "clamp(3.8rem, 11.5vw, 10rem)" }}
          >
            That Matter.
          </h1>
        </div>

        {/* Divider */}
        <div className="hero-divider mt-8 h-px bg-white/10 md:mt-12" />

        {/* Sub-row */}
        <div className="hero-sub mt-7 flex flex-col justify-between gap-7 sm:flex-row sm:items-end md:mt-9">
          <p className="max-w-[340px] font-light text-[var(--text)]/50 text-sm leading-[1.75] md:text-[0.9375rem]">
            Full-stack developer &amp; designer obsessed with performance,
            motion, and the craft of exceptional web experiences.
          </p>

          <div className="flex items-center gap-5">
            <a
              className="group section-label !text-[var(--text)]/60 hover:!text-[var(--text)] flex items-center gap-3 transition-colors duration-300"
              href="#work"
            >
              <span className="block h-px w-8 bg-current transition-[width] duration-300 group-hover:w-14" />
              View Work
            </a>

            <a
              className="section-label !text-[var(--bg)] rounded-full bg-[var(--accent)] px-5 py-2.5 transition-opacity duration-300 hover:opacity-80"
              href="#contact"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="pointer-events-none absolute right-6 bottom-8 z-10 flex flex-col items-center gap-2 opacity-35 md:right-10">
        <span
          className="section-label text-white"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div
          className="h-10 w-px origin-top bg-white"
          style={{ animation: "scaleY 2s ease-in-out infinite alternate" }}
        />
      </div>
    </section>
  );
}

/* ── Icon helpers ── */
function MuteIcon() {
  return (
    <svg
      fill="none"
      height="11"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="11"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" x2="17" y1="9" y2="15" />
      <line x1="17" x2="23" y1="9" y2="15" />
    </svg>
  );
}

function UnmuteIcon() {
  return (
    <svg
      fill="none"
      height="11"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="11"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}
