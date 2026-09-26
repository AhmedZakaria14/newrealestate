export interface NavItem {
  title: string;
  title_ar: string;
  href: string;
  badge?: string;
  children?: {
    title: string;
    title_ar: string;
    href: string;
    description?: string;
    description_ar?: string;
  }[];
}

export const navigationLinks: NavItem[] = [
  {
    title: 'Home',
    title_ar: 'الرئيسية',
    href: '/',
    children: [
      {
        title: 'Home Version – 1',
        title_ar: 'الإصدار الأول – كلاسيكي',
        href: '/home-version-1',
        description: 'Classic architectural showcase',
        description_ar: 'العرض المعماري الكلاسيكي',
      },
      {
        title: 'Home Version – 2',
        title_ar: 'الإصدار الثاني – سكني حديث',
        href: '/home-version-2',
        description: 'Modern residential portfolio',
        description_ar: 'المعرض السكني الحديث المتطور',
      },
      {
        title: 'Home Version – 3',
        title_ar: 'الإصدار الثالث – الفاخر الحديث (الحالي)',
        href: '/home-version-3',
        description: 'Luxury metal & high-tech edition',
        description_ar: 'الإصدار الفاخر المتكامل عالي التقنية',
      },
    ],
  },
  {
    title: 'About Us',
    title_ar: 'من نحن',
    href: '/about-us',
  },
  {
    title: 'Services',
    title_ar: 'خدماتنا',
    href: '/services',
    children: [
      {
        title: 'All Services',
        title_ar: 'كافة الخدمات الهندسية',
        href: '/services',
        description: 'Overview of all construction capabilities',
        description_ar: 'نظرة عامة على كافة إمكانياتنا الإنشائية',
      },
      {
        title: 'Site Planning',
        title_ar: 'تخطيط المواقع والمخططات',
        href: '/services/site-planning',
        description: 'Smart layouts and zoning assessments',
        description_ar: 'تخطيط ذكي ودراسات تربة ومخططات مساحية',
      },
      {
        title: 'Building Design',
        title_ar: 'التصميم المعماري والهندسي',
        href: '/services/building-design',
        description: 'Architectural drafting and aesthetic balance',
        description_ar: 'مخططات معمارية وتصميم واجهات ثلاثية الأبعاد',
      },
      {
        title: 'Project Management',
        title_ar: 'إدارة وتنفيذ المشاريع',
        href: '/services/project-management',
        description: 'Turnkey supervision and timeline delivery',
        description_ar: 'إشراف كامل وتسليم على المفتاح بأعلى دقة',
      },
      {
        title: 'Design & Planning',
        title_ar: 'التخطيط والدراسات الهندسية',
        href: '/services/design-planning',
        description: 'Integrated master planning and precision',
        description_ar: 'مخططات عامة متكاملة ومعايير استدامة',
      },
    ],
  },
  {
    title: 'Projects',
    title_ar: 'مشاريعنا',
    href: '/projects',
    children: [
      {
        title: 'All Projects',
        title_ar: 'كافة المشاريع والإنجازات',
        href: '/projects',
        description: 'Our complete architectural portfolio',
        description_ar: 'سجل أعمالنا ومشاريعنا المعمارية',
      },
      {
        title: 'The Vertex Plaza',
        title_ar: 'برج ذا فيرتكس بلازا الفاخر',
        href: '/projects/the-vertex-plaza',
        description: 'Residential luxury tower',
        description_ar: 'برج سكني فاخر بإطلالات بانورامية',
      },
      {
        title: 'Aurelia Business Park',
        title_ar: 'مجمع أوريليا للأعمال والابتكار',
        href: '/projects/aurelia-business-park',
        description: 'Commercial innovation hub',
        description_ar: 'مركز تجاري ذكي صديق للبيئة',
      },
      {
        title: 'Project Completion - Zenith Logistics',
        title_ar: 'مجمع زينيث اللوجستي والصناعي',
        href: '/projects/project-completion',
        description: 'Industrial logistics complex',
        description_ar: 'صرح لوجستي صناعي عالي الطاقة',
      },
    ],
  },
  {
    title: 'Pages',
    title_ar: 'الصفحات',
    href: '#',
    children: [
      {
        title: 'Image Gallery',
        title_ar: 'معرض الصور المعمارية',
        href: '/image-gallery',
        description: 'High-res photography of finished villas',
        description_ar: 'صور عالية الدقة للفلل والمشاريع المنجزة',
      },
      {
        title: 'Video Gallery',
        title_ar: 'معرض جولات الفيديو',
        href: '/video-gallery',
        description: 'Cinematic video tours and walkthroughs',
        description_ar: 'جولات سينمائية ثلاثية الأبعاد للمشاريع',
      },
      {
        title: 'Pricing Plan',
        title_ar: 'باقات وخطط الأسعار',
        href: '/pricing-plan',
        description: 'Transparent construction tier estimates',
        description_ar: 'خطط تسعير واضحة ومرنة للبناء والتطوير',
      },
      {
        title: 'Our Team',
        title_ar: 'فريق العمل والخبراء',
        href: '/our-team',
        description: 'Architects, engineers, and project leads',
        description_ar: 'نخبة من كبار المعماريين والمهندسين المدنيين',
      },
      {
        title: 'Testimonials',
        title_ar: 'آراء وشهادات العملاء',
        href: '/testimonials',
        description: 'Client reviews and verified feedback',
        description_ar: 'تقييمات موثقة من ملاك الفلل والمستثمرين',
      },
      {
        title: 'FAQs',
        title_ar: 'الأسئلة الشائعة',
        href: '/faqs',
        description: 'Frequently asked construction questions',
        description_ar: 'إجابات شاملة حول التراخيص والبناء والتكاليف',
      },
    ],
  },
  {
    title: 'Blog',
    title_ar: 'المدونة',
    href: '/blog',
    children: [
      {
        title: 'Blog Grid',
        title_ar: 'أحدث مقالات البناء',
        href: '/blog',
        description: 'Latest construction industry insights',
        description_ar: 'مقالات ورؤى هندسية متخصصة',
      },
      {
        title: 'Modern Construction Trends',
        title_ar: 'اتجاهات البناء الحديث في المدن',
        href: '/blog/modern-construction-trends-shaping-urban-living',
        description: 'Urban high-density innovations',
        description_ar: 'التقنيات الحديثة في الواجهات والعمارة الحضرية',
      },
      {
        title: 'Quality Construction Benefits',
        title_ar: 'مزايا جودة البناء للاستثمار طويل الأمد',
        href: '/blog/benefits-of-quality-construction-for-long-term-value',
        description: 'Long term asset valuation',
        description_ar: 'حماية قيمة الأصول العقارية وتخفيض الصيانة',
      },
      {
        title: 'Sustainable Building Practices',
        title_ar: 'ممارسات البناء الأخضر المستدام',
        href: '/blog/sustainable-building-practices-for-future-ready-spaces',
        description: 'Eco-friendly and carbon-neutral builds',
        description_ar: 'العمارة الصديقة للبيئة والخرسانة منخفضة الانبعاثات',
      },
    ],
  },
  {
    title: 'Contact Us',
    title_ar: 'اتصل بنا',
    href: '/contact-us',
  },
];

