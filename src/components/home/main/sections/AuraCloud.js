'use client'

import dynamic from 'next/dynamic'

const ParticleCanvas = dynamic(
    () => import('@/components/home/main/ui/ParticleCanvas'),
    { ssr: false }
)

export default function AuraCloud({ selectedContribution, totalContributions }) {
    const hasSelection = !!selectedContribution?.imageUrl

    return (
        <section className="w-full h-full flex flex-col lg:flex-row items-stretch overflow-y-auto lg:overflow-hidden">
            {hasSelection ? (
                <>
                    <div className="w-full h-[50vh] lg:h-full lg:flex-1 animate-in fade-in duration-700">
                        <ParticleCanvas 
                            imageUrl={selectedContribution.imageUrl} 
                            totalContributions={totalContributions}
                        />
                    </div>
                    <div
                        key={selectedContribution.id}
                        className="w-full lg:w-1/3 h-auto lg:h-full flex flex-col justify-center px-6 lg:px-10 py-10 lg:py-0 gap-6 animate-in fade-in slide-in-from-bottom-4 lg:slide-in-from-right-4 duration-700"
                    >
                        <div className="space-y-1 pt-6 lg:pt-10 border-t border-primary/4">
                            <p className="text-[10px] lg:text-xs tracking-widest uppercase text-secondary/30 font-light">
                                Memory by
                            </p>
                            <p className="text-lg lg:text-xl font-medium tracking-widest text-primary/90 uppercase">
                                {selectedContribution.name}
                            </p>
                        </div>

                        {selectedContribution.message && (
                            <blockquote className="space-y-2 pb-6 lg:pb-10 border-b border-primary/4">
                                <p className="text-[10px] lg:text-xs tracking-widest uppercase text-secondary/30 font-light">
                                    Message
                                </p>
                                <p className="text-xs lg:text-sm font-light leading-relaxed text-primary/80 italic">
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