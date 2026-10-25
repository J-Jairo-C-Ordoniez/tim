"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InspirationClosingScene from "@/features/whatInspires/scenes/InspirationClosingScene";
import InspirationIntroScene from "@/features/whatInspires/scenes/InspirationIntroScene";
import InspirationListScene from "@/features/whatInspires/scenes/InspirationListScene";

type WhatInspiresProps = {
  enabled: boolean;
};

export default function WhatInspires({ enabled }: WhatInspiresProps) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (enabled) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [enabled]);

  return (
    <section
      ref={root}
      className="relative w-full bg-background"
      aria-label="What inspires: Avicii's living legacy"
    >
      <InspirationIntroScene enabled={enabled} />
      <InspirationListScene enabled={enabled} />
      <InspirationClosingScene enabled={enabled} />
    </section>
  );
}
