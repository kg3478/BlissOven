"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

const heroSlides = [
  {
    headline: "Crafted for",
    highlight: "Celebrations.",
    sub: "Every cake tells a story. Every bite holds a memory.",
    tag: "Signature Collection",
  },
  {
    headline: "Luxury Desserts.",
    highlight: "Handmade Memories.",
    sub: "Premium ingredients. Artisan techniques. Pure indulgence.",
    tag: "Baked with Love",
  },
  {
    headline: "Where Cakes",
    highlight: "Become Art.",
    sub: "Handcrafted daily by Komal Agarwal — your celebration deserves the finest.",
    tag: "Artisan Patisserie",
  },
];

const floatingCards = [
  { label: "Chocolate Truffle", emoji: "🍫", delay: 0, x: "5%", y: "25%" },
  { label: "Red Velvet", emoji: "🎂", delay: 0.8, x: "85%", y: "20%" },
  { label: "Biscoff Brownie", emoji: "✨", delay: 1.6, x: "80%", y: "65%" },
  { label: "Rasmalai Cake", emoji: "🌸", delay: 2.4, x: "6%", y: "68%" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const bgX = useTransform(springX, [0, 1], ["-2%", "2%"]);
  const bgY = useTransform(springY, [0, 1], ["-2%", "2%"]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A0D05]">
      {/* ─── Parallax BG ─────────────────────────────────────── */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-[-4%] z-0"
      >
        {/* Deep layered gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A0D05] via-[#2C1810] to-[#3D1F0A]" />
        {/* Gold radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(201,168,76,0.12),transparent)]" />
        {/* Top vignette */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#1A0D05] to-transparent" />
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-[#1A0D05] to-transparent" />
      </motion.div>

      {/* ─── Floating Particles ───────────────────────────────── */}
      <Particles />

      {/* ─── Floating Product Cards ───────────────────────────── */}
      {floatingCards.map((card) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: card.delay + 1.5, duration: 0.8 }}
          className="absolute hidden lg:flex items-center gap-2 glass-card px-4 py-2.5 z-10"
          style={{ left: card.x, top: card.y }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + card.delay, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2"
          >
            <span className="text-lg">{card.emoji}</span>
            <span
              className="text-[11px] font-medium text-[#FAF6F1]/80 whitespace-nowrap tracking-wide"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {card.label}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* ─── Main Content ─────────────────────────────────────── */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 py-20">
        {/* Tag */}
        <motion.div
          key={`tag-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="gold-divider w-8" />
          <span className="section-label">{slide.tag}</span>
          <div className="gold-divider w-8" />
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            key={`h1-${current}`}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[#FAF6F1] leading-[1.2]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
              fontWeight: 700,
            }}
          >
            {slide.headline}
          </motion.h1>
        </div>

        {/* Highlight */}
        <div className="overflow-hidden mb-6">
          <motion.div
            key={`hl-${current}`}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-gradient-gold leading-[1.2] italic"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 7.5vw, 7rem)",
              fontWeight: 600,
            }}
          >
            {slide.highlight}
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          key={`sub-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[#FAF6F1]/60 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {slide.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/919999999999?text=Hi%20BlissOven!%20I'd%20like%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            id="hero-order-btn"
            className="btn-magnetic btn-primary flex items-center gap-2 text-sm"
          >
            <Sparkles size={14} />
            Order Now
          </a>
          <a
            href="#collections"
            id="hero-explore-btn"
            className="btn-magnetic btn-outline text-sm"
          >
            Explore Menu
          </a>
        </motion.div>

        {/* Slide Dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 rounded-full ${
                i === current
                  ? "w-8 h-1.5 bg-[#C9A84C]"
                  : "w-1.5 h-1.5 bg-[rgba(201,168,76,0.3)]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ─── Scroll Indicator ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] tracking-[0.25em] text-[rgba(201,168,76,0.5)] uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[rgba(201,168,76,0.5)] to-transparent"
        />
      </motion.div>

      {/* ─── Stats Bar ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-[rgba(201,168,76,0.1)]"
      >
        <div className="max-w-4xl mx-auto px-6 py-5 grid grid-cols-3 gap-4">
          {[
            { num: "500+", label: "Happy Customers" },
            { num: "30+", label: "Artisan Creations" },
            { num: "100%", label: "Made to Order" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-gradient-gold font-display text-xl md:text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.num}
              </div>
              <div
                className="text-[10px] md:text-xs text-[rgba(201,168,76,0.5)] tracking-widest uppercase mt-0.5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Particles() {
  const particles = Array.from({ length: 24 }, (_, i) => i);
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((i) => {
        const size = ((i * 7) % 3) + 1;
        const duration = ((i * 13) % 15) + 10;
        const delay = (i * 3) % 10;
        const left = (i * 17) % 100;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#C9A84C]"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: "-10px",
              opacity: 0,
            }}
            animate={{
              y: [0, -1000],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
