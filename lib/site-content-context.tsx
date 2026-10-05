'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  SiteSettingsDoc,
  defaultSiteSettings,
  subscribeToSiteSettings,
  updateSiteSettings,
  PageBannerDoc,
  DivisionCardDoc,
  PageSeoDoc,
  PropertyDoc,
  ProjectDoc,
  ServiceDoc,
  ArticleDoc,
  subscribeToProperties,
  subscribeToProjects,
  subscribeToServices,
  subscribeToArticles,
} from './firestore-service';

interface SiteContentContextType {
  settings: SiteSettingsDoc;
  loading: boolean;
  properties: PropertyDoc[];
  projects: ProjectDoc[];
  services: ServiceDoc[];
  articles: ArticleDoc[];
  saveSettings: (newSettings: Partial<SiteSettingsDoc>) => Promise<void>;
  getSectionTitle: (sectionKey: keyof SiteSettingsDoc['sectionTitles'] | string, lang: 'ar' | 'en') => string;
  getSectionSubtitle: (sectionKey: string, lang: 'ar' | 'en') => string;
  getPageBanner: (pageKey: string) => PageBannerDoc;
  getDivisionCard: (divKey: 'realestate' | 'contracting' | 'hvac') => DivisionCardDoc;
  getPageSeo: (pageKey: string) => PageSeoDoc;
}

const defaultPageSeo: PageSeoDoc = {
  metaTitleAr: defaultSiteSettings.seo.metaTitleAr,
  metaTitleEn: defaultSiteSettings.seo.metaTitleEn,
  metaDescriptionAr: defaultSiteSettings.seo.metaDescriptionAr,
  metaDescriptionEn: defaultSiteSettings.seo.metaDescriptionEn,
  keywordsAr: defaultSiteSettings.seo.keywordsAr,
  keywordsEn: defaultSiteSettings.seo.keywordsEn,
  ogImage: defaultSiteSettings.seo.ogImage,
  canonicalUrl: defaultSiteSettings.seo.canonicalUrl,
};

const SiteContentContext = createContext<SiteContentContextType>({
  settings: defaultSiteSettings,
  loading: false,
  properties: [],
  projects: [],
  services: [],
  articles: [],
  saveSettings: async () => {},
  getSectionTitle: () => '',
  getSectionSubtitle: () => '',
  getPageBanner: () => ({ titleAr: '', titleEn: '', subtitleAr: '', subtitleEn: '', image: '/images/hardgp/por1-big.jpg' }),
  getDivisionCard: (k) => defaultSiteSettings.divisionCards?.[k] || { titleAr: '', titleEn: '', badgeAr: '', badgeEn: '', descAr: '', descEn: '', image: '' },
  getPageSeo: () => defaultPageSeo,
});

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettingsDoc>(defaultSiteSettings);
  const [properties, setProperties] = useState<PropertyDoc[]>([]);
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [services, setServices] = useState<ServiceDoc[]>([]);
  const [articles, setArticles] = useState<ArticleDoc[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubSettings = subscribeToSiteSettings((latest) => {
      setSettings(latest);
      setLoading(false);
    });

    const unsubProperties = subscribeToProperties((data) => {
      if (data) setProperties(data);
    });

    const unsubProjects = subscribeToProjects((data) => {
      if (data) setProjects(data);
    });

    const unsubServices = subscribeToServices((data) => {
      if (data) setServices(data);
    });

    const unsubArticles = subscribeToArticles((data) => {
      if (data) setArticles(data);
    });

    return () => {
      unsubSettings?.();
      unsubProperties?.();
      unsubProjects?.();
      unsubServices?.();
      unsubArticles?.();
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

  const getPageSeo = (pageKey: string): PageSeoDoc => {
    if (settings.seo?.perPageSeo && settings.seo.perPageSeo[pageKey]) {
      return settings.seo.perPageSeo[pageKey];
    }
    if (defaultSiteSettings.seo?.perPageSeo && defaultSiteSettings.seo.perPageSeo[pageKey]) {
      return defaultSiteSettings.seo.perPageSeo[pageKey];
    }
    return defaultPageSeo;
  };

  return (
    <SiteContentContext.Provider
      value={{
        settings,
        loading,
        properties,
        projects,
        services,
        articles,
        saveSettings,
        getSectionTitle,
        getSectionSubtitle,
        getPageBanner,
        getDivisionCard,
        getPageSeo,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
