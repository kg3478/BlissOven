"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";

const chocolateFlavors = [
  { id: "dry-fruit-dark", name: "Dry Fruit Dark", emoji: "🍫", desc: "Single-origin dark chocolate studded with premium almonds, cashews, and cranberries.", color: "#1A0D05" },
  { id: "fruit-nutty-dark", name: "Fruit & Nutty Dark", emoji: "🍒", desc: "Vibrant dried fruits and mixed nuts suspended in rich dark chocolate.", color: "#2C1810" },
  { id: "dry-fruit-white", name: "Dry Fruit White", emoji: "🍬", desc: "Luscious white chocolate shell with a premium dry fruit and nut center.", color: "#FAF6F1" },
  { id: "fruit-nutty-white", name: "Fruit & Nutty White", emoji: "🥜", desc: "A burst of fruity and nutty goodness wrapped in smooth, creamy white chocolate.", color: "#E8D5B7" },
  { id: "paan-white", name: "Royal Paan White", emoji: "🍃", desc: "Betel leaf paan flavor in a white chocolate shell — unique and festive.", color: "#2E7D32" },
  { id: "orange-white", name: "Citrus Orange White", emoji: "🍊", desc: "Bright, zesty orange filling encased in creamy white chocolate.", color: "#EF6C00" },
  { id: "strawberry-white", name: "Strawberry White", emoji: "🍓", desc: "Juicy strawberry center inside a premium white chocolate shell.", color: "#C2185B" },
];

interface BoxSize {
  count: number;
  label: string;
  price: string;
  description: string;
  label2?: string;
}

const boxSizes: BoxSize[] = [
  { count: 8, label: "Classic Box", price: "₹XXX", description: "Ideal for gifting" },
  { count: 10, label: "Grand Box", price: "₹XXX", description: "Festive celebration" },
  { count: 12, label: "Luxury Box", price: "₹XXX", description: "A royal assortment" },
];

