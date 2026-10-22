"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import captionCues from "@/features/hero/data/captionCues";
import DocumentaryScene from "@/features/hero/scenes/DocumentaryScene";
import HeroTransitionScene from "@/features/hero/scenes/HeroTransitionScene";
import IntroScene from "@/features/hero/scenes/IntroScene";

const sceneLabels = {
  prelude: "prelude",
  beforeAvicii: "before-avicii",
  tim: "tim",
  documentary: "documentary",
  nextScene: "next-scene",
} as const;

function createCaptionTimeline() {
  const timeline = gsap.timeline().set("[data-caption], [data-caption-character]", { autoAlpha: 0 });

  captionCues.forEach((cue) => {
    const selector = `[data-caption="${cue.id}"]`;

    timeline
      .set(selector, { autoAlpha: 1 }, cue.start)
      .to(`${selector} [data-caption-character]`, {
        autoAlpha: 1,
        y: 0,
        duration: 0.08,
        stagger: 0.04,
        ease: "power1.out",
      }, cue.start + 0.1)
      .to(selector, { autoAlpha: 0, y: -8, duration: 0.4, ease: "power2.in" }, cue.end - 0.4);
  });

  return timeline;
}

function createHeroTimeline(video: HTMLVideoElement | null, onComplete?: () => void) {
  return gsap
    .timeline()
    .addLabel(sceneLabels.prelude)
    .to({}, { duration: 1.15 })
    .addLabel(sceneLabels.beforeAvicii)
    .to("[data-before-avicii]", { autoAlpha: 1, y: 0, duration: 1.35, ease: "power3.out" })
    .addLabel(sceneLabels.tim, "+=0.65")
    .to("[data-tim]", { autoAlpha: 1, y: 0, duration: 1.55, ease: "power3.out" })
    .addLabel(sceneLabels.documentary, "+=1.25")
    .call(() => {
      if (video) {
        video.muted = false;
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Autoplay con audio bloqueado por el navegador:", err);
            const enableAudioOnInteraction = () => {
              video.muted = false;
              void video.play();
              window.removeEventListener("click", enableAudioOnInteraction);
              window.removeEventListener("keydown", enableAudioOnInteraction);
            };
            window.addEventListener("click", enableAudioOnInteraction, { once: true });
            window.addEventListener("keydown", enableAudioOnInteraction, { once: true });
          });
        }
      }
    })
    .to("[data-intro-scene]", { autoAlpha: 0, y: -16, duration: 1.1, ease: "power2.in" })
    .to("[data-documentary-scene]", { autoAlpha: 1, scale: 1, duration: 1.75, ease: "power2.out" }, "<0.2")
    .add(createCaptionTimeline(), sceneLabels.documentary)
    .to("[data-documentary-scene]", { autoAlpha: 0, duration: 5, ease: "power1.inOut" }, `${sceneLabels.documentary}+=65`)
    .to("[data-hero-transition]", { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, ">-1")
    .fromTo(
      "[data-hero-transition-copy]",
      { autoAlpha: 0, scale: 0.45, letterSpacing: "0.7em" },
      { autoAlpha: 1, scale: 1, letterSpacing: "0.1em", duration: 1.2, ease: "power3.out" },
      "<",
    )
    .to({}, { duration: 2.4 })
    .addLabel(sceneLabels.nextScene)
    .call(() => {
      video?.pause();
      onComplete?.();
    });
}

type HeroProps = {
  onComplete?: () => void;
};

export default function Hero({ onComplete }: HeroProps) {
  const frame = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const context = gsap.context(() => createHeroTimeline(video.current, onComplete), frame);

        return () => context.revert();
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-before-avicii], [data-tim], [data-hero-transition]", { autoAlpha: 1, y: 0 });
        onComplete?.();
      });

      return () => media.revert();
    },
    { scope: frame, dependencies: [] },
  );

  return (
    <section ref={frame} className="relative isolate h-svh w-full overflow-hidden bg-background text-foreground">
      <DocumentaryScene videoRef={video} />
      <IntroScene />
      <HeroTransitionScene />
    </section>
  );
}
