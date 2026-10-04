import { referenceProperties, ReferenceProperty } from './reference-data';

export interface RealEstateListingItem {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  city: 'riyadh' | 'khobar' | 'dammam' | 'eastern';
  cityNameAr: string;
  cityNameEn: string;
  districtAr: string;
  districtEn: string;
  type: 'commercial' | 'villa' | 'penthouse' | 'compound' | 'apartment';
  typeNameAr: string;
  typeNameEn: string;
  status: 'exclusive' | 'sale' | 'rent' | 'portfolio';
  statusNameAr: string;
  statusNameEn: string;
  price: string;
  priceRaw: number;
  priceCurrency: string;
  period?: string;
  area: string;
  areaRaw: number;
  beds: string;
  baths: string;
  parking: string;
  image: string;
  gallery: string[];
  badgeAr: string;
  badgeEn: string;
  descriptionAr: string;
  descriptionEn: string;
  longOverviewAr: string[];
  longOverviewEn: string[];
  featuresAr: string[];
  featuresEn: string[];
  specs: {
    labelAr: string;
    labelEn: string;
    valueAr: string;
    valueEn: string;
  }[];
  falLicense: string;
  titleDeedNumber: string;
  advertisementNumber: string;
  coords: {
    lat: number;
    lng: number;
  };
  relatedSlugs: string[];
  rawRef?: ReferenceProperty;
}

