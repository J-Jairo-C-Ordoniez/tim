import type { RefObject } from "react";

type InspirationLegacyQuoteFrameProps = {
  frameRef: RefObject<HTMLDivElement | null>;
  quote: string;
  author: string;
};

export default function InspirationLegacyQuoteFrame({
  frameRef,
  quote,
  author,
}: InspirationLegacyQuoteFrameProps) {
  return (
    <div
      ref={frameRef}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-12 md:px-20 text-center"
    >
      <blockquote className="max-w-4xl text-2xl font-light leading-relaxed tracking-wide text-foreground sm:text-4xl md:text-5xl lg:text-[3.15rem]">
        {quote}
      </blockquote>
      <p className="mt-8 text-xs uppercase tracking-[0.35em] text-foreground-muted/70 sm:text-sm">
        — {author}
      </p>
    </div>
  );
}
