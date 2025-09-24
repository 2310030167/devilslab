"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Search, Handshake, TrendingUp, Gem, X } from 'lucide-react';

interface SyncGalaxyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SolutionItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="solution-item flex items-center mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="text-xl mr-4 w-10 text-center text-accent">{icon}</div>
        <div className="flex-1 text-base text-primary leading-tight">{text}</div>
    </div>
);

export default function SyncGalaxyModal({ isOpen, onClose }: SyncGalaxyModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.to(modalRef.current, { display: 'block', opacity: 1, duration: 0.3, ease: 'power2.out' });
            gsap.fromTo(modalContentRef.current, { opacity: 0, y: -50, scale: 0.9 }, {
                opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out'
            });

            const solutionItems = modalContentRef.current?.querySelectorAll('.solution-item');
            if (solutionItems) {
                gsap.fromTo(solutionItems, 
                    { opacity: 0, x: -30 }, 
                    { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
                );
            }
            gsap.fromTo('.platform-comparison', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.6, ease: 'power2.out' });
        
        } else {
            gsap.to(modalContentRef.current, {
                opacity: 0, y: 50, scale: 0.9, duration: 0.3, ease: 'power2.in',
                onComplete: () => {
                    gsap.to(modalRef.current, { display: 'none', opacity: 0, duration: 0.2, onComplete: () => {
                        document.body.style.overflow = '';
                    }});
                }
            });
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === modalRef.current) onClose();
    }
    
    if (!isOpen && modalRef.current?.style.display !== 'block') return null;

    return (
        <div ref={modalRef} onClick={handleBackdropClick} className="hidden fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div ref={modalContentRef} className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative overflow-hidden">
                <div className="p-8 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-primary">What is SyncGalaxy?</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-primary transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8">
                    <p className="text-lg text-primary mb-8">
                        SyncGalaxy is a <strong>global creator & startup growth hub</strong> that solves the <strong>biggest problems in the creator economy and founder ecosystem</strong>:
                    </p>
                    <div className="mb-8">
                        <SolutionItem icon={<Search />} text="Finding verified creators, agencies, and developers" />
                        <SolutionItem icon={<Handshake />} text="Building trust with cross-border collaborations" />
                        <SolutionItem icon={<TrendingUp />} text="Scaling startups with real users and ambassadors" />
                        <SolutionItem icon={<Gem />} text="Rewarding early adopters with Galaxium Tokens ($GALAXIUM)" />
                    </div>
                    <div className="platform-comparison bg-gradient-to-r from-primary to-accent text-white p-6 rounded-xl mb-8 text-center">
                        <p className="text-lg leading-snug">It is like <strong>LinkedIn + Fiverr + Discord + Whop</strong>, but <strong>built for creators, founders, and global collaboration</strong>.</p>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                         <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                            <a href="https://syncgalaxy.io/" target="_blank" rel="noopener noreferrer">Visit SyncGalaxy</a>
                        </Button>
                        <Button variant="outline" size="lg" onClick={onClose} className="rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
