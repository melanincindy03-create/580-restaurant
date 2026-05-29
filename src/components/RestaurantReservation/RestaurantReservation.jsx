import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CircleCheck as CheckCircle, Calendar, Users, Clock } from "lucide-react";
import { PALETTE, RESTAURANT } from "@/constants/restaurant";

const inputBase = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(229,229,229,0.12)",
  padding: "13px 16px",
  color: "#fff",
  fontSize: "13px",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

export default function RestaurantReservation() {
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    reservation_date: "",
    reservation_time: "",
    guests: 2,
    special_requests: "",
  });
  const [status, setStatus] = useState("idle");

  const handle = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({
        customer_name: "", customer_email: "", customer_phone: "",
        reservation_date: "", reservation_time: "", guests: 2, special_requests: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const label = "block text-[10px] uppercase tracking-[0.2em] mb-2";

  return (
    <section id="reservations" className="py-28" style={{ background: PALETTE.charcoal }}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-px w-10" style={{ background: PALETTE.gold }} />
            <span className="text-[10px] uppercase tracking-[0.45em]" style={{ color: PALETTE.gold }}>
              Reserve a Table
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
            Make a Reservation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm max-w-sm mx-auto"
            style={{ color: "rgba(229,229,229,0.4)" }}
          >
            Secure your table for an unforgettable dining experience.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border p-8 md:p-12"
          style={{ background: PALETTE.dark, borderColor: "rgba(200,169,110,0.15)" }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-12"
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
                  Reservation Confirmed
                </h3>
                <p className="text-sm mb-8 max-w-sm" style={{ color: "rgba(229,229,229,0.5)" }}>
                  We look forward to welcoming you. A confirmation has been sent to your email address.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-8 py-3 text-[11px] uppercase tracking-[0.2em] border transition-all duration-300"
                  style={{ borderColor: PALETTE.gold, color: PALETTE.gold }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = PALETTE.gold; e.currentTarget.style.color = PALETTE.dark; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = PALETTE.gold; }}
                >
                  Book Another Table
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={label} style={{ color: "rgba(229,229,229,0.45)" }}>Full Name *</label>
                    <input required type="text" value={form.customer_name} onChange={handle("customer_name")} placeholder="Your name" style={inputBase}
                      onFocus={(e) => (e.target.style.borderColor = `${PALETTE.gold}60`)}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(229,229,229,0.12)")} />
                  </div>
                  <div>
                    <label className={label} style={{ color: "rgba(229,229,229,0.45)" }}>Email Address *</label>
                    <input required type="email" value={form.customer_email} onChange={handle("customer_email")} placeholder="your@email.com" style={inputBase}
                      onFocus={(e) => (e.target.style.borderColor = `${PALETTE.gold}60`)}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(229,229,229,0.12)")} />
                  </div>
                  <div>
                    <label className={label} style={{ color: "rgba(229,229,229,0.45)" }}>Phone Number *</label>
                    <input required type="tel" value={form.customer_phone} onChange={handle("customer_phone")} placeholder="+27 ..." style={inputBase}
                      onFocus={(e) => (e.target.style.borderColor = `${PALETTE.gold}60`)}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(229,229,229,0.12)")} />
                  </div>
                  <div>
                    <label className={label} style={{ color: "rgba(229,229,229,0.45)" }}>Number of Guests *</label>
                    <select required value={form.guests} onChange={handle("guests")} style={{ ...inputBase, cursor: "pointer", colorScheme: "dark" }}>
                      {[1,2,3,4,5,6,7,8,9,10,12,15,20].map((n) => (
                        <option key={n} value={n} style={{ background: PALETTE.dark }}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={label} style={{ color: "rgba(229,229,229,0.45)" }}>Preferred Date *</label>
                    <input required type="date" value={form.reservation_date} onChange={handle("reservation_date")} style={{ ...inputBase, colorScheme: "dark" }}
                      onFocus={(e) => (e.target.style.borderColor = `${PALETTE.gold}60`)}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(229,229,229,0.12)")} />
                  </div>
                  <div>
                    <label className={label} style={{ color: "rgba(229,229,229,0.45)" }}>Preferred Time *</label>
                    <input required type="time" value={form.reservation_time} onChange={handle("reservation_time")} style={{ ...inputBase, colorScheme: "dark" }}
                      onFocus={(e) => (e.target.style.borderColor = `${PALETTE.gold}60`)}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(229,229,229,0.12)")} />
                  </div>
                </div>

                <div>
                  <label className={label} style={{ color: "rgba(229,229,229,0.45)" }}>Special Requests</label>
                  <textarea rows={4} value={form.special_requests} onChange={handle("special_requests")}
                    placeholder="Dietary requirements, occasions, seating preferences..."
                    style={{ ...inputBase, resize: "none" }}
                    onFocus={(e) => (e.target.style.borderColor = `${PALETTE.gold}60`)}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(229,229,229,0.12)")} />
                </div>

                {status === "error" && (
                  <p className="text-xs" style={{ color: "#e87070" }}>
                    Something went wrong. Please try again or call us at {RESTAURANT.phone}.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-300"
                  style={{ background: PALETTE.gold, color: PALETTE.dark, opacity: status === "loading" ? 0.7 : 1 }}
                  onMouseEnter={(e) => { if (status !== "loading") e.currentTarget.style.background = PALETTE.goldLight; }}
                  onMouseLeave={(e) => (e.currentTarget.style.background = PALETTE.gold)}
                >
                  {status === "loading" ? "Confirming Reservation..." : "Confirm Reservation"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
