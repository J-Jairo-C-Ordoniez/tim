'use client'

export default function Hero() {
    return (
        <section className="flex flex-col items-center justify-center text-center space-y-12">
            <header className="space-y-4">
                <div className="w-12 h-px bg-primary/20 mx-auto" />
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-primary">
                    TIM
                </h1>
                <p className="text-xs tracking-widest text-secondary/60 uppercase font-medium">
                    Collective Silhouette
                </p>
                <div className="w-12 h-px bg-primary/20 mx-auto" />
            </header>

            <blockquote className="max-w-xl mx-auto space-y-6">
                <p className="text-lg md:text-xl font-light leading-relaxed text-secondary/80 text-balance">
                    "I want to be remembered for the person I am, not the brand I became."
                </p>

                <footer className="text-xs tracking-widest text-secondary/80 uppercase">
                    — Tim Bergling, 1989–2018
                </footer>
            </blockquote>
        </section>
    )
}
