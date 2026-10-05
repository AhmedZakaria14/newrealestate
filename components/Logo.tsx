'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useLanguageTheme } from '@/lib/language-theme-context';

export interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
  showSubtitle?: boolean;
  isIconOnly?: boolean;
  division?: 'auto' | 'construction' | 'realestate' | 'hvac' | 'projects' | 'marketing' | 'group';
  customSubtitle?: string;
}

export default function Logo({
  size = 'md',
  variant = 'auto',
  className = '',
  showSubtitle = true,
  isIconOnly = false,
  division = 'auto',
  customSubtitle,
}: LogoProps) {
  const pathname = usePathname() || '/';
  const { theme, language } = useLanguageTheme();
  const isAr = language === 'ar';

  const isLight =
    variant === 'light' || (variant === 'auto' && theme === 'dark');

  // Height and font sizing configurations
  const sizeConfig = {
    xs: {
      h: 'h-7 sm:h-8 w-auto',
      title: 'text-xs sm:text-sm font-bold tracking-tight',
      sub: 'text-[8.5px] sm:text-[9px] tracking-wider',
    },
    sm: {
      h: 'h-8 sm:h-9 w-auto',
      title: 'text-xs sm:text-sm font-bold tracking-tight',
      sub: 'text-[9px] sm:text-[10px] tracking-wider',
    },
    md: {
      h: 'h-9 sm:h-10 lg:h-11 w-auto',
      title: 'text-xs sm:text-base lg:text-lg font-bold tracking-tight',
      sub: 'text-[9px] sm:text-[10px] lg:text-[11px] tracking-wider',
    },
    lg: {
      h: 'h-12 sm:h-14 lg:h-16 w-auto',
      title: 'text-lg sm:text-xl lg:text-2xl font-bold tracking-tight',
      sub: 'text-xs tracking-wider',
    },
    xl: {
      h: 'h-16 sm:h-20 lg:h-24 w-auto',
      title: 'text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight',
      sub: 'text-sm tracking-wider',
    },
  };

  const current = sizeConfig[size] || sizeConfig.md;

  // Determine current active division based on prop or pathname
  const activeSector =
    division !== 'auto'
      ? division
      : pathname === '/' || pathname.startsWith('/construction')
      ? 'construction'
      : pathname.startsWith('/realestate') || pathname.startsWith('/listings')
      ? 'realestate'
      : pathname.startsWith('/hvac')
      ? 'hvac'
      : pathname.startsWith('/projects')
      ? 'projects'
      : pathname.startsWith('/marketing')
      ? 'marketing'
      : 'construction';

  // Subtitle text dynamically representing the division
  const getDivisionDetails = () => {
    if (customSubtitle) {
      return {
        brandWordAr: 'للمقاولات والتطوير',
        brandWordEn: 'GROUP',
        subtitle: customSubtitle,
      };
    }

    switch (activeSector) {
      case 'realestate':
        return {
          brandWordAr: 'للعقارات',
          brandWordEn: 'REAL ESTATE',
          subtitle: isAr
            ? 'الوساطة والتسويق العقاري • فال 1200028472'
            : 'Real Estate Brokerage • FAL 1200028472',
        };
      case 'hvac':
        return {
          brandWordAr: 'للتكييف والتشغيل',
          brandWordEn: 'HVAC & FACILITIES',
          subtitle: isAr
            ? 'التكييف الميكانيكي وتشغيل المرافق'
            : 'HVAC Mechanical & Facilities Engineering',
        };
      case 'projects':
        return {
          brandWordAr: 'للمشاريع والتطوير',
          brandWordEn: 'DEVELOPMENTS',
          subtitle: isAr
            ? 'المشاريع التطويرية والمجتمعات الكبرى'
            : 'Master Projects & Developments',
        };
      case 'marketing':
        return {
          brandWordAr: 'للتسويق العقاري',
          brandWordEn: 'MARKETING',
          subtitle: isAr
            ? 'التسويق والإنتاج العقاري المتخصص'
            : 'Real Estate Media & Marketing',
        };
      case 'construction':
      default:
        return {
          brandWordAr: 'للمقاولات العامة',
          brandWordEn: 'CONSTRUCTION',
          subtitle: isAr
            ? 'المقاولات العامة والتطوير الإنشائي'
            : 'General Contracting & Structural Development',
        };
    }
  };

  const details = getDivisionDetails();

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* SVG Emblem matching reference */}
      <div className="relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <svg
          viewBox="0 0 800 620"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${current.h} aspect-[800/620] drop-shadow-sm`}
        >
          {/* 1. Sky Blue Parabolic Arch */}
          <path
            d="M 160 480 C 160 200, 260 20, 400 20 C 540 20, 640 200, 640 480 C 620 230, 520 85, 400 85 C 280 85, 180 230, 160 480 Z"
            fill="#5ec6f2"
          />
          {/* 2. HARD Precision Block Typography */}
          <g id="hard-letters">
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
          {/* 3. Primary Royal Blue Wave */}
          <path
            d="M 45 435 C 95 500, 180 570, 310 578 C 445 585, 570 525, 680 485 C 715 472, 738 490, 745 502 C 700 485, 610 520, 490 560 C 365 602, 210 570, 45 435 Z"
            fill="#0a58a7"
          />
          {/* 4. Secondary Bright Cyan Wave */}
          <path
            d="M 260 588 C 380 598, 520 560, 650 512 C 685 498, 710 512, 715 520 C 650 535, 520 605, 360 605 C 310 605, 275 596, 260 588 Z"
            fill="#00a2e8"
          />
        </svg>
      </div>

      {/* Brand Typography with dynamic division and subtext */}
      {!isIconOnly && (
        <div className="flex flex-col justify-center leading-tight min-w-0">
          <div className="flex items-baseline gap-1.5 truncate">
            <span
              className={`${current.title} font-serif tracking-tight truncate ${
                isLight ? 'text-white' : 'text-slate-900'
              }`}
            >
              {isAr ? (
                <>
                  <span className="text-sky-500 font-black">هارد</span>{' '}
                  <span className={isLight ? 'text-slate-100' : 'text-slate-800'}>
                    {details.brandWordAr}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-sky-500 font-black tracking-tight">HARD</span>{' '}
                  <span className={isLight ? 'text-slate-100' : 'text-slate-800'}>
                    {details.brandWordEn}
                  </span>
                </>
              )}
            </span>
          </div>

          {showSubtitle && (
            <span
              className={`${current.sub} font-semibold tracking-wider truncate max-w-[140px] xs:max-w-[200px] sm:max-w-[240px] 2xl:max-w-none leading-none pt-0.5 ${
                isLight ? 'text-sky-400' : 'text-sky-600'
              }`}
            >
              {details.subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
