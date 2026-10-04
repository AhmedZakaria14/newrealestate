'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { language, theme } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  useEffect(() => {
    console.error('App runtime error:', error);
  }, [error]);

  return (
    <main className={`min-h-screen flex flex-col justify-between ${isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar />

      <section className="flex-1 flex items-center justify-center py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-2 shadow-2xl">
            <AlertTriangle className="w-10 h-10" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {isAr ? 'حدث خطأ غير متوقع في الصفحة' : 'An Unexpected Error Occurred'}
          </h1>

          <p className="text-sm opacity-75 leading-relaxed">
            {isAr
              ? 'نعتذر عن هذا التوقف المؤقت. تم تسجيل التنبيه، ويمكنك إعادة المحاولة أو الرجوع للصفحة السابقة.'
              : 'We apologize for this temporary interruption. You can retry the operation or navigate back.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{isAr ? 'إعادة المحاولة' : 'Try Again'}</span>
            </button>

            <BackButton
              fallbackUrl="/"
              labelAr="الرجوع للخلف"
              labelEn="Back to Previous"
              className="py-3 px-5 text-xs sm:text-sm"
            />

            <Link
              href="/"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
