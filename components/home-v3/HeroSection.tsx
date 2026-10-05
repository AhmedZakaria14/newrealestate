'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  HardHat,
  Phone,
} from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { useSiteContent } from '@/lib/site-content-context';

export default function HeroSection() {
  const { language, direction } = useLanguageTheme();
  const { settings } = useSiteContent();
  const isAr = language === 'ar';

  const [consultationOpen, setConsultationOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  // High-resolution classic project & architectural photography images
  const classicImages: string[] = [
    '/images/hardgp/por1-big.jpg',
    '/images/hardgp/por4-big.jpg',
    '/images/hardgp/por2-big.jpg',
    '/images/hardgp/por6-big.jpg',
    '/images/hardgp/por3-big.jpg',
    '/images/hardgp/por7-big.jpg',
    '/images/hardgp/por10-big.jpg',
    '/images/hardgp/por24-big.jpg',
  ];

  const imagesToDisplay =
    settings.slides && settings.slides.length > 0
      ? settings.slides.map((s) => s.image)
      : classicImages;

  const totalSlides = imagesToDisplay.length;
  const currentImage = imagesToDisplay[slideIndex % totalSlides] || classicImages[0];

  const nextSlide = useCallback(() => {
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Non-stop continuous automatic rotation (every 4.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(timer);
  }, [totalSlides]);

  // Touch swipe support on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        if (direction === 'rtl') prevSlide();
        else nextSlide();
      } else {
        if (direction === 'rtl') nextSlide();
        else prevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[82vh] min-h-[500px] max-h-[880px] bg-black overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Continuous Smooth Full-Screen Crossfade Background Images */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage + slideIndex}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentImage}
              alt="HARD Group Architecture"
              fill
              priority
              unoptimized
              className="object-cover object-center brightness-[0.65] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent sm:w-2/3" />
      </div>

      {/* 2. Classic Clean Overlay Content */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12">
        {/* Top Spacer */}
        <div />

        {/* Center Classic Headline & Story */}
        <div className="max-w-3xl space-y-4 my-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-2xl">
            {isAr
              ? settings.heroTitleAr || 'مجموعة هارد للمقاولات العامة'
              : settings.heroTitleEn || 'HARD Group'}
          </h1>

          <p className="text-lg sm:text-2xl md:text-3xl font-serif italic text-[#DEDBC8] font-light drop-shadow-md">
            {isAr
              ? settings.heroSubtitleAr || 'للمقاولات والتطوير العقاري'
              : settings.heroSubtitleEn || 'General Contracting & Real Estate Development'}
          </p>

          <p className="text-xs sm:text-sm md:text-base text-[#E1E0CC]/90 font-light leading-relaxed max-w-2xl drop-shadow-md line-clamp-3">
            {isAr
              ? settings.heroDescriptionAr ||
                'مؤسسة هارد للمقاولات العامة، تساهم في قطاع الصناعة والبنية التحتية في المملكة العربية السعودية منذ عام 2004 بخدمات إنشائية موثوقة ومتعددة الأبعاد، وتطوير عقاري، وخدمات تشغيل وصيانة شاملة.'
              : settings.heroDescriptionEn ||
                'HARD General Contracting Establishment has been contributing to Saudi Arabia industrial and infrastructure sector since 2004 with reliable, multi-dimensional construction services, property development, and comprehensive maintenance operations.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              type="button"
              onClick={() => setConsultationOpen(true)}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all transform hover:-translate-y-0.5 shadow-xl shadow-blue-600/30 cursor-pointer active:scale-98"
            >
              <span>{isAr ? (settings.heroCtaQuoteAr || 'طلب استشارة وتسعير فوري') : (settings.heroCtaQuoteEn || 'Request Instant Estimate')}</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:scale-110">
                <ArrowRight className={`w-3.5 h-3.5 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
              </div>
            </button>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer backdrop-blur-md"
            >
              <ArrowUpRight className="w-4 h-4 text-blue-400" />
              <span>{isAr ? 'استعراض كافة الخدمات' : 'Explore Services'}</span>
            </Link>

            <a
              href="tel:+966138004273"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-black/60 hover:bg-black/80 text-gray-200 font-medium text-xs sm:text-sm border border-white/15 transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'اتصال مباشر' : 'Direct Call'}</span>
            </a>
          </div>
        </div>

        {/* 3. Classic Centered Bottom Pagination Dots */}
        <div className="flex items-center justify-center sm:justify-start gap-2 pt-4">
          {imagesToDisplay.map((_, idx) => {
            const isCurrent = idx === (slideIndex % totalSlides);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSlideIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  isCurrent
                    ? 'w-8 sm:w-10 bg-blue-500 shadow-md shadow-blue-500/50'
                    : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultService="general-contracting"
      />
    </section>
  );
}
