'use client'

import Image from 'next/image'

export default function ContributionCard({ contribution, onAction }) {
    return (
        <article className="bg-foreground border border-primary/5 p-6 group hover:border-primary/10 transition-all duration-700 space-y-6">
            <div className="relative aspect-square overflow-hidden bg-primary/2 border border-primary/5">
                <Image
                    src={contribution.imageUrl}
                    alt={contribution.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized
                />
            </div>

            <p className="bg-primary/10 w-fit px-2 py-1 text-xs text-primary/90 tracking-widest font-light uppercase backdrop-blur-md border border-primary/10">
                ENTRY #{contribution.id}
            </p>

            <blockquote className="space-y-4">
                <div className="space-y-1">
                    <p className="text-xs tracking-widest uppercase text-primary/30 font-medium">
                        Contributor
                    </p>
                    <p className="text-sm font-light tracking-widest text-primary/90 uppercase truncate">
                        {contribution.name}
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs tracking-widest uppercase text-primary/30 font-medium">
                        Message
                    </p>
                    <p className="text-sm font-light text-primary/90 italic leading-relaxed line-clamp-3">
                        "{contribution.message}"
                    </p>
                </div>
            </blockquote>

            <div className="flex gap-2 pt-4 border-t border-white/5">
                <button
                    onClick={() => onAction(contribution.id, 'approve')}
                    className="cursor-pointer flex-1 bg-primary/5 border border-primary/5 hover:bg-primary/10 hover:border-primary/20 text-primary/90 text-xs tracking-widest font-medium uppercase py-3 transition-all duration-300"
                >
                    Approve
                </button>
                <button
                    onClick={() => onAction(contribution.id, 'reject')}
                    className="cursor-pointer flex-1 bg-primary/5 border border-primary/5 hover:bg-red-900/20 hover:border-red-500/30 text-primary/90 text-xs tracking-widest font-medium uppercase py-3 transition-all duration-300"
                >
                    Reject
                </button>
            </div>
        </article>
    )
}
