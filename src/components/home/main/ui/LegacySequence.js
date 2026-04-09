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

// Background Space River (No image mapping now, just atmosphere)
function SpaceRiverBackground() {
    const meshRef = useRef()
    const { viewport } = useThree()
    const totalParticles = 3000
    
    const simRef = useRef({
        positions: Array.from({ length: totalParticles }, () => new Vector3((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20)),
        velocities: Array.from({ length: totalParticles }, () => new Vector3(0, 0, 0))
    })

    useFrame((state) => {
        if (!meshRef.current) return
        const { positions, velocities } = simRef.current
        const time = state.clock.getElapsedTime()
        
        for (let i = 0; i < totalParticles; i++) {
            const pos = positions[i]
            const vel = velocities[i]

            // Cosmic drift
            const driftX = Math.sin(time * 0.1 + i) * 0.005
            const driftY = Math.cos(time * 0.1 + i) * 0.005
            
            pos.x += driftX
            pos.y += driftY
            
            // Loop particles correctly
            if (pos.x > 20) pos.x = -20
            if (pos.x < -20) pos.x = 20

            tempObject.position.set(pos.x, pos.y, pos.z)
            tempObject.scale.setScalar(0.02 + Math.sin(time + i) * 0.01)
            tempObject.updateMatrix()
            meshRef.current.setMatrixAt(i, tempObject.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, totalParticles]}>
            <circleGeometry args={[1, 6]} />
            <meshBasicMaterial transparent opacity={0.3} color="#ffffff" />
        </instancedMesh>
    )
}

export default function LegacySequence({ contributions, withAudio }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showFinalMessage, setShowFinalMessage] = useState(false)
    const scrollContainerRef = useRef(null)
    const textRef = useRef(null)
    const imageRef = useRef(null)

    useEffect(() => {
        if (!contributions.length) return

        const ctx = gsap.context(() => {
            // Find the scrollable parent (the fixed overlay)
            const scroller = scrollContainerRef.current.parentElement

            ScrollTrigger.create({
                trigger: scrollContainerRef.current,
                scroller: scroller,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress
                    const index = Math.min(
                        Math.floor(progress * contributions.length),
                        contributions.length - 1
                    )
                    
                    if (index !== currentIndex) {
                        setCurrentIndex(index)
                        // Trigger sharp text/image animation on change
                        if (textRef.current && imageRef.current) {
                            gsap.fromTo(textRef.current, 
                                { opacity: 0, y: 40, filter: 'blur(10px)' }, 
                                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: "power4.out" }
                            )
                            gsap.fromTo(imageRef.current, 
                                { scale: 0.9, opacity: 0, rotate: -2 }, 
                                { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: "expo.out" }
                            )
                        }
                    }

                    if (progress > 0.98) setShowFinalMessage(true)
                    else if (progress < 0.95) setShowFinalMessage(false)
                }
            })
        })

        return () => ctx.revert()
    }, [contributions.length, currentIndex])

    const currentContribution = contributions[currentIndex] || contributions[0]

    return (
        <div ref={scrollContainerRef} className="relative w-full bg-black" style={{ height: `${contributions.length * 200}vh` }}>
            {withAudio && <audio src="/avicii.mp3" autoPlay loop className="hidden" />}

            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
                {/* 3D Atmosphere */}
                <div className="absolute inset-0 z-0">
                    <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
                        <SpaceRiverBackground />
                    </Canvas>
                </div>

                {/* Scrollytelling Content Layer */}
                <div className="relative z-10 w-full max-w-6xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 pointer-events-none">
                    
                    {/* Image Column */}
                    <div className="flex justify-center lg:justify-end">
                        <div ref={imageRef} className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] lg:w-[450px] lg:h-[600px] grayscale hover:grayscale-0 transition-all duration-700">
                             {/* Frame Decoration */}
                             <div className="absolute -inset-4 border border-white/10" />
                             <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary" />
                             <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary" />
                             
                             <Image 
                                src={currentContribution.imageUrl} 
                                alt={currentContribution.name}
                                fill
                                className="object-cover"
                             />
                        </div>
                    </div>

                    {/* Text Column */}
                    <div ref={textRef} className="space-y-8 lg:space-y-12 text-left">
                        {!showFinalMessage && (
                            <>
                                <div className="space-y-4">
                                    <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-primary font-bold">
                                        Collective light archive
                                    </p>
                                    <div className="overflow-hidden">
                                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-white uppercase italic leading-none">
                                            {currentContribution.name}
                                        </h2>
                                    </div>
                                </div>

                                <div className="space-y-4 max-w-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="h-[2px] w-8 bg-white/20" />
                                        <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/40">
                                            Message from the soul
                                        </p>
                                    </div>
                                    <p className="text-lg md:text-2xl font-light italic leading-tight text-white/80 tracking-tight">
                                        "{currentContribution.message || 'No message shared.'}"
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Constant UI Elements */}
                <div className="absolute top-10 left-10 pointer-events-none">
                     <h1 className="text-3xl font-black italic text-white/10 tracking-tighter uppercase">LEGACY</h1>
                </div>

                {/* Final Gratitude Overlay */}
                {showFinalMessage && (
                    <div className="absolute inset-0 z-[110] bg-black/98 flex flex-col items-center justify-center text-center p-10 animate-in fade-in zoom-in-95 duration-1000">
                        <div className="space-y-10 max-w-4xl px-6">
                            <p className="text-[10px] md:text-xs tracking-[0.8em] uppercase text-primary font-bold">Tribute Complete</p>
                            <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter text-white uppercase leading-[0.85]">
                                FOREVER <br/>IN OUR HEARTS
                            </h2>
                            <div className="w-24 h-[2px] bg-white/40 mx-auto" />
                            <p className="text-lg md:text-2xl font-light text-white/70 tracking-widest leading-relaxed max-w-2xl mx-auto">
                                Thank you for adding your light to the legacy. <br/>
                                Tim's music remains the thread that unites us.
                            </p>
                            
                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-12 px-12 py-5 border border-white/20 text-xs tracking-[0.4em] uppercase text-white font-bold hover:bg-white hover:text-black transition-all pointer-events-auto"
                            >
                                Back to Mural
                            </button>
                        </div>
                    </div>
                )}

                {/* Desktop Specific Nav */}
                <div className="absolute bottom-10 left-10 hidden md:block select-none text-[9px] tracking-[0.5em] text-white/20 uppercase vertical-lr">
                    Scroll to reveal memories
                </div>
                
                {/* Scroll Indicator (Vertical Progress) */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
                     <span className="text-[9px] tracking-widest text-white/20 font-bold">{Math.round(((currentIndex + 1) / contributions.length) * 100)}%</span>
                     <div className="h-64 w-[1px] bg-white/10 relative overflow-hidden">
                        <div 
                            className="absolute top-0 left-0 w-full bg-primary transition-all duration-300"
                            style={{ height: `${((currentIndex + 1) / contributions.length) * 100}%` }}
                        />
                     </div>
                </div>
            </div>
        </div>
    )
}