export const partnerLogos = [
  'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/company-supports-logo-1.svg',
  'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/company-supports-logo-2.svg',
  'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/company-supports-logo-3.svg',
  'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/company-supports-logo-4.svg',
  'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/company-supports-logo-5.svg',
];

export const clientAvatars = [
  'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/author-1.jpg',
  'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/author-2.jpg',
  'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/author-3.jpg',
  'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/author-4.jpg',
  'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/author-5.jpg',
  'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/author-6.jpg',
];

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  iconName: string;
  image: string;
  features: string[];
  features_ar: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 'site-planning',
    slug: 'site-planning',
    number: '01',
    title: 'Site Planning',
    title_ar: 'تخطيط المواقع والمخططات',
    description: 'We build modern homes, villas, apartments, & housing projects that combine smart layouts, structural resilience, and natural environment harmony.',
    description_ar: 'نبني منازل وفللاً ومشاريع سكنية حديثة تجمع بين المخططات الذكية، والمتانة الإنشائية، والانسجام التام مع البيئة الطبيعية والمحيط العمراني.',
    iconName: 'Compass',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/project-image-1.jpg',
    features: [
      'Topographical and geotechnical soil survey',
      'Zoning code, setback, and municipal permit alignment',
      'Hydrological grading and rainwater capture management',
      'Optimal solar orientation and wind exposure design',
    ],
    features_ar: [
      'دراسات طبوغرافية وجيوتقنية شاملة للتربة والأساسات',
      'مطابقة اشتراطات كود البناء والتراخيص البلدية والارتدادات',
      'إدارة تصريف مياه الأمطار وتنسيق المناسيب الهيدرولوجية',
      'توجيه مثالي للمبنى للاستفادة القصوى من مسار الشمس والرياح',
    ],
  },
  {
    id: 'building-design',
    slug: 'building-design',
    number: '02',
    title: 'Building Design',
    title_ar: 'التصميم المعماري والهندسي',
    description: 'Innovative architectural drafting blending contemporary aesthetics, bioclimatic efficiency, and engineering precision for luxury living.',
    description_ar: 'تصميم معماري مبتكر يدمج بين الجمال العصري، والكفاءة المناخية الذكية، والدقة الهندسية الفائقة لخلق تجارب عيش فاخرة واستثنائية.',
    iconName: 'Building2',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/project-image-2.jpg',
    features: [
      'Bespoke architectural concept visualization (3D BIM)',
      'Structural engineering using earthquake-resistant standards',
      'Interior spatial flow and ergonomic layout planning',
      'High-performance facade and thermal envelope detailing',
    ],
    features_ar: [
      'نمذجة معمارية تفاعلية ثلاثية الأبعاد بتقنية (3D BIM)',
      'تصميم إنشائي متقدم مطابق لأعلى معايير مقاومة الزلازل والرياح',
      'تخطيط داخلي مريح وانسيابي يحقق أعلى درجات الخصوصية والرحابة',
      'واجهات زجاجية وحرارية عالية العزل لتوفير الطاقة وتقليل الضوضاء',
    ],
  },
  {
    id: 'project-management',
    slug: 'project-management',
    number: '03',
    title: 'Project Management',
    title_ar: 'إدارة وتنفيذ المشاريع',
    description: 'End-to-end execution, strict safety compliance, budget optimization, and turnkey delivery on schedule without compromise.',
    description_ar: 'إشراف تنفيذي متكامل، وتطبيق صارم لمعايير السلامة، وتحسين إدارة الميزانية، والتسليم على المفتاح في المواعيد المحددة بدقة تامة.',
    iconName: 'Briefcase',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/project-image-3.jpg',
    features: [
      'Critical path milestone tracking and progress audits',
      'Direct procurement of ISO-certified steel and concrete',
      'Daily site safety protocols and on-site engineering leads',
      'Full transparency digital portal for owners',
    ],
    features_ar: [
      'متابعة المسار الحرج وتدقيق مراحل الإنجاز وفق جدول زمني دقيق',
      'توريد مباشر للحديد والخرسانة المعتمدة بشهادات الجودة العالمية ISO',
      'إشراف هندسي يومي وتطبيق حازم لمعايير السلامة المهنية',
      'لوحة متابعة رقمية تتيح للعميل متابعة مراحل البناء بالصور والفيديو',
    ],
  },
  {
    id: 'design-planning',
    slug: 'design-planning',
    number: '04',
    title: 'Design & Planning',
    title_ar: 'التخطيط والدراسات الهندسية',
    description: 'Master planning, spatial integration, environmental impact analysis, and meticulous architectural blueprints for high-end developments.',
    description_ar: 'مخططات عامة، وتكامل فراغي ذكي، ودراسات الأثر البيئي، ومخططات تنفيذية تفصيلية تلبي أعلى متطلبات المشاريع الراقية.',
    iconName: 'DraftingCompass',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/about-us-item-image-2.jpg',
    features: [
      'Master blueprint development and CAD documentation',
      'Permit acceleration and building authority compliance',
      'Green building LEED and WELL certification readiness',
      'Lifecycle cost analysis and material lifecycle calculation',
    ],
    features_ar: [
      'إعداد المخططات التنفيذية الشاملة وتوثيق CAD و BIM',
      'تسريع استخراج الرخص الهندسية والاعتمادات البلدية الرسمية',
      'جاهزية المبنى للحصول على شهادات الاستدامة العالمية LEED و WELL',
      'دراسة تكلفة دورة حياة المبنى واختيار مواد البناء الأطول عمراً',
    ],
  },
];

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  title_ar: string;
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Infrastructure';
  category_ar: string;
  client: string;
  client_ar: string;
  startDate: string;
  startDate_ar: string;
  completionDate: string;
  completionDate_ar: string;
  location: string;
  location_ar: string;
  image: string;
  excerpt: string;
  excerpt_ar: string;
  description: string;
  description_ar: string;
  stats: { label: string; label_ar: string; value: string; value_ar: string }[];
}

