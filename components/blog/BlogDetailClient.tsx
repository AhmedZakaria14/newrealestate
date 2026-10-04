'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { BlogPost, blogPosts } from '@/data/skyvilla-data';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import SocialShare from '@/components/SocialShare';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function BlogDetailClient({ post }: { post: BlogPost }) {
  const { language, theme, t, direction } = useLanguageTheme();
  const isDark = theme === 'dark';

  const title = language === 'ar' ? post.title_ar : post.title;
  const category = language === 'ar' ? post.category_ar : post.category;
  const date = language === 'ar' ? post.date_ar : post.date;
  const author = language === 'ar' ? post.author_ar : post.author;
  const excerpt = language === 'ar' ? post.excerpt_ar : post.excerpt;
  const content = language === 'ar' ? post.content_ar : post.content;

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title={title}
        subtitle={`${language === 'ar' ? 'نُشر بتاريخ' : 'Published on'} ${date} ${language === 'ar' ? 'بواسطة' : 'by'} ${author}`}
        breadcrumb={[
          { label: t('nav.blog'), href: '/blog' },
          { label: title },
        ]}
      />

      <article
        className={`py-24 sm:py-32 overflow-hidden transition-colors ${
          isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Post Header Meta */}
          <div className="flex items-center justify-between border-b border-gray-500/15 pb-6 text-sm opacity-100">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                {date}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                {author}
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold">
                {category}
              </span>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs uppercase font-bold hover:text-blue-500 transition-colors"
            >
              {direction === 'rtl' ? (
                <>
                  <span>العودة للمدونة</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Blog</span>
                </>
              )}
            </Link>
          </div>

          {/* Featured Image */}
          <div
            className={`relative h-96 sm:h-[480px] w-full rounded-3xl overflow-hidden border shadow-2xl ${
              isDark ? 'border-white/10' : 'border-slate-300'
            }`}
          >
            <Image
              src={post.image}
              alt={title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Post Content */}
          <div className="space-y-6 text-base sm:text-lg opacity-90 leading-relaxed">
            <p
              className={`text-xl font-bold italic py-1 ${
                direction === 'rtl'
                  ? 'border-r-4 border-emerald-500 pr-6'
                  : 'border-l-4 border-emerald-500 pl-6'
              }`}
            >
              {excerpt}
            </p>

            {content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <h3 className="text-2xl font-bold pt-4">
              {language === 'ar' ? 'الصلابة الإنشائية والتوافق البيئي المستدام' : 'Structural Resilience and Environmental Harmony'}
            </h3>
            <p>
              {language === 'ar'
                ? 'تفرض الهندسة المعمارية الحديثة اختبار كل عنصر إنشائي لضمان الكفاءة الحرارية، ومقاومة الإجهادات والعوامل المناخية، واستدامة المبنى لعقود ممتدة.'
                : 'Contemporary engineering mandates that every design parameter be tested against lifetime wear, thermal oscillation, and seismic activity.'}
            </p>

            <blockquote
              className={`my-8 p-6 rounded-3xl border text-lg font-bold text-blue-500 ${
                isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              &ldquo;{language === 'ar' ? 'البناء الحديث ليس مجرد تشييد جدران؛ بل هو صناعة بيئات مستدامة تتدفق فيها الحياة والجمال والإبداع.' : 'Modern construction is not merely about erecting walls; it is about crafting enduring ecosystems where light, space, and human life flourish together.'}&rdquo;
            </blockquote>
          </div>

          {/* Social Media Sharing Component */}
          <div className="pt-2 pb-8">
            <SocialShare
              title={title}
              description={excerpt}
              contentType="article"
            />
          </div>

          {/* Related Articles */}
          <div className="pt-12 border-t border-gray-500/15">
            <h4 className="text-2xl font-bold mb-6">
              {language === 'ar' ? 'مقالات ذات صلة' : 'Recent Articles'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {blogPosts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 2)
                .map((p) => {
                  const pTitle = language === 'ar' ? p.title_ar : p.title;
                  const pCat = language === 'ar' ? p.category_ar : p.category;

                  return (
                    <Link
                      key={p.id}
                      href={`/blog/${p.slug}`}
                      className={`p-5 rounded-3xl border transition-all group flex items-center gap-4 ${
                        isDark
                          ? 'bg-[#080b24] border-white/10 hover:border-blue-500/40'
                          : 'bg-white border-slate-200 hover:border-emerald-500 shadow-sm'
                      }`}
                    >
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                        <Image
                          src={p.image}
                          alt={pTitle}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <span className="text-xs text-blue-500 font-bold">{pCat}</span>
                        <h5
                          className={`text-sm font-bold transition-colors line-clamp-2 mt-1 ${
                            isDark ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'
                          }`}
                        >
                          {pTitle}
                        </h5>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
