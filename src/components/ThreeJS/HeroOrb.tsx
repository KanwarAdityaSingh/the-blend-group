"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, ShaderMaterial } from "three";
import * as THREE from "three";

export default function HeroOrb() {
  const meshRef = useRef<Mesh>(null);
  const { mouse, viewport } = useThree();

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uColor1: { value: new THREE.Color("#ff7bb9") },
        uColor2: { value: new THREE.Color("#b79cff") },
        uColor3: { value: new THREE.Color("#ffffff") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uTime;
        uniform vec2 uMouse;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 pos = position;
          
          // Add subtle morphing with noise
          float noise = sin(pos.x * 2.0 + uTime) * cos(pos.y * 2.0 + uTime) * 0.1;
          pos += normal * noise;
          
          // Mouse interaction
          vec3 mouseInfluence = (uMouse - 0.5) * 0.3;
          pos += mouseInfluence;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        
        void main() {
          vec2 uv = vUv;
          
          // Create gradient based on position
          float gradient = length(uv - 0.5);
          gradient = 1.0 - smoothstep(0.0, 0.5, gradient);
          
          // Add subtle animation
          float wave = sin(uTime * 0.5 + gradient * 10.0) * 0.1;
          gradient += wave;
          
          // Mix colors
          vec3 color = mix(uColor1, uColor2, gradient);
          color = mix(color, uColor3, gradient * 0.5);
          
          // Add glass-like transparency
          float alpha = gradient * 0.6 + 0.2;
          
          // Add subtle rim lighting
          float rim = 1.0 - gradient;
          rim = pow(rim, 2.0);
          color += rim * 0.3;
          
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
      shaderMaterial.uniforms.uMouse.value.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2
      );
      
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <sphereGeometry args={[1.5, 64, 64]} />
    </mesh>
  );
}
