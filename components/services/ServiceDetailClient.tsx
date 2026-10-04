'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { ServiceItem, servicesData } from '@/data/skyvilla-data';
import { CheckCircle2, ArrowRight, ArrowLeft, Phone, Mail } from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function ServiceDetailClient({ service }: { service: ServiceItem }) {
  const { language, theme, t, direction } = useLanguageTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const isDark = theme === 'dark';

  const title = language === 'ar' ? service.title_ar : service.title;
  const description = language === 'ar' ? service.description_ar : service.description;
  const features = language === 'ar' ? service.features_ar : service.features;

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title={title}
        subtitle={
          language === 'ar'
            ? 'قدرات وإمكانيات هندسية وإنشائية متخصصة ومصممة خصيصاً لتلبية متطلبات مشروعك.'
            : 'Specialized engineering and construction capabilities tailored to your property requirements.'
        }
        breadcrumb={[
          { label: t('nav.services'), href: '/services' },
          { label: title },
        ]}
      />

      <section
        className={`py-24 sm:py-32 overflow-hidden transition-colors ${
          isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Featured Image */}
              <div
                className={`relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden border shadow-2xl ${
                  isDark ? 'border-white/10' : 'border-slate-300'
                }`}
              >
                <Image
                  src={service.image}
                  alt={title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div
                  className={`absolute inset-0 ${
                    isDark
                      ? 'bg-gradient-to-t from-[#040618]/60 via-transparent to-transparent'
                      : 'bg-gradient-to-t from-slate-900/40 via-transparent to-transparent'
                  }`}
                />
              </div>

              <div className="space-y-4">
                <span className="text-xs uppercase font-bold text-blue-500 tracking-widest px-3.5 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                  {language === 'ar' ? `الخدمة رقم #${service.number}` : `Service #${service.number}`}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {language === 'ar' ? `تفاصيل خدمة ${title}` : `Advanced ${title} Overview`}
                </h2>
                <p className="opacity-90 text-base sm:text-lg leading-relaxed">
                  {description}
                </p>
                <p className="opacity-95 text-sm leading-relaxed">
                  {language === 'ar'
                    ? 'تخضع كل مرحلة من مراحل عملنا لمعايير هندسية صارمة ومطابقة لأحدث أكواد البناء العالمية ومواصفات الاستدامة LEED، مع تزويد العميل بتقارير دورية ومسوحات جوية ثلاثية الأبعاد لضمان التسليم بأعلى جودة.'
                    : 'Every stage of our construction process is governed by strict structural safety parameters, LEED bioclimatic standards, and client-centric milestone tracking.'}
                </p>
              </div>

              {/* Core Features & Deliverables */}
              <div
                className={`p-8 rounded-3xl border space-y-6 ${
                  isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <h3 className="text-xl font-bold">
                  {language === 'ar' ? 'المواصفات والمخرجات الهندسية الرئيسية' : 'Key Deliverables & Specifications'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feat, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-4 rounded-2xl border ${
                        isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold opacity-90">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Call to Action */}
              <div
                className={`p-8 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-6 ${
                  isDark
                    ? 'bg-gradient-to-r from-[#0c1033] to-[#040618] border-blue-500/30 text-white'
                    : 'bg-gradient-to-r from-slate-900 to-slate-800 border-slate-700 text-white'
                }`}
              >
                <div>
                  <h4 className="text-xl font-bold mb-1">
                    {language === 'ar'
                      ? `جاهز لبدء ${title} لمشروعك؟`
                      : `Ready to begin ${title.toLowerCase()} for your project?`}
                  </h4>
                  <p className="text-xs opacity-95">
                    {language === 'ar'
                      ? 'احصل على دراسة ميزانية واستشارة مجانية مع كبار مهندسينا.'
                      : 'Get an estimate and consult our senior architectural engineers.'}
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-7 py-3.5 rounded-full bg-blue-600 text-white font-bold text-sm tracking-tight hover:bg-white hover:text-slate-900 transition-colors shrink-0 cursor-pointer"
                >
                  {t('nav.getConsultation')}
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* All Services Navigation */}
              <div
                className={`p-6 rounded-3xl border space-y-4 ${
                  isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <h4 className="text-sm font-bold tracking-wide uppercase border-emerald-500 border-l-2 rtl:border-l-0 rtl:border-r-2 pl-3 rtl:pl-0 rtl:pr-3">
                  {language === 'ar' ? 'كافة الخدمات الإنشائية' : 'All Construction Services'}
                </h4>
                <div className="space-y-2">
                  {servicesData.map((s) => {
                    const sTitle = language === 'ar' ? s.title_ar : s.title;
                    const isActive = s.slug === service.slug;

                    return (
                      <Link
                        key={s.id}
                        href={`/services/${s.slug}`}
                        className={`flex items-center justify-between p-3.5 rounded-xl text-sm font-semibold transition-all ${
                          isActive
                            ? isDark
                              ? 'bg-blue-600 text-white font-bold'
                              : 'bg-emerald-600 text-white font-bold'
                            : isDark
                            ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <span>{sTitle}</span>
                        {direction === 'rtl' ? (
                          <ArrowLeft className="w-4 h-4" />
                        ) : (
                          <ArrowRight className="w-4 h-4" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Direct Assistance Box */}
              <div
                className={`p-6 rounded-3xl border space-y-4 ${
                  isDark
                    ? 'bg-gradient-to-br from-[#0c0f2f] to-[#040618] border-white/10 text-white'
                    : 'bg-slate-900 border-slate-800 text-white shadow-lg'
                }`}
              >
                <h4 className="text-lg font-bold">
                  {language === 'ar' ? 'هل تحتاج إلى استشارة عاجلة؟' : 'Need Immediate Help?'}
                </h4>
                <p className="text-xs opacity-95 leading-relaxed">
                  {language === 'ar'
                    ? 'تحدث مباشرة مع كبار مستشارينا لتنسيق خطة التسويق أو حجز موعد استشارة خاصة.'
                    : 'Speak directly with our senior brokerage advisor regarding marketing or viewing.'}
                </p>
                <div className="space-y-3 pt-2 text-sm">
                  <a
                    href="tel:+966556125711"
                    dir="ltr"
                    className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span className="font-bold">+966 55 612 5711</span>
                  </a>
                  <a
                    href="mailto:info@hardgp.com"
                    className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors truncate"
                  >
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>info@hardgp.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={title}
      />
    </main>
  );
}
