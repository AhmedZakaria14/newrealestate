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
    slug: 'the-sky-crest-penthouse-khobar-corniche',
    titleAr: 'بنتهاوس ذا سكاي كريست مع إطلالات بانورامية على كورنيش الخُبر والخليج',
    titleEn: 'The Sky Crest Penthouse with Panoramic Arabian Gulf Views',
    city: 'khobar',
    cityNameAr: 'المنطقة الشرقية – كورنيش الخُبر',
    cityNameEn: 'Eastern Province – Al Khobar Corniche',
    districtAr: 'كورنيش الخُبر - طريق الأمير تركي',
    districtEn: 'Al Khobar Corniche - Prince Turki St',
    type: 'penthouse',
    typeNameAr: 'بنتهاوس فاخر معلق',
    typeNameEn: 'Ultra-Prime Penthouse',
    status: 'sale',
    statusNameAr: 'متاح للبيع الفوري',
    statusNameEn: 'Available for Sale',
    price: '25,687,500 ر.س',
    priceRaw: 25687500,
    priceCurrency: 'SAR',
    area: '729 م² (7,850 قدم²)',
    areaRaw: 729,
    beds: '5 أجنحة ماستر',
    baths: '6 حمامات رخامية',
    parking: '4 مواقف خاصة بالقبو',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80'
    ],
    badgeAr: 'مرخص من الهيئة العامة للعقار (فال)',
    badgeEn: 'REGA / FAL Certified',
    descriptionAr:
      'تحفة معمارية في قمة كورنيش الخُبر تتميز بزجاج مزدوج الارتفاع من الأرض حتى السقف، ومسبح إنفينيتي خاص، وتشطيبات من الرخام الإيطالي الفاخر، ومصعد خاص مباشر بإطلالة ساحلية مفتوحة.',
    descriptionEn:
      'An architectural masterpiece atop Al Khobar Corniche featuring double-height floor-to-ceiling glass, private infinity pool, Italian marble finishes, bespoke designer kitchen, and private direct elevator lobby.',
    longOverviewAr: [
      'يمثل بنتهاوس ذا سكاي كريست ذروة الفخامة المعمارية على كورنيش مدينة الخُبر، حيث يوفر إطلالات بانورامية مفتوحة بنسبة 360 درجة على مياه الخليج العربي وأفق المدينة الساحلي.',
      'صُممت المساحات الداخلية بأسقف شاهقة الارتفاع وتشطيبات رخامية إيطالية نادرة، مع مسبح خاص معلق وجناح سبا متكامل وتراس مفتوح للاسترخاء والضيافة.',
      'العقار مرخص وموثق رسمياً عبر الهيئة العامة للعقار برخصة فال 1200028472 وبصك إلكتروني مستقل جاهز للإفراغ الفوري عبر البورصة العقارية.'
    ],
    longOverviewEn: [
      'The Sky Crest Penthouse represents the absolute pinnacle of luxury along Al Khobar Corniche, commanding unobstructed 360-degree vistas across the Arabian Gulf horizon.',
      'Features double-height gallery living spaces, imported Italian Calacatta marble, private heated cantilevered infinity lap pool, and a dedicated wellness spa suite.',
      'Fully authenticated by REGA under FAL License 1200028472 with an unencumbered electronic title deed ready for instant closing.'
    ],
    featuresAr: [
      'مسبح إنفينيتي خاص معلق مواجه للبحر',
      'مصعد خاص مباشر يفتح داخل البنتهاوس',
      'خدمات استقبال وحراسة وكونسيرج 24/7',
      'نظام أتمتة وتحكم منزلي ذكي متكامل',
      'سبا وساونا وجاكوزي خاص',
      'مجلس استقبال تنفيذي بأسقف مضاعفة',
      '4 مواقف سيارات مغطاة بالقبو',
      'صك ملكية إلكتروني رسمي مرخص فال 1200028472'
    ],
    featuresEn: [
      'Private Cantilevered Sea-Facing Infinity Pool',
      'Private Keycard Direct Elevator Lobby',
      '24/7 Concierge, Security & Valet Services',
      'Full Crestron Integrated Smart Automation',
      'Private Spa, Sauna & Hydrotherapy Jacuzzi',
      'Grand Executive Double-Height Reception Salon',
      '4 Dedicated Covered Basement Parking Bays',
      'Official REGA FAL License No. 1200028472'
    ],
    specs: [
      { labelAr: 'المساحة المبنية', labelEn: 'Built-up Area', valueAr: '729 م²', valueEn: '729 m²' },
      { labelAr: 'المساحة بالقدم', labelEn: 'Area (Sq Ft)', valueAr: '7,850 قدم²', valueEn: '7,850 sq ft' },
      { labelAr: 'سنة البناء', labelEn: 'Year Built', valueAr: '2025 حديث', valueEn: '2025 Brand New' },
      { labelAr: 'الفرش والتأثيث', labelEn: 'Furnishing', valueAr: 'مفروشة بالكامل (تصميم إيطالي فاخر)', valueEn: 'Luxury Italian Furnished' },
      { labelAr: 'الإطلالة', labelEn: 'View Type', valueAr: 'إطلالة بحرية كاملة على الخليج والكورنيش', valueEn: 'Full Arabian Gulf Panorama' },
      { labelAr: 'رخصة فال', labelEn: 'FAL License', valueAr: '1200028472', valueEn: '1200028472' }
    ],
    falLicense: '1200028472',
    titleDeedNumber: '310102948271',
    advertisementNumber: '7200192847',
    coords: { lat: 26.2886, lng: 50.2185 },
    relatedSlugs: ['the-royal-palm-coastal-palace-villa', 'the-shobaily-bay-royal-villa', 'al-malqa-elite-contemporary-villa']
  },
  {
    id: 'prop-2',
    slug: 'the-royal-palm-coastal-palace-villa',
    titleAr: 'فيلا قصر النخيل الملكية الفاخرة على واجهة الدانة',
    titleEn: 'The Royal Palm Coastal Palace Villa',
    city: 'khobar',
    cityNameAr: 'المنطقة الشرقية – الخُبر (حي الدانة)',
    cityNameEn: 'Eastern Province – Al Khobar (Al Dana)',
    districtAr: 'واجهة الدانة البحرية - طريق الكورنيش الجنوبي',
    districtEn: 'Al Dana Waterfront - South Corniche',
    type: 'villa',
    typeNameAr: 'قصر ساحلي ملكي',
    typeNameEn: 'Ultra-Luxury Coastal Palace',
    status: 'sale',
    statusNameAr: 'صفقة حصرية للتملك',
    statusNameEn: 'Trophy Acquisition',
    price: '33,412,500 ر.س',
    priceRaw: 33412500,
    priceCurrency: 'SAR',
    area: '1,320 م² (14,200 قدم²)',
    areaRaw: 1320,
    beds: '7 أجنحة ملكية',
    baths: '9 حمامات ماستر',
    parking: '6 مواقف سيارات خاصة',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80'
    ],
    badgeAr: 'صك ملكية إلكتروني موثق',
    badgeEn: 'Verified Digital Title Deed',
    descriptionAr:
      'قصر شاطئي ملكي استثنائي يمتد على مساحة شاسعة مع واجهة بحرية خاصة، يضم حدائق استوائية منسقة، مسابح متعددة، سينما منزلية خاصة، صالة بولينغ، ومرسى لليخوت.',
    descriptionEn:
      'An exceptional beachfront palatial residence set upon expansive private waterfront grounds. Highlights include private marina slip, cascading resort-style pools, private home cinema, bowling alley, and private wellness pavilions.',
    longOverviewAr: [
      'يقع قصر النخيل الملكي على واجهة الدانة البحرية بالخُبر، ويعد أحد أفخم القصور الخاصة في المنطقة الشرقية بمواصفات تضاهي المنتجعات العالمية فئة الخمس نجوم.',
      'يضم القصر 7 أجنحة ملكية فسيحة، قاعات استقبال رسمية للضيوف بأسقف بارتفاع 7 أمتار، مطابخ احترافية مجهزة، ومركز صحي متكامل يضم حماماً مغربياً وساونا وجاكوزي.',
      'مشيد وفق أعلى متطلبات كود البناء السعودي مع وثيقة تأمين إنشائي لمدة 10 سنوات وضمان شامل على الهيكل الخرساني والتشطيبات.'
    ],
    longOverviewEn: [
      'The Royal Palm Coastal Palace Villa is an iconic estate located along the prestigious Al Dana waterfront in Al Khobar, conceived to five-star international resort standards.',
      'Features 7 palatial suites, formal 7-meter high reception salons, German professional chef kitchens, private cinema, and dedicated wellness hammam facilities.',
      'Constructed strictly to Saudi Building Code guidelines backed by a 10-year comprehensive structural insurance guarantee.'
    ],
    featuresAr: [
      'واجهة بحرية خاصة مع شاطئ رملي ومرسى قوارب',
      'مسبحان (مسبح خارجي متدرج ومسبح داخلي مدفأ)',
      'سينما منزلية احترافية معزولة صوتياً',
      'صالة رياضية وسبا متكامل وحمام مغربي',
      'أجنحة منفصلة للضيافة مع مدخل خاص',
      'تكييف مركزي ذكي VRF من هارد لأنظمة التبريد',
      'كراج خاص يتسع لـ 6 سيارات فارهة',
      'مرخص رسمياً برخصة فال رقم 1200028472'
    ],
    featuresEn: [
      'Private Sand Beachfront with Exclusive Boat Marina',
      'Dual Pools: Resort Infinity Pool + Heated Indoor Spa',
      'Acoustically Treated 14-Seat Private Home Cinema',
      'Fully Equipped Fitness Gym, Moroccan Hammam & Sauna',
      'Independent VIP Guest House with Private Access',
      'Hard Central VRF Multi-Zone Energy-Saving Climate Tech',
      'Enclosed Garage for 6 Luxury Vehicles',
      'Fully Licensed under REGA FAL No. 1200028472'
    ],
    specs: [
      { labelAr: 'مساحة الأرض', labelEn: 'Plot Area', valueAr: '2,400 م²', valueEn: '2,400 m²' },
      { labelAr: 'المساحة المبنية', labelEn: 'Built-up Area', valueAr: '1,320 م²', valueEn: '1,320 m²' },
      { labelAr: 'الواجهة البحرية', labelEn: 'Waterfront Span', valueAr: '45 متراً على البحر مباشرة', valueEn: '45m Direct Shoreline' },
      { labelAr: 'الضمان الإنشائي', labelEn: 'Warranty', valueAr: '10 سنوات تأمين العيوب الخفية', valueEn: '10 Years Insurance' },
      { labelAr: 'الوثائق الرسمية', labelEn: 'Title Deed', valueAr: 'صك إلكتروني حر جاهز للإفراغ', valueEn: 'Clean Digital Title Deed' },
      { labelAr: 'الترخيص العقاري', labelEn: 'Broker License', valueAr: 'رخصة فال 1200028472', valueEn: 'FAL #1200028472' }
    ],
    falLicense: '1200028472',
    titleDeedNumber: '210998347102',
    advertisementNumber: '7200192848',
    coords: { lat: 26.2412, lng: 50.2114 },
    relatedSlugs: ['the-sky-crest-penthouse-khobar-corniche', 'the-shobaily-bay-royal-villa', 'al-malqa-elite-contemporary-villa']
  },
  {
    id: 'prop-3',
    slug: 'al-malqa-elite-contemporary-villa',
    titleAr: 'فيلا الملقا العصرية الفاخرة شمال الرياض',
    titleEn: 'Al Malqa Elite Contemporary Villa',
    city: 'riyadh',
    cityNameAr: 'الرياض – حي الملقا',
    cityNameEn: 'Riyadh – Al Malqa District',
    districtAr: 'حي الملقا - قرب طريق الأمير تركي الأول',
    districtEn: 'Al Malqa - Near Prince Turki I Rd',
    type: 'villa',
    typeNameAr: 'فيلا مودرن ذكية',
    typeNameEn: 'Smart Modern Luxury Villa',
    status: 'sale',
    statusNameAr: 'متاح للبيع والتملك',
    statusNameEn: 'Available for Purchase',
    price: '14,850,000 ر.س',
    priceRaw: 14850000,
    priceCurrency: 'SAR',
    area: '880 م² (9,470 قدم²)',
    areaRaw: 880,
    beds: '6 غرف ماستر',
    baths: '8 حمامات مجهزة',
    parking: '3 مواقف سيارات خاصة',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
    ],
    badgeAr: 'كود البناء السعودي وتأمين ملاذ',
    badgeEn: 'SBC Certified & 10-Yr Warranty',
    descriptionAr:
      'فيلا عصرية استثنائية في أرقى مربعات حي الملقا شمال الرياض، تتميز بتصميم معماري انسيابي، مصعد بانورامي، شلالات مائية داخلية، وفناء زجاجي مفتوح يدمج الطبيعة بداخل المنزل.',
    descriptionEn:
      'A bespoke architectural modern villa in Riyadh’s most coveted Al Malqa enclave. Highlights glass courtyards, cascading indoor water features, smart elevator, and rooftop entertainment lounge.',
    longOverviewAr: [
      'تقع هذه الفيلا في موقع استراتيجي نادر بحي الملقا بالقرب من مركز الملك عبد الله المالي (KAFD) وبوليفارد الرياض، مما يجعلها الخيار الأمثل للعائلات الباحثة عن الرفاهية والموقع الاستراتيجي.',
      'تتميز بتصميم يدمج الإضاءة الطبيعية مع واجهات زجاجية ممتدة عازلة للحرارة، وحديقة خلفية بمسبح خاص مجهز بأنظمة تدفئة وإنارة ليلية متطورة.',
      'جميع مراحل التنفيذ والخرسانات معتمدة وموثقة بتقارير هندسية مع وثيقة تأمين ملاذ ضد العيوب الخفية لمدة 10 سنوات.'
    ],
    longOverviewEn: [
      'Ideally located in prestigious Al Malqa, minutes from King Abdullah Financial District (KAFD) and Riyadh Boulevard.',
      'Features inner landscaped atrium, floor-to-ceiling thermally isolated glazing, private heated pool, and panoramic glass elevator connecting all levels.',
      'Full engineering audit compliance verified under the Saudi Building Code (SBC) with 10-year comprehensive structural insurance.'
    ],
    featuresAr: [
      'مسبح خارجي مدفأ مع شلال جداري وجلسة شواء',
      'مصعد زجاجي بانورامي يخدم كافة الأدوار',
      'تكييف مخفي مركزي VRF فائق الهدوء وموفر للطاقة',
      'أنظمة تحكم ذكي بالإضاءة والمكيفات والستائر والكاميرات',
      'أجنحة نوم ماستر مجهزة بغرف ملابس إيطالية مخصصة',
      'مجلس رجال فخم مع مدخل مستقل ومغاسل رخامية',
      'تأسيس شواحن سيارات كهربائية سريعة في الكراج',
      'صك ملكية إلكتروني رسمي مرخص فال 1200028472'
    ],
    featuresEn: [
      'Heated Outdoor Swimming Pool with Water Cascade',
      'Panoramic Hydraulic Glass Elevator Serving All Floors',
      'Concealed Inverter VRF Ultra-Quiet Climate System',
      'Smart Automation for Climate, Lighting, Shades & CCTV',
      'Ensuite Master Bedrooms with Bespoke Italian Closets',
      'Formal Grand Majlis Salon with Private Guest Entry',
      'Pre-Wired Electric Vehicle (EV) Rapid Charger Bay',
      'Clean Digital Title Deed & Official FAL No. 1200028472'
    ],
    specs: [
      { labelAr: 'مساحة الأرض', labelEn: 'Land Area', valueAr: '650 م²', valueEn: '650 m²' },
      { labelAr: 'مسطح البناء', labelEn: 'Built-up Area', valueAr: '880 م²', valueEn: '880 m²' },
      { labelAr: 'عرض الشارع', labelEn: 'Street Width', valueAr: 'شارع 20م واجهة شمالية', valueEn: '20m North-Facing' },
      { labelAr: 'شهادة البناء', labelEn: 'Certificate', valueAr: 'شهادة إتمام بناء نظامية', valueEn: 'Handover Certificate' },
      { labelAr: 'التأمين', labelEn: 'Insurance', valueAr: 'تأمين ملاذ 10 سنوات ضد العيوب', valueEn: '10-Yr Malath Policy' },
      { labelAr: 'الترخيص العقاري', labelEn: 'FAL License', valueAr: 'رخصة فال 1200028472', valueEn: 'FAL #1200028472' }
    ],
    falLicense: '1200028472',
    titleDeedNumber: '110339485721',
    advertisementNumber: '7200192849',
    coords: { lat: 24.8112, lng: 46.6234 },
    relatedSlugs: ['the-sky-crest-penthouse-khobar-corniche', 'the-shobaily-bay-royal-villa', 'the-royal-palm-coastal-palace-villa']
  },
  {
    id: 'prop-4',
    slug: 'khobar-sunset-boulevard-waterfront-residence',
    titleAr: 'شقة فاخرة بإطلالة مباشرة على غروب كورنيش الخُبر',
    titleEn: 'Khobar Sunset Boulevard Waterfront Residence',
    city: 'khobar',
    cityNameAr: 'المنطقة الشرقية – الخُبر (الكورنيش الشمالي)',
    cityNameEn: 'Eastern Province – Al Khobar (North Corniche)',
    districtAr: 'طريق الكورنيش الشمالي - الخُبر',
    districtEn: 'North Corniche Blvd - Al Khobar',
    type: 'apartment',
    typeNameAr: 'شقة فندقية فاخرة',
    typeNameEn: 'Waterfront Luxury Residence',
    status: 'sale',
    statusNameAr: 'متاح للبيع الفوري',
    statusNameEn: 'Available for Immediate Sale',
    price: '5,850,000 ر.س',
    priceRaw: 5850000,
    priceCurrency: 'SAR',
    area: '345 م² (3,710 قدم²)',
    areaRaw: 345,
    beds: '3 أجنحة نوم ماستر',
    baths: '4 حمامات فاخرة',
    parking: 'موقفين خاصين بالقبو',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
    ],
    badgeAr: 'صك إلكتروني مستقل',
    badgeEn: 'Independent Title Deed',
    descriptionAr:
      'شقة سكنية راقية في برج حديث على كورنيش الخُبر الشمالي بإطلالة بحرية مباشرة على غروب الشمس، تتضمن شرفة زجاجية ممتدة، مطبخاً مفتوحاً مجهزاً، وخدمات فندقية متكاملة.',
    descriptionEn:
      'A refined coastal luxury residence located in a premier waterfront tower on Al Khobar North Corniche. Commands direct sunset sea views, expansive glass terrace, and hotel-grade concierge amenities.',
    longOverviewAr: [
      'تتميز الشقة بموقعها الاستثنائي المباشر على كورنيش الخُبر الشمالي مع إطلالة بانورامية لا تنقطع على مياه الخليج العربي وغروب الشمس الأخاذ.',
      'تضم 3 أجنحة نوم رئيسية، صالة معيشة مفتوحة على الشرفة البحرية، مطبخاً مصمماً بأحدث التجهيزات الأوروبية، وغرفة خادمة مستقلة بحمام خاص.',
      'يستمتع قاطنو البرج بنادٍ صحي متكامل، مسبح عائلي، خدمات استقبال وحراسة على مدار الساعة، وإدارة مرافق معتمدة عبر منصة مُلاّك.'
    ],
    longOverviewEn: [
      'Situated along Al Khobar North Corniche, enjoying permanent unobstructed sea vistas and sunset panoramas over the Arabian Gulf waters.',
      'Features 3 ensuite bedrooms, airy open-concept salon opening to the sea terrace, European integrated kitchen, and separate maid quarters.',
      'Building amenities include a luxury health club, infinity pool, 24/7 concierge, and certified HOA governance via the Saudi Mullak platform.'
    ],
    featuresAr: [
      'شرفة بانورامية واسعة مطلة على البحر وغروب الشمس',
      'نادي صحي وسبا ومسبح معلق خاص بسكان البرج',
      'أمن واستقبال وصيانة مدارة على مدار الساعة',
      'موقفان مخصصان للسيارات في القبو مع تحكم إلكتروني',
      'تكييف مركزي موفر للطاقة وتحكم ذكي بالحرارة',
      'صك إلكتروني مستقل ورخصة وساطة معتمدة من فال'
    ],
    featuresEn: [
      'Expansive Panoramic Sea & Sunset Horizon Terrace',
      'Resident-Only Health Spa & Suspended Infinity Pool',
      '24/7 Monitored Front-Desk Security & Maintenance',
      '2 Designated Underground Garage Parking Spaces',
      'High-Efficiency Central HVAC with Smart Zoning',
      'Clean Digital Title Deed & Certified REGA/FAL Brokerage'
    ],
    specs: [
      { labelAr: 'المساحة الإجمالية', labelEn: 'Total Built Area', valueAr: '345 م²', valueEn: '345 m²' },
      { labelAr: 'الطابق', labelEn: 'Floor Level', valueAr: 'الطابق 14 (واجهة بحرية)', valueEn: 'Level 14 Direct Sea View' },
      { labelAr: 'رسوم الخدمات', labelEn: 'HOA & Facilities', valueAr: 'موثقة عبر منصة مُلاّك', valueEn: 'Mullak HOA Platform' },
      { labelAr: 'التكييف', labelEn: 'Climate Tech', valueAr: 'تكييف مركزي هارد عالي الكفاءة', valueEn: 'Hard Central Inverter' },
      { labelAr: 'حالة العقار', labelEn: 'Condition', valueAr: 'جاهز للسكن الفوري والإفراغ', valueEn: 'Turnkey Move-In Ready' },
      { labelAr: 'رخصة فال', labelEn: 'FAL License', valueAr: '1200028472', valueEn: '1200028472' }
    ],
    falLicense: '1200028472',
    titleDeedNumber: '410887652914',
    advertisementNumber: '7200192850',
    coords: { lat: 26.2954, lng: 50.2142 },
    relatedSlugs: ['the-sky-crest-penthouse-khobar-corniche', 'the-shobaily-bay-royal-villa', 'the-grand-rakah-executive-suite-khobar']
  },
  {
    id: 'prop-5',
    slug: 'the-grand-rakah-executive-suite-khobar',
    titleAr: 'جناح تنفيذي راقٍ للإيجار السنوي - حي الراكة الخُبر',
    titleEn: 'The Grand Rakah Executive Sky Suite',
    city: 'khobar',
    cityNameAr: 'المنطقة الشرقية – الخُبر (حي الراكة الجنوبية)',
    cityNameEn: 'Eastern Province – Al Khobar (Al Rakah South)',
    districtAr: 'طريق الملك خالد - حي الراكة - الخُبر',
    districtEn: 'King Khalid Rd - Al Rakah - Al Khobar',
    type: 'apartment',
    typeNameAr: 'جناح سكني تنفيذي للإيجار',
    typeNameEn: 'Executive Serviced Apartment',
    status: 'rent',
    statusNameAr: 'عقد إيجار سنوي موثق',
    statusNameEn: 'Annual Lease via Ejar',
    price: '240,000 ر.س / سنوياً',
    priceRaw: 240000,
    priceCurrency: 'SAR',
    period: 'year',
    area: '172 م² (1,850 قدم²)',
    areaRaw: 172,
    beds: 'غرفتا نوم ماستر',
    baths: '3 حمامات فاخرة',
    parking: 'موقف خاص بالقبو',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1600&q=80'
    ],
    badgeAr: 'توثيق عبر منصة إيجار المعتمدة',
    badgeEn: 'Ejar Platform Certified',
    descriptionAr:
      'شقة فاخرة مؤثثة بالكامل للإيجار السنوي في حي الراكة الراقي بين الخُبر والدمام. تشطيبات فندقية فاخرة وتكييف مركزي وموقع استراتيجي ممتاز بالقرب من وادي الظهران للتقنية وأرامكو.',
    descriptionEn:
      'Prime luxury rental home ready for immediate occupancy. High-end furnished layout, custom ambient lighting, walk-in closets, central HVAC, and immediate highway access to Dhahran Techno Valley and Al Khobar commercial core.',
    longOverviewAr: [
      'يقدم هذا الجناح التنفيذي حلاً سكنياً استثنائياً للكوادر الإدارية والشركات متعددة الجنسيات الباحثة عن إقامة راقية ومجهزة بالكامل في حي الراكة بين الخُبر والظهران.',
      'تتضمن الشقة أثاثاً حديثاً مختاراً بعناية، إضاءة ذكية مخفية، شبكة إنترنت فايبر عالية السرعة، ومطبخاً مجهزاً بأحدث الأجهزة الكهربائية.',
      'كافة عقود الإيجار موثقة رسمياً عبر منصة إيجار الحكومية مع صيانة دورية شاملة مجانية تقدمها هارد للتشغيل والصيانة.'
    ],
    longOverviewEn: [
      'An ideal turnkey rental residence tailored for corporate executives and consultants seeking premier furnished accommodations between Al Khobar and Dhahran.',
      'Comes fully appointed with designer Italian furnishings, architectural ambient lighting, high-speed fiber connectivity, and premium kitchen appliances.',
      'All tenancy contracts are authenticated via the Saudi government Ejar platform with full 24/7 preventive maintenance supported by Hard Facilities.'
    ],
    featuresAr: [
      'مفروشة بالكامل بتصميم راقٍ وأثاث فندقي حديث',
      'عقد إيجار تجاري أو سكني موحد عبر منصة إيجار',
      'مسبح داخلي مدفأ ونادي صحي خاص بالسكان',
      'دخول ذكي إلكتروني وحراسة أمنية 24/7',
      'موقف سيارة خاص ومظلل في القبو',
      'صيانة دورية شاملة للتكييف والسباكة والكهرباء'
    ],
    featuresEn: [
      'Fully Designer Furnished with Modern Luxury Fittings',
      'Unified Government Tenancy Contract via Ejar Platform',
      'Resident-Only Heated Indoor Pool & Fitness Hub',
      'Smart Electronic Access Control & 24/7 CCTV Security',
      'Assigned Shaded Basement Parking Bay',
      'Full 24/7 Maintenance Coverage for HVAC, MEP & Appliances'
    ],
    specs: [
      { labelAr: 'المساحة المبنية', labelEn: 'Net Built Area', valueAr: '172 م²', valueEn: '172 m²' },
      { labelAr: 'نظام الإيجار', labelEn: 'Lease Terms', valueAr: 'سنوي موثق بمنصة إيجار', valueEn: 'Annual Ejar Contract' },
      { labelAr: 'الفرش والتأثيث', labelEn: 'Furnishing', valueAr: 'مفروشة بالكامل بالخدمات', valueEn: 'Fully Turnkey Furnished' },
      { labelAr: 'الصيانة والتشغيل', labelEn: 'Facilities AMC', valueAr: 'مشمولة بالكامل 24/7 من هارد', valueEn: 'Full 24/7 AMC Included' },
      { labelAr: 'رخصة فال', labelEn: 'FAL License', valueAr: '1200028472', valueEn: '1200028472' }
    ],
    falLicense: '1200028472',
    titleDeedNumber: '210884930192',
    advertisementNumber: '7200192852',
    coords: { lat: 26.368, lng: 50.198 },
    relatedSlugs: ['khobar-sunset-boulevard-waterfront-residence', 'the-sky-crest-penthouse-khobar-corniche', 'the-shobaily-bay-royal-villa']
  },
  {
    id: 'prop-6',
    slug: 'the-shobaily-bay-royal-villa',
    titleAr: 'فيلا المارينا الملكية المستقلة - خليج الشبيلي الخُبر',
    titleEn: 'The Royal Marina Villa in Al Shobaily Bay',
    city: 'khobar',
    cityNameAr: 'المنطقة الشرقية – الخُبر (واجهة الشبيلي البحرية)',
    cityNameEn: 'Eastern Province – Al Khobar (Al Shobaily Bay)',
    districtAr: 'طريق جزيرة المارينا - الشبيلي - الخُبر',
    districtEn: 'Marina Island Way - Al Shobaily - Al Khobar',
    type: 'villa',
    typeNameAr: 'فيلا ملكية على المارينا',
    typeNameEn: 'Royal Waterfront Marina Villa',
    status: 'sale',
    statusNameAr: 'متاح للبيع والتملك',
    statusNameEn: 'Available for Purchase',
    price: '8,062,500 ر.س',
    priceRaw: 8062500,
    priceCurrency: 'SAR',
    area: '576 م² (6,200 قدم²)',
    areaRaw: 576,
    beds: '5 أجنحة ماستر',
    baths: '6 حمامات مجهزة',
    parking: '4 مواقف سيارات مظللة',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80'
    ],
    badgeAr: 'مرخص من الهيئة العامة للعقار (فال)',
    badgeEn: 'REGA / FAL Certified',
    descriptionAr:
      'فيلا ملكية فاخرة مستقلة مباشرة على مياه خليج الشبيلي مع مرسى خاص للقوارب واليخوت. تتميز بتراسات رخامية شاسعة وصالات استقبال فاخرة وإطلالات بحرية آسرة.',
    descriptionEn:
      'A premier waterfront estate located on the tranquil shores of Al Shobaily Bay. Featuring private direct boat slip, expansive marble terraces, floor-to-ceiling glass pavilions, and grand reception halls.',
    longOverviewAr: [
      'تقع هذه الفيلا الملكية في واجهة الشبيلي البحرية بالخُبر، وتوفر أسلوب حياة بحري استثنائي بفضل مرساها المباشر وموقعها المطل على مياه الخليج الهادئة.',
      'تتميز بتصميم معماري حديث يدمج بين الرخام والخشب الطبيعي والزجاج البانورامي، مع مسبح إنفينيتي خارجي مطل على الخليج ومجلس ضيوف مستقل.',
      'مرخصة رسمياً ومطابقة لكود البناء السعودي مع صك ملكية إلكتروني رسمي حر ومتاح للإفراغ الفوري عبر البورصة العقارية.'
    ],
    longOverviewEn: [
      'Situated along pristine Al Shobaily Bay in Al Khobar, presenting a rare waterfront lifestyle complete with dedicated boat berth and tranquil lagoon vistas.',
      'Features bespoke natural stone and timber architecture, sea-facing infinity pool, separate formal majlis pavilion, and chef prep kitchens.',
      'Fully licensed under REGA FAL standards with clean digital title deed available for immediate electronic conveyancing.'
    ],
    featuresAr: [
      'مرسى خاص مباشر للقوارب واليخوت',
      'مسبح إنفينيتي مواجه لمياه الخليج',
      'مجلس ضيافة رسمي مستقل مع مدخل خاص',
      'مطبخ رئيسي أوروبي ومطبخ تحضيري متصل',
      'نظام تحكم ذكي وأمان ومراقبة متطورة',
      'كراج مظلل يتسع لـ 4 سيارات',
      'صك ملكية إلكتروني معتمد برخصة فال 1200028472'
    ],
    featuresEn: [
      'Direct Private Boat Slip & Yacht Berth',
      'Sea-Facing Heated Infinity Plunge Pool',
      'Detached Formal Guest Reception Majlis',
      'Dual European Show Kitchen & Service Pantry',
      'Integrated Smart Home Control & Security',
      'Shaded Garage Accommodating 4 Cars',
      'Official REGA FAL License No. 1200028472'
    ],
    specs: [
      { labelAr: 'مساحة الأرض', labelEn: 'Plot Area', valueAr: '750 م²', valueEn: '750 m²' },
      { labelAr: 'المساحة المبنية', labelEn: 'Built-up Area', valueAr: '576 م²', valueEn: '576 m²' },
      { labelAr: 'المرسى البحري', labelEn: 'Boat Slip', valueAr: 'مرسى مخصص للقوارب بطول 35 قدماً', valueEn: 'Private 35ft Boat Slip' },
      { labelAr: 'الفرش والتأثيث', labelEn: 'Furnishing', valueAr: 'مفروشة بالكامل بتصميم مخصص', valueEn: 'Bespoke Custom Furnished' },
      { labelAr: 'الإطلالة', labelEn: 'View Type', valueAr: 'إطلالة بحرية مباشرة على خليج الشبيلي', valueEn: 'Direct Shobaily Bay Lagoon' },
      { labelAr: 'رخصة فال', labelEn: 'FAL License', valueAr: '1200028472', valueEn: '1200028472' }
    ],
    falLicense: '1200028472',
    titleDeedNumber: '310992384711',
    advertisementNumber: '7200192851',
    coords: { lat: 26.235, lng: 50.219 },
    relatedSlugs: ['the-sky-crest-penthouse-khobar-corniche', 'the-royal-palm-coastal-palace-villa', 'khobar-sunset-boulevard-waterfront-residence']
  }
];

// Compatibility aliases for legacy slugs
export const legacySlugAliases: Record<string, string> = {
  'al-olaya-business-towers': 'the-sky-crest-penthouse-khobar-corniche',
  'khobar-waterfront-luxury-villa': 'the-royal-palm-coastal-palace-villa',
  'riyadh-skyline-penthouse': 'al-malqa-elite-contemporary-villa',
  'eastern-oasis-compound': 'khobar-sunset-boulevard-waterfront-residence',
  'al-narjis-contemporary-villas': 'the-grand-rakah-executive-suite-khobar',
  'dhahran-techno-valley-offices': 'the-shobaily-bay-royal-villa'
};
