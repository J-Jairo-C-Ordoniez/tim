"use client";

import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lastShowData } from "@/features/lastShow/data/lastShowData";

gsap.registerPlugin(ScrollTrigger);

type LastShowGallerySceneProps = {
  enabled: boolean;
};

type LightboxState = {
  src: string;
  alt: string;
} | null;

export default function LastShowGalleryScene({ enabled }: LastShowGallerySceneProps) {
  const container = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightbox({ src, alt });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  useGSAP(
    () => {
      if (!enabled || !container.current || !track.current) return;

      const trackEl = track.current;
      const containerEl = container.current;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) return;

      const getScrollDistance = () => trackEl.scrollWidth - window.innerWidth;

      // Animación de entrada: título y primeras tarjetas aparecen al llegar a esta sección
      if (titleRef.current) {
        gsap.set(titleRef.current, { autoAlpha: 0, y: 40 });
        gsap.to(titleRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: containerEl,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const horizontalTween = gsap.to(trackEl, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: containerEl,
          start: "top top",
          end: () => `+=${Math.max(1, getScrollDistance())}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax sutil en imágenes de galería
      const imgEls = Array.from(trackEl.querySelectorAll<HTMLElement>("[data-parallax-img]"));
      imgEls.forEach((img, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        gsap.fromTo(
          img,
          { yPercent: direction * 8 },
          {
            yPercent: direction * -8,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest("[data-gallery-card]") ?? img,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      // Entrada de tarjetas al entrar en pantalla
      const cards = Array.from(trackEl.querySelectorAll<HTMLElement>("[data-gallery-card]"));
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0.4, scale: 0.94 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 88%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });

      // Descripción centerpiece animada
      const desc = trackEl.querySelector<HTMLElement>("[data-centerpiece-desc]");
      if (desc) {
        gsap.fromTo(
          desc,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: desc,
              containerAnimation: horizontalTween,
              start: "left 75%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }

      return () => {
        horizontalTween.scrollTrigger?.kill();
      };
    },
    { scope: container, dependencies: [enabled] },
  );

  return (
    <>
      <section
        ref={container}
        className="relative h-svh w-full overflow-hidden bg-background"
        aria-label="Avicii's Final Show Gallery"
      >
        <div
          ref={track}
          className="flex h-full w-max will-change-transform items-center px-8 sm:px-16 gap-5 sm:gap-7"
        >
          {/* Panel inicial: Nombre AVICII estilo editorial */}
          <div className="flex h-[88vh] w-[48vw] min-w-[260px] sm:min-w-[360px] shrink-0 items-center justify-center">
            <h2
              ref={titleRef}
              className="text-5xl font-light tracking-[0.25em] text-foreground sm:text-7xl md:text-8xl lg:text-9xl uppercase select-none"
            >
              {lastShowData.title}
            </h2>
          </div>

          {/* Columnas antes del centerpiece */}
          {lastShowData.columnsBefore.map((column, colIdx) => (
            <div
              key={`col-before-${colIdx}`}
              className="flex h-[88vh] w-[260px] shrink-0 flex-col justify-between gap-3 sm:w-[300px] md:w-[340px]"
            >
              {column.map((photo, photoIdx) => (
                <button
                  key={`photo-before-${colIdx}-${photoIdx}`}
                  type="button"
                  data-gallery-card
                  onClick={() => openLightbox(photo.src, photo.alt)}
                  aria-label={`View full screen: ${photo.alt}`}
                  className="group relative flex-1 overflow-hidden rounded-xl bg-foreground/[0.03] shadow-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                >
                  <img
                    data-parallax-img
                    src={photo.src}
                    alt={photo.alt}
                    className="size-full object-cover scale-[1.18] will-change-transform"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/20" aria-hidden="true" />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-foreground/80 drop-shadow-lg">
                      <path d="M3 3h6M3 3v6M3 3l7 7M21 3h-6M21 3v6M21 3l-7 7M3 21h6M3 21v-6M3 21l7-7M21 21h-6M21 21v-6M21 21l-7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          ))}

          {/* Centerpiece: fotografía principal limpia */}
          <div className="flex h-[88vh] w-[68vw] min-w-[480px] max-w-4xl shrink-0 flex-col gap-4">
            <h3 className="text-2xl font-light uppercase tracking-[0.2em] text-foreground sm:text-3xl md:text-4xl shrink-0">
              {lastShowData.centerpiece.title}
            </h3>

            <button
              type="button"
              data-gallery-card
              onClick={() => openLightbox(lastShowData.centerpiece.src, lastShowData.centerpiece.alt)}
              aria-label={`View full screen: ${lastShowData.centerpiece.alt}`}
              className="group relative flex-1 min-h-0 overflow-hidden rounded-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
            >
              <img
                src={lastShowData.centerpiece.src}
                alt={lastShowData.centerpiece.alt}
                className="size-full object-cover brightness-95 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="eager"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-foreground/80 drop-shadow-lg">
                  <path d="M3 3h6M3 3v6M3 3l7 7M21 3h-6M21 3v6M21 3l-7 7M3 21h6M3 21v-6M3 21l7-7M21 21h-6M21 21v-6M21 21l-7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </button>

            <p
              data-centerpiece-desc
              className="text-xs font-light leading-relaxed tracking-wide text-foreground-muted sm:text-sm shrink-0"
            >
              {lastShowData.centerpiece.description}
            </p>
          </div>

          {/* Columnas después del centerpiece */}
          {lastShowData.columnsAfter.map((column, colIdx) => (
            <div
              key={`col-after-${colIdx}`}
              className="flex h-[88vh] w-[260px] shrink-0 flex-col justify-between gap-3 sm:w-[300px] md:w-[340px]"
            >
              {column.map((photo, photoIdx) => (
                <button
                  key={`photo-after-${colIdx}-${photoIdx}`}
                  type="button"
                  data-gallery-card
                  onClick={() => openLightbox(photo.src, photo.alt)}
                  aria-label={`View full screen: ${photo.alt}`}
                  className="group relative flex-1 overflow-hidden rounded-xl bg-foreground/[0.03] shadow-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                >
                  <img
                    data-parallax-img
                    src={photo.src}
                    alt={photo.alt}
                    className="size-full object-cover scale-[1.18] will-change-transform"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/20" aria-hidden="true" />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-foreground/80 drop-shadow-lg">
                      <path d="M3 3h6M3 3v6M3 3l7 7M21 3h-6M21 3v6M21 3l-7 7M3 21h6M3 21v-6M3 21l7-7M21 21h-6M21 21v-6M21 21l-7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox renderizado en document.body via Portal para evitar conflictos con GSAP ScrollTrigger */}
      {lightbox &&
        createPortal(
          <button
            type="button"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-sm cursor-zoom-out focus:outline-none"
            onClick={closeLightbox}
            aria-label="Close full screen image"
          >
            {/* Botón X */}
            <div
              className="pointer-events-none absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-background/60"
              aria-hidden="true"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-foreground-muted">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </button>,
          document.body,
        )}
    </>
  );
}
