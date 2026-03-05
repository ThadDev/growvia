"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { useUser } from "@/context/userContext";
import StatCard from "@/components/balanceCard";
import TradingViewWidget from "@/components/TradingView";
import { useBalanceVisibility } from "@/context/balanceVisibilityProvider";
import { fetchDashboardData } from "@/lib/api/fetchDashboardStats";
import { useToast } from "@/context/toastContext";
import AccountBalanceCard from "@/components/MainBalanceCard";
import { useInv } from "@/context/userContext";
import { useKyc } from "@/context/userContext";

export default function DashboardPage() {
  const { toggle, hidden } = useBalanceVisibility();
  const { theme } = useTheme();
  const { showToast } = useToast();
  const stableShowToast = useCallback(showToast, []);
  const { user, setUser } = useUser();
  const { inv, setInv } = useInv();
  const { setKyc } = useKyc();

  const [stats, setStats] = useState({
    fullName: "",
    referralCode: "",
    depositBalance: 0,
    earnings: 0,
    withdrawals: 0,
    totalInvestments: 0,
  });

  const [loading, setLoading] = useState(true);

  // Simulated chart data
  const charts = {
    deposits: [500, 1200, 1800, 2600, 3200, 4100, 4800],
    earnings: [50, 90, 140, 200, 280, 350, 420],
    withdrawals: [300, 600, 900, 1300, 1700, 2100, 2600],
  };

  useEffect(() => {
    // fetch user profile for userContext
    const loadProfile = async () => {
      try {
        const res = await fetch(
          `/api/users/me`,
          {
            credentials: "include",
            cache: "no-store",
          },
        );

        const result = await res.json();
        if (!res.ok)
          throw new Error(result?.message || "Failed to load profile");

        const data = result.data;
        setUser(data);
      } catch (err) {
        showToast({ message: err.message, type: "error" });
      }
    };

    // Investment stats
    const loadInvestments = async () => {
      try {
        const res = await fetch(
          `/api/users/me/investments`,
          {
            credentials: "include",
            cache: "no-store",
          },
        );

        const result = await res.json();
        if (!res.ok)
          throw new Error(result?.message || "Failed to load investments");
        const invLength = result.data.investments.filter(
          (investments) => investments.status === "active",
        ).length;

        setInv(invLength);
      } catch (err) {
        showToast({ message: err.message, type: "error" });
      }
    };

    // dashboard stats
    const loadDashboard = async () => {
      try {
        const data = await fetchDashboardData();
        setStats(data);
      } catch (error) {
        showToast({
          message: error.message || "Failed to load dashboard",
          type: "error",
        });
        showToast({ message: "Please log in again", type: "error" });
        // window.location.href = "/login"
      } finally {
        setLoading(false);
      }
    };
    loadInvestments();
    loadProfile();
    loadDashboard();
  }, [stableShowToast]);

  return (
    <section className="w-full px-4  sm:px-6 lg:px-4 max-w-7xl mx-auto">
      {/* Header */}
      <header className="p-2 ">
        {loading ? (
          <div className="animate-pulse space-y-2 hidden md:flex">
            <div className="h-6 w-48 bg-border-color rounded"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between">
              <h1 className="text-xl hidden md:flex sm:text-2xl font-bold text-text">
                Welcome back, {user?.fullName}
              </h1>
              <button
                onClick={toggle}
                className="text-white/80 hover:text-white md:flex hidden transition"
              >
                <Icon
                  icon={hidden ? "mdi:eye-outline" : "mdi:eye-off-outline"}
                  className="md:text-3xl text-xl text-icon"
                />
              </button>
            </div>
          </>
        )}
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AccountBalanceCard
          amount={
            loading ? (
              <div className="h-8 w-28 rounded-md bg-border-color animate-pulse" />
            ) : (
              `$${stats.depositBalance.toLocaleString()}`
            )
          }
          loading={loading}
        />
        <h1 className="md:hidden font-bold text-text mt-4">Summary</h1>
        <StatCard
          title="Earnings"
          amount={
            loading ? (
              <div className="h-8 w-28 rounded-md bg-border-color animate-pulse" />
            ) : (
              `$${stats.earnings.toLocaleString()}`
            )
          }
          data={"fa-solid fa-coins"}
          lineColor="#38bdf8"
        />

        <StatCard
          title="Total Investments"
          amount={
            loading ? (
              <div className="h-8 w-28 rounded-md bg-border-color animate-pulse" />
            ) : (
              `$${stats.totalInvestments.toLocaleString()}`
            )
          }
          data={"fa-solid fa-sack-dollar"}
          lineColor="#f97316"
        />

        <StatCard
          title="Total Withdrawals"
          amount={
            loading ? (
              <div className="h-8 w-28 rounded-md bg-border-color animate-pulse" />
            ) : (
              `$${stats.withdrawals.toLocaleString()}.00`
            )
          }
          data={"fa-solid fa-money-bill-wave"}
          lineColor="#9e16f9"
        />
        {/* </>
        )} */}
      </div>

      {/* Market Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-7">
        <div
          className="lg:col-span-2 bg-gradient-to-br from-grad-via to-grad-to rounded-2xl p-4 border border-border-color/40 transition-all duration-300"
          style={{ boxShadow: "var(--card-shadow)" }}
        >
          <h2 className="text-lg font-semibold mb-4">Market Analysis</h2>
          <TradingViewWidget theme={theme} />
        </div>

        <div
          className="bg-gradient-to-br from-grad-via to-grad-to rounded-2xl p-4 border border-border-color/40 transition-all duration-300"
          style={{ boxShadow: "var(--card-shadow)" }}
        >
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">Portfolio Summary</h2>
            <button
              onClick={toggle}
              className="text-white/80 hover:text-white md:flex  transition"
            >
              <Icon
                icon={hidden ? "mdi:eye-outline" : "mdi:eye-off-outline"}
                className="md:text-3xl text-xl text-icon"
              />
            </button>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-border-color rounded"></div>
              <div className="h-4 bg-border-color rounded"></div>
              <div className="h-4 bg-border-color rounded"></div>
              <div className="h-4 bg-border-color rounded"></div>
              <div className="h-4 bg-border-color rounded"></div>
            </div>
          ) : (
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span>Deposits</span>
                {hidden ? (
                  "****"
                ) : (
                  <span>${stats.depositBalance.toLocaleString()}.00</span>
                )}
              </li>
              <li className="flex justify-between">
                <span>Earnings</span>
                {hidden ? (
                  "****"
                ) : (
                  <span>${stats.earnings.toLocaleString()}</span>
                )}
              </li>
              <li className="flex justify-between">
                <span>Withdrawals</span>
                {hidden ? (
                  "****"
                ) : (
                  <span>${stats.withdrawals.toLocaleString()}</span>
                )}
              </li>
              <li className="flex justify-between font-semibold">
                <span>Total Investments</span>
                {hidden ? (
                  "****"
                ) : (
                  <span>${stats.totalInvestments.toLocaleString()}</span>
                )}
              </li>
              {inv && (
                <li className="flex justify-between font-semibold">
                  <span>Active Contract</span>
                  <span>{inv ?? 0}</span>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
