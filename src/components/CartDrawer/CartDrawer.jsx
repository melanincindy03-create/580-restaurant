import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  Store,
  Truck,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { BRAND } from "@/constants/brand";
import { formatPrice } from "@/utils/formatPrice";

export const CartDrawer = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemove,
  onClearCart,
}) => {
  const [step, setStep] = useState("cart"); // 'cart' | 'checkout' | 'success'
  const [orderType, setOrderType] = useState("pickup");
  const [checkoutForm, setCheckoutForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    address: "",
  });
  const [orderError, setOrderError] = useState(null);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  const mutation = useMutation({
    mutationFn: (data) =>
      fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) throw new Error("Order failed");
        return res.json();
      }),
    onSuccess: () => {
      setStep("success");
      onClearCart();
    },
    onError: () =>
      setOrderError("Something went wrong. Please try again or call us."),
  });

  const handleCheckout = (e) => {
    e.preventDefault();
    setOrderError(null);
    mutation.mutate({
      ...checkoutForm,
      order_type: orderType,
      total_amount: total,
      items: cart.map((i) => ({
        id: i.id,
        quantity: i.quantity,
        price: i.price,
      })),
    });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStep("cart"), 400);
  };

  const inputStyle = {
    width: "100%",
    background: BRAND.beige,
    border: "1.5px solid transparent",
    borderRadius: "12px",
    padding: "12px 14px",
    fontSize: "14px",
    color: BRAND.black,
    outline: "none",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-end"
          style={{
            background: "rgba(28,28,28,0.6)",
            backdropFilter: "blur(4px)",
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="w-full max-w-md bg-white h-full flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(28,28,28,0.08)" }}
            >
              <div className="flex items-center gap-3">
                {step === "checkout" && (
                  <button onClick={() => setStep("cart")} className="mr-1">
                    <ChevronRight
                      size={20}
                      className="rotate-180"
                      style={{ color: BRAND.black }}
                    />
                  </button>
                )}
                <h2
                  className="font-black text-xl"
                  style={{ color: BRAND.black }}
                >
                  {step === "cart"
                    ? "Your Order"
                    : step === "checkout"
                      ? "Checkout"
                      : "Order Placed!"}
                </h2>
                {step === "cart" && cart.length > 0 && (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-black"
                    style={{ background: BRAND.yellow, color: BRAND.black }}
                  >
                    {cart.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button onClick={handleClose}>
                <X size={22} style={{ color: BRAND.black }} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {step === "cart" && (
                  <motion.div
                    key="cart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6"
                  >
                    {cart.length === 0 ? (
                      <div
                        className="flex flex-col items-center justify-center py-20 text-center"
                        style={{ color: "rgba(28,28,28,0.3)" }}
                      >
                        <ShoppingCart size={64} className="mb-4" />
                        <p className="font-bold text-lg">Your cart is empty</p>
                        <p className="text-sm mt-1">
                          Add some delicious items from our menu!
                        </p>
                        <button
                          onClick={handleClose}
                          className="mt-6 px-6 py-3 rounded-xl text-sm font-bold"
                          style={{ background: BRAND.black, color: "#fff" }}
                        >
                          Browse Menu
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            exit={{ opacity: 0, x: 40 }}
                            className="flex gap-4 p-4 rounded-2xl"
                            style={{ background: BRAND.beige }}
                          >
                            {item.image_url && (
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <h4
                                className="font-bold text-sm truncate"
                                style={{ color: BRAND.black }}
                              >
                                {item.name}
                              </h4>
                              <p
                                className="font-black text-sm mt-1"
                                style={{ color: BRAND.yellow }}
                              >
                                {formatPrice(
                                  Number(item.price) * item.quantity,
                                )}
                              </p>
                              <div className="flex items-center gap-3 mt-3">
                                <button
                                  onClick={() =>
                                    onUpdateQty(item.id, item.quantity - 1)
                                  }
                                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                                  style={{ background: "rgba(28,28,28,0.1)" }}
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="font-bold text-sm w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    onUpdateQty(item.id, item.quantity + 1)
                                  }
                                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                                  style={{
                                    background: BRAND.black,
                                    color: "#fff",
                                  }}
                                >
                                  <Plus size={12} />
                                </button>
                                <button
                                  onClick={() => onRemove(item.id)}
                                  className="ml-auto"
                                  style={{ color: "rgba(28,28,28,0.35)" }}
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {step === "checkout" && (
                  <motion.div
                    key="checkout"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-6"
                  >
                    <form onSubmit={handleCheckout} className="space-y-4">
                      {/* Order Type */}
                      <div>
                        <label
                          className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3"
                          style={{ color: "rgba(28,28,28,0.5)" }}
                        >
                          Order Type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { value: "pickup", label: "Pickup", icon: Store },
                            {
                              value: "delivery",
                              label: "Delivery",
                              icon: Truck,
                            },
                          ].map(({ value, label, icon: Icon }) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setOrderType(value)}
                              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200"
                              style={{
                                background:
                                  orderType === value
                                    ? BRAND.black
                                    : BRAND.beige,
                                color:
                                  orderType === value ? "#fff" : BRAND.black,
                              }}
                            >
                              <Icon size={16} /> {label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label
                          className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-2"
                          style={{ color: "rgba(28,28,28,0.5)" }}
                        >
                          Full Name
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Your name"
                          value={checkoutForm.customer_name}
                          onChange={(e) =>
                            setCheckoutForm((f) => ({
                              ...f,
                              customer_name: e.target.value,
                            }))
                          }
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label
                          className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-2"
                          style={{ color: "rgba(28,28,28,0.5)" }}
                        >
                          Email Address
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="your@email.com"
                          value={checkoutForm.customer_email}
                          onChange={(e) =>
                            setCheckoutForm((f) => ({
                              ...f,
                              customer_email: e.target.value,
                            }))
                          }
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label
                          className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-2"
                          style={{ color: "rgba(28,28,28,0.5)" }}
                        >
                          Phone Number
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+27 ..."
                          value={checkoutForm.customer_phone}
                          onChange={(e) =>
                            setCheckoutForm((f) => ({
                              ...f,
                              customer_phone: e.target.value,
                            }))
                          }
                          style={inputStyle}
                        />
                      </div>
                      {orderType === "delivery" && (
                        <div>
                          <label
                            className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-2"
                            style={{ color: "rgba(28,28,28,0.5)" }}
                          >
                            Delivery Address
                          </label>
                          <textarea
                            required
                            placeholder="Street, area, city..."
                            value={checkoutForm.address}
                            onChange={(e) =>
                              setCheckoutForm((f) => ({
                                ...f,
                                address: e.target.value,
                              }))
                            }
                            style={{ ...inputStyle, resize: "none" }}
                            rows={3}
                          />
                        </div>
                      )}

                      {/* Order Summary */}
                      <div
                        className="rounded-2xl p-4 space-y-2"
                        style={{ background: BRAND.beige }}
                      >
                        <h4
                          className="font-bold text-sm mb-3"
                          style={{ color: BRAND.black }}
                        >
                          Order Summary
                        </h4>
                        {cart.map((i) => (
                          <div
                            key={i.id}
                            className="flex justify-between text-xs"
                          >
                            <span style={{ color: "rgba(28,28,28,0.6)" }}>
                              {i.name} × {i.quantity}
                            </span>
                            <span
                              className="font-bold"
                              style={{ color: BRAND.black }}
                            >
                              {formatPrice(Number(i.price) * i.quantity)}
                            </span>
                          </div>
                        ))}
                        <div
                          className="flex justify-between font-black text-sm pt-2"
                          style={{
                            borderTop: "1px solid rgba(28,28,28,0.1)",
                            color: BRAND.black,
                          }}
                        >
                          <span>Total</span>
                          <span style={{ color: BRAND.yellow }}>
                            {formatPrice(total)}
                          </span>
                        </div>
                      </div>

                      {orderError && (
                        <p className="text-red-500 text-xs">{orderError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-200 disabled:opacity-50"
                        style={{ background: BRAND.black, color: "#fff" }}
                      >
                        {mutation.isPending
                          ? "Placing Order..."
                          : `Place Order · ${formatPrice(total)}`}
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 px-6 text-center"
                  >
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                      style={{ background: BRAND.yellow }}
                    >
                      <CheckCircle size={44} color={BRAND.black} />
                    </div>
                    <h3
                      className="text-2xl font-black mb-3"
                      style={{ color: BRAND.black }}
                    >
                      Order Placed!
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-8"
                      style={{ color: "rgba(28,28,28,0.6)" }}
                    >
                      Thank you! Your order has been received. We'll prepare it
                      with care and update you via email.
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm"
                      style={{ background: BRAND.black, color: "#fff" }}
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {step === "cart" && cart.length > 0 && (
              <div
                className="p-6"
                style={{ borderTop: "1px solid rgba(28,28,28,0.08)" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span
                    className="text-sm font-bold"
                    style={{ color: "rgba(28,28,28,0.5)" }}
                  >
                    Subtotal
                  </span>
                  <span
                    className="font-black text-xl"
                    style={{ color: BRAND.black }}
                  >
                    {formatPrice(total)}
                  </span>
                </div>
                <button
                  onClick={() => setStep("checkout")}
                  className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                  style={{ background: BRAND.black, color: "#fff" }}
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
