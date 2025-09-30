"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

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
    { href: '/process', label: 'Our Process' },
    { href: '/dndx', label: 'DNDX' },
    { href: '/forum', label: 'Forum' },
    { href: '/#about', label: 'About' },
  ];

  const NavLink = ({ href, label }: { href: string, label: string }) => {
    const isDNDXPage = pathname === '/dndx';
    const isActive = pathname === href || (pathname.startsWith('/projects') && href === '/projects');

    return (
      <Link
        href={href}
        className={cn(
          "transition-colors duration-300 relative text-lg",
          isDNDXPage ? "text-gray-300 hover:text-white" : "text-primary hover:text-accent",
          "after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-300",
          isActive
            ? (isDNDXPage ? "after:bg-purple-400 text-white font-semibold after:w-full" : "after:bg-accent text-accent font-semibold after:w-full")
            : (isDNDXPage ? "hover:after:bg-white" : "hover:after:bg-accent hover:after:w-full")
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[1000] py-4 px-4 sm:px-8 flex justify-between items-center transition-all duration-300 ease-in-out",
      isScrolled ? "bg-white/80 shadow-lg backdrop-blur-md" : "bg-transparent",
      pathname === '/dndx' && !isScrolled && "bg-transparent border-b border-white/10"
    )}>
      <Link href="/" className={cn(
        "text-2xl font-bold tracking-[0.1em]",
        pathname === '/dndx' && !isScrolled ? "text-white" : "text-primary"
        )}>
        DevilsLab
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 items-center">
        {navLinks.map((link) => (
          <NavLink key={link.href} href={link.href} label={link.label} />
        ))}
        <Button asChild className="rounded-full px-6 py-5 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-0.5 ml-4">
          <a href="/#contact">Start a Project</a>
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={cn(pathname === '/dndx' && !isScrolled ? "text-white" : "text-primary")}>
              <Menu size={24} />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white p-0 w-full max-w-sm">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b">
                 <Link href="/" className="text-xl font-bold text-primary tracking-[0.1em]">
                    DevilsLab
                 </Link>
                 <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                        <X size={24} />
                        <span className="sr-only">Close menu</span>
                    </Button>
                 </SheetClose>
              </div>

              <nav className="flex flex-col gap-2 p-6">
                {navLinks.map((link) => (
                   <SheetClose asChild key={link.href}>
                     <Link
                        href={link.href}
                        className={cn(
                          "text-xl font-medium text-primary hover:bg-gray-100 rounded-md p-4 transition-colors",
                          (pathname === link.href || (pathname.startsWith('/projects') && link.href === '/projects')) && "bg-gray-100 text-accent font-semibold"
                        )}
                      >
                        {link.label}
                      </Link>
                   </SheetClose>
                ))}
              </nav>

              <div className="mt-auto p-6 border-t">
                <SheetClose asChild>
                  <Button asChild className="w-full rounded-full py-6 text-lg font-semibold">
                    <a href="/#contact">Start a Project</a>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
