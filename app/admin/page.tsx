'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  Building2,
  HardHat,
  Fan,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  ShieldCheck,
  AlertCircle,
  Database,
  Layers,
  Sparkles,
  MapPin,
  Calendar,
  X,
  Send,
  Loader2,
  Save,
  Sliders,
  Globe,
  Activity,
  Image as ImageIcon,
  Radio,
} from 'lucide-react';
import {
  PropertyDoc,
  ProjectDoc,
  ServiceDoc,
  ArticleDoc,
  ConsultationDoc,
  SiteSettingsDoc,
  defaultSiteSettings,
  NewsletterSubscriberDoc,
  AnalyticsVisitDoc,
  MediaItemDoc,
  subscribeToConsultations,
  subscribeToProperties,
  subscribeToProjects,
  subscribeToServices,
  subscribeToArticles,
  subscribeToSiteSettings,
  updateSiteSettings,
  subscribeToNewsletterSubscribers,
  subscribeToAnalyticsVisits,
  subscribeToMedia,
  updateConsultationStatus,
  deleteConsultation,
  addProperty,
  updateProperty,
  deleteProperty,
  addProject,
  updateProject,
  deleteProject,
  addService,
  updateService,
  deleteService,
  addArticle,
  updateArticle,
  deleteArticle,
  seedInitialDatabase,
} from '@/lib/firestore-service';
import ConsultationStatusChart from '@/components/admin/ConsultationStatusChart';
import SiteContentEditor from '@/components/admin/SiteContentEditor';
import NewsletterManager from '@/components/admin/NewsletterManager';
import MediaLibraryModal from '@/components/admin/MediaLibraryModal';
import SeoManager from '@/components/admin/SeoManager';
import RealtimeAnalyticsView from '@/components/admin/RealtimeAnalyticsView';

