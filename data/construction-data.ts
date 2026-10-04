export interface ConstructionCompanyInfo {
  taxId: string;
  momrahClassification: { ar: string; en: string };
  sceAccreditation: { ar: string; en: string };
  phone: string;
  mobile: string;
  whatsapp: string;
  email: string;
  address: { ar: string; en: string };
  easternProvinceBranch: { ar: string; en: string };
}

export interface ConstructionServiceItem {
  id: string;
  iconName: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  deliverablesAr: string[];
  deliverablesEn: string[];
  warrantyYears: number;
  badgeAr: string;
  badgeEn: string;
  startingPriceSAR: string;
}

export interface ConstructionProjectItem {
  id: string;
  titleAr: string;
  titleEn: string;
  category: "residential" | "commercial" | "industrial" | "finishing" | string;
  status: "completed" | "in-progress" | "delivered" | string;
  locationAr: string;
  locationEn: string;
  cityAr: string;
  cityEn: string;
  year: string;
  buaM2: number;
  durationMonths: number;
  valueSAR: string;
  clientAr: string;
  clientEn: string;
  image: string;
  galleryImages: string[];
  descriptionAr: string;
  descriptionEn: string;
  scopeAr: string[];
  scopeEn: string[];
  structuralSystemAr: string;
  structuralSystemEn: string;
  finishingLevelAr: string;
  finishingLevelEn: string;
  highlightsAr: string[];
  highlightsEn: string[];
  featured?: boolean;
}

export interface ConstructionLeadItem {
  id: string;
  referenceNumber: string;
  createdAt: string;
  clientName: string;
  phoneNumber: string;
  email: string;
  city: string;
  district: string;
  projectType: string;
  finishingLevel?: string;
  builtUpArea?: number;
  budgetRangeSAR?: string;
  timeline?: string;
  notes?: string;
  hasArchitecturalPlans?: boolean;
  fileName?: string;
  source?: string;
  inquiredProjectId?: string;
  estimatedValueSAR?: number;
  status: "new" | "contacted" | "proposal_sent" | "won" | "closed";
  adminNotes?: string;
}

export interface CostCalculatorParams {
  projectType: "villa" | "commercial-building" | "duplex" | "residential-compound" | "warehouse" | string;
  finishingLevel: "skeleton" | "commercial" | "deluxe" | "super-luxury" | string;
  builtUpArea: number;
  floors: number;
  hasBasement: boolean;
  hasPool: boolean;
  hasElevator: boolean;
  hasSmartHome: boolean;
  location?: string;
}

export interface CostEstimateResult {
  minTotalSAR: number;
  maxTotalSAR: number;
  avgTotalSAR: number;
  structuralCostSAR: number;
  finishingCostSAR: number;
  mepCostSAR: number;
  addonsCostSAR: number;
  pricePerM2SAR: number;
  estimatedDurationMonths: number;
}

export const hardConstructionCompanyInfo: ConstructionCompanyInfo = {
  "taxId": "300192847100003",
  "momrahClassification": {
    "ar": "مؤسسة هارد للمقاولات العامة والتطوير الإنشائي",
    "en": "HARD General Contracting Establishment"
  },
  "sceAccreditation": {
    "ar": "خدمات إنشائية وصناعية وبنية تحتية منذ 2004",
    "en": "Industrial & Infrastructure Contractor Since 2004"
  },
  "phone": "+966 13 844 4663",
  "mobile": "+966 55 612 5711",
  "whatsapp": "+966556125711",
  "email": "info@hardgp.com",
  "address": {
    "ar": "4737 الشارع الثامن عشر - حي الريان، وحدة رقم: 1، الدمام 32256 - 8405، المملكة العربية السعودية",
    "en": "4737 18th - Al-Rayyan, Unit No.: 1, Dammam 32256 - 8405, Kingdom of Saudi Arabia"
  },
  "easternProvinceBranch": {
    "ar": "الدمام والمنطقة الشرقية، والتوسع بالمنطقة الوسطى والغربية",
    "en": "Dammam & Eastern Province, with expansion in Central & Western Provinces"
  }
};


