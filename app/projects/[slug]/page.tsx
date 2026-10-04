import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projectsData } from '@/data/skyvilla-data';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'المشروع غير متوفر | هارد للإنشاءات والمقاولات',
      description: 'المشروع المطلوب غير موجود أو تم تحديث بياناته.',
    };
  }

  return {
    title: `${project.title_ar} | مشاريع هارد للإنشاءات والمقاولات`,
    description: project.description_ar,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug) || projectsData[0];

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
