'use client'

export default function AboutContent() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start max-w-4xl mx-auto">
            <div className="space-y-12">
                <header className="space-y-4">
                    <div className="w-8 h-px bg-white/20" />
                    <h2 className="text-xl font-light tracking-[0.3em] uppercase text-white/90">
                        The Project
                    </h2>
                </header>
                <div className="space-y-6 text-sm text-white/50 leading-loose tracking-wide font-light">
                    <p>
                        TIM is a collective digital tribute born from the global impact of Tim Bergling's music. In an industry of fleeting moments, his melodies spoke to the universal human experience.
                    </p>
                    <p>
                        This platform allows fans from around the world to contribute a pixel to an ever-evolving silhouette. Each point of light in the cloud represents a memory, a message, or a story shared by someone whose life was touched by his work.
                    </p>
                    <p>
                        We invite you to add your voice and your image to this living mural. Together, we preserve the legacy of a soul that changed the world with sound.
                    </p>
                </div>
            </div>

            <div className="space-y-12 p-8 md:p-12 bg-white/2 border border-white/5 backdrop-blur-3xl">
                <header className="space-y-4">
                    <div className="w-8 h-px bg-white/20" />
                    <h2 className="text-xl font-light tracking-[0.3em] uppercase text-white/90">
                        Our Vision
                    </h2>
                </header>
                <div className="space-y-6 text-[11px] text-white/40 leading-relaxed tracking-widest uppercase">
                    <p>
                        To create a minimalist, respectful space where the global community can unite in a single visual form. 
                    </p>
                    <p>
                        The goal is to reach 120,000 unique memories, completing the silhouette and stabilizing the light. 
                    </p>
                </div>
                <div className="pt-8 border-t border-white/5">
                    <p className="text-[10px] tracking-[0.6em] text-white/20 uppercase font-medium">
                        Eternal Echoes
                    </p>
                </div>
            </div>
        </section>
    )
}
