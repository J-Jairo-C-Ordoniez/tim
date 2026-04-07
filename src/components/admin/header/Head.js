import Link from 'next/link'

export default function Head() {
    return (
        <header className="sticky top-0 z-50 w-full bg-background font-inter box-border h-16">
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-end h-full">
                <nav className="flex gap-12 text-xs tracking-widest font-light uppercase">
                    <Link
                        href="/"
                        className="text-primary/80 hover:text-primary transition-all">
                        Exit
                    </Link>
                </nav>
            </div>
        </header>
    )
}