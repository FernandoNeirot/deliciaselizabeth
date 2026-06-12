"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LatestProducts from "@/components/LatestProducts";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LatestProducts />
        <TestimonialsSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
