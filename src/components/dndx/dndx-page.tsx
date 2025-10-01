"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { BarChart, AreaChart, PieChart as PieChartIcon, LineChart } from 'lucide-react';
import DndxHeroBackground from './dndx-hero-background';
import { ShieldAlert, PiggyBank, Bot, TrendingUp, Handshake, Network, Briefcase, FileText } from 'lucide-react';
import { ResponsiveContainer, Pie, PieChart, Line, LineChart as RechartsLineChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ChartTooltip, ChartTooltipContent, ChartContainer, ChartConfig } from '@/components/ui/chart';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const pieData = [
  { name: 'Seed', value: 10, fill: 'var(--color-seed)' },
  { name: 'Private', value: 15, fill: 'var(--color-private)' },
  { name: 'Presale', value: 10, fill: 'var(--color-presale)' },
  { name: 'Team', value: 15, fill: 'var(--color-team)' },
  { name: 'Marketing', value: 10, fill: 'var(--color-marketing)' },
  { name: 'Treasury', value: 15, fill: 'var(--color-treasury)' },
  { name: 'Ecosystem', value: 25, fill: 'var(--color-ecosystem)' },
];

const chartConfig = {
  value: {
    label: 'DNDX',
  },
  seed: {
    label: 'Seed',
    color: 'hsl(var(--chart-1))',
  },
  private: {
    label: 'Private',
    color: 'hsl(var(--chart-2))',
  },
  presale: {
    label: 'Presale',
    color: 'hsl(var(--chart-3))',
  },
  team: {
    label: 'Team',
    color: 'hsl(var(--chart-4))',
  },
  marketing: {
    label: 'Marketing',
    color: 'hsl(var(--chart-5))',
  },
  treasury: {
    label: 'Treasury',
    color: 'hsl(var(--chart-1))',
  },
  ecosystem: {
    label: 'Ecosystem',
    color: 'hsl(var(--chart-2))',
  },
  Team: {
    label: 'Team Vesting',
    color: 'hsl(var(--chart-1))',
  },
  VCs: {
    label: 'VCs Vesting',
    color: 'hsl(var(--chart-2))',
  }
} satisfies ChartConfig;

const lineData = [
  { name: 'Launch', Team: 0, VCs: 0 },
  { name: '6m', Team: 0, VCs: 10 },
  { name: '12m', Team: 15, VCs: 25 },
  { name: '18m', Team: 30, VCs: 50 },
  { name: '24m', Team: 50, VCs: 75 },
  { name: '36m', Team: 100, VCs: 100 },
];

const timelineData = [
    { date: "Oct 17, 2025", event: "Presale 1" },
    { date: "Nov 2025", event: "Guardian Agent Launch" },
    { date: "Dec 2025", event: "Legal Lens AI Integration" },
    { date: "Q1 2026", event: "Exchange Listings (CEX)" },
    { date: "Q2 2026", event: "Community Growth Tools" },
    { date: "Q3 2026", event: "Adaptive Escrow Engine" },
    { date: "Q4 2026", event: "DNDX Presale Platform" },
    { date: "2027+", event: "Network Effect Layer" },
];


