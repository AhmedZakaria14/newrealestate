'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';

interface BackButtonProps {
  fallbackUrl?: string;
  labelAr?: string;
  labelEn?: string;
  className?: string;
}

export default function BackButton({
  fallbackUrl = '/',
  labelAr = 'رجوع للخلف',
  labelEn = 'Go Back',
  className = '',
}: BackButtonProps) {
  const router = useRouter();
  const { language, theme, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  const Icon = direction === 'rtl' ? ArrowRight : ArrowLeft;

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
        isDark
          ? 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10'
          : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200 shadow-sm'
      } ${className}`}
      title={isAr ? labelAr : labelEn}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{isAr ? labelAr : labelEn}</span>
    </button>
  );
}
