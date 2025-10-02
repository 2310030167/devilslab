"use client";

import Link from 'next/link';
import { Twitter, Github, Globe, Mail, ArrowUpRight, Instagram } from 'lucide-react';

const FooterLink = ({ href, children, target }: { href: string, children: React.ReactNode, target?: string }) => (
    <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className="block mb-3 text-gray-400 hover:text-white transition-colors duration-300">{children}</a>
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
                        <SocialLink href="https://instagram.com/devilslab.io" icon={<Instagram size={18} />} label="Instagram" />
                        <SocialLink href="https://discord.gg/GkhErQkg" icon={
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
                                <path d="M20.317 4.36981C18.8471 3.75935 17.2285 3.36426 15.5218 3.2185C15.2218 3.68843 14.9018 4.14839 14.6218 4.61833C12.822 4.22324 11.1022 4.22324 9.38236 4.61833C9.0624 4.14839 8.78243 3.68843 8.48243 3.2185C6.77576 3.36426 5.15711 3.75935 3.68724 4.36981C0.797969 8.27838 0.408094 12.0573 1.05791 15.7067C3.12743 17.0664 5.107 18.0011 7.0266 18.6609C7.40654 18.111 7.74649 17.5411 8.04646 16.9512C7.57651 16.7162 7.12658 16.4713 6.68664 16.2064C6.77663 16.1264 6.86662 16.0364 6.95661 15.9464C11.186 17.8409 12.816 17.8409 17.0454 15.9464C17.1354 16.0364 17.2254 16.1264 17.3154 16.2064C16.8754 16.4713 16.4255 16.7162 15.9555 16.9512C16.2555 17.5411 16.5955 18.111 16.9754 18.6609C18.895 18.0011 20.8746 17.0664 22.9441 15.7067C23.6739 11.4574 23.014 7.69853 20.317 4.36981ZM13.4161 13.4024C12.4462 13.4024 11.6464 12.5626 11.6464 11.5528C11.6464 10.543 12.4462 9.70318 13.4161 9.70318C14.386 9.70318 15.1858 10.543 15.1858 11.5528C15.1858 12.5626 14.386 13.4024 13.4161 13.4024ZM10.5858 13.4024C9.61591 13.4024 8.81606 12.5626 8.81606 11.5528C8.81606 10.543 9.61591 9.70318 10.5858 9.70318C11.5557 9.70318 12.3555 10.543 12.3555 11.5528C12.3555 12.5626 11.5557 13.4024 10.5858 13.4024Z" />
                            </svg>
                        } label="Discord" />
                        <SocialLink href="/#blog">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Blog
                        </SocialLink>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p className="mb-4 md:mb-0">© {new Date().getFullYear()} DevilsLab MVP • All rights reserved</p>
                    <a href="https://dndx.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                        Powered by DNDX <ArrowUpRight size={16} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
