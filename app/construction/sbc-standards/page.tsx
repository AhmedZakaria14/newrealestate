'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  HardHat,
  Award,
  CheckCircle2,
  FileCheck,
  Scale,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Building,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import ConsultationModal from '@/components/ConsultationModal';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function SbcStandardsPage() {
  const { language, theme, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <main className={`min-h-screen ${isDark ? 'bg-[#030617] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar />

      {/* Header & Breadcrumb */}
      <section className={`pt-32 pb-14 px-4 sm:px-6 lg:px-8 border-b ${isDark ? 'bg-[#080d2b]/60 border-white/10' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs opacity-75">
              <Link href="/" className="hover:text-blue-500">{isAr ? 'الرئيسية' : 'Home'}</Link>
              <span>/</span>
              <Link href="/construction" className="hover:text-blue-500">{isAr ? 'هارد للمقاولات' : 'HARD Construction'}</Link>
              <span>/</span>
              <span className="font-bold text-amber-500">{isAr ? 'كود البناء السعودي SBC' : 'SBC Standards'}</span>
            </div>

            <BackButton fallbackUrl="/construction" labelAr="الرجوع لقسم المقاولات" labelEn="Back to Construction" />
          </div>

          <div className="max-w-3xl pt-2 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              <HardHat className="w-4 h-4" />
              <span>{isAr ? 'امتثال هندسي معتمد بنسبة 100%' : '100% Structural SBC Compliance'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              {isAr ? 'معايير كود البناء السعودي (SBC) وضمانات الـ 10 سنوات' : 'Saudi Building Code (SBC) & 10-Year Decennial Warranty'}
            </h1>
            <p className="text-sm sm:text-base opacity-80 leading-relaxed">
              {isAr
                ? 'تلتزم مجموعة هارد بتطبيق كافة اشتراطات كود البناء السعودي (SBC 201 للأحمال والإنشاءات، SBC 301 للخرسانات، و SBC 601 للكهرباء والميكانيكا) مع وثيقة تأمين العيوب الخفية (IDI) الإلزامية لمدة 10 سنوات.'
                : 'HARD Group enforces absolute engineering compliance with the Saudi Building Code alongside mandatory 10-year Decennial Inherent Defects Insurance (IDI).'}
            </p>
          </div>
        </div>
      </section>

      {/* SBC Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-3 ${
              isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-black">
              SBC 201
            </div>
            <h3 className="text-lg font-black">{isAr ? 'السلامة الهيكلية والأحمال' : 'Structural & Load Safety'}</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              {isAr
                ? 'دراسات ميكانيكا التربة وفحوصات الجسات الدقيقة واعتماد تصميم القواعد ومقاومة الرياح والزلازل طبقاً لاشتراطات كود الأحمال.'
                : 'Advanced geotechnical soil testing and wind/seismic design calculations.'}
            </p>
          </div>

          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-3 ${
              isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-black">
              SBC 801
            </div>
            <h3 className="text-lg font-black">{isAr ? 'كود الحماية من الحرائق' : 'Fire Life Safety Code'}</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              {isAr
                ? 'تجهيز المباني بأنظمة الإطفاء التلقائي الرطب والجاف والإنذار المبكر وشبكات مخارج الطوارئ المقاومة للحريق طبقاً للدفاع المدني.'
                : 'Comprehensive sprinkler infrastructure, early warning arrays, and certified emergency egress paths.'}
            </p>
          </div>

          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-3 ${
              isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black">
              IDI
            </div>
            <h3 className="text-lg font-black">{isAr ? 'تأمين العيوب الخفية 10 سنوات' : '10-Year Decennial Insurance'}</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              {isAr
                ? 'وثيقة تأمين شاملة معتمدة من البنك المركزي السعودي (ساما) تغطي أي عيوب هيكلية خفية في الهيكل الخرساني والإنشائي.'
                : 'SAMA-approved decennial insurance policy protecting owners from structural defects for a full decade.'}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left rtl:md:text-right">
            <h3 className="text-2xl sm:text-3xl font-black">
              {isAr ? 'ابدأ مشروعك الإنشائي مع ضمان الامتثال الكامل لكود SBC' : 'Build with Full SBC Certification & Decennial Coverage'}
            </h3>
            <p className="text-sm opacity-90 max-w-xl">
              {isAr
                ? 'احصل على دراسة BOQ أولية واعتمادات المخططات الهندسية من مكاتب الاستشارة الفنية بمجموعة هارد.'
                : 'Receive a turnkey BOQ assessment and certified engineering plans matching all SBC provisions.'}
            </p>
          </div>
          <button
            onClick={() => setConsultationOpen(true)}
            className="py-3.5 px-8 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            {isAr ? 'طلب دراسة هندسية' : 'Request Engineering Study'}
          </button>
        </div>
      </section>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultService={isAr ? 'دراسة مطابقة كود البناء SBC' : 'SBC Code Compliance'}
      />

      <Footer />
    </main>
  );
}
