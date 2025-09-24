import Link from 'next/link';
import { Linkedin, Twitter, Github } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-gray-300 transition-all duration-300 hover:bg-white hover:text-primary transform hover:-translate-y-0.5 hover:shadow-lg">
        {children}
    </a>
);

export default function Footer() {
    const dndxLogo = PlaceHolderImages.find(p => p.id === 'dndx-logo');

    return (
        <footer className="bg-primary text-gray-300 py-16 px-8">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div className="footer-column">
                    <h4 className="text-white text-lg font-bold mb-6">DevilsLab</h4>
                    <p className="mb-6">Crafting the future of digital interaction.</p>
                    <div className="flex gap-4">
                        <SocialIcon href="https://linkedin.com"><Linkedin size={18} /></SocialIcon>
                        <SocialIcon href="https://twitter.com"><Twitter size={18} /></SocialIcon>
                        <SocialIcon href="https://github.com"><Github size={18} /></SocialIcon>
                    </div>
                </div>
                <div className="footer-column">
                    <h4 className="text-white text-lg font-bold mb-6">Navigation</h4>
                    <Link href="/" className="block mb-3 hover:text-white transition-colors">Home</Link>
                    <Link href="/#services" className="block mb-3 hover:text-white transition-colors">Services</Link>
                    <Link href="/#about" className="block mb-3 hover:text-white transition-colors">About</Link>
                    <Link href="/#careers" className="block mb-3 hover:text-white transition-colors">Careers</Link>
                </div>
                <div className="footer-column">
                    <h4 className="text-white text-lg font-bold mb-6">Our Projects</h4>
                    <a href="https://syncgalaxy.io/" target="_blank" rel="noopener noreferrer" className="block mb-3 hover:text-white transition-colors">SyncGalaxy</a>
                    <Link href="/#projects" className="block mb-3 hover:text-white transition-colors">Future Projects</Link>
                </div>
                <div className="footer-column">
                    <h4 className="text-white text-lg font-bold mb-6">Contact</h4>
                    <a href="mailto:hello@devilslab.io" className="block mb-3 hover:text-white transition-colors">hello@devilslab.io</a>
                    <a href="mailto:careers@devilslab.io" className="block mb-3 hover:text-white transition-colors">careers@devilslab.io</a>
                    <a href="tel:+91000000000" className="block mb-3 hover:text-white transition-colors">+91 000 000 0000</a>
                    <p>Hyderabad, India</p>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-300">
                <div className="flex justify-center items-center gap-4 mb-4">
                    <p>DevilsLab is powered by</p>
                    {dndxLogo && (
                        <Image
                            src={dndxLogo.imageUrl}
                            alt={dndxLogo.description}
                            width={100}
                            height={33}
                            data-ai-hint={dndxLogo.imageHint}
                            className="object-contain invert brightness-0"
                        />
                    )}
                </div>
                <p>© {new Date().getFullYear()} DevilsLab. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
