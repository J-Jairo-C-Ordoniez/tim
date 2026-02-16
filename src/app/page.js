'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Home() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  return (
    <main
      ref={containerRef}
      className="relative h-[300vh] bg-neutral-900"
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 border bg-[#F5F5DC]"
      />
    </main>
  )
}
