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
import { Bot, Link2, Code, Briefcase, BarChart, BookOpen, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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

const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="service-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 text-left">
        <div className="text-accent text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
);

const ServicesSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.section-title, .section-subtitle', { opacity: 0, y: 50 }, {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out'
            });
            gsap.utils.toArray('.service-card').forEach((card, i) => {
                gsap.fromTo(card as HTMLElement, { opacity: 0, y: 50 }, {
                    scrollTrigger: { trigger: card as HTMLElement, start: 'top 85%' },
                    opacity: 1, y: 0, duration: 0.8, delay: (i % 3) * 0.1, ease: 'power2.out'
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const services = [
        { icon: <Bot />, title: "AI & Machine Learning", description: "Develop intelligent systems, automation, and predictive analytics to solve complex business challenges." },
        { icon: <Link2 />, title: "Web3 & Blockchain", description: "Build decentralized applications, smart contracts, and token ecosystems on the next generation of the web." },
        { icon: <Code />, title: "Web Platform Development", description: "Create scalable, high-performance web portals, SaaS platforms, and digital marketplaces from scratch." },
        { icon: <Briefcase />, title: "Business Transformation", description: "Leverage technology to streamline operations, enhance customer engagement, and drive business growth." },
        { icon: <BarChart />, title: "Digital Marketing", description: "Data-driven marketing strategies, performance marketing, and content creation to build your brand's presence." },
        { icon: <BookOpen />, title: "Cutting-Edge Research", description: "Engage in forward-thinking research to explore and define the future of technology and its applications." },
    ];

    return (
        <section ref={sectionRef} id="services" className="py-32 px-8 bg-gray-50">
            <h2 className="section-title">Our Core Services</h2>
            <p className="section-subtitle">We engineer solutions that drive innovation and growth.</p>
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map(service => <ServiceCard key={service.title} {...service} />)}
            </div>
        </section>
    );
};


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
    );
};

const ResearchSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    useEffect(() => {
        // Animation logic
    }, []);

    const papers = [
        { title: "The Impact of Decentralized AI on Data Privacy", authors: "A. Sharma, Dr. L. Chen", published: "Q3 2025", abstract: "This paper explores novel architectures for AI models that operate on decentralized data, enhancing user privacy without sacrificing performance." },
        { title: "Scalable Consensus Mechanisms for Web3 Platforms", authors: "J. Doe, M. Patel", published: "Q4 2025", abstract: "Analyzing the trade-offs between speed, security, and decentralization in next-generation blockchain consensus protocols." },
        { title: "AI-Driven Personalization in Digital Marketing", authors: "S. Lee, K. Singh", published: "Q1 2026", abstract: "A study on the effectiveness of machine learning models in creating hyper-personalized user experiences and its impact on conversion rates." },
    ];

    return (
        <section ref={sectionRef} id="research" className="py-32 px-8 bg-white">
            <h2 className="section-title">Pioneering Research</h2>
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

const AboutSection = () => {
    const dndxImage = PlaceHolderImages.find(img => img.id === 'dndx-logo');
    return (
        <section id="about" className="py-32 px-8">
            <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-5xl font-bold mb-8 text-gradient text-left">Engineering Digital Realities</h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">DevilsLab is a collective of visionary engineers, researchers, and strategists dedicated to pushing the boundaries of technology. We partner with ambitious startups and enterprises to architect and build the next generation of digital products.</p>
                    <p className="text-lg text-muted-foreground leading-relaxed">Our mission is to translate complex challenges into elegant, scalable, and impactful solutions. From intelligent AI systems to decentralized Web3 platforms, we are committed to delivering excellence and shaping a smarter, more connected future.</p>
                </div>
                <div className="h-[400px] bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl flex items-center justify-center relative overflow-hidden border border-black/10 shadow-2xl p-8">
                    {dndxImage && (
                        <Image
                            src={dndxImage.imageUrl}
                            alt={dndxImage.description}
                            width={400}
                            height={400}
                            data-ai-hint={dndxImage.imageHint}
                            className="object-cover w-full h-full"
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

const FaqSection = () => {
  const faqItems = [
    {
      question: "What types of projects does DevilsLab specialize in?",
      answer: "DevilsLab specializes in engineering complex digital solutions. Our core areas include AI & Machine Learning, Web3 & Blockchain development, custom web platform creation (SaaS, marketplaces), and comprehensive digital transformation strategies for businesses of all sizes."
    },
    {
      question: "How do we start a project with you?",
      answer: "Starting a project is simple. It begins with an initial consultation where we discuss your idea and goals. Following that, we move to a proposal and planning phase. Once approved, our team proceeds with design, development, and regular check-ins before final deployment and support."
    },
    {
      question: "Do you work with startups as well as established companies?",
      answer: "Absolutely. We are passionate about innovation at every scale. We offer flexible engagement models tailored for early-stage startups to help them build MVPs and scale, as well as robust, enterprise-grade solutions for established corporations seeking digital transformation."
    },
    {
      question: "What is SyncGalaxy and how does it relate to DevilsLab?",
      answer: "SyncGalaxy is our flagship project, a global creator and startup growth hub. It represents our capability to build large-scale, community-driven platforms from the ground up and serves as a testament to our expertise in web platform development and ecosystem building."
    },
    {
      question: "What is the typical timeline and cost for a project?",
      answer: "Project timelines and costs vary significantly based on the scope, complexity, and technologies involved. After our initial consultation, we provide a detailed project proposal with a clear breakdown of deliverables, timelines, and pricing to ensure full transparency."
    }
  ];

  return (
    <section id="faq" className="py-32 px-8 bg-gray-50">
      <h2 className="section-title">Frequently Asked Questions</h2>
      <p className="section-subtitle">Have questions? We have answers. Find the most common inquiries below.</p>
      <div className="max-w-4xl mx-auto">
        <Accordion type="multiple" className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-gray-200/80 rounded-2xl shadow-lg mb-4 px-6">
              <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground pt-2">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

const ContactSection = () => {
    return (
        <section id="contact" className="py-32 px-8 bg-gray-50">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">Have an idea? Let's build the future together.</p>
            <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 bg-white p-12 rounded-2xl shadow-2xl border border-gray-200/80">
                <div className="contact-form">
                    <h3 className="text-3xl font-bold mb-8 text-primary">Send Us a Message</h3>
                    <form className="space-y-6">
                        <Input type="text" placeholder="Your Name" className="py-6" />
                        <Input type="email" placeholder="Your Email" className="py-6" />
                        <Textarea placeholder="Your Message" rows={5} />
                        <Button type="submit" size="lg" className="w-full rounded-full py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                            Send Message
                        </Button>
                    </form>
                </div>
                <div className="contact-info bg-primary text-white p-12 rounded-2xl flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-8">Contact Information</h3>
                    <div className="space-y-6 text-lg">
                        <div className="flex items-center gap-4">
                            <Mail size={24} />
                            <a href="mailto:hello@devilslab.io" className="hover:underline">hello@devilslab.io</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <Phone size={24} />
                            <a href="tel:+91000000000" className="hover:underline">+91 000 000 0000</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <MapPin size={24} />
                            <span>Hyderabad, India</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
      <ProjectsSection onOpenModal={() => setIsModalOpen(true)} />
      <ResearchSection />
      <CareersSection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
      <SyncGalaxyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
