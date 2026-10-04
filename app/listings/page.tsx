'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import MarqueeTicker from '@/components/MarqueeTicker';
import { realEstateListings, RealEstateListingItem } from '@/data/listings-data';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  MapPin,
  ShieldCheck,
  Building,
  ArrowUpRight,
  Filter,
  Search,
  Sparkles,
  Layers,
} from 'lucide-react';

export default function ListingsIndexPage() {
  const { language, theme, direction } = useLanguageTheme();
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  const cities = [
    { key: 'all', label: isAr ? 'كافة المدن' : 'All Cities' },
    { key: 'riyadh', label: isAr ? 'الرياض' : 'Riyadh' },
    { key: 'khobar', label: isAr ? 'الخبر' : 'Al Khobar' },
    { key: 'dammam', label: isAr ? 'الدمام' : 'Dammam' },
    { key: 'eastern', label: isAr ? 'الظهران' : 'Dhahran' },
  ];

  const types = [
    { key: 'all', label: isAr ? 'كافة الأنواع' : 'All Types' },
    { key: 'commercial', label: isAr ? 'تجاري ومكتبي' : 'Commercial' },
    { key: 'villa', label: isAr ? 'فلل وقصور' : 'Luxury Villas' },
    { key: 'penthouse', label: isAr ? 'بنتهاوس' : 'Penthouses' },
    { key: 'compound', label: isAr ? 'مجمعات استثمارية' : 'Compounds' },
  ];

  const filtered = realEstateListings.filter((prop) => {
    if (selectedCity !== 'all' && prop.city !== selectedCity) return false;
    if (selectedType !== 'all' && prop.type !== selectedType) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle =
        prop.titleAr.toLowerCase().includes(q) ||
        prop.titleEn.toLowerCase().includes(q);
      const matchCity =
        prop.cityNameAr.toLowerCase().includes(q) ||
        prop.cityNameEn.toLowerCase().includes(q);
      const matchType =
        prop.typeNameAr.toLowerCase().includes(q) ||
        prop.typeNameEn.toLowerCase().includes(q);
      if (!matchTitle && !matchCity && !matchType) return false;
    }
    return true;
  });

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title={isAr ? 'العقارات والصفقات المتاحة' : 'Verified Real Estate Listings'}
        subtitle={
          isAr
            ? 'تصفح محفظة الأصول العقارية الحصرية المرخصة رسمياً من الهيئة العامة للعقار برخصة فال 1200028472.'
            : 'Browse exclusive licensed properties across Riyadh and the Eastern Province under REGA/FAL accreditation.'
        }
        breadcrumb={[
          { label: isAr ? 'هارد للعقارات' : 'Hard Real Estate', href: '/realestate' },
          { label: isAr ? 'العقارات المتاحة' : 'Listings' },
        ]}
      />

      <section
        className={`py-16 sm:py-24 transition-colors ${
          isDark ? 'bg-[#030617] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Search & Filter Toolbar */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${
              isDark
                ? 'bg-[#080d2b] border-white/10'
                : 'bg-white border-slate-200'
            }`}
          >
            {/* Search Input */}
            <div className="relative">
              <Search
                className={`w-5 h-5 absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                  direction === 'rtl' ? 'right-4' : 'left-4'
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isAr
                    ? 'ابحث باسم العقار، الحي، أو نوع الأصل...'
                    : 'Search by property name, district, or type...'
                }
                className={`w-full py-3.5 rounded-2xl text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  direction === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'
                } ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            {/* City & Type Filter Pills */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
              {/* City Filter */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-blue-500 block">
                  {isAr ? 'المدينة / المنطقة' : 'City / Region'}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {cities.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setSelectedCity(c.key)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                        selectedCity === c.key
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                          : isDark
                          ? 'bg-white/5 text-gray-300 hover:text-white border-white/10'
                          : 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-blue-500 block">
                  {isAr ? 'نوع العقار' : 'Property Type'}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {types.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setSelectedType(t.key)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                        selectedType === t.key
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                          : isDark
                          ? 'bg-white/5 text-gray-300 hover:text-white border-white/10'
                          : 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results count & status */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-500/10 text-xs font-medium opacity-80">
              <span>
                {isAr
                  ? `عرض ${filtered.length} من أصل ${realEstateListings.length} عقار متوفر`
                  : `Showing ${filtered.length} of ${realEstateListings.length} verified listings`}
              </span>
              <span className="text-blue-500 font-bold">
                {isAr ? 'كافة الصكوك إلكترونية ومعتمدة' : 'All Title Deeds Electronically Verified'}
              </span>
            </div>
          </div>

          {/* Listings Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((prop) => {
              const propTitle = isAr ? prop.titleAr : prop.titleEn;
              const propCity = isAr ? prop.cityNameAr : prop.cityNameEn;
              const propType = isAr ? prop.typeNameAr : prop.typeNameEn;
              const propBadge = isAr ? prop.badgeAr : prop.badgeEn;
              const propDesc = isAr ? prop.descriptionAr : prop.descriptionEn;

              return (
                <div
                  key={prop.id}
                  className={`group rounded-3xl overflow-hidden border shadow-xl flex flex-col justify-between transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1.5 ${
                    isDark
                      ? 'bg-[#080d2b] border-white/10 hover:border-blue-500/50'
                      : 'bg-white border-slate-200 hover:border-blue-500 shadow-slate-200/50'
                  }`}
                >
                  <div>
                    {/* Image Header with Zoom */}
                    <Link
                      href={`/listings/${prop.slug}`}
                      className="relative block h-64 w-full overflow-hidden"
                    >
                      <Image
                        src={prop.image}
                        alt={propTitle}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Category Badge */}
                      <div
                        className={`absolute top-4 ${
                          direction === 'rtl' ? 'right-4' : 'left-4'
                        }`}
                      >
                        <span className="px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-md">
                          {propType}
                        </span>
                      </div>

                      {/* City location bottom */}
                      <div
                        className={`absolute bottom-3 ${
                          direction === 'rtl' ? 'right-4' : 'left-4'
                        } flex items-center gap-1.5 text-xs text-white drop-shadow font-medium`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        <span>{propCity}</span>
                      </div>
                    </Link>

                    {/* Card Content Details */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <span className="line-clamp-1">{propBadge}</span>
                      </div>

                      <h3
                        className={`text-xl font-extrabold tracking-tight line-clamp-1 transition-colors ${
                          isDark
                            ? 'text-white group-hover:text-blue-400'
                            : 'text-slate-900 group-hover:text-blue-600'
                        }`}
                      >
                        <Link href={`/listings/${prop.slug}`}>{propTitle}</Link>
                      </h3>

                      <p className="text-xs sm:text-sm opacity-80 line-clamp-2 leading-relaxed">
                        {propDesc}
                      </p>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-500/10 text-xs font-medium opacity-80">
                        <div>
                          <span className="opacity-70 block text-[10px]">{isAr ? 'المساحة' : 'Area'}</span>
                          <span className="font-bold text-white dark:text-white text-slate-900">{prop.area}</span>
                        </div>
                        <div>
                          <span className="opacity-70 block text-[10px]">{isAr ? 'المواصفة' : 'Rooms'}</span>
                          <span className="font-bold text-white dark:text-white text-slate-900">{prop.beds}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Price & Link */}
                  <div className="p-6 pt-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-blue-500">
                        {prop.price}
                      </span>
                      <span className="text-[11px] font-mono opacity-70">
                        فال {prop.falLicense}
                      </span>
                    </div>

                    <Link
                      href={`/listings/${prop.slug}`}
                      className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        isDark
                          ? 'bg-white/10 hover:bg-blue-600 text-white'
                          : 'bg-slate-900 hover:bg-blue-600 text-white'
                      }`}
                    >
                      <span>{isAr ? 'استعراض تفاصيل العقار' : 'View Property Details'}</span>
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

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20 space-y-4">
              <p className="text-lg opacity-80">
                {isAr
                  ? 'لم يتم العثور على عقارات مطابقة لمعايير البحث الحالية.'
                  : 'No properties found matching your search criteria.'}
              </p>
              <button
                onClick={() => {
                  setSelectedCity('all');
                  setSelectedType('all');
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-sm font-bold shadow-md cursor-pointer hover:bg-blue-500 transition-colors"
              >
                {isAr ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
              </button>
            </div>
          )}
        </div>
      </section>

      <MarqueeTicker
        labelKey="ticker.solutions"
        linkTextKey="footer.getQuote"
        linkHref="/contact-us"
        bgDark={true}
      />

      <Footer />
    </main>
  );
}
