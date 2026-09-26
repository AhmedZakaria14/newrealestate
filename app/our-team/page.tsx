'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import TeamSection from '@/components/home-v3/TeamSection';
import MarqueeTicker from '@/components/MarqueeTicker';
import SkillsSection from '@/components/home-v3/SkillsSection';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function OurTeamPage() {
  const { language, t } = useLanguageTheme();

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title={t('nav.team')}
        subtitle={
          language === 'ar'
            ? 'نخبة من كبار المعماريين والمهندسين المدنيين ومديري المشاريع وراء كل صرح ناجح.'
            : 'Skilled architects, civil engineers, and master builders behind every award-winning project.'
        }
        breadcrumb={[{ label: t('nav.team') }]}
      />

      <TeamSection />

      <SkillsSection />

      <MarqueeTicker
        labelKey="ticker.precision"
        linkTextKey="nav.contact"
        linkHref="/contact-us"
        bgDark={true}
      />

      <Footer />
    </main>
  );
}
