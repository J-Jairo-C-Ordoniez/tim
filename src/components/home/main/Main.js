'use client'

import { useState } from 'react'
import { useContributions } from '@/hooks/useContributions'
import Contribution from "./sections/Contribution"
import AuraCloud from "./sections/AuraCloud"
import Messages from "./sections/Messages"
import Modal from "./ui/Modal"
import Foot from "./sections/Foot"


export default function Main() {
    const { contributions, loading, refresh } = useContributions()
    const [selectedContribution, setSelectedContribution] = useState(null)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

    const progression = contributions.length
    const totalSlots = 120

    const messages = contributions
        .filter(c => c.message && c.message.length > 0)
        .slice(0, 15)


    return (
        <main className="w-full h-[calc(100vh-64px)] bg-background font-inter box-border overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 flex flex-col items-center justify-between h-full">
                <section className="w-full h-full relative">
                    {/* <AuraCloud
                        contributions={contributions}
                        setSelectedContribution={setSelectedContribution}
                    /> */}

                    {contributions.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border">
                            {contributions.map((contribution, index) => (
                                <button
                                    key={index}
                                    className="flex items-center justify-center bg-background/90 backdrop-blur-3xl animate-in fade-in zoom-in duration-700"
                                    onClick={() => setSelectedContribution(contribution)}
                                >
                                    <p>{contribution.name}</p>
                                    <img src={contribution.thumbnailUrl} alt="" />
                                </button>
                            ))}
                        </div>
                    )}


                    <Messages
                        messages={messages}
                    />

                    <Contribution
                        selectedContribution={selectedContribution}
                        setSelectedContribution={setSelectedContribution}
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

                <Foot
                    progression={progression}
                    totalSlots={totalSlots}
                    setIsUploadModalOpen={setIsUploadModalOpen}
                />
            </div>
        </main>
    )
}