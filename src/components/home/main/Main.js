'use client'

import { useState, useEffect } from 'react'
import { useContributions } from '@/hooks/useContributions'
import AuraCloud from './sections/AuraCloud'
import ContributionStrip from './sections/ContributionStrip'
import Modal from './ui/Modal'
import Foot from './sections/Foot'


export default function Main() {
    const { contributions, loading, refresh } = useContributions()
    const [selectedContribution, setSelectedContribution] = useState(null)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

    const progression = contributions.length
    const totalSlots = 120

    useEffect(() => {
        if (contributions.length > 0 && selectedContribution === null) {
            setSelectedContribution(contributions[0])
        }
    }, [contributions])


    return (
        <main className="w-full h-[calc(100vh-64px)] bg-background font-inter box-border overflow-hidden flex flex-col">
            <section className="relative flex-1 w-full overflow-hidden">
                <AuraCloud
                    selectedContribution={selectedContribution}
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