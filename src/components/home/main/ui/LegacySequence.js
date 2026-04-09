'use client'

import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Object3D, Color, Vector3 } from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const tempObject = new Object3D()

// Background Space River (Cosmic atmosphere)
function SpaceRiverBackground() {
    const meshRef = useRef()
    const totalParticles = 2500
    
    const simRef = useRef({
        positions: Array.from({ length: totalParticles }, () => new Vector3((Math.random() - 0.5) * 45, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 20)),
        velocities: Array.from({ length: totalParticles }, () => new Vector3(0, 0, 0))
    })

    useFrame((state) => {
        if (!meshRef.current) return
        const { positions } = simRef.current
        const time = state.clock.getElapsedTime()
        
        for (let i = 0; i < totalParticles; i++) {
            const pos = positions[i]
            pos.x += Math.sin(time * 0.05 + i) * 0.003
            pos.y += Math.cos(time * 0.05 + i) * 0.003
            
            if (pos.x > 25) pos.x = -25
            tempObject.position.set(pos.x, pos.y, pos.z)
            tempObject.scale.setScalar(0.02 + Math.sin(time * 2 + i) * 0.01)
            tempObject.updateMatrix()
            meshRef.current.setMatrixAt(i, tempObject.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, totalParticles]}>
            <circleGeometry args={[1, 6]} />
            <meshBasicMaterial transparent opacity={0.25} color="#ffffff" />
        </instancedMesh>
    )
}

export default function LegacySequence({ contributions, withAudio }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [showFinalMessage, setShowFinalMessage] = useState(false)
    const scrollContainerRef = useRef(null)
    const wrapperRef = useRef(null)

    useEffect(() => {
        if (!contributions.length) return

        const ctx = gsap.context(() => {
            const scroller = scrollContainerRef.current.parentElement

            ScrollTrigger.create({
                trigger: scrollContainerRef.current,
                scroller: scroller,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5, // Smoother scrub
                onUpdate: (self) => {
                    const p = self.progress
                    setProgress(p)
                    const index = Math.min(
                        Math.floor(p * contributions.length),
                        contributions.length - 1
                    )
                    setCurrentIndex(index)
                    if (p > 0.98) setShowFinalMessage(true)
                    else if (p < 0.95) setShowFinalMessage(false)
                }
            })
        }, scrollContainerRef)

        return () => ctx.revert()
    }, [contributions.length])

    const currentContribution = contributions[currentIndex] || contributions[0]
    
    // Calculate local progress within the current "slide" (0 to 1)
    const slideProgress = (progress * contributions.length) % 1
    
    // Smooth transforms based on slideProgress
    const imageTransform = {
        y: (0.5 - slideProgress) * 100, // Move from 50 to -50
        scale: 0.95 + Math.sin(slideProgress * Math.PI) * 0.1, // Scale up in middle
        opacity: Math.sin(slideProgress * Math.PI), // Fade in and out
        rotate: (0.5 - slideProgress) * 5 // Subtle tilt
    }

    const textTransform = {
        y: (0.5 - slideProgress) * 150, // Faster parallax for text
        opacity: Math.sin(slideProgress * Math.PI) ** 2, // Sharper fade
        blur: (0.5 - Math.sin(slideProgress * Math.PI)) * 20 // Blur in/out
    }

    return (
        <div ref={scrollContainerRef} className="relative w-full bg-black" style={{ height: `${contributions.length * 250}vh` }}>
            {withAudio && <audio src="/avicii.mp3" autoPlay loop className="hidden" />}

            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
                
                {/* 3D Background */}
                <div className="absolute inset-0 z-0">
                    <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
                        <SpaceRiverBackground />
                    </Canvas>
                </div>

                {/* Scrollytelling Choreography Layer */}
                {!showFinalMessage && (
                    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-20 pointer-events-none">
                        
                        {/* Dynamic Image Slot */}
                        <div className="flex justify-center lg:justify-end order-2 lg:order-1">
                            <div 
                                style={{ 
                                    transform: `translateY(${imageTransform.y}px) scale(${imageTransform.scale}) rotate(${imageTransform.rotate}deg)`,
                                    opacity: imageTransform.opacity
                                }}
                                className="relative w-[280px] h-[350px] md:w-[400px] md:h-[500px] lg:w-[480px] lg:h-[600px] transition-transform duration-100 ease-out"
                            >
                                <div className="absolute -inset-4 border border-white/5" />
                                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary" />
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary" />
                                
                                <Image 
                                    src={currentContribution.imageUrl} 
                                    alt={currentContribution.name}
                                    fill
                                    priority
                                    className="object-cover grayscale brightness-110"
                                />
                            </div>
                        </div>

                        {/* Dynamic Text Slot */}
                        <div 
                            style={{ 
                                transform: `translateY(${textTransform.y}px)`,
                                opacity: textTransform.opacity,
                                filter: `blur(${textTransform.blur}px)`
                            }}
                            className="space-y-10 lg:space-y-16 text-center lg:text-left order-1 lg:order-2"
                        >
                            <div className="space-y-4">
                                <p className="text-[10px] md:text-xs tracking-[0.8em] uppercase text-primary font-black">
                                    Member {currentIndex + 1}
                                </p>
                                <h2 className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter text-white uppercase leading-[0.85]">
                                    {currentContribution.name}
                                </h2>
                            </div>

                            <div className="space-y-6 max-w-xl mx-auto lg:mx-0">
                                <div className="flex items-center gap-6 justify-center lg:justify-start">
                                    <div className="h-px w-12 bg-white/30" />
                                    <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50">Shared Light</p>
                                </div>
                                <p className="text-xl md:text-3xl lg:text-4xl font-light italic leading-tight text-white/90 tracking-tight">
                                    "{currentContribution.message || 'The music lives on through us.'}"
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Global Overlays */}
                <div className="absolute top-10 left-10 pointer-events-none opacity-20">
                     <h1 className="text-4xl font-black italic text-white tracking-tighter uppercase">LEGACY</h1>
                </div>

                {/* Final Gratitude Overlay */}
                {showFinalMessage && (
                    <div className="absolute inset-0 z-110 bg-black/98 flex flex-col items-center justify-center text-center p-10 animate-in fade-in zoom-in-95 duration-1500">
                        <div className="space-y-12 max-w-5xl px-6">
                            <p className="text-[11px] tracking-[1em] uppercase text-primary font-black">Tribute Complete</p>
                            <h2 className="text-7xl md:text-[12rem] font-black italic tracking-tighter text-white uppercase leading-[0.80]">
                                FOREVER <br/>TIM
                            </h2>
                            <div className="w-40 h-px bg-white/40 mx-auto" />
                            <p className="text-xl md:text-3xl font-light text-white/70 tracking-[0.15em] leading-relaxed max-w-3xl mx-auto italic">
                                Thank you for adding your light to the collective silhouette. <br/>
                                Tim Bergling (1989 — 2018)
                            </p>
                            
                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-16 px-16 py-6 border border-white/20 text-xs tracking-[0.6em] uppercase text-white font-black hover:bg-white hover:text-black transition-all pointer-events-auto backdrop-blur-md"
                            >
                                Back to Mural
                            </button>
                        </div>
                    </div>
                )}

                {/* Cinematic Progress Indicator */}
                <div className="absolute right-12 bottom-12 flex flex-col items-end gap-6 select-none">
                     <div className="text-right">
                        <p className="text-[9px] tracking-[0.5em] text-white/20 uppercase mb-1">Legacy Progress</p>
                        <span className="text-2xl font-black italic text-white tracking-tighter">{Math.round(progress * 100)}%</span>
                     </div>
                     <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden">
                        <div 
                            className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
                            style={{ width: `${progress * 100}%` }}
                        />
                     </div>
                </div>

                {/* Floating "Background" Text for Depth */}
                {!showFinalMessage && (
                    <div className="absolute inset-0 pointer-events-none z-[-1] flex items-center justify-center opacity-[0.03]">
                        <h1 className="text-[25vw] font-black uppercase text-white tracking-widest leading-none">
                            {currentContribution.name}
                        </h1>
                    </div>
                )}
            </div>
        </div>
    )
}
