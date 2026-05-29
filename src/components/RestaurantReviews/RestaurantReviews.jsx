import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PALETTE } from "@/constants/restaurant";

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1l1.236 2.503L10 3.927l-2 1.948.472 2.754L6 7.25 3.528 8.629 4 5.875 2 3.927l2.764-.424L6 1z"
            fill={i < rating ? PALETTE.gold : "rgba(200,169,110,0.2)"}
          />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="p-8 border border-transparent transition-all duration-400 group flex flex-col"
      style={{ background: PALETTE.charcoal }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${PALETTE.gold}30`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
    >
      {/* Quote icon */}
      <div className="mb-5">
        <Quote size={22} color={`${PALETTE.gold}60`} strokeWidth={1.5} />
      </div>

      <StarRating rating={review.rating} />

      <p
        className="mt-5 mb-6 text-sm leading-relaxed flex-1 italic"
        style={{ color: "rgba(229,229,229,0.6)" }}
      >
        "{review.review_text}"
      </p>

      <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: "rgba(229,229,229,0.08)" }}>
        <div
          className="w-10 h-10 flex items-center justify-center text-sm font-semibold flex-shrink-0"
          style={{ background: `${PALETTE.gold}22`, color: PALETTE.gold, border: `1px solid ${PALETTE.gold}44` }}
        >
          {review.avatar_letter}
        </div>
        <div>
          <div className="text-sm font-medium" style={{ color: PALETTE.white }}>
            {review.customer_name}
          </div>
          <div className="text-[10px] uppercase tracking-[0.15em]" style={{ color: "rgba(229,229,229,0.35)" }}>
            {review.customer_location}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Fallback static reviews if DB empty
const STATIC_REVIEWS = [
  { id: 1, customer_name: "Alexandra V.", customer_location: "Sandton, JHB", rating: 5, review_text: "An absolutely exquisite dining experience. The beef fillet was cooked to perfection and the service was impeccable. This is the finest restaurant in Johannesburg without question.", avatar_letter: "A" },
  { id: 2, customer_name: "James K.", customer_location: "Cape Town", rating: 5, review_text: "I have dined in restaurants across Europe and this stands proudly among the best. The attention to detail in every dish is remarkable. The chocolate fondant was divine.", avatar_letter: "J" },
  { id: 3, customer_name: "Naledi M.", customer_location: "Pretoria", rating: 5, review_text: "We celebrated our anniversary here and the staff made the evening truly memorable. The lamb rack was outstanding and the wine selection is superb. We will absolutely be returning.", avatar_letter: "N" },
  { id: 4, customer_name: "Michael D.", customer_location: "Rosebank", rating: 5, review_text: "From the moment you walk in, the atmosphere is sophisticated yet warm and welcoming. The tasting menu was an adventure through incredible flavours. Highly recommend to everyone.", avatar_letter: "M" },
  { id: 5, customer_name: "Priya S.", customer_location: "Johannesburg North", rating: 5, review_text: "The mushroom risotto was the best I have ever had. As a vegetarian, I appreciate a restaurant that takes plant-based dishes as seriously as their meat courses. Spectacular.", avatar_letter: "P" },
  { id: 6, customer_name: "Thomas W.", customer_location: "Hyde Park", rating: 5, review_text: "Outstanding in every regard. The sommelier was incredibly knowledgeable and paired our wines perfectly. The crème brûlée was flawless. This is our new favourite special occasion restaurant.", avatar_letter: "T" },
];

export default function RestaurantReviews() {
  const { data: reviewsData } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      fetch("/api/reviews").then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      }),
    retry: false,
  });

  const reviews = reviewsData?.reviews?.length ? reviewsData.reviews : STATIC_REVIEWS;

  return (
    <section id="reviews" className="py-28" style={{ background: PALETTE.dark }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-px w-10" style={{ background: PALETTE.gold }} />
            <span className="text-[10px] uppercase tracking-[0.45em]" style={{ color: PALETTE.gold }}>
              Guest Voices
            </span>
            <div className="h-px w-10" style={{ background: PALETTE.gold }} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-light mb-4"
            style={{ color: PALETTE.white, fontFamily: "'Georgia', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            What Our Guests Say
          </motion.h2>
          {/* Overall rating */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 12 12">
                  <path d="M6 1l1.236 2.503L10 3.927l-2 1.948.472 2.754L6 7.25 3.528 8.629 4 5.875 2 3.927l2.764-.424L6 1z" fill={PALETTE.gold} />
                </svg>
              ))}
            </div>
            <span className="text-2xl font-light" style={{ color: PALETTE.white, fontFamily: "'Georgia', serif" }}>5.0</span>
            <span className="text-xs" style={{ color: "rgba(229,229,229,0.4)" }}>· Exceptional</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.slice(0, 6).map((r, i) => (
            <ReviewCard key={r.id} review={r} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
