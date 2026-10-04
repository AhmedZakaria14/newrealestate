'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  MapPin,
  ShieldCheck,
  Building,
  Bed,
  Bath,
  Maximize2,
  ArrowUpRight,
  Sparkles,
  Phone,
  Calendar,
} from 'lucide-react';
import { referenceProperties, ReferenceProperty } from '@/data/reference-data';

export default function FeaturedPropertiesSection() {
  const { language, theme, direction } = useLanguageTheme();
  const [activeTab, setActiveTab] = useState<string>('all');
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  const filterTabs = [
    { key: 'all', label: isAr ? 'كافة العقارات' : 'All Properties' },
    { key: 'for-sale', label: isAr ? 'متاح للبيع' : 'For Sale' },
    { key: 'for-rent', label: isAr ? 'متاح للإيجار' : 'For Rent' },
    { key: 'penthouse', label: isAr ? 'بنتهاوس' : 'Penthouses' },
    { key: 'villa', label: isAr ? 'فلل وقصور' : 'Luxury Villas' },
    { key: 'apartment', label: isAr ? 'شقق فندقية' : 'Apartments' },
  ];

  const filtered = referenceProperties.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'for-sale' && item.status === 'for-sale') return true;
    if (activeTab === 'for-rent' && item.status === 'for-rent') return true;
    if (item.type === activeTab) return true;
    return false;
  });

  return (
    <section
      id="featured-properties"
      className={`py-20 sm:py-28 transition-colors ${
        isDark ? 'bg-[#030617] text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block text-xs uppercase tracking-widest font-black text-blue-500 px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
              {isAr ? 'عقارات حصرية معتمدة' : 'Exclusive Portfolio'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {isAr ? 'فرص عقارية مختارة وحصرية' : 'Featured Real Estate Opportunities'}
            </h2>
            <p className="text-sm sm:text-base opacity-80 leading-relaxed">
              {isAr
                ? 'مجموعة منتقاة من الفلل الفارهة، والشقق المطلة على البحر، والمباني التجارية ذات العوائد المجزية الجاهزة للتملك.'
                : 'Hand-picked luxury residences, premium waterfront developments, and high-yield commercial properties ready for immediate acquisition.'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  activeTab === tab.key
                    ? isDark
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                      : 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : isDark
                    ? 'bg-[#080d2b] text-gray-300 hover:text-white border-white/10'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((prop) => {
            const title = isAr ? prop.title.ar : prop.title.en;
            const description = isAr ? prop.description.ar : prop.description.en;
            const city = isAr ? prop.location.city.ar : prop.location.city.en;
            const areaName = isAr ? prop.location.area.ar : prop.location.area.en;
            const statusLabel =
              prop.status === 'for-sale'
                ? isAr ? 'متاح للبيع' : 'For Sale'
                : isAr ? 'متاح للإيجار' : 'For Rent';

            return (
              <div
                key={prop.id}
                className={`group rounded-3xl overflow-hidden border shadow-xl flex flex-col justify-between transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1.5 ${
                  isDark
                    ? 'bg-[#080d2b] border-white/10 hover:border-blue-500/50 shadow-black/40'
                    : 'bg-white border-slate-200 hover:border-blue-500 shadow-slate-200/50'
                }`}
              >
                <div>
                  {/* Media Header */}
                  <Link
                    href={`/listings/${prop.slug}`}
                    className="relative block h-64 sm:h-72 w-full overflow-hidden"
                  >
                    <Image
                      src={prop.images[0]}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Top Badges */}
                    <div
                      className={`absolute top-4 ${
                        direction === 'rtl' ? 'right-4' : 'left-4'
                      } flex items-center gap-2`}
                    >
                      <span className="px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-black shadow-lg">
                        {statusLabel}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-bold text-blue-400">
                        {prop.type.toUpperCase()}
                      </span>
                    </div>

                    {/* Location strip */}
                    <div
                      className={`absolute bottom-3 ${
                        direction === 'rtl' ? 'right-4' : 'left-4'
                      } flex items-center gap-1.5 text-xs text-white drop-shadow font-medium`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>
                        {city} – {areaName}
                      </span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>{isAr ? 'مرخص رسمياً برخصة فال 1200028472' : 'Certified REGA / FAL Licensed'}</span>
                    </div>

                    <h3
                      className={`text-xl font-extrabold tracking-tight line-clamp-1 transition-colors ${
                        isDark
                          ? 'text-white group-hover:text-blue-400'
                          : 'text-slate-900 group-hover:text-blue-600'
                      }`}
                    >
                      <Link href={`/listings/${prop.slug}`}>{title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm opacity-80 line-clamp-2 leading-relaxed">
                      {description}
                    </p>

                    {/* Specs Row */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-dashed border-gray-500/15 text-center text-xs">
                      <div>
                        <span className="text-[10px] opacity-70 block">
                          {isAr ? 'الغرف' : 'Beds'}
                        </span>
                        <span className="font-bold text-blue-500 block mt-0.5">
                          {prop.bedrooms} {isAr ? 'غرف' : 'Beds'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] opacity-70 block">
                          {isAr ? 'الحمامات' : 'Baths'}
                        </span>
                        <span className="font-bold text-blue-500 block mt-0.5">
                          {prop.bathrooms} {isAr ? 'حمامات' : 'Baths'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] opacity-70 block">
                          {isAr ? 'المساحة' : 'Area'}
                        </span>
                        <span className="font-bold text-blue-500 block mt-0.5">
                          {prop.areaSqM} م²
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Price & Link */}
                <div className="p-6 sm:p-7 pt-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold opacity-60 block">
                        {isAr ? 'السعر' : 'Price'}
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-blue-500 tracking-tight">
                        {isAr
                          ? `${prop.price.sar.toLocaleString()} ر.س`
                          : `${prop.price.sar.toLocaleString()} SAR`}
                        {prop.price.period && (
                          <span className="text-xs font-normal opacity-70">
                            {isAr ? ' / سنوياً' : ' / yr'}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/listings/${prop.slug}`}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isDark
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-slate-900 hover:bg-blue-600 text-white shadow-md'
                    }`}
                  >
                    <span>{isAr ? 'تفاصيل العقار والمعاينة' : 'View Property Details'}</span>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform ${
                        direction === 'rtl'
                          ? 'rotate-[-90deg] group-hover:-translate-x-1 group-hover:-translate-y-1'
                          : 'group-hover:translate-x-1 group-hover:-translate-y-1'
                      }`}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Listings CTA */}
        <div className="text-center pt-12">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
          >
            <span>{isAr ? 'استعراض كافة العقارات والصفقات المتاحة' : 'Explore All Verified Property Listings'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
