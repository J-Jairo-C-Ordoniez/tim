'use client'

export default function AboutHero() {
    return (
        <section className="flex flex-col items-center justify-center text-center space-y-12">
            <header className="space-y-4">
                <div className="w-12 h-px bg-white/20 mx-auto" />
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-white/90">
                    Tim Bergling
                </h1>
                <p className="text-[10px] tracking-[0.6em] text-white/30 uppercase font-medium">
                    The Infinite Memory
                </p>
                <div className="w-12 h-px bg-white/20 mx-auto" />
            </header>

            <blockquote className="max-w-xl mx-auto space-y-6">
                <p className="text-lg md:text-2xl font-light leading-relaxed text-white/60 text-balance">
                    "I want to be remembered for the person I am, not the brand I became."
                </p>
                <footer className="text-[9px] tracking-[0.4em] text-white/20 uppercase">
                    — Tim Bergling, 1989–2018
                </footer>
            </blockquote>
        </section>
    )
}
