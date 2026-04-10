'use client'

import Image from 'next/image'

export default function MemorySlide({ contribution, index, imageTransform, textTransform }) {
    if (!contribution) return null

    return (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-20 pointer-events-none">
            <div className="flex justify-center lg:justify-end order-2 lg:order-1">
                <div 
                    style={{ 
                        transform: `translateY(${imageTransform.y}px) scale(${imageTransform.scale}) rotate(${imageTransform.rotate}deg)`,
                        opacity: imageTransform.opacity
                    }}
                    className="relative w-[280px] h-[400px] md:w-[400px] md:h-[500px] lg:w-[480px] lg:h-[600px] transition-transform duration-100 ease-out"
                >
                    <div className="absolute -inset-4 border border-primary/5" />
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary" />
                    
                    <Image 
                        src={contribution.imageUrl} 
                        alt={contribution.name}
                        fill
                        priority
                        className="object-cover grayscale brightness-110"
                    />
                </div>
            </div>
            
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
                        Member {index + 1}
                    </p>
                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter text-primary uppercase leading-[0.85]">
                        {contribution.name}
                    </h2>
                </div>

                <div className="space-y-6 max-w-xl mx-auto lg:mx-0">
                    <div className="flex items-center gap-6 justify-center lg:justify-start">
                        <div className="h-px w-12 bg-primary/30" />
                        <p className="text-[10px] md:text-xs tracking-widest uppercase text-primary/50">Shared Light</p>
                    </div>
                    <p className="text-xl md:text-3xl lg:text-4xl font-light italic leading-tight text-white/90 tracking-tight">
                        "{contribution.message || 'The music lives on through us.'}"
                    </p>
                </div>
            </div>
        </div>
    )
}
