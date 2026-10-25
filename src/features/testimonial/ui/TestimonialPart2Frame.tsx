import type { RefObject } from "react";

type TestimonialPart2FrameProps = {
  frameRef: RefObject<HTMLDivElement | null>;
};

export default function TestimonialPart2Frame({ frameRef }: TestimonialPart2FrameProps) {
  return (
    <div
      ref={frameRef}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 text-center sm:px-10 lg:px-16"
    >
      <p className="max-w-[72rem] px-4 text-3xl font-light tracking-tight leading-relaxed text-foreground/75 sm:text-5xl md:text-6xl lg:text-7xl">
        At a time when I went through the <span className="text-foreground">deepest depression of my life,</span>
      </p>
    </div>
  );
}
