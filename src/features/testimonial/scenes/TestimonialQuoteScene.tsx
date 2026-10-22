"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

      // Estados iniciales limpios
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

      // Viewport 1: Palabras a la familia de Tim
      tl.to(p1, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" })
        .to(p1, { autoAlpha: 1, y: 0, duration: 2.2 }) // pausa de lectura
        .to(p1, { autoAlpha: 0, y: -30, scale: 1.04, duration: 0.9, ease: "power2.in" })

        // Pausa de respiración visual
        .to({}, { duration: 0.4 })

        // Viewport 2: La experiencia transformadora con Wake Me Up
        .to(p2, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out" })
        .to(p2, { autoAlpha: 1, y: 0, duration: 2.8 }) // pausa de lectura extendida para la frase central
        .to(p2, { autoAlpha: 0, y: -30, scale: 1.04, duration: 0.9, ease: "power2.in" })

        // Pausa de respiración visual
        .to({}, { duration: 0.4 })

        // Viewport 3: Reflexión profunda y consuelo final
        .to(p3, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" })
        .to(p3, { autoAlpha: 1, y: 0, duration: 2.2 }) // pausa de lectura
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
      {/* Viewport 1: Primera parte del testimonio */}
      <div
        ref={part1Ref}
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-8 text-center"
      >
        <p className="max-w-4xl text-2xl font-light leading-relaxed tracking-wide text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          “My heartfelt words go out to Tim’s family. I hope they read this.
        </p>
      </div>

      {/* Viewport 2: Segunda parte del testimonio (eje central) */}
      <div
        ref={part2Ref}
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-8 text-center"
      >
        <p className="max-w-5xl text-2xl font-light leading-relaxed tracking-wide text-foreground sm:text-4xl md:text-5xl lg:text-[3.15rem]">
          At a time when I went through the deepest depression of my life, a song of Tim’s saved
          me: <span className="font-normal text-foreground">Wake Me Up</span>. It moved me
          deeply, at the exact right moment.
        </p>
      </div>

      {/* Viewport 3: Tercera parte y cierre del testimonio */}
      <div
        ref={part3Ref}
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-8 text-center"
      >
        <p className="max-w-4xl text-2xl font-light leading-relaxed tracking-wide text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          I felt an immense pain upon learning that he couldn’t save himself. But... I understand.
          May this bring them comfort.”
        </p>
      </div>
    </section>
  );
}
