'use client';

import React from 'react';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  ShieldCheck,
  Building2,
  Award,
  CheckCircle2,
  FileCheck,
  BadgeCheck,
} from 'lucide-react';

export default function TrustAccreditationsBar() {
  const { language, theme } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const accreditations = [
    {
      id: 'fal',
      titleAr: 'رخصة فال العقارية',
      titleEn: 'FAL Real Estate License',
      subAr: 'رقم الترخيص: 1200028472',
      subEn: 'Lic. No: 1200028472',
      authorityAr: 'الهيئة العامة للعقار',
      authorityEn: 'Real Estate General Authority',
      icon: ShieldCheck,
      color: 'text-emerald-500',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    },
    {
      id: 'sbc',
      titleAr: 'كود البناء السعودي (SBC)',
      titleEn: 'Saudi Building Code (SBC)',
      subAr: 'مطابقة هندسية وإنشائية 100%',
      subEn: '100% Engineering Compliance',
      authorityAr: 'اللجنة الوطنية لكود البناء',
      authorityEn: 'National Building Code Committee',
      icon: Building2,
      color: 'text-blue-500',
      badgeBg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    },
    {
      id: 'sca',
      titleAr: 'مقاولات عامة فئة أولى',
      titleEn: 'Class-1 General Contracting',
      subAr: 'عضوية معتمدة ومصنفة',
      subEn: 'Certified & Classified Member',
      authorityAr: 'الهيئة السعودية للمقاولين (SCA)',
      authorityEn: 'Saudi Contractors Authority',
      icon: Award,
      color: 'text-amber-500',
      badgeBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    },
    {
      id: 'balady',
      titleAr: 'اعتمادات منصة بلدي',
      titleEn: 'Balady Platform Accredited',
      subAr: 'تراخيص وإشراف بلدي فوري',
      subEn: 'Municipal Licensing & Permits',
      authorityAr: 'وزارة الشؤون البلدية والإسكان',
      authorityEn: 'Ministry of Municipal & Housing',
      icon: FileCheck,
      color: 'text-purple-500',
      badgeBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    },
    {
      id: 'iso',
      titleAr: 'معايير الجودة والسلامة ISO',
      titleEn: 'ISO Quality & Safety Standards',
      subAr: 'ISO 9001 / ISO 45001',
      subEn: 'ISO 9001 / ISO 45001 Certified',
      authorityAr: 'منظومة إدارة الجودة العالمية',
      authorityEn: 'International Quality Management',
      icon: BadgeCheck,
      color: 'text-sky-500',
      badgeBg: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
    },
  ];

  return (
    <section
      aria-label="Accreditations and Certifications"
      className={`border-y transition-colors py-8 sm:py-10 ${
        isDark
          ? 'bg-[#05081e] border-white/10 text-white'
          : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>{isAr ? 'الامتثال والتراخيص الوطنية المعتمدة' : 'Official Accreditations & Compliance'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
              {isAr ? 'منظومة معتمدة وفق أعلى الضوابط التنظيمية بالمملكة' : 'Fully Accredited Under Kingdom Regulatory Standards'}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs opacity-75">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{isAr ? 'تراخيص رسمية سارية وموثقة رقمياً' : 'Digitally Verified & Active Licenses'}</span>
          </div>
        </div>

        {/* Accreditations Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {accreditations.map((item) => {
            const Icon = item.icon;
            const title = isAr ? item.titleAr : item.titleEn;
            const sub = isAr ? item.subAr : item.subEn;
            const authority = isAr ? item.authorityAr : item.authorityEn;

            return (
              <div
                key={item.id}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#080d2b] border-white/10 hover:border-white/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeBg}`}>
                    {isAr ? 'معتمد' : 'Verified'}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold leading-tight mb-1 truncate" title={title}>
                    {title}
                  </h4>
                  <p className="text-[11px] font-semibold text-blue-500 mb-0.5 truncate" title={sub}>
                    {sub}
                  </p>
                  <p className="text-[10px] opacity-60 leading-snug line-clamp-1" title={authority}>
                    {authority}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
