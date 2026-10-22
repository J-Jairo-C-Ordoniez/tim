import type { RefObject } from "react";

type TestimonialPart3FrameProps = {
  frameRef: RefObject<HTMLDivElement | null>;
};

export default function TestimonialPart3Frame({ frameRef }: TestimonialPart3FrameProps) {
  return (
    <div
      ref={frameRef}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-8 text-center"
    >
      <p className="max-w-4xl text-2xl font-light leading-relaxed tracking-wide text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]">
        I felt an immense pain upon learning that he couldn’t save himself. But... I understand.
        May this bring them comfort.”
      </p>
    </div>
  );
}
