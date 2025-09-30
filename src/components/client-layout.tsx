"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/common/preloader";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import CustomCursor from "@/components/common/custom-cursor";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setIsPreloading(false);
      }, 500);
    }
  }, [isLoaded]);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isPreloading && <Preloader onLoaded={() => setIsLoaded(true)} />}
      </AnimatePresence>
      
      <Header />

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <main>{children}</main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
