"use client";

import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import posthog from "posthog-js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lastShowData } from "@/features/lastShow/data/lastShowData";
import LastShowCenterpiece from "@/features/lastShow/ui/LastShowCenterpiece";
import LastShowGalleryColumn from "@/features/lastShow/ui/LastShowGalleryColumn";
import LastShowLightbox from "@/features/lastShow/ui/LastShowLightbox";
import LastShowTitlePanel from "@/features/lastShow/ui/LastShowTitlePanel";

const isPostHogConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

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
    if (isPostHogConfigured) {
      posthog.capture("last_show_photo_opened");
    }

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

      const getScrollDistance = () => trackEl.scrollWidth - window.innerWidth;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
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
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const cards = Array.from(trackEl.querySelectorAll<HTMLElement>("[data-gallery-card]"));
        const desc = trackEl.querySelector<HTMLElement>("[data-centerpiece-desc]");
        const targets = [titleRef.current, ...cards, desc].filter(Boolean) as HTMLElement[];
        gsap.set(targets, { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform,opacity" });
      });

      return () => mm.revert();
    },
    { scope: container, dependencies: [enabled] },
  );

  return (
    <>
      <section
        ref={container}
        className="relative motion-safe:h-svh motion-safe:overflow-hidden motion-reduce:min-h-svh motion-reduce:h-auto motion-reduce:overflow-visible w-full bg-background"
        aria-label="Avicii's Final Show Gallery"
      >
        <div
          ref={track}
          className="flex motion-safe:h-full motion-safe:w-max motion-safe:items-center motion-reduce:flex-col motion-reduce:w-full motion-reduce:h-auto motion-reduce:items-center motion-reduce:gap-16 motion-reduce:py-24 will-change-transform px-8 sm:px-16 gap-5 sm:gap-7"
        >
          <LastShowTitlePanel titleRef={titleRef} title={lastShowData.title} />

          {lastShowData.columnsBefore.map((column, colIdx) => (
            <LastShowGalleryColumn
              key={`col-before-${colIdx}`}
              photos={column}
              onOpenLightbox={openLightbox}
            />
          ))}

          <LastShowCenterpiece
            title={lastShowData.centerpiece.title}
            src={lastShowData.centerpiece.src}
            alt={lastShowData.centerpiece.alt}
            description={lastShowData.centerpiece.description}
            onOpenLightbox={openLightbox}
          />

          {lastShowData.columnsAfter.map((column, colIdx) => (
            <LastShowGalleryColumn
              key={`col-after-${colIdx}`}
              photos={column}
              onOpenLightbox={openLightbox}
            />
          ))}
        </div>
      </section>

      {lightbox && (
        <LastShowLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
