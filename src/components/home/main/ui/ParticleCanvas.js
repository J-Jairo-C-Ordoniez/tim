'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Object3D, Color, Vector3 } from 'three'
import gsap from 'gsap'

const tempObject = new Object3D()
const tempColor = new Color()

function getPixelData(imageSrc, density = 80, callback) {
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
                const br = (r + g + b) / 3

                if (a > 120 && br > 5) {
                    particles.push({
                        normX: (x / width) - 0.5,
                        normY: 0.5 - (y / height),
                        r: r / 255,
                        g: g / 255,
                        b: b / 255,
                        size: 0.9 + Math.random() * 0.2,
                        phase: Math.random() * Math.PI * 2,
                        speed: 0.5 + Math.random() * 0.5,
                    })
                }
            }
        }
        callback(particles)
    }
}

function Particles({ imageUrl, totalContributions }) {
    const meshRef = useRef()
    const [pts, setPts] = useState([])
    const isConstellation = totalContributions >= 120
    const { viewport, mouse: stateMouse } = useThree()
    
    const simulationRef = useRef({
        positions: [],
        velocities: [],
        homes: [],
        colors: [],
        sizes: []
    })

    useEffect(() => {
        getPixelData(imageUrl, 140, (particles) => {
            const aspect = viewport.width / viewport.height
            const scale = Math.min(viewport.width, viewport.height) * 0.85
            
            const newPositions = []
            const newVelocities = []
            const newHomes = []
            const newColors = []
            const newSizes = []

            particles.forEach(p => {
                const hX = p.normX * scale
                const hY = p.normY * scale
                const hZ = 0

                newPositions.push(new Vector3(
                    hX + (Math.random() - 0.5) * 2,
                    hY + (Math.random() - 0.5) * 2,
                    0
                ))
                newVelocities.push(new Vector3(0, 0, 0))
                newHomes.push(new Vector3(hX, hY, hZ))
                newColors.push(new Color(p.r, p.g, p.b))
                newSizes.push(p.size)
            })

            simulationRef.current = {
                positions: newPositions,
                velocities: newVelocities,
                homes: newHomes,
                colors: newColors,
                sizes: newSizes
            }
            setPts(particles)
        })
    }, [imageUrl, viewport.width, viewport.height])

    useFrame((state) => {
        if (!meshRef.current || pts.length === 0) return
        
        const { positions, velocities, homes, colors, sizes } = simulationRef.current
        
        if (positions.length < pts.length) return
        
        const time = state.clock.getElapsedTime()
        const mx = stateMouse.x * viewport.width / 2
        const my = stateMouse.y * viewport.height / 2
        const mouseVec = new Vector3(mx, my, 0)

        const REPEL_RADIUS = 1.2
        const REPEL_STRENGTH = 0.04
        const RETURN_STRENGTH = 0.12 
        const FRICTION = 0.85

        for (let i = 0; i < pts.length; i++) {
            const pos = positions[i]
            if (!pos) continue; 
            
            const vel = velocities[i]
            const home = homes[i]
            const size = sizes[i]

            const target = home

            const distToMouse = pos.distanceTo(mouseVec)
            if (distToMouse < REPEL_RADIUS) {
                const force = (REPEL_RADIUS - distToMouse) / REPEL_RADIUS
                const dir = new Vector3().subVectors(pos, mouseVec).normalize()
                vel.add(dir.multiplyScalar(force * REPEL_STRENGTH))
            }

            const returnForce = new Vector3().subVectors(target, pos).multiplyScalar(RETURN_STRENGTH)
            vel.add(returnForce)

            vel.x += Math.sin(time * 2 + i) * 0.002
            vel.y += Math.cos(time * 2 + i) * 0.002
            vel.multiplyScalar(FRICTION)
            pos.add(vel)

            const focusScale = distToMouse < REPEL_RADIUS ? 1 + (1 - distToMouse / REPEL_RADIUS) * 1.5 : 1
            const finalSize = size * 0.04 * focusScale

            tempObject.position.set(pos.x, pos.y, pos.z)
            tempObject.scale.set(finalSize, finalSize, 1)
            tempObject.updateMatrix()
            meshRef.current.setMatrixAt(i, tempObject.matrix)

            tempColor.copy(colors[i])
            const luma = 0.2126 * tempColor.r + 0.7152 * tempColor.g + 0.0722 * tempColor.b
            if (luma < 0.3) {
                tempColor.multiplyScalar(1.2)
            }
            meshRef.current.setColorAt(i, tempColor)
        }
        
        meshRef.current.instanceMatrix.needsUpdate = true
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, pts.length]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial transparent opacity={0.9} />
        </instancedMesh>
    )
}

export default function ParticleCanvas({ imageUrl, totalContributions }) {
    return (
        <div className="w-full h-full relative cursor-crosshair">
            <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
                <ambientLight intensity={0.5} />
                <Particles imageUrl={imageUrl} totalContributions={totalContributions} />
            </Canvas>
        </div>
    )
}
