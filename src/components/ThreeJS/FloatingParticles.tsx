"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, BufferAttribute, Points, ShaderMaterial } from "three";
import * as THREE from "three";

export default function FloatingParticles() {
  const pointsRef = useRef<Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions in a sphere
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.cos(phi);
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Soft colors
      const color = new THREE.Color();
      const hue = 0.7 + Math.random() * 0.3;
      color.setHSL(hue, 0.6, 0.8);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 0.5 + 0.2;
    }

    return { positions, colors, sizes };
  }, []);

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.4 },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        varying float vOpacity;
        uniform float uTime;
        
        void main() {
          vColor = color;
          
          vec3 pos = position;
          
          // Gentle floating animation
          pos.y += sin(uTime * 0.3 + pos.x * 0.5) * 0.2;
          pos.x += cos(uTime * 0.2 + pos.z * 0.3) * 0.1;
          pos.z += sin(uTime * 0.4 + pos.y * 0.4) * 0.15;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size based on distance
          float dist = length(mvPosition.xyz);
          gl_PointSize = (size * 200.0 / dist) * (1.0 + sin(uTime + pos.x) * 0.1);
          
          vOpacity = 1.0 - (dist / 8.0);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        uniform float uOpacity;
        
        void main() {
          // Soft circular particles
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = (1.0 - dist * 2.0) * vOpacity * uOpacity;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      vertexColors: true,
    });
  }, []);

  useFrame((state) => {
    if (pointsRef.current && shaderMaterial) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    geo.setAttribute("color", new BufferAttribute(colors, 3));
    geo.setAttribute("size", new BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  return (
    <points ref={pointsRef} geometry={geometry} material={shaderMaterial} />
  );
}
