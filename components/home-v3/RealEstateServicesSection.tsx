'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import ServiceCardsList from '@/components/services/ServiceCardsList';

export default function RealEstateServicesSection() {
  const { language, theme, direction } = useLanguageTheme();
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  return (
    <section
      id="services-section"
      className={`py-20 sm:py-28 border-t transition-colors ${
        isDark
          ? 'bg-[#04071c] border-white/10 text-white'
          : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-xs uppercase tracking-widest font-black text-blue-500 px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
            {isAr ? 'حلول عقارية متكاملة' : 'End-to-End Solutions'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {isAr ? 'خدماتنا العقارية المتخصصة' : 'Our Specialized Real Estate Services'}
          </h2>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'من صفقات الاستحواذ الخاصة والحملات التسويقية العالمية إلى الاستشارات الاستثمارية المؤسسية، اكتشف كيف نحقق لعملائنا أفضل النتائج.'
              : 'From private acquisitions and global marketing campaigns to institutional asset advisory, discover how our tailored capabilities deliver measurable results.'}
          </p>
        </div>

        {/* 100% Exact Reference Service Cards */}
        <ServiceCardsList filterDivision="all" showCategoryTabs={true} />

        {/* View All Services Callout */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
          >
            <span>{isAr ? 'استعراض كافة خدمات قطاعات مجموعة هارد' : 'Explore All HARD Group Services'}</span>
            <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
          </Link>
        </div>
      </div>
    </section>
  );
}