export const hardConstructionServices: ConstructionServiceItem[] = [
  {
    "id": "turnkey-construction",
    "iconName": "Building2",
    "titleAr": "بناء عظم وتسليم مفتاح متكامل",
    "titleEn": "Turnkey Design & Build Construction",
    "subtitleAr": "من المخطط وحتى استلام المفتاح مع ضمان شامل",
    "subtitleEn": "From initial excavation to turnkey handover with warranty",
    "descriptionAr": "تنفيذ شامل للمشاريع السكنية والتجارية يشمل أعمال الحفر والأساسات، العظم الخرساني، والتسليم المفتاح بأعلى معايير كود البناء السعودي مع إشراف هندسي مستمر.",
    "descriptionEn": "End-to-end execution of residential villas and commercial complexes, encompassing deep excavation, reinforced concrete superstructure, MEP engineering, and luxury turnkey delivery.",
    "deliverablesAr": [
      "إشراف هندسي يومي معتمد من كبار المهندسين الاستشاريين",
      "استخدام خرسانات معتمدة ومطابقة للاختبارات المخبرية (Cube Testing)",
      "ضمان شامل لمدة ١٠ سنوات على الهيكل الإنشائي والعوازل",
      "جدول زمني إلكتروني دقيق مع تقارير تقدم دورية موثقة بالصور والفيديو"
    ],
    "deliverablesEn": [
      "Daily certified engineering supervision by licensed consultants",
      "High-spec tested readymix concrete with certified lab reports",
      "10-year comprehensive structural & waterproofing warranty",
      "Digital timeline tracking with weekly high-res photo/video logs"
    ],
    "warrantyYears": 10,
    "badgeAr": "الخدمة الأكثر طلباً",
    "badgeEn": "Most Popular",
    "startingPriceSAR": "١,٤٥٠ ر.س / م²"
  },
  {
    "id": "structural-civil",
    "iconName": "Layers",
    "titleAr": "الأعمال الإنشائية والخرسانية الكبرى",
    "titleEn": "Structural & Heavy Civil Engineering",
    "subtitleAr": "أساسات عميقة، خوازيق، وبلاطات سابقة الإجهاد",
    "subtitleEn": "Deep piling, PT slabs, and high-strength concrete framing",
    "descriptionAr": "تنفيذ الهياكل الخرسانية المسلحة، الخوازيق وسند جوانب الحفر، البلاطات سابقة الإجهاد (Post-Tension)، والهياكل المعدنية الثقيلة للمباني الشاهقة والمستودعات.",
    "descriptionEn": "Specialized in heavy civil structures, deep secant/tangent pile shoring, post-tensioned floor systems, and heavy structural steel erection for high-rise towers and industrial facilities.",
    "deliverablesAr": [
      "دراسات وفحوصات ميكانيكا التربة واختبارات التحميل (CBR & Piling)",
      "تقنيات صب متطورة للخرسانات الكتلية ذات الحرارة المنخفضة",
      "حديد تسليح سابك معتمد بدرجات مقاومة عالية للزلازل والرياح",
      "تقارير الجودة والسلامة المهنية المعتمدة دولياً"
    ],
    "deliverablesEn": [
      "Geotechnical soil investigation & pile load testing verification",
      "Low-heat mass concrete pouring technology for thermal control",
      "Certified SABIC rebar with high ductility seismic resistance",
      "International QA/QC safety auditing and non-destructive testing"
    ],
    "warrantyYears": 10,
    "badgeAr": "معتمد SBC",
    "badgeEn": "SBC Certified",
    "startingPriceSAR": "٦٥٠ ر.س / م²"
  },
  {
    "id": "luxury-finishing",
    "iconName": "Sparkles",
    "titleAr": "التشطيبات الفندقية والديكور المعماري",
    "titleEn": "Ultra-Luxury Fit-Out & Interior Architecture",
    "subtitleAr": "رخام طبيعي، خشب معماري، وواجهات زجاجية حديثة",
    "subtitleEn": "Natural marble, architectural millwork & modern glazing",
    "descriptionAr": "تنفيذ تشطيبات داخلية وخارجية فائقة الفخامة للقصور والفلل والمقرات الإدارية، تشمل الرخام الإيطالي، النجارة المعمارية، الواجهات الزجاجية، والتكسيات الخارجية.",
    "descriptionEn": "Exquisite interior and exterior finishing for high-end residences, corporate headquarters, and hotels, integrating imported Italian marble, bespoke joinery, and structural glazing.",
    "deliverablesAr": [
      "تصميم وتنفيذ لوحات الرخام المتطابق (Book-Matched Marble)",
      "أبواب مخفية ونجارة معمارية مخصصة بخشب الجوز والبلوط الطبيعي",
      "واجهات ألمنيوم وزجاج ثلاثي عازل للصوت والحرارة بأعلى تصنيف",
      "تجهيز أنظمة الإنارة المعمارية الذكية DALI و KNX"
    ],
    "deliverablesEn": [
      "Precision book-matched marble slab fabrication & floor laying",
      "Concealed flush doors and bespoke American walnut joinery",
      "Triple-glazed thermal-break acoustic aluminum curtain walls",
      "Integrated DALI smart architectural lighting scenes"
    ],
    "warrantyYears": 5,
    "badgeAr": "جودة VIP",
    "badgeEn": "VIP Luxury",
    "startingPriceSAR": "١,١٠٠ ر.س / م²"
  },
  {
    "id": "mep-hvac",
    "iconName": "Wrench",
    "titleAr": "الأعمال الكهروميكانيكية والتكييف (MEP)",
    "titleEn": "Electro-Mechanical & Modern HVAC (MEP)",
    "subtitleAr": "أنظمة التكييف المركزي VRF والشبكات الذكية",
    "subtitleEn": "Central VRF air conditioning, plumbing & electrical grid",
    "descriptionAr": "تصميم وتنفيذ متكامل لكافة الأنظمة الكهربائية، الصحية، التكييف المركزي (Chillers & VRF)، وتوزيع الطاقة مع مطابقة كاملة لاشتراطات شركة الكهرباء والمياه والدفاع المدني.",
    "descriptionEn": "Turnkey electrical, mechanical, plumbing, and HVAC systems installation for commercial and residential developments with full SEC, NWC, and Civil Defense approvals.",
    "deliverablesAr": [
      "حسابات الأحمال الحرارية الدقيقة وفق معايير ASHRAE العالمية",
      "تمديدات نحاس مولر أمريكي وعوازل مجاري هواء عالية الكثافة",
      "لوحات توزيع كهربائية ذكية مع حوافظ قواطع Schneider/ABB",
      "اعتماد رسمي من الدفاع المدني لكافة أنظمة الإنذار والإطفاء"
    ],
    "deliverablesEn": [
      "ASHRAE-standard thermal load calculations and airflow CFD",
      "Mueller USA copper piping and closed-cell acoustic duct lining",
      "Schneider Electric / ABB certified switchgear & distribution panels",
      "Official Civil Defense certification for fire alarm & suppression"
    ],
    "warrantyYears": 5,
    "badgeAr": "كفاءة طاقة",
    "badgeEn": "Energy Efficient",
    "startingPriceSAR": "٤٥٠ ر.س / م²"
  },
  {
    "id": "renovation-heritage",
    "iconName": "Hammer",
    "titleAr": "الترميم والتطوير المعماري الشامل",
    "titleEn": "Structural Renovation & Architectural Retrofit",
    "subtitleAr": "تحديث المباني القائمة وتدعيم العناصر الإنشائية",
    "subtitleEn": "Modernizing existing structures & structural carbon-fiber retrofitting",
    "descriptionAr": "تحديث وترميم المباني القائمة، تدعيم الأعمدة والأساسات بألياف الكربون (Carbon Fiber CFRP)، وإعادة تصميم الواجهات القديمة لتتحول إلى تحف معمارية عصرية تواكب رؤية ٢٠٣٠.",
    "descriptionEn": "Structural rehabilitation and architectural rejuvenation of existing facilities, carbon-fiber structural strengthening (CFRP), and modern facade re-skinning.",
    "deliverablesAr": [
      "فحص واختبار السلامة الإنشائية بالموجات فوق الصوتية (NDT Testing)",
      "تدعيم خرساني معتمد يرفع قدرة التحمل الإنشائية حتى ٨٠٪",
      "إزالة الحوائط القديمة وتوسيع المساحات الداخلية بأمان تام",
      "إعادة تصميم الواجهات بتكسيات حديثة معزولة (Cladding / Stone)"
    ],
    "deliverablesEn": [
      "Ultrasonic Non-Destructive Testing (NDT) structural integrity audit",
      "Certified CFRP carbon-fiber reinforcement boosting capacity up to 80%",
      "Safe structural load-transfer for open-plan space modernization",
      "Modern insulated facade re-cladding with engineered stone/porcelain"
    ],
    "warrantyYears": 5,
    "badgeAr": "تطوير مستدام",
    "badgeEn": "Modernization",
    "startingPriceSAR": "٧٥٠ ر.س / م²"
  },
  {
    "id": "value-engineering",
    "iconName": "Calculator",
    "titleAr": "الهندسة القيمة ودراسات الجدوى والمناقصات",
    "titleEn": "Value Engineering & Feasibility BOQ Studies",
    "subtitleAr": "تقليل تكاليف البناء بنسبة تصل إلى ٢٥٪ دون المساس بالجودة",
    "subtitleEn": "Cost optimization reducing up to 25% without compromising quality",
    "descriptionAr": "مراجعة وتدقيق المخططات الهندسية وجداول الكميات (BOQ)، واقتراح بدائل إنشائية ومعمارية ذكية توفر مئات الآلاف من الريالات مع الحفاظ على أعلى معايير الأمان والمتانة.",
    "descriptionEn": "Systematic engineering optimization of structural drawings and Bill of Quantities (BOQ), eliminating redundancies and saving substantial capital expenditure.",
    "deliverablesAr": [
      "تدقيق جداول الكميات والتحقق من واقعية أسعار بنود التوريد والتركيب",
      "اقتراح بدائل للخرسانات والحديد تسهم في خفض التكلفة المادية والزمنية",
      "نماذج نمذجة معلومات البناء 4D BIM لكشف وتفادي التعارضات قبل الصب",
      "تقرير رسمي مفصل بحجم التوفير المالي المحقق لكل مرحلة"
    ],
    "deliverablesEn": [
      "Comprehensive BOQ audit and vendor pricing validation",
      "Smart structural alternatives cutting cost and critical path time",
      "4D BIM clash-detection eliminating on-site re-work costs",
      "Detailed financial optimization report quantifying exact phase savings"
    ],
    "warrantyYears": 1,
    "badgeAr": "توفير استثماري",
    "badgeEn": "High ROI",
    "startingPriceSAR": "استشارة متخصصة"
  }
];

