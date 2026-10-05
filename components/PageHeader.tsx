'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumb = [],
}: PageHeaderProps) {
  const { theme, t, direction } = useLanguageTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 border-b overflow-hidden transition-colors ${
        isDark
          ? 'bg-gradient-to-b from-[#080b24] via-[#040618] to-[#040618] border-white/10 text-white'
          : 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-slate-700 text-white'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-6 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Breadcrumb */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm text-gray-200 backdrop-blur-md">
          <Link href="/" className="hover:text-blue-400 transition-colors font-medium">
            {t('nav.home')}
          </Link>
          {breadcrumb.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {direction === 'rtl' ? (
                <ChevronLeft className="w-3.5 h-3.5 text-gray-300" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
              )}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-blue-400 transition-colors font-medium">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-blue-400 font-bold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
