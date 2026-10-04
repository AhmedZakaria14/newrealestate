'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  X,
  Phone,
  Search,
  ArrowUpRight,
  Sun,
  Moon,
  Globe,
  Building2,
  HardHat,
  Fan,
  Layers,
  MessageCircle,
  Users,
  Award,
  HelpCircle,
  FileText,
  Sparkles,
  ChevronRight,
  Menu,
  ShieldCheck,
} from 'lucide-react';
import { navigationLinks } from '@/data/skyvilla-data';
import ConsultationModal from '@/components/ConsultationModal';
import Logo from '@/components/Logo';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function Navbar() {
  const pathname = usePathname() || '/';
  const { language, toggleLanguage, theme, toggleTheme, direction } = useLanguageTheme();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [consultationOpen, setConsultationOpen] = useState(false);
  const scrollPositionRef = useRef(0);

  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  // Smooth throttled scroll listener using passive mode
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Strict & Robust Mobile Body Scroll Lock (prevents iOS rubber-banding & backdrop shifting)
  useEffect(() => {
    if (drawerOpen || searchOpen) {
      scrollPositionRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      const scrollY = scrollPositionRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      if (scrollY) {
        window.scrollTo(0, scrollY);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [drawerOpen, searchOpen]);

  // Handle ESC key to close search & drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dropdown icons & metadata helper
  const getSubItemMeta = (href: string) => {
    switch (href) {
      case '/construction':
        return {
          icon: HardHat,
          badgeAr: 'كود SBC',
          badgeEn: 'SBC Code',
          color: 'text-amber-400',
          bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
        };
      case '/realestate':
        return {
          icon: Building2,
          badgeAr: 'رخصة فال',
          badgeEn: 'VAL Lic.',
          color: 'text-blue-400',
          bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
        };
      case '/hvac':
        return {
          icon: Fan,
          badgeAr: 'عقود AMC',
          badgeEn: 'AMC 24/7',
          color: 'text-cyan-400',
          bg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
        };
      case '/about-us':
        return {
          icon: Building2,
          badgeAr: 'الحوكمة',
          badgeEn: 'Profile',
          color: 'text-blue-400',
          bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
        };
      case '/our-team':
        return {
          icon: Users,
          badgeAr: 'القيادة',
          badgeEn: 'Leaders',
          color: 'text-indigo-400',
          bg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
        };
      case '/testimonials':
        return {
          icon: Award,
          badgeAr: 'قصص النجاح',
          badgeEn: 'Reviews',
          color: 'text-amber-400',
          bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
        };
      case '/blog':
        return {
          icon: FileText,
          badgeAr: 'أبحاث السوق',
          badgeEn: 'Reports',
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
        };
      case '/faqs':
        return {
          icon: HelpCircle,
          badgeAr: 'إجابات فورية',
          badgeEn: 'FAQ',
          color: 'text-teal-400',
          bg: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
        };
      case '/image-gallery':
        return {
          icon: Sparkles,
          badgeAr: 'المعرض',
          badgeEn: 'Gallery',
          color: 'text-purple-400',
          bg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
        };
      default:
        return {
          icon: ArrowUpRight,
          badgeAr: 'معتمد',
          badgeEn: 'Verified',
          color: 'text-blue-400',
          bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
        };
    }
  };

  // Search Results List
  const allSearchableItems = useMemo(() => {
    const list: Array<{ title: string; subtitle: string; href: string; category: string }> = [
      {
        title: isAr ? 'هارد للعقارات والوساطة' : 'HARD Real Estate & Brokerage',
        subtitle: isAr ? 'عقارات فاخرة، فلل بحرية، رخصة فال' : 'Prime luxury villas & VAL brokerage',
        href: '/realestate',
        category: isAr ? 'القطاعات' : 'Sectors',
      },
      {
        title: isAr ? 'هارد للإنشاءات والمقاولات' : 'HARD Construction & Contracting',
        subtitle: isAr ? 'مقاولات عامة فئة أولى، كود البناء SBC' : 'Class-1 General Contracting & SBC',
        href: '/construction',
        category: isAr ? 'القطاعات' : 'Sectors',
      },
      {
        title: isAr ? 'هارد لصيانة وتكييف الهواء' : 'HARD HVAC & Maintenance',
        subtitle: isAr ? 'صيانة شيلرات، أنظمة VRF، عقود AMC' : 'Chillers, VRF Systems & AMC contracts',
        href: '/hvac',
        category: isAr ? 'القطاعات' : 'Sectors',
      },
      {
        title: isAr ? 'المشاريع العقارية الكبرى' : 'Master Projects Portfolio',
        subtitle: isAr ? 'أبراج ومجمعات استثمارية في الخبر والرياض' : 'Major development projects in KSA',
        href: '/projects',
        category: isAr ? 'المشاريع' : 'Projects',
      },
      {
        title: isAr ? 'العقارات والوحدات المتاحة' : 'Properties & Listings',
        subtitle: isAr ? 'قصور، فلل، شقق فاخرة، وأراضٍ استثمارية' : 'Palaces, luxury villas and penthouses',
        href: '/listings',
        category: isAr ? 'العقارات' : 'Listings',
      },
      {
        title: isAr ? 'منظومة الخدمات المتكاملة' : 'Integrated Services',
        subtitle: isAr ? 'استشارات، تسويق، مقاولات، وتشغيل' : 'Brokerage, contracting & maintenance',
        href: '/services',
        category: isAr ? 'الخدمات' : 'Services',
      },
      {
        title: isAr ? 'عن مجموعة هارد القابضة' : 'About HARD Group',
        subtitle: isAr ? 'الرؤية، الحوكمة، وسجل الإنجازات' : 'Corporate profile and governance',
        href: '/about-us',
        category: isAr ? 'الشركة' : 'Company',
      },
      {
        title: isAr ? 'تواصل معنا والمقرات' : 'Contact Us & Branches',
        subtitle: isAr ? 'مقرات الرياض والخبر، الهاتف، والواتساب' : 'Riyadh & Khobar headquarters',
        href: '/contact-us',
        category: isAr ? 'التواصل' : 'Contact',
      },
    ];
    return list;
  }, [isAr]);

  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allSearchableItems;
    return allSearchableItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [searchQuery, allSearchableItems]);

  return (
    <>
      {/* 1. Harmonious, Fixed Height Luxury Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 transform-gpu ${
          scrolled
            ? isDark
              ? 'bg-[#040618]/95 backdrop-blur-md border-b border-white/10 shadow-lg'
              : 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md'
            : isDark
            ? 'bg-[#040618]/90 backdrop-blur-md border-b border-white/10'
            : 'bg-slate-900/90 backdrop-blur-md border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between gap-2 sm:gap-4">
          {/* Holding Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0 cursor-pointer touch-manipulation"
            title={isAr ? 'الصفحة الرئيسية | مجموعة هارد' : 'HARD Group Homepage'}
          >
            <Logo
              size="md"
              variant={isDark ? 'light' : scrolled ? 'dark' : 'light'}
            />
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 rtl:space-x-reverse">
            {navigationLinks.map((item) => {
              const title = isAr ? item.title_ar : item.title;
              const isActive =
                pathname === item.href ||
                (item.children && item.children.some((child) => pathname === child.href));

              if (item.children) {
                const isSectors = item.title === 'Group Sectors';
                const dropdownWidth = isSectors ? 'w-[360px]' : 'w-[420px]';

                return (
                  <div
                    key={item.title}
                    className="relative group py-2"
                  >
                    <button
                      type="button"
                      className={`flex items-center gap-1 px-2.5 xl:px-3 py-1.5 text-[12.5px] xl:text-[13.5px] font-semibold tracking-wide rounded-xl transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-blue-600/15 text-blue-400 font-bold'
                          : isDark
                          ? 'text-gray-200 hover:text-blue-400 hover:bg-white/5'
                          : scrolled
                          ? 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                          : 'text-white/90 hover:text-blue-400 hover:bg-white/10'
                      }`}
                    >
                      {isSectors && <Layers className="w-3.5 h-3.5 opacity-90 text-blue-400" />}
                      <span>{title}</span>
                      <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180 opacity-75 group-hover:opacity-100" />
                    </button>

                    {/* Dropdown Card */}
                    <div
                      className={`absolute top-full ${
                        direction === 'rtl' ? 'right-0' : 'left-0'
                      } ${dropdownWidth} pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50`}
                    >
                      <div
                        className={`rounded-2xl shadow-2xl p-3 backdrop-blur-xl border ${
                          isDark
                            ? 'bg-[#080b24] border-white/15 text-white shadow-black/80'
                            : 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
                        }`}
                      >
                        <div className="pb-2 mb-2 border-b border-gray-500/15 flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400">
                            {isSectors
                              ? isAr ? 'قطاعات واستثمارات هارد' : 'HARD Group Sectors'
                              : isAr ? 'عن هارد والمؤسسة' : 'About HARD Group'}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
                            {isSectors
                              ? isAr ? 'فئة أولى • رخصة فال' : 'SBC & FAL'
                              : isAr ? 'منظومة متكاملة' : 'Integrated'}
                          </span>
                        </div>

                        <div className={isSectors ? 'space-y-1.5' : 'grid grid-cols-1 sm:grid-cols-2 gap-1.5'}>
                          {item.children.map((subItem) => {
                            const subTitle = isAr ? subItem.title_ar : subItem.title;
                            const subDesc = isAr ? subItem.description_ar : subItem.description;
                            const isSubActive = pathname === subItem.href;
                            const meta = getSubItemMeta(subItem.href);
                            const IconComponent = meta.icon;

                            return (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className={`group/card flex items-start gap-2.5 p-2 rounded-xl transition-colors border ${
                                  isSubActive
                                    ? isDark
                                      ? 'bg-blue-600/15 border-blue-500/30 text-white'
                                      : 'bg-blue-50 border-blue-300 text-slate-950'
                                    : isDark
                                    ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-blue-500/30 text-gray-200'
                                    : 'bg-slate-50 border-slate-100 hover:bg-slate-100 hover:border-blue-200 text-slate-800'
                                }`}
                              >
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${
                                    isDark ? 'bg-[#040618] border border-white/10' : 'bg-white border border-slate-200'
                                  }`}
                                >
                                  <IconComponent className={`w-3.5 h-3.5 ${meta.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className={`font-bold text-xs leading-tight truncate ${
                                    isDark ? 'text-white group-hover/card:text-blue-400' : 'text-slate-900 group-hover/card:text-blue-600'
                                  }`}>
                                    {subTitle}
                                  </h4>
                                  <p className={`text-[10px] mt-0.5 line-clamp-1 leading-snug ${
                                    isDark ? 'text-gray-400' : 'text-slate-500'
                                  }`}>
                                    {subDesc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`px-2.5 xl:px-3 py-1.5 text-[12.5px] xl:text-[13.5px] font-semibold tracking-wide rounded-xl transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 font-bold'
                      : isDark
                      ? 'text-gray-200 hover:text-blue-400 hover:bg-white/5'
                      : scrolled
                      ? 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                      : 'text-white/90 hover:text-blue-400 hover:bg-white/10'
                  }`}
                >
                  {title}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Search Toggle */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-colors cursor-pointer border touch-manipulation flex items-center justify-center shrink-0 ${
                isDark
                  ? 'bg-white/5 hover:bg-blue-500/15 text-gray-300 hover:text-blue-400 border-white/10 hover:border-blue-500/30'
                  : scrolled
                  ? 'bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border-slate-200'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-blue-400/40'
              }`}
              title={isAr ? 'بحث سريع' : 'Quick Search'}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              title={isAr ? 'Switch to English' : 'التحويل للغة العربية'}
              className={`inline-flex items-center gap-1 h-9 sm:h-10 px-2 sm:px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer border touch-manipulation shrink-0 ${
                isDark
                  ? 'bg-white/5 hover:bg-blue-500/15 text-white border-white/10 hover:border-blue-500/40'
                  : scrolled
                  ? 'bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border-slate-200'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-blue-400/40'
              }`}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{isAr ? 'EN' : 'عربي'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              title={isDark ? 'الوضع النهاري' : 'الوضع الليلي'}
              className={`hidden md:inline-flex w-10 h-10 rounded-xl transition-all duration-200 cursor-pointer border touch-manipulation items-center justify-center shrink-0 shadow-sm ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-blue-400/50 shadow-black/20'
                  : scrolled
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-slate-200/50'
                  : 'bg-white/90 hover:bg-white text-slate-900 border-slate-300 shadow-lg backdrop-blur-md'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>

            {/* Admin Dashboard Portal Link */}
            <Link
              href="/admin"
              title={isAr ? 'لوحة التحكم وإدارة المحتوى والطلبات' : 'Admin Operations & Leads'}
              className={`hidden md:inline-flex items-center gap-1.5 h-9 sm:h-10 px-3 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                isDark
                  ? 'bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border-blue-500/30'
                  : scrolled
                  ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>{isAr ? 'لوحة التحكم' : 'Admin'}</span>
            </Link>

            {/* Desktop CTA Button */}
            <button
              type="button"
              onClick={() => setConsultationOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 xl:gap-2 px-3.5 xl:px-5 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer whitespace-nowrap touch-manipulation"
            >
              <span className="hidden xl:inline">{isAr ? 'طلب استشارة وتسعير' : 'Request Estimate'}</span>
              <span className="xl:hidden">{isAr ? 'استشارة' : 'Estimate'}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
            </button>

            {/* Mobile Drawer Hamburger Button (Complete, Crisp, Non-Cropped Icon) */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className={`lg:hidden w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] sm:min-w-[40px] rounded-xl border transition-colors cursor-pointer touch-manipulation active:scale-95 flex items-center justify-center shrink-0 ${
                isDark
                  ? 'bg-white/5 text-white border-white/10 active:bg-white/15'
                  : scrolled
                  ? 'bg-slate-100 text-slate-800 border-slate-200 active:bg-slate-200'
                  : 'bg-white/10 text-white border-white/20 active:bg-white/20'
              }`}
              aria-label={isAr ? 'فتح القائمة الرئيسية' : 'Open main menu'}
            >
              <Menu className="w-5 h-5 text-current shrink-0 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Harmonious Full-Height Fixed Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-250 transform-gpu ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Semi-transparent Backdrop with fast tap close */}
        <div
          className="absolute inset-0 bg-black/80 transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />

        {/* Sliding Panel (Locked Fixed Height with d-vh support) */}
        <div
          className={`absolute top-0 bottom-0 ${
            direction === 'rtl' ? 'left-0' : 'right-0'
          } w-[88vw] max-w-[340px] h-[100dvh] h-screen flex flex-col justify-between shadow-2xl transition-transform duration-250 ease-out transform-gpu border-l rtl:border-l-0 rtl:border-r ${
            isDark
              ? 'bg-[#06081e] text-white border-white/10'
              : 'bg-white text-slate-900 border-slate-200'
          } ${
            drawerOpen
              ? 'translate-x-0'
              : direction === 'rtl'
              ? '-translate-x-full'
              : 'translate-x-full'
          }`}
        >
          {/* Drawer Top Header (Fixed h-16) */}
          <div className="h-16 px-4 border-b border-gray-500/15 flex items-center justify-between shrink-0">
            <Link
              href="/"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-2 group touch-manipulation"
            >
              <Logo size="sm" variant={isDark ? 'light' : 'dark'} />
            </Link>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="p-2 rounded-xl hover:bg-gray-500/10 text-gray-400 hover:text-white transition-colors cursor-pointer touch-manipulation"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
            {/* 3 Core Divisions Cards */}
            <div className="space-y-1.5">
              <span className="text-[10.5px] font-black uppercase tracking-wider text-blue-400 block px-1">
                {isAr ? 'القطاعات الاستثمارية الرئيسية' : 'Core Investment Divisions'}
              </span>

              <div className="grid grid-cols-1 gap-1.5">
                <Link
                  href="/realestate"
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors touch-manipulation ${
                    pathname === '/realestate'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                      : isDark
                      ? 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-200'
                      : 'bg-slate-50 border-slate-200/70 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block">{isAr ? 'هارد للعقارات' : 'HARD Real Estate'}</span>
                      <span className="text-[9.5px] opacity-75 block">{isAr ? 'وساطة واستشارات فال' : 'VAL Licensed Brokerage'}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                </Link>

                <Link
                  href="/construction"
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors touch-manipulation ${
                    pathname === '/construction'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : isDark
                      ? 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-200'
                      : 'bg-slate-50 border-slate-200/70 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400">
                      <HardHat className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block">{isAr ? 'هارد للإنشاءات والمقاولات' : 'HARD Construction'}</span>
                      <span className="text-[9.5px] opacity-75 block">{isAr ? 'فئة أولى • كود SBC' : 'Class-1 General Contracting'}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                </Link>

                <Link
                  href="/hvac"
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors touch-manipulation ${
                    pathname === '/hvac'
                      ? 'bg-cyan-600 text-white border-cyan-500 shadow-md'
                      : isDark
                      ? 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-200'
                      : 'bg-slate-50 border-slate-200/70 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400">
                      <Fan className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block">{isAr ? 'هارد لصيانة التكييف' : 'HARD HVAC'}</span>
                      <span className="text-[9.5px] opacity-75 block">{isAr ? 'شيلرات • عقود AMC 24/7' : 'Chillers & AMC Maintenance'}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>

            {/* General Navigation Links */}
            <div className="space-y-1 pt-2 border-t border-gray-500/15">
              <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-400 block px-1 mb-1">
                {isAr ? 'روابط التنقل' : 'Navigation'}
              </span>

              {[
                { href: '/', label: isAr ? 'الرئيسية' : 'Home' },
                { href: '/listings', label: isAr ? 'العقارات والقصور' : 'Listings & Estates' },
                { href: '/projects', label: isAr ? 'المشاريع الكبرى' : 'Master Projects' },
                { href: '/services', label: isAr ? 'خدمات المجموعة' : 'All Services' },
                { href: '/about-us', label: isAr ? 'من نحن والحوكمة' : 'About HARD' },
                { href: '/contact-us', label: isAr ? 'اتصل بنا والمقرات' : 'Contact & Branches' },
              ].map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`block px-3 py-2.5 rounded-xl text-xs font-bold transition-colors touch-manipulation ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isDark
                        ? 'text-slate-300 hover:bg-white/5'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Drawer Bottom Controls & Contact (Fixed to Bottom with pb-safe) */}
          <div className="p-4 pb-safe border-t border-gray-500/15 space-y-2.5 bg-black/20 shrink-0">
            {/* Consultation CTA */}
            <button
              type="button"
              onClick={() => {
                setDrawerOpen(false);
                setConsultationOpen(true);
              }}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 touch-manipulation cursor-pointer active:scale-98"
            >
              <span>{isAr ? 'طلب استشارة وتسعير فوري' : 'Request Consultation'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Quick Contact buttons */}
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <a
                href="tel:+966138004273"
                className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 touch-manipulation ${
                  isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>{isAr ? 'اتصال مباشر' : 'Direct Call'}</span>
              </a>
              <a
                href="https://wa.me/966556125711"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 touch-manipulation ${
                  isDark ? 'bg-white/5 border-white/10 text-emerald-400' : 'bg-slate-100 border-slate-200 text-emerald-600'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
              </a>
            </div>

            {/* Theme & Language Bar */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <button
                type="button"
                onClick={toggleTheme}
                className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border transition-all cursor-pointer touch-manipulation ${
                  isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-blue-600" />}
                <span className="text-xs font-bold">{isDark ? (isAr ? 'الوضع النهاري' : 'Light Mode') : (isAr ? 'الوضع الليلي' : 'Dark Mode')}</span>
              </button>

              <button
                type="button"
                onClick={toggleLanguage}
                className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border transition-all cursor-pointer touch-manipulation ${
                  isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold">{isAr ? 'English (EN)' : 'العربية (AR)'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Global Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-3 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className={`relative w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden ${
              isDark ? 'bg-[#080b24] text-white border-white/15' : 'bg-white text-slate-900 border-slate-200'
            }`}
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-gray-500/15 flex items-center gap-3">
              <Search className="w-5 h-5 text-blue-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث في العقارات، المقاولات، الخدمات، أو المشاريع...' : 'Search properties, contracting, services...'}
                className="w-full bg-transparent border-none text-sm sm:text-base focus:outline-none placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 rounded-xl hover:bg-gray-500/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Results */}
            <div className="p-3 max-h-[60vh] overflow-y-auto space-y-1">
              {searchResults.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 space-y-2">
                  <Search className="w-8 h-8 mx-auto opacity-40 text-blue-400" />
                  <p>{isAr ? 'لا توجد نتائج تطابق بحثك.' : 'No results found.'}</p>
                </div>
              ) : (
                searchResults.map((res) => (
                  <Link
                    key={res.href + res.title}
                    href={res.href}
                    onClick={() => setSearchOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-2xl transition-colors ${
                      isDark ? 'hover:bg-white/5 text-slate-200' : 'hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="space-y-0.5 text-start">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-blue-400">{res.title}</span>
                        <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold">
                          {res.category}
                        </span>
                      </div>
                      <p className="text-[10.5px] text-slate-400 line-clamp-1">{res.subtitle}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 opacity-50 shrink-0" />
                  </Link>
                ))
              )}
            </div>

            {/* Search Modal Footer */}
            <div className="p-3 border-t border-gray-500/15 bg-black/10 flex items-center justify-between text-[10.5px] text-slate-400">
              <span>{isAr ? 'اضغط ESC للإغلاق' : 'Press ESC to close'}</span>
              <span>{searchResults.length} {isAr ? 'نتيجة متاحة' : 'results available'}</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Global Consultation Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </>
  );
}
