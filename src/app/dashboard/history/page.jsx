"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/context/toastContext";

const TABS = {
  deposits: "deposits",
  withdrawals: "withdrawals",
};

const statusStyles = {
  successful: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
  pending: "bg-primary/10 text-primary border border-primary/20",
  failed: "bg-red-500/10 text-red-500 border border-red-500/20",
};

export default function History() {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState(TABS.deposits);
  const [loading, setLoading] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    if (activeTab === TABS.deposits && deposits.length === 0) {
      fetchDeposits();
    }

    if (activeTab === TABS.withdrawals && withdrawals.length === 0) {
      fetchWithdrawals();
    }
  }, [activeTab]);

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/deposits/history`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        },
      );

      const result = await res.json();
      console.log(result)
      if (!res.ok)
        throw new Error(result?.message || "Failed to load deposits");

      setDeposits(result.data.data || []);
    } catch (err) {
      showToast({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/withdrawals/history`,
        {
          credentials: "include",
          method: "GET",
          cache: "no-store",
        },
      );

      const result = await res.json();
      if (!res.ok)
        throw new Error(result?.message || "Failed to load withdrawals");

      setWithdrawals(result.data.withdrawals || []);
    } catch (err) {
      showToast({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" px-4 max-w-7xl flex flex-col  mx-auto space-y-6 text-text">
      {/* Header */}
      <div className="text-center md:text-start">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <p className="text-sm text-text/70">
          View your deposit and withdrawal records
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center md:justify-start items-center flex gap-3">
        <button
          onClick={() => setActiveTab(TABS.deposits)}
          className={`px-5 py-2 rounded-xl font-medium transition ${activeTab === TABS.deposits
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "bg-card border border-border-color hover:bg-surface"
            }`}
        >
          Deposits
        </button>

        <button
          onClick={() => setActiveTab(TABS.withdrawals)}
          className={`px-5 py-2 rounded-xl font-medium transition ${activeTab === TABS.withdrawals
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "bg-card border border-border-color hover:bg-surface"
            }`}
        >
          Withdrawals
        </button>
      </div>

      {/* Content */}
      <div className="bg-card rounded-2xl p-4 sm:p-6">
        {loading ? (
          <div className="text-center py-10 text-text/70">
            Loading transactions...
          </div>
        ) : activeTab === TABS.deposits ? (
          <DepositTable data={deposits} />
        ) : (
          <WithdrawalTable data={withdrawals} />
        )}
      </div>
    </div>
  );
}

function WithdrawalTable({ data }) {
  if (!data?.length) {
    return (
      <div className="text-center py-10 text-text/70">
        No withdrawal history available
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-text/70 border-b border-border-color">
              <th className="py-3">Crypto</th>
              <th className="py-3">Amount</th>
              <th className="py-3">Status</th>
              <th className="py-3">Requested At</th>
            </tr>
          </thead>

          <tbody>
            {data.map((tx) => (
              <tr key={tx.id} className="border-b border-border-color text-sm">
                <td className="py-4 font-medium">{tx.crypto}</td>

                <td className="py-4">${tx.amount.toLocaleString()}</td>

                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[tx.status] || "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {tx.status}
                  </span>
                </td>

                <td className="py-4">
                  {new Date(tx.requestedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {data.map((tx) => (
          <div
            key={tx.id}
            className="border border-border-color rounded-xl p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{tx.crypto}</span>

              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[tx.status] || "bg-gray-100 text-gray-600"
                  }`}
              >
                {tx.status}
              </span>
            </div>

            <div className="text-sm text-text/70">
              Amount: ${tx.amount.toLocaleString()}
            </div>

            <div className="text-xs text-text/60">
              {new Date(tx.requestedAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ----------------------- */
/* Deposit History Table   */
/* ----------------------- */
function DepositTable({ data }) {
  if (!data.length) {
    return (
      <div className="text-center py-10 text-text/70">
        No deposit history available
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-text/70 border-b border-border-color">
              <th className="py-3">Crypto</th>
              <th className="py-3">Amount</th>
              <th className="py-3">Status</th>
              <th className="py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map((tx) => (
              <tr key={tx.id} className="border-b border-border-color text-sm">
                <td className="py-4 font-medium">{tx.crypto}</td>
                <td className="py-4">${tx.amount.toLocaleString()}</td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[tx.status] || "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="py-4">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {data.map((tx) => (
          <div
            key={tx.id}
            className="border border-border-color rounded-xl p-4 space-y-2"
          >
            <div className="flex justify-between">
              <span className="font-semibold">{tx.crypto}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[tx.status]
                  }`}
              >
                {tx.status}
              </span>
            </div>

            <div className="text-sm text-text/70">
              Amount: ${tx.amount.toLocaleString()}
            </div>

            <div className="text-xs text-text/60">
              {new Date(tx.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ----------------------- */
/* Withdrawal Placeholder  */
/* ----------------------- */
function WithdrawalPlaceholder() {
  return (
    <div className="text-center py-12 text-text/70">
      Withdrawal history will appear here once available.
    </div>
  );
}
