"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lastShowData } from "@/features/lastShow/data/lastShowData";
import LastShowClosingTitleFrame from "@/features/lastShow/ui/LastShowClosingTitleFrame";
import LastShowDateFrame from "@/features/lastShow/ui/LastShowDateFrame";
import LastShowQuoteFrame from "@/features/lastShow/ui/LastShowQuoteFrame";

gsap.registerPlugin(ScrollTrigger);

type LastShowMemorialSceneProps = {
  enabled: boolean;
};

export default function LastShowMemorialScene({ enabled }: LastShowMemorialSceneProps) {
  const container = useRef<HTMLElement>(null);
  const frame1Ref = useRef<HTMLDivElement>(null);
  const frame2Ref = useRef<HTMLDivElement>(null);
  const frame3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!enabled || !container.current) return;

      const f1 = frame1Ref.current;
      const f2 = frame2Ref.current;
      const f3 = frame3Ref.current;
      if (!f1 || !f2 || !f3) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set([f1, f2, f3], { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set([f1, f2, f3], { autoAlpha: 0, y: 35, scale: 0.95 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=310%",
          pin: true,
          pinSpacing: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(f1, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" })
        .to(f1, { autoAlpha: 1, y: 0, duration: 2 })
        .to(f1, { autoAlpha: 0, y: -28, scale: 1.04, duration: 0.9, ease: "power2.in" })
        .to({}, { duration: 0.3 })
        .to(f2, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out" })
        .to(f2, { autoAlpha: 1, y: 0, duration: 2.4 })
        .to(f2, { autoAlpha: 0, y: -28, scale: 1.04, duration: 0.9, ease: "power2.in" })
        .to({}, { duration: 0.3 })
        .to(f3, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" })
        .to(f3, { autoAlpha: 1, y: 0, duration: 2.2 });

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
      aria-label="Avicii last show closing"
    >
      <LastShowDateFrame frameRef={frame1Ref} />
      <LastShowQuoteFrame frameRef={frame2Ref} quote={lastShowData.memorial.quote} />
      <LastShowClosingTitleFrame frameRef={frame3Ref} />
    </section>
  );
}