export const projectsData: ProjectItem[] = [
  {
    id: 'the-vertex-plaza',
    slug: 'the-vertex-plaza',
    title: 'The Vertex Plaza',
    title_ar: 'برج ذا فيرتكس بلازا الفاخر',
    category: 'Residential',
    category_ar: 'سكني فاخر',
    client: 'Cameron Williamson',
    client_ar: 'مجموعة كاميرون ويليامسون',
    startDate: 'March 2024',
    startDate_ar: 'مارس 2024',
    completionDate: 'Completed 2025',
    completionDate_ar: 'تم التسليم 2025',
    location: 'Skyline Boulevard, North District',
    location_ar: 'جادة الأبراج، الحي الشمالي',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/project-image-1.jpg',
    excerpt: 'The vertex plaza is a luxury residential sky-tower featuring panoramic city views, infinity sky-pools, and cantilevered cantilever balconies.',
    excerpt_ar: 'برج سكني شاهق يضم 48 فيلا علوية معلقة، مسابح أفقية بانورامية، وشرفات ذات إطلالات مفتوحة على أفق المدينة.',
    description: 'The Vertex Plaza stands as a testament to modern urban luxury. Comprising 48 bespoke sky villas, each residence boasts panoramic floor-to-ceiling curtain walls, custom titanium accents, smart automation, and private sky decks.',
    description_ar: 'يقف برج ذا فيرتكس بلازا كرمز للفخامة العمرانية المعاصرة. يضم البرج 48 فيلا سكنية معلقة تتميز بواجهات زجاجية بانورامية ممتدة، وتشطيبات من التيتانيوم، وأنظمة أتمتة ذكية متكاملة، وشرفات استرخاء خاصة.',
    stats: [
      { label: 'Total Area', label_ar: 'المساحة الإجمالية', value: '145,000 sq ft', value_ar: '145,000 قدم مربع' },
      { label: 'Units', label_ar: 'عدد الوحدات', value: '48 Sky Villas', value_ar: '48 فيلا معلقة' },
      { label: 'Floors', label_ar: 'عدد الطوابق', value: '38 Levels', value_ar: '38 طابقاً' },
      { label: 'Energy Rating', label_ar: 'تصنيف الطاقة', value: 'LEED Platinum', value_ar: 'بلاتينيوم LEED' },
    ],
  },
  {
    id: 'aurelia-business-park',
    slug: 'aurelia-business-park',
    title: 'Aurelia Business Park',
    title_ar: 'مجمع أوريليا للأعمال والابتكار',
    category: 'Commercial',
    category_ar: 'تجاري وإداري',
    client: 'Cameron Williamson',
    client_ar: 'مجموعة كاميرون ويليامسون',
    startDate: 'January 2024',
    startDate_ar: 'يناير 2024',
    completionDate: 'Completed 2025',
    completionDate_ar: 'تم التسليم 2025',
    location: 'Metropolitan Financial Corridor',
    location_ar: 'القطاع المالي المركزي',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/project-image-2.jpg',
    excerpt: 'Aurelia business park delivers state-of-the-art office infrastructure with carbon-neutral design and flexible collaborative floorplates.',
    excerpt_ar: 'مجمع أعمال حديث متكامل يوفر بيئة مكتبية ذكية ومحايدة للكربون ومصممة بأحدث معايير كفاءة الطاقة والعمل المشترك.',
    description: 'Designed as a futuristic corporate campus, Aurelia Business Park integrates biophilic interior atriums, smart climate zoning, rapid EV charging grids, and rooftop solar arrays that generate 40% of peak energy demand.',
    description_ar: 'صُمم كمقر أعمال مستقبلي يدمج المساحات الخضراء الداخلية، وأنظمة التكييف الذكية، ومحطات الشحن السريع للسيارات الكهربائية، ومصفوفات الطاقة الشمسية على الأسطح التي توفر 40% من احتياج الطاقة.',
    stats: [
      { label: 'Total Area', label_ar: 'المساحة الإجمالية', value: '280,000 sq ft', value_ar: '280,000 قدم مربع' },
      { label: 'Capacity', label_ar: 'الطاقة الاستيعابية', value: '3,200 Workstations', value_ar: '3,200 مساحة عمل' },
      { label: 'Green Space', label_ar: 'المساحات الخضراء', value: '4.5 Acres Park', value_ar: '4.5 فدان حدائق' },
      { label: 'Safety Record', label_ar: 'سجل السلامة', value: 'Zero Incident', value_ar: 'صفر حوادث' },
    ],
  },
  {
    id: 'project-completion',
    slug: 'project-completion',
    title: 'Project completion - Zenith Logistics',
    title_ar: 'مجمع زينيث اللوجستي والصناعي',
    category: 'Industrial',
    category_ar: 'صناعي ولوجستي',
    client: 'Cameron Williamson',
    client_ar: 'مجموعة كاميرون ويليامسون',
    startDate: 'July 2023',
    startDate_ar: 'يوليو 2023',
    completionDate: 'Completed 2024',
    completionDate_ar: 'تم التسليم 2024',
    location: 'Interstate Commerce Hub',
    location_ar: 'المحور التجاري اللوجستي السريع',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/project-image-3.jpg',
    excerpt: 'Project completion represents our high-throughput industrial and logistics flagship with heavy-duty structural engineering.',
    excerpt_ar: 'صرح لوجستي وصناعي عملاق تم تنفيذه بهندسة إنشائية فائقة التحمل تدعم الروبوتات وأنظمة المناولة الذكية المؤتمتة.',
    description: 'An engineered wonder designed for high-density autonomous robotics and multi-modal logistics. Features post-tensioned superflat slabs, 42-foot clear heights, and reinforced thermal envelope.',
    description_ar: 'تحفة هندسية صممت خصيصاً للمناولة اللوجستية الذكية والروبوتات ذات الكثافة العالية. تتميز بأرضيات خرسانية مستوية فائقة المقاومة، وارتفاعات صافية تصل إلى 42 قدماً، وعزل حراري فائق.',
    stats: [
      { label: 'Total Footprint', label_ar: 'المساحة الإجمالية', value: '420,000 sq ft', value_ar: '420,000 قدم مربع' },
      { label: 'Dock Doors', label_ar: 'أبواب الشحن', value: '64 Automated Bays', value_ar: '64 بوابة مؤتمتة' },
      { label: 'Floor Load', label_ar: 'حمولة الأرضية', value: '10 Tons / sq m', value_ar: '10 طن / متر مربع' },
      { label: 'Completion', label_ar: 'سرعة الإنجاز', value: '18 Days Ahead', value_ar: 'قبل الموعد بـ 18 يوماً' },
    ],
  },
  {
    id: 'crown-commercial',
    slug: 'crown-commercial',
    title: 'Crown Commercial Complex',
    title_ar: 'مجمع كراون التجاري والفندقي',
    category: 'Commercial',
    category_ar: 'تجاري وسياحي',
    client: 'Crown Holdings Ltd',
    client_ar: 'مجموعة كراون القابضة',
    startDate: 'February 2024',
    startDate_ar: 'فبراير 2024',
    completionDate: 'Ongoing 2026',
    completionDate_ar: 'قيد التنفيذ 2026',
    location: 'Downtown Riverside',
    location_ar: 'واجهة النهر المركزية',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/gallery-1.jpg',
    excerpt: 'Mixed-use waterfront complex featuring premium retail concourses and luxury hospitality suites.',
    excerpt_ar: 'مجمع فاخر متعدد الاستخدامات على الواجهة المائية يضم مساحات تجارية راقية وأجنحة ضيافة فندقية خمس نجوم.',
    description: 'Crown Commercial redefines the skyline with its geometric sculpted glass envelope and waterfront promenades.',
    description_ar: 'يعيد مجمع كراون رسم ملامح الأفق بواجهاته الزجاجية المنحوتة وممشاه المائي المتصل بالأنشطة الترفيهية الفاخرة.',
    stats: [
      { label: 'Retail Space', label_ar: 'المساحات التجارية', value: '95,000 sq ft', value_ar: '95,000 قدم مربع' },
      { label: 'Hotel Suites', label_ar: 'الأجنحة الفندقية', value: '120 Keys', value_ar: '120 جناحاً فاخراً' },
      { label: 'Parking', label_ar: 'مواقف السيارات', value: '850 Underground', value_ar: '850 موقفاً تحت الأرض' },
      { label: 'Status', label_ar: 'حالة المشروع', value: 'Phase 2 Near Turnkey', value_ar: 'المرحلة 2 قاربت على التسليم' },
    ],
  },
  {
    id: 'platinum-square',
    slug: 'platinum-square',
    title: 'Platinum Square Villas',
    title_ar: 'فلل الميدان البلاتيني الجبلية',
    category: 'Residential',
    category_ar: 'سكني فاخر',
    client: 'Vanguard Realty Group',
    client_ar: 'مجموعة فانغارد العقارية',
    startDate: 'May 2024',
    startDate_ar: 'مايو 2024',
    completionDate: 'Completed 2025',
    completionDate_ar: 'تم التسليم 2025',
    location: 'Alpine Hillside Enclave',
    location_ar: 'مرتفعات الألب السكنية الراقية',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/gallery-2.jpg',
    excerpt: 'A gated enclave of 18 ultra-exclusive minimalist concrete and glass mountain villas.',
    excerpt_ar: 'مجمع سكني مغلق يضم 18 فيلا جبلية حصرية بتصاميم خرسانية وزجاجية معاصرة ومسابح مدفأة مطلة على الطبيعة.',
    description: 'Built on steep natural topography, each villa features cantilevered heated infinity pools and integrated basalt stone facades.',
    description_ar: 'شُيدت على تضاريس طبيعية جبلية منحدرة، وتتميز كل فيلا بمسابح لا متناهية معلقة ومدفأة وواجهات من حجر البازلت الطبيعي.',
    stats: [
      { label: 'Estates', label_ar: 'عدد الفلل', value: '18 Private Villas', value_ar: '18 فيلا خاصة' },
      { label: 'Avg Villa Area', label_ar: 'متوسط مساحة الفيلا', value: '8,500 sq ft', value_ar: '8,500 قدم مربع' },
      { label: 'Private Grounds', label_ar: 'المساحة الكلية', value: '12 Acres Total', value_ar: '12 فداناً' },
      { label: 'Security', label_ar: 'أنظمة الأمان', value: 'Biometric Smart Access', value_ar: 'دخول ذكي ببصمة الوجه' },
    ],
  },
  {
    id: 'metropolitan-viaduct',
    slug: 'metropolitan-viaduct',
    title: 'Metropolitan Coastal Viaduct',
    title_ar: 'جسر الساحل المعلق السريع',
    category: 'Infrastructure',
    category_ar: 'بنية تحتية',
    client: 'Regional Transit Authority',
    client_ar: 'هيئة النقل وتطوير البنية التحتية',
    startDate: 'November 2023',
    startDate_ar: 'نوفمبر 2023',
    completionDate: 'Completed 2025',
    completionDate_ar: 'تم التسليم 2025',
    location: 'Coastal Highway 101',
    location_ar: 'طريق الساحل السريع 101',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/gallery-3.jpg',
    excerpt: 'Seismically isolated 6-lane elevated transit connector engineered for century-long durability.',
    excerpt_ar: 'محور مروري ساحلي معلق بستة مسارات، معزول زلزالياً ومصمم للخدمة لأكثر من قرن من الزمان.',
    description: 'Heavy infrastructure civil engineering designed with ultra-high-durability marine concrete and anti-corrosive carbon rebar.',
    description_ar: 'مشروع هندسي مدني ضخم تم تنفيذه بخرسانة بحرية فائقة المتانة وتسليح بألياف الكربون غير القابلة للصدأ.',
    stats: [
      { label: 'Span Length', label_ar: 'طول الجسر', value: '3.4 Kilometers', value_ar: '3.4 كيلومتر' },
      { label: 'Daily Transit', label_ar: 'الحركة اليومية', value: '85,000 Vehicles', value_ar: '85,000 مركبة' },
      { label: 'Seismic Grade', label_ar: 'مقاومة الزلازل', value: 'Zone 4 Resilient', value_ar: 'المنطقة 4 (أعلى تصنيف)' },
      { label: 'Lifespan', label_ar: 'العمر الافتراضي', value: '100+ Years', value_ar: '100+ عام' },
    ],
  },
];

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  name_ar: string;
  role: string;
  role_ar: string;
  image: string;
  bio: string;
  bio_ar: string;
  phone: string;
  email: string;
  experience: string;
  experience_ar: string;
  projectsCompleted: number;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'john-smith',
    slug: 'john-smith',
    name: 'John Smith',
    name_ar: 'م. جون سميث',
    role: 'Chief Architect',
    role_ar: 'كبير المهندسين المعماريين',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/team-1.png',
    bio: 'With over 18 years of pioneering architectural vision, John has designed award-winning residential sky-villas and iconic urban towers across North America and Europe.',
    bio_ar: 'بخبرة تمتد لأكثر من 18 عاماً في الابتكار المعماري، صمم جون العديد من الفلل السكنية الفارهة والأبراج الحضرية الحائزة على جوائز معمارية دولية.',
    phone: '+1 (555) 234-5678',
    email: 'john.smith@skyvillaconstruction.com',
    experience: '18+ Years',
    experience_ar: '18+ عاماً خبرة',
    projectsCompleted: 64,
  },
  {
    id: 'albert-flores',
    slug: 'albert-flores',
    name: 'Albert Flores',
    name_ar: 'م. ألبرت فلوريس',
    role: 'Project Manager',
    role_ar: 'مدير عام المشاريع والتنفيذ',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/team-2.png',
    bio: 'Albert specializes in large-scale multi-million dollar construction orchestration, ensuring flawless safety metrics, rigorous supply chain agility, and on-time turnarounds.',
    bio_ar: 'يتخصص ألبرت في إدارة وتنفيذ المشاريع الإنشائية الكبرى بملايين الدولارات، مع الالتزام التام بأعلى معايير السلامة والجداول الزمنية الصارمة.',
    phone: '+1 (555) 345-6789',
    email: 'albert.flores@skyvillaconstruction.com',
    experience: '14+ Years',
    experience_ar: '14+ عاماً خبرة',
    projectsCompleted: 82,
  },
  {
    id: 'michael-brown',
    slug: 'michael-brown',
    name: 'Michael Brown',
    name_ar: 'م. مايكل براون',
    role: 'Civil Engineer',
    role_ar: 'كبير المهندسين الإنشائيين والمدنيين',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/team-3.png',
    bio: 'Michael brings deep expertise in seismic structural analysis, sustainable geotechnical footing, and carbon-reduction composite materials for future-ready developments.',
    bio_ar: 'يتمتع مايكل بخبرة متعمقة في الحسابات الإنشائية ومقاومة الزلازل، وتصميم الأساسات العميقة واستخدام المواد المركبة الصديقة للبيئة.',
    phone: '+1 (555) 456-7890',
    email: 'michael.brown@skyvillaconstruction.com',
    experience: '12+ Years',
    experience_ar: '12+ عاماً خبرة',
    projectsCompleted: 53,
  },
  {
    id: 'sarah-wilson',
    slug: 'sarah-wilson',
    name: 'Sarah Wilson',
    name_ar: 'م. سارة ويلسون',
    role: 'Head of Interior Architecture',
    role_ar: 'رئيسة قسم العمارة والتصميم الداخلي',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/team-1.png',
    bio: 'Sarah curates bespoke interior luxury finishes, organic acoustics, lighting choreography, and sustainable material palettes for our most discerning clients.',
    bio_ar: 'تقود سارة تصميم المساحات الداخلية الفاخرة، والإضاءة المعمارية المدروسة، والتشطيبات الحصرية التي تضفي دفئاً ورقياً على كل مشروع.',
    phone: '+1 (555) 567-8901',
    email: 'sarah.wilson@skyvillaconstruction.com',
    experience: '10+ Years',
    experience_ar: '10+ أعوام خبرة',
    projectsCompleted: 45,
  },
];

