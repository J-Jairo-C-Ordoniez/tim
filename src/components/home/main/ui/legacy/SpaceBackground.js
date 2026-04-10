'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Object3D, Vector3 } from 'three'

const tempObject = new Object3D()

export default function SpaceBackground() {
    const meshRef = useRef()
    const totalParticles = 2500
    
    const simRef = useRef({
        positions: Array.from({ length: totalParticles }, () => new Vector3((Math.random() - 0.5) * 45, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 20)),
        velocities: Array.from({ length: totalParticles }, () => new Vector3(0, 0, 0))
    })

    useFrame((state) => {
        if (!meshRef.current) return
        const { positions } = simRef.current
        const time = state.clock.getElapsedTime()
        
        for (let i = 0; i < totalParticles; i++) {
            const pos = positions[i]
            pos.x += Math.sin(time * 0.05 + i) * 0.003
            pos.y += Math.cos(time * 0.05 + i) * 0.003
            
            if (pos.x > 25) pos.x = -25
            tempObject.position.set(pos.x, pos.y, pos.z)
            tempObject.scale.setScalar(0.02 + Math.sin(time * 2 + i) * 0.01)
            tempObject.updateMatrix()
            meshRef.current.setMatrixAt(i, tempObject.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, totalParticles]}>
            <circleGeometry args={[1, 6]} />
            <meshBasicMaterial transparent opacity={0.25} color="#ffffff" />
        </instancedMesh>
    )
}
