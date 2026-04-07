'use client'

import Head from '@/components/home/header/Head'
import AboutHero from '@/components/about/sections/AboutHero'
import AboutContent from '@/components/about/sections/AboutContent'

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-white selection:bg-white/10 selection:text-white font-inter">
            <Head />
            <div className="container mx-auto px-4 md:px-8 py-20 lg:py-32 space-y-32">
                <AboutHero />
                <AboutContent />
            </div>
            
            <footer className="w-full py-20 border-t border-white/5 opacity-20 text-center">
                <p className="text-[10px] tracking-[0.5em] uppercase font-light">
                    Collective Silhouette | TIM Tribute
                </p>
            </footer>
        </main>
    )
}