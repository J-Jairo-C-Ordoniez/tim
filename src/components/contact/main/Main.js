import ContactContent from "./sections/ContactContent";

export default function Main() {
    return (
        <main className="w-full min-h-screen bg-background font-inter box-border">
            <div className="container mx-auto px-4 md:px-8 py-20 lg:py-32 space-y-32">
                <ContactContent />

                <footer className="w-full py-20 border-t border-primary/5 text-center">
                    <p className="text-xs tracking-widest text-secondary/80 uppercase font-light">
                        TIM | Collective Silhouette
                    </p>

                    <p className="text-xs tracking-widest text-secondary/60 uppercase font-light mt-4">
                        Remembering Tim Bergling - {new Date().getFullYear()}
                    </p>
                </footer>
            </div>
        </main>
    )
}