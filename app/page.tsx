'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home-v3/HeroSection';
import TrustAccreditationsBar from '@/components/TrustAccreditationsBar';
import AboutSection from '@/components/home-v3/AboutSection';
import HardCoreDivisionsSection from '@/components/HardCoreDivisionsSection';
import ComprehensiveServicesMatrix from '@/components/ComprehensiveServicesMatrix';
import FeaturedPropertiesSection from '@/components/home-v3/FeaturedPropertiesSection';
import PrimeProjectsSection from '@/components/home-v3/PrimeProjectsSection';
import InteractiveProjectCalculator from '@/components/InteractiveProjectCalculator';
import WhyChooseUsSection from '@/components/home-v3/WhyChooseUsSection';
import RealEstateServicesSection from '@/components/home-v3/RealEstateServicesSection';
import TargetAudiencesSection from '@/components/home-v3/TargetAudiencesSection';
import MarketingDeskBanner from '@/components/home-v3/MarketingDeskBanner';
import ClientTestimonialsSection from '@/components/home-v3/ClientTestimonialsSection';
import TeamSection from '@/components/home-v3/TeamSection';
import BlogSection from '@/components/home-v3/BlogSection';
import BranchContactSection from '@/components/BranchContactSection';

export default function HomeVersion3Page() {
  return (
    <main className="min-h-screen overflow-x-hidden selection:bg-[#DEDBC8] selection:text-black bg-black text-[#E1E0CC]">
      {/* 1. Sticky Luxury Navbar with Language & Theme Toggles */}
      <Navbar />

      {/* 2. Hero Section: Cinematic High-Impact Inset Container with GPU Acceleration */}
      <HeroSection />

      {/* 3. National Trust & Accreditations: FAL License, SBC Code, SCA, Balady */}
      <TrustAccreditationsBar />

      {/* 4. Cinematic About Card: WordsPullUpMultiStyle & Scroll-Linked Text Reveal */}
      <AboutSection />

      {/* 5. Core Business Pillars: Hard Real Estate (FAL), Hard Contracting (SBC), Hard HVAC (AMC) */}
      <HardCoreDivisionsSection />

      {/* 6. Comprehensive Multi-Disciplinary Services Matrix */}
      <ComprehensiveServicesMatrix />

      {/* 7. Featured Real Estate & Prime Development Opportunities in KSA */}
      <FeaturedPropertiesSection />

      {/* 8. Master Strategic & Off-Plan Projects */}
      <PrimeProjectsSection />

      {/* 9. Interactive Turnkey Project & Investment Calculator */}
      <InteractiveProjectCalculator />

      {/* 10. Why Choose HARD Group & Execution Standards */}
      <WhyChooseUsSection />

      {/* 11. End-to-End Real Estate Brokerage & Development Services */}
      <RealEstateServicesSection />

      {/* 12. Strategic Client Profiles & Target Audiences */}
      <TargetAudiencesSection />

      {/* 13. Direct Brokerage & Exclusive Marketing Desk Callout */}
      <MarketingDeskBanner />

      {/* 14. Verified Client Testimonials & Institutional Endorsements */}
      <ClientTestimonialsSection />

      {/* 15. Executive Leadership & Engineering Team */}
      <TeamSection />

      {/* 16. Technical Blog & Market Intelligence Insights */}
      <BlogSection />

      {/* 17. Direct Multi-Branch Contact (Al Khobar HQ & Riyadh Office) */}
      <BranchContactSection />

      {/* 18. Comprehensive Footer with Direct Hotlines, Portals & Real-time Newsletter */}
      <Footer />
    </main>
  );
}

