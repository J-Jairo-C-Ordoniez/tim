'use client'

import Image from 'next/image'

export default function ContributionStrip({ contributions, selectedContribution, setSelectedContribution }) {
    if (!contributions || contributions.length === 0) return null

    return (
        <div className="w-full py-3 flex items-center justify-center gap-2 overflow-x-auto scrollbar-thin">
            {contributions.map((c, i) => {
                const isSelected = selectedContribution?.id === c.id

                return (
                    <button
                        key={c.id ?? i}
                        onClick={() => setSelectedContribution(c)}
                        title={c.name}
                        style={{
                            flexShrink: 0,
                            outline: isSelected
                                ? '2px solid rgba(255,255,255,0.75)'
                                : '2px solid transparent',
                            outlineOffset: '2px',
                            transition: 'all 0.3s ease',
                            opacity: isSelected ? 1 : 0.45,
                        }}
                        className="relative group w-9 h-9 rounded-full overflow-hidden cursor-pointer hover:opacity-100 hover:scale-115 transition-all duration-300"
                    >
                        {c.thumbnailUrl ? (
                            <Image
                                src={c.thumbnailUrl}
                                alt={c.name ?? 'Contribution'}
                                fill
                                sizes="36px"
                                className="object-cover"
                                unoptimized
                            />
                        ) : (
                            <div className="w-full h-full bg-white/10 flex items-center justify-center text-[8px] text-white/40 font-medium uppercase">
                                {(c.name ?? '?')[0]}
                            </div>
                        )}
                        
                        <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 bg-black/80 text-white text-[9px] tracking-widest uppercase rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {c.name}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
