'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  ShieldCheck,
  Building2,
  HardHat,
  Fan,
  Layers,
  Calculator,
  CheckCircle2,
  Phone,
  FileSpreadsheet,
  Clock,
  Sparkles,
} from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { useSiteContent } from '@/lib/site-content-context';

export default function HeroSection() {
  const { language, theme, direction } = useLanguageTheme();
  const { settings } = useSiteContent();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const [consultationOpen, setConsultationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'contracting' | 'realestate' | 'hvac'>('contracting');

  const stats = [
    {
      value: isAr ? 'فئة أولى' : 'Class-1',
      label: isAr ? 'تصنيف المقاولات العامة' : 'General Contracting Grade',
    },
    {
      value: settings.stats?.projectsCount || '+180',
      label: isAr ? 'المشاريع المنفذة والمعتمدة' : 'Executed & Approved Projects',
    },
    {
      value: isAr ? `فال ${settings.contactInfo?.licenseVal || '1200028472'}` : `VAL ${settings.contactInfo?.licenseVal || '1200028472'}`,
      label: isAr ? 'رخصة الوساطة والتسويق' : 'Licensed Real Estate Brokerage',
    },
    {
      value: settings.stats?.satisfactionRate || '99.4%',
      label: isAr ? 'نسبة رضا العملاء والمستثمرين' : 'Investor Satisfaction Rate',
    },
  ];

  return (
    <section className="relative min-h-[92vh] pt-24 pb-14 lg:pt-32 lg:pb-20 overflow-hidden flex flex-col justify-between">
      {/* Hero background image with architectural construction presence */}
      <div className="absolute inset-0 z-0">
        <Image
          src={settings.heroImage || "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=2200&q=90"}
          alt={isAr ? (settings.heroTitleAr || 'مجموعة هارد القابضة') : (settings.heroTitleEn || 'HARD Group Holding')}
          fill
          priority
          className={`object-cover object-center transition-all ${
            isDark
              ? 'filter brightness-[0.32] contrast-[1.12]'
              : 'filter brightness-[0.38] contrast-[1.08]'
          }`}
          referrerPolicy="no-referrer"
        />
        <div
          className={`absolute inset-0 transition-colors ${
            isDark
              ? 'bg-gradient-to-b from-[#040618]/90 via-[#040618]/75 to-[#040618]'
              : 'bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/95'
          }`}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 sm:mb-14">
          {/* Left Hero Content: Emphasizing General Contracting & Integrated Ecosystem */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Top Unboxed Metadata / Kicker following constitution */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-sky-400">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>{isAr ? (settings.heroBadgeAr || 'مقاولات عامة فئة أولى · كود البناء السعودي SBC · رخصة فال 1200028472') : (settings.heroBadgeEn || 'Class-1 General Contracting · Saudi Building Code (SBC) · VAL Lic. 1200028472')}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.16] sm:leading-[1.10]">
              <span className="block mb-1 sm:mb-2">
                {isAr ? (settings.heroTitleAr || 'مجموعة هارد القابضة') : (settings.heroTitleEn || 'HARD Group Holding')}
              </span>
              <span className="block text-sky-400">
                {isAr ? (settings.heroSubtitleAr || 'للمقاولات والتطوير العقاري') : (settings.heroSubtitleEn || '& Structural Development')}
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
              {isAr
                ? 'منظومة استثمارية وطنية متكاملة تجمع بين المقاولات الإنشائية المصنفة فئة أولى، الوساطة والتسويق العقاري المرخص (فال)، وهندسة التكييف وتشغيل المرافق (AMC 24/7).'
                : 'A unified Saudi development ecosystem integrating Class-1 structural contracting, licensed real estate brokerage (VAL), and 24/7 electromechanical facility engineering.'}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <button
                type="button"
                onClick={() => setConsultationOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-blue-600 text-white font-black text-xs sm:text-sm hover:bg-blue-500 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-blue-600/30 cursor-pointer active:scale-98"
              >
                <span>{isAr ? (settings.heroCtaQuoteAr || 'طلب استشارة وتسعير فوري') : (settings.heroCtaQuoteEn || 'Request Instant Estimate')}</span>
                <ArrowUpRight
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                    direction === 'rtl' ? 'rotate-[-90deg]' : ''
                  }`}
                />
              </button>

              <a
                href="#project-calculator"
                className="inline-flex items-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-blue-400" />
                <span>{isAr ? (settings.heroCtaCalcAr || 'حاسبة تكاليف المشاريع') : (settings.heroCtaCalcEn || 'Cost Estimator')}</span>
              </a>

              <a
                href="tel:+966138004273"
                className="inline-flex items-center gap-2 px-4 py-3.5 sm:py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'اتصال مباشر' : 'Direct Call'}</span>
              </a>
            </div>
          </div>

          {/* Right Hero Card: Direct Sector Portals Hub */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl p-5 sm:p-7 backdrop-blur-xl bg-[#080d2b]/95 border border-white/15 text-white shadow-2xl space-y-5">
              {/* Tab Selector Segmented Control */}
              <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/40 border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('contracting')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'contracting'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {isAr ? 'المقاولات (SBC)' : 'Contracting'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('realestate')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'realestate'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {isAr ? 'العقارات (فال)' : 'Real Estate'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('hvac')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'hvac'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {isAr ? 'التكييف (AMC)' : 'HVAC'}
                </button>
              </div>

              {activeTab === 'contracting' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                      {isAr ? 'مقاولات عامة فئة أولى معتمدة' : 'Class-1 General Contracting'}
                    </span>
                    <h3 className="text-base sm:text-lg font-black">
                      {isAr ? 'تنفيذ الأبراج والمجمعات والفلل الفاخرة' : 'Towers, Plazas & Luxury Estates'}
                    </h3>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{isAr ? 'مطابقة هندسية 100% لكود البناء السعودي (SBC)' : '100% Saudi Building Code compliance'}</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{isAr ? 'جداول كميات (BOQ) ملزمة وإشراف هندسي مقيم' : 'Binding BOQ & resident site engineers'}</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{isAr ? 'ضمانات هيكلية ممتدة تصل إلى 10 سنوات' : '10-Year structural engineering warranty'}</span>
                    </div>
                  </div>

                  <div className="pt-1 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setConsultationOpen(true)}
                      className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>{isAr ? 'طلب دراسة تكلفة وجداول كميات BOQ' : 'Request BOQ Estimate'}</span>
                    </button>
                    <Link
                      href="/construction"
                      className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs text-center transition-all"
                    >
                      {isAr ? 'استعراض صفحة المقاولات الإنشائية التفصيلية' : 'Visit Full Contracting Portal'}
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'realestate' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">
                      {isAr ? 'وساطة وتسويق معتمد برخصة فال 1200028472' : 'VAL Licensed Brokerage 1200028472'}
                    </span>
                    <h3 className="text-base sm:text-lg font-black">
                      {isAr ? 'تسويق المخططات والقصور والفرص الاستثمارية' : 'Prime Off-Plan & Luxury Palaces'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Link
                      href="/listings?status=for-sale"
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 text-center font-bold"
                    >
                      {isAr ? 'عقارات للبيع' : 'Properties for Sale'}
                    </Link>
                    <Link
                      href="/listings?status=for-rent"
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 text-center font-bold"
                    >
                      {isAr ? 'عقارات للإيجار' : 'Properties for Rent'}
                    </Link>
                  </div>

                  <div className="pt-1 flex flex-col gap-2">
                    <Link
                      href="/realestate"
                      className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <span>{isAr ? 'الدخول لبوابة الوساطة والتسويق العقاري' : 'Open Real Estate Portal'}</span>
                      <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                    </Link>
                    <Link
                      href="/projects"
                      className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs text-center transition-all"
                    >
                      {isAr ? 'استعراض المشاريع الكبرى قيد الإنشاء' : 'View Master Developments'}
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'hvac' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                      {isAr ? 'عقود صيانة وقائية AMC وطوارئ 24/7' : 'Preventive AMC & 24/7 Emergency'}
                    </span>
                    <h3 className="text-base sm:text-lg font-black">
                      {isAr ? 'شيلرات مركزية وأنظمة VRF الذكية' : 'Central Chillers & Inverter VRF'}
                    </h3>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{isAr ? 'استجابة ميدانية فورية لطوارئ التبريد 24/7' : '24/7 immediate cooling dispatch'}</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{isAr ? 'توفير يصل إلى 35% في استهلاك طاقة التكييف' : 'Up to 35% HVAC energy optimization'}</span>
                    </div>
                  </div>

                  <div className="pt-1 flex flex-col gap-2">
                    <Link
                      href="/hvac"
                      className="w-full py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <span>{isAr ? 'طلب عقد صيانة وقائية AMC' : 'Request AMC Service Contract'}</span>
                      <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                    </Link>
                    <a
                      href="https://wa.me/966556125711"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-emerald-400 font-semibold text-xs text-center transition-all"
                    >
                      {isAr ? 'طوارئ التكييف عبر واتساب 24/7' : 'WhatsApp Emergency 24/7'}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4 Trust Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-5 border-t border-white/15">
          {stats.map((st, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-blue-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-black text-white block">
                  {st.value}
                </span>
                <span className="text-[11px] text-gray-300 block">
                  {st.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultService="General Contracting & Structural Construction"
      />
    </section>
  );
}
