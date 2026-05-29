import { UtensilsCrossed, Instagram, Facebook, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { RESTAURANT, PALETTE } from "@/constants/restaurant";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export default function RestaurantFooter() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#111111", borderTop: `1px solid rgba(200,169,110,0.12)` }}>
      {/* Top band */}
      <div
        className="py-16"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 flex items-center justify-center border"
                  style={{ borderColor: `${PALETTE.gold}60` }}
                >
                  <UtensilsCrossed size={16} color={PALETTE.gold} strokeWidth={1.5} />
                </div>
                <div>
                  <div
                    className="text-sm tracking-[0.15em] uppercase"
                    style={{ color: PALETTE.white, fontFamily: "'Georgia', serif" }}
                  >
                    {RESTAURANT.name}
                  </div>
                  <div className="text-[9px] tracking-[0.4em] uppercase mt-0.5" style={{ color: PALETTE.gold }}>
                    Fine Dining
                  </div>
                </div>
              </div>
              <p
                className="text-sm leading-relaxed mb-6 max-w-xs"
                style={{ color: "rgba(229,229,229,0.35)" }}
              >
                An extraordinary dining destination in the heart of Sandton, Johannesburg. Where culinary artistry meets warm hospitality.
              </p>
              {/* Social */}
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: RESTAURANT.social.instagram, label: "Instagram" },
                  { icon: Facebook, href: RESTAURANT.social.facebook, label: "Facebook" },
                  { icon: Twitter, href: RESTAURANT.social.twitter, label: "Twitter" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center border transition-all duration-300"
                    style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = PALETTE.gold;
                      e.currentTarget.style.color = PALETTE.gold;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                    }}
                  >
                    <Icon size={14} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div
                className="text-[10px] uppercase tracking-[0.3em] mb-5"
                style={{ color: PALETTE.gold }}
              >
                Navigation
              </div>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="block text-sm transition-colors duration-200"
                    style={{ color: "rgba(229,229,229,0.4)" }}
                    onMouseEnter={(e) => (e.target.style.color = PALETTE.gold)}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(229,229,229,0.4)")}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div>
              <div
                className="text-[10px] uppercase tracking-[0.3em] mb-5"
                style={{ color: PALETTE.gold }}
              >
                Contact
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={13} color={`${PALETTE.gold}80`} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                  <span className="text-xs leading-relaxed" style={{ color: "rgba(229,229,229,0.4)" }}>
                    {RESTAURANT.address.full}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={13} color={`${PALETTE.gold}80`} strokeWidth={1.5} className="flex-shrink-0" />
                  <a
                    href={`tel:${RESTAURANT.phone}`}
                    className="text-xs transition-colors duration-200"
                    style={{ color: "rgba(229,229,229,0.4)" }}
                    onMouseEnter={(e) => (e.target.style.color = PALETTE.gold)}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(229,229,229,0.4)")}
                  >
                    {RESTAURANT.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={13} color={`${PALETTE.gold}80`} strokeWidth={1.5} className="flex-shrink-0" />
                  <a
                    href={`mailto:${RESTAURANT.email}`}
                    className="text-xs transition-colors duration-200"
                    style={{ color: "rgba(229,229,229,0.4)" }}
                    onMouseEnter={(e) => (e.target.style.color = PALETTE.gold)}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(229,229,229,0.4)")}
                  >
                    {RESTAURANT.email}
                  </a>
                </div>

                {/* Hours summary */}
                <div className="pt-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(229,229,229,0.3)" }}>
                    Hours
                  </div>
                  {RESTAURANT.hours.map(({ days, time }) => (
                    <div key={days} className="flex justify-between gap-2 mb-1">
                      <span className="text-[11px]" style={{ color: "rgba(229,229,229,0.3)" }}>{days}</span>
                      <span className="text-[11px]" style={{ color: "rgba(229,229,229,0.5)" }}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px]" style={{ color: "rgba(229,229,229,0.2)" }}>
            &copy; {new Date().getFullYear()} {RESTAURANT.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a key={l} href="#" className="text-[11px] transition-colors duration-200"
                style={{ color: "rgba(229,229,229,0.2)" }}
                onMouseEnter={(e) => (e.target.style.color = PALETTE.gold)}
                onMouseLeave={(e) => (e.target.style.color = "rgba(229,229,229,0.2)")}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
