import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import {
  Clock,
  Phone,
  MapPin,
  MessageCircle,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { BRAND, WHATSAPP_URL } from "@/constants/brand";

export const ReservationSection = () => {
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    reservation_date: "",
    reservation_time: "",
    guests: 2,
    special_requests: "",
  });
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: (data) =>
      fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) throw new Error("Reservation failed");
        return res.json();
      }),
    onSuccess: () => {
      setSuccess(true);
      setForm({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        reservation_date: "",
        reservation_time: "",
        guests: 2,
        special_requests: "",
      });
    },
  });

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const inputClass = {
    width: "100%",
    background: "rgba(255,255,255,0.07)",
    border: "1.5px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    padding: "14px 16px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelClass =
    "block text-[10px] uppercase tracking-[0.2em] font-bold mb-2 text-white/50";

  return (
    <section
      id="reservations"
      className="py-24"
      style={{ background: BRAND.cream }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left Info */}
          <div className="lg:col-span-2">
            <span
              className="text-xs uppercase tracking-[0.3em] font-bold mb-4 block"
              style={{ color: BRAND.yellow }}
            >
              Reservations
            </span>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight mb-6"
              style={{
                color: BRAND.black,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Reserve Your Table
            </h2>
            <p
              className="leading-relaxed mb-8 text-sm"
              style={{ color: "rgba(28,28,28,0.6)" }}
            >
              Book a table and let us take care of the rest. For large groups or
              special occasions, reach us on WhatsApp for personalised service.
            </p>
            <div className="space-y-5 mb-8">
              {[
                { icon: Clock, label: "Mon – Thu", value: "10:00 – 21:00" },
                { icon: Clock, label: "Fri – Sun", value: "09:00 – 23:00" },
                { icon: Phone, label: "Phone", value: "+27 11 580 0000" },
                {
                  icon: MapPin,
                  label: "Address",
                  value: "580 Hospital View, Katlehong",
                },
              ].map(({ icon: Icon, label, value }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: BRAND.yellow }}
                  >
                    <Icon size={16} color={BRAND.black} />
                  </div>
                  <div>
                    <div
                      className="text-[10px] uppercase tracking-widest font-bold"
                      style={{ color: "rgba(28,28,28,0.4)" }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: BRAND.black }}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-200"
              style={{ background: "#25D366", color: "#fff" }}
            >
              <MessageCircle size={20} />
              Book via WhatsApp
              <ExternalLink size={14} className="ml-auto" />
            </a>
          </div>

          {/* Right Form */}
          <div
            className="lg:col-span-3 rounded-[32px] p-8 md:p-10"
            style={{ background: BRAND.black }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: BRAND.yellow }}
                  >
                    <CheckCircle size={36} color={BRAND.black} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">
                    Reservation Confirmed!
                  </h3>
                  <p className="text-white/60 mb-8">
                    We'll see you soon. A confirmation has been sent to your
                    email.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest"
                    style={{ background: BRAND.yellow, color: BRAND.black }}
                  >
                    Book Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    mutation.mutate(form);
                  }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-black text-white mb-6">
                    Your Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input
                        required
                        type="text"
                        value={form.customer_name}
                        onChange={handleChange("customer_name")}
                        style={inputClass}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input
                        required
                        type="email"
                        value={form.customer_email}
                        onChange={handleChange("customer_email")}
                        style={inputClass}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input
                        required
                        type="tel"
                        value={form.customer_phone}
                        onChange={handleChange("customer_phone")}
                        style={inputClass}
                        placeholder="+27 ..."
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Number of Guests</label>
                      <select
                        value={form.guests}
                        onChange={handleChange("guests")}
                        style={{ ...inputClass, cursor: "pointer" }}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option
                            key={n}
                            value={n}
                            style={{ background: BRAND.black }}
                          >
                            {n} {n === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Date</label>
                      <input
                        required
                        type="date"
                        value={form.reservation_date}
                        onChange={handleChange("reservation_date")}
                        style={{ ...inputClass, colorScheme: "dark" }}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Time</label>
                      <input
                        required
                        type="time"
                        value={form.reservation_time}
                        onChange={handleChange("reservation_time")}
                        style={{ ...inputClass, colorScheme: "dark" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={form.special_requests}
                      onChange={handleChange("special_requests")}
                      rows={3}
                      placeholder="Allergies, celebrations, seating preferences..."
                      style={{ ...inputClass, resize: "none" }}
                    />
                  </div>
                  {mutation.isError && (
                    <p className="text-red-400 text-xs">
                      Something went wrong. Please try again or call us
                      directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-200 disabled:opacity-50"
                    style={{ background: BRAND.yellow, color: BRAND.black }}
                  >
                    {mutation.isPending
                      ? "Confirming..."
                      : "Confirm Reservation"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
