'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import PostProcessing from '@/components/home/main/ui/PostProcessing'
import AuraCloud3D from '@/components/home/main/ui/AuraCloud3D'
import * as THREE from 'three'

export default function AuraCloud({ contributions, selectedContribution, setSelectedContribution }) {
    return (
        <section>
            <div className={`absolute inset-0 z-0 transition-all duration-1000 ${selectedContribution !== null ? 'blur-2xl scale-110 opacity-30' : ''}`}>
                <Canvas gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }} dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#aaaaaa" />

                    <Suspense fallback={null}>
                        <PostProcessing />
                        <AuraCloud3D
                            contributions={contributions}
                            onSelect={(contribution) => setSelectedContribution(contribution)}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    )
}