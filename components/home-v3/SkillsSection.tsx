'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, ArrowUpRight } from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function SkillsSection() {
  const { language, theme, t, direction } = useLanguageTheme();
  const isDark = theme === 'dark';

  const skills = [
    {
      name: language === 'ar' ? 'التخطيط والدراسات المعمارية' : 'Architectural Planning',
      percentage: 95,
    },
    {
      name: language === 'ar' ? 'الإنشاءات التجارية والأبراج' : 'Commercial Construction',
      percentage: 90,
    },
    {
      name: language === 'ar' ? 'تصميم الواجهات الخارجية واللاندسكيب' : 'Exterior Design & Landscaping',
      percentage: 88,
    },
    {
      name: language === 'ar' ? 'البناء الأخضر المستدام وتقنيات العزل' : 'Eco-Friendly Construction',
      percentage: 92,
    },
  ];

  return (
    <section
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors ${
        isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Our Skills with Animated Progress Bars */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="inline-block text-xs uppercase tracking-widest font-bold text-blue-500 px-3.5 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
                {t('skills.badge')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {t('skills.title')}
              </h2>
              <p className="opacity-100 text-sm sm:text-base leading-relaxed">
                {t('skills.desc')}
              </p>
            </div>

            {/* Progress Bars */}
            <div className="space-y-6 pt-2">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span>{skill.name}</span>
                    <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>
                      {skill.percentage}%
                    </span>
                  </div>
                  <div
                    className={`w-full h-3 rounded-full overflow-hidden p-0.5 border ${
                      isDark ? 'bg-white/10 border-white/5' : 'bg-slate-200 border-slate-300'
                    }`}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        isDark
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                          : 'bg-gradient-to-r from-blue-600 to-blue-500'
                      }`}
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quality checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div
                className={`flex items-center gap-3 p-4 rounded-2xl border ${
                  isDark
                    ? 'bg-white/5 border-white/5'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-sm font-bold">
                  {t('skills.yearsExp')}
                </span>
              </div>
              <div
                className={`flex items-center gap-3 p-4 rounded-2xl border ${
                  isDark
                    ? 'bg-white/5 border-white/5'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-sm font-bold">
                  {t('skills.materials')}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Who We Are & Featured Image */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="inline-block text-xs uppercase tracking-widest font-bold text-blue-500 px-3.5 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
                {t('skills.whoBadge')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {t('skills.whoTitlePre')}{' '}
                <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>
                  {t('skills.whoTitleHighlight')}
                </span>
              </h2>
            </div>

            <p className="opacity-100 text-base leading-relaxed">
              {t('skills.whoDesc')}
            </p>

            {/* Featured Image */}
            <div
              className={`relative h-72 sm:h-80 w-full rounded-3xl overflow-hidden border shadow-2xl ${
                isDark ? 'border-white/15' : 'border-slate-300'
              }`}
            >
              <Image
                src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80"
                alt="HARD Group Engineers"
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

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Link
                href="/contact-us"
                className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm tracking-tight transition-all transform hover:-translate-y-0.5 shadow-md ${
                  isDark
                    ? 'bg-blue-600 text-white hover:bg-white shadow-blue-500/20'
                    : 'bg-[#0f172a] text-white hover:bg-blue-600 shadow-slate-400/30'
                }`}
              >
                <span>{t('skills.contactUs')}</span>
                <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
              </Link>

              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-full border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-blue-400'
                      : 'bg-blue-50 border-blue-200 text-blue-600'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase opacity-90 font-bold tracking-wider">
                    {t('about.callUs')}
                  </span>
                  <a
                    href="tel:+966556125711"
                    dir="ltr"
                    className={`text-base font-bold transition-colors ${
                      isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'
                    }`}
                  >
                    +966 55 612 5711
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
