import React from 'react';
import type { Metadata } from 'next';
import HvacPortal from '@/components/divisions/HvacPortal';

export const metadata: Metadata = {
  title: 'هارد لصيانة وتكييف الهواء | الذراع الكهروميكانيكي لمجموعة هارد – شيلرات و VRF وطوارئ 24/7',
  description:
    'هارد لصيانة وتكييف الهواء: الذراع التخصصي للخدمات الكهروميكانيكية والتبريد، يقدم عقود الصيانة الوقائية (AMC) للشيلرات، أنظمة VRF الحديثة، وتنقية مجاري الهواء مع طوارئ واستجابة فورية على مدار الساعة.',
  keywords:
    'هارد لصيانة وتكييف الهواء, مجموعة هارد, صيانة شيلرات, أنظمة VRF, عقود صيانة وقائية AMC, تنقية مجاري الهواء, طوارئ تكييف 24 ساعة, صيانة تكييف الرياض والشرقية, Hard HVAC, Hard Group',
  alternates: {
    canonical: '/hvac',
  },
  openGraph: {
    title: 'هارد لصيانة وتكييف الهواء | مجموعة هارد (الشركة الأم)',
    description:
      'الذراع التخصصي للخدمات الكهروميكانيكية والتبريد، يقدم عقود الصيانة الوقائية (AMC) للشيلرات، أنظمة VRF الحديثة، وتنقية مجاري الهواء مع طوارئ واستجابة فورية على مدار الساعة.',
    url: '/hvac',
    siteName: 'مجموعة هارد - Hard Group',
    type: 'website',
    images: [
      {
        url: 'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/project-image-2.jpg',
        width: 1200,
        height: 630,
        alt: 'هارد لصيانة وتكييف الهواء - الذراع الكهروميكانيكي لمجموعة هارد',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'هارد لصيانة وتكييف الهواء | مجموعة هارد',
    description:
      'الذراع التخصصي للكهروميكانيك والتبريد، عقود AMC للشيلرات و VRF وتنقية مجاري الهواء وطوارئ 24/7.',
    images: [
      'https://demo.awaikenthemes.com/skyvilla/wp-content/uploads/2026/01/project-image-2.jpg',
    ],
  },
};

export default function HvacPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: 'هارد لصيانة وتكييف الهواء - Hard HVAC & Maintenance',
    parentOrganization: {
      '@type': 'Organization',
      name: 'مجموعة هارد - Hard Group',
      url: '/',
    },
    description:
      'الذراع التخصصي للخدمات الكهروميكانيكية والتبريد، يقدم عقود الصيانة الوقائية (AMC) للشيلرات، أنظمة VRF الحديثة، وتنقية مجاري الهواء مع طوارئ واستجابة فورية على مدار الساعة.',
    areaServed: ['المملكة العربية السعودية', 'الرياض', 'المنطقة الشرقية'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'عقود الصيانة الوقائية والخدمات الكهروميكانيكية',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'عقود الصيانة الوقائية السنوية AMC للمنشآت والأبراج',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'صيانة وتأهيل محطات الشيلرات وأنظمة VRF',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'تنقية وتعقيم مجاري الهواء وطوارئ التكييف 24/7',
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HvacPortal />
    </>
  );
}
