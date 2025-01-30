import React from 'react';
import { useFrame } from '@react-three/fiber';

const Model = () => {
  const meshRef = React.useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[10, 3, 100, 16]} />
      <meshStandardMaterial 
        color="#4299e1"
        roughness={0.5}
        metalness={0.7}
      />
    </mesh>
  );
};

export default Model;