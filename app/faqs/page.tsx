'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { faqsData } from '@/data/skyvilla-data';
import { ChevronDown, HelpCircle, ArrowUpRight } from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function FAQsPage() {
  const { language, theme, t, direction } = useLanguageTheme();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ '1': true, '3': true });
  const [consultationOpen, setConsultationOpen] = useState(false);
  const isDark = theme === 'dark';

  const categories = [
    { key: 'All', label: t('projects.all') },
    { key: 'General questions', label: language === 'ar' ? 'أسئلة عامة' : 'General questions' },
    { key: 'Planning & design', label: language === 'ar' ? 'التخطيط والتصميم' : 'Planning & design' },
    { key: 'Construction & execution', label: language === 'ar' ? 'البناء والتنفيذ' : 'Construction & execution' },
    { key: 'Pricing & payments', label: language === 'ar' ? 'الأسعار وجداول الدفعات' : 'Pricing & payments' },
  ];

  const filteredFaqs =
    activeCategory === 'All'
      ? faqsData
      : faqsData.filter((f) => f.category === activeCategory);

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        pageKey="faqs"
        title={t('nav.faqs')}
        subtitle={
          language === 'ar'
            ? 'إجابات واضحة ومفصلة حول مراحل البناء، المخططات الهندسية، العقود، وجداول التنفيذ.'
            : 'Clear answers about our construction process, architectural planning, contracts, and timelines.'
        }
        breadcrumb={[{ label: t('nav.faqs') }]}
      />

      <section
        className={`py-24 sm:py-32 overflow-hidden transition-colors ${
          isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  activeCategory === cat.key
                    ? isDark
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                      : 'bg-emerald-600 text-white border-blue-600 shadow-md'
                    : isDark
                    ? 'bg-[#080b24] text-gray-300 hover:text-white border-white/10'
                    : 'bg-white text-slate-700 hover:text-slate-900 border-slate-200 shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              const question = language === 'ar' ? faq.question_ar : faq.question;
              const answer = language === 'ar' ? faq.answer_ar : faq.answer;

              return (
                <div
                  key={faq.id}
                  className={`rounded-3xl border overflow-hidden transition-all ${
                    isDark
                      ? 'bg-[#080b24] border-white/10'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full p-6 text-left rtl:text-right flex items-center justify-between gap-4 cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-500 shrink-0">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <span className="text-base sm:text-lg font-bold">
                        {question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 opacity-60 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-500 opacity-100' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-sm sm:text-base opacity-100 leading-relaxed border-t border-gray-500/10 pr-16 rtl:pr-16 rtl:pl-6 pl-16">
                      {answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Need help banner */}
          <div
            className={`mt-16 p-8 rounded-3xl border text-center space-y-4 ${
              isDark
                ? 'bg-gradient-to-r from-[#0c1033] to-[#040618] border-white/10 text-white'
                : 'bg-slate-900 border-slate-800 text-white shadow-xl'
            }`}
          >
            <h4 className="text-2xl font-bold">
              {language === 'ar' ? 'هل لديك استفسار آخر غير موجود هنا؟' : 'Have a question not listed here?'}
            </h4>
            <p className="text-sm opacity-100 max-w-lg mx-auto">
              {language === 'ar'
                ? 'فريقنا الهندسي جاهز دائماً لتقديم التوجيه الفني الكامل لمخططاتك الإنشائية.'
                : 'Our engineering team is always on standby to provide detailed technical guidance for your custom construction plans.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setConsultationOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 text-white font-bold text-sm tracking-tight hover:bg-white transition-colors cursor-pointer"
              >
                <span>{language === 'ar' ? 'تحدث مباشرة مع مهندس مختص' : 'Ask An Expert Directly'}</span>
                <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultService="General FAQ Inquiry"
      />
    </main>
  );
}