export const realEstateListings: RealEstateListingItem[] = [
  {
    id: 'prop-1',
    slug: 'hard-al-rayyan-residential-villa-dammam',
    titleAr: 'فيلا هارد الفاخرة بحي الريان — الدمام',
    titleEn: 'HARD Al-Rayyan Luxury Modern Villa Development',
    city: 'dammam',
    cityNameAr: 'المنطقة الشرقية – الدمام',
    cityNameEn: 'Eastern Province – Dammam',
    districtAr: 'حي الريان - شارع 18',
    districtEn: 'Al-Rayyan District - 18th St',
    type: 'villa',
    typeNameAr: 'فيلا سكنية عصرية',
    typeNameEn: 'Contemporary Luxury Villa',
    status: 'sale',
    statusNameAr: 'متاح للتملك والاستثمار',
    statusNameEn: 'Available for Acquisition',
    price: '2,850,000 ر.س',
    priceRaw: 2850000,
    priceCurrency: 'SAR',
    area: '500 م² (5,380 قدم²)',
    areaRaw: 500,
    beds: '5 أجنحة نوم',
    baths: '6 دورات مياه',
    parking: 'كراج خاص يتسع لسيارتين',
    image: '/images/hardgp/por4-big.jpg',
    gallery: [
      '/images/hardgp/por4-big.jpg',
      '/images/hardgp/por9-big.jpg',
      '/images/hardgp/por10-big.jpg',
      '/images/hardgp/por11-big.jpg'
    ],
    badgeAr: 'تطوير مؤسسة هارد للمقاولات العامة',
    badgeEn: 'HARD Group Real Estate Development',
    descriptionAr:
      'فيلا سكنية عصرية بتصميم معماري مبتكر من تطوير مؤسسة هارد بحي الريان بالدمام. تم تشييدها باستخدام أنابيب العامرية الحرارية الألمانية بضمان 50 سنة، وتجهيزات تكييف مركزية معتمدة، وتشطيب كامل على المفتاح.',
    descriptionEn:
      'Modern residential villa architecture developed by HARD Establishment in Al-Rayyan district, Dammam. Built with German-engineered Al-Ameria thermal piping (50-year warranty), pioneer HVAC installations, and turnkey structural engineering.',
    longOverviewAr: [
      'تجسد هذه الفيلا المعمارية بحي الريان بالدمام رؤية مؤسسة هارد في تقديم حلول سكنية متطورة تلبي تطلعات الأسر السعودية والشباب بتصميم يجمع بين الأصالة والحداثة.',
      'تشتمل على تمديدات أنابيب العامرية الحرارية الألمانية الصنع في تركيا ذات الضمان لمدة 50 سنة، مع أنظمة تكييف مركزية متعاقد عليها مع كبرى الشركات (الزامل، دايكن، LG، ترين).',
      'تتوفر تسهيلات تمويلية عبر اتفاقيات هارد الاستراتيجية مع بنوك الجزيرة، الرياض، وسامبا بهوامش ربح منخفضة للموظفين والمستثمرين.'
    ],
    longOverviewEn: [
      'This architectural villa in Al-Rayyan, Dammam embodies HARD Establishment vision of delivering modern, accessible housing solutions combining cultural elegance and contemporary lifestyle.',
      'Fitted with German-engineered Al-Ameria thermal polypropylene piping carrying an unprecedented 50-year warranty, alongside certified central HVAC systems.',
      'Eligible for preferential bank funding through HARD corporate partnership programs with AlJazira Bank, Riyad Bank, and Samba Bank.'
    ],
    featuresAr: [
      'شبكة أنابيب العامرية الحرارية بضمان 50 سنة',
      'تكييف مركزي بشراكة مع رواد التكييف (ضمان 5 سنوات)',
      'تسهيلات تمويلية بنكية عبر الجزيرة والرياض وسامبا',
      'كراج خاص مغطى يتسع لسيارتين',
      'أجنحة خاصة للضيافة وغرف للسائق والخدمات',
      'إشراف هندسي ميداني وفحص كامل للجودة والسلامة'
    ],
    featuresEn: [
      'Al-Ameria Thermal Polypropylene Piping (50-Yr Warranty)',
      'Pioneer Central HVAC Integration (5-Yr Vendor Warranty)',
      'Bank Funding Options via AlJazira, Riyad & Samba',
      'Covered Private 2-Vehicle Garage',
      'Dedicated Guest Majlis & Maid / Service Suites',
      'Certified Quality Assurance & SBC Structural Inspection'
    ],
    specs: [
      { labelAr: 'المدينة والحي', labelEn: 'Location', valueAr: 'حي الريان، الدمام', valueEn: 'Al-Rayyan, Dammam' },
      { labelAr: 'المطور والمنفذ', labelEn: 'Developer', valueAr: 'مؤسسة هارد للمقاولات العامة', valueEn: 'HARD General Contracting' },
      { labelAr: 'مساحة الأرض والبناء', labelEn: 'Built Area', valueAr: '500 م²', valueEn: '500 m²' },
      { labelAr: 'شبكات السباكة', labelEn: 'Piping', valueAr: 'أنابيب العامرية ضمان 50 سنة', valueEn: 'Al-Ameria 50-Yr Warranty' },
      { labelAr: 'التكييف المركزي', labelEn: 'HVAC', valueAr: 'ضمان 5 سنوات وعقد صيانة', valueEn: 'Pioneer 5-Yr Warranty' },
      { labelAr: 'التمويل البنكي', labelEn: 'Financing', valueAr: 'الجزيرة / الرياض / سامبا', valueEn: 'AlJazira / Riyad / Samba' }
    ],
    falLicense: '1200028472',
    titleDeedNumber: '310992384711',
    advertisementNumber: '7200192851',
    coords: { lat: 26.4207, lng: 50.0888 },
    relatedSlugs: ['hard-corporate-commercial-headquarters-tower', 'hard-residential-duplex-community', 'hard-commercial-retail-center'],
    rawRef: referenceProperties[0]
  },
  {
    id: 'prop-2',
    slug: 'hard-corporate-commercial-headquarters-tower',
    titleAr: 'مقر إداري ومكاتب تجارية متطورة من هارد',
    titleEn: 'HARD Commercial Corporate Headquarters & Executive Offices',
    city: 'dammam',
    cityNameAr: 'المنطقة الشرقية – الدمام / الخُبر',
    cityNameEn: 'Eastern Province – Dammam / Khobar',
    districtAr: 'محور الأعمال والاستثمار التجاري',
    districtEn: 'Commercial Business Corridor',
    type: 'commercial',
    typeNameAr: 'مبنى ومقر إداري تجاري',
    typeNameEn: 'Corporate Commercial Tower',
    status: 'sale',
    statusNameAr: 'متاح للاستثمار والتملك',
    statusNameEn: 'Prime Corporate Investment',
    price: '14,500,000 ر.س',
    priceRaw: 14500000,
    priceCurrency: 'SAR',
    area: '1,720 م² (18,500 قدم²)',
    areaRaw: 1720,
    beds: 'قاعات تنفيذية ومكاتب',
    baths: '12 دورة مياه',
    parking: '35 موقف سيارات بالقبو والمحيط',
    image: '/images/hardgp/por6-big.jpg',
    gallery: [
      '/images/hardgp/por6-big.jpg',
      '/images/hardgp/por1-big.jpg',
      '/images/hardgp/por2-big.jpg',
      '/images/hardgp/por7-big.jpg'
    ],
    badgeAr: 'تنفيذ المقاولات العامة هارد',
    badgeEn: 'HARD General Contracting EPC',
    descriptionAr:
      'مقر إداري ومركز مكاتب تجاري متطور شيدته مؤسسة هارد للمقاولات العامة. يتميز بشبكات توزيع الجهد المتوسط والمنخفض، وأتمتة المباني، وشبكات الألياف الضوئية، وأنظمة السلامة ومكافحة الحريق المعتمدة.',
    descriptionEn:
      'Commercial office headquarters and retail center engineered by HARD General Contracting Establishment. Features medium and low voltage distribution, DCS/PLC building automation, campus fiber networking, and certified fire protection.',
    longOverviewAr: [
      'صُمم هذا المقر التجاري وفق أرقى النظم الهندسية ليخدم الشركات والمؤسسات الاستثمارية في المنطقة الشرقية، مع إشراف كامل لمهندسي هارد المتخصصين في أنظمة التحكم والكهرباء.',
      'يحتوي المبنى على محطة تحويل ومولدات كهرباء احتياطية، وشبكة ألياف ضوئية OFC، وأنظمة إنذار ومكافحة حريق معنونة، ومطافئ سوتيريا المعتمدة.',
      'تتيح هارد بدائل استثمارية وتمويلية عبر برامج البنوك المعتمدة لتسهيل التملك وإدارة الأصول بكفاءة عالية.'
    ],
    longOverviewEn: [
      'Engineered to the highest specifications to host corporate enterprises and institutional investors across the Eastern Province.',
      'Equipped with an independent electrical substation, backup generator, campus fiber network (OFC), addressable fire safety systems, and SOTERIA protection.',
      'Structured with flexible financing alternatives via HARD banking agreements for streamlined acquisition and long-term asset management.'
    ],
    featuresAr: [
      'محطة تحويل كهربائية وتأريض هندسي متكامل',
      'شبكة ألياف ضوئية متطورة (OFC) وشبكات داخلية',
      'أنظمة تحكم وأتمتة صناعية للمباني (PLC / SCADA)',
      'أنظمة إنذار وإطفاء حريق معتمدة مع مطافئ سوتيريا',
      '35 موقف سيارات مخصص للإدارة والعملاء',
      'تشطيب إداري وتنفيذي متكامل جاهز للتشغيل'
    ],
    featuresEn: [
      'Dedicated Electrical Substation & Engineered Grounding Grid',
      'Campus Fiber Optic (OFC) & High-Speed Structured Cabling',
      'Building Automation & Industrial Control (PLC / SCADA)',
      'Certified Fire Alarm & Life Safety with SOTERIA Equipping',
      '35 Reserved Executive & Visitor Parking Bays',
      'Turnkey Executive Fitout Ready for Immediate Operations'
    ],
    specs: [
      { labelAr: 'نوع الأصل', labelEn: 'Asset Type', valueAr: 'مقر إداري ومكاتب تجارية', valueEn: 'Commercial Headquarters' },
      { labelAr: 'المنطقة', labelEn: 'Province', valueAr: 'المنطقة الشرقية، المملكة العربية السعودية', valueEn: 'Eastern Province, KSA' },
      { labelAr: 'المساحة المبنية', labelEn: 'Built Area', valueAr: '1,720 م²', valueEn: '1,720 m²' },
      { labelAr: 'الأنظمة الكهربائية', labelEn: 'E&I Systems', valueAr: 'جهد متوسط ومنخفض ومولد احتياطي', valueEn: 'Medium & Low Voltage + Genset' },
      { labelAr: 'أنظمة التكييف', labelEn: 'HVAC', valueAr: 'شيلرات مركزية بعقد صيانة دوري', valueEn: 'Central Chiller Systems + AMC' },
      { labelAr: 'معايير الجودة', labelEn: 'QA/QC Standard', valueAr: 'مطابقة 100% لمعايير هارد الإنشائية', valueEn: '100% QA Verified' }
    ],
    falLicense: '1200028472',
    titleDeedNumber: '310992384712',
    advertisementNumber: '7200192852',
    coords: { lat: 26.3927, lng: 50.1804 },
    relatedSlugs: ['hard-al-rayyan-residential-villa-dammam', 'hard-commercial-retail-center', 'hard-residential-duplex-community'],
    rawRef: referenceProperties[1]
  },
  {
    id: 'prop-3',
    slug: 'hard-residential-duplex-community',
    titleAr: 'مجمع فلل ودوبلكسات سكنية عصرية من هارد',
    titleEn: 'HARD Contemporary Residential Duplex Compound',
    city: 'dammam',
    cityNameAr: 'المنطقة الشرقية – الدمام',
    cityNameEn: 'Eastern Province – Dammam',
    districtAr: 'القطاع السكني النموذجي - الريان',
    districtEn: 'Al-Rayyan Residential Sector',
    type: 'compound',
    typeNameAr: 'مجمع دوبلكسات عائلية',
    typeNameEn: 'Residential Duplex Compound',
    status: 'sale',
    statusNameAr: 'متاح للبيع والتملك',
    statusNameEn: 'Available for Homeowners',
    price: '1,750,000 ر.س',
    priceRaw: 1750000,
    priceCurrency: 'SAR',
    area: '360 م² (3,875 قدم²)',
    areaRaw: 360,
    beds: '4 غرف نوم ماستر',
    baths: '5 دورات مياه',
    parking: 'موقف خاص مظلل',
    image: '/images/hardgp/por8-big.jpg',
    gallery: [
      '/images/hardgp/por8-big.jpg',
      '/images/hardgp/por4-big.jpg',
      '/images/hardgp/por12-big.jpg',
      '/images/hardgp/por13-big.jpg'
    ],
    badgeAr: 'حلول إسكانية لجيل الشباب',
    badgeEn: 'Modern Youth Housing Solutions',
    descriptionAr:
      'مجمع دوبلكسات وفلل سكنية عصرية خططتها ونفذتها مؤسسة هارد لتلبية الطلب المتزايد على المساكن العائلية النموذجية في المملكة، شيدت وفق معايير كود البناء السعودي وبنية تحتية معتمدة.',
    descriptionEn:
      'Residential duplex community planned and executed by HARD Establishment to meet the growing demand for top-tier family housing in Saudi Arabia. Constructed to rigorous SBC standards with certified infrastructure.',
    longOverviewAr: [
      'يوفر هذا المشروع السكني نمط حياة عصري للأسر السعودية وفئة الشباب، مع تركيز دقيق على الجودة الإنشائية واستدامة المواد عبر استخدام أنابيب العامرية الحرارية بضمان 50 سنة.',
      'تتميز الوحدات بتوزيع ذكي للمساحات الداخلية، ومجلس عائلي رحب، وتكييف هواء مضمون مع عقود صيانة دورية مرنة.',
      'المشروع مؤهل لبرامج التمويل البنكي مع بنوك الجزيرة والرياض وسامبا بهامش ربح منخفض وتسهيلات سداد ميسرة.'
    ],
    longOverviewEn: [
      'Delivers contemporary family living targeted to Saudi households and the young demographic, prioritizing durability through 50-year warranty thermal piping.',
      'Features smart functional floor plans, expansive reception spaces, and reliable climate control backed by preventive maintenance.',
      'Pre-approved for bank mortgage financing through AlJazira Bank, Riyad Bank, and Samba Bank with preferential rates.'
    ],
    featuresAr: [
      'أنابيب بولي بروبيلين حرارية ألمانية بضمان 50 سنة',
      'تكييف مستقل معتمد بضمان 5 سنوات وصيانة دورية',
      'تمويل عقاري ميسر عبر بنوك الرياض والجزيرة وسامبا',
      'كراج سيارة داخلي وتجهيزات أمنية متكاملة',
      'مجلس ضيافة مستقل وصالة عائلية فسيحة',
      'مطبخ عصري مجهز بمطافئ سوتيريا الذكية'
    ],
    featuresEn: [
      'German Polypropylene Thermal Piping (50-Yr Warranty)',
      'Independent AC Units with 5-Yr Warranty & AMC Support',
      'Affordable Mortgage Funding via Riyad, AlJazira & Samba',
      'Private Shaded Carport & Security Intercom',
      'Separate Formal Majlis & Generous Family Lounge',
      'Contemporary Kitchen Equipped with SOTERIA Safety'
    ],
    specs: [
      { labelAr: 'المنطقة', labelEn: 'Location', valueAr: 'حي الريان، الدمام، المنطقة الشرقية', valueEn: 'Al-Rayyan, Dammam, Eastern Province' },
      { labelAr: 'المطور', labelEn: 'Developer', valueAr: 'مؤسسة هارد للمقاولات العامة', valueEn: 'HARD General Contracting' },
      { labelAr: 'المساحة', labelEn: 'Area', valueAr: '360 م²', valueEn: '360 m²' },
      { labelAr: 'السباكة والعوازل', labelEn: 'Plumbing & Insulation', valueAr: 'أنابيب العامرية الألمانية المعتمدة', valueEn: 'Al-Ameria German Thermal Piping' },
      { labelAr: 'التكييف', labelEn: 'HVAC', valueAr: 'ضمان 5 سنوات وكشف دوري', valueEn: '5-Year Warranty + Scheduled AMC' },
      { labelAr: 'التمويل', labelEn: 'Financing', valueAr: 'بنوك الجزيرة / الرياض / سامبا', valueEn: 'AlJazira / Riyad / Samba' }
    ],
    falLicense: '1200028472',
    titleDeedNumber: '310992384713',
    advertisementNumber: '7200192853',
    coords: { lat: 26.4250, lng: 50.0910 },
    relatedSlugs: ['hard-al-rayyan-residential-villa-dammam', 'hard-corporate-commercial-headquarters-tower', 'hard-commercial-retail-center'],
    rawRef: referenceProperties[2]
  },
  {
    id: 'prop-4',
    slug: 'hard-commercial-retail-center',
    titleAr: 'مركز هارد التجاري ومعارض الأعمال',
    titleEn: 'HARD Commercial Retail & Business Center',
    city: 'dammam',
    cityNameAr: 'المنطقة الشرقية – الدمام',
    cityNameEn: 'Eastern Province – Dammam',
    districtAr: 'الحي التجاري الرئيسي',
    districtEn: 'Main Commercial District',
    type: 'commercial',
    typeNameAr: 'مركز ومعارض تجارية',
    typeNameEn: 'Retail & Commercial Facility',
    status: 'sale',
    statusNameAr: 'متاح للبيع والاستثمار',
    statusNameEn: 'Commercial Opportunity',
    price: '8,900,000 ر.س',
    priceRaw: 8900000,
    priceCurrency: 'SAR',
    area: '1,200 م² (12,900 قدم²)',
    areaRaw: 1200,
    beds: 'معارض ومساحات تجارية مفتوحة',
    baths: '8 دورات مياه',
    parking: '20 موقف سيارات مخصص',
    image: '/images/hardgp/por7-big.jpg',
    gallery: [
      '/images/hardgp/por7-big.jpg',
      '/images/hardgp/por1-big.jpg',
      '/images/hardgp/por5-big.jpg'
    ],
    badgeAr: 'تنفيذ وإنشاءات مؤسسة هارد',
    badgeEn: 'HARD General Contracting Construction',
    descriptionAr:
      'مركز ومعارض تجارية متعددة الاستخدامات شيدتها مؤسسة هارد للمقاولات العامة بمواصفات هندسية فائقة توفر مساحات عرض رحبة وتجهيزات كهروميكانيكية متكاملة.',
    descriptionEn:
      'Multi-unit commercial retail and showroom facility developed by HARD General Contracting Establishment. Built for prime retail traffic, showroom visibility, and full electro-mechanical capability.',
    longOverviewAr: [
      'يقع هذا المركز التجاري في موقع حيوي واستراتيجي بالدمام، ويوفر مساحات تجارية مرنة تناسب كبرى العلامات والمعارض والشركات.',
      'تم تزويده بتجهيزات كهربائية ثقيلة، وشبكات صرف وتغذية بأنابيب العامرية، ومطافئ حريق سوتيريا متقدمة تضمن سلامة المنشأة والمتسوقين.',
      'تضمن هارد جودة التنفيذ الإنشائي بخبرة تمتد منذ عام 2004 في قطاع المقاولات العامة بالمملكة.'
    ],
    longOverviewEn: [
      'Positioned along a prominent commercial artery in Dammam, delivering flexible retail spaces suited for major retail brands and commercial entities.',
      'Engineered with high electrical capacity, Al-Ameria certified piping networks, and advanced SOTERIA fire fighting units.',
      'Backed by HARD Establishment proven contracting pedigree in the Kingdom of Saudi Arabia since 2004.'
    ],
    featuresAr: [
      'واجهات زجاجية واسعة للمعارض والمتاجر',
      'أحمال كهربائية عالية وتأريض هندسي متكامل',
      'مواقف سيارات رحبة للعملاء والمتسوقين',
      'أنظمة ومطافئ حريق معتمدة من الدفاع المدني',
      'منطقة تحميل وتنزيل ومدخل خدمات خلفي',
      'توثيق إنشائي وفحص جودة كامل'
    ],
    featuresEn: [
      'Expansive Commercial Storefront Showroom Glass',
      'High-Load Electrical Grid & Certified Grounding',
      'Dedicated Front & Rear Customer Parking Bays',
      'Civil Defense Approved Fire & Life Safety Systems',
      'Rear Logistics Loading Dock & Service Access',
      'Comprehensive QA/QC Structural Documentation'
    ],
    specs: [
      { labelAr: 'نوع المشروع', labelEn: 'Facility Type', valueAr: 'مركز ومعارض تجارية', valueEn: 'Retail & Showroom Complex' },
      { labelAr: 'المدينة', labelEn: 'City', valueAr: 'الدمام، المنطقة الشرقية', valueEn: 'Dammam, Eastern Province' },
      { labelAr: 'المساحة المبنية', labelEn: 'Built Area', valueAr: '1,200 م²', valueEn: '1,200 m²' },
      { labelAr: 'المقاول الرئيسي', labelEn: 'Main Contractor', valueAr: 'مؤسسة هارد للمقاولات العامة', valueEn: 'HARD General Contracting' },
      { labelAr: 'السلامة والحريق', labelEn: 'Fire Safety', valueAr: 'مطافئ سوتيريا المعتمدة وأنظمة إنذار', valueEn: 'SOTERIA Fire Extinguishers' },
      { labelAr: 'سنة الإنجاز', labelEn: 'Completion Year', valueAr: '2023', valueEn: '2023' }
    ],
    falLicense: '1200028472',
    titleDeedNumber: '310992384714',
    advertisementNumber: '7200192854',
    coords: { lat: 26.4150, lng: 50.1100 },
    relatedSlugs: ['hard-al-rayyan-residential-villa-dammam', 'hard-corporate-commercial-headquarters-tower', 'hard-residential-duplex-community'],
    rawRef: referenceProperties[3]
  }
];

// Compatibility aliases for legacy or previously linked slugs
export const legacySlugAliases: Record<string, string> = {
  'the-sky-crest-penthouse-khobar-corniche': 'hard-al-rayyan-residential-villa-dammam',
  'the-royal-palm-coastal-palace-villa': 'hard-al-rayyan-residential-villa-dammam',
  'al-malqa-elite-contemporary-villa': 'hard-corporate-commercial-headquarters-tower',
  'khobar-sunset-boulevard-waterfront-residence': 'hard-residential-duplex-community',
  'the-grand-rakah-executive-suite-khobar': 'hard-corporate-commercial-headquarters-tower',
  'the-shobaily-bay-royal-villa': 'hard-commercial-retail-center',
  'al-olaya-business-towers': 'hard-corporate-commercial-headquarters-tower',
  'khobar-waterfront-luxury-villa': 'hard-al-rayyan-residential-villa-dammam',
  'riyadh-skyline-penthouse': 'hard-corporate-commercial-headquarters-tower',
  'eastern-oasis-compound': 'hard-residential-duplex-community',
  'al-narjis-contemporary-villas': 'hard-residential-duplex-community',
  'dhahran-techno-valley-offices': 'hard-commercial-retail-center'
};
