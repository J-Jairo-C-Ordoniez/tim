"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

      // Estados iniciales – misma mecánica que LyricTransitionScene y TestimonialQuoteScene
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

      // Frame 1: Fecha + lugar — kicker
      tl.to(f1, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" })
        .to(f1, { autoAlpha: 1, y: 0, duration: 2 }) // pausa de lectura
        .to(f1, { autoAlpha: 0, y: -28, scale: 1.04, duration: 0.9, ease: "power2.in" })

        .to({}, { duration: 0.3 })

        // Frame 2: La cita real de Tim — gran escala, estilo blockquote de la sección
        .to(f2, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out" })
        .to(f2, { autoAlpha: 1, y: 0, duration: 2.4 }) // pausa de lectura extendida
        .to(f2, { autoAlpha: 0, y: -28, scale: 1.04, duration: 0.9, ease: "power2.in" })

        .to({}, { duration: 0.3 })

        // Frame 3: THE LAST SHOW — uppercase sereno, estilo LyricTransitionScene
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
      {/* Frame 1: Contexto histórico — kicker */}
      <div
        ref={frame1Ref}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-foreground-muted sm:text-sm">
          August 28, 2016
        </p>
        <p className="mt-3 text-xs font-light uppercase tracking-[0.25em] text-foreground-muted/60 sm:text-sm">
          Ushuaïa Ibiza · Final Live Performance
        </p>
      </div>

      {/* Frame 2: La cita real de Tim — misma escala que las escenas de testimonio */}
      <div
        ref={frame2Ref}
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 sm:px-12 md:px-20 text-center"
      >
        <blockquote className="max-w-4xl text-2xl font-light leading-relaxed tracking-wide text-foreground sm:text-4xl md:text-5xl lg:text-[3.15rem]">
          "I couldn't have asked for a better last show."
        </blockquote>
      </div>

      {/* Frame 3: THE LAST SHOW — estilo LyricTransitionScene */}
      <div
        ref={frame3Ref}
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center"
      >
        <h2 className="text-3xl font-light uppercase tracking-[0.25em] text-foreground sm:text-5xl md:text-6xl">
          the last show
        </h2>
      </div>
    </section>
  );
}
