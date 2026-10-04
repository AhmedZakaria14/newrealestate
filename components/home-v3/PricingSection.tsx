'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ArrowUpRight,
  MessageCircle,
  Phone,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  Clock,
  Calculator,
} from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function PricingSection() {
  const { language, theme, direction } = useLanguageTheme();
  const [consultationOpen, setConsultationOpen] = useState(false);
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  const pillars = [
    {
      titleAr: 'تقييم عقاري معتمد برخصة فال 1200028472',
      titleEn: 'Official REGA FAL Certified Valuation',
      descAr: 'تحليل مقارن للسوق استناداً لصفقات البورصة العقارية الفعلية لضمان التسعير العادل.',
      descEn: 'Comparative market analysis based on real-time deed transactions for pricing accuracy.',
      icon: ShieldCheck,
    },
    {
      titleAr: 'جداول كميات وتكاليف هندسية شفافة 100%',
      titleEn: '100% Transparent Engineering BOQ Estimates',
      descAr: 'تسعير دقيق لمخططات البناء والإنشاءات دون أي رسوم خفية أو بنود غير مدروسة.',
      descEn: 'Accurate architectural & construction cost estimation with zero hidden fees.',
      icon: FileSpreadsheet,
    },
    {
      titleAr: 'دراسة عائد استثماري وتدفقات نقدية',
      titleEn: 'Projected Yield & Cash Flow Feasibility',
      descAr: 'حساب دقيق للعائد الإيجاري الصافي ومعدلات نمو رأس المال في الخُبر والرياض.',
      descEn: 'Net rental yield modeling and capital appreciation forecasts across KSA corridors.',
      icon: Calculator,
    },
    {
      titleAr: 'استجابة فورية ومعاينة ميدانية خلال 24 ساعة',
      titleEn: 'Rapid 24-Hour Site Audit & Consultation',
      descAr: 'فريق هندسي وعقاري معتمد يزور موقع عقارك ويقدم تقريراً شاملاً وموثقاً.',
      descEn: 'Accredited advisory team conducts rapid on-site inspection with actionable audits.',
      icon: Clock,
    },
  ];

  const whatsappUrl = `https://wa.me/966556125711?text=${encodeURIComponent(
    isAr
      ? 'السلام عليكم، أرغب في طلب دراسة تسعير وتقييم مخصص لعقاري أو مشروعي.'
      : 'Hello, I would like to request a customized valuation and estimation for my property.'
  )}`;

  return (
    <section
      id="custom-estimation"
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors ${
        isDark ? 'bg-[#020410] text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-xs uppercase tracking-widest font-black text-blue-500 px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
            {isAr ? 'تسعير مخصص وشفافية مطلقة' : 'Bespoke Pricing & True Market Value'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {isAr ? (
              <>
                دراسة تسعير واستشارات مخصصة{' '}
                <span className="text-blue-500">بدون باقات وهمية</span>
              </>
            ) : (
              <>
                Bespoke Pricing & Advisory{' '}
                <span className="text-blue-500">With Zero Mock Tiers</span>
              </>
            )}
          </h2>
          <p className="opacity-80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'في هارد، لا نلزمك بباقات نمطية أو أسعار تقديرية وهمية. كل عقار وكل مشروع إنشائي له خصوصيته الهندسية وموقعه الفريد، ونقدم لك دراسة تكلفة وجدوى دقيقة ومعتمدة خلال 24 ساعة.'
              : 'At HARD, we reject artificial or rigid software packages. Every real estate asset and development has unique architectural requirements. We deliver precise, data-driven cost and valuation audits within 24 hours.'}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            const title = isAr ? item.titleAr : item.titleEn;
            const desc = isAr ? item.descAr : item.descEn;

            return (
              <div
                key={idx}
                className={`p-7 rounded-3xl border shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                  isDark
                    ? 'bg-[#080d2b] border-white/10 hover:border-blue-500/50 shadow-black/40'
                    : 'bg-slate-50 border-slate-200 hover:border-blue-500 shadow-slate-200/50'
                }`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-500 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-75 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Excellent Enterprise CTA Card */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 border border-blue-500/30 bg-gradient-to-br from-[#080d2b] via-[#0d1747] to-[#040618] text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>{isAr ? 'تقييم مجاني فوري' : 'Complimentary Assessment'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                {isAr
                  ? 'جاهز للحصول على تقييم دقيق وعرض سعر مخصص لعقارك أو مشروعك؟'
                  : 'Ready for an Accurate Valuation & Customized Project Proposal?'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {isAr
                  ? 'تواصل مباشرة مع أحد كبار مستشارينا المعتمدين برخصة فال 1200028472، وسنقوم بتحليل موقعك، وتدقيق التكاليف، وتقديم خطة متكاملة تحقق أهدافك بأعلى ربحية.'
                  : 'Connect directly with our REGA FAL-certified senior advisory team. We will audit your asset, verify market transactions, and present a complete high-value execution plan.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0">
              <button
                onClick={() => setConsultationOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
              >
                <span>{isAr ? 'طلب استشارة وتسعير مخصص' : 'Request Custom Estimation'}</span>
                <ArrowUpRight
                  className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`}
                />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'محادثة مباشرة عبر واتساب' : 'WhatsApp Broker Direct'}</span>
              </a>

              <a
                href="tel:+966138004273"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span dir="ltr">+966 13 800 4273</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultService="Custom Valuation & Pricing"
      />
    </section>
  );
}
