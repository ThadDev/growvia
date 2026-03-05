"use client";

import { Loader2 } from "lucide-react";

export default function LoadingModal({ open, message = "Loading your data..." }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-2xl p-8 w-[90%] max-w-sm text-center shadow-xl">
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <Loader2 className="w-10 h-10 text-icon animate-spin" />
        </div>

        {/* Text */}
        <h3 className="text-lg font-semibold text-text mb-2">
          Please wait
        </h3>
        <p className="text-sm text-text/70">
          {message}
        </p>

        {/* Subtle progress bar */}
        <div className="mt-6 h-1 w-full bg-border rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-icon animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  );
}
