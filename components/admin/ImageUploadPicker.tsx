'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Upload,
  Image as ImageIcon,
  Check,
  X,
  Search,
  ExternalLink,
  Loader2,
  FolderOpen,
} from 'lucide-react';
import { addMediaItem, MediaItemDoc } from '@/lib/firestore-service';

export const PRESET_HARDGP_IMAGES = [
  // High-Resolution Portfolio Landmarks
  { url: '/images/hardgp/por1-big.jpg', label: 'Commercial Complex / برج تجاري (POR 1)', category: 'portfolio' },
  { url: '/images/hardgp/por2-big.jpg', label: 'Multi-Storey Structural / مبنى خرساني (POR 2)', category: 'portfolio' },
  { url: '/images/hardgp/por3-big.jpg', label: 'Industrial Steel Frame / منشأة صناعية (POR 3)', category: 'portfolio' },
  { url: '/images/hardgp/por4-big.jpg', label: 'Luxury Villa / فيلا سكنية فاخرة (POR 4)', category: 'portfolio' },
  { url: '/images/hardgp/por5-big.jpg', label: 'Foundations & Casting / صب الأساسات (POR 5)', category: 'portfolio' },
  { url: '/images/hardgp/por6-big.jpg', label: 'Corporate HQ Office / مقر ومكاتب إدارية (POR 6)', category: 'portfolio' },
  { url: '/images/hardgp/por7-big.jpg', label: 'Infrastructure Earthworks / بنية تحتية (POR 7)', category: 'portfolio' },
  { url: '/images/hardgp/por8-big.jpg', label: 'Plant Construction / توسعة مصانع (POR 8)', category: 'portfolio' },
  { url: '/images/hardgp/por9-big.jpg', label: 'Residential Compound / مجمع سكني (POR 9)', category: 'portfolio' },
  { url: '/images/hardgp/por10-big.jpg', label: 'Majlis Reception Hall / مجلس وصالة فاخرة (POR 10)', category: 'interior' },
  { url: '/images/hardgp/por11-big.jpg', label: 'Modern Living Space / صالة معيشة (POR 11)', category: 'interior' },
  { url: '/images/hardgp/por12-big.jpg', label: 'Executive Boardroom / مكتب تنفيذي (POR 12)', category: 'interior' },
  { url: '/images/hardgp/por13-big.jpg', label: 'Contemporary Lounge / صالون معاصر (POR 13)', category: 'interior' },
  { url: '/images/hardgp/por14-big.jpg', label: 'Commercial Showroom / معرض تجاري (POR 14)', category: 'interior' },
  { url: '/images/hardgp/por15-big.jpg', label: 'Villa High Ceilings / بهو وأسقف معمارية (POR 15)', category: 'interior' },
  { url: '/images/hardgp/por16-big.jpg', label: 'Formal Dining Hall / صالة طعام راقية (POR 16)', category: 'interior' },
  { url: '/images/hardgp/por17-big.jpg', label: 'Master Bedroom Suite / جناح نوم رئيسي (POR 17)', category: 'interior' },
  { url: '/images/hardgp/por18-big.jpg', label: 'Modern Kitchen Fit-out / مطبخ عصري (POR 18)', category: 'interior' },
  { url: '/images/hardgp/por19-big.jpg', label: 'Luxury Sanitary Architecture / تجهيزات صحية (POR 19)', category: 'plumbing' },
  { url: '/images/hardgp/por20-big.jpg', label: 'Corporate Conference / قاعة مؤتمرات (POR 20)', category: 'interior' },
  { url: '/images/hardgp/por21-big.jpg', label: 'Marble Staircase / درج رخامي ودرابزين (POR 21)', category: 'interior' },
  { url: '/images/hardgp/por22-big.jpg', label: 'Specialized Welding / حدادة ولحام صناعي (POR 22)', category: 'engineering' },
  { url: '/images/hardgp/por23-big.jpg', label: 'Piping & Water Networks / شبكات أنابيب مياه (POR 23)', category: 'plumbing' },
  { url: '/images/hardgp/por24-big.jpg', label: 'Central HVAC Chillers / تكييف مركزي (POR 24)', category: 'hvac' },

  // Authentic 12 Slides from hardgp.com/index.html
  { url: '/images/hardgp/slide-1.jpg', label: 'Slide 1: Excavation & Soil Prep / حفر وتجهيز التربة', category: 'slides' },
  { url: '/images/hardgp/slide-2.jpg', label: 'Slide 2: Foundations & Pillars / بناء وتشييد الأساسات', category: 'slides' },
  { url: '/images/hardgp/slide-3.jpg', label: 'Slide 3: Roof Concrete Pouring / صب أسقف الخرسانة', category: 'slides' },
  { url: '/images/hardgp/slide-4.jpg', label: 'Slide 4: Structure Completed / اكتمال البناء والتشطيب', category: 'slides' },
  { url: '/images/hardgp/slide-5.jpg', label: 'Slide 5: Real Estate Contract / توقيع عقد التطوير', category: 'slides' },
  { url: '/images/hardgp/slide-6.jpg', label: 'Slide 6: Site Land Inspection / جولة معاينة الأرض', category: 'slides' },
  { url: '/images/hardgp/slide-7.jpg', label: 'Slide 7: Construction & Finishing / تشييد وتطبيق المواد', category: 'slides' },
  { url: '/images/hardgp/slide-8.jpg', label: 'Slide 8: Key Handover / تسليم المفتاح النهائي', category: 'slides' },
  { url: '/images/hardgp/slide-9.jpg', label: 'Slide 9: Electrical Installations / شبكات وأعمال الكهرباء', category: 'slides' },
  { url: '/images/hardgp/slide-10.jpg', label: 'Slide 10: Plumbing Pipeline / شبكات وأنابيب السباكة', category: 'slides' },
  { url: '/images/hardgp/slide-11.jpg', label: 'Slide 11: Oil & Gas Welding / لحام منشآت النفط والغاز', category: 'slides' },
  { url: '/images/hardgp/slide-12.jpg', label: 'Slide 12: Central A/C Chillers / تركيب وصيانة التكييف', category: 'slides' },

  // Divisions & Services Images
  { url: '/images/hardgp/page3-img1.jpg', label: 'Construction Division / قسم الإنشاءات', category: 'divisions' },
  { url: '/images/hardgp/page3-img2.jpg', label: 'Real Estate Dev / قسم التطوير العقاري', category: 'divisions' },
  { url: '/images/hardgp/page3-img3.jpg', label: 'Maintenance Operations / قسم التشغيل والصيانة', category: 'divisions' },
  { url: '/images/hardgp/page3-img7.jpg', label: 'Safety & Quality Assurance / الجودة والسلامة', category: 'divisions' },
  { url: '/images/hardgp/page3-img9.jpg', label: 'Industrial Fabrication / التصنيع والتركيب', category: 'divisions' },
  { url: '/images/hardgp/page3-img10.jpg', label: 'Marketing & Sales / التسويق والمبيعات', category: 'divisions' },
];

