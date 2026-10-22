import type { RefObject } from "react";
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
      className="relative flex h-svh w-screen shrink-0 items-center justify-center overflow-hidden px-6"
    >
      <div
        ref={imgTopRef}
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

      <div className="relative z-10 max-w-5xl px-4 text-center">
        <p className="whitespace-nowrap text-xl font-light tracking-[0.06em] text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
          <SplitWords
            text="Under an old lamppost, I spoke your name."
            highlight="spoke"
          />
        </p>
      </div>

      <div
        ref={imgBottomRef}
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
  );
}
