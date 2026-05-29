import { useState, useEffect } from "react";
import { ShoppingCart, Menu as MenuIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/components/Logo/Logo";
import { BRAND, WHATSAPP_URL } from "@/constants/brand";

export const Navbar = ({ onCartOpen, cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { name: "Menu", href: "#menu" },
    { name: "About", href: "#about" },
    { name: "Reservations", href: "#reservations" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(28,28,28,0.08)" : "none",
        padding: isScrolled ? "12px 0" : "24px 0",
        boxShadow: isScrolled ? "0 4px 32px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Logo inverted={!isScrolled} />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200"
              style={{
                color: isScrolled ? BRAND.black : "rgba(255,255,255,0.85)",
              }}
              onMouseEnter={(e) => (e.target.style.color = BRAND.yellow)}
              onMouseLeave={(e) =>
                (e.target.style.color = isScrolled
                  ? BRAND.black
                  : "rgba(255,255,255,0.85)")
              }
            >
              {link.name}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200"
            style={{ background: BRAND.yellow, color: BRAND.black }}
          >
            Book via WhatsApp
          </a>
          <button
            onClick={onCartOpen}
            className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: isScrolled ? BRAND.black : "rgba(255,255,255,0.15)",
              color: "#fff",
              backdropFilter: "blur(8px)",
            }}
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center"
                style={{ background: BRAND.yellow, color: BRAND.black }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Right */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onCartOpen}
            className="relative w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: isScrolled ? BRAND.black : "#fff",
              backdropFilter: "blur(8px)",
            }}
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center"
                style={{ background: BRAND.yellow, color: BRAND.black }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X size={24} color={isScrolled ? BRAND.black : "#fff"} />
            ) : (
              <MenuIcon size={24} color={isScrolled ? BRAND.black : "#fff"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "#fff",
              borderTop: "1px solid rgba(28,28,28,0.08)",
            }}
            className="overflow-hidden md:hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-widest"
                  style={{ color: BRAND.black }}
                >
                  {link.name}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full py-3 rounded-xl text-center text-sm font-bold uppercase tracking-widest"
                style={{ background: BRAND.yellow, color: BRAND.black }}
              >
                Book via WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
