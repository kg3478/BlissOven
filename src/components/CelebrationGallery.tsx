"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";



const galleryItems = [
  { id: 1, label: "Birthday Celebration", h: 340, gradient: "linear-gradient(135deg,#D4B896,#E8D5B7,#FAF6F1)", emoji: "🎂",  image: "/gallery/birthday-celebration" },
  { id: 2, label: "Wedding Cake",         h: 260, gradient: "linear-gradient(135deg,#E8D5B7,#FAF6F1,#F5EFE6)", emoji: "💍",  image: "/gallery/wedding-cake" },
  { id: 3, label: "Anniversary Special",  h: 300, gradient: "linear-gradient(135deg,#C9A84C,#E4C76B,#FAF6F1)", emoji: "🌹",  image: "/gallery/anniversary-special" },
  { id: 4, label: "Chocolate Box",        h: 280, gradient: "linear-gradient(135deg,#3D1F0A,#6B3F26,#8B5E3C)", emoji: "🍫",  image: "/gallery/chocolate-box" },
  { id: 5, label: "Gift Hamper",          h: 360, gradient: "linear-gradient(135deg,#FAF6F1,#E8D5B7,#D4B896)", emoji: "🎁",  image: "/gallery/gift-hamper" },
  { id: 6, label: "Festival Cake",        h: 240, gradient: "linear-gradient(135deg,#E8C547,#D4A017,#B8860B)", emoji: "✨",  image: "/gallery/festival-cake" },
  { id: 7, label: "Cheesecake Platter",   h: 320, gradient: "linear-gradient(135deg,#E8D5E8,#D4B8D4,#BFA0BF)", emoji: "🍰",  image: "/gallery/cheesecake-platter" },
  { id: 8, label: "Brownie Tower",        h: 270, gradient: "linear-gradient(135deg,#2C1810,#3D1F0A,#6B3F26)", emoji: "🍫",  image: "/gallery/brownie-tower" },
  { id: 9, label: "Cookie Bouquet",       h: 290, gradient: "linear-gradient(135deg,#D4A017,#B8860B,#8B6914)", emoji: "🍪",  image: "/gallery/cookie-bouquet" },
];

// Tries jpg → png → null (gradient fallback)
function useImageSrc(base: string) {
  const [attempt, setAttempt] = useState<"jpg" | "png" | "none">("jpg");
  const src = attempt === "none" ? null : `${base}.${attempt}`;
  const onError = () => {
    if (attempt === "jpg") setAttempt("png");
    else setAttempt("none");
  };
  return { src, onError };
}

function GalleryItem({ item, index }: { item: typeof galleryItems[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { src: imgSrc, onError: onImgError } = useImageSrc(item.image);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const hasImage = !!imgSrc;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.07 }}
      className="masonry-item relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{ height: item.h, background: hasImage ? "#1A0D05" : item.gradient }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Real photo — tries jpg then png automatically */}
      {hasImage && (
        <img
          src={imgSrc!}
          alt={item.label}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)" }}
          onError={onImgError}
        />
      )}

      {/* Gradient fallback decorations */}
      {!hasImage && (
        <>
          <div className="absolute inset-0 shimmer opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent)]" />
          <motion.div
            animate={{ scale: hovered ? 1.15 : 1, rotate: hovered ? 5 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center text-6xl select-none"
          >
            {item.emoji}
          </motion.div>
        </>
      )}

      {/* Persistent label overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D05]/75 via-transparent to-transparent" />

      {/* Label — always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className="text-[#FAF6F1] font-semibold text-sm mb-0.5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {item.label}
        </p>
        <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
          By BlissOven ✦
        </p>
      </div>
    </motion.div>
  );
}

export default function CelebrationGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#F5EFE6] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(201,168,76,0.07),transparent)]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="gold-divider w-12" />
            <span className="section-label">Celebration Gallery</span>
            <div className="gold-divider w-12" />
          </div>
          <h2
            className="text-[#1A0D05] mb-5 leading-snug"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700 }}
          >
            Every Moment,{" "}
            <span className="text-gradient-gold italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Sweetened
            </span>
          </h2>
          <p className="text-[#6B3F26]/70 max-w-xl mx-auto text-center leading-[1.8] text-[15px]" style={{ fontFamily: "'Lora', serif" }}>
            From intimate birthday cakes to grand wedding centrepieces — BlissOven turns every occasion into a masterpiece.
          </p>
        </motion.div>



        {/* Masonry Grid */}
        <div className="masonry-grid">
          {galleryItems.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-[#6B3F26]/60 mb-5 italic text-sm text-center leading-[1.8]" style={{ fontFamily: "'Lora', serif" }}>
            Planning a celebration? We'd love to be part of it.
          </p>
          <a
            href="https://wa.me/919999999999?text=Hi%20BlissOven!%20I'd%20like%20to%20order%20a%20custom%20celebration%20cake."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic btn-dark"
          >
            Plan Your Celebration
          </a>
        </motion.div>
      </div>
    </section>
  );
}
