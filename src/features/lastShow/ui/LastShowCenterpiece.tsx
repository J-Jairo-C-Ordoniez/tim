import Image from "next/image";

type LastShowCenterpieceProps = {
  title: string;
  src: string;
  alt: string;
  description: string;
  onOpenLightbox: (src: string, alt: string) => void;
};

export default function LastShowCenterpiece({
  title,
  src,
  alt,
  description,
  onOpenLightbox,
}: LastShowCenterpieceProps) {
  return (
    <div className="flex h-[88vh] w-[68vw] min-w-120 max-w-4xl shrink-0 flex-col gap-4">
      <h3 className="shrink-0 text-3xl font-light tracking-tight leading-relaxed text-foreground/75 sm:text-5xl md:text-6xl lg:text-7xl">
        {title}
      </h3>

      <button
        type="button"
        data-gallery-card
        onClick={() => onOpenLightbox(src, alt)}
        aria-label={`View full screen: ${alt}`}
        className="group relative flex-1 min-h-0 overflow-hidden rounded-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover brightness-95 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          draggable={false}
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        >
          <svg
            width="40"
            height="40"
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

      <p
        data-centerpiece-desc
        className="shrink-0 text-lg font-light tracking-tight leading-relaxed text-foreground/70 sm:text-2xl md:text-4xl lg:text-5xl"
      >
        {description}
      </p>
    </div>
  );
}
