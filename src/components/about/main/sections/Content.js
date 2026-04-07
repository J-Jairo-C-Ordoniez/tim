'use client'

export default function Content() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start max-w-6xl mx-auto">
            <div className="space-y-12">
                <header className="space-y-4">
                    <div className="w-8 h-px bg-white/20" />
                    <h2 className="text-xl font-light tracking-widest uppercase text-primary/90">
                        The Project
                    </h2>
                </header>
                <article className="space-y-6 text-sm text-secondary/80 leading-loose tracking-widest font-light">
                    <p>
                        TIM is a collective digital tribute born from the global impact of Tim Bergling's music. In an industry of fleeting moments, his melodies spoke to the universal human experience.
                    </p>
                    <p>
                        This platform allows fans from around the world to contribute a pixel to an ever-evolving silhouette. Each point of light in the cloud represents a memory, a message, or a story shared by someone whose life was touched by his work.
                    </p>
                    <p>
                        We invite you to add your voice and your image to this living mural. Together, we preserve the legacy of a soul that changed the world with sound.
                    </p>
                </article>
            </div>

            <div className="space-y-12 p-8 md:p-12 bg-primary/2 border border-primary/5 backdrop-blur-3xl">
                <header className="space-y-4">
                    <div className="w-8 h-px bg-primary/20" />
                    <h2 className="text-xl font-light tracking-widest uppercase text-primary/90">
                        Our Vision
                    </h2>
                </header>
                <article className="space-y-6 text-xs text-secondary/80 leading-relaxed tracking-widest uppercase">
                    <p>
                        To create a minimalist, respectful space where the global community can unite in a single visual form.
                    </p>
                </article>

                <footer className="pt-8 border-t border-primary/5">
                    <p className="text-xs tracking-widest text-secondary/80 uppercase font-medium">
                        Eternal Echoes
                    </p>
                </footer>
            </div>
        </section>
    )
}
