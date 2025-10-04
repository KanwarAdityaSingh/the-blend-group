"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, ShaderMaterial } from "three";
import * as THREE from "three";

export default function GradientMesh() {
  const meshRef = useRef<Mesh>(null);

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#ff7bb9") },
        uColor2: { value: new THREE.Color("#b79cff") },
        uColor3: { value: new THREE.Color("#ffffff") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uTime;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 pos = position;
          
          // Subtle wave animation
          pos.y += sin(pos.x * 2.0 + uTime * 0.5) * 0.1;
          pos.z += cos(pos.x * 1.5 + uTime * 0.3) * 0.05;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        
        void main() {
          vec2 uv = vUv;
          
          // Create flowing gradient
          float gradient1 = sin(uv.x * 3.0 + uTime * 0.5) * 0.5 + 0.5;
          float gradient2 = cos(uv.y * 2.0 + uTime * 0.3) * 0.5 + 0.5;
          float gradient3 = sin((uv.x + uv.y) * 2.0 + uTime * 0.7) * 0.5 + 0.5;
          
          // Mix colors based on gradients
          vec3 color = mix(uColor1, uColor2, gradient1);
          color = mix(color, uColor3, gradient2 * gradient3);
          
          // Add subtle transparency
          float alpha = 0.1 + gradient1 * 0.05;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current && shaderMaterial) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <planeGeometry args={[8, 8, 32, 32]} />
    </mesh>
  );
}
