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
      className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
    >
      <h2 className="max-w-4xl text-3xl font-light leading-tight tracking-wide text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
        <span
          ref={line1Ref}
          className="block font-extralight text-foreground-muted will-change-[transform,opacity]"
        >
          Avicii is no longer with us.
        </span>
        <span
          ref={line2Ref}
          className="mt-3 block font-normal text-foreground will-change-[transform,opacity] sm:mt-5"
        >
          He is within us.
        </span>
      </h2>
    </div>
  );
}
