'use client';

import React, { useState } from 'react';
import { Linkedin, Link2, Check, Share2 } from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';

interface SocialShareProps {
  title: string;
  url?: string;
  description?: string;
  contentType?: 'article' | 'project' | 'listing' | 'property';
  className?: string;
}

export default function SocialShare({
  title,
  url,
  description = '',
  contentType = 'article',
  className = '',
}: SocialShareProps) {
  const { language, theme } = useLanguageTheme();
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (url) return url;
    if (typeof window !== 'undefined') return window.location.href;
    return '';
  };

  const handleShare = (platform: 'twitter' | 'linkedin' | 'whatsapp') => {
    const shareUrl = getShareUrl();
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    let destination = '';
    if (platform === 'twitter') {
      destination = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    } else if (platform === 'linkedin') {
      destination = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    } else if (platform === 'whatsapp') {
      destination = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
    }

    if (destination && typeof window !== 'undefined') {
      window.open(destination, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyLink = async () => {
    const shareUrl = getShareUrl();
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else if (typeof document !== 'undefined') {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    const shareUrl = getShareUrl();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const headingText = isAr
    ? contentType === 'project'
      ? 'شارك هذا المشروع'
      : contentType === 'listing' || contentType === 'property'
      ? 'شارك هذا العقار'
      : 'شارك هذا المقال'
    : contentType === 'project'
    ? 'Share this Project'
    : contentType === 'listing' || contentType === 'property'
    ? 'Share this Property'
    : 'Share this Article';

  const subtitleText = isAr
    ? 'انشر المحتوى عبر منصات التواصل مع شركائك ومجتمعك المهني'
    : 'Broadcast this insight to your professional and investment network';

  return (
    <div
      className={`rounded-3xl border p-6 sm:p-8 transition-colors ${
        isDark
          ? 'bg-[#080d2b]/80 border-white/10 text-white'
          : 'bg-slate-50 border-slate-200 text-slate-900 shadow-sm'
      } ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Title and context */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              {headingText}
            </h3>
          </div>
          <p className="text-xs sm:text-sm opacity-80 max-w-md leading-relaxed">
            {subtitleText}
          </p>
        </div>

        {/* Buttons Row */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Twitter / X */}
          <button
            onClick={() => handleShare('twitter')}
            aria-label="Share on X / Twitter"
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-blue-500 cursor-pointer ${
              isDark
                ? 'bg-black/40 border-white/15 text-white hover:bg-black hover:border-white/30'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm'
            }`}
          >
            {/* Crisp X (Twitter) Logo */}
            <svg
              className="w-4 h-4 fill-current shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Twitter / X</span>
          </button>

          {/* LinkedIn */}
          <button
            onClick={() => handleShare('linkedin')}
            aria-label="Share on LinkedIn"
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-blue-500 cursor-pointer ${
              isDark
                ? 'bg-[#0077b5]/15 border-[#0077b5]/40 text-[#38bdf8] hover:bg-[#0077b5] hover:text-white'
                : 'bg-white border-sky-200 text-[#0077b5] hover:bg-[#0077b5] hover:text-white shadow-sm'
            }`}
          >
            <Linkedin className="w-4 h-4 fill-current shrink-0" />
            <span>LinkedIn</span>
          </button>

          {/* WhatsApp */}
          <button
            onClick={() => handleShare('whatsapp')}
            aria-label="Share on WhatsApp"
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-emerald-500 cursor-pointer ${
              isDark
                ? 'bg-[#25D366]/15 border-[#25D366]/40 text-[#4ade80] hover:bg-[#25D366] hover:text-white'
                : 'bg-white border-emerald-200 text-[#059669] hover:bg-[#25D366] hover:text-white shadow-sm'
            }`}
          >
            {/* Crisp WhatsApp Icon */}
            <svg
              className="w-4 h-4 fill-current shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>WhatsApp</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            aria-label={isAr ? 'نسخ رابط الصفحة' : 'Copy page URL'}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-blue-500 cursor-pointer ${
              copied
                ? isDark
                  ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400'
                  : 'bg-emerald-50 border-emerald-400 text-emerald-700'
                : isDark
                ? 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:text-white'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-bold">
                  {isAr ? 'تم النسخ!' : 'Copied!'}
                </span>
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4 shrink-0" />
                <span>{isAr ? 'نسخ الرابط' : 'Copy Link'}</span>
              </>
            )}
          </button>

          {/* Mobile Native Share Trigger */}
          <button
            onClick={handleNativeShare}
            aria-label={isAr ? 'مشاركة عبر تطبيقات أخرى' : 'Share via more apps'}
            className={`sm:hidden inline-flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-semibold border transition-colors cursor-pointer ${
              isDark
                ? 'bg-blue-600/20 border-blue-500/40 text-blue-400'
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>{isAr ? 'المزيد' : 'More'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
