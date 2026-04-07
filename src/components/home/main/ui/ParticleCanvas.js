'use client'

import { useRef, useEffect, useCallback } from 'react'

function parseImageToParticles(imageSrc, density = 60, callback) {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = imageSrc
    img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const width = density
        const height = Math.round((img.height / img.width) * density)

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        const imageData = ctx.getImageData(0, 0, width, height)
        const data = imageData.data

        const particles = []

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4
                const r = data[index]
                const g = data[index + 1]
                const b = data[index + 2]
                const a = data[index + 3]
                const brightness = (r + g + b) / 3

                if (a > 50 && brightness > 8 && Math.random() > 0.15) {
                    const boost = 0.5
                    const br = Math.round(Math.min(255, r + (255 - r) * boost))
                    const bg = Math.round(Math.min(255, g + (255 - g) * boost))
                    const bb = Math.round(Math.min(255, b + (255 - b) * boost))

                    particles.push({
                        normX: x / width,
                        normY: y / height,
                        x: 0,
                        y: 0,
                        homeX: 0,
                        homeY: 0,
                        vx: 0,
                        vy: 0,
                        size: 1.0 + Math.random() * 1.2,
                        opacity: 0.75 + (brightness / 255) * 0.25,
                        color: `rgba(${br}, ${bg}, ${bb}, `,
                        phase: Math.random() * Math.PI * 2,
                        speed: 0.4 + Math.random() * 0.6,
                    })
                }
            }
        }

        callback(particles)
    }
    img.onerror = () => {
        callback([])
    }
}

export default function ParticleCanvas({ imageUrl }) {
    const canvasRef = useRef(null)
    const particlesRef = useRef([])
    const mouseRef = useRef({ x: -9999, y: -9999 })
    const animRef = useRef(null)
    const imageSrcRef = useRef(null)

    const recalcHomePositions = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas || particlesRef.current.length === 0) return
        const W = canvas.width
        const H = canvas.height

        const padX = W * 0.05
        const padY = H * 0.05
        const fieldW = W - padX * 2
        const fieldH = H - padY * 2

        particlesRef.current.forEach(p => {
            p.homeX = padX + p.normX * fieldW
            p.homeY = padY + p.normY * fieldH
            if (p.x === 0 && p.y === 0) {
                p.x = p.homeX + (Math.random() - 0.5) * 60
                p.y = p.homeY + (Math.random() - 0.5) * 60
            }
        })
    }, [])

    const animate = useCallback((time) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        const W = canvas.width
        const H = canvas.height
        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        const REPEL_RADIUS = 80
        const REPEL_STRENGTH = 3.5
        const RETURN_STRENGTH = 0.08
        const FRICTION = 0.82

        ctx.clearRect(0, 0, W, H)

        particlesRef.current.forEach(p => {
            const dx = p.x - mx
            const dy = p.y - my
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < REPEL_RADIUS && dist > 0) {
                const force = (REPEL_RADIUS - dist) / REPEL_RADIUS
                p.vx += (dx / dist) * force * REPEL_STRENGTH
                p.vy += (dy / dist) * force * REPEL_STRENGTH
            }

            p.vx += (p.homeX - p.x) * RETURN_STRENGTH
            p.vy += (p.homeY - p.y) * RETURN_STRENGTH

            const shimmer = Math.sin(time * 0.001 * p.speed + p.phase) * 0.3
            p.vx += shimmer * 0.05
            p.vy += shimmer * 0.05

            p.vx *= FRICTION
            p.vy *= FRICTION

            p.x += p.vx
            p.y += p.vy

            const proximity = dist < REPEL_RADIUS ? 1 + (1 - dist / REPEL_RADIUS) * 0.4 : 1
            const shimmerDelta = Math.sin(time * 0.002 * p.speed + p.phase) * 0.07
            const finalOpacity = Math.min(1, p.opacity * proximity + shimmerDelta)
            ctx.shadowBlur = 4
            ctx.shadowColor = `${p.color}0.4)`
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = `${p.color}${finalOpacity.toFixed(3)})`
            ctx.fill()
            ctx.shadowBlur = 0
        })

        animRef.current = requestAnimationFrame(animate)
    }, [])

    useEffect(() => {
        if (!imageUrl || imageUrl === imageSrcRef.current) return
        imageSrcRef.current = imageUrl
        if (animRef.current) {
            cancelAnimationFrame(animRef.current)
            animRef.current = null
        }

        particlesRef.current = []

        parseImageToParticles(imageUrl, 120, (pts) => {
            particlesRef.current = pts
            recalcHomePositions()
            animRef.current = requestAnimationFrame(animate)
        })

        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current)
        }
    }, [imageUrl, animate, recalcHomePositions])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const observer = new ResizeObserver(() => {
            const { width, height } = canvas.getBoundingClientRect()
            canvas.width = width
            canvas.height = height
            recalcHomePositions()
        })

        observer.observe(canvas)
        const { width, height } = canvas.getBoundingClientRect()
        canvas.width = width || 600
        canvas.height = height || 500

        return () => observer.disconnect()
    }, [recalcHomePositions])

    const handleMouseMove = useCallback((e) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        }
    }, [])

    const handleMouseLeave = useCallback(() => {
        mouseRef.current = { x: -9999, y: -9999 }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'block' }}
        />
    )
}
