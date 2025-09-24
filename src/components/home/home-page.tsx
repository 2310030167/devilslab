"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import HeroBackground from './hero-background';
import SyncGalaxyModal from './sync-galaxy-modal';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
        const titleText = titleRef.current.textContent || '';
        titleRef.current.innerHTML = titleText.split('').map(char => 
            char === ' ' ? ' ' : `<span class="char inline-block opacity-0 translate-y-12">${char}</span>`
        ).join('');
    
        gsap.to('.hero-title .char', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power2.out',
            delay: 0.5
        });

        gsap.fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: 'power2.out' });
        gsap.fromTo('.hero-cta', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 2, ease: 'power2.out' });
    }
  }, []);

  return (
    <section id="home" className="h-screen relative flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-br from-white to-[#F8F9FA]">
      <HeroBackground />
      <div className="relative z-10 max-w-7xl px-8">
        <h1 ref={titleRef} className="hero-title text-black/70 font-medium tracking-[0.05em] mb-8 text-[clamp(1.5rem,3vw,2.5rem)]">
            ENGINEERING DIGITAL REALITIES
        </h1>
        <p className="hero-subtitle text-xl text-muted-foreground mb-12">
            DevilsLab pioneers AI solutions, Web3 innovation, business transformation, and cutting-edge research to shape the digital future.
        </p>
        <Button asChild size="lg" className="hero-cta rounded-full px-10 py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <Link href="/#projects">Explore Our Work</Link>
        </Button>
      </div>
    </section>
  );
};

const MarqueeSection = () => (
    <div className="bg-primary py-8 overflow-hidden whitespace-nowrap border-y border-primary/20">
        <div className="marquee-content">
            {Array(2).fill(0).map((_, i) => (
                 <div key={i} className="inline-block">
                    <span className="text-3xl font-bold mx-8 text-white tracking-[0.1em]">AI INNOVATION</span>
                    <span className="text-3xl font-bold mx-8 text-white tracking-[0.1em]">WEB3 DEVELOPMENT</span>
                    <span className="text-3xl font-bold mx-8 text-white tracking-[0.1em]">BUSINESS SOLUTIONS</span>
                    <span className="text-3xl font-bold mx-8 text-white tracking-[0.1em]">RESEARCH PAPERS</span>
                    <span className="text-3xl font-bold mx-8 text-white tracking-[0.1em]">MARKETING STRATEGY</span>
                    <span className="text-3xl font-bold mx-8 text-white tracking-[0.1em]">DIGITAL TRANSFORMATION</span>
                 </div>
            ))}
        </div>
    </div>
);

const ProjectsSection = ({ onOpenModal }: { onOpenModal: () => void }) => {
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
        <section ref={sectionRef} id="projects" className="py-32 px-8 max-w-screen-xl mx-auto">
            <h2 className="projects-title text-6xl font-bold text-center mb-16 text-gradient">Our Projects</h2>
            
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
                        <Button onClick={onOpenModal} className="rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">Learn More</Button>
                        <Button asChild variant="outline" className="ml-4 rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                            <a href="https://syncgalaxy.io/" target="_blank" rel="noopener noreferrer">Visit Project</a>
                        </Button>
                    </div>
                    <div className="h-[400px] bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl flex flex-col items-center justify-center relative overflow-hidden border border-black/10 shadow-2xl p-8">
                        <Image 
                            src="/images/syncgalaxy-logo.png"
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
                        <div className="text-5xl text-primary/30 font-light">Coming Soon</div>
                    </div>
                    <div>
                        <h3 className="text-5xl font-bold mb-6 text-primary">Future Project</h3>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">Our next groundbreaking solution is currently under development. We are pushing the boundaries of what's possible. Stay tuned for updates.</p>
                        <div className="flex gap-4 flex-wrap mb-8">
                            <span className="tag bg-primary/10 border border-primary text-primary px-4 py-2 rounded-full text-sm">Coming Soon</span>
                            <span className="tag bg-primary/10 border border-primary text-primary px-4 py-2 rounded-full text-sm">Innovation</span>
                            <span className="tag bg-primary/10 border border-primary text-primary px-4 py-2 rounded-full text-sm">Next-Gen</span>
                        </div>
                        <Button disabled className="rounded-full px-8 py-6 text-base font-semibold cursor-not-allowed">Coming Soon</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};


const CareersSection = () => {
    return (
        <section id="careers" className="py-32 px-8 bg-gray-50">
            <div className="max-w-screen-xl mx-auto text-center">
                <h2 className="text-6xl font-bold mb-6 text-gradient">Join Our Team</h2>
                <p className="text-xl text-muted-foreground mb-16">Build the future of digital experiences with us at DevilsLab</p>
                <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-12 max-w-3xl mx-auto">
                    <h3 className="text-3xl text-primary font-bold mb-4">No Open Positions Currently</h3>
                    <p className="text-muted-foreground mb-8 text-lg">We don't have any open positions at the moment, but we're always interested in connecting with talented individuals who share our passion for innovation.</p>
                    <Button asChild size="lg" className="rounded-full px-10 py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                        <a href="mailto:careers@devilslab.io">Send Your Portfolio</a>
                    </Button>
                </div>
            </div>
        </section>
    );
};

const ContactCtaSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
             gsap.fromTo('.contact-title', { opacity: 0, y: 50 }, {
                scrollTrigger: { trigger: '.contact-title', start: 'top 80%' },
                opacity: 1, y: 0, duration: 0.8, ease: 'power2.out'
            });
            gsap.fromTo('.contact-subtitle', { opacity: 0, y: 30 }, {
                scrollTrigger: { trigger: '.contact-subtitle', start: 'top 80%' },
                opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out'
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="contact" className="py-32 px-8 text-center bg-gradient-to-br from-[#F8F9FA] to-white">
            <h2 className="contact-title text-6xl font-bold mb-4 text-gradient">Have an idea?</h2>
            <p className="contact-subtitle text-2xl text-muted-foreground mb-12">Let's build the future together.</p>
            <Button asChild size="lg" className="rounded-full px-10 py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <a href="mailto:hello@devilslab.io">Get In Touch</a>
            </Button>
        </section>
    );
};

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <ProjectsSection onOpenModal={() => setIsModalOpen(true)} />
      <CareersSection />
      <ContactCtaSection />
      <SyncGalaxyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
