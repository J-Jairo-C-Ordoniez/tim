import type { RefObject } from "react";

type ClosingPhraseFrameProps = {
  phraseWrapRef: RefObject<HTMLDivElement | null>;
  line1Ref: RefObject<HTMLSpanElement | null>;
  line2Ref: RefObject<HTMLSpanElement | null>;
};

export default function ClosingPhraseFrame({
  phraseWrapRef,
  line1Ref,
  line2Ref,
}: ClosingPhraseFrameProps) {
  return (
    <div
      ref={phraseWrapRef}
      className="pointer-events-none motion-safe:absolute motion-safe:inset-0 motion-safe:z-20 motion-reduce:relative motion-reduce:min-h-[50svh] motion-reduce:w-full flex flex-col items-center justify-center px-5 text-center sm:px-10 lg:px-16"
    >
      <h2 className="max-w-312 px-4 text-3xl font-light tracking-tight leading-relaxed text-foreground/75 sm:text-5xl md:text-6xl lg:text-7xl">
        <span
          ref={line1Ref}
          className="block will-change-[transform,opacity]"
        >
          Avicii is no longer with us.
        </span>
        <span
          ref={line2Ref}
          className="mt-3 block text-foreground will-change-[transform,opacity] sm:mt-5"
        >
          He is within us.
        </span>
      </h2>
    </div>
  );
}
