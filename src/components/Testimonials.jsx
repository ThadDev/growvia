// import { Quote, Star } from "lucide-react";

// const testimonials = [
//   {
//     name: "Private Client",
//     role: "Long-term Investor",
//     message:
//       "What stood out for me was transparency. Every update was clear, timely, and backed by real performance. That level of communication builds trust.",
//   },
//   {
//     name: "Thomas Wood",
//     role: "Crypto Portfolio Holder",
//     message:
//       "I’ve used multiple platforms, but Growvia feels intentionally built. Deposits, tracking, and withdrawals are straightforward and professional.",
//   },
//   {
//     name: "Calvin McLone",
//     role: "Growth-Focused Investor",
//     message:
//       "The experience feels structured and secure. You’re not guessing what’s happening with your funds — everything is clearly explained.",
//   },
//   {
//     name: "Institutional Client",
//     role: "Asset Allocation",
//     message:
//       "What impressed me most was risk management. The platform prioritizes capital preservation while still delivering meaningful growth.",
//   },
// ];

// export default function TestimonialsPreview() {
//   return (
//     <section className="w-full py-16 md:py-24 bg-gradient-to-br from-grad-from to-grad-to">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <div className="text-center max-w-2xl mx-auto mb-14">
//           <h2 className="text-2xl md:text-3xl font-semibold text-text">
//             Trusted by Forward-Thinking Investors
//           </h2>
//           <p className="mt-4 text-text-muted">
//             Early feedback from users who value clarity, discipline, and
//             long-term performance.
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="md:grid  flex overflow-x-auto snap-x snap-mandatory  sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {testimonials.map((item, index) => (
//             <div
//               key={index}
//               className="group relative flex-shrink-0 md:w-full w-[20em] snap-center rounded-2xl border border-border-color bg-card px-10 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
//             >
//               {/* Quote Icon */}
//               <div className="mb-4 flex items-center justify-between">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-hover group-hover:bg-hover group-hover:text-white transition-colors">
//                   <Quote size={18} />
//                 </div>

//                 {/* Rating */}
//                 <div className="flex gap-1 text-hover">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <Star key={i} size={14} fill="currentColor" />
//                   ))}
//                 </div>
//               </div>

//               {/* Message */}
//               <p className="text-sm text-text-muted leading-relaxed mb-6">
//                 “{item.message}”
//               </p>

//               {/* Divider */}
//               <div className="h-px w-full bg-border-color mb-4" />

//               {/* Author */}
//               <div>
//                 <p className="text-sm font-semibold text-text">
//                   {item.name}
//                 </p>
//                 <p className="text-xs text-text-muted">
//                   {item.role}
//                 </p>
//               </div>

//               {/* Subtle Glow */}
//               <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
//                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Note */}
//         <p className="mt-10 text-center text-xs text-text-muted">
//           Testimonials shown are representative previews. Client-submitted
//           reviews will appear here upon verification.
//         </p>
//       </div>
//     </section>
//   );
// }
"use client";

import { Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Private Client",
    role: "Long-term Investor",
    message:
      "What stood out for me was transparency. Every update was clear, timely, and backed by real performance. That level of communication builds trust.",
  },
  {
    name: "Thomas Wood",
    role: "Crypto Portfolio Holder",
    message:
      "I’ve used multiple platforms, but Growvia feels intentionally built. Deposits, tracking, and withdrawals are straightforward and professional.",
  },
  {
    name: "Calvin McLone",
    role: "Growth-Focused Investor",
    message:
      "The experience feels structured and secure. You’re not guessing what’s happening with your funds — everything is clearly explained.",
  },
  {
    name: "Institutional Client",
    role: "Asset Allocation",
    message:
      "What impressed me most was risk management. The platform prioritizes capital preservation while still delivering meaningful growth.",
  },
];

export default function TestimonialsPreview() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = container.offsetWidth;
      const index = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-grad-from to-grad-to">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-text">
            Trusted by Forward-Thinking Investors
          </h2>
          <p className="mt-4 text-text-muted">
            Early feedback from users who value clarity, discipline, and
            long-term performance.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={containerRef}
          className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-6 scrollbar-hide sm:grid-cols-2 lg:grid-cols-4"
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="group relative flex-shrink-0 w-[85%] sm:w-auto snap-center rounded-2xl border border-border-color bg-card px-10 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Quote + Rating */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-hover group-hover:bg-hover group-hover:text-white transition-colors">
                  <Quote size={18} />
                </div>

                <div className="flex gap-1 text-hover">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>

              {/* Message */}
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                “{item.message}”
              </p>

              {/* Divider */}
              <div className="h-px w-full bg-border-color mb-4" />

              {/* Author */}
              <div>
                <p className="text-sm font-semibold text-text">
                  {item.name}
                </p>
                <p className="text-xs text-text-muted">
                  {item.role}
                </p>
              </div>

              {/* Glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots (Mobile only) */}
        <div className="mt-6 flex justify-center gap-2 md:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                containerRef.current.scrollTo({
                  left: index * containerRef.current.offsetWidth,
                  behavior: "smooth",
                });
              }}
              className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index
                  ? "w-6 bg-hover"
                  : "w-2 bg-border-color opacity-50"
                }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Note */}
        <p className="mt-10 text-center text-xs text-text-muted">
          Testimonials shown are representative previews. Client-submitted
          reviews will appear here upon verification.
        </p>
      </div>
    </section>
  );
}
