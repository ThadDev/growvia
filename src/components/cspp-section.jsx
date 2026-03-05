import Link from "next/link";

export default function CSPPPreviewSection() {
  return (
    <section className="px-4 sm:px-6 py-14 sm:py-16 bg-muted">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Heading */}
        <div className="space-y-3 max-w-3xl">
          <span className="uppercase tracking-widest text-xs text-hover">
            Strategic Partnerships
          </span>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text leading-tight">
            Celebrity Strategic Partner Program
          </h2>
        </div>

        {/* Content */}
        <div className="grid gap-8 md:grid-cols-2 md:items-center">

          <p className="text-text/80 leading-relaxed text-base sm:text-lg">
            Our Celebrity Strategic Partner Program (CSPP) is designed for
            high-profile individuals who want more than visibility.
            Selected partners gain equity participation, strategic insight,
            and a direct role in expanding Growvia’s investor ecosystem.
          </p>

          {/* CTA Card */}
          <div className="bg-bg-gradient-to-br from-grad-from to-grad-to border border-primary rounded-2xl p-6 sm:p-8 space-y-5">
            <p className="text-text/70 text-sm sm:text-base leading-relaxed">
              This is not sponsorship. It is shared ownership, aligned
              incentives, and long-term value creation powered by influence.
            </p>

            <Link
              href="/celebrity-programme"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl gap-2 flex bg-hover text-white text-sm font-medium hover:opacity-90 transition"
            >
              <span>Explore the Program </span><span><i className="fa-solid fa-arrow-right"></i></span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
