"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/context/toastContext";
import { FaFileContract } from "react-icons/fa";

const statusStyles = {
  active: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
  completed: "bg-hover/10 text-hover border border-hover/20",
  suspended: "bg-red-500/10 text-red-500 border border-red-500/20",
  pending: "bg-primary/10 text-primary border border-primary/20",
};

// Helper to calculate progress %
const getProgress = (start, end) => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const now = Date.now();

  if (now >= endTime) return 100;
  if (now <= startTime) return 0;

  return Math.floor(((now - startTime) / (endTime - startTime)) * 100);
};

export default function ActiveContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const isLoan = (c) => c.planType === "loan";

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await fetch(
          `/api/users/me/investments`,
          { credentials: "include" },
        );
        if (!res.ok) throw new Error("Failed to fetch contracts");
        const data = await res.json();
        setContracts(data.data.investments || []);
      } catch (err) {
        console.error(err);
        toast({
          type: "error",
          message: err.message || "Something went wrong",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [toast]);

  if (loading)
    return (
      <div className="text-center py-10 text-text/70">Loading contracts...</div>
    );

  if (!contracts.length)
    return (
      <div className="text-center py-10 text-text/70">
        No active contracts available
      </div>
    );

  return (
    <div className="space-y-6 px-2">
      <h1 className="text-center font-bold md:text-3xl text-xl">
        Active Contracts
      </h1>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-text/70 border-b border-border-color">
              <th className="py-3 flex items-center gap-1">
                <FaFileContract /> Plan Type
              </th>
              <th className="py-3">Amount</th>
              <th className="py-3">End Date</th>
              <th className="py-3">ROI</th>
              <th className="py-3">Profit earned</th>
              <th className="py-3">Status</th>
              <th className="py-3">Progress</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c) => {
              const progress = getProgress(c.startDate, c.endDate);
              const loan = isLoan(c);

              return (
                <tr
                  key={c.id}
                  className="border-b border-border-color text-sm"
                >
                  {/* PLAN TYPE */}
                  <td className="py-4 font-medium capitalize">
                    <span className="font-semibold text-text">
                      {loan
                        ? "Loan"
                        : c.planType === "crypto"
                          ? "Block Chain"
                          : c.planType.charAt(0).toUpperCase() +
                          c.planType.slice(1)}
                    </span>
                  </td>

                  {/* AMOUNT */}
                  <td className="py-4">${Number(c.amount).toLocaleString()}</td>

                  {/* END DATE */}
                  <td className="py-4">
                    {formatDate(c.endDate || c.repaymentDate)}
                  </td>

                  {/* ROI / INTEREST */}
                  <td className="py-4">
                    {loan ? (
                      <>${Number(c.interestAmount).toLocaleString()}</>
                    ) : (
                      <>--</>
                    )}
                  </td>

                  {/* PROFIT / TOTAL REPAYABLE */}
                  <td className="py-4">
                    {loan ? (
                      <span className="text-text/70">—</span>
                    ) : (
                      <>${Number(c.profitEarned).toLocaleString()}</>
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[c.status] || "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  {/* PROGRESS */}
                  <td className="py-4 w-32">
                    <div className="bg-gray-200 rounded-full h-2 w-full">
                      <div
                        className={`h-2 rounded-full ${c.status === "active"
                            ? "bg-emerald-500"
                            : c.status === "completed"
                              ? "bg-hover"
                              : "bg-primary"
                          }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-text/60">{progress}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {contracts.map((c) => {
          const progress = getProgress(c.startDate, c.endDate);
          const loan = isLoan(c);

          return (
            <div
              key={c.id}
              className="border border-border-color rounded-2xl p-4 shadow-sm bg-card"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-text">
                  {loan
                    ? "Loan Contract"
                    : c.planType === "crypto"
                      ? "Block Chain"
                      : c.planType.charAt(0).toUpperCase() +
                      c.planType.slice(1)}
                </span>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[c.status] || "bg-gray-100 text-gray-600"
                    }`}
                >
                  {c.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-text/70 mb-2">
                <div>
                  <span className="font-medium">Amount:</span> $
                  {Number(c.amount).toLocaleString()}
                </div>

                <div>
                  <span className="font-medium">
                    {loan ? "Repay By:" : "End:"}
                  </span>{" "}
                  {formatDate(c.endDate || c.repaymentDate)}
                </div>

                <div>
                  <span className="font-medium">
                    {loan ? "Interest:" : "ROI:"}
                  </span>{" "}
                  {loan ? `$${Number(c.interestAmount).toFixed(2)}` : "--"}
                </div>

                {!loan && (
                  <div>
                    <span className="font-medium">Profit:</span> $
                    {Number(c.profitEarned).toLocaleString()}
                  </div>
                )}
              </div>

              {/* Progress */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${c.status === "active"
                      ? "bg-emerald-500"
                      : c.status === "completed"
                        ? "bg-hover"
                        : "bg-primary"
                    }`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="text-xs text-text/60 mt-1">
                {progress}% completed
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
