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

const VIDEO_END_TOLERANCE = 0.15;

function hasReachedVideoEnd(video: HTMLVideoElement) {
  return (
    Number.isFinite(video.duration) &&
    video.duration > 0 &&
    video.currentTime >= video.duration - VIDEO_END_TOLERANCE
  );
}

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
  const hasVideoStartedRef = useRef(false);
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
      videoWakeMeUpRef.current.currentTime = 0;
      hasEndedRef.current = false;
      hasVideoStartedRef.current = false;
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const vid = videoWakeMeUpRef.current;
    if (!vid) return;

    if (hasReachedVideoEnd(vid) && !hasEndedRef.current) {
      hasEndedRef.current = true;
      vid.pause();
      vid.currentTime = vid.duration;

      unlockUserScroll();

      if (videoOverlayRef.current) {
        const overlay = videoOverlayRef.current;
        const titleCharacters = Array.from(
          overlay.querySelectorAll<HTMLElement>("h2 [data-video-character]"),
        );
        const subtitleCharacters = Array.from(
          overlay.querySelectorAll<HTMLElement>("p [data-video-character]"),
        );

        gsap.set([...titleCharacters, ...subtitleCharacters], { autoAlpha: 0, y: 28 });
        gsap.timeline()
          .to(overlay, { autoAlpha: 1, duration: 0.8, ease: "power2.out" })
          .to(
            titleCharacters,
            { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.045, ease: "power1.out" },
            "<+=0.16",
          )
          .to(
            subtitleCharacters,
            { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.035, ease: "power1.out" },
            "<+=0.18",
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

      const getScrollDistance = () =>
        frame8Ref.current ? frame8Ref.current.offsetLeft : trackEl.scrollWidth - window.innerWidth;

      const playWakeMeUp = () => {
        const vid = videoWakeMeUpRef.current;
        if (!vid) return;

        if (hasReachedVideoEnd(vid)) {
          vid.currentTime = 0;
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
          onUpdate: (self) => {
            const vid = videoWakeMeUpRef.current;
            if (!vid) return;

            // Snap to the exact end before locking. A wheel gesture can carry
            // the document beyond a pinned section in one update otherwise,
            // leaving the video only partly visible.
            const hasReachedVideoFrame = self.progress >= 0.998;

            if (hasReachedVideoFrame) {
              if (!hasEndedRef.current) {
                if (!hasVideoStartedRef.current) {
                  hasVideoStartedRef.current = true;
                  gsap.set(trackEl, { x: -getScrollDistance() });
                  self.scroll(self.end);
                }
                if (vid.paused && !hasReachedVideoEnd(vid)) {
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

      const frameElements = Array.from(trackEl.querySelectorAll<HTMLElement>("[data-frame]"));

      frameElements.forEach((frame, index) => {
        const characters = Array.from(
          frame.querySelectorAll<HTMLElement>("[data-scroll-character]"),
        );
        const image = frame.querySelector<HTMLElement>("[data-image-reveal]");
        const darkenedImage = frame.querySelector<HTMLElement>("[data-scroll-darken]");
        const isFirst = index === 0;

        if (characters.length > 0) {
          gsap.set(characters, { autoAlpha: 0, y: 28 });

          gsap.to(characters, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.028,
            ease: "power1.out",
            scrollTrigger: {
              trigger: frame,
              containerAnimation: horizontalTween,
              start: isFirst ? "left 84%" : "left 76%",
              end: isFirst ? "left 24%" : "left 18%",
              scrub: 0.35,
            },
          });
        }

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

        if (darkenedImage) {
          gsap.fromTo(
            darkenedImage,
            { filter: "brightness(1)" },
            {
              filter: "brightness(0.42)",
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                containerAnimation: horizontalTween,
                start: "left 82%",
                end: "left 14%",
                scrub: 0.45,
              },
            },
          );
        }
      });

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
      aria-label="Avicii's studio and creative journey"
    >
      <div
        ref={track}
        className="flex h-full w-max will-change-transform items-center px-8 sm:px-16"
      >
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
        />
      </div>
    </section>
  );
}
