import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Stars() {
  const starsRef = useRef();
  
  const starsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    
    // Create 5000 stars for a denser background
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 3000;
      const y = (Math.random() - 0.5) * 3000;
      const z = (Math.random() - 0.5) * 3000;
      vertices.push(x, y, z);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.02;
      starsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={starsRef}>
      <primitive object={starsGeometry} />
      <pointsMaterial
        size={1.5}
        color="#c1c7ce"
        transparent
        opacity={0.42}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
} 
