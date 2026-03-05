"use client";

import Footer from "@/components/footer";
import { ShieldCheck, Users, TrendingUp, Star } from "lucide-react";

export default function CelebrityStrategicPartnerProgram() {
  return (
    <main className="flex mt-12 flex-col">

      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center px-6"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('/shiny-night-city.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl text-center text-white space-y-6">
          <span className="uppercase tracking-widest font-bold text-sm text-hover">
            Celebrity Strategic Partner Program (CSPP)
          </span>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Where Influence <span className="text-hover">Meets Ownership</span>
          </h1>

          <p className="text-base md:text-lg text-white/80">
            An exclusive opportunity for high-profile individuals to move beyond
            endorsement and into equity, strategy, and long-term value creation.
          </p>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="px-6 py-16 bg-card">
        <div className="max-w-5xl mx-auto space-y-10">

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-text">
              More Than Endorsement
            </h2>

            <p className="text-text/80 leading-relaxed text-lg">
              The <strong>Celebrity Strategic Partner Program (CSPP)</strong> is
              designed for individuals whose influence shapes markets, cultures,
              and capital flows — and who want their impact to translate into
              ownership and lasting value.
            </p>

            <p className="text-text/80 leading-relaxed">
              Selected partners are granted equity participation, insider-level
              strategic insight, and a direct role in expanding Growvia’s
              investor ecosystem. Their influence is no longer external —
              it is structurally aligned with the company’s growth.
            </p>
          </div>

        </div>
      </section>

      {/* ================= STRATEGIC VALUE ================= */}
      <section className="px-6 py-16 bg-gradient-to-br from-grad-via to-grad-to">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-text">
              Strategic Participation, Not Promotion
            </h2>

            <p className="text-text/80 leading-relaxed">
              CSPP partners actively contribute to Growvia’s expansion by
              unlocking capital channels, facilitating partnerships, and
              increasing global visibility through trusted networks.
            </p>

            <p className="text-text/80 leading-relaxed">
              This structure creates a powerful advantage for investors:
              you are investing alongside respected public figures whose
              incentives, credibility, and reputation are directly tied to the
              company’s success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ValueCard
              icon={<Star />}
              title="Equity Ownership"
              text="Partners hold real stakes, aligning influence with long-term value."
            />
            <ValueCard
              icon={<ShieldCheck />}
              title="Insider Access"
              text="Strategic visibility and insight into growth decisions."
            />
            <ValueCard
              icon={<Users />}
              title="Trusted Investor Flow"
              text="Investor onboarding through credibility and reputation."
            />
            <ValueCard
              icon={<TrendingUp />}
              title="Growth Alignment"
              text="Influence that compounds value over time."
            />
          </div>

        </div>
      </section>

      {/* ================= PROGRAM HIGHLIGHTS ================= */}
      <section className="px-6 py-16 bg-gradient-to-br from-grad-via to-grad-to">
        <div className="max-w-5xl mx-auto space-y-10">

          <h2 className="text-2xl md:text-3xl font-bold text-text text-center">
            Program Highlights
          </h2>

          <ul className="list-disc space-y-5 text-text/80 marker:text-hover text-lg max-w-3xl mx-auto">
            <li> Insider-level strategic access and insight</li>
            <li> Investor onboarding through trusted public figures</li>
            <li> Long-term value alignment, not short-term promotion</li>
            <li> Enhanced credibility, market reach, and investor confidence</li>
            <li> Equity participation for selected celebrity partners</li>
          </ul>

        </div>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="px-6 py-20 bg-gradient-to-br from-grad-via to-grad-to">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold text-text">
            This Is Not Sponsorship
          </h2>

          <p className="text-text/80 text-lg leading-relaxed">
            This is shared ownership. Aligned incentives. Growth powered by
            influence, trust, and long-term vision.
          </p>

          <p className="text-hover font-semibold text-lg">
            When influence becomes ownership, growth accelerates.
          </p>
        </div>
      </section>
      <Footer/>

    </main>
  );
}

/* ================= REUSABLE CARD ================= */

function ValueCard({ icon, title, text }) {
  return (
    <div className="md:p-6 p-4 bg-gradient-to-br from-grad-via to-grad-to rounded-2xl shadow-sm border border-hover space-y-4">
      <div className="text-hover">{icon}</div>
      <h3 className="font-semibold text-text">{title}</h3>
      <p className="text-text/70 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
