'use client'

import Link from 'next/link'

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-background font-inter selection:bg-white/10 selection:text-white">
            <header className="sticky top-0 z-50 w-full bg-background border-b border-white/5 box-border h-16">
                <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-full">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-1.5 h-1.5 bg-white rounded-full group-hover:scale-125 transition-transform" />
                        <span className="text-[10px] tracking-[0.4em] font-medium text-white uppercase">
                            Terminal
                        </span>
                    </Link>
                    
                    <nav className="flex gap-12 text-[10px] tracking-widest font-light uppercase">
                        <Link
                            href="/"
                            className="text-white/40 hover:text-white transition-all">
                            Exit
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="container mx-auto px-4 md:px-8 py-16 min-h-[calc(100vh-64px)]">
                {children}
            </main>
        </div>
    )
}
