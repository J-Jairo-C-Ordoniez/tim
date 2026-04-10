'use client'

import React from 'react'
import Link from 'next/link'

export default function CreditsRoll({ contributions }) {
    return (
        <div className="absolute inset-0 z-110 bg-background flex flex-col items-center justify-start pt-32 h-screen overflow-hidden">
            <header className="relative z-20 text-center space-y-4 mb-16 animate-in fade-in duration-1000 shrink-0">
                <p className="text-[9px] tracking-[0.8em] uppercase text-primary/60 font-black">Collective Silhouette</p>
                <h2 className="text-7xl md:text-9xl font-black italic tracking-tighter text-primary uppercase leading-tight">
                    TIM
                </h2>
                <div className="w-12 h-px bg-primary/20 mx-auto" />
            </header>

            <div className="w-full flex-1 max-w-5xl px-12 mx-auto overflow-y-auto custom-scrollbar pb-32">
                <div className="flex flex-col items-center space-y-24 text-center">
                    <div className="space-y-10 w-full pt-8">
                        <h3 className="text-[10px] tracking-[0.6em] uppercase text-primary font-black opacity-40">The Architects of Light</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-4 gap-x-8">
                            {contributions.map((c, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <p className="text-primary/90 font-bold italic uppercase tracking-tighter text-[9px] md:text-xs">{c.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-16 pt-12">
                        <div className="space-y-6">
                            <h4 className="text-[9px] tracking-[0.6em] uppercase text-primary opacity-40 font-black">Project Repository</h4>
                            <Link 
                                href="https://github.com/J-Jairo-C-Ordoniez/tim" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 text-xs tracking-[0.2em] font-bold uppercase text-primary hover:text-primary transition-all justify-center"
                            >
                                <svg className="w-5 h-5 fill-current opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[9px] tracking-[0.6em] uppercase text-primary opacity-40 font-black">In Memory Of</h4>
                            <p className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-primary">
                                TIM BERGLING
                            </p>
                            <p className="text-[10px] tracking-[0.5em] text-primary/30 uppercase">1989 — 2018</p>
                        </div>

                        <button 
                            onClick={() => window.location.reload()}
                            className="px-10 py-4 border border-primary/20 text-[9px] tracking-[0.4em] uppercase text-primary font-black hover:bg-primary hover:text-black transition-all pointer-events-auto"
                        >
                            Back to Mural
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(var(--primary-rgb), 0.1);
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(var(--primary-rgb), 0.3);
                }
            `}</style>

            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('/grain.png')] bg-repeat" />
        </div>
    )
}
