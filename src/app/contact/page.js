'use client'

import Head from '@/components/home/header/Head'
import ContactContent from '@/components/contact/sections/ContactContent'

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background text-white selection:bg-white/10 selection:text-white font-inter">
            <Head />
            <div className="container mx-auto px-4 md:px-8 py-20 lg:py-40 flex items-center justify-center">
                <ContactContent />
            </div>
            
            <footer className="fixed bottom-0 left-0 w-full py-12 opacity-20 text-center">
                <p className="text-[10px] tracking-[0.5em] uppercase font-light">
                    Tribute Project | 2018–Present
                </p>
            </footer>
        </main>
    )
}