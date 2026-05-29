import { motion, AnimatePresence } from "motion/react";
import { CheckCircle } from "lucide-react";
import { BRAND } from "@/constants/brand";

export const Toast = ({ message, show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.9 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-3.5 rounded-2xl flex items-center gap-3 shadow-2xl"
        style={{ background: BRAND.black, color: "#fff", whiteSpace: "nowrap" }}
      >
        <CheckCircle size={18} style={{ color: BRAND.yellow }} />
        <span className="text-sm font-bold">{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
);
