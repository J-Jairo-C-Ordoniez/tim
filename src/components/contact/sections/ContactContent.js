'use client'

export default function ContactContent() {
    return (
        <section className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-16">
            <header className="space-y-6">
                <div className="w-12 h-px bg-white/20 mx-auto" />
                <h1 className="text-4xl md:text-5xl font-light tracking-[0.2em] uppercase text-white/90">
                    Get in Touch
                </h1>
                <p className="text-[12px] tracking-[0.6em] text-white/30 uppercase font-medium leading-relaxed">
                    A tribute to Tim Bergling
                </p>
                <div className="w-12 h-px bg-white/20 mx-auto" />
            </header>

            <div className="space-y-10">
                <div className="space-y-4">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-medium">
                        Contact
                    </p>
                    <p className="text-xl md:text-2xl font-light tracking-widest text-white/80 uppercase">
                        contact@tim.fm
                    </p>
                </div>
                
                <div className="space-y-8">
                    <p className="text-xs font-light leading-relaxed text-white/40 italic">
                        "For any inquiries regarding the project, or if you'd like to support the Tim Bergling Foundation, please reach out. We are a community of listeners, always ready to hear from you."
                    </p>
                    
                    <div className="pt-10 flex flex-col gap-4">
                        <a 
                            href="https://timberglingfoundation.org" 
                            target="_blank"
                            className="text-[10px] tracking-[0.5em] text-white/40 uppercase hover:text-white transition-all underline underline-offset-8"
                        >
                            The Foundation
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
        </section>
    )
}
