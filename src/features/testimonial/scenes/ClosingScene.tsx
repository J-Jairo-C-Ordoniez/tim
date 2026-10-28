"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClosingPhraseFrame from "@/features/testimonial/ui/ClosingPhraseFrame";
import ClosingPortraitFrame from "@/features/testimonial/ui/ClosingPortraitFrame";

gsap.registerPlugin(ScrollTrigger);

type ClosingSceneProps = {
  enabled: boolean;
};

export default function ClosingScene({ enabled }: ClosingSceneProps) {
  const container = useRef<HTMLElement>(null);
  const phraseWrapRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const photoWrapRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (!enabled || !container.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(phraseWrapRef.current, { autoAlpha: 0 });
        gsap.set([line1Ref.current, line2Ref.current], { autoAlpha: 0, y: 28 });
        gsap.set(photoWrapRef.current, { autoAlpha: 0 });
        gsap.set(imgRef.current, { scale: 1.08 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "+=260%",
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.set(phraseWrapRef.current, { autoAlpha: 1 })
          .to(line1Ref.current, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          })
          .to(
            line2Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.2,
              ease: "power2.out",
            },
            ">-0.4",
          )
          .to({}, { duration: 2.8 })
          .to([line1Ref.current, line2Ref.current], {
            autoAlpha: 0,
            y: -24,
            duration: 1,
            stagger: 0.1,
            ease: "power2.in",
          })
          .set(phraseWrapRef.current, { autoAlpha: 0 })
          .to({}, { duration: 0.8 })
          .to(photoWrapRef.current, {
            autoAlpha: 1,
            duration: 1.6,
            ease: "power2.out",
          })
          .to(
            imgRef.current,
            {
              scale: 1.0,
              duration: 2.2,
              ease: "power1.out",
            },
            "<",
          )
          .to({}, { duration: 2.2 });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [phraseWrapRef.current, line1Ref.current, line2Ref.current, photoWrapRef.current, imgRef.current],
          { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform,opacity" },
        );
      });

      return () => mm.revert();
    },
    { scope: container, dependencies: [enabled] },
  );

  return (
    <section
      ref={container}
      className="relative flex motion-safe:h-svh motion-safe:overflow-hidden motion-reduce:min-h-svh motion-reduce:h-auto motion-reduce:flex-col motion-reduce:py-24 motion-reduce:gap-16 w-full items-center justify-center bg-background"
      aria-label="Closing reflection and portrait"
    >
      <ClosingPhraseFrame
        phraseWrapRef={phraseWrapRef}
        line1Ref={line1Ref}
        line2Ref={line2Ref}
      />
      <ClosingPortraitFrame photoWrapRef={photoWrapRef} imgRef={imgRef} />
    </section>
  );
}
