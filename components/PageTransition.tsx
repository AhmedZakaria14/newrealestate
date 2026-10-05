'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  // Scroll to top immediately when route changes and trigger subtle route sweep
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Elegant Luxury Route Transition Top Bar */}
      <div
        className={`fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none transition-opacity duration-300 ${
          isNavigating ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <motion.div
          key={`bar-${pathname}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full bg-gradient-to-r from-blue-500 via-[#DEDBC8] to-blue-400 origin-left rtl:origin-right shadow-[0_0_12px_rgba(222,219,200,0.9)]"
        />
      </div>

      {/* Smooth Page Content Fade-In Transition */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 7 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.32,
          ease: [0.22, 1, 0.36, 1], // Custom smooth deceleration
        }}
        className="w-full flex-1 min-h-screen will-change-transform transform-gpu"
      >
        {children}
      </motion.div>
    </>
  );
}
