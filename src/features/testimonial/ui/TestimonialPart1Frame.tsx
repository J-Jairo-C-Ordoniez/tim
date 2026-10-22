import type { RefObject } from "react";

type TestimonialPart1FrameProps = {
  frameRef: RefObject<HTMLDivElement | null>;
};

export default function TestimonialPart1Frame({ frameRef }: TestimonialPart1FrameProps) {
  return (
    <div
      ref={frameRef}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-8 text-center"
    >
      <p className="max-w-4xl text-2xl font-light leading-relaxed tracking-wide text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]">
        “My heartfelt words go out to Tim’s family. I hope they read this.
      </p>
    </div>
  );
}
