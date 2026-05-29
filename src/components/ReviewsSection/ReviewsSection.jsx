import { motion } from "motion/react";
import { Star } from "lucide-react";
import { BRAND } from "@/constants/brand";

export const ReviewsSection = () => {
  const reviews = [
    {
      name: "Lerato M.",
      location: "Katlehong",
      rating: 5,
      text: "The best T-Bone in the whole of Ekurhuleni! The atmosphere is premium but you still feel at home. 580 is a game changer.",
      avatar: "L",
    },
    {
      name: "Sibusiso K.",
      location: "Germiston",
      rating: 5,
      text: "Finally a place in our area with world-class service and incredible food. The ribs are absolutely next level. Highly recommended.",
      avatar: "S",
    },
    {
      name: "Gugu Z.",
      location: "Tembisa",
      rating: 5,
      text: "I brought my family for my birthday dinner and 580 made it so special. The mocktails are everything and the platter is massive!",
      avatar: "G",
    },
    {
      name: "Thabo N.",
      location: "Katlehong",
      rating: 5,
      text: "The flame-grilled chicken is better than any franchise. This is real food made with love. I come here every Friday after work.",
      avatar: "T",
    },
    {
      name: "Nomsa P.",
      location: "Boksburg",
      rating: 5,
      text: "Came for a date night and left completely impressed. Clean, modern, great food and the staff were incredibly welcoming.",
      avatar: "N",
    },
    {
      name: "Mthokozisi D.",
      location: "Vosloorus",
      rating: 5,
      text: "The malva pudding alone is worth the trip. Honestly the best desserts in the area. 580 is on another level entirely.",
      avatar: "M",
    },
  ];

  return (
    <section id="reviews" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <span
            className="text-xs uppercase tracking-[0.3em] font-bold mb-3 block"
            style={{ color: BRAND.yellow }}
          >
            What Our Guests Say
          </span>
          <h2
            className="text-4xl md:text-5xl font-black tracking-tight"
            style={{
              color: BRAND.black,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Guest Reviews
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                fill={BRAND.yellow}
                color={BRAND.yellow}
              />
            ))}
            <span
              className="font-black text-lg ml-2"
              style={{ color: BRAND.black }}
            >
              4.9
            </span>
            <span className="text-sm" style={{ color: "rgba(28,28,28,0.4)" }}>
              · 10,000+ reviews
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-7 rounded-3xl border transition-all duration-300"
              style={{ background: BRAND.cream, borderColor: "transparent" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = BRAND.yellow)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "transparent")
              }
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(r.rating)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    fill={BRAND.yellow}
                    color={BRAND.yellow}
                  />
                ))}
              </div>
              {/* Text */}
              <p
                className="italic text-sm leading-relaxed mb-5"
                style={{ color: "rgba(28,28,28,0.65)" }}
              >
                "{r.text}"
              </p>
              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                  style={{ background: BRAND.black, color: BRAND.yellow }}
                >
                  {r.avatar}
                </div>
                <div>
                  <div
                    className="font-bold text-sm"
                    style={{ color: BRAND.black }}
                  >
                    {r.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(28,28,28,0.4)" }}
                  >
                    {r.location}
                  </div>
                </div>
                <div
                  className="ml-auto text-xs font-bold"
                  style={{ color: "rgba(28,28,28,0.3)" }}
                >
                  Google
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
