import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { referenceProperties } from '@/data/reference-data';
import { referenceProjects } from '@/data/reference-data';
import {
  hardgpSlides,
  HardgpSlide,
  galleryImages,
  teamMembers,
  testimonialsData,
  partnerLogos,
} from '@/data/skyvilla-data';

export interface PropertyDoc {
  id?: string;
  title: string;
  titleAr: string;
  type: string;
  status: 'for-sale' | 'for-rent' | 'sold' | 'reserved';
  price: number;
  area: number;
  location: string;
  locationAr: string;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  descriptionAr: string;
  image: string;
  featured: boolean;
  createdAt: any;
  updatedAt?: any;
}

export interface ProjectDoc {
  id?: string;
  title: string;
  titleAr: string;
  category: 'commercial' | 'residential' | 'industrial' | 'infrastructure';
  location: string;
  locationAr: string;
  progress: number;
  completionDate: string;
  description: string;
  descriptionAr: string;
  image: string;
  client?: string;
  budget?: string;
  featured: boolean;
  createdAt: any;
  updatedAt?: any;
}

export interface ServiceDoc {
  id?: string;
  title: string;
  titleAr: string;
  category: 'contracting' | 'realestate' | 'hvac' | 'supervision';
  description: string;
  descriptionAr: string;
  active: boolean;
  createdAt: any;
}

export interface ArticleDoc {
  id?: string;
  title: string;
  titleAr: string;
  category: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  image: string;
  author: string;
  readTime: string;
  published: boolean;
  createdAt: any;
}

export interface ConsultationDoc {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  budget?: string;
  details?: string;
  status: 'new' | 'in_progress' | 'contacted' | 'completed' | 'cancelled';
  source?: string;
  notes?: string;
  createdAt: any;
  updatedAt?: any;
}

// ----------------- CONSULTATIONS CRUD -----------------
export async function createConsultation(data: Omit<ConsultationDoc, 'id' | 'createdAt' | 'status'> & { status?: ConsultationDoc['status'] }) {
  const colRef = collection(db, 'consultations');
  const docRef = await addDoc(colRef, {
    ...data,
    status: data.status || 'new',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export function subscribeToConsultations(callback: (consultations: ConsultationDoc[]) => void) {
  const colRef = collection(db, 'consultations');
  const q = query(colRef, orderBy('createdAt', 'desc'), limit(100));

  return onSnapshot(q, (snapshot) => {
    const list: ConsultationDoc[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as ConsultationDoc);
    });
    callback(list);
  }, (error) => {
    console.error('Error fetching consultations:', error);
  });
}

export async function updateConsultationStatus(id: string, status: ConsultationDoc['status'], notes?: string) {
  const docRef = doc(db, 'consultations', id);
  const updateData: any = {
    status,
    updatedAt: serverTimestamp(),
  };
  if (notes !== undefined) updateData.notes = notes;
  await updateDoc(docRef, updateData);
}

export async function deleteConsultation(id: string) {
  const docRef = doc(db, 'consultations', id);
  await deleteDoc(docRef);
}

// ----------------- PROPERTIES CRUD -----------------
export async function getProperties(): Promise<PropertyDoc[]> {
  try {
    const colRef = collection(db, 'properties');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const list: PropertyDoc[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as PropertyDoc);
    });
    return list;
  } catch (error) {
    console.warn('Failed to fetch properties from Firestore:', error);
    return [];
  }
}

export function subscribeToProperties(callback: (properties: PropertyDoc[]) => void) {
  const colRef = collection(db, 'properties');
  const q = query(colRef, orderBy('createdAt', 'desc'), limit(50));

  return onSnapshot(q, (snapshot) => {
    const list: PropertyDoc[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as PropertyDoc);
    });
    callback(list);
  }, (error) => {
    console.error('Error listening to properties:', error);
  });
}

