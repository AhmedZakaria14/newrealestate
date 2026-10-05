'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { referenceProperties } from '@/data/reference-data';
import { useSiteContent } from '@/lib/site-content-context';

export default function FeaturedPropertiesSection() {
  const { language, direction } = useLanguageTheme();
  const { properties, settings } = useSiteContent();
  const [activeTab, setActiveTab] = useState<string>('all');
  const isAr = language === 'ar';

  const filterTabs = [
    { key: 'all', label: isAr ? 'كافة العقارات' : 'All Properties' },
    { key: 'for-sale', label: isAr ? 'متاح للبيع' : 'For Sale' },
    { key: 'for-rent', label: isAr ? 'متاح للإيجار' : 'For Rent' },
    { key: 'penthouse', label: isAr ? 'بنتهاوس' : 'Penthouses' },
    { key: 'villa', label: isAr ? 'فلل وقصور' : 'Luxury Villas' },
    { key: 'apartment', label: isAr ? 'شقق فندقية' : 'Apartments' },
  ];

  // Combine live properties from Firestore or fallback to referenceProperties
  const combinedProperties = React.useMemo(() => {
    if (properties && properties.length > 0) {
      const liveConverted = properties.map((p) => {
        const typeNorm =
          p.type?.toLowerCase().includes('بنتهاوس') || p.type?.toLowerCase().includes('penthouse')
            ? 'penthouse'
            : p.type?.toLowerCase().includes('فيلا') || p.type?.toLowerCase().includes('villa') || p.type?.toLowerCase().includes('قصر')
            ? 'villa'
            : 'apartment';

        return {
          id: p.id || `prop-${Math.random()}`,
          slug: p.id || 'luxury-property',
          title: { ar: p.titleAr || p.title, en: p.title || p.titleAr },
          type: typeNorm,
          status: p.status || 'for-sale',
          price: { sar: p.price, formattedSAR: `${p.price?.toLocaleString()} ر.س` },
          areaSqM: p.area || 450,
          areaSqFt: Math.round((p.area || 450) * 10.764),
          location: {
            city: { ar: p.locationAr?.split('،')?.[0] || 'الخُبر', en: p.location?.split(',')?.[0] || 'Al Khobar' },
            area: { ar: p.locationAr || 'المنطقة الشرقية', en: p.location || 'Eastern Province' },
          },
          bedrooms: p.bedrooms || 4,
          bathrooms: p.bathrooms || 5,
          images: [p.image || '/images/hardgp/por4-big.jpg'],
        };
      });
      return liveConverted;
    }
    return referenceProperties;
  }, [properties]);

  const filtered = combinedProperties.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'for-sale' && item.status === 'for-sale') return true;
    if (activeTab === 'for-rent' && item.status === 'for-rent') return true;
    if (item.type === activeTab) return true;
    return false;
  });

  return (
    <section
      id="featured-properties"
      className="bg-black py-20 sm:py-28 text-[#E1E0CC] border-t border-[#222222]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-14">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block text-xs uppercase tracking-widest font-semibold text-[#DEDBC8] px-3.5 py-1 rounded-full bg-[#181818] border border-[#2a2a2a]">
              {isAr ? 'عقارات حصرية معتمدة' : 'Exclusive Portfolio'}
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {isAr
                ? (settings.sectionTitles?.propertiesAr || 'فرص استثمارية وعقارات مميزة')
                : (settings.sectionTitles?.propertiesEn || 'Featured Investment Properties')}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
              {isAr
                ? (settings.sectionTitles?.propertiesSubtitleAr || 'مجموعة منتقاة من الفلل الفارهة، والشقق المطلة على البحر، والمباني التجارية ذات العوائد المجزية الجاهزة للتملك.')
                : (settings.sectionTitles?.propertiesSubtitleEn || 'Hand-picked luxury residences, premium waterfront developments, and high-yield commercial properties ready for immediate acquisition.')}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                  activeTab === tab.key
                    ? 'bg-[#222222] text-[#DEDBC8] border-[#383838] shadow-sm'
                    : 'bg-[#101010] text-gray-400 hover:text-white border-[#222222]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.slice(0, 6).map((prop) => {
            const title = isAr ? prop.title?.ar || prop.title?.en : prop.title?.en || prop.title?.ar;
            const city = isAr ? prop.location?.city?.ar || prop.location?.city?.en : prop.location?.city?.en || prop.location?.city?.ar;
            const areaName = isAr ? prop.location?.area?.ar || prop.location?.area?.en : prop.location?.area?.en || prop.location?.area?.ar;
            const statusLabel =
              prop.status === 'for-sale'
                ? isAr ? 'للبيع' : 'For Sale'
                : isAr ? 'للإيجار' : 'For Rent';
            const priceDisplay = prop.price?.formattedSAR || (prop.price?.sar ? `${prop.price.sar.toLocaleString()} SAR` : '');
            const bedroomsCount = prop.bedrooms ?? 0;
            const bathroomsCount = prop.bathrooms ?? 0;
            const areaDisplay = prop.areaSqM ? `${prop.areaSqM.toLocaleString()} م²` : (prop.areaSqFt ? `${prop.areaSqFt.toLocaleString()} sqft` : '');
            const imageSrc = prop.images?.[0] || '/images/hardgp/por4-big.jpg';

            return (
              <div
                key={prop.id}
                className="group rounded-3xl overflow-hidden border border-[#222222] bg-[#101010] flex flex-col justify-between transition-all duration-300 hover:border-[#383838] hover:-translate-y-1 shadow-2xl"
              >
                <div>
                  {/* Media Header */}
                  <Link
                    href={`/listings/${prop.slug}`}
                    className="relative block h-60 sm:h-64 w-full overflow-hidden"
                  >
                    <Image
                      src={imageSrc}
                      alt={title || ''}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    {/* Top Badges */}
                    <div
                      className={`absolute top-3.5 ${
                        direction === 'rtl' ? 'right-3.5' : 'left-3.5'
                      } flex items-center gap-2`}
                    >
                      <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#333] text-[#DEDBC8] text-[11px] font-bold">
                        {statusLabel}
                      </span>
                      {prop.type && (
                        <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-gray-400 border border-[#262626]">
                          {prop.type.toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Location Badge on Image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <div className="flex items-center gap-1.5 drop-shadow-md">
                        <MapPin className="w-3.5 h-3.5 text-[#DEDBC8]" />
                        <span className="font-medium text-xs">{areaName}، {city}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#DEDBC8] drop-shadow-md">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{isAr ? 'مرخص فال' : 'VAL'}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div>
                      <Link href={`/listings/${prop.slug}`}>
                        <h3 className="text-base sm:text-lg font-bold text-[#E1E0CC] hover:text-white transition-colors line-clamp-1">
                          {title}
                        </h3>
                      </Link>
                    </div>

                    {/* Specs Row */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#1e1e1e] text-xs text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-[#DEDBC8]" />
                        <span>{bedroomsCount > 0 ? `${bedroomsCount} ${isAr ? 'غرف' : 'Beds'}` : (isAr ? 'مفتوح' : 'Open')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-3.5 h-3.5 text-[#DEDBC8]" />
                        <span>{bathroomsCount > 0 ? `${bathroomsCount} ${isAr ? 'حمام' : 'Baths'}` : (isAr ? 'مرافق' : 'Amenities')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-[#DEDBC8]" />
                        <span>{areaDisplay || '—'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & CTA */}
                <div className="p-5 sm:p-6 pt-0 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase tracking-wider">
                      {isAr ? 'السعر التقديري' : 'Starting Price'}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#DEDBC8]">
                      {priceDisplay}
                    </span>
                  </div>

                  <Link
                    href={`/listings/${prop.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1c1c1c] hover:bg-[#252525] text-[#DEDBC8] font-semibold text-xs border border-[#2e2e2e] transition-colors"
                  >
                    <span>{isAr ? 'التفاصيل' : 'Details'}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141414] hover:bg-[#1c1c1c] text-[#DEDBC8] font-semibold text-xs sm:text-sm border border-[#2a2a2a] transition-all"
          >
            <span>{isAr ? 'استعراض كافة العقارات والمشاريع المتاحة' : 'View Full Real Estate Portfolio'}</span>
            <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
          </Link>
        </div>
      </div>
    </section>
  );
}
