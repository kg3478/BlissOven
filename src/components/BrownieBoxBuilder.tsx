"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus, Check, ShoppingBag, X } from "lucide-react";

const brownieFlavors = [
  { id: "fudgy", name: "Fudgy Brownie", emoji: "🍫", color: "#3D1F0A" },
  { id: "walnut", name: "Walnut Brownie", emoji: "🌰", color: "#6B3F26" },
  { id: "double-choc", name: "Double Chocolate", emoji: "🍫", color: "#2C1810" },
  { id: "triple-choc", name: "Triple Chocolate", emoji: "✨", color: "#1A0D05" },
  { id: "biscoff", name: "Lotus Biscoff", emoji: "🍪", color: "#8B4513" },
  { id: "oreo", name: "Oreo Brownie", emoji: "⚫", color: "#1C1C1C" },
  { id: "kitkat", name: "KitKat Brownie", emoji: "🍫", color: "#C0392B" },
  { id: "chocochips", name: "Chocochips", emoji: "🍪", color: "#4A2C0A" },
  { id: "nutella", name: "Nutella Brownie", emoji: "🌰", color: "#7B3F00" },
];

interface BoxSize {
  count: number;
  label: string;
  price: string;
  description: string;
  label2?: string;
}

const boxSizes: BoxSize[] = [
  { count: 4, label: "Mini Box", price: "₹XXX", description: "Perfect for 1-2 people" },
  { count: 8, label: "Gift Box", label2: "Most Popular", price: "₹XXX", description: "Ideal for gifting" },
  { count: 12, label: "Party Box", price: "₹XXX", description: "Perfect for celebrations" },
];