export default function DndxPage() {
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.fromTo(".dndx-hero-content > *", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, delay: 0.5, ease: 'power3.out' });

            // Animate sections
            const sections = gsap.utils.toArray<HTMLElement>('.dndx-section');
            sections.forEach(section => {
                const q = gsap.utils.selector(section);
                gsap.fromTo(q('.section-title-dndx, .section-subtitle-dndx'), { opacity: 0, y: 50 }, {
                    scrollTrigger: { trigger: section, start: 'top 80%' },
                    opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out'
                });
            });

            // Problem Section Cards
            gsap.utils.toArray<HTMLElement>('.problem-card').forEach((card, i) => {
                gsap.fromTo(card, { opacity: 0, y: 50, scale: 0.95 }, {
                    scrollTrigger: { trigger: card, start: 'top 85%' },
                    opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i * 0.15, ease: 'power3.out'
                });
            });

            // Solution Section Cards
            gsap.utils.toArray<HTMLElement>('.solution-card').forEach((card, i) => {
                gsap.fromTo(card, { opacity: 0, filter: 'blur(10px)', y: 50 }, {
                    scrollTrigger: { trigger: card, start: 'top 85%' },
                    opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out'
                });
            });

             // Dual-Chain Architecture Animation
            const dualChainSection = document.querySelector('.dual-chain-section');
            if (dualChainSection) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: dualChainSection,
                        start: 'top 60%',
                    }
                });
                tl.fromTo('.chain-box', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.3, ease: 'power3.out' });
                tl.fromTo('.chain-bridge', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power3.out' }, "-=0.5");
            }
            
            // Charts Animation
            gsap.fromTo('.charts-container > *', { opacity: 0, y: 50 }, {
                scrollTrigger: { trigger: '.charts-container', start: 'top 80%' },
                opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: 'power3.out'
            });

            // Roadmap Timeline
            const roadmapSection = document.querySelector('#roadmap');
            if (roadmapSection) {
                 const items = gsap.utils.toArray<HTMLElement>('.timeline-item-h');
                 const timeline = roadmapSection.querySelector('.timeline-h');
                 
                 gsap.to(items, {
                    xPercent: -100 * (items.length - 2.5), // Adjust to show ~2.5 items at a time
                    ease: "none",
                    scrollTrigger: {
                        trigger: roadmapSection,
                        pin: true,
                        scrub: 1,
                        end: () => "+=" + (timeline?.scrollWidth || 0),
                    }
                 });

                 items.forEach(item => {
                    gsap.fromTo(item, { opacity: 0.3 }, {
                        opacity: 1,
                        scrollTrigger: {
                            trigger: item,
                            containerAnimation: gsap.getTweensOf(items)[0],
                            start: 'left center',
                            end: 'right center',
                            scrub: true
                        }
                    });
                 });
            }

        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef} className="dndx-page bg-[#0A0A14] text-gray-200 overflow-x-hidden">
            {/* Hero Section */}
            <section id="hero-dndx" className="h-screen relative flex flex-col justify-center items-center text-center overflow-hidden">
                <DndxHeroBackground />
                <div className="dndx-hero-content relative z-10 max-w-5xl px-8">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Dendrites (DNDX)</h1>
                    <p className="text-xl md:text-2xl text-gray-300/80 mb-8">The AI-Powered Trust Layer for Web3.</p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Button size="lg" className="rounded-full w-full md:w-auto px-10 py-7 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-1">
                            Join The Presale
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full w-full md:w-auto px-10 py-7 text-lg font-semibold border-purple-400/50 text-purple-300 hover:bg-purple-400/10 hover:text-white transition-all transform hover:-translate-y-1">
                            Read Whitepaper
                        </Button>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section id="problem" className="dndx-section py-20 md:py-28 px-8 bg-[#0F101A]">
                <h2 className="section-title-dndx text-4xl md:text-5xl font-bold text-center mb-6">The Web3 Economy is at a Breaking Point</h2>
                <p className="section-subtitle-dndx text-lg md:text-xl text-gray-400 mb-16 max-w-3xl mx-auto text-center">Trust is the scarcest resource, hindering growth and adoption.</p>
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="problem-card bg-gray-900/50 p-8 rounded-2xl border border-red-500/30 shadow-xl shadow-red-500/10">
                        <ShieldAlert className="w-12 h-12 text-red-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-3 text-white">Rampant Scams</h3>
                        <p className="text-gray-400">Rug pulls, phishing, and smart contract exploits drain billions from the ecosystem annually, destroying user confidence.</p>
                    </div>
                    <div className="problem-card bg-gray-900/50 p-8 rounded-2xl border border-yellow-500/30 shadow-xl shadow-yellow-500/10">
                         <Briefcase className="w-12 h-12 text-yellow-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-3 text-white">Costly Compliance</h3>
                        <p className="text-gray-400">Navigating global regulations (KYC/AML) is complex and expensive, creating high barriers for legitimate projects.</p>
                    </div>
                    <div className="problem-card bg-gray-900/50 p-8 rounded-2xl border border-orange-500/30 shadow-xl shadow-orange-500/10">
                         <PieChartIcon className="w-12 h-12 text-orange-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-3 text-white">Rigged Presales</h3>
                        <p className="text-gray-400">Bots, insider trading, and unfair launch mechanics prevent genuine community members from early participation.</p>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section id="solution" className="dndx-section py-20 md:py-28 px-8">
                <h2 className="section-title-dndx text-4xl md:text-5xl font-bold text-center mb-6">The Solution: An AI-Powered Trust Layer</h2>
                <p className="section-subtitle-dndx text-lg md:text-xl text-gray-400 mb-16 max-w-3xl mx-auto text-center">DNDX leverages autonomous AI agents and a dual-chain architecture to make Web3 safe, compliant, and fair.</p>
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="solution-card bg-gray-900/50 p-8 rounded-2xl border border-blue-500/30 shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-2">
                        <Handshake className="w-10 h-10 text-blue-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-white">Adaptive Escrow</h3>
                        <p className="text-gray-400 text-sm">Milestone-based, dispute-safe payments that protect both clients and service providers.</p>
                    </div>
                    <div className="solution-card bg-gray-900/50 p-8 rounded-2xl border border-green-500/30 shadow-lg hover:shadow-green-500/20 transition-all transform hover:-translate-y-2">
                        <Bot className="w-10 h-10 text-green-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-white">AI-Driven Compliance</h3>
                        <p className="text-gray-400 text-sm">Automated KYC/AML & risk defense using our proprietary Legal Lens AI & Guardian Agent.</p>
                    </div>
                    <div className="solution-card bg-gray-900/50 p-8 rounded-2xl border border-purple-500/30 shadow-lg hover:shadow-purple-500/20 transition-all transform hover:-translate-y-2">
                        <AreaChart className="w-10 h-10 text-purple-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-white">Next-Gen Presales</h3>
                        <p className="text-gray-400 text-sm">Fair, transparent, and bot-resistant launches that prioritize real community members.</p>
                    </div>
                    <div className="solution-card bg-gray-900/50 p-8 rounded-2xl border border-pink-500/30 shadow-lg hover:shadow-pink-500/20 transition-all transform hover:-translate-y-2">
                        <TrendingUp className="w-10 h-10 text-pink-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-white">Community Growth</h3>
                        <p className="text-gray-400 text-sm">AI-powered agents and bots to automate hype, manage communities, and drive adoption.</p>
                    </div>
                </div>
            </section>

             {/* Dual-Chain Section */}
            <section className="dndx-section dual-chain-section py-20 md:py-28 px-8 bg-[#0F101A]">
                <h2 className="section-title-dndx text-4xl md:text-5xl font-bold text-center mb-6">Dual-Chain Architecture</h2>
                <p className="section-subtitle-dndx text-lg md:text-xl text-gray-400 mb-20 max-w-3xl mx-auto text-center">Combining Ethereum's security with Polygon's speed for the best of both worlds.</p>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 relative">
                    <div className="chain-box bg-gray-900/50 p-8 rounded-2xl border border-blue-400/30 shadow-xl w-full md:w-1/2 text-center">
                        <h3 className="text-2xl font-bold text-blue-300 mb-3">Ethereum: The Trust Layer</h3>
                        <p className="text-gray-400">Anchors core trading, liquidity pools, and institutional-grade settlement, ensuring maximum security and decentralization.</p>
                    </div>
                    <div className="chain-bridge w-24 h-2 bg-purple-500/50 md:w-2 md:h-24 rounded-full" />
                    <div className="chain-box bg-gray-900/50 p-8 rounded-2xl border border-purple-400/30 shadow-xl w-full md:w-1/2 text-center">
                        <h3 className="text-2xl font-bold text-purple-300 mb-3">Polygon: The Growth Layer</h3>
                        <p className="text-gray-400">Powers low-cost transactions for community rewards, airdrops, staking, and daily platform utility.</p>
                    </div>
                </div>
            </section>
            
            {/* Tokenomics & Vesting */}
            <section id="tokenomics" className="dndx-section py-20 md:py-28 px-8">
                <h2 className="section-title-dndx text-4xl md:text-5xl font-bold text-center mb-6">Tokenomics & Vesting</h2>
                <p className="section-subtitle-dndx text-lg md:text-xl text-gray-400 mb-16 max-w-3xl mx-auto text-center">A fixed supply and structured vesting schedule designed for long-term sustainable growth.</p>
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center charts-container">
                    <div className="chart-item bg-gray-900/50 p-8 rounded-2xl border border-gray-700">
                        <h3 className="text-2xl font-bold text-center mb-4 text-white">Token Allocation</h3>
                        <p className="text-center text-gray-400 mb-8">Total Supply: 2,500,000,000 DNDX</p>
                        <ChartContainer config={chartConfig} className="w-full h-80">
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie 
                                    data={pieData} 
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={120} 
                                    labelLine={false} 
                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                        const x  = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                        return (
                                            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                                {`${(percent * 100).toFixed(0)}%`}
                                            </text>
                                        );
                                    }}
                                />
                            </PieChart>
                        </ChartContainer>
                    </div>
                    <div className="chart-item bg-gray-900/50 p-8 rounded-2xl border border-gray-700">
                        <h3 className="text-2xl font-bold text-center mb-4 text-white">Vesting Unlock Schedules</h3>
                        <p className="text-center text-gray-400 mb-8">Demonstrating long-term commitment from team and VCs.</p>
                         <ChartContainer config={chartConfig} className="w-full h-80">
                            <RechartsLineChart data={lineData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" unit="%" />
                                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} cursor={{fill: 'rgba(138, 43, 226, 0.1)'}}/>
                                <Line type="monotone" dataKey="Team" stroke="var(--color-team)" strokeWidth={2} />
                                <Line type="monotone" dataKey="VCs" stroke="var(--color-VCs)" strokeWidth={2} />
                            </RechartsLineChart>
                        </ChartContainer>
                    </div>
                </div>
            </section>

             {/* Roadmap Section */}
            <section id="roadmap" className="dndx-section py-20 md:py-28 px-8 overflow-hidden">
                <div className="max-w-screen-xl mx-auto">
                    <h2 className="section-title-dndx text-4xl md:text-5xl font-bold text-center mb-6">Roadmap</h2>
                    <p className="section-subtitle-dndx text-lg md:text-xl text-gray-400 mb-16 text-center">Our strategic vision for building the future of Web3 trust.</p>
                </div>
                <div className="timeline-h w-full flex">
                    {timelineData.map((item, index) => (
                        <div key={index} className="timeline-item-h shrink-0 w-80 mr-8">
                            <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-700 h-full">
                                <p className="text-purple-400 font-semibold mb-2">{item.date}</p>
                                <h4 className="text-xl font-bold text-white">{item.event}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section id="cta" className="py-20 md:py-28 px-8 text-center bg-[#0F101A]">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the Future of Trust.</h2>
                <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">Become an early supporter of DNDX and help build a safer, more transparent Web3 economy.</p>
                 <div className="flex justify-center gap-4 flex-wrap">
                    <Button size="lg" className="rounded-full px-10 py-7 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-1">
                        Join The Presale
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-10 py-7 text-lg font-semibold border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all">
                        Join Discord
                    </Button>
                     <Button variant="outline" size="lg" className="rounded-full px-10 py-7 text-lg font-semibold border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all">
                        Follow on X
                    </Button>
                </div>
            </section>

        </main>
    );
}
    