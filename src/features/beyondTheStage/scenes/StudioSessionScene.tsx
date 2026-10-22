"use client";

import { useCallback, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BetterDayDefinitionFrame from "@/features/beyondTheStage/ui/BetterDayDefinitionFrame";
import GuitarQuoteFrame from "@/features/beyondTheStage/ui/GuitarQuoteFrame";
import LamppostParallaxFrame from "@/features/beyondTheStage/ui/LamppostParallaxFrame";
import LamppostReflectionFrame from "@/features/beyondTheStage/ui/LamppostReflectionFrame";
import StoriesCreativeFrame from "@/features/beyondTheStage/ui/StoriesCreativeFrame";
import StudioGuitarFrame from "@/features/beyondTheStage/ui/StudioGuitarFrame";
import SynthesizerReactionFrame from "@/features/beyondTheStage/ui/SynthesizerReactionFrame";
import WakeMeUpBridgeFrame from "@/features/beyondTheStage/ui/WakeMeUpBridgeFrame";

gsap.registerPlugin(ScrollTrigger);

type StudioSessionSceneProps = {
  enabled: boolean;
};

export default function StudioSessionScene({ enabled }: StudioSessionSceneProps) {
  const container = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const parallaxFrame = useRef<HTMLElement>(null);
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

  const handleLoadedMetadata = useCallback(() => {
    if (videoWakeMeUpRef.current) {
      videoWakeMeUpRef.current.currentTime = 26;
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const vid = videoWakeMeUpRef.current;
    if (!vid) return;

    // Detener al llegar al segundo 1:38 (98s) y mostrar texto de transición sin bucle infinito
    if (vid.currentTime >= 98 && !hasEndedRef.current) {
      hasEndedRef.current = true;
      vid.pause();
      vid.currentTime = 98;

      unlockUserScroll();

      if (videoOverlayRef.current) {
        gsap.to(videoOverlayRef.current, {
          autoAlpha: 1,
          duration: 1.2,
          ease: "power2.out",
        });
        const items = videoOverlayRef.current.querySelectorAll(
          "[data-video-overlay-item]",
        );
        gsap.fromTo(
          items,
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.15, ease: "power2.out" },
        );
      }
    }
  }, [unlockUserScroll]);

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
      <div ref={track} className="flex h-full w-max will-change-transform">
        <GuitarQuoteFrame />
        <StudioGuitarFrame />
        <LamppostParallaxFrame
          sectionRef={parallaxFrame}
          imgTopRef={imgTop}
          imgBottomRef={imgBottom}
        />
        <LamppostReflectionFrame />
        <SynthesizerReactionFrame />
        <BetterDayDefinitionFrame />
        <StoriesCreativeFrame
          articleRef={frame7Ref}
          bgStoriesRef={bgStoriesRef}
        />
        <WakeMeUpBridgeFrame
          figureRef={frame8Ref}
          videoRef={videoWakeMeUpRef}
          overlayRef={videoOverlayRef}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onUnlockScroll={unlockUserScroll}
        />
      </div>
    </section>
  );
}
