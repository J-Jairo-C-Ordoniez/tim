"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import posthog from "posthog-js";
import captionCues from "@/features/hero/data/captionCues";
import DocumentaryScene from "@/features/hero/scenes/DocumentaryScene";
import HeroTransitionScene from "@/features/hero/scenes/HeroTransitionScene";
import IntroScene from "@/features/hero/scenes/IntroScene";

const isPostHogConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

function createCaptionTimeline() {
  const timeline = gsap.timeline().set("[data-caption], [data-caption-character]", { autoAlpha: 0 });

  captionCues.forEach((cue) => {
    const selector = `[data-caption="${cue.id}"]`;

    timeline
      .set(selector, { autoAlpha: 1 }, cue.start)
      .to(
        `${selector} [data-caption-character]`,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.08,
          stagger: 0.04,
          ease: "power1.out",
        },
        cue.start + 0.1,
      )
      .to(selector, { autoAlpha: 0, y: -8, duration: 0.4, ease: "power2.in" }, cue.end - 0.4);
  });

  return timeline;
}

// Reduced-motion variant: no stagger, no y movement — whole caption fades in/out at once
function createReducedCaptionTimeline() {
  const timeline = gsap.timeline().set("[data-caption], [data-caption-character]", { autoAlpha: 0, y: 0 });

  captionCues.forEach((cue) => {
    const selector = `[data-caption="${cue.id}"]`;

    timeline
      .set(`${selector} [data-caption-character]`, { autoAlpha: 1 }, cue.start)
      .to(selector, { autoAlpha: 1, duration: 0.5, ease: "power1.out" }, cue.start)
      .to(selector, { autoAlpha: 0, duration: 0.4, ease: "power1.in" }, cue.end - 0.4);
  });

  return timeline;
}

type HeroProps = {
  onComplete?: () => void;
};

export default function Hero({ onComplete }: HeroProps) {
  const frame = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const introTl = gsap.timeline();
        introTl
          .to("[data-before-avicii]", { autoAlpha: 1, y: 0, duration: 1.2, ease: "power3.out" }, "+=0.5")
          .to("[data-tim]", { autoAlpha: 1, y: 0, duration: 1.4, ease: "power3.out" }, "+=0.5")
          .to("[data-intro-actions]", { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out" }, "+=0.2");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-before-avicii], [data-tim], [data-intro-actions]", {
          autoAlpha: 1,
          y: 0,
        });
      });

      return () => mm.revert();
    },
    { scope: frame, dependencies: [] },
  );

  const handleStart = (withSound: boolean) => {
    if (hasStarted) return;

    if (isPostHogConfigured) {
      posthog.capture("tribute_entered", { with_sound: withSound });
    }

    setHasStarted(true);
    setIsMuted(!withSound);

    const vid = video.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Same narrative arc as normal, but: smaller y values, no caption stagger, video included
      if (vid) {
        vid.muted = !withSound;
        vid.preload = "auto";
        vid.load();
      }

      gsap.set("[data-hero-transition]", { y: 10 });
      gsap.set("[data-hero-transition-copy]", { y: 10, scale: 1 });
      gsap.set("[data-hero-transition-scroll]", { y: 8 });

      gsap
        .timeline()
        // 1. "Before Avicii / there was Tim" exits
        .to("[data-intro-content]", { autoAlpha: 0, y: -10, duration: 0.8, ease: "power1.inOut" })
        // 2. "An experience about Tim Bergling" enters
        .fromTo(
          "[data-intro-subtitle]",
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 1.0, ease: "power2.out" },
          "+=0.15",
        )
        .to({}, { duration: 2.5 })
        // 3. Intro scene exits, video starts
        .to("[data-intro-scene]", { autoAlpha: 0, y: -8, duration: 0.8, ease: "power2.inOut" })
        .call(
          () => {
            if (vid) {
              vid.currentTime = 0;
              vid.muted = !withSound;
              void vid.play().catch(() => {
                vid.muted = true;
                setIsMuted(true);
                void vid.play();
              });
            }
          },
          undefined,
          "-=0.2",
        )
        // 4. Documentary scene fades in (no scale jump)
        .to("[data-documentary-scene]", { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" }, "<")
        // 5. Captions — whole text fades, no character stagger
        .add(createReducedCaptionTimeline(), "+=0.1")
        // 6. Documentary fades out
        .to("[data-documentary-scene]", { autoAlpha: 0, duration: 3, ease: "power1.inOut" }, 65)
        // 7. "Maybe it" transition scene enters
        .to("[data-hero-transition]", { autoAlpha: 1, y: 0, duration: 1.0, ease: "power2.out" }, ">-0.5")
        .to("[data-hero-transition-copy]", { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out" }, "<+=0.15")
        .to("[data-hero-transition-scroll]", { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, "<+=0.2")
        .to({}, { duration: 2.5 })
        .call(() => {
          video.current?.pause();
          onComplete?.();
        });
      return;
    }

    if (vid) {
      vid.muted = !withSound;
      vid.preload = "auto";
      vid.load();
    }

    const docTl = gsap.timeline();
    docTl
      .to("[data-intro-content]", {
        autoAlpha: 0,
        y: -24,
        duration: 0.75,
        ease: "power2.inOut",
      })
      .fromTo(
        "[data-intro-subtitle]",
        { autoAlpha: 0, y: 24, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
        "+=0.1",
      )
      .to({}, { duration: 2.5 })
      .to("[data-intro-scene]", {
        autoAlpha: 0,
        y: -16,
        duration: 0.9,
        ease: "power2.inOut",
      })
      .call(
        () => {
          if (vid) {
            vid.currentTime = 0;
            vid.muted = !withSound;
            void vid.play().catch(() => {
              vid.muted = true;
              setIsMuted(true);
              void vid.play();
            });
          }
        },
        undefined,
        "-=0.2",
      )
      .to("[data-documentary-scene]", { autoAlpha: 1, scale: 1, duration: 1.75, ease: "power2.out" }, "<")
      .add(createCaptionTimeline(), "+=0.1")
      .to("[data-documentary-scene]", { autoAlpha: 0, duration: 5, ease: "power1.inOut" }, 65)
      .to("[data-hero-transition]", { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, ">-1")
      .fromTo(
        "[data-hero-transition-copy]",
        { autoAlpha: 0, y: 24, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
        "<",
      )
      .fromTo(
        "[data-hero-transition-scroll]",
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out" },
        "-=0.4",
      )
      .to({}, { duration: 2.0 })
      .call(() => {
        video.current?.pause();
        onComplete?.();
      });
  };

  const handleToggleMute = () => {
    const vid = video.current;
    if (!vid) return;
    const nextMuted = !vid.muted;
    if (isPostHogConfigured) {
      posthog.capture("hero_audio_toggled", { muted: nextMuted });
    }

    vid.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section ref={frame} className="relative isolate h-svh w-full overflow-hidden bg-background text-foreground">
      <DocumentaryScene
        videoRef={video}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        hasStarted={hasStarted}
      />
      <IntroScene onStart={handleStart} />
      <HeroTransitionScene />
    </section>
  );
}
