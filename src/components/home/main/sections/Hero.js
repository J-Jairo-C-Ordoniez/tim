

export default function Hero() {
  return (
    <div className="relative">
      {/* <div className="absolute inset-0 z-10 pointer-events-none">
        {messages.map((m, i) => {
          const angle = (i / messages.length) * Math.PI * 2
          const radius = 25 + Math.random() * 12
          const x = 50 + Math.cos(angle) * radius
          const y = 50 + Math.sin(angle) * radius

          return (
            <div
              key={m.id}
              className="absolute soundwave-text drifting-ash text-[0.6rem] md:text-[0.8rem] text-white/30"
              style={{
                top: `${y}%`,
                left: `${x}%`,
                animationDelay: `${i * 1.5}s`,
                transform: `rotate(${Math.sin(i) * 5}deg)`,
              }}
            >
              "{m.message}"
            </div>
          )
        })}
      </div> */}

      {/*

      {selectedContribution !== null && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-[#080808]/90 backdrop-blur-3xl animate-in fade-in zoom-in duration-700"
          onClick={() => setSelectedContribution(null)}
        >
          <div className="max-w-xl w-full p-12 flex flex-col items-center text-center">
            <div className="relative aspect-square w-64 mb-10 group">
              <div className="absolute inset-0 bg-white/5 blur-2xl group-hover:bg-white/10 transition-all duration-1000" />
              <img
                src={selectedContribution.thumbnailUrl || "/tim_fan_memories_grid.png"}
                alt="Memory"
                className="w-full h-full object-cover grayscale active border border-white/10 p-1 relative z-10"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white text-black text-[0.5rem] px-4 py-1 tracking-[0.2em] font-bold z-20">
                ENTRY_{selectedContribution.id}
              </div>
            </div>

            <h2 className="text-3xl font-light mb-6 tracking-tight leading-tight italic gradient-text">
              "{selectedContribution.message}"
            </h2>

            <div className="flex flex-col items-center gap-2 mb-10">
              <span className="text-[0.6rem] tracking-[0.4em] opacity-40 uppercase">Contributor</span>
              <span className="text-sm font-bold tracking-widest uppercase">{selectedContribution.name}</span>
            </div>

            <button className="text-[0.6rem] tracking-[0.5em] opacity-40 hover:opacity-100 transition-opacity uppercase border-b border-white/10 pb-1">
              Click to return
            </button>
          </div>
        </div>
      )} */}

      {/* <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      /> */}
    </div>
  )
}

