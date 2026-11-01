"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type LyricTransitionSceneProps = {
  enabled: boolean;
};

const phraseClass =
  "text-center text-3xl font-light tracking-tight leading-relaxed text-foreground sm:text-5xl md:text-6xl lg:text-7xl will-change-transform";

export default function LyricTransitionScene({ enabled }: LyricTransitionSceneProps) {
  const container = useRef<HTMLElement>(null);

  // Refs for the normal (motion-safe) pinned overlay
  const phrase1NormalRef = useRef<HTMLHeadingElement>(null);
  const phrase2NormalRef = useRef<HTMLHeadingElement>(null);

  // Refs for the reduced-motion two-viewport layout
  const phrase1ReducedRef = useRef<HTMLHeadingElement>(null);
  const phrase2ReducedRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!enabled || !container.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const p1 = phrase1NormalRef.current;
        const p2 = phrase2NormalRef.current;
        if (!p1 || !p2) return;

        gsap.set(p1, { autoAlpha: 0, y: 35, scale: 0.94 });
        gsap.set(p2, { autoAlpha: 0, y: 35, scale: 0.94 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(p1, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" })
          .to(p1, { autoAlpha: 1, y: 0, duration: 1 })
          .to(p1, { autoAlpha: 0, y: -25, scale: 1.05, duration: 0.8, ease: "power2.in" })
          .to(p2, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }, ">-0.1")
          .to(p2, { autoAlpha: 1, y: 0, duration: 1.2 })
          .to(p2, { autoAlpha: 0, y: -25, scale: 1.05, duration: 0.8, ease: "power2.in" });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const p1 = phrase1ReducedRef.current;
        const p2 = phrase2ReducedRef.current;
        if (!p1 || !p2) return;

        // Subtle time-based entrance per phrase — no scrub, smaller y, no scale change
        gsap.set(p1, { autoAlpha: 0, y: 14 });
        gsap.set(p2, { autoAlpha: 0, y: 14 });

        ScrollTrigger.create({
          trigger: p1,
          start: "top 75%",
          onEnter: () => {
            gsap.to(p1, { autoAlpha: 1, y: 0, duration: 1.6, ease: "power2.out" });
          },
        });

        ScrollTrigger.create({
          trigger: p2,
          start: "top 75%",
          onEnter: () => {
            gsap.to(p2, { autoAlpha: 1, y: 0, duration: 1.6, ease: "power2.out" });
          },
        });
      });

      return () => mm.revert();
    },
    { scope: container, dependencies: [enabled] },
  );

  return (
    <section
      ref={container}
      className="relative w-full bg-background motion-safe:h-svh motion-safe:overflow-hidden"
      aria-label="Lyric transition"
    >
      {/* ── Normal mode: pinned viewport, phrases overlap and animate in sequence ── */}
      <div className="motion-safe:absolute motion-safe:inset-0 motion-safe:flex motion-safe:items-center motion-safe:justify-center motion-safe:px-6 motion-safe:sm:px-12 motion-reduce:hidden">
        <div className="relative h-48 w-full max-w-5xl">
          <h2
            ref={phrase1NormalRef}
            className={`absolute inset-0 flex items-center justify-center ${phraseClass}`}
          >
            might be time
          </h2>
          <h2
            ref={phrase2NormalRef}
            className={`absolute inset-0 flex items-center justify-center ${phraseClass}`}
          >
            for a better day
          </h2>
        </div>
      </div>

      {/* ── Reduced-motion mode: each phrase in its own full viewport ── */}
      <div className="motion-safe:hidden motion-reduce:flex motion-reduce:flex-col motion-reduce:w-full">
        <div className="flex h-svh w-full items-center justify-center px-6 sm:px-12">
          <h2 ref={phrase1ReducedRef} className={`max-w-5xl ${phraseClass}`}>
            might be time
          </h2>
        </div>
        <div className="flex h-svh w-full items-center justify-center px-6 sm:px-12">
          <h2 ref={phrase2ReducedRef} className={`max-w-5xl ${phraseClass}`}>
            for a better day
          </h2>
        </div>
      </div>
    </section>
  );
}
