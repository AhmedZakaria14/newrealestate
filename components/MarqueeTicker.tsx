'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
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
  const { t, theme, language } = useLanguageTheme();
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

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
          isDark ? 'text-blue-400 hover:text-white' : 'text-blue-600 hover:text-blue-900'
        }`}
      >
        {linkText}
      </Link>
      <div
        className={`flex items-center gap-2 px-3.5 py-1 rounded-full border ${
          isDark
            ? 'bg-blue-500/10 border-blue-500/30 text-white'
            : 'bg-blue-50 border-blue-200 text-slate-800'
        }`}
      >
        <ShieldCheck className="w-4 h-4 text-blue-400" />
        <span className="text-xs sm:text-sm font-bold">
          {isAr ? 'رخصة فال: 1200028472' : 'FAL #1200028472'}
        </span>
        <span className="text-xs opacity-90">
          {isAr ? 'اعتماد الهيئة العامة للعقار' : 'REGA Licensed'}
        </span>
      </div>
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 inline-block shrink-0" />
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
