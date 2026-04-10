'use client'

import { useState, useEffect } from 'react'
import { useContributions } from '@/hooks/useContributions'
import dynamic from 'next/dynamic'
import AuraCloud from './sections/AuraCloud'
import ContributionStrip from './sections/ContributionStrip'
import Modal from './ui/Modal'
import Foot from './sections/Foot'

const LegacySequence = dynamic(
    () => import('./ui/LegacySequence'),
    { ssr: false }
)

export default function Main() {
    const { contributions, loading, refresh } = useContributions()
    const [selectedContribution, setSelectedContribution] = useState(null)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const [isLegacyActive, setIsLegacyActive] = useState(false)
    const [withAudio, setWithAudio] = useState(true)
    const progression = 120
    const totalSlots = 120

    useEffect(() => {
        if (contributions.length > 0 && selectedContribution === null) {
            setSelectedContribution(contributions[0])
        }
    }, [contributions])

    return (
        <main className="w-full h-[calc(100vh-64px)] bg-background font-inter box-border overflow-hidden flex flex-col relative">
            {isLegacyActive && (
                <div className="fixed inset-0 z-100 bg-background overflow-y-auto animate-in fade-in duration-1000">
                    <LegacySequence contributions={contributions} withAudio={withAudio} />
                </div>
            )}

            {progression >= 120 && !isLegacyActive && (
                <section className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-700">
                    <div className="flex flex-col items-center gap-12 max-w-sm w-full">
                        <div className="text-center space-y-2">
                            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-bold">Objetive Reached</p>
                            <h2 className="text-4xl font-black tracking-tighter text-secondary uppercase italic">120 Memories</h2>
                        </div>

                        <button
                            onClick={() => setIsLegacyActive(true)}
                            className="cursor-pointer group w-full py-6 bg-foreground text-primary text-xs tracking-widest uppercase font-bold hover:bg-foreground/50 transition-all duration-500 overflow-hidden"
                        >
                            <span className="transition-colors duration-500">Start Legacy</span>
                        </button>

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input 
                                    type="checkbox" 
                                    checked={withAudio} 
                                    onChange={(e) => setWithAudio(e.target.checked)}
                                    className="peer sr-only"
                                />
                                <div className="w-10 h-5 bg-white/10 rounded-full peer peer-checked:bg-primary transition-all duration-300" />
                                <div className="absolute top-1 left-1 w-3 h-3 bg-foreground rounded-full peer-checked:translate-x-5 transition-all duration-300" />
                            </div>
                            <span className="text-xs tracking-widest text-primary/40 uppercase group-hover:text-primary/60 transition-colors">
                                {withAudio ? 'Vivir con Sonido' : 'Experiencia en Silencio'}
                            </span>
                        </label>
                    </div>
                </section>
            )}

            <section className="relative flex-1 w-full overflow-hidden">
                <AuraCloud
                    selectedContribution={selectedContribution}
                    totalContributions={progression}
                />

                <Modal
                    isOpen={isUploadModalOpen}
                    onClose={() => setIsUploadModalOpen(false)}
                    onSuccess={() => {
                        refresh()
                        setIsUploadModalOpen(false)
                    }}
                />
            </section>

            <ContributionStrip
                contributions={contributions}
                selectedContribution={selectedContribution}
                setSelectedContribution={setSelectedContribution}
            />

            <Foot
                progression={progression}
                totalSlots={totalSlots}
                setIsUploadModalOpen={setIsUploadModalOpen}
            />
        </main>
    )
}