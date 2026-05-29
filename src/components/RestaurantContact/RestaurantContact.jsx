import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MessageCircle, CircleCheck as CheckCircle, Clock } from "lucide-react";
import { RESTAURANT, PALETTE } from "@/constants/restaurant";

const inputBase = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(229,229,229,0.12)",
  borderRadius: 0,
  padding: "14px 16px",
  color: "#fff",
  fontSize: "13px",
  outline: "none",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

export default function RestaurantContact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handle = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const whatsappUrl = `https://wa.me/${RESTAURANT.whatsapp}?text=Hello%2C%20I%20would%20like%20to%20make%20a%20reservation%20at%20${encodeURIComponent(RESTAURANT.name)}.`;

  return (
    <section id="contact" className="py-28" style={{ background: PALETTE.dark }}>
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
              Get in Touch
            </span>
            <div className="h-px w-10" style={{ background: PALETTE.gold }} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-light mb-4"
            style={{ color: PALETTE.white, fontFamily: "'Georgia', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Contact & Reservations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm max-w-md mx-auto"
            style={{ color: "rgba(229,229,229,0.45)" }}
          >
            We would be honoured to host you. Please reach out to arrange your reservation or enquiry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left – Contact info */}
          <div className="lg:col-span-2 space-y-5">
            {[
              { icon: Phone, label: "Phone", value: RESTAURANT.phone, href: `tel:${RESTAURANT.phone}` },
              { icon: Mail, label: "Email", value: RESTAURANT.email, href: `mailto:${RESTAURANT.email}` },
              { icon: Clock, label: "Reservations", value: "Booking available daily 09:00 – 17:00", href: null },
            ].map(({ icon: Icon, label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-5 border"
                style={{ borderColor: "rgba(200,169,110,0.12)", background: PALETTE.charcoal }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 border"
                  style={{ borderColor: `${PALETTE.gold}50` }}
                >
                  <Icon size={16} color={PALETTE.gold} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: PALETTE.gold }}>
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "rgba(229,229,229,0.7)" }}
                      onMouseEnter={(e) => (e.target.style.color = PALETTE.gold)}
                      onMouseLeave={(e) => (e.target.style.color = "rgba(229,229,229,0.7)")}
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm" style={{ color: "rgba(229,229,229,0.7)" }}>{value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 w-full text-left transition-all duration-300 border"
              style={{ background: "#1a472a", borderColor: "#2d6a40" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#255c36")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1a472a")}
            >
              <div
                className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                style={{ background: "#25D366" }}
              >
                <MessageCircle size={18} color="#fff" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: "#6bcf88" }}>
                  WhatsApp
                </div>
                <div className="text-sm" style={{ color: "#c8f0d4" }}>
                  Message us directly
                </div>
              </div>
            </motion.a>
          </div>

          {/* Right – Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 p-8 border"
            style={{ background: PALETTE.charcoal, borderColor: "rgba(200,169,110,0.12)" }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div
                    className="w-16 h-16 flex items-center justify-center border mb-6"
                    style={{ borderColor: PALETTE.gold }}
                  >
                    <CheckCircle size={28} color={PALETTE.gold} strokeWidth={1.5} />
                  </div>
                  <h3
                    className="text-xl font-light mb-3"
                    style={{ color: PALETTE.white, fontFamily: "'Georgia', serif" }}
                  >
                    Message Received
                  </h3>
                  <p className="text-sm mb-8" style={{ color: "rgba(229,229,229,0.5)" }}>
                    Thank you for your enquiry. We will be in contact with you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 text-[11px] uppercase tracking-[0.2em] border transition-all duration-300"
                    style={{ borderColor: PALETTE.gold, color: PALETTE.gold }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = PALETTE.gold;
                      e.currentTarget.style.color = PALETTE.dark;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = PALETTE.gold;
                    }}
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <h3
                    className="text-base font-light tracking-[0.1em] mb-6"
                    style={{ color: PALETTE.white, fontFamily: "'Georgia', serif" }}
                  >
                    Send Us a Message
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(229,229,229,0.45)" }}>
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={handle("name")}
                        placeholder="Your name"
                        style={inputBase}
                        onFocus={(e) => (e.target.style.borderColor = `${PALETTE.gold}70`)}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(229,229,229,0.12)")}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(229,229,229,0.45)" }}>
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={handle("email")}
                        placeholder="your@email.com"
                        style={inputBase}
                        onFocus={(e) => (e.target.style.borderColor = `${PALETTE.gold}70`)}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(229,229,229,0.12)")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(229,229,229,0.45)" }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={handle("phone")}
                      placeholder="+27 ..."
                      style={inputBase}
                      onFocus={(e) => (e.target.style.borderColor = `${PALETTE.gold}70`)}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(229,229,229,0.12)")}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(229,229,229,0.45)" }}>
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={handle("message")}
                      placeholder="Your enquiry or reservation request..."
                      style={{ ...inputBase, resize: "none" }}
                      onFocus={(e) => (e.target.style.borderColor = `${PALETTE.gold}70`)}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(229,229,229,0.12)")}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-xs" style={{ color: "#e87070" }}>
                      Something went wrong. Please try again or call us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300"
                    style={{ background: PALETTE.gold, color: PALETTE.dark, opacity: status === "loading" ? 0.7 : 1 }}
                    onMouseEnter={(e) => { if (status !== "loading") e.currentTarget.style.background = PALETTE.goldLight; }}
                    onMouseLeave={(e) => (e.currentTarget.style.background = PALETTE.gold)}
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
