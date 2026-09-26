'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Search,
  ArrowUpRight,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Sun,
  Moon,
  Globe,
} from 'lucide-react';
import { navigationLinks } from '@/data/skyvilla-data';
import ConsultationModal from '@/components/ConsultationModal';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage, theme, toggleTheme, t, direction } = useLanguageTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);

  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? isDark
              ? 'bg-[#040618]/95 backdrop-blur-md border-b border-white/10 shadow-xl py-3'
              : 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative h-10 flex items-center">
                <img
                  src="https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/logo.svg"
                  alt="Skyvilla"
                  className={`w-auto h-8 sm:h-9 object-contain transition-all ${
                    isDark ? 'brightness-0 invert' : (scrolled ? '' : 'brightness-0 invert')
                  }`}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 rtl:space-x-reverse">
              {navigationLinks.map((item) => {
                const title = language === 'ar' ? item.title_ar : item.title;
                const isActive =
                  pathname === item.href ||
                  (item.children && item.children.some((child) => pathname === child.href));

                if (item.children) {
                  return (
                    <div
                      key={item.title}
                      className="relative group py-2"
                      onMouseEnter={() => setActiveDropdown(item.title)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold tracking-wide rounded-md transition-colors ${
                          isActive
                            ? isDark
                              ? 'text-[#DCFF09]'
                              : scrolled
                              ? 'text-emerald-600'
                              : 'text-[#DCFF09]'
                            : isDark
                            ? 'text-gray-200 hover:text-[#DCFF09]'
                            : scrolled
                            ? 'text-slate-700 hover:text-emerald-600'
                            : 'text-white/90 hover:text-[#DCFF09]'
                        }`}
                      >
                        <span>{title}</span>
                        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70 group-hover:opacity-100" />
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute top-full ${
                          direction === 'rtl' ? 'right-0' : 'left-0'
                        } w-72 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50`}
                      >
                        <div
                          className={`rounded-2xl shadow-2xl p-2.5 backdrop-blur-xl border ${
                            isDark
                              ? 'bg-[#080b24] border-white/10 text-white'
                              : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
                          }`}
                        >
                          {item.children.map((subItem) => {
                            const subTitle = language === 'ar' ? subItem.title_ar : subItem.title;
                            const subDesc =
                              language === 'ar' ? subItem.description_ar : subItem.description;
                            const isSubActive = pathname === subItem.href;

                            return (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className={`block px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                                  isSubActive
                                    ? isDark
                                      ? 'bg-[#DCFF09]/15 text-[#DCFF09] font-bold'
                                      : 'bg-emerald-50 text-emerald-700 font-bold'
                                    : isDark
                                    ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                              >
                                <div className="font-semibold">{subTitle}</div>
                                {subDesc && (
                                  <div
                                    className={`text-xs mt-0.5 line-clamp-1 font-normal ${
                                      isDark ? 'text-gray-400' : 'text-slate-400'
                                    }`}
                                  >
                                    {subDesc}
                                  </div>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`px-3 py-1.5 text-sm font-semibold tracking-wide rounded-md transition-colors ${
                      isActive
                        ? isDark
                          ? 'text-[#DCFF09]'
                          : scrolled
                          ? 'text-emerald-600'
                          : 'text-[#DCFF09]'
                        : isDark
                        ? 'text-gray-200 hover:text-[#DCFF09]'
                        : scrolled
                        ? 'text-slate-700 hover:text-emerald-600'
                        : 'text-white/90 hover:text-[#DCFF09]'
                    }`}
                  >
                    {title}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Bar (Language Switcher, Theme Switcher, Search, CTA, Drawer) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Switcher Button */}
              <button
                onClick={toggleLanguage}
                title={language === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white border-white/15 hover:border-[#DCFF09]/50'
                    : scrolled
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                    : 'bg-white/20 hover:bg-white/30 text-white border-white/25'
                }`}
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'English' : 'عربي'}</span>
              </button>

              {/* Theme Toggle Button (Light / Dark) */}
              <button
                onClick={toggleTheme}
                title={isDark ? 'تفعيل الوضع النهاري (Light Mode)' : 'تفعيل الوضع الليلي (Dark Mode)'}
                className={`p-2 rounded-full transition-all cursor-pointer border ${
                  isDark
                    ? 'bg-white/10 hover:bg-[#DCFF09] hover:text-[#040618] text-white border-white/15'
                    : scrolled
                    ? 'bg-slate-100 hover:bg-slate-800 hover:text-white text-slate-700 border-slate-200'
                    : 'bg-white/20 hover:bg-white hover:text-slate-900 text-white border-white/25'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-[#DCFF09]" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isDark
                    ? 'text-gray-300 hover:text-[#DCFF09] hover:bg-white/5'
                    : scrolled
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Search site"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Consultation CTA button */}
              <button
                onClick={() => setConsultationOpen(true)}
                className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-tight transition-all transform hover:-translate-y-0.5 shadow-md cursor-pointer ${
                  isDark
                    ? 'bg-[#DCFF09] text-[#040618] hover:bg-white shadow-[#DCFF09]/20'
                    : 'bg-[#0f172a] text-white hover:bg-emerald-600 shadow-slate-400/30'
                }`}
              >
                <span>{t('nav.getConsultation')}</span>
                <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
              </button>

              {/* Offcanvas sidebar trigger button */}
              <button
                onClick={() => setOffcanvasOpen(true)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isDark
                    ? 'text-gray-200 hover:text-[#DCFF09] hover:bg-white/5'
                    : scrolled
                    ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-white hover:text-white/80 hover:bg-white/10'
                }`}
                aria-label="Open sidebar"
              >
                <div className="space-y-1.5 w-5">
                  <span className="block w-5 h-0.5 bg-current"></span>
                  <span
                    className={`block w-3.5 h-0.5 bg-current ${
                      direction === 'rtl' ? 'mr-auto' : 'ml-auto'
                    }`}
                  ></span>
                  <span className="block w-5 h-0.5 bg-current"></span>
                </div>
              </button>

              {/* Mobile hamburger menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isDark
                    ? 'text-gray-200 hover:text-[#DCFF09]'
                    : scrolled
                    ? 'text-slate-700 hover:text-slate-900'
                    : 'text-white'
                }`}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden fixed inset-x-0 top-full shadow-2xl max-h-[85vh] overflow-y-auto p-6 transition-all border-b ${
              isDark
                ? 'bg-[#040618]/95 backdrop-blur-xl border-white/10 text-white'
                : 'bg-white/95 backdrop-blur-xl border-slate-200 text-slate-900'
            }`}
          >
            {/* Quick Switchers in Mobile Menu */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleLanguage}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                    isDark
                      ? 'bg-white/10 text-white border-white/15'
                      : 'bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'English' : 'عربي'}</span>
                </button>
                <button
                  onClick={toggleTheme}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                    isDark
                      ? 'bg-white/10 text-white border-white/15'
                      : 'bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  {isDark ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-[#DCFF09]" />
                      <span>{t('nav.lightMode')}</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-slate-700" />
                      <span>{t('nav.darkMode')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {navigationLinks.map((item) => {
                const title = language === 'ar' ? item.title_ar : item.title;

                return (
                  <div key={item.title} className="border-b border-gray-500/10 pb-2">
                    {item.children ? (
                      <div>
                        <button
                          onClick={() =>
                            setActiveDropdown(activeDropdown === item.title ? null : item.title)
                          }
                          className="flex items-center justify-between w-full py-2 text-base font-bold"
                        >
                          <span>{title}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              activeDropdown === item.title
                                ? 'rotate-180 text-emerald-500'
                                : 'text-gray-400'
                            }`}
                          />
                        </button>
                        {activeDropdown === item.title && (
                          <div
                            className={`py-2 space-y-2 mt-1 ${
                              direction === 'rtl'
                                ? 'pr-4 border-r-2 border-emerald-500/40 mr-2'
                                : 'pl-4 border-l-2 border-emerald-500/40 ml-2'
                            }`}
                          >
                            {item.children.map((subItem) => {
                              const subTitle = language === 'ar' ? subItem.title_ar : subItem.title;
                              return (
                                <Link
                                  key={subItem.title}
                                  href={subItem.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`block py-1.5 text-sm ${
                                    pathname === subItem.href
                                      ? isDark
                                        ? 'text-[#DCFF09] font-bold'
                                        : 'text-emerald-600 font-bold'
                                      : isDark
                                      ? 'text-gray-300 hover:text-white'
                                      : 'text-slate-600 hover:text-slate-900'
                                  }`}
                                >
                                  {subTitle}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-2 text-base font-bold ${
                          pathname === item.href
                            ? isDark
                              ? 'text-[#DCFF09]'
                              : 'text-emerald-600'
                            : ''
                        }`}
                      >
                        {title}
                      </Link>
                    )}
                  </div>
                );
              })}

              <div className="pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setConsultationOpen(true);
                  }}
                  className={`w-full py-3.5 font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    isDark
                      ? 'bg-[#DCFF09] text-[#040618] hover:bg-white'
                      : 'bg-[#0f172a] text-white hover:bg-emerald-600'
                  }`}
                >
                  <span>{t('nav.getConsultation')}</span>
                  <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                </button>
              </div>

              <div className="pt-4 text-xs space-y-2 opacity-75">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span dir="ltr">+91 (123) 456-789</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-500" />
                  <span>info@skyvillaconstruction.com</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Offcanvas Drawer */}
      {offcanvasOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setOffcanvasOpen(false)}
          />

          <div
            className={`relative w-full max-w-md h-full p-8 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-l ${
              isDark
                ? 'bg-[#040618] border-white/10 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-500/15">
                <img
                  src="https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/logo.svg"
                  alt="Skyvilla"
                  className={`h-8 ${isDark ? 'brightness-0 invert' : ''}`}
                />
                <button
                  onClick={() => setOffcanvasOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-500/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-6">
                <div>
                  <h4 className="text-lg font-bold mb-2">{t('drawer.aboutTitle')}</h4>
                  <p className="text-sm opacity-80 leading-relaxed">{t('drawer.aboutText')}</p>
                </div>

                {/* Direct Contact Box */}
                <div
                  className={`rounded-2xl p-5 border space-y-4 ${
                    isDark
                      ? 'bg-[#080b24] border-white/5'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <h5 className="text-xs uppercase tracking-wider font-bold text-emerald-500">
                    {t('drawer.directContact')}
                  </h5>
                  <div className="space-y-3 text-sm">
                    <a
                      href="tel:+91123456789"
                      className="flex items-center gap-3 hover:text-emerald-500 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-emerald-500" />
                      <span dir="ltr">+91 (123) 456-789</span>
                    </a>
                    <a
                      href="mailto:info@skyvillaconstruction.com"
                      className="flex items-center gap-3 hover:text-emerald-500 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-emerald-500" />
                      <span>info@skyvillaconstruction.com</span>
                    </a>
                    <div className="flex items-start gap-3 opacity-90">
                      <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('footer.locationVal')}</span>
                    </div>
                    <div className="flex items-center gap-3 opacity-90">
                      <Clock className="w-4 h-4 text-emerald-500" />
                      <span>{t('drawer.hours')}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Link buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/projects"
                    onClick={() => setOffcanvasOpen(false)}
                    className={`p-3 text-center rounded-xl text-xs font-bold transition-colors border ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                    }`}
                  >
                    {t('drawer.viewProjects')}
                  </Link>
                  <Link
                    href="/pricing-plan"
                    onClick={() => setOffcanvasOpen(false)}
                    className={`p-3 text-center rounded-xl text-xs font-bold transition-colors border ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                    }`}
                  >
                    {t('drawer.viewPricing')}
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-500/15">
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-70">{t('drawer.connect')}</span>
                <div className="flex items-center gap-2">
                  <a
                    href="#"
                    className="p-2 rounded-full hover:bg-emerald-500 hover:text-white transition-colors opacity-80 hover:opacity-100"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-full hover:bg-emerald-500 hover:text-white transition-colors opacity-80 hover:opacity-100"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-full hover:bg-emerald-500 hover:text-white transition-colors opacity-80 hover:opacity-100"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-full hover:bg-emerald-500 hover:text-white transition-colors opacity-80 hover:opacity-100"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md">
          <div
            className={`relative w-full max-w-2xl rounded-3xl shadow-2xl p-6 border ${
              isDark
                ? 'bg-[#080b24] border-white/20 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-500/15">
              <span className="text-sm font-bold opacity-80">{t('nav.search')}</span>
              <button
                onClick={() => setSearchOpen(false)}
                className="opacity-70 hover:opacity-100 p-1 rounded-full hover:bg-gray-500/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 relative">
              <Search
                className={`absolute ${
                  direction === 'rtl' ? 'right-4' : 'left-4'
                } top-3.5 w-5 h-5 opacity-50`}
              />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('nav.searchPlaceholder')}
                className={`w-full ${
                  direction === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'
                } py-3.5 rounded-xl border text-sm font-medium focus:outline-none transition-colors ${
                  isDark
                    ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-[#DCFF09]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                }`}
              />
            </div>

            {searchQuery && (
              <div className="mt-4 pt-4 border-t border-gray-500/15 max-h-60 overflow-y-auto space-y-2">
                <Link
                  href="/projects"
                  onClick={() => setSearchOpen(false)}
                  className="block p-3 rounded-xl hover:bg-gray-500/10 text-sm"
                >
                  <span className="font-bold text-emerald-500">{t('nav.projects')}:</span>{' '}
                  {language === 'ar'
                    ? 'برج ذا فيرتكس بلازا ومجمع أوريليا للأعمال'
                    : 'The Vertex Plaza & Aurelia Business Park'}
                </Link>
                <Link
                  href="/services"
                  onClick={() => setSearchOpen(false)}
                  className="block p-3 rounded-xl hover:bg-gray-500/10 text-sm"
                >
                  <span className="font-bold text-emerald-500">{t('nav.services')}:</span>{' '}
                  {language === 'ar'
                    ? 'تخطيط المواقع، التصميم المعماري، إدارة المشاريع'
                    : 'Site Planning, Building Design, Project Management'}
                </Link>
                <Link
                  href="/pricing-plan"
                  onClick={() => setSearchOpen(false)}
                  className="block p-3 rounded-xl hover:bg-gray-500/10 text-sm"
                >
                  <span className="font-bold text-emerald-500">{t('nav.pricing')}:</span>{' '}
                  {language === 'ar'
                    ? 'الخطة الأساسية، القياسية والمميزة'
                    : 'Basic, Standard & Premium Construction Plans'}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </>
  );
}
