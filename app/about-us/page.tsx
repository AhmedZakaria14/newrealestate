'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import AboutSection from '@/components/home-v3/AboutSection';
import SkillsSection from '@/components/home-v3/SkillsSection';
import TeamSection from '@/components/home-v3/TeamSection';
import TestimonialsSection from '@/components/home-v3/TestimonialsSection';
import MarqueeTicker from '@/components/MarqueeTicker';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function AboutUsPage() {
  const { language, theme, t } = useLanguageTheme();
  const isDark = theme === 'dark';

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title={language === 'ar' ? 'عن شركة هارد للعقارات' : 'About HARD Real Estate'}
        subtitle={
          language === 'ar'
            ? 'منظومة وساطة وتسويق عقاري ترتكز على الشفافية المطلقة، والبيانات الدقيقة، والتركيز على نجاح العميل.'
            : 'A premier real estate brokerage and marketing system built on absolute transparency, precise data, and client success.'
        }
        breadcrumb={[{ label: language === 'ar' ? 'من نحن' : 'About Us' }]}
      />

      {/* Main About Story */}
      <AboutSection />

      {/* Statistical Milestones */}
      <section
        className={`py-16 border-y transition-colors ${
          isDark
            ? 'bg-[#080b24] border-white/10 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div
              className={`p-6 rounded-3xl border ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200 shadow-sm'
              }`}
            >
              <span className="text-2xl sm:text-3xl font-black text-blue-500 block mb-2">
                1200028472
              </span>
              <span className="text-xs uppercase tracking-wider font-bold opacity-95">
                {language === 'ar' ? 'رخصة فال للوساطة والتسويق' : 'FAL Brokerage License'}
              </span>
            </div>
            <div
              className={`p-6 rounded-3xl border ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200 shadow-sm'
              }`}
            >
              <span className="text-2xl sm:text-3xl font-black text-blue-500 block mb-2">
                {language === 'ar' ? 'فئة أولى' : 'Class-1'}
              </span>
              <span className="text-xs uppercase tracking-wider font-bold opacity-95">
                {language === 'ar' ? 'تصنيف المقاولات المعتمد' : 'Contracting Classification'}
              </span>
            </div>
            <div
              className={`p-6 rounded-3xl border ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200 shadow-sm'
              }`}
            >
              <span className="text-2xl sm:text-3xl font-black text-blue-500 block mb-2">
                SBC 100%
              </span>
              <span className="text-xs uppercase tracking-wider font-bold opacity-95">
                {language === 'ar' ? 'الامتثال لكود البناء السعودي' : 'Saudi Building Code (SBC)'}
              </span>
            </div>
            <div
              className={`p-6 rounded-3xl border ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200 shadow-sm'
              }`}
            >
              <span className="text-2xl sm:text-3xl font-black text-blue-500 block mb-2">
                24/7 AMC
              </span>
              <span className="text-xs uppercase tracking-wider font-bold opacity-95">
                {language === 'ar' ? 'عقود صيانة وتشغيل التكييف' : 'Preventive HVAC Contracts'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Who We Are */}
      <SkillsSection />

      {/* Running Marquee */}
      <MarqueeTicker
        labelKey="ticker.precision"
        linkTextKey="nav.team"
        linkHref="/our-team"
      />

      {/* Team */}
      <TeamSection />

      {/* Testimonials */}
      <TestimonialsSection />

      <Footer />
    </main>
  );
}