export interface PricingPlan {
  id: string;
  name: string;
  name_ar: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  subtitle: string;
  subtitle_ar: string;
  description: string;
  description_ar: string;
  features: string[];
  features_ar: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'basic-plan',
    name: 'Basic Plan',
    name_ar: 'الخطة الأساسية',
    monthlyPrice: 39,
    annualPrice: 31,
    subtitle: 'Ideal for small residential projects',
    subtitle_ar: 'مثالية للمشاريع السكنية والفلل الفردية',
    description: 'We offer transparent & flexible pricing plan to meet the need of every client.',
    description_ar: 'نقدم خطة تسعير واضحة ومرنة تلبي احتياجات بناء المساكن الخاصة بدقة.',
    features: [
      'Ideal for small residential projects',
      'Modern Construction Technology',
      'Quality material & construction',
      'Legal & Documentation Support',
      'Standard site survey reports',
      'Quarterly progress review',
    ],
    features_ar: [
      'مثالية للفلل السكنية والمشاريع الفردية',
      'استخدام أحدث تقنيات البناء الحديث',
      'مواد بناء عالية الجودة ومطابقة للمواصفات',
      'دعم قانوني وتوثيق تراخيص البلدية',
      'تقارير مساحية ودراسة أولية للتربة',
      'مراجعة دورية لمراحل تقدم الأعمال',
    ],
  },
  {
    id: 'standard-plan',
    name: 'Standard Plan',
    name_ar: 'الخطة القياسية (الموصى بها)',
    monthlyPrice: 49,
    annualPrice: 39,
    popular: true,
    subtitle: 'Best for luxury villas and commercial',
    subtitle_ar: 'الأفضل للفلل الفاخرة والمشاريع التجارية',
    description: 'Our most sought-after plan offering dedicated project managers and rapid engineering approvals.',
    description_ar: 'خطتنا الأكثر طلباً؛ توفر مديراً مخصصاً للمشروع واعتمادات هندسية سريعة.',
    features: [
      'Ideal for small & medium residential',
      'Modern Construction Technology',
      'Quality material & construction',
      'Legal & Documentation Support',
      'Dedicated Project Manager on-site',
      'Weekly 3D Drone Progress Scans',
      'Priority Permit Acceleration',
    ],
    features_ar: [
      'مثالية للفلل الفارهة والمجمعات المتوسطة',
      'تقنيات نمذجة البناء ثلاثية الأبعاد (3D BIM)',
      'مواد بناء معتمدة بفحوصات مخبرية دورية',
      'تسريع فوري لاستخراج الرخص والمخططات',
      'مهندس موقع ومدير مشروع مخصص ميدانياً',
      'مسح دوري أسبوعي بطائرات الدرون لتوثيق الإنجاز',
      'ضمان إنشائي متكامل ومعتمد',
    ],
  },
  {
    id: 'premium-plan',
    name: 'Premium Plan',
    name_ar: 'الخطة المميزة الشاملة',
    monthlyPrice: 59,
    annualPrice: 47,
    subtitle: 'Comprehensive turnkey enterprise plan',
    subtitle_ar: 'الباقة الشاملة للتسليم المتكامل على المفتاح',
    description: 'End-to-end master planning, structural guarantees, and 24/7 client liaison.',
    description_ar: 'تخطيط رئيسي شامل، ضمانات هيكلية ممتدة، ودعم استشاري متاح على مدار الساعة.',
    features: [
      'Turnkey luxury development suite',
      'Modern Construction Technology',
      'Quality material & construction',
      'Legal & Documentation Support',
      'Full 3D BIM Virtual Walkthroughs',
      '24/7 Priority Emergency Support',
      'Extended 10-Year Structural Warranty',
      'VIP Handover Concierge & Staging',
    ],
    features_ar: [
      'تسليم متكامل فاخر على المفتاح (Turnkey)',
      'تطبيق كامل لتقنيات العمارة الخضراء والمباني الذكية',
      'أرقى خامات التشطيب المستوردة مع شهادات المنشأ',
      'جولات افتراضية تفاعلية ثلاثية الأبعاد للمشروع كاملاً',
      'دعم هندسي وطوارئ على مدار 24 ساعة',
      'ضمان هيكلي وإنشائي شامل لمدة 10 سنوات',
      'خدمة تسليم VIP وتجهيز كامل للمبنى',
      'عقود صيانة دورية مجانية للسنة الأولى',
    ],
  },
];

