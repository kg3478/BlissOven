"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { getByCategory, CATEGORIES } from "@/lib/products";
import { ProductsGrid } from "@/components/ProductCard";

export default function ProductCollections() {
  const [activeCategory, setActiveCategory] = useState("Baked Cakes");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const filtered = getByCategory(activeCategory);

  return (
    <section id="collections" className="py-24 md:py-32 bg-[#FAF6F1] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(201,168,76,0.06),transparent)]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="gold-divider w-12" />
            <span className="section-label">Our Collections</span>
            <div className="gold-divider w-12" />
          </div>
          <h2
            className="text-[#1A0D05] mb-5 leading-snug"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700 }}
          >
            Crafted With{" "}
            <span className="text-gradient-gold italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Devotion
            </span>
          </h2>
          <p
            className="text-[#6B3F26]/70 max-w-xl mx-auto text-center leading-[1.8] text-[15px]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Every creation is made to order, crafted fresh, and delivered with love. Explore our full range of handcrafted desserts.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-x-4 gap-y-4 mb-10"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-[11px] font-semibold tracking-widest uppercase transition-all duration-300 border ${
                  isActive
                    ? "bg-[#1A0D05] border-[#C9A84C] text-[#C9A84C] shadow-[0_4px_20px_rgba(201,168,76,0.2)]"
                    : "bg-white/60 border-[rgba(201,168,76,0.2)] text-[#6B3F26] hover:border-[#C9A84C] hover:text-[#1A0D05]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Category Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="text-center mb-14"
          >
            <p
              className="text-[#C9A84C] italic text-lg leading-[1.8] max-w-xl mx-auto text-center"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              ✦ {CATEGORIES.find((c) => c.name === activeCategory)?.description} ✦
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {filtered.length > 0 ? (
              <ProductsGrid products={filtered} />
            ) : (
              <div className="text-center py-20">
                <p className="text-[#6B3F26]/50 text-lg leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
                  Coming soon — seasonal magic in the making ✨
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Custom Order CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-[#6B3F26]/60 mb-5 text-sm italic leading-[1.8] text-center" style={{ fontFamily: "'Lora', serif" }}>
            Don't see what you're looking for? We take custom orders.
          </p>
          <a
            href="https://wa.me/919999999999?text=Hi%20BlissOven!%20I%20have%20a%20custom%20order%20request."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic btn-dark"
          >
            Request Custom Order
          </a>
        </motion.div>
      </div>
    </section>
  );
}
