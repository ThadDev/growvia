"use client";

import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function StatusModal({ open, type, title, message, onClose }) {
  if (!open) return null;

  const icons = {
    success: <CheckCircle className="w-10 h-10 text-green-500" />,
    error: <XCircle className="w-10 h-10 text-red-500" />,
    pending: <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />,
  };

  return (
    <div className="fixed h-screen inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card rounded-2xl p-6 w-[90%] max-w-md text-center space-y-4">
        <div className="flex justify-center">{icons[type]}</div>
        <h2 className="text-xl font-bold text-text">{title}</h2>
        <p className="text-sm text-text">{message}</p>

        {type !== "pending" && (
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-xl shadow-md shadow-primary/20 hover:bg-hover hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
