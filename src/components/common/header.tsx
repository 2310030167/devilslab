"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/research', label: 'Research' },
    { href: '/forum', label: 'Forum' },
    { href: '/#careers', label: 'Careers' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
  ];

  const NavLink = ({ href, label }: { href: string, label: string }) => {
    if (href.startsWith('/#') && pathname === '/') {
      return (
        <a
          href={href}
          className={cn(
            "text-primary transition-colors duration-300 relative hover:text-accent",
            "after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
          )}
        >
          {label}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cn(
          "text-primary transition-colors duration-300 relative hover:text-accent",
          "after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full",
          pathname === href && "text-accent font-semibold after:w-full"
        )}
      >
        {label}
      </Link>
    );
  };


  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[1000] py-6 px-8 flex justify-between items-center transition-all duration-300 ease-in-out",
      isScrolled ? "bg-white/95 shadow-lg backdrop-blur-md" : "bg-transparent"
    )}>
      <Link href="/" className="text-2xl font-bold text-primary tracking-[0.1em]">
        DevilsLab
      </Link>
      <nav className="hidden md:flex gap-8 items-center">
        {navLinks.map((link) => (
          <NavLink key={link.href} href={link.href} label={link.label} />
        ))}
        <Button asChild className="rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-0.5">
          <a href="/#contact">Start a Project</a>
        </Button>
      </nav>
    </header>
  );
}
