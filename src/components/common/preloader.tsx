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
    gsap.to(logoRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
            setTimeout(() => {
                gsap.to(preloaderRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        if (preloaderRef.current) {
                            preloaderRef.current.style.display = 'none';
                        }
                        onLoaded();
                    }
                });
            }, 1500);
        }
    });
  }, [onLoaded]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div ref={logoRef} className="preloader-logo">DEVILSLAB</div>
    </div>
  );
}
