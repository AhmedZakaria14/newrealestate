'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MarqueeTicker from '@/components/MarqueeTicker';
import HeroSection from '@/components/home-v3/HeroSection';
import TrustAccreditationsBar from '@/components/TrustAccreditationsBar';
import HardCoreDivisionsSection from '@/components/HardCoreDivisionsSection';
import InteractiveProjectCalculator from '@/components/InteractiveProjectCalculator';
import ComprehensiveServicesMatrix from '@/components/ComprehensiveServicesMatrix';
import PrimeProjectsSection from '@/components/home-v3/PrimeProjectsSection';
import FeaturedPropertiesSection from '@/components/home-v3/FeaturedPropertiesSection';
import TargetAudiencesSection from '@/components/home-v3/TargetAudiencesSection';
import RealEstateServicesSection from '@/components/home-v3/RealEstateServicesSection';
import MarketingDeskBanner from '@/components/home-v3/MarketingDeskBanner';
import ClientTestimonialsSection from '@/components/home-v3/ClientTestimonialsSection';
import BranchContactSection from '@/components/BranchContactSection';
import BlogSection from '@/components/home-v3/BlogSection';

export default function HomeVersion3Page() {
  return (
    <main className="min-h-screen overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* 1. Sticky Luxury Navbar with Language & Theme Toggles */}
      <Navbar />

      {/* 2. Hero Section: Headline, Interactive 3-Sector Tabs & Verified Stats */}
      <HeroSection />

      {/* 3. National Trust & Accreditations: FAL License, SBC Code, SCA, Balady, ISO */}
      <TrustAccreditationsBar />

      {/* 4. Core Business Pillars: Hard Real Estate (FAL), Hard Contracting (SBC), Hard HVAC (AMC) */}
      <HardCoreDivisionsSection />

      {/* 5. Instant Interactive Project Cost & Timeline Estimator */}
      <InteractiveProjectCalculator />

      {/* 6. Comprehensive Group Capabilities & Services Matrix */}
      <ComprehensiveServicesMatrix />

      {/* 7. Prime Projects & Master Developments in KSA */}
      <PrimeProjectsSection />

      {/* 8. Featured Real Estate Opportunities & Prime Assets */}
      <FeaturedPropertiesSection />

      {/* 9. Target Audiences & Client Segments */}
      <TargetAudiencesSection />

      {/* 10. Specialized Real Estate Services & Marketing Capabilities */}
      <RealEstateServicesSection />

      {/* 11. Marketing Desk & Property Listing Banner */}
      <MarketingDeskBanner />

      {/* 12. Verified Client Testimonials & Institutional Track Record */}
      <ClientTestimonialsSection />

      {/* 13. Direct Multi-Branch Contact (Al Khobar HQ & Riyadh Office) */}
      <BranchContactSection />

      {/* 14. Real Estate & Engineering Market Intelligence Reports */}
      <BlogSection />

      {/* 15. Single High-Performance Strategic Marquee Ticker */}
      <MarqueeTicker
        labelKey="ticker.solutions"
        linkTextKey="ticker.servicesLink"
        linkHref="/services"
        bgDark={true}
      />

      {/* 16. Comprehensive Footer with Direct Hotlines, Portals & Newsletter */}
      <Footer />
    </main>
  );
}
