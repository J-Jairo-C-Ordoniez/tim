import type { RefObject } from "react";

type InspirationIntroFrameProps = {
  frame1Ref: RefObject<HTMLDivElement | null>;
  statement: string;
};

export default function InspirationIntroFrame({
  frame1Ref,
  statement,
}: InspirationIntroFrameProps) {
  return (
    <div
      ref={frame1Ref}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 text-center sm:px-10 lg:px-16"
    >
      <p className="max-w-[78rem] px-4 text-3xl font-light tracking-tight leading-relaxed text-foreground/75 sm:text-5xl md:text-6xl lg:text-7xl">
        {statement}
      </p>
    </div>
  );
}
