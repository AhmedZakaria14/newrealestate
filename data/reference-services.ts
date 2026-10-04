export interface ReferenceServiceItem {
  id: string;
  slug: string;
  tag: { en: string; ar: string };
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  description: { en: string; ar: string };
  features: Array<{
    title: { en: string; ar: string };
    desc: { en: string; ar: string };
  }>;
  stats: Array<{
    value: string;
    label: { en: string; ar: string };
  }>;
  image: string;
  actionText: { en: string; ar: string };
  actionHref: string;
  actionType: 'properties' | 'list-property' | 'projects' | 'contracting' | 'hvac';
  division: 'realestate' | 'construction' | 'hvac';
}

// 1. The Exact Core Real Estate Services from the Reference Website (https://ai-realestate-phi-ecru.vercel.app/)
export const referenceRealEstateServices: ReferenceServiceItem[] = [
  {
    id: 'serv-1',
    slug: 'prime-residential-brokerage',
    tag: {
      en: 'Luxury Sales & Acquisitions',
      ar: 'وساطة واستحواذ العقارات الفاخرة',
    },
    title: {
      en: 'Prime Residential Brokerage & Portfolio Advisory',
      ar: 'الوساطة العقارية المعتمدة وإدارة المحافظ السكنية',
    },
    subtitle: {
      en: 'Discreet acquisition and disposition of exceptional waterfront villas, penthouses, and private estates.',
      ar: 'خدمات وساطة واستشارات تملك متخصصة للقصور والفلل البحرية والشقق الفاخرة بالمنطقة الشرقية.',
    },
    description: {
      en: 'Our certified real estate advisors represent high-net-worth individuals, family offices, and discerning investors across Khobar, Dhahran, and Dammam with unmatched market intelligence and REGA compliance.',
      ar: 'يقدم مستشارونا المعتمدون خدمات الوساطة والاستشارة للمستثمرين وكبرى العائلات في الخُبر والظهران والدمام وفق أعلى معايير الشفافية وتنظيمات الهيئة العامة للعقار.',
    },
    features: [
      {
        title: {
          en: 'REGA & FAL Certified Advisory',
          ar: 'وساطة معتمدة وتراخيص فال الرسمية',
        },
        desc: {
          en: '100% compliant transactions with authentic electronic title transfers and escrow protocols.',
          ar: 'صفقات نظامية متوافقة بالكامل مع التوثيق الإلكتروني وحسابات الضمان المعتمدة.',
        },
      },
      {
        title: {
          en: 'Exclusive Off-Market Collection',
          ar: 'عقارات وقصور حصرية غير معلنة',
        },
        desc: {
          en: 'Direct access to ultra-prime private estates and coastal compounds reserved for pre-qualified buyers.',
          ar: 'وصول مباشر لعقارات وقصور خاصة نادرة مخصصة لكبار المشترين والمستثمرين المؤهلين.',
        },
      },
      {
        title: {
          en: 'End-to-End Closing Concierge',
          ar: 'إفراغ وتوثيق متكامل وسريع',
        },
        desc: {
          en: 'Dedicated legal and documentation team ensuring swift title transfers and verified bank escrow settlements.',
          ar: 'فريق قانوني وإداري متخصص يتابع كافة إجراءات الإفراغ العقاري والضمانات البنكية.',
        },
      },
    ],
    stats: [
      {
        value: '15M+ SAR',
        label: { en: 'Volume Transacted', ar: 'حجم الصفقات المنجزة' },
      },
      {
        value: '98.7%',
        label: { en: 'Client Satisfaction', ar: 'نسبة رضا العملاء' },
      },
      {
        value: '14 Days',
        label: { en: 'Avg. Closing Time', ar: 'متوسط مدة الإفراغ' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    actionText: {
      en: 'Explore Prime Properties',
      ar: 'تصفح العقارات الفاخرة',
    },
    actionHref: '/listings',
    actionType: 'properties',
    division: 'realestate',
  },
  {
    id: 'serv-2',
    slug: 'cinematic-property-marketing',
    tag: {
      en: 'Omnichannel Marketing',
      ar: 'التسويق العقاري السينمائي المتكامل',
    },
    title: {
      en: 'Global Exposure & Bespoke Media Production',
      ar: 'تسويق عقاري سينمائي وحملات ترويجية مستهدفة',
    },
    subtitle: {
      en: 'Elevate your property above the market with 4K drone cinematography, 3D architectural tours, and targeted campaigns.',
      ar: 'إبراز قيمة عقارك عبر إنتاج سينمائي بدقة 4K وتصوير جوي وجولات ثلاثية الأبعاد وحملات رقمية كبرى.',
    },
    description: {
      en: 'We craft comprehensive multimedia campaigns that present your property as an irreplaceable lifestyle asset, reaching thousands of verified GCC and international qualified buyers.',
      ar: 'نصمم حملات تسويقية متكاملة تبرز التفاصيل المعمارية الاستثنائية لعقارك وتصل إلى آلاف المشترين الجادين في السعودية والخليج.',
    },
    features: [
      {
        title: {
          en: '4K Drone & Architectural Video',
          ar: 'تصوير جوي وسينمائي معماري 4K',
        },
        desc: {
          en: 'Bespoke storytelling capturing the prime coastal location, interior finishes, and surrounding lifestyle.',
          ar: 'سرد بصري سينمائي يبرز الموقع الساحلي المميز وجودة التشطيبات وأنماط الحياة المحيطة.',
        },
      },
      {
        title: {
          en: 'Targeted High-Net-Worth Reach',
          ar: 'وصول مباشر لشرائح المشترين المستهدفين',
        },
        desc: {
          en: 'Data-driven private syndication across premium channels, investor portals, and VIP networks.',
          ar: 'نشر موجه عبر المنصات الاستثمارية الرائدة وشبكات المستثمرين وكبار العملاء.',
        },
      },
      {
        title: {
          en: 'Real-Time Performance Dashboard',
          ar: 'تقارير أداء ومؤشرات تفاعل لحظية',
        },
        desc: {
          en: 'Weekly analytics on inquiries, qualified viewing appointments, and buyer feedback.',
          ar: 'تقارير أسبوعية تفصيلية عن المشاهدات وطلبات المعاينة الجادة والعروض المقدمة.',
        },
      },
    ],
    stats: [
      {
        value: '1.7M+',
        label: { en: 'Monthly Impressions', ar: 'مشاهدة شهرية لحملاتنا' },
      },
      {
        value: '20 Days',
        label: { en: 'Avg. Time to Offer', ar: 'متوسط استلام أول عرض' },
      },
      {
        value: '100%',
        label: { en: 'REGA Compliant Ads', ar: 'إعلانات مرخصة وموثقة' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    actionText: {
      en: 'List Your Property With Us',
      ar: 'اعرض عقارك معنا للتسويق',
    },
    actionHref: '/contact-us',
    actionType: 'list-property',
    division: 'realestate',
  },
  {
    id: 'serv-3',
    slug: 'investment-advisory-developments',
    tag: {
      en: 'Strategic Investment Advisory',
      ar: 'الاستشارات والاستثمار العقاري الاستراتيجي',
    },
    title: {
      en: 'High-Yield Investment Advisory & Master Developments',
      ar: 'استشارات الاستثمار العقاري والمشاريع التطويرية الكبرى',
    },
    subtitle: {
      en: 'Data-driven insights to maximize capital appreciation and rental yield across master developments.',
      ar: 'تحليلات بيانات استثمارية لتعظيم العائد الإيجاري والنمو الرأسمالي في كبرى المخططات والمشاريع.',
    },
    description: {
      en: 'We evaluate market cycles, rental benchmarks, and infrastructure growth corridors in the Eastern Province to identify lucrative commercial and income-generating opportunities.',
      ar: 'نحلل دورات السوق ومؤشرات الإيجارات ومحاور التوسع العمراني بالمنطقة الشرقية لاقتناص أفضل الفرص الاستثمارية الواعدة.',
    },
    features: [
      {
        title: {
          en: 'Comprehensive Yield & ROI Modeling',
          ar: 'نماذج مالية دقيقة للعائد الاستثماري',
        },
        desc: {
          en: 'Detailed cash-flow forecasts, projected appreciation curves, and exit strategy recommendations.',
          ar: 'توقعات دقيقة للتدفقات النقدية ومنحنيات نمو القيمة الرأسمالية واستراتيجيات الخروج.',
        },
      },
      {
        title: {
          en: 'Prime Master Project Allocation',
          ar: 'أولوية الحجز في كبرى المشاريع والمخططات',
        },
        desc: {
          en: 'First-phase allocation and preferential pricing in flagship waterfront and urban developments.',
          ar: 'تخصيص مبكر وأسعار تفضيلية في المرحلة الأولى لأبرز المشاريع السكنية والتجارية.',
        },
      },
      {
        title: {
          en: 'Turnkey Portfolio Management',
          ar: 'إدارة أصول وتشغيل إيجاري شامل',
        },
        desc: {
          en: 'Post-handover tenant acquisition, rent collection, and property maintenance coordination.',
          ar: 'خدمات ما بعد الاستلام وتأجير الوحدات وتحصيل الإيجارات ومتابعة الصيانة الدورية.',
        },
      },
    ],
    stats: [
      {
        value: '8.9%',
        label: { en: 'Avg. Gross Yield', ar: 'متوسط العائد الإيجاري' },
      },
      {
        value: '12+',
        label: { en: 'Master Projects', ar: 'مشروع رئيسي معتمد' },
      },
      {
        value: '100%',
        label: { en: 'REGA Compliant', ar: 'معتمد وموثق نظاماً' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    actionText: {
      en: 'Explore New Projects',
      ar: 'استكشف المشاريع الكبرى',
    },
    actionHref: '/projects',
    actionType: 'projects',
    division: 'realestate',
  },
];

// 2. Dedicated General Contracting & Structural Construction Services
export const referenceConstructionServices: ReferenceServiceItem[] = [
  {
    id: 'const-1',
    slug: 'general-contracting-towers',
    tag: {
      en: 'Class-1 General Contracting',
      ar: 'مقاولات عامة فئة أولى',
    },
    title: {
      en: 'Commercial Towers & Smart Residential Masterplans',
      ar: 'تنفيذ الأبراج التجارية والمجمعات السكنية الذكية',
    },
    subtitle: {
      en: 'Heavy civil and high-rise structural engineering executed under strict Saudi Building Code (SBC) standards.',
      ar: 'تنفيذ الأعمال الخرسانية والهياكل الإنشائية الشاهقة وفق اشتراطات كود البناء السعودي بدقة هندسية مطلقة.',
    },
    description: {
      en: 'Full-scope turn-key contracting capabilities for mixed-use developments, corporate headquarters, and high-density residential towers across the Kingdom.',
      ar: 'قدرات تنفيذية شاملة على المفتاح لتشييد الأبراج والمقرات المؤسسية والمجمعات السكنية الكبرى بأعلى مواصفات الجودة والمتانة.',
    },
    features: [
      {
        title: {
          en: 'SBC 100% Certified Compliance',
          ar: 'مطابقة تامة لكود البناء السعودي (SBC)',
        },
        desc: {
          en: 'Full architectural, structural, and electrical conformity verified by certified testing labs.',
          ar: 'مطابقة معمارية وإنشائية وكهربائية معتمدة من مختبرات فحص التربة والمواد المعتمدة.',
        },
      },
      {
        title: {
          en: 'Resident Site Engineering Supervision',
          ar: 'إشراف هندسي مقيم على مدار الساعة',
        },
        desc: {
          en: 'Daily quality assurance audits, laser-level alignment, and progress milestone tracking.',
          ar: 'متابعة يومية لمناسيب الصب وجودة التسليح واختبارات الضغط الخرساني في الموقع.',
        },
      },
      {
        title: {
          en: '10-Year Certified Structural Bond',
          ar: 'ضمانات هيكلية ممتدة تصل إلى 10 سنوات',
        },
        desc: {
          en: 'Complete structural integrity warranty backed by licensed engineering consultants.',
          ar: 'وثائق ضمان هيكلي معتمدة من المكاتب الاستشارية وشركات التأمين الهندسية.',
        },
      },
    ],
    stats: [
      {
        value: 'FAL & SBC',
        label: { en: 'Certifications', ar: 'اعتمادات رسمية' },
      },
      {
        value: '100%',
        label: { en: 'On-Time Milestones', ar: 'التزام بالمواعيد' },
      },
      {
        value: 'Zero',
        label: { en: 'Safety Incidents', ar: 'حوادث في الموقع' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=80',
    actionText: {
      en: 'Request BOQ Estimation',
      ar: 'طلب دراسة تكلفة وجداول كميات BOQ',
    },
    actionHref: '/contact-us',
    actionType: 'contracting',
    division: 'construction',
  },
  {
    id: 'const-2',
    slug: 'civil-structural-turnkey',
    tag: {
      en: 'Turnkey Delivery',
      ar: 'تسليم متكامل على المفتاح',
    },
    title: {
      en: 'Architectural Fit-Out & Turnkey Construction',
      ar: 'التشطيبات المعمارية الفاخرة والتسليم على المفتاح',
    },
    subtitle: {
      en: 'Seamless integration of MEP systems, luxury facades, and bespoke interior spaces delivered ready for occupancy.',
      ar: 'دمج هندسي متكامل للأنظمة الكهروميكانيكية والواجهات الزجاجية المعزولة مع أرقى التشطيبات المعمارية.',
    },
    description: {
      en: 'From groundbreaking through final municipal occupancy certificates, HARD Contracting manages all subcontractor tiers, procurement, and site logistics.',
      ar: 'من وضع حجر الأساس وحتى إصدار شهادات إتمام البناء وإطلاق التيار، نتولى إدارة كافة مراحل المشروع والموردين بأعلى كفاءة.',
    },
    features: [
      {
        title: {
          en: 'Advanced 3D BIM Coordination',
          ar: 'نمذجة معمارية ثلاثية الأبعاد (BIM)',
        },
        desc: {
          en: 'Clash-detection across MEP, HVAC, and structural blueprints before physical execution.',
          ar: 'كشف مسبق لأي تعارض بين شبكات التكييف والكهرباء والإنشاء قبل بدء الصب.',
        },
      },
      {
        title: {
          en: 'Premium ISO Materials Procurement',
          ar: 'توريد مواد معتمدة بشهادات ISO',
        },
        desc: {
          en: 'Direct factory partnerships for steel rebar, high-grade concrete, and thermal glass.',
          ar: 'شراكات توريد مباشرة للحديد عالي الإجهاد والخرسانة المعالجة والرخام الطبيعي.',
        },
      },
      {
        title: {
          en: 'Electronic Owner Progress Portal',
          ar: 'منصة متابعة رقمية لحظية للمالك',
        },
        desc: {
          en: 'Live camera streams, weekly photographic progress audits, and milestone approvals.',
          ar: 'تقارير أسبوعية مصورة وتحديثات دورية لنسب الإنجاز المالية والإنشائية.',
        },
      },
    ],
    stats: [
      {
        value: '100%',
        label: { en: 'SBC Compliance', ar: 'مطابقة الكود' },
      },
      {
        value: '10 Yrs',
        label: { en: 'Structural Guarantee', ar: 'ضمان الهيكل' },
      },
      {
        value: '24/7',
        label: { en: 'Site Security', ar: 'حراسة وأمان' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    actionText: {
      en: 'Consult Site Engineers',
      ar: 'تواصل مع الاستشاري الهندسي',
    },
    actionHref: '/contact-us',
    actionType: 'contracting',
    division: 'construction',
  },
];

// 3. Dedicated HVAC Mechanical & Facilities Management Services
export const referenceHVACServices: ReferenceServiceItem[] = [
  {
    id: 'hvac-1',
    slug: 'amc-maintenance-chillers',
    tag: {
      en: 'Preventive AMC Contracts',
      ar: 'عقود الصيانة الوقائية السنوية AMC',
    },
    title: {
      en: 'Industrial Chillers, VRF Systems & Central Air Conditioning',
      ar: 'الشيلرات المركزية وأنظمة التدفق المتغير VRF وتبريد الأبراج',
    },
    subtitle: {
      en: 'Engineered cooling solutions, ducting layout, and certified annual maintenance (AMC) for commercial properties.',
      ar: 'تصميم وتنفيذ مجاري الهواء وتبريد المباني الشاهقة مع عقود صيانة سنوية دورية تضمن استمرارية العمل 100%.',
    },
    description: {
      en: 'Complete mechanical HVAC contracting covering package units, variable refrigerant flow (VRF), cooling towers, and continuous preventive maintenance.',
      ar: 'حلول ميكانيكية متخصصة تغطي الشيلرات المركزية، مضخات التبريد، وحدات مناولة الهواء (AHU)، ومتابعة دورية تمنع الأعطال المفاجئة.',
    },
    features: [
      {
        title: {
          en: '24/7 Emergency Dispatch Fleet',
          ar: 'فرق طوارئ واستجابة سريعة 24/7',
        },
        desc: {
          en: 'Guaranteed maximum 45-minute on-site response time across Khobar, Dammam, and Dhahran.',
          ar: 'وصول فريق الصيانة المتنقل خلال 45 دقيقة لمعالجة أي توقف طارئ في التبريد.',
        },
      },
      {
        title: {
          en: 'Energy Efficiency & Inverter Optimization',
          ar: 'توفير استهلاك الكهرباء بنسبة تصل إلى 35%',
        },
        desc: {
          en: 'Smart inverter tuning and variable frequency drives reducing corporate utility costs.',
          ar: 'ضبط ذكي لتردد الضواغط وتوزيع الأحمال الحرارية لتقليل فاتورة الكهرباء الشهرية.',
        },
      },
      {
        title: {
          en: 'Genuine Factory Parts & Warranty',
          ar: 'قطع غيار أصلية وضمان معتمد',
        },
        desc: {
          en: 'Direct certified partnerships with Daikin, Trane, Carrier, York, and LG.',
          ar: 'شراكات مع كبرى الشركات المصنعة لضمان استخدام قطع غيار معتمدة وبضمان شامل.',
        },
      },
    ],
    stats: [
      {
        value: '< 45 Min',
        label: { en: 'Emergency Response', ar: 'زمن الاستجابة' },
      },
      {
        value: '99.9%',
        label: { en: 'Uptime Reliability', ar: 'جاهزية التبريد' },
      },
      {
        value: '-35%',
        label: { en: 'Energy Consumption', ar: 'توفير الطاقة' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    actionText: {
      en: 'Request AMC Maintenance Quote',
      ar: 'طلب تسعير عقد صيانة AMC',
    },
    actionHref: '/contact-us',
    actionType: 'hvac',
    division: 'hvac',
  },
  {
    id: 'hvac-2',
    slug: 'facilities-management-fm',
    tag: {
      en: 'Integrated Facility Management',
      ar: 'إدارة وتشغيل المرافق المتكاملة (FM)',
    },
    title: {
      en: 'Total Building Operations, MEP & Preventative Facility Services',
      ar: 'تشغيل المرافق وأنظمة الكهرباء والسباكة والسلامة المهنية',
    },
    subtitle: {
      en: 'Holistic facility management for corporate headquarters, compounds, and luxury retail destinations.',
      ar: 'إدارة تشغيلية شاملة للأصول والمجمعات والأبراج تضمن أعلى درجات السلامة وراحة شاغلي المبنى.',
    },
    description: {
      en: 'We preserve asset lifespan, enhance resident comfort, and guarantee continuous regulatory compliance across all building electro-mechanical systems.',
      ar: 'نحافظ على القيمة السوقية للمبنى ونرفع كفاءة الأنظمة التشغيلية عبر كادر فني وإداري مقيم يتابع دورة العمل بانتظام.',
    },
    features: [
      {
        title: {
          en: 'Comprehensive MEP Inspections',
          ar: 'فحوصات دورية لشبكات الكهرباء والمضخات',
        },
        desc: {
          en: 'Thermodynamic scanning, breaker load tests, and potable water filtration audits.',
          ar: 'فحص حراري للألواح الكهربائية ومعايرة مضخات المياه وشبكات الإنذار ومكافحة الحريق.',
        },
      },
      {
        title: {
          en: 'Automated Facility Helpdesk',
          ar: 'منصة بلاغات وتذاكر صيانة آلية',
        },
        desc: {
          en: 'Tenants log tickets via smartphone app with real-time status and closure verification.',
          ar: 'تسجيل ومتابعة البلاغات إلكترونياً مع إشعارات فورية وتقارير إنجاز موثقة بالصور.',
        },
      },
      {
        title: {
          en: 'Strict Environmental & Safety Standards',
          ar: 'امتثال تام لمعايير الدفاع المدني والسلامة',
        },
        desc: {
          en: 'Certified safety compliance keeping your building compliant with civil defense codes.',
          ar: 'تحديث مستمر لتراخيص السلامة وصيانة أنظمة الرش الآلي ومخارج الطوارئ.',
        },
      },
    ],
    stats: [
      {
        value: '24/7/365',
        label: { en: 'Operations Monitoring', ar: 'متابعة مستمرة' },
      },
      {
        value: '100%',
        label: { en: 'Safety Compliance', ar: 'امتثال للسلامة' },
      },
      {
        value: '500K+ m²',
        label: { en: 'Managed Facilities', ar: 'مساحات مدارة' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    actionText: {
      en: 'Schedule Facility Audit',
      ar: 'طلب معاينة وتقييم مرافق',
    },
    actionHref: '/contact-us',
    actionType: 'hvac',
    division: 'hvac',
  },
];

// Combine all services into one master array
export const allReferenceServices: ReferenceServiceItem[] = [
  ...referenceRealEstateServices,
  ...referenceConstructionServices,
  ...referenceHVACServices,
];
