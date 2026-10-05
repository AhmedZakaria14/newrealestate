'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, ShieldCheck, HardHat, Clock } from 'lucide-react';
import VideoModal from '@/components/VideoModal';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function WhyChooseUsSection() {
  const { theme, t, direction } = useLanguageTheme();
  const [videoOpen, setVideoOpen] = useState(false);
  const isDark = theme === 'dark';

  return (
    <section
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors ${
        isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Video Box */}
          <div className="lg:col-span-6 relative">
            <div
              className={`relative h-[480px] sm:h-[580px] w-full rounded-3xl overflow-hidden border shadow-2xl group ${
                isDark ? 'border-white/15' : 'border-slate-300'
              }`}
            >
              <Image
                src="/images/hardgp/por2-big.jpg"
                alt="HARD Group Construction Video"
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

              {/* Centered pulsing play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setVideoOpen(true)}
                  className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center pulse-button-glow hover:scale-110 transition-transform cursor-pointer"
                  aria-label="Watch Construction Video"
                >
                  <Play className={`w-8 h-8 fill-current ${direction === 'rtl' ? 'mr-1' : 'ml-1'}`} />
                </button>
              </div>

              {/* Bottom floating badge */}
              <div
                className={`absolute bottom-6 left-6 right-6 p-4 rounded-2xl backdrop-blur-md border flex items-center justify-between ${
                  isDark
                    ? 'bg-[#080b24]/90 border-white/10 text-white'
                    : 'bg-white/95 border-slate-200 text-slate-900 shadow-lg'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark
                        ? 'bg-blue-600/10 text-blue-400'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs opacity-90 uppercase tracking-wider block font-bold">
                      {t('why.watchTour')}
                    </span>
                    <span className="text-sm font-bold">{t('why.videoWalkthrough')}</span>
                  </div>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    isDark
                      ? 'bg-blue-600/10 text-blue-400'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  03:45 MIN
                </span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="inline-block text-xs uppercase tracking-widest font-bold text-blue-500 px-3.5 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
                {t('why.badge')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {t('why.titlePre')}{' '}
                <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>
                  {t('why.titleHighlight')}
                </span>
              </h2>
            </div>

            <p className="opacity-100 text-base leading-relaxed">
              {t('why.description')}
            </p>

            {/* Feature Boxes */}
            <div className="space-y-4 pt-2">
              <div
                className={`p-6 rounded-2xl border transition-all flex items-start gap-4 group ${
                  isDark
                    ? 'bg-[#080b24] border-white/10 hover:border-blue-500/40'
                    : 'bg-white border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md'
                }`}
              >
                <div
                  className={`p-3 rounded-xl shrink-0 mt-1 ${
                    isDark
                      ? 'bg-blue-600/10 text-blue-400'
                      : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold mb-1.5 transition-colors ${
                      isDark ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'
                    }`}
                  >
                    {t('why.qualityTitle')}
                  </h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {t('why.qualityDesc')}
                  </p>
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl border transition-all flex items-start gap-4 group ${
                  isDark
                    ? 'bg-[#080b24] border-white/10 hover:border-blue-500/40'
                    : 'bg-white border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md'
                }`}
              >
                <div
                  className={`p-3 rounded-xl shrink-0 mt-1 ${
                    isDark
                      ? 'bg-blue-600/10 text-blue-400'
                      : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  <HardHat className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold mb-1.5 transition-colors ${
                      isDark ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'
                    }`}
                  >
                    {t('why.expertTitle')}
                  </h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {t('why.expertDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        youtubeId="Y-x0efG1seA"
        title="HARD Real Estate Excellence"
      />
    </section>
  );
}
