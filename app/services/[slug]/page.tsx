import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { servicesData } from '@/data/skyvilla-data';
import ServiceDetailClient from '@/components/services/ServiceDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'الخدمة غير متوفرة | هارد للإنشاءات والمقاولات',
      description: 'الخدمة المطلوبة غير متوفرة أو تم تحديثها.',
    };
  }

  return {
    title: `${service.title_ar} | خدمات هارد للإنشاءات والمقاولات والتكييف`,
    description: service.description_ar,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug) || servicesData[0];

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
