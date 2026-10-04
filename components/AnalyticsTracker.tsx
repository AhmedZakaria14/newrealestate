'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { logAnalyticsVisit } from '@/lib/firestore-service';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastLoggedPath = useRef<string | null>(null);

  useEffect(() => {
    // Avoid double logging the same page in fast dev re-renders
    if (lastLoggedPath.current === pathname) return;
    lastLoggedPath.current = pathname;

    // Detect device type safely
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    let device = 'desktop';
    if (width < 640) device = 'mobile';
    else if (width < 1024) device = 'tablet';

    const language = typeof navigator !== 'undefined' && navigator.language.startsWith('ar') ? 'ar' : 'en';
    const referrer = typeof document !== 'undefined' ? document.referrer : '';
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 150) : '';

    // Log in background
    logAnalyticsVisit({
      path: pathname || '/',
      referrer,
      device,
      language,
      userAgent,
    });
  }, [pathname]);

  return null;
}
