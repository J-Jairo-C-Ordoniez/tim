export default function StudioGuitarFrame() {
  return (
    <figure
      data-frame
      className="flex h-svh w-screen shrink-0 items-center justify-center px-8 sm:px-16 lg:px-24"
    >
      <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl">
        <img
          data-image-reveal
          src="/beyondTheStage1.png"
          alt="Tim Bergling and studio musician working with acoustic guitar"
          className="size-full object-cover will-change-[transform,opacity]"
          draggable={false}
          loading="eager"
        />
      </div>
    </figure>
  );
}
