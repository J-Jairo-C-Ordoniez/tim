import type { GalleryPhoto } from "@/features/lastShow/data/lastShowData";

type LastShowGalleryColumnProps = {
  photos: GalleryPhoto[];
  onOpenLightbox: (src: string, alt: string) => void;
};

export default function LastShowGalleryColumn({
  photos,
  onOpenLightbox,
}: LastShowGalleryColumnProps) {
  return (
    <div className="flex h-[88vh] w-65 shrink-0 flex-col justify-between gap-3 sm:w-75 md:w-85">
      {photos.map((photo, photoIdx) => (
        <button
          key={`${photo.src}-${photoIdx}`}
          type="button"
          data-gallery-card
          onClick={() => onOpenLightbox(photo.src, photo.alt)}
          aria-label={`View full screen: ${photo.alt}`}
          className="group relative flex-1 overflow-hidden rounded-xl bg-foreground/3 shadow-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        >
          <img
            data-parallax-img
            src={photo.src}
            alt={photo.alt}
            className="size-full object-cover scale-[1.18] will-change-transform"
            loading="lazy"
            draggable={false}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/20"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="text-foreground/80 drop-shadow-lg"
            >
              <path
                d="M3 3h6M3 3v6M3 3l7 7M21 3h-6M21 3v6M21 3l-7 7M3 21h6M3 21v-6M3 21l7-7M21 21h-6M21 21v-6M21 21l-7-7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
}
