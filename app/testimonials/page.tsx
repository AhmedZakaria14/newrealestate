'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import TestimonialsSection from '@/components/home-v3/TestimonialsSection';
import MarqueeTicker from '@/components/MarqueeTicker';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { testimonialsData } from '@/data/skyvilla-data';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function TestimonialsPage() {
  const { language, theme, t } = useLanguageTheme();
  const isDark = theme === 'dark';

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title={t('nav.testimonials')}
        subtitle={
          language === 'ar'
            ? 'تجارب وآراء موثقة من ملاك الفلل والمستثمرين العقاريين وشركاء النجاح.'
            : 'Genuine client feedback and verified experiences from homeowners and corporate partners.'
        }
        breadcrumb={[{ label: t('nav.testimonials') }]}
      />

      <TestimonialsSection />

      {/* Extended Reviews Grid */}
      <section
        className={`py-20 border-t transition-colors ${
          isDark
            ? 'bg-[#040618] border-white/10 text-white'
            : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase font-bold text-emerald-500 tracking-widest">
              {t('about.verifiedTrack')}
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {language === 'ar' ? 'المزيد من قصص وتجارب عملائنا' : 'More Client Stories'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialsData.map((item) => {
              const quote = language === 'ar' ? item.quote_ar : item.quote;
              const name = language === 'ar' ? item.name_ar : item.name;
              const role = language === 'ar' ? item.role_ar : item.role;

              return (
                <div
                  key={item.id}
                  className={`p-8 rounded-3xl border transition-all space-y-6 relative ${
                    isDark
                      ? 'bg-[#080b24] border-white/10 hover:border-[#DCFF09]/40'
                      : 'bg-white border-slate-200 hover:border-emerald-500 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-emerald-500/20" />
                  </div>

                  <p className="opacity-90 text-sm sm:text-base leading-relaxed italic">
                    &ldquo;{quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-500/15">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500">
                      <Image
                        src={item.avatar}
                        alt={name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-base">{name}</h5>
                      <span className="text-xs text-emerald-500 font-bold">{role}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <MarqueeTicker
        labelKey="hero.badge"
        linkTextKey="hero.cta"
        linkHref="/contact-us"
        bgDark={false}
      />

      <Footer />
    </main>
  );
}
