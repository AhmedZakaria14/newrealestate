'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '@/data/skyvilla-data';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function ProjectsSection() {
  const { language, theme, t, direction } = useLanguageTheme();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const isDark = theme === 'dark';

  const categoryFilters = [
    { key: 'All', label: t('projects.all') },
    { key: 'Residential', label: t('projects.residential') },
    { key: 'Commercial', label: t('projects.commercial') },
    { key: 'Industrial', label: t('projects.industrial') },
    { key: 'Infrastructure', label: t('projects.infrastructure') },
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors ${
        isDark ? 'bg-[#020410] text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-emerald-500 px-3.5 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              {t('projects.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {t('projects.titlePre')}{' '}
              <span className={isDark ? 'text-[#DCFF09]' : 'text-emerald-600'}>
                {t('projects.titleHighlight')}
              </span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categoryFilters.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  activeCategory === cat.key
                    ? isDark
                      ? 'bg-[#DCFF09] text-[#040618] border-[#DCFF09] shadow-md shadow-[#DCFF09]/20'
                      : 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                    : isDark
                    ? 'bg-[#080b24] text-gray-300 hover:text-white border-white/10'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const title = language === 'ar' ? project.title_ar : project.title;
            const excerpt = language === 'ar' ? project.excerpt_ar : project.excerpt;
            const category = language === 'ar' ? project.category_ar : project.category;
            const client = language === 'ar' ? project.client_ar : project.client;
            const timeline = language === 'ar' ? project.startDate_ar : project.startDate;

            return (
              <div
                key={project.id}
                className={`relative rounded-3xl overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 shadow-2xl flex flex-col justify-between border ${
                  isDark
                    ? 'bg-[#080b24] border-white/10 hover:border-[#DCFF09]/50'
                    : 'bg-slate-50 border-slate-200 hover:border-emerald-500'
                }`}
              >
                {/* Image with zoom effect */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className={`absolute inset-0 ${
                      isDark
                        ? 'bg-gradient-to-t from-[#080b24] via-transparent to-transparent'
                        : 'bg-gradient-to-t from-slate-900/60 via-transparent to-transparent'
                    }`}
                  />

                  {/* Category tag */}
                  <div
                    className={`absolute top-4 ${
                      direction === 'rtl' ? 'right-4' : 'left-4'
                    }`}
                  >
                    <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-bold text-[#DCFF09]">
                      {category}
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div>
                    <h3
                      className={`text-xl font-bold transition-colors mb-2 leading-snug ${
                        isDark ? 'group-hover:text-[#DCFF09]' : 'group-hover:text-emerald-600'
                      }`}
                    >
                      <Link href={`/projects/${project.slug}`}>{title}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm opacity-75 line-clamp-2 leading-relaxed">
                      {excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-500/15 flex items-center justify-between">
                    <div className="text-xs opacity-75 space-y-1">
                      <div>
                        <span className="opacity-60">{t('projects.client')}</span>{' '}
                        <span className="font-semibold">{client}</span>
                      </div>
                      <div>
                        <span className="opacity-60">{t('projects.timeline')}</span>{' '}
                        <span className="font-semibold">{timeline}</span>
                      </div>
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-white group-hover:bg-[#DCFF09] group-hover:text-[#040618] group-hover:border-[#DCFF09]'
                          : 'bg-slate-200/80 border-slate-300 text-slate-800 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600'
                      }`}
                      aria-label={`View ${title}`}
                    >
                      <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
