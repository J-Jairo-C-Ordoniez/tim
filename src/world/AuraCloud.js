'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useCursor, Html } from '@react-three/drei'
import { generateSilhouettePoint } from '@/lib/utils'



// internal helper to parse image pixels
function createParticlesFromImage(imageSrc, callback) {
  const img = new Image()
  img.crossOrigin = 'Anonymous'
  img.src = imageSrc
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const width = 100 // low resolution for performance/particles
    const height = Math.round((img.height / img.width) * width)
    
    canvas.width = width
    canvas.height = height
    ctx.drawImage(img, 0, 0, width, height)
    
    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data
    
    const pts = []
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4
        const alpha = data[index + 3]
        
        // Sampling condition (only take non-transparent pixels, with some skipping for density)
        if (alpha > 128 && Math.random() > 0.3) {
          // Map to 3D coordinates (-1.5 to 1.5 roughly)
          const px = (x / width) * 3.0 - 1.5
          const py = -(y / height) * 3.0 + 1.5 // negate Y because canvas Y is down
          const pz = (Math.random() - 0.5) * 0.15
          pts.push({ x: px, y: py, z: pz, originalX: px, originalY: py, randomDrift: Math.random() * Math.PI * 2 })
        }
      }
    }
    
    // Fallback if image has no pixels
    if (pts.length === 0) pts.push({ x: 0, y: 0, z: 0, originalX: 0, originalY: 0 })
    
    callback(pts)
  }
  img.onerror = () => {
    console.error("Failed to load silhouette image. Make sure public/silueta.png exists.")
    callback([{ x: 0, y: 0, z: 0, originalX: 0, originalY: 0 }])
  }
}

export default function AuraCloud({ contributions = [], onSelect }) {
  const meshRef = useRef()
  const baseMeshRef = useRef()
  const [hovered, setHovered] = useState(null)
  const [baseParticles, setBaseParticles] = useState([])
  
  useCursor(hovered !== null, 'pointer', 'auto')

  const { mouse, viewport, camera } = useThree()
  const defaultTexture = useLoader(THREE.TextureLoader, '/tim_fan_memories_grid.png')

  const count = contributions.length || 1
  const baseCount = baseParticles.length || 1 // Wait for load
  const tempObject = new THREE.Object3D()

  // Load the image once on mount
  useEffect(() => {
    createParticlesFromImage('/silueta.png', (pts) => {
      setBaseParticles(pts)
    })
  }, [])


  // 2. Dynamic contribution particles (Floating freely)
  const particles = useMemo(() => {
    return contributions.map((c, i) => {
      // Instead of using DB cells, we generate a majestic orbit based on ID/index
      const angle = (i * 1.6180339887) * Math.PI * 2 // Golden ratio spread
      const radius = 1.0 + Math.random() * 1.5
      
      const px = Math.cos(angle) * radius
      const py = Math.sin(angle) * radius + (Math.random() - 0.5) * 1.5
      const pz = (Math.random() - 0.5) * 1.5 + 0.3 // Float slightly in front

      return { 
        x: px, 
        y: py, 
        z: pz, 
        originalX: px,
        originalY: py,
        originalZ: pz,
        angleOffsets: Math.random() * Math.PI * 2,
        speed: 0.1 + Math.random() * 0.15,
        name: c.name
      }
    })
  }, [contributions])

  useFrame((state) => {
    if (!meshRef.current || baseParticles.length === 0) return
    const time = state.clock.getElapsedTime()

    const mouseX = (mouse.x * viewport.width) / 2
    const mouseY = (mouse.y * viewport.height) / 2

    // Update Base Mesh (The Avicii Silhouette)
    if (baseMeshRef.current) {
      baseParticles.forEach((p, i) => {
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const force = Math.max(0, (1.2 - dist) / 1.2)
        
        const targetX = p.originalX + (dx / dist) * force * 0.2
        const targetY = p.originalY + (dy / dist) * force * 0.2

        const drift = Math.sin(time * 0.5 + (p.randomDrift || 0)) * 0.015
        p.x += (targetX - p.x) * 0.05 + drift * 0.05
        p.y += (targetY - p.y) * 0.05 + drift * 0.05

        tempObject.position.set(p.x, p.y, p.z)
        tempObject.quaternion.copy(camera.quaternion)
        tempObject.scale.setScalar(0.4 + Math.sin(time + i * 0.1) * 0.1)
        tempObject.updateMatrix()
        baseMeshRef.current.setMatrixAt(i, tempObject.matrix)
      })
      baseMeshRef.current.instanceMatrix.needsUpdate = true
    }

    // Update Dynamic Mesh (Contributions floating around)
    particles.forEach((p, i) => {
      // Natural slow orbit
      const orbitX = Math.cos(time * p.speed * 0.5 + p.angleOffsets) * 0.2
      const orbitY = Math.sin(time * p.speed * 0.5 + p.angleOffsets) * 0.2
      
      const dx = (p.x + orbitX) - mouseX
      const dy = (p.y + orbitY) - mouseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      // Repulsion stronger for contributions
      const force = Math.max(0, (2.0 - dist) / 2.0)
      
      const targetX = p.originalX + orbitX + (dx / dist) * force * 1.5
      const targetY = p.originalY + orbitY + (dy / dist) * force * 1.5

      p.x += (targetX - p.x) * 0.08
      p.y += (targetY - p.y) * 0.08
      
      tempObject.position.set(p.x, p.y, p.z)
      tempObject.quaternion.copy(camera.quaternion)
      
      // Elegant sober scale, smaller base size that grows on hover
      const s = hovered === i ? 4.0 : 1.5 + Math.sin(time * p.speed + i) * 0.2
      tempObject.scale.setScalar(s)
      tempObject.updateMatrix()
      meshRef.current.setMatrixAt(i, tempObject.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group position={[0, -0.2, 0]} scale={2.5}>
      {/* Base Silhouette Layer */}
      {baseParticles.length > 0 && (
        <instancedMesh ref={baseMeshRef} args={[null, null, baseCount]}>
          <circleGeometry args={[0.015, 6]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
        </instancedMesh>
      )}

      {/* Contributions Layer */}
      {contributions.length > 0 && (
        <instancedMesh
          ref={meshRef}
          args={[null, null, count]}
          onPointerOver={(e) => (e.stopPropagation(), setHovered(e.instanceId))}
          onPointerOut={() => setHovered(null)}
          onClick={(e) => (e.stopPropagation(), onSelect(contributions[e.instanceId]))}
          // Fix to ensure they render above the dots
          renderOrder={1} 
        >
          <planeGeometry args={[0.2, 0.2]} />
          <meshStandardMaterial 
            map={defaultTexture} 
            transparent 
            opacity={0.8} 
            side={THREE.DoubleSide} 
            depthTest={false} /* Ignore depth so they don't clip with silhouette */
            emissive="#ffffff"
            emissiveIntensity={0.2}
            color="#ffffff"
          />
        </instancedMesh>
      )}

      {hovered !== null && particles[hovered] && (
        <Html position={[
          particles[hovered].x + 0.3,
          particles[hovered].y + 0.2,
          particles[hovered].z
        ]}>
          <div className="aura-tooltip opacity-0 animate-in fade-in flex flex-col items-start bg-[#080808]/90 p-2 backdrop-blur-md border border-white/10">
            <div className="text-[0.4rem] text-white/50 font-bold tracking-[0.2em]">CLICK TO VIEW MEMORY</div>
            <div className="text-xs font-bold text-white uppercase">{particles[hovered].name}</div>
          </div>
        </Html>
      )}
    </group>
  )
}




