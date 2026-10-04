'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  MapPin,
  TrendingUp,
  Calendar,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { referenceProjects } from '@/data/reference-data';
import ConsultationModal from '@/components/ConsultationModal';
import { useSiteContent } from '@/lib/site-content-context';

export default function PrimeProjectsSection() {
  const { language, theme, direction } = useLanguageTheme();
  const { settings } = useSiteContent();
  const [consultationOpen, setConsultationOpen] = useState(false);
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  return (
    <section
      id="prime-projects"
      className={`py-20 sm:py-28 transition-colors ${
        isDark ? 'bg-[#030617] text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block text-xs uppercase tracking-widest font-black text-blue-500 px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
              {isAr ? 'مشاريع كبرى قيد الإنشاء' : 'Master Developments'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {isAr
                ? (settings.sectionTitles?.projectsAr || 'المشاريع الاستراتيجية والتطويرية')
                : (settings.sectionTitles?.projectsEn || 'Strategic & Master Projects')}
            </h2>
            <p className="text-sm sm:text-base opacity-80 leading-relaxed">
              {isAr
                ? (settings.sectionTitles?.projectsSubtitleAr || 'مشاريع استثنائية قيد الإنشاء وفرص استثمارية مباشرة من كبرى شركات التطوير، مع خطط سداد ميسرة وعوائد استثمارية واعدة.')
                : (settings.sectionTitles?.projectsSubtitleEn || 'Exclusive off-plan releases and visionary master developments from premier real estate partners, offering advantageous payment structures and high capital growth.')}
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-xs sm:text-sm font-bold transition-all border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white"
          >
            <span>{isAr ? 'عرض كافة المشاريع المعتمدة' : 'View All Master Projects'}</span>
            <ArrowUpRight
              className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`}
            />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {referenceProjects.map((proj) => {
            const title = isAr ? proj.title.ar : proj.title.en;
            const description = isAr ? proj.description.ar : proj.description.en;
            const location = isAr ? proj.location.ar : proj.location.en;
            const category = isAr ? proj.category.ar : proj.category.en;
            const handover = isAr ? proj.handoverDate.ar : proj.handoverDate.en;
            const highlights = isAr ? proj.highlights.ar : proj.highlights.en;

            return (
              <div
                key={proj.id}
                className={`group rounded-3xl overflow-hidden border shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                  isDark
                    ? 'bg-[#080d2b] border-white/10 hover:border-blue-500/50 shadow-black/40'
                    : 'bg-white border-slate-200 hover:border-blue-500 shadow-slate-200/50'
                }`}
              >
                <div>
                  {/* Media Header */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <Image
                      src={proj.image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Top Tag */}
                    <div
                      className={`absolute top-4 ${
                        direction === 'rtl' ? 'right-4' : 'left-4'
                      }`}
                    >
                      <span className="px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-black shadow-lg">
                        {category}
                      </span>
                    </div>

                    {/* ROI Pill */}
                    <div
                      className={`absolute bottom-3 ${
                        direction === 'rtl' ? 'right-4' : 'left-4'
                      } flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-xs font-bold text-emerald-400`}
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{proj.roiProjected}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div className="flex items-center gap-1.5 text-xs opacity-75">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span className="line-clamp-1">{location}</span>
                    </div>

                    <h3 className="text-xl font-extrabold tracking-tight line-clamp-1 group-hover:text-blue-500 transition-colors">
                      {title}
                    </h3>

                    <p className="text-xs sm:text-sm opacity-80 line-clamp-2 leading-relaxed">
                      {description}
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-500/10 text-xs">
                      <div>
                        <span className="opacity-60 block text-[10px]">{isAr ? 'تاريخ التسليم' : 'Handover'}</span>
                        <span className="font-bold">{handover}</span>
                      </div>
                      <div>
                        <span className="opacity-60 block text-[10px]">{isAr ? 'الوحدات المتبقية' : 'Available'}</span>
                        <span className="font-bold text-blue-500">{proj.unitsAvailable} {isAr ? 'وحدة' : 'Units'}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2 pt-2">
                      {highlights.slice(0, 3).map((hl, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs opacity-90">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Price & Link */}
                <div className="p-6 sm:p-7 pt-0 space-y-3">
                  <div className="flex items-center justify-between border-t border-gray-500/10 pt-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold opacity-60 block">
                        {isAr ? 'الأسعار تبدأ من' : 'Starting From'}
                      </span>
                      <span className="text-lg font-black text-blue-500">
                        {proj.startingPriceSAR}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <span>{isAr ? 'طلب كتيب المشروع واستشارة' : 'Inquire & Request Brochure'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </section>
  );
}
