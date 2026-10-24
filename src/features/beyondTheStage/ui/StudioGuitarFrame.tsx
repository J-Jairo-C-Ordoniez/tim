import Image from "next/image";

export default function StudioGuitarFrame() {
  return (
    <figure
      data-frame
      className="flex h-svh w-screen shrink-0 items-center justify-center px-4 sm:px-8 lg:px-12"
    >
      <div className="relative aspect-video w-full max-w-352 overflow-hidden rounded-2xl shadow-2xl">
        <Image
          data-image-reveal
          data-scroll-darken
          src="/beyondTheStage1.png"
          alt="Tim Bergling and studio musician working with acoustic guitar"
          fill
          sizes="(max-width: 1536px) 92vw, 1408px"
          className="object-cover will-change-[transform,opacity,filter]"
          draggable={false}
          priority
        />
      </div>
    </figure>
  );
}
