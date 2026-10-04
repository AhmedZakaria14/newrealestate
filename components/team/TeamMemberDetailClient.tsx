'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { TeamMember, teamMembers } from '@/data/skyvilla-data';
import { Phone, Mail, Twitter, Linkedin, Instagram } from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function TeamMemberDetailClient({ member }: { member: TeamMember }) {
  const { language, theme, t } = useLanguageTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const isDark = theme === 'dark';

  const name = language === 'ar' ? member.name_ar : member.name;
  const role = language === 'ar' ? member.role_ar : member.role;
  const bio = language === 'ar' ? member.bio_ar : member.bio;
  const experience = language === 'ar' ? member.experience_ar : member.experience;

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title={name}
        subtitle={`${role} - HARD Real Estate`}
        breadcrumb={[
          { label: t('nav.team'), href: '/our-team' },
          { label: name },
        ]}
      />

      <section
        className={`py-24 sm:py-32 overflow-hidden transition-colors ${
          isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Photo */}
            <div className="lg:col-span-5">
              <div
                className={`relative h-[480px] w-full rounded-3xl overflow-hidden border shadow-2xl ${
                  isDark
                    ? 'bg-gradient-to-b from-[#13173d] to-[#080b24] border-white/10'
                    : 'bg-gradient-to-b from-slate-200 to-slate-100 border-slate-300'
                }`}
              >
                <Image
                  src={member.image}
                  alt={name}
                  fill
                  className="object-contain object-bottom"
                  referrerPolicy="no-referrer"
                />
                <div
                  className={`absolute inset-0 ${
                    isDark
                      ? 'bg-gradient-to-t from-[#080b24]/80 via-transparent to-transparent'
                      : 'bg-gradient-to-t from-white/40 via-transparent to-transparent'
                  }`}
                />
              </div>
            </div>

            {/* Biography & Metrics */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase font-bold text-blue-500 tracking-widest px-3.5 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                {role}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                {name}
              </h2>
              <p className="opacity-90 text-base sm:text-lg leading-relaxed">
                {bio}
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div
                  className={`p-4 rounded-2xl border text-center ${
                    isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl font-black text-blue-500 block">
                    {experience}
                  </span>
                  <span className="text-xs opacity-90 uppercase font-semibold">
                    {language === 'ar' ? 'سنوات الخبرة' : 'Experience'}
                  </span>
                </div>
                <div
                  className={`p-4 rounded-2xl border text-center ${
                    isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl font-black text-blue-500 block">
                    {member.projectsCompleted}+
                  </span>
                  <span className="text-xs opacity-90 uppercase font-semibold">
                    {language === 'ar' ? 'مشاريع مكتملة' : 'Deliveries'}
                  </span>
                </div>
                <div
                  className={`p-4 rounded-2xl border text-center col-span-2 sm:col-span-1 ${
                    isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl font-black text-blue-500 block">
                    100%
                  </span>
                  <span className="text-xs opacity-90 uppercase font-semibold">
                    {language === 'ar' ? 'سجل السلامة' : 'Safety Record'}
                  </span>
                </div>
              </div>

              {/* Contact direct */}
              <div
                className={`p-6 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 text-sm opacity-90">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span dir="ltr">{member.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm opacity-90">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>{member.email}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setModalOpen(true)}
                  className={`px-8 py-3.5 font-bold rounded-full transition-colors cursor-pointer text-sm shadow-md ${
                    isDark
                      ? 'bg-blue-600 text-white hover:bg-white hover:text-slate-900'
                      : 'bg-[#0f172a] text-white hover:bg-blue-600'
                  }`}
                >
                  {language === 'ar' ? `حجز استشارة مع ${name}` : `Schedule Consultation With ${name}`}
                </button>
                <div className="flex items-center gap-2">
                  <a
                    href="#"
                    className="p-3 rounded-full hover:bg-blue-500 hover:text-white transition-colors opacity-100 hover:opacity-100 border border-gray-500/20"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="p-3 rounded-full hover:bg-blue-500 hover:text-white transition-colors opacity-100 hover:opacity-100 border border-gray-500/20"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="p-3 rounded-full hover:bg-blue-500 hover:text-white transition-colors opacity-100 hover:opacity-100 border border-gray-500/20"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
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
        defaultService={`Consultation with ${name} (${role})`}
      />
    </main>
  );
}