export interface TestimonialItem {
  id: string;
  quote: string;
  quote_ar: string;
  name: string;
  name_ar: string;
  role: string;
  role_ar: string;
  avatar: string;
  rating: number;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: '1',
    quote: 'The team delivered exceptional quality and maintained complete transparency throughout the project. The construction was completed on time, and the finishing exceeded our workmanship expectations and strong project management throughout.',
    quote_ar: 'قدم فريق سكاي فيلا جودة استثنائية والتزاماً تاماً بالشفافية طوال فترة المشروع. تم تسليم فيلتنا في الموعد المحدد، وفاق التشطيب النهائي كافة توقعاتنا بفضل الإشراف الهندسي المتقن.',
    name: 'Rahul Mehta',
    name_ar: 'أ. راؤول ميهتا',
    role: 'Residential Client & Skyvilla Owner',
    role_ar: 'مالك فيلا سكنية فاخرة',
    avatar: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/author-1.jpg',
    rating: 5,
  },
  {
    id: '2',
    quote: 'From the initial structural blueprints to the turnkey handover, Skyvilla demonstrated unprecedented discipline. Our corporate headquarters at Aurelia was completed two months ahead of schedule with zero safety incidents.',
    quote_ar: 'من المخططات الهندسية الأولى وحتى استلام المفاتيح، أظهرت سكاي فيلا انضباطاً واحترافية لا مثيل لها. تم إنجاز مقرنا الرئيسي في مجمع أوريليا قبل الموعد بشهرين مع صفر حوادث سلامة.',
    name: 'Jane Cooper',
    name_ar: 'د. جين كوبر',
    role: 'Managing Director, Apex Global',
    role_ar: 'المدير التنفيذي – أبيكس العالمية',
    avatar: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/author-2.jpg',
    rating: 5,
  },
  {
    id: '3',
    quote: 'Building our hillside luxury villa presented serious geotechnical challenges. The engineering precision and modern architectural flair that John and Albert brought to the table made our dream home a breathtaking reality.',
    quote_ar: 'كان بناء فيلتنا على التضاريس الجبلية تحدياً هندسياً حقيقياً. بفضل الدقة والابتكار المعماري للمهندسين جون وألبرت، تحول منزل أحلامنا إلى تحفة واقعية مذهلة.',
    name: 'Robert Fox',
    name_ar: 'م. روبرت فوكس',
    role: 'Private Villa Investor',
    role_ar: 'مستثمر عقاري ومالك فيلا',
    avatar: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/author-3.jpg',
    rating: 5,
  },
  {
    id: '4',
    quote: 'Skyvilla is in a league of its own. Their commitment to sustainable concrete, smart energy integration, and transparent budgeting has saved our development firm over 18% in total lifecycle expenses.',
    quote_ar: 'سكاي فيلا شركة رائدة بكل المقاييس. التزامهم بالمواد المستدامة والحلول الموفرة للطاقة والشفافية المالية وفر لشركتنا أكثر من 18% في التكاليف التشغيلية للمشروع.',
    name: 'Eleanor Vance',
    name_ar: 'أ. إليانور فانس',
    role: 'Urban Property Developer',
    role_ar: 'مطور عقاري حضري',
    avatar: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/author-4.jpg',
    rating: 5,
  },
];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  title_ar: string;
  date: string;
  date_ar: string;
  category: string;
  category_ar: string;
  image: string;
  author: string;
  author_ar: string;
  excerpt: string;
  excerpt_ar: string;
  content: string[];
  content_ar: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'modern-construction-trends-shaping-urban-living',
    slug: 'modern-construction-trends-shaping-urban-living',
    title: 'Modern Construction Trends Shaping Urban Living',
    title_ar: 'اتجاهات البناء الحديث التي تعيد تشكيل العيش الحضري',
    date: 'January 24, 2026',
    date_ar: '24 يناير 2026',
    category: 'Construction',
    category_ar: 'تقنيات البناء',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/post-1.jpg',
    author: 'Admin',
    author_ar: 'المحرر الهندسي',
    excerpt: 'Discover how parametric facades, modular construction, and smart IoT sensor networks are transforming modern high-rise living environments.',
    excerpt_ar: 'اكتشف كيف تسهم الواجهات البارامترية، والبناء الجاهز عالي الدقة، وأنظمة الاستشعار الذكية في تغيير مفهوم الأبراج والمساكن الحديثة.',
    content: [
      'Urban living is undergoing a generational renaissance driven by digital architecture and rapid fabrication. Modern metropolitan populations demand residences that not only inspire awe visually, but actively enhance well-being and operational efficiency.',
      'Prefabricated post-tensioned steel components and computer-modeled acoustic buffering now allow buildings to be erected up to 40% faster while eliminating common construction defects.',
      'At Skyvilla, our commitment to cutting-edge technology ensures each building represents the pinnacle of modern architectural achievement and longevity.',
    ],
    content_ar: [
      'يشهد العيش الحضري نهضة كبرى تقودها العمارة الرقمية وأساليب التصنيع السريع. تتطلب المجتمعات الحديثة مساكن تجمع بين الإبهار البصري والكفاءة التشغيلية الفائقة.',
      'تتيح الهياكل الفولاذية مسبقة الصنع والعزل الصوتي المحوسب تشييد المباني بسرعة تزيد بنسبة 40% مع تلافي العيوب الإنشائية التقليدية تماماً.',
      'في سكاي فيلا، يضمن التزامنا بأحدث التقنيات أن يمثل كل صرح نبنيه قمة الإنجاز المعماري المعاصر والمتانة الممتدة للأجيال.',
    ],
  },
  {
    id: 'benefits-of-quality-construction-for-long-term-value',
    slug: 'benefits-of-quality-construction-for-long-term-value',
    title: 'Benefits Of Quality Construction For Long-Term Value',
    title_ar: 'فوائد الجودة الإنشائية في تعظيم القيمة الاستثمارية للعقار',
    date: 'January 20, 2026',
    date_ar: '20 يناير 2026',
    category: 'Real Estate',
    category_ar: 'الاستثمار العقاري',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/post-2.jpg',
    author: 'Admin',
    author_ar: 'المحرر الهندسي',
    excerpt: 'Investing in high-grade materials and seismic engineering ensures capital protection, minimized maintenance overhead, and commanding resale values.',
    excerpt_ar: 'إن الاستثمار في مواد البناء الممتازة والحلول الهندسية المتقدمة يضمن حماية رأس المال، وتخفيض تكاليف الصيانة، وتحقيق أعلى عوائد إعادة بيع.',
    content: [
      'When building an enduring landmark or a multi-generational estate, the true cost is determined not by the initial construction budget, but by the thirty-year operational lifecycle.',
      'Superior waterproofing membranes, thermal break glazing, and certified high-strength structural concretes protect asset valuation against inflation and structural decay.',
      'Owners who choose premium construction standards enjoy reduced insurance premiums and strong tenant retention rates across commercial and residential sectors alike.',
    ],
    content_ar: [
      'عند تشييد معلم معماري أو عقار عائلي يدوم لأجيال، فإن التكلفة الحقيقية لا تقاس بميزانية البناء الأولية وحدها، بل بتكلفة دورة حياة العقار على مدى العقود.',
      'تحمي العوازل المائية المتطورة والزجاج العازل والخرسانة عالية الإجهاد قيمة الأصول العقارية من التآكل وعوامل التعرية الجوية.',
      'يحظى ملاك العقارات المنفذة بمعايير فاخرة بتكاليف صيانة وتأمين أقل وقيمة سوقية متصاعدة بشكل مستمر.',
    ],
  },
  {
    id: 'sustainable-building-practices-for-future-ready-spaces',
    slug: 'sustainable-building-practices-for-future-ready-spaces',
    title: 'Sustainable Building Practices For Future Ready Spaces',
    title_ar: 'ممارسات البناء المستدام لتشييد مباني جاهزة للمستقبل',
    date: 'January 15, 2026',
    date_ar: '15 يناير 2026',
    category: 'Architecture',
    category_ar: 'العمارة المستدامة',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/post-3.jpg',
    author: 'Admin',
    author_ar: 'المحرر الهندسي',
    excerpt: 'From low-carbon geopolymer concrete to automated solar shading, discover how eco-friendly engineering elevates occupant wellness.',
    excerpt_ar: 'من الخرسانة منخفضة الكربون إلى كواسر الشمس الذكية المؤتمتة، اكتشف كيف ترتقي الهندسة البيئية بصحة وراحة ساكني المبنى.',
    content: [
      'Sustainability is no longer an optional accolade in modern building design; it is the fundamental cornerstone of responsible development.',
      'By integrating passive solar thermal corridors, geothermal ground-source heat exchanges, and smart rainwater harvesting, contemporary villas achieve near-zero carbon footprints.',
      'Skyvilla leads the industry in designing future-ready architecture that harmonizes uncompromising luxury with rigorous environmental stewardship.',
    ],
    content_ar: [
      'لم تعد الاستدامة خياراً إضافياً في التصميم المعماري الحديث، بل أصبحت الركيزة الأساسية للتطوير المسؤول ذي القيمة العالية.',
      'من خلال دمج ممرات التهوية الطبيعية، والمبادلات الحرارية الجوفية، وأنظمة حصاد مياه الأمطار، تحقق الفلل المعاصرة كفاءة استثنائية في استهلاك الطاقة.',
      'تقود سكاي فيلا قطاع الإنشاءات في تصميم مباني مستقبلية توازن بين أعلى درجات الفخامة وحماية البيئة الطبيعية.',
    ],
  },
];

