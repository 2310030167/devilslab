
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Rocket, Bot, Link2, Briefcase, BarChart, MessageSquare, FolderGit2 } from 'lucide-react';

const ForumHero = () => {
    return (
        <section className="pt-48 pb-28 px-8 bg-gradient-to-br from-[#F8F9FA] to-white text-center">
            <h1 className="forum-hero-title text-5xl md:text-7xl font-bold mb-6 text-gradient">Community Forum</h1>
            <p className="forum-hero-p text-xl text-muted-foreground mb-12 max-w-4xl mx-auto">Connect with innovators, researchers, and developers. Share insights, ask questions, and collaborate on the future of AI, Web3, business innovation, and digital marketing.</p>
            <Button asChild size="lg" className="forum-hero-btn rounded-full px-10 py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <a href="https://discord.gg/GkhErQkg" target="_blank" rel="noopener noreferrer">Join the Community</a>
            </Button>
        </section>
    );
};

const LiveOnDiscordSection = () => {
    return (
        <section className="live-discord-section py-20 px-8 max-w-screen-xl mx-auto">
             <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto text-center">
                <h3 className="text-3xl text-primary font-bold mb-4">Our Community is Live on Discord!</h3>
                <p className="text-muted-foreground mb-8 text-lg">The conversation has started. Join innovators, developers, and researchers on our official Discord server to share insights, ask questions, and collaborate.</p>
                <div className="flex justify-center">
                    <Button asChild size="lg" className="w-full md:w-auto rounded-full px-10 py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                        <a href="https://discord.gg/GkhErQkg" target="_blank" rel="noopener noreferrer">Join Discord</a>
                    </Button>
                </div>
            </div>
        </section>
    );
};


const CategoryCard = ({ icon, title, description, href }: { icon: React.ReactNode, title: string, description: string, href: string }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="category-card block bg-white border border-gray-200/80 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
        <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-primary">{title}</h3>
        </div>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex justify-between text-sm text-green-600 font-semibold">
            <span>Active on Discord</span>
        </div>
    </a>
);

const CategoriesSection = () => {
    const discordLink = "https://discord.gg/GkhErQkg";

    const categories = [
        { icon: <Bot size={28} />, title: "AI & Machine Learning", description: "Discuss the latest in artificial intelligence, machine learning algorithms, and practical AI implementations.", href: discordLink },
        { icon: <Link2 size={28} />, title: "Web3 & Blockchain", description: "Explore decentralized technologies, smart contracts, DeFi, and the future of the decentralized web.", href: discordLink },
        { icon: <Briefcase size={28} />, title: "Business Innovation", description: "Share strategies for digital transformation, startup methodologies, and innovative business models.", href: discordLink },
        { icon: <BarChart size={28} />, title: "Digital Marketing", description: "Discuss performance marketing, social media strategies, content creation, and marketing analytics.", href: discordLink },
        { icon: <FolderGit2 size={28} />, title: "Web Development", description: "Technical discussions on modern web technologies, frameworks, and interactive experiences.", href: discordLink },
        { icon: <Rocket size={28} />, title: "Project Showcase", description: "Present your projects, get feedback, and discover what the community is building.", href: discordLink },
        { icon: <MessageSquare size={28} />, title: "General Discussion", description: "Open discussions about technology trends, industry news, and community announcements.", href: discordLink },
    ];

    return (
        <section className="categories-section py-20 px-8">
            <h2 className="section-title text-5xl font-bold text-center mb-16 text-gradient">Forum Categories</h2>
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map(cat => <CategoryCard key={cat.title} {...cat} />)}
            </div>
        </section>
    );
};

const StatItem = ({ number, label }: { number: string, label: string }) => (
    <div className="stat-item text-center p-8 bg-white border border-gray-200/80 rounded-2xl shadow-lg">
        <div className="text-4xl font-bold text-primary mb-2">{number}</div>
        <div className="text-sm text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
);

const StatsSection = () => {
    return (
        <section className="stats-section py-16 px-8 bg-gray-50">
            <div className="max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
                <StatItem number="0" label="Members" />
                <StatItem number="0" label="Topics" />
                <StatItem number="0" label="Posts" />
                <StatItem number="7" label="Categories" />
            </div>
        </section>
    );
};


