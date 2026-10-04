'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Search,
  Filter,
  MapPin,
  Bed,
  Bath,
  Maximize,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Phone,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import ConsultationModal from '@/components/ConsultationModal';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { referenceProperties } from '@/data/reference-data';
import { getProperties, PropertyDoc } from '@/lib/firestore-service';

export default function RealEstatePropertiesPage() {
  const { language, theme, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const [dbProperties, setDbProperties] = useState<PropertyDoc[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'for-sale' | 'for-rent'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [consultationOpen, setConsultationOpen] = useState(false);

  useEffect(() => {
    getProperties().then((items) => {
      if (items.length > 0) setDbProperties(items);
    });
  }, []);

  // Combined properties (Firestore live properties + reference catalog)
  const displayProperties = dbProperties.length > 0
    ? dbProperties.filter(Boolean).map((p) => ({
        id: p?.id || '',
        title: isAr ? (p?.titleAr || p?.title || '') : (p?.title || p?.titleAr || ''),
        price: p?.price != null ? `${Number(p.price).toLocaleString()} ${isAr ? 'ريال' : 'SAR'}` : (isAr ? 'عند الطلب' : 'On Request'),
        type: p?.type || 'villa',
        status: p?.status || 'for-sale',
        area: p?.area ? `${p.area} م²` : '350 م²',
        location: isAr ? (p?.locationAr || p?.location || '') : (p?.location || p?.locationAr || ''),
        bedrooms: p?.bedrooms ?? 4,
        bathrooms: p?.bathrooms ?? 5,
        image: p?.image || '/images/hardgp/por4-big.jpg',
        featured: !!p?.featured,
      }))
    : referenceProperties.filter(Boolean).map((p) => ({
        id: p?.id || '',
        title: isAr ? p?.title?.ar : p?.title?.en,
        price: p?.price?.formattedSAR || `${p?.price?.sar?.toLocaleString() || ''} SAR`,
        type: isAr ? (p?.type === 'villa' || p?.type === 'Villa' ? 'فيلا فاخرة' : 'شقة دوبلكس') : p?.type || 'Villa',
        status: p?.status || 'for-sale',
        area: `${p?.areaSqM ?? 350} م²`,
        location: isAr ? (p?.location?.city?.ar || '') : (p?.location?.city?.en || ''),
        bedrooms: p?.bedrooms ?? 4,
        bathrooms: p?.bathrooms ?? 5,
        image: p?.images?.[0] || '/images/hardgp/por4-big.jpg',
        featured: !!p?.featured,
      }));

  const filtered = displayProperties.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (filterType !== 'all' && !p.type.toLowerCase().includes(filterType.toLowerCase())) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <main className={`min-h-screen ${isDark ? 'bg-[#030617] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar />

      {/* Header Banner & Breadcrumbs */}
      <section className={`pt-32 pb-12 px-4 sm:px-6 lg:px-8 border-b ${isDark ? 'bg-[#080d2b]/60 border-white/10' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs opacity-75">
              <Link href="/" className="hover:text-blue-500">{isAr ? 'الرئيسية' : 'Home'}</Link>
              <span>/</span>
              <Link href="/realestate" className="hover:text-blue-500">{isAr ? 'هارد للعقارات' : 'HARD Real Estate'}</Link>
              <span>/</span>
              <span className="font-bold text-blue-500">{isAr ? 'قائمة العقارات والوحدات' : 'Properties Catalog'}</span>
            </div>

            <BackButton fallbackUrl="/realestate" labelAr="العودة لقسم العقارات" labelEn="Back to Real Estate" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                {isAr ? 'رخصة فال للوساطة والتسويق 1200028472' : 'Licensed Real Estate Brokerage'}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                {isAr ? 'العقارات والوحدات الفاخرة المتاحة' : 'Available Luxury Properties'}
              </h1>
              <p className="text-sm sm:text-base opacity-75 max-w-2xl mt-2">
                {isAr
                  ? 'استكشف نخبة القصور والفلل والمجمعات السكنية والتجارية المعتمدة برخص وساطة وتسويق نظامية في المنطقة الشرقية والرياض.'
                  : 'Explore certified luxury villas, waterfront mansions, and commercial compounds in Khobar, Dammam, and Riyadh.'}
              </p>
            </div>

            <button
              onClick={() => setConsultationOpen(true)}
              className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 cursor-pointer self-start md:self-auto shrink-0"
            >
              {isAr ? 'طلب وساطة أو تسويق عقارك' : 'List or Request a Property'}
            </button>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div
          className={`p-4 sm:p-5 rounded-2xl border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 ${
            isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
          }`}
        >
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'بحث بالحي، المدينة، أو نوع العقار...' : 'Search location, city, type...'}
              className="w-full pr-9 pl-4 py-2.5 rounded-xl border text-xs bg-transparent focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Status filters */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {(['all', 'for-sale', 'for-rent'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isDark
                    ? 'bg-white/5 hover:bg-white/10 text-slate-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {st === 'all' ? (isAr ? 'كافة الحالات' : 'All') : st === 'for-sale' ? (isAr ? 'عقارات للبيع' : 'For Sale') : (isAr ? 'عقارات للإيجار' : 'For Rent')}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs opacity-75">
          <span>{isAr ? `تم العثور على ${filtered.length} عقار متطابق` : `Showing ${filtered.length} properties`}</span>
          <Link href="/realestate/fal-license" className="text-blue-500 font-bold hover:underline flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAr ? 'الاطلاع على تراخيص فال والتأهيل النظامي ←' : 'View FAL License & Accreditations →'}</span>
          </Link>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <div
              key={property.id}
              className={`rounded-3xl border overflow-hidden shadow-xl flex flex-col justify-between transition-all hover:-translate-y-1 ${
                isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <div className="relative h-60 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
                      {property.status === 'for-sale' ? (isAr ? 'للبيع' : 'For Sale') : (isAr ? 'للإيجار' : 'For Rent')}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-white border border-white/20">
                    {property.area}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-blue-500 uppercase">{property.type}</span>
                    <span className="text-xs font-black text-emerald-500">{property.price}</span>
                  </div>

                  <h3 className="text-base font-black line-clamp-1">{property.title}</h3>

                  <div className="flex items-center gap-1.5 text-xs opacity-70">
                    <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-500/10 flex items-center justify-between text-xs opacity-75">
                    <span className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5" />
                      <span>{property.bedrooms} {isAr ? 'غرف' : 'Beds'}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5" />
                      <span>{property.bathrooms} {isAr ? 'حمامات' : 'Baths'}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize className="w-3.5 h-3.5" />
                      <span>{property.area}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white border border-blue-500/20 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{isAr ? 'طلب معاينة أو حجز' : 'Schedule Viewing'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultService={isAr ? 'استشارات وشراء العقارات المعتمدة' : 'Real Estate Acquisition'}
      />

      <Footer />
    </main>
  );
}
