'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { SiteSettingsDoc, defaultSiteSettings } from '@/lib/firestore-service';

interface SiteContentEditorProps {
  settings: SiteSettingsDoc;
  onSave: (newSettings: Partial<SiteSettingsDoc>) => Promise<void>;
  isDark: boolean;
  isAr: boolean;
}

export default function SiteContentEditor({
  settings,
  onSave,
  isDark,
  isAr,
}: SiteContentEditorProps) {
  const [formData, setFormData] = useState<SiteSettingsDoc>(settings);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'sections' | 'hero' | 'contact' | 'stats'>('sections');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await onSave(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert(isAr ? 'حدث خطأ أثناء حفظ الإعدادات' : 'Error saving site settings');
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = () => {
    if (confirm(isAr ? 'هل تريد استعادة النصوص الافتراضية للموقع؟' : 'Reset to default texts?')) {
      setFormData(defaultSiteSettings);
    }
  };

  const handleSectionChange = (key: keyof SiteSettingsDoc['sectionTitles'], val: string) => {
    setFormData((prev) => ({
      ...prev,
      sectionTitles: {
        ...prev.sectionTitles,
        [key]: val,
      },
    }));
  };

  const handleContactChange = (key: keyof SiteSettingsDoc['contactInfo'], val: string) => {
    setFormData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [key]: val,
      },
    }));
  };

  const handleStatChange = (key: keyof SiteSettingsDoc['stats'], val: string) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [key]: val,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border backdrop-blur-md bg-white/5 border-white/10 shadow-lg">
        <div>
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-blue-500" />
            <span>{isAr ? 'محرر محتوى الموقع وأسماء الأقسام' : 'Site Content & Section Names Editor'}</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {isAr
              ? 'تعديل جميع نصوص وأسماء أقسام الموقع، التراخيص، والمعلومات الرسمية مع حفظ تزامني فوري في Firestore'
              : 'Modify all site texts, section names, licenses, and official info with instant real-time sync'}
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
            <span>{saving ? (isAr ? 'جارِ الحفظ...' : 'Saving...') : (isAr ? 'حفظ التغييرات تزامناً' : 'Save Changes Live')}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{isAr ? 'تم حفظ التعديلات بنجاح في قاعدة البيانات وتحديث كافة أقسام الموقع تزامناً!' : 'Settings successfully saved to database and live-propagated to the site!'}</span>
        </div>
      )}

      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        <button
          type="button"
          onClick={() => setActiveSubTab('sections')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'sections'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-gray-300'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{isAr ? 'أسماء الأقسام (Section Titles)' : 'Section Titles'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('hero')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'hero'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-gray-300'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{isAr ? 'القسم الرئيسي (Hero Section)' : 'Hero Section'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('contact')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'contact'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-gray-300'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{isAr ? 'التراخيص ومعلومات الاتصال' : 'Licenses & Contacts'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('stats')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'stats'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-gray-300'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>{isAr ? 'أرقام وإحصائيات الإنجاز' : 'Milestone Stats'}</span>
        </button>
      </div>

      {/* 1. SECTIONS TAB */}
      {activeSubTab === 'sections' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
            {isAr
              ? 'يمكنك هنا تعديل أسماء كافة الأقسام الرئيسية في الصفحة الرئيسية والموقع باللغتين العربية والإنجليزية:'
              : 'Customize the primary display titles for every website section in both Arabic and English:'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Properties Section */}
            <div className="p-5 rounded-2xl border bg-white/5 border-white/10 space-y-3">
              <span className="text-xs font-black text-blue-400 block uppercase">1. قسم العقارات المميزة</span>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">اسم القسم (العربية)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.propertiesAr || ''}
                  onChange={(e) => handleSectionChange('propertiesAr', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">اسم القسم (English)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.propertiesEn || ''}
                  onChange={(e) => handleSectionChange('propertiesEn', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">الوصف الفرعي (العربية)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.propertiesSubtitleAr || ''}
                  onChange={(e) => handleSectionChange('propertiesSubtitleAr', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Projects Section */}
            <div className="p-5 rounded-2xl border bg-white/5 border-white/10 space-y-3">
              <span className="text-xs font-black text-sky-400 block uppercase">2. قسم المشاريع الاستراتيجية</span>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">اسم القسم (العربية)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.projectsAr || ''}
                  onChange={(e) => handleSectionChange('projectsAr', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">اسم القسم (English)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.projectsEn || ''}
                  onChange={(e) => handleSectionChange('projectsEn', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">الوصف الفرعي (العربية)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.projectsSubtitleAr || ''}
                  onChange={(e) => handleSectionChange('projectsSubtitleAr', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* General Contracting Section */}
            <div className="p-5 rounded-2xl border bg-white/5 border-white/10 space-y-3">
              <span className="text-xs font-black text-amber-400 block uppercase">3. قطاع المقاولات الإنشائية (SBC)</span>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">عنوان القطاع (العربية)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.contractingAr || ''}
                  onChange={(e) => handleSectionChange('contractingAr', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">عنوان القطاع (English)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.contractingEn || ''}
                  onChange={(e) => handleSectionChange('contractingEn', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* HVAC Section */}
            <div className="p-5 rounded-2xl border bg-white/5 border-white/10 space-y-3">
              <span className="text-xs font-black text-emerald-400 block uppercase">4. قطاع التكييف والتشغيل (AMC 24/7)</span>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">عنوان القطاع (العربية)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.hvacAr || ''}
                  onChange={(e) => handleSectionChange('hvacAr', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">عنوان القطاع (English)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.hvacEn || ''}
                  onChange={(e) => handleSectionChange('hvacEn', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Services Matrix */}
            <div className="p-5 rounded-2xl border bg-white/5 border-white/10 space-y-3">
              <span className="text-xs font-black text-purple-400 block uppercase">5. مصفوفة الخدمات الهندسية</span>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">اسم القسم (العربية)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.servicesAr || ''}
                  onChange={(e) => handleSectionChange('servicesAr', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">اسم القسم (English)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.servicesEn || ''}
                  onChange={(e) => handleSectionChange('servicesEn', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Calculator Section */}
            <div className="p-5 rounded-2xl border bg-white/5 border-white/10 space-y-3">
              <span className="text-xs font-black text-rose-400 block uppercase">6. حاسبة تكاليف المشاريع</span>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">اسم القسم (العربية)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.calculatorAr || ''}
                  onChange={(e) => handleSectionChange('calculatorAr', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">اسم القسم (English)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.calculatorEn || ''}
                  onChange={(e) => handleSectionChange('calculatorEn', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Testimonials */}
            <div className="p-5 rounded-2xl border bg-white/5 border-white/10 space-y-3">
              <span className="text-xs font-black text-teal-400 block uppercase">7. آراء العملاء وسجل الإنجاز</span>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">اسم القسم (العربية)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.testimonialsAr || ''}
                  onChange={(e) => handleSectionChange('testimonialsAr', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">اسم القسم (English)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.testimonialsEn || ''}
                  onChange={(e) => handleSectionChange('testimonialsEn', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Branches Section */}
            <div className="p-5 rounded-2xl border bg-white/5 border-white/10 space-y-3">
              <span className="text-xs font-black text-indigo-400 block uppercase">8. فروع ومكاتب المملكة</span>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">اسم القسم (العربية)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.branchesAr || ''}
                  onChange={(e) => handleSectionChange('branchesAr', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">اسم القسم (English)</label>
                <input
                  type="text"
                  value={formData.sectionTitles?.branchesEn || ''}
                  onChange={(e) => handleSectionChange('branchesEn', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. HERO TAB */}
      {activeSubTab === 'hero' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl border bg-white/5 border-white/10 space-y-4">
            <h3 className="text-sm font-black text-blue-400">العناوين والبادجات الرئيسية</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">العنوان الأول (العربية)</label>
                <input
                  type="text"
                  value={formData.heroTitleAr || ''}
                  onChange={(e) => setFormData({ ...formData, heroTitleAr: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">العنوان الأول (English)</label>
                <input
                  type="text"
                  value={formData.heroTitleEn || ''}
                  onChange={(e) => setFormData({ ...formData, heroTitleEn: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">العنوان الملون/الفرعي (العربية)</label>
                <input
                  type="text"
                  value={formData.heroSubtitleAr || ''}
                  onChange={(e) => setFormData({ ...formData, heroSubtitleAr: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">العنوان الملون/الفرعي (English)</label>
                <input
                  type="text"
                  value={formData.heroSubtitleEn || ''}
                  onChange={(e) => setFormData({ ...formData, heroSubtitleEn: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">البادج العلوي المضيء (العربية)</label>
              <input
                type="text"
                value={formData.heroBadgeAr || ''}
                onChange={(e) => setFormData({ ...formData, heroBadgeAr: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">رابط صورة خلفية الهيرو الرئيسية (Hero Background Image URL)</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.heroImage || ''}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              {formData.heroImage && (
                <div className="mt-2 relative h-32 w-full rounded-xl overflow-hidden border border-white/15">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.heroImage} alt="Hero preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">نص زر الاستشارة (العربية)</label>
                <input
                  type="text"
                  value={formData.heroCtaQuoteAr || ''}
                  onChange={(e) => setFormData({ ...formData, heroCtaQuoteAr: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">نص زر الحاسبة (العربية)</label>
                <input
                  type="text"
                  value={formData.heroCtaCalcAr || ''}
                  onChange={(e) => setFormData({ ...formData, heroCtaCalcAr: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CONTACT TAB */}
      {activeSubTab === 'contact' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl border bg-white/5 border-white/10 space-y-3">
              <span className="text-xs font-black text-emerald-400 block uppercase">التراخيص الحكومية المعتمدة</span>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">رقم رخصة فال العقارية (VAL License)</label>
                <input
                  type="text"
                  value={formData.contactInfo?.licenseVal || ''}
                  onChange={(e) => handleContactChange('licenseVal', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">اعتماد كود البناء السعودي (SBC)</label>
                <input
                  type="text"
                  value={formData.contactInfo?.codeSbc || ''}
                  onChange={(e) => handleContactChange('codeSbc', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">رقم السجل التجاري (CR Number)</label>
                <input
                  type="text"
                  value={formData.contactInfo?.crNumber || ''}
                  onChange={(e) => handleContactChange('crNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl border bg-white/5 border-white/10 space-y-3">
              <span className="text-xs font-black text-blue-400 block uppercase">قنوات الاتصال المباشرة</span>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">الرقم الموحد / الهاتف</label>
                <input
                  type="text"
                  value={formData.contactInfo?.hotline || ''}
                  onChange={(e) => handleContactChange('hotline', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">طوارئ الصيانة والتكييف 24/7</label>
                <input
                  type="text"
                  value={formData.contactInfo?.emergencyPhone || ''}
                  onChange={(e) => handleContactChange('emergencyPhone', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">البريد الإلكتروني الرسمي</label>
                <input
                  type="email"
                  value={formData.contactInfo?.email || ''}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border bg-white/5 border-white/10 space-y-3">
            <span className="text-xs font-black text-indigo-400 block uppercase">عناوين المقرات الرئيسية</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">عنوان المقر الرئيسي بالخُبر (العربية)</label>
                <input
                  type="text"
                  value={formData.contactInfo?.addressKhobarAr || ''}
                  onChange={(e) => handleContactChange('addressKhobarAr', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">عنوان فرع الرياض (العربية)</label>
                <input
                  type="text"
                  value={formData.contactInfo?.addressRiyadhAr || ''}
                  onChange={(e) => handleContactChange('addressRiyadhAr', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. STATS TAB */}
      {activeSubTab === 'stats' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl border bg-white/5 border-white/10 space-y-4">
            <h3 className="text-sm font-black text-amber-400">إحصائيات الإنجاز والعدادات المعروضة في الصفحة الرئيسية</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <label className="text-xs font-bold text-gray-400 block mb-1">عدد المشاريع المكتملة</label>
                <input
                  type="text"
                  value={formData.stats?.projectsCount || '+180'}
                  onChange={(e) => handleStatChange('projectsCount', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white font-black text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <label className="text-xs font-bold text-gray-400 block mb-1">حجم المحافظ والاستثمار</label>
                <input
                  type="text"
                  value={formData.stats?.investmentSar || '4.8 مليار'}
                  onChange={(e) => handleStatChange('investmentSar', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white font-black text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <label className="text-xs font-bold text-gray-400 block mb-1">نسبة رضا المستثمرين</label>
                <input
                  type="text"
                  value={formData.stats?.satisfactionRate || '99.4%'}
                  onChange={(e) => handleStatChange('satisfactionRate', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white font-black text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <label className="text-xs font-bold text-gray-400 block mb-1">المهندسين والفنيين المعتمدين</label>
                <input
                  type="text"
                  value={formData.stats?.engineersCount || '+65'}
                  onChange={(e) => handleStatChange('engineersCount', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white font-black text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
