'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Building2,
  HardHat,
  Fan,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';

interface DivisionCard {
  id: string;
  titleAr: string;
  titleEn: string;
  badgeAr: string;
  badgeEn: string;
  tagColor: string;
  descAr: string;
  descEn: string;
  href: string;
  pathDisplay: string;
  image: string;
  icon: React.ElementType;
  highlights: { ar: string; en: string }[];
}

export default function HardCoreDivisionsSection() {
  const { theme, language, direction } = useLanguageTheme();
  const isDark = theme === 'dark';
  const isRtl = direction === 'rtl';

  const divisions: DivisionCard[] = [
    {
      id: 'realestate',
      titleAr: 'هارد للعقارات والاستثمار',
      titleEn: 'HARD Real Estate & Investment',
      badgeAr: 'رخصة فال 1200028472',
      badgeEn: 'VAL Licensed 1200028472',
      tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      descAr:
        'الذراع العقاري والاستثماري الرائد في المملكة العربية السعودية، متخصص في التسويق والوساطة المعتمدة من الهيئة العامة للعقار (فال)، وإدارة المحافظ الاستثمارية وتطوير الفرص في المنطقة الشرقية والرياض.',
      descEn:
        'The premier real estate and investment arm licensed by the Real Estate General Authority (VAL), specializing in certified brokerage, portfolio management, and prime developments across Eastern Province and Riyadh.',
      href: '/realestate',
      pathDisplay: '/realestate',
      image: '/images/hardgp/por4-big.jpg',
      icon: Building2,
      highlights: [
        { ar: 'وساطة وتسويق رسمي مرخص (فال)', en: 'VAL Licensed Brokerage' },
        { ar: 'إدارة المحافظ الاستثمارية الكبرى', en: 'Institutional Asset Portfolios' },
        { ar: 'تسويق المخططات والأبراج السكنية', en: 'Master Projects & Towers' },
      ],
    },
    {
      id: 'construction',
      titleAr: 'هارد للإنشاءات والمقاولات العامة',
      titleEn: 'HARD Construction & Contracting',
      badgeAr: 'تصنيف مقاولات فئة أولى • كود SBC',
      badgeEn: 'Class-1 Contractor • SBC Code',
      tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      descAr:
        'الذراع الإنشائي والهندسي لمجموعة هارد، يقدم خدمات المقاولات العامة المصنفة فئة أولى لتنفيذ الأبراج التجارية، المجمعات السكنية، والمنشآت الذكية بأعلى كفاءة ومعايير كود البناء السعودي (SBC).',
      descEn:
        'The engineering powerhouse of HARD Group, delivering Class-1 classified general contracting for commercial towers, residential communities, and advanced infrastructure under the Saudi Building Code (SBC).',
      href: '/construction',
      pathDisplay: '/construction',
      image: '/images/hardgp/por1-big.jpg',
      icon: HardHat,
      highlights: [
        { ar: 'مقاولات عامة فئة أولى معتمدة (SCA)', en: 'Class-1 General Contracting' },
        { ar: 'مطابقة 100% لكود البناء السعودي (SBC)', en: '100% Saudi Building Code (SBC)' },
        { ar: 'تسليم متكامل على المفتاح وضمانات ممتدة', en: 'Turnkey Delivery & Warranty' },
      ],
    },
    {
      id: 'hvac',
      titleAr: 'هارد لصيانة وتكييف الهواء',
      titleEn: 'HARD HVAC & Facilities Maintenance',
      badgeAr: 'طوارئ واستجابة 24/7 • عقود AMC',
      badgeEn: '24/7 Emergency • AMC Contracts',
      tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      descAr:
        'الذراع التخصصي للخدمات الكهروميكانيكية والتبريد، يقدم عقود الصيانة الوقائية (AMC) للشيلرات المركزية، أنظمة VRF الحديثة، وتنقية مجاري الهواء مع طوارئ واستجابة فورية على مدار الساعة.',
      descEn:
        'The electromechanical engineering arm providing annual preventive maintenance contracts (AMC) for central chillers, VRF variable refrigerant systems, air quality sanitation, and 24/7 rapid response.',
      href: '/hvac',
      pathDisplay: '/hvac',
      image: '/images/hardgp/slide-12.jpg',
      icon: Fan,
      highlights: [
        { ar: 'عقود الصيانة الوقائية السنوية (AMC)', en: 'Preventive Annual Maintenance (AMC)' },
        { ar: 'محطات الشيلرات وأنظمة VRF الذكية', en: 'Industrial Chillers & VRF Systems' },
        { ar: 'طوارئ واستجابة ميدانية فورية 24/7', en: '24/7 Rapid Emergency Response' },
      ],
    },
  ];

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="core-divisions"
      className={`relative py-16 sm:py-24 transition-colors overflow-hidden ${
        isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-blue-500 block">
            {language === 'ar' ? 'القطاعات الاستثمارية الثلاثة' : 'Core Business Pillars'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {language === 'ar' ? 'أذرع مجموعة هارد الرئيسية' : 'HARD Group Core Divisions'}
          </h2>
          <p className="text-sm sm:text-base opacity-75 max-w-2xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'تكامل فريد يجمع بين الريادة العقارية، المقاولات الإنشائية المصنفة فئة أولى، والحلول الكهروميكانيكية لتلبية متطلبات كبرى المشاريع في المملكة.'
              : 'An integrated ecosystem uniting Class-1 contracting, licensed real estate brokerage, and premier electromechanical cooling solutions.'}
          </p>
        </div>

        {/* 3 Core Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {divisions.map((card, idx) => {
            const Icon = card.icon;
            const title = language === 'ar' ? card.titleAr : card.titleEn;
            const desc = language === 'ar' ? card.descAr : card.descEn;
            const badge = language === 'ar' ? card.badgeAr : card.badgeEn;
            const buttonText =
              language === 'ar' ? `استكشف صفحة ${card.titleAr}` : `Explore ${card.titleEn}`;

            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className={`group relative flex flex-col rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 ${
                  isDark
                    ? 'bg-[#080d2b] border-white/10 hover:border-blue-500/50'
                    : 'bg-white border-slate-200 hover:border-blue-400 shadow-md'
                }`}
              >
                {/* Card Image */}
                <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={card.image}
                    alt={title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle gradient overlay */}
                  <div
                    className={`absolute inset-0 ${
                      isDark
                        ? 'bg-gradient-to-t from-[#080d2b] via-[#080d2b]/40 to-transparent'
                        : 'bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent'
                    }`}
                  />

                  {/* Top Badge */}
                  <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} z-10`}>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-md backdrop-blur-md ${card.tagColor}`}>
                      {badge}
                    </span>
                  </div>

                  {/* Icon badge */}
                  <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} z-10 p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between gap-6">
                  <div className="space-y-4">
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug group-hover:text-blue-500 transition-colors">
                      {title}
                    </h3>

                    {/* Exact User Description */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {desc}
                    </p>

                    {/* Highlights list */}
                    <div className="pt-2 space-y-2 border-t border-gray-500/15">
                      {card.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <span className="opacity-90">{language === 'ar' ? hl.ar : hl.en}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Independent Page Button with Sub-route representation */}
                  <div className="pt-2">
                    <Link
                      href={card.href}
                      className={`w-full inline-flex items-center justify-between px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-[0.98] ${
                        isDark
                          ? 'bg-blue-600 text-white hover:bg-blue-500'
                          : 'bg-slate-900 text-white hover:bg-blue-600'
                      }`}
                    >
                      <span>{buttonText}</span>
                      <div className="flex items-center gap-1.5 opacity-90">
                        <span className="text-[11px] font-mono opacity-70 dir-ltr">
                          {card.pathDisplay}
                        </span>
                        <ArrowIcon className="w-4 h-4" />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
