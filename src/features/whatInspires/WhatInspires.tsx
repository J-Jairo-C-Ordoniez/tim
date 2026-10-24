"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InspirationClosingScene from "@/features/whatInspires/scenes/InspirationClosingScene";
import InspirationGalleryScene from "@/features/whatInspires/scenes/InspirationGalleryScene";
import InspirationIntroScene from "@/features/whatInspires/scenes/InspirationIntroScene";

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
      aria-label="What Inspires: The living legacy of Avicii"
    >
      <InspirationIntroScene enabled={enabled} />
      <InspirationGalleryScene enabled={enabled} />
      <InspirationClosingScene enabled={enabled} />
    </section>
  );
}
