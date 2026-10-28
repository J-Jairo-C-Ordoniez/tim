import type { RefObject } from "react";

type TestimonialPart5FrameProps = {
  frameRef: RefObject<HTMLDivElement | null>;
};

export default function TestimonialPart5Frame({ frameRef }: TestimonialPart5FrameProps) {
  return (
    <div
      ref={frameRef}
      className="pointer-events-none motion-safe:absolute motion-safe:inset-0 motion-reduce:relative motion-reduce:min-h-[50svh] motion-reduce:w-full flex items-center justify-center px-5 text-center sm:px-10 lg:px-16"
    >
      <p className="max-w-[72rem] px-4 text-3xl font-light tracking-tight leading-relaxed text-foreground/75 sm:text-5xl md:text-6xl lg:text-7xl">
        But... I understand. <span className="text-foreground">May this bring them comfort.”</span>
      </p>
    </div>
  );
}
