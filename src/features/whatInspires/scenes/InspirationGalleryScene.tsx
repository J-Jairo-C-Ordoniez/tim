"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  inspirationData,
  type InspirationItem,
} from "@/features/whatInspires/data/inspirationData";
import InspirationCard from "@/features/whatInspires/ui/InspirationCard";
import InspirationHeaderPanel from "@/features/whatInspires/ui/InspirationHeaderPanel";
import InspirationModal from "@/features/whatInspires/ui/InspirationModal";

gsap.registerPlugin(ScrollTrigger);

type InspirationGallerySceneProps = {
  enabled: boolean;
};

export default function InspirationGalleryScene({ enabled }: InspirationGallerySceneProps) {
  const container = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<InspirationItem | null>(null);

  useGSAP(
    () => {
      if (!enabled || !container.current || !track.current) return;

      const trackEl = track.current;
      const containerEl = container.current;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) return;

      const getScrollDistance = () => trackEl.scrollWidth - window.innerWidth;

      if (headerRef.current) {
        gsap.set(headerRef.current, { autoAlpha: 0, y: 35 });
        gsap.to(headerRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
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

      const cards = Array.from(trackEl.querySelectorAll<HTMLElement>("[data-inspiration-card]"));
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0.35, scale: 0.94, y: 20 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 90%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });

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
        aria-label="What inspires: Creative expressions"
      >
        <div
          ref={track}
          className="flex h-full w-max will-change-transform items-center px-8 sm:px-16 gap-6 sm:gap-8"
        >
          <InspirationHeaderPanel
            headerRef={headerRef}
            title={inspirationData.sectionTitle}
            subtitle={inspirationData.sectionSubtitle}
          />

          {inspirationData.items.map((item, index) => (
            <InspirationCard
              key={item.id}
              item={item}
              index={index}
              onSelect={setSelectedItem}
            />
          ))}
        </div>
      </section>

      <InspirationModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}
