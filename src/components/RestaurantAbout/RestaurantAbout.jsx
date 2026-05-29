import { motion } from "motion/react";
import { Award, Leaf, Star, Users } from "lucide-react";
import { PALETTE } from "@/constants/restaurant";

const pillars = [
  {
    icon: Leaf,
    title: "Finest Ingredients",
    desc: "We source only the highest quality seasonal produce and premium proteins from trusted local and international suppliers.",
  },
  {
    icon: Award,
    title: "Culinary Excellence",
    desc: "Our award-winning chef brings over two decades of fine dining expertise, creating dishes that are both artful and memorable.",
  },
  {
    icon: Users,
    title: "Impeccable Service",
    desc: "Every guest is treated with the warmth and attentiveness that transforms a meal into an unforgettable occasion.",
  },
  {
    icon: Star,
    title: "Guest Satisfaction",
    desc: "Our unwavering commitment to excellence has earned us recognition as one of Johannesburg's finest dining destinations.",
  },
];

export default function RestaurantAbout() {
  return (
    <section id="about" className="py-28" style={{ background: PALETTE.dark }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-px w-10" style={{ background: PALETTE.gold }} />
          <span className="text-[10px] uppercase tracking-[0.45em]" style={{ color: PALETTE.gold }}>
            Our Story
          </span>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left – Text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-light mb-6 leading-tight"
              style={{
                color: PALETTE.white,
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              A Legacy of Refined Dining Excellence
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="leading-relaxed mb-5 text-base"
              style={{ color: "rgba(229,229,229,0.6)" }}
            >
              Founded in 2018, The Grand Table was born from a singular vision: to create a dining experience in the heart of Sandton that rivals the world's finest restaurants. We believe that exceptional food is more than sustenance — it is an expression of culture, creativity, and connection.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="leading-relaxed mb-10 text-base"
              style={{ color: "rgba(229,229,229,0.6)" }}
            >
              Our kitchen is led by Executive Chef Marco Ndlovu, whose culinary journey has taken him from the streets of Cape Town to the kitchens of Paris and London. He returns home with a philosophy that honours South African heritage while embracing global technique — each dish tells a story that begins here.
            </motion.p>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1" style={{ background: "rgba(200,169,110,0.25)" }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: PALETTE.gold }} />
              <div className="h-px flex-1" style={{ background: "rgba(200,169,110,0.25)" }} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "7+", label: "Years of Excellence" },
                { value: "50K+", label: "Guests Welcomed" },
                { value: "3", label: "Awards Received" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div
                    className="text-3xl font-light mb-1"
                    style={{ color: PALETTE.gold, fontFamily: "'Georgia', serif" }}
                  >
                    {value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(229,229,229,0.4)" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Images */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="overflow-hidden" style={{ height: 260 }}>
                  <img
                    src="https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=600&q=80"
                    alt="Restaurant interior"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden" style={{ height: 180 }}>
                  <img
                    src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600&q=80"
                    alt="Plated dish"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-10">
                <div className="overflow-hidden" style={{ height: 180 }}>
                  <img
                    src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600&q=80"
                    alt="Fine dining"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden" style={{ height: 260 }}>
                  <img
                    src="https://images.pexels.com/photos/3184195/pexels-photo-3184195.jpeg?auto=compress&cs=tinysrgb&w=600&q=80"
                    alt="Chef preparing"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>

            {/* Gold accent bar */}
            <div
              className="absolute -left-4 top-8 w-1 h-32 hidden lg:block"
              style={{ background: `linear-gradient(180deg, ${PALETTE.gold}, transparent)` }}
            />
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {pillars.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-7 border border-transparent transition-all duration-300 group"
              style={{ background: PALETTE.charcoal }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${PALETTE.gold}44`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
            >
              <div
                className="w-10 h-10 flex items-center justify-center border mb-5"
                style={{ borderColor: `${PALETTE.gold}60` }}
              >
                <Icon size={18} color={PALETTE.gold} strokeWidth={1.5} />
              </div>
              <h4
                className="text-sm uppercase tracking-[0.15em] mb-3 font-medium"
                style={{ color: PALETTE.white }}
              >
                {title}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(229,229,229,0.5)" }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
