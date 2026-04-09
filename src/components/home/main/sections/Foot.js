'use client'

export default function Foot({ progression = 10, totalSlots = 120, setIsUploadModalOpen }) {
    return (
        <footer className="w-full bg-background font-inter border-t border-primary/5">
            <div className="container mx-auto px-6 md:px-8 py-6 md:py-4 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
                <section className="space-y-1 w-full md:w-fit text-center md:text-left">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-primary leading-none">
                        TIM
                    </h1>

                    <p className="text-[10px] md:text-xs tracking-widest font-medium text-secondary/60 uppercase">
                        Collective Silhouette
                    </p>
                </section>

                <section className="w-full md:w-fit flex justify-center">
                    <button
                        className="w-full md:w-auto text-secondary cursor-pointer px-10 py-4 border border-primary/10 bg-primary/2 hover:bg-primary/5 transition-all text-[11px] md:text-xs tracking-widest uppercase font-medium backdrop-blur-sm"
                        onClick={() => setIsUploadModalOpen(true)}
                    >
                        Contribute Memory
                    </button>
                </section>

                <section className="space-y-3 w-full md:w-fit flex flex-col items-center md:items-end">
                    <p className="text-[10px] md:text-xs tracking-widest text-secondary/60 uppercase">
                        Silhouette Integrity
                    </p>

                    <div className="flex items-center gap-4">
                        <span className="text-[10px] md:text-xs font-medium tracking-widest text-secondary">
                            {progression} / {totalSlots}
                        </span>
                        <div className="w-32 md:w-40 h-px bg-primary/10 relative">
                            <div
                                className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
                                style={{ width: `${Math.min((progression / totalSlots) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </footer>
    )
}