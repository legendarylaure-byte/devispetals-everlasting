'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';
import HeroFlower from './HeroFlower';
import { Suspense } from 'react';

export default function FloralCanvas() {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <group position={[0, -0.2, 0]}>
              <HeroFlower />
            </group>
          </Float>

          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
          
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
