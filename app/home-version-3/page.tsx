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
      <Navbar />
      <HeroSection />
      <MarqueeTicker
        labelKey="ticker.solutions"
        linkTextKey="ticker.servicesLink"
        linkHref="/services"
        bgDark={false}
      />
      <AboutSection />
      <ServicesSection />
      <MarqueeTicker
        labelKey="ticker.reliable"
        linkTextKey="ticker.contactLink"
        linkHref="/contact-us"
        reverse={true}
        bgDark={true}
      />
      <WhyChooseUsSection />
      <PricingSection />
      <MarqueeTicker
        labelKey="ticker.precision"
        linkTextKey="ticker.quoteLink"
        linkHref="/contact-us"
        bgDark={false}
      />
      <TeamSection />
      <ProjectsSection />
      <SkillsSection />
      <TestimonialsSection />
      <BlogSection />
      <Footer />
    </main>
  );
}
