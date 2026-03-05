"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useBalanceVisibility } from "@/context/balanceVisibilityProvider";

export default function AccountBalanceCard({
    loading,
  title = "Account Balance",
  amount = 0,
  currency = "$",
  icon = "mdi:wallet-outline",
  lineColor = "#22c55e",
  onWithdraw,
  onFund,
}) {
    const { hidden, toggle } = useBalanceVisibility();

  // const formattedAmount = `${currency}${amount.toLocaleString(undefined, {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // })}`;

  return (
    <div className="relative w-full max-w-sm rounded-xl bg-gradient-to-br from-grad-via to-grad-to px-4 py-4 text-text shadow-sm shadow-border-color hover:shadow-lg transition">
      {/* ================= MOBILE HEADER ================= */}
      <div className="flex items-center justify-between md:hidden">
        <h2 className="text-sm font-semibold text-text">
          Account Balance
        </h2>

        <button
          onClick={toggle}
          className="text-white/80 hover:text-white transition"
        >
          <Icon
            icon={hidden ? "mdi:eye-outline" : "mdi:eye-off-outline"}
            className="text-xl text-icon"
          />
        </button>
      </div>

      {/* ================= MOBILE AMOUNT ================= */}
      <div className="mt-6 text-start md:hidden">
       <div className="text-3xl font-bold tracking-tight">
          {hidden ? "****" : amount}
        </div>
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:flex items-center justify-between">
        <div>
          <p className="text-[0.7rem] uppercase tracking-wide font-bold text-text">
            {title}
          </p>
            {/* {loading ? (
        <div className="h-8 w-28 rounded-md bg-border-color animate-pulse" />
      ) : (
        <h2 className="mt-1 text-2xl text-text font-semibold">
            {hidden ? "****" : formattedAmount}
          </h2> 
      )} */}
       <div className="mt-1 text-2xl text-text font-semibold">
            {hidden ? "****" : amount}
          </div> 
          {/* */}
        </div>

        <Icon
          icon={icon}
          className="text-3xl"
          style={{ color: lineColor }}
        />
      </div>

      {/* ================= MOBILE ACTION BUTTONS ================= */}
      <div className="mt-5 grid grid-cols-2 gap-3 md:hidden">
  <Link
    href="/dashboard/withdraw"
    className="flex items-center justify-center gap-2 rounded-xl bg-icon px-3 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/25 transition"
  >
    <Icon icon="mdi:bank-transfer-out" className="text-lg" />
    Withdraw
  </Link>

  <Link
    href="/dashboard/deposit"
    className="flex items-center justify-center gap-2 rounded-xl bg-icon px-3 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/25 transition"
  >
    <Icon icon="mdi:plus-circle-outline" className="text-lg" />
    Fund
  </Link>
</div>

    </div>
  );
}

