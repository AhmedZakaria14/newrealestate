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
      for (const p of referenceProperties.slice(0, 6)) {
        await addDoc(propsCol, {
          title: p.title.en,
          titleAr: p.title.ar,
          type: p.type,
          status: p.status,
          price: p.price.sar,
          area: p.areaSqM,
          location: p.location.city.en,
          locationAr: p.location.city.ar,
          bedrooms: p.bedrooms,
          bathrooms: p.bathrooms,
          description: p.description.en,
          descriptionAr: p.description.ar,
          image: p.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          featured: p.featured,
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
        email: 'a.aldosari@investment.sa',
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
export interface SiteSettingsDoc {
  heroTitleAr: string;
  heroTitleEn: string;
  heroSubtitleAr: string;
  heroSubtitleEn: string;
  heroBadgeAr: string;
  heroBadgeEn: string;
  heroImage?: string;
  heroCtaQuoteAr?: string;
  heroCtaQuoteEn?: string;
  heroCtaCalcAr?: string;
  heroCtaCalcEn?: string;
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
  };
  updatedAt?: any;
}

export const defaultSiteSettings: SiteSettingsDoc = {
  heroTitleAr: 'مجموعة هارد القابضة',
  heroTitleEn: 'HARD Group Holding',
  heroSubtitleAr: 'للمقاولات والتطوير العقاري',
  heroSubtitleEn: '& Structural Development',
  heroBadgeAr: 'مقاولات عامة فئة أولى · كود البناء السعودي SBC · رخصة فال 1200028472',
  heroBadgeEn: 'Class-1 General Contracting · Saudi Building Code (SBC) · VAL Lic. 1200028472',
  heroImage: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=2200&q=90',
  heroCtaQuoteAr: 'طلب استشارة وتسعير فوري',
  heroCtaQuoteEn: 'Request Instant Estimate',
  heroCtaCalcAr: 'حاسبة تكاليف المشاريع',
  heroCtaCalcEn: 'Cost Estimator',
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
    emergencyPhone: '+966501234567',
    email: 'info@hardgroup.sa',
    addressKhobarAr: 'طريق الملك فهد، حي الحزام الذهبي، الخُبر، المملكة العربية السعودية',
    addressKhobarEn: 'King Fahd Rd, Al Hizam Al Thahabi, Al Khobar, Saudi Arabia',
    addressRiyadhAr: 'طريق الملك عبدالعزيز، حي الياسمين، الرياض، المملكة العربية السعودية',
    addressRiyadhEn: 'King Abdulaziz Rd, Al Yasmin, Riyadh, Saudi Arabia',
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
    ogImage: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: 'https://hardgroup.sa',
    googleVerification: 'google-site-verification-hard-group-ksa',
    indexNowKey: 'hardgroup_indexnow_2026_sec',
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
