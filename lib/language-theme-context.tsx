'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore, useCallback } from 'react';

export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

interface LanguageThemeContextType {
  language: Language;
  direction: 'rtl' | 'ltr';
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageThemeContext = createContext<LanguageThemeContextType | undefined>(undefined);

// External store subscription helper for cross-tab and local state dispatch
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', callback);
  }
  return () => {
    listeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', callback);
    }
  };
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function getSavedLanguage(): Language {
  if (typeof window === 'undefined') return 'ar';
  try {
    const saved = localStorage.getItem('skyvilla_lang') as Language | null;
    if (saved === 'ar' || saved === 'en') return saved;
  } catch {
    // Ignore
  }
  return 'ar';
}

function getSavedTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem('skyvilla_theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Ignore
  }
  return 'light';
}

export const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.home1': 'الإصدار الأول – الكلاسيكي',
    'nav.home2': 'الإصدار الثاني – السكني الحديث',
    'nav.home3': 'الإصدار الثالث – الفاخر الحديث',
    'nav.about': 'من نحن',
    'nav.services': 'خدماتنا',
    'nav.allServices': 'كافة الخدمات الهندسية',
    'nav.sitePlanning': 'تخطيط المواقع والمخططات',
    'nav.buildingDesign': 'التصميم المعماري والهندسي',
    'nav.projectManagement': 'إدارة وتنفيذ المشاريع',
    'nav.designPlanning': 'التخطيط والدراسات الهندسية',
    'nav.projects': 'مشاريعنا',
    'nav.allProjects': 'معرض المشاريع المنجزة',
    'nav.pages': 'الصفحات',
    'nav.imageGallery': 'معرض الصور',
    'nav.videoGallery': 'جولات الفيديو',
    'nav.pricing': 'خطط وباقات الأسعار',
    'nav.team': 'فريق العمل والخبراء',
    'nav.testimonials': 'آراء العملاء',
    'nav.faqs': 'الأسئلة الشائعة',
    'nav.blog': 'المدونة المعمارية',
    'nav.contact': 'اتصل بنا',
    'nav.getConsultation': 'احجز استشارة مجانية',
    'nav.search': 'بحث...',
    'nav.searchPlaceholder': 'ابحث عن مشاريع، فلل، خدمات، خطط بناء، استشارات...',
    'nav.lightMode': 'الوضع النهاري',
    'nav.darkMode': 'الوضع الليلي',
    'nav.langSwitch': 'English',

    // Hero Section
    'hero.badge': 'مجموعة استثمارية رائدة في العقارات والمقاولات والتكييف',
    'hero.titlePre': 'نشكّل أسلوب الحياة العصري من خلال',
    'hero.titleHighlight': 'التميز والريادة في البناء',
    'hero.description': 'نقدّم أرقى الحلول العقارية والإنشائية المرتكزة على أعلى معايير الجودة والسلامة والاستدامة طويلة الأمد. من الفلل الفارهة إلى الأبراج والمجمعات التجارية، يقود خبراؤنا كل مرحلة بإتقان هندسي متفوق.',
    'hero.cta': 'احجز استشارة مجانية',
    'hero.reviewRating': '1200028472',
    'hero.reviewText': 'رخصة فال المعتمدة من الهيئة العامة للعقار',
    'hero.watchVideo': 'شاهد الفيديو • شاهد الفيديو • شاهد الفيديو •',
    'hero.trustedBuilders': 'مقاولون ومطورون معتمدون',
    'hero.trustedBuildersDesc': 'نمتلك خبرة رائدة في تصميم وتنفيذ الفلل السكنية الفاخرة والمشاريع الكبرى بهندسة معمارية فريدة وجودة استثنائية.',
    'hero.certifiedIntegrity': 'نزاهة هندسية معتمدة',
    'hero.trustedPartners': 'شركاؤكم الموثوقون للبناء',
    'hero.trustedPartnersDesc': 'نرافقكم في كل خطوة من مراحل البناء لضمان الالتزام بالمواعيد والميزانية وأعلى درجات الإتقان.',
    'hero.partnersBanner': 'نبني أرقى المعالم المعمارية بشراكة مع كبرى الشركات العالمية:',

    // Marquee Tickers
    'ticker.solutions': 'حلول عقارية وإنشائية متكاملة بأعلى المعايير العالمية',
    'ticker.servicesLink': 'خدماتنا الهندسية',
    'ticker.reliable': 'تنفيذ مشاريع معمارية مستدامة وتسليم على المفتاح',
    'ticker.contactLink': 'تواصل معنا الآن',
    'ticker.precision': 'دقة هندسية، تصاميم مبتكرة، وضمانات إنشائية ممتدة',
    'ticker.quoteLink': 'اطلب عرض سعر',

    // Hard Group Core Divisions (3 Main Cards)
    'divisions.badge': 'أذرع مجموعة هارد الرئيسية',
    'divisions.titlePre': 'ريادة متكاملة في',
    'divisions.titleHighlight': 'التطوير والمقاولات والخدمات الفنية',
    'divisions.subtitle': 'منظومة عمل متكاملة تقودها كفاءات وطنية ومعايير دولية لتلبية متطلبات السوق السعودي في العقارات والإنشاءات والتبريد',
    'divisions.realEstate.title': 'هارد للعقارات',
    'divisions.realEstate.badge': 'ترخيص فال المعتمد',
    'divisions.realEstate.category': 'الذراع العقاري والاستثماري',
    'divisions.realEstate.desc': 'الذراع العقاري الرائد في المملكة العربية السعودية، متخصص في التسويق والوساطة المعتمدة من الهيئة العامة للعقار (فال)، وإدارة المحافظ الاستثمارية الكبرى في المنطقة الشرقية والرياض.',
    'divisions.realEstate.tag1': 'وساطة وتسويق معتمد (فال)',
    'divisions.realEstate.tag2': 'إدارة المحافظ الاستثمارية الكبرى',
    'divisions.realEstate.tag3': 'تغطية المنطقة الشرقية والرياض',
    'divisions.realEstate.cta': 'استكشف الفرص العقارية',
    'divisions.realEstate.consult': 'طلب وساطة واستشارة',

    'divisions.construction.title': 'هارد للإنشاءات والمقاولات',
    'divisions.construction.badge': 'تصنيف مقاولات فئة أولى',
    'divisions.construction.category': 'الذراع الإنشائي والهندسي',
    'divisions.construction.desc': 'الذراع الإنشائي والهندسي لمجموعة هارد، يقدم خدمات المقاولات العامة المصنفة فئة أولى لتنفيذ الأبراج التجارية، المجمعات السكنية، والمنشآت الذكية بأعلى كفاءة ومعايير كود البناء السعودي.',
    'divisions.construction.tag1': 'مقاولات عامة مصنفة فئة أولى',
    'divisions.construction.tag2': 'معايير كود البناء السعودي (SBC)',
    'divisions.construction.tag3': 'تنفيذ الأبراج والمنشآت الذكية',
    'divisions.construction.cta': 'استعرض المشاريع الإنشائية',
    'divisions.construction.consult': 'طلب عرض سعر مقاولات',

    'divisions.hvac.title': 'هارد لصيانة وتكييف الهواء',
    'divisions.hvac.badge': 'طوارئ واستجابة 24/7',
    'divisions.hvac.category': 'الذراع الكهروميكانيكي والتبريد',
    'divisions.hvac.desc': 'الذراع التخصصي للخدمات الكهروميكانيكية والتبريد، يقدم عقود الصيانة الوقائية (AMC) للشيلرات، أنظمة VRF الحديثة، وتنقية مجاري الهواء مع طوارئ واستجابة فورية على مدار الساعة.',
    'divisions.hvac.tag1': 'عقود الصيانة الوقائية السنوية (AMC)',
    'divisions.hvac.tag2': 'صيانة الشيلرات وأنظمة VRF الحديثة',
    'divisions.hvac.tag3': 'تنقية الهواء وطوارئ 24/7 فورية',
    'divisions.hvac.cta': 'طلب خدمات الصيانة والتكييف',
    'divisions.hvac.consult': 'طلب عقد صيانة وقائية',

    // About Section
    'about.badge': 'عن مجموعة هارد للمقاولات العامة',
    'about.titlePre': 'مؤسسة هارد للمقاولات العامة',
    'about.titleHighlight': 'تساهم في التنمية منذ عام 2004',
    'about.description': 'مؤسسة هارد للمقاولات العامة، تساهم في قطاع الصناعة والبنية التحتية في المملكة العربية السعودية منذ عام 2004 بخدمات إنشائية وعقارية متعددة الأبعاد وموثوقة. بدأت الأنشطة في المنطقة الشرقية وتوسعت لتغطي المنطقتين الوسطى والغربية وفق خطة التطوير الإداري، مع تطبيق الموارد التقنية لتحسين جودة وتنوع الخدمات المقدمة.',
    'about.mission': 'رسالتنا',
    'about.missionDesc': 'إعادة تعريف الهوية المعمارية للمجتمع لتكون مزيجاً متناغماً من العقيدة والثقافة والمعاصرة، وتحويل أحلام الأفراد والمستثمرين إلى واقع ملموس.',
    'about.vision': 'رؤيتنا',
    'about.visionDesc': 'أن نكون المطور الرائد للعقارات الإبداعية والمبتكرة التي تتماشى مع نمط الحياة العصري.',
    'about.btn': 'تعرف علينا أكثر',
    'about.callUs': 'اتصل بنا مباشرة!',
    'about.satisfiedCustomers': 'تأسست عام 2004 بالمملكة',
    'about.positiveRate': 'كود البناء السعودي SBC 100%',
    'about.verifiedTrack': 'مشاريع EPC و LSTK وتسليم المفتاح',

    // Services Section
    'services.badge': 'خدماتنا المتخصصة',
    'services.titlePre': 'المقاولات والتطوير العقاري',
    'services.titleHighlight': 'والصيانة والتشغيل المتكاملة',
    'services.subtitle': 'من إنشاء المباني والمصانع من الأساسات إلى التطوير العقاري والصيانة والتشغيل وشبكات التكييف.',
    'services.viewDetails': 'عرض التفاصيل',

    // Why Choose Us
    'why.badge': 'قيم مجموعة هارد',
    'why.titlePre': 'قيمنا المؤسسية الثلاث:',
    'why.titleHighlight': 'الجودة، الالتزام، والابتكار',
    'why.description': 'نسترشد بثلاث قيم جوهرية توجه كافة أعمالنا في المقاولات والتطوير العقاري والخدمات: 1) الجودة: تقديم خدمات ذات وظائف واستدامة طويلة الأمد تلبي تطلعات عملائنا. 2) الالتزام: الأمانة والوفاء بالالتزامات بصفة مستمرة لعملائنا. 3) الابتكار: إيجاد حلول إسكانية واستثمارية عقارية مبتكرة وخلاقة.',
    'why.qualityTitle': '1. الجودة (Quality)',
    'why.qualityDesc': 'تقديم خدمات ذات وظائف واستدامة طويلة الأمد تلبي تطلعات عملائنا وفق أعلى المواصفات القياسية.',
    'why.expertTitle': '2. الالتزام (Commitment)',
    'why.expertDesc': 'التزام الصدق والأمانة والوفاء بالالتزامات بصفة مستمرة لعملائنا لإنجاز العمل بنجاح تام.',
    'why.watchTour': 'شاهد الجولة',
    'why.videoWalkthrough': 'جولة فيديو شاملة لمشاريعنا',

    // Pricing Section
    'pricing.badge': 'خطط وباقات الأسعار',
    'pricing.titlePre': 'أسعار شفافة وقيمة استثنائية',
    'pricing.titleHighlight': 'مضمونة لكل مشروع',
    'pricing.subtitle': 'نقدم باقات مرونة وشفافة تلائم كافة احتياجات عملائنا، من بناء الفلل الخاصة الفاخرة إلى المشاريع الكبرى متعددة المراحل.',
    'pricing.monthly': 'فوترة شهرية',
    'pricing.annual': 'فوترة سنوية',
    'pricing.save20': 'خصم 20%',
    'pricing.popular': 'الخيار الأكثر طلباً',
    'pricing.perMonth': '/ شهرياً',
    'pricing.included': 'المميزات والخدمات المشمولة:',
    'pricing.getStarted': 'ابدأ الآن',
    'pricing.trial': 'استشارة وتخطيط أولي مجاني',
    'pricing.noHidden': 'بدون أي رسوم خفية أو إضافات غير متفق عليها',
    'pricing.cancelAnytime': 'مرونة كاملة في جداول الدفعات والمراحل',

    // Team Section
    'team.badge': 'فريق العمل والخبراء',
    'team.titlePre': 'نخبة من كبار المهندسين وراء كل',
    'team.titleHighlight': 'مشروع ناجح ومتميز',
    'team.viewAll': 'عرض كافة أعضاء الفريق',

    // Projects Section
    'projects.badge': 'مشاريعنا وإنجازاتنا',
    'projects.titlePre': 'أعمالنا تتحدث عن',
    'projects.titleHighlight': 'الدقة والمتانة والنزاهة المعمارية',
    'projects.all': 'الكل',
    'projects.residential': 'سكني',
    'projects.commercial': 'تجاري',
    'projects.industrial': 'صناعي',
    'projects.infrastructure': 'بنية تحتية',
    'projects.client': 'العميل:',
    'projects.timeline': 'الجدول الزمني:',

    // Skills & Who We Are
    'skills.badge': 'الكفاءات والقدرات الإنشائية',
    'skills.title': 'خبراتنا الهندسية:',
    'skills.desc': 'عقود من الانضباط الهندسي والتنفيذ الدقيق رسخت مكانتنا كقادة في البناء المعماري عالي الأداء.',
    'skills.yearsExp': 'أكثر من 15 عاماً من الخبرة',
    'skills.materials': 'مواد بناء معتمدة ومطابقة للمواصفات الدولية',
    'skills.whoBadge': 'من نحن',
    'skills.whoTitlePre': 'محترفون ذوو خبرة يبنون',
    'skills.whoTitleHighlight': 'بأعلى معايير النزاهة',
    'skills.whoDesc': 'تعكس آراء عملائنا التزامنا الراسخ بجودة الصنعة والتسليم في المواعيد المحددة والشفافية الكاملة في كل مرحلة من مراحل البناء.',
    'skills.contactUs': 'تواصل معنا',

    // Testimonials
    'testimonials.badge': 'شهادات العملاء',
    'testimonials.titlePre': 'تجارب العملاء التي تجسد',
    'testimonials.titleHighlight': 'تميزنا الهندسي والتنفيذي',
    'testimonials.subtitle': 'ما يقوله عملاؤنا عن خدماتنا يعكس التزامنا بجودة التنفيذ والالتزام الدقيق بالمواعيد والتواصل الشفاف.',
    'testimonials.clientsCount': 'أكثر من 1,000 عميل موثوق في جميع أنحاء العالم',

    // Blog
    'blog.badge': 'المدونة العقارية والمعمارية',
    'blog.titlePre': 'أحدث الرؤى والأفكار في عالم',
    'blog.titleHighlight': 'العقارات والإنشاءات الحديثة',
    'blog.viewAll': 'عرض كافة المقالات',
    'blog.readMore': 'اقرأ المزيد',

    // Footer & CTA
    'footer.ctaBadge': 'اكتشف المزيد عن خدماتنا ومشاريعنا التطويرية',
    'footer.ctaTitlePre': 'دعنا نبني معاً مشروعك القادم',
    'footer.ctaTitleHighlight': 'بأعلى درجات الفخامة والإتقان.',
    'footer.ctaDesc': 'سواء كنت تخطط لفيلا أحلامك الخاصة، أو مجمع أعمال تجاري متطور، فإن مهندسينا جاهزون لتحويل فكرتك إلى واقع معماري شامخ.',
    'footer.getQuote': 'اطلب عرض سعر مجاني',
    'footer.callUs': 'اتصل بنا الآن!',
    'footer.emailUs': 'راسلنا عبر البريد!',
    'footer.location': 'المقر الرئيسي',
    'footer.locationVal': '4737 الشارع الثامن عشر - حي الريان، وحدة رقم: 1، الدمام 32256 - 8405',
    'footer.aboutDesc': 'مؤسسة هارد للمقاولات العامة، تساهم في قطاع الصناعة والبنية التحتية بالمملكة منذ عام 2004 بخدمات إنشائية موثوقة ومتعددة الأبعاد.',
    'footer.contractor': 'مؤسسة مقاولات عامة معتمدة',
    'footer.quickLinks': 'روابط سريعة',
    'footer.services': 'خدماتنا',
    'footer.newsletter': 'النشرة البريدية',
    'footer.newsletterDesc': 'اشترك لتصلك أحدث المستجدات الهندسية والتحليلات المعمارية وعروض المشاريع الجديدة.',
    'footer.emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'footer.subscribeSuccess': 'شكراً لاشتراكك في نشرتنا!',
    'footer.emergency': 'متاحون 24/7 للدعم الفني والاستشارات الإنشائية العاجلة',
    'footer.copyright': 'جميع الحقوق محفوظة © 2026 مجموعة هارد للمقاولات العامة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'الشروط والأحكام',
    'footer.support': 'مركز المساعدة والدعم',

    // Consultation Modal
    'modal.title': 'احجز استشارة معمارية مجانية',
    'modal.subtitle': 'تحدث مباشرة مع كبار المهندسين المعماريين ومديري المشاريع.',
    'modal.nameLabel': 'الاسم الكامل *',
    'modal.phoneLabel': 'رقم الهاتف *',
    'modal.emailLabel': 'البريد الإلكتروني *',
    'modal.serviceLabel': 'الخدمة المطلوبة',
    'modal.budgetLabel': 'الميزانية التقديرية',
    'modal.detailsLabel': 'تفاصيل المشروع / الموقع والمساحة',
    'modal.detailsPlaceholder': 'أخبرنا عن نوع الفيلا، مساحة الأرض، أو مواصفات المشروع التجاري...',
    'modal.submit': 'إرسال طلب الاستشارة',
    'modal.successTitle': 'تم استلام طلب الاستشارة بنجاح!',
    'modal.successDesc': 'شكراً لك، سيتواصل معك أحد كبار مهندسينا خلال 24 ساعة لمناقشة كافة التفاصيل.',
    'modal.close': 'إغلاق النافذة',

    // Drawer / Offcanvas
    'drawer.aboutTitle': 'عن مجموعة هارد للمقاولات العامة',
    'drawer.aboutText': 'مؤسسة هارد للمقاولات العامة، تساهم في قطاع الصناعة والبنية التحتية في المملكة منذ عام 2004 بخدمات إنشائية ومدنية وميكانيكية وتطوير عقاري.',
    'drawer.directContact': 'معلومات التواصل المباشر',
    'drawer.hours': 'السبت - الخميس: 9:00 ص - 6:00 م',
    'drawer.viewProjects': 'تصفح المشاريع',
    'drawer.viewPricing': 'خطط الأسعار',
    'drawer.connect': 'تابعنا على المنصات:',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.home1': 'Home Version – 1',
    'nav.home2': 'Home Version – 2',
    'nav.home3': 'Home Version – 3',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.allServices': 'All Services',
    'nav.sitePlanning': 'Site Planning',
    'nav.buildingDesign': 'Building Design',
    'nav.projectManagement': 'Project Management',
    'nav.designPlanning': 'Design & Planning',
    'nav.projects': 'Projects',
    'nav.allProjects': 'All Projects Portfolio',
    'nav.pages': 'Pages',
    'nav.imageGallery': 'Image Gallery',
    'nav.videoGallery': 'Video Gallery',
    'nav.pricing': 'Pricing Plan',
    'nav.team': 'Our Team',
    'nav.testimonials': 'Testimonials',
    'nav.faqs': 'FAQs',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact Us',
    'nav.getConsultation': 'Get Free Consultation',
    'nav.search': 'Search...',
    'nav.searchPlaceholder': 'Search villas, services, projects, plans, blueprints...',
    'nav.lightMode': 'Light Mode',
    'nav.darkMode': 'Dark Mode',
    'nav.langSwitch': 'العربية',

    // Hero Section
    'hero.badge': 'Licensed Real Estate • Class-1 Contracting • HVAC Facilities',
    'hero.titlePre': 'Shaping modern living through',
    'hero.titleHighlight': 'construction excellence',
    'hero.description': 'We deliver reliable real estate and construction solutions focused on quality, safety, and long-term value. From residential homes to commercial developments, our experienced team manages every stage.',
    'hero.cta': 'Get Free Consultation',
    'hero.reviewRating': '1200028472',
    'hero.reviewText': 'Certified Real Estate General Authority (FAL)',
    'hero.watchVideo': 'Watch Video • Watch Video • Watch Video •',
    'hero.trustedBuilders': 'Trusted Builders',
    'hero.trustedBuildersDesc': 'We are experienced builders and developers known for premium quality, structural resilience, and architectural distinction.',
    'hero.certifiedIntegrity': 'Certified Integrity',
    'hero.trustedPartners': 'Your Trusted Partners',
    'hero.trustedPartnersDesc': 'We stand by you at every stage of the construction journey, delivering reliability and lifetime value.',
    'hero.partnersBanner': 'Powering world-class architectural developments with leading industry partners:',

    // Marquee Tickers
    'ticker.solutions': 'Complete Real Estate And Construction Solutions',
    'ticker.servicesLink': 'Our Services',
    'ticker.reliable': 'Delivery Reliable Real Estate & Engineering Solutions',
    'ticker.contactLink': 'Contact Us',
    'ticker.precision': 'Precision Structural Engineering & Architectural Design',
    'ticker.quoteLink': 'Get Free Quote',

    // Hard Group Core Divisions (3 Main Cards)
    'divisions.badge': 'Hard Group Core Divisions',
    'divisions.titlePre': 'Integrated Leadership in',
    'divisions.titleHighlight': 'Real Estate, Construction & Specialized Services',
    'divisions.subtitle': 'A unified engineering and operational ecosystem meeting supreme Saudi market standards across development, execution, and cooling',
    'divisions.realEstate.title': 'Hard Real Estate',
    'divisions.realEstate.badge': 'Licensed (VAL)',
    'divisions.realEstate.category': 'Real Estate & Investment Arm',
    'divisions.realEstate.desc': 'The leading real estate arm in the Kingdom of Saudi Arabia, specializing in marketing and brokerage licensed by the Real Estate General Authority (VAL), and managing major investment portfolios across the Eastern Province and Riyadh.',
    'divisions.realEstate.tag1': 'Certified Brokerage (VAL License)',
    'divisions.realEstate.tag2': 'Major Portfolio Management',
    'divisions.realEstate.tag3': 'Eastern Province & Riyadh Coverage',
    'divisions.realEstate.cta': 'Explore Real Estate Opportunities',
    'divisions.realEstate.consult': 'Request Brokerage & Advisory',

    'divisions.construction.title': 'Hard Construction & Contracting',
    'divisions.construction.badge': 'Class 1 Contracting',
    'divisions.construction.category': 'Construction & Engineering Arm',
    'divisions.construction.desc': 'The construction and engineering arm of Hard Group, delivering Class-1 classified general contracting services for commercial towers, residential complexes, and smart facilities with supreme efficiency and Saudi Building Code standards.',
    'divisions.construction.tag1': 'Class-1 General Contracting',
    'divisions.construction.tag2': 'Saudi Building Code (SBC) Standards',
    'divisions.construction.tag3': 'Commercial Towers & Smart Facilities',
    'divisions.construction.cta': 'View Construction Projects',
    'divisions.construction.consult': 'Request Contracting Quote',

    'divisions.hvac.title': 'Hard HVAC & Maintenance',
    'divisions.hvac.badge': '24/7 Rapid Response',
    'divisions.hvac.category': 'Electromechanical & Cooling Arm',
    'divisions.hvac.desc': 'The specialized arm for electromechanical and refrigeration services, offering preventive maintenance contracts (AMC) for chillers, modern VRF systems, and air duct purification with 24/7 emergency response.',
    'divisions.hvac.tag1': 'Annual Preventive Maintenance (AMC)',
    'divisions.hvac.tag2': 'Industrial Chillers & Modern VRF Systems',
    'divisions.hvac.tag3': 'Air Duct Sanitation & 24/7 Emergency',
    'divisions.hvac.cta': 'Request HVAC Services',
    'divisions.hvac.consult': 'Request Maintenance Contract',

    // About Section
    'about.badge': 'About HARD Group',
    'about.titlePre': 'HARD General Contracting Establishment',
    'about.titleHighlight': 'Contributing Since 2004',
    'about.description': 'HARD General Contracting Establishment has been contributing to Saudi Arabia\'s industrial and infrastructure sector since 2004 with reliable, multi-dimensional construction services. The activities started in Eastern Province and was expanded to cover Central and Western Provinces as per management development policy. Technology resources were implemented to improve quality and diversity of rendered services.',
    'about.mission': 'Our Mission',
    'about.missionDesc': 'Redefine the architectural identity of society to be combination of belief, culture and modernism and bring individuals and investors\' dreams into reality.',
    'about.vision': 'Our Vision',
    'about.visionDesc': 'To be the premier developer of creative and innovative properties and go in line with modern lifestyle.',
    'about.btn': 'Learn More About Us',
    'about.callUs': 'Call Us Directly!',
    'about.satisfiedCustomers': 'Established in KSA Since 2004',
    'about.positiveRate': '100% Quality Assurance Standard',
    'about.verifiedTrack': 'LSTK, EPC & LSPB Turnkey Execution',

    // Services Section
    'services.badge': 'Our Capabilities',
    'services.titlePre': 'Construction, Real Estate Development',
    'services.titleHighlight': '& Integrated Maintenance Services',
    'services.subtitle': 'From grass-root building and plant construction to residential housing development and pioneer HVAC partnerships.',
    'services.viewDetails': 'View Details',

    // Why Choose Us
    'why.badge': 'HARD Group Values',
    'why.titlePre': 'Our Three Core Values:',
    'why.titleHighlight': 'Quality, Commitment & Innovation',
    'why.description': '1) QUALITY: Provide services of long lasting functions that meet our clients aspirations. 2) COMMITMENT: Undertake honesty and fulfillment of obligations constantly to our customers. 3) INNOVATION: Promote creative and innovative housing and real estate investment solutions.',
    'why.qualityTitle': '1. QUALITY',
    'why.qualityDesc': 'Provide services of long lasting functions that meet our clients aspirations and universal standards.',
    'why.expertTitle': '2. COMMITMENT',
    'why.expertDesc': 'Undertake honesty and fulfillment of obligations constantly to our customers to achieve goals and complete work successfully.',
    'why.watchTour': 'Watch Tour',
    'why.videoWalkthrough': 'Full Video Walkthrough',

    // Pricing Section
    'pricing.badge': 'Our Pricing Plan',
    'pricing.titlePre': 'Transparent pricing, exceptional',
    'pricing.titleHighlight': 'value guaranteed',
    'pricing.subtitle': 'We offer transparent & flexible pricing plans to meet the needs of every client, from private luxury builds to multi-stage developments.',
    'pricing.monthly': 'Monthly Billing',
    'pricing.annual': 'Annual Billing',
    'pricing.save20': 'Save 20%',
    'pricing.popular': 'Most Popular Choice',
    'pricing.perMonth': '/Per Month',
    'pricing.included': 'What Included Feature:',
    'pricing.getStarted': 'Get Started',
    'pricing.trial': 'Get 30 day free consultation',
    'pricing.noHidden': 'No any hidden fee pay',
    'pricing.cancelAnytime': 'You can cancel or adjust anytime',

    // Team Section
    'team.badge': 'Our Team',
    'team.titlePre': 'Skilled professionals behind every',
    'team.titleHighlight': 'successful project',
    'team.viewAll': 'View All Team Members',

    // Projects Section
    'projects.badge': 'Our Projects',
    'projects.titlePre': 'Our work defined by precision',
    'projects.titleHighlight': 'strength and integrity',
    'projects.all': 'All',
    'projects.residential': 'Residential',
    'projects.commercial': 'Commercial',
    'projects.industrial': 'Industrial',
    'projects.infrastructure': 'Infrastructure',
    'projects.client': 'Client:',
    'projects.timeline': 'Timeline:',

    // Skills & Who We Are
    'skills.badge': 'Core Competencies',
    'skills.title': 'Our Skills:',
    'skills.desc': 'Decades of engineering rigor and meticulous execution have cemented our status as high-performance development leaders.',
    'skills.yearsExp': '15+ Years Industry Experience',
    'skills.materials': 'Certified High-Quality Materials',
    'skills.whoBadge': 'Who We Are',
    'skills.whoTitlePre': 'Experienced professionals building',
    'skills.whoTitleHighlight': 'with integrity',
    'skills.whoDesc': 'What our clients say about our construction services reflects our commitment to quality workmanship, timely project delivery, and transparent communication throughout the entire lifecycle.',
    'skills.contactUs': 'Contact Us',

    // Testimonials
    'testimonials.badge': 'Our Testimonials',
    'testimonials.titlePre': 'Client experiences that reflect',
    'testimonials.titleHighlight': 'our excellence',
    'testimonials.subtitle': 'What our clients say about our construction services reflects our commitment to quality workmanship, timely project delivery, and transparent communication.',
    'testimonials.clientsCount': '1000+ Trusted Clients Worldwide',

    // Blog
    'blog.badge': 'Latest Blog',
    'blog.titlePre': 'Latest insights from real',
    'blog.titleHighlight': 'estate and construction',
    'blog.viewAll': 'View All Articles',
    'blog.readMore': 'Read More',

    // Footer & CTA
    'footer.ctaBadge': 'Explore more about our construction & developments',
    'footer.ctaTitlePre': "Let's make something great work",
    'footer.ctaTitleHighlight': 'together.',
    'footer.ctaDesc': 'Whether you envision a private architectural villa, commercial hub, or high-throughput facility, our engineers are ready to build your legacy.',
    'footer.getQuote': 'Get Free Quote',
    'footer.callUs': 'Call Us Now!',
    'footer.emailUs': 'E-mail Us Now!',
    'footer.location': 'Location Headquarter',
    'footer.locationVal': '4737 18th - Al-Rayyan, Unit No.: 1, Dammam 32256 - 8405, Kingdom of Saudi Arabia',
    'footer.aboutDesc': 'HARD General Contracting Establishment, contributing to Saudi Arabia industrial and infrastructure sector since 2004 with reliable, multi-dimensional construction services.',
    'footer.contractor': 'Certified Building Contractor',
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Our Services',
    'footer.newsletter': 'Subscribe Newsletter',
    'footer.newsletterDesc': 'Subscribe to receive the latest updates, architectural insights, and project news directly in your inbox.',
    'footer.emailPlaceholder': 'Enter your email address',
    'footer.subscribeSuccess': 'Thank you for subscribing!',
    'footer.emergency': 'Available 24/7 for Emergency Project Support',
    'footer.copyright': 'HARD Group © 2026 All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.support': 'Support',

    // Consultation Modal
    'modal.title': 'Get Free Consultation',
    'modal.subtitle': 'Speak directly with our senior architectural & engineering leads.',
    'modal.nameLabel': 'Your Full Name *',
    'modal.phoneLabel': 'Phone Number *',
    'modal.emailLabel': 'Email Address *',
    'modal.serviceLabel': 'Service Interested',
    'modal.budgetLabel': 'Estimated Budget',
    'modal.detailsLabel': 'Project Details / Location',
    'modal.detailsPlaceholder': 'Tell us about your villa, site dimensions, or commercial building vision...',
    'modal.submit': 'Submit Consultation Request',
    'modal.successTitle': 'Consultation Request Received!',
    'modal.successDesc': 'Thank you! Our senior construction engineer will review your project details and contact you within 24 hours.',
    'modal.close': 'Close Window',

    // Drawer / Offcanvas
    'drawer.aboutTitle': 'About HARD Group',
    'drawer.aboutText': 'HARD General Contracting Establishment has been contributing to Saudi Arabia industrial and infrastructure sector since 2004 with reliable, multi-dimensional construction services.',
    'drawer.directContact': 'Direct Contact',
    'drawer.hours': 'Mon - Sat: 9:00 AM - 6:00 PM',
    'drawer.viewProjects': 'View Projects',
    'drawer.viewPricing': 'Pricing Plans',
    'drawer.connect': 'Connect with us:',
  },
};

