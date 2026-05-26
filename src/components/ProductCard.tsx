"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingBag, Star, Clock, Leaf } from "lucide-react";
import type { Product } from "@/lib/products";

// ─── Placeholder Image Component ────────────────────────────────────────────
function PlaceholderImage({
  product,
  height = 280,
}: {
  product: Product;
  height?: number;
}) {
  const gradients: Record<string, string> = {
    "Baked Cakes": "linear-gradient(135deg, #D4B896 0%, #E8D5B7 50%, #FAF6F1 100%)",
    "Baked Fusion":
      "linear-gradient(135deg, #E8C547 0%, #D4A017 50%, #B8860B 100%)",
    "Non-Baked": "linear-gradient(135deg, #E8D5E8 0%, #D4B8D4 50%, #BFA0BF 100%)",
    Cookies: "linear-gradient(135deg, #D4A017 0%, #B8860B 50%, #8B6914 100%)",
    Brownies: "linear-gradient(135deg, #3D1F0A 0%, #6B3F26 50%, #8B5E3C 100%)",
    "Tea Time Munchies":
      "linear-gradient(135deg, #D4C5A0 0%, #C4B080 50%, #B09050 100%)",
    "Dark Chocolates":
      "linear-gradient(135deg, #1A0D05 0%, #2C1810 50%, #3D1F0A 100%)",
    "White Centre Filled Chocolates":
      "linear-gradient(135deg, #FAF6F1 0%, #F5EFE6 50%, #E8D5B7 100%)",
  };

  const emojis: Record<string, string> = {
    "Baked Cakes": "🎂",
    "Baked Fusion": "✨",
    "Non-Baked": "🍰",
    Cookies: "🍪",
    Brownies: "🍫",
    "Tea Time Munchies": "☕",
    "Dark Chocolates": "🖤",
    "White Centre Filled Chocolates": "🤍",
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        height,
        background: gradients[product.category] || gradients["Baked Cakes"],
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent)]" />
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="text-5xl mb-2 relative z-10"
      >
        {emojis[product.category] || "🎂"}
      </motion.div>
      <p
        className="text-[11px] tracking-widest uppercase relative z-10 opacity-60"
        style={{
          fontFamily: "'Inter', sans-serif",
          color: product.category === "Brownies" || product.category === "Dark Chocolates"
            ? "#FAF6F1"
            : "#3D1F0A",
        }}
      >
        {product.subcategory}
      </p>
    </div>
  );
}

// ─── Product Card ────────────────────────────────────────────────────────────
export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  const whatsappMsg = encodeURIComponent(
    `Hi BlissOven! I'd like to order: ${product.name}${product.egglessAvailable ? " (Eggless option available)" : ""}. Please share details.`
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="product-card group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="product-image-wrap relative">
        <PlaceholderImage product={product} height={260} />

        {/* Overlay on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 bg-gradient-to-t from-[#1A0D05]/70 via-transparent to-transparent z-10"
        />

        {/* Quick Order Button */}
        <motion.a
          href={`https://wa.me/919999999999?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 btn-magnetic btn-primary text-[11px] whitespace-nowrap flex items-center gap-1.5"
        >
          <ShoppingBag size={12} />
          Quick Order
        </motion.a>

        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#C9A84C] text-[#1A0D05]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {product.badge}
            </span>
          )}
          {product.isBestseller && !product.badge && (
            <span
              className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#C9A84C] text-[#1A0D05]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Bestseller
            </span>
          )}
          {product.isSeasonal && (
            <span
              className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#3D1F0A]/80 text-[#E8D5B7] backdrop-blur"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Seasonal
            </span>
          )}
        </div>

        {/* Eggless badge */}
        {product.egglessAvailable && (
          <div className="absolute top-3 right-3 z-20">
            <div className="flex items-center gap-1 bg-green-600/90 backdrop-blur px-2 py-1 rounded-full">
              <Leaf size={9} className="text-white" />
              <span className="text-[9px] text-white font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                Eggless
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 text-center">
        {/* Category Tag */}
        <div className="section-label mb-2 opacity-60 text-center">{product.subcategory}</div>

        {/* Name */}
        <h3
          className="font-display text-[#3D1F0A] mb-3 leading-snug text-center"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.2rem",
            fontWeight: 600,
          }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p
          className="text-[#6B3F26]/70 text-[13.5px] leading-[1.7] mb-4 line-clamp-2 text-center"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {product.description}
        </p>

        {/* Meta Row */}
        <div className="flex items-center justify-center gap-3 mb-5 border-t border-[rgba(201,168,76,0.1)] pt-3.5">
          <div className="flex items-center gap-1.5 text-[11px] text-[#6B3F26]/60 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
            <Clock size={12} className="text-[#C9A84C]" />
            <span>{product.prepTime}</span>
          </div>
          {product.flavorProfile && (
            <div className="text-[11px] text-[#6B3F26]/60 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
              · {product.flavorProfile}
            </div>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-center gap-5 pt-1">
          <span
            className="price-tag text-lg font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: "#A07830" }}
          >
            {product.price}
          </span>
          <a
            href={`https://wa.me/919999999999?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#1A0D05] text-[#C9A84C] border border-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1A0D05] transition-all duration-300"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Order
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Products Grid ───────────────────────────────────────────────────────────
export function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