export interface FAQItem {
  id: string;
  category: string;
  category_ar: string;
  question: string;
  question_ar: string;
  answer: string;
  answer_ar: string;
}

export const faqsData: FAQItem[] = [
  {
    id: '1',
    category: 'General questions',
    category_ar: 'أسئلة عامة',
    question: 'What types of construction projects does Skyvilla specialize in?',
    question_ar: 'ما هي أنواع المشاريع الإنشائية التي تتخصص فيها سكاي فيلا؟',
    answer: 'Skyvilla specializes in luxury residential sky-villas, high-end private residences, commercial grade business parks, modern mixed-use towers, and select specialized industrial logistics facilities.',
    answer_ar: 'تتخصص سكاي فيلا في بناء الفلل السكنية الفارهة، والقصور الخاصة، ومجمعات الأعمال التجارية، والأبراج السكنية المعاصرة، والمرافق اللوجستية والصناعية المتقدمة.',
  },
  {
    id: '2',
    category: 'General questions',
    category_ar: 'أسئلة عامة',
    question: 'How long has Skyvilla been in the construction and real estate industry?',
    question_ar: 'ما هي مدة خبرة سكاي فيلا في قطاع المقاولات والتطوير العقاري؟',
    answer: 'Skyvilla has over 15 years of industry leadership, with more than 5,000 satisfied clients and dozens of award-winning architectural landmarks delivered on time and within budget.',
    answer_ar: 'تمتلك سكاي فيلا خبرة تزيد عن 15 عاماً من الريادة الإنشائية، مع أكثر من 5,000 عميل راضٍ وعشرات المشاريع المعمارية الحائزة على جوائز تم تسليمها في الموعد والميزانية المحددة.',
  },
  {
    id: '3',
    category: 'Planning & design',
    category_ar: 'التخطيط والتصميم',
    question: 'Can you assist with architectural blueprints and municipal permits?',
    question_ar: 'هل تقدمون المساعدة في إعداد المخططات الهندسية واستخراج تراخيص البناء البلدية؟',
    answer: 'Yes, our in-house team of licensed architects and structural engineers handles end-to-end design, 3D BIM visualization, zoning verifications, and permit acquisitions with municipal authorities.',
    answer_ar: 'نعم، يتولى فريقنا الداخلي من المهندسين المعماريين والإنشائيين المعتمدين كافة مراحل التصميم، والنمذجة ثلاثية الأبعاد (BIM)، ومطابقة الكود البلدي واستخراج الرخص الرسمية كاملة.',
  },
  {
    id: '4',
    category: 'Planning & design',
    category_ar: 'التخطيط والتصميم',
    question: 'Do you offer 3D virtual walkthroughs before construction begins?',
    question_ar: 'هل توفرون جولات افتراضية ثلاثية الأبعاد للمشروع قبل بدء البناء الفعلي؟',
    answer: 'Yes! Every project includes interactive 3D Building Information Modeling (BIM) and photorealistic renderings so you can review floor layouts, daylight angles, and material selections before groundbreaking.',
    answer_ar: 'بالتأكيد! يتضمن كل مشروع جولة تفاعلية ثلاثية الأبعاد ونماذج واقعية فائقة الدقة تمكّنك من استعراض توزيع المساحات، وزوايا الإضاءة الطبيعية، وتشطيبات المواد قبل وضع حجر الأساس.',
  },
  {
    id: '5',
    category: 'Construction & execution',
    category_ar: 'البناء والتنفيذ',
    question: 'How do you ensure safety and quality control on active job sites?',
    question_ar: 'كيف تضمنون معايير السلامة والجودة ومراقبة الموقع أثناء العمل؟',
    answer: 'We enforce stringent international ISO-certified safety protocols, conduct daily engineering site audits, employ third-party material batch testing, and provide clients with live drone progress monitoring.',
    answer_ar: 'نطبق معايير سلامة دولية معتمدة بشهادات ISO، ونجري فحوصات هندسية يومية في الموقع، واختبارات معملية دورية لعينات المواد، ونوفر لعملائنا تقارير مصورة بطائرات الدرون لمتابعة مراحل الإنجاز.',
  },
  {
    id: '6',
    category: 'Pricing & payments',
    category_ar: 'الأسعار وجداول الدفعات',
    question: 'What payment schedules and contracts do you offer?',
    question_ar: 'ما هي طبيعة عقود البناء وجداول الدفعات المالية المتاحة؟',
    answer: 'We provide transparent milestone-based payment schedules. Payments are tied strictly to verified progress completions (e.g. foundation, framing, MEP rough-in, lock-up, and turnkey handover) with clear fixed-price contracts.',
    answer_ar: 'نقدم عقوداً واضحة بأسعار ثابتة وجداول دفعات مرتبطة حصراً بنسب الإنجاز الفعلي المحققة والمعتمدة (كالأساسات، الهيكل الإنشائي، التمديدات الكهروميكانيكية، والتشطيب النهائي والتسليم).',
  },
];

