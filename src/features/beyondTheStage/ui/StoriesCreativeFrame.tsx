import type { RefObject } from "react";
import Image from "next/image";
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
      className="relative flex h-svh w-screen shrink-0 items-center justify-center overflow-hidden px-5 sm:px-10 lg:px-16"
    >
      <figure className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          ref={bgStoriesRef}
          src="/beyondTheStage5.png"
          alt="Tim Bergling deep in creation process"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.35] contrast-110 will-change-[transform,opacity]"
          draggable={false}
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-background/70" />
      </figure>
      <div className="relative z-10 max-w-312 px-4 text-center">
        <p className="text-3xl font-light tracking-tight leading-relaxed sm:text-5xl md:text-6xl lg:text-7xl">
          <SplitWords
            text="“On Stories, I'm exploring a lot more... I'm stepping out of the ordinary, trying new things I’ve never done before or experimented with. That’s why I do this.”"
            highlight="this"
          />
        </p>
      </div>
    </article>
  );
}
