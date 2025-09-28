"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import SyncGalaxyModal from '@/components/home/sync-galaxy-modal';
import { ArrowUpRight } from 'lucide-react';

const ProjectsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.projects-title', { opacity: 0, y: 50 }, {
                scrollTrigger: { trigger: '.projects-title', start: 'top 80%' },
                opacity: 1, y: 0, duration: 1, ease: 'power2.out'
            });
            gsap.utils.toArray<HTMLElement>('.project-item').forEach((item, i) => {
                gsap.fromTo(item, { opacity: 0, y: 100 }, {
                    scrollTrigger: { trigger: item, start: 'top 80%' },
                    opacity: 1, y: 0, duration: 1, delay: i * 0.2, ease: 'power2.out'
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <section ref={sectionRef} id="projects" className="py-32 px-8 max-w-screen-xl mx-auto mt-20">
                <h2 className="projects-title text-6xl font-bold text-center mb-16 text-gradient pb-4">Our Projects</h2>
                
                <div className="project-item mb-32">
                    <div className="grid md:grid-cols-2 gap-16 items-center min-h-[60vh]">
                        <div>
                            <h3 className="text-5xl font-bold mb-6 text-primary">SyncGalaxy</h3>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">As a flagship project of DevilsLab, SyncGalaxy represents our commitment to building interconnected digital ecosystems. It's a testament to our capabilities in creating scalable and immersive platforms.</p>
                            <div className="flex gap-4 flex-wrap mb-8">
                                <span className="tag bg-primary/10 border border-primary text-primary px-4 py-2 rounded-full text-sm">Web Platform</span>
                                <span className="tag bg-primary/10 border border-primary text-primary px-4 py-2 rounded-full text-sm">Community</span>
                                <span className="tag bg-primary/10 border border-primary text-primary px-4 py-2 rounded-full text-sm">Development</span>
                            </div>
                            <Button onClick={() => setIsModalOpen(true)} className="rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">Learn More</Button>
                            <Button asChild variant="outline" className="ml-4 rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                                <a href="https://syncgalaxy.io/" target="_blank" rel="noopener noreferrer">Visit Project</a>
                            </Button>
                        </div>
                        <div className="h-[400px] bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl flex flex-col items-center justify-center relative overflow-hidden border border-black/10 shadow-2xl p-8">
                             <Image 
                                src="https://images.unsplash.com/photo-1680530033206-881e0a7e44b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx0ZWNoJTIwbG9nb3xlbnwwfHx8fDE3NTg2NzgzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="SyncGalaxy Logo"
                                width={300}
                                height={100}
                                data-ai-hint="logo"
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>

                <div className="project-item">
                    <div className="grid md:grid-cols-2 gap-16 items-center min-h-[60vh]">
                         <div className="h-[400px] bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl flex items-center justify-center relative overflow-hidden border border-black/10 shadow-2xl">
                            <div className="text-5xl text-primary/30 font-light">Legal Lens AI</div>
                        </div>
                        <div>
                            <h3 className="text-5xl font-bold mb-6 text-primary">Legal Lens AI</h3>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">An AI that's better than a law firm. Legal Lens scans your legal documents, flags critical issues, and provides insights in seconds.</p>
                            <p className="text-md text-muted-foreground/80 mb-8 leading-relaxed flex items-center gap-2">
                                Powered by DNDX <ArrowUpRight size={16} />
                            </p>
                            <div className="flex gap-4 flex-wrap mb-8">
                                <span className="tag bg-primary/10 border border-primary text-primary px-4 py-2 rounded-full text-sm">AI</span>
                                <span className="tag bg-primary/10 border border-primary text-primary px-4 py-2 rounded-full text-sm">Legal Tech</span>
                                <span className="tag bg-primary/10 border border-primary text-primary px-4 py-2 rounded-full text-sm">Document Analysis</span>
                            </div>
                            <Button disabled className="rounded-full px-8 py-6 text-base font-semibold cursor-not-allowed">Coming Soon</Button>
                        </div>
                    </div>
                </div>
            </section>
            <SyncGalaxyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default ProjectsPage;
