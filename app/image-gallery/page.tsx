'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { galleryImages } from '@/data/skyvilla-data';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { useSiteContent } from '@/lib/site-content-context';
import { motion, AnimatePresence } from 'motion/react';

export default function ImageGalleryPage() {
  const { language, theme, t, direction } = useLanguageTheme();
  const { settings } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isDark = theme === 'dark';

  const allItems =
    settings.galleryItems && settings.galleryItems.length > 0
      ? settings.galleryItems
      : galleryImages;

  const categories = [
    { key: 'All', label: t('projects.all') },
    { key: 'Residential', label: t('projects.residential') },
    { key: 'Commercial', label: t('projects.commercial') },
    { key: 'Industrial', label: t('projects.industrial') },
  ];

  const filtered =
    activeCategory === 'All'
      ? allItems
      : allItems.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        pageKey="gallery"
        title={t('nav.imageGallery')}
        subtitle={
          language === 'ar'
            ? 'معرض بصري تفاعلي يبرز الفلل السكنية الفارهة، والواجهات الزجاجية المعاصرة، وأدق التفاصيل الإنشائية.'
            : 'Visual showcase of completed sky villas, commercial atriums, and precision engineering details.'
        }
        breadcrumb={[{ label: t('nav.imageGallery') }]}
      />

      <section
        className={`py-24 sm:py-32 overflow-hidden transition-colors ${
          isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  activeCategory === cat.key
                    ? isDark
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                      : 'bg-emerald-600 text-white border-blue-600 shadow-md'
                    : isDark
                    ? 'bg-[#080b24] text-gray-300 hover:text-white border-white/10'
                    : 'bg-white text-slate-700 hover:text-slate-900 border-slate-200 shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid of Gallery Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item, idx) => {
              const title = language === 'ar' ? item.title_ar : item.title;
              const cat = language === 'ar' ? (('category_ar' in item && item.category_ar) || item.category) : item.category;

              return (
                <div
                  key={item.id}
                  onClick={() => openLightbox(idx)}
                  className={`group relative h-80 rounded-3xl overflow-hidden border shadow-2xl cursor-pointer ${
                    isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-100 group-hover:opacity-95 transition-opacity" />

                  {/* Hover overlay with zoom button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-6 h-6" />
                    </div>
                  </div>

                  <div
                    className={`absolute bottom-6 ${
                      direction === 'rtl' ? 'right-6 left-6 text-right' : 'left-6 right-6 text-left'
                    }`}
                  >
                    <span className="text-xs uppercase font-bold text-blue-400 tracking-wider block mb-1">
                      {cat}
                    </span>
                    <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                      {title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Silky Lightbox Modal with Mobile Native Gestures */}
      <AnimatePresence mode="wait">
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden touch-none">
            {/* Silky Backdrop */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              onClick={closeLightbox}
              className="fixed inset-0 bg-black/90 z-0"
            />

            <button
              onClick={closeLightbox}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 text-gray-300 hover:text-white p-2.5 sm:p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90 z-20 cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={direction === 'rtl' ? nextImage : prevImage}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white p-2.5 sm:p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90 z-20 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={direction === 'rtl' ? prevImage : nextImage}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white p-2.5 sm:p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90 z-20 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{
                type: 'spring',
                damping: 32,
                stiffness: 380,
                mass: 0.85,
              }}
              className="relative z-10 max-w-5xl max-h-[85vh] w-full h-[70vh] flex flex-col items-center justify-center pointer-events-auto"
            >
              <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/50">
                <Image
                  src={filtered[lightboxIndex].image}
                  alt={language === 'ar' ? filtered[lightboxIndex].title_ar : filtered[lightboxIndex].title}
                  fill
                  unoptimized
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center space-y-1 px-4"
              >
                <h4 className="text-base sm:text-xl font-bold text-white">
                  {language === 'ar' ? filtered[lightboxIndex].title_ar : filtered[lightboxIndex].title}
                </h4>
                <span className="text-xs uppercase text-blue-400 font-semibold tracking-wider">
                  {language === 'ar' ? (('category_ar' in filtered[lightboxIndex] && filtered[lightboxIndex].category_ar) || filtered[lightboxIndex].category) : filtered[lightboxIndex].category} • {language === 'ar' ? 'صورة' : 'Image'} {lightboxIndex + 1} {language === 'ar' ? 'من' : 'of'} {filtered.length}
                </span>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
