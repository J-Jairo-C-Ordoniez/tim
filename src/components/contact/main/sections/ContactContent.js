'use client'

import Link from "next/link"

export default function ContactContent() {
    return (
        <section className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-16">
            <header className="space-y-6">
                <div className="w-12 h-px bg-primary/20 mx-auto" />
                <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase text-primary/90">
                    Get in Touch
                </h1>
                <p className="text-xs tracking-widest text-secondary/80 uppercase font-light leading-relaxed">
                    A tribute to Tim Bergling
                </p>
                <div className="w-12 h-px bg-primary/20 mx-auto" />|
            </header>

            <article className="space-y-10">
                <div className="space-y-4">
                    <p className="text-xs tracking-widest text-secondary/80 uppercase font-light">
                        Contact
                    </p>
                    <Link
                        href="mailto:cordobaojhonjairo21@gmail.com"
                        className="text-xl md:text-2xl font-light tracking-widest text-secondary/60 hover:text-secondary uppercase"
                    >
                        EMAIL
                    </Link>
                </div>

                <div className="space-y-8">
                    <p className="text-lg font-light leading-relaxed text-secondary/80 italic">
                        "For any questions about the project or if you'd like to offer your support, please don't hesitate to contact us. We are a community that listens attentively and are always ready to hear from you."
                    </p>

                    <div className="pt-10 flex flex-col gap-4">
                        <Link
                            href="/"
                            className="text-xs tracking-widest text-primary/40 uppercase hover:text-primary transition-all underline underline-offset-8"
                        >
                            The Foundation
                        </Link>
                    </div>
                </div>
            </article>
        </section>
    )
}
