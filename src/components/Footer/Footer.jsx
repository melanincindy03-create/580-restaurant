import { Phone } from "lucide-react";
import { Logo } from "@/components/Logo/Logo";
import { BRAND } from "@/constants/brand";

export const Footer = () => (
  <footer
    style={{
      background: "#111",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}
    className="py-12"
  >
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2">
          <Logo inverted />
          <p
            className="mt-4 text-sm max-w-xs"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Premium dining rooted in community. Located in the heart of
            Katlehong, South Africa.
          </p>
        </div>
        <div>
          <h5
            className="text-xs uppercase tracking-widest font-bold mb-4"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Quick Links
          </h5>
          <div className="space-y-2.5">
            {["Menu", "About", "Reservations", "Reviews", "Contact"].map(
              (l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="block text-sm font-medium transition-colors"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                  onMouseEnter={(e) => (e.target.style.color = BRAND.yellow)}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.6)")
                  }
                >
                  {l}
                </a>
              ),
            )}
          </div>
        </div>
        <div>
          <h5
            className="text-xs uppercase tracking-widest font-bold mb-4"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Hours
          </h5>
          <div className="space-y-2.5">
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wide">
                Mon – Thu
              </p>
              <p className="text-sm font-bold text-white">10:00 – 21:00</p>
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wide">
                Fri – Sun
              </p>
              <p className="text-sm font-bold text-white">09:00 – 23:00</p>
            </div>
          </div>
          <a
            href={`tel:+27115800000`}
            className="flex items-center gap-2 mt-4 text-sm font-bold"
            style={{ color: BRAND.yellow }}
          >
            <Phone size={14} /> +27 11 580 0000
          </a>
        </div>
      </div>
      <div
        className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          © 2026 580 Restaurant. Built for Katlehong with Pride.
        </p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
