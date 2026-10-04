'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  HardHat,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Calculator,
  Layers,
  Award,
  Building,
  DollarSign,
  Search,
  Sparkles,
  Wrench,
  Hammer,
  Send,
  MapPin,
  X,
  Upload,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  hardConstructionProjects,
  hardConstructionServices,
  hardConstructionCompanyInfo,
  calculateConstructionCost,
  formatPriceSAR,
  type ConstructionProjectItem,
  type CostCalculatorParams,
} from '@/data/construction-data';

export default function ConstructionPortal() {
  const { theme, language, direction } = useLanguageTheme();
  const isDark = theme === 'dark';
  const isRtl = direction === 'rtl';
  const isAr = language === 'ar';

  // Projects filtering state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ConstructionProjectItem | null>(null);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState<number>(0);

  // Quote / RFP Modal State
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteRef, setQuoteRef] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [quoteData, setQuoteData] = useState({
    name: '',
    phone: '',
    email: '',
    city: isAr ? 'الرياض' : 'Riyadh',
    projectType: 'villa',
    builtUpArea: '1200',
    budgetRange: '',
    timeline: isAr ? '12 - 16 شهراً' : '12 - 16 months',
    notes: '',
  });

  // Quick Consultation Form state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactRef, setContactRef] = useState('');
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    city: isAr ? 'الرياض' : 'Riyadh',
    service: 'turnkey-construction',
    notes: '',
  });

  // Filter projects
  const filteredProjects = hardConstructionProjects.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const title = isAr ? p.titleAr : p.titleEn;
    const loc = isAr ? p.locationAr : p.locationEn;
    const desc = isAr ? p.descriptionAr : p.descriptionEn;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      title.toLowerCase().includes(q) ||
      loc.toLowerCase().includes(q) ||
      desc.toLowerCase().includes(q) ||
      p.cityAr.includes(q) ||
      p.cityEn.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  const handleOpenQuoteWithData = (opts: {
    projectType?: string;
    bua?: number;
    notes?: string;
    budget?: string;
  }) => {
    setQuoteData((prev) => ({
      ...prev,
      projectType: opts.projectType || prev.projectType,
      builtUpArea: opts.bua ? String(opts.bua) : prev.builtUpArea,
      notes: opts.notes || prev.notes,
      budgetRange: opts.budget || prev.budgetRange,
    }));
    setQuoteSubmitted(false);
    setIsQuoteOpen(true);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteData.name || !quoteData.phone) return;
    const ref = `CTR-REQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    setQuoteRef(ref);
    setQuoteSubmitted(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.phone) return;
    const ref = `CTR-INQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    setContactRef(ref);
    setContactSubmitted(true);
  };

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Building2':
        return Building2;
      case 'Layers':
        return Layers;
      case 'Sparkles':
        return Sparkles;
      case 'Wrench':
        return Wrench;
      case 'Hammer':
        return Hammer;
      case 'Calculator':
        return Calculator;
      default:
        return Building2;
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'} transition-colors`}>
      {/* 1. Global Unified Site Navbar */}
      <Navbar />

      {/* 2. Construction Division Hero Section */}
      <section
        id="home"
        className={`relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden transition-colors ${
          isDark ? 'bg-[#040618] text-white' : 'bg-slate-900 text-white'
        }`}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hardgp/por1-big.jpg"
            alt={isAr ? 'هارد للإنشاءات والمقاولات' : 'HARD Construction & Contracting'}
            fill
            priority
            className="object-cover object-center opacity-25 filter brightness-75 contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-[#040618]/90 via-[#040618]/70 to-[#040618]' : 'from-slate-950/90 via-slate-950/75 to-slate-900'}`} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold border border-amber-400/30 bg-amber-500/10 text-amber-300 backdrop-blur-md shadow-lg">
              <HardHat className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {isAr
                  ? 'الذراع الإنشائي لمجموعة هارد • مقاولات عامة مصنفة فئة أولى'
                  : 'HARD Group Construction Arm • Class-1 General Contractor'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              {isAr ? (
                <>
                  هارد للإنشاءات والمقاولات{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                    الريادة في التشييد الهندسي
                  </span>
                </>
              ) : (
                <>
                  HARD Construction{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                    Precision Engineering & Building
                  </span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed font-normal max-w-3xl mx-auto">
              {isAr
                ? 'الذراع الإنشائي والهندسي لمجموعة هارد، يقدم خدمات المقاولات العامة المصنفة فئة أولى لتنفيذ الأبراج التجارية، المجمعات السكنية، والمنشآت الذكية بأعلى كفاءة ومعايير كود البناء السعودي.'
                : 'The construction and engineering arm of HARD Group, delivering Class-1 classified general contracting services for commercial towers, residential complexes, and smart facilities with strict Saudi Building Code compliance.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  setQuoteSubmitted(false);
                  setIsQuoteOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-black shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
              >
                <Send className="w-4 h-4" />
                <span>{isAr ? 'طلب عرض سعر رسمي' : 'Request Official Quote'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setQuoteSubmitted(false);
                  setIsQuoteOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md text-sm font-bold transition-all transform hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'طلب استشارة وعرض سعر' : 'Request Instant Quote'}</span>
              </button>
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 max-w-4xl mx-auto">
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="block text-2xl lg:text-3xl font-black text-amber-400">
                  {isAr ? 'فئة أولى' : 'Class-1'}
                </span>
                <span className="text-xs text-slate-300 block">
                  {isAr ? 'تصنيف المقاولات العامة' : 'MOMRAH Classification'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="block text-2xl lg:text-3xl font-black text-amber-400">#44091</span>
                <span className="text-xs text-slate-300 block">
                  {isAr ? 'اعتماد هيئة المهندسين' : 'SCE License'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="block text-2xl lg:text-3xl font-black text-amber-400">100%</span>
                <span className="text-xs text-slate-300 block">
                  {isAr ? 'مطابقة كود البناء SBC' : 'Saudi Building Code'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="block text-2xl lg:text-3xl font-black text-amber-400">
                  {isAr ? '10 سنوات' : '10 Years'}
                </span>
                <span className="text-xs text-slate-300 block">
                  {isAr ? 'ضمان هيكلي معتمد' : 'Structural Warranty'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. All 6 Construction Projects Section */}
      <section id="projects" className={`py-16 lg:py-24 ${isDark ? 'bg-[#040618]' : 'bg-white'} border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold">
                <Building2 className="w-3.5 h-3.5" />
                <span>{isAr ? 'سجل المشاريع والمنجزات الإنشائية' : 'Featured Construction Portfolio'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {isAr ? 'مشاريع مميزة نعتز بتنفيذها في أرجاء المملكة' : 'Landmark Projects Engineered Across the Kingdom'}
              </h2>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                {isAr
                  ? 'استكشف نماذج من الأبراج التجارية، القصور السكنية الفاخرة، والمراكز اللوجستية المنفذة بأعلى معايير الجودة والإشراف الهندسي المقيم.'
                  : 'Explore our delivered and in-progress portfolio of commercial towers, luxury residences, and industrial hubs.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setQuoteSubmitted(false);
                setIsQuoteOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md cursor-pointer shrink-0 self-start md:self-end touch-manipulation"
            >
              <Send className="w-4 h-4" />
              <span>{isAr ? 'طلب عرض سعر جديد' : 'New Project RFP'}</span>
            </button>
          </div>

          {/* Filters & Search Toolbar */}
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#0b102b] border-white/10' : 'bg-slate-50 border-slate-200'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {[
                { id: 'all', label: isAr ? 'جميع المشاريع (6)' : 'All Projects (6)' },
                { id: 'residential', label: isAr ? 'القصور والفلل السكنية' : 'Residential' },
                { id: 'commercial', label: isAr ? 'الأبراج والمباني التجارية' : 'Commercial' },
                { id: 'industrial', label: isAr ? 'الصناعية واللوجستية' : 'Industrial' },
                { id: 'finishing', label: isAr ? 'التشطيبات الفندقية' : 'Fit-Out' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer touch-manipulation ${
                    selectedCategory === tab.id
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : isDark
                      ? 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                      : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث باسم المشروع أو المدينة...' : 'Search by name or city...'}
                className={`w-full ps-10 pe-4 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className={`group rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl ${
                  isDark
                    ? 'bg-[#0b102b] border-white/10 hover:border-amber-500/50'
                    : 'bg-white border-slate-200 hover:border-amber-500/50 shadow-sm'
                }`}
              >
                <div>
                  {/* Image Header */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-950">
                    <Image
                      src={proj.image}
                      alt={isAr ? proj.titleAr : proj.titleEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

                    {/* Top Badges */}
                    <div className="absolute top-3 start-3 end-3 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-400/30 shadow-md">
                        {isAr ? proj.cityAr : proj.cityEn}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold text-white backdrop-blur-md shadow-md ${
                          proj.status === 'completed'
                            ? 'bg-emerald-600/90'
                            : proj.status === 'in-progress'
                            ? 'bg-amber-600/90'
                            : 'bg-blue-600/90'
                        }`}
                      >
                        {proj.status === 'completed' && (isAr ? 'مكتمل ومسلّم' : 'Completed')}
                        {proj.status === 'in-progress' && (isAr ? 'قيد التنفيذ' : 'In Progress')}
                        {proj.status === 'delivered' && (isAr ? 'تم الإشغال' : 'Delivered')}
                      </span>
                    </div>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-3 start-3 end-3 text-white text-start">
                      <span className="text-[11px] text-amber-300 font-semibold block">
                        {isAr ? proj.finishingLevelAr : proj.finishingLevelEn}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 sm:p-6 space-y-4 text-start">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{isAr ? proj.locationAr : proj.locationEn}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold tracking-tight group-hover:text-amber-400 transition-colors line-clamp-1">
                        {isAr ? proj.titleAr : proj.titleEn}
                      </h3>
                    </div>

                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed line-clamp-2`}>
                      {isAr ? proj.descriptionAr : proj.descriptionEn}
                    </p>

                    {/* Specs Grid */}
                    <div className={`grid grid-cols-2 gap-2 p-3 rounded-2xl border text-xs ${
                      isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div>
                        <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'} block`}>
                          {isAr ? 'مسطح البناء' : 'Built-Up Area'}
                        </span>
                        <span className="font-bold text-amber-400">
                          {proj.buaM2.toLocaleString()} {isAr ? 'م²' : 'm²'}
                        </span>
                      </div>
                      <div>
                        <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'} block`}>
                          {isAr ? 'قيمة العقد' : 'Contract Value'}
                        </span>
                        <span className="font-bold">
                          {proj.valueSAR}
                        </span>
                      </div>
                      <div>
                        <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'} block`}>
                          {isAr ? 'سنة التنفيذ' : 'Year'}
                        </span>
                        <span className="font-semibold">
                          {proj.year}
                        </span>
                      </div>
                      <div>
                        <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'} block`}>
                          {isAr ? 'المدة الإنشائية' : 'Duration'}
                        </span>
                        <span className="font-semibold">
                          {proj.durationMonths} {isAr ? 'شهراً' : 'months'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className={`p-5 sm:p-6 pt-0 border-t ${isDark ? 'border-white/10' : 'border-slate-100'} flex items-center gap-2`}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProject(proj);
                      setActiveGalleryIdx(0);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md touch-manipulation"
                  >
                    <span>{isAr ? 'المواصفات والتفاصيل' : 'View Specifications'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleOpenQuoteWithData({
                        projectType:
                          proj.category === 'residential'
                            ? 'villa'
                            : proj.category === 'commercial'
                            ? 'commercial-building'
                            : 'warehouse',
                        bua: proj.buaM2,
                        notes: `Inquiry for project model: ${isAr ? proj.titleAr : proj.titleEn}`,
                      })
                    }
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer touch-manipulation ${
                      isDark
                        ? 'bg-white/10 hover:bg-white/20 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {isAr ? 'طلب تسعير' : 'Quote'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. All 6 Construction Services Section */}
      <section id="services" className={`py-16 lg:py-24 ${isDark ? 'bg-[#06091f]' : 'bg-slate-100'} border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>{isAr ? 'خدمات المقاولات والحلول الهندسية' : 'General Contracting Services'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {isAr ? 'خدمات مقاولات شاملة بمعايير كود البناء السعودي' : 'Turnkey & Heavy Civil Construction Services'}
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
              {isAr
                ? 'نوفر منظومة متكاملة من الخدمات الإنشائية والهندسية تبدأ من تدقيق المخططات وجداول الكميات وحتى تسليم المفتاح مع شهادات الإشغال والضمان.'
                : 'Full-spectrum EPC and general contracting capabilities backed by resident engineering supervision and strict QA/QC.'}
            </p>
          </div>

          {/* 6 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {hardConstructionServices.map((srv) => {
              const IconComp = getServiceIcon(srv.iconName);
              const deliverables = isAr ? srv.deliverablesAr : srv.deliverablesEn;

              return (
                <div
                  key={srv.id}
                  className={`group rounded-3xl border p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl text-start relative overflow-hidden ${
                    isDark
                      ? 'bg-[#0b102b] border-white/10 hover:border-amber-500/50'
                      : 'bg-white border-slate-200 hover:border-amber-500/50 shadow-sm'
                  }`}
                >
                  <div className="space-y-5">
                    {/* Header icon + badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <IconComp className="w-6 h-6" />
                      </div>

                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400">
                        {isAr ? srv.badgeAr : srv.badgeEn}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-bold group-hover:text-amber-400 transition-colors">
                        {isAr ? srv.titleAr : srv.titleEn}
                      </h3>
                      <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {isAr ? srv.subtitleAr : srv.subtitleEn}
                      </p>
                    </div>

                    {/* Description */}
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                      {isAr ? srv.descriptionAr : srv.descriptionEn}
                    </p>

                    {/* Deliverables List */}
                    <div className={`space-y-2 pt-2 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                      <span className={`text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-900'} block`}>
                        {isAr ? 'مخرجات وضمانات الخدمة:' : 'Deliverables & Quality:'}
                      </span>
                      <ul className="space-y-2 text-[11px]">
                        {deliverables.map((item, idx) => (
                          <li key={idx} className={`flex items-start gap-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer & CTA */}
                  <div className={`pt-6 mt-6 border-t ${isDark ? 'border-white/10' : 'border-slate-100'} space-y-3`}>
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'} block`}>
                          {isAr ? 'متوسط السعر' : 'Starting Price'}
                        </span>
                        <span className="font-bold text-amber-400">
                          {srv.startingPriceSAR}
                        </span>
                      </div>

                      <div className="text-end">
                        <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'} block`}>
                          {isAr ? 'الضمان المعتمد' : 'Warranty'}
                        </span>
                        <span className="font-bold">
                          {srv.warrantyYears} {isAr ? 'سنوات' : 'Years'}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleOpenQuoteWithData({
                          notes: `Request for service: ${isAr ? srv.titleAr : srv.titleEn}`,
                        })
                      }
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer touch-manipulation"
                    >
                      <span>{isAr ? 'طلب الخدمة الآن' : 'Request Service'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Engineering Standards & Quality Pillars */}
      <section className={`py-16 lg:py-20 ${isDark ? 'bg-[#040618]' : 'bg-white'} border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'الاعتمادات والمعايير الهندسية' : 'Quality & Engineering Assurance'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {isAr ? 'التزام مطلق بالجودة، الأمان، والتسليم في الموعد' : 'Strict SBC Compliance & Safety Standards'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-[#0b102b] border-white/10' : 'bg-slate-50 border-slate-200'} space-y-4 text-start`}>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">{isAr ? 'إدارة الجودة والرقابة الفنية' : 'Strict QA/QC Inspection'}</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                {isAr
                  ? 'فحوصات مخبرية دورية للخرسانات والحديد، ومطابقة تامة لاشتراطات كود البناء السعودي (SBC).'
                  : 'Certified laboratory concrete compression tests and SABIC tensile rebar validation.'}
              </p>
            </div>

            <div className={`p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-[#0b102b] border-white/10' : 'bg-slate-50 border-slate-200'} space-y-4 text-start`}>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <HardHat className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">{isAr ? 'السلامة والصحة المهنية (OSHA)' : 'Occupational Safety'}</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                {isAr
                  ? 'سجل خالٍ من الحوادث لأكثر من 2,000,000 ساعة عمل مع تطبيق صارم لمعدات الحماية وتأمين المقاولين.'
                  : 'Zero-harm safety record exceeding 2,000,000 safe man-hours with CAR contractor insurance.'}
              </p>
            </div>

            <div className={`p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-[#0b102b] border-white/10' : 'bg-slate-50 border-slate-200'} space-y-4 text-start`}>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">{isAr ? 'النمذجة الرقمية (4D BIM)' : '4D BIM Coordination'}</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                {isAr
                  ? 'محاكاة افتراضية شاملة لتفادي التعارضات بين الهياكل الإنشائية والتمديدات الكهروميكانيكية قبل الصب.'
                  : 'Comprehensive digital clash-detection eliminating MEP and structural redundancies before casting.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Direct Inquiry & Offices Section */}
      <section id="contact" className={`py-16 lg:py-24 ${isDark ? 'bg-[#06091f]' : 'bg-slate-100'} border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Offices (5 cols) */}
            <div className="lg:col-span-5 space-y-6 text-start">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isAr ? 'فروعنا وتواصلنا المباشر' : 'Offices & Communications'}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {isAr ? 'مستعدون لبدء مشروعك الإنشائي القادم' : 'Ready to Build Your Next Milestone?'}
                </h3>
              </div>

              {/* Riyadh HQ */}
              <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#0b102b] border-white/10' : 'bg-white border-slate-200'} space-y-2`}>
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span>{isAr ? 'المقر الرئيسي - الرياض' : 'Riyadh Headquarters'}</span>
                </h4>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                  {isAr ? hardConstructionCompanyInfo.address.ar : hardConstructionCompanyInfo.address.en}
                </p>
              </div>

              {/* Eastern Branch */}
              <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#0b102b] border-white/10' : 'bg-white border-slate-200'} space-y-2`}>
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{isAr ? 'فرع المنطقة الشرقية - الخبر' : 'Eastern Province Branch – Al Khobar'}</span>
                </h4>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                  {isAr ? hardConstructionCompanyInfo.easternProvinceBranch.ar : hardConstructionCompanyInfo.easternProvinceBranch.en}
                </p>
              </div>

              {/* Contact Data */}
              <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#0b102b] border-white/10' : 'bg-white border-slate-200'} space-y-3 text-xs`}>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{isAr ? 'الهاتف الموحد:' : 'Phone:'}</span>
                  <a href={`tel:${hardConstructionCompanyInfo.phone.replace(/\s+/g, '')}`} dir="ltr" className="font-bold text-amber-400">
                    {hardConstructionCompanyInfo.phone}
                  </a>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{isAr ? 'واتساب المباشر:' : 'WhatsApp:'}</span>
                  <a
                    href={`https://wa.me/${hardConstructionCompanyInfo.whatsapp.replace('+', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    dir="ltr"
                    className="font-bold text-emerald-400"
                  >
                    {hardConstructionCompanyInfo.whatsapp}
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{isAr ? 'البريد الرسمي:' : 'Official Email:'}</span>
                  <a href={`mailto:${hardConstructionCompanyInfo.email}`} className="font-bold text-sky-400">
                    {hardConstructionCompanyInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Consultation Form (7 cols) */}
            <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-[#0b102b] border-white/10' : 'bg-white border-slate-200'} text-start space-y-6`}>
              <div>
                <h3 className="text-xl font-bold tracking-tight">
                  {isAr ? 'طلب استشارة هندسية ودراسة مشروع' : 'Engineering Consultation & Project Study'}
                </h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
                  {isAr ? 'سيتواصل معك مهندسو إدارة العطاءات والمشاريع خلال ساعتي عمل.' : 'Our senior engineering estimation team will reach out within 2 hours.'}
                </p>
              </div>

              {contactSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-400">
                    {isAr ? 'تم استلام طلبك بنجاح!' : 'Inquiry Received Successfully!'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {isAr ? `الرقم المرجعي للطلب: ${contactRef}` : `Reference: ${contactRef}`}
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold cursor-pointer touch-manipulation"
                  >
                    {isAr ? 'إرسال استفسار آخر' : 'Send Another'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">{isAr ? 'الاسم الكريم *' : 'Name *'}</label>
                      <input
                        type="text"
                        required
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        placeholder={isAr ? 'م. عبدالعزيز' : 'Eng. Abdulaziz'}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 ${
                          isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">{isAr ? 'رقم الجوال *' : 'Phone *'}</label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        placeholder="+966 5X XXX XXXX"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 ${
                          isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">{isAr ? 'المدينة' : 'City'}</label>
                      <select
                        value={contactData.city}
                        onChange={(e) => setContactData({ ...contactData, city: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 ${
                          isDark ? 'bg-[#0b102b] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value={isAr ? 'الرياض' : 'Riyadh'}>{isAr ? 'الرياض' : 'Riyadh'}</option>
                        <option value={isAr ? 'الخبر' : 'Al Khobar'}>{isAr ? 'الخبر' : 'Al Khobar'}</option>
                        <option value={isAr ? 'الدمام' : 'Dammam'}>{isAr ? 'الدمام' : 'Dammam'}</option>
                        <option value={isAr ? 'الظهران' : 'Dhahran'}>{isAr ? 'الظهران' : 'Dhahran'}</option>
                        <option value={isAr ? 'جدة' : 'Jeddah'}>{isAr ? 'جدة' : 'Jeddah'}</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">{isAr ? 'الخدمة المطلوبة' : 'Required Service'}</label>
                      <select
                        value={contactData.service}
                        onChange={(e) => setContactData({ ...contactData, service: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 ${
                          isDark ? 'bg-[#0b102b] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="turnkey-construction">{isAr ? 'بناء عظم وتسليم مفتاح' : 'Turnkey Construction'}</option>
                        <option value="structural-civil">{isAr ? 'الأعمال الخرسانية والإنشائية' : 'Structural & Civil'}</option>
                        <option value="luxury-finishing">{isAr ? 'التشطيبات الفندقية الفاخرة' : 'Luxury Fit-Out'}</option>
                        <option value="mep-hvac">{isAr ? 'الأعمال الكهروميكانيكية والتكييف' : 'MEP & HVAC'}</option>
                        <option value="value-engineering">{isAr ? 'الهندسة القيمة وتدقيق BOQ' : 'Value Engineering'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">{isAr ? 'ملاحظات وتفاصيل المشروع' : 'Project Notes'}</label>
                    <textarea
                      rows={3}
                      value={contactData.notes}
                      onChange={(e) => setContactData({ ...contactData, notes: e.target.value })}
                      placeholder={isAr ? 'المساحة، موقع الأرض، توفر المخططات...' : 'Area, land location, blueprints status...'}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 ${
                        isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all shadow-md cursor-pointer touch-manipulation"
                  >
                    {isAr ? 'إرسال طلب الاستشارة الفورية' : 'Submit Consultation Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Global Unified Site Footer */}
      <Footer />

      {/* 8. Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className={`relative w-full max-w-4xl rounded-3xl border overflow-hidden my-6 animate-in fade-in zoom-in-95 ${
            isDark ? 'bg-[#0b102b] text-white border-white/10' : 'bg-white text-slate-900 border-slate-200'
          }`}>
            <div className={`p-5 sm:p-6 border-b flex items-center justify-between ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-start space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {isAr ? selectedProject.cityAr : selectedProject.cityEn} • {selectedProject.year}
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold">
                  {isAr ? selectedProject.titleAr : selectedProject.titleEn}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer touch-manipulation ${
                  isDark ? 'bg-white/5 border-white/10 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-start">
              {/* Gallery Image */}
              <div className="space-y-3">
                <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-950">
                  <Image
                    src={selectedProject.galleryImages[activeGalleryIdx] || selectedProject.image}
                    alt={isAr ? selectedProject.titleAr : selectedProject.titleEn}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {selectedProject.galleryImages.length > 1 && (
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveGalleryIdx((prev) =>
                            prev > 0 ? prev - 1 : selectedProject.galleryImages.length - 1
                          )
                        }
                        className="p-2 rounded-full bg-slate-950/75 text-white pointer-events-auto hover:bg-slate-950 cursor-pointer touch-manipulation"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveGalleryIdx((prev) =>
                            prev < selectedProject.galleryImages.length - 1 ? prev + 1 : 0
                          )
                        }
                        className="p-2 rounded-full bg-slate-950/75 text-white pointer-events-auto hover:bg-slate-950 cursor-pointer touch-manipulation"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {selectedProject.galleryImages.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {selectedProject.galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveGalleryIdx(idx)}
                        className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer touch-manipulation ${
                          activeGalleryIdx === idx ? 'border-amber-400' : 'border-transparent opacity-60'
                        }`}
                      >
                        <Image src={img} alt="Thumb" fill className="object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Specs Grid */}
              <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl border text-xs ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'} block`}>{isAr ? 'مسطح البناء' : 'Built-Up Area'}</span>
                  <span className="font-bold text-amber-400 text-sm">{selectedProject.buaM2.toLocaleString()} {isAr ? 'م²' : 'm²'}</span>
                </div>
                <div>
                  <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'} block`}>{isAr ? 'قيمة العقد' : 'Contract Value'}</span>
                  <span className="font-bold text-sm">{selectedProject.valueSAR}</span>
                </div>
                <div>
                  <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'} block`}>{isAr ? 'مدة التنفيذ' : 'Duration'}</span>
                  <span className="font-bold text-sm">{selectedProject.durationMonths} {isAr ? 'شهراً' : 'months'}</span>
                </div>
                <div>
                  <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'} block`}>{isAr ? 'العميل' : 'Client'}</span>
                  <span className="font-bold text-sm line-clamp-1">{isAr ? selectedProject.clientAr : selectedProject.clientEn}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-amber-400">{isAr ? 'نبذة عن المشروع والتنفيذ الهندسي:' : 'Engineering Overview:'}</h4>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                  {isAr ? selectedProject.descriptionAr : selectedProject.descriptionEn}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} space-y-1`}>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    {isAr ? 'النظام الإنشائي والهيكلي' : 'Structural Superstructure'}
                  </span>
                  <p className="text-xs font-bold">{isAr ? selectedProject.structuralSystemAr : selectedProject.structuralSystemEn}</p>
                </div>

                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} space-y-1`}>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    {isAr ? 'مستوى التشطيب المعماري' : 'Finishing Specification'}
                  </span>
                  <p className="text-xs font-bold">{isAr ? selectedProject.finishingLevelAr : selectedProject.finishingLevelEn}</p>
                </div>
              </div>

              {/* Scope of works */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-amber-400">{isAr ? 'نطاق العمل الهندسي والتنفيذي:' : 'Scope of Works:'}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(isAr ? selectedProject.scopeAr : selectedProject.scopeEn).map((sc, i) => (
                    <div key={i} className={`flex items-start gap-2 p-2.5 rounded-xl border text-xs ${
                      isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{sc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`p-5 sm:p-6 border-t flex items-center justify-between gap-4 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer touch-manipulation ${
                  isDark ? 'bg-white/10 border-white/10 text-white hover:bg-white/20' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>

              <button
                type="button"
                onClick={() => {
                  const proj = selectedProject;
                  setSelectedProject(null);
                  handleOpenQuoteWithData({
                    projectType: proj.category === 'residential' ? 'villa' : 'commercial-building',
                    bua: proj.buaM2,
                    notes: `Quote requested for model: ${isAr ? proj.titleAr : proj.titleEn}`,
                  });
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-md cursor-pointer touch-manipulation"
              >
                {isAr ? 'طلب عرض سعر لهذا النموذج' : 'Quote this Model'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Smart Cost Calculator Modal */}
      {isCalculatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className={`relative w-full max-w-4xl rounded-3xl border overflow-hidden my-6 animate-in fade-in zoom-in-95 ${
            isDark ? 'bg-[#0b102b] text-white border-white/10' : 'bg-white text-slate-900 border-slate-200'
          }`}>
            {/* Header */}
            <div className={`p-5 sm:p-6 border-b flex items-center justify-between ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-3 text-start">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    {isAr ? 'حاسبة تكاليف البناء الذكية (كود البناء السعودي)' : 'Smart Construction Cost Calculator'}
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {isAr ? 'تقدير دقيق للتكلفة الإنشائية والمدة الزمنية وفق أسعار السوق المعتمدة' : 'Instant structural, MEP, and finishing estimation'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCalculatorOpen(false)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer touch-manipulation ${
                  isDark ? 'bg-white/5 border-white/10 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-start">
              {/* Step 1: Project Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  {isAr ? '١. نوع المشروع والنشاط' : '1. Project Type'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: 'villa', label: isAr ? 'فيلا / قصر فاخر' : 'Luxury Villa', icon: '🏡' },
                    { id: 'commercial-building', label: isAr ? 'مبنى / برج تجاري' : 'Commercial Tower', icon: '🏢' },
                    { id: 'duplex', label: isAr ? 'دوبلكس / تاون هاوس' : 'Duplex Complex', icon: '🏘️' },
                    { id: 'residential-compound', label: isAr ? 'مجمع سكني مغلق' : 'Residential Compound', icon: '🏰' },
                    { id: 'warehouse', label: isAr ? 'مستودع ولوجستي' : 'Industrial Warehouse', icon: '🏭' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setCalcParams((prev) => ({ ...prev, projectType: t.id }))}
                      className={`p-3 rounded-2xl text-start border transition-all cursor-pointer flex flex-col justify-between gap-2 touch-manipulation ${
                        calcParams.projectType === t.id
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md ring-2 ring-amber-400/30'
                          : isDark
                          ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="text-xl">{t.icon}</span>
                      <span className="text-xs font-bold leading-tight">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Finishing */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  {isAr ? '٢. مستوى ونوع التشطيب' : '2. Finishing Specification'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { id: 'skeleton', label: isAr ? 'بناء عظم فقط' : 'Structural Shell Only', desc: isAr ? 'هيكل خرساني وتأسيس' : 'Framing & Foundation' },
                    { id: 'commercial', label: isAr ? 'تسليم مفتاح تجاري' : 'Commercial Standard', desc: isAr ? 'مواصفات إدارية وتجارية' : 'Class-A Commercial' },
                    { id: 'deluxe', label: isAr ? 'تسليم مفتاح ديلوكس' : 'Deluxe Turnkey', desc: isAr ? 'رخام وتشطيبات فاخرة' : 'Marble & High Insulation' },
                    { id: 'super-luxury', label: isAr ? 'سوبر VIP فندقي' : 'Ultra-Luxury VIP', desc: isAr ? 'أعلى مواصفات القصور' : 'Palatial Grade & Smart KNX' },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setCalcParams((prev) => ({ ...prev, finishingLevel: lvl.id }))}
                      className={`p-3.5 rounded-2xl text-start border transition-all cursor-pointer space-y-1 touch-manipulation ${
                        calcParams.finishingLevel === lvl.id
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md ring-2 ring-amber-400/30'
                          : isDark
                          ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="text-xs font-bold block">{lvl.label}</span>
                      <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'} block leading-tight`}>{lvl.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Area & Addons */}
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  {isAr ? '٣. المساحة المبنية، عدد الأدوار والمرافق الإضافية' : '3. Sizing & Special Add-ons'}
                </label>

                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">{isAr ? 'مسطح البناء الإجمالي (BUA):' : 'Built-Up Area (BUA):'}</span>
                      <span className="font-black text-amber-400 text-sm">{calcParams.builtUpArea.toLocaleString()} {isAr ? 'م²' : 'm²'}</span>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="10000"
                      step="50"
                      value={calcParams.builtUpArea}
                      onChange={(e) => setCalcParams((prev) => ({ ...prev, builtUpArea: Number(e.target.value) }))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">{isAr ? 'عدد الأدوار:' : 'Floors:'}</span>
                      <span className="font-black text-amber-400 text-sm">{calcParams.floors} {isAr ? 'أدوار' : 'Floors'}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      step="1"
                      value={calcParams.floors}
                      onChange={(e) => setCalcParams((prev) => ({ ...prev, floors: Number(e.target.value) }))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { key: 'hasBasement', label: isAr ? 'قبو (Basement) معزول' : 'Insulated Basement' },
                    { key: 'hasPool', label: isAr ? 'مسبح خرساني متكامل' : 'Concrete Pool' },
                    { key: 'hasElevator', label: isAr ? 'مصعد بانورامي حديث' : 'Modern Elevator' },
                    { key: 'hasSmartHome', label: isAr ? 'منزل ذكي وأتمتة KNX' : 'Smart Home KNX' },
                  ].map((ad) => (
                    <label
                      key={ad.key}
                      className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-semibold touch-manipulation ${
                        isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(calcParams[ad.key as keyof CostCalculatorParams])}
                        onChange={(e) =>
                          setCalcParams((prev) => ({ ...prev, [ad.key]: e.target.checked }))
                        }
                        className="rounded text-amber-500 focus:ring-amber-500 w-4 h-4"
                      />
                      <span>{ad.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Estimate Output Result */}
              <div className="p-6 rounded-3xl bg-slate-950 text-white space-y-6 border border-amber-500/30 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                      {isAr ? 'النطاق المالي التقديري الإجمالي:' : 'Estimated Investment Range:'}
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-black text-amber-300 pt-1">
                      {formatPriceSAR(currentEstimate.minTotalSAR, isAr)} – {formatPriceSAR(currentEstimate.maxTotalSAR, isAr)}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-end">
                      <span className="text-slate-400 block">{isAr ? 'متوسط سعر المتر' : 'Avg. Price/m²'}</span>
                      <span className="font-bold text-white text-sm">{formatPriceSAR(currentEstimate.pricePerM2SAR, isAr)}</span>
                    </div>

                    <div className="text-end">
                      <span className="text-slate-400 block">{isAr ? 'المدة المتوقعة' : 'Est. Duration'}</span>
                      <span className="font-bold text-emerald-400 text-sm">{currentEstimate.estimatedDurationMonths} {isAr ? 'شهراً' : 'months'}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">{isAr ? 'الهيكل الإنشائي والعظم:' : 'Structural Framing:'}</span>
                    <span className="font-bold text-white">{formatPriceSAR(currentEstimate.structuralCostSAR, isAr)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{isAr ? 'التشطيبات المعمارية:' : 'Finishing & Fit-Out:'}</span>
                    <span className="font-bold text-white">{formatPriceSAR(currentEstimate.finishingCostSAR, isAr)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{isAr ? 'الأعمال الكهروميكانيكية:' : 'MEP & HVAC:'}</span>
                    <span className="font-bold text-white">{formatPriceSAR(currentEstimate.mepCostSAR, isAr)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{isAr ? 'المرافق والإضافات:' : 'Add-ons Cost:'}</span>
                    <span className="font-bold text-white">{formatPriceSAR(currentEstimate.addonsCostSAR, isAr)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={`p-5 sm:p-6 border-t flex items-center justify-between gap-4 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              <button
                type="button"
                onClick={() => setIsCalculatorOpen(false)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer touch-manipulation ${
                  isDark ? 'bg-white/10 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-700'
                }`}
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>

              <button
                type="button"
                onClick={() => {
                  const est = currentEstimate;
                  const range = `${formatPriceSAR(est.minTotalSAR, isAr)} - ${formatPriceSAR(est.maxTotalSAR, isAr)}`;
                  setIsCalculatorOpen(false);
                  handleOpenQuoteWithData({
                    projectType: calcParams.projectType,
                    bua: calcParams.builtUpArea,
                    budget: range,
                    notes: `Estimated area: ${calcParams.builtUpArea} m², Floors: ${calcParams.floors}, Basement: ${calcParams.hasBasement ? 'Yes' : 'No'}`,
                  });
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-md cursor-pointer touch-manipulation"
              >
                {isAr ? 'اعتماد التقدير وطلب عرض سعر رسمي' : 'Transfer to Official RFP'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. Quote / RFP Request Modal */}
      {isQuoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className={`relative w-full max-w-2xl rounded-3xl border overflow-hidden my-6 animate-in fade-in zoom-in-95 ${
            isDark ? 'bg-[#0b102b] text-white border-white/10' : 'bg-white text-slate-900 border-slate-200'
          }`}>
            <div className={`p-5 sm:p-6 border-b flex items-center justify-between ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-start space-y-1">
                <h3 className="text-base sm:text-lg font-bold">
                  {isAr ? 'طلب عرض سعر ودراسة هندسية متكاملة' : 'Request Official Contracting Proposal'}
                </h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {isAr ? 'أدخل تفاصيل مشروعك وسيقوم كبار مهندسينا بالتواصل معك لتقديم دراسة تفصيلية' : 'Submit your project details for engineering audit and BOQ pricing'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsQuoteOpen(false)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer touch-manipulation ${
                  isDark ? 'bg-white/5 border-white/10 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-8 max-h-[75vh] overflow-y-auto text-start">
              {quoteSubmitted ? (
                <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-emerald-400">
                      {isAr ? 'تم استلام طلب التسعير بنجاح!' : 'Proposal Request Submitted!'}
                    </h4>
                    <div className="inline-block px-4 py-2 rounded-xl bg-white/10 border border-white/20 font-mono text-sm font-bold text-amber-300">
                      {quoteRef}
                    </div>
                    <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed pt-2">
                      {isAr
                        ? 'تم إدراج طلبك في نظام إدارة العطاءات الهندسية. سيتواصل معك رئيس قسم المشاريع مباشرة لمناقشة المخططات وجداول الكميات.'
                        : 'Your request has been logged into our engineering RFP system. Our head of project execution will contact you shortly.'}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/${hardConstructionCompanyInfo.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                        isAr
                          ? `السلام عليكم، تم تقديم طلب عرض سعر برقم مرجعي: ${quoteRef}. أود متابعة الطلب مع المهندس المشرف.`
                          : `Hello, following up on proposal ref: ${quoteRef}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md touch-manipulation"
                    >
                      {isAr ? 'متابعة عبر واتساب مباشرة' : 'Follow Up on WhatsApp'}
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsQuoteOpen(false)}
                      className={`px-5 py-2.5 rounded-xl border text-xs font-bold touch-manipulation ${
                        isDark ? 'bg-white/10 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-700'
                      }`}
                    >
                      {isAr ? 'إغلاق' : 'Close'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">{isAr ? 'الاسم الكريم / اسم المنشأة *' : 'Client / Entity Name *'}</label>
                      <input
                        type="text"
                        required
                        value={quoteData.name}
                        onChange={(e) => setQuoteData({ ...quoteData, name: e.target.value })}
                        placeholder={isAr ? 'م. عبدالعزيز القحطاني' : 'Eng. Abdulaziz'}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 ${
                          isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">{isAr ? 'رقم الجوال *' : 'Mobile Phone *'}</label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={quoteData.phone}
                        onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
                        placeholder="+966 5X XXX XXXX"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 ${
                          isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
                      <input
                        type="email"
                        value={quoteData.email}
                        onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })}
                        placeholder="client@domain.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 ${
                          isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">{isAr ? 'المدينة والحي' : 'City & District'}</label>
                      <select
                        value={quoteData.city}
                        onChange={(e) => setQuoteData({ ...quoteData, city: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 ${
                          isDark ? 'bg-[#0b102b] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value={isAr ? 'الرياض' : 'Riyadh'}>{isAr ? 'الرياض' : 'Riyadh'}</option>
                        <option value={isAr ? 'الخبر' : 'Al Khobar'}>{isAr ? 'الخبر' : 'Al Khobar'}</option>
                        <option value={isAr ? 'الدمام' : 'Dammam'}>{isAr ? 'الدمام' : 'Dammam'}</option>
                        <option value={isAr ? 'الظهران' : 'Dhahran'}>{isAr ? 'الظهران' : 'Dhahran'}</option>
                        <option value={isAr ? 'جدة' : 'Jeddah'}>{isAr ? 'جدة' : 'Jeddah'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">{isAr ? 'نوع المشروع' : 'Project Type'}</label>
                      <select
                        value={quoteData.projectType}
                        onChange={(e) => setQuoteData({ ...quoteData, projectType: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 ${
                          isDark ? 'bg-[#0b102b] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="villa">{isAr ? 'فيلا / قصر سكني فاخر' : 'Luxury Villa / Palace'}</option>
                        <option value="commercial-building">{isAr ? 'برج / مبنى تجاري وإداري' : 'Commercial Tower'}</option>
                        <option value="duplex">{isAr ? 'مجمع دوبلكسات' : 'Duplex Complex'}</option>
                        <option value="warehouse">{isAr ? 'مستودع ومنشأة لوجستية' : 'Industrial Warehouse'}</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">{isAr ? 'مسطح البناء التقديري (م²)' : 'Built-Up Area (m²)'}</label>
                      <input
                        type="number"
                        value={quoteData.builtUpArea}
                        onChange={(e) => setQuoteData({ ...quoteData, builtUpArea: e.target.value })}
                        placeholder="1200"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 ${
                          isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Upload Blueprints */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">{isAr ? 'إرفاق المخططات المعمارية أو ملفات CAD (اختياري)' : 'Attach Blueprints / CAD (Optional)'}</label>
                    <div className={`p-4 rounded-2xl border border-dashed text-center relative cursor-pointer ${
                      isDark ? 'bg-white/5 border-white/20 hover:bg-white/10' : 'bg-slate-50 border-slate-300 hover:bg-slate-100'
                    }`}>
                      <input
                        type="file"
                        accept=".pdf,.dwg,.dxf,.zip,.rar,.jpg,.png"
                        onChange={(e) => setUploadedFileName(e.target.files?.[0]?.name || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <Upload className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                      <p className="text-xs font-semibold">
                        {uploadedFileName || (isAr ? 'اسحب وأفلت المخططات هنا أو انقر للاستعراض (PDF, DWG, ZIP)' : 'Drop CAD or PDF files here')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">{isAr ? 'ملاحظات وتفاصيل إضافية' : 'Additional Notes'}</label>
                    <textarea
                      rows={3}
                      value={quoteData.notes}
                      onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
                      placeholder={isAr ? 'أي اشتراطات خاصة أو متطلبات في جداول الكميات...' : 'Any specific requirements or BOQ details...'}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 ${
                        isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all shadow-md cursor-pointer touch-manipulation"
                  >
                    {isAr ? 'إرسال طلب التسعير الرسمي' : 'Submit Official RFP'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
