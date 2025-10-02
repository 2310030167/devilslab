"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';

export default function DndxHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || isMobile || !canvasRef.current) return;

    let scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        particles: THREE.Points,
        group: THREE.Group;
    
    const mouse = { x: 0, y: 0 };
    const windowHalf = { x: window.innerWidth / 2, y: window.innerHeight / 2 };


    const init = () => {
      try {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 40;
        
        renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        group = new THREE.Group();
        scene.add(group);

        // Central Neuron Sphere
        const neuronGeometry = new THREE.IcosahedronGeometry(4, 5);
        const neuronMaterial = new THREE.MeshBasicMaterial({
            color: 0x5a67d8,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const neuron = new THREE.Mesh(neuronGeometry, neuronMaterial);
        group.add(neuron);

        // Outer Hexagon
        const hexagonShape = new THREE.Shape();
        const size = 12;
        hexagonShape.moveTo(size * Math.cos(0), size * Math.sin(0));
        for (let i = 1; i <= 6; i++) {
            hexagonShape.lineTo(size * Math.cos(i * Math.PI / 3), size * Math.sin(i * Math.PI / 3));
        }

        const hexagonGeometry = new THREE.ShapeGeometry(hexagonShape);
        const hexagonMaterial = new THREE.MeshBasicMaterial({
            color: 0x8a2be2,
            wireframe: true,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.2
        });
        const hexagon = new THREE.Mesh(hexagonGeometry, hexagonMaterial);
        hexagon.rotation.x = Math.PI / 2;
        group.add(hexagon);

        // Particle Field
        const particleCount = 3000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const baseColor = new THREE.Color(0x1A1A2E);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 100;
            positions[i3 + 1] = (Math.random() - 0.5) * 100;
            positions[i3 + 2] = (Math.random() - 0.5) * 100;
            
            const randomColor = baseColor.clone().add(new THREE.Color(Math.random() * 0.1, Math.random() * 0.1, Math.random() * 0.2));
            randomColor.toArray(colors, i3);
        }
        
        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.7
        });
        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);


        animate();
      } catch(e) {
        console.error("Failed to initialize 3D background", e);
      }
    };

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const time = Date.now() * 0.0005;

      group.rotation.y += (mouse.x * 0.5 - group.rotation.y) * 0.05;
      group.rotation.x += (-mouse.y * 0.5 - group.rotation.x) * 0.05;

      const neuron = group.children[0] as THREE.Mesh;
      neuron.rotation.y += 0.001;

      const hexagon = group.children[1] as THREE.Mesh;
      hexagon.rotation.z -= 0.0005;

      // Pulsing effect
      const pulse = (Math.sin(time * 2) + 1) / 2; // oscillates between 0 and 1
      const neuronMaterial = (neuron.material as THREE.MeshBasicMaterial);
      neuronMaterial.opacity = 0.2 + pulse * 0.3;

      if(particles) {
          particles.rotation.y = time * 0.1;
      }
      
      renderer.render(scene, camera);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX - windowHalf.x) / windowHalf.x;
      mouse.y = (e.clientY - windowHalf.y) / windowHalf.y;
    };
    
    const onResize = () => {
      windowHalf.x = window.innerWidth / 2;
      windowHalf.y = window.innerHeight / 2;
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
      if(scene) {
        scene.traverse(object => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
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
  }, [isClient, isMobile]);

  if (!isClient) {
    return null;
  }
  
  if(isMobile) {
    return (
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20">
        <Image 
          src="https://images.unsplash.com/photo-1680530033206-881e0a7e44b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx0ZWNoJTIwbG9nb3xlbnwwfHx8fDE3NTg2NzgzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="DNDX Logo"
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
}
