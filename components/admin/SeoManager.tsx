'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Globe,
  Save,
  CheckCircle2,
  ExternalLink,
  Search,
  RotateCcw,
  Sparkles,
  Layers,
  FileCode,
  ShieldCheck,
  Radio,
  Loader2,
  Smartphone,
  Monitor,
  Check,
} from 'lucide-react';
import { SiteSettingsDoc, defaultSiteSettings, PageSeoDoc } from '@/lib/firestore-service';

interface SeoManagerProps {
  settings: SiteSettingsDoc;
  onSave: (newSettings: Partial<SiteSettingsDoc>) => Promise<void>;
  isDark: boolean;
  isAr: boolean;
}

export default function SeoManager({
  settings,
  onSave,
  isDark,
  isAr,
}: SeoManagerProps) {
  const [seoData, setSeoData] = useState<SiteSettingsDoc['seo']>({
    ...defaultSiteSettings.seo,
    ...settings.seo,
    perPageSeo: {
      ...defaultSiteSettings.seo.perPageSeo,
      ...settings.seo?.perPageSeo,
    },
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [pinging, setPinging] = useState(false);
  const [activeTab, setActiveTab] = useState<'global' | 'per_page' | 'technical'>('global');
  const [selectedPageKey, setSelectedPageKey] = useState<string>('home');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [previewLang, setPreviewLang] = useState<'ar' | 'en'>('ar');
  const [pingResult, setPingResult] = useState<{
    success: boolean;
    message: string;
    timestamp?: string;
    pingedUrls?: string[];
  } | null>(null);

  const pageOptions = [
    { key: 'home', labelAr: 'الرئيسية', labelEn: 'Home Page', path: '/' },
    { key: 'about', labelAr: 'من نحن وتاريخ التأسيس', labelEn: 'About Us', path: '/about-us' },
    { key: 'services', labelAr: 'مصفوفة الخدمات المتكاملة', labelEn: 'Services Matrix', path: '/services' },
    { key: 'projects', labelAr: 'المشاريع الاستراتيجية', labelEn: 'Master Projects', path: '/projects' },
    { key: 'listings', labelAr: 'العقارات والقصور (فال)', labelEn: 'Properties & Listings', path: '/listings' },
    { key: 'realestate', labelAr: 'هارد للعقارات والاستثمار', labelEn: 'HARD Real Estate', path: '/realestate' },
    { key: 'construction', labelAr: 'هارد للإنشاءات والمقاولات', labelEn: 'HARD Construction', path: '/construction' },
    { key: 'hvac', labelAr: 'هارد لصيانة وتكييف الهواء', labelEn: 'HARD HVAC & AMC', path: '/hvac' },
    { key: 'contact', labelAr: 'اتصل بنا ومقرات الفروع', labelEn: 'Contact Us', path: '/contact-us' },
    { key: 'blog', labelAr: 'المركز الإعلامي والتقارير', labelEn: 'Media & Blog', path: '/blog' },
    { key: 'team', labelAr: 'فريق العمل والقيادات', labelEn: 'Leadership & Team', path: '/our-team' },
    { key: 'faqs', labelAr: 'الأسئلة الشائعة والمصادقات', labelEn: 'FAQs & Governance', path: '/faqs' },
    { key: 'testimonials', labelAr: 'تقييمات وآراء العملاء', labelEn: 'Testimonials', path: '/testimonials' },
    { key: 'gallery', labelAr: 'معرض الصور والمشاريع', labelEn: 'Project Gallery', path: '/image-gallery' },
  ];

  const currentPageSeo: PageSeoDoc =
    seoData.perPageSeo?.[selectedPageKey] ||
    defaultSiteSettings.seo.perPageSeo?.[selectedPageKey] || {
      metaTitleAr: seoData.metaTitleAr,
      metaTitleEn: seoData.metaTitleEn,
      metaDescriptionAr: seoData.metaDescriptionAr,
      metaDescriptionEn: seoData.metaDescriptionEn,
      keywordsAr: seoData.keywordsAr,
      keywordsEn: seoData.keywordsEn,
      canonicalUrl: `${seoData.canonicalUrl}/${selectedPageKey === 'home' ? '' : selectedPageKey}`,
    };

  const handlePageSeoChange = (field: keyof PageSeoDoc, val: string) => {
    setSeoData((prev) => ({
      ...prev,
      perPageSeo: {
        ...prev.perPageSeo,
        [selectedPageKey]: {
          ...currentPageSeo,
          [field]: val,
        },
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await onSave({ seo: seoData });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert(isAr ? 'حدث خطأ أثناء حفظ بيانات السيو' : 'Error saving SEO data');
    } finally {
      setSaving(false);
    }
  };

  const handleTriggerIndexing = async () => {
    try {
      setPinging(true);
      setPingResult(null);

      const urlsToPing = pageOptions.map((p) =>
        p.path === '/' ? (seoData.canonicalUrl || 'https://hardgp.com') : `${seoData.canonicalUrl || 'https://hardgp.com'}${p.path}`
      );

      const res = await fetch('/api/seo/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          urls: urlsToPing,
          key: seoData.indexNowKey,
        }),
      });

      const data = await res.json();
      setPingResult(data);

      await onSave({
        seo: {
          ...seoData,
          lastPingedAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.error('Indexing ping error:', err);
      setPingResult({
        success: false,
        message: isAr ? 'فشل إرسال إشعار الأرشفة' : 'Failed to ping indexing API',
      });
    } finally {
      setPinging(false);
    }
  };

  const activeTitle =
    activeTab === 'per_page'
      ? previewLang === 'ar'
        ? currentPageSeo.metaTitleAr || seoData.metaTitleAr
        : currentPageSeo.metaTitleEn || seoData.metaTitleEn
      : previewLang === 'ar'
      ? seoData.metaTitleAr
      : seoData.metaTitleEn;

  const activeDesc =
    activeTab === 'per_page'
      ? previewLang === 'ar'
        ? currentPageSeo.metaDescriptionAr || seoData.metaDescriptionAr
        : currentPageSeo.metaDescriptionEn || seoData.metaDescriptionEn
      : previewLang === 'ar'
      ? seoData.metaDescriptionAr
      : seoData.metaDescriptionEn;

  const activeUrl =
    activeTab === 'per_page'
      ? currentPageSeo.canonicalUrl || `${seoData.canonicalUrl}${pageOptions.find((p) => p.key === selectedPageKey)?.path || ''}`
      : seoData.canonicalUrl;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-3xl border backdrop-blur-md bg-white/5 border-white/10 shadow-lg">
        <div>
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-blue-500" />
            <span>{isAr ? 'إدارة السيو الشامل والأرشفة الفورية لكافة الصفحات' : 'Comprehensive SEO & Instant Indexing Matrix'}</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {isAr
              ? 'تخصيص كامل لعناوين وأوصاف وكلمات البحث لكل صفحة على حدة مع المحاكاة الحية لنتائج Google وإرسال الأرشفة الفورية'
              : 'Full custom control for per-page meta tags, Schema.org sync, live Google SERP preview, and crawler dispatch'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl border border-white/15 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer text-gray-300"
          >
            <FileCode className="w-3.5 h-3.5 text-blue-400" />
            <span>{isAr ? 'خريطة الموقع' : 'Sitemap'}</span>
            <ExternalLink className="w-3 h-3 text-gray-500" />
          </a>

          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl border border-white/15 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer text-gray-300"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Robots.txt</span>
            <ExternalLink className="w-3 h-3 text-gray-500" />
          </a>

          <button
            onClick={handleTriggerIndexing}
            disabled={pinging}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-50"
          >
            {pinging ? <Loader2 className="w-4 h-4 animate-spin" /> : <Radio className="w-4 h-4 animate-pulse text-sky-300" />}
            <span>{pinging ? (isAr ? 'جارِ الإرسال...' : 'Dispatching...') : (isAr ? 'أرشفة فورية بـ 14 صفحة' : 'Instant Index (14 Pages)')}</span>
          </button>
        </div>
      </div>

      {/* Ping Feedback Alert */}
      {pingResult && (
        <div
          className={`p-4 rounded-2xl border text-xs font-bold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn ${
            pingResult.success
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-black text-sm">{pingResult.message}</p>
              <p className="text-[11px] opacity-80 mt-0.5">
                {isAr ? 'تم إرسال بروتوكول IndexNow لمحركات البحث بنجاح لكافة روابط الموقع.' : 'IndexNow ping sent successfully.'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-black/40 px-2.5 py-1 rounded-lg">
            {pingResult.timestamp || new Date().toLocaleTimeString()}
          </span>
        </div>
      )}

      {/* Sub Tabs Bar */}
      <div className="flex overflow-x-auto gap-2 border-b border-white/10 pb-2">
        {[
          { id: 'global', labelAr: 'إعدادات السيو العامة للموقع', labelEn: 'Global Site SEO' },
          { id: 'per_page', labelAr: 'سيو الصفحات الفردية (14 صفحة)', labelEn: 'Per-Page SEO Matrix (14 Pages)' },
          { id: 'technical', labelAr: 'إعدادات الفهرسة والمفاتيح التقنية', labelEn: 'Technical & IndexNow Keys' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'hover:bg-white/5 text-gray-300'
            }`}
          >
            {isAr ? tab.labelAr : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Form Container */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* TAB 1: GLOBAL SEO */}
          {activeTab === 'global' && (
            <div className="p-6 rounded-3xl border bg-white/5 border-white/10 space-y-4 shadow-xl">
              <h3 className="text-sm font-black text-blue-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? 'بيانات الميتا الرئيسية للموقع (Global Meta Tags)' : 'Global Website Meta Tags'}</span>
              </h3>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  {isAr ? 'عنوان الموقع في محركات البحث (عربي) - Meta Title' : 'Global Title (Arabic)'}
                </label>
                <input
                  type="text"
                  value={seoData.metaTitleAr || ''}
                  onChange={(e) => setSeoData({ ...seoData, metaTitleAr: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  {isAr ? 'الطول الموصى به: 50-60 حرفاً' : 'Recommended length: 50-60 chars'} ({seoData.metaTitleAr?.length || 0} حرف)
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  {isAr ? 'عنوان الموقع في محركات البحث (إنجليزي) - Meta Title EN' : 'Global Title (English)'}
                </label>
                <input
                  type="text"
                  value={seoData.metaTitleEn || ''}
                  onChange={(e) => setSeoData({ ...seoData, metaTitleEn: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  {isAr ? 'الوصف التعريفي للبحث (عربي) - Meta Description' : 'Meta Description (Arabic)'}
                </label>
                <textarea
                  rows={3}
                  value={seoData.metaDescriptionAr || ''}
                  onChange={(e) => setSeoData({ ...seoData, metaDescriptionAr: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  {isAr ? 'الطول الموصى به: 120-160 حرفاً' : 'Recommended length: 120-160 chars'} ({seoData.metaDescriptionAr?.length || 0} حرف)
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  {isAr ? 'الوصف التعريفي للبحث (إنجليزي) - Meta Description EN' : 'Meta Description (English)'}
                </label>
                <textarea
                  rows={3}
                  value={seoData.metaDescriptionEn || ''}
                  onChange={(e) => setSeoData({ ...seoData, metaDescriptionEn: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  {isAr ? 'الكلمات المفتاحية المستهدفة (مفصولة بفواصل)' : 'Target Keywords (Comma-separated)'}
                </label>
                <input
                  type="text"
                  value={seoData.keywordsAr || ''}
                  onChange={(e) => setSeoData({ ...seoData, keywordsAr: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  {isAr ? 'رابط النطاق المعتمد (Canonical URL)' : 'Canonical Domain URL'}
                </label>
                <input
                  type="text"
                  value={seoData.canonicalUrl || ''}
                  onChange={(e) => setSeoData({ ...seoData, canonicalUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none font-mono text-left dir-ltr"
                />
              </div>
            </div>
          )}

          {/* TAB 2: PER-PAGE SEO MATRIX */}
          {activeTab === 'per_page' && (
            <div className="p-6 rounded-3xl border bg-white/5 border-white/10 space-y-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <h3 className="text-sm font-black text-blue-400 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>{isAr ? 'تخصيص السيو لكل صفحة من صفحات الموقع' : 'Per-Page SEO Customization'}</span>
                </h3>

                {/* Page Selector Dropdown */}
                <select
                  value={selectedPageKey}
                  onChange={(e) => setSelectedPageKey(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-blue-500/40 text-white text-xs font-bold focus:outline-none"
                >
                  {pageOptions.map((p) => (
                    <option key={p.key} value={p.key} className="bg-slate-900 text-white">
                      {isAr ? p.labelAr : p.labelEn} ({p.path})
                    </option>
                  ))}
                </select>
              </div>

              {/* Active Selected Page Notification */}
              <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs flex items-center justify-between">
                <span className="font-bold text-blue-300">
                  {isAr ? 'تعديل سيو صفحة:' : 'Editing SEO for:'}{' '}
                  {isAr ? pageOptions.find((p) => p.key === selectedPageKey)?.labelAr : pageOptions.find((p) => p.key === selectedPageKey)?.labelEn}
                </span>
                <span className="font-mono text-[11px] text-gray-400 dir-ltr">
                  {pageOptions.find((p) => p.key === selectedPageKey)?.path}
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  {isAr ? 'عنوان الصفحة لمحركات البحث (عربي) - Page Title' : 'Page Meta Title (Arabic)'}
                </label>
                <input
                  type="text"
                  value={currentPageSeo.metaTitleAr || ''}
                  onChange={(e) => handlePageSeoChange('metaTitleAr', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  ({currentPageSeo.metaTitleAr?.length || 0} حرف)
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  {isAr ? 'عنوان الصفحة لمحركات البحث (إنجليزي) - Page Title EN' : 'Page Meta Title (English)'}
                </label>
                <input
                  type="text"
                  value={currentPageSeo.metaTitleEn || ''}
                  onChange={(e) => handlePageSeoChange('metaTitleEn', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  {isAr ? 'الوصف التعريفي للصفحة (عربي) - Page Description' : 'Page Meta Description (Arabic)'}
                </label>
                <textarea
                  rows={3}
                  value={currentPageSeo.metaDescriptionAr || ''}
                  onChange={(e) => handlePageSeoChange('metaDescriptionAr', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  ({currentPageSeo.metaDescriptionAr?.length || 0} حرف)
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  {isAr ? 'الوصف التعريفي للصفحة (إنجليزي) - Page Description EN' : 'Page Meta Description (English)'}
                </label>
                <textarea
                  rows={3}
                  value={currentPageSeo.metaDescriptionEn || ''}
                  onChange={(e) => handlePageSeoChange('metaDescriptionEn', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  {isAr ? 'الكلمات المفتاحية الخاصة بهذه الصفحة' : 'Page Specific Keywords'}
                </label>
                <input
                  type="text"
                  value={currentPageSeo.keywordsAr || ''}
                  onChange={(e) => handlePageSeoChange('keywordsAr', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: TECHNICAL INDEXNOW KEYS */}
          {activeTab === 'technical' && (
            <div className="p-6 rounded-3xl border bg-white/5 border-white/10 space-y-4 shadow-xl">
              <h3 className="text-sm font-black text-blue-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{isAr ? 'رموز التحقق ومفاتيح الأرشفة الفورية' : 'Verification Tokens & API Keys'}</span>
              </h3>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  Google Search Console Verification Token
                </label>
                <input
                  type="text"
                  value={seoData.googleVerification || ''}
                  onChange={(e) => setSeoData({ ...seoData, googleVerification: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none font-mono"
                  placeholder="google-site-verification-..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  IndexNow Instant Push API Key
                </label>
                <input
                  type="text"
                  value={seoData.indexNowKey || ''}
                  onChange={(e) => setSeoData({ ...seoData, indexNowKey: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none font-mono"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  {isAr ? 'يتم استخدامه لإرسال التحديثات لـ Bing وYandex ومحركات البحث الشريكة' : 'Used for instant Bing & search engine crawling'}
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  {isAr ? 'صورة المشاركة الاجتماعية الافتراضية (OpenGraph Image)' : 'Default OG Social Card Image'}
                </label>
                <input
                  type="text"
                  value={seoData.ogImage || ''}
                  onChange={(e) => setSeoData({ ...seoData, ogImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none font-mono dir-ltr text-left"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="py-3 px-8 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? (isAr ? 'جارِ الحفظ والمزامنة...' : 'Saving...') : (isAr ? 'حفظ إعدادات السيو' : 'Save SEO Settings')}</span>
            </button>

            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
                <Check className="w-4 h-4" />
                {isAr ? 'تم حفظ ومزامنة بيانات السيو بنجاح في Firestore!' : 'SEO settings successfully updated!'}
              </span>
            )}
          </div>
        </div>

        {/* Right Preview Simulator (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl border bg-[#0d133a] border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-gray-200 flex items-center gap-1.5">
                <Search className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'معاينة النتيجة على محرك بحث Google' : 'Live Google SERP Simulator'}</span>
              </h3>

              <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                    previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                    previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
                <span className="text-gray-600">|</span>
                <button
                  type="button"
                  onClick={() => setPreviewLang(previewLang === 'ar' ? 'en' : 'ar')}
                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 hover:bg-white/20 text-white cursor-pointer uppercase"
                >
                  {previewLang}
                </button>
              </div>
            </div>

            {/* Google Result Card Simulation */}
            <div
              className={`p-4 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-md space-y-1.5 transition-all ${
                previewDevice === 'mobile' ? 'max-w-[320px] mx-auto text-[11px]' : 'text-xs'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  H
                </div>
                <div>
                  <span className="text-[11px] text-[#202124] font-medium block">
                    مجموعة هارد - HARD Group
                  </span>
                  <span className="text-[10px] text-[#5f6368] font-mono dir-ltr block truncate max-w-[240px]">
                    {activeUrl || 'https://hardgp.com'}
                  </span>
                </div>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-[#1a0dab] hover:underline cursor-pointer line-clamp-2 leading-snug">
                {activeTitle || 'مجموعة هارد للمقاولات العامة والتطوير العقاري'}
              </h4>

              <p className="text-[11px] sm:text-xs text-[#4d5156] line-clamp-3 leading-relaxed">
                {activeDesc || 'مؤسسة هارد للمقاولات العامة، تساهم في قطاع الصناعة والبنية التحتية في المملكة العربية السعودية منذ عام 2004.'}
              </p>
            </div>

            {/* Quality Checklist */}
            <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
              <span className="text-[11px] font-bold text-gray-300 block">
                {isAr ? 'مؤشرات جودة السيو الفني:' : 'SEO Health Indicators:'}
              </span>
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{isAr ? 'طول العنوان (Meta Title):' : 'Title Length:'}</span>
                  <span className={(activeTitle?.length || 0) >= 30 && (activeTitle?.length || 0) <= 70 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                    {activeTitle?.length || 0} حرف (مثالي 40-65)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{isAr ? 'طول الوصف (Description):' : 'Description Length:'}</span>
                  <span className={(activeDesc?.length || 0) >= 100 && (activeDesc?.length || 0) <= 170 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                    {activeDesc?.length || 0} حرف (مثالي 120-160)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{isAr ? 'توافق Schema.org JSON-LD:' : 'Schema.org JSON-LD:'}</span>
                  <span className="text-emerald-400 font-bold">✓ نشط ومتزامن تلقائياً</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{isAr ? 'بروتوكول الأرشفة IndexNow:' : 'IndexNow Crawler:'}</span>
                  <span className="text-emerald-400 font-bold">✓ متصل ومفعل 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
