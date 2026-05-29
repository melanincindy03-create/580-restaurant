import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/constants/brand";

export const Hero = () => {
  const words = ["Excellence.", "Flavour.", "Experience.", "Passion."];
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setWordIdx((i) => (i + 1) % words.length),
      3000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://raw.createusercontent.com/c7e9dbad-d3bc-46b5-ad0b-d2b8283ae3d4/"
          alt="580 Restaurant"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.4)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(28,28,28,0.3) 0%, rgba(28,28,28,0.7) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center justify-center gap-3"
        >
          <div className="w-12 h-px" style={{ background: BRAND.yellow }} />
          <span
            className="text-xs uppercase tracking-[0.4em] font-bold"
            style={{ color: BRAND.yellow }}
          >
            Katlehong's Finest
          </span>
          <div className="w-12 h-px" style={{ background: BRAND.yellow }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-black tracking-tighter leading-none mb-4"
          style={{
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          A Taste of
        </motion.h1>

        <div
          className="relative overflow-hidden mb-10"
          style={{ height: "clamp(3rem, 10vw, 8rem)" }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={wordIdx}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="font-black tracking-tighter leading-none absolute inset-x-0"
              style={{
                fontSize: "clamp(3rem, 10vw, 8rem)",
                color: BRAND.yellow,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              {words[wordIdx]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/70 mb-10 max-w-md mx-auto text-lg"
        >
          Premium dining rooted in community. Made fresh, served with pride.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#menu"
            className="group px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest flex items-center gap-3 transition-all duration-300"
            style={{ background: BRAND.yellow, color: BRAND.black }}
          >
            Order Now
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#reservations"
            className="px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest border-2 border-white/40 text-white hover:border-white hover:bg-white/10 transition-all duration-300"
          >
            Book a Table
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-10"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-white/20" />
      </motion.div>
    </section>
  );
};
