"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/common/preloader";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setIsPreloading(false);
      }, 500);
    }
  }, [isLoaded]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isPreloading && <Preloader onLoaded={() => setIsLoaded(true)} />}
      </AnimatePresence>
      
      {isClient && <Header />}

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <main>{children}</main>
          {isClient && <Footer />}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
