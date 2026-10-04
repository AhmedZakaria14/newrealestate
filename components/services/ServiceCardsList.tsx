'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  ReferenceServiceItem,
  referenceRealEstateServices,
  referenceConstructionServices,
  referenceHVACServices,
} from '@/data/reference-services';
import {
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  HardHat,
  Fan,
  Sparkles,
  Phone,
  FileSpreadsheet,
} from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';

interface ServiceCardsListProps {
  filterDivision?: 'all' | 'realestate' | 'construction' | 'hvac';
  showCategoryTabs?: boolean;
  limit?: number;
}

export default function ServiceCardsList({
  filterDivision = 'all',
  showCategoryTabs = true,
  limit,
}: ServiceCardsListProps) {
  const { language, theme, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'all' | 'realestate' | 'construction' | 'hvac'>(filterDivision);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const getDivisionIcon = (division: string) => {
    switch (division) {
      case 'construction':
        return HardHat;
      case 'hvac':
        return Fan;
      default:
        return Building2;
    }
  };

  const getDivisionLabel = (division: string) => {
    switch (division) {
      case 'construction':
        return isAr ? 'المقاولات والتطوير الإنشائي' : 'General Contracting & Structural';
      case 'hvac':
        return isAr ? 'التكييف وتشغيل المرافق' : 'HVAC & Facilities';
      default:
        return isAr ? 'الوساطة والتسويق العقاري' : 'Real Estate Brokerage';
    }
  };

  const getDivisionColor = (division: string) => {
    switch (division) {
      case 'construction':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      case 'hvac':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      default:
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    }
  };

  // Determine list of services to display
  let servicesToDisplay: ReferenceServiceItem[] = [];
  if (activeTab === 'realestate') {
    servicesToDisplay = referenceRealEstateServices;
  } else if (activeTab === 'construction') {
    servicesToDisplay = referenceConstructionServices;
  } else if (activeTab === 'hvac') {
    servicesToDisplay = referenceHVACServices;
  } else {
    servicesToDisplay = [
      ...referenceRealEstateServices,
      ...referenceConstructionServices,
      ...referenceHVACServices,
    ];
  }

  if (limit) {
    servicesToDisplay = servicesToDisplay.slice(0, limit);
  }

  const handleActionClick = (service: ReferenceServiceItem) => {
    if (service.actionType === 'list-property' || service.actionType === 'contracting' || service.actionType === 'hvac') {
      setSelectedService(isAr ? service.title.ar : service.title.en);
      setConsultationOpen(true);
    }
  };

  return (
    <div className="space-y-12">
      {/* Category Filter Tabs */}
      {showCategoryTabs && (
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto p-1.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-white/10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white'
            }`}
          >
            {isAr ? 'كافة الخدمات (7)' : 'All Services (7)'}
          </button>
          <button
            onClick={() => setActiveTab('realestate')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'realestate'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{isAr ? 'الوساطة والتسويق العقاري' : 'Real Estate'}</span>
          </button>
          <button
            onClick={() => setActiveTab('construction')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'construction'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white'
            }`}
          >
            <HardHat className="w-4 h-4" />
            <span>{isAr ? 'المقاولات والتطوير' : 'Contracting'}</span>
          </button>
          <button
            onClick={() => setActiveTab('hvac')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'hvac'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white'
            }`}
          >
            <Fan className="w-4 h-4" />
            <span>{isAr ? 'التكييف والمرافق AMC' : 'HVAC & Facilities'}</span>
          </button>
        </div>
      )}

      {/* Services Cards List */}
      <div className="space-y-12">
        {servicesToDisplay.map((service, idx) => {
          const DivIcon = getDivisionIcon(service.division);
          const divLabel = getDivisionLabel(service.division);
          const divColor = getDivisionColor(service.division);
          const tag = isAr ? service.tag.ar : service.tag.en;
          const title = isAr ? service.title.ar : service.title.en;
          const subtitle = isAr ? service.subtitle.ar : service.subtitle.en;
          const description = isAr ? service.description.ar : service.description.en;
          const actionText = isAr ? service.actionText.ar : service.actionText.en;

          return (
            <div
              key={service.id}
              className={`rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                isDark
                  ? 'bg-[#080d2b] border-white/10 shadow-black/50'
                  : 'bg-white border-slate-200 shadow-slate-200/60'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Visual Image Column */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
                  <Image
                    src={service.image}
                    alt={title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:bg-gradient-to-r lg:rtl:bg-gradient-to-l lg:from-transparent lg:to-black/40" />

                  {/* Division Badge on Image */}
                  <div className="absolute top-4 start-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black backdrop-blur-md bg-black/60 text-white border border-white/20">
                      <DivIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>{divLabel}</span>
                    </span>
                  </div>

                  {/* 3 Live Metric Stats overlaid on image / bottom strip */}
                  <div className="absolute bottom-4 start-4 end-4 grid grid-cols-3 gap-2 backdrop-blur-md bg-black/70 p-3 rounded-2xl border border-white/15 text-white text-center">
                    {service.stats.map((st, sIdx) => (
                      <div key={sIdx}>
                        <div className="text-xs sm:text-sm font-black text-blue-400">
                          {st.value}
                        </div>
                        <div className="text-[10px] text-gray-300 font-medium truncate">
                          {isAr ? st.label.ar : st.label.en}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Details Column */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${divColor}`}>
                        {tag}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-2">
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 leading-relaxed">
                        {subtitle}
                      </p>
                    </div>

                    {/* Detailed Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
                      {description}
                    </p>

                    {/* 3 Key Features Bullets */}
                    <div className="space-y-3 pt-2">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-white block">
                              {isAr ? feat.title.ar : feat.title.en}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-gray-400 block leading-relaxed">
                              {isAr ? feat.desc.ar : feat.desc.en}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                    {service.actionType === 'properties' || service.actionType === 'projects' ? (
                      <Link
                        href={service.actionHref}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                      >
                        <span>{actionText}</span>
                        <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleActionClick(service)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>{actionText}</span>
                      </button>
                    )}

                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-gray-400">
                      <span className="flex items-center gap-1 font-bold text-slate-800 dark:text-gray-200">
                        <ShieldCheck className="w-4 h-4 text-blue-500" />
                        <span>{isAr ? 'اعتماد رسمي موثق' : 'Fully Certified'}</span>
                      </span>
                      <span>•</span>
                      <span>{isAr ? 'عقود ملزمة' : 'Binding SLA'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultService={selectedService}
      />
    </div>
  );
}
