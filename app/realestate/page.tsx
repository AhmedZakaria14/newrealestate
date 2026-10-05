import React from 'react';
import type { Metadata } from 'next';
import RealEstatePortal from '@/components/divisions/RealEstatePortal';

export const metadata: Metadata = {
  title: 'هارد للعقارات | الذراع العقاري لمجموعة هارد – وساطة وإدارة محافظ كبرى',
  description:
    'هارد للعقارات: الذراع العقاري الرائد في المملكة العربية السعودية، متخصص في التسويق والوساطة المعتمدة من الهيئة العامة للعقار (فال)، وإدارة المحافظ الاستثمارية الكبرى في المنطقة الشرقية والرياض.',
  keywords:
    'هارد للعقارات, مجموعة هارد, وساطة عقارية فال, إدارة محافظ استثمارية, عقارات الرياض, عقارات المنطقة الشرقية, تسويق عقاري مرخص, Hard Real Estate, Hard Group',
  alternates: {
    canonical: '/realestate',
  },
  openGraph: {
    title: 'هارد للعقارات | مجموعة هارد (الشركة الأم)',
    description:
      'الذراع العقاري الرائد في المملكة العربية السعودية، متخصص في التسويق والوساطة المعتمدة من الهيئة العامة للعقار (فال)، وإدارة المحافظ الاستثمارية الكبرى في المنطقة الشرقية والرياض.',
    url: '/realestate',
    siteName: 'مجموعة هارد - Hard Group',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
        width: 1200,
        height: 630,
        alt: 'هارد للعقارات - الذراع العقاري لمجموعة هارد',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'هارد للعقارات | مجموعة هارد',
    description:
      'الذراع العقاري الرائد في المملكة العربية السعودية، متخصص في التسويق والوساطة المعتمدة من الهيئة العامة للعقار (فال).',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    ],
  },
};

export default function RealEstatePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'هارد للعقارات - Hard Real Estate',
    parentOrganization: {
      '@type': 'Organization',
      name: 'مجموعة هارد - Hard Group',
      url: '/',
    },
    description:
      'الذراع العقاري الرائد في المملكة العربية السعودية، متخصص في التسويق والوساطة المعتمدة من الهيئة العامة للعقار (فال)، وإدارة المحافظ الاستثمارية الكبرى في المنطقة الشرقية والرياض.',
    areaServed: ['الرياض', 'المنطقة الشرقية', 'المملكة العربية السعودية'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات الوساطة وإدارة المحافظ العقارية',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'وساطة وتسويق عقاري مرخص من فال',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'إدارة المحافظ الاستثمارية الكبرى',
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
      <RealEstatePortal />
    </>
  );
}
