'use client';

import React, { Suspense, useEffect, useState, useTransition } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguageTheme } from '@/lib/language-theme-context';
import CircularLogoLoader from './CircularLogoLoader';

function PageTransitionLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme } = useLanguageTheme();
  const isDark = theme === 'dark';

  const [isLoading, setIsLoading] = useState(false);
  const [, startTransition] = useTransition();

  // Reset loader when pathname or searchParams change
  useEffect(() => {
    // When the path changes, wait slightly for smooth reveal, then hide
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 320);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // Intercept click on internal links to trigger transition immediately
  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      // Find the closest anchor tag
      const anchor = (event.target as HTMLElement).closest('a');
      if (!anchor) return;

      const target = anchor.getAttribute('target');
      if (target === '_blank') return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore hash links, tel, mailto, external javascript
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return;
      }

      // Check if it's an internal link
      try {
        const url = new URL(href, window.location.href);
        const isInternal = url.origin === window.location.origin;

        if (isInternal) {
          // If already on the same path and search, don't show loader
          const currentUrl = new URL(window.location.href);
          if (url.pathname === currentUrl.pathname && url.search === currentUrl.search) {
            return;
          }

          startTransition(() => {
            setIsLoading(true);
          });
        }
      } catch {
        // invalid URL string, skip
      }
    };

    document.addEventListener('click', handleLinkClick, { capture: true });

    // Handle browser back/forward buttons
    const handlePopState = () => {
      setIsLoading(true);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleLinkClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Safety fallback: if loading remains true for > 3.5s, auto-dismiss
  useEffect(() => {
    if (!isLoading) return;
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(safetyTimer);
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="page-transition-loader"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto select-none ${
            isDark
              ? 'bg-[#040618]/85 text-white'
              : 'bg-white/85 text-slate-900'
          }`}
          aria-live="polite"
          aria-busy="true"
        >
          {/* Subtle radiating background radial flare */}
          <div
            className={`absolute w-96 h-96 rounded-full blur-3xl pointer-events-none ${
              isDark ? 'bg-blue-600/15' : 'bg-blue-400/20'
            }`}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <CircularLogoLoader size="md" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PageTransitionLoader() {
  return (
    <Suspense fallback={null}>
      <PageTransitionLoaderInner />
    </Suspense>
  );
}
