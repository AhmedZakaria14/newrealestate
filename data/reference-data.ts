// Source of Truth: https://hardgp.com/index.html
// HARD General Contracting Establishment (HARD Group) - Founded 2004

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface ReferenceProperty {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  location: {
    city: LocalizedString;
    area: LocalizedString;
    country: LocalizedString;
    address: LocalizedString;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  price: {
    sar: number;
    formattedSAR: string;
    period?: string;
  };
  type: string;
  status: 'for-sale' | 'for-rent';
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  areaSqM: number;
  featured: boolean;
  images: string[];
  amenities: {
    en: string[];
    ar: string[];
  };
  features: {
    yearBuilt: number;
    parkingSpaces: number;
    furnishing: LocalizedString;
    view: LocalizedString;
  };
  agent: {
    name: LocalizedString;
    title: LocalizedString;
    phone: string;
    whatsapp: string;
    email: string;
    avatar: string;
  };
}

export interface ReferenceProject {
  id: string;
  title: LocalizedString;
  developer: LocalizedString;
  location: LocalizedString;
  startingPriceSAR: string;
  handoverDate: LocalizedString;
  unitsTotal: number;
  unitsAvailable: number;
  roiProjected: string;
  image: string;
  category: LocalizedString;
  description: LocalizedString;
  highlights: {
    en: string[];
    ar: string[];
  };
}

export interface ReferenceBlogPost {
  id: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  category: LocalizedString;
  date: string;
  readTime: LocalizedString;
  author: LocalizedString;
  image: string;
  content: LocalizedString;
}

export interface ReferenceTestimonial {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  location: LocalizedString;
  avatar: string;
  rating: number;
  quote: LocalizedString;
  dealHighlight: LocalizedString;
  category: string;
}

export interface ReferenceAudience {
  title: string;
  desc: string;
  icon: string;
}

export interface ReferenceMarketingService {
  title: string;
  desc: string;
}

// 1. Real Estate Development Properties (HARD Group Real Estate Development Division)
// Developing lands, villas, duplexes, towers, and commercial headquarters throughout Saudi Arabia
export const referenceProperties: ReferenceProperty[] = [
  {
    id: 'prop-1',
    slug: 'hard-al-rayyan-residential-villa-dammam',
    title: {
      en: 'HARD Al-Rayyan Luxury Modern Villa Development',
      ar: 'فيلا هارد الفاخرة بحي الريان — الدمام'
    },
    description: {
      en: 'Modern residential villa architecture developed by HARD Establishment in Al-Rayyan district, Dammam. Built with German-engineered Al-Ameria thermal piping (50-year warranty), pioneer HVAC installations, and turnkey structural engineering.',
      ar: 'فيلا سكنية عصرية بتصميم معماري مبتكر من تطوير مؤسسة هارد بحي الريان بالدمام. تم تشييدها باستخدام أنابيب العامرية الحرارية الألمانية بضمان 50 سنة، وتجهيزات تكييف مركزية معتمدة، وتشطيب كامل على المفتاح.'
    },
    location: {
      city: {
        en: 'Dammam',
        ar: 'الدمام'
      },
      area: {
        en: 'Al-Rayyan District',
        ar: 'حي الريان'
      },
      country: {
        en: 'Saudi Arabia',
        ar: 'المملكة العربية السعودية'
      },
      address: {
        en: '4737 18th Street, Al-Rayyan, Dammam 32256, KSA',
        ar: '4737 شارع 18، حي الريان، الدمام 32256، المملكة العربية السعودية'
      },
      coordinates: {
        lat: 26.4207,
        lng: 50.0888
      }
    },
    price: {
      sar: 2850000,
      formattedSAR: '2,850,000 SAR'
    },
    type: 'villa',
    status: 'for-sale',
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 5380,
    areaSqM: 500,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: {
      en: [
        'Al-Ameria Thermal Piping (50-Yr Warranty)',
        'Pioneer Central HVAC (5-Yr Warranty)',
        'Bank Funding via AlJazira, Riyad & Samba',
        'Private Landscaped Courtyard',
        'Covered Garage for 2 Vehicles',
        'Driver & Maid Suites',
        'Comprehensive SBC Quality Inspection',
        'SOTERIA Fire Safety Ready'
      ],
      ar: [
        'أنابيب العامرية الحرارية بضمان 50 سنة',
        'تكييف مركزي معتمد بضمان 5 سنوات',
        'تسهيلات تمويلية عبر بنوك الجزيرة والرياض وسامبا',
        'فناء وحديقة منزلية خاصة',
        'كراج مغطى لسيارتين',
        'أجنحة خاصة للسائق والخادمة',
        'فحص واختبار كامل لكود البناء السعودي',
        'تجهيزات مطافئ سوتيريا الذكية'
      ]
    },
    features: {
      yearBuilt: 2024,
      parkingSpaces: 2,
      furnishing: {
        en: 'Semi-Furnished (Turnkey Interior)',
        ar: 'نصف مفروشة (تشطيب متكامل)'
      },
      view: {
        en: 'Open Neighborhood & Garden View',
        ar: 'إطلالة مفتوحة على الحديقة والحي'
      }
    },
    agent: {
      name: {
        en: 'Hesham A. Al-Dossary',
        ar: 'هشام أ. الدوسري'
      },
      title: {
        en: 'General Manager',
        ar: 'المدير العام'
      },
      phone: '+966138444663',
      whatsapp: '966556125711',
      email: 'info@hardgp.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'prop-2',
    slug: 'hard-corporate-commercial-headquarters-tower',
    title: {
      en: 'HARD Commercial Corporate Headquarters & Executive Offices',
      ar: 'مقر إداري ومكاتب تجارية متطورة من هارد'
    },
    description: {
      en: 'Commercial office headquarters and retail center engineered by HARD General Contracting Establishment. Features medium and low voltage distribution, DCS/PLC building automation, campus fiber networking, and certified fire protection.',
      ar: 'مقر إداري ومركز مكاتب تجاري متطور شيدته مؤسسة هارد للمقاولات العامة. يتميز بشبكات توزيع الجهد المتوسط والمنخفض، وأتمتة المباني، وشبكات الألياف الضوئية، وأنظمة السلامة ومكافحة الحريق المعتمدة.'
    },
    location: {
      city: {
        en: 'Dammam / Khobar',
        ar: 'الدمام / الخُبر'
      },
      area: {
        en: 'Commercial Business Corridor',
        ar: 'محور الأعمال التجاري'
      },
      country: {
        en: 'Saudi Arabia',
        ar: 'المملكة العربية السعودية'
      },
      address: {
        en: 'Eastern Province Business Corridor, Dammam 32256, KSA',
        ar: 'محور الأعمال، المنطقة الشرقية، المملكة العربية السعودية'
      },
      coordinates: {
        lat: 26.3927,
        lng: 50.1804
      }
    },
    price: {
      sar: 14500000,
      formattedSAR: '14,500,000 SAR'
    },
    type: 'commercial',
    status: 'for-sale',
    bedrooms: 0,
    bathrooms: 12,
    areaSqFt: 18500,
    areaSqM: 1720,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: {
      en: [
        'Dedicated Electrical Substation',
        'Fiber Optic OFC Campus Network',
        'Addressable Fire Alarm & Life Safety System',
        'Underground Executive Parking for 35 Vehicles',
        'Pioneer Central Chillers with AMC Warranty',
        'Quality Assurance QA/QC Certified Handover',
        'Bank Investment Financing Program Available',
        'Turnkey Executive Boardrooms'
      ],
      ar: [
        'محطة تحويل ومولد كهربائي مخصص للمبنى',
        'شبكة ألياف ضوئية متطورة OFC',
        'أنظمة إنذار وإطفاء حريق معنونة ومعتمدة',
        'مواقف سيارات سفلية تتسع لـ 35 سيارة',
        'أنظمة تكييف مركزية مع عقود صيانة دورية',
        'تسليم معتمد بشهادات ضبط وضمان الجودة',
        'تسهيلات تمويلية استثمارية بنكية متاحة',
        'قاعات اجتماعات تنفيذية جاهزة على المفتاح'
      ]
    },
    features: {
      yearBuilt: 2023,
      parkingSpaces: 35,
      furnishing: {
        en: 'Core & Shell / Executive Fitout',
        ar: 'تشطيب إداري وتنفيذي متكامل'
      },
      view: {
        en: 'Panoramic City & Boulevard View',
        ar: 'إطلالة بانورامية على الشارع التجاري'
      }
    },
    agent: {
      name: {
        en: 'Ali H. Amsharah',
        ar: 'علي ح. عمشارة'
      },
      title: {
        en: 'Business Developer',
        ar: 'تطوير الأعمال'
      },
      phone: '+966556125711',
      whatsapp: '966556125711',
      email: 'info@hardgp.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'prop-3',
    slug: 'hard-residential-duplex-community',
    title: {
      en: 'HARD Contemporary Residential Duplex Compound',
      ar: 'مجمع فلل ودوبلكسات سكنية عصرية من هارد'
    },
    description: {
      en: 'Residential duplex community planned and executed by HARD Establishment to meet the growing demand for top-tier family housing in Saudi Arabia. Constructed to rigorous SBC standards with certified infrastructure.',
      ar: 'مجمع دوبلكسات وفلل سكنية عصرية خططتها ونفذتها مؤسسة هارد لتلبية الطلب المتزايد على المساكن العائلية النموذجية في المملكة، شيدت وفق معايير كود البناء السعودي وبنية تحتية معتمدة.'
    },
    location: {
      city: {
        en: 'Eastern Province',
        ar: 'المنطقة الشرقية'
      },
      area: {
        en: 'Dammam Residential Sector',
        ar: 'القطاع السكني النموذجي، الدمام'
      },
      country: {
        en: 'Saudi Arabia',
        ar: 'المملكة العربية السعودية'
      },
      address: {
        en: 'Al-Rayyan Sector, Dammam 32256, Saudi Arabia',
        ar: 'حي الريان، الدمام 32256، المملكة العربية السعودية'
      },
      coordinates: {
        lat: 26.4250,
        lng: 50.0910
      }
    },
    price: {
      sar: 1750000,
      formattedSAR: '1,750,000 SAR'
    },
    type: 'compound',
    status: 'for-sale',
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 3875,
    areaSqM: 360,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: {
      en: [
        'High-Pressure Polypropylene Thermal Piping',
        'Central & Split AC Installation with Warranty',
        'Private Covered Garage',
        'Spacious Family Majlis & Dining Area',
        'Modern Kitchen Layout with Gas Detection',
        'Bank Funding via Riyad, AlJazira & Samba',
        'Complete Structural QA Guarantee',
        'Dedicated Service Quarters'
      ],
      ar: [
        'أنابيب بولي بروبيلين حرارية ألمانية الصنع',
        'تكييف بضمان 5 سنوات وصيانة دورية',
        'كراج سيارة داخلي مغطى',
        'مجلس عائلي رحب وصالة طعام مستقلة',
        'مطبخ عصري مجهز بحساسات أمان',
        'تمويل بنكي عبر بنوك الرياض والجزيرة وسامبا',
        'ضمان إنشائي متكامل وفحص جودة معتمد',
        'ملحق وغرفة خدمات مجهزة'
      ]
    },
    features: {
      yearBuilt: 2024,
      parkingSpaces: 2,
      furnishing: {
        en: 'Turnkey Fitted',
        ar: 'تشطيب كامل جاهز للسكن'
      },
      view: {
        en: 'Quiet Residential Street View',
        ar: 'إطلالة سكنية هادئة'
      }
    },
    agent: {
      name: {
        en: 'Mohammad Al-Qahtani',
        ar: 'محمد القحطاني'
      },
      title: {
        en: 'Account Manager',
        ar: 'مدير الحسابات'
      },
      phone: '+966138444663',
      whatsapp: '966556125711',
      email: 'info@hardgp.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'prop-4',
    slug: 'hard-commercial-retail-center',
    title: {
      en: 'HARD Commercial Retail & Business Center',
      ar: 'مركز هارد التجاري ومعارض الأعمال'
    },
    description: {
      en: 'Multi-unit commercial retail and showroom facility developed by HARD General Contracting Establishment. Built for prime retail traffic, showroom visibility, and full electro-mechanical capability.',
      ar: 'مركز ومعارض تجارية متعددة الاستخدامات شيدتها مؤسسة هارد للمقاولات العامة بمواصفات هندسية فائقة توفر مساحات عرض رحبة وتجهيزات كهروميكانيكية متكاملة.'
    },
    location: {
      city: {
        en: 'Dammam',
        ar: 'الدمام'
      },
      area: {
        en: 'Main Commercial Avenue',
        ar: 'طريق تجاري رئيسي'
      },
      country: {
        en: 'Saudi Arabia',
        ar: 'المملكة العربية السعودية'
      },
      address: {
        en: 'Commercial District, Dammam 32256, Saudi Arabia',
        ar: 'الحي التجاري، الدمام 32256، المملكة العربية السعودية'
      },
      coordinates: {
        lat: 26.4150,
        lng: 50.1100
      }
    },
    price: {
      sar: 8900000,
      formattedSAR: '8,900,000 SAR'
    },
    type: 'commercial',
    status: 'for-sale',
    bedrooms: 0,
    bathrooms: 8,
    areaSqFt: 12900,
    areaSqM: 1200,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: {
      en: [
        'Expansive Retail Glass Facades',
        'Heavy Power Load Capacity with Grounding',
        'Ample Front & Rear Customer Parking',
        'Certified Fire Extinguisher & Alarm Systems',
        'Integrated Loading Dock & Service Entry',
        'Full QA/QC Structural Documentation'
      ],
      ar: [
        'واجهات زجاجية واسعة للمعارض',
        'أحمال كهربائية عالية وتأريض هندسي متكامل',
        'مواقف سيارات رحبة للعملاء والموظفين',
        'أنظمة ومطافئ حريق معتمدة من الدفاع المدني',
        'منطقة تحميل وتنزيل ومدخل خدمات خلفي',
        'توثيق إنشائي وفحص جودة كامل'
      ]
    },
    features: {
      yearBuilt: 2023,
      parkingSpaces: 20,
      furnishing: {
        en: 'Commercial Shell & Core',
        ar: 'تشطيب تجاري متقدم'
      },
      view: {
        en: 'Direct Avenue Frontage',
        ar: 'واجهة مباشرة على الشارع التجاري'
      }
    },
    agent: {
      name: {
        en: 'Ali H. Amsharah',
        ar: 'علي ح. عمشارة'
      },
      title: {
        en: 'Business Developer',
        ar: 'تطوير الأعمال'
      },
      phone: '+966556125711',
      whatsapp: '966556125711',
      email: 'info@hardgp.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    }
  }
];

// 2. Real Portfolio Projects (From hardgp.com portfolio.html, construction.html, index.html)
export const referenceProjects: ReferenceProject[] = [
  {
    id: 'proj-1',
    title: {
      en: 'Commercial Complex & Superstructure Construction',
      ar: 'تشييد مجمع تجاري وإنشائي متكامل'
    },
    developer: {
      en: 'HARD General Contracting Establishment',
      ar: 'مؤسسة هارد للمقاولات العامة'
    },
    location: {
      en: 'Eastern Province, Saudi Arabia',
      ar: 'المنطقة الشرقية، المملكة العربية السعودية'
    },
    startingPriceSAR: 'Turnkey Handover',
    handoverDate: {
      en: 'Completed',
      ar: 'تم الإنجاز بنجاح'
    },
    unitsTotal: 1,
    unitsAvailable: 0,
    roiProjected: 'Completed Portfolio Asset',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
    category: {
      en: 'Construction & Civil Superstructure',
      ar: 'المقاولات والإنشاءات الكبرى'
    },
    description: {
      en: 'Grass root building construction, concrete superstructure framing, plant construction, and turnkey engineering delivered to strict international standards.',
      ar: 'إنشاء المبنى من الأساسات وتنفيذ الهيكل الخرساني والأعمال المدنية الكبرى بمطابقة كاملة لأعلى المعايير والمواصفات الدولية.'
    },
    highlights: {
      en: [
        'Civil & Structural Framing',
        '100% Inspected QA/QC Standards',
        'Zero Safety Incidents',
        'Turnkey Handover Delivered'
      ],
      ar: [
        'أعمال إنشائية وهيكل خرساني متكامل',
        'مطابقة كاملة لمعايير ضمان الجودة',
        'سجل سلامة خالي من الحوادث',
        'تسليم متكامل على المفتاح'
      ]
    }
  },
  {
    id: 'proj-2',
    title: {
      en: 'Multi-Storey Commercial & Residential Building',
      ar: 'تشييد مبنى تجاري وسكني متعدد الطوابق'
    },
    developer: {
      en: 'HARD General Contracting Establishment',
      ar: 'مؤسسة هارد للمقاولات العامة'
    },
    location: {
      en: 'Dammam, Eastern Province, KSA',
      ar: 'الدمام، المنطقة الشرقية، المملكة العربية السعودية'
    },
    startingPriceSAR: 'Delivered',
    handoverDate: {
      en: 'Completed',
      ar: 'تم الإنجاز بنجاح'
    },
    unitsTotal: 12,
    unitsAvailable: 0,
    roiProjected: 'High-Yield Asset',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    category: {
      en: 'Multi-Storey Construction',
      ar: 'مبانٍ متعددة الطوابق'
    },
    description: {
      en: 'Multi-level mixed-use commercial and residential project incorporating modern MEP services, high-performance thermal insulation, and strict site safety engineering.',
      ar: 'مبنى متعدد الطوابق يجمع بين الاستخدام التجاري والسكني مع شبكات كهروميكانيكية متطورة وعزل حراري وإشراف هندسي ميداني صارم.'
    },
    highlights: {
      en: [
        'Mass Concrete Structural Pouring',
        'Pioneer AC Central Air Integration',
        'Al-Ameria Thermal Piping Installed',
        'Completed Within Budget & Timeframe'
      ],
      ar: [
        'صب الخرسانة المسلحة بدقة عالية',
        'تجهيزات تكييف مركزية معتمدة',
        'تمديد أنابيب العامرية الحرارية',
        'إنجاز ضمن الميزانية والجدول الزمني'
      ]
    }
  },
  {
    id: 'proj-3',
    title: {
      en: 'Industrial Facility & Structural Framework',
      ar: 'منشأة صناعية وهيكل فولاذي متطور'
    },
    developer: {
      en: 'HARD General Contracting Establishment',
      ar: 'مؤسسة هارد للمقاولات العامة'
    },
    location: {
      en: 'Eastern Province Industrial Area, KSA',
      ar: 'المدينة الصناعية، المنطقة الشرقية'
    },
    startingPriceSAR: 'EPC Turnkey',
    handoverDate: {
      en: 'Completed',
      ar: 'تم الإنجاز بنجاح'
    },
    unitsTotal: 1,
    unitsAvailable: 0,
    roiProjected: 'Operational',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    category: {
      en: 'Industrial & Mechanical Erection',
      ar: 'منشآت صناعية وهياكل معدنية'
    },
    description: {
      en: 'Heavy civil and industrial mechanical erection including specialized welding, pipe fabrication, plant revamp capabilities, and debottlenecking.',
      ar: 'أعمال مدنية وميكانيكية صناعية ثقيلة تشمل تركيب الهياكل المعدنية واللحام الهندسي المتقدم وخبرات هارد في تحديث وتوسعة المصانع.'
    },
    highlights: {
      en: [
        'Certified Industrial Welding',
        'Gas & Pipeline Inspection Standards',
        'Heavy Machinery Grounding',
        'LSTK / EPC Standards Compliance'
      ],
      ar: [
        'لحام صناعي هندسي مفحوص ومعتمد',
        'فحص خطوط الأنابيب وشبكات الغاز',
        'تأريض فعال للآلات والمولدات',
        'مطابقة كاملة لمعايير EPC و LSTK'
      ]
    }
  },
  {
    id: 'proj-4',
    title: {
      en: 'Residential Villa & Compound Architecture',
      ar: 'تطوير فلل ومجمعات سكنية عصرية'
    },
    developer: {
      en: 'HARD General Contracting Establishment',
      ar: 'مؤسسة هارد للمقاولات العامة'
    },
    location: {
      en: 'Al-Rayyan / Dammam, Eastern Province',
      ar: 'حي الريان / الدمام، المنطقة الشرقية'
    },
    startingPriceSAR: 'Residential Solutions',
    handoverDate: {
      en: 'Completed',
      ar: 'تم الإنجاز بنجاح'
    },
    unitsTotal: 6,
    unitsAvailable: 0,
    roiProjected: 'Completed Housing',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    category: {
      en: 'Residential Development',
      ar: 'تطوير سكني عصري'
    },
    description: {
      en: 'Modern residential villa architecture combining smart layout planning, thermal efficiency, and luxury finishes, accessible to modern society and young families.',
      ar: 'عمارة سكنية معاصرة تجمع بين التخطيط الفراغي الذكي والعزل الحراري والتشطيب الراقي لتوفير مساكن عصرية لفئات المجتمع.'
    },
    highlights: {
      en: [
        'Al-Ameria 50-Year Thermal Pipes',
        'Pioneer HVAC 5-Year Warranty',
        'Turnkey Handover Delivered',
        'Quality Assurance Verification'
      ],
      ar: [
        'أنابيب العامرية بضمان 50 سنة',
        'تكييف بضمان 5 سنوات من الوكيل',
        'تسليم متكامل على المفتاح',
        'شهادات توثيق وضبط الجودة'
      ]
    }
  },
  {
    id: 'proj-5',
    title: {
      en: 'Mass Reinforced Concrete Structural Works',
      ar: 'أعمال الهياكل الخرسانية المسلحة والصب'
    },
    developer: {
      en: 'HARD General Contracting Establishment',
      ar: 'مؤسسة هارد للمقاولات العامة'
    },
    location: {
      en: 'Eastern Province, Saudi Arabia',
      ar: 'المنطقة الشرقية، المملكة العربية السعودية'
    },
    startingPriceSAR: 'Structural Works',
    handoverDate: {
      en: 'Completed',
      ar: 'تم الإنجاز بنجاح'
    },
    unitsTotal: 1,
    unitsAvailable: 0,
    roiProjected: 'Civil Foundation',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    category: {
      en: 'Civil Engineering & Superstructure',
      ar: 'هندسة مدنية وهياكل خرسانية'
    },
    description: {
      en: 'High-precision shuttering, steel reinforcement binding, and temperature-controlled mass concrete casting guaranteeing structural durability and zero defects.',
      ar: 'نجارة مسلحة عالية الدقة، وربط حديد التسليح، وصب الخرسانة المسلحة المضبوطة وفق أحدث معايير المتانة الإنشائية.'
    },
    highlights: {
      en: [
        'Laboratory Cube Strength Testing',
        'Zero Defect QA Assurance',
        'Site Safety Supervision',
        'Exact International Standards'
      ],
      ar: [
        'اختبارات مخبرية لقوة كسر الخرسانة',
        'ضمان كامل لخلو الهيكل من العيوب',
        'إشراف مباشر لمهندسي السلامة',
        'مطابقة تامة للمواصفات الدولية'
      ]
    }
  },
  {
    id: 'proj-6',
    title: {
      en: 'Corporate Headquarters & Commercial Offices',
      ar: 'مقر إداري ومكاتب تجارية متطورة'
    },
    developer: {
      en: 'HARD General Contracting Establishment',
      ar: 'مؤسسة هارد للمقاولات العامة'
    },
    location: {
      en: 'Dammam, Eastern Province, KSA',
      ar: 'الدمام، المنطقة الشرقية، المملكة العربية السعودية'
    },
    startingPriceSAR: 'Turnkey Handover',
    handoverDate: {
      en: 'Completed',
      ar: 'تم الإنجاز بنجاح'
    },
    unitsTotal: 1,
    unitsAvailable: 0,
    roiProjected: 'Corporate Asset',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80',
    category: {
      en: 'Commercial Headquarters',
      ar: 'مقرات إدارية وتجارية'
    },
    description: {
      en: 'Turnkey executive commercial headquarters engineered with Medium and Low Voltage electrical distribution, lightning protection, and integrated IT infrastructure.',
      ar: 'مقر تجاري وإداري متكامل تم تشييده بأنظمة توزيع الجهد المتوسط والمنخفض والحماية من الصواعق والبنية التحتية الذكية.'
    },
    highlights: {
      en: [
        'Dedicated Power Substation',
        'Lightning Protection & Grounding',
        'Fire Alarm & Security Integrated',
        'Turnkey Handover Delivered'
      ],
      ar: [
        'محطة ومولدات كهرباء مستقلة',
        'حماية كاملة من الصواعق وتأريض',
        'إنذار حريق وأمن متكامل',
        'تسليم على المفتاح معتمد'
      ]
    }
  },
  {
    id: 'proj-7',
    title: {
      en: 'Commercial Center & Modern Retail Facility',
      ar: 'مركز تجاري ومعارض حديثة'
    },
    developer: {
      en: 'HARD General Contracting Establishment',
      ar: 'مؤسسة هارد للمقاولات العامة'
    },
    location: {
      en: 'Eastern Province, Saudi Arabia',
      ar: 'المنطقة الشرقية، المملكة العربية السعودية'
    },
    startingPriceSAR: 'Delivered',
    handoverDate: {
      en: 'Completed',
      ar: 'تم الإنجاز بنجاح'
    },
    unitsTotal: 1,
    unitsAvailable: 0,
    roiProjected: 'Retail Asset',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    category: {
      en: 'Retail & Commercial Facility',
      ar: 'مراكز تجارية ومعارض'
    },
    description: {
      en: 'Commercial retail center featuring expansive display storefronts, high-traffic flooring, and centralized climate control installed by HARD AC specialists.',
      ar: 'مركز تجاري يضم معارض واسعة وتشطيبات متينة للأرضيات وأنظمة تكييف مركزي متطورة نفذها خبراء هارد.'
    },
    highlights: {
      en: [
        'High Footfall Engineering',
        'Central HVAC by Pioneer Brands',
        'Approved SOTERIA Safety Equipping',
        'Delivered on Budget'
      ],
      ar: [
        'تصميم هندسي ملائم لكثافة الزوار',
        'تكييف مركزي بشراكة مع رواد التكييف',
        'تجهيزات مطافئ سوتيريا المعتمدة',
        'تسليم ناجح وفق الميزانية المحددة'
      ]
    }
  },
  {
    id: 'proj-8',
    title: {
      en: 'Residential Community Development',
      ar: 'مشروع مجمع سكني متكامل'
    },
    developer: {
      en: 'HARD General Contracting Establishment',
      ar: 'مؤسسة هارد للمقاولات العامة'
    },
    location: {
      en: 'Dammam, Eastern Province, KSA',
      ar: 'الدمام، المنطقة الشرقية، المملكة العربية السعودية'
    },
    startingPriceSAR: 'Residential',
    handoverDate: {
      en: 'Completed',
      ar: 'تم الإنجاز بنجاح'
    },
    unitsTotal: 8,
    unitsAvailable: 0,
    roiProjected: 'Community Living',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    category: {
      en: 'Residential Communities',
      ar: 'مجتمعات سكنية متكاملة'
    },
    description: {
      en: 'Housing development planned to satisfy the aspirations of Saudi families, featuring sustainable construction, thermal insulation, and complete plumbing networks.',
      ar: 'مشروع سكني متكامل صمم ليلبي تطلعات الأسر السعودية، مع تطبيق أحدث معايير العزل الحراري وشبكات السباكة المتطورة.'
    },
    highlights: {
      en: [
        '50-Year Warranty Al-Ameria Piping',
        'Individual Central AC Units',
        'Family Privacy Layout',
        'Bank Funding Approved'
      ],
      ar: [
        'شبكات أنابيب العامرية بضمان 50 سنة',
        'وحدات تكييف مستقلة ومضمونة',
        'تخطيط معماري يراعي الخصوصية العائلية',
        'معتمد للتمويل لدى البنوك الشريكة'
      ]
    }
  },
  {
    id: 'proj-9',
    title: {
      en: 'Modern Architectural Villa Project',
      ar: 'مشروع فيلا معمارية بتصميم معاصر'
    },
    developer: {
      en: 'HARD General Contracting Establishment',
      ar: 'مؤسسة هارد للمقاولات العامة'
    },
    location: {
      en: 'Al-Rayyan, Dammam, KSA',
      ar: 'حي الريان، الدمام، المملكة العربية السعودية'
    },
    startingPriceSAR: 'Turnkey Villa',
    handoverDate: {
      en: 'Completed',
      ar: 'تم الإنجاز بنجاح'
    },
    unitsTotal: 1,
    unitsAvailable: 0,
    roiProjected: 'Delivered',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
    category: {
      en: 'Private Villa Architecture',
      ar: 'فلل سكنية خاصة'
    },
    description: {
      en: 'Signature residential villa combining traditional warmth with contemporary lines, delivered turnkey with verified quality assurance.',
      ar: 'فيلا سكنية تجمع بين الأصالة والخطوط المعمارية العصرية، تم تسليمها بالكامل على المفتاح مع توثيق جودة التنفيذ.'
    },
    highlights: {
      en: [
        'Custom Facade & Stone Work',
        'Al-Ameria Thermal Water Networks',
        'Zero Defect Handover Inspection',
        'Pioneer AC 5-Year Warranty'
      ],
      ar: [
        'واجهات حجرية وتشطيبات خارجية فاخرة',
        'شبكات تغذية حرارية بأنابيب العامرية',
        'فحص استلام خالي من أي ملاحظات',
        'ضمان تكييف 5 سنوات من الشركة الصانعة'
      ]
    }
  },
  {
    id: 'proj-10',
    title: {
      en: 'Executive Interior Design & Luxury Fit-Out',
      ar: 'أعمال التصميم الداخلي والديكور التنفيذي'
    },
    developer: {
      en: 'HARD General Contracting Establishment',
      ar: 'مؤسسة هارد للمقاولات العامة'
    },
    location: {
      en: 'Eastern Province, Saudi Arabia',
      ar: 'المنطقة الشرقية، المملكة العربية السعودية'
    },
    startingPriceSAR: 'Fitout Handover',
    handoverDate: {
      en: 'Completed',
      ar: 'تم الإنجاز بنجاح'
    },
    unitsTotal: 1,
    unitsAvailable: 0,
    roiProjected: 'Interior Showcase',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    category: {
      en: 'Interior Design & Decor',
      ar: 'التصميم الداخلي والديكور'
    },
    description: {
      en: 'Interior design, executive office panelling, majlis styling, and architectural lighting executed with supreme craftsmanship.',
      ar: 'تنفيذ أعمال الديكور والتصميم الداخلي للمجالس والمكاتب التنفيذية وتكسيات الجدران والإضاءة المعمارية بأعلى درجات الإتقان.'
    },
    highlights: {
      en: [
        'Premium Wall Paneling & Joinery',
        'Architectural Lighting Systems',
        'Executive Reception & Majlis Design',
        'Harmonized Interior Atmosphere'
      ],
      ar: [
        'تكسيات خشبية وجدارية فاخرة',
        'أنظمة إضاءة معمارية مدروسة',
        'تصميم مجالس وصالات استقبال تنفيذية',
        'تناغم تام في البيئة الداخلية'
      ]
    }
  }
];

// 3. Operational Insights & Technical Articles from hardgp.com
export const referenceBlogPosts: ReferenceBlogPost[] = [
  {
    id: 'post-1',
    title: {
      en: 'Grass Root Industrial & Building Construction in Saudi Arabia Since 2004',
      ar: 'المقاولات الإنشائية والصناعية من الأساسات في المملكة العربية السعودية منذ 2004'
    },
    excerpt: {
      en: 'How HARD General Contracting Establishment has contributed to Saudi Arabia industrial and infrastructure sectors with LSTK, EPC, and LSPB turnkey solutions.',
      ar: 'كيف ساهمت مؤسسة هارد للمقاولات العامة في قطاع الإنشاءات والصناعة والبنية التحتية بالمملكة عبر مشاريع تسليم المفتاح LSTK و EPC و LSPB.'
    },
    category: {
      en: 'Construction & Engineering',
      ar: 'الهندسة والمقاولات'
    },
    date: 'HARD Technical Insights',
    readTime: {
      en: '5 min read',
      ar: 'قراءة 5 دقائق'
    },
    author: {
      en: 'Hesham A. Al-Dossary',
      ar: 'هشام أ. الدوسري'
    },
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
    content: {
      en: 'HARD General Contracting Establishment has been contributing to Saudi Arabia\'s industrial and infrastructure sector since 2004 with reliable, multi-dimensional construction services. The activities started in Eastern Province and expanded to cover Central and Western Provinces as per management development policy. Today, construction services focus on buildings, power, and the water sector. We meet all requirements of civil, industrial mechanical, and electro-mechanical services for LSTK, EPC, and LSPB projects.',
      ar: 'تساهم مؤسسة هارد للمقاولات العامة في قطاع الصناعة والبنية التحتية في المملكة العربية السعودية منذ عام 2004 بخدمات إنشائية موثوقة ومتعددة الأبعاد. بدأت أنشطتنا في المنطقة الشرقية وتوسعت لتغطي المنطقتين الوسطى والغربية وفق استراتيجية التطوير المؤسسي. واليوم تركز خدماتنا على قطاعات المباني، الطاقة، والمياه، مع تلبية كافة متطلبات الأعمال المدنية والميكانيكية الصناعية والكهروميكانيكية لمشاريع LSTK و EPC و LSPB.'
    }
  },
  {
    id: 'post-2',
    title: {
      en: 'Quality Assurance (QA) in Construction: Pre- & Post-Delivery Inspection Protocols',
      ar: 'ضمان الجودة (QA) في الإنشاءات: بروتوكولات فحص المواد قبل وبعد التوريد'
    },
    excerpt: {
      en: 'Preventing defects and guaranteeing compliance with client specifications and international engineering standards.',
      ar: 'منع العيوب وضمان مطابقة مواد البناء لمواصفات العميل والمعايير الهندسية العالمية المعتمدة.'
    },
    category: {
      en: 'Quality & Standards',
      ar: 'الجودة والمعايير'
    },
    date: 'Engineering Standards',
    readTime: {
      en: '4 min read',
      ar: 'قراءة 4 دقائق'
    },
    author: {
      en: 'Ali H. Amsharah',
      ar: 'علي ح. عمشارة'
    },
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    content: {
      en: 'Our construction services are guaranteed to prevent any possible defects or mistakes with construction materials before and after delivery to the construction site. This is what is called QA (Quality Assurance) - verifying that delivered materials meet requirements and specifications approved by the client. QA is vital to check all items comply with agreed standards and avoid having any conflict with original functionality.',
      ar: 'خدماتنا الإنشائية مضمونة لمنع أي عيوب أو أخطاء محتملة في مواد البناء قبل وبعد وصولها إلى موقع العمل. وهذا ما يسمى بضمان الجودة (QA)، وهو التحقق من أن المواد الموردة تطابق المواصفات المعتمدة من قبل العميل. ويعد ضمان الجودة ركيزة حيوية للتأكد من مطابقة جميع المواد للمعايير المعتمدة وتجنب أي تعارض مع الوظيفة الأساسية للمنشأة.'
    }
  },
  {
    id: 'post-3',
    title: {
      en: 'Al-Ameria Thermal Pipes: 50-Year Warranty & Modern Infrastructure Standards',
      ar: 'أنابيب العامرية الحرارية: ضمان 50 سنة ومعايير البنية التحتية الحديثة'
    },
    excerpt: {
      en: 'Discover why German-engineered polypropylene thermal pipes and Italian Euro HDPE products set the gold standard in water and gas infrastructure.',
      ar: 'تعرف على معايير أنابيب البولي بروبيلين الحرارية الألمانية وأنابيب HDPE الإيطالية ودورها في استدامة شبكات المياه والغاز.'
    },
    category: {
      en: 'Distributorships & Materials',
      ar: 'الوكالات ومواد البناء'
    },
    date: 'Materials Technology',
    readTime: {
      en: '6 min read',
      ar: 'قراءة 6 دقائق'
    },
    author: {
      en: 'Mohammad Al-Qahtani',
      ar: 'محمد القحطاني'
    },
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
    content: {
      en: 'HARD is the exclusive authorized distributor of Al-Ameria Pipes in the Eastern Province. German-engineered in Turkey from premium polypropylene, these beige thermal pipes withstand the highest pressures with geometric designs allowing streamlined water flow. Backed by a 50-year warranty, free 3-stage product inspections, and ISO and Saudi SASO certifications. We also distribute Italian Euro HDPE pipes for governmental and municipal gas and massive water systems.',
      ar: 'مؤسسة هارد هي الوكيل الحصري لتوزيع منتجات أنابيب العامرية في المنطقة الشرقية. هذه الأنابيب الحرارية ذات اللون البيج مصنعة من أجود خامات البولي بروبيلين الألمانية في تركيا وتتحمل أعلى درجات الضغط، وتتميز بتصميم هندسي يضمن تدفق المياه بسلاسة تامة. تأتي مدعومة بضمان 50 سنة و3 فحوصات مجانية مع شهادات ISO وهيئة المواصفات والمقاييس السعودية (SASO)، بالإضافة إلى أنابيب HDPE الإيطالية لخطوط الغاز والماء الضخمة.'
    }
  },
  {
    id: 'post-4',
    title: {
      en: 'Next-Generation Fire Safety: SOTERIA 1-Step Throwable Fire Extinguishers',
      ar: 'ابتكار مكافحة الحريق: مطافئ سوتيريا SOTERIA للقذف في خطوة واحدة'
    },
    excerpt: {
      en: 'Extinguish fires in 1 simple step with zero training: environmentally friendly, maintenance-free, and effective on cooking oil and chemical liquids.',
      ar: 'إخماد الحريق بخطوة واحدة سهلة دون تدريب: صديقة للبيئة، بدون صيانة سنوية، وفعالة على زيوت المطابخ والسوائل البترولية.'
    },
    category: {
      en: 'Safety & Distributorships',
      ar: 'السلامة والمنتجات المعتمدة'
    },
    date: 'Safety Innovations',
    readTime: {
      en: '4 min read',
      ar: 'قراءة 4 دقائق'
    },
    author: {
      en: 'Ali H. Amsharah',
      ar: 'علي ح. عمشارة'
    },
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
    content: {
      en: 'Conventional fire extinguishers are baffling pieces of equipment to untrained adults. SOTERIA throwable fire extinguishers extinguish fires in one simple step: if a child can throw a ball, fire can be snuffed out easily. No annual inspections or maintenance needed, lasts up to 5 years, completely non-hazardous. Highly effective on initial fires, flammable liquids (petrol, paint thinners, kerosene), deep-seated fires, and kitchen cooking oils.',
      ar: 'تعد مطافئ الحريق التقليدية أجهزة معقدة ومربكة لكثير من الأشخاص غير المدربين. مع مطافئ سوتيريا (SOTERIA) القابلة للرمي، يتم إخماد الحريق في خطوة واحدة بسيطة: فإذا كان الطفل قادراً على رمي الكرة، يمكنه إخماد الحريق بسهولة. لا تحتاج إلى فحص سنوي أو صيانة، وتدوم حتى 5 سنوات، وهي آمنة بيئياً تماماً وفعالة للغاية في حرائق السوائل القابلة للاشتعال كالبنزين والتنر والحرائق العميقة وزيوت الطهي بالمطابخ.'
    }
  },
  {
    id: 'post-5',
    title: {
      en: 'Strategic Bank Funding Partnerships for Real Estate: AlJazira, Riyad & Samba',
      ar: 'شراكات التمويل العقاري الاستراتيجية مع بنوك الجزيرة والرياض وسامبا'
    },
    excerpt: {
      en: 'How HARD assists investors and families to own land and develop residential or commercial projects with preferential low profit margins.',
      ar: 'كيف تساعد هارد المستثمرين والأسر على تملك الأراضي وبناء المشاريع السكنية والتجارية بهوامش ربح تفضيلية منخفضة.'
    },
    category: {
      en: 'Real Estate & Financing',
      ar: 'العقار والتمويل البنكي'
    },
    date: 'Financial Advisory',
    readTime: {
      en: '5 min read',
      ar: 'قراءة 5 دقائق'
    },
    author: {
      en: 'Mohammad Al-Qahtani',
      ar: 'محمد القحطاني'
    },
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    content: {
      en: 'HARD offers real estate consultancy support to clients and investors in the market, seeking to reconcile the establishment of residential communities characterized by innovative design and function. We assist clients to own land where we build residential or commercial projects by utilizing institutional funding. Our management has long-term agreements with three of the best banks in real estate funding: AlJazira Bank, Riyad Bank, and Samba Bank, providing low profit margins specially to company employees and investors.',
      ar: 'تقدم هارد الدعم والاستشارات العقارية للعملاء والمستثمرين، وتسعى للتوفيق بين إنشاء مجتمعات سكنية تتميز بالتصميم المبتكر والوظيفة الحيوية. نحن نساعد عملائنا على تملك الأراضي وبناء المشاريع السكنية أو التجارية عبر التمويل المؤسسي. وترتبط إدارتنا باتفاقيات طويلة الأجل مع أفضل ثلاثة بنوك في التمويل العقاري: بنك الجزيرة، بنك الرياض، وبنك سامبا، والتي توفر هوامش ربح منخفضة مخصصة لموظفي الشركات والمستثمرين.'
    }
  }
];

// 4. Testimonials from hardgp.com
export const referenceTestimonials: ReferenceTestimonial[] = [
  {
    id: 'test-1',
    name: {
      en: 'Douglas Coupland',
      ar: 'دوغلاس كوبلاند'
    },
    role: {
      en: 'Official Philosophy on HARD Group Site',
      ar: 'الفلسفة المعمارية الرسمية بموقع هارد'
    },
    location: {
      en: 'Architecture & Design Principle',
      ar: 'مبدأ الجودة والتنفيذ الإنشائي'
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    quote: {
      en: 'If a building looks better under construction than it does when finished, then it is a failure.',
      ar: 'إذا كان المبنى يبدو أفضل أثناء البناء مما يبدو عليه عند الانتهاء منه، فهو فاشل.'
    },
    dealHighlight: {
      en: 'Universal Quality Standard',
      ar: 'معيار الجودة الإنشائية المستدامة'
    },
    category: 'philosophy'
  },
  {
    id: 'test-2',
    name: {
      en: 'Industrial & Infrastructure Partners',
      ar: 'شركاء القطاع الصناعي والبنية التحتية'
    },
    role: {
      en: 'Plant Engineering & Civil Infrastructure',
      ar: 'إدارة تشغيل وتطوير المنشآت الإنشائية'
    },
    location: {
      en: 'Dammam & Jubail, Eastern Province',
      ar: 'الدمام والجبيل، المنطقة الشرقية'
    },
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    quote: {
      en: 'HARD General Contracting Establishment has been contributing to Saudi Arabia industrial and infrastructure sector since 2004 with reliable, multi-dimensional construction services.',
      ar: 'تساهم مؤسسة هارد للمقاولات العامة في القطاع الصناعي والبنية التحتية في المملكة منذ عام 2004 بخدمات إنشائية موثوقة ومتعددة الأبعاد أثبتت جدارتها.'
    },
    dealHighlight: {
      en: 'EPC & Plant Revamp Delivery',
      ar: 'تنفيذ وتحديث منشآت ومصانع LSTK/EPC'
    },
    category: 'industrial'
  },
  {
    id: 'test-3',
    name: {
      en: 'Real Estate Clients & Homeowners',
      ar: 'عملاء القطاع السكني والتطوير العقاري'
    },
    role: {
      en: 'Residential & Commercial Partners',
      ar: 'ملاك الفلل والمنشآت التجارية'
    },
    location: {
      en: 'Dammam & Eastern Province, KSA',
      ar: 'الدمام والمنطقة الشرقية'
    },
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    quote: {
      en: 'The commitment and efficiency through implementation of our projects built up a good customer relation and satisfaction, backed by certified 50-year warranty thermal piping and pioneer AC agreements.',
      ar: 'بنى الالتزام والكفاءة في تنفيذ مشاريعنا علاقة وطيدة ومستمرة مع العملاء، مدعومة بأنابيب حرارية معتمدة بضمان 50 سنة وشراكات تكييف رائدة.'
    },
    dealHighlight: {
      en: 'Turnkey Handover with Extended Warranties',
      ar: 'تسليم متكامل مع ضمانات ممتدة'
    },
    category: 'residential'
  }
];

// 5. Target Audiences (Reflecting HARD Group's real client sectors from hardgp.com)
export const referenceAudiences = {
  en: [
    {
      title: 'Young Society & Ordinary Homebuyers',
      desc: 'Providing modern housing solutions accessible to all society groups, particularly the young layer.',
      icon: 'home'
    },
    {
      title: 'Real Estate Investors',
      desc: 'High-yield investment destinations in lands, residential duplexes, corporate towers, and commercial headquarters.',
      icon: 'trending-up'
    },
    {
      title: 'Industrial & Infrastructure Clients',
      desc: 'Grass root building construction, plant revamp, upgrade, expansion, and debottlenecking for LSTK/EPC projects.',
      icon: 'building'
    },
    {
      title: 'Commercial Enterprises & Businesses',
      desc: 'Corporate headquarters, modern retail complexes, and commercial showrooms engineered to exact specs.',
      icon: 'sparkles'
    },
    {
      title: 'Home & Facility Owners (Maintenance AMC)',
      desc: 'Preventive and corrective maintenance contracts for HVAC (AlZamil, Daikin, LG, Trane), electrical, plumbing, and welding.',
      icon: 'badge-percent'
    },
    {
      title: 'Contractors & Municipal Distributors',
      desc: 'Authorized distribution of Al-Ameria thermal pipes (50-yr warranty), Italian Euro HDPE pipes, and SOTERIA fire extinguishers.',
      icon: 'key'
    }
  ],
  ar: [
    {
      title: 'الشباب ومشتري المساكن العائلية',
      desc: 'توفير حلول إسكانية عصرية تلبي الطلب المتزايد لكافة فئات المجتمع لاسيما فئة الشباب في المملكة.',
      icon: 'home'
    },
    {
      title: 'المستثمرون في التطوير العقاري',
      desc: 'وجهة استثمارية موثوقة في تطوير الأراضي، الفلل، الدوبلكسات، والأبراج والمقرات التجارية بعوائد مجزية.',
      icon: 'trending-up'
    },
    {
      title: 'قطاع المنشآت الصناعية والبنية التحتية',
      desc: 'إنشاء المصانع من الأساسات، وتحديث وتوسعة المنشآت القائمة وتجاوز الاختناقات لمشاريع LSTK و EPC.',
      icon: 'building'
    },
    {
      title: 'الشركات والمؤسسات التجارية',
      desc: 'مقرات إدارية وتنفيذية ومراكز تسوق ومعارض تجارية حديثة مشيدة بأعلى درجات الكفاءة.',
      icon: 'sparkles'
    },
    {
      title: 'أصحاب المنشآت والفلل (عقود الصيانة AMC)',
      desc: 'عقود صيانة دورية وقائية لأنظمة التكييف (الزامل، دايكن، LG، ترين)، والكهرباء، والسباكة، واللحام.',
      icon: 'badge-percent'
    },
    {
      title: 'المقاولون وموزعو المواد المعتمدة',
      desc: 'وكالة حصرية لأنابيب العامرية الحرارية بضمان 50 سنة، وأنابيب HDPE الإيطالية، ومطافئ سوتيريا المبتكرة.',
      icon: 'key'
    }
  ]
};

// 6. Marketing Capabilities from sales_marketing.html & realestate_services.html
export const referenceMarketingServices = {
  en: [
    {
      title: 'Collaboration with Major Regional Real Estate Leaders',
      desc: 'Marketing services and properties using strategic plans in collaboration with leading real estate firms.'
    },
    {
      title: 'Precise Alternative Sales Analysis',
      desc: 'Analyzing sales alternatives precisely to provide maximum convenience and optimal return to consumers and investors.'
    },
    {
      title: 'Bank Funding Facilitation Program',
      desc: 'Long-term partnership agreements with AlJazira Bank, Riyad Bank, and Samba Bank offering low profit margins.'
    },
    {
      title: 'Multi-Channel Regional Promotion',
      desc: 'Targeted campaigns reaching property investors and homebuyers across the Eastern, Central, and Western Provinces.'
    }
  ],
  ar: [
    {
      title: 'التعاون مع كبرى الشركات العقارية بالمنطقة',
      desc: 'تسويق الخدمات والمنتجات العقارية عبر أرقى الخطط التسويقية بالشراكة مع رواد القطاع العقاري.'
    },
    {
      title: 'تحليل دقيق للبدائل والخيارات البيعية',
      desc: 'دراسة وتحليل البدائل البيعية بدقة فائقة لتلائم تطلعات وقدرات المستهلكين والمستثمرين.'
    },
    {
      title: 'برنامج التسهيلات والتمويل البنكي المشترك',
      desc: 'اتفاقيات شراكة طويلة الأجل مع بنوك الجزيرة والرياض وسامبا بهوامش ربح منخفضة للموظفين والمستثمرين.'
    },
    {
      title: 'حملات ترويجية إقليمية مستهدفة',
      desc: 'خطط ترويجية متكاملة تغطي كافة محافظات المنطقة الشرقية ومناطق المملكة للوصول إلى المشترين المؤهلين.'
    }
  ]
};

// 7. Core Company Values (from about_us.html)
export const referenceAboutValues = {
  en: [
    {
      title: 'QUALITY',
      desc: 'Provide services of long lasting functions that meet our clients aspirations.'
    },
    {
      title: 'COMMITMENT',
      desc: 'Undertake honesty and fulfillment of obligations constantly to our customers.'
    },
    {
      title: 'INNOVATION',
      desc: 'Promote creative and innovative housing and real estate investment solutions.'
    }
  ],
  ar: [
    {
      title: 'الجودة (QUALITY)',
      desc: 'تقديم خدمات ذات وظائف واستدامة طويلة الأمد تلبي تطلعات عملائنا.'
    },
    {
      title: 'الالتزام (COMMITMENT)',
      desc: 'التزام الصدق والأمانة والوفاء بالواجبات والالتزامات بصفة مستمرة لعملائنا.'
    },
    {
      title: 'الابتكار (INNOVATION)',
      desc: 'تعزيز وإيجاد حلول إسكانية واستثمارية عقارية مبتكرة وخلاقة تتماشى مع نمط الحياة العصري.'
    }
  ]
};
