'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { useSiteContent } from '@/lib/site-content-context';
import { Star, Quote, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import { referenceTestimonials } from '@/data/reference-data';

export default function ClientTestimonialsSection() {
  const { language, theme, direction } = useLanguageTheme();
  const { settings } = useSiteContent();
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  const list =
    settings.testimonials && settings.testimonials.length > 0
      ? settings.testimonials.map((t) => ({
          id: t.id,
          name: { ar: t.name_ar, en: t.name },
          role: { ar: t.role_ar, en: t.role },
          quote: { ar: t.quote_ar, en: t.quote },
          rating: t.rating || 5,
          avatar: t.image || '/images/hardgp/slide-10.jpg',
          dealHighlight: { ar: 'مشروع منجز', en: 'Delivered Project' },
          location: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
        }))
      : referenceTestimonials;

  return (
    <section
      id="testimonials"
      className={`py-20 sm:py-28 border-t transition-colors ${
        isDark
          ? 'bg-[#04071c] border-white/10 text-white'
          : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-xs uppercase tracking-widest font-black text-blue-500 px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
            {isAr ? 'تجارب موثقة' : 'Client Stories'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {isAr
              ? 'ثقة كبار المستثمرين والملاك'
              : 'Trusted by High-Net-Worth Buyers & Global Investors'}
          </h2>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'آراء وشهادات عملاء أتموا صفقاتهم العقارية بنجاح من خلال منظومة هارد للوساطة والتسويق.'
              : 'Read genuine feedback from property owners, institutional fund directors, and luxury homeowners who entrusted HARD Real Estate with their significant real estate transactions.'}
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((item) => {
            const name = isAr ? item.name.ar : item.name.en;
            const role = isAr ? item.role.ar : item.role.en;
            const quote = isAr ? item.quote.ar : item.quote.en;
            const dealHighlight = isAr ? item.dealHighlight.ar : item.dealHighlight.en;

            return (
              <div
                key={item.id}
                className={`group rounded-3xl p-8 sm:p-9 border shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                  isDark
                    ? 'bg-[#080d2b] border-white/10 hover:border-blue-500/50 shadow-black/40'
                    : 'bg-white border-slate-200 hover:border-blue-500 shadow-slate-200/50'
                }`}
              >
                <div className="space-y-5">
                  {/* Deal Highlight Tag */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {dealHighlight}
                    </span>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Quote Text */}
                  <p className="text-sm sm:text-base leading-relaxed opacity-90 italic">
                    &ldquo;{quote}&rdquo;
                  </p>
                </div>

                {/* Client Profile Footer */}
                <div className="pt-6 mt-6 border-t border-gray-500/10 flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-blue-500/30">
                    <Image
                      src={item.avatar}
                      alt={name}
                      fill
                      unoptimized
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base leading-tight">
                      {name}
                    </h4>
                    <span className="text-xs opacity-75 block">{role}</span>
                    <span className="text-[11px] text-blue-500 font-semibold block mt-0.5">
                      {isAr ? item.location.ar : item.location.en}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
