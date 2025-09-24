"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "@/components/common/preloader";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This function will be called by the Preloader component when its animation is finished
    const handleLoadingComplete = () => {
      setIsLoaded(true);
      document.body.style.overflow = '';
    };

    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // A slight delay to ensure all content is ready before starting the preloader animation
    const timer = setTimeout(() => {
      // The Preloader component will call this function
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader onLoaded={() => {
        setIsLoaded(true);
        if (typeof window !== "undefined") {
          document.body.style.overflow = '';
        }
      }} />
      <div style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s' }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
