'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { Calendar, Clock, ArrowUpRight, User, BookOpen } from 'lucide-react';
import { referenceBlogPosts } from '@/data/reference-data';

export default function BlogSection() {
  const { language, theme, direction } = useLanguageTheme();
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  return (
    <section
      id="market-intelligence"
      className={`py-20 sm:py-28 transition-colors ${
        isDark ? 'bg-[#030617] text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block text-xs uppercase tracking-widest font-black text-blue-500 px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
              {isAr ? 'أبحاث ودراسات عقارية' : 'Market Research & Insights'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {isAr
                ? 'المدونة والتقارير العقارية المتخصصة'
                : 'Real Estate & Construction Market Intelligence'}
            </h2>
            <p className="text-sm sm:text-base opacity-80 leading-relaxed">
              {isAr
                ? 'تقارير تحليلية ومؤشرات الأسعار والأنظمة والتطورات العقارية في السوق السعودي.'
                : 'Authoritative research, pricing indexes, regulatory updates, and strategic forecasts.'}
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-xs sm:text-sm font-bold transition-all border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white"
          >
            <span>{isAr ? 'تصفح كافة التقارير' : 'View All Market Reports'}</span>
            <ArrowUpRight
              className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`}
            />
          </Link>
        </div>

        {/* 3 Research Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {referenceBlogPosts.map((post) => {
            const title = isAr ? post.title.ar : post.title.en;
            const excerpt = isAr ? post.excerpt.ar : post.excerpt.en;
            const category = isAr ? post.category.ar : post.category.en;
            const readTime = isAr ? post.readTime.ar : post.readTime.en;
            const author = isAr ? post.author.ar : post.author.en;

            return (
              <article
                key={post.id}
                className={`group rounded-3xl overflow-hidden border shadow-xl flex flex-col justify-between transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1.5 ${
                  isDark
                    ? 'bg-[#080d2b] border-white/10 hover:border-blue-500/50 shadow-black/40'
                    : 'bg-white border-slate-200 hover:border-blue-500 shadow-slate-200/50'
                }`}
              >
                <div>
                  {/* Image header */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Category pill */}
                    <div
                      className={`absolute top-4 ${
                        direction === 'rtl' ? 'right-4' : 'left-4'
                      }`}
                    >
                      <span className="px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-black shadow-lg">
                        {category}
                      </span>
                    </div>

                    {/* Read Time */}
                    <div
                      className={`absolute bottom-3 ${
                        direction === 'rtl' ? 'right-4' : 'left-4'
                      } flex items-center gap-1.5 text-xs text-white drop-shadow font-medium`}
                    >
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{readTime}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div className="flex items-center justify-between text-xs opacity-70">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <span>{author}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-extrabold tracking-tight line-clamp-2 group-hover:text-blue-500 transition-colors leading-snug">
                      <Link href="/blog">{title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm opacity-80 line-clamp-2 leading-relaxed">
                      {excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer read link */}
                <div className="p-6 sm:p-7 pt-0">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    <span>{isAr ? 'قراءة التقرير كاملاً' : 'Read Full Analysis'}</span>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform ${
                        direction === 'rtl' ? 'rotate-[-90deg]' : ''
                      }`}
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
