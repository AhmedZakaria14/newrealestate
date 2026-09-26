'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ProjectsSection from '@/components/home-v3/ProjectsSection';
import MarqueeTicker from '@/components/MarqueeTicker';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function ProjectsPage() {
  const { language, t } = useLanguageTheme();

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title={t('nav.projects')}
        subtitle={
          language === 'ar'
            ? 'استكشف سجل مشاريعنا المعمارية من الفلل السكنية الفارهة، والأبراج التجارية الذكية، والصروح الصناعية واللوجستية.'
            : 'Explore our portfolio of luxury residential sky villas, iconic commercial complexes, and industrial landmarks.'
        }
        breadcrumb={[{ label: t('nav.projects') }]}
      />

      <ProjectsSection />

      <MarqueeTicker
        labelKey="ticker.solutions"
        linkTextKey="footer.getQuote"
        linkHref="/contact-us"
        bgDark={true}
      />

      <Footer />
    </main>
  );
}
