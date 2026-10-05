'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ServiceCardsList from '@/components/services/ServiceCardsList';
import WhyChooseUsSection from '@/components/home-v3/WhyChooseUsSection';
import PricingSection from '@/components/home-v3/PricingSection';
import MarqueeTicker from '@/components/MarqueeTicker';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function ServicesPage() {
  const { language, theme, t } = useLanguageTheme();
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        pageKey="services"
        title={isAr ? 'خدمات قطاعات مجموعة هارد' : 'HARD Group Services Portfolio'}
        subtitle={
          isAr
            ? 'حلول متكاملة تغطي الوساطة والتسويق العقاري المرخص (فال)، المقاولات العامة والتطوير الإنشائي (كود SBC)، وهندسة التكييف وتشغيل المرافق (عقود AMC).'
            : 'Comprehensive solutions spanning licensed real estate brokerage (FAL), Class-1 general contracting (SBC), and electromechanical HVAC operations (AMC).'
        }
        breadcrumb={[{ label: t('nav.services') }]}
      />

      {/* Flagship Detailed Services Section with Category Tabs */}
      <section className={`py-16 md:py-24 transition-colors ${isDark ? 'bg-[#040618]' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block">
              {isAr ? 'منظومة خدمات متكاملة 100%' : '100% Comprehensive Services'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {isAr ? 'دليل خدمات قطاعات مجموعة هارد' : 'Specialized Capabilities & Portfolios'}
            </h2>
            <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-2xl mx-auto">
              {isAr
                ? 'استكشف بطاقات وتفاصيل خدماتنا في الوساطة العقارية المعتمدة، المقاولات الإنشائية الكبرى، وعقود الصيانة الوقائية وتشغيل المرافق.'
                : 'Browse verified service profiles across real estate brokerage, structural general contracting, and mission-critical chiller operations.'}
            </p>
          </div>

          <ServiceCardsList filterDivision="all" showCategoryTabs={true} />
        </div>
      </section>

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
