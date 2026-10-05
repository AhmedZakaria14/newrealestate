'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import BlogSection from '@/components/home-v3/BlogSection';
import MarqueeTicker from '@/components/MarqueeTicker';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function BlogPage() {
  const { language, t } = useLanguageTheme();

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        pageKey="blog"
        title={t('nav.blog')}
        subtitle={
          language === 'ar'
            ? 'رؤى هندسية متخصصة، وأحدث اتجاهات التصميم المعماري وتقنيات البناء الذكي.'
            : 'Insights, engineering breakthroughs, and architectural design trends from industry experts.'
        }
        breadcrumb={[{ label: t('nav.blog') }]}
      />

      <BlogSection />

      <MarqueeTicker
        labelKey="ticker.solutions"
        linkTextKey="footer.newsletter"
        linkHref="/contact-us"
        bgDark={true}
      />

      <Footer />
    </main>
  );
}
