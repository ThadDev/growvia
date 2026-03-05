"use client";

export default function LoadingModal({ text }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur">
      <div className="flex flex-col items-center gap-3">
        <div className="h-14 w-14 animate-pulse rounded-full bg-primary" />
        <p className="text-sm text-white">{text}</p>
      </div>
    </div>
  );
}
