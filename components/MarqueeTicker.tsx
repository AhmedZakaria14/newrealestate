'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Sparkles } from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';

interface MarqueeTickerProps {
  labelKey?: string;
  linkTextKey?: string;
  defaultLabel?: string;
  defaultLinkText?: string;
  linkHref?: string;
  reverse?: boolean;
  bgDark?: boolean;
}

export default function MarqueeTicker({
  labelKey,
  linkTextKey,
  defaultLabel = 'Complete Real Estate And Construction Solutions',
  defaultLinkText = 'Our Services',
  linkHref = '/services',
  reverse = false,
  bgDark = true,
}: MarqueeTickerProps) {
  const { t, theme } = useLanguageTheme();
  const isDark = theme === 'dark';

  const label = labelKey ? t(labelKey) : defaultLabel;
  const linkText = linkTextKey ? t(linkTextKey) : defaultLinkText;

  const item = (
    <div className="flex items-center gap-6 sm:gap-10 px-6 shrink-0">
      <span
        className={`text-base sm:text-lg font-bold tracking-tight uppercase whitespace-nowrap ${
          isDark ? 'text-white' : 'text-slate-800'
        }`}
      >
        {label}
      </span>
      <span className="opacity-40 font-normal">—</span>
      <Link
        href={linkHref}
        className={`text-base sm:text-lg font-extrabold underline transition-colors uppercase whitespace-nowrap ${
          isDark ? 'text-[#DCFF09] hover:text-white' : 'text-emerald-600 hover:text-slate-900'
        }`}
      >
        {linkText}
      </Link>
      <div
        className={`flex items-center gap-2 px-3.5 py-1 rounded-full border ${
          isDark
            ? 'bg-[#DCFF09]/10 border-[#DCFF09]/30 text-white'
            : 'bg-emerald-50 border-emerald-200 text-slate-800'
        }`}
      >
        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        <span className="text-xs sm:text-sm font-bold">4.9</span>
        <span className="text-xs opacity-70">4,200+ Reviews</span>
      </div>
      <Sparkles className="w-4 h-4 text-emerald-500" />
    </div>
  );

  return (
    <div
      className={`py-4 sm:py-5 border-y overflow-hidden relative select-none transition-colors ${
        isDark
          ? bgDark
            ? 'bg-[#040618] border-white/10'
            : 'bg-[#080b24] border-white/10'
          : bgDark
          ? 'bg-slate-100 border-slate-200'
          : 'bg-white border-slate-200'
      }`}
    >
      <div className={reverse ? 'animate-marquee-reverse' : 'animate-marquee'}>
        {item}
        {item}
        {item}
        {item}
        {item}
        {item}
      </div>
    </div>
  );
}
