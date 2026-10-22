import SplitWords from "@/features/beyondTheStage/ui/SplitWords";

export default function SynthesizerReactionFrame() {
  return (
    <article
      data-frame
      className="flex h-svh w-screen shrink-0 items-center justify-center px-8 sm:px-16 lg:px-24"
    >
      <div className="flex w-full max-w-6xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">
        <div className="aspect-video w-full shrink-0 overflow-hidden rounded-2xl shadow-2xl lg:w-3/5">
          <img
            data-image-reveal
            src="/beyondTheStage4.png"
            alt="Tim Bergling playing the synthesizer in studio"
            className="size-full object-cover will-change-[transform,opacity]"
            draggable={false}
            loading="eager"
          />
        </div>
        <div className="w-full text-center lg:w-2/5 lg:text-left">
          <p className="text-2xl font-light leading-snug text-foreground sm:text-3xl md:text-4xl">
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
