'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, ArrowUpRight, Check, Send, MapPin } from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';
import Logo from '@/components/Logo';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function Footer() {
  const { language, theme, t, direction } = useLanguageTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  const isDark = theme === 'dark';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer
      className={`relative border-t overflow-hidden transition-colors ${
        isDark
          ? 'bg-[#020410] border-white/10 text-white'
          : 'bg-slate-900 border-slate-800 text-white'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top CTA Banner */}
      <div className="border-b border-white/10 py-14 sm:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex flex-col lg:flex-row lg:items-center justify-between gap-8 border p-8 sm:p-12 rounded-3xl relative overflow-hidden ${
              isDark
                ? 'bg-gradient-to-r from-[#080b24] to-[#040618] border-white/10 shadow-2xl'
                : 'bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700 shadow-xl'
            }`}
          >
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3 max-w-2xl">
              <span className="inline-block text-xs uppercase tracking-widest font-bold text-blue-400 px-3.5 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                {t('footer.ctaBadge')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {t('footer.ctaTitlePre')}{' '}
                <span className="text-blue-400">{t('footer.ctaTitleHighlight')}</span>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {t('footer.ctaDesc')}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => setConsultationOpen(true)}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-blue-600 text-white font-black text-sm sm:text-base rounded-full hover:bg-blue-500 transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-600/25 cursor-pointer"
              >
                <span>{t('footer.getQuote')}</span>
                <ArrowUpRight className={`w-5 h-5 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Hotline Bar */}
      <div className="border-b border-white/10 py-8 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Call */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-gray-300 font-bold">
                  {t('footer.callUs')}
                </span>
                <a
                  href="tel:+966556125711"
                  dir="ltr"
                  className="text-lg font-bold text-white hover:text-blue-400 transition-colors block text-left rtl:text-right"
                >
                  +966 55 612 5711
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-gray-300 font-bold">
                  {t('footer.emailUs')}
                </span>
                <a
                  href="mailto:info@hardgp.com"
                  className="text-lg font-bold text-white hover:text-blue-400 transition-colors truncate block"
                >
                  info@hardgp.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-gray-300 font-bold">
                  {t('footer.location')}
                </span>
                <span className="text-sm font-semibold text-white">
                  {t('footer.locationVal')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-4 space-y-5">
              <Link href="/" className="inline-block group">
                <Logo size="lg" variant="light" />
              </Link>
              <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                {t('footer.aboutDesc')}
              </p>
              <div className="pt-2">
                <span className="text-xs uppercase font-bold tracking-wider text-blue-400 block mb-2">
                  {t('footer.contractor')}
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-medium text-blue-400">
                    {language === 'ar' ? 'رخصة فال: 1200028472' : 'REGA FAL No. 1200028472'}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-medium">
                    {language === 'ar' ? 'معتمد عبر إيجار' : 'Certified Ejar Broker'}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-medium">
                    {language === 'ar' ? 'وساطة وتسويق رسمي' : 'Licensed Real Estate Firm'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links: Group Companies */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-base font-bold text-white tracking-wide uppercase text-sm border-blue-500 border-l-2 rtl:border-l-0 rtl:border-r-2 pl-3 rtl:pl-0 rtl:pr-3">
                {language === 'ar' ? 'شركات ومشاريع المجموعة' : 'Group Arms & Projects'}
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-300">
                <li>
                  <Link href="/realestate" className="hover:text-blue-400 transition-colors flex items-center justify-between">
                    <span>{language === 'ar' ? 'هارد للعقارات (وساطة فال)' : 'HARD Real Estate (VAL)'}</span>
                    <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded font-bold">1200028472</span>
                  </Link>
                </li>
                <li>
                  <Link href="/listings" className="hover:text-blue-400 transition-colors flex items-center justify-between">
                    <span>{language === 'ar' ? 'العقارات والصفقات المتاحة' : 'Verified Property Listings'}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">{language === 'ar' ? 'متاح' : 'Active'}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/construction" className="hover:text-blue-400 transition-colors flex items-center justify-between">
                    <span>{language === 'ar' ? 'هارد للمقاولات والإنشاءات' : 'HARD Construction'}</span>
                    <span className="text-[10px] text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded font-bold">SBC</span>
                  </Link>
                </li>
                <li>
                  <Link href="/hvac" className="hover:text-blue-400 transition-colors flex items-center justify-between">
                    <span>{language === 'ar' ? 'هارد للتكييف والتشغيل' : 'HARD HVAC & Facilities'}</span>
                    <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded font-bold">AMC</span>
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-blue-400 transition-colors">
                    {language === 'ar' ? 'سجل المشاريع والمحافظ الاستثمارية' : 'Master Projects & Portfolios'}
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-blue-400 transition-colors">
                    {language === 'ar' ? 'الخدمات الهندسية والاستشارية' : 'Engineering & Advisory Services'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Holding Links & Advisory */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-base font-bold text-white tracking-wide uppercase text-sm border-blue-500 border-l-2 rtl:border-l-0 rtl:border-r-2 pl-3 rtl:pl-0 rtl:pr-3">
                {language === 'ar' ? 'عن المجموعة' : 'Holding Info'}
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-300">
                <li>
                  <Link href="/about-us" className="hover:text-blue-400 transition-colors">
                    {language === 'ar' ? 'عن المجموعة القابضة' : 'About Holding'}
                  </Link>
                </li>
                <li>
                  <Link href="/our-team" className="hover:text-blue-400 transition-colors">
                    {language === 'ar' ? 'فريق القيادة والخبراء' : 'Executive Leadership'}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-blue-400 transition-colors">
                    {language === 'ar' ? 'المركز الإعلامي' : 'Media Center'}
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="hover:text-blue-400 transition-colors">
                    {language === 'ar' ? 'الأسئلة الشائعة وتراخيص فال' : 'FAQs & Accreditations'}
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="hover:text-blue-400 transition-colors">
                    {language === 'ar' ? 'تواصل مع الإدارة' : 'Contact Management'}
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-blue-400 transition-colors flex items-center justify-between">
                    <span>{language === 'ar' ? 'لوحة التحكم وإدارة المحتوى' : 'Admin Operations'}</span>
                    <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded font-bold">Admin</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-base font-bold text-white tracking-wide uppercase text-sm border-blue-500 border-l-2 rtl:border-l-0 rtl:border-r-2 pl-3 rtl:pl-0 rtl:pr-3">
                {t('footer.newsletter')}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {t('footer.newsletterDesc')}
              </p>

              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.emailPlaceholder')}
                    className={`w-full py-3.5 bg-black/40 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm ${
                      direction === 'rtl' ? 'pr-4 pl-12' : 'pl-4 pr-12'
                    }`}
                  />
                  <button
                    type="submit"
                    className={`absolute top-1.5 bottom-1.5 px-3.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center cursor-pointer ${
                      direction === 'rtl' ? 'left-1.5' : 'right-1.5'
                    }`}
                    aria-label="Subscribe"
                  >
                    <Send className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {subscribed && (
                  <p className="text-xs text-blue-400 flex items-center gap-1 font-bold">
                    <Check className="w-3.5 h-3.5" /> {t('footer.subscribeSuccess')}
                  </p>
                )}
              </form>

              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping shrink-0" />
                  <span>{t('footer.emergency')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 bg-black/40 text-xs text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-medium">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center space-x-6 rtl:space-x-reverse font-medium">
            <Link href="/faqs" className="hover:text-blue-400 transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href="/faqs" className="hover:text-blue-400 transition-colors">
              {t('footer.terms')}
            </Link>
            <Link href="/contact-us" className="hover:text-blue-400 transition-colors">
              {t('footer.support')}
            </Link>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </footer>
  );
}
