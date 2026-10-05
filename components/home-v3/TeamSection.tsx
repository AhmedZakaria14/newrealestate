'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { teamMembers } from '@/data/skyvilla-data';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { useSiteContent } from '@/lib/site-content-context';

export default function TeamSection() {
  const { language, theme, t, direction } = useLanguageTheme();
  const { settings } = useSiteContent();
  const isDark = theme === 'dark';

  const members =
    settings.teamMembers && settings.teamMembers.length > 0
      ? settings.teamMembers
      : teamMembers;

  return (
    <section
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors ${
        isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-blue-500 px-3.5 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
              {t('team.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {t('team.titlePre')}{' '}
              <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>
                {t('team.titleHighlight')}
              </span>
            </h2>
          </div>

          <Link
            href="/our-team"
            className={`inline-flex items-center gap-2 text-sm font-bold transition-colors ${
              isDark ? 'text-blue-400 hover:text-white' : 'text-blue-600 hover:text-slate-900'
            }`}
          >
            <span>{t('team.viewAll')}</span>
            <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
          </Link>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.slice(0, 3).map((member) => {
            const name = language === 'ar' ? member.name_ar : member.name;
            const role = language === 'ar' ? member.role_ar : member.role;

            return (
              <div
                key={member.id}
                className={`relative rounded-3xl overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 shadow-xl border ${
                  isDark
                    ? 'bg-[#080b24] border-white/10 hover:border-blue-500/50'
                    : 'bg-white border-slate-200 hover:border-blue-500'
                }`}
              >
                {/* Member Photo */}
                <div
                  className={`relative h-80 sm:h-96 w-full overflow-hidden ${
                    isDark
                      ? 'bg-gradient-to-b from-[#13173d] to-[#080b24]'
                      : 'bg-gradient-to-b from-slate-200 to-slate-100'
                  }`}
                >
                  <Image
                    src={member.image}
                    alt={name}
                    fill
                    unoptimized
                    className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className={`absolute inset-0 ${
                      isDark
                        ? 'bg-gradient-to-t from-[#080b24] via-transparent to-transparent'
                        : 'bg-gradient-to-t from-white/40 via-transparent to-transparent'
                    }`}
                  />

                  {/* Social links overlay */}
                  <div
                    className={`absolute top-4 ${
                      direction === 'rtl' ? 'left-4' : 'right-4'
                    } flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  >
                    <a
                      href="#"
                      className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-blue-500 transition-colors"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="#"
                      className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-blue-500 transition-colors"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="#"
                      className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-blue-500 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="#"
                      className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-blue-500 transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Info Details */}
                <div className="p-6 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className={`text-xl font-bold transition-colors ${
                          isDark ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'
                        }`}
                      >
                        <Link href={`/our-team/${('slug' in member && (member as any).slug) || member.id || 'leader'}`}>{name}</Link>
                      </h3>
                      <span className="text-xs uppercase tracking-wider font-semibold opacity-90 mt-1 block">
                        {role}
                      </span>
                    </div>

                    <Link
                      href={`/our-team/${('slug' in member && (member as any).slug) || member.id || 'leader'}`}
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-white group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500'
                          : 'bg-slate-100 border-slate-200 text-slate-800 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600'
                      }`}
                      aria-label={`View ${name} profile`}
                    >
                      <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
