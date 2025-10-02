"use client";

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import HeroBackground from './hero-background';
import ServicesBackground from './services-background';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bot, Link2, Code, Briefcase, BarChart, BookOpen, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';


if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

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
        <h1 ref={titleRef} className="hero-title text-black/70 font-medium tracking-[0.05em] mb-6 text-[clamp(1.5rem,3vw,2.5rem)]">
            ENGINEERING DIGITAL REALITIES
        </h1>
        <p className="hero-subtitle text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            DevilsLab pioneers AI solutions, Web3 innovation, business transformation, and cutting-edge research to shape the digital future.
        </p>
        <Button asChild size="lg" className="hero-cta rounded-full px-8 md:px-10 py-6 md:py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <Link href="/projects">Explore Our Work</Link>
        </Button>
      </div>
    </section>
  );
};

const MarqueeSection = () => (
    <div className="bg-primary py-6 md:py-8 overflow-hidden whitespace-nowrap border-y border-primary/20">
        <div className="marquee-content">
            {Array(2).fill(0).map((_, i) => (
                 <div key={i} className="inline-block">
                    <span className="text-xl md:text-3xl font-bold mx-4 md:mx-8 text-white tracking-[0.1em]">AI INNOVATION</span>
                    <span className="text-xl md:text-3xl font-bold mx-4 md:mx-8 text-white tracking-[0.1em]">WEB3 DEVELOPMENT</span>
                    <span className="text-xl md:text-3xl font-bold mx-4 md:mx-8 text-white tracking-[0.1em]">BUSINESS SOLUTIONS</span>
                    <span className="text-xl md:text-3xl font-bold mx-4 md:mx-8 text-white tracking-[0.1em]">RESEARCH PAPERS</span>
                    <span className="text-xl md:text-3xl font-bold mx-4 md:mx-8 text-white tracking-[0.1em]">MARKETING STRATEGY</span>
                    <span className="text-xl md:text-3xl font-bold mx-4 md:mx-8 text-white tracking-[0.1em]">DIGITAL TRANSFORMATION</span>
                 </div>
            ))}
        </div>
    </div>
);

const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="service-card bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 text-left border border-white/20">
        <div className="text-accent text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
);

const ServicesSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.section-title, .section-subtitle', { opacity: 0, y: 50 }, {
                scrollTrigger: { trigger: sectionRef.current!, start: 'top 80%' },
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
        <section ref={sectionRef} id="services" className="relative py-20 md:py-28 px-4 md:px-8 bg-gray-50 overflow-hidden">
            <ServicesBackground />
            <div className="relative z-10">
                <h2 className="section-title">Our Core Services</h2>
                <p className="section-subtitle">We engineer solutions that drive innovation and growth.</p>
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map(service => <ServiceCard key={service.title} {...service} />)}
                </div>
            </div>
        </section>
    );
};

const AboutSection = () => {
    return (
        <section id="about" className="py-20 md:py-28 px-4 md:px-8">
            <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient text-left">Engineering Digital Realities</h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">DevilsLab is a collective of visionary engineers, researchers, and strategists dedicated to pushing the boundaries of technology. We partner with ambitious startups and enterprises to architect and build the next generation of digital products.</p>
                    <p className="text-lg text-muted-foreground leading-relaxed">Our mission is to translate complex challenges into elegant, scalable, and impactful solutions. From intelligent AI systems to decentralized Web3 platforms, we are committed to delivering excellence and shaping a smarter, more connected future.</p>
                </div>
                <div className="h-[300px] md:h-[400px] bg-white rounded-2xl flex items-center justify-center relative overflow-hidden border border-black/10 shadow-2xl p-8">
                    <Image
                        src="/images/DevilsLab.png"
                        alt="DevilsLab Logo"
                        width={400}
                        height={400}
                        data-ai-hint="logo tech"
                        className="object-contain w-full h-full"
                    />
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
    <section id="faq" className="py-20 md:py-28 px-4 md:px-8 bg-gray-50">
      <h2 className="section-title">Frequently Asked Questions</h2>
      <p className="section-subtitle">Have questions? We have answers. Find the most common inquiries below.</p>
      <div className="max-w-4xl mx-auto">
        <Accordion type="multiple" className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-gray-200/80 rounded-2xl shadow-lg mb-4 px-4 md:px-6">
              <AccordionTrigger
                suppressHydrationWarning
                className="text-base md:text-lg font-semibold text-left hover:no-underline text-primary">
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

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const ContactSection = () => {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const { name, email, message } = values;

        if (!name || !email || !message) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please fill out all fields.",
            });
            return;
        }

        const recipient = 'eajaz.dev@devilslab.co.in';
        const subject = `Message from ${name} via DevilsLab Website`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;

        toast({
            title: "Redirecting to your email client!",
            description: "Please complete sending the email from your mail application.",
        });
        form.reset();
    }
    return (
        <section id="contact" className="py-20 md:py-28 px-4 md:px-8 bg-gray-50">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">Have an idea? Let's build the future together.</p>
            <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 bg-white p-6 md:p-12 rounded-2xl shadow-2xl border border-gray-200/80">
                <div className="contact-form">
                    <h3 className="text-2xl md:text-3xl font-bold mb-8 text-primary">Send Us a Message</h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input suppressHydrationWarning placeholder="Your Name" {...field} className="py-6" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input suppressHydrationWarning type="email" placeholder="Your Email" {...field} className="py-6" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea suppressHydrationWarning placeholder="Your Message" rows={5} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button suppressHydrationWarning type="submit" size="lg" className="w-full rounded-full py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                                Send Message
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="contact-info bg-primary text-white p-8 md:p-12 rounded-2xl flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-8">Contact Information</h3>
                    <div className="space-y-6 text-base md:text-lg">
                        <div className="flex items-start gap-4">
                            <Mail size={24} className="mt-1 flex-shrink-0" />
                            <a href="mailto:eajaz.dev@devilslab.co.in" className="hover:underline break-all">eajaz.dev@devilslab.co.in</a>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone size={24} className="mt-1 flex-shrink-0" />
                            <a href="tel:+919100360159" className="hover:underline">+91 9100360159</a>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPin size={24} className="mt-1 flex-shrink-0" />
                            <span>Hyderabad, India</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
