'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Phone, Award, Building2 } from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';
import WordsPullUpMultiStyle, { StyleSegment } from '@/components/animations/WordsPullUpMultiStyle';
import AnimatedLetterText from '@/components/animations/AnimatedLetterText';
import ConsultationModal from '@/components/ConsultationModal';

export default function AboutSection() {
  const { language, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isRtl = direction === 'rtl';
  const [consultationOpen, setConsultationOpen] = useState(false);

  const segmentsAr: StyleSegment[] = [
    { text: 'نحن مؤسسة هارد،', className: 'text-[#E1E0CC] font-bold' },
    { text: 'خبرة إنشائية وصناعية راسخة منذ 2004.', className: 'text-[#DEDBC8] font-serif italic', italic: true },
    { text: 'خدمات مقاولات موثوقة، تطوير عقاري، وتشغيل وصيانة متكاملة.', className: 'text-[#E1E0CC]/90 font-medium' },
  ];

  const segmentsEn: StyleSegment[] = [
    { text: 'We are HARD Group,', className: 'text-[#E1E0CC] font-bold' },
    { text: 'contributing to Saudi Arabia since 2004.', className: 'text-[#DEDBC8] font-serif italic', italic: true },
    { text: 'Reliable multi-dimensional construction, real estate development, and maintenance.', className: 'text-[#E1E0CC]/90 font-medium' },
  ];

  const bodyTextAr =
    'مؤسسة هارد للمقاولات العامة، تساهم في قطاع الصناعة والبنية التحتية في المملكة العربية السعودية منذ عام 2004 بخدمات إنشائية موثوقة ومتعددة الأبعاد. بدأت أنشطتنا في المنطقة الشرقية وتوسعت لتغطي المنطقتين الوسطى والغربية. نلبي كافة متطلبات الإنشاءات المدنية والميكانيكية الصناعية والكهروميكانيكية لمشاريع تسليم المفتاح LSTK و EPC و LSPB.';

  const bodyTextEn =
    'HARD General Contracting Establishment has been contributing to Saudi Arabia industrial and infrastructure sector since 2004 with reliable, multi-dimensional construction services. The activities started in Eastern Province and expanded to cover Central and Western Provinces, meeting all requirements of civil, industrial mechanical, and electro-mechanical services for LSTK, EPC, and LSPB turnkey projects.';

  return (
    <section id="about-hard" className="bg-black py-20 sm:py-28 px-4 md:px-8 relative overflow-hidden">
      {/* Centered Inner Cinematic Card */}
      <div className="max-w-6xl mx-auto rounded-3xl md:rounded-[2.5rem] bg-[#101010] border border-[#222222] p-8 sm:p-14 lg:p-20 text-center relative shadow-2xl">
        {/* Top Kicker Label */}
        <div className="mb-6 sm:mb-8 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DEDBC8]" />
          <span className="text-[#DEDBC8] text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
            {isAr ? 'الهندسة الإنشائية والاستثمار العقاري' : 'Structural Engineering & Real Estate'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#DEDBC8]" />
        </div>

        {/* Main Heading with Multi-Style Pull-Up Animation */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[1.05] sm:leading-[0.98] tracking-tight">
          <WordsPullUpMultiStyle
            segments={isAr ? segmentsAr : segmentsEn}
            className="justify-center"
          />
        </div>

        {/* Scroll-Linked Progressive Opacity Reveal Body Text */}
        <div className="max-w-3xl mx-auto mt-8 sm:mt-10">
          <AnimatedLetterText
            text={isAr ? bodyTextAr : bodyTextEn}
            className="text-[#DEDBC8]/85 text-xs sm:text-sm md:text-base leading-relaxed font-light"
          />
        </div>

        {/* Quick Credentials & Trust Pills */}
        <div className="mt-10 sm:mt-12 pt-8 border-t border-[#222222] flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#181818] border border-[#2a2a2a]">
            <ShieldCheck className="w-4 h-4 text-[#DEDBC8]" />
            <span>{isAr ? 'رخصة فال: 1200028472' : 'VAL License: 1200028472'}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#181818] border border-[#2a2a2a]">
            <Building2 className="w-4 h-4 text-[#DEDBC8]" />
            <span>{isAr ? 'تصنيف مقاولات فئة أولى' : 'Class-1 Contractor'}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#181818] border border-[#2a2a2a]">
            <Award className="w-4 h-4 text-[#DEDBC8]" />
            <span>{isAr ? 'كود البناء السعودي SBC' : 'Saudi Building Code (SBC)'}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setConsultationOpen(true)}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#DEDBC8] hover:bg-[#eae8d8] text-black font-semibold text-xs sm:text-sm transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg active:scale-98"
          >
            <span>{isAr ? 'طلب استشارة فورية' : 'Request Consultation'}</span>
            <div className="w-7 h-7 rounded-full bg-black text-[#DEDBC8] flex items-center justify-center transition-transform group-hover:scale-110">
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </div>
          </button>

          <Link
            href="/about-us"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#181818] hover:bg-[#222] text-[#E1E0CC] font-medium text-xs sm:text-sm border border-[#333] transition-all"
          >
            <span>{isAr ? 'عن تاريخ المجموعة' : 'Our Corporate Story'}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </div>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        initialServiceType="all"
      />
    </section>
  );
}
