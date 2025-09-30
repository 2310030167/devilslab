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
        plexusGroup: THREE.Group,
        nodes: THREE.Mesh[] = [],
        lines: THREE.Line[] = [];
    
    const mouse = new THREE.Vector2();

    const init = () => {
      try {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 25;
        
        renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        plexusGroup = new THREE.Group();
        scene.add(plexusGroup);

        const nodeCount = 80;
        const radius = 10;
        const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        
        // Create nodes
        for (let i = 0; i < nodeCount; i++) {
          const phi = Math.acos(-1 + (2 * i) / nodeCount);
          const theta = Math.sqrt(nodeCount * Math.PI) * phi;
          
          const node = new THREE.Mesh(
            nodeGeometry,
            new THREE.MeshBasicMaterial({ color: 0x0F3460, transparent: true, opacity: 0.8 })
          );
          
          node.position.setFromSphericalCoords(radius, phi, theta);
          nodes.push(node);
          plexusGroup.add(node);
        }

        // Create connections
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x1A1A2E, transparent: true, opacity: 0.15 });
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            if (nodes[i].position.distanceTo(nodes[j].position) < radius * 0.5) {
              const geometry = new THREE.BufferGeometry().setFromPoints([nodes[i].position, nodes[j].position]);
              const line = new THREE.Line(geometry, lineMaterial);
              lines.push(line);
              plexusGroup.add(line);
            }
          }
        }

        animate();
      } catch(e) {
        console.error("Failed to initialize 3D background", e);
      }
    };

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const time = Date.now() * 0.0001;

      plexusGroup.rotation.y += 0.0005;

      // Mouse interaction
      plexusGroup.rotation.y += (mouse.x * 0.2 - plexusGroup.rotation.y) * 0.02;
      plexusGroup.rotation.x += (-mouse.y * 0.2 - plexusGroup.rotation.x) * 0.02;

      // Node drift and pulse animation
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time * 5 + i * 0.3) * 0.4 + 0.6; // 0.6 to 1.0
        (node.material as THREE.MeshBasicMaterial).opacity = pulse;
        
        const driftFactor = Math.sin(time * 0.5 + i) * 0.001;
        node.position.x += driftFactor;
        node.position.y -= driftFactor;
      });
      
      // Central pulse
      const centerPulse = (Math.sin(time * 3) + 1) / 2 * 0.1 + 0.1; // 0.1 to 0.2
      lines.forEach(line => {
        (line.material as THREE.LineBasicMaterial).opacity = centerPulse;
      })

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
          if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
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
