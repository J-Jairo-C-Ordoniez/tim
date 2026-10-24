"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type LyricTransitionSceneProps = {
  enabled: boolean;
};

export default function LyricTransitionScene({ enabled }: LyricTransitionSceneProps) {
  const container = useRef<HTMLElement>(null);
  const phrase1Ref = useRef<HTMLHeadingElement>(null);
  const phrase2Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!enabled || !container.current) return;

      const p1 = phrase1Ref.current;
      const p2 = phrase2Ref.current;
      if (!p1 || !p2) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set([p1, p2], { autoAlpha: 1 });
        return;
      }

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

      return () => {
        tl.scrollTrigger?.kill();
      };
    },
    { scope: container, dependencies: [enabled] },
  );

  return (
    <section
      ref={container}
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-background px-6 sm:px-12"
      aria-label="Lyric transition"
    >
      <div className="relative flex h-48 w-full max-w-5xl items-center justify-center text-center">
        <h2
          ref={phrase1Ref}
          className="absolute inset-0 flex items-center justify-center text-center text-3xl font-light tracking-tight leading-relaxed text-foreground sm:text-5xl md:text-6xl lg:text-7xl will-change-transform"
        >
          might be time
        </h2>
        <h2
          ref={phrase2Ref}
          className="absolute inset-0 flex items-center justify-center text-center text-3xl font-light tracking-tight leading-relaxed text-foreground sm:text-5xl md:text-6xl lg:text-7xl will-change-transform"
        >
          for a better day
        </h2>
      </div>
    </section>
  );
}
