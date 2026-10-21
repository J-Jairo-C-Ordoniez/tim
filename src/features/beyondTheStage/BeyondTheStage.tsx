"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import phrase from "@/features/beyondTheStage/data/phrase";
import LyricTransitionScene from "@/features/beyondTheStage/scenes/LyricTransitionScene";
import StudioSessionScene from "@/features/beyondTheStage/scenes/StudioSessionScene";

gsap.registerPlugin(ScrollTrigger);

export default function BeyondTheStage({ enabled }: { enabled: boolean }) {
  const root = useRef<HTMLElement>(null);
  const continuationScene = useRef<HTMLElement>(null);
  const finalScene = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!enabled) return;

      const frame = root.current;
      const continuationFrame = continuationScene.current;
      const finalFrame = finalScene.current;

      if (!frame || !continuationFrame || !finalFrame) return;

      const continuationWords = Array.from(frame.querySelectorAll<HTMLElement>('[data-lyric-word="continuation"]'));
      const finalWords = Array.from(frame.querySelectorAll<HTMLElement>('[data-lyric-word="final"]'));
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set([...continuationWords, ...finalWords], { autoAlpha: 1, clearProps: "all" });
        return;
      }

      const continuationTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: continuationFrame,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(
          continuationWords,
          { autoAlpha: 0, scale: 0.55, yPercent: 175, rotateX: -88, filter: "blur(20px)" },
          { autoAlpha: 1, scale: 1, yPercent: 0, rotateX: 0, filter: "blur(0px)", duration: 0.28, stagger: 0.08, ease: "none" },
        )
        .to(continuationWords, { scale: 1.22, yPercent: -8, letterSpacing: "0.18em", duration: 0.14, ease: "none" })
        .to(
          continuationWords,
          { scale: 20, yPercent: -86, rotateX: 32, autoAlpha: 0, filter: "blur(10px)", duration: 0.82, stagger: 0.08, ease: "none" },
          0.48,
        );

      const finalTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: finalFrame,
          start: "top 90%",
          end: "bottom bottom",
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      });

      finalTimeline
        .fromTo(
          finalWords,
          { autoAlpha: 0, scale: 0.06, yPercent: 150, rotateX: 88, rotateZ: 8, filter: "blur(22px)", letterSpacing: "0.62em" },
          { autoAlpha: 1, scale: 1, yPercent: 0, rotateX: 0, rotateZ: 0, filter: "blur(0px)", letterSpacing: "0.1em", duration: 0.58, stagger: 0.12, ease: "none" },
        )
        .to(finalWords, { scale: 1.16, yPercent: -14, letterSpacing: "0.15em", duration: 0.18, stagger: 0.05, ease: "none" })
        .to(finalWords, { scale: 1, yPercent: 0, letterSpacing: "0.1em", duration: 0.24, stagger: 0.04, ease: "none" });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        continuationTimeline.scrollTrigger?.kill();
        finalTimeline.scrollTrigger?.kill();
      };
    },
    { scope: root, dependencies: [enabled] },
  );

  return (
    <section ref={root} className="bg-background" aria-label="Beyond the stage">
      <LyricTransitionScene
        continuationLine={phrase[1]}
        continuationSceneRef={continuationScene}
        finalLine={phrase[2]}
        finalSceneRef={finalScene}
        accessiblePhrase={phrase.join(" ")}
      />
      <StudioSessionScene enabled={enabled} />
    </section>
  );
}
