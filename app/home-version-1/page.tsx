'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MarqueeTicker from '@/components/MarqueeTicker';
import HeroSection from '@/components/home-v3/HeroSection';
import AboutSection from '@/components/home-v3/AboutSection';
import ServicesSection from '@/components/home-v3/ServicesSection';
import WhyChooseUsSection from '@/components/home-v3/WhyChooseUsSection';
import ProjectsSection from '@/components/home-v3/ProjectsSection';
import TeamSection from '@/components/home-v3/TeamSection';
import TestimonialsSection from '@/components/home-v3/TestimonialsSection';
import BlogSection from '@/components/home-v3/BlogSection';

export default function HomeVersion1Page() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <HeroSection />

      <MarqueeTicker
        labelKey="ticker.solutions"
        linkTextKey="ticker.servicesLink"
        linkHref="/services"
      />

      <AboutSection />

      <ServicesSection />

      <ProjectsSection />

      <WhyChooseUsSection />

      <TeamSection />

      <TestimonialsSection />

      <BlogSection />

      <Footer />
    </main>
  );
}
