'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MarqueeTicker from '@/components/MarqueeTicker';
import HeroSection from '@/components/home-v3/HeroSection';
import AboutSection from '@/components/home-v3/AboutSection';
import ServicesSection from '@/components/home-v3/ServicesSection';
import WhyChooseUsSection from '@/components/home-v3/WhyChooseUsSection';
import PricingSection from '@/components/home-v3/PricingSection';
import TeamSection from '@/components/home-v3/TeamSection';
import ProjectsSection from '@/components/home-v3/ProjectsSection';
import SkillsSection from '@/components/home-v3/SkillsSection';
import TestimonialsSection from '@/components/home-v3/TestimonialsSection';
import BlogSection from '@/components/home-v3/BlogSection';

export default function HomeVersion3Page() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Sticky Luxury Navbar with Language & Theme Toggles */}
      <Navbar />

      {/* 1. Hero Section (Home Version 3 Metal Edition) */}
      <HeroSection />

      {/* 2. Running Marquee Ticker 1 */}
      <MarqueeTicker
        labelKey="ticker.solutions"
        linkTextKey="ticker.servicesLink"
        linkHref="/services"
        bgDark={false}
      />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Running Marquee Ticker 2 */}
      <MarqueeTicker
        labelKey="ticker.reliable"
        linkTextKey="ticker.contactLink"
        linkHref="/contact-us"
        reverse={true}
        bgDark={true}
      />

      {/* 6. Why Choose Us Section with Video Teaser */}
      <WhyChooseUsSection />

      {/* 7. Pricing Section */}
      <PricingSection />

      {/* 8. Running Marquee Ticker 3 */}
      <MarqueeTicker
        labelKey="ticker.precision"
        linkTextKey="ticker.quoteLink"
        linkHref="/contact-us"
        bgDark={false}
      />

      {/* 9. Team Section */}
      <TeamSection />

      {/* 10. Projects Section */}
      <ProjectsSection />

      {/* 11. Skills & Who We Are Section */}
      <SkillsSection />

      {/* 12. Testimonials Section */}
      <TestimonialsSection />

      {/* 13. Blog Section */}
      <BlogSection />

      {/* 14. Footer with Newsletter & Quick Links */}
      <Footer />
    </main>
  );
}
