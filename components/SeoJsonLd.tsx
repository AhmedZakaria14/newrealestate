'use client';

import React from 'react';
import { useSiteContent } from '@/lib/site-content-context';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function SeoJsonLd() {
  const { settings } = useSiteContent();
  const { language } = useLanguageTheme();
  const isAr = language === 'ar';

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateAgent',
        '@id': 'https://hardgroup.sa/#organization',
        'name': isAr ? settings.heroTitleAr : settings.heroTitleEn,
        'alternateName': ['مجموعة هارد', 'HARD Group', 'هارد للمقاولات والعقارات'],
        'url': settings.seo.canonicalUrl || 'https://hardgroup.sa',
        'logo': 'https://hardgroup.sa/favicon.svg',
        'image': settings.seo.ogImage || settings.heroImage,
        'description': isAr ? settings.seo.metaDescriptionAr : settings.seo.metaDescriptionEn,
        'telephone': settings.contactInfo.hotline,
        'email': settings.contactInfo.email,
        'priceRange': 'SAR 100,000 - 150,000,000',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': isAr ? settings.contactInfo.addressKhobarAr : settings.contactInfo.addressKhobarEn,
          'addressLocality': 'Al Khobar',
          'addressRegion': 'Eastern Province',
          'postalCode': '31952',
          'addressCountry': 'SA',
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 26.2818,
          'longitude': 50.2084,
        },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          'opens': '08:00',
          'closes': '18:00',
        },
        'sameAs': [
          'https://twitter.com/hardgroup_sa',
          'https://www.linkedin.com/company/hard-group-sa',
          'https://instagram.com/hardgroup_sa',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://hardgroup.sa/#website',
        'url': settings.seo.canonicalUrl || 'https://hardgroup.sa',
        'name': isAr ? settings.heroTitleAr : settings.heroTitleEn,
        'description': isAr ? settings.seo.metaDescriptionAr : settings.seo.metaDescriptionEn,
        'publisher': {
          '@id': 'https://hardgroup.sa/#organization',
        },
        'inLanguage': ['ar-SA', 'en-US'],
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://hardgroup.sa/listings?search={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
