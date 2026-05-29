"use client";

import RestaurantNavbar from "@/components/RestaurantNavbar/RestaurantNavbar";
import RestaurantHero from "@/components/RestaurantHero/RestaurantHero";
import RestaurantAbout from "@/components/RestaurantAbout/RestaurantAbout";
import RestaurantMenu from "@/components/RestaurantMenu/RestaurantMenu";
import RestaurantGallery from "@/components/RestaurantGallery/RestaurantGallery";
import RestaurantReservation from "@/components/RestaurantReservation/RestaurantReservation";
import RestaurantReviews from "@/components/RestaurantReviews/RestaurantReviews";
import RestaurantLocation from "@/components/RestaurantLocation/RestaurantLocation";
import RestaurantContact from "@/components/RestaurantContact/RestaurantContact";
import RestaurantFooter from "@/components/RestaurantFooter/RestaurantFooter";

export default function RestaurantApp() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", overflowX: "hidden" }}>
      <RestaurantNavbar />
      <RestaurantHero />
      <RestaurantAbout />
      <RestaurantMenu />
      <RestaurantGallery />
      <RestaurantReservation />
      <RestaurantReviews />
      <RestaurantLocation />
      <RestaurantContact />
      <RestaurantFooter />

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        ::selection { background: rgba(200,169,110,0.35); color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1c1c1c; }
        ::-webkit-scrollbar-thumb { background: rgba(200,169,110,0.4); }
        ::-webkit-scrollbar-thumb:hover { background: rgba(200,169,110,0.7); }
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(0.6) sepia(0.3) saturate(0.5);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
