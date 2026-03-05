"use client";

import { useEffect, useRef } from "react";

export default function MarketSection() {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    // Prevent multiple script injections
    if (widgetRef.current.childNodes.length > 0) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 520,
      defaultColumn: "overview",
      screener_type: "crypto_mkt",
      displayCurrency: "USD",
      colorTheme: "light", // switch to "dark" if needed
      locale: "en",
    });

    widgetRef.current.appendChild(script);
  }, []);

  return (
    <section className="w-full bg-gradient-to-br from-grad-from to-grad-to py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-hover font-semibold tracking-wide uppercase text-md">
            Market Intelligence
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-text">
            Live Crypto Markets & Analysis
          </h2>
          <p className="mt-4 text-text/70">
            Real-time price action and market insights to help you make informed
            investment decisions.
          </p>
        </div>

        {/* TradingView Widget */}
        <div className="relative rounded-2xl overflow-hidden border border-border-color bg-white dark:bg-slate-900 shadow-lg">
          <div ref={widgetRef} />
        </div>

        {/* Supporting Points */}
        <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
          <div>
            <h4 className="font-semibold text-lg text-primary">
              Real-Time Data
            </h4>
            <p className="mt-2 text-text/70">
              Live crypto market data powered by TradingView.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-primary">
              Market Trends
            </h4>
            <p className="mt-2 text-text/70">
              Track momentum and identify emerging opportunities.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-primary">
              Smarter Decisions
            </h4>
            <p className="mt-2 text-text/70">
              Transparent insights designed for confident investing.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-12 text-xs text-center text-text/50">
          Market data is provided for informational purposes only and does not
          constitute financial advice.
        </p>
      </div>
    </section>
  );
}
