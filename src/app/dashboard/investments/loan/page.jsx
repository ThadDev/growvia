"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/context/toastContext";

export default function LoanRequestPage() {
  const { showToast } = useToast();

  const API = "/api";

  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState("");

  const [creatingPreview, setCreatingPreview] = useState(false);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  /* ================= HELPERS ================= */

  const numericAmount = Number(amount);

  const resetForm = () => {
    setPreview(null);
    setAmount("");
  };

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
    resetForm();
  };

  /* ================= FETCH LOAN PLANS ================= */

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${API}/investments/loan/plans`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch plans");

        const data = await res.json();
        setPlans(data.data?.plans || []);
      } catch (err) {
        showToast({
          message: err.message || "Failed to load loan plans",
          type: "error",
        });
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, [API, showToast]);

  /* ================= VALIDATION ================= */

  const validateAmount = () => {
    if (!selectedPlan) {
      showToast({ message: "Select a loan plan", type: "warning" });
      return false;
    }

    if (!amount) {
      showToast({ message: "Enter loan amount", type: "warning" });
      return false;
    }

    if (!numericAmount || numericAmount <= 0) {
      showToast({ message: "Enter a valid amount", type: "warning" });
      return false;
    }

    if (
      numericAmount < selectedPlan.minAmount ||
      numericAmount > selectedPlan.maxAmount
    ) {
      showToast({
        message: `Amount must be between ${selectedPlan.minAmount} and ${selectedPlan.maxAmount}`,
        type: "warning",
      });
      return false;
    }

    return true;
  };

  /* ================= CREATE PREVIEW ================= */

  const handlePreview = async () => {
    if (!validateAmount()) return;

    try {
      setCreatingPreview(true);

      const res = await fetch(`${API}/users/me/investments/loan/preview`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan._id,
          amount: numericAmount,
          startDate: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setPreview(data.data);

      showToast({
        message: "Loan preview created",
        type: "success",
      });
    } catch (err) {
      showToast({
        message: err.message || "Failed to create preview",
        type: "error",
      });
    } finally {
      setCreatingPreview(false);
    }
  };

  /* ================= FINAL SUBMIT ================= */

  const handleSubmitLoan = async () => {
    if (!preview || submitting) return;

    try {
      setSubmitting(true);

      const res = await fetch(`${API}/users/me/investments/loan`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan._id,
          amount: numericAmount,
          startDate: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      showToast({
        message: "Loan requested successfully",
        type: "success",
      });

      setSelectedPlan(null);
      resetForm();
    } catch (err) {
      showToast({
        message: err.message || "Request failed",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= UI ================= */

  const isPreviewDisabled =
    creatingPreview ||
    !selectedPlan ||
    !amount ||
    !numericAmount ||
    numericAmount < selectedPlan?.minAmount ||
    numericAmount > selectedPlan?.maxAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-grad-from to-grad-via px-4 py-6">
      <div className="max-w-2xl mx-auto bg-card rounded-2xl text-text shadow p-6">
        <h1 className="text-xl font-semibold mb-6">Request a Loan</h1>

        {/* ================= PLANS ================= */}
        <div className="space-y-3 mb-6">
          {loadingPlans ? (
            <p>Loading plans...</p>
          ) : (
            plans.map((plan) => (
              <button
                key={plan._id}
                onClick={() => selectPlan(plan)}
                className={`w-full border rounded-xl p-4 text-left transition ${
                  selectedPlan?._id === plan._id
                    ? "border-primary bg-primary/5"
                    : "border-surface"
                }`}
              >
                <div className="font-medium">
                  {plan.title} • {plan.interest}% in {plan.duration} days
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  ${plan.minAmount} – ${plan.maxAmount}
                </div>
              </button>
            ))
          )}
        </div>

        {/* ================= AMOUNT ================= */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Amount</label>
          <input
            type="number"
            disabled={!selectedPlan || preview}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={
              selectedPlan
                ? `${selectedPlan.minAmount} – ${selectedPlan.maxAmount}`
                : "Select a plan first"
            }
            className="w-full border rounded-xl px-4 py-3 disabled:bg-surface"
          />
        </div>

        {/* ================= PREVIEW BUTTON ================= */}
        <button
          onClick={handlePreview}
          disabled={isPreviewDisabled}
          className="w-full bg-primary text-white py-3 rounded-xl font-medium disabled:opacity-50"
        >
          {creatingPreview ? "Creating Preview..." : "Preview Loan"}
        </button>

        {/* ================= PREVIEW ================= */}
        {preview && (
          <div className="mt-6 border rounded-xl p-4 bg-gray-50">
            <h3 className="font-semibold mb-3">Loan Info</h3>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Plan:</strong> {preview.planTitle}
              </p>
              <p>
                <strong>Amount:</strong> ${preview.preview.amount}
              </p>
              <p>
                <strong>Interest:</strong> {preview.preview.interestRate}% ($
                {preview.preview.interestAmount})
              </p>
              <p>
                <strong>Duration:</strong> {preview.preview.duration} days
              </p>
              <p>
                <strong>Repayment Date:</strong>{" "}
                {new Date(preview.preview.repaymentDate).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={handleSubmitLoan}
              disabled={submitting}
              className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-medium disabled:opacity-50"
            >
              {submitting ? "Requesting..." : "Confirm Loan Request"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
