'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  HardHat,
  Fan,
  Layers,
  ChevronLeft,
  ChevronRight,
  Phone,
  FileSpreadsheet,
  Clock,
  Sparkles,
  Check,
} from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { useSiteContent } from '@/lib/site-content-context';
import WordsPullUp from '@/components/animations/WordsPullUp';
import { hardgpSlides, HardgpSlide } from '@/data/skyvilla-data';

export default function HeroSection() {
  const { language, theme, direction } = useLanguageTheme();
  const { settings } = useSiteContent();
  const isAr = language === 'ar';

  const [consultationOpen, setConsultationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'contracting' | 'realestate' | 'hvac'>('contracting');
  const [slideIndex, setSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'slides' | 'flagship'>('slides');

  const currentSlide = hardgpSlides[slideIndex] || hardgpSlides[0];

  // Sync slide with activeTab when tab changes
  const handleTabChange = (tab: 'contracting' | 'realestate' | 'hvac') => {
    setActiveTab(tab);
    if (viewMode === 'slides') {
      if (tab === 'contracting') setSlideIndex(0);
      else if (tab === 'realestate') setSlideIndex(4);
      else if (tab === 'hvac') setSlideIndex(8);
    }
  };

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % hardgpSlides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + hardgpSlides.length) % hardgpSlides.length);
  };

  // Image to display
  const activeImageSrc =
    viewMode === 'flagship'
      ? (settings.heroImage || '/images/hardgp/por1-big.jpg')
      : currentSlide.image;

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
      label: isAr ? 'نسبة رضا المستثمرين' : 'Investor Satisfaction Rate',
    },
  ];

  return (
    <section className="bg-black p-3 sm:p-5 md:p-6 min-h-screen flex flex-col justify-center">
      {/* Inset Cinematic Container */}
      <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-[#222222] bg-[#0c0c0c] min-h-[90vh] flex flex-col justify-between pt-24 pb-10 sm:pt-28 sm:pb-12 px-4 sm:px-8 lg:px-12">
        {/* Background Visual Asset: 100% Full Original Quality from hardgp.com */}
        <div className="absolute inset-0 z-0">
          <Image
            src={activeImageSrc}
            alt={
              viewMode === 'slides'
                ? isAr
                  ? `${currentSlide.division_ar} - ${currentSlide.title_ar}`
                  : `${currentSlide.division} - ${currentSlide.title}`
                : isAr
                ? settings.heroTitleAr || 'مجموعة هارد للمقاولات العامة'
                : settings.heroTitleEn || 'HARD Group'
            }
            fill
            priority
            unoptimized
            className="object-cover object-center transition-all duration-700 ease-in-out brightness-[0.62] contrast-[1.06]"
            referrerPolicy="no-referrer"
          />
          {/* Pure Cinematic Multi-layer Gradient: High Clarity, Zero Grainy Noise */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Top Floating Slide Navigation & Full-Quality Badge */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-3 mb-4">
          {/* Slide Stage Kicker & Details from hardgp.com/index.html */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs text-[#E1E0CC]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-[#DEDBC8]">
              {isAr ? currentSlide.division_ar : currentSlide.division}
            </span>
            <span className="text-gray-400">•</span>
            <span className="font-semibold text-sky-400">
              {isAr ? currentSlide.step_ar : currentSlide.step}
            </span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-gray-300 hidden sm:inline truncate max-w-[280px]">
              {isAr ? currentSlide.title_ar : currentSlide.title}
            </span>
          </div>

          {/* Interactive Source Slide Controls */}
          <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md p-1 rounded-full border border-white/15">
            <button
              type="button"
              onClick={direction === 'rtl' ? nextSlide : prevSlide}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              title={isAr ? 'الشريحة السابقة' : 'Previous Slide'}
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono px-2 text-[#DEDBC8] font-bold">
              {slideIndex + 1} / {hardgpSlides.length}
            </span>
            <button
              type="button"
              onClick={direction === 'rtl' ? prevSlide : nextSlide}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              title={isAr ? 'الشريحة التالية' : 'Next Slide'}
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="h-4 w-[1px] bg-white/20 mx-1" />
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'slides' ? 'flagship' : 'slides')}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                viewMode === 'flagship'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {viewMode === 'flagship'
                ? (isAr ? 'معلم رئيسي' : 'Flagship Landmark')
                : (isAr ? '١٢ شريحة الأصلية' : '12 Source Slides')}
            </button>
          </div>
        </div>

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8 sm:mb-10">
            {/* Left Column (7 cols): Typography, Live Step Caption & CTA */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              {/* Unboxed Metadata Kicker */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-[#DEDBC8]/80">
                <span className="w-2 h-2 rounded-full bg-[#DEDBC8] animate-pulse" />
                <span>
                  {isAr
                    ? (settings.heroBadgeAr || 'المساهمة في القطاع الصناعي والبنية التحتية في المملكة منذ 2004')
                    : (settings.heroBadgeEn || 'Contributing to Saudi Arabia industrial & infrastructure sector since 2004')}
                </span>
              </div>

              {/* Monumental Headline */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-[#E1E0CC] tracking-tight leading-[1.12]">
                  <WordsPullUp
                    text={isAr ? (settings.heroTitleAr || 'مجموعة هارد للمقاولات العامة') : (settings.heroTitleEn || 'HARD Group')}
                    showAsterisk={true}
                    className="text-[#E1E0CC]"
                  />
                </h1>
                <p className="text-xl sm:text-3xl md:text-4xl text-[#DEDBC8] font-serif italic pt-1">
                  {isAr ? (settings.heroSubtitleAr || 'للمقاولات والتطوير العقاري') : (settings.heroSubtitleEn || 'General Contracting & Real Estate Development')}
                </p>
              </div>

              {/* Authentic Source Description Banner from hardgp.com */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-[#DEDBC8] space-y-1">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
                  <span>{isAr ? currentSlide.step_ar : currentSlide.step}:</span>
                  <span className="text-[#E1E0CC]">{isAr ? currentSlide.title_ar : currentSlide.title}</span>
                </div>
                <p className="text-[#DEDBC8]/90 font-light leading-relaxed">
                  {isAr ? currentSlide.description_ar : currentSlide.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => setConsultationOpen(true)}
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-[#DEDBC8] hover:bg-[#eae8d8] text-black font-semibold text-xs sm:text-sm transition-all transform hover:-translate-y-0.5 shadow-xl shadow-black/50 cursor-pointer active:scale-98"
                >
                  <span>{isAr ? (settings.heroCtaQuoteAr || 'طلب استشارة وتسعير فوري') : (settings.heroCtaQuoteEn || 'Request Instant Estimate')}</span>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black text-[#DEDBC8] flex items-center justify-center transition-transform group-hover:scale-110">
                    <ArrowRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 rounded-full bg-[#1b1b1b]/90 hover:bg-[#262626] text-[#E1E0CC] font-medium text-xs sm:text-sm border border-[#333] transition-all cursor-pointer backdrop-blur-md"
                >
                  <ArrowUpRight className="w-4 h-4 text-[#DEDBC8]" />
                  <span>{isAr ? 'استعراض كافة الخدمات' : 'Explore Services'}</span>
                </Link>

                <a
                  href="tel:+966138004273"
                  className="inline-flex items-center gap-2 px-4 py-3.5 sm:py-4 rounded-full bg-[#141414]/80 hover:bg-[#1f1f1f] text-[#DEDBC8]/80 hover:text-[#DEDBC8] font-medium text-xs sm:text-sm border border-[#2b2b2b] transition-all"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'اتصال مباشر' : 'Direct Call'}</span>
                </a>
              </div>
            </div>

            {/* Right Column (5 cols): Sector Hub in Dark Card (#101010 & #212121) */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 backdrop-blur-xl bg-[#101010]/95 border border-[#262626] text-[#E1E0CC] shadow-2xl space-y-5">
                {/* Segmented Sector Control */}
                <div className="flex items-center gap-1 p-1 rounded-xl sm:rounded-2xl bg-[#000000] border border-[#262626]">
                  <button
                    type="button"
                    onClick={() => handleTabChange('contracting')}
                    className={`flex-1 py-2.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'contracting'
                        ? 'bg-[#212121] text-[#DEDBC8] shadow-sm border border-[#333]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {isAr ? 'المقاولات (SBC)' : 'Contracting'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabChange('realestate')}
                    className={`flex-1 py-2.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'realestate'
                        ? 'bg-[#212121] text-[#DEDBC8] shadow-sm border border-[#333]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {isAr ? 'العقارات (فال)' : 'Real Estate'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabChange('hvac')}
                    className={`flex-1 py-2.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'hvac'
                        ? 'bg-[#212121] text-[#DEDBC8] shadow-sm border border-[#333]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {isAr ? 'التكييف (AMC)' : 'HVAC'}
                  </button>
                </div>

                {/* Tab: Contracting */}
                {activeTab === 'contracting' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#DEDBC8] block">
                        {isAr ? 'تصنيف مقاولات عامة فئة أولى' : 'Class-1 General Contracting'}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {isAr ? 'تنفيذ الأبراج والمجمعات الذكية' : 'Smart Commercial Towers & Compounds'}
                      </h3>
                    </div>

                    {/* Step selector for contracting slides 1-4 */}
                    <div className="grid grid-cols-4 gap-1.5 pt-1">
                      {[0, 1, 2, 3].map((idx) => {
                        const s = hardgpSlides[idx];
                        const isCurrent = slideIndex === idx && viewMode === 'slides';
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              setViewMode('slides');
                              setSlideIndex(idx);
                            }}
                            className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                                : 'bg-[#181818] border-[#2a2a2a] text-gray-400 hover:text-white'
                            }`}
                          >
                            <span className="block text-[10px] font-bold">
                              {isAr ? `مرحلة ${idx + 1}` : `Step ${idx + 1}`}
                            </span>
                            <span className="block text-[9px] truncate opacity-75">
                              {isAr ? s.step_ar : s.step}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#181818] border border-[#2a2a2a]">
                        <Check className="w-4 h-4 text-[#DEDBC8] shrink-0" />
                        <span>{isAr ? 'مطابقة 100% لكود البناء السعودي (SBC)' : '100% Saudi Building Code Compliance'}</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#181818] border border-[#2a2a2a]">
                        <Check className="w-4 h-4 text-[#DEDBC8] shrink-0" />
                        <span>{isAr ? 'ضمانات إنشائية وهيكلية ممتدة حتى 10 سنوات' : '10-Year Extended Structural Warranty'}</span>
                      </div>
                    </div>

                    <div className="pt-1 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => setConsultationOpen(true)}
                        className="w-full py-3 px-4 rounded-xl bg-[#DEDBC8] hover:bg-[#eae8d8] text-black font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>{isAr ? 'طلب دراسة تكلفة وجداول كميات BOQ' : 'Request BOQ Estimate'}</span>
                      </button>
                      <Link
                        href="/construction"
                        className="w-full py-2.5 px-4 rounded-xl bg-[#1a1a1a] hover:bg-[#222] border border-[#2e2e2e] text-[#DEDBC8] font-medium text-xs text-center transition-all"
                      >
                        {isAr ? 'استعراض صفحة المقاولات الإنشائية التفصيلية' : 'Visit Full Contracting Portal'}
                      </Link>
                    </div>
                  </div>
                )}

                {/* Tab: Real Estate */}
                {activeTab === 'realestate' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#DEDBC8] block">
                        {isAr ? 'وساطة وتسويق معتمد برخصة فال 1200028472' : 'VAL Licensed Brokerage 1200028472'}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {isAr ? 'تسويق المخططات والقصور والفرص الاستثمارية' : 'Prime Off-Plan & Luxury Palaces'}
                      </h3>
                    </div>

                    {/* Step selector for real estate slides 5-8 */}
                    <div className="grid grid-cols-4 gap-1.5 pt-1">
                      {[4, 5, 6, 7].map((idx) => {
                        const s = hardgpSlides[idx];
                        const isCurrent = slideIndex === idx && viewMode === 'slides';
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              setViewMode('slides');
                              setSlideIndex(idx);
                            }}
                            className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-blue-500/20 border-blue-400 text-white shadow-md'
                                : 'bg-[#181818] border-[#2a2a2a] text-gray-400 hover:text-white'
                            }`}
                          >
                            <span className="block text-[10px] font-bold">
                              {isAr ? `مرحلة ${idx - 3}` : `Step ${idx - 3}`}
                            </span>
                            <span className="block text-[9px] truncate opacity-75">
                              {isAr ? s.step_ar : s.step}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <Link
                        href="/listings?status=for-sale"
                        className="p-3 rounded-xl bg-[#181818] border border-[#2a2a2a] hover:border-[#DEDBC8]/50 text-center font-bold text-white transition-colors"
                      >
                        {isAr ? 'عقارات للبيع' : 'Properties for Sale'}
                      </Link>
                      <Link
                        href="/listings?status=for-rent"
                        className="p-3 rounded-xl bg-[#181818] border border-[#2a2a2a] hover:border-[#DEDBC8]/50 text-center font-bold text-white transition-colors"
                      >
                        {isAr ? 'عقارات للإيجار' : 'Properties for Rent'}
                      </Link>
                    </div>

                    <div className="pt-1 flex flex-col gap-2">
                      <Link
                        href="/realestate"
                        className="w-full py-3 px-4 rounded-xl bg-[#DEDBC8] hover:bg-[#eae8d8] text-black font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <span>{isAr ? 'الدخول لبوابة الوساطة والتسويق العقاري' : 'Open Real Estate Portal'}</span>
                        <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                      </Link>
                      <Link
                        href="/projects"
                        className="w-full py-2.5 px-4 rounded-xl bg-[#1a1a1a] hover:bg-[#222] border border-[#2e2e2e] text-[#DEDBC8] font-medium text-xs text-center transition-all"
                      >
                        {isAr ? 'استعراض المشاريع الكبرى قيد الإنشاء' : 'View Master Developments'}
                      </Link>
                    </div>
                  </div>
                )}

                {/* Tab: HVAC & Maintenance */}
                {activeTab === 'hvac' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#DEDBC8] block">
                        {isAr ? 'عقود صيانة وقائية AMC وطوارئ 24/7' : 'Preventive AMC & 24/7 Emergency'}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {isAr ? 'شيلرات مركزية وأنظمة VRF الذكية' : 'Central Chillers & Inverter VRF'}
                      </h3>
                    </div>

                    {/* Step selector for maintenance slides 9-12 */}
                    <div className="grid grid-cols-4 gap-1.5 pt-1">
                      {[8, 9, 10, 11].map((idx) => {
                        const s = hardgpSlides[idx];
                        const isCurrent = slideIndex === idx && viewMode === 'slides';
                        const labels = isAr
                          ? ['كهرباء', 'سباكة', 'لحام', 'تكييف']
                          : ['Electric', 'Plumbing', 'Welding', 'A/C'];
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              setViewMode('slides');
                              setSlideIndex(idx);
                            }}
                            className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                                : 'bg-[#181818] border-[#2a2a2a] text-gray-400 hover:text-white'
                            }`}
                          >
                            <span className="block text-[10px] font-bold">
                              {labels[idx - 8]}
                            </span>
                            <span className="block text-[9px] truncate opacity-75">
                              {isAr ? s.step_ar : s.step}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#181818] border border-[#2a2a2a]">
                        <Clock className="w-4 h-4 text-[#DEDBC8] shrink-0" />
                        <span>{isAr ? 'استجابة ميدانية فورية لطوارئ التبريد 24/7' : '24/7 immediate cooling dispatch'}</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#181818] border border-[#2a2a2a]">
                        <Check className="w-4 h-4 text-[#DEDBC8] shrink-0" />
                        <span>{isAr ? 'توفير يصل إلى 35% في استهلاك طاقة التكييف' : 'Up to 35% HVAC energy optimization'}</span>
                      </div>
                    </div>

                    <div className="pt-1 flex flex-col gap-2">
                      <Link
                        href="/hvac"
                        className="w-full py-3 px-4 rounded-xl bg-[#DEDBC8] hover:bg-[#eae8d8] text-black font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <span>{isAr ? 'طلب عقد صيانة وقائية AMC' : 'Request AMC Service Contract'}</span>
                        <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                      </Link>
                      <a
                        href="https://wa.me/966556125711"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-[#1a1a1a] hover:bg-[#222] border border-[#2e2e2e] text-emerald-400 font-medium text-xs text-center transition-all"
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-[#222222]">
            {stats.map((st, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#2a2a2a] flex items-center justify-center text-[#DEDBC8] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm sm:text-base font-bold text-white block">
                    {st.value}
                  </span>
                  <span className="text-[11px] text-gray-400 block font-light">
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
      </div>
    </section>
  );
}
