'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import AuraCloud from '../../../world/AuraCloud'
import { useContributions } from '@/hooks/useContributions'
import UploadModal from '@/modules/upload/UploadModal'
import gsap from 'gsap'
import PostProcessing from '../../../world/PostProcessing'

export default function Hero() {
  const { contributions, loading } = useContributions()
  const [selectedContribution, setSelectedContribution] = useState(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const progression = contributions.length
  const totalSlots = 850

  const messages = contributions
    .filter(c => c.message && c.message.length > 0)
    .slice(0, 15)

  return (
    <div className="relative h-screen w-screen bg-background text-foreground overflow-hidden select-none">
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

      {/* <div className={`absolute inset-0 z-0 transition-all duration-1000 ${selectedContribution !== null ? 'blur-2xl scale-110 opacity-30' : ''}`}>
        <Canvas gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }} dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#aaaaaa" />

          <Suspense fallback={null}>
            <PostProcessing />
            <AuraCloud
              contributions={contributions}
              onSelect={(contribution) => setSelectedContribution(contribution)}
            />
          </Suspense>
        </Canvas>
      </div>

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

      {/* <div className={`transition-all duration-1000 ${selectedContribution !== null ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'}`}>
        <section className="absolute bottom-12 left-12 z-20 flex flex-col items-start pointer-events-none">
          <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter uppercase italic leading-[0.8] opacity-10">TIM</h1>
          <div className="mt-4 text-[0.6rem] tracking-[0.5em] font-light opacity-30 uppercase">
            Collective Consciousness <span className="mx-4">/</span> 1989 — 2018
          </div>
        </section>

        <div className="absolute bottom-12 right-12 z-20 flex flex-col items-end">
          <div className="text-[0.6rem] tracking-[0.4em] opacity-40 uppercase mb-4">Silhouette Integrity</div>
          <div className="flex items-center gap-4">
            <span className="text-[0.6rem] font-bold opacity-60">{progression} / {totalSlots}</span>
            <div className="w-40 h-px bg-white/10 relative">
              <div
                className="absolute inset-y-0 left-0 bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-1000"
                style={{ width: `${Math.min((progression / totalSlots) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
          <button
            className="px-10 py-4 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-[0.6rem] tracking-[0.6em] uppercase font-bold backdrop-blur-sm"
            onClick={() => setIsUploadModalOpen(true)}
          >
            Contribute Memory
          </button>
        </div>
      </div> */}

      {/* <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      /> */}
    </div>
  )
}

