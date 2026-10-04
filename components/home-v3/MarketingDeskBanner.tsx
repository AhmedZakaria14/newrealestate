'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  Sparkles,
  ArrowUpRight,
  MessageCircle,
  Phone,
  ShieldCheck,
  Building,
} from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';

export default function MarketingDeskBanner() {
  const { language, theme, direction } = useLanguageTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  const whatsappUrl = `https://wa.me/966508000000?text=${encodeURIComponent(
    isAr
      ? 'السلام عليكم، أرغب في إدراج وتسويق عقاري عبر هارد للعقارات.'
      : 'Hello, I would like to list and market my property via HARD Real Estate.'
  )}`;

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 border border-blue-500/30 bg-gradient-to-br from-[#080d2b] via-[#0d164d] to-[#080d2b] text-white shadow-2xl">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>{isAr ? 'المكتب التسويقي المتخصص' : 'Premier Marketing Desk'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {isAr
              ? 'سوّق عقارك وحقق أعلى عائد وأسرع إفراغ'
              : 'Selling or Renting Your Property?'}
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
            {isAr
              ? 'استفد من إنتاجنا الإعلامي السينمائي، وحملات الاستهداف الرقمية، وشبكة المستثمرين الخاصة لبيع عقارك بأفضل سعر وبإشراف مرخص من الهيئة العامة للعقار.'
              : 'Partner with our elite marketing desk to showcase your asset to verified cash buyers, institutional funds, and family offices with REGA/FAL accreditation.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>{isAr ? 'أدرج عقارك للبيع أو الإيجار' : 'List Your Property with Us'}</span>
              <ArrowUpRight
                className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`}
              />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'تواصل عبر واتساب' : 'WhatsApp Broker Direct'}</span>
            </a>

            <Link
              href="/marketing"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm transition-all"
            >
              <span>{isAr ? 'خدمات وحلول التسويق العقاري' : 'Marketing Solutions & Advisory'}</span>
            </Link>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
