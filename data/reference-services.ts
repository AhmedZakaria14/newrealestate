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

// 1. Real Estate Services & Development (from hardgp.com: realestate_dev.html, realestate_services.html, sales_marketing.html)
export const referenceRealEstateServices: ReferenceServiceItem[] = [
  {
    id: 'serv-re-1',
    slug: 'realestate-development',
    tag: {
      en: 'Real Estate Development',
      ar: 'التطوير والاستثمار العقاري',
    },
    title: {
      en: 'Real Estate Development & Housing Solutions',
      ar: 'التطوير العقاري والحلول الإسكانية العصرية',
    },
    subtitle: {
      en: 'Providing modern housing solutions for all types of society, particularly the youth, across Saudi Arabia.',
      ar: 'توفير حلول إسكانية عصرية تلبي الطلب المتزايد لكافة فئات المجتمع لاسيما فئة الشباب في المملكة.',
    },
    description: {
      en: 'In light of the continued requirement to provide housing solutions for all types of modern society, particularly the young layer, HARD Establishment develops lands, villas, duplexes, towers, and commercial headquarters throughout the Kingdom of Saudi Arabia.',
      ar: 'في ظل الحاجة المستمرة لتوفير حلول سكنية لجميع فئات المجتمع العصري لاسيما شريحة الشباب، تهدف مؤسسة هارد لتلبية الطلب المتزايد على الوحدات السكنية عبر تطوير الأراضي، الفلل، الدوبلكسات، الأبراج والمقرات التجارية.',
    },
    features: [
      {
        title: {
          en: 'Comprehensive Property Development',
          ar: 'تطوير متكامل للمشاريع السكنية والتجارية',
        },
        desc: {
          en: 'We develop lands, villas, duplexes, commercial towers, and executive corporate headquarters.',
          ar: 'نطور الأراضي، الفلل، الدوبلكسات، الأبراج التجارية، والمقرات الإدارية بأعلى المواصفات.',
        },
      },
      {
        title: {
          en: 'Expert Management & Advisory',
          ar: 'فريق متخصص واستشارات هندسية',
        },
        desc: {
          en: 'Our real estate team comprises expert staff in management and real estate, cooperating with premier advisory offices.',
          ar: 'يضم فريق التطوير العقاري كوادر خبيرة في الإدارة والعقار بالتعاون مع المكاتب الاستشارية والهندسية.',
        },
      },
      {
        title: {
          en: 'Sound Investment Destination',
          ar: 'وجهة استثمارية موثوقة بعوائد مجدية',
        },
        desc: {
          en: 'Anybody looking to invest capital will find HARD the right destination with numerous alternative solutions.',
          ar: 'كل من يتطلع لاستثمار أمواله يجد في هارد الوجهة المثالية مع باقة متنوعة من الحلول والبدائل الاستثمارية.',
        },
      },
    ],
    stats: [
      {
        value: 'Since 2004',
        label: { en: 'Industry Leadership', ar: 'ريادة في السوق السعودي' },
      },
      {
        value: '100%',
        label: { en: 'SBC Compliance', ar: 'مطابقة لكود البناء السعودي' },
      },
      {
        value: '3 Provinces',
        label: { en: 'Coverage: Eastern, Central, Western', ar: 'الشرقية، الوسطى، والغربية' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    actionText: {
      en: 'Explore Properties',
      ar: 'استعراض المشاريع العقارية',
    },
    actionHref: '/realestate',
    actionType: 'properties',
    division: 'realestate',
  },
  {
    id: 'serv-re-2',
    slug: 'realestate-services-funding',
    tag: {
      en: 'Advisory & Bank Funding',
      ar: 'الخدمات العقارية والتمويل البنكي',
    },
    title: {
      en: 'Real Estate Services & Bank Funding Partnerships',
      ar: 'الخدمات العقارية واتفاقيات التمويل البنكي',
    },
    subtitle: {
      en: 'Facilitating land ownership and construction financing with AlJazira, Riyad, and Samba banks.',
      ar: 'مساعدة العملاء في تملك الأراضي والبناء بتمويل ميسر عبر شراكاتنا مع بنوك الجزيرة والرياض وسامبا.',
    },
    description: {
      en: 'HARD offers real estate consultancy support to clients and investors in the market and seeks to reconcile the establishment of residential communities characterized by innovative design and function. We assist clients to own land where we build residential or commercial projects independently or through our long-term bank agreements with AlJazira Bank, Riyad Bank, and Samba Bank offering low profit margins.',
      ar: 'تقدم هارد الدعم والاستشارات العقارية للعملاء والمستثمرين لإنشاء مجتمعات سكنية مبتكرة تجمع بين التصميم المتميز والوظيفة الحيوية. نساعد العملاء في تملك الأراضي والبناء عبر اتفاقيات طويلة الأجل مع أفضل ثلاثة بنوك تمويلية (بنك الجزيرة، بنك الرياض، بنك سامبا) بهوامش ربح منخفضة.',
    },
    features: [
      {
        title: {
          en: 'Land Ownership & Development Support',
          ar: 'تسهيل تملك الأراضي وبناء المشاريع',
        },
        desc: {
          en: 'Assisting clients in acquiring prime land and constructing residential or commercial projects with institutional funding.',
          ar: 'مساعدة العميل في تملك الأرض المناسبة وبناء مشروعه السكني أو التجاري بتسهيلات تمويلية معتمدة.',
        },
      },
      {
        title: {
          en: 'Institutional Bank Funding Program',
          ar: 'برنامج التمويل البنكي المشترك',
        },
        desc: {
          en: 'Long-term partnership agreements with AlJazira Bank, Riyad Bank, and Samba Bank providing low profit margins.',
          ar: 'اتفاقيات شراكة حصرية مع بنك الجزيرة، بنك الرياض، وبنك سامبا بهامش ربح منخفض جداً للموظفين والمستثمرين.',
        },
      },
      {
        title: {
          en: 'Generational Value & Future Communities',
          ar: 'مجتمعات سكنية تلبي طموح الأجيال',
        },
        desc: {
          en: 'Developing residential, educational, and social projects that serve present requirements and ensure future prosperity.',
          ar: 'تطوير مشاريع سكنية واجتماعية وترفيهية لا تقتصر على المتطلبات الحالية بل تؤسس لنجاح الأجيال القادمة.',
        },
      },
    ],
    stats: [
      {
        value: '3 Major Banks',
        label: { en: 'AlJazira, Riyad, Samba', ar: 'الجزيرة، الرياض، سامبا' },
      },
      {
        value: 'Low Margin',
        label: { en: 'Competitive Financing', ar: 'هامش ربح تفضيلي منخفض' },
      },
      {
        value: 'Turnkey',
        label: { en: 'Land to Handover', ar: 'من شراء الأرض حتى التسليم' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    actionText: {
      en: 'Inquire About Funding',
      ar: 'استفسر عن برامج التمويل',
    },
    actionHref: '/contact-us',
    actionType: 'list-property',
    division: 'realestate',
  },
  {
    id: 'serv-re-3',
    slug: 'sales-marketing',
    tag: {
      en: 'Sales & Marketing',
      ar: 'المبيعات والتسويق العقاري',
    },
    title: {
      en: 'Strategic Sales & Marketing for Property Assets',
      ar: 'التسويق العقاري الاستراتيجي وإدارة المبيعات',
    },
    subtitle: {
      en: 'Collaborative marketing plans with major real estate companies across the Kingdom of Saudi Arabia.',
      ar: 'خطط تسويقية مدروسة بالتعاون مع كبرى الشركات العقارية بالمملكة لتحقيق أقصى عائد استثماري.',
    },
    description: {
      en: 'HARD focuses on marketing its services and products using ultimate choices of marketing plans in collaboration with major real estate companies in the region. Sales alternatives are analyzed precisely to be highly convenient to both consumers and investors.',
      ar: 'تركز هارد على تسويق خدماتها ومنتجاتها باختيار أرقى الخطط التسويقية بالتعاون مع كبرى الشركات العقارية في المنطقة. ويتم تحليل البدائل البيعية بدقة لتكون ملائمة ومريحة للمستهلكين والمستثمرين على حد سواء.',
    },
    features: [
      {
        title: {
          en: 'Alliances with Regional Real Estate Leaders',
          ar: 'تحالفات مع كبرى الشركات العقارية',
        },
        desc: {
          en: 'Extensive network collaborations delivering rapid sales cycles and verified buyer channels.',
          ar: 'شبكة علاقات واسعة وشراكات تضمن سرعة تسويق الوحدات والوصول إلى المشترين الجادين.',
        },
      },
      {
        title: {
          en: 'Precise Alternative Sales Analysis',
          ar: 'تحليل دقيق للبدائل البيعية',
        },
        desc: {
          en: 'Detailed evaluations tailored to consumer cash-flow needs and investor return targets.',
          ar: 'دراسات تسعير وتدفقات نقدية مدروسة تناسب متطلبات المشترين وتضمن أعلى ربحية للمستثمرين.',
        },
      },
      {
        title: {
          en: 'Targeted Multi-Channel Reach',
          ar: 'حملات ترويجية مستهدفة ومباشرة',
        },
        desc: {
          en: 'Direct institutional and retail outreach covering commercial assets, villas, and master projects.',
          ar: 'تغطية تسويقية مباشرة تشمل الأصول التجارية والمشاريع السكنية والفلل والمجمعات.',
        },
      },
    ],
    stats: [
      {
        value: 'Top Channels',
        label: { en: 'Regional Reach', ar: 'تغطية تسويقية إقليمية' },
      },
      {
        value: 'Optimal ROI',
        label: { en: 'Yield Optimization', ar: 'تعظيم العوائد الاستثمارية' },
      },
      {
        value: 'Expert Team',
        label: { en: 'Advisory & Brokerage', ar: 'فريق تسويق متخصص' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80',
    actionText: {
      en: 'Contact Marketing Desk',
      ar: 'تواصل مع إدارة التسويق',
    },
    actionHref: '/contact-us',
    actionType: 'projects',
    division: 'realestate',
  },
];

// 2. Construction & Contracting Services (from hardgp.com: construction.html, quality_assurance.html, work_safety.html)
export const referenceConstructionServices: ReferenceServiceItem[] = [
  {
    id: 'serv-con-1',
    slug: 'general-construction-epc',
    tag: {
      en: 'Civil & EPC Contracting',
      ar: 'المقاولات العامة والإنشاءات',
    },
    title: {
      en: 'Grass Root Construction & EPC / LSTK / LSPB Turnkey Works',
      ar: 'إنشاء المباني والمصانع من الأساسات ومشاريع تسليم المفتاح',
    },
    subtitle: {
      en: 'Grass root building, plant construction, revamp, modification, upgrade, and debottlenecking since 2004.',
      ar: 'تشييد المباني والمصانع وتحديث وتوسعة وتطوير المنشآت الصناعية والمشاريع الكبرى منذ 2004.',
    },
    description: {
      en: 'HARD offers grass root building construction, plant construction, plant revamp and modification, plant upgrade and expansion and de-bottlenecking for LSTK/EPC/LSPB type projects. Our expert team studies individual requirements, planning and scheduling prior to commencement with a highly trained workforce.',
      ar: 'تقدم هارد مقاولات البناء من الأساسات، تشييد المصانع، إعادة تأهيل وتطوير وتوسعة المنشآت وتجاوز الاختناقات لمشاريع LSTK و EPC و LSPB. يقوم فريقنا المتخصص بدراسة أدق تفاصيل كل مشروع وجدولة الأعمال بدقة مع كادر فني مدرب.',
    },
    features: [
      {
        title: {
          en: 'LSTK, EPC & LSPB Turnkey Capabilities',
          ar: 'تنفيذ كامل لمشاريع LSTK و EPC و LSPB',
        },
        desc: {
          en: 'Engineering, Procurement, Construction, and Lump Sum Turnkey delivery on time and within budget.',
          ar: 'تغطية كاملة لكافة مراحل الهندسة والتوريد والإنشاء والتسليم على المفتاح وفق الميزانية المحددة.',
        },
      },
      {
        title: {
          en: 'Industrial Plant Expansion & Revamp',
          ar: 'توسعة وتحديث المصانع والمنشآت',
        },
        desc: {
          en: 'Plant modification, facility upgrades, and debottlenecking maintaining full operational continuity.',
          ar: 'تعديل وتوسعة خطوط الإنتاج والمنشآت الصناعية ورفع كفاءتها دون الإخلال بالعمليات التشغيلية.',
        },
      },
      {
        title: {
          en: 'Civil, Mechanical & Electro-Mechanical Integration',
          ar: 'تكامل الأعمال المدنية والميكانيكية والكهربائية',
        },
        desc: {
          en: 'End-to-end execution combining structural concrete, steel frameworks, and mechanical systems.',
          ar: 'تنفيذ شامل يجمع بين الهياكل الخرسانية والهياكل المعدنية والأنظمة الكهروميكانيكية.',
        },
      },
    ],
    stats: [
      {
        value: '2004',
        label: { en: 'Established in Saudi Arabia', ar: 'سنة التأسيس في المملكة' },
      },
      {
        value: 'LSTK / EPC',
        label: { en: 'Project Delivery Models', ar: 'نماذج تسليم المفتاح المعتمدة' },
      },
      {
        value: 'Zero Defect',
        label: { en: 'Rigorous QA Guarantee', ar: 'ضمان الجودة والسلامة' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
    actionText: {
      en: 'View Construction Portfolio',
      ar: 'استعراض مشاريع المقاولات',
    },
    actionHref: '/construction',
    actionType: 'contracting',
    division: 'construction',
  },
  {
    id: 'serv-con-2',
    slug: 'quality-assurance-control',
    tag: {
      en: 'Quality Assurance (QA/QC)',
      ar: 'ضمان الجودة والرقابة الفنية',
    },
    title: {
      en: 'Comprehensive Quality Assurance & Materials Inspection',
      ar: 'ضمان الجودة وفحص المواد قبل وبعد التوريد',
    },
    subtitle: {
      en: 'Preventing defects and guaranteeing compliance with client specifications and international standards.',
      ar: 'منع أي عيوب أو أخطاء في مواد البناء والتحقق التام من مطابقتها للمواصفات المعتمدة والمعايير العالمية.',
    },
    description: {
      en: 'Our construction services are guaranteed to prevent any possible defects or mistakes with construction materials before and after delivery to the construction site. QA is vital to check all items comply with agreed standards and avoid having any conflict with the original functionality.',
      ar: 'خدماتنا الإنشائية مضمونة لمنع أي عيوب أو أخطاء محتملة في مواد البناء قبل وبعد وصولها لموقع العمل. يعد ضمان الجودة ركيزة حيوية للتأكد من مطابقة جميع المواد للمعايير المعتمدة وتجنب أي تعارض مع الوظيفة الأساسية للمبنى.',
    },
    features: [
      {
        title: {
          en: 'Pre- & Post-Delivery Materials Verification',
          ar: 'فحص المواد قبل وبعد التوريد للموقع',
        },
        desc: {
          en: 'Rigorous chemical and physical lab testing for concrete, steel, insulation, and piping.',
          ar: 'اختبارات مخبرية دقيقة للخرسانة والحديد والعوازل والأنابيب لضمان سلامتها التامة.',
        },
      },
      {
        title: {
          en: 'Adherence to Client & International Codes',
          ar: 'مطابقة المواصفات المعتمدة عالمياً',
        },
        desc: {
          en: 'Strict compliance audits against Saudi Building Code (SBC), ASTM, and ISO standards.',
          ar: 'تدقيق دوري وصارم وفق كود البناء السعودي والمعايير الدولية المعتمدة من العميل.',
        },
      },
      {
        title: {
          en: 'Zero Conflict with Original Functionality',
          ar: 'ضمان الأداء الوظيفي الكامل للمنشأة',
        },
        desc: {
          en: 'Systematic audits ensuring all architectural, structural, and mechanical elements operate seamlessly.',
          ar: 'مراجعة منهجية لضمان عمل كافة العناصر الإنشائية والميكانيكية وفق أعلى مستويات الكفاءة.',
        },
      },
    ],
    stats: [
      {
        value: '100%',
        label: { en: 'Materials Inspected', ar: 'فحص شامل لجميع المواد' },
      },
      {
        value: 'ISO & SASO',
        label: { en: 'Certified Standards', ar: 'مطابقة للمعايير والمواصفات' },
      },
      {
        value: 'Zero Defect',
        label: { en: 'Target Standard', ar: 'هدفنا الإنشائي الدائم' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    actionText: {
      en: 'Learn About QA Standards',
      ar: 'معايير ضمان الجودة',
    },
    actionHref: '/construction/sbc-standards',
    actionType: 'contracting',
    division: 'construction',
  },
  {
    id: 'serv-con-3',
    slug: 'work-safety-hse',
    tag: {
      en: 'Work Safety (HSE)',
      ar: 'السلامة والصحة المهنية',
    },
    title: {
      en: 'Work Safety Procedures & Dedicated On-Site Safety Engineers',
      ar: 'إجراءات السلامة المهنية وتعيين مهندسي سلامة بالموقع',
    },
    subtitle: {
      en: 'Safety is first and most important: monthly workforce training, mandatory PPE, and rigorous controls.',
      ar: 'السلامة أولاً وأهم أولوياتنا الإنشائية: تدريب شهري للكوادر، إلزامية معدات الوقاية، وضوابط ميدانية صارمة.',
    },
    description: {
      en: 'HARD considers safety first and most important in construction. Safety procedures are integrated into training programs for our manpower and senior staff on a monthly basis. We provide certified site safety engineers and assistants to issue safety requirements and enforce site controls.',
      ar: 'تعتبر المؤسسة السلامة الأولى والأهم في مجال الإنشاءات، ولهذا تعد إجراءات السلامة جزءاً أساسياً من البرنامج التدريبي لكوادرنا وكبار موظفينا شهرياً، مع توفير مهندس سلامة ميداني ومساعدين لضبط متطلبات السلامة في كافة مراحل العمل.',
    },
    features: [
      {
        title: {
          en: 'Dedicated Site Safety Engineer & Assistants',
          ar: 'مهندس سلامة مقيم ومساعدين في كل موقع',
        },
        desc: {
          en: 'Full-time safety supervision issuing work permits, hazard prevention guidelines, and compliance checks.',
          ar: 'إشراف ميداني مستمر لإصدار تصاريح العمل وتطبيق إرشادات الوقاية من المخاطر.',
        },
      },
      {
        title: {
          en: 'Mandatory PPE & Equipment Operator Certification',
          ar: 'معدات الوقاية وتراخيص تشغيل الآليات',
        },
        desc: {
          en: 'Standardized safety shoes, helmets, vehicle speed limits, and certified heavy equipment operator licenses.',
          ar: 'توفير أحذية وخوذ السلامة، وفرض سرعات محددة للمركبات، وتراخيص قيادة معتمدة لمشغلي المعدات الثقيلة.',
        },
      },
      {
        title: {
          en: 'Site Warning Protocols & Monthly Drills',
          ar: 'لوحات تحذيرية وتدريب شهري للعمالة',
        },
        desc: {
          en: 'Comprehensive flags, warning tape, warning lights, cones, and mechanical electrical tool protections.',
          ar: 'نشر الأشرطة التحذيرية والأضواء والأقماع ولوحات التنبيه، وفحص أدوات الحماية للآلات الكهربائية.',
        },
      },
    ],
    stats: [
      {
        value: 'Safety First',
        label: { en: 'Zero Tolerance Policy', ar: 'أولوية لا تهاون فيها' },
      },
      {
        value: 'Monthly',
        label: { en: 'Staff Training Programs', ar: 'برامج تدريب وتأهيل شهري' },
      },
      {
        value: 'Certified',
        label: { en: 'Site Safety Engineers', ar: 'مهندسو سلامة معتمدون' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    actionText: {
      en: 'Safety Policy Details',
      ar: 'تفاصيل سياسة السلامة',
    },
    actionHref: '/construction/sbc-standards',
    actionType: 'contracting',
    division: 'construction',
  },
];

// 3. Maintenance, HVAC & Specialized Agencies (from hardgp.com: maintenance_operations.html, air_conditioning_works.html, electrical_works.html, plumbing_works.html, welding_works.html, thermal_pipes_sanitation.html, fire_extinguishers.html)
export const referenceHVACServices: ReferenceServiceItem[] = [
  {
    id: 'serv-hvac-1',
    slug: 'air-conditioning-works',
    tag: {
      en: 'Air Conditioning Works (A/C)',
      ar: 'أعمال التكييف والتبريد المركزي',
    },
    title: {
      en: 'Air Conditioning Systems with Pioneer Brand Agreements',
      ar: 'أعمال التكييف المركزية بشراكة مع رواد الصناعة',
    },
    subtitle: {
      en: 'Partnerships with AlZamil, Daikin, LG, Samsung, and Trane with 5-year vendor warranties and free site surveys.',
      ar: 'اتفاقيات مع كبرى شركات التكييف: الزامل، دايكن، إل جي، سامسونج، وترين مع ضمان 5 سنوات ومعاينة مجانية.',
    },
    description: {
      en: 'HARD has agreements with pioneers in Air Conditioning services: AlZamil, Daikin, LG, Samsung, and Trane. Warranty is provided for 5 years from the vendor and after-sales service by our customer support staff. Our installation experts bring over 10 years of experience. We provide free site surveys carried out by AC Engineers and offer regular quarterly, bi-annual, and annual maintenance contracts.',
      ar: 'ترتبط هارد باتفاقيات مع رواد شركات التكييف العالمية: الزامل، دايكن، إل جي، سامسونج، وترين. نوفر ضماناً لمدة 5 سنوات من المصنع وخدمات ما بعد البيع عبر فريق دعم العملاء. يمتلك خبراؤنا خبرة تزيد عن 10 سنوات، مع توفير معاينة موقع مجانية بواسطة مهندسي تكييف وعقود صيانة دورية (ربع سنوية، نصف سنوية، وسنوية).',
    },
    features: [
      {
        title: {
          en: 'Authorized Pioneer Brands',
          ar: 'شراكات مع رواد التكييف العالميين',
        },
        desc: {
          en: 'Official partnerships with AlZamil, Daikin, LG, Samsung, and Trane.',
          ar: 'اتفاقيات رسمية مع كبرى العلامات: الزامل، دايكن، إل جي، سامسونج، وترين.',
        },
      },
      {
        title: {
          en: '5-Year Vendor Warranty & Free Survey',
          ar: 'ضمان 5 سنوات ومعاينة مجانية للموقع',
        },
        desc: {
          en: 'Full 5-year equipment warranty and complimentary engineering site survey for new projects.',
          ar: 'ضمان 5 سنوات من الشركة المصنعة مع كشف ميداني هندسي مجاني للمشاريع الجديدة.',
        },
      },
      {
        title: {
          en: 'Flexible Maintenance Contracts (AMC)',
          ar: 'عقود صيانة دورية مرنة (AMC)',
        },
        desc: {
          en: 'Scheduled contracts for individuals and companies on quarterly, bi-annual, and annual basis.',
          ar: 'عقود صيانة وقائية منتظمة للأفراد والشركات (ربع سنوية، نصف سنوية، وسنوية).',
        },
      },
    ],
    stats: [
      {
        value: '5 Years',
        label: { en: 'Vendor Warranty', ar: 'ضمان معتمد 5 سنوات' },
      },
      {
        value: '5 Brands',
        label: { en: 'AlZamil, Daikin, LG, Samsung, Trane', ar: 'الزامل، دايكن، LG، سامسونج، ترين' },
      },
      {
        value: '10+ Years',
        label: { en: 'Technician Experience', ar: 'خبرة مهندسي التكييف' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80',
    actionText: {
      en: 'Explore HVAC Maintenance',
      ar: 'خدمات التكييف وعقود الصيانة',
    },
    actionHref: '/hvac',
    actionType: 'hvac',
    division: 'hvac',
  },
  {
    id: 'serv-hvac-2',
    slug: 'electrical-engineering-works',
    tag: {
      en: 'Electrical Works (E&I)',
      ar: 'الأعمال الكهربائية وأنظمة التحكم',
    },
    title: {
      en: 'Medium & Low Voltage Electrical, Instrumentation & Control Systems',
      ar: 'أنظمة الكهرباء للجهد المتوسط والمنخفض والتحكم والإنذار',
    },
    subtitle: {
      en: 'Power substations, generators, lightning protection, DCS/PLC/SCADA control, campus networks, and fire alarms.',
      ar: 'محطات التحويل، المولدات، شبكات التأريض، أنظمة التحكم الصناعي، شبكات الألياف، وأنظمة الإنذار.',
    },
    description: {
      en: 'The HARD E&I team has vast engineering and design experience in Medium and Low Voltage Electrical systems, Instrumentation, Various Control Systems (DCS, ESD, PLC, RTU, SCADA), LAN, Campus Networking (UTP, STP, OFC), Fire Alarm and Security Systems. Systems include Power Generators & Substations, Lighting, Lighting Protection & Grounding, and Communication Paging Systems.',
      ar: 'يمتلك فريق الهندسة والتحكم في هارد خبرة واسعة في تصميم وتنفيذ أنظمة الكهرباء للجهد المتوسط والمنخفض، الأجهزة الدقيقة، أنظمة التحكم الآلي (DCS, ESD, PLC, RTU, SCADA)، شبكات LAN والألياف الضوئية، وأنظمة الإنذار والأمن الصناعي، والمولدات ومحطات التحويل والحماية من الصواعق.',
    },
    features: [
      {
        title: {
          en: 'Power Generators & Substation Works',
          ar: 'محطات التحويل والمولدات الكهربائية',
        },
        desc: {
          en: 'Complete installation of medium and low voltage distribution boards, switchgear, and backup generators.',
          ar: 'تركيب لوحات التوزيع والمفاتيح الكهربائية للجهد المتوسط والمنخفض والمولدات الاحتياطية.',
        },
      },
      {
        title: {
          en: 'Industrial Control Systems (PLC / SCADA / DCS)',
          ar: 'أنظمة التحكم الصناعي والأتمتة',
        },
        desc: {
          en: 'Engineering and integration of DCS, ESD, PLC, RTU, and SCADA monitoring networks.',
          ar: 'هندسة وتكامل أنظمة التحكم المتطورة وشاشات المراقبة الصناعية SCADA و PLC و DCS.',
        },
      },
      {
        title: {
          en: 'Lightning Protection, Grounding & Fire Alarms',
          ar: 'الحماية من الصواعق والتأريض وكشف الحريق',
        },
        desc: {
          en: 'Complete certified grounding grids, lightning rods, addressable fire alarm and paging communication.',
          ar: 'شبكات تأريض هندسية، مانعات صواعق، وأنظمة إنذار حريق معنونة وشبكات اتصال وإخلاء صوتي.',
        },
      },
    ],
    stats: [
      {
        value: 'MV & LV',
        label: { en: 'Medium & Low Voltage', ar: 'جهد متوسط ومنخفض' },
      },
      {
        value: 'PLC / SCADA',
        label: { en: 'Advanced Automation', ar: 'تحكم وأتمتة صناعية' },
      },
      {
        value: 'Complete',
        label: { en: 'Protection & Grounding', ar: 'أنظمة تأريض وحماية متكاملة' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80',
    actionText: {
      en: 'Inquire Electrical Services',
      ar: 'طلب خدمات الكهرباء والتحكم',
    },
    actionHref: '/hvac',
    actionType: 'hvac',
    division: 'hvac',
  },
  {
    id: 'serv-hvac-3',
    slug: 'plumbing-thermal-pipes',
    tag: {
      en: 'Plumbing & Thermal Pipes',
      ar: 'السباكة والأنابيب الحرارية المعتمدة',
    },
    title: {
      en: 'Plumbing Works & Exclusive Al-Ameria Thermal Pipes Agency',
      ar: 'أعمال السباكة والوكالة الحصرية لأنابيب العامرية الحرارية',
    },
    subtitle: {
      en: 'German-engineered polypropylene thermal pipes with a 50-year warranty, HDPE networks, and complete plumbing services.',
      ar: 'أنابيب حرارية ألمانية الصنع في تركيا بضمان 50 سنة، وشبكات HDPE، وخدمات السباكة المتكاملة.',
    },
    description: {
      en: 'The plumbing unit serves residential, commercial, and industrial clients with water heater repair, sink/toilet installation, remodeling, drain/sewer repairs, shut-off valves, and complete piping systems. HARD is also the exclusive authorized distributor in the Eastern Province for Al-Ameria Pipes (German-engineered thermal polypropylene pipes with 50-year warranty, 3 free product inspections, ISO/SASO certified), Italian Euro HDPE pipes for gas and large water networks, and international sanitation products.',
      ar: 'توفر وحدة السباكة في هارد خدمات متكاملة للمباني السكنية والتجارية والصناعية: صيانة السخانات، تجديد المطابخ والحمامات، صيانة الصرف والمحابس. كما أن هارد هي الوكيل الحصري في المنطقة الشرقية لأنابيب العامرية الحرارية (أنابيب بولي بروبيلين ألمانية الصنع بتركيا مع ضمان 50 سنة و3 كشوفات مجانية ومطابقة لـ ISO و SASO)، وأنابيب HDPE الإيطالية لخطوط الغاز والماء الضخمة.',
    },
    features: [
      {
        title: {
          en: 'Exclusive Agency: Al-Ameria Thermal Pipes',
          ar: 'وكالة حصرية: أنابيب العامرية الحرارية',
        },
        desc: {
          en: 'German-engineered polypropylene pipes with 50-year warranty and free 3-stage quality inspections.',
          ar: 'أنابيب بولي بروبيلين ألمانية متميزة تتحمل أعلى درجات الضغط مع ضمان 50 سنة و3 فحوصات مجانية.',
        },
      },
      {
        title: {
          en: 'Italian Euro HDPE Heavy Infrastructure Pipes',
          ar: 'أنابيب HDPE الإيطالية للبنية التحتية',
        },
        desc: {
          en: 'High-density polyethylene pipes tailored for governmental and industrial gas and high-volume water networks.',
          ar: 'أنابيب بولي إيثيلين إيطالية الصنع تلبي متطلبات خطوط الغاز وشبكات المياه الكبرى في المنشآت.',
        },
      },
      {
        title: {
          en: 'Full Commercial & Residential Plumbing',
          ar: 'صيانة وتمديد السباكة المنزلية والصناعية',
        },
        desc: {
          en: 'Water heater repair, bathroom & kitchen remodeling, drain & sewer clearing, and shut-off valve restorations.',
          ar: 'تمديد وصيانة خطوط التغذية والصرف، تركيب وصيانة السخانات والمغاسل، ومعالجة التسربات.',
        },
      },
    ],
    stats: [
      {
        value: '50 Years',
        label: { en: 'Al-Ameria Pipe Warranty', ar: 'ضمان 50 سنة لأنابيب العامرية' },
      },
      {
        value: '3 Free',
        label: { en: 'Product Inspections', ar: '3 كشوفات واختبارات مجانية' },
      },
      {
        value: 'Exclusive',
        label: { en: 'Eastern Province Agency', ar: 'وكالة حصرية بالمنطقة الشرقية' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
    actionText: {
      en: 'Explore Plumbing & Pipes',
      ar: 'تفاصيل السباكة والأنابيب الحرارية',
    },
    actionHref: '/hvac',
    actionType: 'hvac',
    division: 'hvac',
  },
  {
    id: 'serv-hvac-4',
    slug: 'soteria-fire-extinguishers',
    tag: {
      en: 'Fire Fighting Innovation',
      ar: 'تقنيات مكافحة الحريق المبتكرة',
    },
    title: {
      en: 'SOTERIA Throwable & Kitchen Fire Extinguishers',
      ar: 'مطافئ الحريق المبتكرة SOTERIA (للقذف وللمطابخ)',
    },
    subtitle: {
      en: 'Extinguish fires in 1 simple step: no annual inspection, no maintenance, 5-year lifespan, child & elderly friendly.',
      ar: 'إخماد الحريق في خطوة واحدة بسيطة: بدون صيانة سنوية، تدوم حتى 5 سنوات، آمنة للأطفال وكبار السن.',
    },
    description: {
      en: 'Authorized distributor of SOTERIA innovative fire extinguishers: put out fires in 1 simple step with zero training required. Environmentally friendly, non-hazardous, and lasts up to 5 years with no annual inspections or maintenance needed. Puts out initial fires, flammable liquid fires (petrol, paint thinners, kerosene), deep seated fires, and cooking oil fires. Available in Kitchen and Throwable formats.',
      ar: 'موزع معتمد لمطافئ الحريق المبتكرة SOTERIA: إخماد الحرائق في خطوة واحدة سهلة دون الحاجة لأي تدريب مسبق. صديقة للبيئة، غير خطرة، وتدوم حتى 5 سنوات دون الحاجة لأي صيانة أو فحص سنوي. تخمد الحرائق الأولية، السوائل القابلة للاشتعال (البنزين، التنر، الكيروسين)، الحرائق العميقة، وحرائق زيوت الطهي. متوفرة بنوعين: للمطابخ وللقذف المباشر.',
    },
    features: [
      {
        title: {
          en: '1-Step Throwable Fire Extinguishing',
          ar: 'إخماد الحريق بقذف الزجاجة في خطوة واحدة',
        },
        desc: {
          en: 'If a child can throw a ball, fire can be snuffed out easily without complicated nozzles or gauges.',
          ar: 'إذا كان الطفل قادراً على رمي الكرة، يمكنه إخماد الحريق بسهولة دون تعقيدات الفوهات والعدادات.',
        },
      },
      {
        title: {
          en: 'No Annual Inspection & 5-Year Lifespan',
          ar: 'بدون صيانة سنوية وتدوم حتى 5 سنوات',
        },
        desc: {
          en: 'Zero ongoing maintenance costs, completely non-hazardous, and ready for immediate emergency use.',
          ar: 'تكلفة صيانة صفرية، آمنة بيئياً تماماً، وجاهزة دائماً للاستخدام الفوري في حالات الطوارئ.',
        },
      },
      {
        title: {
          en: 'Effective on Flammable Liquids & Kitchen Cooking Oils',
          ar: 'فعالية فائقة على السوائل المشتعلة وزيوت الطهي',
        },
        desc: {
          en: 'Instantly extinguishes challenging oil and chemical fires that conventional water or powder cannot suppress safely.',
          ar: 'تخمد على الفور حرائق زيوت الطبخ وحرائق السوائل البترولية التي يصعب إطفاؤها بالطرق التقليدية.',
        },
      },
    ],
    stats: [
      {
        value: '1 Step',
        label: { en: 'Instant Fire Suppression', ar: 'إخماد فوري بخطوة واحدة' },
      },
      {
        value: '5 Years',
        label: { en: 'Maintenance-Free Shelf Life', ar: 'صلاحية 5 سنوات بدون صيانة' },
      },
      {
        value: '4 Fire Types',
        label: { en: 'Initial, Liquid, Deep, Cooking Oil', ar: 'السوائل، الزيوت، المواد الصلبة، البدايات' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
    actionText: {
      en: 'Contact Distributorship Desk',
      ar: 'طلب منتجات سوتيريا للسلامة',
    },
    actionHref: '/contact-us',
    actionType: 'hvac',
    division: 'hvac',
  },
  {
    id: 'serv-hvac-5',
    slug: 'welding-fabrication-works',
    tag: {
      en: 'Welding & Cutting Works',
      ar: 'أعمال اللحام والحدادة الهندسية',
    },
    title: {
      en: 'Specialized Industrial Welding, Cutting & Plant Erection',
      ar: 'أعمال اللحام الهندسي وقطع المعادن والمنشآت الصناعية',
    },
    subtitle: {
      en: 'Gas welding, cutting, brazing, electric welding with full PPE safety compliance, grounding, and gas detection.',
      ar: 'لحام الغاز والقطع الحراري واللحام بالقوس الكهربائي مع الالتزام الصارم بمعايير السلامة والتأريض.',
    },
    description: {
      en: 'Welding works implemented by our certified welding specialists engaged in gas welding, cutting, and brazing operations. Strict PPE enforcement with helmets, goggles, and filter gloves. Welding machines are tested for insulation, elevated 15 cm above ground, grounded effectively, with gas detector verification in vapor-sensitive areas under Safety Engineer supervision.',
      ar: 'أعمال لحام متخصصة ينفذها فنيون معتمدون في لحام الغاز والقطع واللحام بالنحاس ولحام القوس الكهربائي. التزام صارم بارتداء الخوذ ونظارات الوقاية والقفازات العازلة، وفحص عزل ماكينات اللحام ورفعها 15 سم عن الأرض مع كشف الغاز وإشراف هندسي ميداني.',
    },
    features: [
      {
        title: {
          en: 'Gas Welding, Cutting & Brazing',
          ar: 'لحام الغاز والقطع واللحام بالنحاس',
        },
        desc: {
          en: 'Oxy-fuel cutting, structural steel welding, and piping brazing to industrial standards.',
          ar: 'قص ولحام الهياكل الفولاذية وشبكات الأنابيب وفق المواصفات الصناعية المعتمدة.',
        },
      },
      {
        title: {
          en: 'Strict Electrical Safety & Grounding',
          ar: 'تأريض كهربائي وعزل ماكينات اللحام',
        },
        desc: {
          en: 'Welding machines elevated 15 cm, mechanically strong ground loads, and approved insulated connectors.',
          ar: 'رفع ماكينات اللحام 15 سم عن الأرض مع تأريض كهربائي معتمد وفحص العزل الدوري.',
        },
      },
      {
        title: {
          en: 'Elevated & Sensitive Area Safety Protocols',
          ar: 'إجراءات السلامة في الأماكن المرتفعة والحساسة',
        },
        desc: {
          en: 'Safety harness enforcement at elevated spots and gas detector checks in vapor areas before welding starts.',
          ar: 'أحزمة أمان في الأماكن المرتفعة وفحص الغازات بكواشف إلكترونية تحت إشراف مهندس السلامة.',
        },
      },
    ],
    stats: [
      {
        value: '15 cm',
        label: { en: 'Dry Elevation Standard', ar: 'رفع الماكينات عن الأرض' },
      },
      {
        value: 'Gas Checked',
        label: { en: 'Detector Verified', ar: 'فحص مسبق لكواشف الغاز' },
      },
      {
        value: 'Certified',
        label: { en: 'Specialist Welders', ar: 'فنيو لحام معتمدون' },
      },
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    actionText: {
      en: 'Inquire Welding Services',
      ar: 'طلب خدمات اللحام الهندسي',
    },
    actionHref: '/hvac',
    actionType: 'hvac',
    division: 'hvac',
  },
];
