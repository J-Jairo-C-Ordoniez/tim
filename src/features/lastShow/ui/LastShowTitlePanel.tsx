import type { RefObject } from "react";

type LastShowTitlePanelProps = {
  titleRef: RefObject<HTMLHeadingElement | null>;
  title: string;
};

export default function LastShowTitlePanel({
  titleRef,
  title,
}: LastShowTitlePanelProps) {
  return (
    <div className="flex h-[88vh] w-[48vw] min-w-65 sm:min-w-90 shrink-0 items-center justify-center">
      <h2
        ref={titleRef}
        className="text-5xl font-light tracking-tight leading-relaxed text-foreground/75 sm:text-7xl md:text-8xl lg:text-9xl select-none"
      >
        {title}
      </h2>
    </div>
  );
}
