'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Building2, Briefcase, DraftingCompass, ArrowUpRight } from 'lucide-react';
import { servicesData } from '@/data/skyvilla-data';
import { useLanguageTheme } from '@/lib/language-theme-context';

const serviceIcons = [
  <Compass className="w-8 h-8" key="compass" />,
  <Building2 className="w-8 h-8" key="building" />,
  <Briefcase className="w-8 h-8" key="briefcase" />,
  <DraftingCompass className="w-8 h-8" key="drafting" />,
];

export default function ServicesSection() {
  const { language, theme, t, direction } = useLanguageTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors ${
        isDark ? 'bg-[#020410] text-white' : 'bg-white text-slate-900'
      }`}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-blue-500 px-3.5 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
            {t('services.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {t('services.titlePre')}{' '}
            <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>
              {t('services.titleHighlight')}
            </span>
          </h2>
          <p className="opacity-95 text-sm sm:text-base leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => {
            const title = language === 'ar' ? service.title_ar : service.title;
            const description = language === 'ar' ? service.description_ar : service.description;

            return (
              <div
                key={service.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between group transition-all duration-300 transform hover:-translate-y-2 border ${
                  isDark
                    ? 'bg-[#080b24] border-white/10 hover:border-blue-500/50 hover:bg-[#0c1033] shadow-xl'
                    : 'bg-slate-50 border-slate-200 hover:border-blue-500 hover:bg-white hover:shadow-xl shadow-sm'
                }`}
              >
                {/* Top row: Icon & Number */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className={`p-3.5 rounded-2xl transition-colors duration-300 ${
                        isDark
                          ? 'bg-blue-600/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white'
                          : 'bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white'
                      }`}
                    >
                      {serviceIcons[index % serviceIcons.length]}
                    </div>
                    <span
                      className={`text-3xl font-black transition-colors ${
                        isDark
                          ? 'text-white/20 group-hover:text-blue-400/40'
                          : 'text-slate-300 group-hover:text-blue-500/40'
                      }`}
                    >
                      {service.number}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-bold mb-3 transition-colors ${
                      isDark ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'
                    }`}
                  >
                    {title}
                  </h3>

                  <p className="text-sm opacity-95 leading-relaxed mb-6 line-clamp-3">
                    {description}
                  </p>
                </div>

                {/* View Details link with arrow */}
                <div className="pt-4 border-t border-gray-500/10">
                  <Link
                    href={`/services/${service.slug}`}
                    className={`inline-flex items-center gap-2 text-sm font-bold transition-colors ${
                      isDark
                        ? 'text-white group-hover:text-blue-400'
                        : 'text-slate-900 group-hover:text-blue-600'
                    }`}
                  >
                    <span>{t('services.viewDetails')}</span>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform ${
                        direction === 'rtl'
                          ? 'rotate-[-90deg] group-hover:-translate-x-1 group-hover:-translate-y-1'
                          : 'group-hover:translate-x-1 group-hover:-translate-y-1'
                      }`}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
