"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";

const navLinks = [
  { label: "Collections", href: "#collections" },
  { label: "Signature", href: "#fusion" },
  { label: "Our Story", href: "#story" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#1A0D05]/90 backdrop-blur-xl border-b border-[rgba(201,168,76,0.15)] py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex flex-col items-center group"
            whileHover={{ scale: 1.02 }}
          >
            <span
              className="font-display text-2xl font-bold tracking-wide text-gradient-gold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              BlissOven
            </span>
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-[rgba(201,168,76,0.6)] mt-0.5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Artisan Patisserie
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                onMouseEnter={() => setActiveLink(link.label)}
                onMouseLeave={() => setActiveLink("")}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://wa.me/919999999999?text=Hi%20BlissOven!%20I'd%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic btn-primary text-xs"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Order Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#FAF6F1] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#1A0D05]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-6 right-6 text-[#FAF6F1]"
              onClick={() => setMenuOpen(false)}
            >
              <X size={24} />
            </button>

            <div
              className="font-display text-3xl font-bold text-gradient-gold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              BlissOven
            </div>

            <div className="gold-divider w-16" />

            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="font-editorial text-3xl text-[#FAF6F1]/80 hover:text-[#C9A84C] transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              href="https://wa.me/919999999999"
              target="_blank"
              className="btn-magnetic btn-primary mt-4"
              onClick={() => setMenuOpen(false)}
            >
              Order on WhatsApp
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
