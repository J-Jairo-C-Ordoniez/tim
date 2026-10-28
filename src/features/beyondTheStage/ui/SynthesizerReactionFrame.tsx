import Image from "next/image";
import SplitWords from "@/features/beyondTheStage/ui/SplitWords";

export default function SynthesizerReactionFrame() {
  return (
    <article
      data-frame
      className="flex motion-safe:h-svh motion-safe:w-screen motion-safe:shrink-0 motion-reduce:min-h-[60svh] motion-reduce:w-full items-center justify-center px-5 sm:px-10 lg:px-16"
    >
      <div className="flex w-full max-w-352 flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-20">
        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl shadow-2xl lg:w-[58%]">
          <Image
            data-image-reveal
            data-scroll-darken
            src="/beyondTheStage4.png"
            alt="Tim Bergling playing the synthesizer in studio"
            fill
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover will-change-[transform,opacity,filter]"
            draggable={false}
            priority
          />
        </div>
        <div className="w-full text-center lg:w-[42%] lg:text-left">
          <p className="text-3xl font-light tracking-tight leading-relaxed sm:text-5xl md:text-6xl lg:text-7xl">
            <SplitWords
              text="“Wow! That sounds great. I also like the part about ‘for a better day.’”"
              highlight="better"
            />
          </p>
        </div>
      </div>
    </article>
  );
}
