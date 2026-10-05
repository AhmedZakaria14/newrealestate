'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { useSiteContent } from '@/lib/site-content-context';

export interface PageHeaderProps {
  pageKey?: string;
  title?: string;
  subtitle?: string;
  bgImage?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export default function PageHeader({
  pageKey,
  title,
  subtitle,
  bgImage,
  breadcrumb = [],
}: PageHeaderProps) {
  const { theme, t, direction, language } = useLanguageTheme();
  const { getPageBanner } = useSiteContent();
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  // Retrieve banner from live database if pageKey is present
  const banner = pageKey ? getPageBanner(pageKey) : null;
  const displayTitle = (banner ? (isAr ? banner.titleAr : banner.titleEn) : '') || title || '';
  const displaySubtitle = (banner ? (isAr ? banner.subtitleAr : banner.subtitleEn) : '') || subtitle;
  const displayImage = bgImage || banner?.image;

  return (
    <div
      className={`relative pt-24 pb-14 sm:pt-28 sm:pb-18 lg:pt-32 lg:pb-24 border-b overflow-hidden transition-colors ${
        isDark
          ? 'bg-[#040618] border-white/10 text-white'
          : 'bg-slate-900 border-slate-700 text-white'
      }`}
    >
      {/* Background Photography with Live Persistence */}
      {displayImage ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={displayImage}
            alt={displayTitle}
            fill
            priority
            unoptimized
            className="object-cover object-center filter brightness-[0.45] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle cinematic gradient overlay for perfect contrast */}
          <div
            className={`absolute inset-0 ${
              isDark
                ? 'bg-gradient-to-b from-[#040618]/80 via-[#040618]/70 to-[#040618]'
                : 'bg-gradient-to-b from-slate-950/85 via-slate-900/75 to-slate-900'
            }`}
          />
        </div>
      ) : (
        <>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="max-w-[1440px] 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white drop-shadow-md">
          {displayTitle}
        </h1>

        {displaySubtitle && (
          <p className="text-gray-200 text-sm sm:text-base max-w-3xl mx-auto mb-6 leading-relaxed font-light drop-shadow-sm">
            {displaySubtitle}
          </p>
        )}

        {/* Breadcrumb */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 border border-white/20 text-xs sm:text-sm text-gray-200 backdrop-blur-md shadow-lg">
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