export default function ChocolateBoxBuilder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedSize, setSelectedSize] = useState(boxSizes[1]); // Grand Box (10 pcs) is default
  const [selections, setSelections] = useState<Record<string, number>>({});

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
        const f = chocolateFlavors.find((b) => b.id === id);
        return `${f?.name} x${qty}`;
      })
      .join(", ");
    return encodeURIComponent(
      `Hi BlissOven! I'd like to order an Assorted Chocolate Box:\n📦 Size: ${selectedSize.label} (${selectedSize.count} pcs)\n🍬 Selection: ${lines}\n\nPlease share the pricing and delivery details. Thank you!`
    );
  };

  // Generate box slots list for visual preview
  const filledItems = Object.entries(selections).flatMap(([id, qty]) =>
    Array(qty).fill(id)
  );

  return (
    <section id="chocolate-builder" className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#FAF6F1" }}>
      {/* Aesthetic background details */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(201,168,76,0.04),transparent)] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(232,197,71,0.04),transparent)] blur-3xl pointer-events-none" />

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
            <span className="section-label">Artisan Confectionery</span>
            <div className="gold-divider w-12" />
          </div>
          <h2
            className="text-[#1A0D05] mb-5 leading-snug"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700 }}
          >
            Build Your{" "}
            <span className="text-gradient-gold italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Assorted Chocolate Box
            </span>
          </h2>
          <p className="text-[#6B3F26]/70 max-w-xl mx-auto text-center leading-[1.8] text-[15px]" style={{ fontFamily: "'Lora', serif" }}>
            Indulge in handcrafted luxury. Choose your box size, select from our premium artisan dark and white center-filled chocolates, and watch your custom box fill up in real time!
          </p>
        </motion.div>

        {/* Dynamic Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ─── LEFT SIDE (Sticky Box Preview & Selector) ─── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            
            {/* Box Size Selector Card */}
            <div className="bg-[#1A0D05] border border-[#C9A84C]/35 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(26,13,5,0.25)]">
              <div className="text-center mb-6">
                <span className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Step 01
                </span>
                <h3 className="text-[#FAF6F1] text-base md:text-xl font-bold mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Select Box Size
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {boxSizes.map((size) => {
                  const active = selectedSize.count === size.count;
                  return (
                    <button
                      key={size.count}
                      onClick={() => { setSelectedSize(size); reset(); }}
                      className={`relative aspect-square flex flex-col justify-center items-center p-2 rounded-2xl border transition-all duration-400 cursor-pointer ${
                        active
                          ? "border-[#C9A84C] bg-[#FAF6F1] shadow-[0_8px_30px_rgba(201,168,76,0.15)]"
                          : "border-[rgba(201,168,76,0.15)] bg-white/5 hover:border-[#C9A84C]/50"
                      }`}
                    >
                      {size.label2 && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-[#1A0D05] text-[7px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm z-10">
                          {size.label2}
                        </div>
                      )}
                      <div
                        className={`text-2xl sm:text-3xl font-bold mb-0.5 ${active ? "text-[#1A0D05]" : "text-[#E8D5B7]"}`}
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {size.count}
                      </div>
                      <div
                        className={`font-semibold text-[10px] leading-tight ${active ? "text-[#1A0D05]" : "text-[#FAF6F1]/80"}`}
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {size.label}
                      </div>
                      <div
                        className={`text-[8px] leading-tight mt-1 ${active ? "text-[#C9A84C]" : "text-[#FAF6F1]/40"}`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {size.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visual Box Preview */}
            <div className="bg-[#1A0D05] border border-[#C9A84C]/35 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(26,13,5,0.25)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(201,168,76,0.03),transparent)] blur-xl pointer-events-none" />

              <div className="text-center mb-6">
                <span className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Step 02
                </span>
                <h3 className="text-[#FAF6F1] text-base md:text-xl font-bold mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Your Custom Assorted Box
                </h3>
              </div>

              {/* Grid representation of physical chocolate box */}
              <div className={`grid gap-3.5 mb-6 max-w-sm mx-auto p-4 rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[#0D0600] ${
                selectedSize.count === 10 ? "grid-cols-5" : "grid-cols-4"
              }`}>
                {Array.from({ length: selectedSize.count }).map((_, index) => {
                  const flavorId = filledItems[index];
                  const flavor = flavorId ? chocolateFlavors.find(f => f.id === flavorId) : null;
                  
                  return (
                    <div
                      key={index}
                      className={`aspect-square rounded-xl border flex flex-col items-center justify-center relative group transition-all duration-500 overflow-hidden ${
                        flavor 
                          ? "border-[#C9A84C] bg-gradient-to-br from-[#FAF6F1] to-[#F5EFE6] text-[#1A0D05]"
                          : "border-dashed border-[rgba(201,168,76,0.15)] bg-[#1A0D05]/20"
                      }`}
                    >
                      {flavor ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="flex flex-col items-center justify-center w-full h-full p-1"
                        >
                          <span className="text-2xl md:text-3xl leading-none mb-1 select-none">{flavor.emoji}</span>
                          <span className="text-[8px] font-bold tracking-widest uppercase leading-none opacity-80 select-none text-center truncate w-full" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {flavor.name.split(" ")[0]}
                          </span>
                          
                          {/* Hover Remove Trigger */}
                          <button
                            onClick={() => remove(flavor.id)}
                            className="absolute inset-0 bg-[#C0392B]/95 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer animate-fadeIn"
                            aria-label={`Remove ${flavor.name}`}
                          >
                            <Trash2 size={15} className="mb-0.5" />
                            <span className="text-[7px] font-bold tracking-widest uppercase">Remove</span>
                          </button>
                        </motion.div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-1 select-none">
                          <div className="w-1.5 h-1.5 rounded-full bg-[rgba(201,168,76,0.2)]" />
                          <span className="text-[7px] text-[rgba(201,168,76,0.25)] font-bold tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Empty</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Status Indicator */}
              <div className="border-t border-[rgba(201,168,76,0.08)] pt-5">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-[#FAF6F1]/55 tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Status: <strong className="text-[#E8D5B7]">{total} / {selectedSize.count} Filled</strong>
                  </span>
                  <span className={`font-bold tracking-widest uppercase text-[10px] ${remaining === 0 ? "text-green-500" : "text-[#C9A84C]"}`}>
                    {remaining === 0 ? "Box Ready! 📦" : `${remaining} slot${remaining !== 1 ? "s" : ""} left`}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#FAF6F1]/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #C9A84C, #FAF6F1)" }}
                    animate={{ width: `${(total / selectedSize.count) * 100}%` }}
                    transition={{ duration: 0.35 }}
                  />
                </div>
              </div>
            </div>

            {/* Dynamic CTA Module */}
            <div className="text-center pt-2">
              {remaining === 0 ? (
                <a
                  href={`https://wa.me/919999999999?text=${buildMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic btn-primary flex items-center justify-center gap-2 text-sm w-full py-4 shadow-[0_8px_30px_rgba(201,168,76,0.3)] animate-pulse cursor-pointer"
                >
                  <ShoppingBag size={15} />
                  Order Custom Box on WhatsApp
                </a>
              ) : (
                <button
                  disabled
                  className="btn-magnetic btn-dark opacity-45 cursor-not-allowed text-xs flex items-center justify-center gap-2 w-full py-4"
                >
                  <ShoppingBag size={15} />
                  Select {remaining} more to checkout
                </button>
              )}
              <a
                href="https://wa.me/919999999999?text=Hi%20BlissOven!%20I'd%20like%20to%20order%20an%20assorted%20chocolate%20box."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[#C9A84C] text-[10px] font-semibold tracking-[0.2em] uppercase hover:text-[#FAF6F1] transition-colors mt-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                ✦ Custom Gifting combinations ✦
              </a>
            </div>

          </div>

          {/* ─── RIGHT SIDE (Flavors Browser) ─── */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#FAF6F1] border border-[rgba(201,168,76,0.15)] rounded-3xl p-6 md:p-8 shadow-[0_15px_30px_rgba(26,13,5,0.02)]">
              <div className="text-center lg:text-left mb-8 border-b border-[rgba(201,168,76,0.08)] pb-5">
                <span className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Step 03
                </span>
                <h3 className="text-[#1A0D05] text-base md:text-xl font-bold mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Browse Chocolate Flavors
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {chocolateFlavors.map((flavor, i) => {
                  const qty = selections[flavor.id] || 0;
                  const canAdd = total < selectedSize.count;

                  return (
                    <motion.div
                      key={flavor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.15 + i * 0.05 }}
                      className={`relative p-5 rounded-2xl border transition-all duration-400 flex flex-col justify-between ${
                        qty > 0
                          ? "border-[#C9A84C] bg-[#1A0D05] text-[#FAF6F1] shadow-[0_10px_25px_rgba(26,13,5,0.15)]"
                          : "border-[rgba(201,168,76,0.12)] bg-white hover:border-[#C9A84C]/50 shadow-[0_4px_12px_rgba(0,0,0,0.01)]"
                      }`}
                    >
                      {/* Ribbon / Badge count */}
                      {qty > 0 && (
                        <div className="absolute top-3 right-3 bg-[#C9A84C] text-[#1A0D05] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                          {qty}
                        </div>
                      )}

                      <div>
                        {/* Header details */}
                        <div className="flex items-center gap-3 mb-2.5">
                          <span className="text-3xl leading-none select-none">{flavor.emoji}</span>
                          <h4
                            className="font-bold text-[14.5px] leading-tight"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              color: qty > 0 ? "#FAF6F1" : "#1A0D05"
                            }}
                          >
                            {flavor.name}
                          </h4>
                        </div>

                        {/* Flavor Note */}
                        <p
                          className="text-xs leading-normal mb-5 pr-2"
                          style={{
                            fontFamily: "'Lora', serif",
                            color: qty > 0 ? "rgba(250,246,241,0.65)" : "rgba(107,63,38,0.9)"
                          }}
                        >
                          {flavor.desc}
                        </p>
                      </div>

                      {/* Control buttons row */}
                      <div className="flex items-center justify-between border-t pt-3.5 border-[rgba(201,168,76,0.08)]">
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C9A84C]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Qty
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => remove(flavor.id)}
                            disabled={qty === 0}
                            className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 disabled:opacity-20 cursor-pointer ${
                              qty > 0
                                ? "border-[#C9A84C]/40 text-[#C9A84C] hover:bg-white/5 hover:text-white"
                                : "border-[rgba(201,168,76,0.2)] text-[#6B3F26] hover:bg-[#FAF6F1]"
                            }`}
                          >
                            <Minus size={11} />
                          </button>
                          
                          <span
                            className="w-6 text-center text-xs font-bold"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              color: qty > 0 ? "#FAF6F1" : "#1A0D05"
                            }}
                          >
                            {qty}
                          </span>
                          
                          <button
                            onClick={() => add(flavor.id)}
                            disabled={!canAdd}
                            className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 disabled:opacity-20 cursor-pointer ${
                              qty > 0
                                ? "bg-[#C9A84C] border-[#C9A84C] text-[#1A0D05] hover:bg-[#FAF6F1]"
                                : "border-[rgba(201,168,76,0.2)] text-[#6B3F26] hover:bg-[#C9A84C] hover:text-[#1A0D05] hover:border-[#C9A84C]"
                            }`}
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
