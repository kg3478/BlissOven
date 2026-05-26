"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const facts = [
  { label: "Founded", value: "With Love" },
  { label: "Philosophy", value: "Handcrafted Daily" },
  { label: "Specialty", value: "Custom Celebrations" },
  { label: "Promise", value: "Fresh Every Order" },
];

export default function ChefStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      id="story"
      ref={ref}
      className="relative pt-24 pb-40 md:pt-36 md:pb-52 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1A0D05 0%, #2C1810 50%, #3D1F0A 100%)" }}
    >
      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,168,76,0.07),transparent)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(201,168,76,0.05),transparent)] blur-3xl pointer-events-none" />

      {/* Flour particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => {
          const size = ((i * 7) % 8) + 4;
          const left = (i * 9) % 100;
          const top = (i * 13) % 100;
          const duration = 4 + (i % 4);
          const delay = i % 3;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#E8D5B7]/10"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration, repeat: Infinity, delay }}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ─── Image Side ─── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative order-2 lg:order-1"
          >
            {/* Decorative borders */}
            <div className="absolute -inset-4 border border-[rgba(201,168,76,0.15)] rounded-3xl pointer-events-none" />
            <div className="absolute -inset-8 border border-[rgba(201,168,76,0.07)] rounded-3xl pointer-events-none" />

            {/* Portrait */}
            <motion.div
              style={{ y: imgY }}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              aria-label="Komal Agarwal - Founder"
            >
              <div style={{ aspectRatio: "3/4", position: "relative" }}>
                <Image
                  src="/founder.png"
                  alt="Komal Agarwal — Founder of BlissOven"
                  fill
                  className="object-cover object-top grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Warm cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D05]/70 via-[rgba(201,168,76,0.05)] to-transparent" />
                {/* Spotlight */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(201,168,76,0.08),transparent_60%)]" />
              </div>

              {/* Name overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 z-10">
                <p
                  className="text-[#FAF6F1]/40 text-[10px] tracking-[0.3em] uppercase mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  The Artisan Behind
                </p>
                <p
                  className="text-gradient-gold text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  BlissOven
                </p>
              </div>
            </motion.div>

            {/* Signature card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="absolute -bottom-6 -right-4 glass-card px-5 py-4 text-center shadow-xl"
            >
              <p
                className="text-[#C9A84C] text-xl font-bold italic mb-0.5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Komal Agarwal
              </p>
              <p
                className="text-[#FAF6F1]/40 text-[10px] tracking-widest uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Founder & Head Pastry Chef
              </p>
            </motion.div>
          </motion.div>

          {/* ─── Content Side ─── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="gold-divider w-10" />
              <span className="section-label">Our Story</span>
              <div className="gold-divider w-10" />
            </div>

            <h2
              className="text-[#FAF6F1] mb-6 leading-snug"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                fontWeight: 700,
              }}
            >
              The Hands Behind{" "}
              <span
                className="text-gradient-gold italic block"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Every Celebration
              </span>
            </h2>

            <div className="space-y-5 text-[#FAF6F1]/65 mb-8 text-[15px]">
              <p style={{ fontFamily: "'Lora', serif", lineHeight: 1.85 }}>
                BlissOven was born from a simple belief — that every celebration deserves
                something extraordinary. Founded by <strong className="text-[#E8D5B7]">Komal Agarwal</strong>,
                our kitchen is where passion meets precision, and where every dessert is treated as a work of art.
              </p>
              <p style={{ fontFamily: "'Lora', serif", lineHeight: 1.85 }}>
                Using only premium ingredients, Komal crafts each creation by hand — from the silkiest cheesecakes
                to the most indulgent brownies and celebration cakes. No shortcuts. No compromises. Just pure,
                handcrafted love in every bite.
              </p>
              <p style={{ fontFamily: "'Lora', serif", lineHeight: 1.85 }}>
                Whether it&apos;s your child&apos;s first birthday, a wedding anniversary, or a quiet moment of self-indulgence
                — BlissOven makes it unforgettable.
              </p>
            </div>

            {/* Fact Cards */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.6 }}
                  className="glass-card p-4 border-[rgba(201,168,76,0.12)]"
                >
                  <div
                    className="text-[#C9A84C] font-bold mb-0.5"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}
                  >
                    {fact.value}
                  </div>
                  <div
                    className="text-[#FAF6F1]/40 text-[10px] tracking-widest uppercase"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {fact.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="border-l-2 border-[rgba(201,168,76,0.4)] pl-5 mb-8"
            >
              <p
                className="text-[#E8D5B7] italic"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", lineHeight: 1.8 }}
              >
                &ldquo;Baking is my love language. Every dessert I create carries a piece of my
                heart — and I hope it reaches yours.&rdquo;
              </p>
              <p
                className="text-[#C9A84C] text-xs tracking-widest uppercase mt-3"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                — Komal Agarwal, Founder
              </p>
            </motion.div>

            <a
              href="https://wa.me/919999999999?text=Hi%20Komal!%20I'd%20love%20to%20know%20more%20about%20BlissOven."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic btn-primary"
            >
              Say Hello to Komal
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
