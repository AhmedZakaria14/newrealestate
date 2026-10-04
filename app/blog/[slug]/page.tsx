import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/skyvilla-data';
import BlogDetailClient from '@/components/blog/BlogDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'المقال غير متوفر | هارد للعقارات',
      description: 'المقال المطلوب غير موجود أو تم نقله.',
    };
  }

  return {
    title: `${post.title_ar} | مدونة هارد للعقارات والمقاولات`,
    description: post.excerpt_ar,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];

  if (!post) {
    notFound();
  }

  return <BlogDetailClient post={post} />;
}
