'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Eye, Phone, ArrowUpRight } from 'lucide-react';
import { clientAvatars } from '@/data/skyvilla-data';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function AboutSection() {
  const { theme, t, direction } = useLanguageTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors ${
        isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text & Mission/Vision */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="inline-block text-xs uppercase tracking-widest font-bold text-emerald-500 px-3.5 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                {t('about.badge')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {t('about.titlePre')}{' '}
                <span className={isDark ? 'text-[#DCFF09]' : 'text-emerald-600'}>
                  {t('about.titleHighlight')}
                </span>
              </h2>
            </div>

            <p className="opacity-80 text-base leading-relaxed">
              {t('about.description')}
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div
                className={`p-6 rounded-2xl border transition-all group ${
                  isDark
                    ? 'bg-white/5 border-white/10 hover:border-[#DCFF09]/40'
                    : 'bg-white border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md'
                }`}
              >
                <div
                  className={`p-3 rounded-xl inline-block mb-3 ${
                    isDark
                      ? 'bg-[#DCFF09]/10 text-[#DCFF09]'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  <Target className="w-6 h-6" />
                </div>
                <h3
                  className={`text-lg font-bold mb-2 transition-colors ${
                    isDark ? 'group-hover:text-[#DCFF09]' : 'group-hover:text-emerald-600'
                  }`}
                >
                  {t('about.mission')}
                </h3>
                <p className="text-xs sm:text-sm opacity-70 leading-relaxed">
                  {t('about.missionDesc')}
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl border transition-all group ${
                  isDark
                    ? 'bg-white/5 border-white/10 hover:border-[#DCFF09]/40'
                    : 'bg-white border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md'
                }`}
              >
                <div
                  className={`p-3 rounded-xl inline-block mb-3 ${
                    isDark
                      ? 'bg-[#DCFF09]/10 text-[#DCFF09]'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  <Eye className="w-6 h-6" />
                </div>
                <h3
                  className={`text-lg font-bold mb-2 transition-colors ${
                    isDark ? 'group-hover:text-[#DCFF09]' : 'group-hover:text-emerald-600'
                  }`}
                >
                  {t('about.vision')}
                </h3>
                <p className="text-xs sm:text-sm opacity-70 leading-relaxed">
                  {t('about.visionDesc')}
                </p>
              </div>
            </div>

            {/* Action Row: About Button + Call Hotline */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Link
                href="/about-us"
                className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm tracking-tight transition-all transform hover:-translate-y-0.5 shadow-md ${
                  isDark
                    ? 'bg-[#DCFF09] text-[#040618] hover:bg-white shadow-[#DCFF09]/20'
                    : 'bg-[#0f172a] text-white hover:bg-emerald-600 shadow-slate-400/30'
                }`}
              >
                <span>{t('about.btn')}</span>
                <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
              </Link>

              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-full border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-[#DCFF09]'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase opacity-70 font-bold tracking-wider">
                    {t('about.callUs')}
                  </span>
                  <a
                    href="tel:+91123456789"
                    dir="ltr"
                    className={`text-base font-bold transition-colors ${
                      isDark ? 'hover:text-[#DCFF09]' : 'hover:text-emerald-600'
                    }`}
                  >
                    +91 (123) 456-789
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image with Floating 5k+ Customer Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Featured Metal Image */}
              <div
                className={`relative h-[480px] sm:h-[560px] w-full rounded-3xl overflow-hidden border shadow-2xl ${
                  isDark ? 'border-white/15' : 'border-slate-300'
                }`}
              >
                <Image
                  src="https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/about-us-image-metal.jpg"
                  alt="Skyvilla Construction Experts"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div
                  className={`absolute inset-0 ${
                    isDark
                      ? 'bg-gradient-to-t from-[#040618]/70 via-transparent to-transparent'
                      : 'bg-gradient-to-t from-slate-900/60 via-transparent to-transparent'
                  }`}
                />
              </div>

              {/* Floating Customer Badge */}
              <div
                className={`absolute -bottom-6 sm:-bottom-8 ${
                  direction === 'rtl'
                    ? 'right-4 sm:-right-6 left-4 sm:left-auto'
                    : 'left-4 sm:-left-6 right-4 sm:right-auto'
                } sm:w-84 backdrop-blur-xl border p-5 rounded-2xl shadow-2xl ${
                  isDark
                    ? 'bg-[#080b24]/95 border-white/15 text-white'
                    : 'bg-white/95 border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase font-bold text-emerald-500 block mb-1">
                      {t('about.verifiedTrack')}
                    </span>
                    <h4 className="text-lg sm:text-xl font-extrabold leading-tight">
                      {t('about.satisfiedCustomers')}
                    </h4>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex -space-x-2 rtl:space-x-reverse">
                        {clientAvatars.slice(0, 3).map((av, i) => (
                          <div
                            key={i}
                            className={`relative w-7 h-7 rounded-full overflow-hidden border-2 ${
                              isDark ? 'border-[#080b24]' : 'border-white'
                            }`}
                          >
                            <Image
                              src={av}
                              alt="Customer"
                              fill
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-semibold opacity-80">
                        {t('about.positiveRate')}
                      </span>
                    </div>
                  </div>

                  <div className="relative w-20 h-20 shrink-0">
                    <Image
                      src="https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/about-body-counter-image-metal.png"
                      alt="Counter"
                      fill
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
