'use client'

export default function Foot({ progression = 10, totalSlots = 120, setIsUploadModalOpen }) {
    return (
        <footer className="w-full bg-background font-inter">
            <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                <section className="space-y-2 w-fit text-center">
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-primary">
                        TIM
                    </h1>

                    <p className="text-xs tracking-widest font-medium text-secondary uppercase">
                        Collective Silhouette
                    </p>
                </section>

                <section className="w-fit">
                    <button
                        className="text-secondary cursor-pointer px-10 py-4 border border-primary/10 bg-primary/2 hover:bg-primary/5 transition-all text-xs tracking-widest uppercase font-medium backdrop-blur-sm"
                        onClick={() => setIsUploadModalOpen(true)}
                    >
                        Contribute Memory
                    </button>
                </section>

                <section className="space-y-2 w-fit text-center">
                    <p className="text-xs tracking-widest text-secondary uppercase">
                        Silhouette Integrity
                    </p>

                    <div className="flex items-center gap-4">
                        <span className="text-xs font-medium tracking-widest text-secondary">
                            {progression} / {totalSlots}
                        </span>
                        <div className="w-40 h-px bg-primary/10 relative">
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