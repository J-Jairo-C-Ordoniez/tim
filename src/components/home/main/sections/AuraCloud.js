'use client'

import dynamic from 'next/dynamic'

const ParticleCanvas = dynamic(
    () => import('@/components/home/main/ui/ParticleCanvas'),
    { ssr: false }
)

export default function AuraCloud({ selectedContribution }) {
    const hasSelection = !!selectedContribution?.imageUrl

    return (
        <section className="absolute inset-0 z-0 flex items-stretch">
            {hasSelection ? (
                <>
                    <div className="flex-1 h-full animate-in fade-in duration-700">
                        <ParticleCanvas imageUrl={selectedContribution.imageUrl} />
                    </div>
                    <div
                        key={selectedContribution.id}
                        className="w-[32%] h-full flex flex-col justify-center px-10 gap-6 animate-in fade-in slide-in-from-right-4 duration-700"
                    >
                        <div className="w-8 h-px bg-white/30" />

                        <div className="space-y-1">
                            <p className="text-[9px] tracking-[0.35em] uppercase text-white/30 font-medium">
                                Memory by
                            </p>
                            <p className="text-xl font-light tracking-widest text-white/90 uppercase">
                                {selectedContribution.name}
                            </p>
                        </div>

                        {selectedContribution.message && (
                            <blockquote className="space-y-2">
                                <p className="text-[9px] tracking-[0.35em] uppercase text-white/30 font-medium">
                                    Message
                                </p>
                                <p className="text-sm font-light leading-relaxed text-white/60 italic">
                                    "{selectedContribution.message}"
                                </p>
                            </blockquote>
                        )}

                        <div className="w-8 h-px bg-white/30" />
                    </div>
                </>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <p className="text-[10px] tracking-[0.35em] uppercase text-white/20 font-medium">
                        Select a memory below
                    </p>
                </div>
            )}
        </section>
    )
}