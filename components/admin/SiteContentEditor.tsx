'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Layers,
  Phone,
  ShieldCheck,
  Building2,
  Sliders,
  Image as ImageIcon,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  HardHat,
  Fan,
  FileText,
  Layout,
  BookOpen,
} from 'lucide-react';
import {
  SiteSettingsDoc,
  defaultSiteSettings,
  MediaItemDoc,
  PageBannerDoc,
  DivisionCardDoc,
} from '@/lib/firestore-service';
import ImageUploadPicker from './ImageUploadPicker';

interface SiteContentEditorProps {
  settings: SiteSettingsDoc;
  onSave: (newSettings: Partial<SiteSettingsDoc>) => Promise<void>;
  isDark: boolean;
  isAr: boolean;
  uploadedMedia?: MediaItemDoc[];
}

export type EditorSubTab =
  | 'hero'
  | 'slides'
  | 'page_banners'
  | 'divisions'
  | 'sections_content'
  | 'section_titles'
  | 'contact'
  | 'stats';

export default function SiteContentEditor({
  settings,
  onSave,
  isDark,
  isAr,
  uploadedMedia = [],
}: SiteContentEditorProps) {
  const [formData, setFormData] = useState<SiteSettingsDoc>({
    ...defaultSiteSettings,
    ...settings,
    slides: settings.slides || defaultSiteSettings.slides || [],
    pageBanners: {
      ...defaultSiteSettings.pageBanners,
      ...settings.pageBanners,
    },
    divisionCards: {
      ...defaultSiteSettings.divisionCards,
      ...settings.divisionCards,
    },
    aboutSection: {
      ...defaultSiteSettings.aboutSection,
      ...settings.aboutSection,
    },
    whyChooseUs: {
      ...defaultSiteSettings.whyChooseUs,
      ...settings.whyChooseUs,
    },
    skillsSection: {
      ...defaultSiteSettings.skillsSection,
      ...settings.skillsSection,
    },
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<EditorSubTab>('hero');
  const [expandedSlideIndex, setExpandedSlideIndex] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await onSave(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert(isAr ? 'حدث خطأ أثناء حفظ التعديلات' : 'Error saving site settings');
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = () => {
    if (confirm(isAr ? 'هل تريد استعادة جميع الإعدادات والصور الافتراضية؟' : 'Reset all settings and images to default?')) {
      setFormData(defaultSiteSettings);
    }
  };

  // Helper updater for deep fields
  const handlePageBannerChange = (pageKey: string, field: keyof PageBannerDoc, val: string) => {
    setFormData((prev) => ({
      ...prev,
      pageBanners: {
        ...prev.pageBanners,
        [pageKey]: {
          ...(prev.pageBanners?.[pageKey as keyof typeof prev.pageBanners] || {
            titleAr: '',
            titleEn: '',
            subtitleAr: '',
            subtitleEn: '',
            image: '/images/hardgp/por1-big.jpg',
          }),
          [field]: val,
        },
      },
    }));
  };

  const handleDivisionChange = (divKey: 'realestate' | 'contracting' | 'hvac', field: keyof DivisionCardDoc, val: string) => {
    setFormData((prev) => ({
      ...prev,
      divisionCards: {
        ...prev.divisionCards,
        [divKey]: {
          ...(prev.divisionCards?.[divKey] || {
            titleAr: '',
            titleEn: '',
            badgeAr: '',
            badgeEn: '',
            descAr: '',
            descEn: '',
            image: '',
          }),
          [field]: val,
        },
      },
    }));
  };

  const handleSlideChange = (index: number, field: string, val: string) => {
    setFormData((prev) => {
      const slides = [...(prev.slides || [])];
      if (slides[index]) {
        slides[index] = {
          ...slides[index],
          [field]: val,
        };
      }
      return { ...prev, slides };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border backdrop-blur-md bg-white/5 border-white/10 shadow-lg">
        <div>
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-blue-500" />
            <span>{isAr ? 'مركز التحكم الشامل بالمحتوى والصور والنصوص' : 'Universal Site Content, Images & Banners Editor'}</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {isAr
              ? 'تعديل وتغيير جميع نصوص وصور الموقع عبر كافة الصفحات مع حفظ فوري ومباشر في قاعدة البيانات Firestore'
              : 'Edit and customize all texts, images, and banners across all pages with live Firestore persistence'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={resetToDefault}
            className="px-4 py-2.5 rounded-xl border border-white/15 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-gray-400" />
            <span>{isAr ? 'الافتراضية' : 'Reset Defaults'}</span>
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? (isAr ? 'جارِ الحفظ...' : 'Saving...') : (isAr ? 'حفظ التغييرات في قاعدة البيانات' : 'Save Live to Database')}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{isAr ? 'تم حفظ التعديلات بنجاح في قاعدة البيانات وتحديث كافة الأقسام والصور تزامناً!' : 'All changes and image updates were successfully saved and live-synchronized!'}</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {[
          { key: 'hero', icon: Sparkles, labelAr: 'الواجهة الرئيسية (Hero)', labelEn: 'Main Hero' },
          { key: 'slides', icon: ImageIcon, labelAr: 'شرائح هارد الأصلية (12)', labelEn: '12 Slides' },
          { key: 'page_banners', icon: Layout, labelAr: 'بانرات كافة الصفحات', labelEn: 'All Page Banners' },
          { key: 'divisions', icon: Building2, labelAr: 'بطاقات الأقسام الرئيسية', labelEn: 'Divisions Cards' },
          { key: 'sections_content', icon: BookOpen, labelAr: 'نصوص وصور الأقسام', labelEn: 'Story Sections' },
          { key: 'section_titles', icon: Layers, labelAr: 'عناوين الأقسام', labelEn: 'Section Titles' },
          { key: 'contact', icon: Phone, labelAr: 'بيانات التواصل والرخص', labelEn: 'Contact & Licenses' },
          { key: 'stats', icon: ShieldCheck, labelAr: 'الأرقام والإحصائيات', labelEn: 'Metrics & Stats' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveSubTab(tab.key as EditorSubTab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{isAr ? tab.labelAr : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* ---------------- 1. HERO EDITOR ---------------- */}
      {activeSubTab === 'hero' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'صورة ونصوص الواجهة الرئيسية (Hero Section)' : 'Hero Banner, Photography & Headline'}</span>
            </h3>

            {/* Hero Background Image Picker */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10">
              <ImageUploadPicker
                value={formData.heroImage || '/images/hardgp/por1-big.jpg'}
                onChange={(url) => setFormData({ ...formData, heroImage: url })}
                label="Hero Background Image"
                labelAr="صورة خلفية الواجهة الرئيسية (Hero Image)"
                isAr={isAr}
                uploadedMedia={uploadedMedia}
                helperText={isAr ? 'يمكنك اختيار صورة عالية الجودة من المكتبة أو رفع صورة مخصصة' : 'Select from library or upload new high-res image'}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {isAr ? 'العنوان الرئيسي (عربي)' : 'Main Title (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formData.heroTitleAr}
                  onChange={(e) => setFormData({ ...formData, heroTitleAr: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {isAr ? 'العنوان الرئيسي (إنجليزي)' : 'Main Title (English)'}
                </label>
                <input
                  type="text"
                  value={formData.heroTitleEn}
                  onChange={(e) => setFormData({ ...formData, heroTitleEn: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {isAr ? 'العنوان الفرعي الإيطاليك (عربي)' : 'Italic Subtitle (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formData.heroSubtitleAr}
                  onChange={(e) => setFormData({ ...formData, heroSubtitleAr: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {isAr ? 'العنوان الفرعي الإيطاليك (إنجليزي)' : 'Italic Subtitle (English)'}
                </label>
                <input
                  type="text"
                  value={formData.heroSubtitleEn}
                  onChange={(e) => setFormData({ ...formData, heroSubtitleEn: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {isAr ? 'شارة وسنة التأسيس (عربي)' : 'Hero Badge (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formData.heroBadgeAr}
                  onChange={(e) => setFormData({ ...formData, heroBadgeAr: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {isAr ? 'شارة وسنة التأسيس (إنجليزي)' : 'Hero Badge (English)'}
                </label>
                <input
                  type="text"
                  value={formData.heroBadgeEn}
                  onChange={(e) => setFormData({ ...formData, heroBadgeEn: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Description Paragraph */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {isAr ? 'فقرة النبذة التمهيدية (عربي)' : 'Hero Intro Description (Arabic)'}
                </label>
                <textarea
                  rows={3}
                  value={formData.heroDescriptionAr || ''}
                  onChange={(e) => setFormData({ ...formData, heroDescriptionAr: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {isAr ? 'فقرة النبذة التمهيدية (إنجليزي)' : 'Hero Intro Description (English)'}
                </label>
                <textarea
                  rows={3}
                  value={formData.heroDescriptionEn || ''}
                  onChange={(e) => setFormData({ ...formData, heroDescriptionEn: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* CTA Buttons Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {isAr ? 'نص زر التسعير الفوري (عربي)' : 'CTA Instant Quote Button (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formData.heroCtaQuoteAr || ''}
                  onChange={(e) => setFormData({ ...formData, heroCtaQuoteAr: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {isAr ? 'نص زر التسعير الفوري (إنجليزي)' : 'CTA Instant Quote Button (English)'}
                </label>
                <input
                  type="text"
                  value={formData.heroCtaQuoteEn || ''}
                  onChange={(e) => setFormData({ ...formData, heroCtaQuoteEn: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 2. 12 SLIDES EDITOR ---------------- */}
      {activeSubTab === 'slides' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold text-blue-400 mb-1">
              {isAr ? 'تعديل صور ونصوص الشرائح الـ 12 المستوردة من hardgp.com' : 'Edit All 12 Source Slides & Photography'}
            </h3>
            <p className="text-xs text-gray-400">
              {isAr
                ? 'يمكنك تغيير صورة كل مرحلة، العنوان، والوصف لكافة مراحل الإنشاء والتطوير العقاري والصيانة'
                : 'Customize the image, step badge, and description for every individual stage'}
            </p>
          </div>

          <div className="space-y-3">
            {(formData.slides || []).map((slide, idx) => {
              const isExpanded = expandedSlideIndex === idx;
              return (
                <div
                  key={slide.id || idx}
                  className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all"
                >
                  {/* Accordion Header */}
                  <div
                    onClick={() => setExpandedSlideIndex(isExpanded ? null : idx)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 font-mono text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-white block">
                          {isAr ? slide.title_ar : slide.title}
                        </span>
                        <span className="text-[11px] text-gray-400 font-light">
                          {isAr ? slide.division_ar : slide.division} • {isAr ? slide.step_ar : slide.step}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 rounded-lg overflow-hidden border border-white/15 bg-black/50 relative hidden sm:block">
                        <Image
                          src={slide.image}
                          alt="thumb"
                          fill
                          unoptimized
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Accordion Body */}
                  {isExpanded && (
                    <div className="p-5 border-t border-white/10 bg-black/20 space-y-4">
                      {/* Image Picker for this Slide */}
                      <ImageUploadPicker
                        value={slide.image}
                        onChange={(url) => handleSlideChange(idx, 'image', url)}
                        label={`Slide ${idx + 1} Image`}
                        labelAr={`صورة الشريحة رقم ${idx + 1}`}
                        isAr={isAr}
                        uploadedMedia={uploadedMedia}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1">
                            {isAr ? 'عنوان الشريحة (عربي)' : 'Slide Title (Arabic)'}
                          </label>
                          <input
                            type="text"
                            value={slide.title_ar}
                            onChange={(e) => handleSlideChange(idx, 'title_ar', e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1">
                            {isAr ? 'عنوان الشريحة (إنجليزي)' : 'Slide Title (English)'}
                          </label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => handleSlideChange(idx, 'title', e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1">
                            {isAr ? 'تسمية المرحلة (عربي - مثل المرحلة الأولى)' : 'Step Label (Arabic)'}
                          </label>
                          <input
                            type="text"
                            value={slide.step_ar}
                            onChange={(e) => handleSlideChange(idx, 'step_ar', e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1">
                            {isAr ? 'تسمية المرحلة (إنجليزي - مثل 1st Step)' : 'Step Label (English)'}
                          </label>
                          <input
                            type="text"
                            value={slide.step}
                            onChange={(e) => handleSlideChange(idx, 'step', e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-gray-300 mb-1">
                            {isAr ? 'الوصف التفصيلي (عربي)' : 'Detailed Description (Arabic)'}
                          </label>
                          <textarea
                            rows={2}
                            value={slide.description_ar}
                            onChange={(e) => handleSlideChange(idx, 'description_ar', e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-gray-300 mb-1">
                            {isAr ? 'الوصف التفصيلي (إنجليزي)' : 'Detailed Description (English)'}
                          </label>
                          <textarea
                            rows={2}
                            value={slide.description}
                            onChange={(e) => handleSlideChange(idx, 'description', e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------- 3. PAGE BANNERS ACROSS ALL PAGES ---------------- */}
      {activeSubTab === 'page_banners' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold text-blue-400 mb-1">
              {isAr ? 'صور وعناوين بانرات كافة الصفحات (All Page Banners)' : 'Page Headers, Banners & Photography'}
            </h3>
            <p className="text-xs text-gray-400">
              {isAr
                ? 'تغيير صورة الخلفية والعنوان والنص التمهيدي لكل صفحة مستقلة في الموقع وتحديثها تزامناً'
                : 'Customize the hero image and titles for each standalone page'}
            </p>
          </div>

          {[
            { key: 'construction', labelAr: 'صفحة المقاولات العامة (/construction)', labelEn: 'Construction Page' },
            { key: 'realestate', labelAr: 'صفحة التطوير والعقارات (/realestate)', labelEn: 'Real Estate Page' },
            { key: 'hvac', labelAr: 'صفحة التكييف والتشغيل (/hvac)', labelEn: 'HVAC & Maintenance Page' },
            { key: 'projects', labelAr: 'صفحة المشاريع الكبرى (/projects)', labelEn: 'Projects Page' },
            { key: 'listings', labelAr: 'صفحة العقارات والفلل (/listings)', labelEn: 'Listings Page' },
            { key: 'services', labelAr: 'صفحة الخدمات الهندسية (/services)', labelEn: 'Services Page' },
            { key: 'about', labelAr: 'صفحة عن المجموعة (/about-us)', labelEn: 'About Us Page' },
            { key: 'contact', labelAr: 'صفحة اتصل بنا (/contact-us)', labelEn: 'Contact Us Page' },
            { key: 'gallery', labelAr: 'صفحة معرض الصور (/image-gallery)', labelEn: 'Image Gallery Page' },
          ].map((pg) => {
            const banner = formData.pageBanners?.[pg.key as keyof typeof formData.pageBanners] || {
              titleAr: '',
              titleEn: '',
              subtitleAr: '',
              subtitleEn: '',
              image: '/images/hardgp/por1-big.jpg',
            };

            return (
              <div key={pg.key} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layout className="w-4 h-4 text-blue-400" />
                    <span>{isAr ? pg.labelAr : pg.labelEn}</span>
                  </h4>
                  <span className="text-[10px] font-mono text-gray-400">/{pg.key}</span>
                </div>

                {/* Banner Image Picker */}
                <ImageUploadPicker
                  value={banner.image}
                  onChange={(url) => handlePageBannerChange(pg.key, 'image', url)}
                  label="Banner Background Image"
                  labelAr="صورة خلفية البانر"
                  isAr={isAr}
                  uploadedMedia={uploadedMedia}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      {isAr ? 'عنوان الصفحة (عربي)' : 'Page Title (Arabic)'}
                    </label>
                    <input
                      type="text"
                      value={banner.titleAr}
                      onChange={(e) => handlePageBannerChange(pg.key, 'titleAr', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      {isAr ? 'عنوان الصفحة (إنجليزي)' : 'Page Title (English)'}
                    </label>
                    <input
                      type="text"
                      value={banner.titleEn}
                      onChange={(e) => handlePageBannerChange(pg.key, 'titleEn', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      {isAr ? 'النص التمهيدي (عربي)' : 'Subtitle (Arabic)'}
                    </label>
                    <textarea
                      rows={2}
                      value={banner.subtitleAr}
                      onChange={(e) => handlePageBannerChange(pg.key, 'subtitleAr', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      {isAr ? 'النص التمهيدي (إنجليزي)' : 'Subtitle (English)'}
                    </label>
                    <textarea
                      rows={2}
                      value={banner.subtitleEn}
                      onChange={(e) => handlePageBannerChange(pg.key, 'subtitleEn', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------------- 4. CORE DIVISIONS CARDS ---------------- */}
      {activeSubTab === 'divisions' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold text-blue-400 mb-1">
              {isAr ? 'تعديل بطاقات الأقسام الرئيسية الثلاثة (Core Business Pillars)' : 'Core Divisions Cards'}
            </h3>
            <p className="text-xs text-gray-400">
              {isAr
                ? 'تخصيص صورة كل بطاقة، الشارة الرسمية، والعنوان والوصف للأذرع الثلاثة في الصفحة الرئيسية'
                : 'Customize the photo, license badge, and description for the 3 main pillars on the homepage'}
            </p>
          </div>

          {[
            { key: 'contracting' as const, labelAr: 'قسم المقاولات والإنشاءات (SBC)', labelEn: 'Construction Pillar' },
            { key: 'realestate' as const, labelAr: 'قسم العقارات والاستثمار (فال)', labelEn: 'Real Estate Pillar' },
            { key: 'hvac' as const, labelAr: 'قسم التكييف والتشغيل (AMC)', labelEn: 'HVAC Pillar' },
          ].map((div) => {
            const card = formData.divisionCards?.[div.key] || {
              titleAr: '',
              titleEn: '',
              badgeAr: '',
              badgeEn: '',
              descAr: '',
              descEn: '',
              image: '/images/hardgp/por1-big.jpg',
            };

            return (
              <div key={div.key} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>{isAr ? div.labelAr : div.labelEn}</span>
                </h4>

                <ImageUploadPicker
                  value={card.image}
                  onChange={(url) => handleDivisionChange(div.key, 'image', url)}
                  label="Division Card Image"
                  labelAr="صورة بطاقة القسم"
                  isAr={isAr}
                  uploadedMedia={uploadedMedia}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      {isAr ? 'عنوان القسم (عربي)' : 'Division Title (Arabic)'}
                    </label>
                    <input
                      type="text"
                      value={card.titleAr}
                      onChange={(e) => handleDivisionChange(div.key, 'titleAr', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      {isAr ? 'عنوان القسم (إنجليزي)' : 'Division Title (English)'}
                    </label>
                    <input
                      type="text"
                      value={card.titleEn}
                      onChange={(e) => handleDivisionChange(div.key, 'titleEn', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      {isAr ? 'الشارة / الترخيص (عربي)' : 'Badge Label (Arabic)'}
                    </label>
                    <input
                      type="text"
                      value={card.badgeAr}
                      onChange={(e) => handleDivisionChange(div.key, 'badgeAr', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      {isAr ? 'الشارة / الترخيص (إنجليزي)' : 'Badge Label (English)'}
                    </label>
                    <input
                      type="text"
                      value={card.badgeEn}
                      onChange={(e) => handleDivisionChange(div.key, 'badgeEn', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      {isAr ? 'الوصف التعريفي (عربي)' : 'Description (Arabic)'}
                    </label>
                    <textarea
                      rows={2}
                      value={card.descAr}
                      onChange={(e) => handleDivisionChange(div.key, 'descAr', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      {isAr ? 'الوصف التعريفي (إنجليزي)' : 'Description (English)'}
                    </label>
                    <textarea
                      rows={2}
                      value={card.descEn}
                      onChange={(e) => handleDivisionChange(div.key, 'descEn', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------------- 5. HOMEPAGE SECTIONS CONTENT & IMAGES ---------------- */}
      {activeSubTab === 'sections_content' && (
        <div className="space-y-6 animate-fadeIn">
          {/* About Section */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>{isAr ? 'قسم النبذة التأسيسية عن المجموعة (About Section)' : 'About HARD Section'}</span>
            </h4>

            <ImageUploadPicker
              value={formData.aboutSection?.image || '/images/hardgp/por6-big.jpg'}
              onChange={(url) =>
                setFormData((prev) => ({
                  ...prev,
                  aboutSection: {
                    ...(prev.aboutSection || defaultSiteSettings.aboutSection!),
                    image: url,
                  },
                }))
              }
              label="About Section Image"
              labelAr="صورة قسم عن المجموعة"
              isAr={isAr}
              uploadedMedia={uploadedMedia}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'العنوان (عربي)' : 'Title (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formData.aboutSection?.titleAr || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      aboutSection: {
                        ...(prev.aboutSection || defaultSiteSettings.aboutSection!),
                        titleAr: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'العنوان (إنجليزي)' : 'Title (English)'}
                </label>
                <input
                  type="text"
                  value={formData.aboutSection?.titleEn || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      aboutSection: {
                        ...(prev.aboutSection || defaultSiteSettings.aboutSection!),
                        titleEn: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'نص النبذة الكاملة (عربي)' : 'Story Content (Arabic)'}
                </label>
                <textarea
                  rows={3}
                  value={formData.aboutSection?.descAr || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      aboutSection: {
                        ...(prev.aboutSection || defaultSiteSettings.aboutSection!),
                        descAr: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'نص النبذة الكاملة (إنجليزي)' : 'Story Content (English)'}
                </label>
                <textarea
                  rows={3}
                  value={formData.aboutSection?.descEn || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      aboutSection: {
                        ...(prev.aboutSection || defaultSiteSettings.aboutSection!),
                        descEn: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'قسم لماذا تختار مجموعة هارد (Why Choose Us)' : 'Why Choose Us Section'}</span>
            </h4>

            <ImageUploadPicker
              value={formData.whyChooseUs?.image || '/images/hardgp/por2-big.jpg'}
              onChange={(url) =>
                setFormData((prev) => ({
                  ...prev,
                  whyChooseUs: {
                    ...(prev.whyChooseUs || defaultSiteSettings.whyChooseUs!),
                    image: url,
                  },
                }))
              }
              label="Why Choose Us Image"
              labelAr="صورة قسم لماذا تختارنا"
              isAr={isAr}
              uploadedMedia={uploadedMedia}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'العنوان (عربي)' : 'Title (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formData.whyChooseUs?.titleAr || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      whyChooseUs: {
                        ...(prev.whyChooseUs || defaultSiteSettings.whyChooseUs!),
                        titleAr: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'العنوان (إنجليزي)' : 'Title (English)'}
                </label>
                <input
                  type="text"
                  value={formData.whyChooseUs?.titleEn || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      whyChooseUs: {
                        ...(prev.whyChooseUs || defaultSiteSettings.whyChooseUs!),
                        titleEn: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 6. SECTION TITLES ---------------- */}
      {activeSubTab === 'section_titles' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>{isAr ? 'عناوين الأقسام في الصفحة الرئيسية' : 'Section Titles across Homepage'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries({
                properties: isAr ? 'قسم العقارات المميزة' : 'Properties Section',
                projects: isAr ? 'قسم المشاريع الاستراتيجية' : 'Projects Section',
                contracting: isAr ? 'قسم المقاولات العامة' : 'Contracting Section',
                hvac: isAr ? 'قسم التكييف والتشغيل' : 'HVAC Section',
                realestate: isAr ? 'قسم الوساطة والتطوير العقاري' : 'Real Estate Section',
                services: isAr ? 'قسم الخدمات الهندسية' : 'Services Matrix Section',
                calculator: isAr ? 'قسم حاسبة تكاليف المشاريع' : 'Calculator Section',
                testimonials: isAr ? 'قسم آراء العملاء' : 'Testimonials Section',
                branches: isAr ? 'قسم الفروع والتواصل' : 'Branches Section',
                blog: isAr ? 'قسم التقارير والأخبار' : 'Media Center Section',
              }).map(([key, label]) => {
                const arKey = `${key}Ar` as keyof typeof formData.sectionTitles;
                const enKey = `${key}En` as keyof typeof formData.sectionTitles;

                return (
                  <div key={key} className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <span className="text-[11px] font-bold text-blue-400 block">{label}</span>
                    <input
                      type="text"
                      value={formData.sectionTitles[arKey] || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          sectionTitles: {
                            ...prev.sectionTitles,
                            [arKey]: e.target.value,
                          },
                        }))
                      }
                      placeholder={isAr ? 'العنوان بالعربي' : 'Title (Arabic)'}
                      className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={formData.sectionTitles[enKey] || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          sectionTitles: {
                            ...prev.sectionTitles,
                            [enKey]: e.target.value,
                          },
                        }))
                      }
                      placeholder={isAr ? 'العنوان بالإنجليزي' : 'Title (English)'}
                      className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 7. CONTACT INFO & LICENSES ---------------- */}
      {activeSubTab === 'contact' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{isAr ? 'بيانات الاتصال والتراخيص الرسمية' : 'Official Contact, Licenses & CR'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'رقم الهاتف الموحد / الخط الساخن' : 'Hotline Number'}
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.hotline}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, hotline: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'رقم طوارئ التكييف والمقاولات 24/7' : '24/7 Emergency Phone'}
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.emergencyPhone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, emergencyPhone: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'البريد الإلكتروني الرسمي' : 'Official Email'}
                </label>
                <input
                  type="email"
                  value={formData.contactInfo.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, email: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'رخصة الوساطة العقارية (فال)' : 'VAL License Number'}
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.licenseVal}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, licenseVal: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'السجل التجاري (CR)' : 'Commercial Register (CR)'}
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.crNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, crNumber: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'اعتماد كود البناء السعودي (SBC)' : 'Saudi Building Code (SBC)'}
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.codeSbc}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, codeSbc: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'العنوان الوطني / المقر الرئيسي بالدمام (عربي)' : 'Headquarters Address (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.addressKhobarAr}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, addressKhobarAr: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'العنوان الوطني / المقر الرئيسي (إنجليزي)' : 'Headquarters Address (English)'}
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.addressKhobarEn}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, addressKhobarEn: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 8. METRICS & STATS ---------------- */}
      {activeSubTab === 'stats' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? 'إحصائيات الإنجاز والاعتمادات الوطنية' : 'Milestone Numbers & Accreditations'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'عدد المشاريع المنفذة' : 'Executed Projects Count'}
                </label>
                <input
                  type="text"
                  value={formData.stats.projectsCount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      stats: { ...prev.stats, projectsCount: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'قيمة المحفظة الاستثمارية' : 'Portfolio Value (SAR)'}
                </label>
                <input
                  type="text"
                  value={formData.stats.investmentSar}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      stats: { ...prev.stats, investmentSar: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'نسبة رضا المستثمرين' : 'Satisfaction Rate'}
                </label>
                <input
                  type="text"
                  value={formData.stats.satisfactionRate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      stats: { ...prev.stats, satisfactionRate: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {isAr ? 'عدد الكوادر الهندسية' : 'Engineers Count'}
                </label>
                <input
                  type="text"
                  value={formData.stats.engineersCount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      stats: { ...prev.stats, engineersCount: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Footer */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 sticky bottom-4 backdrop-blur-xl z-20 shadow-2xl">
        <span className="text-xs text-gray-300">
          {isAr
            ? 'احفظ التغييرات لتحديث جميع الصفحات والأقسام والصور تزامناً في قاعدة البيانات'
            : 'Click save to write changes directly to Firestore and update all live pages'}
        </span>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? (isAr ? 'جارِ الحفظ...' : 'Saving...') : (isAr ? 'حفظ التغييرات تزامناً' : 'Save Changes Live')}</span>
        </button>
      </div>
    </form>
  );
}
