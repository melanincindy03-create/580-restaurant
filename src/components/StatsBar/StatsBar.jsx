import { motion } from "motion/react";
import { Star, Users, Award, Heart } from "lucide-react";
import { BRAND } from "@/constants/brand";

export const StatsBar = () => {
  const stats = [
    { icon: Star, label: "Google Rating", value: "4.9/5" },
    { icon: Users, label: "Happy Customers", value: "10,000+" },
    { icon: Award, label: "Years in Katlehong", value: "5+" },
    { icon: Heart, label: "Fresh Ingredients", value: "100%" },
  ];

  return (
    <section style={{ background: BRAND.black }} className="py-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y-2 md:divide-y-0 md:divide-x divide-white/10">
          {stats.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center justify-center py-4 md:py-0 gap-1 text-center"
            >
              <Icon size={20} style={{ color: BRAND.yellow }} />
              <span className="text-white font-black text-xl">{value}</span>
              <span className="text-white/40 text-xs uppercase tracking-widest">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
