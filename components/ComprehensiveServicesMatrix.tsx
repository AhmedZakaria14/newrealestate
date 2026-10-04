'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  HardHat,
  Building2,
  Fan,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Wrench,
  Sparkles,
  ClipboardCheck,
} from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';

export default function ComprehensiveServicesMatrix() {
  const { language, theme, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'contracting' | 'realestate' | 'hvac' | 'supervision'>('contracting');
  const [consultationOpen, setConsultationOpen] = useState(false);

  const servicesData = {
    contracting: {
      categoryAr: 'الذراع الإنشائي والهندسي',
      categoryEn: 'Structural & Engineering Arm',
      titleAr: 'المقاولات العامة والتطوير الإنشائي المتكامل',
      titleEn: 'General Contracting & Master Structural Execution',
      descAr:
        'تنفيذ المشاريع الإنشائية الكبرى المصنفة فئة أولى وفق كود البناء السعودي (SBC)، مع إشراف دقيق على اختبارات التربة، الأعمال الخرسانية، الهياكل الفولاذية، وأنظمة البناء الذكي.',
      descEn:
        'Executing Class-1 classified master developments under Saudi Building Code (SBC) standards, spanning geotechnical surveys, structural concrete, steel frames, and smart buildings.',
      href: '/construction',
      capabilities: [
        {
          titleAr: 'تنفيذ الأبراج والمجمعات التجارية',
          titleEn: 'Commercial Towers & Business Plazas',
          descAr: 'هياكل إنشائية متطورة وتشطيبات معمارية خارجية متوافقة مع متطلبات كود البناء السعودي.',
          descEn: 'High-performance commercial structures with engineered envelope systems.',
        },
        {
          titleAr: 'بناء الفلل السكنية والقصور الفارهة',
          titleEn: 'Luxury Villas & Master Estates',
          descAr: 'تسليم متكامل على المفتاح بأعلى مستويات الدقة الهندسية والعزل الحراري المعتمد.',
          descEn: 'Turnkey architectural luxury homes engineered for longevity and thermal efficiency.',
        },
        {
          titleAr: 'الهياكل المعدنية والمستودعات اللوجستية',
          titleEn: 'Steel Structures & Logistics Hubs',
          descAr: 'تصميم وتنفيذ هناجر ومراكز لوجستية كبرى بضمانات إنشائية ممتدة ومعايير سلامة دولية.',
          descEn: 'Industrial steel superstructures built to global logistics standards.',
        },
        {
          titleAr: 'إدارة وتنسيق البنية التحتية والشبكات',
          titleEn: 'Civil Infrastructure & Utilities',
          descAr: 'شبكات الصرف، تمديدات المياه، الإنارة الذكية، والطرق المعتمدة من أمانات المناطق.',
          descEn: 'Master utility routing, municipal connections, and stormwater systems.',
        },
      ],
      kpis: [
        { value: '100%', labelAr: 'مطابقة كود SBC', labelEn: 'SBC Compliance' },
        { value: 'فئة أولى', labelAr: 'تصنيف المقاولات', labelEn: 'Class-1 Grade' },
        { value: '10 سنوات', labelAr: 'ضمان الهيكل الإنشائي', labelEn: 'Structural Warranty' },
      ],
    },
    realestate: {
      categoryAr: 'الذراع العقاري والاستثماري',
      categoryEn: 'Real Estate & Investment Arm',
      titleAr: 'الوساطة العقارية والتسويق المرخص (فال 1200028472)',
      titleEn: 'Licensed Brokerage & Portfolio Advisory (VAL 1200028472)',
      descAr:
        'منظومة وساطة واستشارات مرخصة من الهيئة العامة للعقار، متخصصة في إدارة المحافظ الكبرى، تسويق الأبراج والمخططات، وتقديم الصفقات الاستثمارية ذات العوائد الممتازة.',
      descEn:
        'A premier brokerage and investment advisory licensed by the Real Estate General Authority (VAL), specializing in high-value portfolios, master communities, and commercial off-plan acquisitions.',
      href: '/realestate',
      capabilities: [
        {
          titleAr: 'تسويق المجمعات والمشاريع الكبرى',
          titleEn: 'Master Developments Exclusive Marketing',
          descAr: 'حملات تسويقية وإنتاج بصري متخصص يربط المشاريع بنخبة المستثمرين والمشترين.',
          descEn: 'Targeted marketing strategies connecting master developers with qualified institutional buyers.',
        },
        {
          titleAr: 'إدارة وتنمية المحافظ الاستثمارية',
          titleEn: 'Institutional Portfolio Asset Management',
          descAr: 'دراسات تدفقات نقدية وعوائد إيجارية تضمن تعظيم القيمة الرأسمالية للأصول.',
          descEn: 'Strategic capital allocation and high-yield real estate investment management.',
        },
        {
          titleAr: 'صفقات الأراضي التجارية والاستثمارية',
          titleEn: 'Commercial Land & Site Acquisitions',
          descAr: 'الوساطة في الأراضي الاستراتيجية للقطاعات التجارية، الصناعية، واللوجستية بالشرقية والرياض.',
          descEn: 'Sourcing prime commercial and industrial parcels in Khobar, Dammam, and Riyadh.',
        },
        {
          titleAr: 'الاستشارات التنظيمية وتراخيص وافي',
          titleEn: 'Regulatory & Wafi Compliance Guidance',
          descAr: 'المساعدة في الامتثال لأنظمة البيع على الخارطة ومتطلبات الهيئة العامة للعقار.',
          descEn: 'Streamlining regulatory compliance for off-plan developers under Saudi directives.',
        },
      ],
      kpis: [
        { value: '1200028472', labelAr: 'رخصة فال المعتمدة', labelEn: 'VAL License No.' },
        { value: '+4.5 مليار', labelAr: 'حجم المحافظ المدارة', labelEn: 'Portfolio Volume' },
        { value: '100% رقمي', labelAr: 'توثيق رسمي موثق', labelEn: 'Digital Escrow' },
      ],
    },
    hvac: {
      categoryAr: 'الذراع الكهروميكانيكي والتشغيل',
      categoryEn: 'Electromechanical & Operations Arm',
      titleAr: 'هندسة التكييف المركزي وعقود الصيانة الوقائية (AMC 24/7)',
      titleEn: 'Central HVAC Engineering & 24/7 Preventive AMC',
      descAr:
        'حلول ميكانيكية وكهروميكانيكية متطورة للأبراج والمجمعات والفلل، تشمل محطات الشيلرات المبردة بالماء والهواء، أنظمة VRF الموفرة للطاقة، وتنقية مجاري الهواء.',
      descEn:
        'Advanced electromechanical and cooling engineering covering central chillers, VRF variable refrigerant systems, automated BMS controls, and 24/7 emergency response.',
      href: '/hvac',
      capabilities: [
        {
          titleAr: 'عقود الصيانة الوقائية والسنوية (AMC)',
          titleEn: 'Annual Preventive Maintenance Contracts (AMC)',
          descAr: 'جداول فحص دورية تضمن استمرارية التشغيل وتقليل استهلاك الطاقة وانبعاثات الكربون.',
          descEn: 'Scheduled preventative servicing maximizing uptime and energy efficiency.',
        },
        {
          titleAr: 'محطات الشيلرات المركزية الكبرى',
          titleEn: 'Industrial Central Chiller Plants',
          descAr: 'توريد وتركيب وصيانة أحدث وحدات التبريد المركزية للأبراج والمستشفيات والمراكز.',
          descEn: 'Turnkey installation and overhaul of high-tonnage water and air-cooled chillers.',
        },
        {
          titleAr: 'أنظمة VRF الذكية الموفرة للطاقة',
          titleEn: 'Smart VRF/VRV Energy-Saving Systems',
          descAr: 'تحكم ذكي منفصل في درجات الحرارة لكل منطقة مع توفير يصل إلى 35% في فاتورة الكهرباء.',
          descEn: 'Zoned inverter climate control lowering operating costs across luxury properties.',
        },
        {
          titleAr: 'تنقية الهواء وتعقيم مجاري الدكت',
          titleEn: 'Air Quality & Duct Sanitization',
          descAr: 'فلاتر HEPA والأشعة فوق البنفسجية لضمان بيئة داخلية نقية وصحية ومطابقة للمعايير.',
          descEn: 'Advanced filtration complying with healthcare and high-traffic environmental standards.',
        },
      ],
      kpis: [
        { value: '24/7', labelAr: 'طوارئ واستجابة فورية', labelEn: 'Emergency Response' },
        { value: '+99.4%', labelAr: 'معدل كفاءة التشغيل', labelEn: 'Uptime Reliability' },
        { value: '35%', labelAr: 'توفير استهلاك الطاقة', labelEn: 'Energy Efficiency' },
      ],
    },
    supervision: {
      categoryAr: 'الإشراف الهندسي والحوكمة',
      categoryEn: 'Engineering Supervision & Governance',
      titleAr: 'إدارة المشاريع والإشراف الهندسي وإصدار شهادات الإشغال',
      titleEn: 'Project Management & Engineering Supervision',
      descAr:
        'منظومة حوكمة هندسية تضمن مطابقة كل مرحلة إنشائية للمخططات المعتمدة، كود البناء السعودي، وبروتوكولات الجودة والسلامة المهنية حتى الاستلام النهائي.',
      descEn:
        'Rigorous quality control and engineering supervision ensuring every phase complies with approved drawings, SBC codes, and occupational safety protocols through final handover.',
      href: '/services',
      capabilities: [
        {
          titleAr: 'الإشراف الميداني المعتمد والمطابقة',
          titleEn: 'Certified On-Site Inspection & QA/QC',
          descAr: 'تقارير دورية وفحوصات مخبرية للخرسانة وحديد التسليح تضمن أعلى درجات السلامة.',
          descEn: 'Structured site audits and material laboratory testing assuring structural compliance.',
        },
        {
          titleAr: 'استخراج رخص البناء وشهادات الإشغال',
          titleEn: 'Permit Issuance & Certificate of Occupancy',
          descAr: 'إنهاء كافة المعاملات عبر منصة بلدي والدفاع المدني والهيئة العامة للعقار بسرعة وسلاسة.',
          descEn: 'Expediting Balady municipal permits, civil defense approvals, and occupancy clearances.',
        },
        {
          titleAr: 'إدارة التكاليف والجداول الزمنية (BIM)',
          titleEn: 'BIM Cost Management & Scheduling',
          descAr: 'نمذجة معلومات البناء ثلاثية الأبعاد لمنع تضارب الأعمال وتفادي تجاوز الميزانيات.',
          descEn: '3D BIM clash detection and earned-value scheduling eliminating project delays.',
        },
        {
          titleAr: 'الفحص المسبق واستلام الأعمال للملاك',
          titleEn: 'Snagging & Pre-Handover Audits',
          descAr: 'فحص هندسي دقيق وشامل قبل استلام المالك للوحدة لحمايته من أي عيوب خفية.',
          descEn: 'Comprehensive pre-purchase snagging audits protecting client capital.',
        },
      ],
      kpis: [
        { value: 'ISO 9001', labelAr: 'حوكمة الجودة المعتمدة', labelEn: 'Quality Governance' },
        { value: 'صفر تأخير', labelAr: 'الالتزام بالجداول الزمنية', labelEn: 'Schedule Adherence' },
        { value: '100% بلدي', labelAr: 'اعتمادات التراخيص الفورية', labelEn: 'Balady Integration' },
      ],
    },
  };

  const active = servicesData[activeTab];

  return (
    <section
      id="services-matrix"
      className={`py-16 sm:py-24 transition-colors border-t ${
        isDark ? 'bg-[#030617] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-black text-blue-500 block">
              {isAr ? 'منظومة الخدمات المتكاملة' : 'Integrated Group Capabilities'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {isAr ? 'كافة الحلول الهندسية والعقارية تحت سقف واحد' : 'End-to-End Engineering & Real Estate Solutions'}
            </h2>
            <p className="text-sm sm:text-base opacity-75 leading-relaxed">
              {isAr
                ? 'نقدّم حزمة متكاملة تغطي دورة حياة المشروع بالكامل: من دراسات الجدوى وشراء الأراضي، مروراً بالتصميم والمقاولات العامة، وحتى التكييف وتشغيل المرافق وإدارة الاستثمار.'
                : 'A unified ecosystem managing the full asset lifecycle: feasibility, design, Class-1 contracting, MEP/HVAC engineering, and certified portfolio operations.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setConsultationOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer self-start lg:self-end"
          >
            <span>{isAr ? 'طلب استشارة أو كراسة مواصفات' : 'Request Specifications RFP'}</span>
            <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
          </button>
        </div>

        {/* Tab Controls (Clean Segmented Bar) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-8 sm:mb-10">
          {[
            { id: 'contracting', labelAr: 'المقاولات العامة (SBC)', labelEn: 'Contracting (SBC)', icon: HardHat },
            { id: 'realestate', labelAr: 'الوساطة والاستثمار (فال)', labelEn: 'Real Estate (VAL)', icon: Building2 },
            { id: 'hvac', labelAr: 'التكييف والتشغيل (AMC)', labelEn: 'HVAC & Facility (AMC)', icon: Fan },
            { id: 'supervision', labelAr: 'الإشراف وإصدار الرخص', labelEn: 'Supervision & Permits', icon: ClipboardCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-3 sm:p-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{isAr ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content Card */}
        <div
          className={`rounded-3xl border shadow-xl p-6 sm:p-8 lg:p-10 transition-all ${
            isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
          }`}
        >
          {/* Header of Active Sector */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-500/15">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-500 block mb-1">
                {isAr ? active.categoryAr : active.categoryEn}
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black">
                {isAr ? active.titleAr : active.titleEn}
              </h3>
            </div>

            <Link
              href={active.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-bold transition-all hover:bg-blue-600 hover:text-white border-blue-500 text-blue-500 self-start md:self-auto"
            >
              <span>{isAr ? 'استكشف تفاصيل هذا القطاع' : 'Explore Sector Page'}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
            </Link>
          </div>

          <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-8 max-w-4xl">
            {isAr ? active.descAr : active.descEn}
          </p>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10">
            {active.capabilities.map((cap, idx) => {
              const capTitle = isAr ? cap.titleAr : cap.titleEn;
              const capDesc = isAr ? cap.descAr : cap.descEn;

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${
                    isDark
                      ? 'bg-white/5 border-white/5 hover:border-blue-500/30'
                      : 'bg-slate-50 border-slate-200/80 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold mb-1">{capTitle}</h4>
                      <p className="text-xs opacity-70 leading-relaxed">{capDesc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom KPIs Bar */}
          <div
            className={`p-5 sm:p-6 rounded-2xl border grid grid-cols-1 sm:grid-cols-3 gap-4 text-center ${
              isDark ? 'bg-[#040618] border-white/10' : 'bg-slate-100 border-slate-200'
            }`}
          >
            {active.kpis.map((kpi, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-black text-blue-500">{kpi.value}</div>
                <div className="text-xs opacity-75 font-semibold">
                  {isAr ? kpi.labelAr : kpi.labelEn}
                </div>
              </div>
            ))}
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
