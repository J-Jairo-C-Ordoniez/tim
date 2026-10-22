import type { RefObject } from "react";
import SplitWords from "@/features/beyondTheStage/ui/SplitWords";

type StoriesCreativeFrameProps = {
  articleRef: RefObject<HTMLElement | null>;
  bgStoriesRef: RefObject<HTMLImageElement | null>;
};

export default function StoriesCreativeFrame({
  articleRef,
  bgStoriesRef,
}: StoriesCreativeFrameProps) {
  return (
    <article
      ref={articleRef}
      data-frame
      className="relative flex h-svh w-screen shrink-0 items-center justify-center overflow-hidden px-8 sm:px-16 lg:px-24"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          ref={bgStoriesRef}
          src="/beyondTheStage5.png"
          alt="Tim Bergling deep in creation process"
          className="size-full object-cover brightness-[0.35] contrast-110 will-change-[transform,opacity]"
          draggable={false}
          loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-background/70" />
      </div>
      <div className="relative z-10 max-w-4xl text-center">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-foreground-muted sm:text-sm">
          <SplitWords text="Stories · Creative Process" />
        </p>
        <p className="text-2xl font-light leading-relaxed text-foreground sm:text-4xl md:text-5xl">
          <SplitWords
            text="“On Stories, I'm exploring a lot more... I'm stepping out of the ordinary, trying new things I’ve never done before or experimented with. That’s why I do this.”"
            highlight="this"
          />
        </p>
      </div>
    </article>
  );
}
