"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LastShowGalleryScene from "@/features/lastShow/scenes/LastShowGalleryScene";
import LastShowMemorialScene from "@/features/lastShow/scenes/LastShowMemorialScene";

type LastShowProps = {
  enabled: boolean;
};

export default function LastShow({ enabled }: LastShowProps) {
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
      aria-label="Avicii - The Last Show"
    >
      <LastShowGalleryScene enabled={enabled} />
      <LastShowMemorialScene enabled={enabled} />
    </section>
  );
}
