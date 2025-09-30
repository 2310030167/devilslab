"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onLoaded: () => void;
}

export default function Preloader({ onLoaded }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current || !preloaderRef.current) return;
    
    const chars = logoRef.current.textContent?.split('') || [];
    logoRef.current.innerHTML = chars.map(char => `<span class="char inline-block opacity-0">${char}</span>`).join('');
    
    const tl = gsap.timeline({ onComplete: onLoaded });

    tl.to(logoRef.current.querySelectorAll('.char'), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'power3.out',
        duration: 0.8
    })
    .to(logoRef.current, {
        delay: 0.5,
        letterSpacing: '0.5em',
        ease: 'power2.inOut',
        duration: 0.7
    })
    .to(logoRef.current, {
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
      <div ref={logoRef} className="preloader-logo">DEVILSLAB</div>
    </div>
  );
}
