import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { realEstateListings, RealEstateListingItem, legacySlugAliases } from '@/data/listings-data';
import ListingDetailClient from '@/components/listings/ListingDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const primarySlugs = realEstateListings.map((listing) => ({
    slug: listing.slug,
  }));
  const aliasSlugs = Object.keys(legacySlugAliases).map((slug) => ({
    slug,
  }));
  return [...primarySlugs, ...aliasSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const targetSlug = legacySlugAliases[slug] || slug;
  const listing = realEstateListings.find(
    (item) => item.slug === targetSlug || item.slug === slug
  );

  if (!listing) {
    return {
      title: 'عقار غير متوفر | هارد للعقارات',
      description: 'العقار المطلوب غير متوفر أو تم تحديث بياناته في محفظة هارد للعقارات.',
    };
  }

  const siteUrl = 'https://ais-dev-pkfczr543yf37r5bw3gk4t-87479276453.europe-west2.run.app';
  const pageUrl = `${siteUrl}/listings/${listing.slug}`;
  const metaTitle = `${listing.titleAr} | هارد للعقارات • رخصة فال ${listing.falLicense}`;
  const metaDescription = `${listing.typeNameAr} في ${listing.cityNameAr}. المساحة: ${listing.area}، السعر: ${listing.price}. صك ملكية إلكتروني معتمد برخصة فال 1200028472.`;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: pageUrl,
      siteName: 'هارد للعقارات - مجموعة هارد القابضة',
      images: [
        {
          url: listing.image,
          width: 1200,
          height: 630,
          alt: listing.titleAr,
        },
      ],
      type: 'article',
      locale: 'ar_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [listing.image],
    },
  };
}

export default async function ListingPage({ params }: Props) {
  const { slug } = await params;
  const targetSlug = legacySlugAliases[slug] || slug;
  const listing = realEstateListings.find(
    (item) => item.slug === targetSlug || item.slug === slug
  );

  if (!listing) {
    notFound();
  }

  // Get related listings based on relatedSlugs or fallback
  const relatedListings: RealEstateListingItem[] = realEstateListings.filter(
    (item) => item.slug !== listing.slug && listing.relatedSlugs.includes(item.slug)
  );

  const siteUrl = 'https://ais-dev-pkfczr543yf37r5bw3gk4t-87479276453.europe-west2.run.app';
  const pageUrl = `${siteUrl}/listings/${listing.slug}`;

  // Schema.org Structured Data (JSON-LD) for Real Estate Listing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateListing',
        '@id': `${pageUrl}/#listing`,
        name: listing.titleAr,
        alternateName: listing.titleEn,
        description: listing.descriptionAr,
        url: pageUrl,
        image: listing.gallery,
        datePosted: '2026-01-15T08:00:00+03:00',
        offers: {
          '@type': 'Offer',
          price: listing.priceRaw,
          priceCurrency: listing.priceCurrency,
          availability: 'https://schema.org/InStock',
          validFrom: '2026-01-01',
          seller: {
            '@type': 'RealEstateAgent',
            name: 'هارد للعقارات – مجموعة هارد القابضة',
            telephone: '+966508000000',
            identifier: listing.falLicense,
            url: `${siteUrl}/realestate`,
          },
        },
        about: {
          '@type': 'Place',
          name: listing.titleAr,
          address: {
            '@type': 'PostalAddress',
            streetAddress: listing.districtAr,
            addressLocality: listing.cityNameAr,
            addressRegion: listing.city === 'riyadh' ? 'منطقة الرياض' : 'المنطقة الشرقية',
            addressCountry: 'SA',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: listing.coords.lat,
            longitude: listing.coords.lng,
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'الرئيسية',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'هارد للعقارات',
            item: `${siteUrl}/realestate`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'العقارات المتاحة',
            item: `${siteUrl}/listings`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: listing.titleAr,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ListingDetailClient
        listing={listing}
        relatedListings={relatedListings}
      />
    </>
  );
}
