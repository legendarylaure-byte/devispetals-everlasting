'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HeroFlower() {
  const groupRef = useRef<THREE.Group>(null!);
  
  // Create petal geometry procedurally
  const petals = useMemo(() => {
    const count = 12;
    return Array.from({ length: count }).map((_, i) => ({
      rotation: (i / count) * Math.PI * 2,
      delay: i * 0.1,
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.2;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Center of the flower */}
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#e3b0b8" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Petals */}
      {petals.map((petal, i) => (
        <group key={i} rotation={[0, petal.rotation, 0]}>
          <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[0.3, 0.05, 16, 100, Math.PI]} />
            <meshStandardMaterial 
              color="#e3b0b8" 
              transparent 
              opacity={0.8} 
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* Aesthetic Stem / Base */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.02, 0.04, 4, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
}
