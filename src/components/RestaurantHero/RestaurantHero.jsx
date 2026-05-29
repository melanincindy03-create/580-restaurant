import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { RESTAURANT, PALETTE } from "@/constants/restaurant";

export default function RestaurantHero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Background image placeholder */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80"
          alt="Restaurant interior"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(28,28,28,0.55) 0%, rgba(28,28,28,0.75) 60%, rgba(28,28,28,0.9) 100%)",
          }}
        />
      </div>

      {/* Decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: `linear-gradient(90deg, transparent, ${PALETTE.gold}, transparent)` }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-12" style={{ background: PALETTE.gold }} />
          <span
            className="text-[10px] uppercase tracking-[0.5em]"
            style={{ color: PALETTE.gold }}
          >
            Est. 2018 · Sandton, Johannesburg
          </span>
          <div className="h-px w-12" style={{ background: PALETTE.gold }} />
        </motion.div>

        {/* Restaurant name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-light tracking-[0.08em] mb-4 uppercase"
          style={{
            color: PALETTE.white,
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            lineHeight: 1.1,
          }}
        >
          {RESTAURANT.name}
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px flex-1 max-w-[80px]" style={{ background: PALETTE.gold, opacity: 0.5 }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: PALETTE.gold }} />
          <div className="h-px flex-1 max-w-[80px]" style={{ background: PALETTE.gold, opacity: 0.5 }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-sm tracking-[0.3em] uppercase mb-4"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          {RESTAURANT.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="text-base md:text-lg font-light mb-12 max-w-lg mx-auto leading-relaxed"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Exceptional cuisine crafted from the finest ingredients, served in an atmosphere of understated elegance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("#menu")}
            className="px-10 py-4 text-sm uppercase tracking-[0.25em] font-medium transition-all duration-300"
            style={{ background: PALETTE.gold, color: PALETTE.dark }}
            onMouseEnter={(e) => (e.currentTarget.style.background = PALETTE.goldLight)}
            onMouseLeave={(e) => (e.currentTarget.style.background = PALETTE.gold)}
          >
            View Menu
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="px-10 py-4 text-sm uppercase tracking-[0.25em] font-medium border transition-all duration-300"
            style={{ borderColor: "rgba(255,255,255,0.5)", color: PALETTE.white }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = PALETTE.gold;
              e.currentTarget.style.color = PALETTE.gold;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.color = PALETTE.white;
            }}
          >
            Contact Us
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo("#about")}
      >
        <span className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "rgba(255,255,255,0.35)" }}>
          Scroll
        </span>
        <ChevronDown size={18} color={PALETTE.gold} />
      </motion.div>

      {/* Bottom decorative border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: `linear-gradient(90deg, transparent, ${PALETTE.gold}44, transparent)` }}
      />
    </section>
  );
}
