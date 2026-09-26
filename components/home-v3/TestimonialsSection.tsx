'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsData, partnerLogos } from '@/data/skyvilla-data';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function TestimonialsSection() {
  const { language, theme, t, direction } = useLanguageTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDark = theme === 'dark';

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const current = testimonialsData[currentIndex];
  const quote = language === 'ar' ? current.quote_ar : current.quote;
  const name = language === 'ar' ? current.name_ar : current.name;
  const role = language === 'ar' ? current.role_ar : current.role;

  return (
    <section
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors ${
        isDark ? 'bg-[#020410] text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-emerald-500 px-3.5 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              {t('testimonials.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {t('testimonials.titlePre')}{' '}
              <span className={isDark ? 'text-[#DCFF09]' : 'text-emerald-600'}>
                {t('testimonials.titleHighlight')}
              </span>
            </h2>
            <p className="opacity-75 text-sm sm:text-base leading-relaxed">
              {t('testimonials.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={direction === 'rtl' ? nextSlide : prevSlide}
              className={`p-3.5 rounded-full border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#080b24] border-white/10 text-white hover:bg-[#DCFF09] hover:text-[#040618] hover:border-[#DCFF09]'
                  : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
              }`}
              aria-label="Previous testimonial"
            >
              {direction === 'rtl' ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <button
              onClick={direction === 'rtl' ? prevSlide : nextSlide}
              className={`p-3.5 rounded-full border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#080b24] border-white/10 text-white hover:bg-[#DCFF09] hover:text-[#040618] hover:border-[#DCFF09]'
                  : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
              }`}
              aria-label="Next testimonial"
            >
              {direction === 'rtl' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Active Testimonial Card */}
        <div
          className={`relative rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden group border ${
            isDark
              ? 'bg-[#080b24] border-white/10 text-white'
              : 'bg-slate-50 border-slate-200 text-slate-900'
          }`}
        >
          <div
            className={`absolute top-8 ${
              direction === 'rtl' ? 'left-8' : 'right-8'
            } transition-colors ${
              isDark ? 'text-[#DCFF09]/15 group-hover:text-[#DCFF09]/25' : 'text-emerald-500/10 group-hover:text-emerald-500/20'
            }`}
          >
            <Quote className="w-24 h-24 sm:w-32 sm:h-32" />
          </div>

          <div className="relative z-10 space-y-8 max-w-3xl">
            {/* Stars */}
            <div className="flex items-center gap-1.5">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-lg sm:text-2xl lg:text-3xl font-semibold leading-relaxed italic opacity-95">
              &ldquo;{quote}&rdquo;
            </p>

            {/* Author info */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-500/15">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500">
                <Image
                  src={current.avatar}
                  alt={name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h4 className="text-lg font-bold">{name}</h4>
                <span className="text-xs uppercase font-bold text-emerald-500 tracking-wider block">
                  {role}
                </span>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 mt-8">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? isDark
                      ? 'w-8 bg-[#DCFF09]'
                      : 'w-8 bg-emerald-600'
                    : 'w-2 bg-gray-400/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Global Clients Trust Strip */}
        <div className="mt-16 pt-10 border-t border-gray-500/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-sm font-bold uppercase tracking-wider opacity-80">
            {t('testimonials.clientsCount')}
          </span>
          <div className="flex flex-wrap items-center gap-8 opacity-75">
            {partnerLogos.map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt="Partner logo"
                className={`h-7 w-auto grayscale opacity-60 hover:opacity-100 transition-opacity ${
                  isDark ? 'brightness-0 invert' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
