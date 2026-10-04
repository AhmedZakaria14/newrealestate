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
  const lenisRef = useRef<any>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const progressRingRef = useRef<SVGCircleElement | null>(null);
  const backToTopBtnRef = useRef<HTMLButtonElement | null>(null);

  const [showBackToTop, setShowBackToTop] = useState(false);
  const { direction, theme } = useLanguageTheme();
  const isDark = theme === 'dark';
  const reqIdRef = useRef<number | null>(null);

  const radius = 20;
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  useEffect(() => {
    let isMounted = true;
    let lenisInstance: any = null;

    // Direct window scroll listener as high-performance fallback and for progress updates
    const handleNativeScroll = () => {
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

      const shouldShow = scrollY > 350;
      setShowBackToTop(shouldShow);
    };

    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    // Dynamic import of Lenis to ensure flawless client hydration & chunk bundling
    import('lenis').then(({ default: Lenis }) => {
      if (!isMounted) return;

      try {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1.05,
          touchMultiplier: 1.25,
          infinite: false,
        });

        lenisInstance = lenis;
        lenisRef.current = lenis;

        const onScroll = (e: { progress: number; scroll: number }) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, e.progress))})`;
          }

          if (progressRingRef.current) {
            const offset = circumference - e.progress * circumference;
            progressRingRef.current.style.strokeDashoffset = `${offset}px`;
          }

          const shouldShow = e.scroll > 350;
          setShowBackToTop(shouldShow);
        };

        lenis.on('scroll', onScroll);

        function raf(time: number) {
          lenis.raf(time);
          reqIdRef.current = requestAnimationFrame(raf);
        }

        reqIdRef.current = requestAnimationFrame(raf);
      } catch (e) {
        console.warn('Lenis smooth scroll fallback to native', e);
      }
    }).catch(() => {
      // Fallback to native smooth scroll
    });

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href) as HTMLElement;
        if (targetElement) {
          e.preventDefault();
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetElement, {
              offset: -85,
              duration: 1.2,
            });
          } else {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { passive: false });

    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleNativeScroll);
      document.removeEventListener('click', handleAnchorClick);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, [circumference]);

  const scrollTo = (
    target: string | HTMLElement | number,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => {
    const lenis = lenisRef.current;
    if (!lenis) {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
      return;
    }
    lenis.scrollTo(target, {
      offset: options?.offset ?? -85,
      duration: options?.duration ?? 1.2,
      immediate: options?.immediate ?? false,
    });
  };

  const handleBackToTop = () => {
    scrollTo(0, { duration: 1.25 });
  };

  const getLenis = () => lenisRef.current;

  return (
    <SmoothScrollContext.Provider
      value={{
        getLenis,
        scrollTo,
      }}
    >
      {/* 1. Kinetic Top Progress Bar with Leading Glow Particle */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3.5px] bg-transparent pointer-events-none origin-left rtl:origin-right">
        <div
          ref={progressBarRef}
          className="relative h-full w-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-500 will-change-transform shadow-[0_0_14px_rgba(56,189,248,0.9)]"
          style={{ transform: 'scaleX(0)', transformOrigin: direction === 'rtl' ? 'right' : 'left' }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -right-1 rtl:right-auto rtl:-left-1 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#38bdf8]" />
        </div>
      </div>

      {children}

      {/* 2. Floating Kinetic Back to Top Button */}
      <button
        ref={backToTopBtnRef}
        onClick={handleBackToTop}
        aria-label="Back to Top"
        className={`fixed bottom-6 ${
          direction === 'rtl' ? 'left-6' : 'right-6'
        } z-40 w-13 h-13 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer group transform-gpu will-change-transform ${
          showBackToTop
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
        } ${
          isDark
            ? 'bg-[#080d2b]/95 backdrop-blur-md border border-white/20 text-white hover:border-blue-400 hover:shadow-blue-500/25'
            : 'bg-white/95 backdrop-blur-md border border-slate-300 text-slate-900 hover:border-blue-600 hover:shadow-blue-600/20'
        }`}
      >
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r={radius}
            className={`fill-none stroke-[2.5] ${
              isDark ? 'stroke-white/10' : 'stroke-slate-200'
            }`}
          />
          <circle
            ref={progressRingRef}
            cx="24"
            cy="24"
            r={radius}
            className="fill-none stroke-blue-500 stroke-[2.5] will-change-transform"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </svg>

        <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 text-blue-400 group-hover:text-blue-500" />
      </button>
    </SmoothScrollContext.Provider>
  );
}
