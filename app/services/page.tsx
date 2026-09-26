'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ServicesSection from '@/components/home-v3/ServicesSection';
import WhyChooseUsSection from '@/components/home-v3/WhyChooseUsSection';
import PricingSection from '@/components/home-v3/PricingSection';
import MarqueeTicker from '@/components/MarqueeTicker';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function ServicesPage() {
  const { language, t } = useLanguageTheme();

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title={t('nav.services')}
        subtitle={
          language === 'ar'
            ? 'حلول متكاملة للتطوير العقاري، التخطيط الهندسي، والتنفيذ المعماري على المفتاح.'
            : 'Trusted real estate development, engineering planning, and turnkey construction solutions.'
        }
        breadcrumb={[{ label: t('nav.services') }]}
      />

      <ServicesSection />

      <MarqueeTicker
        labelKey="ticker.solutions"
        linkTextKey="nav.contact"
        linkHref="/contact-us"
        bgDark={true}
      />

      <WhyChooseUsSection />

      <PricingSection />

      <Footer />
    </main>
  );
}
