"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, BufferAttribute, Points, ShaderMaterial } from "three";
import * as THREE from "three";

export default function ParticleFlow() {
  const pointsRef = useRef<Points>(null);

  const { positions, colors } = useMemo(() => {
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Create flowing lines
      const t = (i / particleCount) * Math.PI * 4;
      const radius = 2 + Math.sin(t * 0.5) * 0.5;
      
      positions[i3] = Math.cos(t) * radius;
      positions[i3 + 1] = Math.sin(t * 0.3) * 2;
      positions[i3 + 2] = Math.sin(t) * radius;

      // Color based on position
      const color = new THREE.Color();
      color.setHSL(0.7 + Math.sin(t) * 0.2, 0.6, 0.7);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.6 },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        varying float vOpacity;
        uniform float uTime;
        
        void main() {
          vColor = color;
          
          vec3 pos = position;
          
          // Animate particles along the flow
          pos.y += sin(uTime * 0.5 + pos.x * 0.5) * 0.1;
          pos.x += cos(uTime * 0.3 + pos.z * 0.5) * 0.05;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size based on distance and animation
          float dist = length(mvPosition.xyz);
          gl_PointSize = (300.0 / dist) * (1.0 + sin(uTime + pos.x) * 0.2);
          
          vOpacity = 1.0 - (dist / 10.0);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          // Create circular particles
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = (1.0 - dist * 2.0) * vOpacity;
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
    return geo;
  }, [positions, colors]);

  return (
    <points ref={pointsRef} geometry={geometry} material={shaderMaterial} />
  );
}
