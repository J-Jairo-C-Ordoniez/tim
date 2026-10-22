"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LyricTransitionScene from "@/features/beyondTheStage/scenes/LyricTransitionScene";
import StudioSessionScene from "@/features/beyondTheStage/scenes/StudioSessionScene";

type BeyondTheStageProps = {
  enabled: boolean;
};

export default function BeyondTheStage({ enabled }: BeyondTheStageProps) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (enabled) {
      // Forzamos el recálculo de posiciones de ScrollTrigger cuando el Hero finaliza
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [enabled]);

  return (
    <section ref={root} className="relative w-full bg-background" aria-label="Beyond the stage">
      <LyricTransitionScene enabled={enabled} />
      <StudioSessionScene enabled={enabled} />
    </section>
  );
}