export const hardConstructionProjects: ConstructionProjectItem[] = [
  {
    "id": "hard-por-01",
    "titleAr": "تنفيذ مجمع تجاري وإنشائي متكامل",
    "titleEn": "Commercial Complex & Structural Execution",
    "category": "commercial",
    "status": "completed",
    "locationAr": "المنطقة الشرقية، المملكة العربية السعودية",
    "locationEn": "Eastern Province, Saudi Arabia",
    "cityAr": "الدمام / الخبر",
    "cityEn": "Dammam / Khobar",
    "year": "2022",
    "buaM2": 6500,
    "durationMonths": 18,
    "valueSAR": "مشروع منجز",
    "clientAr": "مؤسسة هارد للمقاولات العامة / عملاء القطاع التجاري",
    "clientEn": "HARD General Contracting Establishment / Commercial Clients",
    "image": "/images/hardgp/por1-big.jpg",
    "galleryImages": [
      "/images/hardgp/por1-big.jpg",
      "/images/hardgp/por1-big.jpg"
    ],
    "descriptionAr": "تنفيذ كامل للأعمال الإنشائية والخرسانية والهيكل الحامل لمجمع تجاري مع تطبيق صارم لمعايير الجودة والسلامة المهنية.",
    "descriptionEn": "Turnkey execution of commercial structural superstructure, concrete framing, and civil contracting delivered on time.",
    "scopeAr": [
      "الأعمال المدنية والإنشائية",
      "صب الهياكل الخرسانية المسلحة",
      "عزل الأساسات والخرسانات",
      "إشراف هندسي يومي مباشر"
    ],
    "scopeEn": [
      "Civil and structural contracting",
      "Reinforced concrete framing",
      "Foundation waterproofing",
      "Certified engineering supervision"
    ],
    "structuralSystemAr": "هيكل خرساني مسلح متكامل",
    "structuralSystemEn": "Reinforced Concrete Structure",
    "finishingLevelAr": "تشطيب تجاري معتمد",
    "finishingLevelEn": "Commercial Specification",
    "highlightsAr": [
      "تنفيذ في الموعد",
      "صفر حوادث سلامة",
      "مطابق للمواصفات القياسية"
    ],
    "highlightsEn": [
      "On-time completion",
      "Zero Safety Incidents",
      "Code Compliant"
    ],
    "featured": true
  },
  {
    "id": "hard-por-02",
    "titleAr": "تشييد مبنى تجاري وسكني متعدد الطوابق",
    "titleEn": "Multi-Storey Commercial & Residential Building",
    "category": "commercial",
    "status": "completed",
    "locationAr": "الدمام، المنطقة الشرقية، المملكة العربية السعودية",
    "locationEn": "Dammam, Eastern Province, KSA",
    "cityAr": "الدمام",
    "cityEn": "Dammam",
    "year": "2021",
    "buaM2": 8200,
    "durationMonths": 20,
    "valueSAR": "مشروع منجز",
    "clientAr": "مطورون ومستثمرون عقاريون",
    "clientEn": "Real Estate Developers & Investors",
    "image": "/images/hardgp/por2-big.jpg",
    "galleryImages": [
      "/images/hardgp/por2-big.jpg",
      "/images/hardgp/por2-big.jpg"
    ],
    "descriptionAr": "تشييد مبنى متعدد الطوابق يشمل الأعمال الإنشائية الكاملة والواجهات المقاومة للعوامل الجوية وتمديدات المرافق.",
    "descriptionEn": "Comprehensive multi-storey reinforced concrete framing and exterior facade construction.",
    "scopeAr": [
      "الأساسات العميقة واللبشة الخرسانية",
      "الهيكل الإنشائي متعدد الطوابق",
      "أعمال العزل والسباكة والتكييف"
    ],
    "scopeEn": [
      "Deep raft foundation",
      "Multi-storey superstructure",
      "Waterproofing, MEP & HVAC integration"
    ],
    "structuralSystemAr": "خرسانة مسلحة عالية المقاومة",
    "structuralSystemEn": "High-Strength Reinforced Concrete",
    "finishingLevelAr": "تشطيب فندقي وسكني متكامل",
    "finishingLevelEn": "Turnkey Residential & Commercial",
    "highlightsAr": [
      "استدامة إنشائية",
      "خرسانات مختبرة مخبرياً",
      "تسليم مفتاح متكامل"
    ],
    "highlightsEn": [
      "Structural Longevity",
      "Lab Tested Concrete",
      "Turnkey Delivery"
    ],
    "featured": true
  },
  {
    "id": "hard-por-03",
    "titleAr": "منشأة صناعية وهيكل فولاذي متطور",
    "titleEn": "Industrial Facility & Structural Framework",
    "category": "industrial",
    "status": "completed",
    "locationAr": "المدينة الصناعية، المنطقة الشرقية",
    "locationEn": "Eastern Province Industrial Area",
    "cityAr": "المنطقة الشرقية",
    "cityEn": "Eastern Province",
    "year": "2022",
    "buaM2": 9500,
    "durationMonths": 14,
    "valueSAR": "مشروع منجز",
    "clientAr": "قطاع المنشآت الصناعية",
    "clientEn": "Industrial Operations Sector",
    "image": "/images/hardgp/por3-big.jpg",
    "galleryImages": [
      "/images/hardgp/por3-big.jpg",
      "/images/hardgp/por3-big.jpg"
    ],
    "descriptionAr": "أعمال مدنية وصناعية تشمل تركيب الهياكل المعدنية واللحام الهندسي المتقدم والأنظمة الكهروميكانيكية المتوافقة مع معايير EPC.",
    "descriptionEn": "Heavy civil and industrial mechanical erection including specialized welding and electro-mechanical systems.",
    "scopeAr": [
      "تركيب الهياكل الفولاذية الثقيلة",
      "أعمال اللحام المعتمدة",
      "أنظمة التحكم والمراقبة الصناعية E&I"
    ],
    "scopeEn": [
      "Heavy steel erection",
      "Certified structural welding",
      "Industrial E&I control systems"
    ],
    "structuralSystemAr": "هيكل فولاذي صناعي مع قواعد خرسانية كتلية",
    "structuralSystemEn": "Heavy Structural Steel with Reinforced Concrete Footings",
    "finishingLevelAr": "مواصفات صناعية متقدمة (Industrial EPC)",
    "finishingLevelEn": "Industrial EPC Standards",
    "highlightsAr": [
      "معايير سلامة صناعية",
      "أعمال لحام معتمدة",
      "جاهزية تشغيلية كاملة"
    ],
    "highlightsEn": [
      "Industrial Safety",
      "Certified Welding",
      "100% Operational"
    ],
    "featured": true
  },
  {
    "id": "hard-por-04",
    "titleAr": "تطوير فلل سكنية ومجمعات عصرية",
    "titleEn": "Residential Villa & Compound Development",
    "category": "residential",
    "status": "completed",
    "locationAr": "حي الريان / الدمام، المنطقة الشرقية",
    "locationEn": "Al-Rayyan / Dammam, Eastern Province",
    "cityAr": "الدمام",
    "cityEn": "Dammam",
    "year": "2023",
    "buaM2": 1400,
    "durationMonths": 12,
    "valueSAR": "مشروع منجز",
    "clientAr": "عملاء القطاع السكني والعائلي",
    "clientEn": "Residential Clients & Families",
    "image": "/images/hardgp/por4-big.jpg",
    "galleryImages": [
      "/images/hardgp/por4-big.jpg",
      "/images/hardgp/por4-big.jpg"
    ],
    "descriptionAr": "عمارة سكنية معاصرة تجمع بين التخطيط الفراغي الذكي والعزل الحراري، مع تمديدات أنابيب العامرية بضمان 50 سنة وتكييف مركزي متطور.",
    "descriptionEn": "Modern residential villa architecture combining smart layout planning, thermal efficiency, and luxury finishes.",
    "scopeAr": [
      "بناء العظم الخرساني والأساسات",
      "أنابيب العامرية الحرارية بضمان 50 سنة",
      "تركيب التكييف المركزي مع الزامل ودايكن"
    ],
    "scopeEn": [
      "Superstructure & foundations",
      "Al-Ameria 50-year thermal piping",
      "Central HVAC with AlZamil/Daikin"
    ],
    "structuralSystemAr": "خرسانة مسلحة مع عزل حراري ومائي مزدوج",
    "structuralSystemEn": "Reinforced Concrete with Dual Thermal Insulation",
    "finishingLevelAr": "تشطيب ديلوكس فاخر",
    "finishingLevelEn": "Deluxe Residential Turnkey",
    "highlightsAr": [
      "ضمان أنابيب 50 عاماً",
      "ضمان تكييف 5 سنوات",
      "تصميم عصري متكامل"
    ],
    "highlightsEn": [
      "50-Year Pipe Warranty",
      "5-Year AC Warranty",
      "Contemporary Design"
    ],
    "featured": true
  },
  {
    "id": "hard-por-05",
    "titleAr": "أعمال الهياكل الخرسانية المسلحة والصب",
    "titleEn": "Concrete Framework & Structural Works",
    "category": "residential",
    "status": "completed",
    "locationAr": "المنطقة الشرقية، المملكة العربية السعودية",
    "locationEn": "Eastern Province, Saudi Arabia",
    "cityAr": "الخبر / الدمام",
    "cityEn": "Khobar / Dammam",
    "year": "2022",
    "buaM2": 3200,
    "durationMonths": 10,
    "valueSAR": "مشروع منجز",
    "clientAr": "مستثمرون وشركاء التطوير الإنشائي",
    "clientEn": "Structural & Investment Partners",
    "image": "/images/hardgp/por5-big.jpg",
    "galleryImages": [
      "/images/hardgp/por5-big.jpg",
      "/images/hardgp/por5-big.jpg"
    ],
    "descriptionAr": "نجارة مسلحة عالية الدقة، وتثبيت حديد التسليح، وصب الخرسانة المسلحة وفق درجات حرارة مضبوطة وبفحوصات كسر مخبرية معتمدة.",
    "descriptionEn": "High-precision shuttering, steel reinforcement binding, and temperature-controlled mass concrete casting.",
    "scopeAr": [
      "الأعمال الإنشائية العظم",
      "تسليح ومراقبة الجودة اليومية",
      "اختبارات الخرسانة المخبرية"
    ],
    "scopeEn": [
      "Core structural works",
      "Rebar QA/QC daily verification",
      "Laboratory cube compression testing"
    ],
    "structuralSystemAr": "هياكل خرسانية متينة مقاومة للأملاح",
    "structuralSystemEn": "Sulfate-Resistant Reinforced Concrete",
    "finishingLevelAr": "عظم مطابق للمواصفات القياسية",
    "finishingLevelEn": "Standard Structural Shell",
    "highlightsAr": [
      "فحص مخبري دوري",
      "حديد تسليح معتمد",
      "صفر عيوب إنشائية"
    ],
    "highlightsEn": [
      "Periodic Lab Testing",
      "Certified Rebar",
      "Zero Defect Delivery"
    ],
    "featured": false
  },
  {
    "id": "hard-por-06",
    "titleAr": "مقر إداري ومكاتب تجارية متطورة",
    "titleEn": "Corporate Headquarters & Commercial Offices",
    "category": "commercial",
    "status": "completed",
    "locationAr": "الدمام / الخبر، المنطقة الشرقية",
    "locationEn": "Dammam / Khobar, Eastern Province",
    "cityAr": "الدمام",
    "cityEn": "Dammam",
    "year": "2023",
    "buaM2": 4500,
    "durationMonths": 15,
    "valueSAR": "مشروع منجز",
    "clientAr": "شركات ومؤسسات تجارية",
    "clientEn": "Commercial Corporate Clients",
    "image": "/images/hardgp/por6-big.jpg",
    "galleryImages": [
      "/images/hardgp/por6-big.jpg",
      "/images/hardgp/por6-big.jpg"
    ],
    "descriptionAr": "مبنى إداري متطور مجهز بشبكات التحكم E&I والألياف الضوئية وأنظمة الإنذار والتشطيبات العصرية.",
    "descriptionEn": "State-of-the-art office infrastructure with integrated E&I networking, fire alarms, and modern aesthetic.",
    "scopeAr": [
      "الهيكل الإنشائي والمعماري",
      "شبكات الاتصالات والألياف الضوئية",
      "أنظمة السلامة ومكافحة الحريق"
    ],
    "scopeEn": [
      "Structural & architectural shell",
      "OFC structured cabling",
      "Fire safety and suppression"
    ],
    "structuralSystemAr": "خرسانة مسلحة مع قواطع خفيفة معزولة",
    "structuralSystemEn": "Reinforced Concrete Frame with Insulated Partitions",
    "finishingLevelAr": "تشطيب مكتبي تجاري فخم",
    "finishingLevelEn": "Premium Corporate Fit-Out",
    "highlightsAr": [
      "بيئة عمل متناغمة",
      "شبكات متطورة",
      "أنظمة تحكم ذكية"
    ],
    "highlightsEn": [
      "Harmonized Workspace",
      "Advanced Networking",
      "Smart Controls"
    ],
    "featured": false
  },
  {
    "id": "hard-por-07",
    "titleAr": "أعمال البنية التحتية وتجهيز المواقع",
    "titleEn": "Infrastructure & Site Development",
    "category": "industrial",
    "status": "completed",
    "locationAr": "المنطقة الشرقية، المملكة العربية السعودية",
    "locationEn": "Eastern Province, Saudi Arabia",
    "cityAr": "المنطقة الشرقية",
    "cityEn": "Eastern Province",
    "year": "2021",
    "buaM2": 15000,
    "durationMonths": 12,
    "valueSAR": "مشروع منجز",
    "clientAr": "قطاع تطوير الأراضي والمخططات",
    "clientEn": "Land Development Fund",
    "image": "/images/hardgp/por7-big.jpg",
    "galleryImages": [
      "/images/hardgp/por7-big.jpg",
      "/images/hardgp/por7-big.jpg"
    ],
    "descriptionAr": "أعمال الحفر، تسوية المناسيب بالليزر، تثبيت التربة، وتمديد شبكات الأنابيب والمرافق التحتية باستخدام أنابيب يورو HDPE الإيطالية.",
    "descriptionEn": "Excavation, grading, soil stabilization, and underground utility piping infrastructure utilizing Euro HDPE Italian piping systems.",
    "scopeAr": [
      "الحفر والردم وتسوية المناسيب",
      "تمديد خطوط الأنابيب HDPE",
      "شبكات تصريف مياه الأمطار والصرف"
    ],
    "scopeEn": [
      "Earthworks & laser grading",
      "Euro HDPE piping installation",
      "Stormwater & drainage networks"
    ],
    "structuralSystemAr": "بنية تحتية وشبكات مدفونة معتمدة",
    "structuralSystemEn": "Engineered Underground Utility Infrastructure",
    "finishingLevelAr": "بنية تحتية كاملة",
    "finishingLevelEn": "Full Infrastructure Handover",
    "highlightsAr": [
      "أنابيب يورو HDPE إيطالية",
      "تسوية دقيقة بالليزر",
      "مطابقة لمعايير SASO"
    ],
    "highlightsEn": [
      "Euro HDPE Italian Pipes",
      "Laser Precision Grading",
      "SASO Compliant"
    ],
    "featured": false
  },
  {
    "id": "hard-por-08",
    "titleAr": "إنشاء وتوسعة المنشآت والتشطيب المعماري",
    "titleEn": "Plant Construction & Architectural Finishing",
    "category": "industrial",
    "status": "completed",
    "locationAr": "المنطقة الشرقية، المملكة العربية السعودية",
    "locationEn": "Eastern Province, KSA",
    "cityAr": "المنطقة الشرقية",
    "cityEn": "Eastern Province",
    "year": "2022",
    "buaM2": 7800,
    "durationMonths": 16,
    "valueSAR": "مشروع منجز",
    "clientAr": "إدارة تشغيل وتطوير المنشآت",
    "clientEn": "Plant Operations & Engineering",
    "image": "/images/hardgp/por8-big.jpg",
    "galleryImages": [
      "/images/hardgp/por8-big.jpg",
      "/images/hardgp/por8-big.jpg"
    ],
    "descriptionAr": "تعديل وتوسعة المنشآت والتشطيب الصناعي والمعماري ذو المواصفات الصارمة تحت إشراف قسم ضمان الجودة.",
    "descriptionEn": "Plant modification, revamping, and high-specification industrial building finishing under strict QA/QC.",
    "scopeAr": [
      "توسعة وتحديث المرافق القائمة",
      "أعمال التشطيبات الصناعية العازلة",
      "فحص الجودة والسلامة المهنية"
    ],
    "scopeEn": [
      "Facility expansion & revamping",
      "Protective industrial finishes",
      "QA/QC and occupational safety audit"
    ],
    "structuralSystemAr": "خرسانة مسلحة وهياكل فولاذية مدمجة",
    "structuralSystemEn": "Composite Steel and Reinforced Concrete",
    "finishingLevelAr": "مواصفات صناعية ومعمارية متقدمة",
    "finishingLevelEn": "Heavy-Duty Architectural Finish",
    "highlightsAr": [
      "توسعة بدون توقف التشغيل",
      "معايير جودة صارمة",
      "تسليم تشغيلي كامل"
    ],
    "highlightsEn": [
      "Seamless Revamp",
      "Strict QA Protocols",
      "Fully Operational"
    ],
    "featured": false
  },
  {
    "id": "hard-por-09",
    "titleAr": "مشروع سكني متكامل تسليم على المفتاح",
    "titleEn": "Turnkey Residential Development Project",
    "category": "residential",
    "status": "completed",
    "locationAr": "الدمام، المنطقة الشرقية",
    "locationEn": "Dammam, Eastern Province",
    "cityAr": "الدمام",
    "cityEn": "Dammam",
    "year": "2023",
    "buaM2": 1850,
    "durationMonths": 14,
    "valueSAR": "مشروع منجز",
    "clientAr": "مستثمرون في الإسكان الخاص",
    "clientEn": "Private Housing Investors",
    "image": "/images/hardgp/por9-big.jpg",
    "galleryImages": [
      "/images/hardgp/por9-big.jpg",
      "/images/hardgp/por9-big.jpg"
    ],
    "descriptionAr": "تسليم كامل على المفتاح يشمل الهيكل الإنشائي، الكهروميكانيك، السباكة، والتشطيبات الفاخرة.",
    "descriptionEn": "Full turnkey delivery encompassing structural execution, electro-mechanical, plumbing, and luxury finish.",
    "scopeAr": [
      "أعمال البناء من الأساسات",
      "التمديدات الكهروميكانيكية والسباكة",
      "التشطيبات المعمارية والديكور الداخلي"
    ],
    "scopeEn": [
      "Turnkey building from foundation",
      "MEP and plumbing infrastructure",
      "Architectural fit-out and interior decor"
    ],
    "structuralSystemAr": "خرسانة مسلحة معزولة حرارياً بالكامل",
    "structuralSystemEn": "Thermally Insulated Reinforced Concrete",
    "finishingLevelAr": "سوبر ديلوكس فاخر",
    "finishingLevelEn": "Super Deluxe Turnkey",
    "highlightsAr": [
      "تسليم متكامل على المفتاح",
      "أنابيب حرارية بضمان 50 سنة",
      "أنظمة تكييف الزامل ودايكن"
    ],
    "highlightsEn": [
      "Turnkey Handover",
      "50-Year Pipe Warranty",
      "Zamil/Daikin HVAC"
    ],
    "featured": false
  }
];

