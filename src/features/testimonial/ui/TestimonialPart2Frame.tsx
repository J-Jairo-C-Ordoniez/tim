import type { RefObject } from "react";

type TestimonialPart2FrameProps = {
  frameRef: RefObject<HTMLDivElement | null>;
};

export default function TestimonialPart2Frame({ frameRef }: TestimonialPart2FrameProps) {
  return (
    <div
      ref={frameRef}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-8 text-center"
    >
      <p className="max-w-5xl text-2xl font-light leading-relaxed tracking-wide text-foreground sm:text-4xl md:text-5xl lg:text-[3.15rem]">
        At a time when I went through the deepest depression of my life, a song of Tim’s saved me:{" "}
        <span className="font-normal text-foreground">Wake Me Up</span>. It moved me deeply, at the
        exact right moment.
      </p>
    </div>
  );
}
