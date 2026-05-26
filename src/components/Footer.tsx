"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Heart, ArrowUp } from "lucide-react";

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const footerLinks = {
  Collections: [
    { label: "Baked Cakes", href: "#collections" },
    { label: "Fusion Cakes", href: "#fusion" },
    { label: "Cheesecakes", href: "#collections" },
    { label: "Brownies", href: "#brownie-builder" },
    { label: "Cookies", href: "#collections" },
    { label: "Chocolates", href: "#collections" },
  ],
  Experience: [
    { label: "Our Story", href: "#story" },
    { label: "Gallery", href: "#gallery" },
    { label: "Flavour Experience", href: "#flavours" },
    { label: "Build Your Box", href: "#brownie-builder" },
  ],
  Order: [
    { label: "WhatsApp Us", href: "https://wa.me/919999999999" },
    { label: "Custom Orders", href: "https://wa.me/919999999999?text=Custom order" },
    { label: "Celebration Cakes", href: "https://wa.me/919999999999?text=Celebration cake" },
    { label: "Gifting", href: "https://wa.me/919999999999?text=Gift order" },
  ],
};

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#1A0D05 0%,#0D0600 100%)" }}
    >
      {/* Top gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      {/* Gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.06),transparent)] pointer-events-none" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 text-center">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 flex flex-col items-center justify-center text-center"
          >
            {/* Logo */}
            <div className="mb-6 text-center">
              <h2
                className="text-gradient-gold text-3xl font-bold mb-2 leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                BlissOven
              </h2>
              <p
                className="text-[10px] tracking-[0.3em] uppercase text-[rgba(201,168,76,0.4)]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Artisan Patisserie
              </p>
            </div>

            {/* Tagline */}
            <p
              className="text-[#FAF6F1]/50 leading-[1.8] mb-6 max-w-sm text-sm text-center"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Handcrafted desserts for life's most precious moments. Every bite, made with love by Komal Agarwal.
            </p>

            {/* Signature */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-[rgba(201,168,76,0.15)] flex items-center justify-center shrink-0">
                <span style={{ fontFamily: "'Playfair Display', serif", color: "#C9A84C", fontSize: "0.9rem" }}>K</span>
              </div>
              <div className="text-left">
                <p className="text-[#E8D5B7] text-sm font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Komal Agarwal
                </p>
                <p className="text-[#C9A84C]/50 text-[10px] tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Founder & Head Chef
                </p>
              </div>
            </div>

            {/* Social + WhatsApp */}
            <div className="flex gap-3 justify-center">
              <a
                href="https://www.instagram.com/blissovens"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)] hover:border-[#C9A84C] transition-all duration-300 group"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase text-[#1A0D05] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(37,211,102,0.4)]"
                style={{ fontFamily: "'Inter', sans-serif", background: "linear-gradient(135deg,#25D366,#128C7E)" }}
                aria-label="WhatsApp"
              >
                <MessageCircle size={14} />
                Order on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([section, links], colIdx) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + colIdx * 0.1 }}
              className="text-center"
            >
              <h4
                className="text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase font-semibold mb-5 text-center"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {section}
              </h4>
              <ul className="space-y-3 text-center">
                {links.map((link) => (
                  <li key={link.label} className="flex justify-center">
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[#FAF6F1]/45 hover:text-[#E8D5B7] text-sm transition-colors duration-300 relative group"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9A84C] group-hover:w-full transition-all duration-300" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Featured Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center py-10 border-y border-[rgba(201,168,76,0.08)] mb-10"
        >
          <p
            className="text-[#E8D5B7]/40 italic max-w-lg mx-auto leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem" }}
          >
            &ldquo;Where Cakes Become Art.&rdquo;
          </p>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p
            className="text-[#FAF6F1]/25 text-xs text-center md:text-left leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            © {new Date().getFullYear()} BlissOven by Komal Agarwal. All rights reserved. Made with{" "}
            <Heart size={10} className="inline text-[#C9A84C]" fill="#C9A84C" /> in India.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
            <span className="text-[#FAF6F1]/20 text-xs text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
              Handcrafted · Premium · Made to Order
            </span>
            <button
              onClick={scrollTop}
              className="w-9 h-9 rounded-full border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)] hover:border-[#C9A84C] transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
