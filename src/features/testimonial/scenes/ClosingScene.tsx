"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ClosingSceneProps = {
  enabled: boolean;
};

export default function ClosingScene({ enabled }: ClosingSceneProps) {
  const container = useRef<HTMLElement>(null);
  const phraseWrapRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (!enabled || !container.current) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(phraseWrapRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(photoWrapRef.current, { autoAlpha: 1 });
        return;
      }

      // Estados iniciales
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

      // 1. Entrada viva y sutil de la frase
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

        // Pausa real de contemplación para la frase limpia, sin ningún otro elemento
        .to({}, { duration: 2.8 })

        // Salida gradual de la frase hacia la oscuridad
        .to([line1Ref.current, line2Ref.current], {
          autoAlpha: 0,
          y: -24,
          duration: 1,
          stagger: 0.1,
          ease: "power2.in",
        })
        .set(phraseWrapRef.current, { autoAlpha: 0 })

        // Pausa de silencio visual absoluto entre la frase y la imagen
        .to({}, { duration: 0.8 })

        // 2. Aparición solemne de la fotografía final (la que retiramos de beyondTheStage)
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

        // Pausa en la fotografía
        .to({}, { duration: 2.2 });

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
      aria-label="Closing reflection and portrait"
    >
      {/* Momento 1: La frase de cierre en un lienzo totalmente limpio y espacioso */}
      <div
        ref={phraseWrapRef}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
      >
        <h2 className="max-w-4xl text-3xl font-light tracking-wide text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
          <span
            ref={line1Ref}
            className="block font-extralight text-foreground-muted will-change-[transform,opacity]"
          >
            Avicii is no longer with us.
          </span>
          <span
            ref={line2Ref}
            className="mt-3 block font-normal text-foreground will-change-[transform,opacity] sm:mt-5"
          >
            He is within us.
          </span>
        </h2>
      </div>

      {/* Momento 2: La fotografía final que retiramos de BeyondTheStage, a pantalla completa */}
      <figure
        ref={photoWrapRef}
        className="pointer-events-none absolute inset-0 z-10 size-full overflow-hidden"
      >
        <img
          ref={imgRef}
          src="/beyondTheStage6.png"
          alt="Tim Bergling portrait"
          className="size-full object-cover will-change-[transform,opacity]"
          draggable={false}
          loading="eager"
        />
        {/* Filtros atmosféricos para fundir con la estética de la experiencia */}
        <div className="absolute inset-0 bg-background/25" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/60"
          aria-hidden="true"
        />
      </figure>
    </section>
  );
}