export default function BrownieBoxBuilder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedSize, setSelectedSize] = useState(boxSizes[1]);
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [showOrder, setShowOrder] = useState(false);

  const total = Object.values(selections).reduce((a, b) => a + b, 0);
  const remaining = selectedSize.count - total;

  const add = (id: string) => {
    if (total >= selectedSize.count) return;
    setSelections((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const remove = (id: string) => {
    setSelections((prev) => {
      const n = { ...prev };
      if (n[id] > 1) n[id]--;
      else delete n[id];
      return n;
    });
  };

  const reset = () => setSelections({});

  const buildMessage = () => {
    const lines = Object.entries(selections)
      .map(([id, qty]) => {
        const f = brownieFlavors.find((b) => b.id === id);
        return `${f?.name} x${qty}`;
      })
      .join(", ");
    return encodeURIComponent(
      `Hi BlissOven! I'd like to order an Assorted Brownie Box:\n📦 Size: ${selectedSize.label} (${selectedSize.count} pcs)\n🍫 Selection: ${lines}\n\nPlease share the pricing and delivery details. Thank you!`
    );
  };

  return (
    <section id="brownie-builder" className="py-24 md:py-32 bg-[#F5EFE6] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(201,168,76,0.06),transparent)]" />

      <div ref={ref} className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="gold-divider w-12" />
            <span className="section-label">Build Your Box</span>
            <div className="gold-divider w-12" />
          </div>
          <h2
            className="text-[#1A0D05] mb-5 leading-snug"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700 }}
          >
            Craft Your{" "}
            <span className="text-gradient-gold italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Brownie Box
            </span>
          </h2>
          <p className="text-[#6B3F26]/70 max-w-xl mx-auto text-center leading-[1.8] text-[15px]" style={{ fontFamily: "'Lora', serif" }}>
            Mix and match from 9 signature flavours. Build the perfect brownie collection for yourself or as a gift.
          </p>
        </motion.div>

        {/* Box Size Selector Card Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-md border border-[rgba(201,168,76,0.15)] rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_15px_35px_rgba(26,13,5,0.05)] mb-12 max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">
              Step 01
            </span>
            <h3 className="text-[#1A0D05] text-lg md:text-2xl font-bold mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Choose Your Box Size
            </h3>
            <p className="text-[#6B3F26]/60 text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
              Select the perfect box size to fill with signature brownie flavors
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {boxSizes.map((size) => (
              <button
                key={size.count}
                onClick={() => { setSelectedSize(size); reset(); }}
                className={`relative aspect-square flex flex-col justify-center items-center p-2 sm:p-4 md:p-6 rounded-2xl border-2 text-center transition-all duration-400 cursor-pointer ${
                  selectedSize.count === size.count
                    ? "border-[#C9A84C] bg-[#1A0D05] shadow-[0_8px_30px_rgba(201,168,76,0.15)]"
                    : "border-[rgba(201,168,76,0.15)] bg-white/60 hover:border-[#C9A84C]/50"
                }`}
              >
                {size.label2 && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-[#1A0D05] text-[7px] sm:text-[9px] font-extrabold tracking-widest uppercase px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap shadow-sm z-10">
                    {size.label2}
                  </div>
                )}
                <div
                  className={`text-2xl sm:text-4xl md:text-5xl font-bold mb-1 leading-none ${selectedSize.count === size.count ? "text-gradient-gold" : "text-[#1A0D05]"}`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {size.count}
                </div>
                <div
                  className={`font-semibold text-[10px] sm:text-xs md:text-sm mb-1 leading-normal ${selectedSize.count === size.count ? "text-[#FAF6F1]" : "text-[#3D1F0A]"}`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {size.label}
                </div>
                <div
                  className={`text-[8px] sm:text-[10px] md:text-xs leading-tight mt-0.5 sm:mt-1 ${selectedSize.count === size.count ? "text-[#C9A84C]/70" : "text-[#6B3F26]/60"}`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {size.description}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-12 border-b border-[rgba(201,168,76,0.1)] pb-6"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#6B3F26] text-sm font-semibold tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
              {total} of {selectedSize.count} Brownies Selected
            </span>
            <span
              className={`text-sm font-bold tracking-wide ${remaining === 0 ? "text-green-600" : "text-[#C9A84C]"}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {remaining === 0 ? "Box Complete! 🎉" : `${remaining} remaining`}
            </span>
          </div>
          <div className="w-full h-2.5 bg-[rgba(201,168,76,0.15)] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg,#C9A84C,#E4C76B)" }}
              animate={{ width: `${(total / selectedSize.count) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>

        {/* Flavor Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14"
        >
          {brownieFlavors.map((flavor, i) => {
            const qty = selections[flavor.id] || 0;
            const canAdd = total < selectedSize.count;

            return (
              <motion.div
                key={flavor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.06 }}
                className={`relative p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center ${
                  qty > 0
                    ? "border-[#C9A84C] bg-[#1A0D05]/5 shadow-[0_8px_25px_rgba(201,168,76,0.1)]"
                    : "border-[rgba(201,168,76,0.15)] bg-white/60 hover:border-[#C9A84C]/45"
                }`}
              >
                {/* Selected badge */}
                {qty > 0 && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-[#C9A84C] rounded-full flex items-center justify-center shadow-md">
                    <span className="text-[#1A0D05] text-xs font-bold">{qty}</span>
                  </div>
                )}

                <div className="text-4xl mb-3">{flavor.emoji}</div>
                <h3
                  className="text-[#1A0D05] text-[15px] font-semibold mb-4 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {flavor.name}
                </h3>

                {/* Qty Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => remove(flavor.id)}
                    disabled={qty === 0}
                    className="w-8 h-8 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[#6B3F26] disabled:opacity-30 hover:border-[#C9A84C] hover:bg-white transition-all shadow-sm"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-[#1A0D05]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {qty}
                  </span>
                  <button
                    onClick={() => add(flavor.id)}
                    disabled={!canAdd}
                    className="w-8 h-8 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[#6B3F26] disabled:opacity-30 hover:bg-[#C9A84C] hover:border-[#C9A84C] hover:text-[#1A0D05] transition-all shadow-sm"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Order Summary */}
        <AnimatePresence>
          {total > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="card-luxury p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4
                  className="text-[#1A0D05] font-semibold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Your Selection
                </h4>
                <button
                  onClick={reset}
                  className="text-[#6B3F26]/50 hover:text-[#6B3F26] text-xs flex items-center gap-1 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <X size={12} /> Reset
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(selections).map(([id, qty]) => {
                  const f = brownieFlavors.find((b) => b.id === id)!;
                  return (
                    <span
                      key={id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#FAF6F1]"
                      style={{ background: f.color, fontFamily: "'Inter', sans-serif" }}
                    >
                      {f.emoji} {f.name} ×{qty}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 mt-8"
        >
          {remaining === 0 ? (
            <a
              href={`https://wa.me/919999999999?text=${buildMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic btn-primary flex items-center gap-2 text-sm px-8 py-4"
            >
              <ShoppingBag size={16} />
              Order My Box on WhatsApp
            </a>
          ) : (
            <button
              disabled
              className="btn-magnetic btn-dark opacity-50 cursor-not-allowed text-sm flex items-center gap-2 px-8 py-4"
            >
              <ShoppingBag size={16} />
              Select {remaining} more brownie{remaining !== 1 ? "s" : ""} to order
            </button>
          )}
          <a
            href="https://wa.me/919999999999?text=Hi%20BlissOven!%20I%20have%20a%20custom%20brownie%20box%20request."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase hover:text-[#E4C76B] transition-colors mt-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ✦ Need a custom combination? ✦
          </a>
        </motion.div>
      </div>
    </section>
  );
}
