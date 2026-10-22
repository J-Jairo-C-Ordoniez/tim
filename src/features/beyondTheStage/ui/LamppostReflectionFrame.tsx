import SplitWords from "@/features/beyondTheStage/ui/SplitWords";

export default function LamppostReflectionFrame() {
  return (
    <article
      data-frame
      className="flex h-svh w-screen shrink-0 items-center justify-center px-8 sm:px-16 lg:px-24"
    >
      <div className="max-w-4xl text-center">
        <p className="text-2xl font-light leading-relaxed text-foreground-muted sm:text-3xl md:text-4xl lg:text-5xl">
          <SplitWords
            text="“I like that part of ‘I spoke your name.’ Although I'm not sold on the lamppost; I don't like how it sounds when singing it.”"
            highlight="name"
          />
        </p>
      </div>
    </article>
  );
}
