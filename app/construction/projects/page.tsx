'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  HardHat,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  Building2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Search,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import ConsultationModal from '@/components/ConsultationModal';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { referenceProjects } from '@/data/reference-data';
import { getProjects, ProjectDoc } from '@/lib/firestore-service';

export default function ConstructionProjectsPage() {
  const { language, theme, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const [dbProjects, setDbProjects] = useState<ProjectDoc[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [consultationOpen, setConsultationOpen] = useState(false);

  useEffect(() => {
    getProjects().then((items) => {
      if (items.length > 0) setDbProjects(items);
    });
  }, []);

  const displayProjects = dbProjects.length > 0
    ? dbProjects.map((pr) => ({
        id: pr.id || '',
        title: isAr ? pr.titleAr || pr.title : pr.title,
        location: isAr ? pr.locationAr || pr.location : pr.location,
        progress: pr.progress,
        handoverDate: pr.completionDate,
        description: isAr ? pr.descriptionAr || pr.description : pr.description,
        image: pr.image,
        category: pr.category,
      }))
    : referenceProjects.map((pr) => ({
        id: pr.id,
        title: isAr ? pr.title.ar : pr.title.en,
        location: isAr ? pr.location.ar : pr.location.en,
        progress: 85,
        handoverDate: isAr ? pr.handoverDate.ar : pr.handoverDate.en,
        description: isAr ? pr.description.ar : pr.description.en,
        image: pr.image,
        category: 'commercial',
      }));

  const filtered = selectedCategory === 'all'
    ? displayProjects
    : displayProjects.filter((p) => p.category === selectedCategory);

  return (
    <main className={`min-h-screen ${isDark ? 'bg-[#030617] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar />

      {/* Header Banner */}
      <section className={`pt-32 pb-14 px-4 sm:px-6 lg:px-8 border-b ${isDark ? 'bg-[#080d2b]/60 border-white/10' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs opacity-75">
              <Link href="/" className="hover:text-blue-500">{isAr ? 'الرئيسية' : 'Home'}</Link>
              <span>/</span>
              <Link href="/construction" className="hover:text-blue-500">{isAr ? 'هارد للمقاولات' : 'HARD Construction'}</Link>
              <span>/</span>
              <span className="font-bold text-amber-500">{isAr ? 'المشاريع الإنشائية المعتمدة' : 'Structural Projects'}</span>
            </div>

            <BackButton fallbackUrl="/construction" labelAr="الرجوع لقسم المقاولات" labelEn="Back to Construction" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
                <HardHat className="w-3.5 h-3.5" />
                {isAr ? 'تصنيف مقاولات فئة أولى · كود البناء السعودي SBC' : 'Class-1 Structural General Contracting'}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                {isAr ? 'سجل المشاريع الإنشائية والتنفيذية' : 'Master Projects Portfolio'}
              </h1>
              <p className="text-sm sm:text-base opacity-75 max-w-2xl mt-2">
                {isAr
                  ? 'متابعة حية لنسب الإنجاز الميداني ومراحل التسليم لكبرى الأبراج الإدارية والمجمعات السكنية والمرافق التجارية.'
                  : 'Track progress milestones, scheduled handovers, and engineering metrics for certified structural landmarks.'}
              </p>
            </div>

            <button
              onClick={() => setConsultationOpen(true)}
              className="py-3 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-600/30 cursor-pointer self-start md:self-auto shrink-0"
            >
              {isAr ? 'طلب تنفيذ أو استشارة مشروع' : 'Request Construction Quote'}
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className={`rounded-3xl border overflow-hidden shadow-xl flex flex-col justify-between transition-all hover:-translate-y-1 ${
                isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <div className="relative h-60 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {proj.progress}% {isAr ? 'منجز' : 'Complete'}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-black">{proj.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs opacity-75">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{proj.location}</span>
                  </div>

                  <p className="text-xs opacity-75 line-clamp-3 leading-relaxed">{proj.description}</p>

                  {/* Progress Meter */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="opacity-75">{isAr ? 'نسبة الإنجاز الميداني:' : 'Field Progress:'}</span>
                      <span className="text-amber-500 font-mono">{proj.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-500/20 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-500/10 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 opacity-70">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{proj.handoverDate}</span>
                </span>
                <Link
                  href="/construction/sbc-standards"
                  className="text-amber-500 font-bold hover:underline"
                >
                  {isAr ? 'كود SBC ←' : 'SBC Code →'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultService={isAr ? 'المقاولات العامة والإنشاءات' : 'General Contracting'}
      />

      <Footer />
    </main>
  );
}
