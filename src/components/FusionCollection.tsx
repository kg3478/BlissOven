"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const fusionItems = [
  {
    name: "Rasmalai Cake",
    tag: "Saffron · Cardamom · Rose",
    desc: "The beloved mithai reimagined as a showstopping celebration cake. Saffron-cardamom cream, rose petal frosting, rasmalai filling.",
    emoji: "🌸",
    image: "/products/baked-fusion/rasmalai-cake",
    gradient: "linear-gradient(135deg,#FFF8E7,#F5E6C8,#E8D5A0)",
    accentColor: "#B8860B",
    overlayFrom: "rgba(26,13,5,0.55)",
    overlayTo: "rgba(26,13,5,0.15)",
  },
  {
    name: "Gulab Jamun Cake",
    tag: "Rose · Syrup · Kesar",
    desc: "Mini gulab jamuns nestled between rose-syrup-soaked sponge layers with kesar cream — pure festive indulgence.",
    emoji: "🌺",
    image: "/products/baked-fusion/gulab-jamun-cake",
    gradient: "linear-gradient(135deg,#FFF0E8,#FFDCC8,#FFB899)",
    accentColor: "#D2691E",
    overlayFrom: "rgba(26,13,5,0.55)",
    overlayTo: "rgba(26,13,5,0.15)",
  },
  {
    name: "Mango Cake",
    tag: "Alphonso · Summer · Tropical",
    desc: "Pure Alphonso mango pulp whipped into cloud-like cream, layered over moist sponge. Summer's finest gift.",
    emoji: "🥭",
    image: "/products/baked-fusion/mango-cake",
    gradient: "linear-gradient(135deg,#FFFDE7,#FFF9C4,#FFEE58)",
    accentColor: "#F57F17",
    overlayFrom: "rgba(26,13,5,0.55)",
    overlayTo: "rgba(26,13,5,0.15)",
  },
  {
    name: "Kesar Pista Cake",
    tag: "Saffron · Pistachio · Regal",
    desc: "Royal saffron-pistachio cream frosted over rose-flavoured sponge — a regal celebration in every slice.",
    emoji: "👑",
    image: "/products/baked-fusion/kesar-pista-cake",
    gradient: "linear-gradient(135deg,#F0FFF0,#DCEDC8,#C5E1A5)",
    accentColor: "#33691E",
    overlayFrom: "rgba(26,13,5,0.55)",
    overlayTo: "rgba(26,13,5,0.15)",
  },
];

function FusionCard({ item, index }: { item: typeof fusionItems[0]; index: number }) {
  const [attempt, setAttempt] = useState<"jpg" | "png" | "none">("jpg");
  const hasBaseImage = item.image && item.image !== "";
  const imgSrc = hasBaseImage && attempt !== "none" ? `${item.image}.${attempt}` : null;
  const onImgError = () => {
    if (attempt === "jpg") setAttempt("png");
    else setAttempt("none");
  };
  const hasImage = !!imgSrc;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative overflow-hidden rounded-3xl cursor-pointer"
      style={{
        minHeight: "380px",
        background: hasImage ? "#1A0D05" : item.gradient,
      }}
    >
      {/* Real photo background */}
      {hasImage && (
        <img
          src={imgSrc!}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
          onError={onImgError}
        />
      )}

      {/* Gradient overlay — darker at bottom for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: hasImage
            ? `linear-gradient(to top, ${item.overlayFrom} 0%, ${item.overlayTo} 55%, rgba(0,0,0,0.08) 100%)`
            : "none",
          transition: "background 0.4s ease",
        }}
      />

      {/* Hover: deepen overlay slightly */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: hasImage
            ? "linear-gradient(to top, rgba(26,13,5,0.3) 0%, transparent 60%)"
            : `linear-gradient(135deg, ${item.accentColor}22, transparent)`,
        }}
      />

      {/* Shimmer for non-image cards */}
      {!hasImage && <div className="absolute inset-0 shimmer opacity-20" />}

      {/* Border on hover */}
      <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-[rgba(201,168,76,0.5)] transition-all duration-500 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end h-full" style={{ minHeight: "380px" }}>
        {/* Emoji (only for non-image fallback) */}
        {!hasImage && (
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl mb-5 text-center"
          >
            {item.emoji}
          </motion.div>
        )}

        {/* Tag */}
        <div
          className="text-[10px] tracking-[0.25em] uppercase mb-2 font-semibold"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: hasImage ? "#C9A84C" : item.accentColor,
          }}
        >
          {item.tag}
        </div>

        {/* Name */}
        <h3
          className="mb-3 leading-snug"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.8rem",
            fontWeight: 700,
            color: hasImage ? "#FAF6F1" : "#1A0D05",
          }}
        >
          {item.name}
        </h3>

        {/* Description */}
        <p
          className="leading-[1.8] mb-7 max-w-sm"
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "0.88rem",
            color: hasImage ? "rgba(250,246,241,0.82)" : "#3D1F0A",
          }}
        >
          {item.desc}
        </p>

        {/* CTA Row */}
        <div className="flex items-center gap-5">
          <span
            className="font-bold text-lg"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: hasImage ? "#C9A84C" : item.accentColor,
            }}
          >
            ₹XXX
          </span>
          <a
            href={`https://wa.me/919999999999?text=Hi%20BlissOven!%20I'd%20like%20to%20order%20your%20${encodeURIComponent(item.name)}.%20Please%20share%20details.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: hasImage ? "#C9A84C" : item.accentColor,
              color: "#FAF6F1",
            }}
          >
            Order Now
          </a>
        </div>
      </div>

      {/* Decorative circle (non-image only) */}
      {!hasImage && (
        <div
          className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-20"
          style={{ background: item.accentColor }}
        />
      )}
    </motion.div>
  );
}

export default function FusionCollection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="fusion" className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#FAF6F1" }}>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(201,168,76,0.04),transparent)]" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(232,197,71,0.08),transparent)] blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="gold-divider w-12" />
            <span className="section-label">Baked Fusion</span>
            <div className="gold-divider w-12" />
          </div>
          <h2
            className="text-[#1A0D05] mb-5 leading-snug"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700 }}
          >
            Royal Indian{" "}
            <span className="text-gradient-gold italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Signatures
            </span>
          </h2>
          <p
            className="text-[#6B3F26]/70 max-w-xl mx-auto text-center leading-[1.8] text-[15px]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Where centuries-old Indian dessert traditions meet European patisserie artistry. These are our most celebrated, most requested creations.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fusionItems.map((item, i) => (
            <FusionCard key={item.name} item={item} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-[#6B3F26]/50 text-sm italic leading-relaxed text-center" style={{ fontFamily: "'Lora', serif" }}>
            ✦ All fusion cakes require 36–48 hours advance notice for preparation ✦
          </p>
        </motion.div>
      </div>
    </section>
  );
}
