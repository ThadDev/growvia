"use client";

import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-4">
      <h1 className="text-5xl font-bold mb-4">Dashboard Page Not Found</h1>
      <p className="text-gray-400 mb-6">
        The page you are looking for does not exist in your dashboard.
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-primary hover:bg-hover text-white rounded-xl transition"
      >
        Go to Dashboard Home
      </Link>
    </div>
  );
}
