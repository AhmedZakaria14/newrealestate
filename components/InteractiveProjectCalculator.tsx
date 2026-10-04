'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';
import ConsultationModal from '@/components/ConsultationModal';

export default function InteractiveProjectCalculator() {
  const { language, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isRtl = direction === 'rtl';

  const [projectType, setProjectType] = useState<'villa' | 'commercial' | 'renovation' | 'hvac'>('villa');
  const [area, setArea] = useState<number>(450);
  const [finishingGrade, setFinishingGrade] = useState<'standard' | 'luxury' | 'ultra'>('luxury');
  const [includeHVAC, setIncludeHVAC] = useState<boolean>(true);
  const [includeSupervision, setIncludeSupervision] = useState<boolean>(true);
  const [consultationOpen, setConsultationOpen] = useState<boolean>(false);

  // Cost estimates based on Saudi SBC standard rates
  const calculation = useMemo(() => {
    let baseRatePerSqm = 1800; // SAR/sqm base for villa structure + basic finish
    if (projectType === 'commercial') baseRatePerSqm = 2200;
    if (projectType === 'renovation') baseRatePerSqm = 950;
    if (projectType === 'hvac') baseRatePerSqm = 400;

    let gradeMultiplier = 1.0;
    if (finishingGrade === 'luxury') gradeMultiplier = 1.35;
    if (finishingGrade === 'ultra') gradeMultiplier = 1.75;

    let constructionCost = area * baseRatePerSqm * gradeMultiplier;

    let hvacCost = 0;
    if (includeHVAC && projectType !== 'hvac') {
      hvacCost = area * 350; // Central / Concealed HVAC package
    }

    let supervisionCost = 0;
    if (includeSupervision) {
      supervisionCost = constructionCost * 0.05; // 5% engineering supervision
    }

    const totalEstimate = Math.round(constructionCost + hvacCost + supervisionCost);
    const estimatedDurationMonths = Math.max(3, Math.ceil(area / 60));

    return {
      totalEstimate,
      constructionCost: Math.round(constructionCost),
      hvacCost: Math.round(hvacCost),
      supervisionCost: Math.round(supervisionCost),
      estimatedDurationMonths,
    };
  }, [projectType, area, finishingGrade, includeHVAC, includeSupervision]);

  return (
    <section className="bg-[#0a0a0a] py-20 sm:py-28 text-[#E1E0CC] border-t border-[#222222] relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DEDBC8]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#2e2e2e] text-xs font-semibold text-[#DEDBC8]">
            <Calculator className="w-3.5 h-3.5 text-[#DEDBC8]" />
            <span>{isAr ? 'حاسبة التكاليف التقديرية الذكية' : 'Smart Construction & Real Estate Estimator'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {isAr ? 'احسب تكلفة مشروعك الإنشائي والاستثماري' : 'Estimate Your Project & Investment Cost'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light max-w-2xl mx-auto">
            {isAr
              ? 'أداة تقديرية تعتمد على معايير الكود السعودي للبناء (SBC) ومتوسط أسعار المواد المعتمدة والمقاولات.'
              : 'Real-time estimation based on Saudi Building Code (SBC) benchmarks and current market material rates.'}
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#121212] border border-[#262626] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Project Type */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {isAr ? 'نوع المشروع' : 'Project Category'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'villa', labelAr: 'فيلا سكنية', labelEn: 'Residential Villa' },
                  { id: 'commercial', labelAr: 'مبنى تجاري', labelEn: 'Commercial' },
                  { id: 'renovation', labelAr: 'ترميم وتطوير', labelEn: 'Renovation' },
                  { id: 'hvac', labelAr: 'تكييف مركزي', labelEn: 'HVAC Package' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProjectType(item.id as any)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                      projectType === item.id
                        ? 'bg-[#242424] text-[#DEDBC8] border-[#DEDBC8]/40 shadow-inner'
                        : 'bg-[#181818] text-gray-400 hover:text-white border-[#282828]'
                    }`}
                  >
                    {isAr ? item.labelAr : item.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Area Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold uppercase tracking-wider text-gray-400">
                  {isAr ? 'المساحة الإجمالية للمبنى' : 'Total Built-up Area'}
                </span>
                <span className="font-bold text-[#DEDBC8] text-sm font-mono">
                  {area} {isAr ? 'م²' : 'm²'}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="3000"
                step="25"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#DEDBC8]"
              />
              <div className="flex justify-between text-[11px] text-gray-500 font-mono">
                <span>100 م²</span>
                <span>1,500 م²</span>
                <span>3,000 م²</span>
              </div>
            </div>

            {/* Finishing Quality */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {isAr ? 'مستوى التشطيب والمواصفات' : 'Finishing Quality & Specifications'}
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'standard', labelAr: 'مودرن قياسي', labelEn: 'Standard Modern' },
                  { id: 'luxury', labelAr: 'فاخر ديلوكس', labelEn: 'Premium Deluxe' },
                  { id: 'ultra', labelAr: 'سوبر الترا VIP', labelEn: 'Ultra Luxury VIP' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFinishingGrade(item.id as any)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                      finishingGrade === item.id
                        ? 'bg-[#242424] text-[#DEDBC8] border-[#DEDBC8]/40 shadow-inner'
                        : 'bg-[#181818] text-gray-400 hover:text-white border-[#282828]'
                    }`}
                  >
                    {isAr ? item.labelAr : item.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Options Toggles */}
            <div className="pt-2 border-t border-[#222] space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {isAr ? 'الخدمات الإضافية المشمولة' : 'Included Additional Services'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#181818] border border-[#282828] cursor-pointer hover:border-[#383838]">
                  <input
                    type="checkbox"
                    checked={includeHVAC}
                    onChange={(e) => setIncludeHVAC(e.target.checked)}
                    className="rounded accent-[#DEDBC8] w-4 h-4"
                  />
                  <span className="text-xs font-medium text-gray-300">
                    {isAr ? 'شامل أنظمة التكييف والتهوية' : 'Include Central HVAC System'}
                  </span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#181818] border border-[#282828] cursor-pointer hover:border-[#383838]">
                  <input
                    type="checkbox"
                    checked={includeSupervision}
                    onChange={(e) => setIncludeSupervision(e.target.checked)}
                    className="rounded accent-[#DEDBC8] w-4 h-4"
                  />
                  <span className="text-xs font-medium text-gray-300">
                    {isAr ? 'شامل الإشراف الهندسي المعتمد' : 'Include Certified Supervision'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#161616] to-[#0f0f0f] border border-[#333333] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
                <div>
                  <span className="text-xs uppercase text-gray-400 font-semibold block">
                    {isAr ? 'التكلفة الإجمالية التقديرية' : 'Estimated Total Investment'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#DEDBC8] font-mono mt-1">
                    {calculation.totalEstimate.toLocaleString()} <span className="text-sm font-sans">{isAr ? 'ريال سعودي' : 'SAR'}</span>
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-[#222222] border border-[#333] text-[#DEDBC8]">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#1f1f1f] text-gray-400">
                  <span>{isAr ? 'الأعمال الإنشائية والتشطيب:' : 'Structural & Architectural:'}</span>
                  <span className="text-white font-mono">{calculation.constructionCost.toLocaleString()} SAR</span>
                </div>
                {includeHVAC && projectType !== 'hvac' && (
                  <div className="flex justify-between py-1.5 border-b border-[#1f1f1f] text-gray-400">
                    <span>{isAr ? 'أنظمة التكييف والتهوية:' : 'HVAC Systems:'}</span>
                    <span className="text-white font-mono">{calculation.hvacCost.toLocaleString()} SAR</span>
                  </div>
                )}
                {includeSupervision && (
                  <div className="flex justify-between py-1.5 border-b border-[#1f1f1f] text-gray-400">
                    <span>{isAr ? 'الإشراف وإدارة الجودة (SBC):' : 'Supervision & QC (SBC):'}</span>
                    <span className="text-white font-mono">{calculation.supervisionCost.toLocaleString()} SAR</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 text-gray-400">
                  <span>{isAr ? 'المدة الزمنية المتوقعة للإنجاز:' : 'Estimated Duration:'}</span>
                  <span className="text-[#DEDBC8] font-bold font-mono">
                    {calculation.estimatedDurationMonths} {isAr ? 'أشهر' : 'Months'}
                  </span>
                </div>
              </div>

              {/* Quality Guarantee Note */}
              <div className="p-3.5 rounded-2xl bg-[#181818] border border-[#2a2a2a] flex items-start gap-2.5 text-xs text-gray-300">
                <ShieldCheck className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                <span>
                  {isAr
                    ? 'ضمانات رسمية معتمدة: ضمان إنشائي 10 سنوات، وضمان عزل 10 سنوات، وضمان تمديدات حرارية 50 سنة.'
                    : 'Certified warranties: 10-year structural guarantee, 10-year waterproofing, and 50-year piping warranty.'}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setConsultationOpen(true)}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#DEDBC8] hover:bg-white text-black font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>{isAr ? 'طلب جدول كميات وعرض سعر رسمي' : 'Request Official BOQ & Quotation'}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultService={isAr ? 'جدول كميات وتقدير تكاليف' : 'BOQ & Cost Estimation'}
      />
    </section>
  );
}