export function LanguageThemeProvider({ children }: { children: React.ReactNode }) {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Use React's useSyncExternalStore for hydration-safe external storage synchronization
  const rawLanguage = useSyncExternalStore(
    subscribe,
    getSavedLanguage,
    () => 'ar' as Language
  );

  const rawTheme = useSyncExternalStore(
    subscribe,
    getSavedTheme,
    () => 'light' as Theme
  );

  const language = isMounted ? rawLanguage : 'ar';
  const theme = isMounted ? rawTheme : 'light';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', language);

      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    }
  }, [language, theme]);

  const setLanguage = useCallback((lang: Language) => {
    try {
      localStorage.setItem('skyvilla_lang', lang);
      notifyListeners();
    } catch {
      // Ignore
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    try {
      const nextLang = language === 'ar' ? 'en' : 'ar';
      localStorage.setItem('skyvilla_lang', nextLang);
      notifyListeners();
    } catch {
      // Ignore
    }
  }, [language]);

  const setTheme = useCallback((t: Theme) => {
    try {
      localStorage.setItem('skyvilla_theme', t);
      notifyListeners();
    } catch {
      // Ignore
    }
  }, []);

  const toggleTheme = useCallback(() => {
    try {
      const nextTheme = theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('skyvilla_theme', nextTheme);
      notifyListeners();
    } catch {
      // Ignore
    }
  }, [theme]);

  const t = useCallback((key: string, fallback?: string): string => {
    const dict = translations[language];
    if (dict && dict[key]) {
      return dict[key];
    }
    const fallbackDict = translations.en;
    if (fallbackDict && fallbackDict[key]) {
      return fallbackDict[key];
    }
    return fallback || key;
  }, [language]);

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageThemeContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        t,
      }}
    >
      <div
        dir={direction}
        className={`${language === 'ar' ? 'font-cairo' : 'font-sans'} min-h-screen transition-colors duration-300 ${
          theme === 'dark' ? 'bg-[#040618] text-white' : 'bg-[#f8fafc] text-[#0f172a]'
        }`}
      >
        {children}
      </div>
    </LanguageThemeContext.Provider>
  );
}

export function useLanguageTheme() {
  const context = useContext(LanguageThemeContext);
  if (!context) {
    return {
      language: 'ar' as Language,
      direction: 'rtl' as 'rtl' | 'ltr',
      setLanguage: () => {},
      toggleLanguage: () => {},
      theme: 'dark' as Theme,
      setTheme: () => {},
      toggleTheme: () => {},
      t: (key: string, fallback?: string) => translations['ar']?.[key] || fallback || key,
    };
  }
  return context;
}
