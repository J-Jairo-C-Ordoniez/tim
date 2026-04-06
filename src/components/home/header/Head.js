import Link from "next/link"

export default function Head() {
    return (
        <header className="sticky top-0 z-50 w-full bg-background font-inter">
            <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-end">
                <nav className="flex gap-12 text-xs tracking-widest font-light uppercase">
                    <Link
                        href="/about"
                        className="text-primary/80 hover:text-primary hover:opacity-100 transition-all">
                        ABOUT
                    </Link>
                    <Link
                        href="/contact"
                        className="text-primary/80 hover:text-primary hover:opacity-100 transition-all">
                        CONTACT
                    </Link>
                </nav>
            </div>
        </header>
    )
}