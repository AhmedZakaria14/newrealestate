'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  SiteSettingsDoc,
  defaultSiteSettings,
  subscribeToSiteSettings,
  updateSiteSettings,
} from './firestore-service';

interface SiteContentContextType {
  settings: SiteSettingsDoc;
  loading: boolean;
  saveSettings: (newSettings: Partial<SiteSettingsDoc>) => Promise<void>;
  getSectionTitle: (sectionKey: keyof SiteSettingsDoc['sectionTitles'] | string, lang: 'ar' | 'en') => string;
  getSectionSubtitle: (sectionKey: string, lang: 'ar' | 'en') => string;
}

const SiteContentContext = createContext<SiteContentContextType>({
  settings: defaultSiteSettings,
  loading: false,
  saveSettings: async () => {},
  getSectionTitle: () => '',
  getSectionSubtitle: () => '',
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

  return (
    <SiteContentContext.Provider
      value={{
        settings,
        loading,
        saveSettings,
        getSectionTitle,
        getSectionSubtitle,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
