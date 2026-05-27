"use client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCollections from "@/components/ProductCollections";
import FusionCollection from "@/components/FusionCollection";
import ChefStory from "@/components/ChefStory";
import WhyBlissOven from "@/components/WhyBlissOven";
import BrownieBoxBuilder from "@/components/BrownieBoxBuilder";

import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF6F1] text-[#1A0D05] selection:bg-[#C9A84C] selection:text-[#1A0D05] overflow-x-hidden relative">
      {/* Global Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Filterable Menu Collections */}
      <ProductCollections />

      {/* Interactive Brownie Box Builder */}
      <BrownieBoxBuilder />

      {/* Signature Indian Royal Fusion Cakes */}
      <FusionCollection />

      {/* Chef Story Section */}
      <ChefStory />



      {/* Why BlissOven Core Values */}
      <WhyBlissOven />


      {/* Luxury Footer */}
      <Footer />
    </main>
  );
}