export const hardConstructionDefaultLeads: ConstructionLeadItem[] = [
  {
    "id": "lead-01",
    "referenceNumber": "HARD-REQ-2026-984",
    "createdAt": "2026-08-20T14:30:00Z",
    "clientName": "م. خالد بن عبد العزيز السبيعي",
    "phoneNumber": "+966504432190",
    "email": "k.subaie@alrashidgroup.com",
    "city": "الرياض",
    "district": "حي حطين",
    "projectType": "villa",
    "finishingLevel": "super-luxury",
    "builtUpArea": 1650,
    "budgetRangeSAR": "10M - 15M SAR",
    "timeline": "14 - 18 شهراً",
    "notes": "نرغب في بناء قصر سكني مودرن مع قبو ومسبح خارجي ومصعد بانورامي، المخططات المعتمدة جاهزة.",
    "hasArchitecturalPlans": true,
    "fileName": "Hittin_Palace_Full_Arch_SBC_2026.dwg",
    "source": "quote_form",
    "estimatedValueSAR": 12800000,
    "status": "proposal_sent",
    "adminNotes": "تم تجهيز مسودة عرض السعر وإرسالها للمهندس الاستشاري المشرف، بانتظار الاجتماع القادم."
  },
  {
    "id": "lead-02",
    "referenceNumber": "HARD-REQ-2026-972",
    "createdAt": "2026-08-21T09:15:00Z",
    "clientName": "أ. فهد الشمري - شركة المدى للتطوير",
    "phoneNumber": "+966551239876",
    "email": "fahad@almada-dev.sa",
    "city": "الرياض",
    "district": "حي العليا",
    "projectType": "commercial-building",
    "finishingLevel": "commercial",
    "builtUpArea": 8400,
    "budgetRangeSAR": "30M - 45M SAR",
    "timeline": "20 - 24 شهراً",
    "notes": "مبنى مكتبي تجاري ٨ أدوار مع دورين مواقف، مطلوب دراسة هندسة قيمة وتسعير العظم وتسليم المفتاح.",
    "hasArchitecturalPlans": true,
    "fileName": "Olaya_Commercial_Plaza_BOQ_Draft.pdf",
    "source": "cost_estimator",
    "estimatedValueSAR": 38500000,
    "status": "new",
    "adminNotes": "تم التواصل وتحديد موعد زيارة ميدانية يوم الأحد القادم."
  },
  {
    "id": "lead-03",
    "referenceNumber": "HARD-REQ-2026-950",
    "createdAt": "2026-08-19T18:40:00Z",
    "clientName": "د. سلطان الغامدي",
    "phoneNumber": "+966567890123",
    "email": "sultan.ghamdi@med.edu.sa",
    "city": "الخبر",
    "district": "حي الكورنيش",
    "projectType": "duplex",
    "finishingLevel": "deluxe",
    "builtUpArea": 950,
    "budgetRangeSAR": "4M - 6M SAR",
    "timeline": "10 - 12 شهراً",
    "notes": "استفسار بخصوص مشروع دوبلكس راقٍ مماثل لمشروع هورايزون الملقا.",
    "hasArchitecturalPlans": false,
    "source": "project_inquiry",
    "inquiredProjectId": "hard-proj-03",
    "estimatedValueSAR": 4900000,
    "status": "contacted",
    "adminNotes": "تم التواصل هاتفياً وتقديم شرح متكامل عن آلية العمل والضمانات."
  }
];

