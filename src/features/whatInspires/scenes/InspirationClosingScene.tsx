"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { inspirationData } from "@/features/whatInspires/data/inspirationData";
import InspirationLegacyQuoteFrame from "@/features/whatInspires/ui/InspirationLegacyQuoteFrame";
import InspirationSparkFrame from "@/features/whatInspires/ui/InspirationSparkFrame";

gsap.registerPlugin(ScrollTrigger);

type InspirationClosingSceneProps = {
  enabled: boolean;
};

export default function InspirationClosingScene({ enabled }: InspirationClosingSceneProps) {
  const container = useRef<HTMLElement>(null);
  const frame1Ref = useRef<HTMLDivElement>(null);
  const frame2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!enabled || !container.current) return;

      const f1 = frame1Ref.current;
      const f2 = frame2Ref.current;
      if (!f1 || !f2) return;

      gsap.set([f1, f2], { autoAlpha: 0, y: 35, scale: 0.95 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=280%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(f1, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" })
        .to(f1, { autoAlpha: 1, y: 0, duration: 2.6 })
        .to(f1, { autoAlpha: 0, y: -28, scale: 1.04, duration: 0.9, ease: "power2.in" })
        .to({}, { duration: 0.4 })
        .to(f2, { autoAlpha: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out" })
        .to(f2, { autoAlpha: 1, y: 0, duration: 3 });

      return () => {
        tl.scrollTrigger?.kill();
      };
    },
    { scope: container, dependencies: [enabled] },
  );

  return (
    <section
      ref={container}
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-background"
      aria-label="What inspires: Final legacy"
    >
      <InspirationLegacyQuoteFrame
        frameRef={frame1Ref}
        quote={inspirationData.closing.quote}
      />
      <InspirationSparkFrame
        frameRef={frame2Ref}
        name={inspirationData.closing.name}
        dates={inspirationData.closing.dates}
      />
    </section>
  );
}
