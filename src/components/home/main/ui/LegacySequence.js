'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import SpaceBackground from './legacy/SpaceBackground'
import MemorySlide from './legacy/MemorySlide'
import CreditsRoll from './legacy/CreditsRoll'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export default function LegacySequence({ contributions, withAudio }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [showFinalMessage, setShowFinalMessage] = useState(false)
    const scrollContainerRef = useRef(null)

    useEffect(() => {
        if (!contributions.length) return

        const ctx = gsap.context(() => {
            const scroller = scrollContainerRef.current.parentElement

            ScrollTrigger.create({
                trigger: scrollContainerRef.current,
                scroller: scroller,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.1,
                onUpdate: (self) => {
                    const p = self.progress
                    setProgress(p)
                    const index = Math.min(
                        Math.floor(p * contributions.length),
                        contributions.length - 1
                    )
                    setCurrentIndex(index)
                    if (p > 0.985) setShowFinalMessage(true)
                    else if (p < 0.97) setShowFinalMessage(false)
                }
            })
        }, scrollContainerRef)

        return () => ctx.revert()
    }, [contributions.length])

    const currentContribution = contributions[currentIndex] || contributions[0]
    let slideProgress = (progress * contributions.length) % 1
    
    if (currentIndex === 0 && progress < (1 / contributions.length) * 0.5) slideProgress = 0.5
    if (currentIndex === contributions.length - 1 && progress > 0.95) slideProgress = 0.5

    const focusIntensity = Math.sin(slideProgress * Math.PI)
    const wideFocus = Math.pow(focusIntensity, 0.4)

    const imageTransform = {
        y: (0.5 - slideProgress) * 60,
        scale: 0.97 + wideFocus * 0.03,
        opacity: wideFocus,
        rotate: (0.5 - slideProgress) * 3
    }

    const textTransform = {
        y: (0.5 - slideProgress) * 100,
        opacity: Math.pow(focusIntensity, 1.5),
        blur: Math.max(0, (1 - wideFocus) * 15)
    }

    return (
        <section 
            ref={scrollContainerRef} 
            className="relative w-full bg-black" 
            style={{ height: `${contributions.length * 125}vh` }}
        >
            {withAudio && <audio src="/avicii.mp3" autoPlay loop className="hidden" />}

            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
                        <SpaceBackground />
                    </Canvas>
                </div>

                {!showFinalMessage ? (
                    <MemorySlide 
                        contribution={currentContribution}
                        index={currentIndex}
                        imageTransform={imageTransform}
                        textTransform={textTransform}
                    />
                ) : (
                    <CreditsRoll contributions={contributions} />
                )}

                <div className="absolute top-10 left-10 pointer-events-none opacity-20">
                     <h1 className="text-4xl font-black italic text-primary tracking-tighter uppercase">LEGACY</h1>
                </div>

                <aside className="absolute right-12 bottom-12 flex flex-col items-end gap-6 select-none z-50">
                     <div className="text-right">
                        <p className="text-[9px] tracking-[0.5em] text-primary/50 uppercase mb-1">Legacy Progress</p>
                        <span className="text-2xl font-black italic text-primary tracking-tighter">{Math.round(progress * 100)}%</span>
                     </div>
                     <div className="w-48 h-px bg-primary/10 relative overflow-hidden">
                        <div 
                            className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
                            style={{ width: `${progress * 100}%` }}
                        />
                     </div>
                </aside>

                {!showFinalMessage && (
                    <div className="absolute inset-0 pointer-events-none -z-1 flex items-center justify-center opacity-[0.03]">
                        <h1 className="text-[25vw] font-black uppercase text-primary tracking-widest leading-none">
                            {currentContribution.name}
                        </h1>
                    </div>
                )}
            </div>
        </section>
    )
}
