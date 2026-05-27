"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { CATEGORIES } from "@/lib/products";

// Rich, unique premium color palette for each category
export const CATEGORY_VISUALS: Record<string, {
  bg: string;
  accent: string;
  glow: string;
  particle: string;
  textColor: string;
  subColor: string;
  border: string;
  activeBg: string;
  pattern: string;
}> = {
  "Baked Cakes": {
    bg: "linear-gradient(135deg, #1a0533 0%, #3d0f6e 40%, #6b21a8 70%, #9333ea 100%)",
    accent: "#e879f9",
    glow: "rgba(168,85,247,0.5)",
    particle: "💜",
    textColor: "#f5d0fe",
    subColor: "#d8b4fe",
    border: "rgba(168,85,247,0.6)",
    activeBg: "linear-gradient(135deg, #581c87, #9333ea)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(232,121,249,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147,51,234,0.3) 0%, transparent 50%)",
  },
  "Baked Fusion": {
    bg: "linear-gradient(135deg, #1c0a00 0%, #7c2d12 40%, #c2410c 70%, #f97316 100%)",
    accent: "#fb923c",
    glow: "rgba(249,115,22,0.5)",
    particle: "🔥",
    textColor: "#fed7aa",
    subColor: "#fdba74",
    border: "rgba(249,115,22,0.6)",
    activeBg: "linear-gradient(135deg, #9a3412, #ea580c)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(251,146,60,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(234,88,12,0.3) 0%, transparent 50%)",
  },
  "Non-Baked": {
    bg: "linear-gradient(135deg, #042f2e 0%, #0f766e 40%, #14b8a6 70%, #5eead4 100%)",
    accent: "#2dd4bf",
    glow: "rgba(20,184,166,0.5)",
    particle: "🍃",
    textColor: "#ccfbf1",
    subColor: "#99f6e4",
    border: "rgba(20,184,166,0.6)",
    activeBg: "linear-gradient(135deg, #134e4a, #0d9488)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(45,212,191,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(20,184,166,0.3) 0%, transparent 50%)",
  },
  "Cookies": {
    bg: "linear-gradient(135deg, #1c1100 0%, #713f12 40%, #ca8a04 70%, #eab308 100%)",
    accent: "#fbbf24",
    glow: "rgba(234,179,8,0.5)",
    particle: "🍪",
    textColor: "#fef9c3",
    subColor: "#fde68a",
    border: "rgba(234,179,8,0.6)",
    activeBg: "linear-gradient(135deg, #78350f, #b45309)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(251,191,36,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(234,179,8,0.3) 0%, transparent 50%)",
  },
  "Brownies": {
    bg: "linear-gradient(135deg, #0a0a0a 0%, #292524 40%, #57534e 70%, #a8a29e 100%)",
    accent: "#d6d3d1",
    glow: "rgba(168,162,158,0.4)",
    particle: "🍫",
    textColor: "#f5f5f4",
    subColor: "#d6d3d1",
    border: "rgba(168,162,158,0.5)",
    activeBg: "linear-gradient(135deg, #1c1917, #44403c)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(214,211,209,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168,162,158,0.2) 0%, transparent 50%)",
  },
  "Tea Time Munchies": {
    bg: "linear-gradient(135deg, #0c1a0a 0%, #14532d 40%, #16a34a 70%, #4ade80 100%)",
    accent: "#86efac",
    glow: "rgba(74,222,128,0.4)",
    particle: "☕",
    textColor: "#dcfce7",
    subColor: "#bbf7d0",
    border: "rgba(74,222,128,0.5)",
    activeBg: "linear-gradient(135deg, #166534, #15803d)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(134,239,172,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(74,222,128,0.3) 0%, transparent 50%)",
  },
  "Dark Chocolates": {
    bg: "linear-gradient(135deg, #020202 0%, #1a0a00 40%, #3d1505 70%, #7c3404 100%)",
    accent: "#d97706",
    glow: "rgba(217,119,6,0.5)",
    particle: "🖤",
    textColor: "#fef3c7",
    subColor: "#fde68a",
    border: "rgba(217,119,6,0.5)",
    activeBg: "linear-gradient(135deg, #1c0f00, #451a03)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(217,119,6,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124,52,4,0.3) 0%, transparent 50%)",
  },
  "White Centre Filled Chocolates": {
    bg: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #1d4ed8 70%, #60a5fa 100%)",
    accent: "#93c5fd",
    glow: "rgba(96,165,250,0.5)",
    particle: "🤍",
    textColor: "#eff6ff",
    subColor: "#bfdbfe",
    border: "rgba(96,165,250,0.5)",
    activeBg: "linear-gradient(135deg, #1e3a8a, #1d4ed8)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(147,197,253,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(96,165,250,0.3) 0%, transparent 50%)",
  },
  "Homemade Breads": {
    bg: "linear-gradient(135deg, #1c0e03 0%, #5c2c06 40%, #a15c14 70%, #d99a26 100%)",
    accent: "#fde68a",
    glow: "rgba(226,177,60,0.45)",
    particle: "🍞",
    textColor: "#fef3c7",
    subColor: "#fde68a",
    border: "rgba(226,177,60,0.5)",
    activeBg: "linear-gradient(135deg, #451a03, #78350f)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(226,177,60,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(217,119,6,0.3) 0%, transparent 50%)",
  },
};

function CategoryTile({
  cat,
  onClick,
  index,
}: {
  cat: { name: string; emoji: string; description: string };
  onClick: () => void;
  index: number;
}) {
  const visuals = CATEGORY_VISUALS[cat.name] || CATEGORY_VISUALS["Baked Cakes"];

  return (
    <motion.button
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative group cursor-pointer rounded-xl md:rounded-2xl overflow-hidden flex flex-col items-center justify-center p-3 md:p-6 min-h-[110px] md:min-h-[180px]"
      style={{
        border: "2px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
        transition: "all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: visuals.bg }}
      />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-80"
        style={{ background: visuals.pattern }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='256' height='256' fill='%23fff' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-2 py-3 md:px-4 md:py-6 gap-2 md:gap-3">
        {/* Emoji */}
        <motion.div
          className="text-2xl md:text-4xl leading-none"
        >
          {cat.emoji}
        </motion.div>

        {/* Category name */}
        <div className="text-center">
          <p
            className="font-bold leading-tight text-center text-[10px] md:text-sm"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "rgba(255,255,255,0.85)",
              transition: "all 0.35s ease",
            }}
          >
            {cat.name}
          </p>
        </div>
      </div>

      {/* Bottom accent bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </motion.button>
  );
}

export default function ProductCollections() {
  const ref = useRef(null);
  const router = useRouter();
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const slugify = (text: string) => text.toLowerCase().replace(/ /g, "-");

  const handleCategoryClick = (name: string) => {
    router.push(`/collections/${slugify(name)}`);
  };

  return (
    <section id="collections" className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FAF6F1 0%, #F0EAE0 60%, #FAF6F1 100%)" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(201,168,76,0.02)_0%,transparent_70%)] pointer-events-none" />

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

        {/* Category Tiles Grid: exactly 3 columns on mobile (fits 9 items in 3 rows!) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mb-14"
        >
          {CATEGORIES.map((cat, index) => (
            <CategoryTile
              key={cat.name}
              cat={cat}
              onClick={() => handleCategoryClick(cat.name)}
              index={index}
            />
          ))}
        </motion.div>

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
