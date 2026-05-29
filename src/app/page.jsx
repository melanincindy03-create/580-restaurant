"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { StatsBar } from "@/components/StatsBar/StatsBar";
import { FeaturedSection } from "@/components/FeaturedSection/FeaturedSection";
import { MenuSection } from "@/components/MenuSection/MenuSection";
import { AboutSection } from "@/components/AboutSection/AboutSection";
import { ReservationSection } from "@/components/ReservationSection/ReservationSection";
import { ReviewsSection } from "@/components/ReviewsSection/ReviewsSection";
import { ContactSection } from "@/components/ContactSection/ContactSection";
import { Footer } from "@/components/Footer/Footer";
import { CartDrawer } from "@/components/CartDrawer/CartDrawer";
import { Toast } from "@/components/Toast/Toast";
import { BRAND } from "@/constants/brand";

export default function RestaurantApp() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const { data: menuData } = useQuery({
    queryKey: ["menu"],
    queryFn: () =>
      fetch("/api/menu").then((res) => {
        if (!res.ok) throw new Error("Failed to load menu");
        return res.json();
      }),
  });

  const showToast = useCallback((msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  }, []);

  const addToCart = useCallback(
    (item) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing)
          return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          );
        return [...prev, { ...item, quantity: 1 }];
      });
      showToast(`${item.name} added to cart`);
    },
    [showToast],
  );

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) setCart((prev) => prev.filter((i) => i.id !== id));
    else
      setCart((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
      );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div
      className="font-sans"
      style={{ color: BRAND.black, background: "#fff" }}
    >
      <Navbar onCartOpen={() => setIsCartOpen(true)} cartCount={cartCount} />
      <Hero />
      <StatsBar />
      <FeaturedSection items={menuData?.allItems} onAddToCart={addToCart} />
      <MenuSection
        groupedMenu={menuData?.groupedMenu}
        allItems={menuData?.allItems}
        onAddToCart={addToCart}
      />
      <AboutSection />
      <ReservationSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onClearCart={clearCart}
      />
      <Toast show={toast.show} message={toast.message} />

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(1) opacity(0.5);
          cursor: pointer;
        }
        * { box-sizing: border-box; }
        ::selection { background: #F5C542; color: #1C1C1C; }
      `}</style>
    </div>
  );
}
