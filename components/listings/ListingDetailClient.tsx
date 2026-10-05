'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ConsultationModal from '@/components/ConsultationModal';
import SocialShare from '@/components/SocialShare';
import MarqueeTicker from '@/components/MarqueeTicker';
import { RealEstateListingItem } from '@/data/listings-data';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  MapPin,
  ShieldCheck,
  Building,
  CheckCircle2,
  Calendar,
  Phone,
  MessageCircle,
  FileText,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Layers,
  Compass,
  Maximize2,
  ExternalLink,
} from 'lucide-react';

interface ListingDetailClientProps {
  listing: RealEstateListingItem;
  relatedListings: RealEstateListingItem[];
}

export default function ListingDetailClient({
  listing,
  relatedListings,
}: ListingDetailClientProps) {
  const { language, theme, direction } = useLanguageTheme();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  const title = isAr ? listing.titleAr : listing.titleEn;
  const description = isAr ? listing.descriptionAr : listing.descriptionEn;
  const cityName = isAr ? listing.cityNameAr : listing.cityNameEn;
  const districtName = isAr ? listing.districtAr : listing.districtEn;
  const typeName = isAr ? listing.typeNameAr : listing.typeNameEn;
  const statusName = isAr ? listing.statusNameAr : listing.statusNameEn;
  const badge = isAr ? listing.badgeAr : listing.badgeEn;
  const longOverview = isAr ? listing.longOverviewAr : listing.longOverviewEn;
  const features = isAr ? listing.featuresAr : listing.featuresEn;

  // Pre-filled WhatsApp link for direct instant conversion
  const whatsappMessage = encodeURIComponent(
    isAr
      ? `السلام عليكم، أود الاستفسار عن تفاصيل وحجز معاينة للعقار: "${listing.titleAr}" (رمز العقار: ${listing.id})، المعروض عبر هارد للعقارات برخصة فال: ${listing.falLicense}.`
      : `Hello, I would like to inquire about and arrange a viewing for: "${listing.titleEn}" (ID: ${listing.id}), listed via Hard Real Estate under FAL License: ${listing.falLicense}.`
  );
  const whatsappUrl = `https://wa.me/966508000000?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen">
      {/* Sticky Luxury Navbar */}
      <Navbar />

      {/* Page Header with SEO Breadcrumbs */}
      <PageHeader
        title={title}
        subtitle={`${typeName} • ${cityName} • ${isAr ? 'مرخص رسمياً برخصة فال' : 'Licensed by REGA / FAL'}`}
        breadcrumb={[
          { label: isAr ? 'هارد للعقارات' : 'Hard Real Estate', href: '/realestate' },
          { label: isAr ? 'العقارات المتاحة' : 'Listings', href: '/listings' },
          { label: title },
        ]}
      />

      {/* Main Property Detail Content */}
      <section
        className={`py-12 sm:py-20 transition-colors ${
          isDark ? 'bg-[#030617] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Quick Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-gray-500/15">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-blue-600/30">
                {typeName}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                {badge}
              </span>
              <span
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-gray-300'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                {statusName}
              </span>
            </div>

            {/* Official FAL License Indicator */}
            <div className="flex items-center gap-2 text-xs font-bold text-blue-500">
              <BadgeCheck className="w-4 h-4 text-blue-500" />
              <span>{isAr ? 'ترخيص الهيئة العامة للعقار (فال):' : 'REGA FAL License:'}</span>
              <span className="text-white bg-blue-600 px-2 py-0.5 rounded font-mono text-[11px]">
                {listing.falLicense}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left 8 Columns: Imagery, Narrative & Specifications */}
            <div className="lg:col-span-8 space-y-10">
              {/* Media Gallery with Active Image Selector */}
              <div className="space-y-4">
                <div
                  className={`relative h-[380px] sm:h-[500px] w-full rounded-3xl overflow-hidden border shadow-2xl ${
                    isDark ? 'border-white/15 bg-black/40' : 'border-slate-300 bg-slate-200'
                  }`}
                >
                  <Image
                    src={listing.gallery[selectedImageIndex] || listing.image}
                    alt={`${title} - Gallery Photo ${selectedImageIndex + 1}`}
                    fill
                    priority
                    unoptimized
                    className="object-cover transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top-Right Location Overlay */}
                  <div
                    className={`absolute top-4 ${
                      direction === 'rtl' ? 'right-4' : 'left-4'
                    } flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold`}
                  >
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{cityName}</span>
                  </div>

                  {/* Bottom Counter */}
                  <div
                    className={`absolute bottom-4 ${
                      direction === 'rtl' ? 'left-4' : 'right-4'
                    } px-3 py-1 rounded-full bg-black/80 text-white text-xs font-mono font-bold backdrop-blur-md`}
                  >
                    {selectedImageIndex + 1} / {listing.gallery.length}
                  </div>
                </div>

                {/* Thumbnails Row */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {listing.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-24 sm:w-28 h-18 sm:h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-blue-500 shadow-md shadow-blue-500/30 scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Key Specs Matrix Strip */}
              <div
                className={`grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-3xl border ${
                  isDark
                    ? 'bg-[#080d2b] border-white/10'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider opacity-70 block font-semibold">
                    {isAr ? 'المساحة الكلية' : 'Total Area'}
                  </span>
                  <span className="text-lg sm:text-xl font-black text-blue-500 block">
                    {listing.area}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider opacity-70 block font-semibold">
                    {isAr ? 'المواصفة السكنية/المكتبية' : 'Units / Rooms'}
                  </span>
                  <span className="text-lg sm:text-xl font-black text-white dark:text-white text-slate-900 block">
                    {listing.beds}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider opacity-70 block font-semibold">
                    {isAr ? 'دورات المياه' : 'Bathrooms'}
                  </span>
                  <span className="text-lg sm:text-xl font-black text-white dark:text-white text-slate-900 block">
                    {listing.baths}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider opacity-70 block font-semibold">
                    {isAr ? 'مواقف السيارات' : 'Parking Bays'}
                  </span>
                  <span className="text-lg sm:text-xl font-black text-white dark:text-white text-slate-900 block">
                    {listing.parking}
                  </span>
                </div>
              </div>

              {/* Comprehensive Description & Architectural Narrative */}
              <div
                className={`p-7 sm:p-9 rounded-3xl border space-y-6 ${
                  isDark
                    ? 'bg-[#080d2b] border-white/10'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold text-blue-500 tracking-wider">
                    {isAr ? 'نظرة عامة موثقة' : 'Comprehensive Overview'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {title}
                  </h2>
                </div>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed opacity-90 font-normal">
                  {longOverview.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Features & Engineering Highlights */}
              <div
                className={`p-7 sm:p-9 rounded-3xl border space-y-6 ${
                  isDark
                    ? 'bg-[#080d2b] border-white/10'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold text-blue-500 tracking-wider">
                    {isAr ? 'الميزات والضمانات الإنشائية' : 'Features & Warranties'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold">
                    {isAr ? 'مواصفات وتجهيزات العقار المعتمدة' : 'Verified Property Amenities'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-500/5 border border-blue-500/15"
                    >
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold leading-relaxed">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div
                className={`p-7 sm:p-9 rounded-3xl border space-y-6 ${
                  isDark
                    ? 'bg-[#080d2b] border-white/10'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold text-blue-500 tracking-wider">
                    {isAr ? 'البيانات الفنية والنظامية' : 'Technical Specifications'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold">
                    {isAr ? 'سجل البيانات الرسمية للعقار' : 'Official Property Specifications'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {listing.specs.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border text-xs sm:text-sm ${
                        isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <span className="opacity-70 font-medium">
                        {isAr ? item.labelAr : item.labelEn}
                      </span>
                      <span className="font-bold text-blue-500">
                        {isAr ? item.valueAr : item.valueEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media Sharing Component */}
              <SocialShare
                title={title}
                description={description}
                contentType="property"
                className="mt-8"
              />
            </div>

            {/* Right 4 Columns: Price Card, Booking & Regulatory Trust */}
            <div className="lg:col-span-4 space-y-8">
              {/* Sticky Price & Instant Action Box */}
              <div
                className={`p-7 sm:p-8 rounded-3xl border sticky top-28 shadow-2xl space-y-6 ${
                  isDark
                    ? 'bg-[#080d2b] border-white/15 shadow-black/50'
                    : 'bg-white border-slate-200 shadow-xl'
                }`}
              >
                {/* Price Display */}
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold opacity-75 block mb-1">
                    {isAr ? 'السعر المطلوب' : 'Asking Price'}
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-blue-500 tracking-tight">
                    {listing.price}
                  </div>
                  <span className="text-xs opacity-70 block mt-1">
                    {isAr
                      ? 'يشمل التحقق المالي وتوثيق الصك الإلكتروني'
                      : 'Includes title deed verification & legal handover'}
                  </span>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{isAr ? 'حجز موعد معاينة خاصة' : 'Schedule Private Viewing'}</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isAr ? 'محادثة مباشرة عبر واتساب' : 'WhatsApp Broker Direct'}</span>
                  </a>

                  <a
                    href="tel:966508000000"
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm border transition-all ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>{isAr ? 'الاتصال بالمستشار العقاري' : 'Call Certified Broker'}</span>
                  </a>
                </div>

                {/* Verified Government Accreditation Box */}
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black text-blue-400">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>{isAr ? 'معلومات التوثيق النظامي (فال)' : 'Regulatory Authority'}</span>
                  </div>
                  <div className="space-y-1 text-xs opacity-90">
                    <div className="flex justify-between">
                      <span className="opacity-70">{isAr ? 'رخصة الوساطة والتسويق:' : 'FAL License:'}</span>
                      <span className="font-mono font-bold text-blue-400">{listing.falLicense}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">{isAr ? 'رقم الإعلان العقاري:' : 'Ad Number:'}</span>
                      <span className="font-mono font-bold">{listing.advertisementNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">{isAr ? 'رقم وثيقة الملكية:' : 'Title Deed ID:'}</span>
                      <span className="font-mono font-bold">{listing.titleDeedNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Interlinked Cross-Division Integration */}
                <div className="pt-2 border-t border-gray-500/10 space-y-3">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-blue-500 block">
                    {isAr ? 'خدمات الدعم المتكاملة من هارد' : 'Hard Integrated Services'}
                  </span>
                  <div className="space-y-2 text-xs">
                    <Link
                      href="/hvac"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-blue-600/20 transition-colors group"
                    >
                      <span>{isAr ? 'عقود الصيانة والتكييف (AMC)' : 'HVAC & Maintenance AMC'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                    </Link>
                    <Link
                      href="/construction"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-blue-600/20 transition-colors group"
                    >
                      <span>{isAr ? 'كود البناء والإنشاءات (SBC)' : 'Construction & Contracting'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interlinked Related Listings (SEO Internal Linking & Exploration) */}
          {relatedListings.length > 0 && (
            <div className="mt-20 pt-16 border-t border-gray-500/15 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-blue-500 tracking-wider">
                    {isAr ? 'فرص استثمارية مماثلة' : 'Related Listings'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {isAr
                      ? `عقارات مميزة في ${cityName}`
                      : `Recommended Properties in ${cityName}`}
                  </h3>
                </div>
                <Link
                  href="/realestate"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-500 hover:text-blue-400"
                >
                  <span>{isAr ? 'عرض كافة العقارات المتاحة' : 'View All Real Estate'}</span>
                  <ChevronLeft className={`w-4 h-4 ${direction === 'ltr' ? 'rotate-180' : ''}`} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedListings.map((rel) => {
                  const relTitle = isAr ? rel.titleAr : rel.titleEn;
                  const relType = isAr ? rel.typeNameAr : rel.typeNameEn;
                  const relCity = isAr ? rel.cityNameAr : rel.cityNameEn;

                  return (
                    <Link
                      key={rel.id}
                      href={`/listings/${rel.slug}`}
                      className={`group relative rounded-3xl overflow-hidden border shadow-lg transition-all duration-300 hover:-translate-y-1.5 ${
                        isDark
                          ? 'bg-[#080d2b] border-white/10 hover:border-blue-500/50'
                          : 'bg-white border-slate-200 hover:border-blue-500 shadow-slate-200/50'
                      }`}
                    >
                      <div className="relative h-56 w-full overflow-hidden">
                        <Image
                          src={rel.image}
                          alt={relTitle}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div
                          className={`absolute top-3 ${
                            direction === 'rtl' ? 'right-3' : 'left-3'
                          }`}
                        >
                          <span className="px-3 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-bold">
                            {relType}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-1 text-xs opacity-75">
                          <MapPin className="w-3.5 h-3.5 text-blue-500" />
                          <span className="line-clamp-1">{relCity}</span>
                        </div>

                        <h4
                          className={`text-lg font-bold tracking-tight line-clamp-1 group-hover:text-blue-500 transition-colors ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {relTitle}
                        </h4>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-500/10">
                          <span className="text-base font-black text-blue-500">
                            {rel.price}
                          </span>
                          <span className="text-xs font-semibold opacity-70">
                            {rel.area}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Marquee Ticker */}
      <MarqueeTicker
        labelKey="ticker.solutions"
        linkTextKey="footer.getQuote"
        linkHref="/contact-us"
        bgDark={true}
      />

      {/* Footer */}
      <Footer />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </main>
  );
}
