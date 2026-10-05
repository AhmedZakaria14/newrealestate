'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Search,
  X,
  ArrowUpRight,
  Building2,
  HardHat,
  Fan,
  HelpCircle,
  Users,
  FileText,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { searchSite, SearchCategory, SearchResultItem } from '@/lib/search-index';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const { language, theme, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const [inputValue, setInputValue] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce logic: 80ms is imperceptible to users but avoids heavy evaluation on key press
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue);
    }, 80);
    return () => clearTimeout(timer);
  }, [inputValue]);

  // Instantly clear/reset search when text becomes empty
  useEffect(() => {
    if (!inputValue) {
      setDebouncedQuery('');
    }
  }, [inputValue]);

  // Auto-focus and clean up on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setInputValue('');
      setDebouncedQuery('');
      setSelectedCategory('all');
    }
  }, [isOpen]);

  // Global ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Perform search using the debounced query
  const results = useMemo(() => {
    return searchSite(debouncedQuery, selectedCategory, language);
  }, [debouncedQuery, selectedCategory, language]);

  // Popular search suggestions
  const popularSearches = [
    { labelAr: 'فلل وقصور للبيع', labelEn: 'Luxury Villas for Sale', q: isAr ? 'فلل' : 'villas' },
    { labelAr: 'مقاولات عامة فئة أولى', labelEn: 'Class-1 Contracting', q: isAr ? 'مقاولات' : 'contracting' },
    { labelAr: 'رخصة فال 1200028472', labelEn: 'VAL License', q: isAr ? 'فال' : 'val' },
    { labelAr: 'عقود صيانة تكييف AMC', labelEn: 'HVAC AMC Maintenance', q: isAr ? 'تكييف' : 'hvac' },
    { labelAr: 'حاسبة تكاليف المشاريع', labelEn: 'Cost Calculator', q: isAr ? 'حاسبة' : 'calculator' },
    { labelAr: 'المنطقة الشرقية والرياض', labelEn: 'Eastern Province & Riyadh', q: isAr ? 'الرياض' : 'riyadh' },
  ];

  const categories: { id: SearchCategory; labelAr: string; labelEn: string; icon: React.ElementType }[] = [
    { id: 'all', labelAr: 'كافة النتائج', labelEn: 'All Results', icon: Search },
    { id: 'sectors', labelAr: 'القطاعات', labelEn: 'Sectors', icon: Building2 },
    { id: 'services', labelAr: 'الخدمات', labelEn: 'Services', icon: HardHat },
    { id: 'projects', labelAr: 'المشاريع', labelEn: 'Projects', icon: Layers },
    { id: 'properties', labelAr: 'العقارات', labelEn: 'Properties', icon: Building2 },
    { id: 'team', labelAr: 'فريق العمل', labelEn: 'Team', icon: Users },
    { id: 'blog', labelAr: 'المقالات', labelEn: 'Blog', icon: FileText },
    { id: 'faqs', labelAr: 'الأسئلة', labelEn: 'FAQs', icon: HelpCircle },
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 p-3 sm:p-4 bg-black/85 backdrop-blur-md"
    >
      {/* Search Modal Card */}
      <motion.div
        initial={{ scale: 0.97, y: 8 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.97, y: 8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ${
          isDark ? 'bg-[#080d28] text-white border-white/20' : 'bg-white text-slate-900 border-slate-300'
        }`}
      >
        {/* Top Search Input Header */}
        <div className="p-4 sm:p-5 border-b border-gray-500/15 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-blue-600/15 text-blue-500 flex items-center justify-center shrink-0">
            <Search className="w-5 h-5" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              isAr
                ? 'ابحث عن أي شيء بالموقع: أقسام، خدمات، مشاريع، عقارات، مهندسين، أسئلة...'
                : 'Search anything across the site: sectors, services, projects, listings, team, FAQs...'
            }
            className="w-full bg-transparent border-none text-sm sm:text-base focus:outline-none placeholder:text-gray-500 font-medium"
          />

          {inputValue && (
            <button
              type="button"
              onClick={() => setInputValue('')}
              className="p-1.5 rounded-full hover:bg-gray-500/20 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title={isAr ? 'مسح البحث' : 'Clear search'}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-500/15 text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills Bar */}
        <div className="px-4 py-2.5 border-b border-gray-500/15 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 bg-black/10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md'
                    : isDark
                    ? 'bg-white/5 hover:bg-white/10 text-gray-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isAr ? cat.labelAr : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Popular Searches when query is empty */}
        {!inputValue && (
          <div className="px-4 sm:px-5 py-3 border-b border-gray-500/10 bg-black/5 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-blue-400 font-bold mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{isAr ? 'عمليات البحث الأكثر تداولاً:' : 'Popular Searches:'}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {popularSearches.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInputValue(item.q)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    isDark
                      ? 'bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {isAr ? item.labelAr : item.labelEn}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-2 flex-1">
          {results.length === 0 ? (
            <div className="p-12 text-center text-xs text-gray-400 space-y-3">
              <Search className="w-10 h-10 mx-auto opacity-30 text-blue-400" />
              <p className="text-sm font-bold text-gray-300">
                {isAr ? 'لم يتم العثور على نتائج تطابق بحثك.' : 'No results found matching your query.'}
              </p>
              <p className="text-xs text-gray-500">
                {isAr
                  ? 'جرب البحث بكلمات أخرى مثل "مقاولات"، "فلل"، "تكييف"، "الرياض"، أو "استشارات"'
                  : 'Try searching with different terms such as "villas", "contracting", "hvac", or "projects"'}
              </p>
            </div>
          ) : (
            results.map((item) => (
              <Link
                key={item.id + item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl transition-all border group ${
                  isDark
                    ? 'bg-white/[0.03] hover:bg-white/10 border-white/10 hover:border-blue-500/50 text-white'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-blue-500 text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  {/* Thumbnail if present */}
                  {item.image ? (
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/15 bg-black/40">
                      <Image
                        src={item.image}
                        alt={isAr ? item.titleAr : item.titleEn}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                  )}

                  <div className="space-y-1 min-w-0 flex-1 text-start">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold truncate group-hover:text-blue-400 transition-colors">
                        {isAr ? item.titleAr : item.titleEn}
                      </h4>
                      {item.badgeAr && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-bold border border-blue-500/30 whitespace-nowrap">
                          {isAr ? item.badgeAr : item.badgeEn}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-400 line-clamp-1">
                      {isAr ? item.subtitleAr : item.subtitleEn}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-blue-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  <span className="hidden sm:inline">{isAr ? 'عرض' : 'View'}</span>
                  <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Search Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-500/15 bg-black/20 shrink-0 flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-3">
            <span>{isAr ? 'اضغط ESC للإغلاق' : 'Press ESC to close'}</span>
            <span>•</span>
            <span>
              {results.length} {isAr ? 'نتيجة متاحة للبحث' : 'matching results'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-blue-400 hover:text-blue-300 font-bold cursor-pointer"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
