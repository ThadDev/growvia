"use client";

import LoadingModal from "@/components/loadingModal";
import Link from "next/link";
import { useEffect, useState } from "react";

// Sanity image helper removed — replaced with direct PostgreSQL binary strings

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvestments = async () => {
    try {
      const res = await fetch(
        `/api/investments`,
        {
          credentials: "include",
          cache: "no-store",
        },
      );

      if (!res.ok) throw new Error("Failed to fetch investments");

      const result = await res.json();
      console.log(result)
      setInvestments(result?.data?.investments || []);
    } catch (error) {
      console.error("Fetch investments error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  /* =====================
     Loading State
  ===================== */
  //   if (loading) {
  //     return (
  //       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {[...Array(6)].map((_, i) => (
  //           <div
  //             key={i}
  //             className="h-72 rounded-2xl bg-muted animate-pulse"
  //           />
  //         ))}
  //       </section>
  //     );
  //   }
  if (loading) return <LoadingModal open message="fetching Investments..." />;
  /* =====================
     Empty State
  ===================== */
  if (!investments.length) {
    return (
      <div className="flex items-center justify-center h-[40vh] text-muted">
        No investments available
      </div>
    );
  }

  return (
    <section className=" gap-4 px-3 flex flex-col">
      <h1 className="text-xl font-bold text-center">Investments Types</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((inv) => (
          <InvestmentCard key={inv.id} investment={inv} />
        ))}
      </div>
    </section>
  );
}

/* =====================
   Premium Investment Card
===================== */
function InvestmentCard({ investment }) {
  const { title, status, type, image, createdAt, slug } = investment;

  const imageUrl = image || "";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted">
            No image
          </div>
        )}

        {/* Status Badge */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full backdrop-blur
            ${status === "active"
              ? "bg-green-500/90 text-white"
              : "bg-gray-700/80 text-white"
            }`}
        >
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold capitalize tracking-tight">
          {`${title === "crypto" ? "Block Chain" : title} `}
        </h3>

        {/* <p className="text-sm text-muted capitalize">
          {type?.replace(/([A-Z])/g, " $1")}
        </p> */}

        <div className="flex items-center justify-between pt-3 border-t border-border">
          {/* <span className="text-xs text-muted">
            {new Date(createdAt).toLocaleDateString()}
          </span> */}

          <Link
            href={`/dashboard/investments/${type === "loans" ? type.slice(0, -1) : type}`}
          >
            <button className="text-sm font-medium text-white px-4 py-3 bg-primary rounded-xl hover:cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}
