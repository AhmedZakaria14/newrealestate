'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  FileCheck,
  Scale,
  Building2,
  ArrowRight,
  ArrowLeft,
  Phone,
  Calendar,
  Lock,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import ConsultationModal from '@/components/ConsultationModal';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function FalLicensePage() {
  const { language, theme, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <main className={`min-h-screen ${isDark ? 'bg-[#030617] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar />

      {/* Header & Breadcrumb */}
      <section className={`pt-32 pb-14 px-4 sm:px-6 lg:px-8 border-b ${isDark ? 'bg-[#080d2b]/60 border-white/10' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs opacity-75">
              <Link href="/" className="hover:text-blue-500">{isAr ? 'الرئيسية' : 'Home'}</Link>
              <span>/</span>
              <Link href="/realestate" className="hover:text-blue-500">{isAr ? 'هارد للعقارات' : 'HARD Real Estate'}</Link>
              <span>/</span>
              <span className="font-bold text-blue-500">{isAr ? 'رخصة فال والتراخيص النظامية' : 'FAL License'}</span>
            </div>

            <BackButton fallbackUrl="/realestate" labelAr="الرجوع لقسم العقارات" labelEn="Back to Real Estate" />
          </div>

          <div className="max-w-3xl pt-2 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? 'ترخيص رسمي معتمد من الهيئة العامة للعقار' : 'REGA Certified Brokerage'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              {isAr ? 'رخصة فال العقارية رقم 1200028472' : 'FAL License No. 1200028472'}
            </h1>
            <p className="text-sm sm:text-base opacity-80 leading-relaxed">
              {isAr
                ? 'تعمل مجموعة هارد للعقارات تحت مظلة نظام الوساطة العقارية السعودي ولائحته التنفيذية المعتمدة، بما يضمن الشفافية الكاملة وحفظ حقوق البائع والمشتري والمستثمر وفق عقود نظامية موثقة عبر شبكة إيجار ومنصة الهيئة.'
                : 'HARD Real Estate operates under the official Saudi Real Estate Brokerage Law with verified accreditation from the Real Estate General Authority (REGA).'}
            </p>
          </div>
        </div>
      </section>

      {/* Main License Specifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-3 ${
              isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black">{isAr ? 'الوساطة في الصفقات الكبرى' : 'Prime Brokerage'}</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              {isAr
                ? 'إبرام عقود الوساطة العقارية الحصرية للقصور والمجمعات والأبراج التجارية برخص موثقة تضمن عدم تضارب المصالح.'
                : 'Certified brokerage representation for exclusive estates, mansions, and commercial assets.'}
            </p>
          </div>

          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-3 ${
              isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black">{isAr ? 'التسويق العقاري المرخص' : 'Licensed Marketing'}</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              {isAr
                ? 'إعلانات عقارية مرخصة برقم ترخيص إعلاني صادر من الهيئة، تتضمن البيانات الدقيقة وكروكيات الرفع المساحي المعتمدة.'
                : 'Strict advertising compliance with verified cadastral surveys and regulatory property disclosures.'}
            </p>
          </div>

          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-3 ${
              isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black">{isAr ? 'الاستشارات وتحليل السوق' : 'Market Intelligence'}</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              {isAr
                ? 'تقديم دراسات جدوى مالية وعوائد استثمارية (ROI) وتقارير سعر المتر الحقيقي في المنطقة الشرقية والرياض.'
                : 'Institutional feasibility studies, yield projections, and benchmark pricing analytics.'}
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left rtl:md:text-right">
            <h3 className="text-2xl sm:text-3xl font-black">
              {isAr ? 'هل ترغب في تسويق أو بيع عقارك برخصة فال المعتمدة؟' : 'Ready to Market Your Asset via Certified Brokerage?'}
            </h3>
            <p className="text-sm opacity-90 max-w-xl">
              {isAr
                ? 'تواصل مباشرة مع كبار مستشارينا المعتمدين لفتح ملف وساطة فوري وحفظ حقوقك بالكامل.'
                : 'Connect directly with certified brokers to initiate marketing campaigns with 100% legal coverage.'}
            </p>
          </div>
          <button
            onClick={() => setConsultationOpen(true)}
            className="py-3.5 px-8 rounded-xl bg-white text-blue-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            {isAr ? 'طلب وساطة الآن' : 'Initiate Brokerage'}
          </button>
        </div>
      </section>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultService={isAr ? 'الوساطة العقارية برخصة فال' : 'Licensed FAL Brokerage'}
      />

      <Footer />
    </main>
  );
}
