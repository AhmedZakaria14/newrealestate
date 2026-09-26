'use client';

import React, { useState } from 'react';
import { Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { pricingPlans } from '@/data/skyvilla-data';
import ConsultationModal from '@/components/ConsultationModal';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function PricingSection() {
  const { language, theme, t, direction } = useLanguageTheme();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('Standard Plan');
  const [consultationOpen, setConsultationOpen] = useState(false);

  const isDark = theme === 'dark';

  return (
    <section
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors ${
        isDark ? 'bg-[#020410] text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-emerald-500 px-3.5 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
            {t('pricing.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {t('pricing.titlePre')}{' '}
            <span className={isDark ? 'text-[#DCFF09]' : 'text-emerald-600'}>
              {t('pricing.titleHighlight')}
            </span>
          </h2>
          <p className="opacity-75 text-sm sm:text-base leading-relaxed">
            {t('pricing.subtitle')}
          </p>

          {/* Billing Switcher */}
          <div
            className={`pt-4 inline-flex items-center p-1.5 rounded-full border ${
              isDark
                ? 'bg-[#080b24] border-white/10'
                : 'bg-slate-100 border-slate-200 shadow-inner'
            }`}
          >
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingPeriod === 'monthly'
                  ? isDark
                    ? 'bg-[#DCFF09] text-[#040618] shadow-md'
                    : 'bg-white text-slate-900 shadow-md'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {t('pricing.monthly')}
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingPeriod === 'annual'
                  ? isDark
                    ? 'bg-[#DCFF09] text-[#040618] shadow-md'
                    : 'bg-white text-slate-900 shadow-md'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <span>{t('pricing.annual')}</span>
              <span
                className={`text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full ${
                  isDark ? 'bg-white text-[#040618]' : 'bg-emerald-600 text-white'
                }`}
              >
                {t('pricing.save20')}
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => {
            const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
            const isFeatured = plan.popular;
            const name = language === 'ar' ? plan.name_ar : plan.name;
            const subtitle = language === 'ar' ? plan.subtitle_ar : plan.subtitle;
            const description = language === 'ar' ? plan.description_ar : plan.description;
            const features = language === 'ar' ? plan.features_ar : plan.features;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 shadow-2xl border ${
                  isFeatured
                    ? isDark
                      ? 'bg-[#0c1033] border-2 border-[#DCFF09] shadow-[#DCFF09]/15'
                      : 'bg-white border-2 border-emerald-500 shadow-emerald-500/10'
                    : isDark
                    ? 'bg-[#080b24] border-white/10 hover:border-white/30'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {isFeatured && (
                  <div
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-md ${
                      isDark
                        ? 'bg-[#DCFF09] text-[#040618]'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {t('pricing.popular')}
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-extrabold mb-2">{name}</h3>
                    <p className="text-xs opacity-70">{subtitle}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-gray-500/15">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black">${price}</span>
                      <span className="opacity-70 text-sm font-semibold">
                        {t('pricing.perMonth')}
                      </span>
                    </div>
                    <p className="text-xs opacity-70 mt-2">{description}</p>
                  </div>

                  {/* Feature list */}
                  <div className="space-y-3 mb-8">
                    <span className="block text-xs uppercase font-bold tracking-wider text-emerald-500 mb-4">
                      {t('pricing.included')}
                    </span>
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm opacity-90">
                        <div
                          className={`p-1 rounded-full shrink-0 mt-0.5 ${
                            isFeatured
                              ? isDark
                                ? 'bg-[#DCFF09] text-[#040618]'
                                : 'bg-emerald-600 text-white'
                              : isDark
                              ? 'bg-white/10 text-[#DCFF09]'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSelectedPlan(name);
                      setConsultationOpen(true);
                    }}
                    className={`w-full py-4 rounded-2xl font-bold text-sm tracking-tight flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isFeatured
                        ? isDark
                          ? 'bg-[#DCFF09] text-[#040618] hover:bg-white shadow-lg'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                        : isDark
                        ? 'bg-white/10 text-white hover:bg-[#DCFF09] hover:text-[#040618]'
                        : 'bg-slate-900 text-white hover:bg-emerald-600'
                    }`}
                  >
                    <span>{t('pricing.getStarted')}</span>
                    <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom guarantee badge */}
        <div className="mt-12 text-center text-xs sm:text-sm opacity-80">
          <div
            className={`inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3 rounded-full border ${
              isDark
                ? 'bg-[#080b24] border-white/10 text-white'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <span className="flex items-center gap-2 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {t('pricing.trial')}
            </span>
            <span className="opacity-30 hidden sm:inline">•</span>
            <span className="flex items-center gap-2 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {t('pricing.noHidden')}
            </span>
            <span className="opacity-30 hidden sm:inline">•</span>
            <span className="flex items-center gap-2 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {t('pricing.cancelAnytime')}
            </span>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultService={`Pricing Plan: ${selectedPlan}`}
      />
    </section>
  );
}
