import { motion } from "motion/react";
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { BRAND, WHATSAPP_URL } from "@/constants/brand";

export const ContactSection = () => (
  <section id="contact" className="py-24" style={{ background: BRAND.black }}>
    <div className="container mx-auto px-6">
      <div className="text-center mb-14">
        <span
          className="text-xs uppercase tracking-[0.3em] font-bold mb-3 block"
          style={{ color: BRAND.yellow }}
        >
          Find Us
        </span>
        <h2
          className="text-4xl md:text-5xl font-black tracking-tight text-white"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          Visit 580 Restaurant
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Info */}
        <div className="space-y-6">
          {[
            {
              icon: MapPin,
              title: "Our Location",
              lines: [
                "580 Hospital View",
                "Katlehong, Gauteng",
                "South Africa",
              ],
            },
            {
              icon: Phone,
              title: "Phone & Email",
              lines: ["+27 11 580 0000", "hello@580restaurant.co.za"],
            },
            {
              icon: Clock,
              title: "Business Hours",
              lines: [
                "Monday – Thursday: 10:00 – 21:00",
                "Friday – Sunday: 09:00 – 23:00",
                "Public Holidays: 10:00 – 22:00",
              ],
            },
          ].map(({ icon: Icon, title, lines }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5 p-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: BRAND.yellow }}
              >
                <Icon size={20} color={BRAND.black} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-2">{title}</h4>
                {lines.map((line, j) => (
                  <p
                    key={j}
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Social */}
          <div className="flex gap-3 pt-2">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Facebook, label: "Facebook" },
              { Icon: Twitter, label: "Twitter" },
              { Icon: MessageCircle, label: "WhatsApp", href: WHATSAPP_URL },
            ].map(({ Icon, label, href = "#" }, i) => (
              <a
                key={i}
                href={href}
                target={href !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                title={label}
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.6)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = BRAND.yellow;
                  e.currentTarget.style.color = BRAND.black;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Map */}
        <div
          className="rounded-[32px] overflow-hidden"
          style={{ height: 420, border: `3px solid rgba(255,255,255,0.08)` }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114486.299596001!2d28.1466035!3d-26.3113576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95089c894806a3%3A0xc3f9829c9c381c8c!2sKatlehong%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1716912345678!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
);
