import type { RefObject } from "react";

type LastShowDateFrameProps = {
  frameRef: RefObject<HTMLDivElement | null>;
};

export default function LastShowDateFrame({ frameRef }: LastShowDateFrameProps) {
  return (
    <div
      ref={frameRef}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <p className="text-xs font-medium uppercase tracking-[0.35em] text-foreground-muted sm:text-sm">
        August 28, 2016
      </p>
      <p className="mt-3 text-xs font-light uppercase tracking-[0.25em] text-foreground-muted/60 sm:text-sm">
        Ushuaïa Ibiza · Final Live Performance
      </p>
    </div>
  );
}