export type AdminTab =
  | 'overview'
  | 'consultations'
  | 'content'
  | 'newsletter'
  | 'media'
  | 'seo'
  | 'analytics'
  | 'properties'
  | 'projects'
  | 'services'
  | 'articles'
  | 'users';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, profile, role, isAdmin, isStaff, signOut, loading: authLoading } = useAuth();
  const { language, theme, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  // Navigation tabs
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Real-time Firestore state
  const [consultations, setConsultations] = useState<ConsultationDoc[]>([]);
  const [properties, setProperties] = useState<PropertyDoc[]>([]);
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [services, setServices] = useState<ServiceDoc[]>([]);
  const [articles, setArticles] = useState<ArticleDoc[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsDoc>(defaultSiteSettings);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriberDoc[]>([]);
  const [analyticsVisits, setAnalyticsVisits] = useState<AnalyticsVisitDoc[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItemDoc[]>([]);

  // Filtering states
  const [consultationFilter, setConsultationFilter] = useState<'all' | 'new' | 'in_progress' | 'contacted' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);

  // Modals for CRUD
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<ConsultationDoc | null>(null);

  // Form states for adding Property
  const [propForm, setPropForm] = useState({
    title: '',
    titleAr: '',
    type: 'فيلا فاخرة',
    status: 'for-sale' as PropertyDoc['status'],
    price: 4500000,
    area: 550,
    location: 'Al Khobar, Eastern Province',
    locationAr: 'الخُبر، المنطقة الشرقية',
    bedrooms: 5,
    bathrooms: 6,
    description: 'Luxury turnkey villa with smart automation and SBC code certification.',
    descriptionAr: 'فيلا فاخرة تسليم على المفتاح مع أنظمة ذكية ومطابقة كود البناء السعودي.',
    image: '/images/hardgp/por4-big.jpg',
    featured: true,
  });

  // Form states for adding Project
  const [projForm, setProjForm] = useState({
    title: '',
    titleAr: '',
    category: 'commercial' as ProjectDoc['category'],
    location: 'King Fahd Road, Khobar',
    locationAr: 'طريق الملك فهد، الخُبر',
    progress: 75,
    completionDate: '2026 Q4',
    client: 'HARD Developments',
    budget: '85,000,000 SAR',
    description: 'Commercial corporate tower engineered to SBC 100% standards.',
    descriptionAr: 'برج تجاري وإداري متطور تم تنفيذه وفق أعلى معايير كود البناء السعودي.',
    image: '/images/hardgp/por1-big.jpg',
    featured: true,
  });

  // Form states for adding Service
  const [servForm, setServForm] = useState({
    title: '',
    titleAr: '',
    category: 'contracting' as ServiceDoc['category'],
    description: 'Professional structural construction and general contracting.',
    descriptionAr: 'خدمات المقاولات العامة والتطوير الإنشائي المتكامل للمشاريع.',
    active: true,
  });

  // Form states for adding Article
  const [artForm, setArtForm] = useState({
    title: '',
    titleAr: '',
    category: 'تقارير السوق والعقارات',
    excerpt: 'Latest insights on the Saudi construction and property market.',
    excerptAr: 'تحليل شامل لاتجاهات السوق العقاري والإنشائي بالمملكة وفق رؤية 2030.',
    content: 'Full comprehensive market intelligence article...',
    contentAr: 'تقرير شامل ومفصل حول نمو قطاع المقاولات والعقارات في المنطقة الشرقية والرياض...',
    image: '/images/hardgp/por6-big.jpg',
    author: 'هيئة الدراسات بمجموعة هارد',
    readTime: '5 دقائق',
    published: true,
  });

  // Protect route
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  // Subscribe to real-time Firestore collections
  useEffect(() => {
    if (!user) return;

    const unsubConsultations = subscribeToConsultations((data) => setConsultations(data));
    const unsubProperties = subscribeToProperties((data) => setProperties(data));
    const unsubProjects = subscribeToProjects((data) => setProjects(data));
    const unsubServices = subscribeToServices((data) => setServices(data));
    const unsubArticles = subscribeToArticles((data) => setArticles(data));
    const unsubSettings = subscribeToSiteSettings((data) => setSiteSettings(data));
    const unsubSubscribers = subscribeToNewsletterSubscribers((data) => setSubscribers(data));
    const unsubVisits = subscribeToAnalyticsVisits((data) => setAnalyticsVisits(data));
    const unsubMedia = subscribeToMedia((data) => setMediaItems(data));

    return () => {
      unsubConsultations?.();
      unsubProperties?.();
      unsubProjects?.();
      unsubServices?.();
      unsubArticles?.();
      unsubSettings?.();
      unsubSubscribers?.();
      unsubVisits?.();
      unsubMedia?.();
    };
  }, [user]);

  const handleSaveSiteSettings = async (partial: Partial<SiteSettingsDoc>) => {
    await updateSiteSettings(partial);
  };

  // Seed database helper
  const handleSeedDatabase = async () => {
    setSeeding(true);
    try {
      await seedInitialDatabase();
      setSeedSuccess(true);
      setTimeout(() => setSeedSuccess(false), 4000);
    } catch (err) {
      console.error('Seed error:', err);
    } finally {
      setSeeding(false);
    }
  };

  // Add Property Handler
  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProperty(propForm);
      setPropertyModalOpen(false);
      setPropForm({
        title: '',
        titleAr: '',
        type: 'فيلا فاخرة',
        status: 'for-sale',
        price: 4500000,
        area: 550,
        location: 'Al Khobar, Eastern Province',
        locationAr: 'الخُبر، المنطقة الشرقية',
        bedrooms: 5,
        bathrooms: 6,
        description: '',
        descriptionAr: '',
        image: '/images/hardgp/por4-big.jpg',
        featured: true,
      });
    } catch (err) {
      console.error('Error adding property:', err);
    }
  };

  // Add Project Handler
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProject(projForm);
      setProjectModalOpen(false);
      setProjForm({
        title: '',
        titleAr: '',
        category: 'commercial',
        location: 'King Fahd Road, Khobar',
        locationAr: 'طريق الملك فهد، الخُبر',
        progress: 75,
        completionDate: '2026 Q4',
        client: 'HARD Developments',
        budget: '85,000,000 SAR',
        description: '',
        descriptionAr: '',
        image: '/images/hardgp/por1-big.jpg',
        featured: true,
      });
    } catch (err) {
      console.error('Error adding project:', err);
    }
  };

  // Add Service Handler
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addService(servForm);
      setServiceModalOpen(false);
      setServForm({
        title: '',
        titleAr: '',
        category: 'contracting',
        description: '',
        descriptionAr: '',
        active: true,
      });
    } catch (err) {
      console.error('Error adding service:', err);
    }
  };

  // Add Article Handler
  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addArticle(artForm);
      setArticleModalOpen(false);
      setArtForm({
        title: '',
        titleAr: '',
        category: 'تقارير السوق والعقارات',
        excerpt: '',
        excerptAr: '',
        content: '',
        contentAr: '',
        image: '/images/hardgp/por6-big.jpg',
        author: 'هيئة الدراسات بمجموعة هارد',
        readTime: '5 دقائق',
        published: true,
      });
    } catch (err) {
      console.error('Error adding article:', err);
    }
  };

  // Filtered consultations
  const filteredConsultations = consultations.filter((c) => {
    if (consultationFilter !== 'all' && c.status !== consultationFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name?.toLowerCase().includes(q);
      const matchPhone = c.phone?.toLowerCase().includes(q);
      const matchService = c.service?.toLowerCase().includes(q);
      return matchName || matchPhone || matchService;
    }
    return true;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030617] text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-xs font-bold">{isAr ? 'جاري التحقق من الصلاحيات...' : 'Validating Credentials...'}</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDark ? 'bg-[#030617] text-white' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Top Header Navbar */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5 transition-colors ${
          isDark
            ? 'bg-[#080d2b]/90 border-white/10'
            : 'bg-white/90 border-slate-200 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Portal title */}
          <div className="flex items-center gap-3">
            <Link href="/" className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
              <Building2 className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-tight">
                  {isAr ? 'لوحة تحكم مجموعة هارد' : 'HARD Group Operations'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  Firebase Live
                </span>
              </div>
              <span className="text-[11px] opacity-70 block">
                {isAr ? 'المقاولات العامة · العقارات فال · التكييف AMC' : 'Class-1 Contracting · Real Estate · HVAC'}
              </span>
            </div>
          </div>

          {/* User info & Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end text-xs">
              <span className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {profile?.displayName || user.email}
              </span>
              <span className="text-[10px] opacity-60 uppercase font-mono">
                {role === 'admin' ? (isAr ? 'المدير العام (Admin)' : 'Super Admin') : (isAr ? 'محرر وموظف' : 'Staff Editor')}
              </span>
            </div>

            <button
              onClick={handleSeedDatabase}
              disabled={seeding}
              title={isAr ? 'تهيئة قاعدة البيانات بالبيانات الافتراضية' : 'Seed Initial Data'}
              className="p-2.5 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {seeding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Database className="w-4 h-4" />
              )}
              <span className="hidden md:inline">{isAr ? 'مزامنة البيانات' : 'Sync Data'}</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="p-2.5 rounded-xl border border-gray-500/20 hover:bg-gray-500/10 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden md:inline">{isAr ? 'معاينة الموقع' : 'View Site'}</span>
            </Link>

            <button
              onClick={() => signOut()}
              className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">{isAr ? 'تسجيل الخروج' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Seed Success Notification */}
      {seedSuccess && (
        <div className="bg-emerald-600 text-white text-center py-2 px-4 text-xs font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{isAr ? 'تمت مزامنة وتهيئة البيانات الافتراضية بنجاح في قاعدة بيانات Firebase!' : 'Database successfully seeded with initial live records!'}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs Bar */}
        <div className="flex overflow-x-auto pb-2 gap-2 border-b border-gray-500/15 text-xs font-bold scrollbar-none">
          {[
            { id: 'overview', labelAr: 'نظرة عامة والتحليلات', labelEn: 'Overview', icon: BarChart3, count: null },
            { id: 'consultations', labelAr: 'الطلبات والاستشارات', labelEn: 'Customer Leads', icon: MessageSquare, count: consultations.length },
            { id: 'content', labelAr: 'تعديل نصوص وأقسام الموقع', labelEn: 'Site Content & Sections', icon: Sliders, count: null },
            { id: 'newsletter', labelAr: 'النشرة البريدية', labelEn: 'Newsletter', icon: Mail, count: subscribers.length },
            { id: 'media', labelAr: 'رفع الصور والملفات', labelEn: 'Media & Uploads', icon: ImageIcon, count: mediaItems.length },
            { id: 'seo', labelAr: 'السيو والأرشفة الفورية', labelEn: 'SEO & Indexing', icon: Globe, count: null },
            { id: 'analytics', labelAr: 'الزيارات اللحظية', labelEn: 'Live Traffic', icon: Activity, count: analyticsVisits.length },
            { id: 'properties', labelAr: 'العقارات والوحدات', labelEn: 'Properties', icon: Building2, count: properties.length },
            { id: 'projects', labelAr: 'المشاريع الإنشائية', labelEn: 'Projects', icon: HardHat, count: projects.length },
            { id: 'services', labelAr: 'الخدمات والتكييف', labelEn: 'Services', icon: Fan, count: services.length },
            { id: 'articles', labelAr: 'المقالات والأخبار', labelEn: 'Articles', icon: FileText, count: articles.length },
            { id: 'users', labelAr: 'المستخدمين والصلاحيات', labelEn: 'Users & RBAC', icon: Users, count: null },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : isDark
                    ? 'hover:bg-white/5 text-slate-300'
                    : 'hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{isAr ? tab.labelAr : tab.labelEn}</span>
                {tab.count !== null && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      active ? 'bg-white/20 text-white' : 'bg-blue-500/10 text-blue-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div
                className={`p-5 rounded-2xl border shadow-sm ${
                  isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold opacity-75">{isAr ? 'إجمالي طلبات الاستشارة' : 'Total Client Leads'}</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black mb-1">{consultations.length}</div>
                <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isAr ? 'محدث لحظياً عبر Firestore' : 'Live Firestore Sync'}
                </span>
              </div>

              <div
                className={`p-5 rounded-2xl border shadow-sm ${
                  isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold opacity-75">{isAr ? 'الطلبات الجديدة (تحتاج متابعة)' : 'New Inquiries Pending'}</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-500 mb-1">
                  {consultations.filter((c) => c.status === 'new').length}
                </div>
                <span className="text-[11px] opacity-60">
                  {isAr ? 'يتطلب الرد خلال أقل من 15 دقيقة' : 'Response SLA < 15 mins'}
                </span>
              </div>

              <div
                className={`p-5 rounded-2xl border shadow-sm ${
                  isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold opacity-75">{isAr ? 'العقارات المعروضة النشطة' : 'Active Properties'}</span>
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black mb-1">{properties.length}</div>
                <span className="text-[11px] text-blue-500 font-semibold">
                  {isAr ? 'مرخصة برخصة فال 1200028472' : 'VAL Licensed Brokerage'}
                </span>
              </div>

              <div
                className={`p-5 rounded-2xl border shadow-sm ${
                  isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold opacity-75">{isAr ? 'المشاريع الإنشائية الكبرى' : 'Active Master Projects'}</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <HardHat className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black mb-1">{projects.length}</div>
                <span className="text-[11px] text-purple-400 font-semibold">
                  {isAr ? 'كود البناء السعودي (SBC) 100%' : '100% SBC Code Certified'}
                </span>
              </div>
            </div>

            {/* Recharts Lead Status Distribution Pie Chart */}
            <ConsultationStatusChart
              consultations={consultations}
              selectedStatus={consultationFilter}
              onSelectStatus={(status) => {
                setConsultationFilter(status);
                setActiveTab('consultations');
              }}
            />

            {/* Quick Actions & Recent Leads */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Recent Leads Preview */}
              <div
                className={`lg:col-span-8 p-6 rounded-3xl border shadow-xl space-y-4 ${
                  isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black">{isAr ? 'أحدث طلبات واستفسارات العملاء' : 'Recent Inquiries'}</h3>
                    <p className="text-xs opacity-70">{isAr ? 'واردة عبر الموقع وحاسبة التكاليف الفورية' : 'Live from web forms and project calculator'}</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('consultations')}
                    className="text-xs font-bold text-blue-500 hover:underline"
                  >
                    {isAr ? 'عرض الكل ←' : 'View All →'}
                  </button>
                </div>

                {consultations.length === 0 ? (
                  <div className="py-10 text-center opacity-60 space-y-2">
                    <MessageSquare className="w-8 h-8 mx-auto opacity-40" />
                    <p className="text-xs">{isAr ? 'لا توجد طلبات عملاء حتى الآن، انقر على مزامنة البيانات بالأعلى لتوليد عينات حقيقية' : 'No inquiries yet. Click Sync Data above to seed demo records.'}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {consultations.slice(0, 4).map((c) => (
                      <div
                        key={c.id}
                        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold">{c.name}</span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                c.status === 'new'
                                  ? 'bg-amber-500/20 text-amber-500'
                                  : c.status === 'in_progress'
                                  ? 'bg-blue-500/20 text-blue-500'
                                  : 'bg-emerald-500/20 text-emerald-500'
                              }`}
                            >
                              {c.status === 'new' ? (isAr ? 'جديد' : 'New') : c.status === 'in_progress' ? (isAr ? 'قيد المعالجة' : 'In Progress') : (isAr ? 'مكتمل' : 'Completed')}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs opacity-75">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-blue-400" />
                              <span className="dir-ltr">{c.phone}</span>
                            </span>
                            <span>·</span>
                            <span className="truncate max-w-[200px]">{c.service || (isAr ? 'استشارة عامة' : 'General')}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <a
                            href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"
                          >
                            <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
                          </a>
                          <button
                            onClick={() => setSelectedLead(c)}
                            className="px-3 py-1.5 rounded-xl border border-gray-500/20 hover:bg-gray-500/10 text-xs font-bold cursor-pointer"
                          >
                            {isAr ? 'تفاصيل' : 'Details'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Operations Strip */}
              <div
                className={`lg:col-span-4 p-6 rounded-3xl border shadow-xl space-y-4 ${
                  isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
                }`}
              >
                <h3 className="text-base font-black">{isAr ? 'إجراءات سريعة لإدارة المحتوى' : 'Quick Actions'}</h3>
                <div className="space-y-2.5">
                  <button
                    onClick={() => setActiveTab('content')}
                    className="w-full p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-between cursor-pointer shadow-md"
                  >
                    <span className="flex items-center gap-2">
                      <Sliders className="w-4 h-4" />
                      {isAr ? 'تعديل نصوص وأسماء الأقسام' : 'Edit Section Names & Texts'}
                    </span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">تحرير</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('media')}
                    className="w-full p-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center justify-between cursor-pointer shadow-md"
                  >
                    <span className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      {isAr ? 'رفع الصور والمخططات والملفات' : 'Upload Media & Blueprints'}
                    </span>
                    <Plus className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab('seo')}
                    className="w-full p-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center justify-between cursor-pointer shadow-md"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      {isAr ? 'إرسال الأرشفة الفورية لمحركات البحث' : 'Instant Search Engine Indexing'}
                    </span>
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                  </button>

                  <button
                    onClick={() => setActiveTab('newsletter')}
                    className="w-full p-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-between cursor-pointer shadow-md"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {isAr ? 'مشتركي النشرة البريدية والعملاء' : 'Newsletter Subscribers'}
                    </span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">{subscribers.length}</span>
                  </button>

                  <button
                    onClick={() => { setPropertyModalOpen(true); setActiveTab('properties'); }}
                    className="w-full p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      {isAr ? 'إضافة عقار جديد للبيع / الإيجار' : 'Add New Property Listing'}
                    </span>
                    <Plus className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => { setProjectModalOpen(true); setActiveTab('projects'); }}
                    className="w-full p-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <HardHat className="w-4 h-4" />
                      {isAr ? 'إضافة مشروع إنشائي معتمد' : 'Add Structural Project'}
                    </span>
                    <Plus className="w-4 h-4" />
                  </button>

                  <div className="pt-3 border-t border-gray-500/15 text-xs opacity-75 space-y-1">
                    <p className="font-bold">{isAr ? 'حالة قاعدة بيانات Firebase المتزامنة:' : 'Firebase Live Sync Status:'}</p>
                    <p className="text-emerald-500 font-mono text-[11px]">✓ Firestore DB: ai-studio-newrealestate</p>
                    <p className="text-emerald-500 font-mono text-[11px]">✓ Security Rules: Synchronous & Deployed</p>
                    <p className="text-emerald-500 font-mono text-[11px]">✓ Live Visitors Stream: Active ({analyticsVisits.length} recorded)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONSULTATIONS & LEADS */}
        {activeTab === 'consultations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black">{isAr ? 'طلبات واستشارات العملاء' : 'Customer Leads & Quotes'}</h2>
                <p className="text-xs opacity-75">{isAr ? 'إدارة وفلترة كافة استفسارات الزوار وطلبات عروض الأسعار المسجلة في Firestore' : 'Live real-time client submissions and booking inquiries'}</p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {(['all', 'new', 'in_progress', 'contacted', 'completed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setConsultationFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      consultationFilter === st
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isDark
                        ? 'bg-white/5 hover:bg-white/10 text-slate-300'
                        : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                    }`}
                  >
                    {st === 'all' ? (isAr ? 'الكل' : 'All') : st === 'new' ? (isAr ? 'جديد' : 'New') : st === 'in_progress' ? (isAr ? 'قيد المعالجة' : 'In Progress') : st === 'contacted' ? (isAr ? 'تم التواصل' : 'Contacted') : (isAr ? 'مكتمل' : 'Completed')}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table Card */}
            <div
              className={`rounded-3xl border shadow-xl overflow-hidden ${
                isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              {filteredConsultations.length === 0 ? (
                <div className="py-16 text-center opacity-60">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-bold">{isAr ? 'لا توجد طلبات مطابقة للفلتر المحدد' : 'No leads match the selected filter.'}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left rtl:text-right">
                    <thead className={`border-b ${isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                      <tr>
                        <th className="p-4 font-bold">{isAr ? 'اسم العميل' : 'Client Name'}</th>
                        <th className="p-4 font-bold">{isAr ? 'رقم الهاتف' : 'Phone'}</th>
                        <th className="p-4 font-bold">{isAr ? 'الخدمة المطلوبة' : 'Service'}</th>
                        <th className="p-4 font-bold">{isAr ? 'الميزانية' : 'Budget'}</th>
                        <th className="p-4 font-bold">{isAr ? 'الحالة' : 'Status'}</th>
                        <th className="p-4 font-bold text-center">{isAr ? 'الإجراءات' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-500/10">
                      {filteredConsultations.map((lead) => (
                        <tr key={lead.id} className="hover:bg-blue-500/5 transition-colors">
                          <td className="p-4 font-bold">{lead.name}</td>
                          <td className="p-4 font-mono dir-ltr">{lead.phone}</td>
                          <td className="p-4 max-w-[200px] truncate">{lead.service || '-'}</td>
                          <td className="p-4 font-semibold text-blue-500">{lead.budget || '-'}</td>
                          <td className="p-4">
                            <select
                              value={lead.status}
                              onChange={(e) => updateConsultationStatus(lead.id!, e.target.value as any)}
                              className={`p-1.5 rounded-lg text-[11px] font-bold border focus:outline-none ${
                                lead.status === 'new'
                                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                  : lead.status === 'in_progress'
                                  ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                  : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                              }`}
                            >
                              <option value="new" className="bg-slate-900 text-white">{isAr ? 'جديد' : 'New'}</option>
                              <option value="in_progress" className="bg-slate-900 text-white">{isAr ? 'قيد المعالجة' : 'In Progress'}</option>
                              <option value="contacted" className="bg-slate-900 text-white">{isAr ? 'تم التواصل' : 'Contacted'}</option>
                              <option value="completed" className="bg-slate-900 text-white">{isAr ? 'مكتمل' : 'Completed'}</option>
                              <option value="cancelled" className="bg-slate-900 text-white">{isAr ? 'ملغي' : 'Cancelled'}</option>
                            </select>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-2">
                              <a
                                href={`tel:${lead.phone}`}
                                title={isAr ? 'اتصال مباشر' : 'Call'}
                                className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={isAr ? 'محادثة واتساب' : 'WhatsApp'}
                                className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
                              >
                                <Send className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => setSelectedLead(lead)}
                                title={isAr ? 'عرض التفاصيل' : 'Details'}
                                className="p-2 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 transition-all cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteConsultation(lead.id!)}
                                title={isAr ? 'حذف' : 'Delete'}
                                className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SITE CONTENT & SECTIONS EDITOR */}
        {activeTab === 'content' && (
          <SiteContentEditor
            settings={siteSettings}
            onSave={handleSaveSiteSettings}
            isDark={isDark}
            isAr={isAr}
          />
        )}

        {/* TAB 4: NEWSLETTER SUBSCRIBERS */}
        {activeTab === 'newsletter' && (
          <NewsletterManager
            subscribers={subscribers}
            isDark={isDark}
            isAr={isAr}
          />
        )}

        {/* TAB 5: MEDIA & FILE UPLOAD CENTER */}
        {activeTab === 'media' && (
          <MediaLibraryModal
            media={mediaItems}
            isDark={isDark}
            isAr={isAr}
          />
        )}

        {/* TAB 6: ADVANCED SEO & INSTANT INDEXING */}
        {activeTab === 'seo' && (
          <SeoManager
            settings={siteSettings}
            onSave={handleSaveSiteSettings}
            isDark={isDark}
            isAr={isAr}
          />
        )}

        {/* TAB 7: LIVE ANALYTICS & VISITS LOG */}
        {activeTab === 'analytics' && (
          <RealtimeAnalyticsView
            visits={analyticsVisits}
            isDark={isDark}
            isAr={isAr}
          />
        )}

        {/* TAB 8: PROPERTIES MANAGEMENT */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black">{isAr ? 'إدارة العقارات والوحدات الفاخرة' : 'Properties Portfolio'}</h2>
                <p className="text-xs opacity-75">{isAr ? 'إضافة وتعديل وحذف العقارات المعروضة في المنصة والمخزنة في Firestore' : 'Manage real estate sales, rentals, pricing, and specs'}</p>
              </div>

              <button
                onClick={() => setPropertyModalOpen(true)}
                className="py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? 'إضافة عقار جديد' : 'Add Property'}</span>
              </button>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((prop) => (
                <div
                  key={prop.id}
                  className={`rounded-2xl border overflow-hidden shadow-lg flex flex-col justify-between ${
                    isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="relative h-48 w-full bg-slate-900">
                      <Image
                        src={prop.image || '/images/hardgp/por4-big.jpg'}
                        alt={prop.titleAr || prop.title}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {prop.status === 'for-sale' ? (isAr ? 'للبيع' : 'For Sale') : (isAr ? 'للإيجار' : 'For Rent')}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <h4 className="text-sm font-black line-clamp-1">{(isAr ? prop?.titleAr || prop?.title : prop?.title) || ''}</h4>
                      <p className="text-xs text-blue-500 font-bold">{prop?.price != null ? Number(prop.price).toLocaleString() : ''} {isAr ? 'ريال' : 'SAR'}</p>
                      <div className="flex items-center gap-3 text-[11px] opacity-75">
                        <span>{prop?.area || 350} م²</span>
                        <span>·</span>
                        <span>{prop?.bedrooms ?? 4} {isAr ? 'غرف' : 'Beds'}</span>
                        <span>·</span>
                        <span className="truncate">{(isAr ? prop?.locationAr || prop?.location : prop?.location) || ''}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-500/10 flex items-center justify-between text-xs">
                    <span className="text-[10px] opacity-60">ID: {prop.id?.slice(0, 8)}...</span>
                    <button
                      onClick={() => deleteProperty(prop.id!)}
                      className="text-red-500 hover:text-red-400 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isAr ? 'حذف' : 'Delete'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black">{isAr ? 'إدارة المشاريع الإنشائية والتطويرية' : 'Construction Projects'}</h2>
                <p className="text-xs opacity-75">{isAr ? 'متابعة وتحديث نسب الإنجاز وجداول التسليم لكبرى المشاريع في Firestore' : 'Track milestones, progress rates, and SBC code deliverables'}</p>
              </div>

              <button
                onClick={() => setProjectModalOpen(true)}
                className="py-3 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-600/30 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? 'إضافة مشروع إنشائي' : 'Add Project'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className={`rounded-2xl border overflow-hidden shadow-lg flex flex-col justify-between ${
                    isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="relative h-48 w-full bg-slate-900">
                      <Image
                        src={proj.image || '/images/hardgp/por1-big.jpg'}
                        alt={proj.titleAr || proj.title}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500 text-white shadow-md">
                        {proj.progress}% {isAr ? 'منجز' : 'Completed'}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <h4 className="text-sm font-black line-clamp-1">{isAr ? proj.titleAr || proj.title : proj.title}</h4>
                      <p className="text-xs opacity-75 line-clamp-2">{isAr ? proj.descriptionAr || proj.description : proj.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span>{isAr ? 'نسبة الإنجاز الميداني:' : 'Field Progress:'}</span>
                          <span className="text-blue-500">{proj.progress}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-gray-500/20 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full" style={{ width: `${proj.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-500/10 flex items-center justify-between text-xs">
                    <button
                      onClick={() => updateProject(proj.id!, { progress: Math.min(100, proj.progress + 5) })}
                      className="text-blue-500 hover:underline font-bold text-[11px] cursor-pointer"
                    >
                      +5% {isAr ? 'تحديث الإنجاز' : 'Progress'}
                    </button>
                    <button
                      onClick={() => deleteProject(proj.id!)}
                      className="text-red-500 hover:text-red-400 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isAr ? 'حذف' : 'Delete'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black">{isAr ? 'إدارة خدمات المجموعة' : 'Services Catalog'}</h2>
                <p className="text-xs opacity-75">{isAr ? 'تفعيل وتعطيل خدمات المقاولات والعقارات والتكييف' : 'Manage capabilities across Contracting, Real Estate, and HVAC'}</p>
              </div>

              <button
                onClick={() => setServiceModalOpen(true)}
                className="py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? 'إضافة خدمة' : 'Add Service'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className={`p-5 rounded-2xl border flex items-start justify-between gap-4 ${
                    isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-blue-500">{srv.category}</span>
                    <h4 className="text-sm font-bold">{isAr ? srv.titleAr || srv.title : srv.title}</h4>
                    <p className="text-xs opacity-75">{isAr ? srv.descriptionAr || srv.description : srv.description}</p>
                  </div>

                  <button
                    onClick={() => deleteService(srv.id!)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: ARTICLES */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black">{isAr ? 'المدونة والتقارير السوقية' : 'Articles & Research'}</h2>
                <p className="text-xs opacity-75">{isAr ? 'إدارة وتحرير مقالات كود البناء وأخبار العقارات' : 'Publish architectural insights and market intelligence'}</p>
              </div>

              <button
                onClick={() => setArticleModalOpen(true)}
                className="py-3 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? 'نشر مقال جديد' : 'New Article'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between gap-3 ${
                    isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold text-purple-400">{art.category}</span>
                    <h4 className="text-sm font-bold mt-1">{isAr ? art.titleAr || art.title : art.title}</h4>
                    <p className="text-xs opacity-75 mt-1 line-clamp-2">{isAr ? art.excerptAr || art.excerpt : art.excerpt}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-500/10">
                    <span className="text-[10px] opacity-60">{art.author}</span>
                    <button
                      onClick={() => deleteArticle(art.id!)}
                      className="text-red-500 hover:text-red-400 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isAr ? 'حذف' : 'Delete'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: USERS & RBAC */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black">{isAr ? 'المستخدمين والصلاحيات (RBAC)' : 'Users & Permissions'}</h2>
              <p className="text-xs opacity-75">{isAr ? 'نظام أمان الصلاحيات وحماية العمليات الإدارية عبر Firebase Authentication' : 'Manage administrators, editors, and read-only viewers'}</p>
            </div>

            <div
              className={`p-6 rounded-3xl border shadow-xl ${
                isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                      {user.email?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">{user.email}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                          {role === 'admin' ? (isAr ? 'المدير العام (Admin)' : 'Admin') : (isAr ? 'محرر وموظف' : 'Editor')}
                        </span>
                      </div>
                      <span className="text-[11px] opacity-70">UID: {user.uid}</span>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    {isAr ? 'جلسة نشطة وموثقة' : 'Active Session'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-gray-500/15 text-xs space-y-2 opacity-80">
                  <h4 className="font-bold">{isAr ? 'مستويات الصلاحيات المطبقة في Firestore Security Rules:' : 'Firestore RBAC Rules Enforcement:'}</h4>
                  <p>• <strong>Admin (المدير العام):</strong> {isAr ? 'صلاحيات كاملة لإنشاء وتعديل وحذف كافة العقارات والمشاريع والخدمات والطلبات والمستخدمين.' : 'Full access to create, update, delete all collections and users.'}</p>
                  <p>• <strong>Editor / Staff (فريق العمل):</strong> {isAr ? 'إدارة الطلبات، تحديث حالات العملاء، إضافة وتعديل العقارات والمشاريع.' : 'Can update leads, manage properties, update projects.'}</p>
                  <p>• <strong>Public (الزوار):</strong> {isAr ? 'قراءة العقارات والمشاريع والمقالات المنشورة فقط، وإنشاء طلبات الاستشارة الجديدة.' : 'Read-only on public collections, create-only on consultation leads.'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* LEAD DETAILS MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-5 ${
              isDark ? 'bg-[#080d2b] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-500/15">
              <h3 className="text-base font-black">{isAr ? 'تفاصيل طلب العميل' : 'Lead Specifications'}</h3>
              <button onClick={() => setSelectedLead(null)} className="p-1 rounded-full hover:bg-gray-500/10 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="opacity-60 block">{isAr ? 'اسم العميل:' : 'Name:'}</span>
                <span className="font-bold text-sm">{selectedLead.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="opacity-60 block">{isAr ? 'رقم الهاتف:' : 'Phone:'}</span>
                  <span className="font-bold font-mono dir-ltr">{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="opacity-60 block">{isAr ? 'البريد الإلكتروني:' : 'Email:'}</span>
                  <span className="font-bold">{selectedLead.email || '-'}</span>
                </div>
              </div>
              <div>
                <span className="opacity-60 block">{isAr ? 'الخدمة المطلوبة:' : 'Requested Service:'}</span>
                <span className="font-bold text-blue-500">{selectedLead.service || '-'}</span>
              </div>
              <div>
                <span className="opacity-60 block">{isAr ? 'الميزانية التقديرية:' : 'Estimated Budget:'}</span>
                <span className="font-bold">{selectedLead.budget || '-'}</span>
              </div>
              <div>
                <span className="opacity-60 block">{isAr ? 'تفاصيل المشروع / الرسالة:' : 'Project Details:'}</span>
                <p className="p-3 rounded-xl bg-gray-500/10 mt-1 leading-relaxed">{selectedLead.details || '-'}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`tel:${selectedLead.phone}`}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>{isAr ? 'اتصال هاتفي' : 'Call Lead'}</span>
              </a>
              <a
                href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>{isAr ? 'محادثة واتساب' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ADD PROPERTY MODAL */}
      {propertyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className={`w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-5 ${
              isDark ? 'bg-[#080d2b] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-500/15">
              <h3 className="text-base font-black">{isAr ? 'إضافة عقار جديد لقاعدة البيانات' : 'Add Property to Firestore'}</h3>
              <button onClick={() => setPropertyModalOpen(false)} className="p-1 rounded-full hover:bg-gray-500/10 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProperty} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'عنوان العقار (عربي)' : 'Arabic Title'}</label>
                  <input
                    type="text"
                    required
                    value={propForm.titleAr}
                    onChange={(e) => setPropForm({ ...propForm, titleAr: e.target.value })}
                    placeholder="فيلا لؤلؤة الشاطئ الفاخرة"
                    className="w-full p-2.5 rounded-xl border bg-transparent"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'عنوان العقار (إنجليزي)' : 'English Title'}</label>
                  <input
                    type="text"
                    required
                    value={propForm.title}
                    onChange={(e) => setPropForm({ ...propForm, title: e.target.value })}
                    placeholder="Luxury Pearl Beach Villa"
                    className="w-full p-2.5 rounded-xl border bg-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'نوع العقار' : 'Type'}</label>
                  <input
                    type="text"
                    value={propForm.type}
                    onChange={(e) => setPropForm({ ...propForm, type: e.target.value })}
                    className="w-full p-2.5 rounded-xl border bg-transparent"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'الحالة' : 'Status'}</label>
                  <select
                    value={propForm.status}
                    onChange={(e) => setPropForm({ ...propForm, status: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border bg-slate-900 text-white"
                  >
                    <option value="for-sale">{isAr ? 'للبيع' : 'For Sale'}</option>
                    <option value="for-rent">{isAr ? 'للإيجار' : 'For Rent'}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'السعر (ريال)' : 'Price (SAR)'}</label>
                  <input
                    type="number"
                    required
                    value={propForm.price}
                    onChange={(e) => setPropForm({ ...propForm, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border bg-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'المساحة (م²)' : 'Area (m²)'}</label>
                  <input
                    type="number"
                    value={propForm.area}
                    onChange={(e) => setPropForm({ ...propForm, area: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border bg-transparent"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'غرف النوم' : 'Bedrooms'}</label>
                  <input
                    type="number"
                    value={propForm.bedrooms}
                    onChange={(e) => setPropForm({ ...propForm, bedrooms: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border bg-transparent"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'الحمامات' : 'Bathrooms'}</label>
                  <input
                    type="number"
                    value={propForm.bathrooms}
                    onChange={(e) => setPropForm({ ...propForm, bathrooms: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">{isAr ? 'رابط الصورة (URL)' : 'Image URL'}</label>
                <input
                  type="url"
                  required
                  value={propForm.image}
                  onChange={(e) => setPropForm({ ...propForm, image: e.target.value })}
                  className="w-full p-2.5 rounded-xl border bg-transparent"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">{isAr ? 'الوصف بالعربية' : 'Arabic Description'}</label>
                <textarea
                  rows={2}
                  value={propForm.descriptionAr}
                  onChange={(e) => setPropForm({ ...propForm, descriptionAr: e.target.value })}
                  className="w-full p-2.5 rounded-xl border bg-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg cursor-pointer"
              >
                {isAr ? 'حفظ العقار في قاعدة البيانات' : 'Save Property to Firestore'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD PROJECT MODAL */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className={`w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-5 ${
              isDark ? 'bg-[#080d2b] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-500/15">
              <h3 className="text-base font-black">{isAr ? 'إضافة مشروع إنشائي جديد' : 'Add Structural Project'}</h3>
              <button onClick={() => setProjectModalOpen(false)} className="p-1 rounded-full hover:bg-gray-500/10 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'اسم المشروع (عربي)' : 'Arabic Title'}</label>
                  <input
                    type="text"
                    required
                    value={projForm.titleAr}
                    onChange={(e) => setProjForm({ ...projForm, titleAr: e.target.value })}
                    placeholder="برج لؤلؤة الأعمال"
                    className="w-full p-2.5 rounded-xl border bg-transparent"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'اسم المشروع (إنجليزي)' : 'English Title'}</label>
                  <input
                    type="text"
                    required
                    value={projForm.title}
                    onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                    placeholder="Pearl Business Tower"
                    className="w-full p-2.5 rounded-xl border bg-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'التصنيف' : 'Category'}</label>
                  <select
                    value={projForm.category}
                    onChange={(e) => setProjForm({ ...projForm, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border bg-slate-900 text-white"
                  >
                    <option value="commercial">{isAr ? 'تجاري' : 'Commercial'}</option>
                    <option value="residential">{isAr ? 'سكني' : 'Residential'}</option>
                    <option value="industrial">{isAr ? 'صناعي' : 'Industrial'}</option>
                    <option value="infrastructure">{isAr ? 'بنية تحتية' : 'Infrastructure'}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'نسبة الإنجاز %' : 'Progress %'}</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={projForm.progress}
                    onChange={(e) => setProjForm({ ...projForm, progress: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border bg-transparent"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'موعد التسليم' : 'Handover'}</label>
                  <input
                    type="text"
                    value={projForm.completionDate}
                    onChange={(e) => setProjForm({ ...projForm, completionDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">{isAr ? 'رابط صورة المشروع' : 'Project Image URL'}</label>
                <input
                  type="url"
                  required
                  value={projForm.image}
                  onChange={(e) => setProjForm({ ...projForm, image: e.target.value })}
                  className="w-full p-2.5 rounded-xl border bg-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg cursor-pointer"
              >
                {isAr ? 'حفظ المشروع في قاعدة البيانات' : 'Save Project to Firestore'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD SERVICE MODAL */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className={`w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-5 ${
              isDark ? 'bg-[#080d2b] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-500/15">
              <h3 className="text-base font-black">{isAr ? 'إضافة خدمة جديدة' : 'Add New Service'}</h3>
              <button onClick={() => setServiceModalOpen(false)} className="p-1 rounded-full hover:bg-gray-500/10 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddService} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">{isAr ? 'اسم الخدمة (عربي)' : 'Arabic Title'}</label>
                <input
                  type="text"
                  required
                  value={servForm.titleAr}
                  onChange={(e) => setServForm({ ...servForm, titleAr: e.target.value })}
                  placeholder="عقود صيانة الشيلرات المركزية"
                  className="w-full p-2.5 rounded-xl border bg-transparent"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">{isAr ? 'قطاع الخدمة' : 'Category'}</label>
                <select
                  value={servForm.category}
                  onChange={(e) => setServForm({ ...servForm, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border bg-slate-900 text-white"
                >
                  <option value="contracting">{isAr ? 'المقاولات العامة (SBC)' : 'Contracting'}</option>
                  <option value="realestate">{isAr ? 'الوساطة والاستثمار (فال)' : 'Real Estate'}</option>
                  <option value="hvac">{isAr ? 'التكييف والتشغيل (AMC)' : 'HVAC'}</option>
                  <option value="supervision">{isAr ? 'الإشراف الهندسي والرخص' : 'Supervision'}</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg cursor-pointer"
              >
                {isAr ? 'حفظ الخدمة' : 'Save Service'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD ARTICLE MODAL */}
      {articleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className={`w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-5 ${
              isDark ? 'bg-[#080d2b] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-500/15">
              <h3 className="text-base font-black">{isAr ? 'نشر مقال أو تقرير سوقي' : 'Publish Market Report'}</h3>
              <button onClick={() => setArticleModalOpen(false)} className="p-1 rounded-full hover:bg-gray-500/10 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddArticle} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">{isAr ? 'عنوان المقال (عربي)' : 'Arabic Title'}</label>
                <input
                  type="text"
                  required
                  value={artForm.titleAr}
                  onChange={(e) => setArtForm({ ...artForm, titleAr: e.target.value })}
                  placeholder="دليل الامتثال لكود البناء السعودي SBC 2026"
                  className="w-full p-2.5 rounded-xl border bg-transparent"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">{isAr ? 'ملخص المقال (عربي)' : 'Excerpt'}</label>
                <textarea
                  rows={2}
                  value={artForm.excerptAr}
                  onChange={(e) => setArtForm({ ...artForm, excerptAr: e.target.value })}
                  className="w-full p-2.5 rounded-xl border bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg cursor-pointer"
              >
                {isAr ? 'نشر المقال في قاعدة البيانات' : 'Publish Article to Firestore'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
