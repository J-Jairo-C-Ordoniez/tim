import type { RefObject } from "react";

type LastShowClosingTitleFrameProps = {
  frameRef: RefObject<HTMLDivElement | null>;
};

export default function LastShowClosingTitleFrame({
  frameRef,
}: LastShowClosingTitleFrameProps) {
  return (
    <div
      ref={frameRef}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center"
    >
      <h2 className="text-3xl font-light uppercase tracking-[0.25em] text-foreground sm:text-5xl md:text-6xl">
        the last show
      </h2>
    </div>
  );
}
