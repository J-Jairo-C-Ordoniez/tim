'use client'

import dynamic from 'next/dynamic'

const ParticleCanvas = dynamic(
    () => import('@/components/home/main/ui/ParticleCanvas'),
    { ssr: false }
)

export default function AuraCloud({ selectedContribution }) {
    const hasSelection = !!selectedContribution?.imageUrl

    return (
        <section className="w-full h-full flex items-stretch">
            {hasSelection ? (
                <>
                    <div className="flex-1 h-full animate-in fade-in duration-700">
                        <ParticleCanvas imageUrl={selectedContribution.imageUrl} />
                    </div>
                    <div
                        key={selectedContribution.id}
                        className="w-1/3 h-full flex flex-col justify-center px-10 gap-6 animate-in fade-in slide-in-from-right-4 duration-700"
                    >
                        <div className="space-y-1 pt-10 border-t border-primary/4">
                            <p className="text-xs tracking-widest uppercase text-secondary/30 font-light">
                                Memory by
                            </p>
                            <p className="text-xl font-medium tracking-widest text-primary/90 uppercase">
                                {selectedContribution.name}
                            </p>
                        </div>

                        {selectedContribution.message && (
                            <blockquote className="space-y-2 pb-10 border-b border-primary/4">
                                <p className="text-xs tracking-widest uppercase text-secondary/30 font-light">
                                    Message
                                </p>
                                <p className="text-sm font-light leading-relaxed text-primary/80 italic">
                                    "{selectedContribution.message}"
                                </p>
                            </blockquote>
                        )}
                    </div>
                </>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <p className="text-md tracking-widest uppercase text-primary/80 font-medium">
                        Select a memory below
                    </p>
                </div>
            )}
        </section>
    )
}