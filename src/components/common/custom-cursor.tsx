
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        let mouseX = 0;
        let mouseY = 0;
        let isHovering = false;

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const render = () => {
            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: isHovering ? 0.3 : 0.1,
                ease: 'power2.out'
            });
            requestAnimationFrame(render);
        };

        const onMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button')) {
                isHovering = true;
                cursor.classList.add('hover');
            }
            if (target.closest('.bg-primary') || target.closest('.bg-[#101010]') || target.closest('.bg-[#0A0A14]')) {
                cursor.classList.add('dark-bg');
            }
        };

        const onMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button')) {
                isHovering = false;
                cursor.classList.remove('hover');
            }
            if (target.closest('.bg-primary') || target.closest('.bg-[#101010]') || target.closest('.bg-[#0A0A14]')) {
                cursor.classList.remove('dark-bg');
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseover', onMouseEnter);
        document.body.addEventListener('mouseout', onMouseLeave);
        render();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseover', onMouseEnter);
            document.body.removeEventListener('mouseout', onMouseLeave);
        };
    }, []);

    return <div ref={cursorRef} className="cursor hidden md:block"></div>;
}
