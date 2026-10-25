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
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 text-center sm:px-10 lg:px-16"
    >
      <h2 className="max-w-[78rem] px-4 text-3xl font-light tracking-tight leading-relaxed text-foreground/75 sm:text-5xl md:text-6xl lg:text-7xl">
        the last show
      </h2>
    </div>
  );
}
