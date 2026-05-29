import { useState } from "react";
import { motion } from "motion/react";
import { Search, Utensils, Plus } from "lucide-react";
import { BRAND } from "@/constants/brand";
import { formatPrice } from "@/utils/formatPrice";

export const MenuSection = ({ groupedMenu, allItems, onAddToCart }) => {
  const categories = groupedMenu
    ? ["All", ...groupedMenu.map((g) => g.category)]
    : [];
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = (() => {
    let base =
      activeCategory === "All"
        ? allItems || []
        : allItems?.filter((i) => i.category === activeCategory) || [];
    if (search.trim()) {
      const q = search.toLowerCase();
      base = base.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q),
      );
    }
    return base;
  })();

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-xs uppercase tracking-[0.3em] font-bold mb-3 block"
            style={{ color: BRAND.yellow }}
          >
            What We Offer
          </span>
          <h2
            className="text-4xl md:text-6xl font-black tracking-tight mb-4"
            style={{
              color: BRAND.black,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Our Digital Menu
          </h2>
          <p
            className="max-w-md mx-auto text-sm"
            style={{ color: "rgba(28,28,28,0.55)" }}
          >
            Fresh ingredients, bold flavours and premium quality — every single
            day.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "rgba(28,28,28,0.4)" }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search our menu..."
            className="w-full pl-10 pr-4 py-3.5 rounded-2xl text-sm border outline-none transition-all duration-200"
            style={{
              background: BRAND.beige,
              border: "1.5px solid transparent",
              color: BRAND.black,
            }}
            onFocus={(e) => (e.target.style.borderColor = BRAND.yellow)}
            onBlur={(e) => (e.target.style.borderColor = "transparent")}
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-12 scrollbar-hide justify-center flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-200"
              style={{
                background: activeCategory === cat ? BRAND.black : BRAND.beige,
                color: activeCategory === cat ? "#fff" : BRAND.black,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filtered.length === 0 ? (
          <div
            className="text-center py-20"
            style={{ color: "rgba(28,28,28,0.4)" }}
          >
            <Utensils size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-bold">No items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className="group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col"
                style={{
                  borderColor: "rgba(28,28,28,0.08)",
                  background: "#fff",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = BRAND.yellow)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(28,28,28,0.08)")
                }
              >
                {/* Image */}
                {item.image_url && (
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase"
                        style={{
                          background: "rgba(28,28,28,0.7)",
                          color: "#fff",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>
                )}
                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4
                      className="font-bold text-base flex-1 pr-2"
                      style={{ color: BRAND.black }}
                    >
                      {item.name}
                    </h4>
                    <span
                      className="font-black text-base"
                      style={{ color: BRAND.yellow }}
                    >
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed mb-4 flex-1"
                    style={{ color: "rgba(28,28,28,0.55)" }}
                  >
                    {item.description}
                  </p>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 mt-auto"
                    style={{ background: BRAND.beige, color: BRAND.black }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = BRAND.yellow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = BRAND.beige;
                    }}
                  >
                    <Plus size={14} /> Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
