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

  useGSAP(
    () => {
      if (!enabled || !container.current) return;

      const f1 = frame1Ref.current;
      if (!f1) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(f1, { autoAlpha: 0, y: 35, scale: 0.95 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "+=140%",
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(f1, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" })
          .to(f1, { autoAlpha: 1, y: 0, duration: 2.4 })
          .to(f1, { autoAlpha: 0, y: -30, scale: 1.04, duration: 0.9, ease: "power2.in" });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(f1, { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform,opacity" });
      });

      return () => mm.revert();
    },
    { scope: container, dependencies: [enabled] },
  );

  return (
    <section
      ref={container}
      className="relative flex motion-safe:h-svh motion-safe:overflow-hidden motion-reduce:min-h-svh motion-reduce:h-auto motion-reduce:py-24 w-full items-center justify-center bg-background"
      aria-label="Inspiration prelude"
    >
      <InspirationIntroFrame
        frame1Ref={frame1Ref}
        statement={inspirationData.introStatement}
      />
    </section>
  );
}
