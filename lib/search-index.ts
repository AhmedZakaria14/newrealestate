import {
  servicesData,
  projectsData,
  faqsData,
  teamMembers,
  blogPosts,
  galleryImages,
  videoGalleryItems,
} from '@/data/skyvilla-data';
import { hardConstructionServices, hardConstructionProjects } from '@/data/construction-data';
import { realEstateListings } from '@/data/listings-data';
import { referenceProperties } from '@/data/reference-data';

export type SearchCategory =
  | 'all'
  | 'sectors'
  | 'services'
  | 'projects'
  | 'properties'
  | 'team'
  | 'blog'
  | 'faqs'
  | 'pages';

export interface SearchResultItem {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  href: string;
  category: SearchCategory;
  categoryLabelAr: string;
  categoryLabelEn: string;
  badgeAr?: string;
  badgeEn?: string;
  image?: string;
  keywords: string[];
}

export function getAllSearchableItems(): SearchResultItem[] {
  const items: SearchResultItem[] = [];

  // 1. Standalone Core Pages & Portals
  items.push(
    {
      id: 'page-home',
      titleAr: 'الصفحة الرئيسية - مجموعة هارد',
      titleEn: 'Homepage - HARD Group',
      subtitleAr: 'الريادة في التشييد الهندسي، التطوير العقاري، وإدارة الأصول منذ 2004',
      subtitleEn: 'Pioneering construction, real estate development, and assets management since 2004',
      href: '/',
      category: 'pages',
      categoryLabelAr: 'الصفحات',
      categoryLabelEn: 'Pages',
      badgeAr: 'الرئيسية',
      badgeEn: 'Home',
      keywords: ['home', 'الرئيسية', 'مجموعة هارد', 'hard group', 'استثمار', 'بناء'],
    },
    {
      id: 'sector-realestate',
      titleAr: 'هارد للعقارات والاستثمار (رخصة فال 1200028472)',
      titleEn: 'HARD Real Estate & Investment (VAL Licensed)',
      subtitleAr: 'الوساطة العقارية المعتمدة، تسويق المخططات والقصور، وإدارة المحافظ',
      subtitleEn: 'Certified brokerage, luxury estates, compounds and portfolio management',
      href: '/realestate',
      category: 'sectors',
      categoryLabelAr: 'القطاعات',
      categoryLabelEn: 'Sectors',
      badgeAr: 'رخصة فال',
      badgeEn: 'VAL Licensed',
      image: '/images/hardgp/por4-big.jpg',
      keywords: ['عقارات', 'فال', 'تسويق عقاري', 'وساطة', 'أراضي', 'فلل', 'شقق', 'real estate', 'val', 'brokerage'],
    },
    {
      id: 'sector-construction',
      titleAr: 'هارد للإنشاءات والمقاولات العامة (كود SBC)',
      titleEn: 'HARD Construction & Contracting (SBC Code)',
      subtitleAr: 'مقاولات عامة فئة أولى، تنفيذ الأبراج، المنشآت الصناعية والمشاريع الذكية',
      subtitleEn: 'Class-1 general contracting, commercial towers, plants & smart builds',
      href: '/construction',
      category: 'sectors',
      categoryLabelAr: 'القطاعات',
      categoryLabelEn: 'Sectors',
      badgeAr: 'فئة أولى SBC',
      badgeEn: 'Class-1 SBC',
      image: '/images/hardgp/por1-big.jpg',
      keywords: ['مقاولات', 'بناء', 'إنشاءات', 'كود البناء السعودي', 'sbc', 'خرسانة', 'أبراج', 'construction', 'contracting'],
    },
    {
      id: 'sector-hvac',
      titleAr: 'هارد لصيانة وتكييف الهواء والتشغيل (طوارئ 24/7)',
      titleEn: 'HARD HVAC & Facilities Maintenance (24/7 Response)',
      subtitleAr: 'عقود صيانة الشيلرات المركزية، أنظمة VRF، وتنقية مجاري الهواء',
      subtitleEn: 'Annual maintenance contracts (AMC), central chillers & VRF climate systems',
      href: '/hvac',
      category: 'sectors',
      categoryLabelAr: 'القطاعات',
      categoryLabelEn: 'Sectors',
      badgeAr: 'عقود AMC',
      badgeEn: 'AMC 24/7',
      image: '/images/hardgp/slide-12.jpg',
      keywords: ['تكييف', 'صيانة', 'تبريد', 'شيلر', 'vrf', 'الزامل', 'دايكن', 'hvac', 'maintenance', 'chiller', 'amc'],
    },
    {
      id: 'page-listings',
      titleAr: 'العقارات والصفقات المتاحة للبيع والاستثمار',
      titleEn: 'Verified Real Estate Listings & Properties',
      subtitleAr: 'قصور، فلل عصرية، أراضٍ تجارية ومجمعات سكنية بالشرقية والرياض',
      subtitleEn: 'Villas, penthouses, commercial lands and compounds in KSA',
      href: '/listings',
      category: 'properties',
      categoryLabelAr: 'العقارات',
      categoryLabelEn: 'Properties',
      badgeAr: 'معتمد فال',
      badgeEn: 'VAL Verified',
      keywords: ['عقارات', 'فلل للبيع', 'شراء عقار', 'أراضي للبيع', 'قصور', 'listings', 'villas', 'lands'],
    },
    {
      id: 'page-projects',
      titleAr: 'المشاريع الاستراتيجية وسجل الإنجازات',
      titleEn: 'Master Strategic Projects & Portfolio',
      subtitleAr: 'استعراض الصروح المعمارية، الأبراج التجارية، والمجمعات الصناعية المنفذة',
      subtitleEn: 'Explore completed landmark towers, residential complexes & infrastructure',
      href: '/projects',
      category: 'projects',
      categoryLabelAr: 'المشاريع',
      categoryLabelEn: 'Projects',
      badgeAr: 'سجل الأعمال',
      badgeEn: 'Portfolio',
      keywords: ['مشاريع', 'أبراج', 'أعمال سابقة', 'إنجازات', 'projects', 'portfolio', 'completed'],
    },
    {
      id: 'page-services',
      titleAr: 'منظومة الخدمات الهندسية والاستثمارية المتكاملة',
      titleEn: 'Comprehensive Integrated Services Matrix',
      subtitleAr: 'استشارات، تسويق، إنشاءات، صيانة، وتوزيع وكالات معتمدة',
      subtitleEn: 'Civil construction, brokerage, bank funding, HVAC and authorized agencies',
      href: '/services',
      category: 'services',
      categoryLabelAr: 'الخدمات',
      categoryLabelEn: 'Services',
      badgeAr: 'كافة الخدمات',
      badgeEn: 'All Services',
      keywords: ['خدمات', 'استشارات', 'تسويق', 'تمويل بنكي', 'وكالات', 'services'],
    },
    {
      id: 'page-calculator',
      titleAr: 'حاسبة تكاليف وميزانيات المشاريع الإنشائية',
      titleEn: 'Interactive Project Cost & BOQ Calculator',
      subtitleAr: 'تقدير فوري لتكاليف العظم، التشطيب، تسليم المفتاح والمخططات',
      subtitleEn: 'Instant estimation for structural, finishing, and turnkey construction budgets',
      href: '/construction#calculator',
      category: 'services',
      categoryLabelAr: 'الخدمات',
      categoryLabelEn: 'Services',
      badgeAr: 'حاسبة فورية',
      badgeEn: 'Calculator',
      keywords: ['حاسبة', 'تكلفة البناء', 'تسعير', 'حساب متر البناء', 'calculator', 'cost', 'estimate', 'boq'],
    },
    {
      id: 'page-gallery',
      titleAr: 'معرض الصور المعمارية والمشاريع',
      titleEn: 'Architectural Image Gallery',
      subtitleAr: 'معرض بصري عالي الدقة يبرز الفلل، الواجهات، وتفاصيل التشطيب الإنشائي',
      subtitleEn: 'High-resolution visual showcase of completed towers, villas and atriums',
      href: '/image-gallery',
      category: 'pages',
      categoryLabelAr: 'الصفحات',
      categoryLabelEn: 'Pages',
      badgeAr: 'معرض الصور',
      badgeEn: 'Gallery',
      keywords: ['صور', 'معرض', 'لقطات', 'تصاميم', 'gallery', 'photos', 'architecture'],
    },
    {
      id: 'page-video-gallery',
      titleAr: 'معرض الفيديو والتوثيق الميداني',
      titleEn: 'Cinematic Video Walkthroughs Gallery',
      subtitleAr: 'جولات معمارية ولقطات درون توثق مراحل التشييد والإنجاز',
      subtitleEn: 'Drone footage, walkthroughs and construction milestone videos',
      href: '/video-gallery',
      category: 'pages',
      categoryLabelAr: 'الصفحات',
      categoryLabelEn: 'Pages',
      badgeAr: 'فيديو',
      badgeEn: 'Videos',
      keywords: ['فيديو', 'درون', 'توثيق', 'جولة', 'video', 'walkthrough'],
    },
    {
      id: 'page-our-team',
      titleAr: 'فريق العمل والقيادات الهندسية',
      titleEn: 'Executive Leadership & Engineering Team',
      subtitleAr: 'نخبة من كبار المعماريين، المهندسين المدنيين، ومديري المشاريع',
      subtitleEn: 'Master builders, civil engineers, architects and project managers',
      href: '/our-team',
      category: 'team',
      categoryLabelAr: 'فريق العمل',
      categoryLabelEn: 'Team',
      badgeAr: 'الكوادر',
      badgeEn: 'Leadership',
      keywords: ['فريق العمل', 'مهندسين', 'إدارة', 'هشام الدوسري', 'team', 'engineers', 'management'],
    },
    {
      id: 'page-blog',
      titleAr: 'المركز الإعلامي والتقارير الهندسية',
      titleEn: 'Engineering Blog & Market Insights',
      subtitleAr: 'رؤى متخصصة، كود البناء السعودي، وتوجيهات الاستثمار العقاري',
      subtitleEn: 'Expert analysis, Saudi Building Code insights, and real estate market trends',
      href: '/blog',
      category: 'blog',
      categoryLabelAr: 'المقالات',
      categoryLabelEn: 'Blog',
      badgeAr: 'مقالات',
      badgeEn: 'Insights',
      keywords: ['أخبار', 'مقالات', 'رؤية 2030', 'تقارير', 'blog', 'news', 'articles'],
    },
    {
      id: 'page-testimonials',
      titleAr: 'آراء وشهادات العملاء والمستثمرين',
      titleEn: 'Client Testimonials & Endorsements',
      subtitleAr: 'تجارب موثقة من ملاك الفلل، المطورين، والشركات الشريكة',
      subtitleEn: 'Verified feedback from homeowners and corporate partners',
      href: '/testimonials',
      category: 'pages',
      categoryLabelAr: 'الصفحات',
      categoryLabelEn: 'Pages',
      badgeAr: 'آراء العملاء',
      badgeEn: 'Reviews',
      keywords: ['آراء', 'تقييمات', 'شهادات', 'عملاء', 'testimonials', 'reviews'],
    },
    {
      id: 'page-pricing',
      titleAr: 'دراسات التسعير وجداول الكميات المعتمدة',
      titleEn: 'Valuation & Project Estimation Plans',
      subtitleAr: 'دراسات تكلفة دقيقة وجداول كميات BOQ بدون أي رسوم خفية',
      subtitleEn: 'Precision engineering estimates and BOQ tailored to your asset',
      href: '/pricing-plan',
      category: 'services',
      categoryLabelAr: 'الخدمات',
      categoryLabelEn: 'Services',
      badgeAr: 'التسعير',
      badgeEn: 'Pricing',
      keywords: ['أسعار', 'تسعير', 'تكلفة', 'باقات', 'pricing', 'valuation', 'estimate'],
    },
    {
      id: 'page-faqs',
      titleAr: 'الأسئلة الشائعة والإجابات الهندسية',
      titleEn: 'Frequently Asked Questions (FAQs)',
      subtitleAr: 'إجابات واضحة حول مراحل البناء، كود SBC، رخص فال، والضمانات',
      subtitleEn: 'Clear answers on timelines, Saudi Building Code, contracts and warranties',
      href: '/faqs',
      category: 'faqs',
      categoryLabelAr: 'الأسئلة الشائعة',
      categoryLabelEn: 'FAQs',
      badgeAr: 'إجابات فورية',
      badgeEn: 'FAQs',
      keywords: ['أسئلة', 'استفسارات', 'ضمانات', 'شروط', 'faqs', 'questions', 'answers'],
    },
    {
      id: 'page-contact',
      titleAr: 'اتصل بنا وفروع المجموعة (الخبر، الدمام، الرياض)',
      titleEn: 'Contact Us & Corporate Branches',
      subtitleAr: 'الرقم الموحد: 0138004273 • طوارئ التكييف: 0556125711',
      subtitleEn: 'Hotline: +966 13 800 4273 • 24/7 HVAC Emergency: +966 55 612 5711',
      href: '/contact-us',
      category: 'pages',
      categoryLabelAr: 'الصفحات',
      categoryLabelEn: 'Pages',
      badgeAr: 'تواصل مباشر',
      badgeEn: 'Contact',
      keywords: ['اتصل بنا', 'هاتف', 'فرع الخبر', 'فرع الدمام', 'فرع الرياض', 'contact', 'phone', 'location'],
    }
  );

  // 2. Index All Services from servicesData & hardConstructionServices
  servicesData.forEach((srv) => {
    items.push({
      id: `srv-${srv.id}`,
      titleAr: srv.title_ar,
      titleEn: srv.title,
      subtitleAr: srv.description_ar,
      subtitleEn: srv.description,
      href: `/services#${srv.slug}`,
      category: 'services',
      categoryLabelAr: 'الخدمات',
      categoryLabelEn: 'Services',
      badgeAr: `خدمة #${srv.number}`,
      badgeEn: `Service #${srv.number}`,
      image: srv.image,
      keywords: [
        srv.title_ar,
        srv.title,
        ...(srv.features_ar || []),
        ...(srv.features || []),
        'خدمات',
        'service',
      ],
    });
  });

  // 3. Index All Projects from projectsData
  projectsData.forEach((prj) => {
    items.push({
      id: `prj-${prj.id}`,
      titleAr: prj.title_ar,
      titleEn: prj.title,
      subtitleAr: `${prj.location_ar} • ${prj.excerpt_ar}`,
      subtitleEn: `${prj.location} • ${prj.excerpt}`,
      href: `/projects`,
      category: 'projects',
      categoryLabelAr: 'المشاريع',
      categoryLabelEn: 'Projects',
      badgeAr: prj.category_ar,
      badgeEn: prj.category,
      image: prj.image,
      keywords: [
        prj.title_ar,
        prj.title,
        prj.location_ar,
        prj.location,
        prj.client_ar,
        prj.client,
        'مشروع',
        'project',
      ],
    });
  });

  // 4. Index All Real Estate Listings
  realEstateListings.forEach((prop) => {
    items.push({
      id: `prop-${prop.id}`,
      titleAr: prop.titleAr,
      titleEn: prop.titleEn,
      subtitleAr: `${prop.cityNameAr} - ${prop.districtAr} • ${prop.price}`,
      subtitleEn: `${prop.cityNameEn} - ${prop.districtEn} • ${prop.price}`,
      href: `/listings/${prop.id}`,
      category: 'properties',
      categoryLabelAr: 'العقارات',
      categoryLabelEn: 'Properties',
      badgeAr: prop.typeNameAr,
      badgeEn: prop.typeNameEn,
      image: prop.image || (prop.gallery && prop.gallery[0]) || '/images/hardgp/por4-big.jpg',
      keywords: [
        prop.titleAr,
        prop.titleEn,
        prop.cityNameAr,
        prop.cityNameEn,
        prop.districtAr,
        prop.districtEn,
        prop.typeNameAr,
        prop.typeNameEn,
        'عقار',
        'فيلا',
        'قصر',
        'listing',
        'property',
      ],
    });
  });

  // 5. Index Team Members
  teamMembers.forEach((member) => {
    items.push({
      id: `team-${member.id}`,
      titleAr: member.name_ar,
      titleEn: member.name,
      subtitleAr: member.role_ar,
      subtitleEn: member.role,
      href: '/our-team',
      category: 'team',
      categoryLabelAr: 'فريق العمل',
      categoryLabelEn: 'Team',
      badgeAr: 'كادر تنفيذي',
      badgeEn: 'Executive',
      image: member.image,
      keywords: [member.name_ar, member.name, member.role_ar, member.role, 'فريق', 'مهندس', 'team'],
    });
  });

  // 6. Index FAQs
  faqsData.forEach((faq) => {
    items.push({
      id: `faq-${faq.id}`,
      titleAr: faq.question_ar,
      titleEn: faq.question,
      subtitleAr: faq.answer_ar,
      subtitleEn: faq.answer,
      href: '/faqs',
      category: 'faqs',
      categoryLabelAr: 'الأسئلة الشائعة',
      categoryLabelEn: 'FAQs',
      badgeAr: faq.category_ar || 'سؤال وجواب',
      badgeEn: faq.category || 'Q&A',
      keywords: [faq.question_ar, faq.question, faq.answer_ar, faq.answer, 'سؤال', 'جواب', 'faq'],
    });
  });

  // 7. Index Blog Posts
  blogPosts.forEach((post) => {
    items.push({
      id: `blog-${post.id}`,
      titleAr: post.title_ar,
      titleEn: post.title,
      subtitleAr: post.excerpt_ar,
      subtitleEn: post.excerpt,
      href: `/blog/${post.slug}`,
      category: 'blog',
      categoryLabelAr: 'المقالات',
      categoryLabelEn: 'Blog',
      badgeAr: post.category_ar,
      badgeEn: post.category,
      image: post.image,
      keywords: [post.title_ar, post.title, post.excerpt_ar, post.excerpt, 'مقال', 'خبر', 'blog'],
    });
  });

  return items;
}

export function searchSite(
  query: string,
  category: SearchCategory = 'all',
  language: 'ar' | 'en' = 'ar'
): SearchResultItem[] {
  const allItems = getAllSearchableItems();
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    if (category === 'all') return allItems.slice(0, 10);
    return allItems.filter((item) => item.category === category).slice(0, 10);
  }

  // Split query terms for multi-word search
  const terms = trimmed.split(/\s+/).filter(Boolean);

  const matched = allItems.filter((item) => {
    if (category !== 'all' && item.category !== category) {
      return false;
    }

    const searchableText = [
      item.titleAr,
      item.titleEn,
      item.subtitleAr,
      item.subtitleEn,
      item.badgeAr || '',
      item.badgeEn || '',
      ...(item.keywords || []),
    ]
      .join(' ')
      .toLowerCase();

    // Must match all entered terms
    return terms.every((term) => searchableText.includes(term));
  });

  return matched;
}
