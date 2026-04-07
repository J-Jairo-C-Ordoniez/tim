import Image from "next/image"

export default function Contribution({ selectedContribution, setSelectedContribution }) {
  if (!selectedContribution) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-500">
      {selectedContribution && (
        <article className="bg-foreground border border-primary/10 p-8 rounded-md w-full max-w-md relative flex flex-col items-center">
          <div className="w-full flex justify-end items-center mb-6">
            <button
              onClick={() => setSelectedContribution(null)}
              className="text-primary/50 hover:text-primary transition-colors duration-500 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <figure className="aspect-square w-full mb-10 group">
            <Image
              src={selectedContribution.imageUrl}
              alt={selectedContribution.message}
              width={500}
              height={500}
              className="w-full h-full object-cover border border-white/10 p-1"
            />
            <figcaption className="w-fit mx-auto bg-white text-background text-xs uppercase px-4 py-2 tracking-widest font-medium">
              ENTRY_{selectedContribution.id}
            </figcaption>
          </figure>

          <blockquote className="text-xs md:text-sm font-light tracking-wider text-secondary p-2 space-y-2">
            <p>"{selectedContribution.message}"</p>
            <figcaption>
              — <cite>{selectedContribution.name}</cite>
            </figcaption>
          </blockquote>
        </article>
      )}
    </div>
  )
}

