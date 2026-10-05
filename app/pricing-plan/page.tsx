'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import PricingSection from '@/components/home-v3/PricingSection';
import MarqueeTicker from '@/components/MarqueeTicker';
import { faqsData } from '@/data/skyvilla-data';
import { HelpCircle } from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function PricingPlanPage() {
  const { language, theme, t } = useLanguageTheme();
  const isDark = theme === 'dark';

  const pricingFaqs = faqsData.filter((f) => f.category === 'Pricing & payments' || f.category === 'General questions');

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        pageKey="pricing"
        title={language === 'ar' ? 'التسعير ودراسات الجدوى المعتمدة' : 'Valuation & Project Estimation'}
        subtitle={
          language === 'ar'
            ? 'دراسات تسعير متخصصة وجداول كميات وتكاليف دقيقة لكل عقار ومشروع إنشائي بدون أي باقات نمطية أو رسوم خفية.'
            : 'Authoritative comparative valuations and precision engineering estimates tailored to your asset.'
        }
        breadcrumb={[{ label: language === 'ar' ? 'التسعير والاستشارات' : 'Estimation & Advisory' }]}
      />

      <PricingSection />

      {/* Pricing FAQs */}
      <section
        className={`py-20 border-t transition-colors ${
          isDark
            ? 'bg-[#040618] border-white/10 text-white'
            : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-blue-500">
              {language === 'ar' ? 'الأسئلة الشائعة حول التكاليف' : 'Pricing Questions'}
            </span>
            <h3 className="text-3xl font-extrabold">
              {language === 'ar' ? 'الأسئلة الشائعة حول الدفعات والتسعير' : 'Payment & Estimation FAQs'}
            </h3>
          </div>

          <div className="space-y-4">
            {pricingFaqs.map((faq) => {
              const question = language === 'ar' ? faq.question_ar : faq.question;
              const answer = language === 'ar' ? faq.answer_ar : faq.answer;

              return (
                <div
                  key={faq.id}
                  className={`p-6 rounded-3xl border space-y-2 ${
                    isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <h4 className="text-base font-bold flex items-center gap-2.5">
                    <HelpCircle className="w-5 h-5 text-blue-500 shrink-0" />
                    <span>{question}</span>
                  </h4>
                  <p className="text-sm opacity-100 leading-relaxed pr-8 rtl:pr-8 rtl:pl-0 pl-8">
                    {answer}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <MarqueeTicker
        labelKey="ticker.precision"
        linkTextKey="nav.contact"
        linkHref="/contact-us"
        bgDark={true}
      />

      <Footer />
    </main>
  );
}
