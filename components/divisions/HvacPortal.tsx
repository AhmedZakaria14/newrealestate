'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Wind,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Clock,
  ArrowUpRight,
  ThermometerSnowflake,
  Activity,
  Zap,
  Check,
  Send,
  PhoneCall,
  Wrench,
  AlertCircle,
  Building,
  MapPin,
  Award,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { useSiteContent } from '@/lib/site-content-context';
import ServiceCardsList from '@/components/services/ServiceCardsList';

export default function HvacPortal() {
  const { theme, language, direction } = useLanguageTheme();
  const { getPageBanner } = useSiteContent();
  const isDark = theme === 'dark';
  const isRtl = direction === 'rtl';

  const hvacBanner = getPageBanner('hvac');

  const [formMode, setFormMode] = useState<'amc' | 'emergency'>('amc');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketCode, setTicketCode] = useState('HVC-492810');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    facilityType: 'commercial_tower',
    systemType: 'chiller',
    city: 'riyadh',
    notes: '',
  });

  // HVAC Core Specialties
  const specialties = [
    {
      icon: ThermometerSnowflake,
      titleAr: 'محطات الشيلرات المركزية (Chillers)',
      titleEn: 'Central Industrial Chillers',
      descAr: 'صيانة دورية وإصلاح شامل للشيلرات المبردة بالماء والهواء، وفحص ضواغط التبريد والدارات الإلكترونية والمبادلات الحرارية.',
      descEn: 'Air-cooled and water-cooled chillers, compressor overhaul, refrigerant optimization, and heat exchanger servicing.',
      badgeAr: 'تبريد صناعي',
      badgeEn: 'Industrial Cooling',
    },
    {
      icon: Activity,
      titleAr: 'أنظمة VRF الحديثة والموفرة للطاقة',
      titleEn: 'Modern Energy-Saving VRF Systems',
      descAr: 'حلول متقدمة للتحكم في تدفق الفريون المتغير، برمجة منظومات الـ Inverter، وتوزيع درجات الحرارة بكفاءة طاقة قصوى.',
      descEn: 'Variable Refrigerant Flow tuning, inverter drive diagnostics, microclimate control, and energy efficiency.',
      badgeAr: 'توفير طاقة 40%',
      badgeEn: 'Eco Inverter',
    },
    {
      icon: Wind,
      titleAr: 'تنقية وتعقيم مجاري الهواء (Duct Cleaning)',
      titleEn: 'Air Duct Sanitization & IAQ',
      descAr: 'تنظيف آلي بمعدات متقدمة لإزالة الشوائب والرواسب وتعقيم الهواء الداخلي بمضادات البكتيريا للمستشفيات والأبراج والمنشآت.',
      descEn: 'Robotic air duct cleaning, particulate extraction, antibacterial sanitization, and Indoor Air Quality (IAQ) compliance.',
      badgeAr: 'معايير نقاء عالمية',
      badgeEn: 'Clean Air SLA',
    },
    {
      icon: Clock,
      titleAr: 'طوارئ واستجابة فورية 24/7',
      titleEn: '24/7 Rapid Emergency Response',
      descAr: 'فرق صيانة متنقلة مجهزة بأحدث أدوات التشخيص وقطع الغيار للتدخل السريع وإنقاذ محطات التبريد خلال أقل من 60 دقيقة.',
      descEn: 'Fully equipped mobile response units dispatched 24/7 for zero-downtime emergency chiller recovery.',
      badgeAr: 'أقل من 60 دقيقة',
      badgeEn: '< 60 Min Dispatch',
    },
  ];

  // AMC Preventive Maintenance Capabilities (Custom SLAs)
  const amcCapabilities = [
    {
      id: 'cap-1',
      titleAr: 'صيانة وقائية شاملة لأنظمة الشيلرات وVRF',
      titleEn: 'Comprehensive Chiller & VRF Engineering',
      descAr: 'فحص دوري دقيق لضغط وسائط التبريد، تحليل الاهتزازات، وموازنة الأحمال الكهربائية لتقليل استهلاك الطاقة بنسبة تصل إلى 28%.',
      descEn: 'Periodic precision refrigerant testing, vibration analysis, and electrical load balancing reducing power consumption by up to 28%.',
      badgeAr: 'تشغيل مستمر وموثوق',
      badgeEn: 'Maximum Reliability',
    },
    {
      id: 'cap-2',
      titleAr: 'استجابة فورية لطوارئ التبريد خلال أقل من 60 دقيقة',
      titleEn: 'Guaranteed Emergency Dispatch Under 60 Minutes',
      descAr: 'فرق هندسية متنقلة ومجهزة بقطع غيار أصلية معتمدة جاهزة للتحرك الفوري على مدار 24/7/365 لحماية الأبراج والمرافق الحيوية.',
      descEn: 'Rapid mobile electromechanical units stocked with certified OEM parts ready 24/7/365 for commercial towers and mission-critical assets.',
      badgeAr: 'طوارئ معتمدة 24/7',
      badgeEn: '24/7 Dispatch',
    },
    {
      id: 'cap-3',
      titleAr: 'عقود تشغيل ومطابقة كود البناء السعودي وASHRAE',
      titleEn: 'SBC & ASHRAE Certified Facilities Operations',
      descAr: 'سجلات صيانة إلكترونية موثقة، تنقية وتعقيم دوري لمجاري الهواء ووحدات AHU، ومهندس مشرف مخصص لإدارة المبنى.',
      descEn: 'Audited digital health logs, periodic AHU/duct sanitization, and a dedicated lead engineer assigned to your commercial development.',
      badgeAr: 'امتثال وجودة هندسية',
      badgeEn: 'Engineering Governance',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketCode(`HVC-${Math.floor(100000 + Math.random() * 900000)}`);
    setFormSubmitted(true);
  };

  return (
    <main className="min-h-screen">
      {/* 1. Unified Holding Navbar */}
      <Navbar />

      {/* 2. Standalone Hero Section with Cooling Theme */}
      <section
        id="home"
        className={`relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden transition-colors ${
          isDark ? 'bg-[#040618] text-white' : 'bg-slate-900 text-white'
        }`}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={hvacBanner?.image || '/images/hardgp/slide-12.jpg'}
            alt="هارد لصيانة وتكييف الهواء"
            fill
            priority
            unoptimized
            className="object-cover object-center opacity-30 filter brightness-75 contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040618]/90 via-[#040618]/70 to-[#040618]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 backdrop-blur-md shadow-lg">
              <Wind className="w-4 h-4 text-cyan-400" />
              <span>
                {language === 'ar'
                  ? 'الذراع الكهروميكانيكي والتبريد لمجموعة هارد – طوارئ 24/7'
                  : 'Electromechanical, HVAC & Chiller Engineering Arm'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              {language === 'ar' ? (
                <>
                  هارد لصيانة وتكييف الهواء{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-[#3B82F6]">
                    كفاءة التبريد والصيانة الوقائية
                  </span>
                </>
              ) : (
                <>
                  HARD HVAC & Maintenance{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-[#3B82F6]">
                    Precision Cooling & AMC
                  </span>
                </>
              )}
            </h1>

            {/* Exact User Text */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed font-normal max-w-3xl mx-auto">
              {language === 'ar'
                ? 'الذراع التخصصي للخدمات الكهروميكانيكية والتبريد، يقدم عقود الصيانة الوقائية (AMC) للشيلرات، أنظمة VRF الحديثة، وتنقية مجاري الهواء مع طوارئ واستجابة فورية على مدار الساعة.'
                : 'The specialized arm for electromechanical services and refrigeration, providing annual preventive maintenance contracts (AMC) for chillers, modern VRF systems, and air duct purification with 24/7 emergency immediate response.'}
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-3xl mx-auto">
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
                <span className="block text-2xl lg:text-3xl font-black text-cyan-400">عقود AMC</span>
                <span className="text-xs text-slate-300 mt-1 block">
                  {language === 'ar' ? 'صيانة وقائية سنوية' : 'Annual Preventive'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
                <span className="block text-2xl lg:text-3xl font-black text-sky-300">شيلرات & VRF</span>
                <span className="text-xs text-slate-300 mt-1 block">
                  {language === 'ar' ? 'تخصص هندسي معتمد' : 'Chillers & VRF'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
                <span className="block text-2xl lg:text-3xl font-black text-blue-400">&lt; 60 دقيقة</span>
                <span className="text-xs text-slate-300 mt-1 block">
                  {language === 'ar' ? 'سرعة استجابة الطوارئ' : 'Rapid Response'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
                <span className="block text-2xl lg:text-3xl font-black text-white">24/7/365</span>
                <span className="text-xs text-slate-300 mt-1 block">
                  {language === 'ar' ? 'جاهزية على مدار الساعة' : 'Round-The-Clock'}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="#hvac-form"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 text-slate-950 hover:brightness-105 active:scale-[0.98] transition-all shadow-xl shadow-cyan-500/10 cursor-pointer"
              >
                <span>{language === 'ar' ? 'طلب عقد صيانة وقائية (AMC)' : 'Request AMC Contract'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="tel:920000000"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-bold text-sm bg-red-600/90 hover:bg-red-600 text-white border border-red-500/40 backdrop-blur-md shadow-lg shadow-red-900/30 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{language === 'ar' ? 'خط طوارئ التكييف 24/7' : '24/7 Emergency Hotline'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Specialties */}
      <section
        id="specialties"
        className={`py-16 md:py-24 border-t ${
          isDark ? 'bg-[#060a22] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
              {language === 'ar' ? 'الخدمات الكهروميكانيكية المتخصصة' : 'Electromechanical Core Services'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {language === 'ar' ? 'تخصصات التبريد والصيانة في هارد' : 'Specialized Chiller & VRF Engineering'}
            </h2>
            <p className={`text-sm sm:text-base mt-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'ar'
                ? 'نقدم حلولاً متكاملة لإطالة العمر الافتراضي لمحطات التبريد وخفض استهلاك الطاقة إلى أدنى مستوى.'
                : 'Engineered solutions extending chiller lifespan, improving air purity, and slashing energy overhead.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                    isDark
                      ? 'bg-[#080d2b] border-white/10 hover:border-cyan-400/40'
                      : 'bg-white border-slate-200 hover:border-cyan-600/40 shadow-sm'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                        {language === 'ar' ? item.badgeAr : item.badgeEn}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg sm:text-xl">
                      {language === 'ar' ? item.titleAr : item.titleEn}
                    </h3>

                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {language === 'ar' ? item.descAr : item.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3.1 Detailed HVAC Service Cards */}
      <section
        id="hvac-services-cards"
        className={`py-16 md:py-24 border-t ${
          isDark ? 'bg-[#04071c] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
              {language === 'ar' ? 'حلول التكييف وتشغيل المرافق' : 'Engineered HVAC Solutions'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {language === 'ar' ? 'خدمات التكييف وعقود الصيانة الوقائية AMC' : 'HVAC Engineering & Facility Management'}
            </h2>
            <p className={`text-sm sm:text-base mt-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'ar'
                ? 'تشغيل الشيلرات المركزية وأنظمة VRF، وتوريد قطع الغيار الأصلية، مع فرق طوارئ متأهبة 24/7.'
                : 'Mission-critical chiller servicing, automated dispatch, and turnkey electromechanical facility oversight.'}
            </p>
          </div>

          <ServiceCardsList filterDivision="hvac" showCategoryTabs={false} />
        </div>
      </section>

      {/* 4. AMC Maintenance Packages */}
      <section
        id="amc-contracts"
        className={`py-16 md:py-24 border-t ${
          isDark ? 'bg-[#040618] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
              {language === 'ar' ? 'عقود الصيانة الوقائية والتشغيل المخصص (AMC)' : 'Bespoke Facilities Operations & AMC'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {language === 'ar' ? 'اتفاقيات تشغيل مخصصة لمبناك ومنشأتك بدون باقات نمطية' : 'Customized SLA Agreements Engineered for Zero Downtime'}
            </h2>
            <p className={`text-sm sm:text-base mt-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'ar'
                ? 'ندرس الأحمال الحرارية ومعدات التبريد والشيلرات في منشأتك لنصمم اتفاقية تشغيل وصيانة وقائية متكاملة تضمن كفاءة الطاقة واستمرارية العمل 24/7.'
                : 'We evaluate mechanical plant tonnage, ambient thermal load, and mission-critical SLAs to structure a dedicated 24/7 preventive operating agreement.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {amcCapabilities.map((cap) => (
              <div
                key={cap.id}
                className={`rounded-3xl p-6 sm:p-8 border flex flex-col justify-between transition-all duration-300 ${
                  isDark
                    ? 'bg-[#080d2b] border-white/10 hover:border-cyan-400/40 shadow-xl'
                    : 'bg-white border-slate-200 hover:border-cyan-500 shadow-md'
                }`}
              >
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    {language === 'ar' ? cap.badgeAr : cap.badgeEn}
                  </span>
                  <h3 className="text-xl font-bold">
                    {language === 'ar' ? cap.titleAr : cap.titleEn}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {language === 'ar' ? cap.descAr : cap.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Excellent Custom AMC CTA */}
          <div className="rounded-3xl p-8 sm:p-12 border border-cyan-500/30 bg-gradient-to-r from-[#080d2b] via-[#09153d] to-[#080d2b] text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center lg:text-start">
              <h3 className="text-xl sm:text-2xl font-black">
                {language === 'ar' ? 'هل ترغب في فحص ميداني وتصميم عقد AMC مخصص لمنشأتك؟' : 'Need an On-Site Audit & Custom AMC Agreement for Your Facility?'}
              </h3>
              <p className="text-xs sm:text-sm text-cyan-100 max-w-2xl">
                {language === 'ar' ? 'فريقنا الهندسي ينتقل لموقعك لإجراء تدقيق فني شامل وتقديم مقترح تشغيلي دقيق خلال 24 ساعة.' : 'Our HVAC engineering team performs on-site psychrometric audits and delivers an authoritative SLA proposal within 24 hours.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="#hvac-form"
                className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition-all"
              >
                {language === 'ar' ? 'طلب معاينة ميدانية فنية' : 'Request Technical Site Audit'}
              </a>
              <a
                href="https://wa.me/966556125711?text=HVAC%20AMC%20Request"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                {language === 'ar' ? 'واتساب طوارئ التكييف' : 'WhatsApp 24/7 Dispatch'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Service & Emergency Dispatch Form */}
      <section
        id="hvac-form"
        className={`py-16 md:py-24 border-t ${
          isDark ? 'bg-[#060a22] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`p-6 sm:p-12 rounded-3xl border ${
              isDark
                ? 'bg-[#080d2b] border-cyan-500/20'
                : 'bg-white border-slate-200 shadow-xl'
            }`}
          >
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                {language === 'ar' ? 'غرفة عمليات التبريد والصيانة' : 'HVAC Operations & Dispatch'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {language === 'ar' ? 'طلب عقد صيانة وقائية أو بلاغ طوارئ 24/7' : 'Request AMC or Emergency Dispatch'}
              </h2>
              <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'ar'
                  ? 'يقوم المشرف الكهروميكانيكي بمعالجة البلاغ وتوجيه فرقة الصيانة الميدانية فورياً.'
                  : 'Our electromechanical coordinators schedule survey audits or dispatch rapid units.'}
              </p>

              {/* Mode Toggle */}
              <div className="inline-flex p-1.5 rounded-2xl bg-black/40 border border-white/10 mt-6">
                <button
                  type="button"
                  onClick={() => setFormMode('amc')}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    formMode === 'amc'
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {language === 'ar' ? 'عقد صيانة وقائية سنوي (AMC)' : 'Annual Preventive AMC'}
                </button>
                <button
                  type="button"
                  onClick={() => setFormMode('emergency')}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    formMode === 'emergency'
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {language === 'ar' ? 'بلاغ طوارئ عاجل 24/7' : 'Emergency 24/7 Dispatch'}
                </button>
              </div>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-cyan-400 mx-auto" />
                <h4 className="text-xl font-extrabold text-cyan-300">
                  {language === 'ar' ? 'تم تسجيل بلاغ الصيانة بنجاح' : 'Service Request Dispatched'}
                </h4>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  {language === 'ar'
                    ? `رقم بلاغ الصيانة: #${ticketCode}، وفريق الطوارئ والمشرف الفني في طريقه للتواصل معكم.`
                    : `Your HVAC service ticket (#${ticketCode}) has been routed to dispatch. A field engineer is connecting.`}
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
                >
                  {language === 'ar' ? 'إرسال طلب آخر' : 'Send Another Ticket'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-100">
                      {language === 'ar' ? 'اسم المنشأة أو المسؤول' : 'Facility or Contact Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === 'ar' ? 'مثال: برج الأعمال، م. خالد' : 'e.g. Business Tower, Eng. Khaled'}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                        isDark
                          ? 'bg-black/40 border-white/10 text-white focus:border-cyan-400'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-cyan-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-100">
                      {language === 'ar' ? 'رقم الاتصال المباشر' : 'Emergency Phone'} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="05xxxxxxxx"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                        isDark
                          ? 'bg-black/40 border-white/10 text-white focus:border-cyan-400'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-cyan-600'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-100">
                      {language === 'ar' ? 'نوع المنشأة' : 'Facility Type'}
                    </label>
                    <select
                      value={formData.facilityType}
                      onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                        isDark
                          ? 'bg-black/40 border-white/10 text-white focus:border-cyan-400'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-cyan-600'
                      }`}
                    >
                      <option value="commercial_tower" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'برج تجاري / مكاتب' : 'Commercial Tower'}</option>
                      <option value="hotel" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'فندق أو مجمع ضيافة' : 'Hotel / Hospitality'}</option>
                      <option value="hospital" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'مستشفى أو مركز طبي' : 'Hospital / Medical'}</option>
                      <option value="mall" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'مركز تسوق ومول' : 'Shopping Mall'}</option>
                      <option value="residential" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'مجمع سكني أو قصر' : 'Residential Compound'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-100">
                      {language === 'ar' ? 'نوع نظام التكييف' : 'System Architecture'}
                    </label>
                    <select
                      value={formData.systemType}
                      onChange={(e) => setFormData({ ...formData, systemType: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                        isDark
                          ? 'bg-black/40 border-white/10 text-white focus:border-cyan-400'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-cyan-600'
                      }`}
                    >
                      <option value="chiller" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'محطات شيلرات مركزية (Chillers)' : 'Central Chillers'}</option>
                      <option value="vrf" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'أنظمة VRF الحديثة' : 'Modern VRF Systems'}</option>
                      <option value="package" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'وحدات مدمجة (Package Units)' : 'Package Units'}</option>
                      <option value="duct" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'تنقية مجاري الهواء (Duct Cleaning)' : 'Duct Cleaning / IAQ'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-100">
                      {language === 'ar' ? 'مدينة المنشأة' : 'City Location'}
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                        isDark
                          ? 'bg-black/40 border-white/10 text-white focus:border-cyan-400'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-cyan-600'
                      }`}
                    >
                      <option value="riyadh" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'الرياض' : 'Riyadh'}</option>
                      <option value="khobar" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'الخبر' : 'Al Khobar'}</option>
                      <option value="dammam" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'الدمام' : 'Dammam'}</option>
                      <option value="eastern" className="bg-white text-slate-900 dark:bg-[#080d2b] dark:text-white font-medium">{language === 'ar' ? 'المنطقة الشرقية' : 'Eastern Province'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-100">
                    {language === 'ar' ? 'ملاحظات العطل أو نطاق العقد' : 'Malfunction Details / Scope'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={
                      language === 'ar'
                        ? 'وضح طاقة التبريد التقديرية (طن تبريد)، الأعراض، أو المتطلبات الخاصة...'
                        : 'Specify cooling tonnage, symptoms, or specific requirements...'
                    }
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                      isDark
                        ? 'bg-black/40 border-white/10 text-white focus:border-cyan-400'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-cyan-600'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 rounded-xl font-bold text-sm text-white transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                    formMode === 'emergency'
                      ? 'bg-red-600 hover:bg-red-500 shadow-red-900/30'
                      : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/30'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {formMode === 'emergency'
                      ? language === 'ar'
                        ? 'إرسال بلاغ الطوارئ الفوري لغرفة العمليات'
                        : 'Dispatch Immediate Emergency Crew'
                      : language === 'ar'
                      ? 'إرسال طلب دراسة عقد الصيانة الوقائية (AMC)'
                      : 'Submit Preventive Maintenance SLA Request'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 6. Global Single Footer */}
      <Footer />
    </main>
  );
}
