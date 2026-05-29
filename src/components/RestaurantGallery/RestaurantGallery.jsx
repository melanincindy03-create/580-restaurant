import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { PALETTE } from "@/constants/restaurant";

const GALLERY_IMAGES = [
  {
    src: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    alt: "Elegant plated dish",
    caption: "Signature Starter",
  },
  {
    src: "https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    alt: "Restaurant dining room",
    caption: "The Dining Room",
  },
  {
    src: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    alt: "Chef at work",
    caption: "Kitchen Artistry",
  },
  {
    src: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    alt: "Pasta dish",
    caption: "House-made Pasta",
  },
  {
    src: "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    alt: "Wine and dining",
    caption: "Curated Wine Selection",
  },
  {
    src: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    alt: "Dessert plating",
    caption: "Artisan Desserts",
  },
  {
    src: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    alt: "Restaurant bar",
    caption: "The Cocktail Bar",
  },
  {
    src: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    alt: "Beef fillet",
    caption: "Prime Beef Fillet",
  },
  {
    src: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    alt: "Table setting",
    caption: "Impeccable Setting",
  },
];

export default function RestaurantGallery() {
  const [lightbox, setLightbox] = useState(null); // index

  const openLightbox = (i) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => setLightbox((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  const nextImage = () => setLightbox((i) => (i + 1) % GALLERY_IMAGES.length);

  return (
    <section id="gallery" className="py-28" style={{ background: PALETTE.dark }}>
      <div className="max-w-7xl mx-auto px-6">
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
              Visual Story
            </span>
            <div className="h-px w-10" style={{ background: PALETTE.gold }} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-light"
            style={{ color: PALETTE.white, fontFamily: "'Georgia', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Gallery
          </motion.h2>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`relative overflow-hidden cursor-pointer group ${i === 0 || i === 5 ? "row-span-2" : ""}`}
              style={{ height: i === 0 || i === 5 ? undefined : 220 }}
              onClick={() => openLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ minHeight: i === 0 || i === 5 ? 460 : 220 }}
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: "rgba(28,28,28,0.65)" }}
              >
                <ZoomIn size={28} color={PALETTE.gold} strokeWidth={1.5} />
                <span
                  className="mt-3 text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {img.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_IMAGES[lightbox].src}
                alt={GALLERY_IMAGES[lightbox].alt}
                className="max-h-[80vh] w-full object-contain"
              />
              <p
                className="mt-4 text-[11px] uppercase tracking-[0.35em]"
                style={{ color: PALETTE.gold }}
              >
                {GALLERY_IMAGES[lightbox].caption}
              </p>
              {/* Close */}
              <button
                className="absolute top-0 right-0 p-2"
                onClick={closeLightbox}
              >
                <X size={24} color="rgba(255,255,255,0.7)" />
              </button>
              {/* Prev / Next */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 p-3"
                onClick={prevImage}
              >
                <ChevronLeft size={28} color="rgba(255,255,255,0.6)" />
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 p-3"
                onClick={nextImage}
              >
                <ChevronRight size={28} color="rgba(255,255,255,0.6)" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
