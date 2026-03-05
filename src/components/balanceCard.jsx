"use client";

import dynamic from "next/dynamic";
import { useBalanceVisibility } from "@/context/balanceVisibilityProvider";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function StatCard({
  title,
  amount,
  data,
  lineColor = "#22d3ee",
}) {

  const { hidden } = useBalanceVisibility();
  const options = {
    chart: {
      type: "line",
      sparkline: { enabled: true },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 600,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: [lineColor],
    tooltip: {
      enabled: true,
      theme: "dark",
      x: { show: false },
    },
  };

  const series = [
    {
      data,
    },
  ];

  return (
    <div
      className="stat-card relative w-full max-w-sm rounded-2xl bg-gradient-to-br from-grad-via to-grad-to px-4 py-3 text-text border border-border-color/40 transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "var(--card-shadow)" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "var(--card-shadow-hover)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "var(--card-shadow)"}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.7rem] uppercase tracking-wide font-bold text-text">
            {title}
          </p>
          <h2 className="mt-1 text-2xl text-text font-semibold">{hidden ? "****" : amount}</h2>
        </div>
        <div>
          <i
            className={`${data} text-2xl md:text-3xl`}
            style={{ color: lineColor }}
          ></i>
        </div>
        {/* <div className="h-10 w-28">
          <Chart
            options={options}
            series={series}
            type="line"
            height={64}
            width={112}
          />
        </div> */}
      </div>
    </div>
  );
}
