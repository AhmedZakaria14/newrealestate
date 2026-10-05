'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowUpRight,
  TrendingUp,
  FileCheck2,
  Building,
  Home,
  Briefcase,
  Search,
  Filter,
  DollarSign,
  Maximize2,
  Bath,
  Bed,
  Car,
  Clock,
  Send,
  Crown,
  Users,
  Compass,
  Award,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { realEstateListings } from '@/data/listings-data';
import ServiceCardsList from '@/components/services/ServiceCardsList';

export default function RealEstatePortal() {
  const { theme, language, direction } = useLanguageTheme();
  const isDark = theme === 'dark';
  const isRtl = direction === 'rtl';

  // Search & Filter state
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form submission state
  const [formType, setFormType] = useState<'request' | 'list'>('request');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('HRD-842917');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'riyadh',
    propertyType: 'villa',
    budget: '3m_6m',
    notes: '',
  });

  // Client Specialization items matching source
  const clientSpecializations = [
    {
      icon: Home,
      titleAr: 'المشترون لأول مرة',
      titleEn: 'First-Time Buyers',
      descAr: 'إرشاد وتوجيه خطوة بخطوة، مع تسهيلات تمويلية، وإجراءات ميسرة بدون تعقيد لاختيار المسكن المثالي.',
      descEn: 'Step-by-step guidance, mortgage assistance, and streamlined paperwork for your ideal starter home.',
      badgeAr: 'تسهيلات ميسرة',
      badgeEn: 'Guided Support',
    },
    {
      icon: Crown,
      titleAr: 'عشاق العقارات الفاخرة',
      titleEn: 'Luxury Connoisseurs',
      descAr: 'بنتهاوس استثنائية، وفلل شاطئية خاصة، وتحف معمارية في أرقى الوجهات بالرياض والخبر مع خصوصية تامة.',
      descEn: 'Exclusive penthouses, private waterfront villas, and bespoke architectural masterpieces.',
      badgeAr: 'عقارات حصرية',
      badgeEn: 'Bespoke Luxury',
    },
    {
      icon: TrendingUp,
      titleAr: 'المستثمرون والشركات',
      titleEn: 'Investors & Institutions',
      descAr: 'إدارة محافظ استثمارية كبرى، استحواذ على أراضٍ وأبراج تجارية، وعوائد رأسمالية وتأجيرية مجزية.',
      descEn: 'Major investment portfolio management, commercial acquisitions, and high-yield asset strategy.',
      badgeAr: 'عوائد مرتفعة',
      badgeEn: 'High Yield',
    },
    {
      icon: Building,
      titleAr: 'ملاك العقارات والبائعون',
      titleEn: 'Property Owners & Sellers',
      descAr: 'حملات تسويقية متقدمة تصل لكبار المشترين، وتقييمات دقيقة لبيع عقارك بأفضل قيمة سوقية وبسرعة.',
      descEn: 'Advanced marketing campaigns targeting verified buyers and precise valuation for peak market value.',
      badgeAr: 'تسويق معتمد',
      badgeEn: 'Verified Reach',
    },
    {
      icon: Briefcase,
      titleAr: 'مستأجرو المنازل والمكاتب',
      titleEn: 'Executive Tenants',
      descAr: 'خيارات إيجار موثقة ومعتمدة عبر منصة إيجار، وعقود إلكترونية شفافة، ودعم مستمر في أرقى الأحياء.',
      descEn: 'Certified lease contracts, transparent terms, and ongoing tenancy support in prime districts.',
      badgeAr: 'عقود موثقة',
      badgeEn: 'Verified Lease',
    },
  ];

  // Centralized verified property inventory from data/listings-data.ts
  const allProperties = realEstateListings;

  // Filter properties
  const filteredProperties = allProperties.filter((prop) => {
    if (selectedCity !== 'all' && prop.city !== selectedCity) return false;
    if (selectedType !== 'all' && prop.type !== selectedType) return false;
    if (selectedStatus !== 'all' && prop.status !== selectedStatus) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchAr = prop.titleAr.toLowerCase().includes(q) || prop.cityNameAr.toLowerCase().includes(q);
      const matchEn = prop.titleEn.toLowerCase().includes(q) || prop.cityNameEn.toLowerCase().includes(q);
      if (!matchAr && !matchEn) return false;
    }
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReferenceCode(`HRD-${Math.floor(100000 + Math.random() * 900000)}`);
    setFormSubmitted(true);
  };

  return (
    <main className="min-h-screen">
      {/* 1. Unified Holding Navbar */}
      <Navbar />

      {/* 2. Standalone Hero Section with Deep Luxury Styling */}
      <section
        id="home"
        className={`relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden transition-colors ${
          isDark ? 'bg-[#040618] text-white' : 'bg-slate-900 text-white'
        }`}
      >
        {/* Background ambient lighting */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hardgp/por4-big.jpg"
            alt="هارد للعقارات"
            fill
            priority
            className="object-cover object-center opacity-30 filter brightness-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040618]/90 via-[#040618]/70 to-[#040618]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold border border-blue-400/30 bg-blue-500/10 text-blue-300 backdrop-blur-md shadow-lg">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>
                {language === 'ar'
                  ? 'الذراع العقاري الرائد في المملكة العربية السعودية – ترخيص فال'
                  : 'Premier Real Estate Marketing & Brokerage Arm (VAL License)'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              {language === 'ar' ? (
                <>
                  هارد للعقارات{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-sky-300 to-blue-400">
                    الريادة في الوساطة والتسويق
                  </span>
                </>
              ) : (
                <>
                  HARD Real Estate{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-sky-300 to-blue-400">
                    Premier Marketing & Brokerage
                  </span>
                </>
              )}
            </h1>

            {/* Exact User Text */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed font-normal max-w-3xl mx-auto">
              {language === 'ar'
                ? 'الذراع العقاري الرائد في المملكة العربية السعودية، متخصص في التسويق والوساطة المعتمدة من الهيئة العامة للعقار (فال)، وإدارة المحافظ الاستثمارية الكبرى في المنطقة الشرقية والرياض.'
                : 'The leading real estate arm in the Kingdom of Saudi Arabia, specialized in marketing and brokerage certified by the General Real Estate Authority (VAL), and managing major investment portfolios in the Eastern Province and Riyadh.'}
            </p>

            {/* Proven Regulatory & Geographical Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-3xl mx-auto">
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
                <span className="block text-xl lg:text-2xl font-black text-blue-400">1200028472</span>
                <span className="text-xs text-slate-300 mt-1 block">
                  {language === 'ar' ? 'رخصة فال المعتمدة' : 'FAL License No.'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
                <span className="block text-xl lg:text-2xl font-black text-blue-400">
                  {language === 'ar' ? 'هيئة العقار' : 'REGA'}
                </span>
                <span className="text-xs text-slate-300 mt-1 block">
                  {language === 'ar' ? 'وساطة وتسويق نظامي' : 'Official Authority'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
                <span className="block text-xl lg:text-2xl font-black text-cyan-300">
                  {language === 'ar' ? 'إيجار ومُلاّك' : 'Ejar & Mullak'}
                </span>
                <span className="text-xs text-slate-300 mt-1 block">
                  {language === 'ar' ? 'عقود إلكترونية موثقة' : 'Verified Contracts'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
                <span className="block text-xl lg:text-2xl font-black text-white">الرياض & الشرقية</span>
                <span className="text-xs text-slate-300 mt-1 block">
                  {language === 'ar' ? 'تغطية جغرافية كبرى' : 'Prime Coverage'}
                </span>
              </div>
            </div>

            {/* Quick Action CTA buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="#property-search"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white hover:brightness-105 active:scale-[0.98] transition-all shadow-xl shadow-blue-500/10 cursor-pointer"
              >
                <span>{language === 'ar' ? 'تصفح المحفظة والعقارات المعتمدة' : 'Explore Verified Inventory'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#list-request-form"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-md transition-colors"
              >
                <FileCheck2 className="w-4 h-4 text-blue-400" />
                <span>{language === 'ar' ? 'أدرج أو اطلب عقارك' : 'List or Request Property'}</span>
              </a>
            </div>
          </div>

          {/* Interactive Property Search & Filter Bar */}
          <div
            id="property-search"
            className="mt-14 p-5 sm:p-6 rounded-3xl bg-[#080d2b]/90 border border-blue-500/20 backdrop-blur-xl shadow-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Keyword / Name Search */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {language === 'ar' ? 'البحث بالاسم أو الحي' : 'Search by Keyword or District'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: العليا، الخبر، النرجس...' : 'e.g. Olaya, Khobar...'}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-400 text-sm focus:border-blue-400 outline-none"
                  />
                  <Search className="w-4 h-4 text-slate-300 absolute top-3 left-3 rtl:left-auto rtl:right-3 pointer-events-none" />
                </div>
              </div>

              {/* City Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {language === 'ar' ? 'المدينة / المنطقة' : 'City / Region'}
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-blue-400 outline-none"
                >
                  <option value="all" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'جميع المدن (الرياض & الشرقية)' : 'All Cities'}</option>
                  <option value="riyadh" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'الرياض' : 'Riyadh'}</option>
                  <option value="khobar" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'الخبر' : 'Al Khobar'}</option>
                  <option value="dammam" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'الدمام' : 'Dammam'}</option>
                  <option value="eastern" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'الظهران وباقي الشرقية' : 'Dhahran & Eastern'}</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {language === 'ar' ? 'نوع العقار' : 'Property Type'}
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-blue-400 outline-none"
                >
                  <option value="all" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'جميع الأنواع' : 'All Types'}</option>
                  <option value="commercial" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'أبراج ومكاتب تجارية' : 'Commercial Towers & Offices'}</option>
                  <option value="villa" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'فلل وقصور فاخرة' : 'Luxury Villas'}</option>
                  <option value="penthouse" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'بنتهاوس وشقق راقية' : 'Penthouses'}</option>
                  <option value="compound" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'مجمعات سكنية ومحافظ' : 'Compounds & Portfolios'}</option>
                </select>
              </div>

              {/* Offer Status */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {language === 'ar' ? 'حالة العرض' : 'Listing Status'}
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-blue-400 outline-none"
                >
                  <option value="all" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'جميع الحالات' : 'All Listings'}</option>
                  <option value="sale" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'متاح للبيع والتملك' : 'For Sale'}</option>
                  <option value="exclusive" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'صفقات حصرية' : 'Exclusive Deals'}</option>
                  <option value="portfolio" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'محافظ استثمارية كبرى' : 'Investment Portfolios'}</option>
                  <option value="rent" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'عقود إيجار معتمدة' : 'For Lease'}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Client Specialization Pillars (matching source) */}
      <section
        id="about-realestate"
        className={`py-16 md:py-24 border-t ${
          isDark ? 'bg-[#060a22] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider block mb-2">
              {language === 'ar' ? 'حلول عقارية متكاملة تلبي تطلعات كل عميل' : 'Tailored Real Estate Solutions'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {language === 'ar' ? 'تخصصات وخدمات عملاء هارد للعقارات' : 'Client Categories & Specializations'}
            </h2>
            <p className={`text-sm sm:text-base mt-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'ar'
                ? 'سواء كنت تشتري منزلك الأول أو تبني محفظة استثمارية كبرى، صممنا خدماتنا لتضمن تحقيق أعلى عائد وأفضل جودة وأمان تعاقدي.'
                : 'Whether acquiring your first residence or structuring an institutional portfolio, our services maximize returns and legal security.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {clientSpecializations.map((spec, sIdx) => {
              const Icon = spec.icon;
              return (
                <div
                  key={sIdx}
                  className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isDark
                      ? 'bg-[#080d2b] border-white/10 hover:border-emerald-500/40'
                      : 'bg-white border-slate-200 hover:border-blue-600/40 shadow-sm'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                        {language === 'ar' ? spec.badgeAr : spec.badgeEn}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base sm:text-lg">
                      {language === 'ar' ? spec.titleAr : spec.titleEn}
                    </h3>

                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {language === 'ar' ? spec.descAr : spec.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real Estate Core Services (100% Matching Reference) */}
      <section
        id="services-realestate"
        className={`py-16 md:py-24 border-t ${
          isDark ? 'bg-[#04071c] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider block mb-2">
              {language === 'ar' ? 'حلول عقارية متكاملة' : 'End-to-End Solutions'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {language === 'ar' ? 'خدماتنا العقارية المتخصصة' : 'Our Specialized Real Estate Services'}
            </h2>
            <p className={`text-sm sm:text-base mt-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'ar'
                ? 'من صفقات الاستحواذ الخاصة والحملات التسويقية العالمية إلى الاستشارات الاستثمارية المؤسسية، اكتشف كيف نحقق لعملائنا أفضل النتائج.'
                : 'From private acquisitions and global marketing campaigns to institutional asset advisory, discover how our tailored capabilities deliver measurable results.'}
            </p>
          </div>

          <ServiceCardsList filterDivision="realestate" showCategoryTabs={false} />
        </div>
      </section>

      {/* 4. Verified Property Inventory Grid */}
      <section
        id="featured-projects"
        className={`py-16 md:py-24 border-t ${
          isDark ? 'bg-[#040618] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-blue-500 uppercase tracking-wider block mb-1">
                {language === 'ar' ? 'محفظة العقارات المعتمدة' : 'Verified Brokerage Inventory'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {language === 'ar'
                  ? 'عقارات ومحافظ استثمارية مختارة بالرياض والشرقية'
                  : 'Curated Portfolios & Properties'}
              </h2>
            </div>
            <div className="text-xs font-semibold px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 self-start md:self-auto">
              <span>{filteredProperties.length} </span>
              <span>{language === 'ar' ? 'عقار متاح حالياً' : 'Properties Available'}</span>
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl border border-dashed border-white/20">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-lg font-bold">
                {language === 'ar' ? 'لا توجد عقارات تطابق معايير البحث الحالية' : 'No properties matched your criteria'}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                {language === 'ar' ? 'جرب تغيير خيارات التصفية أو مسح عبارة البحث.' : 'Try changing filters or clear search query.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((prop) => (
                <article
                  key={prop.id}
                  className={`group rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 ${
                    isDark
                      ? 'bg-[#080d2b] border-white/10 hover:border-emerald-500/40'
                      : 'bg-white border-slate-200 shadow-md hover:border-blue-600/40'
                  }`}
                >
                  {/* Property Image & Badges */}
                  <Link
                    href={`/listings/${prop.slug}`}
                    className="relative block h-64 w-full overflow-hidden bg-slate-900"
                  >
                    <Image
                      src={prop.image}
                      alt={language === 'ar' ? prop.titleAr : prop.titleEn}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/70 text-blue-300 border border-blue-400/30 backdrop-blur-md">
                        {language === 'ar' ? prop.statusNameAr : prop.statusNameEn}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-md">
                        {language === 'ar' ? prop.typeNameAr : prop.typeNameEn}
                      </span>
                    </div>

                    <div className="absolute bottom-3 inset-x-4 z-10 flex items-center justify-between text-white">
                      <span className="text-xl font-black text-blue-400 tracking-tight">
                        {prop.price}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20">
                        {prop.area}
                      </span>
                    </div>
                  </Link>

                  {/* Property Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        <span>{language === 'ar' ? prop.cityNameAr : prop.cityNameEn}</span>
                      </div>

                      <h3 className="font-extrabold text-lg sm:text-xl leading-snug tracking-tight hover:text-blue-400 transition-colors">
                        <Link href={`/listings/${prop.slug}`}>
                          {language === 'ar' ? prop.titleAr : prop.titleEn}
                        </Link>
                      </h3>

                      <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? prop.badgeAr : prop.badgeEn}</span>
                      </div>
                    </div>

                    {/* Features row */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-dashed border-white/10 dark:border-white/10 border-slate-200 text-center text-xs">
                      <div>
                        <span className="text-slate-300 block text-[10px]">{language === 'ar' ? 'الغرف' : 'Rooms'}</span>
                        <span className="font-bold mt-0.5 block">{prop.beds}</span>
                      </div>
                      <div>
                        <span className="text-slate-300 block text-[10px]">{language === 'ar' ? 'الحمامات' : 'Baths'}</span>
                        <span className="font-bold mt-0.5 block">{prop.baths}</span>
                      </div>
                      <div>
                        <span className="text-slate-300 block text-[10px]">{language === 'ar' ? 'المواقف' : 'Parking'}</span>
                        <span className="font-bold mt-0.5 block">{prop.parking}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <Link
                        href={`/listings/${prop.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-md"
                      >
                        <span>{language === 'ar' ? 'تفاصيل العقار والمعاينة' : 'Details & Viewings'}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href="/contact-us"
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isDark
                            ? 'border-white/15 text-slate-300 hover:text-white hover:bg-white/5'
                            : 'border-slate-300 text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                        }`}
                        title={language === 'ar' ? 'تواصل معنا' : 'Contact'}
                      >
                        <Phone className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* View Full Verified Listings Directory Link */}
          <div className="text-center pt-8">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>{language === 'ar' ? 'استعراض كافة الصفقات والعقارات المتاحة' : 'Explore All Verified Property Listings'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Core Brokerage Pillars (matching source) */}
      <section
        id="marketing-desk"
        className={`py-16 md:py-20 border-t ${
          isDark ? 'bg-[#060a22] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider block mb-1">
              {language === 'ar' ? 'أركان العمل والوساطة الأساسية' : 'Our Core Brokerage Pillars'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === 'ar'
                ? 'المبادئ التوجيهية التي تحكم كل صفقة عقارية واستشارة'
                : 'Guiding Principles for Every Transaction'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">
                {language === 'ar' ? 'وساطة وتسويق مرخص (فال)' : 'Regulated & Certified'}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'ar'
                  ? 'امتثال كامل لضوابط الهيئة العامة للعقار وإصدار عقود الوساطة المعتمدة قانونياً لضمان حقوق الأطراف.'
                  : 'Strict compliance with Real Estate General Authority standards and official brokerage contracts.'}
              </p>
            </div>

            <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">
                {language === 'ar' ? 'شبكة مستثمرين كبرى' : 'Investor Network'}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'ar'
                  ? 'قاعدة بيانات تضم كبار المستثمرين وصناديق الاستثمار العقاري والشركات في الرياض والمنطقة الشرقية.'
                  : 'Robust proprietary network connecting verified institutional buyers and high-net-worth investors.'}
              </p>
            </div>

            <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">
                {language === 'ar' ? 'تقييم عقاري دقيق' : 'Valuation & Intelligence'}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'ar'
                  ? 'دراسات مقارنة لأسعار الصفقات الفعلية وتحليل مؤشرات السوق لتحقيق أعلى قيمة بيعية وتأجيرية.'
                  : 'Comparative market analytics ensuring pricing precision for optimal acquisitions and exits.'}
              </p>
            </div>

            <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">
                {language === 'ar' ? 'حماية الضمان والأمان المالي' : 'Escrow & Title Security'}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'ar'
                  ? 'التحقق التام من سلامة الصكوك والنزاعات، وإتمام الحوالات وحسابات الضمان المعتمدة بنكياً.'
                  : 'Rigorous title deed verification and transparent escrow operations ensuring zero transaction risk.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. List or Request Property Form (matching source) */}
      <section
        id="list-request-form"
        className={`py-16 md:py-24 border-t ${
          isDark ? 'bg-[#040618] text-white' : 'bg-white text-slate-900'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`p-6 sm:p-12 rounded-3xl border ${
              isDark
                ? 'bg-[#080d2b] border-blue-500/20'
                : 'bg-slate-50 border-slate-200 shadow-xl'
            }`}
          >
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-wider block mb-1">
                {language === 'ar' ? 'بوابة المعاملات المباشرة' : 'Direct Transaction Portal'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {language === 'ar' ? 'أدرج أو اطلب عقارك مع هارد للعقارات' : 'List or Request Your Property with HARD'}
              </h2>
              <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'ar'
                  ? 'يتولى كبار مستشارينا المعتمدين مراجعة الطلب وتقديم الحلول المناسبة بامتثال كامل لأنظمة فال.'
                  : 'Our senior certified advisors handle acquisitions, marketing, and institutional mandates.'}
              </p>

              {/* Form Mode Toggle */}
              <div className="inline-flex p-1.5 rounded-2xl bg-black/40 border border-white/10 mt-6">
                <button
                  type="button"
                  onClick={() => setFormType('request')}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    formType === 'request'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {language === 'ar' ? 'طلب شراء أو استثمار عقار' : 'Request Property Acquisition'}
                </button>
                <button
                  type="button"
                  onClick={() => setFormType('list')}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    formType === 'list'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {language === 'ar' ? 'إدراج عقار للبيع أو التأجير' : 'List Property for Sale / Lease'}
                </button>
              </div>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-3xl bg-blue-500/10 border border-blue-500/30 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-blue-400 mx-auto" />
                <h4 className="text-xl font-extrabold text-blue-300">
                  {language === 'ar' ? 'تم استلام طلبكم وتوجيهه للمستشار المختص' : 'Your Mandate Has Been Logged'}
                </h4>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  {language === 'ar'
                    ? `رقم المرجع الاستشاري الخاص بك: #${referenceCode}، وسيقوم مستشار الوساطة بالاتصال بك خلال ساعات العمل الرسمية.`
                    : `Your advisory reference number (#${referenceCode}) has been created. A certified advisor will contact you within official hours.`}
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-blue-500 text-white transition-colors"
                >
                  {language === 'ar' ? 'إرسال طلب آخر' : 'Send Another Request'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-100">
                      {language === 'ar' ? 'الاسم الكامل أو اسم المنشأة' : 'Full Name or Company'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === 'ar' ? 'مثال: عبد الله السعيد' : 'e.g. Abdullah Al-Saeed'}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                        isDark
                          ? 'bg-black/40 border-white/10 text-white focus:border-blue-400'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-100">
                      {language === 'ar' ? 'رقم الجوال (واتساب)' : 'Mobile Phone (WhatsApp)'} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="05xxxxxxxx"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                        isDark
                          ? 'bg-black/40 border-white/10 text-white focus:border-blue-400'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-100">
                      {language === 'ar' ? 'المدينة / المنطقة' : 'City'}
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                        isDark
                          ? 'bg-black/40 border-white/10 text-white focus:border-blue-400'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    >
                      <option value="riyadh" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'الرياض' : 'Riyadh'}</option>
                      <option value="khobar" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'الخبر' : 'Al Khobar'}</option>
                      <option value="dammam" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'الدمام' : 'Dammam'}</option>
                      <option value="eastern" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'الظهران وباقي الشرقية' : 'Eastern Province'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-100">
                      {language === 'ar' ? 'نوع العقار' : 'Property Type'}
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                        isDark
                          ? 'bg-black/40 border-white/10 text-white focus:border-blue-400'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    >
                      <option value="commercial" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'أبراج ومكاتب تجارية' : 'Commercial'}</option>
                      <option value="villa" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'فلل وقصور سكنية' : 'Luxury Villa'}</option>
                      <option value="portfolio" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'محفظة استثمارية كبرى' : 'Investment Portfolio'}</option>
                      <option value="land" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'أراضي استثمارية وتطويرية' : 'Development Land'}</option>
                      <option value="penthouse" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'بنتهاوس وشقق' : 'Penthouse'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-100">
                      {language === 'ar' ? 'الميزانية التقديرية' : 'Budget Range'}
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                        isDark
                          ? 'bg-black/40 border-white/10 text-white focus:border-blue-400'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    >
                      <option value="under_3m" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'أقل من 3 مليون ر.س' : 'Under 3M SAR'}</option>
                      <option value="3m_6m" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? '3,000,000 - 6,000,000 ر.س' : '3M - 6M SAR'}</option>
                      <option value="6m_12m" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? '6,000,000 - 12,000,000 ر.س' : '6M - 12M SAR'}</option>
                      <option value="over_12m" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'أكثر من 12 مليون ر.س' : '12M+ SAR'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-100">
                    {language === 'ar' ? 'تفاصيل الطلب أو مواصفات العقار' : 'Mandate or Property Details'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={
                      language === 'ar'
                        ? 'وضح المساحة المفضلة، العائد الاستثماري المستهدف، أو تفاصيل الصك للبيع...'
                        : 'Specify preferred location, target return, or deed details...'
                    }
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                      isDark
                        ? 'bg-black/40 border-white/10 text-white focus:border-blue-400'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white hover:brightness-105 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {formType === 'request'
                      ? language === 'ar'
                        ? 'إرسال طلب البحث والاستثمار العقاري'
                        : 'Submit Acquisition Request'
                      : language === 'ar'
                      ? 'إرسال بيانات العقار للتسويق والوساطة'
                      : 'Submit Property Listing Mandate'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 7. Official Headquarters Details (from source) */}
      <section
        className={`py-12 border-t ${
          isDark ? 'bg-[#060a22] border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-start">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-300 block">{language === 'ar' ? 'المقر الإقليمي بالشرقية' : 'Eastern Province HQ'}</span>
                <span className="text-xs sm:text-sm font-bold">
                  {language === 'ar'
                    ? 'طريق الأمير متعب، حي هجر، الدمام'
                    : 'Prince Mutaib Rd, Hajr Dist, Dammam'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-300 block">{language === 'ar' ? 'فرع العاصمة' : 'Riyadh Office'}</span>
                <span className="text-xs sm:text-sm font-bold">
                  {language === 'ar'
                    ? 'حي العليا المالي، الرياض'
                    : 'Al Olaya Financial District, Riyadh'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-300 block">{language === 'ar' ? 'الترخيص الرسمي' : 'Official License'}</span>
                <span className="text-xs sm:text-sm font-bold">
                  {language === 'ar'
                    ? 'مؤسسة وساطة عقارية معتمدة (فال)'
                    : 'Licensed Brokerage Firm (VAL)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Global Single Footer */}
      <Footer />
    </main>
  );
}
