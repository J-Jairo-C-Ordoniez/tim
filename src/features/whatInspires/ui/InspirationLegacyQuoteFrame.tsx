import type { RefObject } from "react";

type InspirationLegacyQuoteFrameProps = {
  frameRef: RefObject<HTMLDivElement | null>;
  quote: string;
};

export default function InspirationLegacyQuoteFrame({
  frameRef,
  quote,
}: InspirationLegacyQuoteFrameProps) {
  return (
    <div
      ref={frameRef}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 text-center sm:px-10 lg:px-16"
    >
      <blockquote className="max-w-[78rem] px-4 text-3xl font-light tracking-tight leading-relaxed text-foreground/75 sm:text-5xl md:text-6xl lg:text-7xl">
        {quote}
      </blockquote>
    </div>
  );
}
