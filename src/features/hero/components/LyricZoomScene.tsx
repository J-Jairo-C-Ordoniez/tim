"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * A typographic transition: scrolling into the "o" in Lost makes room for
 * the next word. The copy is deliberately limited to the words in the visual
 * study, so this is a motion prototype rather than a lyrics display.
 */
export function LyricZoomScene() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      timeline
        .to("[data-zoom-word]", {
          scale: 15,
          duration: 0.72,
          ease: "none",
        })
        .to("[data-next-word]", {
          autoAlpha: 1,
          scale: 1,
          duration: 0.18,
          ease: "power2.out",
        }, 0.52)
        .to("[data-next-word]", {
          scale: 4.5,
          duration: 0.28,
          ease: "none",
        }, 0.72);
    },
    { scope: section, dependencies: [] },
  );

  return (
    <section ref={section} className="relative h-[360svh] bg-[#05015f]" aria-label="Estudio tipográfico de navegación">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_68%_26%,rgba(156,35,255,0.33),transparent_28%),#05015f]">
        <p
          data-zoom-word
          className="relative origin-[42%_50%] text-[clamp(8rem,30vw,24rem)] font-semibold leading-none tracking-[-0.1em] text-[#a4dcff] [text-shadow:0_0_36px_rgba(116,205,255,0.35)]"
          aria-hidden="true"
        >
          Lost
        </p>
        <p
          data-next-word
          className="absolute left-[45%] top-1/2 -translate-x-1/2 -translate-y-1/2 scale-50 text-[clamp(1.5rem,5vw,4rem)] font-semibold leading-none tracking-[-0.08em] text-[#060363] opacity-0"
          aria-hidden="true"
        >
          in
        </p>
        <p className="sr-only">Lost in</p>
        <span className="absolute bottom-8 text-[0.65rem] font-medium uppercase tracking-[0.26em] text-white/45 sm:bottom-12 sm:text-xs">
          Scroll to enter
        </span>
      </div>
    </section>
  );
}
