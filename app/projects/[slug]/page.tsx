'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { projectsData } from '@/data/skyvilla-data';
import ConsultationModal from '@/components/ConsultationModal';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, theme, t, direction } = useLanguageTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const isDark = theme === 'dark';

  const project =
    projectsData.find((p) => p.slug === slug) || projectsData[0];

  const title = language === 'ar' ? project.title_ar : project.title;
  const category = language === 'ar' ? project.category_ar : project.category;
  const client = language === 'ar' ? project.client_ar : project.client;
  const location = language === 'ar' ? project.location_ar : project.location;
  const startDate = language === 'ar' ? project.startDate_ar : project.startDate;
  const completionDate = language === 'ar' ? project.completionDate_ar : project.completionDate;
  const description = language === 'ar' ? project.description_ar : project.description;

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title={title}
        subtitle={`${category} - ${language === 'ar' ? 'تم تنفيذه بأعلى معايير الدقة والصلابة الهندسية.' : 'Delivered with precision and structural excellence.'}`}
        breadcrumb={[
          { label: t('nav.projects'), href: '/projects' },
          { label: title },
        ]}
      />

      <section
        className={`py-24 sm:py-32 overflow-hidden transition-colors ${
          isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Featured Image */}
              <div
                className={`relative h-96 sm:h-[480px] w-full rounded-3xl overflow-hidden border shadow-2xl ${
                  isDark ? 'border-white/10' : 'border-slate-300'
                }`}
              >
                <Image
                  src={project.image}
                  alt={title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div
                  className={`absolute top-6 ${
                    direction === 'rtl' ? 'right-6' : 'left-6'
                  }`}
                >
                  <span className="px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#DCFF09]/40 text-xs font-bold text-[#DCFF09]">
                    {category}
                  </span>
                </div>
              </div>

              {/* Story */}
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {language === 'ar' ? 'السرد المعماري والإنشائي للمشروع' : 'Architectural & Structural Narrative'}
                </h2>
                <p className="opacity-90 text-base sm:text-lg leading-relaxed">
                  {description}
                </p>
                <p className="opacity-75 text-sm leading-relaxed">
                  {language === 'ar'
                    ? `من الدراسات الجيوتقنية الأولية وصب الأساسات المسلحة العميقة وحتى تركيب الواجهات الزجاجية المزدوجة العازلة، يجسد مشروع ${title} فلسفتنا الهندسية في تحقيق الكفاءة الحرارية، ومقاومة الزلازل، والجمال البصري الاستثنائي.`
                    : `From initial geotechnical surveys and post-tensioned foundation pours to high-performance double-glazed curtain facades, ${title} exemplifies our engineering philosophy.`}
                </p>
              </div>

              {/* Specification Grid */}
              <div
                className={`p-8 rounded-3xl border space-y-6 ${
                  isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <h3 className="text-xl font-bold">
                  {language === 'ar' ? 'المؤشرات الهندسية وأرقام المشروع' : 'Engineering Metrics & Key Figures'}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {project.stats.map((s, idx) => {
                    const label = language === 'ar' ? s.label_ar : s.label;
                    const value = language === 'ar' ? s.value_ar : s.value;
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border text-center ${
                          isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <span className="text-xs uppercase tracking-wider block mb-1 opacity-70 font-medium">
                          {label}
                        </span>
                        <span className="text-base sm:text-lg font-black text-emerald-500">
                          {value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-4 space-y-8">
              <div
                className={`p-6 rounded-3xl border space-y-5 ${
                  isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <h4 className="text-sm font-bold tracking-wide uppercase border-emerald-500 border-l-2 rtl:border-l-0 rtl:border-r-2 pl-3 rtl:pl-0 rtl:pr-3">
                  {language === 'ar' ? 'بيانات المشروع' : 'Project Information'}
                </h4>
                <div className="space-y-4 text-sm divide-y divide-gray-500/10">
                  <div className="pt-2 flex items-center justify-between">
                    <span className="opacity-70">{language === 'ar' ? 'التصنيف:' : 'Category:'}</span>
                    <span className="font-bold">{category}</span>
                  </div>
                  <div className="pt-3 flex items-center justify-between">
                    <span className="opacity-70">{language === 'ar' ? 'العميل:' : 'Client:'}</span>
                    <span className="font-bold">{client}</span>
                  </div>
                  <div className="pt-3 flex items-center justify-between">
                    <span className="opacity-70">{language === 'ar' ? 'الموقع:' : 'Location:'}</span>
                    <span className="font-bold">{location}</span>
                  </div>
                  <div className="pt-3 flex items-center justify-between">
                    <span className="opacity-70">{language === 'ar' ? 'تاريخ البدء:' : 'Start Date:'}</span>
                    <span className="font-bold">{startDate}</span>
                  </div>
                  <div className="pt-3 flex items-center justify-between">
                    <span className="opacity-70">{language === 'ar' ? 'حالة الإنجاز:' : 'Completion:'}</span>
                    <span className="font-bold text-emerald-500">{completionDate}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setModalOpen(true)}
                    className={`w-full py-3.5 font-bold rounded-xl transition-colors cursor-pointer text-sm shadow-md ${
                      isDark
                        ? 'bg-[#DCFF09] text-[#040618] hover:bg-white'
                        : 'bg-[#0f172a] text-white hover:bg-emerald-600'
                    }`}
                  >
                    {language === 'ar' ? 'طلب استشارة لمشروع مماثل' : 'Inquire Similar Project'}
                  </button>
                </div>
              </div>

              {/* Other Projects */}
              <div
                className={`p-6 rounded-3xl border space-y-4 ${
                  isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <h4 className="text-sm font-bold tracking-wide uppercase border-emerald-500 border-l-2 rtl:border-l-0 rtl:border-r-2 pl-3 rtl:pl-0 rtl:pr-3">
                  {language === 'ar' ? 'مشاريع بارزة أخرى' : 'Other Featured Works'}
                </h4>
                <div className="space-y-3">
                  {projectsData
                    .filter((p) => p.slug !== project.slug)
                    .slice(0, 3)
                    .map((p) => {
                      const pTitle = language === 'ar' ? p.title_ar : p.title;
                      const pCat = language === 'ar' ? p.category_ar : p.category;

                      return (
                        <Link
                          key={p.id}
                          href={`/projects/${p.slug}`}
                          className={`flex items-center gap-3 p-2.5 rounded-2xl transition-colors group ${
                            isDark ? 'hover:bg-white/5' : 'hover:bg-slate-100'
                          }`}
                        >
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                            <Image
                              src={p.image}
                              alt={pTitle}
                              fill
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <h5
                              className={`text-sm font-bold transition-colors line-clamp-1 ${
                                isDark ? 'group-hover:text-[#DCFF09]' : 'group-hover:text-emerald-600'
                              }`}
                            >
                              {pTitle}
                            </h5>
                            <span className="text-xs opacity-70">{pCat}</span>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={`Inquiry for: ${title}`}
      />
    </main>
  );
}
