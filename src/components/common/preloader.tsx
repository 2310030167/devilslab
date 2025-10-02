"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

interface PreloaderProps {
  onLoaded: () => void;
}

export default function Preloader({ onLoaded }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current || !preloaderRef.current) return;
    
    const tl = gsap.timeline({ onComplete: onLoaded });

    tl.fromTo(logoRef.current, 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }
    )
    .to(logoRef.current, {
        delay: 0.5,
        opacity: 0,
        ease: 'power2.in',
        duration: 0.4
    })
    .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            if (preloaderRef.current) {
                preloaderRef.current.style.display = 'none';
            }
        }
    }, "-=0.2");
    
  }, [onLoaded]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div ref={logoRef} className="preloader-logo-container">
        <Image src="/DevilsLabM-bgr.png" alt="DevilsLab Logo" width={150} height={150} priority />
      </div>
    </div>
  );
}
