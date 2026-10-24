import type { RefObject } from "react";

type InspirationSparkFrameProps = {
  frameRef: RefObject<HTMLDivElement | null>;
  callout: string;
  signature: string;
};

export default function InspirationSparkFrame({
  frameRef,
  callout,
  signature,
}: InspirationSparkFrameProps) {
  return (
    <div
      ref={frameRef}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <p className="text-xs font-light uppercase tracking-[0.45em] text-foreground-muted sm:text-sm">
        {callout}
      </p>

      <h2 className="mt-6 text-3xl font-light uppercase tracking-[0.25em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
        {signature}
      </h2>

      <div className="mt-10 flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-foreground/20" />
        <span className="size-1.5 rounded-full bg-foreground/40 animate-pulse" />
        <span className="h-px w-12 bg-foreground/20" />
      </div>
    </div>
  );
}
