import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { PALETTE } from "@/constants/restaurant";

const CATEGORIES = ["All", "Starters", "Main Meals", "Desserts", "Drinks"];

function MenuCard({ item, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay, duration: 0.4 }}
      layout
      className="group border-b flex gap-5 pb-7 transition-all duration-300"
      style={{ borderColor: "rgba(229,229,229,0.08)" }}
    >
      {item.image_url && (
        <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-3 min-w-0">
            <h4
              className="font-medium text-sm tracking-[0.05em]"
              style={{ color: PALETTE.white }}
            >
              {item.name}
            </h4>
            {item.is_featured && (
              <span
                className="text-[8px] uppercase tracking-[0.2em] px-2 py-0.5 flex-shrink-0"
                style={{ background: `${PALETTE.gold}22`, color: PALETTE.gold, border: `1px solid ${PALETTE.gold}44` }}
              >
                Chef's Pick
              </span>
            )}
          </div>
          <span
            className="font-light text-sm flex-shrink-0"
            style={{ color: PALETTE.gold, fontFamily: "'Georgia', serif" }}
          >
            R{Number(item.price).toFixed(2)}
          </span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(229,229,229,0.45)" }}>
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

// Skeleton loader
function MenuSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-5 pb-7 border-b animate-pulse" style={{ borderColor: "rgba(229,229,229,0.08)" }}>
          <div className="w-20 h-20 flex-shrink-0" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-4 w-48 rounded" style={{ background: "rgba(255,255,255,0.07)" }} />
            <div className="h-3 w-full rounded" style={{ background: "rgba(255,255,255,0.05)" }} />
            <div className="h-3 w-3/4 rounded" style={{ background: "rgba(255,255,255,0.04)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RestaurantMenu() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: menuData, isLoading } = useQuery({
    queryKey: ["menu"],
    queryFn: () =>
      fetch("/api/menu").then((r) => {
        if (!r.ok) throw new Error("Failed to load menu");
        return r.json();
      }),
  });

  const allItems = menuData?.allItems || [];
  const filtered =
    activeCategory === "All"
      ? allItems
      : allItems.filter((i) => i.category === activeCategory);

  return (
    <section id="menu" className="py-28" style={{ background: PALETTE.charcoal }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-px w-10" style={{ background: PALETTE.gold }} />
            <span className="text-[10px] uppercase tracking-[0.45em]" style={{ color: PALETTE.gold }}>
              Culinary Journey
            </span>
            <div className="h-px w-10" style={{ background: PALETTE.gold }} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-light"
            style={{
              color: PALETTE.white,
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            }}
          >
            Our Menu
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm max-w-md mx-auto leading-relaxed"
            style={{ color: "rgba(229,229,229,0.5)" }}
          >
            Seasonal ingredients, classical technique, and South African soul — every dish tells a story.
          </motion.p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 border"
              style={{
                background: activeCategory === cat ? PALETTE.gold : "transparent",
                color: activeCategory === cat ? PALETTE.dark : "rgba(229,229,229,0.55)",
                borderColor: activeCategory === cat ? PALETTE.gold : "rgba(229,229,229,0.15)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu list */}
        {isLoading ? (
          <MenuSkeleton />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} className="space-y-7">
              {filtered.map((item, i) => (
                <MenuCard key={item.id} item={item} delay={i * 0.04} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14 text-xs"
          style={{ color: "rgba(229,229,229,0.3)" }}
        >
          All prices are in South African Rand and include VAT. Menu is subject to seasonal changes.
        </motion.p>
      </div>
    </section>
  );
}
