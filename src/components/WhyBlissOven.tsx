"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const reasons = [
  { icon: "🤲", title: "Handcrafted Daily", desc: "Every product is made fresh, by hand, with precision and love — never pre-made or mass produced." },
  { icon: "🥛", title: "Fresh Cream Always", desc: "We use only the finest fresh dairy cream in every layer, frosting, and filling. Quality you can taste." },
  { icon: "⭐", title: "Premium Ingredients", desc: "Belgian chocolate, Alphonso mangoes, Kashmiri saffron — only the best make it into our kitchen." },
  { icon: "📦", title: "Made to Order", desc: "Nothing sits on a shelf. Your dessert is crafted fresh when you order — personalised just for you." },
  { icon: "🎂", title: "Custom Celebrations", desc: "Custom themes, messages, flavours, sizes — we build your dessert around your celebration." },
  { icon: "🌿", title: "Eggless Options", desc: "Most of our products are available eggless without compromise on taste, texture or quality." },
  { icon: "💛", title: "Luxury Experience", desc: "From the first WhatsApp message to the final unboxing — we make every touchpoint feel premium." },
  { icon: "⚡", title: "WhatsApp Ordering", desc: "Simple, personal, fast. No complicated checkout. Just message us and we handle the rest." },
];

export default function WhyBlissOven() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="pt-24 pb-48 md:pt-32 md:pb-64 bg-[#FAF6F1] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(201,168,76,0.05),transparent)]" />

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
            <span className="section-label">Why Choose Us</span>
            <div className="gold-divider w-12" />
          </div>
          <h2
            className="text-[#1A0D05] mb-5 leading-snug"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700 }}
          >
            The{" "}
            <span className="text-gradient-gold italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              BlissOven
            </span>{" "}
            Promise
          </h2>
          <p
            className="text-[#6B3F26]/70 max-w-2xl mx-auto leading-[1.9] text-center text-[16px]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            We don't just bake desserts. We create experiences that linger long after the last bite.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="card-luxury p-8 group relative overflow-hidden text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(201,168,76,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <motion.div
                whileHover={{ scale: 1.2, rotate: 8 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="text-4xl mb-5 inline-block"
              >
                {r.icon}
              </motion.div>

              <h3
                className="text-[#1A0D05] mb-4 relative z-10 leading-snug"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600 }}
              >
                {r.title}
              </h3>

              <p
                className="text-[#6B3F26]/70 text-[15px] leading-[1.85] relative z-10 text-center"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {r.desc}
              </p>

              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#C9A84C] to-transparent"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}