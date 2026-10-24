"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { inspirationData } from "@/features/whatInspires/data/inspirationData";
import InspirationIntroFrame from "@/features/whatInspires/ui/InspirationIntroFrame";

gsap.registerPlugin(ScrollTrigger);

type InspirationIntroSceneProps = {
  enabled: boolean;
};

export default function InspirationIntroScene({ enabled }: InspirationIntroSceneProps) {
  const container = useRef<HTMLElement>(null);
  const frame1Ref = useRef<HTMLDivElement>(null);
  const frame2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!enabled || !container.current) return;

      const f1 = frame1Ref.current;
      const f2 = frame2Ref.current;
      if (!f1 || !f2) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set([f1, f2], { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set([f1, f2], { autoAlpha: 0, y: 35, scale: 0.95 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=240%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(f1, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" })
        .to(f1, { autoAlpha: 1, y: 0, duration: 2.2 })
        .to(f1, { autoAlpha: 0, y: -30, scale: 1.04, duration: 0.9, ease: "power2.in" })
        .to({}, { duration: 0.4 })
        .to(f2, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out" })
        .to(f2, { autoAlpha: 1, y: 0, duration: 2.4 })
        .to(f2, { autoAlpha: 0, y: -30, scale: 1.04, duration: 0.9, ease: "power2.in" });

      return () => {
        tl.scrollTrigger?.kill();
      };
    },
    { scope: container, dependencies: [enabled] },
  );

  return (
    <section
      ref={container}
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-background px-6 sm:px-12 md:px-20 lg:px-28"
      aria-label="Inspiration prelude"
    >
      <InspirationIntroFrame
        frame1Ref={frame1Ref}
        frame2Ref={frame2Ref}
        phrase1={inspirationData.introPhrases.phrase1}
        phrase2={inspirationData.introPhrases.phrase2}
      />
    </section>
  );
}
