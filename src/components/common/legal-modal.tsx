"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.to(overlayRef.current, { display: 'flex', opacity: 1, duration: 0.3, ease: 'power2.out' });
            gsap.fromTo(contentRef.current, 
                { opacity: 0, y: -30, scale: 0.98 }, 
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out', delay: 0.1 }
            );
            window.addEventListener('keydown', handleKeyDown);
        } else {
             gsap.to(contentRef.current, {
                opacity: 0, y: 30, scale: 0.98, duration: 0.3, ease: 'power2.in',
                onComplete: () => {
                    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: () => {
                        if (overlayRef.current) overlayRef.current.style.display = 'none';
                        document.body.style.overflow = '';
                    }});
                }
            });
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = ''; // Cleanup on component unmount as well
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    if (!isOpen && overlayRef.current?.style.display !== 'flex') return null;

    return (
        <div 
            ref={overlayRef} 
            onClick={handleBackdropClick} 
            className="modal-overlay"
        >
            <div ref={contentRef} className="modal-content">
                <div className="modal-header">
                    <h2 className="text-2xl font-bold text-primary">{title}</h2>
                    <button onClick={onClose} className="close-modal">
                        <X size={28} />
                    </button>
                </div>
                <div 
                    className="modal-body prose" 
                    dangerouslySetInnerHTML={{ __html: content }} 
                />
            </div>
        </div>
    );
}