const GuidelineCard = ({ title, description }: { title: string, description: string }) => (
    <div className="guideline-card bg-white border border-gray-200/80 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <h4 className="text-xl font-bold text-primary mb-3">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
    </div>
);

const GuidelinesSection = () => {
    const guidelines = [
        { title: "Be Respectful", description: "Treat all community members with respect and professionalism. Constructive criticism is welcome, but personal attacks are not tolerated." },
        { title: "Stay On Topic", description: "Keep discussions relevant to the category. Off-topic posts may be moved or removed to maintain focus and organization." },
        { title: "Share Quality Content", description: "Contribute meaningful insights, well-researched information, and constructive discussions that add value to the community." },
        { title: "No Spam or Self-Promotion", description: "Avoid excessive self-promotion. Share your work when it's relevant and valuable to the discussion, but don't use the forum solely for promotion." },
        { title: "Cite Your Sources", description: "When sharing research, data, or technical information, provide proper citations and sources to maintain credibility and help others learn." },
        { title: "Help Others Learn", description: "Be patient with beginners and share knowledge generously. We're all here to learn and grow together in our respective fields." },
    ];

    return (
        <section className="guidelines-section py-20 px-8">
            <h2 className="guidelines-title text-5xl font-bold text-center mb-16 text-gradient">Community Guidelines</h2>
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {guidelines.map(g => <GuidelineCard key={g.title} {...g} />)}
            </div>
        </section>
    );
};

export default function ForumPage() {
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.forum-hero-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3 });
            gsap.fromTo('.forum-hero-p', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 });
            gsap.fromTo('.forum-hero-btn', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.9 });

            const animateSection = (selector: string) => {
                const section = document.querySelector(selector);
                if (section) {
                    gsap.fromTo(section, { opacity: 0, y: 50 }, {
                        scrollTrigger: { trigger: section, start: 'top 80%' },
                        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out'
                    });
                }
            };
            
            animateSection('.live-discord-section');

            const categoriesSection = document.querySelector('.categories-section');
            if (categoriesSection) {
                 gsap.fromTo(categoriesSection.querySelector('.section-title'), { opacity: 0, y: 50 }, {
                    scrollTrigger: { trigger: categoriesSection.querySelector('.section-title'), start: 'top 80%' },
                    opacity: 1, y: 0, duration: 1, ease: 'power2.out'
                });
                gsap.utils.toArray('.category-card').forEach((card, i) => {
                    gsap.fromTo(card as HTMLElement, { opacity: 0, y: 50 }, {
                        scrollTrigger: { trigger: card as HTMLElement, start: 'top 85%' },
                        opacity: 1, y: 0, duration: 0.8, delay: (i % 4) * 0.1, ease: 'power2.out'
                    });
                });
            }

            const statsSection = document.querySelector('.stats-section');
            if(statsSection){
                gsap.utils.toArray('.stat-item').forEach((item, i) => {
                    gsap.fromTo(item as HTMLElement, { opacity: 0, y: 50 }, {
                        scrollTrigger: { trigger: item as HTMLElement, start: 'top 85%' },
                        opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: 'power2.out'
                    });
                });
            }

            const guidelinesSection = document.querySelector('.guidelines-section');
            if(guidelinesSection) {
                gsap.fromTo('.guidelines-title', { opacity: 0, y: 50 }, {
                    scrollTrigger: { trigger: '.guidelines-title', start: 'top 80%' },
                    opacity: 1, y: 0, duration: 1, ease: 'power2.out'
                });
                gsap.utils.toArray('.guideline-card').forEach((card, i) => {
                    gsap.fromTo(card as HTMLElement, { opacity: 0, y: 50 }, {
                        scrollTrigger: { trigger: card as HTMLElement, start: 'top 85%' },
                        opacity: 1, y: 0, duration: 0.8, delay: (i % 3) * 0.1, ease: 'power2.out'
                    });
                });
            }

        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef}>
            <ForumHero />
            <LiveOnDiscordSection />
            <CategoriesSection />
            <StatsSection />
            <GuidelinesSection />
        </div>
    );
}
