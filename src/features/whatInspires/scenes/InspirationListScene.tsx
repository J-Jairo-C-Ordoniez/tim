"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { inspirationData } from "@/features/whatInspires/data/inspirationData";
import InspirationListFrame from "@/features/whatInspires/ui/InspirationListFrame";

gsap.registerPlugin(ScrollTrigger);

type InspirationListSceneProps = {
  enabled: boolean;
};

export default function InspirationListScene({ enabled }: InspirationListSceneProps) {
  const container = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!enabled || !container.current || !frameRef.current) return;

      const frame = frameRef.current;
      const items = Array.from(frame.querySelectorAll<HTMLElement>("[data-inspiration-list-item]"));

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(items, { autoAlpha: 0, y: 28 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "+=190%",
            pin: true,
            pinSpacing: true,
            scrub: 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(items, { autoAlpha: 1, y: 0, duration: 1.4, stagger: 0.18, ease: "power2.out" })
          .to({}, { duration: 1.8 })
          .to(items, { autoAlpha: 0, y: -20, duration: 0.8, stagger: 0.06, ease: "power2.in" });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(items, { autoAlpha: 1, y: 0, clearProps: "transform,opacity" });
      });

      return () => mm.revert();
    },
    { scope: container, dependencies: [enabled] },
  );

  return (
    <section
      ref={container}
      className="relative motion-safe:h-svh motion-safe:overflow-hidden motion-reduce:min-h-svh motion-reduce:h-auto motion-reduce:py-24 w-full bg-background"
      aria-label="Ways Avicii continues to inspire"
    >
      <InspirationListFrame
        frameRef={frameRef}
        inspirations={inspirationData.inspirations}
        moreLabel={inspirationData.moreLabel}
      />
    </section>
  );
}
