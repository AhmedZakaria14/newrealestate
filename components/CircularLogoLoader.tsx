'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useLanguageTheme } from '@/lib/language-theme-context';

interface CircularLogoLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showText?: boolean;
}

export default function CircularLogoLoader({
  size = 'md',
  label,
  showText = true,
}: CircularLogoLoaderProps) {
  const { language, theme } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const dimensions = {
    sm: { box: 'w-24 h-24', ring: 80, logo: 'w-10 h-10', stroke: 3 },
    md: { box: 'w-36 h-36', ring: 130, logo: 'w-16 h-16', stroke: 3.5 },
    lg: { box: 'w-48 h-48', ring: 170, logo: 'w-24 h-24', stroke: 4 },
  }[size];

  const defaultLabel = isAr
    ? 'مجموعة هارد • جاري التحميل...'
    : 'HARD GROUP • Loading...';

  return (
    <div className="flex flex-col items-center justify-center gap-5 select-none" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Outer Circular Animation System */}
      <div className={`relative ${dimensions.box} flex items-center justify-center`}>
        {/* Ambient Glow */}
        <div
          className={`absolute inset-0 rounded-full blur-2xl opacity-60 animate-pulse pointer-events-none ${
            isDark ? 'bg-blue-600/30' : 'bg-blue-400/25'
          }`}
        />

        {/* Outer Circular Rotating Conic & Gradient SVG Ring */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin"
          style={{ animationDuration: '2.4s' }}
          viewBox="0 0 160 160"
        >
          <defs>
            <linearGradient id="hardRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="50%" stopColor="#2563eb" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
            </linearGradient>
            <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background subtle circular track */}
          <circle
            cx="80"
            cy="80"
            r="68"
            fill="none"
            stroke={isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}
            strokeWidth={dimensions.stroke}
          />

          {/* Active sweeping gradient arc */}
          <circle
            cx="80"
            cy="80"
            r="68"
            fill="none"
            stroke="url(#hardRingGradient)"
            strokeWidth={dimensions.stroke + 1}
            strokeDasharray="260 170"
            strokeLinecap="round"
            filter="url(#ringGlow)"
          />
        </svg>

        {/* Counter-rotating secondary dotted ring */}
        <svg
          className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-spin pointer-events-none"
          style={{ animationDuration: '6s', animationDirection: 'reverse' }}
          viewBox="0 0 140 140"
        >
          <circle
            cx="70"
            cy="70"
            r="58"
            fill="none"
            stroke={isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(37, 99, 235, 0.35)'}
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
        </svg>

        {/* Center Circular Glass Emblem Container */}
        <motion.div
          animate={{ scale: [0.97, 1.03, 0.97] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className={`relative z-10 w-[72%] h-[72%] rounded-full flex items-center justify-center p-3.5 shadow-2xl border backdrop-blur-xl ${
            isDark
              ? 'bg-[#080d2b]/90 border-blue-500/30 shadow-blue-900/40 text-white'
              : 'bg-white/95 border-blue-200/80 shadow-slate-300/60 text-slate-900'
          }`}
        >
          {/* HARD SVG Emblem */}
          <svg
            viewBox="0 0 800 620"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-md"
          >
            {/* Sky Blue Arch */}
            <path
              d="M 160 480 C 160 200, 260 20, 400 20 C 540 20, 640 200, 640 480 C 620 230, 520 85, 400 85 C 280 85, 180 230, 160 480 Z"
              fill="#5ec6f2"
            />
            {/* HARD Precision Typography */}
            <g id="hard-letters-loader">
              <path
                d="M 205 380 L 233 380 L 233 416 L 267 416 L 267 380 L 295 380 L 295 475 L 267 475 L 267 440 L 233 440 L 233 475 L 205 475 Z"
                fill="#ffffff"
                stroke="#1a1d20"
                strokeWidth="7"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 305 475 L 340 380 L 366 380 L 401 475 L 374 475 L 366 448 L 338 448 L 330 475 L 305 475 Z M 344 425 L 360 425 L 352 398 Z"
                fill="#ffffff"
                stroke="#1a1d20"
                strokeWidth="7"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 410 380 L 458 380 C 480 380 495 393 495 412 C 495 428 484 438 468 442 L 498 475 L 468 475 L 442 445 L 434 445 L 434 475 L 410 475 Z M 434 402 L 454 402 C 465 402 470 406 470 412 C 470 418 465 422 454 422 L 434 422 Z"
                fill="#ffffff"
                stroke="#1a1d20"
                strokeWidth="7"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 506 380 L 555 380 C 580 380 596 397 596 427 C 596 457 580 475 555 475 L 506 475 Z M 532 404 L 552 404 C 566 404 570 412 570 427 C 570 442 566 451 552 451 L 532 451 Z"
                fill="#ffffff"
                stroke="#1a1d20"
                strokeWidth="7"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </g>
            {/* Primary Royal Blue Wave */}
            <path
              d="M 45 435 C 95 500, 180 570, 310 578 C 445 585, 570 525, 680 485 C 715 472, 738 490, 745 502 C 700 485, 610 520, 490 560 C 365 602, 210 570, 45 435 Z"
              fill="#0a58a7"
            />
            {/* Secondary Bright Cyan Wave */}
            <path
              d="M 260 588 C 380 598, 520 560, 650 512 C 685 498, 710 512, 715 520 C 650 535, 520 605, 360 605 C 310 605, 275 596, 260 588 Z"
              fill="#00a2e8"
            />
          </svg>
        </motion.div>
      </div>

      {/* Loading Label with subtle Shimmer */}
      {showText && (
        <div className="flex flex-col items-center gap-1.5 text-center">
          <p
            className={`text-xs sm:text-sm font-bold tracking-wider ${
              isDark ? 'text-sky-300' : 'text-blue-700'
            }`}
          >
            {label || defaultLabel}
          </p>
          <div className="flex items-center gap-1.5 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}
    </div>
  );
}
