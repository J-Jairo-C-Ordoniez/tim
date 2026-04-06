'use client'

import React from 'react'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export default function PostProcessing() {
  return (
    <EffectComposer disableNormalPass multisampling={4}>
      <Bloom 
        intensity={0.6} 
        luminanceThreshold={0.4}
        luminanceSmoothing={0.9} 
        blendFunction={BlendFunction.SCREEN} 
      />
      <Vignette 
        eskil={false} 
        offset={0.3} 
        darkness={0.6} 
        blendFunction={BlendFunction.MULTIPLY} 
      />
    </EffectComposer>
  )
}
