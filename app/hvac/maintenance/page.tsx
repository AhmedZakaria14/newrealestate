'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Fan,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building2,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  Phone,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import ConsultationModal from '@/components/ConsultationModal';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function HvacMaintenancePage() {
  const { language, theme, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <main className={`min-h-screen ${isDark ? 'bg-[#030617] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar />

      {/* Header Banner */}
      <section className={`pt-32 pb-14 px-4 sm:px-6 lg:px-8 border-b ${isDark ? 'bg-[#080d2b]/60 border-white/10' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs opacity-75">
              <Link href="/" className="hover:text-blue-500">{isAr ? 'الرئيسية' : 'Home'}</Link>
              <span>/</span>
              <Link href="/hvac" className="hover:text-blue-500">{isAr ? 'هارد للتكييف' : 'HARD HVAC'}</Link>
              <span>/</span>
              <span className="font-bold text-sky-400">{isAr ? 'عقود الصيانة السنوية (AMC)' : 'Annual Maintenance (AMC)'}</span>
            </div>

            <BackButton fallbackUrl="/hvac" labelAr="الرجوع لقسم التكييف" labelEn="Back to HVAC" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
                <Fan className="w-3.5 h-3.5" />
                {isAr ? 'محطات الشيلرات المركزية وأنظمة VRF' : 'Central Chillers & VRF Infrastructure'}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                {isAr ? 'عقود الصيانة الوقائية والتشغيلية (AMC)' : 'Annual Maintenance Contracts (AMC)'}
              </h1>
              <p className="text-sm sm:text-base opacity-75 max-w-2xl mt-2">
                {isAr
                  ? 'برامج صيانة دورية شاملة تضمن كفاءة الطاقة التشغيلية بنسبة 99.8%، وإطالة العمر الافتراضي لضواغط التبريد ومضخات المياه المبردة.'
                  : 'Comprehensive scheduled maintenance contracts achieving 99.8% HVAC uptime for commercial towers and corporate complexes.'}
              </p>
            </div>

            <button
              onClick={() => setConsultationOpen(true)}
              className="py-3 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-600/30 cursor-pointer self-start md:self-auto shrink-0"
            >
              {isAr ? 'طلب عرض سعر عقد AMC' : 'Request AMC Quotation'}
            </button>
          </div>
        </div>
      </section>

      {/* AMC Scope Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-3 ${
              isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black">{isAr ? 'صيانة دورية كل 30 يوماً' : 'Monthly Scheduled Inspections'}</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              {isAr
                ? 'فحص ضغوط غاز التبريد R-134a / R-410a، تحليل زيوت الكومبروسرات، وتنظيف فلاتر الهواء ومجاري الهواء (Ducts).'
                : 'Refrigerant pressure diagnostics, compressor oil analysis, and comprehensive duct purification.'}
            </p>
          </div>

          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-3 ${
              isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black">{isAr ? 'توفير قطع الغيار الأصلية OEM' : 'OEM Certified Spare Parts'}</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              {isAr
                ? 'استخدام قطع الغيار الأصلية المعتمدة لكبرى الشركات العالمية (York, Carrier, Daikin, Trane, LG) مع ضمان استبدال رسمي.'
                : 'Direct supply chain of factory-certified replacement components with manufacturer warranty.'}
            </p>
          </div>

          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-3 ${
              isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black">{isAr ? 'استجابة سريعة للأعطال' : 'Priority SLA Response'}</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              {isAr
                ? 'وصول فرقة الطوارئ الميدانية لموقع العميل خلال أقل من ساعتين لأي توقف في أبراج التبريد أو وحدات المناولة (AHU).'
                : 'Emergency dispatch SLA guarantee within 120 minutes for cooling outages.'}
            </p>
          </div>
        </div>

        {/* Emergency Link Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-sky-700 via-sky-600 to-blue-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left rtl:md:text-right">
            <h3 className="text-2xl sm:text-3xl font-black">
              {isAr ? 'هل تواجه عطلاً طارئاً في تكييف مبناك الآن؟' : 'Experiencing an Urgent HVAC Breakdown?'}
            </h3>
            <p className="text-sm opacity-90 max-w-xl">
              {isAr
                ? 'فريق طوارئ التكييف الميداني متاح 24/7 للتدخل الفوري عبر شاحنات الصيانة المتنقلة.'
                : 'Our mobile rapid-response fleet is equipped 24/7 for critical commercial cooling interventions.'}
            </p>
          </div>
          <Link
            href="/hvac/emergency"
            className="py-3.5 px-8 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-xl transition-all whitespace-nowrap shrink-0"
          >
            {isAr ? 'طوارئ التكييف 24/7 ←' : '24/7 Emergency Dispatch →'}
          </Link>
        </div>
      </section>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultService={isAr ? 'عقود صيانة وتكييف الهواء AMC' : 'HVAC AMC Contracts'}
      />

      <Footer />
    </main>
  );
}
