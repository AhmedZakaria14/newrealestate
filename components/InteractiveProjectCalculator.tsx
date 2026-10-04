'use client';

import React, { useState, useMemo } from 'react';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  Calculator,
  Building2,
  HardHat,
  Fan,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Phone,
  MessageCircle,
} from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';

export default function InteractiveProjectCalculator() {
  const { language, theme, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const [consultationOpen, setConsultationOpen] = useState(false);

  // Form states
  const [sector, setSector] = useState<'construction' | 'realestate' | 'hvac'>('construction');
  const [projectType, setProjectType] = useState<'villa' | 'commercial' | 'tower' | 'residential_complex'>('villa');
  const [area, setArea] = useState<number>(650);
  const [finishGrade, setFinishGrade] = useState<'deluxe' | 'super_luxury' | 'turnkey_smart'>('super_luxury');
  const [city, setCity] = useState<'khobar' | 'riyadh' | 'dammam' | 'jeddah'>('khobar');

  // Realistic estimation models for the Saudi market
  const calculation = useMemo(() => {
    let ratePerSqMeter = 2400; // Base SAR per m²

    if (sector === 'construction') {
      if (projectType === 'villa') ratePerSqMeter = finishGrade === 'deluxe' ? 2200 : finishGrade === 'super_luxury' ? 2850 : 3600;
      if (projectType === 'commercial') ratePerSqMeter = finishGrade === 'deluxe' ? 1950 : finishGrade === 'super_luxury' ? 2450 : 3100;
      if (projectType === 'tower') ratePerSqMeter = finishGrade === 'deluxe' ? 3200 : finishGrade === 'super_luxury' ? 4100 : 5200;
      if (projectType === 'residential_complex') ratePerSqMeter = finishGrade === 'deluxe' ? 2100 : finishGrade === 'super_luxury' ? 2700 : 3400;
    } else if (sector === 'realestate') {
      // Estimated investment asset value per m² based on city
      const cityMultiplier = city === 'riyadh' ? 1.35 : city === 'khobar' ? 1.15 : 1.0;
      ratePerSqMeter = Math.round(3800 * cityMultiplier);
    } else {
      // HVAC AMC & mechanical installation rate per m²
      ratePerSqMeter = finishGrade === 'deluxe' ? 240 : finishGrade === 'super_luxury' ? 380 : 540;
    }

    const estimatedTotal = area * ratePerSqMeter;
    const minRange = Math.round(estimatedTotal * 0.93);
    const maxRange = Math.round(estimatedTotal * 1.07);

    // Timeline calculation in months
    let estimatedMonths = 12;
    if (area < 500) estimatedMonths = 10;
    else if (area < 1500) estimatedMonths = 14;
    else if (area < 4000) estimatedMonths = 20;
    else estimatedMonths = 28;

    if (sector === 'hvac') estimatedMonths = Math.max(1, Math.round(estimatedMonths / 3));

    return {
      ratePerSqMeter,
      minRange,
      maxRange,
      estimatedMonths,
    };
  }, [sector, projectType, area, finishGrade, city]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(isAr ? 'ar-SA' : 'en-US', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section
      id="project-calculator"
      className={`py-16 sm:py-24 transition-colors ${
        isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest">
            <Calculator className="w-4 h-4" />
            <span>{isAr ? 'حاسبة المشاريع التقديرية الفورية' : 'Instant Project Cost Estimator'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {isAr ? 'قدّر تكلفة وجدول مشروعك بدقة' : 'Estimate Your Project Budget & Timeline'}
          </h2>
          <p className="text-sm sm:text-base opacity-75 max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'احصل على تقدير أولي واقعي مبني على معايير السوق السعودي وأسعار المواد وفق كود البناء SBC، مع إمكانية تثبيت العرض عبر استشارة هندسية مجانية.'
              : 'Calculate a realistic preliminary budget based on Saudi Building Code (SBC) benchmarks and prevailing market rates.'}
          </p>
        </div>

        {/* Main Interactive Calculator Card */}
        <div
          className={`rounded-3xl border shadow-2xl p-6 sm:p-8 lg:p-10 ${
            isDark
              ? 'bg-[#080d2b] border-white/10 shadow-black/50'
              : 'bg-white border-slate-200 shadow-slate-200/60'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Inputs Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Sector Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2.5 opacity-80">
                  {isAr ? '1. اختر قطاع الخدمة' : '1. Select Business Sector'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSector('construction')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      sector === 'construction'
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                        : isDark
                        ? 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <HardHat className="w-4 h-4" />
                    <span>{isAr ? 'المقاولات والإنشاءات' : 'Construction'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSector('realestate')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      sector === 'realestate'
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                        : isDark
                        ? 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>{isAr ? 'الوساطة والاستثمار' : 'Real Estate'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSector('hvac')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      sector === 'hvac'
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                        : isDark
                        ? 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Fan className="w-4 h-4" />
                    <span>{isAr ? 'التكييف والتشغيل' : 'HVAC Systems'}</span>
                  </button>
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                  {isAr ? '2. تصنيف المبنى أو العقار' : '2. Facility / Asset Type'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'villa', labelAr: 'فيلا خاصة فاخرة', labelEn: 'Private Villa' },
                    { id: 'commercial', labelAr: 'مجمع تجاري / مكتبي', labelEn: 'Commercial Hub' },
                    { id: 'tower', labelAr: 'برج سكني / إداري', labelEn: 'Mid/High Rise' },
                    { id: 'residential_complex', labelAr: 'مجمع فلل سكني', labelEn: 'Compound' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setProjectType(item.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer truncate ${
                        projectType === item.id
                          ? 'bg-blue-500/15 border-blue-500 text-blue-400 font-bold'
                          : isDark
                          ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isAr ? item.labelAr : item.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-80">
                    {isAr ? '3. إجمالي المساحة التقريبية (م²)' : '3. Approximate Total Area (m²)'}
                  </label>
                  <span className="text-base font-black text-blue-500">
                    {area.toLocaleString()} {isAr ? 'متر مربع' : 'm²'}
                  </span>
                </div>
                <input
                  type="range"
                  min={250}
                  max={8000}
                  step={50}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-2 bg-slate-300 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] opacity-60">
                  <span>250 م²</span>
                  <span>2,000 م²</span>
                  <span>5,000 م²</span>
                  <span>8,000+ م²</span>
                </div>
              </div>

              {/* Finish Grade & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                    {isAr ? '4. مستوى التشطيب والمواصفات' : '4. Specification Grade'}
                  </label>
                  <select
                    value={finishGrade}
                    onChange={(e) => setFinishGrade(e.target.value as any)}
                    className={`w-full p-3 rounded-xl border text-xs font-bold transition-all focus:outline-none focus:border-blue-500 ${
                      isDark
                        ? 'bg-[#05081e] border-white/15 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="deluxe">{isAr ? 'ديلوكس هندسي معتمد (SBC)' : 'Deluxe Engineered'}</option>
                    <option value="super_luxury">{isAr ? 'سوبر لاكجري فاخر مع أنظمة ذكية' : 'Super Luxury & Smart'}</option>
                    <option value="turnkey_smart">{isAr ? 'قصور وفلل رئاسية فائقة الفخامة' : 'Presidential Ultra-Luxury'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                    {isAr ? '5. المدينة / الموقع الجغرافي' : '5. Location / City'}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value as any)}
                    className={`w-full p-3 rounded-xl border text-xs font-bold transition-all focus:outline-none focus:border-blue-500 ${
                      isDark
                        ? 'bg-[#05081e] border-white/15 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="khobar">{isAr ? 'الخُبر والدمام والظهران (المنطقة الشرقية)' : 'Khobar / Dammam / Dhahran'}</option>
                    <option value="riyadh">{isAr ? 'مدينة الرياض' : 'Riyadh'}</option>
                    <option value="jeddah">{isAr ? 'جدة والمنطقة الغربية' : 'Jeddah / Western Province'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Live Estimation Output Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div
                className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between h-full space-y-6 ${
                  isDark
                    ? 'bg-gradient-to-br from-[#0c1445] to-[#060a24] border-blue-500/30'
                    : 'bg-gradient-to-br from-blue-50 to-sky-50/50 border-blue-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-500 border border-blue-500/20">
                      {isAr ? 'التقدير التقديري الأولي' : 'Preliminary Estimate'}
                    </span>
                    <span className="text-xs opacity-75">
                      {isAr ? 'ريال سعودي (SAR)' : 'SAR'}
                    </span>
                  </div>

                  <div className="space-y-1 mb-6">
                    <div className="text-3xl sm:text-4xl font-black text-blue-500 tracking-tight">
                      {formatCurrency(calculation.minRange)} - {formatCurrency(calculation.maxRange)}
                    </div>
                    <p className="text-xs opacity-75">
                      {isAr ? 'نطاق الميزانية التقديرية بناءً على خياراتك' : 'Estimated budget range based on selections'}
                    </p>
                  </div>

                  {/* Highlight Specs */}
                  <div className="space-y-3 pt-4 border-t border-gray-500/20 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="opacity-75">{isAr ? 'متوسط سعر المتر المربع:' : 'Avg. Rate per m²:'}</span>
                      <span className="font-bold">{formatCurrency(calculation.ratePerSqMeter)} {isAr ? 'ريال/م²' : 'SAR/m²'}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="opacity-75">{isAr ? 'المدة الزمنية المتوقعة للإنجاز:' : 'Estimated Timeline:'}</span>
                      <span className="font-bold flex items-center gap-1.5 text-blue-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {calculation.estimatedMonths} {isAr ? 'شهر تقريبياً' : 'Months'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="opacity-75">{isAr ? 'مطابقة الكود والترخيص:' : 'Compliance Standard:'}</span>
                      <span className="font-bold text-emerald-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {isAr ? 'كود SBC + رخصة فال' : 'SBC Code + FAL'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Trigger */}
                <div className="space-y-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setConsultationOpen(true)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>{isAr ? 'تثبيت هذا التقدير واستشارة مهندس' : 'Lock This Estimate & Consult Lead Engineer'}</span>
                    <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                  </button>

                  <div className="flex items-center justify-center gap-4 text-xs">
                    <a
                      href="https://wa.me/966556125711"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-500 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{isAr ? 'استفسار عبر الواتساب' : 'WhatsApp Inquiry'}</span>
                    </a>
                    <span className="opacity-40">|</span>
                    <a
                      href="tel:+966138004273"
                      className="text-blue-500 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{isAr ? 'اتصال مباشر' : 'Direct Call'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </section>
  );
}
