'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  SiteSettingsDoc,
  defaultSiteSettings,
  subscribeToSiteSettings,
  updateSiteSettings,
  PageBannerDoc,
  DivisionCardDoc,
} from './firestore-service';

interface SiteContentContextType {
  settings: SiteSettingsDoc;
  loading: boolean;
  saveSettings: (newSettings: Partial<SiteSettingsDoc>) => Promise<void>;
  getSectionTitle: (sectionKey: keyof SiteSettingsDoc['sectionTitles'] | string, lang: 'ar' | 'en') => string;
  getSectionSubtitle: (sectionKey: string, lang: 'ar' | 'en') => string;
  getPageBanner: (pageKey: string) => PageBannerDoc;
  getDivisionCard: (divKey: 'realestate' | 'contracting' | 'hvac') => DivisionCardDoc;
}

const SiteContentContext = createContext<SiteContentContextType>({
  settings: defaultSiteSettings,
  loading: false,
  saveSettings: async () => {},
  getSectionTitle: () => '',
  getSectionSubtitle: () => '',
  getPageBanner: () => ({ titleAr: '', titleEn: '', subtitleAr: '', subtitleEn: '', image: '/images/hardgp/por1-big.jpg' }),
  getDivisionCard: (k) => defaultSiteSettings.divisionCards?.[k] || { titleAr: '', titleEn: '', badgeAr: '', badgeEn: '', descAr: '', descEn: '', image: '' },
});

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettingsDoc>(defaultSiteSettings);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToSiteSettings((latest) => {
      setSettings(latest);
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const saveSettings = async (newSettings: Partial<SiteSettingsDoc>) => {
    await updateSiteSettings(newSettings);
  };

  const getSectionTitle = (sectionKey: string, lang: 'ar' | 'en'): string => {
    const key = `${sectionKey}${lang === 'ar' ? 'Ar' : 'En'}` as keyof SiteSettingsDoc['sectionTitles'];
    if (settings.sectionTitles && settings.sectionTitles[key]) {
      return String(settings.sectionTitles[key]);
    }
    // Fallback to default
    if (defaultSiteSettings.sectionTitles && defaultSiteSettings.sectionTitles[key]) {
      return String(defaultSiteSettings.sectionTitles[key]);
    }
    return sectionKey;
  };

  const getSectionSubtitle = (sectionKey: string, lang: 'ar' | 'en'): string => {
    const key = `${sectionKey}Subtitle${lang === 'ar' ? 'Ar' : 'En'}` as keyof SiteSettingsDoc['sectionTitles'];
    if (settings.sectionTitles && settings.sectionTitles[key]) {
      return String(settings.sectionTitles[key]);
    }
    if (defaultSiteSettings.sectionTitles && defaultSiteSettings.sectionTitles[key]) {
      return String(defaultSiteSettings.sectionTitles[key]);
    }
    return '';
  };

  const getPageBanner = (pageKey: string): PageBannerDoc => {
    const key = pageKey as keyof NonNullable<SiteSettingsDoc['pageBanners']>;
    if (settings.pageBanners && settings.pageBanners[key]) {
      return settings.pageBanners[key]!;
    }
    if (defaultSiteSettings.pageBanners && defaultSiteSettings.pageBanners[key]) {
      return defaultSiteSettings.pageBanners[key]!;
    }
    return {
      titleAr: '',
      titleEn: '',
      subtitleAr: '',
      subtitleEn: '',
      image: '/images/hardgp/por1-big.jpg',
    };
  };

  const getDivisionCard = (divKey: 'realestate' | 'contracting' | 'hvac'): DivisionCardDoc => {
    if (settings.divisionCards && settings.divisionCards[divKey]) {
      return settings.divisionCards[divKey]!;
    }
    if (defaultSiteSettings.divisionCards && defaultSiteSettings.divisionCards[divKey]) {
      return defaultSiteSettings.divisionCards[divKey]!;
    }
    return {
      titleAr: '',
      titleEn: '',
      badgeAr: '',
      badgeEn: '',
      descAr: '',
      descEn: '',
      image: '/images/hardgp/por1-big.jpg',
    };
  };

  return (
    <SiteContentContext.Provider
      value={{
        settings,
        loading,
        saveSettings,
        getSectionTitle,
        getSectionSubtitle,
        getPageBanner,
        getDivisionCard,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
