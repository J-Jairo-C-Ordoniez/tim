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

      return () => timeline.scrollTrigger?.kill();
    },
    { scope: container, dependencies: [enabled] },
  );

  return (
    <section
      ref={container}
      className="relative h-svh w-full overflow-hidden bg-background"
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
