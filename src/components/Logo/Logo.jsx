import { ChefHat } from "lucide-react";
import { BRAND } from "@/constants/brand";

export const Logo = ({ inverted = false }) => (
  <a href="#" className="flex items-center gap-2 select-none">
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center"
      style={{ background: inverted ? "#FFFFFF" : BRAND.yellow }}
    >
      <ChefHat
        size={20}
        color={inverted ? BRAND.black : BRAND.black}
        strokeWidth={2.5}
      />
    </div>
    <div>
      <span
        className="text-xl font-black tracking-tighter leading-none block"
        style={{
          color: inverted ? "#FFFFFF" : BRAND.black,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        580
      </span>
      <span
        className="text-[8px] uppercase tracking-[0.25em] font-bold leading-none block -mt-0.5"
        style={{
          color: inverted ? "rgba(255,255,255,0.6)" : "rgba(28,28,28,0.5)",
        }}
      >
        Restaurant
      </span>
    </div>
  </a>
);
