import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function EarthCanvas() {
  const starsRef = useRef();
  
  // Create stars
  const starsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    
    // Create 2000 stars
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      vertices.push(x, y, z);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  // Animate stars
  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.05;
      starsRef.current.rotation.x += delta * 0.025;
    }
  });

  return (
    <group>
      <points ref={starsRef}>
        <primitive object={starsGeometry} />
        <pointsMaterial
          size={2}
          color="#64ffda"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* Add ambient light for subtle glow */}
      <ambientLight intensity={0.2} color="#64ffda" />
    </group>
  );
} 