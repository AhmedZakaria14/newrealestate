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
  const { language } = useLanguageTheme();
  const isAr = language === 'ar';

  const accreditations = [
    {
      id: 'fal',
      titleAr: 'رخصة فال العقارية',
      titleEn: 'FAL Real Estate License',
      subAr: 'رقم الترخيص: 1200028472',
      subEn: 'Lic. No: 1200028472',
      authorityAr: 'الهيئة العامة للعقار',
      authorityEn: 'Real Estate Authority',
      icon: ShieldCheck,
    },
    {
      id: 'sbc',
      titleAr: 'كود البناء السعودي (SBC)',
      titleEn: 'Saudi Building Code (SBC)',
      subAr: 'مطابقة هندسية 100%',
      subEn: '100% Engineering Compliance',
      authorityAr: 'اللجنة الوطنية لكود البناء',
      authorityEn: 'National Building Code',
      icon: Building2,
    },
    {
      id: 'sca',
      titleAr: 'مقاولات عامة فئة أولى',
      titleEn: 'Class-1 General Contracting',
      subAr: 'تصنيف رسمي معتمد',
      subEn: 'Classified Member',
      authorityAr: 'الهيئة السعودية للمقاولين',
      authorityEn: 'Saudi Contractors Authority',
      icon: Award,
    },
    {
      id: 'balady',
      titleAr: 'اعتمادات منصة بلدي',
      titleEn: 'Balady Platform Accredited',
      subAr: 'تراخيص بلدية فورية',
      subEn: 'Municipal Licensing',
      authorityAr: 'وزارة البلديات والإسكان',
      authorityEn: 'Ministry of Housing',
      icon: FileCheck,
    },
    {
      id: 'iso',
      titleAr: 'معايير الجودة ISO',
      titleEn: 'ISO Quality & Safety',
      subAr: 'ISO 9001 / 45001',
      subEn: 'ISO 9001 / 45001 Certified',
      authorityAr: 'إدارة الجودة العالمية',
      authorityEn: 'Quality Management',
      icon: BadgeCheck,
    },
  ];

  return (
    <section
      aria-label="Accreditations and Certifications"
      className="bg-black border-y border-[#222222] py-8 sm:py-10 text-[#E1E0CC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#DEDBC8] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#DEDBC8] animate-pulse" />
              <span>{isAr ? 'الامتثال والتراخيص الوطنية المعتمدة' : 'Official Accreditations & Compliance'}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#E1E0CC]">
              {isAr ? 'منظومة معتمدة وفق أعلى الضوابط التنظيمية بالمملكة' : 'Fully Accredited Under Kingdom Regulatory Standards'}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <CheckCircle2 className="w-4 h-4 text-[#DEDBC8] shrink-0" />
            <span>{isAr ? 'تراخيص رسمية سارية وموثقة' : 'Digitally Verified & Active Licenses'}</span>
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
                className="p-4 rounded-2xl bg-[#101010] border border-[#222222] hover:border-[#383838] transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-black border border-[#262626] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#DEDBC8]" />
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1c1c1c] text-[#DEDBC8] border border-[#2d2d2d]">
                    {isAr ? 'معتمد' : 'Verified'}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold leading-tight mb-1 truncate text-[#E1E0CC]" title={title}>
                    {title}
                  </h4>
                  <p className="text-[11px] font-medium text-[#DEDBC8] mb-0.5 truncate" title={sub}>
                    {sub}
                  </p>
                  <p className="text-[10px] text-gray-500 leading-snug line-clamp-1" title={authority}>
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
