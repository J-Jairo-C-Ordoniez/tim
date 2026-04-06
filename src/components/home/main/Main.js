'use client'

import { useState } from 'react'
import { useContributions } from '@/hooks/useContributions'
import Hero from "./sections/Hero"
import AuraCloud from "./sections/AuraCloud"
import Foot from "./sections/Foot"


export default function Main() {
    const { contributions, loading } = useContributions()
    const [selectedContribution, setSelectedContribution] = useState(null)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

    const progression = contributions.length
    const totalSlots = 120

    const messages = contributions
        .filter(c => c.message && c.message.length > 0)
        .slice(0, 15)


    return (
        <main className="w-full h-full bg-background font-inter">
            <div className="container mx-auto px-4 md:px-8 h-16 flex flex-col items-center justify-between">
                <section className="border w-full h-full">
                    <AuraCloud
                        contributions={contributions}
                        selectedContribution={selectedContribution}
                        setSelectedContribution={setSelectedContribution}
                    />

                    <Hero />
                </section>

                <Foot
                    progression={progression}
                    totalSlots={totalSlots}
                    setIsUploadModalOpen={setIsUploadModalOpen}
                />
            </div>
        </main>
    )
}