export const galleryImages = [
  {
    id: '1',
    category: 'Residential',
    category_ar: 'سكني فاخر',
    title: 'The Vertex Penthouse Suite',
    title_ar: 'جناح بنتهاوس برج ذا فيرتكس',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/gallery-1.jpg',
  },
  {
    id: '2',
    category: 'Commercial',
    category_ar: 'تجاري ذكي',
    title: 'Aurelia Tech Atrium',
    title_ar: 'بهو مجمع أوريليا التكنولوجي',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/gallery-2.jpg',
  },
  {
    id: '3',
    category: 'Residential',
    category_ar: 'سكني فاخر',
    title: 'Cantilevered Villa Deck',
    title_ar: 'شرفة الفيلا المعلقة البانورامية',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/gallery-3.jpg',
  },
  {
    id: '4',
    category: 'Industrial',
    category_ar: 'صناعي متطور',
    title: 'Zenith Logistics Facility',
    title_ar: 'منشأة زينيث اللوجستية الحديثة',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/gallery-4.jpg',
  },
  {
    id: '5',
    category: 'Residential',
    category_ar: 'سكني فاخر',
    title: 'Alpine Minimalist Villa',
    title_ar: 'فيلا جبلية بتصميم معاصر',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/gallery-5.jpg',
  },
  {
    id: '6',
    category: 'Commercial',
    category_ar: 'تجاري وإداري',
    title: 'Riverside Financial Plaza',
    title_ar: 'ساحة ريفرسايد المالية الفاخرة',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/gallery-6.jpg',
  },
];

export const videoGalleryItems = [
  {
    id: '1',
    title: 'Skyvilla Architectural Showcase',
    title_ar: 'العرض المعماري الشامل لشركة سكاي فيلا',
    category: 'Walkthrough',
    category_ar: 'جولة تعريفية',
    youtubeId: 'Y-x0efG1seA',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/why-choose-video-image-metal.jpg',
    duration: '03:45',
  },
  {
    id: '2',
    title: 'The Vertex Plaza Construction Milestones',
    title_ar: 'مراحل تشييد وإنجاز برج ذا فيرتكس بلازا',
    category: 'Documentary',
    category_ar: 'فيلم وثائقي',
    youtubeId: 'Y-x0efG1seA',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/project-image-1.jpg',
    duration: '04:12',
  },
  {
    id: '3',
    title: 'Aurelia Business Park Interior Tour',
    title_ar: 'جولة داخلية في مجمع أوريليا للأعمال',
    category: 'Interior Tour',
    category_ar: 'جولة داخلية',
    youtubeId: 'Y-x0efG1seA',
    image: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/project-image-2.jpg',
    duration: '02:50',
  },
];
