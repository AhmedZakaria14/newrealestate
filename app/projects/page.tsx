'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import MarqueeTicker from '@/components/MarqueeTicker';
import { projectsData, ProjectItem } from '@/data/skyvilla-data';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  Building2,
  Home,
  Factory,
  LayoutGrid,
  ArrowUpRight,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function ProjectsPage() {
  const { language, theme, t, direction } = useLanguageTheme();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  // Category filter tabs matching the image gallery structure
  const categories = [
    {
      key: 'All',
      label: isAr ? 'كافة المشاريع' : 'All Projects',
      icon: LayoutGrid,
    },
    {
      key: 'Commercial',
      label: isAr ? 'المشاريع التجارية' : 'Commercial',
      icon: Building2,
    },
    {
      key: 'Residential',
      label: isAr ? 'المشاريع السكنية' : 'Residential',
      icon: Home,
    },
    {
      key: 'Industrial',
      label: isAr ? 'المشاريع الصناعية' : 'Industrial',
      icon: Factory,
    },
  ];

  // Filter projects by selected category
  const filteredProjects: ProjectItem[] =
    activeCategory === 'All'
      ? projectsData
      : projectsData.filter((item) => item.category === activeCategory);

  // Helper count for each tab
  const getCount = (key: string) => {
    if (key === 'All') return projectsData.length;
    return projectsData.filter((item) => item.category === key).length;
  };

  return (
    <main className="min-h-screen">
      {/* Sticky Luxury Navbar */}
      <Navbar />

      {/* Page Header */}
      <PageHeader
        title={t('nav.projects')}
        subtitle={
          isAr
            ? 'سجل مشاريعنا المعمارية والهندسية المتخصصة في التطوير التجاري، والفلل السكنية الفارهة، والمنشآت الصناعية واللوجستية.'
            : 'Explore our portfolio across commercial business parks, luxury residential sky villas, and heavy industrial facilities.'
        }
        breadcrumb={[{ label: t('nav.projects') }]}
      />

      {/* Main Filterable Projects Directory */}
      <section
        className={`py-16 sm:py-24 transition-colors ${
          isDark ? 'bg-[#030617] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar - Matching Image Gallery Style */}
          <div className="flex flex-col items-center justify-center space-y-4 mb-14">
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 p-1.5 sm:p-2 rounded-full backdrop-blur-xl border border-blue-500/20 bg-blue-500/5">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                const isActive = activeCategory === cat.key;
                const count = getCount(cat.key);

                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`group relative flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? isDark
                          ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30'
                          : 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20'
                        : isDark
                        ? 'bg-[#080d2b]/80 text-gray-300 hover:text-white hover:bg-white/10 border-white/10'
                        : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200 shadow-sm'
                    }`}
                  >
                    <IconComponent
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isActive ? 'scale-110' : 'group-hover:scale-110 opacity-70'
                      }`}
                    />
                    <span>{cat.label}</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-black transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : isDark
                          ? 'bg-white/5 text-gray-400 group-hover:text-gray-200'
                          : 'bg-slate-100 text-slate-500 group-hover:text-slate-700'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Results Counter & Context */}
            <div className="flex items-center gap-2 text-xs sm:text-sm opacity-75 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>
                {isAr
                  ? `عرض ${filteredProjects.length} من إجمالي ${projectsData.length} مشروع معتمد`
                  : `Displaying ${filteredProjects.length} of ${projectsData.length} verified projects`}
              </span>
            </div>
          </div>

          {/* Animated Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const title = isAr ? project.title_ar : project.title;
                const description = isAr ? project.excerpt_ar : project.excerpt;
                const category = isAr ? project.category_ar : project.category;
                const location = isAr ? project.location_ar : project.location;
                const completion = isAr
                  ? project.completionDate_ar
                  : project.completionDate;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className={`group relative rounded-3xl overflow-hidden border shadow-xl flex flex-col justify-between transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1.5 ${
                      isDark
                        ? 'bg-[#080d2b] border-white/10 hover:border-blue-500/50 shadow-black/40'
                        : 'bg-white border-slate-200 hover:border-blue-500 shadow-slate-200/60'
                    }`}
                  >
                    {/* Card Media Header */}
                    <div>
                      <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                        <Image
                          src={project.image}
                          alt={title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div
                          className={`absolute inset-0 ${
                            isDark
                              ? 'bg-gradient-to-t from-[#080d2b] via-transparent to-transparent'
                              : 'bg-gradient-to-t from-slate-950/70 via-transparent to-transparent'
                          }`}
                        />

                        {/* Top Category Badge */}
                        <div
                          className={`absolute top-4 ${
                            direction === 'rtl' ? 'right-4' : 'left-4'
                          }`}
                        >
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-black text-blue-400 shadow-lg">
                            <Layers className="w-3.5 h-3.5 text-blue-400" />
                            {category}
                          </span>
                        </div>

                        {/* Bottom Location Indicator on Image */}
                        <div
                          className={`absolute bottom-3 ${
                            direction === 'rtl' ? 'right-4' : 'left-4'
                          } flex items-center gap-1.5 text-xs text-white/90 drop-shadow-md font-medium`}
                        >
                          <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span className="line-clamp-1">{location}</span>
                        </div>
                      </div>

                      {/* Card Content Details */}
                      <div className="p-6 sm:p-7 space-y-4">
                        <div className="flex items-center justify-between text-xs opacity-75 pb-1 border-b border-gray-500/10">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-blue-500" />
                            <span>{completion}</span>
                          </div>
                          <span className="font-bold text-blue-500">
                            {isAr ? 'كود SBC معتمد' : 'SBC Code Compliant'}
                          </span>
                        </div>

                        <h3
                          className={`text-xl font-extrabold tracking-tight transition-colors line-clamp-1 ${
                            isDark
                              ? 'text-white group-hover:text-blue-400'
                              : 'text-slate-900 group-hover:text-blue-600'
                          }`}
                        >
                          {title}
                        </h3>

                        <p className="text-xs sm:text-sm opacity-80 leading-relaxed line-clamp-2">
                          {description}
                        </p>

                        {/* Key Specs Pills */}
                        {project.stats && project.stats.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            {project.stats.slice(0, 2).map((s, idx) => (
                              <div
                                key={idx}
                                className={`p-2.5 rounded-xl border text-center ${
                                  isDark
                                    ? 'bg-white/5 border-white/5'
                                    : 'bg-slate-50 border-slate-200'
                                }`}
                              >
                                <span className="text-[10px] uppercase tracking-wider block opacity-70">
                                  {isAr ? s.label_ar : s.label}
                                </span>
                                <span className="text-xs sm:text-sm font-bold text-blue-500 line-clamp-1">
                                  {isAr ? s.value_ar : s.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer Link */}
                    <div className="px-6 pb-6 pt-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                          isDark
                            ? 'bg-white/10 hover:bg-blue-600 text-white border border-white/10 hover:border-blue-500'
                            : 'bg-slate-900 hover:bg-blue-600 text-white'
                        }`}
                      >
                        <span>
                          {isAr ? 'عرض تفاصيل المشروع' : 'View Project Details'}
                        </span>
                        <ArrowUpRight
                          className={`w-4 h-4 transition-transform ${
                            direction === 'rtl'
                              ? 'rotate-[-90deg] group-hover:-translate-x-1 group-hover:-translate-y-1'
                              : 'group-hover:translate-x-1 group-hover:-translate-y-1'
                          }`}
                        />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty State Fallback */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <p className="text-base sm:text-lg opacity-80">
                {isAr
                  ? 'لا توجد مشاريع مسجلة في هذا التصنيف حالياً.'
                  : 'No projects registered in this category at the moment.'}
              </p>
              <button
                onClick={() => setActiveCategory('All')}
                className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-sm font-bold shadow-md cursor-pointer hover:bg-blue-500 transition-colors"
              >
                {isAr ? 'عرض كافة المشاريع' : 'Show All Projects'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Strategic Accreditation Ticker */}
      <MarqueeTicker
        labelKey="ticker.solutions"
        linkTextKey="footer.getQuote"
        linkHref="/contact-us"
        bgDark={true}
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}
