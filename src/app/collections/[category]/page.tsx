"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductsGrid } from "@/components/ProductCard";
import { getByCategory, CATEGORIES } from "@/lib/products";
import { CATEGORY_VISUALS } from "@/components/ProductCollections";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = params?.category as string;

  // Find matching category from list
  const matchedCategory = CATEGORIES.find(
    (cat) => cat.name.toLowerCase().replace(/ /g, "-") === categorySlug
  );

  const categoryName = matchedCategory ? matchedCategory.name : null;
  const products = categoryName ? getByCategory(categoryName) : [];

  // Fallback to Baked Cakes styling if category doesn't have visuals defined
  const visuals = categoryName
    ? CATEGORY_VISUALS[categoryName] || CATEGORY_VISUALS["Baked Cakes"]
    : CATEGORY_VISUALS["Baked Cakes"];

  if (!categoryName) {
    return (
      <main className="min-h-screen bg-[#FAF6F1] text-[#1A0D05] selection:bg-[#C9A84C] selection:text-[#1A0D05] flex flex-col relative overflow-hidden animate-fadeIn">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center py-32 px-6 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_40%,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none" />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-md mx-auto"
          >
            <span className="text-6xl mb-6 block select-none">🧐</span>
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-[#1A0D05] mb-4">
              Category Not Found
            </h1>
            <p className="text-[#6B3F26]/70 font-lora text-sm leading-relaxed mb-8">
              We couldn't find the sweet variety you are looking for. It might have been moved or renamed.
            </p>
            <button
              onClick={() => router.push("/")}
              className="btn-magnetic btn-dark inline-flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back to Home
            </button>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF6F1] text-[#1A0D05] selection:bg-[#C9A84C] selection:text-[#1A0D05] flex flex-col relative overflow-x-hidden animate-fadeIn">
      {/* Global Navigation */}
      <Navbar />

      {/* Hero Banner Section */}
      <div className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 px-6 text-center" style={{ background: visuals.bg }}>
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: visuals.pattern }} />
        
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='256' height='256' fill='%23fff' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Soft radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${visuals.glow} 0%, transparent 70%)`
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Floating emoji */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.1 }}
            className="text-6xl md:text-8xl mb-6 select-none"
            style={{ filter: `drop-shadow(0 0 20px ${visuals.glow})` }}
          >
            {matchedCategory?.emoji}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: visuals.textColor,
              textShadow: `0 0 30px ${visuals.glow}`
            }}
          >
            {categoryName}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-xl max-w-xl mx-auto mb-8 font-light italic leading-relaxed"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: visuals.subColor
            }}
          >
            ✦ {matchedCategory?.description} ✦
          </motion.p>

          {/* Return Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => router.push("/#collections")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 backdrop-blur-md cursor-pointer"
            style={{
              borderColor: `${visuals.accent}40`,
              background: `rgba(255, 255, 255, 0.04)`,
              color: visuals.textColor,
              boxShadow: `0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)`,
            }}
            whileHover={{
              scale: 1.05,
              background: `rgba(255, 255, 255, 0.08)`,
              borderColor: visuals.accent,
              boxShadow: `0 0 15px ${visuals.accent}40, 0 4px 20px rgba(0,0,0,0.3)`
            }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </motion.button>
        </div>
      </div>

      {/* Products Grid Section */}
      <div className="py-16 md:py-24 relative flex-grow">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(201,168,76,0.02)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Sub-Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b border-[#6B3F26]/10 pb-6">
            <div>
              <h2 className="text-[#1A0D05] text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our Menu
              </h2>
              <p className="text-[#6B3F26]/60 text-xs md:text-sm mt-1" style={{ fontFamily: "'Lora', serif" }}>
                {products.length} {products.length === 1 ? 'variety' : 'varieties'} available
              </p>
            </div>
            <div className="text-xs md:text-sm text-[#C9A84C] font-semibold italic flex items-center gap-1.5" style={{ fontFamily: "'Lora', serif" }}>
              <Sparkles className="w-4 h-4 animate-pulse text-[#C9A84C]" />
              ✦ Freshly Baked to Order ✦
            </div>
          </div>

          {/* Grid Render */}
          {products.length > 0 ? (
            <ProductsGrid products={products} />
          ) : (
            <div className="text-center py-20 bg-white/40 rounded-3xl border border-[#6B3F26]/5 backdrop-blur-sm p-8">
              <p className="text-4xl mb-4 select-none animate-bounce">✨</p>
              <p className="text-[#6B3F26]/70 text-xl font-medium mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Seasonal Magic in the Making
              </p>
              <p className="text-[#6B3F26]/50 max-w-md mx-auto text-sm leading-relaxed mb-6" style={{ fontFamily: "'Lora', serif" }}>
                Our patisserie chefs are currently crafting and refining recipes for this selection. Check back soon or request a custom order!
              </p>
              <button
                onClick={() => router.push("/")}
                className="btn-magnetic btn-dark cursor-pointer"
              >
                Explore Other Categories
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Luxury Footer */}
      <Footer />
    </main>
  );
}
