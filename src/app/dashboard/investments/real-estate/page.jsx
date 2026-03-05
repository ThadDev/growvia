"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/context/toastContext";

const API_BASE = `/api`;

export default function CryptoPlansPage() {
  const [plans, setPlans] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState(null);
  const { showToast } = useToast();

  /* =====================
     Fetch Plans
  ===================== */
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${API_BASE}/investments/real-estate/plans`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch plans");

        const data = await res.json();
        setPlans(data.data.plans || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  /* =====================
     Buy Plan
  ===================== */
  const buyPlan = async (plan) => {
    const amount = amounts[plan._id];

    if (!amount || Number(amount) < plan.minDeposit) return;

    try {
      setBuyingId(plan._id);

      const res = await fetch(`${API_BASE}/users/me/investments/real-estate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          amount: Number(amount),
          planId: plan._id,
        }),
      });

      if (res.ok) {
        showToast({ message: "plan purchased successfully", type: "success" });
      }
      setAmounts((prev) => ({ ...prev, [plan._id]: "" }));
    } catch (err) {
      showToast({ message: err.message, type: "error" });
    } finally {
      setBuyingId(null);
    }
  };

  /* =====================
     UI
  ===================== */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="text-sm text-muted-foreground">
          Loading investment plans…
        </span>
      </div>
    );
  }

  return (
    <section className="px-6 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Real-Estate Investment Plans
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Choose a plan and start earning daily profits
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Badge */}
            <span className="absolute top-4 right-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-medium text-primary">
              Premium
            </span>

            {/* Title */}
            <h3 className="text-xl text-icon font-semibold mb-4">
              {plan.title}
            </h3>

            {/* Stats */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Min Deposit</span>
                <span className="font-medium">${plan.minDeposit}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Max Deposit</span>
                <span className="font-medium">${plan.maxDeposit}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Daily Profit</span>
                <span className="font-semibold text-green-500">
                  {plan.dailyProfit}%
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Contract Duration</span>
                <span className="font-semibold text-green-text">
                  {plan.contractDuration} days
                </span>
              </div>
            </div>

            {/* Amount Input */}
            <div className="mt-6">
              <input
                type="number"
                placeholder={`Min $${plan.minDeposit}`}
                value={amounts[plan._id] || ""}
                onChange={(e) =>
                  setAmounts((prev) => ({
                    ...prev,
                    [plan._id]: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Buy Button */}
            <button
              onClick={() => buyPlan(plan)}
              disabled={
                buyingId === plan._id ||
                !amounts[plan._id] ||
                Number(amounts[plan._id]) < plan.minDeposit
              }
              className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
            >
              {buyingId === plan._id ? "Processing…" : "Buy Plan"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
