import { motion } from "motion/react";
import { Flame, Heart, Award, MessageCircle } from "lucide-react";
import { BRAND, WHATSAPP_URL } from "@/constants/brand";

export const AboutSection = () => {
  const pillars = [
    {
      icon: Flame,
      title: "Fire-Crafted",
      desc: "Every dish kissed by flame and built on bold flavour.",
    },
    {
      icon: Heart,
      title: "Community First",
      desc: "Born in Katlehong, built for the people who call it home.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      desc: "World-class standards without the world-class price tag.",
    },
  ];

  return (
    <section id="about" className="py-24" style={{ background: BRAND.black }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left – Image Collage */}
          <div className="relative">
            <div className="rounded-[40px] overflow-hidden aspect-square relative z-10">
              <img
                src="https://raw.createusercontent.com/b716d475-9a50-4c2d-bc21-d4f7694454e2/"
                alt="580 Restaurant Experience"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-6 rounded-2xl p-5 z-20 hidden md:block"
              style={{ background: BRAND.yellow, color: BRAND.black }}
            >
              <div className="text-3xl font-black">5+ Yrs</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-70">
                In Katlehong
              </div>
            </motion.div>
            {/* Decoration dot */}
            <div
              className="absolute -top-6 -left-6 w-24 h-24 rounded-full z-0 hidden md:block"
              style={{
                background: "rgba(245,197,66,0.15)",
                border: `2px dashed ${BRAND.yellow}`,
              }}
            />
          </div>

          {/* Right – Text */}
          <div>
            <span
              className="text-xs uppercase tracking-[0.3em] font-bold mb-4 block"
              style={{ color: BRAND.yellow }}
            >
              Our Story
            </span>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Authentic Soul,{" "}
              <span style={{ color: BRAND.yellow }}>Premium Craft.</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-6 text-base">
              580 Restaurant was born from a simple belief — that the people of
              Katlehong deserve the very best. We started with a small kitchen
              and a big dream: to serve food that tells our story, our culture,
              and our community.
            </p>
            <p className="text-white/60 leading-relaxed mb-10 text-base">
              Today, we're proud to be Katlehong's most loved dining
              destination. From fire-grilled meats to hearty South African
              classics, every plate is a love letter to our community.
            </p>

            <div className="grid grid-cols-1 gap-5 mb-10">
              {pillars.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: BRAND.yellow }}
                  >
                    <Icon size={18} color={BRAND.black} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-0.5">
                      {title}
                    </h4>
                    <p className="text-white/50 text-xs">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href="#reservations"
                className="px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-200"
                style={{ background: BRAND.yellow, color: BRAND.black }}
              >
                Book a Table
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest border border-white/20 text-white hover:border-white/60 transition-all duration-200 flex items-center gap-2"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
