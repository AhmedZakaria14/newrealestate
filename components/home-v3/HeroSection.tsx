'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ArrowUpRight, Play, Plus, ShieldCheck } from 'lucide-react';
import { clientAvatars, partnerLogos } from '@/data/skyvilla-data';
import ConsultationModal from '@/components/ConsultationModal';
import VideoModal from '@/components/VideoModal';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function HeroSection() {
  const { theme, t, direction } = useLanguageTheme();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  const isDark = theme === 'dark';

  return (
    <section className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex flex-col justify-between">
      {/* Hero background image with gradient layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/hero-bg-image-metal.jpg"
          alt="Skyvilla Hero Background"
          fill
          priority
          className={`object-cover object-center transition-all ${
            isDark
              ? 'filter brightness-[0.38] contrast-[1.1]'
              : 'filter brightness-[0.45] contrast-[1.05]'
          }`}
          referrerPolicy="no-referrer"
        />
        <div
          className={`absolute inset-0 transition-colors ${
            isDark
              ? 'bg-gradient-to-b from-[#040618]/70 via-[#040618]/50 to-[#040618]'
              : 'bg-gradient-to-b from-slate-950/75 via-slate-900/60 to-slate-950/90'
          }`}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Top Badge: Trusted By Hundreds Of Satisfied Clients */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {clientAvatars.slice(0, 3).map((avatar, idx) => (
                  <div key={idx} className="relative w-6 h-6 rounded-full overflow-hidden border border-[#DCFF09]">
                    <Image
                      src={avatar}
                      alt="Client"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#DCFF09] text-[#DCFF09]" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-100">
                {t('hero.badge')}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.12]">
              {t('hero.titlePre')}{' '}
              <span className="text-[#DCFF09] underline decoration-[#DCFF09]/60 underline-offset-8">
                {t('hero.titleHighlight')}
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-gray-200 text-base sm:text-lg max-w-2xl leading-relaxed">
              {t('hero.description')}
            </p>

            {/* CTA row: Button + Review Rating */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <button
                onClick={() => setConsultationOpen(true)}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#DCFF09] text-[#040618] font-black text-base hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg shadow-[#DCFF09]/25 cursor-pointer group"
              >
                <span>{t('hero.cta')}</span>
                <ArrowUpRight
                  className={`w-5 h-5 transition-transform ${
                    direction === 'rtl'
                      ? 'rotate-[-90deg] group-hover:-translate-x-1 group-hover:-translate-y-1'
                      : 'group-hover:translate-x-1 group-hover:-translate-y-1'
                  }`}
                />
              </button>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15">
                <div className="text-left rtl:text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-white">{t('hero.reviewRating')}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#DCFF09] text-[#DCFF09]" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-300 font-medium block">
                    {t('hero.reviewText')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual & Metal Cards */}
          <div className="lg:col-span-5 relative">
            {/* Circular Rotating Video Badge */}
            <div
              className={`hidden sm:block absolute -top-8 ${
                direction === 'rtl' ? '-right-8 xl:-right-12' : '-left-8 xl:-left-12'
              } z-20`}
            >
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Rotating SVG text */}
                <svg
                  className="w-full h-full animate-spin-slow pointer-events-none"
                  viewBox="0 0 100 100"
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[9.5px] uppercase tracking-[0.25em] fill-gray-100 font-bold">
                    <textPath xlinkHref="#circlePath">
                      {t('hero.watchVideo')}
                    </textPath>
                  </text>
                </svg>

                {/* Central Play Button */}
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#DCFF09] text-[#040618] flex items-center justify-center hover:bg-white transition-all transform hover:scale-110 shadow-lg shadow-[#DCFF09]/30 cursor-pointer"
                  aria-label="Play video showcase"
                >
                  <Play className={`w-5 h-5 fill-current ${direction === 'rtl' ? 'mr-0.5' : 'ml-0.5'}`} />
                </button>
              </div>
            </div>

            {/* Stacked Cards Container */}
            <div className="space-y-4">
              {/* Card 1: Featured Image & Trusted Builders */}
              <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-br from-[#0c0f2f]/90 to-[#040618]/90 p-6 shadow-2xl backdrop-blur-xl group hover:border-[#DCFF09]/50 transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative w-full sm:w-40 h-44 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                    <Image
                      src="https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/hero-info-item-image-1-metal.jpg"
                      alt="Luxury Skyvilla Construction"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-3">
                    {/* Avatars row */}
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2 rtl:space-x-reverse">
                        {clientAvatars.slice(0, 3).map((avatar, idx) => (
                          <div
                            key={idx}
                            className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#040618]"
                          >
                            <Image
                              src={avatar}
                              alt="Avatar"
                              fill
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#DCFF09]/20 border border-[#DCFF09]/40 flex items-center justify-center text-[#DCFF09]">
                        <Plus className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#DCFF09] transition-colors">
                      {t('hero.trustedBuilders')}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {t('hero.trustedBuildersDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Your Trusted Partners with counter graphic */}
              <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-br from-[#0c0f2f]/90 to-[#040618]/90 p-6 shadow-2xl backdrop-blur-xl group hover:border-[#DCFF09]/50 transition-all duration-300">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-xs">
                    <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold text-[#DCFF09]">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{t('hero.certifiedIntegrity')}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#DCFF09] transition-colors">
                      {t('hero.trustedPartners')}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300">
                      {t('hero.trustedPartnersDesc')}
                    </p>
                  </div>

                  <div className="relative w-28 h-24 shrink-0">
                    <Image
                      src="https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/hero-info-counter-image-metal.png"
                      alt="Construction Experience Counter"
                      fill
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Logos Marquee Banner */}
        <div className="mt-16 pt-8 border-t border-white/15">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <span className="text-xs uppercase tracking-widest text-gray-300 font-bold">
              {t('hero.partnersBanner')}
            </span>
          </div>
          <div className="overflow-hidden py-3">
            <div className="animate-marquee flex items-center gap-12 sm:gap-16">
              {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, idx) => (
                <div key={idx} className="shrink-0 h-9 w-36 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all">
                  <img
                    src={logo}
                    alt="Partner Logo"
                    className="h-full w-auto object-contain brightness-0 invert"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        youtubeId="Y-x0efG1seA"
        title="Skyvilla Construction Tour"
      />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </section>
  );
}
