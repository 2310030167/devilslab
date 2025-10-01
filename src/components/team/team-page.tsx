"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { teamMembers } from '@/lib/team-data';
import { Linkedin, Github, Dribbble } from 'lucide-react';

const iconMap = {
    linkedin: Linkedin,
    github: Github,
    dribbble: Dribbble
};

const TeamPage = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.team-header', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
            gsap.utils.toArray('.team-card').forEach((card, i) => {
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
        <main ref={sectionRef} className="team-page py-28 px-4 md:px-8 max-w-screen-xl mx-auto mt-20">
            <div className="team-header text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">The Innovators Behind The Code</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    We are a collective of researchers, engineers, and entrepreneurs united by a passion for solving complex challenges and building the future of the digital world.
                </p>
            </div>
            <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-card bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-2">
                        <Image
                            src={member.imageUrl}
                            alt={`Headshot of ${member.name}`}
                            width={120}
                            height={120}
                            className="rounded-full mx-auto mb-6 border-4 border-white shadow-md"
                        />
                        <h3 className="text-2xl font-bold mb-1 text-primary">{member.name}</h3>
                        <span className="block text-accent font-medium mb-4">{member.role}</span>
                        <p className="text-muted-foreground mb-6">{member.bio}</p>
                        <div className="social-links flex justify-center gap-4">
                            {member.socials.map((social) => {
                                const Icon = iconMap[social.platform as keyof typeof iconMap];
                                return (
                                    <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300">
                                        <Icon size={24} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default TeamPage;
