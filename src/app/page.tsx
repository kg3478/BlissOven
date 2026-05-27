"use client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCollections from "@/components/ProductCollections";
import FusionCollection from "@/components/FusionCollection";
import ChefStory from "@/components/ChefStory";
import WhyBlissOven from "@/components/WhyBlissOven";
import BrownieBoxBuilder from "@/components/BrownieBoxBuilder";
import ChocolateBoxBuilder from "@/components/ChocolateBoxBuilder";

import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF6F1] text-[#1A0D05] selection:bg-[#C9A84C] selection:text-[#1A0D05] overflow-x-hidden relative">
      {/* Subtle Page-Wide Premium Bakery Background Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-[1]"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "100% auto",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Global Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Filterable Menu Collections */}
      <ProductCollections />

      {/* Interactive Brownie Box Builder */}
      <BrownieBoxBuilder />

      {/* Interactive Chocolate Box Builder */}
      <ChocolateBoxBuilder />

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
