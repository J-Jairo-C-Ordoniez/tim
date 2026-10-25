import type { RefObject } from "react";

type InspirationListFrameProps = {
  frameRef: RefObject<HTMLDivElement | null>;
  inspirations: readonly string[];
  moreLabel: string;
};

export default function InspirationListFrame({
  frameRef,
  inspirations,
  moreLabel,
}: InspirationListFrameProps) {
  return (
    <div
      ref={frameRef}
      className="absolute inset-0 flex items-center justify-center px-6 sm:px-12 lg:px-20"
    >
      <div className="w-full max-w-6xl">
        <ul className="border-t border-foreground/20">
          {inspirations.map((inspiration) => (
            <li
              key={inspiration}
              data-inspiration-list-item
              className="border-b border-foreground/20 py-5 text-3xl font-light tracking-tight leading-tight text-foreground/80 sm:py-6 sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {inspiration}
            </li>
          ))}
        </ul>
        <p
          data-inspiration-list-item
          className="pt-5 text-xl font-light tracking-tight text-foreground/55 sm:pt-6 sm:text-2xl md:text-3xl"
        >
          {moreLabel}
        </p>
      </div>
    </div>
  );
}
