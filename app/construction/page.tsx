import React from 'react';
import type { Metadata } from 'next';
import ConstructionPortal from '@/components/divisions/ConstructionPortal';

export const metadata: Metadata = {
  title: 'هارد للإنشاءات والمقاولات | الذراع الإنشائي لمجموعة هارد – مقاولات عامة فئة أولى',
  description:
    'هارد للإنشاءات والمقاولات: الذراع الإنشائي والهندسي لمجموعة هارد، يقدم خدمات المقاولات العامة المصنفة فئة أولى لتنفيذ الأبراج التجارية، المجمعات السكنية، والمنشآت الذكية بأعلى كفاءة ومعايير كود البناء السعودي.',
  keywords:
    'هارد للإنشاءات والمقاولات, مجموعة هارد, مقاولات عامة فئة أولى, كود البناء السعودي, أبراج تجارية, مجمعات سكنية ذكية, مقاولات الرياض والشرقية, Hard Construction, Hard Group',
  alternates: {
    canonical: '/construction',
  },
  openGraph: {
    title: 'هارد للإنشاءات والمقاولات | مجموعة هارد (الشركة الأم)',
    description:
      'الذراع الإنشائي والهندسي لمجموعة هارد، يقدم خدمات المقاولات العامة المصنفة فئة أولى لتنفيذ الأبراج التجارية، المجمعات السكنية، والمنشآت الذكية بأعلى كفاءة ومعايير كود البناء السعودي.',
    url: '/construction',
    siteName: 'مجموعة هارد - Hard Group',
    type: 'website',
    images: [
      {
        url: '/images/hardgp/por1-big.jpg',
        width: 1200,
        height: 630,
        alt: 'هارد للإنشاءات والمقاولات - الذراع الإنشائي لمجموعة هارد',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'هارد للإنشاءات والمقاولات | مجموعة هارد',
    description:
      'الذراع الإنشائي والهندسي لمجموعة هارد، مقاولات عامة مصنفة فئة أولى لتنفيذ الأبراج التجارية والمجمعات الذكية وفق كود البناء السعودي.',
    images: [
      '/images/hardgp/por1-big.jpg',
    ],
  },
};

export default function ConstructionPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: 'هارد للإنشاءات والمقاولات - Hard Construction & Contracting',
    parentOrganization: {
      '@type': 'Organization',
      name: 'مجموعة هارد - Hard Group',
      url: '/',
    },
    description:
      'الذراع الإنشائي والهندسي لمجموعة هارد، يقدم خدمات المقاولات العامة المصنفة فئة أولى لتنفيذ الأبراج التجارية، المجمعات السكنية، والمنشآت الذكية بأعلى كفاءة ومعايير كود البناء السعودي.',
    areaServed: ['المملكة العربية السعودية', 'الرياض', 'المنطقة الشرقية'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات المقاولات العامة المصنفة فئة أولى',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'تنفيذ الأبراج التجارية والإدارية',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'المجمعات السكنية والمنشآت الذكية',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'المطابقة الهندسية لمعايير كود البناء السعودي',
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
      <ConstructionPortal />
    </>
  );
}
