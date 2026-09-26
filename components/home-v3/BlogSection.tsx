'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowUpRight } from 'lucide-react';
import { blogPosts } from '@/data/skyvilla-data';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function BlogSection() {
  const { language, theme, t, direction } = useLanguageTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors ${
        isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-emerald-500 px-3.5 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              {t('blog.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {t('blog.titlePre')}{' '}
              <span className={isDark ? 'text-[#DCFF09]' : 'text-emerald-600'}>
                {t('blog.titleHighlight')}
              </span>
            </h2>
          </div>

          <Link
            href="/blog"
            className={`inline-flex items-center gap-2 text-sm font-bold transition-colors ${
              isDark ? 'text-[#DCFF09] hover:text-white' : 'text-emerald-600 hover:text-slate-900'
            }`}
          >
            <span>{t('blog.viewAll')}</span>
            <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
          </Link>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const title = language === 'ar' ? post.title_ar : post.title;
            const excerpt = language === 'ar' ? post.excerpt_ar : post.excerpt;
            const category = language === 'ar' ? post.category_ar : post.category;
            const date = language === 'ar' ? post.date_ar : post.date;
            const author = language === 'ar' ? post.author_ar : post.author;

            return (
              <article
                key={post.id}
                className={`relative rounded-3xl overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 shadow-2xl flex flex-col justify-between border ${
                  isDark
                    ? 'bg-[#080b24] border-white/10 hover:border-[#DCFF09]/50'
                    : 'bg-white border-slate-200 hover:border-emerald-500'
                }`}
              >
                {/* Image */}
                <div className="relative h-60 sm:h-64 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className={`absolute inset-0 ${
                      isDark
                        ? 'bg-gradient-to-t from-[#080b24] via-transparent to-transparent'
                        : 'bg-gradient-to-t from-slate-900/50 via-transparent to-transparent'
                    }`}
                  />

                  <div
                    className={`absolute top-4 ${
                      direction === 'rtl' ? 'right-4' : 'left-4'
                    }`}
                  >
                    <span className="px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-bold text-[#DCFF09]">
                      {category}
                    </span>
                  </div>
                </div>

                {/* Text Body */}
                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs opacity-70">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                        {date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-emerald-500" />
                        {author}
                      </span>
                    </div>

                    <h3
                      className={`text-xl font-bold transition-colors leading-snug ${
                        isDark ? 'group-hover:text-[#DCFF09]' : 'group-hover:text-emerald-600'
                      }`}
                    >
                      <Link href={`/blog/${post.slug}`}>{title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm opacity-75 line-clamp-2 leading-relaxed">
                      {excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-500/15">
                    <Link
                      href={`/blog/${post.slug}`}
                      className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                        isDark
                          ? 'text-white group-hover:text-[#DCFF09]'
                          : 'text-slate-900 group-hover:text-emerald-600'
                      }`}
                    >
                      <span>{t('blog.readMore')}</span>
                      <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
