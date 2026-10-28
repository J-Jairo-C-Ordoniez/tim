import type { RefObject } from "react";

type LastShowQuoteFrameProps = {
  frameRef: RefObject<HTMLDivElement | null>;
  quote: string;
};

export default function LastShowQuoteFrame({
  frameRef,
  quote,
}: LastShowQuoteFrameProps) {
  return (
    <div
      ref={frameRef}
      className="pointer-events-none motion-safe:absolute motion-safe:inset-0 motion-reduce:relative motion-reduce:min-h-[40svh] motion-reduce:w-full flex items-center justify-center px-5 text-center sm:px-10 lg:px-16"
    >
      <blockquote className="max-w-[78rem] px-4 text-3xl font-light tracking-tight leading-relaxed text-foreground/75 sm:text-5xl md:text-6xl lg:text-7xl">
        {quote}
      </blockquote>
    </div>
  );
}
