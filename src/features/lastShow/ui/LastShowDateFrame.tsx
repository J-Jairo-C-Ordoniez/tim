import type { RefObject } from "react";

type LastShowDateFrameProps = {
  frameRef: RefObject<HTMLDivElement | null>;
};

export default function LastShowDateFrame({ frameRef }: LastShowDateFrameProps) {
  return (
    <div
      ref={frameRef}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-5 text-center sm:px-10 lg:px-16"
    >
      <p className="text-5xl font-normal tracking-tight leading-none text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
        August 28, 2016
      </p>
      <p className="mt-5 text-xl font-light tracking-tight text-foreground/80 sm:mt-6 sm:text-2xl md:text-3xl">
        Ushuaïa Ibiza · Final Live Performance
      </p>
    </div>
  );
}
