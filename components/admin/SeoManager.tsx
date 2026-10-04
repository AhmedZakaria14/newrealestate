'use client';

import React, { useState } from 'react';
import {
  Globe,
  Save,
  CheckCircle2,
  Send,
  ExternalLink,
  Share2,
  Search,
  Eye,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  FileCode,
  ShieldCheck,
  Radio,
  Loader2,
} from 'lucide-react';
import { SiteSettingsDoc, defaultSiteSettings } from '@/lib/firestore-service';

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
  const [seoData, setSeoData] = useState(settings.seo || defaultSiteSettings.seo);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [pinging, setPinging] = useState(false);
  const [pingResult, setPingResult] = useState<{
    success: boolean;
    message: string;
    timestamp?: string;
    pingedUrls?: string[];
  } | null>(null);

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

      const res = await fetch('/api/seo/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          urls: [
            seoData.canonicalUrl || 'https://hardgroup.sa',
            `${seoData.canonicalUrl || 'https://hardgroup.sa'}/listings`,
            `${seoData.canonicalUrl || 'https://hardgroup.sa'}/projects`,
            `${seoData.canonicalUrl || 'https://hardgroup.sa'}/services`,
            `${seoData.canonicalUrl || 'https://hardgroup.sa'}/blog`,
          ],
          key: seoData.indexNowKey,
        }),
      });

      const data = await res.json();
      setPingResult(data);

      // Record last pinged timestamp into settings
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

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border backdrop-blur-md bg-white/5 border-white/10 shadow-lg">
        <div>
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-blue-500" />
            <span>{isAr ? 'إدارة السيو المتقدم والأرشفة الفورية التلقائية' : 'Advanced SEO & Instant Indexing'}</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {isAr
              ? 'تحديث بيانات الميتا والأرشفة الفورية على محركات البحث (Google, Bing, IndexNow) بمجرد تعديل المحتوى'
              : 'Real-time search engine optimization, live snippet preview, and instant crawler dispatch'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl border border-white/15 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer text-gray-300"
          >
            <FileCode className="w-3.5 h-3.5 text-blue-400" />
            <span>{isAr ? 'خريطة الموقع (Sitemap)' : 'Sitemap.xml'}</span>
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
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-50"
          >
            {pinging ? <Loader2 className="w-4 h-4 animate-spin" /> : <Radio className="w-4 h-4 animate-pulse text-sky-300" />}
            <span>{pinging ? (isAr ? 'جارِ إرسال الأرشفة...' : 'Dispatching...') : (isAr ? 'أرشفة فورية بمحركات البحث' : 'Ping Search Engines')}</span>
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
                {isAr ? 'تم إرسال بروتوكول IndexNow وقنوات الفهرسة لـ' : 'Pings dispatched for:'}{' '}
                {pingResult.pingedUrls?.length || 5} صفحات رئيسية.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-black/40 px-2.5 py-1 rounded-lg">
            {pingResult.timestamp || new Date().toLocaleTimeString()}
          </span>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-5 rounded-2xl border bg-white/5 border-white/10 space-y-4">
            <h3 className="text-sm font-black text-blue-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'عناوين وأوصاف محركات البحث (Meta Tags)' : 'Search Meta Tags'}</span>
            </h3>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">
                {isAr ? 'عنوان الصفحة الرئيسي للبحث (عربي) - Meta Title' : 'Meta Title (Arabic)'}
              </label>
              <input
                type="text"
                value={seoData.metaTitleAr || ''}
                onChange={(e) => setSeoData({ ...seoData, metaTitleAr: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">
                {isAr ? 'الطول الموصى به: 50-60 حرفاً' : 'Recommended length: 50-60 characters'} ({seoData.metaTitleAr?.length || 0} حرف)
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">
                {isAr ? 'عنوان الصفحة الرئيسي للبحث (English) - Meta Title' : 'Meta Title (English)'}
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
                {isAr ? 'الوصف الميتا في نتائج البحث (عربي) - Meta Description' : 'Meta Description (Arabic)'}
              </label>
              <textarea
                rows={3}
                value={seoData.metaDescriptionAr || ''}
                onChange={(e) => setSeoData({ ...seoData, metaDescriptionAr: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none leading-relaxed"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">
                {isAr ? 'الطول الموصى به: 140-160 حرفاً' : 'Recommended length: 140-160 characters'} ({seoData.metaDescriptionAr?.length || 0} حرف)
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">
                {isAr ? 'الوصف الميتا (English) - Meta Description' : 'Meta Description (English)'}
              </label>
              <textarea
                rows={2}
                value={seoData.metaDescriptionEn || ''}
                onChange={(e) => setSeoData({ ...seoData, metaDescriptionEn: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">
                {isAr ? 'الكلمات المفتاحية المستهدفة (Keywords) مفصولة بفواصل' : 'Focus Keywords (Comma separated)'}
              </label>
              <input
                type="text"
                value={seoData.keywordsAr || ''}
                onChange={(e) => setSeoData({ ...seoData, keywordsAr: e.target.value })}
                placeholder="مقاولات عامة, كود البناء السعودي, عقارات الخبر, ..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl border bg-white/5 border-white/10 space-y-4">
            <h3 className="text-sm font-black text-emerald-400 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              <span>{isAr ? 'الرابط الكنسي وبطاقات التواصل الاجتماعي (OpenGraph & Canonical)' : 'OpenGraph & Social Share'}</span>
            </h3>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">
                {isAr ? 'الرابط المعتمد للموقع (Canonical URL)' : 'Canonical URL'}
              </label>
              <input
                type="url"
                value={seoData.canonicalUrl || ''}
                onChange={(e) => setSeoData({ ...seoData, canonicalUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">
                {isAr ? 'رابط صورة المشاركة الاجتماعية (OG Image URL)' : 'OpenGraph Image URL'}
              </label>
              <input
                type="url"
                value={seoData.ogImage || ''}
                onChange={(e) => setSeoData({ ...seoData, ogImage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">
                {isAr ? 'مفتاح بروتوكول الأرشفة الفورية (IndexNow Key)' : 'IndexNow API Key'}
              </label>
              <input
                type="text"
                value={seoData.indexNowKey || ''}
                onChange={(e) => setSeoData({ ...seoData, indexNowKey: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none font-mono"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? (isAr ? 'جارِ حفظ إعدادات السيو...' : 'Saving...') : (isAr ? 'حفظ إعدادات السيو وتحديث الأرشفة' : 'Save SEO Configuration')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Live Previews (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Google Search Live Preview */}
          <div className="p-5 rounded-2xl border bg-black/40 border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-black text-gray-300 flex items-center gap-1.5">
                <Search className="w-4 h-4 text-blue-400" />
                <span>{isAr ? 'معاينة النتيجة في بحث Google' : 'Google Search Snippet Preview'}</span>
              </span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono">
                Live Snippet
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#202124] border border-white/5 space-y-1.5 font-sans">
              <div className="flex items-center gap-2 text-xs text-gray-300 truncate">
                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">
                  H
                </div>
                <span className="text-[11px] text-gray-300 truncate">
                  {seoData.canonicalUrl || 'https://hardgroup.sa'}
                </span>
              </div>
              <h4 className="text-base font-medium text-[#8ab4f8] hover:underline cursor-pointer leading-snug">
                {seoData.metaTitleAr || 'مجموعة هارد | المقاولات العامة والتطوير الإنشائي والعقاري'}
              </h4>
              <p className="text-xs text-[#bdc1c6] leading-relaxed line-clamp-2">
                {seoData.metaDescriptionAr || 'مجموعة هارد للمقاولات العامة فئة أولى والتطوير الإنشائي والوساطة العقارية المرخصة (فال 1200028472).'}
              </p>
            </div>
          </div>

          {/* Social Card Live Preview */}
          <div className="p-5 rounded-2xl border bg-black/40 border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-black text-gray-300 flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'معاينة بطاقة المشاركة الاجتماعية (OpenGraph)' : 'Social Share Card Preview'}</span>
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                Twitter / WhatsApp
              </span>
            </div>

            <div className="rounded-2xl border border-white/15 overflow-hidden bg-[#16181c] shadow-xl">
              {seoData.ogImage && (
                <div className="relative aspect-video w-full overflow-hidden bg-black/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={seoData.ogImage}
                    alt="Social Card"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-3.5 space-y-1 bg-[#16181c]">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">
                  hardgroup.sa
                </span>
                <p className="text-xs font-bold text-white truncate">
                  {seoData.metaTitleAr}
                </p>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                  {seoData.metaDescriptionAr}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
