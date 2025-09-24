"use client";

import Link from 'next/link';
import { Twitter, Github, Globe, Mail, ArrowUpRight } from 'lucide-react';

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} className="block mb-3 text-gray-400 hover:text-white transition-colors duration-300">{children}</a>
);

const SocialLink = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
     <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mb-3 text-gray-400 hover:text-white transition-colors duration-300">
        {icon}
        <span>{label}</span>
    </a>
)

export default function Footer() {
    return (
        <footer className="bg-[#101010] text-gray-300 pt-20 pb-8 px-8">
            <div className="max-w-screen-xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-2">
                        <h4 className="text-white text-2xl font-bold mb-4 flex items-center gap-2">
                             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#8A2BE2" strokeWidth="2" strokeLinejoin="round"/>
                                <path d="M2 7L12 12L22 7" stroke="#8A2BE2" strokeWidth="2" strokeLinejoin="round"/>
                                <path d="M12 22V12" stroke="#8A2BE2" strokeWidth="2" strokeLinejoin="round"/>
                            </svg>
                            DevilsLab
                        </h4>
                        <p className="text-gray-400 max-w-sm">
                            Cross-border launch & collaboration—powered by trust, AI, and smart payouts. Crafted with care for creators, founders, and devs.
                        </p>
                    </div>

                    <div>
                        <h5 className="text-gray-500 font-semibold tracking-widest uppercase mb-4 text-sm">Product</h5>
                        <FooterLink href="/#services">Services</FooterLink>
                        <FooterLink href="https://syncgalaxy.io/" target="_blank">SyncGalaxy</FooterLink>
                        <FooterLink href="/#projects">Future Projects</FooterLink>
                    </div>
                    
                    <div>
                        <h5 className="text-gray-500 font-semibold tracking-widest uppercase mb-4 text-sm">Company</h5>
                        <FooterLink href="/#about">About</FooterLink>
                        <FooterLink href="/#careers">Careers</FooterLink>
                        <FooterLink href="/#research">Research</FooterLink>
                        <FooterLink href="/forum">Forum</FooterLink>
                    </div>

                    <div>
                        <h5 className="text-gray-500 font-semibold tracking-widest uppercase mb-4 text-sm">Social</h5>
                        <SocialLink href="https://twitter.com/devilslab_io" icon={<Twitter size={18} />} label="Twitter" />
                        <SocialLink href="https://github.com/devilslab-io" icon={<Github size={18} />} label="GitHub" />
                        <SocialLink href="/#blog">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Blog
                        </SocialLink>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p className="mb-4 md:mb-0">© {new Date().getFullYear()} DevilsLab MVP • All rights reserved</p>
                    <a href="https://devilslab.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                        Powered by DevilsLab <ArrowUpRight size={16} />
                    </a>
                </div>
            </div>
        </footer>
    );
}