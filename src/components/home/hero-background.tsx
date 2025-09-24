"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current) return;

    let scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        particles: THREE.Points,
        sphere: THREE.Mesh;
    
    const mouse = { x: 0, y: 0 };

    const init = () => {
      try {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const geometry = new THREE.BufferGeometry();
        const particleCount = 2000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const color = new THREE.Color();

        for (let i = 0; i < particleCount * 3; i++) {
          positions[i] = (Math.random() - 0.5) * 50;
          color.setHSL(0.6, 0.5, 0.15); // Corresponds to #1A1A2E
          colors[i * 3] = color.r;
          colors[i * 3 + 1] = color.g;
          colors[i * 3 + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({ size: 0.1, vertexColors: true, transparent: true, opacity: 0.8 });
        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        const sphereGeometry = new THREE.SphereGeometry(8, 32, 32);
        const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x1A1A2E, wireframe: true, transparent: true, opacity: 0.2 });
        sphere = new THREE.Mesh(sphereGeometry, wireframeMaterial);
        scene.add(sphere);

        camera.position.z = 20;

        animate();
      } catch(e) {
        console.error("Failed to initialize 3D background", e);
      }
    };

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      particles.rotation.y += 0.0005;
      sphere.rotation.y += 0.001;
      sphere.rotation.x += 0.0005;

      particles.rotation.x += (mouse.y * 0.00005);
      particles.rotation.y += (mouse.x * 0.00005);

      renderer.render(scene, camera);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    init();
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      // Dispose Three.js objects
      if(scene) {
        scene.traverse(object => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
      if(renderer) renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
}
