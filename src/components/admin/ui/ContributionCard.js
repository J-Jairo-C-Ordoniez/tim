'use client'

import Image from 'next/image'

export default function ContributionCard({ contribution, onAction }) {
    return (
        <div className="bg-[#0c0c0c] border border-white/5 p-6 group hover:border-white/10 transition-all duration-700 space-y-6">
            <div className="relative aspect-square overflow-hidden bg-white/2 border border-white/5">
                <Image
                    src={contribution.imageUrl}
                    alt={contribution.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    unoptimized
                />
                <div className="absolute top-3 left-3 bg-white/10 px-2 py-0.5 text-[7px] text-white/50 tracking-widest font-bold uppercase backdrop-blur-md border border-white/10">
                    ENTRY #{contribution.id}
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-1">
                    <p className="text-[8px] tracking-[0.3em] uppercase text-white/30 font-medium">
                        Contributor
                    </p>
                    <p className="text-sm font-light tracking-[0.2em] text-white/90 uppercase truncate">
                        {contribution.name}
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-[8px] tracking-[0.3em] uppercase text-white/30 font-medium">
                        Message
                    </p>
                    <p className="text-xs font-light text-white/40 italic leading-relaxed line-clamp-3">
                        "{contribution.message}"
                    </p>
                </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-white/5">
                <button
                    onClick={() => onAction(contribution.id, 'approve')}
                    className="flex-1 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-white text-[9px] tracking-[0.3em] font-medium uppercase py-3 transition-all duration-300"
                >
                    Approve
                </button>
                <button
                    onClick={() => onAction(contribution.id, 'reject')}
                    className="flex-1 bg-white/1 border border-white/5 hover:bg-red-900/20 hover:border-red-500/30 text-white/40 hover:text-red-500 text-[9px] tracking-[0.3em] font-medium uppercase py-3 transition-all duration-300"
                >
                    Reject
                </button>
            </div>
        </div>
    )
}
