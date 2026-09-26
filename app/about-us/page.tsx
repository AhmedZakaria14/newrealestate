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
        title={language === 'ar' ? 'من نحن' : 'About Us'}
        subtitle={
          language === 'ar'
            ? 'بناة ومطورون موثوقون يقدمون مشاريع معمارية حديثة تجمع بين النزاهة والتميز الإنشائي.'
            : 'Trusted builders creating modern spaces with integrity and architectural distinction.'
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
              <span className="text-4xl sm:text-5xl font-black text-emerald-500 block mb-2">
                15+
              </span>
              <span className="text-xs uppercase tracking-wider font-bold opacity-75">
                {language === 'ar' ? 'عاماً من التميز الإنشائي' : 'Years of Excellence'}
              </span>
            </div>
            <div
              className={`p-6 rounded-3xl border ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200 shadow-sm'
              }`}
            >
              <span className="text-4xl sm:text-5xl font-black text-emerald-500 block mb-2">
                250+
              </span>
              <span className="text-xs uppercase tracking-wider font-bold opacity-75">
                {language === 'ar' ? 'مشروعاً منجزاً بنجاح' : 'Projects Completed'}
              </span>
            </div>
            <div
              className={`p-6 rounded-3xl border ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200 shadow-sm'
              }`}
            >
              <span className="text-4xl sm:text-5xl font-black text-emerald-500 block mb-2">
                5,000+
              </span>
              <span className="text-xs uppercase tracking-wider font-bold opacity-75">
                {language === 'ar' ? 'عميلاً راضياً حول العالم' : 'Satisfied Clients'}
              </span>
            </div>
            <div
              className={`p-6 rounded-3xl border ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200 shadow-sm'
              }`}
            >
              <span className="text-4xl sm:text-5xl font-black text-emerald-500 block mb-2">
                48
              </span>
              <span className="text-xs uppercase tracking-wider font-bold opacity-75">
                {language === 'ar' ? 'جائزة تميز وتصميم' : 'Industry Awards'}
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
