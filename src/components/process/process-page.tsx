"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const processStages = [
    {
        number: "01",
        title: "Discovery & Strategy",
        description: "This is where we align with your vision. We dive deep into your goals, market, and challenges to build a strategic roadmap for success.",
        activities: ["Stakeholder Workshops", "Market Research", "Technical Feasibility", "Project Roadmapping"],
    },
    {
        number: "02",
        title: "Design & Prototyping",
        description: "We translate the strategy into a tangible user experience. Our focus is on creating intuitive, beautiful interfaces and robust system architecture.",
        activities: ["UI/UX Design", "Wireframing", "Interactive Prototypes", "System Architecture"],
    },
    {
        number: "03",
        title: "Agile Development & AI Integration",
        description: "Our team gets to work building your product in agile sprints. This is where we write clean code, train AI models, and bring the designs to life.",
        activities: ["Front-End & Back-End Development", "AI Model Training", "API Integration", "Continuous Testing"],
    },
    {
        number: "04",
        title: "Launch & Scale",
        description: "We handle the deployment and ensure a smooth launch. Post-launch, we provide ongoing support to monitor, iterate, and scale your solution for future growth.",
        activities: ["Cloud Deployment", "Performance Monitoring", "User Feedback Analysis", "Scalability Planning"],
    },
];

const ProcessPage = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.process-header', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });

            if (timelineRef.current) {
                const timelineLine = timelineRef.current.querySelector('.timeline-line-progress');
                gsap.fromTo(timelineLine, 
                    { scaleY: 0 }, 
                    { 
                        scaleY: 1, 
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: 'top center',
                            end: 'bottom bottom',
                            scrub: 1,
                        },
                        transformOrigin: 'top center',
                    }
                );

                const items = gsap.utils.toArray<HTMLElement>('.timeline-item');
                items.forEach((item, index) => {
                    const content = item.querySelector('.timeline-content');
                    const isOdd = index % 2 !== 0;

                    gsap.fromTo(content, 
                        { x: window.innerWidth < 768 ? '0' : (isOdd ? '100%' : '-100%'), opacity: 0 },
                        {
                            x: '0%',
                            opacity: 1,
                            duration: 0.8,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 80%',
                            }
                        }
                    );
                });
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={sectionRef} className="process-page py-32 px-4 md:px-8 max-w-screen-xl mx-auto mt-20">
            <div className="process-header text-center mb-16 md:mb-24">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">From Concept to Creation</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Our blueprint for turning ambitious ideas into market-ready innovations.
                </p>
            </div>
            
            <div ref={timelineRef} className="timeline relative max-w-4xl mx-auto">
                <div className="timeline-line absolute top-0 left-4 md:left-1/2 -translate-x-1/2 w-1 h-full bg-gray-200">
                     <div className="timeline-line-progress w-full h-full bg-primary origin-top" />
                </div>

                {processStages.map((stage, index) => (
                    <div key={index} className="timeline-item relative w-full mb-16 flex justify-start md:justify-center items-center">
                        <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                            <div className="timeline-content w-full ml-12 md:ml-0 md:max-w-md bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200/80">
                                <span className="text-4xl md:text-5xl font-bold text-primary/10 absolute -top-2 md:-top-4 -left-2 md:-left-4">{stage.number}</span>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary relative">{stage.title}</h2>
                                <p className="text-muted-foreground mb-6">{stage.description}</p>
                                <h4 className="font-semibold text-primary mb-3">Key Activities:</h4>
                                <ul className="space-y-2">
                                    {stage.activities.map(activity => (
                                        <li key={activity} className="flex items-center gap-3 text-muted-foreground">
                                            <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                                            <span>{activity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default ProcessPage;
