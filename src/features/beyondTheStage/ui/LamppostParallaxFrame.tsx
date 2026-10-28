import type { RefObject } from "react";
import Image from "next/image";
import SplitWords from "@/features/beyondTheStage/ui/SplitWords";

type LamppostParallaxFrameProps = {
  sectionRef: RefObject<HTMLElement | null>;
  imgTopRef: RefObject<HTMLDivElement | null>;
  imgBottomRef: RefObject<HTMLDivElement | null>;
};

export default function LamppostParallaxFrame({
  sectionRef,
  imgTopRef,
  imgBottomRef,
}: LamppostParallaxFrameProps) {
  return (
    <section
      ref={sectionRef}
      data-frame
      className="relative flex motion-safe:h-svh motion-safe:w-screen motion-safe:shrink-0 motion-reduce:min-h-[60svh] motion-reduce:w-full items-center justify-center overflow-hidden px-6"
    >
      <figure
        ref={imgTopRef}
        className="pointer-events-none absolute left-[4%] top-14 z-0 aspect-video w-64 overflow-hidden rounded-2xl shadow-2xl will-change-[transform,opacity] sm:left-[10%] sm:top-16 sm:w-96 md:left-[14%] md:w-md lg:left-[18%]"
      >
        <Image
          src="/beyondTheStage2.png"
          alt="Tim Bergling focused at the laptop in the studio"
          fill
          sizes="(max-width: 640px) 256px, (max-width: 768px) 384px, 448px"
          className="object-cover"
          draggable={false}
          priority
        />
      </figure>

      <div className="relative z-10 max-w-6xl px-4 text-center">
        <p className="text-3xl font-light tracking-tight leading-relaxed sm:text-5xl md:text-6xl lg:text-7xl">
          <SplitWords
            text="Under an old lamppost, I spoke your name."
            highlight="spoke"
          />
        </p>
      </div>

      <figure
        ref={imgBottomRef}
        className="pointer-events-none absolute bottom-14 right-[4%] z-0 aspect-video w-64 overflow-hidden rounded-2xl shadow-2xl will-change-[transform,opacity] sm:bottom-16 sm:right-[10%] sm:w-96 md:right-[14%] md:w-md lg:right-[18%]"
      >
        <Image
          src="/beyondTheStage3.png"
          alt="Tim Bergling by the studio equipment"
          fill
          sizes="(max-width: 640px) 256px, (max-width: 768px) 384px, 448px"
          className="object-cover"
          draggable={false}
          priority
        />
      </figure>
    </section>
  );
}
