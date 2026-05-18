import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import type { Group } from 'three';
import * as THREE from 'three';

function ParallaxDecor({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const { pointer } = state;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, pointer.x * 0.35, 0.055);
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -pointer.y * 0.22,
      0.055
    );
  });
  return <group ref={ref}>{children}</group>;
}

/**
 * Full-viewport background scene for the /3d route mirror.
 */
export function Site3DScene() {
  return (
    <>
      <color attach="background" args={['#040814']} />
      <fog attach="fog" args={['#040814', 14, 48]} />
      <ambientLight intensity={0.32} />
      <directionalLight position={[8, 12, 6]} intensity={0.85} color="#7dd3fc" />
      <pointLight position={[-6, 4, 4]} intensity={0.55} color="#5eead4" />
      <Stars radius={90} depth={55} count={6000} factor={2.8} fade speed={0.4} />
      <Sparkles
        count={160}
        scale={28}
        size={2.2}
        speed={0.22}
        opacity={0.42}
        color="#5eead4"
      />
      <ParallaxDecor>
        <Float speed={1.15} rotationIntensity={0.32} floatIntensity={0.55}>
          <mesh position={[-6.2, 2.1, -4.5]}>
            <icosahedronGeometry args={[1.15, 1]} />
            <meshStandardMaterial
              color="#0d9488"
              wireframe
              emissive="#134e4a"
              emissiveIntensity={0.45}
            />
          </mesh>
        </Float>
        <Float speed={1.45} rotationIntensity={0.48} floatIntensity={0.42}>
          <mesh position={[6.8, -0.8, -3.8]}>
            <torusKnotGeometry args={[0.88, 0.26, 120, 16]} />
            <meshStandardMaterial color="#6366f1" metalness={0.55} roughness={0.28} />
          </mesh>
        </Float>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.35, 0]}>
          <planeGeometry args={[90, 90]} />
          <meshStandardMaterial color="#0b1224" metalness={0.15} roughness={0.9} />
        </mesh>
      </ParallaxDecor>
      <gridHelper args={[52, 52, '#1e3a5f', '#0c4a6e']} position={[0, -3.34, 0]} />
    </>
  );
}
