"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TestimonialPart1Frame from "@/features/testimonial/ui/TestimonialPart1Frame";
import TestimonialPart2Frame from "@/features/testimonial/ui/TestimonialPart2Frame";
import TestimonialPart3Frame from "@/features/testimonial/ui/TestimonialPart3Frame";

gsap.registerPlugin(ScrollTrigger);

type TestimonialQuoteSceneProps = {
  enabled: boolean;
};

export default function TestimonialQuoteScene({ enabled }: TestimonialQuoteSceneProps) {
  const container = useRef<HTMLElement>(null);
  const part1Ref = useRef<HTMLDivElement>(null);
  const part2Ref = useRef<HTMLDivElement>(null);
  const part3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!enabled || !container.current) return;

      const p1 = part1Ref.current;
      const p2 = part2Ref.current;
      const p3 = part3Ref.current;
      if (!p1 || !p2 || !p3) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set([p1, p2, p3], { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set([p1, p2, p3], { autoAlpha: 0, y: 35, scale: 0.95 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=320%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(p1, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" })
        .to(p1, { autoAlpha: 1, y: 0, duration: 2.2 })
        .to(p1, { autoAlpha: 0, y: -30, scale: 1.04, duration: 0.9, ease: "power2.in" })
        .to({}, { duration: 0.4 })
        .to(p2, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out" })
        .to(p2, { autoAlpha: 1, y: 0, duration: 2.8 })
        .to(p2, { autoAlpha: 0, y: -30, scale: 1.04, duration: 0.9, ease: "power2.in" })
        .to({}, { duration: 0.4 })
        .to(p3, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" })
        .to(p3, { autoAlpha: 1, y: 0, duration: 2.2 })
        .to(p3, { autoAlpha: 0, y: -30, scale: 1.04, duration: 0.9, ease: "power2.in" });

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
      aria-label="Listener testimony"
    >
      <TestimonialPart1Frame frameRef={part1Ref} />
      <TestimonialPart2Frame frameRef={part2Ref} />
      <TestimonialPart3Frame frameRef={part3Ref} />
    </section>
  );
}
