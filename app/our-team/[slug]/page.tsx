import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { teamMembers } from '@/data/skyvilla-data';
import TeamMemberDetailClient from '@/components/team/TeamMemberDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return teamMembers.map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);

  if (!member) {
    return {
      title: 'عضو الفريق غير متوفر | هارد للعقارات',
      description: 'بيانات عضو الفريق غير متوفرة أو تم تحديثها.',
    };
  }

  return {
    title: `${member.name_ar} - ${member.role_ar} | فريق هارد للعقارات والمقاولات`,
    description: member.bio_ar,
  };
}

export default async function TeamMemberDetailPage({ params }: Props) {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug) || teamMembers[0];

  if (!member) {
    notFound();
  }

  return <TeamMemberDetailClient member={member} />;
}
