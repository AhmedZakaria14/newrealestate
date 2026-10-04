'use client';

import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';

interface SmoothScrollContextType {
  getLenis: () => unknown | null;
  scrollTo: (target: string | HTMLElement | number, options?: { offset?: number; duration?: number; immediate?: boolean }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  getLenis: () => null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const progressRingRef = useRef<SVGCircleElement | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { direction, theme } = useLanguageTheme();
  const isDark = theme === 'dark';

  const radius = 20;
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  // Ultra-lightweight native scroll listener on passive mode with requestAnimationFrame throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalScroll > 0 ? scrollY / totalScroll : 0;

          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
          }

          if (progressRingRef.current) {
            const offset = circumference - progress * circumference;
            progressRingRef.current.style.strokeDashoffset = `${offset}px`;
          }

          setShowBackToTop(scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [circumference]);

  const scrollTo = (
    target: string | HTMLElement | number,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => {
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + (options?.offset ?? -70);
        window.scrollTo({
          top,
          behavior: options?.immediate ? 'auto' : 'smooth',
        });
      }
    } else if (target instanceof HTMLElement) {
      const top = target.getBoundingClientRect().top + window.scrollY + (options?.offset ?? -70);
      window.scrollTo({
        top,
        behavior: options?.immediate ? 'auto' : 'smooth',
      });
    } else if (typeof target === 'number') {
      window.scrollTo({
        top: target,
        behavior: options?.immediate ? 'auto' : 'smooth',
      });
    }
  };

  const handleBackToTop = () => {
    scrollTo(0);
  };

  return (
    <SmoothScrollContext.Provider
      value={{
        getLenis: () => null,
        scrollTo,
      }}
    >
      {/* Sleek Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none origin-left rtl:origin-right">
        <div
          ref={progressBarRef}
          className="relative h-full w-full bg-[#DEDBC8] will-change-transform shadow-[0_0_10px_rgba(222,219,200,0.8)]"
          style={{ transform: 'scaleX(0)', transformOrigin: direction === 'rtl' ? 'right' : 'left' }}
        />
      </div>

      {children}

      {/* Floating Back to Top Button */}
      <button
        onClick={handleBackToTop}
        aria-label="Back to Top"
        className={`fixed bottom-6 ${
          direction === 'rtl' ? 'left-6' : 'right-6'
        } z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer group transform-gpu ${
          showBackToTop
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
        } bg-[#101010]/95 backdrop-blur-md border border-[#333] text-[#DEDBC8] hover:border-[#DEDBC8] hover:scale-105`}
      >
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="fill-none stroke-[#222] stroke-[2]"
          />
          <circle
            ref={progressRingRef}
            cx="24"
            cy="24"
            r={radius}
            className="fill-none stroke-[#DEDBC8] stroke-[2.5] will-change-transform"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </svg>

        <ArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5 text-[#DEDBC8]" />
      </button>
    </SmoothScrollContext.Provider>
  );
}