export const hardConstructionDictionary = {
  "ar": {
    "brand": {
      "name": "هارد للمقاولات العامة والإنشاءات",
      "groupName": "مجموعة هارد",
      "shortName": "هارد للمقاولات",
      "tagline": "ريادة الهندسة الإنشائية وتسليم المفتاح في المملكة",
      "slogan": "نبني معالم الحاضر والمستقبل برؤية هندسية راسخة"
    },
    "credentials": {
      "classA": "تصنيف فئة أولى معتمد",
      "sbc": "مطابق لكود البناء السعودي SBC",
      "warranty": "ضمان إنشائي ١٠ سنوات",
      "sce": "اعتماد هيئة المهندسين #44091",
      "cr": "سجل تجاري: 1010894231"
    },
    "nav": {
      "home": "الرئيسية",
      "about": "من نحن",
      "projects": "المشاريع",
      "services": "خدماتنا",
      "calculator": "حاسبة التكاليف",
      "contact": "اتصل بنا",
      "cms": "إدارة المحتوى (CMS)",
      "groupPortal": "بوابة مجموعة هارد",
      "requestQuote": "طلب عرض سعر فوري",
      "callUs": "اتصال مباشر"
    },
    "hero": {
      "badge": "شركة وطنية مصنفة • مقاولات عامة وهندسة إنشائية",
      "title": "نبني معالم المستقبل بكفاءة هندسية لا تضاهى",
      "subtitle": "الذراع الهندسي والإنشائي لمجموعة هارد، متخصصون في تنفيذ الأبراج التجارية، القصور السكنية الفاخرة، والمشاريع الكبرى بنظام تسليم المفتاح وفق أعلى معايير كود البناء السعودي.",
      "ctaEstimate": "حاسبة تكاليف البناء التقديرية",
      "ctaQuote": "طلب استشارة ودراسة جدوى",
      "stats": {
        "projectsCount": "+١٥٠",
        "projectsLabel": "مشروع منجز بنجاح",
        "satisfactionCount": "٩٨٪",
        "satisfactionLabel": "نسبة رضا العملاء",
        "yearsCount": "+١٥",
        "yearsLabel": "عاماً من الخبرة الهندسية",
        "valueCount": "+٤٥٠ م",
        "valueLabel": "ريال قيمة المشاريع المنفذة"
      }
    },
    "about": {
      "badge": "الريادة والمصداقية الإنشائية",
      "title": "١٥ عاماً من الابتكار الهندسي والالتزام الصارم بالجودة",
      "description": "تأسست هارد للمقاولات كذراع إنشائي رائد في المملكة العربية السعودية، مساهمة بفاعلية في النهضة العمرانية لتحقيق مستهدفات رؤية السعودية ٢٠٣٠. نعتمد على كادر هندسي متخصص وأحدث تقنيات البناء الحديث (Modern Construction Methods).",
      "tabs": {
        "quality": "إدارة الجودة والرقابة الفنية",
        "safety": "السلامة والصحة المهنية (OSHA)",
        "management": "إدارة المشاريع المتكاملة (EPC)"
      },
      "qualityDesc": "نطبق بروتوكولات ضبط الجودة الصارمة في كل مرحلة، من الفحوصات المخبرية الدورية للخرسانات والحديد، وحتى تدقيق مطابقة المواد لكود البناء السعودي دون أي تهاون.",
      "safetyDesc": "السلامة أولاً وقبل كل شيء. نلتزم بأعلى معايير إدارة السلامة والصحة المهنية ومعدات الحماية الشخصية لضمان بيئة عمل آمنة وصفر حوادث في مواقعنا.",
      "managementDesc": "إدارة دورة حياة المشروع بنظام الهندسة والتوريد والإنشاء (EPC)، مع توظيف نماذج نمذجة معلومات البناء BIM 4D لمتابعة الجداول الزمنية والتحكم في التكاليف.",
      "timelineTitle": "مراحل تنفيذ المشروع بنظام هارد المتكامل",
      "steps": [
        {
          "num": "٠١",
          "title": "دراسة المخططات والهندسة القيمة",
          "desc": "مراجعة المخططات الإنشائية والمعمارية وكشف التعارضات لتحقيق أقصى وفورات مالية."
        },
        {
          "num": "٠٢",
          "title": "الأعمال الإنشائية والأساسات",
          "desc": "تنفيذ أعمال الحفر، الخوازيق، والخرسانات المسلحة وفق تقارير فحص التربة المعتمدة."
        },
        {
          "num": "٠٣",
          "title": "الأنظمة الكهروميكانيكية (MEP)",
          "desc": "تمديد شبكات التكييف المركزي، الكهرباء الذكية، ومكافحة الحريق بأعلى تصنيف."
        },
        {
          "num": "٠٤",
          "title": "التشطيبات الفاخرة وتسليم المفتاح",
          "desc": "تركيب الرخام والواجهات والتشطيبات النهائية مع تسليم شهادات الضمان الرسمية."
        }
      ]
    },
    "projects": {
      "badge": "سجل إنجازاتنا",
      "title": "مشاريع مميزة نعتز بتنفيذها في أرجاء المملكة",
      "subtitle": "استكشف نماذج من الأبراج التجارية، القصور السكنية، والمجمعات الاستثمارية المنجزة بأيدي مهندسينا.",
      "filterAll": "جميع المشاريع",
      "filterResidential": "القصور والفلل السكنية",
      "filterCommercial": "الأبراج والمباني التجارية",
      "filterIndustrial": "المشاريع الصناعية واللوجستية",
      "filterFinishing": "التشطيبات الفندقية الفاخرة",
      "statusCompleted": "مكتمل بنجاح",
      "statusInProgress": "قيد التنفيذ",
      "statusDelivered": "تم التسليم للمالك",
      "viewSpecs": "التفاصيل والمواصفات الهندسية",
      "inquireSimilar": "طلب مشروع مماثل",
      "buaLabel": "مسطح البناء:",
      "durationLabel": "مدة التنفيذ:",
      "valueLabel": "قيمة العقد:"
    },
    "services": {
      "badge": "حلولنا الهندسية",
      "title": "خدمات مقاولات شاملة بمعايير عالمية",
      "subtitle": "نوفر باقة متكاملة من الخدمات الإنشائية التي تلبي طموحات المطورين والمستثمرين وأصحاب المشاريع الخاصة.",
      "orderService": "طلب الخدمة الآن",
      "deliverablesTitle": "أبرز المخرجات والضمانات:",
      "warrantyLabel": "سنوات ضمان"
    },
    "calculator": {
      "badge": "تقدير رقمي فوري",
      "title": "حاسبة تكاليف البناء الذكية في السعودية",
      "subtitle": "احسب التكلفة التقديرية لمشروعك خلال دقائق بناءً على أسعار السوق المحلي واشتراطات كود البناء السعودي.",
      "step1": "١. نوع المشروع والنشاط",
      "step2": "٢. مستوى ونوع التشطيب",
      "step3": "٣. المساحة والإضافات الإنشائية",
      "types": {
        "villa": "فيلا سكنية فاخرة",
        "commercial": "مبنى / برج تجاري",
        "duplex": "دوبلكس سكني",
        "compound": "مجمع سكني مغلق",
        "warehouse": "مستودع / منشأة صناعية"
      },
      "finishing": {
        "skeleton": "بناء عظم فقط (هيكل إنشائي)",
        "commercial": "تسليم مفتاح تجاري (Standard)",
        "deluxe": "تسليم مفتاح ديلوكس راقٍ",
        "superLuxury": "سوبر VIP فاخر (أعلى المواصفات)"
      },
      "buaLabel": "مسطح البناء الإجمالي (BUA):",
      "floorsLabel": "عدد الأدوار:",
      "addons": {
        "basement": "إضافة قبو (Basement) مع عزل مائي متكامل",
        "pool": "مسبح خرساني مع فلاتر وإضاءة",
        "elevator": "تأسيس وتركيب مصعد إيطالي حديث",
        "smartHome": "تجهيز وتأسيس المنزل الذكي المتكامل KNX"
      },
      "resultsTitle": "التقدير المالي والزمني لمشروعك:",
      "estimatedRange": "النطاق المالي التقديري (شامل المواد والعمالة):",
      "estimatedDuration": "المدة الزمنية المتوقعة للتنفيذ:",
      "months": "أشهر",
      "breakdown": {
        "structural": "الهيكل الخرساني والإنشائي:",
        "finishing": "أعمال التشطيبات المعمارية:",
        "mep": "الأعمال الكهروميكانيكية والتكييف:",
        "addons": "الإضافات الخاصة والمرافق:",
        "averageM2": "متوسط سعر المتر المربع:"
      },
      "exportBtn": "اعتماد التقدير وطلب عرض سعر رسمي فوري",
      "disclaimer": "* هذا التقدير تقريبي للاسترشاد، يعتمد السعر النهائي على دراسة المخططات وجداول الكميات المعتمدة (BOQ)."
    },
    "quoteModal": {
      "title": "طلب عرض سعر ودراسة هندسية متكاملة",
      "subtitle": "أدخل بيانات مشروعك وسيقوم فريق العطاءات وكبار المهندسين بدراسة طلبك وتقديم عرض أسعار مفصل خلال ٢٤ ساعة.",
      "fullName": "الاسم الكريم / اسم المنشأة *",
      "phone": "رقم الجوال (سعودي) *",
      "email": "البريد الإلكتروني الرسمي *",
      "cityDistrict": "المدينة والحي *",
      "projectType": "نوع المشروع *",
      "builtUpArea": "مساحة البناء التقديرية (م²)",
      "budgetRange": "الميزانية التقريبية المتوقعة",
      "timeline": "الجدول الزمني المفضل للبدء",
      "plansUpload": "إرفاق المخططات المعمارية أو ملفات CAD (اختياري)",
      "dropPlans": "اسحب وأفلت المخططات هنا، أو انقر للاستعراض (PDF, DWG, ZIP)",
      "notes": "ملاحظات وتفاصيل إضافية عن المشروع",
      "submitBtn": "إرسال طلب التسعير الرسمي",
      "submitting": "جاري تسجيل الطلب...",
      "successTitle": "تم استلام طلب التسعير بنجاح!",
      "refNum": "رقم المرجع للطلب:",
      "successDesc": "تم إدراج طلبك في نظام إدارة العطاءات. سيقوم رئيس قسم المشاريع بالتواصل معك مباشرة لمناقشة التفاصيل الهندسية.",
      "whatsappConfirm": "تأكيد الطلب عبر واتساب مباشرة",
      "close": "إغلاق"
    },
    "contact": {
      "badge": "تواصل مباشر",
      "title": "مستعدون لبدء مشروعك الإنشائي القادم",
      "subtitle": "تفضل بزيارة مقراتنا أو تواصل مع كبار مهندسينا لترتيب جلسة استشارية فنية شاملة.",
      "headquarters": "المقر الرئيسي - الرياض",
      "branch": "فرع المنطقة الشرقية - الخبر",
      "phoneTitle": "الهاتف الموحد:",
      "mobileTitle": "الجوال وخدمة العملاء:",
      "whatsappTitle": "محادثة واتساب الفورية:",
      "emailTitle": "البريد الإلكتروني الرسمي:",
      "crTitle": "السجل التجاري والترخيص:",
      "openingHours": "أوقات العمل: السبت - الخميس (٨:٠٠ ص - ٦:٠٠ م)"
    },
    "cms": {
      "title": "لوحة التحكم الإدارية وإدارة العطاءات والمشاريع",
      "subtitle": "نظام داخلي معتمد لفريق إدارة المشاريع وتتبع طلبات عروض الأسعار.",
      "auth": {
        "title": "تسجيل الدخول الإداري",
        "prompt": "يرجى إدخال رمز الحماية (PIN) للوصول للوحة التحكم:",
        "hint": "رمز الحماية الافتراضي: 2026",
        "unlockBtn": "دخول اللوحة",
        "instantAccess": "دخول سريع للمصرح لهم",
        "invalidPin": "رمز الحماية غير صحيح، يرجى المحاولة مجدداً."
      },
      "tabs": {
        "leads": "وارد طلبات الأسعار والعطاءات",
        "projects": "إدارة المشاريع الحية (CRUD)",
        "analytics": "المؤشرات والتحليلات"
      },
      "leadsTable": {
        "ref": "رقم المرجع",
        "client": "العميل",
        "type": "النوع",
        "area": "المساحة",
        "city": "المدينة",
        "estValue": "القيمة التقديرية",
        "status": "الحالة",
        "actions": "الإجراءات",
        "exportCsv": "تصدير البيانات (CSV)",
        "filterStatus": "تصفية حسب الحالة:",
        "all": "جميع الحالات",
        "new": "جديد",
        "contacted": "تم التواصل",
        "proposalSent": "تم إرسال العرض",
        "won": "تم التعاقد",
        "closed": "مغلق"
      },
      "projectForm": {
        "addNew": "إضافة مشروع جديد للمحفظة",
        "edit": "تعديل بيانات المشروع",
        "titleAr": "اسم المشروع (بالعربية) *",
        "titleEn": "اسم المشروع (بالإنجليزية) *",
        "category": "التصنيف *",
        "status": "الحالة *",
        "locationAr": "الموقع (بالعربية)",
        "locationEn": "الموقع (بالإنجليزية)",
        "bua": "مسطح البناء (م²)",
        "value": "قيمة المشروع (ر.س)",
        "year": "سنة التنفيذ",
        "duration": "المدة (أشهر)",
        "image": "رابط الصورة الرئيسية",
        "saveBtn": "حفظ المشروع",
        "cancelBtn": "إلغاء",
        "resetDefaults": "استعادة المشاريع الافتراضية"
      },
      "analytics": {
        "totalPipeline": "إجمالي قيمة خطط العطاءات",
        "totalLeads": "عدد طلبات التسعير",
        "activeProjects": "المشاريع الجارية والمنجزة",
        "topType": "النوع الأكثر طلباً"
      },
      "exitCms": "العودة للموقع الرئيسي"
    }
  },
  "en": {
    "brand": {
      "name": "HARD Contracting & General Construction Co.",
      "groupName": "HARD Group",
      "shortName": "HARD Contracting",
      "tagline": "Leading Structural Engineering & Turnkey Contracting in KSA",
      "slogan": "Building Enduring Landmarks with Precision Engineering"
    },
    "credentials": {
      "classA": "Class-A Certified General Contractor",
      "sbc": "100% Saudi Building Code (SBC) Compliant",
      "warranty": "10-Year Certified Structural Warranty",
      "sce": "Saudi Council of Engineers Accredited #44091",
      "cr": "CR: 1010894231"
    },
    "nav": {
      "home": "Home",
      "about": "About Us",
      "projects": "Projects",
      "services": "Services",
      "calculator": "Cost Estimator",
      "contact": "Contact",
      "cms": "CMS Portal",
      "groupPortal": "HARD Group Portal",
      "requestQuote": "Instant Quote Request",
      "callUs": "Direct Call"
    },
    "hero": {
      "badge": "Class-A Certified General Contractor • Saudi Arabia",
      "title": "Building Enduring Landmarks with Precision Engineering",
      "subtitle": "The premier engineering and construction arm of HARD Group, delivering signature commercial towers, luxury residential palaces, and turnkey developments strictly compliant with the Saudi Building Code (SBC).",
      "ctaEstimate": "Interactive Cost Estimator",
      "ctaQuote": "Request Engineering Consultation",
      "stats": {
        "projectsCount": "150+",
        "projectsLabel": "Delivered Projects",
        "satisfactionCount": "98%",
        "satisfactionLabel": "Client Satisfaction",
        "yearsCount": "15+",
        "yearsLabel": "Years of Excellence",
        "valueCount": "450M+",
        "valueLabel": "SAR Project Value Delivered"
      }
    },
    "about": {
      "badge": "Engineering Excellence",
      "title": "15 Years of Structural Innovation & Rigorous Quality Assurance",
      "description": "HARD Contracting Co. is a leading Saudi general contractor actively contributing to the kingdom’s urban transformation under Saudi Vision 2030. We integrate specialized engineering talents with state-of-the-art modern construction methods (MMC).",
      "tabs": {
        "quality": "Quality Assurance & Technical Audit",
        "safety": "OSHA Occupational Health & Safety",
        "management": "Turnkey EPC Project Governance"
      },
      "qualityDesc": "We enforce strict QA/QC protocols across every project milestone, from certified laboratory concrete batch testing to non-destructive steel testing and 100% SBC compliance verification.",
      "safetyDesc": "Safety is our utmost operational priority. We strictly enforce international OSHA health & safety standards, resulting in our industry-leading zero-accident safety record.",
      "managementDesc": "Comprehensive Engineering, Procurement, and Construction (EPC) lifecycle management driven by 4D BIM digital modeling for automated clash detection and milestone cost control.",
      "timelineTitle": "Our Integrated Project Execution Process",
      "steps": [
        {
          "num": "01",
          "title": "BOQ Audit & Value Engineering",
          "desc": "In-depth architectural review and clash detection generating substantial capital savings."
        },
        {
          "num": "02",
          "title": "Substructure & Deep Piling",
          "desc": "High-precision excavation, piling shoring, and certified reinforced concrete casting."
        },
        {
          "num": "03",
          "title": "Integrated MEP & Modern HVAC",
          "desc": "Central VRF installation, smart building automation, and certified fire protection."
        },
        {
          "num": "04",
          "title": "Luxury Fit-Out & Turnkey Handover",
          "desc": "Italian marble fabrication, architectural facades, and official 10-year warranty delivery."
        }
      ]
    },
    "projects": {
      "badge": "Proven Track Record",
      "title": "Signature Landmarks Delivered Across Saudi Arabia",
      "subtitle": "Explore our portfolio of commercial office towers, luxury private palaces, and industrial logistics facilities.",
      "filterAll": "All Projects",
      "filterResidential": "Residential & Luxury Villas",
      "filterCommercial": "Commercial Towers & Plazas",
      "filterIndustrial": "Industrial & Logistics",
      "filterFinishing": "Ultra-Luxury Fit-Out",
      "statusCompleted": "Completed",
      "statusInProgress": "Under Execution",
      "statusDelivered": "Handed Over",
      "viewSpecs": "View Technical Specifications",
      "inquireSimilar": "Inquire About Similar Project",
      "buaLabel": "Built-Up Area:",
      "durationLabel": "Duration:",
      "valueLabel": "Contract Value:"
    },
    "services": {
      "badge": "Comprehensive Capabilities",
      "title": "Turnkey Contracting & Engineering Services",
      "subtitle": "From foundation engineering to master luxury turnkey completion, we provide end-to-end contracting excellence.",
      "orderService": "Order Service",
      "deliverablesTitle": "Key Deliverables & Guarantees:",
      "warrantyLabel": "Years Warranty"
    },
    "calculator": {
      "badge": "Instant Estimator",
      "title": "Smart Saudi Construction Cost Estimator",
      "subtitle": "Calculate your projected construction investment in real-time based on actual Saudi market data and SBC standards.",
      "step1": "1. Project Type & Classification",
      "step2": "2. Specification & Finishing Level",
      "step3": "3. Area, Floors & Structural Addons",
      "types": {
        "villa": "Luxury Residential Villa / Palace",
        "commercial": "Commercial Office Tower / Plaza",
        "duplex": "Luxury Residential Duplex",
        "compound": "Gated Residential Compound",
        "warehouse": "Industrial Warehouse / Facility"
      },
      "finishing": {
        "skeleton": "Skeleton / Core & Shell Only",
        "commercial": "Commercial Standard Turnkey",
        "deluxe": "Deluxe Turnkey Specification",
        "superLuxury": "Super VIP Luxury Specification"
      },
      "buaLabel": "Total Built-Up Area (BUA):",
      "floorsLabel": "Number of Floors:",
      "addons": {
        "basement": "Include Subterranean Basement with Dual Waterproofing",
        "pool": "Reinforced Concrete Swimming Pool with Filtration",
        "elevator": "Supply & Install Panoramic Italian Hydraulic Elevator",
        "smartHome": "Whole-Facility KNX Smart Automation Infrastructure"
      },
      "resultsTitle": "Your Projected Cost & Timeline Estimate:",
      "estimatedRange": "Estimated Budget Range (Materials + Structural Labor):",
      "estimatedDuration": "Anticipated Construction Timeline:",
      "months": "Months",
      "breakdown": {
        "structural": "Structural Concrete & Steel Framing:",
        "finishing": "Architectural & Interior Fit-Out:",
        "mep": "MEP & Central HVAC Systems:",
        "addons": "Specialized Addons & Amenities:",
        "averageM2": "Average Cost per m² (BUA):"
      },
      "exportBtn": "Request Formal Proposal with this Estimate",
      "disclaimer": "* This interactive estimate serves as a baseline calculation. Final contract pricing is determined upon detailed BOQ and architectural drawings review."
    },
    "quoteModal": {
      "title": "Request Engineering Consultation & Formal Proposal",
      "subtitle": "Submit your project requirements and our senior estimation team will review your drawings and deliver an itemized BOQ within 24 hours.",
      "fullName": "Full Name / Company Name *",
      "phone": "Saudi Mobile Number *",
      "email": "Official Email *",
      "cityDistrict": "City & District *",
      "projectType": "Project Classification *",
      "builtUpArea": "Estimated Built-Up Area (m²)",
      "budgetRange": "Projected Budget Range",
      "timeline": "Target Start Date / Timeline",
      "plansUpload": "Attach Architectural Drawings / CAD (Optional)",
      "dropPlans": "Drag & drop drawings here, or browse files (PDF, DWG, ZIP)",
      "notes": "Project Scope & Specific Requirements",
      "submitBtn": "Submit Formal Tender Request",
      "submitting": "Registering Request...",
      "successTitle": "Tender Request Registered Successfully!",
      "refNum": "Reference Tracking Number:",
      "successDesc": "Your request has been dispatched to our engineering tendering desk. A senior project director will contact you promptly.",
      "whatsappConfirm": "Confirm Request via WhatsApp Instantly",
      "close": "Close"
    },
    "contact": {
      "badge": "Get in Touch",
      "title": "Ready to Build Your Next Architectural Landmark?",
      "subtitle": "Visit our regional headquarters or connect directly with our engineering leadership to schedule a technical consultation.",
      "headquarters": "Riyadh Headquarters",
      "branch": "Eastern Province Branch - Al Khobar",
      "phoneTitle": "Unified Phone:",
      "mobileTitle": "Customer Care & Sales:",
      "whatsappTitle": "Direct WhatsApp Line:",
      "emailTitle": "Official Inquiries Email:",
      "crTitle": "Commercial Registration & License:",
      "openingHours": "Working Hours: Sat - Thu (8:00 AM - 6:00 PM)"
    },
    "cms": {
      "title": "Administrative Project Portfolio & Lead Management CMS",
      "subtitle": "Secure internal system for HARD Contracting senior leadership and sales engineers.",
      "auth": {
        "title": "Administrative Security Guard",
        "prompt": "Enter your authorization security PIN to access the CMS:",
        "hint": "Default Security PIN: 2026",
        "unlockBtn": "Unlock Dashboard",
        "instantAccess": "Quick Admin Unlock",
        "invalidPin": "Incorrect PIN. Please try again."
      },
      "tabs": {
        "leads": "Tender Leads & Quotations Inbox",
        "projects": "Live Project Portfolio (CRUD)",
        "analytics": "Analytics & Pipeline Insights"
      },
      "leadsTable": {
        "ref": "Reference #",
        "client": "Client",
        "type": "Type",
        "area": "Area",
        "city": "City",
        "estValue": "Est. Value",
        "status": "Status",
        "actions": "Actions",
        "exportCsv": "Export Leads (CSV)",
        "filterStatus": "Filter Status:",
        "all": "All Statuses",
        "new": "New Lead",
        "contacted": "Contacted",
        "proposalSent": "Proposal Sent",
        "won": "Contract Won",
        "closed": "Closed"
      },
      "projectForm": {
        "addNew": "Add New Project to Portfolio",
        "edit": "Edit Project Details",
        "titleAr": "Project Title (Arabic) *",
        "titleEn": "Project Title (English) *",
        "category": "Category *",
        "status": "Status *",
        "locationAr": "Location (Arabic)",
        "locationEn": "Location (English)",
        "bua": "Built-Up Area (m²)",
        "value": "Contract Value (SAR)",
        "year": "Execution Year",
        "duration": "Duration (Months)",
        "image": "Main Image URL",
        "saveBtn": "Save Project",
        "cancelBtn": "Cancel",
        "resetDefaults": "Reset to Seed Projects"
      },
      "analytics": {
        "totalPipeline": "Total Pipeline Value",
        "totalLeads": "Total Quotation Leads",
        "activeProjects": "Active & Delivered Projects",
        "topType": "Most Requested Sector"
      },
      "exitCms": "Return to Live Website"
    }
  }
};

