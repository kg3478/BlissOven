"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    occasion: "Birthday Cake",
    text: "I ordered a Red Velvet cake for my daughter's birthday and I was absolutely blown away. The cake was moist, perfectly frosted, and tasted like something from a 5-star hotel. Komal's attention to detail is unmatched. We've found our forever bakery!",
    initial: "P",
    color: "#E8D5E8",
  },
  {
    name: "Rahul Mehta",
    location: "Delhi",
    rating: 5,
    occasion: "Assorted Brownie Box",
    text: "The Lotus Biscoff and Nutella brownies are out of this world. I ordered an assorted box for my wife's office and her entire team was asking for the contact. Rich, fudgy, and absolutely premium. Will definitely reorder!",
    initial: "R",
    color: "#D4E8D4",
  },
  {
    name: "Ananya Gupta",
    location: "Pune",
    rating: 5,
    occasion: "Wedding Anniversary",
    text: "We wanted something special for our 10th anniversary. Komal created a Rasmalai cake that was nothing short of art. The saffron fragrance, the delicate rose petals — we couldn't believe this was homemade. Absolutely magical.",
    initial: "A",
    color: "#E8E4D4",
  },
  {
    name: "Vikram Singh",
    location: "Jaipur",
    rating: 5,
    occasion: "Tiramisu Cheesecake",
    text: "The Tiramisu Cheesecake was the most authentic I've had outside of Italy. Perfectly balanced espresso flavour, silky smooth texture. My family demolished the entire thing in one sitting. A masterpiece!",
    initial: "V",
    color: "#D4D8E8",
  },
  {
    name: "Meera Patel",
    location: "Ahmedabad",
    rating: 5,
    occasion: "Chocolate Truffle Cake",
    text: "BlissOven is not a bakery, it's an experience. The Chocolate Truffle cake for my son's birthday had everyone speechless. The layers, the ganache, the presentation — restaurant quality at home. Komal is truly gifted!",
    initial: "M",
    color: "#E8D4D4",
  },
  {
    name: "Deepika Nair",
    location: "Bangalore",
    rating: 5,
    occasion: "Custom Order",
    text: "I gave Komal a very specific brief for a themed cake and she nailed it beyond my expectations. The communication was seamless on WhatsApp, delivery was on time, and the cake was a showstopper. 10/10 every single time.",
    initial: "D",
    color: "#E8D4E4",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-[#C9A84C] text-[#C9A84C]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, [auto]);

  const prev = () => { setAuto(false); setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setAuto(false); setCurrent((c) => (c + 1) % testimonials.length); };

  const t = testimonials[current];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1A0D05,#2C1810,#3D1F0A)" }}>
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(201,168,76,0.07),transparent)]" />

      <div ref={ref} className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="gold-divider w-12" />
            <span className="section-label">Testimonials</span>
            <div className="gold-divider w-12" />
          </div>
          <h2
            className="text-[#FAF6F1] mb-5 leading-snug"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700 }}
          >
            Words from Our{" "}
            <span className="text-gradient-gold italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Sweethearts
            </span>
          </h2>
          <p className="text-[#FAF6F1]/50 max-w-xl mx-auto text-center leading-[1.8] text-[15px]" style={{ fontFamily: "'Lora', serif" }}>
            Real stories from people who made BlissOven part of their most special moments.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-card p-8 md:p-12 relative"
            >
              {/* Quote Icon */}
              <Quote
                size={48}
                className="absolute top-6 right-8 opacity-10"
                style={{ color: "#C9A84C" }}
              />

              {/* Rating & Occasion */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <StarRating count={t.rating} />
                <span
                  className="text-xs tracking-widest uppercase text-[#C9A84C]/70 border border-[rgba(201,168,76,0.2)] px-3 py-1 rounded-full"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {t.occasion}
                </span>
              </div>

              {/* Text */}
              <p
                className="text-[#FAF6F1]/80 leading-[1.85] mb-8 relative z-10 text-center"
                style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1rem,2vw,1.15rem)" }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-[#1A0D05] text-base shrink-0"
                  style={{ background: t.color, fontFamily: "'Playfair Display', serif" }}
                >
                  {t.initial}
                </div>
                <div>
                  <p
                    className="text-[#FAF6F1] font-semibold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[#C9A84C]/60 text-xs tracking-wider"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAuto(false); setCurrent(i); }}
                  className="rounded-full transition-all duration-400"
                  style={{
                    width: i === current ? 28 : 8,
                    height: 8,
                    background: i === current ? "#C9A84C" : "rgba(201,168,76,0.25)",
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-[rgba(201,168,76,0.25)] flex items-center justify-center text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)] transition-all duration-300"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-[rgba(201,168,76,0.25)] flex items-center justify-center text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)] transition-all duration-300"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-[rgba(201,168,76,0.1)]"
        >
          {[
            { num: "5.0", label: "Average Rating", suffix: "★" },
            { num: "500+", label: "Happy Customers" },
            { num: "100%", label: "Would Reorder" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-gradient-gold text-2xl md:text-3xl font-bold mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {s.num}{s.suffix}
              </div>
              <div
                className="text-[#FAF6F1]/40 text-[10px] tracking-widest uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
