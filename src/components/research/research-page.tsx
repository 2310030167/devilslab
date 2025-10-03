
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const ResearchPage = () => {
    const sectionRef = useRef<HTMLElement>(null);
    
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.research-title', { opacity: 0, y: 50 }, {
                scrollTrigger: { trigger: '.research-title', start: 'top 80%' },
                opacity: 1, y: 0, duration: 1, ease: 'power2.out'
            });
             gsap.utils.toArray<HTMLElement>('.research-item').forEach((item, i) => {
                gsap.fromTo(item, { opacity: 0, y: 100 }, {
                    scrollTrigger: { trigger: item, start: 'top 85%' },
                    opacity: 1, y: 0, duration: 1, delay: i * 0.2, ease: 'power2.out'
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const papers = [
        { title: "The Impact of Decentralized AI on Data Privacy", authors: "A. Sharma, Dr. L. Chen", published: "Q3 2025", abstract: "This paper explores novel architectures for AI models that operate on decentralized data, enhancing user privacy without sacrificing performance." },
        { 
            title: "Quantum-dot Cellular Automata: A Post-CMOS Paradigm", 
            authors: "DevilsLab Research", 
            published: "Q1 2026", 
            abstract: "This research paper explores the revolutionary potential of Quantum-dot Cellular Automata (QCA) as a post-CMOS approach for the future of nanoelectronics. It provides an overview of QCA fundamentals, investigates design and simulation tools, and compares QCA-based circuits with conventional CMOS technology, highlighting improvements in power, speed, and scalability while also discussing implementation challenges and future prospects." 
        },
        { title: "Scalable Consensus Mechanisms for Web3 Platforms", authors: "J. Doe, Dr. A. Smith", published: "Q2 2026", abstract: "This research analyzes and benchmarks novel consensus algorithms designed for high-throughput Web3 applications. We introduce a hybrid model that combines the security of Proof-of-Work with the efficiency of Proof-of-Stake to achieve scalability without sacrificing decentralization." },
        { title: "Anatomy of a Finfluencer Scam: Psychological Manipulation in Forex-Course Frauds", authors: "DevilsLab Research", published: "Q2 2026", abstract: "This research paper investigates how finfluencer-led forex-course scams exploit psychological triggers on social media by dissecting the architecture and behavioral tactics of such schemes. It applies psychological frameworks—including Cialdini’s principles of persuasion and prospect theory—to reveal how scammers design manipulative sales funnels. The study’s mixed-methods approach provides a context-specific, theory-driven analysis that exposes the nuanced cognitive and emotional levers activated by these scams." },
    ];

    return (
        <section ref={sectionRef} id="research" className="py-28 px-8 max-w-screen-xl mx-auto mt-20">
            <h2 className="research-title text-6xl font-bold text-center mb-6 text-gradient pb-4">Pioneering Research</h2>
            <p className="section-subtitle">Exploring the frontiers of technology to shape the future.</p>
            <div className="max-w-screen-lg mx-auto">
                {papers.map((paper, index) => (
                    <div key={paper.title} className={`research-item flex flex-col md:flex-row justify-between items-start md:items-center py-8 ${index === 0 ? 'border-t' : ''} border-b border-gray-200`}>
                        <div className="research-info mb-6 md:mb-0">
                            <h3 className="text-2xl font-bold mb-2 text-primary">{paper.title}</h3>
                            <span className="text-sm text-gray-500 block mb-4">Authors: {paper.authors} | Published: {paper.published}</span>
                            <p className="text-muted-foreground leading-relaxed max-w-prose">{paper.abstract}</p>
                        </div>
                        <Button disabled className="rounded-full px-8 py-6 text-base font-semibold cursor-not-allowed shrink-0">Coming Soon</Button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ResearchPage;
