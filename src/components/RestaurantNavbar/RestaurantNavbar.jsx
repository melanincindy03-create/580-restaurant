import { useState, useEffect } from "react";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RESTAURANT, PALETTE } from "@/constants/restaurant";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export default function RestaurantNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(28,28,28,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid rgba(200,169,110,0.15)` : "none",
          padding: scrolled ? "14px 0" : "24px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center gap-3 select-none"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center border"
              style={{ borderColor: PALETTE.gold, background: "rgba(200,169,110,0.1)" }}
            >
              <UtensilsCrossed size={18} color={PALETTE.gold} strokeWidth={1.5} />
            </div>
            <div>
              <div
                className="text-lg font-semibold tracking-[0.12em] leading-none"
                style={{ color: PALETTE.white, fontFamily: "'Georgia', serif", letterSpacing: "0.1em" }}
              >
                {RESTAURANT.name.toUpperCase()}
              </div>
              <div
                className="text-[9px] tracking-[0.35em] uppercase mt-0.5"
                style={{ color: PALETTE.gold }}
              >
                Fine Dining
              </div>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-300"
                style={{ color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={(e) => (e.target.style.color = PALETTE.gold)}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              className="px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 border"
              style={{
                borderColor: PALETTE.gold,
                color: PALETTE.gold,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = PALETTE.gold;
                e.currentTarget.style.color = PALETTE.dark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = PALETTE.gold;
              }}
            >
              Reserve
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen
              ? <X size={24} color={PALETTE.white} />
              : <Menu size={24} color={PALETTE.white} />
            }
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-40 flex flex-col pt-24 px-8"
            style={{ background: "rgba(28,28,28,0.98)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="text-2xl font-light tracking-[0.15em] uppercase border-b pb-6"
                  style={{ color: PALETTE.white, borderColor: "rgba(255,255,255,0.08)" }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                className="mt-4 py-4 text-center text-sm uppercase tracking-[0.25em]"
                style={{ background: PALETTE.gold, color: PALETTE.dark }}
              >
                Make a Reservation
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
