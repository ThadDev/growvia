"use client";

import { useState } from "react";
import { useToast } from "@/context/toastContext";
import StatusModal from "@/components/statusModal";
import { useUser } from "@/context/userContext";

const CRYPTO_OPTIONS = ["USDT_TRC20", "BTC", "ETH", "USDT_BEP20", "XRP", "USDT_ERC20"];

export default function Withdrawal() {
  const { showToast } = useToast();
  const { user } = useUser();

  const [currency, setCurrency] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    type: "pending",
    title: "",
    message: "",
  });

  const validateInputs = () => {
    if (!currency) {
      showToast({ message: "Please select a cryptocurrency", type: "error" });
      return false;
    }

    if (!amount || Number(amount) <= 0) {
      showToast({ message: "Enter a valid withdrawal amount", type: "error" });
      return false;
    }

    if (!walletAddress.trim()) {
      showToast({ message: "Wallet address is required", type: "error" });
      return false;
    }

    return true;
  };

  const handleWithdraw = async () => {
    if (!validateInputs()) return;
    setModal({
      open: true,
      type: "pending",
      title: "processing withdrawal",
      message: "please wait...",
    });

    setLoading(true);

    const payload = {
      crypto: currency.toLowerCase(),
      amount: Number(amount),
      walletAddress: walletAddress.trim(),
    };

    try {
      const res = await fetch(
        `/api/withdrawals`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Withdrawal failed");
      }

      setModal({
        open: true,
        type: "success",
        title: "Request submitted",
        message: "your withdrawal request has been submitted",
      });

      setAmount("");
      setWalletAddress("");
    } catch (error) {
      setModal({
        open: true,
        type: "error",
        title: "withdrawal failed",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-8  md:px-6 lg:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ================= LEFT 50% ================= */}
        <section className="space-y-8">
          {/* Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Deposit Balance */}
            <div className="rounded-2xl border border-border-color bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Deposit Balance</p>
                  {user && (
                    <p className="mt-2 text-2xl font-semibold text-text">
                      ${`${user.accountBalance.toLocaleString()}`}
                    </p>
                  )}
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <i className="fa-solid fa-wallet" />
                </div>
              </div>
            </div>

            {/* Earnings Balance */}
            <div className="rounded-2xl border border-border-color bg-card p-6">
              <div className="flex items-center  justify-between">
                <div>
                  <p className="text-sm text-text-muted">Earnings Balance</p>
                  {user && (
                    <p className="mt-2 text-2xl font-semibold text-text">
                      ${user.availableProfit.toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-hover/10 text-hover">
                  <i className="fa-solid fa-chart-line" />
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="rounded-2xl border border-border-color bg-card p-7">
            <div className="mb-5 flex items-center gap-2">
              <i className="fa-solid fa-circle-info text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-wide text-text">
                Withdrawal Instructions
              </h3>
            </div>

            <ul className="space-y-3 text-sm text-text-muted leading-relaxed">
              <li>
                • Processing time:{" "}
                <span className="text-text">1 – 2 business days</span>
              </li>
              <li>
                • Minimum withdrawal: <span className="text-text">$100</span>
              </li>
              <li>
                • Cross-check wallet addresses carefully before submitting
              </li>
              <li>• All withdrawals require board approval</li>
              <li>• Email updates are sent at each processing stage</li>
              <li>
                • Withdrawals may be rejected due to invalid addresses or
                insufficient funds
              </li>
              <li>• Rejected withdrawals are disbursed within 24 hours</li>
            </ul>
          </div>
        </section>

        {/* ================= RIGHT 50% ================= */}
        <section>
          <div className="rounded-2xl border border-border-color bg-card p-8 shadow-sm">
            <StatusModal
              {...modal}
              onClose={() => setModal({ ...modal, open: false })}
            />

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-text">
                Withdraw Funds
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                Requests are reviewed and processed securely
              </p>
            </div>

            {/* Cryptocurrency */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">
                Cryptocurrency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-xl bg-surface border border-border px-4 py-3 outline-none focus:ring-2 focus:ring-hover/40"
              >
                {CRYPTO_OPTIONS.map((coin) => (
                  <option key={coin} value={coin}>
                    {coin}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">
                Amount ($)
              </label>
              <div className="relative">
                <i className="fa-solid fa-dollar-sign absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm" />
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full rounded-xl bg-surface border border-border py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-hover/40"
                />
              </div>
            </div>

            {/* Wallet Address */}
            <div className="mb-8">
              <label className="mb-2 block text-sm font-medium">
                Wallet Address
              </label>
              <div className="relative">
                <i className="fa-solid fa-address-card absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm" />
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Enter wallet address"
                  className="w-full rounded-xl bg-surface border border-border py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-hover/40"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleWithdraw}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-hover active:scale-95 disabled:opacity-50"
            >
              <i className="fa-solid fa-arrow-up-from-bracket" />
              {loading ? "Processing..." : "Submit Withdrawal"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
