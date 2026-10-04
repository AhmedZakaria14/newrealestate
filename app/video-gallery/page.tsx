'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import VideoModal from '@/components/VideoModal';
import { videoGalleryItems } from '@/data/skyvilla-data';
import { Play, Clock } from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function VideoGalleryPage() {
  const { language, theme, t, direction } = useLanguageTheme();
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);
  const isDark = theme === 'dark';

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title={t('nav.videoGallery')}
        subtitle={
          language === 'ar'
            ? 'جولات معمارية سينمائية، وتوثيق وثائقي لمراحل البناء، ولقطات جوية متقدمة للمشاريع.'
            : 'Cinematic construction walkthroughs, site milestone documentaries, and aerial drone footage.'
        }
        breadcrumb={[{ label: t('nav.videoGallery') }]}
      />

      <section
        className={`py-24 sm:py-32 overflow-hidden transition-colors ${
          isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoGalleryItems.map((video) => {
              const title = language === 'ar' ? video.title_ar : video.title;
              const cat = language === 'ar' ? video.category_ar : video.category;

              return (
                <div
                  key={video.id}
                  className={`rounded-3xl border overflow-hidden shadow-2xl group flex flex-col justify-between transition-all ${
                    isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div
                    onClick={() => setSelectedVideo({ id: video.youtubeId, title })}
                    className="relative h-64 sm:h-72 w-full overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={video.image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                        <Play className={`w-7 h-7 fill-current ${direction === 'rtl' ? 'mr-0.5' : 'ml-0.5'}`} />
                      </div>
                    </div>

                    <div
                      className={`absolute bottom-4 ${
                        direction === 'rtl' ? 'left-4' : 'right-4'
                      } px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-semibold text-white flex items-center gap-1.5`}
                    >
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{video.duration}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-xs uppercase font-bold text-blue-500 tracking-wider block mb-1">
                      {cat}
                    </span>
                    <h4
                      className={`text-lg font-bold transition-colors leading-snug ${
                        isDark ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'
                      }`}
                    >
                      {title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedVideo && (
        <VideoModal
          isOpen={true}
          onClose={() => setSelectedVideo(null)}
          youtubeId={selectedVideo.id}
          title={selectedVideo.title}
        />
      )}

      <Footer />
    </main>
  );
}
