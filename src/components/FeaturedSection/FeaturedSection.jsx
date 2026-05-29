import { motion } from "motion/react";
import { ChevronRight, Plus } from "lucide-react";
import { BRAND } from "@/constants/brand";
import { formatPrice } from "@/utils/formatPrice";

export const FeaturedSection = ({ items, onAddToCart }) => {
  const featured = items?.filter((i) => i.is_featured).slice(0, 4) || [];

  return (
    <section className="py-24" style={{ background: BRAND.cream }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-14 gap-6">
          <div>
            <span
              className="text-xs uppercase tracking-[0.3em] font-bold mb-3 block"
              style={{ color: BRAND.yellow }}
            >
              Handpicked For You
            </span>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight"
              style={{
                color: BRAND.black,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Chef's Selection
            </h2>
          </div>
          <a
            href="#menu"
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors duration-200"
            style={{ color: BRAND.black }}
            onMouseEnter={(e) => (e.currentTarget.style.color = BRAND.yellow)}
            onMouseLeave={(e) => (e.currentTarget.style.color = BRAND.black)}
          >
            Full Menu <ChevronRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.length === 0
            ? [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl overflow-hidden bg-white animate-pulse h-80"
                />
              ))
            : featured.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl overflow-hidden bg-white shadow-lg group cursor-pointer flex flex-col"
                  style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {item.is_featured && (
                      <span
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                        style={{ background: BRAND.yellow, color: BRAND.black }}
                      >
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3
                        className="font-bold text-base leading-tight flex-1 pr-2"
                        style={{ color: BRAND.black }}
                      >
                        {item.name}
                      </h3>
                      <span
                        className="font-black text-base whitespace-nowrap"
                        style={{ color: BRAND.yellow }}
                      >
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <p
                      className="text-xs leading-relaxed mb-4 flex-1"
                      style={{ color: "rgba(28,28,28,0.55)" }}
                    >
                      {item.description?.slice(0, 70)}...
                    </p>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200"
                      style={{ background: BRAND.black, color: "#fff" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = BRAND.yellow;
                        e.currentTarget.style.color = BRAND.black;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = BRAND.black;
                        e.currentTarget.style.color = "#fff";
                      }}
                    >
                      <Plus size={14} /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};
