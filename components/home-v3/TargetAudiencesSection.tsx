'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  Home,
  Sparkles,
  Key,
  Building,
  BadgePercent,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import { referenceAudiences } from '@/data/reference-data';

export default function TargetAudiencesSection() {
  const { language, theme, direction } = useLanguageTheme();
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  const audiences = referenceAudiences[language] || referenceAudiences.en;

  const iconMap: Record<string, React.ElementType> = {
    home: Home,
    sparkles: Sparkles,
    key: Key,
    building: Building,
    'badge-percent': BadgePercent,
    'trending-up': TrendingUp,
  };

  return (
    <section
      id="audiences"
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
            {isAr ? 'تخصصات العملاء والحلول العقارية' : 'Client Categories & Solutions'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {isAr
              ? 'حلول عقارية متكاملة تلبي تطلعات كل عميل'
              : 'Tailored Real Estate Solutions for Every Client'}
          </h2>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'سواء كنت تشتري منزلك الأول أو تبني محفظة استثمارية كبرى، صممنا خدماتنا لتضمن تحقيق أعلى عائد وأفضل جودة وأمان تعاقدي.'
              : 'Whether acquiring your first residence or structuring an institutional portfolio, our services maximize returns and legal security.'}
          </p>
        </div>

        {/* 6 Audiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {audiences.map((aud, idx) => {
            const IconComponent = iconMap[aud.icon] || Home;

            return (
              <div
                key={idx}
                className={`group relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#080d2b] border-white/10 hover:border-blue-500/50 shadow-black/40'
                    : 'bg-white border-slate-200 hover:border-blue-500 shadow-slate-200/50'
                }`}
              >
                <div className="space-y-4">
                  {/* Icon Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold tracking-tight group-hover:text-blue-500 transition-colors">
                    {aud.title}
                  </h3>

                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                    {aud.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-500/10 flex items-center justify-between text-xs font-bold text-blue-500">
                  <Link
                    href="/listings"
                    className="inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    <span>{isAr ? 'استكشف الفرص المتاحة' : 'Explore Opportunities'}</span>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform ${
                        direction === 'rtl' ? 'rotate-[-90deg]' : ''
                      }`}
                    />
                  </Link>
                  <span className="text-[11px] opacity-40 font-mono">0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
