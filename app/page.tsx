'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home-v3/HeroSection';
import TrustAccreditationsBar from '@/components/TrustAccreditationsBar';
import AboutSection from '@/components/home-v3/AboutSection';
import HardCoreDivisionsSection from '@/components/HardCoreDivisionsSection';
import FeaturedPropertiesSection from '@/components/home-v3/FeaturedPropertiesSection';
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

      {/* 6. Featured Real Estate & Prime Development Opportunities in KSA */}
      <FeaturedPropertiesSection />

      {/* 7. Direct Multi-Branch Contact (Al Khobar HQ & Riyadh Office) */}
      <BranchContactSection />

      {/* 8. Comprehensive Footer with Direct Hotlines, Portals & Real-time Newsletter */}
      <Footer />
    </main>
  );
}
