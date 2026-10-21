"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import studioPanels from "@/features/beyondTheStage/data/studioCues";
import StudioCueCard from "@/features/beyondTheStage/ui/StudioCueCard";
import StudioMediaPanel from "@/features/beyondTheStage/ui/StudioMediaPanel";

gsap.registerPlugin(ScrollTrigger);

export default function StudioSessionScene({ enabled }: { enabled: boolean }) {
  const scene = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!enabled || !scene.current) return;

      const panels = Array.from(scene.current.querySelectorAll<HTMLElement>("[data-studio-panel]"));
      const track = scene.current.querySelector<HTMLElement>("[data-studio-track]");
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!track || prefersReducedMotion) {
        return;
      }

      const timeline = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: scene.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });

      gsap.from(panels, {
        autoAlpha: 0.25,
        duration: 0.4,
        stagger: 0.04,
        scrollTrigger: {
          trigger: scene.current,
          start: "top 85%",
          once: true,
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => timeline.scrollTrigger?.kill();
    },
    { scope: scene, dependencies: [enabled] },
  );

  return (
    <section ref={scene} className="relative h-[600svh] bg-background" aria-label="Proceso de estudio de For a Better Day">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div data-studio-track className="flex h-full w-max will-change-transform">
          {studioPanels.map((panel) => {
            if (panel.type === "media") {
              return <StudioMediaPanel key={panel.id} timestamp={panel.timestamp} label={panel.label} description={panel.description} />;
            }

            return <StudioCueCard key={panel.id} timestamp={panel.timestamp} lines={panel.lines} />;
          })}
        </div>
      </div>
    </section>
  );
}