export function calculateConstructionCost(params: CostCalculatorParams): CostEstimateResult {
  const {
    projectType,
    finishingLevel,
    builtUpArea,
    floors,
    hasBasement,
    hasPool,
    hasElevator,
    hasSmartHome,
  } = params;

  let baseStructuralPerM2 = 620;
  let finishingPerM2 = 0;
  let mepPerM2 = 280;

  switch (finishingLevel) {
    case "skeleton":
      finishingPerM2 = 0;
      mepPerM2 = 120;
      break;
    case "commercial":
      finishingPerM2 = 550;
      mepPerM2 = 320;
      break;
    case "deluxe":
      finishingPerM2 = 980;
      mepPerM2 = 420;
      break;
    case "super-luxury":
      finishingPerM2 = 1650;
      mepPerM2 = 580;
      break;
  }

  switch (projectType) {
    case "commercial-building":
      baseStructuralPerM2 *= 1.35;
      break;
    case "warehouse":
      baseStructuralPerM2 = 480;
      mepPerM2 = 180;
      finishingPerM2 = Math.min(finishingPerM2, 350);
      break;
    case "residential-compound":
      baseStructuralPerM2 *= 1.08;
      break;
  }

  let structuralCost = baseStructuralPerM2 * builtUpArea;
  const finishingCost = finishingPerM2 * builtUpArea;
  const mepCost = mepPerM2 * builtUpArea;
  let addonsCost = 0;

  if (hasBasement) {
    const footprintArea = Math.min(builtUpArea / Math.max(floors, 1), 600);
    addonsCost += footprintArea * 1400;
  }

  if (hasPool) {
    addonsCost += 110000;
  }

  if (hasElevator) {
    const floorCount = Math.max(floors, 2);
    addonsCost += 75000 + (floorCount - 2) * 9000;
  }

  if (hasSmartHome && finishingLevel !== "skeleton") {
    addonsCost += Math.min(builtUpArea * 120, 180000);
  }

  if (floors > 3) {
    const multiFloorFactor = 1 + (floors - 3) * 0.04;
    structuralCost *= multiFloorFactor;
  }

  const rawTotal = structuralCost + finishingCost + mepCost + addonsCost;
  const minTotalSAR = Math.round((rawTotal * 0.94) / 1000) * 1000;
  const maxTotalSAR = Math.round((rawTotal * 1.07) / 1000) * 1000;
  const avgTotalSAR = Math.round(rawTotal / 1000) * 1000;
  const pricePerM2SAR = Math.round(avgTotalSAR / Math.max(builtUpArea, 1));

  let estimatedDurationMonths = 10;
  if (builtUpArea < 600) {
    estimatedDurationMonths = finishingLevel === "skeleton" ? 5 : 12;
  } else if (builtUpArea < 1500) {
    estimatedDurationMonths = finishingLevel === "skeleton" ? 8 : 16;
  } else if (builtUpArea < 4000) {
    estimatedDurationMonths = finishingLevel === "skeleton" ? 12 : 22;
  } else {
    estimatedDurationMonths = finishingLevel === "skeleton" ? 16 : 28;
  }

  if (hasBasement) {
    estimatedDurationMonths += 3;
  }

  return {
    minTotalSAR,
    maxTotalSAR,
    avgTotalSAR,
    structuralCostSAR: Math.round(structuralCost),
    finishingCostSAR: Math.round(finishingCost),
    mepCostSAR: Math.round(mepCost),
    addonsCostSAR: Math.round(addonsCost),
    pricePerM2SAR,
    estimatedDurationMonths,
  };
}

export function formatPriceSAR(amount: number, isArabic = true): string {
  const formatted = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount);
  return isArabic ? `${formatted} ر.س` : `${formatted} SAR`;
}
