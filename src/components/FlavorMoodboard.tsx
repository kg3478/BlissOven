"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const flavours = [
  {
    name: "Chocolate Truffle",
    tag: "Dark & Intense",
    desc: "Deep cocoa richness that melts into pure indulgence. Sophisticated, complex, unforgettable.",
    bg: "linear-gradient(135deg, #1A0D05 0%, #2C1810 40%, #3D1F0A 100%)",
    accent: "#C9A84C",
    textColor: "#FAF6F1",
    emoji: "🍫",
    particles: ["#C9A84C", "#E4C76B", "#8B6914"],
  },
  {
    name: "Strawberry",
    tag: "Floral & Fresh",
    desc: "Sun-ripened strawberries in every bite. Light, romantic, and impossibly beautiful.",
    bg: "linear-gradient(135deg, #FDEEF3 0%, #FBD7E3 40%, #F8BFCF 100%)",
    accent: "#C0305A",
    textColor: "#3D1F0A",
    emoji: "🍓",
    particles: ["#F8BFCF", "#E8A0B4", "#C0305A"],
  },
  {
    name: "Rasmalai",
    tag: "Royal & Aromatic",
    desc: "Saffron whispers, rose petals float — this is Indian luxury at its most exquisite.",
    bg: "linear-gradient(135deg, #FFF8E7 0%, #F5E6C8 40%, #E8D5A0 100%)",
    accent: "#B8860B",
    textColor: "#3D1F0A",
    emoji: "🌸",
    particles: ["#E8D5A0", "#C9A84C", "#B8860B"],
  },
  {
    name: "Lotus Biscoff",
    tag: "Caramel & Spiced",
    desc: "That irresistible caramelised warmth — perfectly balanced with our fudge base.",
    bg: "linear-gradient(135deg, #FDF0DC 0%, #F0D9A8 40%, #E0BE70 100%)",
    accent: "#8B4513",
    textColor: "#1A0D05",
    emoji: "✨",
    particles: ["#E0BE70", "#C9A84C", "#8B4513"],
  },
  {
    name: "Blueberry",
    tag: "Tangy & Vibrant",
    desc: "Wild blueberry compote over silky cream — a burst of colour and life in every slice.",
    bg: "linear-gradient(135deg, #EEF2FF 0%, #DDE3FF 40%, #C7D0FE 100%)",
    accent: "#4338CA",
    textColor: "#1E1B4B",
    emoji: "🫐",
    particles: ["#C7D0FE", "#A5B4FC", "#6366F1"],
  },
  {
    name: "Tiramisu",
    tag: "Coffee & Cream",
    desc: "Italian soulfulness — rich espresso, mascarpone clouds, cocoa dust. Pure romance.",
    bg: "linear-gradient(135deg, #FEF6EC 0%, #F5DEB3 40%, #DEB887 100%)",
    accent: "#6F4E37",
    textColor: "#1A0D05",
    emoji: "☕",
    particles: ["#DEB887", "#C19A6B", "#6F4E37"],
  },
];

export default function FlavorMoodboard() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const fl = flavours[active];

  return (
    <section
      id="flavours"
      ref={ref}
      className="relative pt-32 pb-40 md:pt-44 md:pb-52 overflow-hidden transition-all duration-700"
      style={{ background: fl.bg }}
    >
      {/* Floating particles */}
      <AnimatePresence>
        {fl.particles.map((color, i) => (
          <motion.div
            key={`${active}-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1, y: [-20, -80, -20] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 6 + i * 3,
              height: 6 + i * 3,
              background: color,
              left: `${20 + i * 25}%`,
              top: `${30 + (i % 2) * 30}%`,
            }}
          />
        ))}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="gold-divider w-12" />
            <span className="section-label" style={{ color: fl.accent }}>
              Flavour Experience
            </span>
            <div className="gold-divider w-12" />
          </div>
          <h2
            className="mb-5 leading-snug"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem,4vw,3.5rem)",
              fontWeight: 700,
              color: fl.textColor,
            }}
          >
            Choose Your{" "}
            <span
              className="italic"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: fl.accent }}
            >
              Mood
            </span>
          </h2>
          <p
            className="max-w-xl mx-auto text-center leading-[1.8] opacity-70 text-[15px]"
            style={{ fontFamily: "'Lora', serif", color: fl.textColor }}
          >
            Hover over each flavour and watch the world transform. Each taste is a universe.
          </p>
        </motion.div>

        {/* Flavour Selector Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-x-4 gap-y-5 mb-20"
        >
          {flavours.map((f, i) => (
            <button
              key={f.name}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-500 border-2 ${
                active === i
                  ? "scale-110 shadow-xl"
                  : "opacity-70 hover:opacity-100 hover:scale-105"
              }`}
              style={{
                fontFamily: "'Inter', sans-serif",
                borderColor: active === i ? fl.accent : "rgba(0,0,0,0.15)",
                background: active === i ? fl.accent : "rgba(255,255,255,0.45)",
                color: active === i ? (fl.textColor === "#FAF6F1" ? "#1A0D05" : "#FAF6F1") : fl.textColor,
                backdropFilter: "blur(10px)",
              }}
            >
              <span>{f.emoji}</span>
              <span>{f.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Active Flavour Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Emoji */}
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              {fl.emoji}
            </motion.div>

            {/* Tag */}
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-4 font-semibold"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: fl.accent + "20",
                color: fl.accent,
                border: `1px solid ${fl.accent}40`,
              }}
            >
              {fl.tag}
            </div>

            {/* Name */}
            <h3
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem,4vw,3rem)",
                fontWeight: 700,
                color: fl.textColor,
              }}
            >
              {fl.name}
            </h3>

            {/* Description */}
            <p
              className="text-lg leading-relaxed mb-8 opacity-75"
              style={{ fontFamily: "'Lora', serif", color: fl.textColor }}
            >
              {fl.desc}
            </p>

            {/* Order CTA */}
            <a
              href={`https://wa.me/919999999999?text=Hi%20BlissOven!%20I'd%20love%20to%20order%20your%20${encodeURIComponent(fl.name)}%20creation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm tracking-widest uppercase transition-all duration-300"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: fl.accent,
                color: fl.textColor === "#FAF6F1" ? "#1A0D05" : "#FAF6F1",
                boxShadow: `0 8px 30px ${fl.accent}50`,
              }}
            >
              Order {fl.name}
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-12">
          {flavours.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-400"
              style={{
                width: active === i ? 32 : 8,
                height: 8,
                background: active === i ? fl.accent : fl.accent + "40",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
