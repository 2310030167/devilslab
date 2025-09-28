"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/projects-data';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProjectsPage = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.hub-header', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
            gsap.utils.toArray('.case-study-card').forEach((card, i) => {
                gsap.fromTo(card as HTMLElement, { opacity: 0, y: 50, scale: 0.95 }, {
                    scrollTrigger: {
                        trigger: card as HTMLElement,
                        start: 'top 85%',
                    },
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'power2.out'
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={sectionRef} className="projects-hub py-32 px-8 max-w-screen-xl mx-auto mt-20">
            <div className="hub-header text-center mb-16">
                <h1 className="text-6xl font-bold mb-6 text-gradient">Our Work</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">We solve complex problems by engineering beautiful and effective digital solutions. Explore our case studies.</p>
            </div>
            <div className="case-study-grid grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <Link href={`/projects/${project.slug}`} key={project.slug} className="case-study-card group bg-white rounded-2xl text-decoration-none text-inherit shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-2 block">
                        <div className="relative h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                             <Image 
                                src={project.imageUrl}
                                alt={`${project.title} logo`}
                                fill
                                className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint="logo tech"
                            />
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-2 text-primary">{project.title}</h3>
                            <p className="text-muted-foreground mb-6">{project.tagline}</p>
                            <div className="project-tags flex gap-2 flex-wrap mb-6">
                                {project.tags.map(tag => (
                                     <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                             <span className="cta-link flex items-center gap-2 font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                                View Case Study <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default ProjectsPage;
