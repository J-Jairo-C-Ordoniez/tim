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
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 sm:px-12 md:px-20 text-center"
    >
      <blockquote className="max-w-4xl text-2xl font-light leading-relaxed tracking-wide text-foreground sm:text-4xl md:text-5xl lg:text-[3.15rem]">
        {quote}
      </blockquote>
    </div>
  );
}