export async function addProperty(property: Omit<PropertyDoc, 'id' | 'createdAt'>) {
  const colRef = collection(db, 'properties');
  const docRef = await addDoc(colRef, {
    ...property,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProperty(id: string, property: Partial<PropertyDoc>) {
  const docRef = doc(db, 'properties', id);
  await updateDoc(docRef, {
    ...property,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProperty(id: string) {
  const docRef = doc(db, 'properties', id);
  await deleteDoc(docRef);
}

// ----------------- PROJECTS CRUD -----------------
export async function getProjects(): Promise<ProjectDoc[]> {
  try {
    const colRef = collection(db, 'projects');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const list: ProjectDoc[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as ProjectDoc);
    });
    return list;
  } catch (error) {
    console.warn('Failed to fetch projects from Firestore:', error);
    return [];
  }
}

export function subscribeToProjects(callback: (projects: ProjectDoc[]) => void) {
  const colRef = collection(db, 'projects');
  const q = query(colRef, orderBy('createdAt', 'desc'), limit(50));

  return onSnapshot(q, (snapshot) => {
    const list: ProjectDoc[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as ProjectDoc);
    });
    callback(list);
  }, (error) => {
    console.error('Error listening to projects:', error);
  });
}

export async function addProject(project: Omit<ProjectDoc, 'id' | 'createdAt'>) {
  const colRef = collection(db, 'projects');
  const docRef = await addDoc(colRef, {
    ...project,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProject(id: string, project: Partial<ProjectDoc>) {
  const docRef = doc(db, 'projects', id);
  await updateDoc(docRef, {
    ...project,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(id: string) {
  const docRef = doc(db, 'projects', id);
  await deleteDoc(docRef);
}

// ----------------- SERVICES CRUD -----------------
export function subscribeToServices(callback: (services: ServiceDoc[]) => void) {
  const colRef = collection(db, 'services');
  const q = query(colRef, orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const list: ServiceDoc[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as ServiceDoc);
    });
    callback(list);
  }, (error) => {
    console.error('Error listening to services:', error);
  });
}

export async function addService(service: Omit<ServiceDoc, 'id' | 'createdAt'>) {
  const colRef = collection(db, 'services');
  const docRef = await addDoc(colRef, {
    ...service,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateService(id: string, service: Partial<ServiceDoc>) {
  const docRef = doc(db, 'services', id);
  await updateDoc(docRef, service);
}

export async function deleteService(id: string) {
  const docRef = doc(db, 'services', id);
  await deleteDoc(docRef);
}

// ----------------- ARTICLES CRUD -----------------
export function subscribeToArticles(callback: (articles: ArticleDoc[]) => void) {
  const colRef = collection(db, 'articles');
  const q = query(colRef, orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const list: ArticleDoc[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as ArticleDoc);
    });
    callback(list);
  }, (error) => {
    console.error('Error listening to articles:', error);
  });
}

export async function addArticle(article: Omit<ArticleDoc, 'id' | 'createdAt'>) {
  const colRef = collection(db, 'articles');
  const docRef = await addDoc(colRef, {
    ...article,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateArticle(id: string, article: Partial<ArticleDoc>) {
  const docRef = doc(db, 'articles', id);
  await updateDoc(docRef, article);
}

export async function deleteArticle(id: string) {
  const docRef = doc(db, 'articles', id);
  await deleteDoc(docRef);
}

// ----------------- SEEDING INITIAL DATABASE -----------------
export async function seedInitialDatabase() {
  try {
    const propsCol = collection(db, 'properties');
    const existingProps = await getDocs(query(propsCol, limit(1)));

    if (existingProps.empty) {
      console.log('Seeding initial properties to Firestore...');
      for (const p of referenceProperties.filter(Boolean)) {
        if (!p) continue;
        await addDoc(propsCol, {
          title: p.title?.en || '',
          titleAr: p.title?.ar || '',
          type: p.type || 'villa',
          status: p.status || 'for-sale',
          price: p.price?.sar || 0,
          area: p.areaSqM || 350,
          location: p.location?.city?.en || '',
          locationAr: p.location?.city?.ar || '',
          bedrooms: p.bedrooms ?? 4,
          bathrooms: p.bathrooms ?? 3,
          description: p.description?.en || '',
          descriptionAr: p.description?.ar || '',
          image: p.images?.[0] || '/images/hardgp/por4-big.jpg',
          featured: !!p.featured,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    }

    const projCol = collection(db, 'projects');
    const existingProj = await getDocs(query(projCol, limit(1)));

    if (existingProj.empty) {
      console.log('Seeding initial projects to Firestore...');
      for (const pr of referenceProjects) {
        await addDoc(projCol, {
          title: pr.title.en,
          titleAr: pr.title.ar,
          category: 'commercial',
          location: pr.location.en,
          locationAr: pr.location.ar,
          progress: 85,
          completionDate: pr.handoverDate.ar,
          description: pr.description.en,
          descriptionAr: pr.description.ar,
          image: pr.image,
          client: 'HARD Group Developments',
          budget: '145,000,000 SAR',
          featured: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    }

    const consultCol = collection(db, 'consultations');
    const existingConsult = await getDocs(query(consultCol, limit(1)));

    if (existingConsult.empty) {
      console.log('Seeding demo consultation requests...');
      await addDoc(consultCol, {
        name: 'م. عبدالله بن فهد الدوسري',
        phone: '+966501234567',
        email: 'info@hardgp.com',
        service: 'المقاولات العامة والتطوير الإنشائي',
        budget: '15,000,000 - 25,000,000 ريال',
        details: 'طلب تنفيذ مجمع تجاري مكتبي على طريق الملك فهد بالخبر بمساحة 4,200 م² وفق كود البناء السعودي SBC.',
        status: 'new',
        source: 'حاسبة المشاريع التقديرية',
        notes: 'العميل مهتم ببدء الأعمال الإنشائية في الربع القادم، يرجى تجهيز دراسة BOQ أولية.',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await addDoc(consultCol, {
        name: 'سارة بنت عبدالعزيز التميمي',
        phone: '+966559876543',
        email: 'sara.tamimi@luxuryestates.com',
        service: 'الوساطة والاستثمار العقاري (فال)',
        budget: '8,500,000 ريال',
        details: 'شراء قصر سكني فاخر بحي الشاطئ الشرقي بالخبر مع إطلالة بحرية.',
        status: 'in_progress',
        source: 'استمارة الموقع',
        notes: 'تم التواصل هاتفياً وتحديد موعد معاينة ميدانية يوم الخميس.',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await addDoc(consultCol, {
        name: 'شركة آفاق الشرقية للتشغيل',
        phone: '+966138901234',
        email: 'projects@afaq-eastern.com',
        service: 'صيانة وتكييف الهواء وعقود AMC',
        budget: 'عقد سنوي مفتوح',
        details: 'عقد صيانة وقائية شامل لمحطة شيلرات مركزية سعة 1,200 طن تبريد لبرج إداري.',
        status: 'contacted',
        source: 'طوارئ التكييف 24/7',
        notes: 'تم إرسال فريق المهندسين للكشف الفني الميداني وتقديم عرض سعر AMC.',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    return true;
  } catch (error) {
    console.error('Error seeding Firestore initial data:', error);
    return false;
  }
}

// ----------------- SITE SETTINGS & DYNAMIC CONTENT -----------------
export interface PageBannerDoc {
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  image: string;
}

export interface DivisionCardDoc {
  titleAr: string;
  titleEn: string;
  badgeAr: string;
  badgeEn: string;
  descAr: string;
  descEn: string;
  image: string;
  pathDisplay?: string;
}

export interface SectionContentDoc {
  titleAr?: string;
  titleEn?: string;
  subtitleAr?: string;
  subtitleEn?: string;
  descAr?: string;
  descEn?: string;
  image?: string;
  videoUrl?: string;
}

export interface PageSeoDoc {
  metaTitleAr: string;
  metaTitleEn: string;
  metaDescriptionAr: string;
  metaDescriptionEn: string;
  keywordsAr: string;
  keywordsEn: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export interface SiteSettingsDoc {
  heroTitleAr: string;
  heroTitleEn: string;
  heroSubtitleAr: string;
  heroSubtitleEn: string;
  heroBadgeAr: string;
  heroBadgeEn: string;
  heroDescriptionAr?: string;
  heroDescriptionEn?: string;
  heroImage?: string;
  heroCtaQuoteAr?: string;
  heroCtaQuoteEn?: string;
  heroCtaCalcAr?: string;
  heroCtaCalcEn?: string;
  slides?: HardgpSlide[];
  galleryItems?: Array<{
    id: string;
    title: string;
    title_ar: string;
    category: string;
    image: string;
    area?: string;
    date?: string;
  }>;
  teamMembers?: Array<{
    id: string;
    name: string;
    name_ar: string;
    role: string;
    role_ar: string;
    image: string;
  }>;
  testimonials?: Array<{
    id: string;
    name: string;
    name_ar: string;
    role: string;
    role_ar: string;
    quote: string;
    quote_ar: string;
    rating: number;
    avatar?: string;
    image?: string;
  }>;
  partnerLogos?: string[];
  pageBanners?: {
    construction?: PageBannerDoc;
    realestate?: PageBannerDoc;
    hvac?: PageBannerDoc;
    projects?: PageBannerDoc;
    listings?: PageBannerDoc;
    services?: PageBannerDoc;
    about?: PageBannerDoc;
    contact?: PageBannerDoc;
    gallery?: PageBannerDoc;
    careers?: PageBannerDoc;
    faqs?: PageBannerDoc;
    team?: PageBannerDoc;
    blog?: PageBannerDoc;
    testimonials?: PageBannerDoc;
    pricing?: PageBannerDoc;
    video?: PageBannerDoc;
  };
  divisionCards?: {
    realestate?: DivisionCardDoc;
    contracting?: DivisionCardDoc;
    hvac?: DivisionCardDoc;
  };
  aboutSection?: SectionContentDoc;
  whyChooseUs?: SectionContentDoc;
  skillsSection?: SectionContentDoc & { whoDescAr?: string; whoDescEn?: string };
  sectionTitles: {
    propertiesAr: string;
    propertiesEn: string;
    propertiesSubtitleAr?: string;
    propertiesSubtitleEn?: string;
    projectsAr: string;
    projectsEn: string;
    projectsSubtitleAr?: string;
    projectsSubtitleEn?: string;
    contractingAr: string;
    contractingEn: string;
    hvacAr: string;
    hvacEn: string;
    realestateAr: string;
    realestateEn: string;
    servicesAr: string;
    servicesEn: string;
    calculatorAr: string;
    calculatorEn: string;
    testimonialsAr: string;
    testimonialsEn: string;
    branchesAr: string;
    branchesEn: string;
    blogAr: string;
    blogEn: string;
    faqAr: string;
    faqEn: string;
    aboutAr: string;
    aboutEn: string;
  };
  contactInfo: {
    hotline: string;
    emergencyPhone: string;
    email: string;
    addressKhobarAr: string;
    addressKhobarEn: string;
    addressRiyadhAr: string;
    addressRiyadhEn: string;
    licenseVal: string;
    codeSbc: string;
    crNumber: string;
  };
  stats: {
    projectsCount: string;
    investmentSar: string;
    satisfactionRate: string;
    engineersCount: string;
  };
  seo: {
    metaTitleAr: string;
    metaTitleEn: string;
    metaDescriptionAr: string;
    metaDescriptionEn: string;
    keywordsAr: string;
    keywordsEn: string;
    ogImage: string;
    canonicalUrl: string;
    googleVerification?: string;
    indexNowKey?: string;
    lastPingedAt?: any;
    perPageSeo?: Record<string, PageSeoDoc>;
  };
  updatedAt?: any;
}

export const defaultSiteSettings: SiteSettingsDoc = {
  heroTitleAr: 'مجموعة هارد للمقاولات العامة',
  heroTitleEn: 'HARD Group',
  heroSubtitleAr: 'للمقاولات والتطوير العقاري',
  heroSubtitleEn: 'General Contracting & Real Estate Development',
  heroBadgeAr: 'المساهمة في القطاع الصناعي والبنية التحتية في المملكة منذ 2004',
  heroBadgeEn: 'Contributing to Saudi Arabia industrial & infrastructure sector since 2004',
  heroDescriptionAr: 'مؤسسة هارد للمقاولات العامة، تساهم في قطاع الصناعة والبنية التحتية في المملكة العربية السعودية منذ عام 2004 بخدمات إنشائية موثوقة ومتعددة الأبعاد، وتطوير عقاري، وخدمات تشغيل وصيانة شاملة.',
  heroDescriptionEn: 'HARD General Contracting Establishment, has been contributing to Saudi Arabia industrial and infrastructure sector since 2004 with reliable, multi-dimensional construction services, property development, and comprehensive maintenance operations.',
  heroImage: '/images/hardgp/por1-big.jpg',
  heroCtaQuoteAr: 'طلب استشارة وتسعير فوري',
  heroCtaQuoteEn: 'Request Instant Estimate',
  heroCtaCalcAr: 'حاسبة تكاليف المشاريع',
  heroCtaCalcEn: 'Cost Estimator',
  slides: hardgpSlides,
  pageBanners: {
    construction: {
      titleAr: 'هارد للإنشاءات والمقاولات العامة',
      titleEn: 'HARD Construction & Contracting',
      subtitleAr: 'تصنيف مقاولات عامة فئة أولى واعتماد كود البناء السعودي (SBC) لتنفيذ الأبراج والمجمعات الذكية',
      subtitleEn: 'Class-1 general contracting for commercial towers, industrial facilities, and smart compounds',
      image: '/images/hardgp/por1-big.jpg',
    },
    realestate: {
      titleAr: 'هارد للعقارات والاستثمار',
      titleEn: 'HARD Real Estate & Investment',
      subtitleAr: 'وساطة وتسويق معتمد برخصة فال 1200028472 وتطوير المخططات الكبرى في المملكة',
      subtitleEn: 'VAL licensed real estate brokerage and prime investment development marketing',
      image: '/images/hardgp/por4-big.jpg',
    },
    hvac: {
      titleAr: 'هارد لصيانة وتكييف الهواء',
      titleEn: 'HARD HVAC & Facilities Maintenance',
      subtitleAr: 'عقود الصيانة الوقائية السنوية AMC وطوارئ 24/7 للشيلرات المركزية وأنظمة VRF',
      subtitleEn: 'Preventive annual AMC contracts and 24/7 emergency dispatch for industrial and residential cooling',
      image: '/images/hardgp/slide-12.jpg',
    },
    projects: {
      titleAr: 'المشاريع الاستراتيجية والتطويرية',
      titleEn: 'Strategic & Landmark Projects',
      subtitleAr: 'سجل حافل بتنفيذ الأبراج والمجمعات التجارية والطبية واللوجستية وفق أعلى معايير الجودة',
      subtitleEn: 'Proven track record delivering commercial towers, healthcare, and logistics facilities',
      image: '/images/hardgp/por2-big.jpg',
    },
    listings: {
      titleAr: 'العقارات والفرص الاستثمارية',
      titleEn: 'Properties & Investment Opportunities',
      subtitleAr: 'أصول عقارية فاخرة ومخططات معتمدة برخصة فال في المنطقة الشرقية والرياض',
      subtitleEn: 'Verified luxury real estate assets backed by certified VAL license in Eastern Province & Riyadh',
      image: '/images/hardgp/por4-big.jpg',
    },
    services: {
      titleAr: 'مصفوفة الخدمات المتكاملة',
      titleEn: 'Comprehensive Engineering Services',
      subtitleAr: 'منظومة شاملة للإنشاءات، التطوير العقاري، وأنظمة التشغيل والصيانة الكهروميكانيكية',
      subtitleEn: 'Turnkey contracting, real estate brokerage, and electromechanical facility operations',
      image: '/images/hardgp/por3-big.jpg',
    },
    about: {
      titleAr: 'عن مجموعة هارد القابضة',
      titleEn: 'About HARD Group Holding',
      subtitleAr: 'المساهمة في القطاع الصناعي والبنية التحتية في المملكة العربية السعودية منذ 2004',
      subtitleEn: 'Contributing to Saudi Arabia industrial & infrastructure sector since 2004',
      image: '/images/hardgp/por6-big.jpg',
    },
    contact: {
      titleAr: 'اتصل بنا وتواصل مع خبرائنا',
      titleEn: 'Contact Us & Reach Our Experts',
      subtitleAr: 'فروعنا في الدمام والخبر ومكاتب التوسع بالرياض لخدمتكم وتقديم الاستشارات الفورية',
      subtitleEn: 'Offices in Dammam, Khobar, and Riyadh ready to assist your projects around the clock',
      image: '/images/hardgp/por1-big.jpg',
    },
    gallery: {
      titleAr: 'معرض الصور والمشاريع بجودة كاملة',
      titleEn: 'High-Resolution Project Gallery',
      subtitleAr: 'معرض بصري تفاعلي يبرز الفلل السكنية الفارهة، والواجهات الزجاجية المعاصرة، وأدق التفاصيل الإنشائية',
      subtitleEn: 'Visual showcase of completed sky villas, commercial atriums, and precision engineering details',
      image: '/images/hardgp/por7-big.jpg',
    },
    team: {
      titleAr: 'فريق عمل وقيادات مجموعة هارد',
      titleEn: 'Our Executive Leadership & Engineers',
      subtitleAr: 'نخبة من كبار المعماريين والمهندسين المدنيين ومديري المشاريع وراء كل صرح ناجح',
      subtitleEn: 'Skilled architects, civil engineers, and master builders behind every award-winning project',
      image: '/images/hardgp/por6-big.jpg',
    },
    blog: {
      titleAr: 'المركز الإعلامي والتقارير الفنية',
      titleEn: 'Media Center & Technical Insights',
      subtitleAr: 'أحدث التحديثات حول كود البناء السعودي وتطورات سوق العقارات والإنشاءات',
      subtitleEn: 'Latest analysis on Saudi Building Code compliance, market trends, and civil innovations',
      image: '/images/hardgp/por2-big.jpg',
    },
    testimonials: {
      titleAr: 'شهادات العملاء وشركاء النجاح',
      titleEn: 'Client Testimonials & Partner Trust',
      subtitleAr: 'ثقة كبرى الشركات والجهات الحكومية والمستثمرين في دقة إنجازنا وجودة تسليمنا',
      subtitleEn: 'Testimonials from leading government entities, commercial giants, and private investors',
      image: '/images/hardgp/por10-big.jpg',
    },
    pricing: {
      titleAr: 'خطط وباقات الخدمات والتسعير',
      titleEn: 'Transparent Pricing & Contracting Packages',
      subtitleAr: 'باقات تسعير واضحة وشاملة للاستشارات والتصميم والإشراف الهندسي وإدارة المشاريع',
      subtitleEn: 'Structured service packages for architectural consulting, supervision, and turnkey contracting',
      image: '/images/hardgp/por3-big.jpg',
    },
    faqs: {
      titleAr: 'الأسئلة الشائعة والمساعد الفوري',
      titleEn: 'Frequently Asked Questions & Advisory',
      subtitleAr: 'إجابات تفصيلية وشاملة عن إجراءات التعاقد والتراخيص ورخصة فال والضمانات الممتدة',
      subtitleEn: 'Comprehensive answers regarding contracts, VAL licensing, SBC compliance, and guarantees',
      image: '/images/hardgp/por5-big.jpg',
    },
    video: {
      titleAr: 'معرض الفيديو والتوثيق الميداني',
      titleEn: 'Video Gallery & Field Documentation',
      subtitleAr: 'مقاطع توثيقية حية لمراحل الصب الإنشائي والتشطيبات وتسليم المفاتيح للمشاريع',
      subtitleEn: 'Cinematic video chronicles documenting foundation casting, MEP installations, and handovers',
      image: '/images/hardgp/por2-big.jpg',
    },
  },
  galleryItems: galleryImages,
  teamMembers: teamMembers,
  testimonials: testimonialsData,
  partnerLogos: partnerLogos,
  divisionCards: {
    realestate: {
      titleAr: 'هارد للعقارات والاستثمار',
      titleEn: 'HARD Real Estate & Investment',
      badgeAr: 'رخصة فال 1200028472',
      badgeEn: 'VAL Licensed 1200028472',
      descAr: 'الذراع العقاري والاستثماري الرائد في المملكة العربية السعودية، متخصص في التسويق والوساطة المعتمدة من الهيئة العامة للعقار (فال)، وإدارة المحافظ الاستثمارية وتطوير الفرص في المنطقة الشرقية والرياض.',
      descEn: 'The premier real estate and investment arm licensed by the Real Estate General Authority (VAL), specializing in certified brokerage, portfolio management, and prime developments across Eastern Province and Riyadh.',
      image: '/images/hardgp/por4-big.jpg',
      pathDisplay: '/realestate',
    },
    contracting: {
      titleAr: 'هارد للإنشاءات والمقاولات العامة',
      titleEn: 'HARD Construction & Contracting',
      badgeAr: 'تصنيف مقاولات فئة أولى • كود SBC',
      badgeEn: 'Class-1 Contractor • SBC Code',
      descAr: 'الذراع الإنشائي والهندسي لمجموعة هارد، يقدم خدمات المقاولات العامة المصنفة فئة أولى لتنفيذ الأبراج التجارية، المجمعات السكنية، والمنشآت الذكية بأعلى كفاءة ومعايير كود البناء السعودي (SBC).',
      descEn: 'The engineering powerhouse of HARD Group, delivering Class-1 classified general contracting for commercial towers, residential communities, and advanced infrastructure under the Saudi Building Code (SBC).',
      image: '/images/hardgp/por1-big.jpg',
      pathDisplay: '/construction',
    },
    hvac: {
      titleAr: 'هارد لصيانة وتكييف الهواء',
      titleEn: 'HARD HVAC & Facilities Maintenance',
      badgeAr: 'طوارئ واستجابة 24/7 • عقود AMC',
      badgeEn: '24/7 Emergency • AMC Contracts',
      descAr: 'الذراع التخصصي للخدمات الكهروميكانيكية والتبريد، يقدم عقود الصيانة الوقائية (AMC) للشيلرات المركزية، أنظمة VRF الحديثة، وتنقية مجاري الهواء مع طوارئ واستجابة فورية على مدار الساعة.',
      descEn: 'The electromechanical engineering arm providing annual preventive maintenance contracts (AMC) for central chillers, VRF variable refrigerant systems, air quality sanitation, and 24/7 rapid response.',
      image: '/images/hardgp/slide-12.jpg',
      pathDisplay: '/hvac',
    },
  },
  aboutSection: {
    titleAr: 'عن مجموعة هارد للمقاولات والتطوير',
    titleEn: 'About HARD Group',
    subtitleAr: 'المساهمة في قطاع الصناعة والبنية التحتية منذ 2004',
    subtitleEn: 'Contributing to Saudi infrastructure since 2004',
    descAr: 'مؤسسة هارد للمقاولات العامة، تساهم في قطاع الصناعة والبنية التحتية في المملكة العربية السعودية منذ عام 2004 بخدمات إنشائية موثوقة ومتعددة الأبعاد، وتطوير عقاري، وخدمات تشغيل وصيانة شاملة.',
    descEn: 'HARD General Contracting Establishment, has been contributing to Saudi Arabia industrial and infrastructure sector since 2004 with reliable, multi-dimensional construction services, property development, and comprehensive maintenance operations.',
    image: '/images/hardgp/por6-big.jpg',
  },
  whyChooseUs: {
    titleAr: 'لماذا تختار مجموعة هارد لمشروعك؟',
    titleEn: 'Why Choose HARD Group for Your Project?',
    subtitleAr: 'معايير هندسية صارمة وتطبيق معتمد لكود البناء السعودي SBC',
    subtitleEn: 'Rigorous engineering standards & 100% Saudi Building Code compliance',
    image: '/images/hardgp/por2-big.jpg',
  },
  skillsSection: {
    titleAr: 'كفاءاتنا الهندسية وإمكانات التنفيذ',
    titleEn: 'Our Engineering Competencies & Capabilities',
    subtitleAr: 'فريق عمل متكامل من المهندسين والفنيين المؤهلين',
    subtitleEn: 'Integrated team of accredited engineers and technicians',
    image: '/images/hardgp/por6-big.jpg',
    whoDescAr: 'نمتلك طواقم هندسية متخصصة ومعدات ثقيلة متطورة تتيح لنا تنفيذ أصعب المشاريع الإنشائية والتجارية والصناعية بدقة متناهية والتزام صارم بمواعيد التسليم.',
    whoDescEn: 'We possess specialized engineering staff and advanced heavy equipment enabling the execution of the most demanding civil, commercial, and industrial projects with strict deadlines.',
  },
  sectionTitles: {
    propertiesAr: 'فرص استثمارية وعقارات مميزة',
    propertiesEn: 'Featured Investment Properties',
    propertiesSubtitleAr: 'أصول عقارية فاخرة موثقة برخصة فال المعتمدة 1200028472 بالمنطقة الشرقية والرياض',
    propertiesSubtitleEn: 'Verified luxury real estate assets backed by certified VAL license in Eastern Province & Riyadh',
    projectsAr: 'المشاريع الاستراتيجية والتطويرية',
    projectsEn: 'Strategic & Master Projects',
    projectsSubtitleAr: 'سجل حافل بتنفيذ الأبراج والمجمعات التجارية والطبية واللوجستية وفق أعلى معايير الجودة',
    projectsSubtitleEn: 'Proven track record delivering commercial towers, healthcare, and logistics facilities',
    contractingAr: 'هارد للمقاولات العامة والإنشاءات',
    contractingEn: 'HARD General Contracting & Civil Works',
    hvacAr: 'هارد لأنظمة التكييف والتشغيل 24/7',
    hvacEn: 'HARD HVAC & Facility Operations 24/7',
    realestateAr: 'هارد للوساطة والتسويق العقاري (فال)',
    realestateEn: 'HARD Real Estate Brokerage (VAL)',
    servicesAr: 'مصفوفة الخدمات الهندسية والإنشائية',
    servicesEn: 'Comprehensive Engineering Services',
    calculatorAr: 'حاسبة تكاليف المشاريع التقديرية',
    calculatorEn: 'Interactive Project Cost Calculator',
    testimonialsAr: 'شهادات العملاء وسجل الإنجاز المؤسسي',
    testimonialsEn: 'Client Testimonials & Institutional Track Record',
    branchesAr: 'فروعنا ومكاتبنا في المملكة العربية السعودية',
    branchesEn: 'Our Branches & Kingdom Presence',
    blogAr: 'المركز الإعلامي والتقارير العقارية',
    blogEn: 'Media Center & Market Reports',
    faqAr: 'الأسئلة الشائعة والتراخيص الرسمية',
    faqEn: 'Frequently Asked Questions & Accreditations',
    aboutAr: 'عن مجموعة هارد القابضة',
    aboutEn: 'About HARD Group Holding',
  },
  contactInfo: {
    hotline: '+966138004273',
    emergencyPhone: '+966556125711',
    email: 'info@hardgp.com',
    addressKhobarAr: '4737 شارع 18 - حي الريان وحدة رقم: 1، الدمام 32256 - 8405، المملكة العربية السعودية',
    addressKhobarEn: '4737 18th - Al-Rayyan Unit No.: 1, Dammam 32256 - 8405, Kingdom of Saudi Arabia',
    addressRiyadhAr: 'مشاريع وخدمات التوسع: المنطقة الوسطى (الرياض) والمنطقة الغربية',
    addressRiyadhEn: 'Expansion Projects: Central & Western Provinces',
    licenseVal: '1200028472',
    codeSbc: 'SBC 100% Certified',
    crNumber: '2051067890',
  },
  stats: {
    projectsCount: '+180',
    investmentSar: '4.8 مليار',
    satisfactionRate: '99.4%',
    engineersCount: '+65',
  },
  seo: {
    metaTitleAr: 'مجموعة هارد | المقاولات العامة والتطوير الإنشائي والعقاري - HARD Group',
    metaTitleEn: 'HARD Group | General Contracting & Real Estate Development KSA',
    metaDescriptionAr: 'مجموعة هارد للمقاولات العامة فئة أولى والتطوير الإنشائي والوساطة العقارية المرخصة (فال 1200028472). تنفيذ أبراج ومجمعات وفق كود البناء السعودي SBC وهندسة تشغيل المرافق AMC.',
    metaDescriptionEn: 'HARD Group: Class-1 general contracting, certified SBC structural development, licensed VAL real estate brokerage, and 24/7 HVAC AMC engineering in Saudi Arabia.',
    keywordsAr: 'مقاولات عامة, تطوير عقاري, كود البناء السعودي, SBC, رخصة فال, وساطة عقارية, الخبر, الرياض, تكييف مركزي, مجموعة هارد',
    keywordsEn: 'general contracting, real estate development, Saudi building code, SBC, VAL license, KSA real estate, HVAC AMC, HARD group',
    ogImage: '/images/hardgp/por1-big.jpg',
    canonicalUrl: 'https://hardgp.com',
    googleVerification: 'google-site-verification-hard-group-ksa',
    indexNowKey: 'hardgroup_indexnow_2026_sec',
    perPageSeo: {
      home: {
        metaTitleAr: 'مجموعة هارد | المقاولات العامة والتطوير الإنشائي والعقاري - HARD Group',
        metaTitleEn: 'HARD Group | General Contracting & Real Estate Development KSA',
        metaDescriptionAr: 'مجموعة هارد للمقاولات العامة فئة أولى والتطوير الإنشائي والوساطة العقارية المرخصة (فال 1200028472). تنفيذ أبراج ومجمعات وفق كود البناء السعودي SBC وهندسة تشغيل المرافق AMC.',
        metaDescriptionEn: 'HARD Group: Class-1 general contracting, certified SBC structural development, licensed VAL real estate brokerage, and 24/7 HVAC AMC engineering in Saudi Arabia.',
        keywordsAr: 'مقاولات عامة, تطوير عقاري, كود البناء السعودي, SBC, رخصة فال, وساطة عقارية, الخبر, الرياض, تكييف مركزي, مجموعة هارد',
        keywordsEn: 'general contracting, real estate development, Saudi building code, SBC, VAL license, KSA real estate, HVAC AMC, HARD group',
        ogImage: '/images/hardgp/por1-big.jpg',
        canonicalUrl: 'https://hardgp.com',
      },
      about: {
        metaTitleAr: 'من نحن وتاريخ التأسيس | مجموعة هارد للمقاولات والتطوير الإنشائي',
        metaTitleEn: 'About HARD Group | Saudi Construction & Development Heritage Since 2004',
        metaDescriptionAr: 'تعرف على تاريخ وإنجازات مجموعة هارد للمقاولات العامة والتطوير العقاري منذ عام 2004 في المملكة العربية السعودية وسجل مشروعاتها الكبرى.',
        metaDescriptionEn: 'Discover the history, leadership, and infrastructure milestones of HARD Group in Saudi Arabia since 2004.',
        keywordsAr: 'عن مجموعة هارد, تاريخ التأسيس, مقاولات الشرقية, رؤية 2030, إنجازات هندسية',
        keywordsEn: 'about HARD group, Saudi infrastructure contractor, history since 2004, leadership',
        ogImage: '/images/hardgp/por6-big.jpg',
        canonicalUrl: 'https://hardgp.com/about-us',
      },
      services: {
        metaTitleAr: 'دليل الخدمات الهندسية المتكاملة | مقاولات، عقارات فال، تكييف AMC',
        metaTitleEn: 'Comprehensive Engineering Services | HARD Group Saudi Arabia',
        metaDescriptionAr: 'مصفوفة خدمات متكاملة تغطي المقاولات العامة الإنشائية، الوساطة والتسويق العقاري المرخص (فال 1200028472)، وتشغيل وتكييف المرافق وعقود الصيانة AMC.',
        metaDescriptionEn: 'Full turnkey solutions spanning general contracting, VAL licensed property brokerage, and 24/7 electromechanical HVAC operations.',
        keywordsAr: 'خدمات مقاولات, وساطة عقارية, صيانة تكييف مركزي, عقود AMC, تشغيل مرافق, تسليم مفتاح',
        keywordsEn: 'contracting services, real estate brokerage, HVAC maintenance AMC, facility operations',
        ogImage: '/images/hardgp/por3-big.jpg',
        canonicalUrl: 'https://hardgp.com/services',
      },
      projects: {
        metaTitleAr: 'المشاريع الاستراتيجية والتطويرية | سجل إنجازات مجموعة هارد',
        metaTitleEn: 'Master Projects & Developments | HARD Group Landmark Portfolio',
        metaDescriptionAr: 'استعرض أحدث الأبراج التجارية، المجمعات السكنية، والمراكز اللوجستية المنفذة بأعلى مواصفات كود البناء السعودي SBC من مجموعة هارد.',
        metaDescriptionEn: 'Explore our portfolio of commercial towers, residential communities, and advanced logistics complexes in KSA.',
        keywordsAr: 'مشاريع هارد, أبراج الخبر, مجمعات الرياض, كود البناء السعودي, تنفيذ إنشائي',
        keywordsEn: 'master projects, corporate towers, residential compounds, Saudi building code, Khobar, Riyadh',
        ogImage: '/images/hardgp/por2-big.jpg',
        canonicalUrl: 'https://hardgp.com/projects',
      },
      listings: {
        metaTitleAr: 'العقارات والقصور والفرص الاستثمارية المعتمدة | رخصة فال 1200028472',
        metaTitleEn: 'Prime Properties & Luxury Real Estate | HARD Group VAL Certified',
        metaDescriptionAr: 'عقارات حصرية، فلل فاخرة، ومجمعات استثمارية معتمدة برخصة فال في المنطقة الشرقية والرياض مع خطط تملك واستثمار موثوقة.',
        metaDescriptionEn: 'Exclusive luxury villas, premium commercial buildings, and high-yield real estate assets in Eastern Province & Riyadh.',
        keywordsAr: 'عقارات للبيع, فلل فاخرة بالخبر, أراضي استثمارية, رخصة فال, تسويق عقاري مرخص',
        keywordsEn: 'properties for sale, luxury villas Khobar, investment real estate Riyadh, VAL licensed',
        ogImage: '/images/hardgp/por4-big.jpg',
        canonicalUrl: 'https://hardgp.com/listings',
      },
      realestate: {
        metaTitleAr: 'هارد للعقارات والاستثمار | وساطة وتسويق معتمد برخصة فال 1200028472',
        metaTitleEn: 'HARD Real Estate & Investment | Licensed VAL Brokerage 1200028472',
        metaDescriptionAr: 'الذراع العقاري الرائد لمجموعة هارد، يقدم وساطة معتمدة وتسويق للمخططات وإدارة المحافظ الاستثمارية في المملكة العربية السعودية.',
        metaDescriptionEn: 'Certified real estate brokerage, off-plan property marketing, and portfolio asset management across KSA.',
        keywordsAr: 'هارد العقارية, رخصة فال 1200028472, وساطة معتمدة, تسويق مشاريع, إدارة أملاك',
        keywordsEn: 'HARD real estate, VAL license 1200028472, property marketing, portfolio management KSA',
        ogImage: '/images/hardgp/por4-big.jpg',
        canonicalUrl: 'https://hardgp.com/realestate',
      },
      construction: {
        metaTitleAr: 'هارد للإنشاءات والمقاولات العامة | تصنيف فئة أولى واعتماد كود SBC',
        metaTitleEn: 'HARD Construction & Contracting | Class-1 Saudi Building Code Certified',
        metaDescriptionAr: 'تنفيذ الأبراج الذكية والمجمعات والمصانع بأعلى معايير كود البناء السعودي (SBC) وتسليم المفتاح مع ضمانات شاملة للهيكل والتشطيب.',
        metaDescriptionEn: 'Class-1 general contracting for commercial towers, industrial facilities, and smart compounds under SBC standards.',
        keywordsAr: 'هارد للإنشاءات, مقاولات فئة أولى, كود البناء السعودي, SBC, تشييد مباني, تسليم مفتاح',
        keywordsEn: 'HARD construction, class-1 general contractor, Saudi building code SBC, turnkey building',
        ogImage: '/images/hardgp/por1-big.jpg',
        canonicalUrl: 'https://hardgp.com/construction',
      },
      hvac: {
        metaTitleAr: 'هارد لصيانة وتكييف الهواء | عقود صيانة سنوية AMC وطوارئ 24/7',
        metaTitleEn: 'HARD HVAC & Facility Maintenance | 24/7 AMC Preventive Contracts',
        metaDescriptionAr: 'حلول التكييف المركزي، الشيلرات الصناعية، أنظمة VRF، وعقود الصيانة الوقائية السنوية AMC مع طواقم استجابة فورية 24/7.',
        metaDescriptionEn: 'Annual preventive maintenance contracts (AMC), central chiller overhaul, and 24/7 emergency response for commercial cooling.',
        keywordsAr: 'هارد للتكييف, صيانة تكييف مركزي, عقود AMC, شيلرات, تكييف VRF, طوارئ تكييف 24/7',
        keywordsEn: 'HARD HVAC, chiller maintenance, AMC annual contracts, VRF systems, 24/7 cooling emergency',
        ogImage: '/images/hardgp/slide-12.jpg',
        canonicalUrl: 'https://hardgp.com/hvac',
      },
      contact: {
        metaTitleAr: 'اتصل بمجموعة هارد | فروع الخبر والدمام والرياض واستشارات 24/7',
        metaTitleEn: 'Contact HARD Group | Headquarters & Branch Offices Saudi Arabia',
        metaDescriptionAr: 'تواصل مع الإدارة العامة والمهندسين الاستشاريين لمجموعة هارد عبر الهاتف الموحد +966138004273 أو البريد info@hardgp.com.',
        metaDescriptionEn: 'Get in touch with HARD Group headquarters and branch offices in Khobar, Dammam, and Riyadh for instant estimates.',
        keywordsAr: 'اتصل بنا, فروع مجموعة هارد, رقم هاتف مقاولات, استشارة فورية, الخبر, الرياض',
        keywordsEn: 'contact HARD group, Khobar office, Dammam headquarters, Riyadh branch, instant quotation',
        ogImage: '/images/hardgp/por1-big.jpg',
        canonicalUrl: 'https://hardgp.com/contact-us',
      },
      blog: {
        metaTitleAr: 'المركز الإعلامي والتقارير الفنية | أبحاث السوق العقاري والإنشائي',
        metaTitleEn: 'Media Center & Technical Insights | Saudi Construction & Real Estate News',
        metaDescriptionAr: 'أحدث التحليلات والتقارير الهندسية حول كود البناء السعودي وتطورات القطاع العقاري والإنشائي في ضوء رؤية المملكة 2030.',
        metaDescriptionEn: 'Authoritative analysis on Saudi Building Code updates, real estate trends, and engineering innovations.',
        keywordsAr: 'أخبار المقاولات, كود البناء السعودي, تقارير عقارية, أبحاث السوق, رؤية 2030',
        keywordsEn: 'construction news KSA, Saudi building code updates, real estate reports, Vision 2030',
        ogImage: '/images/hardgp/por6-big.jpg',
        canonicalUrl: 'https://hardgp.com/blog',
      },
    },
  },
};

export async function getSiteSettings(): Promise<SiteSettingsDoc> {
  try {
    const docRef = doc(db, 'site_settings', 'content');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...defaultSiteSettings, ...snap.data() } as SiteSettingsDoc;
    }
  } catch (err) {
    console.warn('Using default site settings:', err);
  }
  return defaultSiteSettings;
}

export function subscribeToSiteSettings(callback: (settings: SiteSettingsDoc) => void) {
  const docRef = doc(db, 'site_settings', 'content');
  return onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        callback({ ...defaultSiteSettings, ...snap.data() } as SiteSettingsDoc);
      } else {
        callback(defaultSiteSettings);
      }
    },
    (error) => {
      console.error('Error listening to site settings:', error);
      callback(defaultSiteSettings);
    }
  );
}

export async function updateSiteSettings(settings: Partial<SiteSettingsDoc>) {
  const docRef = doc(db, 'site_settings', 'content');
  await setDoc(
    docRef,
    {
      ...settings,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

// ----------------- NEWSLETTER SUBSCRIBERS -----------------
export interface NewsletterSubscriberDoc {
  id?: string;
  email: string;
  status: 'active' | 'unsubscribed';
  source?: string;
  createdAt: any;
  updatedAt?: any;
}

export async function subscribeNewsletter(email: string, source: string = 'footer'): Promise<{ success: boolean; alreadySubscribed?: boolean; id?: string }> {
  try {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      throw new Error('Invalid email address');
    }

    const colRef = collection(db, 'newsletter_subscribers');
    const existingQ = query(colRef, where('email', '==', cleanEmail), limit(1));
    const snap = await getDocs(existingQ);

    if (!snap.empty) {
      return { success: true, alreadySubscribed: true, id: snap.docs[0].id };
    }

    const docRef = await addDoc(colRef, {
      email: cleanEmail,
      status: 'active',
      source,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { success: true, alreadySubscribed: false, id: docRef.id };
  } catch (error) {
    console.error('Error saving newsletter subscriber:', error);
    throw error;
  }
}

export function subscribeToNewsletterSubscribers(callback: (subscribers: NewsletterSubscriberDoc[]) => void) {
  const colRef = collection(db, 'newsletter_subscribers');
  const q = query(colRef, orderBy('createdAt', 'desc'), limit(200));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: NewsletterSubscriberDoc[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as NewsletterSubscriberDoc);
      });
      callback(list);
    },
    (error) => {
      console.error('Error listening to newsletter subscribers:', error);
    }
  );
}

export async function deleteNewsletterSubscriber(id: string) {
  const docRef = doc(db, 'newsletter_subscribers', id);
  await deleteDoc(docRef);
}

export async function updateNewsletterSubscriberStatus(id: string, status: 'active' | 'unsubscribed') {
  const docRef = doc(db, 'newsletter_subscribers', id);
  await updateDoc(docRef, { status, updatedAt: serverTimestamp() });
}

// ----------------- REAL-TIME ANALYTICS & VISIT TRACKING -----------------
export interface AnalyticsVisitDoc {
  id?: string;
  path: string;
  referrer?: string;
  device?: string;
  language?: string;
  userAgent?: string;
  createdAt: any;
}

export async function logAnalyticsVisit(data: {
  path: string;
  referrer?: string;
  device?: string;
  language?: string;
  userAgent?: string;
}) {
  try {
    const colRef = collection(db, 'analytics_visits');
    await addDoc(colRef, {
      path: data.path.slice(0, 200),
      referrer: (data.referrer || '').slice(0, 250),
      device: data.device || 'desktop',
      language: data.language || 'ar',
      userAgent: (data.userAgent || '').slice(0, 250),
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    // Non-blocking for analytics logging
    console.warn('Analytics visit log error:', err);
  }
}

export function subscribeToAnalyticsVisits(callback: (visits: AnalyticsVisitDoc[]) => void, limitCount = 100) {
  const colRef = collection(db, 'analytics_visits');
  const q = query(colRef, orderBy('createdAt', 'desc'), limit(limitCount));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: AnalyticsVisitDoc[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as AnalyticsVisitDoc);
      });
      callback(list);
    },
    (error) => {
      console.error('Error listening to analytics visits:', error);
    }
  );
}

// ----------------- MEDIA UPLOADS & REPOSITORY -----------------
export interface MediaItemDoc {
  id?: string;
  name: string;
  url: string;
  storagePath?: string;
  size: number;
  type: string;
  folder?: string;
  uploader?: string;
  createdAt: any;
}

export function subscribeToMedia(callback: (media: MediaItemDoc[]) => void) {
  const colRef = collection(db, 'media');
  const q = query(colRef, orderBy('createdAt', 'desc'), limit(100));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: MediaItemDoc[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as MediaItemDoc);
      });
      callback(list);
    },
    (error) => {
      console.error('Error listening to media items:', error);
    }
  );
}

export async function addMediaItem(item: Omit<MediaItemDoc, 'id' | 'createdAt'>) {
  const colRef = collection(db, 'media');
  const docRef = await addDoc(colRef, {
    ...item,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function deleteMediaItem(id: string) {
  const docRef = doc(db, 'media', id);
  await deleteDoc(docRef);
}

// ----------------- TEAM MEMBERS -----------------
export interface TeamMemberDoc {
  id?: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  image: string;
  bio?: string;
  bioAr?: string;
  phone?: string;
  email?: string;
  order?: number;
  createdAt?: any;
}

export function subscribeToTeam(callback: (team: TeamMemberDoc[]) => void) {
  const colRef = collection(db, 'team');
  const q = query(colRef, orderBy('createdAt', 'asc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: TeamMemberDoc[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as TeamMemberDoc);
      });
      callback(list);
    },
    (error) => {
      console.error('Error listening to team:', error);
    }
  );
}

export async function addTeamMember(member: Omit<TeamMemberDoc, 'id' | 'createdAt'>) {
  const colRef = collection(db, 'team');
  const docRef = await addDoc(colRef, {
    ...member,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateTeamMember(id: string, member: Partial<TeamMemberDoc>) {
  const docRef = doc(db, 'team', id);
  await updateDoc(docRef, {
    ...member,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteTeamMember(id: string) {
  const docRef = doc(db, 'team', id);
  await deleteDoc(docRef);
}

// ----------------- TESTIMONIALS -----------------
export interface TestimonialDoc {
  id?: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  company?: string;
  companyAr?: string;
  content: string;
  contentAr: string;
  rating: number;
  avatar: string;
  featured?: boolean;
  createdAt?: any;
}

export function subscribeToTestimonials(callback: (testimonials: TestimonialDoc[]) => void) {
  const colRef = collection(db, 'testimonials');
  const q = query(colRef, orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: TestimonialDoc[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as TestimonialDoc);
      });
      callback(list);
    },
    (error) => {
      console.error('Error listening to testimonials:', error);
    }
  );
}

export async function addTestimonial(testimonial: Omit<TestimonialDoc, 'id' | 'createdAt'>) {
  const colRef = collection(db, 'testimonials');
  const docRef = await addDoc(colRef, {
    ...testimonial,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateTestimonial(id: string, testimonial: Partial<TestimonialDoc>) {
  const docRef = doc(db, 'testimonials', id);
  await updateDoc(docRef, {
    ...testimonial,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteTestimonial(id: string) {
  const docRef = doc(db, 'testimonials', id);
  await deleteDoc(docRef);
}

// ----------------- GALLERY ITEMS -----------------
export interface GalleryItemDoc {
  id?: string;
  title: string;
  title_ar: string;
  category: string;
  category_ar: string;
  image: string;
  order?: number;
  createdAt?: any;
}

export function subscribeToGallery(callback: (items: GalleryItemDoc[]) => void) {
  const colRef = collection(db, 'gallery');
  const q = query(colRef, orderBy('createdAt', 'asc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: GalleryItemDoc[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as GalleryItemDoc);
      });
      callback(list);
    },
    (error) => {
      console.error('Error listening to gallery:', error);
    }
  );
}

export async function addGalleryItem(item: Omit<GalleryItemDoc, 'id' | 'createdAt'>) {
  const colRef = collection(db, 'gallery');
  const docRef = await addDoc(colRef, {
    ...item,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateGalleryItem(id: string, item: Partial<GalleryItemDoc>) {
  const docRef = doc(db, 'gallery', id);
  await updateDoc(docRef, {
    ...item,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteGalleryItem(id: string) {
  const docRef = doc(db, 'gallery', id);
  await deleteDoc(docRef);
}
