import { motion } from "motion/react";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { RESTAURANT, PALETTE } from "@/constants/restaurant";

export default function RestaurantLocation() {
  return (
    <section id="location" className="py-28" style={{ background: PALETTE.charcoal }}>
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
              Find Us
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
            Location & Hours
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-4">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 border"
              style={{ background: PALETTE.dark, borderColor: "rgba(200,169,110,0.12)" }}
            >
              <div className="flex gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 border"
                  style={{ borderColor: `${PALETTE.gold}50` }}
                >
                  <MapPin size={16} color={PALETTE.gold} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: PALETTE.gold }}>
                    Address
                  </div>
                  <div className="text-sm leading-relaxed" style={{ color: "rgba(229,229,229,0.7)" }}>
                    {RESTAURANT.address.street}
                    <br />
                    {RESTAURANT.address.suburb}, {RESTAURANT.address.city}
                    <br />
                    {RESTAURANT.address.province}, {RESTAURANT.address.country}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 border"
              style={{ background: PALETTE.dark, borderColor: "rgba(200,169,110,0.12)" }}
            >
              <div className="flex gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 border"
                  style={{ borderColor: `${PALETTE.gold}50` }}
                >
                  <Clock size={16} color={PALETTE.gold} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-[0.25em] mb-3" style={{ color: PALETTE.gold }}>
                    Operating Hours
                  </div>
                  <div className="space-y-2.5">
                    {RESTAURANT.hours.map(({ days, time }) => (
                      <div key={days} className="flex justify-between gap-4">
                        <span className="text-xs" style={{ color: "rgba(229,229,229,0.5)" }}>
                          {days}
                        </span>
                        <span className="text-xs font-medium" style={{ color: PALETTE.white }}>
                          {time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact quick */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 border"
              style={{ background: PALETTE.dark, borderColor: "rgba(200,169,110,0.12)" }}
            >
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 border"
                    style={{ borderColor: `${PALETTE.gold}50` }}
                  >
                    <Phone size={16} color={PALETTE.gold} strokeWidth={1.5} />
                  </div>
                  <a
                    href={`tel:${RESTAURANT.phone}`}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(229,229,229,0.7)" }}
                    onMouseEnter={(e) => (e.target.style.color = PALETTE.gold)}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(229,229,229,0.7)")}
                  >
                    {RESTAURANT.phone}
                  </a>
                </div>
                <div className="flex gap-4 items-center">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 border"
                    style={{ borderColor: `${PALETTE.gold}50` }}
                  >
                    <Mail size={16} color={PALETTE.gold} strokeWidth={1.5} />
                  </div>
                  <a
                    href={`mailto:${RESTAURANT.email}`}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(229,229,229,0.7)" }}
                    onMouseEnter={(e) => (e.target.style.color = PALETTE.gold)}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(229,229,229,0.7)")}
                  >
                    {RESTAURANT.email}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 overflow-hidden border"
            style={{ height: 440, borderColor: "rgba(200,169,110,0.12)" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14335.765899990263!2d28.04559!3d-26.10746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e957398e0c4b20d%3A0x6b96e9a0b4e9e33f!2sSandton%2C%20Johannesburg%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1716912345678"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(60%) invert(10%)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
