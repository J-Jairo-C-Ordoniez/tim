export default function Messages({ messages }) {
    return (
        <figure className="absolute inset-0 z-2 pointer-events-none grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
            {messages.map((m, i) => {
                return (
                    <blockquote
                        key={m.id}
                        className="text-xs md:text-sm font-light tracking-wider text-secondary animate-pulse animate-duration-1000 p-2"
                        style={{
                            transform: `rotate(${Math.sin(i) * 5}deg)`,
                        }}
                    >
                        <p>"{m.message}"</p>
                        <figcaption>
                            — <cite>{m.name}</cite>
                        </figcaption>
                    </blockquote>
                )
            })}
        </figure>
    )
}