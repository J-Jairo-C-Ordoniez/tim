"use client";

import { useCallback, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StudioSessionSceneProps = {
  enabled: boolean;
};

function SplitWords({
  text,
  className = "",
  highlight,
}: {
  text: string;
  className?: string;
  highlight?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => {
        const isHighlight = highlight && word.toLowerCase().includes(highlight.toLowerCase());
        return (
          <span key={`${word}-${i}`} className="inline-block whitespace-nowrap mr-[0.26em]">
            <span
              data-word
              className={`inline-block will-change-[transform,opacity] ${
                isHighlight ? "font-medium text-foreground" : ""
              }`}
            >
              {word}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default function StudioSessionScene({ enabled }: StudioSessionSceneProps) {
  const container = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const parallaxFrame = useRef<HTMLDivElement>(null);
  const imgTop = useRef<HTMLDivElement>(null);
  const imgBottom = useRef<HTMLDivElement>(null);
  const frame7Ref = useRef<HTMLElement>(null);
  const bgStoriesRef = useRef<HTMLImageElement>(null);
  const frame8Ref = useRef<HTMLElement>(null);
  const videoWakeMeUpRef = useRef<HTMLVideoElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const hasEndedRef = useRef(false);
  const unlockScrollRef = useRef<(() => void) | null>(null);

  const lockUserScroll = useCallback(() => {
    if (unlockScrollRef.current) return;

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };
    const preventKeys = (e: KeyboardEvent) => {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Space",
          "Home",
          "End",
        ].includes(e.code)
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeys, { passive: false });

    unlockScrollRef.current = () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeys);
      unlockScrollRef.current = null;
    };
  }, []);

  const unlockUserScroll = useCallback(() => {
    if (unlockScrollRef.current) {
      unlockScrollRef.current();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (unlockScrollRef.current) {
        unlockScrollRef.current();
      }
    };
  }, []);

  useGSAP(
    () => {
      if (!enabled || !container.current || !track.current) return;

      const trackEl = track.current;
      const containerEl = container.current;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        return;
      }

      // Distancia de scroll exacta basada en la posición real de Frame 8 para evitar franjas
      const getScrollDistance = () =>
        frame8Ref.current ? frame8Ref.current.offsetLeft : trackEl.scrollWidth - window.innerWidth;

      // Control de reproducción del vídeo Wake Me Up (0:26 a 1:38)
      const playWakeMeUp = () => {
        const vid = videoWakeMeUpRef.current;
        if (!vid) return;

        if (vid.currentTime < 26 || vid.currentTime >= 98) {
          vid.currentTime = 26;
        }

        vid.muted = false;
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Autoplay con audio bloqueado por el navegador, iniciando en silencio:", err);
            vid.muted = true;
            void vid.play();

            const enableAudioOnInteraction = () => {
              if (!videoWakeMeUpRef.current) return;
              videoWakeMeUpRef.current.muted = false;
              void videoWakeMeUpRef.current.play();
            };

            window.addEventListener("click", enableAudioOnInteraction, { once: true });
            window.addEventListener("keydown", enableAudioOnInteraction, { once: true });
            window.addEventListener("scroll", enableAudioOnInteraction, { once: true });
            window.addEventListener("wheel", enableAudioOnInteraction, { once: true });
            window.addEventListener("touchstart", enableAudioOnInteraction, { once: true });
          });
        }
      };

      const pauseWakeMeUp = () => {
        const vid = videoWakeMeUpRef.current;
        if (!vid) return;
        vid.pause();
      };

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
          onUpdate: () => {
            const vid = videoWakeMeUpRef.current;
            const frame8 = frame8Ref.current;
            if (!vid || !frame8) return;

            const rect = frame8.getBoundingClientRect();
            // Inmediatamente cuando Frame 8 ocupa la pantalla, iniciar el vídeo
            const isOccupying =
              rect.left <= Math.max(60, window.innerWidth * 0.1) &&
              rect.right >= window.innerWidth * 0.9;

            if (isOccupying) {
              if (!hasEndedRef.current) {
                if (vid.paused && vid.currentTime < 98) {
                  playWakeMeUp();
                }
                lockUserScroll();
              }
            } else {
              if (!vid.paused) {
                pauseWakeMeUp();
              }
            }
          },
        },
      });

      // Animaciones perceptibles activadas cuando el usuario llega a cada frame
      const frameElements = Array.from(trackEl.querySelectorAll<HTMLElement>("[data-frame]"));

      frameElements.forEach((frame, index) => {
        const words = Array.from(frame.querySelectorAll<HTMLElement>("[data-word]"));
        const image = frame.querySelector<HTMLElement>("[data-image-reveal]");
        const isFirst = index === 0;

        // Revelación de palabras estilo subtítulo del Hero con stagger sutil
        if (words.length > 0) {
          gsap.set(words, { autoAlpha: 0, y: 22 });

          gsap.to(words, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.032,
            ease: "power2.out",
            scrollTrigger: {
              trigger: frame,
              containerAnimation: horizontalTween,
              start: isFirst ? "left 99%" : "left 65%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        // Animación de respiración/vida para imágenes en marcos
        if (image) {
          gsap.set(image, { scale: 1.08, autoAlpha: 0.4 });

          gsap.to(image, {
            scale: 1,
            autoAlpha: 1,
            duration: 1.4,
            ease: "power1.out",
            scrollTrigger: {
              trigger: frame,
              containerAnimation: horizontalTween,
              start: isFirst ? "left 99%" : "left 70%",
              toggleActions: "play reverse play reverse",
            },
          });
        }
      });

      // Frame 3: Parallax vertical continuo de las dos imágenes flotantes
      if (parallaxFrame.current && imgTop.current && imgBottom.current) {
        gsap.fromTo(
          imgTop.current,
          { yPercent: -45, scale: 1.06 },
          {
            yPercent: 35,
            scale: 0.98,
            ease: "none",
            scrollTrigger: {
              trigger: parallaxFrame.current,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          imgBottom.current,
          { yPercent: 45, scale: 0.98 },
          {
            yPercent: -35,
            scale: 1.06,
            ease: "none",
            scrollTrigger: {
              trigger: parallaxFrame.current,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: 1,
            },
          },
        );
      }

      // Frame 7: Zoom ambiental en la imagen de fondo Stories al llegar
      if (frame7Ref.current && bgStoriesRef.current) {
        gsap.set(bgStoriesRef.current, { scale: 1.12, autoAlpha: 0.35 });

        gsap.to(bgStoriesRef.current, {
          scale: 1.0,
          autoAlpha: 1,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: frame7Ref.current,
            containerAnimation: horizontalTween,
            start: "left 65%",
            toggleActions: "play reverse play reverse",
          },
        });
      }

      // Frame 8: Entrada audiovisual estilo documental
      if (frame8Ref.current && videoWakeMeUpRef.current) {
        gsap.set(videoWakeMeUpRef.current, { scale: 1.08, autoAlpha: 0.35 });

        gsap.to(videoWakeMeUpRef.current, {
          scale: 1.0,
          autoAlpha: 1,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: frame8Ref.current,
            containerAnimation: horizontalTween,
            start: "left 70%",
            toggleActions: "play reverse play reverse",
          },
        });
      }

      // Al desplazarse fuera de BeyondTheStage hacia Testimonial, pausar el vídeo
      ScrollTrigger.create({
        trigger: containerEl,
        start: "bottom top",
        onEnter: () => pauseWakeMeUp(),
        onLeaveBack: () => {
          const vid = videoWakeMeUpRef.current;
          if (vid && vid.currentTime < 98) {
            playWakeMeUp();
          }
        },
      });

      return () => {
        horizontalTween.scrollTrigger?.kill();
      };
    },
    { scope: container, dependencies: [enabled] },
  );

  return (
    <section
      ref={container}
      className="relative h-svh w-full overflow-hidden bg-background"
      aria-label="Studio session quotes and archive"
    >
      <div
        ref={track}
        className="flex h-full w-max will-change-transform"
      >
        {/* Frame 1: Cita de la guitarra (100vw, 100vh) */}
        <article
          data-frame
          className="flex h-svh w-screen shrink-0 items-center justify-center px-8 sm:px-16 lg:px-24"
        >
          <div className="max-w-4xl text-center">
            <p className="text-3xl font-light leading-relaxed tracking-wide text-foreground sm:text-5xl lg:text-6xl">
              <SplitWords text="“I love the sound of that guitar.”" highlight="guitar" />
            </p>
          </div>
        </article>

        {/* Frame 2: Imagen 1 - Estudio con guitarra (100vw, 100vh) - Sin borde */}
        <figure
          data-frame
          className="flex h-svh w-screen shrink-0 items-center justify-center px-8 sm:px-16 lg:px-24"
        >
          <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl">
            <img
              data-image-reveal
              src="/beyondTheStage1.png"
              alt="Tim Bergling and studio musician working with acoustic guitar"
              className="size-full object-cover will-change-[transform,opacity]"
              draggable={false}
              loading="eager"
            />
          </div>
        </figure>

        {/* Frame 3: Sección de una línea central con dos imágenes en parallax (100vw, 100vh) - Sin bordes */}
        <section
          ref={parallaxFrame}
          data-frame
          className="relative flex h-svh w-screen shrink-0 items-center justify-center overflow-hidden px-6"
        >
          {/* Imagen superior que baja desde arriba con parallax */}
          <div
            ref={imgTop}
            className="pointer-events-none absolute left-[8%] top-8 z-0 aspect-video w-56 overflow-hidden rounded-2xl shadow-2xl will-change-[transform,opacity] sm:left-[12%] sm:top-12 sm:w-80 md:w-96"
          >
            <img
              src="/beyondTheStage2.png"
              alt="Tim Bergling focused at the laptop in the studio"
              className="size-full object-cover"
              draggable={false}
              loading="eager"
            />
          </div>

          {/* Línea horizontal central limpia */}
          <div className="relative z-10 max-w-5xl px-4 text-center">
            <p className="whitespace-nowrap text-xl font-light tracking-[0.06em] text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
              <SplitWords
                text="Under an old lamppost, I spoke your name."
                highlight="spoke"
              />
            </p>
          </div>

          {/* Imagen inferior que sube en contraposición con parallax */}
          <div
            ref={imgBottom}
            className="pointer-events-none absolute bottom-8 right-[8%] z-0 aspect-video w-56 overflow-hidden rounded-2xl shadow-2xl will-change-[transform,opacity] sm:bottom-12 sm:right-[12%] sm:w-80 md:w-96"
          >
            <img
              src="/beyondTheStage3.png"
              alt="Tim Bergling by the studio equipment"
              className="size-full object-cover"
              draggable={false}
              loading="eager"
            />
          </div>
        </section>

        {/* Frame 4: Reflexión sobre la farola (100vw, 100vh) */}
        <article
          data-frame
          className="flex h-svh w-screen shrink-0 items-center justify-center px-8 sm:px-16 lg:px-24"
        >
          <div className="max-w-4xl text-center">
            <p className="text-2xl font-light leading-relaxed text-foreground-muted sm:text-3xl md:text-4xl lg:text-5xl">
              <SplitWords
                text="“I like that part of ‘I spoke your name.’ Although I'm not sold on the lamppost; I don't like how it sounds when singing it.”"
                highlight="name"
              />
            </p>
          </div>
        </article>

        {/* Frame 5: Imagen 4 con reacción musical (100vw, 100vh) - Sin borde */}
        <article
          data-frame
          className="flex h-svh w-screen shrink-0 items-center justify-center px-8 sm:px-16 lg:px-24"
        >
          <div className="flex w-full max-w-6xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="aspect-video w-full shrink-0 overflow-hidden rounded-2xl shadow-2xl lg:w-3/5">
              <img
                data-image-reveal
                src="/beyondTheStage4.png"
                alt="Tim Bergling playing the synthesizer in studio"
                className="size-full object-cover will-change-[transform,opacity]"
                draggable={false}
                loading="eager"
              />
            </div>
            <div className="w-full text-center lg:w-2/5 lg:text-left">
              <p className="text-2xl font-light leading-snug text-foreground sm:text-3xl md:text-4xl">
                <SplitWords
                  text="“Wow! That sounds great. I also like the part about ‘for a better day.’”"
                  highlight="better"
                />
              </p>
            </div>
          </div>
        </article>

        {/* Frame 6: La definición de For a Better Day (100vw, 100vh) */}
        <article
          data-frame
          className="flex h-svh w-screen shrink-0 items-center justify-center px-8 sm:px-16 lg:px-24"
        >
          <div className="max-w-4xl text-center">
            <p className="text-3xl font-light leading-relaxed text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              <SplitWords
                text="“You know? I like that ‘it’s time for a better day.’ Yeah, that feels right...”"
                highlight="better"
              />
            </p>
          </div>
        </article>

        {/* Frame 7: Imagen 5 (Stories) - Muy importante hacia el final (100vw, 100vh) - Sin borde */}
        <article
          ref={frame7Ref}
          data-frame
          className="relative flex h-svh w-screen shrink-0 items-center justify-center overflow-hidden px-8 sm:px-16 lg:px-24"
        >
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img
              ref={bgStoriesRef}
              src="/beyondTheStage5.png"
              alt="Tim Bergling deep in creation process"
              className="size-full object-cover brightness-[0.35] contrast-110 will-change-[transform,opacity]"
              draggable={false}
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
          </div>
          <div className="relative z-10 max-w-4xl text-center">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-foreground-muted sm:text-sm">
              <SplitWords text="Stories · Creative Process" />
            </p>
            <p className="text-2xl font-light leading-relaxed text-foreground sm:text-4xl md:text-5xl">
              <SplitWords
                text="“On Stories, I'm exploring a lot more... I'm stepping out of the ordinary, trying new things I’ve never done before or experimented with. That’s why I do this.”"
                highlight="this"
              />
            </p>
          </div>
        </article>

        {/* Frame 8: Wake Me Up - Puente audiovisual a la vida de las personas */}
        <figure
          ref={frame8Ref}
          data-frame
          onClick={() => unlockUserScroll()}
          className="relative flex h-svh w-screen min-w-screen shrink-0 items-center justify-center overflow-hidden bg-background isolate z-10"
        >
          <video
            ref={videoWakeMeUpRef}
            src="/WakeMeUp.mp4"
            className="size-full object-cover brightness-50 contrast-125 grayscale will-change-[transform,opacity]"
            playsInline
            preload="auto"
            onLoadedMetadata={() => {
              if (videoWakeMeUpRef.current) {
                videoWakeMeUpRef.current.currentTime = 26;
              }
            }}
            onTimeUpdate={() => {
              const vid = videoWakeMeUpRef.current;
              if (!vid) return;

              // Detener al llegar al segundo 1:38 (98s) y mostrar texto de transición sin bucle infinito
              if (vid.currentTime >= 98 && !hasEndedRef.current) {
                hasEndedRef.current = true;
                vid.pause();
                vid.currentTime = 98;

                // Desbloqueo del scroll para continuar normalmente
                unlockUserScroll();

                if (videoOverlayRef.current) {
                  gsap.to(videoOverlayRef.current, {
                    autoAlpha: 1,
                    duration: 1.2,
                    ease: "power2.out",
                  });
                  const items = videoOverlayRef.current.querySelectorAll("[data-video-overlay-item]");
                  gsap.fromTo(
                    items,
                    { y: 24, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.15, ease: "power2.out" },
                  );
                }
              }
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-background/30" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background via-transparent to-background/70" aria-hidden="true" />

          {/* Transición montada sobre el vídeo al finalizar (estilo Hero) */}
          <div
            ref={videoOverlayRef}
            className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center opacity-0"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
            <div className="relative z-10 max-w-5xl px-4">
              <h2
                data-video-overlay-item
                className="text-4xl font-light uppercase tracking-[0.22em] text-foreground sm:text-6xl md:text-7xl lg:text-8xl leading-tight"
              >
                Wake Me Up
              </h2>
              <p
                data-video-overlay-item
                className="mt-6 text-sm sm:text-lg md:text-xl font-light uppercase tracking-[0.38em] text-foreground-muted/90"
              >
                A Listener’s Reflection
              </p>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
