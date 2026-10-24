import { createPortal } from "react-dom";
import Image from "next/image";

type LastShowLightboxProps = {
  src: string;
  alt: string;
  onClose: () => void;
};

export default function LastShowLightbox({
  src,
  alt,
  onClose,
}: LastShowLightboxProps) {
  return createPortal(
    <button
      type="button"
      className="fixed inset-0 z-9999 flex items-center justify-center bg-background/95 backdrop-blur-sm cursor-zoom-out focus:outline-none"
      onClick={onClose}
      aria-label="Close full screen image"
    >
      <div
        className="pointer-events-none absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-background/60"
        aria-hidden="true"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="text-foreground-muted"
        >
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1000}
        sizes="90vw"
        className="max-h-[90vh] max-w-[90vw] w-auto h-auto rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        priority
      />
    </button>,
    document.body,
  );
}
