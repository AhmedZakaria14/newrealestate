'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Building2, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function NotFound() {
  const { language, theme, direction } = useLanguageTheme();
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <section
        className={`flex-1 flex items-center justify-center py-28 px-4 sm:px-6 lg:px-8 transition-colors ${
          isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-blue-600/10 border border-blue-500/20 text-blue-500 text-4xl font-black mb-2 shadow-2xl">
            404
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {isAr ? 'الصفحة المطلوبة غير موجودة' : 'Page Not Found'}
          </h1>

          <p className="text-sm sm:text-base opacity-75 max-w-md mx-auto leading-relaxed">
            {isAr
              ? 'عذراً، الرابط المطلوب غير متوفر أو تم نقله إلى مسار آخر. يمكنك الرجوع للصفحة السابقة أو زيارة أقسام المجموعة أدناه.'
              : "The page you are looking for might have been moved or doesn't exist. You can go back to your previous page or explore our sections below."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <BackButton
              fallbackUrl="/"
              labelAr="الرجوع للصفحة السابقة"
              labelEn="Go to Previous Page"
              className="py-3 px-6 text-xs sm:text-sm bg-blue-600 text-white hover:bg-blue-500 border-blue-500"
            />

            <Link
              href="/"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isDark
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                  : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{isAr ? 'العودة للرئيسية' : 'Return Home'}</span>
            </Link>

            <Link
              href="/realestate"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isDark
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                  : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>{isAr ? 'قسم العقارات' : 'Real Estate'}</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
