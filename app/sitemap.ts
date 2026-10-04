import { MetadataRoute } from 'next';
import { getProperties, getProjects } from '@/lib/firestore-service';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // revalidate hourly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hardgroup.sa';
  const now = new Date();

  // Core static & operational routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'always',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/listings`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/realestate`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/construction`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hvac`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/our-team`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic property URLs
  let propertyRoutes: MetadataRoute.Sitemap = [];
  try {
    const properties = await getProperties();
    propertyRoutes = properties.map((prop) => ({
      url: `${baseUrl}/listings/${prop.id || ''}`,
      lastModified: prop.updatedAt ? new Date(prop.updatedAt) : now,
      changeFrequency: 'daily' as const,
      priority: 0.85,
    }));
  } catch (err) {
    console.warn('Sitemap property fetch fallback:', err);
  }

  // Dynamic project URLs
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    projectRoutes = projects.map((proj) => ({
      url: `${baseUrl}/projects/${proj.id || ''}`,
      lastModified: proj.updatedAt ? new Date(proj.updatedAt) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (err) {
    console.warn('Sitemap project fetch fallback:', err);
  }

  return [...staticRoutes, ...propertyRoutes, ...projectRoutes];
}
