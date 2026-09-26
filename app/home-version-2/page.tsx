'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MarqueeTicker from '@/components/MarqueeTicker';
import HeroSection from '@/components/home-v3/HeroSection';
import AboutSection from '@/components/home-v3/AboutSection';
import ServicesSection from '@/components/home-v3/ServicesSection';
import ProjectsSection from '@/components/home-v3/ProjectsSection';
import PricingSection from '@/components/home-v3/PricingSection';
import SkillsSection from '@/components/home-v3/SkillsSection';
import TestimonialsSection from '@/components/home-v3/TestimonialsSection';
import BlogSection from '@/components/home-v3/BlogSection';

export default function HomeVersion2Page() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <HeroSection />

      <MarqueeTicker
        labelKey="ticker.solutions"
        linkTextKey="nav.projects"
        linkHref="/projects"
        bgDark={false}
      />

      <AboutSection />

      <ServicesSection />

      <SkillsSection />

      <ProjectsSection />

      <PricingSection />

      <TestimonialsSection />

      <BlogSection />

      <Footer />
    </main>
  );
}
