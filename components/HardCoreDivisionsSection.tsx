'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import {
  Building2,
  HardHat,
  Fan,
  Check,
  ArrowRight,
} from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';
import WordsPullUpMultiStyle, { StyleSegment } from '@/components/animations/WordsPullUpMultiStyle';

export default function HardCoreDivisionsSection() {
  const { language, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isRtl = direction === 'rtl';

  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: '-100px' });

  const headerSegments: StyleSegment[] = [
    {
      text: isAr
        ? 'قطاعات هندسية واستثمارية لصناع المستقبل.'
        : 'Studio-grade workflows for visionary leaders.',
      className: 'text-[#E1E0CC]',
    },
  ];

  const headerSubSegments: StyleSegment[] = [
    {
      text: isAr
        ? 'مطابقة لكود البناء السعودي (SBC). مرخصة من هيئة العقار (فال).'
        : 'Built for pure vision. Powered by Saudi engineering.',
      className: 'text-gray-500',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: custom * 0.15,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      id="core-divisions"
      className="min-h-screen bg-black relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-[#E1E0CC]"
    >
      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.12] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with WordsPullUpMultiStyle */}
        <div className="text-center space-y-2 mb-12 sm:mb-16">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
            <WordsPullUpMultiStyle segments={headerSegments} className="justify-center" />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
            <WordsPullUpMultiStyle segments={headerSubSegments} className="justify-center" />
          </div>
        </div>

        {/* 4-Column Card Grid (lg:h-[480px], gap-3 sm:gap-2 md:gap-2) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3 md:gap-3 lg:h-[480px] items-stretch"
        >
          {/* Card 1 - Visual Media Card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative rounded-2xl overflow-hidden border border-[#2a2a2a] min-h-[300px] lg:min-h-full flex flex-col justify-end p-6 group transform-gpu"
          >
            <Image
              src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=85"
              alt={isAr ? 'منصتكم الإنشائية' : 'Your creative canvas'}
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              className="object-cover object-center filter brightness-[0.7] group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#DEDBC8] block mb-1">
                {isAr ? 'الصرح الإنشائي' : 'Master Canvas'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#E1E0CC]">
                {isAr ? 'منصتكم الهندسية والعقارية.' : 'Your creative canvas.'}
              </h3>
            </div>
          </motion.div>

          {/* Card 2 - Real Estate & Brokerage (01) */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="rounded-2xl bg-[#212121] border border-[#2e2e2e] p-6 flex flex-col justify-between transform-gpu hover:border-[#444] transition-colors"
          >
            <div className="space-y-4">
              {/* Top Row: Icon + Number */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-black border border-[#333] flex items-center justify-center text-[#DEDBC8]">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-gray-500 font-bold">01</span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-lg font-bold text-[#E1E0CC]">
                  {isAr ? 'هارد للعقارات والاستثمار.' : 'HARD Real Estate.'}
                </h3>
                <p className="text-[11px] text-[#DEDBC8]/70 mt-0.5">
                  {isAr ? 'رخصة فال: 1200028472' : 'VAL Lic. 1200028472'}
                </p>
              </div>

              {/* Checklist Items */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-gray-400">
                  <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                  <span>{isAr ? 'وساطة وتسويق رسمي مرخص (فال)' : 'VAL Licensed Brokerage'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-400">
                  <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                  <span>{isAr ? 'إدارة المحافظ الاستثمارية الكبرى' : 'Portfolio Asset Management'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-400">
                  <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                  <span>{isAr ? 'تسويق المخططات والقصور الفاخرة' : 'Master Developments & Off-plan'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-400">
                  <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                  <span>{isAr ? 'تحليل العوائد الاستثمارية (ROI)' : 'Investment ROI Valuation'}</span>
                </div>
              </div>
            </div>

            {/* Learn More Link with Rotated Arrow */}
            <div className="pt-4 border-t border-[#2e2e2e]">
              <Link
                href="/realestate"
                className="group inline-flex items-center gap-2 text-xs font-semibold text-[#DEDBC8] hover:text-white transition-colors"
              >
                <span>{isAr ? 'اكتشف المزيد' : 'Learn more'}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  isRtl ? 'rotate-[-135deg]' : 'rotate-[-45deg]'
                }`} />
              </Link>
            </div>
          </motion.div>

          {/* Card 3 - General Contracting & Structural (02) */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="rounded-2xl bg-[#212121] border border-[#2e2e2e] p-6 flex flex-col justify-between transform-gpu hover:border-[#444] transition-colors"
          >
            <div className="space-y-4">
              {/* Top Row: Icon + Number */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-black border border-[#333] flex items-center justify-center text-[#DEDBC8]">
                  <HardHat className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-gray-500 font-bold">02</span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-lg font-bold text-[#E1E0CC]">
                  {isAr ? 'هارد للإنشاءات والمقاولات.' : 'HARD Construction.'}
                </h3>
                <p className="text-[11px] text-[#DEDBC8]/70 mt-0.5">
                  {isAr ? 'تصنيف فئة أولى • كود SBC' : 'Class-1 • Saudi Building Code'}
                </p>
              </div>

              {/* Checklist Items */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-gray-400">
                  <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                  <span>{isAr ? 'مقاولات عامة فئة أولى معتمدة' : 'Class-1 General Contracting'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-400">
                  <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                  <span>{isAr ? 'مطابقة 100% لكود البناء السعودي (SBC)' : '100% SBC Code Compliance'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-400">
                  <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                  <span>{isAr ? 'تسليم تسليم مفتاح مع ضمانات هيكلية' : 'Turnkey Delivery & Warranties'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-400">
                  <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                  <span>{isAr ? 'إشراف هندسي وإدارة مشاريع ذكية' : 'Smart Project Engineering'}</span>
                </div>
              </div>
            </div>

            {/* Learn More Link with Rotated Arrow */}
            <div className="pt-4 border-t border-[#2e2e2e]">
              <Link
                href="/construction"
                className="group inline-flex items-center gap-2 text-xs font-semibold text-[#DEDBC8] hover:text-white transition-colors"
              >
                <span>{isAr ? 'اكتشف المزيد' : 'Learn more'}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  isRtl ? 'rotate-[-135deg]' : 'rotate-[-45deg]'
                }`} />
              </Link>
            </div>
          </motion.div>

          {/* Card 4 - HVAC & Facility Engineering (03) */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="rounded-2xl bg-[#212121] border border-[#2e2e2e] p-6 flex flex-col justify-between transform-gpu hover:border-[#444] transition-colors"
          >
            <div className="space-y-4">
              {/* Top Row: Icon + Number */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-black border border-[#333] flex items-center justify-center text-[#DEDBC8]">
                  <Fan className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-gray-500 font-bold">03</span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-lg font-bold text-[#E1E0CC]">
                  {isAr ? 'هارد للتكييف والمرافق.' : 'HARD HVAC & Facilities.'}
                </h3>
                <p className="text-[11px] text-[#DEDBC8]/70 mt-0.5">
                  {isAr ? 'عقود صيانة AMC • طوارئ 24/7' : 'AMC Maintenance • 24/7'}
                </p>
              </div>

              {/* Checklist Items */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-gray-400">
                  <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                  <span>{isAr ? 'عقود الصيانة الوقائية السنوية (AMC)' : 'Annual Preventive AMC'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-400">
                  <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                  <span>{isAr ? 'محطات الشيلرات وأنظمة VRF الذكية' : 'Chillers & Smart VRF Systems'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-400">
                  <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                  <span>{isAr ? 'استجابة ميدانية فورية على مدار الساعة' : '24/7 Rapid Emergency Response'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-400">
                  <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                  <span>{isAr ? 'تنقية الهواء وتعقيم مجاري الدكت' : 'Air Sanitation & Ductwork'}</span>
                </div>
              </div>
            </div>

            {/* Learn More Link with Rotated Arrow */}
            <div className="pt-4 border-t border-[#2e2e2e]">
              <Link
                href="/hvac"
                className="group inline-flex items-center gap-2 text-xs font-semibold text-[#DEDBC8] hover:text-white transition-colors"
              >
                <span>{isAr ? 'اكتشف المزيد' : 'Learn more'}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  isRtl ? 'rotate-[-135deg]' : 'rotate-[-45deg]'
                }`} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
