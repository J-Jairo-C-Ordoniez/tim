import type { RefObject } from "react";

type InspirationIntroFrameProps = {
  frame1Ref: RefObject<HTMLDivElement | null>;
  frame2Ref: RefObject<HTMLDivElement | null>;
  phrase1: string;
  phrase2: string;
};

export default function InspirationIntroFrame({
  frame1Ref,
  frame2Ref,
  phrase1,
  phrase2,
}: InspirationIntroFrameProps) {
  return (
    <>
      <div
        ref={frame1Ref}
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-8 text-center"
      >
        <p className="max-w-4xl text-2xl font-light leading-relaxed tracking-wide text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          “{phrase1}”
        </p>
      </div>

      <div
        ref={frame2Ref}
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-8 text-center"
      >
        <p className="max-w-5xl text-2xl font-light leading-relaxed tracking-wide text-foreground sm:text-4xl md:text-5xl lg:text-[3.15rem]">
          {phrase2}
        </p>
      </div>
    </>
  );
}