interface ImageUploadPickerProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  labelAr?: string;
  isAr?: boolean;
  uploadedMedia?: MediaItemDoc[];
  helperText?: string;
}

export default function ImageUploadPicker({
  value,
  onChange,
  label = 'Image',
  labelAr = 'الصورة',
  isAr = true,
  uploadedMedia = [],
  helperText,
}: ImageUploadPickerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [uploading, setUploading] = useState(false);

  // Combine presets with uploaded media
  const allImages = [
    ...uploadedMedia.map((m) => ({
      url: m.url,
      label: m.name,
      category: 'uploaded',
    })),
    ...PRESET_HARDGP_IMAGES,
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      const readPromise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const dataUrl = await readPromise;

      // Add to Firestore media library
      await addMediaItem({
        name: file.name,
        url: dataUrl,
        size: file.size,
        type: file.type || 'image/jpeg',
        folder: 'images',
        uploader: 'Control Panel',
      });

      // Update current field
      onChange(dataUrl);
      setModalOpen(false);
    } catch (err) {
      console.error('Upload failed:', err);
      alert(isAr ? 'حدث خطأ أثناء رفع الصورة' : 'Failed to upload image');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const filtered = allImages.filter((img) => {
    const matchesSearch = img.label.toLowerCase().includes(search.toLowerCase()) || img.url.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || img.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-gray-300">
          {isAr ? labelAr : label}
        </label>
        {helperText && (
          <span className="text-[10px] text-gray-400 font-light">{helperText}</span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Preview Thumbnail */}
        <div className="relative w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden border border-white/20 bg-black/60 shrink-0 group">
          {value ? (
            <Image
              src={value}
              alt="Preview"
              fill
              unoptimized
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
              <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
              <span className="text-[9px]">{isAr ? 'لا توجد صورة' : 'No Image'}</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex-1 w-full space-y-2">
          {/* Direct URL input */}
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={isAr ? 'مسار أو رابط الصورة (مثل /images/hardgp/por1-big.jpg)...' : 'Image URL or path...'}
              className="w-full py-2 px-3 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Open Library Button */}
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-white border border-blue-500/30 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>{isAr ? 'اختيار من مكتبة الصور' : 'Pick from Library'}</span>
            </button>

            {/* Direct Upload Button */}
            <label className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white border border-white/15 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer">
              {uploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
              ) : (
                <Upload className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>{uploading ? (isAr ? 'جارِ الرفع...' : 'Uploading...') : (isAr ? 'رفع صورة جديدة' : 'Upload Image')}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>

            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-2 py-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs font-bold transition-colors cursor-pointer"
                title={isAr ? 'مسح' : 'Clear'}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal: Media & Preset Picker */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#0f121d] border border-white/20 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {isAr ? 'مكتبة الصور الكاملة لمجموعة هارد' : 'HARD Group Full-Quality Media Library'}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {isAr ? 'اختر أي صورة بجودة كاملة أو ارفع صورة مخصصة ليتم حفظها فوراً' : 'Select any high-resolution image or upload custom photography'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 border-b border-white/10 bg-black/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute top-2.5 right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={isAr ? 'بحث بالاسم أو القسم...' : 'Search by name or category...'}
                  className="w-full py-2 px-9 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { key: 'all', labelAr: 'الكل', labelEn: 'All' },
                  { key: 'portfolio', labelAr: 'مشاريع حقيقية (24)', labelEn: 'Portfolio' },
                  { key: 'slides', labelAr: 'الشرائح (12)', labelEn: 'Slides' },
                  { key: 'interior', labelAr: 'ديكور وتشطيب', labelEn: 'Interior' },
                  { key: 'divisions', labelAr: 'الأقسام', labelEn: 'Divisions' },
                  { key: 'uploaded', labelAr: 'الصور المرفوعة', labelEn: 'Uploaded' },
                ].map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setActiveCategory(c.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      activeCategory === c.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    {isAr ? c.labelAr : c.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Images */}
            <div className="flex-1 overflow-y-auto p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filtered.map((item, idx) => {
                const isSelected = value === item.url;
                return (
                  <div
                    key={`${item.url}-${idx}`}
                    onClick={() => {
                      onChange(item.url);
                      setModalOpen(false);
                    }}
                    className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all hover:scale-[1.02] shadow-md flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-950/30'
                        : 'border-white/10 hover:border-white/30 bg-black/40'
                    }`}
                  >
                    <div className="relative h-32 w-full bg-black/60 overflow-hidden">
                      <Image
                        src={item.url}
                        alt={item.label}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="p-2.5">
                      <p className="text-[11px] font-semibold text-gray-200 truncate">
                        {item.label}
                      </p>
                      <span className="text-[9px] text-gray-400 font-mono truncate block mt-0.5 opacity-70">
                        {item.url}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex items-center justify-between text-xs text-gray-400">
              <span>{filtered.length} {isAr ? 'صورة متاحة للاختيار المباشر' : 'images available'}</span>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
